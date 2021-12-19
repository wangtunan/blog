# Monorepo

`Monorepo`可以理解为：**利用单一仓库来管理多个packages的一种策略或手段**，与其相对的是我们接触最多的`Multirepo`。

可以使用项目目录结构来区分这两种模式：
```sh
# monorepo目录结构
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
```
```sh
# multirepo-a目录结构
|-- multirepo-a
|   |-- src 
|   |   |-- feature1              # feature1目录
|   |   |-- feature2              # featrue2目录
|   |-- package.json              # 整个项目依赖

# multirepo-b目录结构
|-- multirepo-b
|   |-- src 
|   |   |-- feature3              # feature3目录
|   |   |-- feature4              # featrue4目录
|   |-- package.json              # 整个项目依赖
```
可以很清楚的看到他们之间的差异：
* `Monorepo`目录中除了会有公共的`package.json`依赖以外，在每个`sub-package`子包下面，也会有其特有的`package.json`依赖。
* `Multirepo`更倾向与在项目制中，将一个个项目使用不同的仓库进行隔离，每一个项目下使用独有的`package.json`来管理依赖。

关于这两者的对比和`Monorepo`的优缺点，我们会在**Monorepo特点**这个章节进行介绍，在下一节我们来学习如何搭建一个`Monorepo`应用。

## Monorepo项目搭建

目前，搭建`Monorepo`项目主要有两种方式：
* `Lerna + yarn workspace`方式。
* `pnpm`方式。

在`Vue3.2.22`版本中，是使用`pnpm`来搭建`Monorepo`项目的，所以我们直接采用第二种方式。

