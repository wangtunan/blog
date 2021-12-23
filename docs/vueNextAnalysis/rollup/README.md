# Rollup
在本章节，我们将基于上一章已经搭建好的`Monorepo`项目结构，来介绍如何进行`rollup`打包。

## 入口文件
在这一小节，我们先给每个`packages`添加一个入口文件，并添加一些必要的代码，以方便后续的测试。

首先，在`packages/src/shared`目录下添加`index.js`入口文件，并撰写如下代码：
```js
export const add = (a, b) => {
  return a + b
}
export const reduce = (a, b) => {
  return a - b
}
```
接下来，在`packages/reactivity/src`目录下添加`index.js`入口文件，并撰写如下代码：
```js
import { add } from '@MyVue/shared'

export const reactive = () => {
  return add(1, 2)
}
```

最后，在`packages/compiler/src`目录下添加`index.js`入口文件，并撰写如下代码：
```js
import { reactive } from '@MyVue/reactivity'
import { reduce } from '@MyVue/shared'

export const transform = () => {
  const result1 = reactive()
  const result2 = reduce(2, 1)
  return result1 + result2
}
```

在添加完三个入口文件后，完整的目录结构如下所示：
```sh
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- src               # compiler源码目录
|   |   |   |   |-- index.js      # compiler源码入口文件
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- src               # reactivity源码目录
|   |   |   |   |-- index.js      # reactivity源码入口文件
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- src               # shared源码目录
|   |   |   |   |-- index.js      # shared源码入口文件
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
```

## 依赖安装
因为`Vue3`采用的是`rollup`进行打包，所以我们需要先安装`rollup`相关的包。
::: tip
`-D`是`--save-dev`的缩写，表示依赖安装到`devDependencies`上，`-w`是`pnpm`的参数，表示依赖安装到根目录。
:::
```sh
# 安装rollup
$ pnpm install rollup -D -w

# 安装rollup插件
$ pnpm install @rollup/plugin-json@4.1.0 @rollup/plugin-node-resolve@13.0.6 -D -w

# 安装execa
$ pnpm install execa@5.1.1 -D -w
```

