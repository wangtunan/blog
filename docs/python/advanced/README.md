---
sidebar: auto
---
# Python高级技巧

## 文档
* [官方文档](https://docs.python.org/zh-cn/3.13/)
* [第三方库](https://pypi.org/)
* [Conda](https://docs.conda.io/projects/conda/en/stable/)
* [Miniconda](https://www.anaconda.com/docs/main)

## 安装
* Python：推荐安装v3.10+版本，以下所有代码示例均基于Python@3.10+。
* Conda：推荐安装Miniconda。

## VSCode插件
![python VSCode插件](../../images/python/python-vscode.png)

## 虚拟环境
强烈建议任何时候都通过类似`Conda`这样的工具创建一个虚拟环境并指定`Python`版本。
```py
# 规则
$ conda create -n your_env_name python=版本号

# 示例
$ conda create -n open_webui python=3.11
```
`Conda`常见命令如下：
```py
# 激活某个虚拟环境
$ conda activate your_env_name

# 取消激活当前虚拟环境
$ conda deactivate

# 查看所有虚拟环境
$ conda env list

# 删除某个虚拟环境
$ conda env remove -n your_env_name
```

## 高级技巧

### 错误和异常

### 装饰器

### 生成器

### 推导式

### Lambda表达式

### File文件操作