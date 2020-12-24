---
sidebar: auto
---
# Git常见命令

## 配置name和email
#### 设置name和email
``` 
$ git config --global user.name 'xxxx'
$ git config --global user.email 'xxxx@xxxx'
```

#### 获取name和email
``` 
$ git config user.name
$ git config user.email
```

## 初始化仓库
::: tip
可以在空目录初始化仓库，也能是已有的项目初始化仓库
:::
``` 
$ git init
```

## 添加文件
::: tip
可以添加一个或者多个文件
:::
```
$ git add readme.txt
$ git add file1.txt file2.txt
```

## 提交文件
::: tip
-m '说明注释' 代表本次提交的说明注释信息
:::
```
$ git commit -m '说明注释'
```

## 时光穿梭机

### 获取当前仓库的状态
```
$ git status
```

### 查看修改的内容
``` 
$ git diff
```

### 版本回退

#### 查看提交日志
::: tip
`HEAD`：代表当前版本<br/>
`HEAD^`：代表上一个版本<br/>
`HEAD^^`：代表上上一个版本
:::
```
$ git log
```

#### 查看命令日志
::: tip
`$ git reflog`查看的是每一次的命令的记录，头部有版本号
:::

#### 版本回退
::: tip
--hard 后面接HEAD或者具体的版本号<br/>
例如：`$ git reset --hard HEAD^`回退到上一个版本<br/>
例如：`$ git reset --hard 48e56e`回退到指定版本<br/>
注：回退后，`$ git log`命令不会输出该版本往后的版本记录，这时可以使用`$ git reflog`命令先找到版本号
:::
```
$ git reset --hard HEAD^
```

### 管理修改
::: tip
git 管理的是修改而不是文件
:::

#### 管理修改示例

- 修改文件
- 添加文件到暂存区
- 继续修改文件
- 提交文件到仓库

**结果**：git只会提交暂存区的内容，即只提交了第一次修改的内容，第二次修改的内容没有提交。

#### 办法一
- 先`$ git commit`提交第一次修改
- 再`$ git add`添加第二次修改
- 最后`$ git commit`提交第二次修改

#### 办法二
- 先不提交第一次修改
- `$ git add`添加第二次修改到暂存区
- `$ git commit`一起提交第一次、第二次的修改

### 撤销修改

撤销修改分三种情况

- `$ git add`之前
- `$ git commit`之前
- `$ git commit`之后

#### 情况一解决办法

直接使用`$ git checkout -- xxx`命令，丢掉当前工作区的修改
```
$ git checkout -- readme.txt
```

#### 情况二解决办法
- 首先使用`$ git reset HEAD xx`命令，撤销暂存区的修改
- 随后使用`$ git checkout -- xx`命令，丢弃工作区的修改
```
$ git reset HEAD readme.txt
$ git checkout -- readme.txt
```

#### 情况三解决办法

使用版本回退

### 删除文件
- 确定删除某一个文件
- 误删了某一个文件

#### 情况一解决办法
```
$ git rm test.txt
$ git commit -m 'sure remove test.txt'
```

#### 情况二解决办法
```
$ git reset HEAD test.txt
$ git checkout -- test.txt
```

## 远程仓库
### 添加远程仓库

#### 关联一个远程仓库
```
$ git remote add origin git@github.com:xxxxx/xxx
```

#### 第一次推送内容到master分支
::: tip
`-u`参数不仅把本地master分支的内容推送到远程仓库的master分支上，而且和远程仓库相关联起来<br/>
随后的远程推送内容，只需要`$ git push origin master`命令即可
:::
``` 
$ git push -u origin master
```

### 克隆远程仓库
::: tip
`git`协议是SSH协议，大部分克隆可以使用这种协议<br/>
`https`协议是口令协议，是针对只开发了https协议的网络
:::
```
$ git clone git@github.com:xxx/xxx
$ git clone https://github.com/xxx/xxx
```

## 分支管理
### 创建分支
```
$ git branch xxx
```
### 切换分支
```
$ git checkout xxx
```

#### 创建并切换分支的简写
```
$ git checkout -b xxx
```

### 查看所有分支
::: tip
带`*`号的表示当前分支
:::
```
$ git branch
```

### 合并分支
```
$ git merge xxx
```

### 删除分支
```
$ git branch -d xxx
```

### 解决冲突
当合并分支出现冲突时，可以利用`git status`查看冲突的位置<br>
在`cat xxx`命令，查看各分支的内容，手动编辑成相同的<br>
最后提交，删除分支

### Bug分支
工作做一半，突然接到一个任务解决bug，该怎样进行合理的git操作

- `git stash`命令隐藏当前工作区
- `git checkout -b xx`命令创建并切换到bug分支
- `git add xx `  `git commit -m xx`修复提交bug分支
- `git checkout master`切换到主分支
- `git merge xxx`合并bug分支到主分支
- `git branch -d xx`删除bug分支
- `git stash pop`恢复隐藏的工作现成

### Feature分支
开发一个新功能mask1，但不保证后续这个新功能需不需要。

- `git checkout -b mask1`创建mask1分支
- `git add xx` `git commit -m xxx`开发完毕并提交到当前mask1分支上

上级通知，此功能砍掉，不需要了
- `git checkout dev`切换到开发分支
- `git branch -D mask1`删除mask1分支的内容
::: tip
`-d`小写的参数d，再删除时会被提示，改分支没有合并，无法删除<br/>
`-D`大写的参数D，代表强制删除
:::

CC