* `rollup`是一个类似于`webpack`的打包工具，如果你还不是特别了解`rollup`，你可以点击[Rollup官网](https://www.rollupjs.com/)去了解更多。
* `@rollup/plugin-json`是一个能让我们从`json`文件中导入数据的插件。
* `@rollup/plugin-node-resolve`是一个能让我们从`node_modules`中引入第三方模块的插件。
* `execa`是一个能让我们手动执行脚本命令的一个工具。

依赖全部安装完毕后，根目录`packages.json`文件的`devDependencies`信息如下：
```json
"devDependencies": {
  "@rollup/plugin-json": "4.1.0",
  "@rollup/plugin-node-resolve": "13.0.6",
  "execa": "5.1.1",
  "rollup": "^2.61.1"
}
```

## 功能拆分以及实现

### 脚本命令
在实现之前，我们先在根目录下创建`scripts`目录，并新建一个`build.js`文件，其内容如下：
```js
// scripts/build.js
console.log('build.js')
```
然后，在根目录`package.json`文件中添加打包命令，如下：
```json
"scripts": {
  "build": "node scripts/build.js"
}
```
最后，在控制台中执行`build`命令，可以在终端成功看到打印内容：
```sh
# 执行命令
$ pnpm run build

# 输出内容
node scripts/build.js
build.js
```

### 打包
现在，我们思考一个问题：因为我们`packages`目录下可能会存在很多个子包，所以我们需要为每一个子包都执行一次打包命令，并输出`dist`到对应的目录下。

基于以上问题，我们将可能面临的问题进行拆分：
* **如何准确识别出所有的子包？**

可以采用`Node`中的`fs`模块去读`packages`目录下的所有子文件夹/文件，然后保留所有文件夹就是我们的所有子包，实现代码如下：
```js
// script/build.js
const fs = require('fs')

const pkgs = fs.readdirSync('packages').filter(p => {
  return fs.statSync(`packages/${p}`).isDirectory()
})

console.log(pkgs)
```
代码介绍：`readdirSync()`返回指定目录下所有文件名称组成的数组，`statSync()`和`isDirectory()`返回指定文件的详细信息对象，`isDirectory()`方法返回当前文件是否为文件夹。

在撰写完以上代码后，我们再次执行打包命令，可以看到如下打印信息。
```sh
# 执行打包命令
$ pnpm run build

# 输出信息
node scripts/build.js
[ 'compiler', 'reactivity', 'shared' ]
```

* **如何使用execa进行一次打包命令？**

假设现在要给`packages/shared`打包，可以先这样做：
```js
const build = async (pkg) => {
  await execa('rollup', ['-c', '--environment', `TARGET:${pkg}`], { stdio: 'inherit' })
}
build('shared')
```
以上`execa`执行的命令，相当于：
```sh
$ rollup -c --environment TARGET:shared
```
命令解读：`-c`代表制定`rollup`配置文件，如果其后没有跟文件名，则默认取根目录下的`rollup.config.js`文件。`--environment`表示注入一个环境变量，在我们的打包命令中注入了一个`TARGET`，可以使用`process.env.TARGET`取出来，其值为`shared`。

现在，我们在根目录下新建`rollup.config.js`文件，并撰写如下代码：
```js
const pkg = process.env.TARGET
console.log(pkg)
```
然后，再次运行打包命令：
::: tip
因为`rollup.config.js`没有导出任何东西，所以运行报错是正常的。
:::
```sh
# 执行打包命令
$ pnpm run build

# 输出信息
node scripts/build.js
[ 'compiler', 'reactivity', 'shared' ]
shared
...省略错误信息
```
* **如何批量执行打包命令？**

有了`shared`的打包经验，我们就可以实现给所有子包都打包，其实现代码如下：
```js
const runParallel = (targets, buildFn) => {
  const res = []
  for (const target of targets) {
    res.push(buildFn(target))
  }
  return Promise.all(res)
}
const build = async (pkg) => {
  await execa('rollup', ['-c', '--environment', `TARGET:${pkg}`], { stdio: 'inherit' })
}
runParallel(pkgs, build)
```
再次执行打包命令，输出结果如下：
::: tip
因为`rollup.config.js`没有导出任何东西，所以运行报错是正常的。
:::
```sh
# 打包命令
$ pnpm run build

# 输出结果
[ 'compiler', 'reactivity', 'shared' ]
compiler
reactivity
shared
```
* **如何配置rollup？**

根据`rollup`的基础知识，我们知道需要提供`input`、`output`以及`plugin`等配置，可以撰写如下代码：
```js
// rollup.config.js
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const pkg = process.env.TARGET
const createConfig = (name) => {
  return {
    input: 'src/index.js',
    output: {
      name,
      file: `dist/${name}.esm.js`,
      format: 'esm'
    },
    plugins: [
      json(),
      nodeResolve()
    ]
  }
}
module.exports = createConfig(pkg)
```
先别着急运行打包命令，因为以上代码还存在一些问题：<br/>
a. `input`和`file`的路径不正确，需要定义一个`resolve`函数来表示当前`package`包的路径。<br/>
b. `output.name`的值，我们希望是`VueXxx`而不是`xxx`。<br/>
c. `format`方式希望能够支持`ESM`、`CommonJs`和`UMD`这三种规范。<br/>

先来解决第一个问题，我们定义的`resolve`函数如下：
```js
// rollup.config.js 新增代码
const path = require('path')
const pkg = process.env.TARGET
const resolve = (p) => {
  return path.resolve(`${__dirname}/packages/${pkg}`, p)
}
console.log(resolve('src/index.js'))
```
假如此时运行打包命令，可以得到如下输出结果：
```sh
xxxxxxxx\monorepo-demo\packages\shared\src\index.js
xxxxxxxx\monorepo-demo\packages\compiler\src\index.js
xxxxxxxx\monorepo-demo\packages\reactivity\src\index.js  
```
既然`resolve`函数已经定义好了，那么修改`rollup.config.js`文件后完整代码如下：
```js
const path = require('path')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const pkg = process.env.TARGET
const resolve = (p) => {
  return path.resolve(`${__dirname}/packages/${pkg}`, p)
}
const createConfig = (name) => {
  return {
    input: resolve('src/index.js'),
    output: {
      name,
      file: resolve(`dist/${name}.esm.js`),
      format: 'esm'
    },
    plugins: [
      json(),
      nodeResolve()
    ]
  }
}
module.exports = createConfig(pkg)
```
接下来解决第二个问题，既然要自定义名字，那么可以选择在当前包的`package.json`文件中去定义，我们以`packages/shared`为例：
```json
// packages/shared目录下的packages.json
{
  "name": "@MyVue/shared",
  "buildOptions": {
    "name": "VueShared"
  },
  ...省略其他
}
```
在所有`package.json`文件都修改完毕后，我们需要去读取这个配置，代码如下：
```js
// rollup.config.js文件
const { buildOptions } = require(resolve('package.json'))
```
接着，在`createConfig`方法中去修改`output.name`的值：
```js
const createConfig = (name) => {
  return {
    output: {
      name: buildOptions.name,
      ...省略其他
    },
    ...省略其他
  }
}
```
最后解决第三个问题，根据前面配置`name`的思路，可以在`buildOptions`中去定义另外一个属性`formats`，同样以`shared`为例：
```js
// packages/shared目录下的packages.json
{
  "name": "@MyVue/shared",
  "buildOptions": {
    "name": "VueShared",
    "formats": [
      "esm",
      "cjs"
    ]
  },
  ...省略其他
}
```
为了更好的进行区分打包的产物，我们在`shared`配置`["esm", "cjs"]`，而对于`reactivity`和`compiler`配置`["esm", "cjs", "umd"]`。

在所有`formats`配置完毕后，我们再次修改`rollup.config.js`，完整代码如下：
```js
const path = require('path')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const pkg = process.env.TARGET
const resolve = (p) => {
  return path.resolve(`${__dirname}/packages/${pkg}`, p)
}
const { buildOptions } = require(resolve('package.json'))
const formatMap = {
  esm: {
    file: resolve(`dist/${pkg}.esm.js`),
    format: 'esm'
  },
  cjs: {
    file: resolve(`dist/${pkg}.cjs.js`),
    format: 'cjs'
  },
  umd: {
    file: resolve(`dist/${pkg}.js`),
    format: 'umd'
  }
}
const createConfig = (output) => {
  output.name = buildOptions.name
  return {
    input: resolve('src/index.js'),
    output,
    plugins: [
      json(),
      nodeResolve()
    ]
  }
}
const configs = buildOptions.formats.map(format => createConfig(formatMap[format]))
module.exports = configs
```
接着，我们来运行打包命令：
```sh
# 运行打包命令
$ pnpm run build

# 输出信息
created packages\shared\dist\shared.esm.js in 18ms
created packages\shared\dist\shared.cjs.js in 9ms
...省略
created packages\compiler\dist\compiler.esm.js in 18ms
created packages\compiler\dist\compiler.cjs.js in 9ms
created packages\compiler\dist\compiler.js in 22ms
```

最后，如果要想发布`package`，还需要有一个默认的入口文件，我们以`packages/shared`为例，在其目录下新建`index.js`，并撰写如下代码：
```js
module.exports = require('./dist/shared.cjs.js')
```
你可能会很疑惑，为什么只导出`CommomJs`规范的文件，`ESM`和`UMD`规范的文件又该如何导出呢？

其实，这两个规范可以在其目录下的`package.json`文件中去配置导出，以`reactivity`为例：
```json
{
  "name": "@MyVue/reactivity",
  "main": "index.js",                 // UMD规范导出
  "module": "dist/reactivity.esm.js", // ESM规范导出
  "unpkg": "dist/reactivity.js"       // UMD规范配合CDN
}
```
在所有`package.json`文件配置好后，此时项目完整目录如下：
```sh
|-- monorepo-demo              
|   |-- packages                  # packages目录
|   |   |-- compiler              # compiler子包
|   |   |   |-- dist              # compiler打包产物目录
|   |   |   |-- src               # compiler源码目录
|   |   |   |   |-- index.js      # compiler源码入口文件
|   |   |   |-- index.js          # compiler包入口文件
|   |   |   |-- package.json      # compiler子包特有的依赖
|   |   |-- reactivity            # reactivity子包
|   |   |   |-- dist              # reactivity打包产物目录
|   |   |   |-- src               # reactivity源码目录
|   |   |   |   |-- index.js      # reactivity源码入口文件
|   |   |   |-- index.js          # reactivity包入口文件
|   |   |   |-- package.json      # reactivity子包特有的依赖
|   |   |-- shared                # shared子包
|   |   |   |-- dist              # shared打包产物目录
|   |   |   |-- src               # shared源码目录
|   |   |   |   |-- index.js      # shared源码入口文件
|   |   |   |-- index.js          # shared包入口文件
|   |   |   |-- package.json      # shared子包特有的依赖
|   |-- package.json              # 所有子包都公共的依赖
```

至此、`rollup`打包这一小节已经全部介绍完毕了，你可以点击[monorepo-demo](https://github.com/wangtunan/monorepo-demo)仓库下载源码去了解更多。

你也可以基于此目录结构进行扩展更多我们还没有实现的功能，例如：**区分开发环境和生产环境**、**支持typescript**、**生产环境开启压缩**以及**ES6代码转义**等。