### 搭建项目
全局安装`pnpm`
::: tip
[官方文档](https://pnpm.io/zh/installation)
:::

```sh
# 安装pnpm
$ npm install pnpm -g

# 安装完毕后查看pnpm版本
$ pnpm -v
6.24.1

# 查看node版本
$ node -v
v16.13.0
```

安装完毕后，我们创建如下目录结构：
```sh
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |-- reactivity            # reactivity子包
|   |   |-- shared                # shared子包
```

随后，在根目录以及每一个子包目录下都执行一遍`npm init -y`命令，让其创建一个`package.json`文件。全部执行完毕后，其目录结构如下所示：
```sh
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
```

接着，修改根目录下的`package.json`文件：
```json
{
  "name": "MyVue", // 避免pnpm安装时重名
  "private": true,  // 标记私有，防止意外发布
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

接下来，进入到每一个子包中，依次修改`package.json`，我们以`compiler`这个包为例。
```json {2,4}
{
  "name": "@MyVue/compiler", // 避免安装时跟@vue/* 重名
  "version": "1.0.0",
  "description": "@MyVue/compiler",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

最后回到根目录，创建`pnpm-workspace.yaml`文件，并撰写如下内容：
```yaml
packages:
  - 'packages/*'
```


至此，`Monorepo`项目结构已经初步搭建完毕，此时的目录结构如下：
```sh
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
|   |-- pnpm-workspace.yaml       # pnpm配置文件
```

### 安装依赖
依赖分为两部分，第一部分是公共依赖，第二部分是特有依赖。

#### 公共依赖
公共依赖指的是为所有子包共享的包，例如：`eslint`、`typescript`或者`prettier`等等。

```sh
# 在根目录安装eslint 和 typescript
$ pnpm install eslint typescript --save-dev
```
当执行以上命令后，控制台会报如下错误：
```sh
$ pnpm install eslint typescript --save-dev
 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, 
 which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root).
 If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
```
上面的意思时：如果我们确定要安装的依赖包需要安装到根目录，那么需要我们添加`-w`参数，因此修改我们的命令如下：

```sh
# 在根目录安装eslint 和 typescript
$ pnpm install eslint typescript --save-dev -w
```
安装完毕后，可以在根目录的`package.json`文件中看到`devDependencies`依赖包信息：
```json
"devDependencies": {
  "eslint": "^8.5.0",
  "typescript": "^4.5.4"
}
```

#### 特有依赖
现在，假设我们有这样一个场景：
* `packages/shared`依赖包有：`lodash`。
* `packages/reactivity`依赖包有：`@MyVue/shared`。
* `packages/compiler`依赖包有：`@MyVue/shared` 和 `@MyVue/reactivity`

基于以上场景，我们该如何添加特有依赖？
* 给`packages/shared`添加依赖：
::: tip
`-r`表示在workspace工作区执行命令，`--filter xxx` 表示指定在哪个包下执行。
:::
```sh
$ pnpm install lodash -r --filter @MyVue/shared
```
添加完毕后，可以在`packages/shared`目录下的`package.json`文件看到如下`dependencies`信息：
```json
"dependencies": {
  "lodash": "^4.17.21"
}
```
* 给`packages/reactivity`添加依赖：
::: tip
因为`@MyVue/shared`属于本地包依赖，所以带有前缀`workspace`。
:::
```sh
$ pnpm install @MyVue/shared -r --filter @MyVue/reactivity
```
添加完毕后，可以在`packages/reactivity`目录下的`package.json`文件看到如下`dependencies`信息：
```json
"dependencies": {
  "@MyVue/shared": "workspace:^1.0.0"
}
```
同样的道理，当我们在`packages/compiler`安装完依赖后，可以在`package.json`文件中看到如下`dependencies`信息：
```sh
"dependencies": {
  "@MyVue/reactivity": "workspace:^1.0.0",
  "@MyVue/shared": "workspace:^1.0.0"
}`
```

最后，项目的基础结构已经搭建完毕，在下一节我们来介绍一下`Monorepo`的特点。

## Monorepo特点

### Monorepo 和 Multirepo
一般而言，大型开源库，例如`Babal`以及`Vue3`等等都会选择使用`Monorepo`，而日常业务中，通常都是项目制的，通常会选择`Multirepo`，那么这两者之前有什么区别呢？
* **规范、工作流的统一性**：在使用`Multirepo`时，我们通常在遇到一个新项目的时候，会利用现有的脚手架或者手动重新搭建一套项目结构，这就使得不同的项目往往存在于不同的仓库中，而又因为种种原因无法做到代码规范、构建流程、发布流程等的统一性。使用`Monorepo`则不会存在这个问题，因为所有的`packages`包全部都在一个仓库中，自然而然就可以做到代码规范、构建流程和发布流程的统一性。
* **代码复用和版本依赖**：想象一下这样一个场景：当你的A项目依赖了B项目中的某个模块，你必须等到`B`项目重新发布以后，你的`A`项目才能正常开发或发布。如果`B`项目是一个基础库的话，那么`B`的每次更新都会影响到所有依赖`B`的项目。对那些没有提取复用逻辑，但又会`CV`在各个项目中函数、组件等，如果存在改动情况，则需要在每一个项目中都改动。这是使用`Multirepo`必须要去解决的两个问题造：代码复用问题和版本依题。如果使用的是`Monorepo`则可以很容易的解决这个问题，对于那些需要复用的逻辑，可以选择把它们都提取到一个公共的`packages`下，例如`packages/shared`。而对于版本依赖问题，则更好解决。因为所有`packages`都在一个仓库，无论是本地开发或者发布都没有问题。
* **团队协作以及权限控制**：根据`Monorepo`的特点，各个`packages`之间相对独立，所以可以很方便的进行职责划分。然而正是因为所有`packages`都在一个仓库下，所以在代码权限控制上很难像`Multirepo`那样进行划分，这无疑提高了`Monorepo`的门槛，它必须严格要求所有开发者严格遵守代码规范、提交规范等。
* **项目体积**：对于使用`Monorepo`的项目来说，随着项目的迭代，在代码体积和git提交方面都会比`Multirepo`项目增长快的很多，甚至会出现启动一个项目、修改后热更新非常慢的情况。不过随着打包工具的发展，这些都不再是问题。


这一章、对于`Monorepo`的介绍就到这里，在下一章我们将介绍`Monorepo`如何进行`rollup`打包。


## 参考链接
* [关于 monorepo 的一些尝试](https://zhuanlan.zhihu.com/p/70782864)
* [Monorepo——大型前端项目的代码管理方式](https://segmentfault.com/a/1190000019309820)
* [All in one：项目级 monorepo 策略最佳实践](https://segmentfault.com/a/1190000039157365)