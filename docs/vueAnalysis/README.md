---
sidebar: auto
---

# Vue 源码分析
本篇`Vue2.0`源码分析文章由观看[Vue.js源码全方位深入解析](https://coding.imooc.com/class/228.html)视频，阅读[深入浅出Vue.js](https://www.ituring.com.cn/book/2675)书籍以及参考其他`Vue`源码分析博客而来，阅读视频和书籍请支持正版。

## 介绍

### Vue发展简史
* 2013年7月，`Vue.js`在`Github`上第一次提交，此时名字叫做`Element`，后来被改名为`Seed.js`，到现在的`Vue.js`。
* 2013年12月，`Github`发布`0.6`版本，并正式更名为`Vue.js`。
* 2014年2月，在`Hacker News`网站上时候首次公开。
* 2015年10月，`Vue.js`发布`1.0.0`版本。
* 2016年10月，`Vue.js`发布`2.0`版本。

### Vue版本变化
`Vue2.0`版本和`Vue1.0`版本之间虽然内部变化非常大，整个渲染层都重写了，但`API`层面的变化却很小，对开发者来说非常友好，另外`Vue2.0`版本还引入了很多特性：
* `Virtual Dom`虚拟DOM。
* 支持`JSX`语法。
* 支持`TypeScript`。
* 支持服务端渲染`ssr`。
* 提供跨平台能力`weex`。

**正确理解虚拟DOM**：`Vue`中的虚拟DOM借鉴了开源库[snabbdom](https://github.com/snabbdom/snabbdom)的实现，并根据自身特色添加了许多特性。引入虚拟DOM的一个很重要的好处是：绝大部分情况下，组件渲染变得更快了，而少部分情况下反而变慢了。引入虚拟DOM这项技术通常都是在解决一些问题，然而解决一个问题的同时也可能会引入其它问题，这种情况更多的是如何做权衡、如何做取舍。因此，一味的强调虚拟DOM在任何时候都能提高性能这种说法需要正确对待和理解。

**核心思想**：`Vue.js`两大核心思想是**数据驱动**和**组件化**，因此我们在介绍完源码目录设计和整体流程后，会先介绍这两方面。

## 源码目录设计和架构设计

### 源码目录设计
`Vue.js`源码目录设计如下：
```sh
|-- dist              # 构建目录
|-- flow              # flow的类型声明，类似于TypeScipt
|-- packages          # 衍生的npm包，例如vue-server-renderer和vue-template-compiler
|-- scripts           # 构建配置和构建脚本
|-- test              # 端到端测试和单元测试用例
|-- src               # 源代码
|   |-- compiler      # 编译相关代码
|   |-- core          # 核心代码
|   |-- platforms     # 跨平台
|   |-- server        # 服务端渲染
|   |-- sfc           # .vue文件解析逻辑
|   |-- shared        # 工具函数/共享代码
```
对以上目录简要做如下介绍：
* `dist`：`rollup`构建目录，里面存放了所有`Vue`构建后不同版本的文件。
* `flow`：它是Facebook出品的`JavaScript`静态类型检查工具，早期`Vue.js`选择了`flow`而不是现在的`TypeScript`来做静态类型检查，而在最新的`Vue3.0`版本则选择使用`TypeScript`来重写。
* `packages`：`Vue.js`衍生的其它`npm`包，它们在`Vue`构建时自动从源码中生成并且始终和`Vue.js`保持相同的版本，主要是`vue-server-renderer`和`vue-template-compiler`这两个包，其中最后一个包在我们使用脚手架生成项目，也就是使用`.vue`文件开发`Vue`项目时会使用到这个包。
* `scripts`：`rollup`构建配置和构建脚本，`Vue.js`能够通过不同的环境构建不同的版本的秘密都在这个目录下。
* `test`：`Vue.js`测试目录，自动化测试对于一个开源库来说是至关重要的，测试覆盖率在一定程度上是衡量一个库质量的一个重要指标。测试用例无论对于开发还是阅读源码，都是有很大益处的，其中通过测试用例去阅读`Vue`源码是普遍认为可行的一种方式。

* `src/compiler`：此目录包含了与`Vue.js`编译相关的代码，它包括：模板编译成 AST 抽象语法树、AST 抽象语法树优化和代码生成相关代码。编译的工作可以在构建时用`runtime-only`版本，借助`webpack`和`vue-loader`等工具或插件来进行编译。也可以在运行时，使用包含构建功能的`runtime + compiler`版本。显然，编译是一项比较消耗性能的工作，所以我们日常的开发中，更推荐使用`runtime-only`的版本开发(体积也更小)，也就是通过`.vue`文件的形式开发。

```js
// 需要使用带编译的版本
new Vue({
  data: {
    msg: 'hello,world'
  }
  template: '<div>{{msg}}</div>'
})

// 不需要使用带编译的版本
new Vue({
  data: {
    msg: 'hello,world'
  },
  render (h) {
    return h('div', this.msg)
  }
})
```
*  `src/core`：此目录包含了`Vue.js`的核心代码，包括：内置组件`keep-alive`、全局 API(`Vue.use`、`Vue.mixin`和`Vue.extend`等)、实例化、响应式相关、虚拟 DOM 和工具函数等。

```sh
|-- core
|   |-- components      # 内助组件
|   |-- global-api      # 全局API
|   |-- instance        # 实例化
|   |-- observer        # 响应式
|   |-- util            # 工具函数
|   |-- vdom            # 虚拟DOM
```
* `src/platform`：`Vue2.0`提供了跨平台的能力，在`React`中有`React Native`跨平台客户端，而在`Vue2.0`中其对应的跨平台就是`Weex`。

```js
|-- platform
|   |-- web      # web浏览器端
|   |-- weex     # native客户端
```

* `src/server`: `Vue2.0`提供服务端渲染的能力，所有跟服务端渲染相关的代码都在`server`目录下，此部分代码是运行在服务端，而非 Web 浏览器端。

* `src/sfc`：此目录的主要作用是如何把`.vue`文件解析成一个`JavaScript`对象。

* `src/shared`：此目录下存放了一些在 Web 浏览器端和服务端都会用到的共享代码。


### 架构设计
我们通过以上目录结构可以很容易的发现，`Vue.js`整体分为三个部分：**核心代码**、**跨平台相关**和**公共工具函数**。

同时其架构是分层的，最底层是一个构造函数(普通的函数)，最上层是一个入口，也就是将一个完整的构造函数导出给用户使用。在中间层，我们需要逐渐添加一些方法和属性，主要是原型`prototype`相关和全局API相关。

![Vue架构设计](../images/vueAnalysis/composition.png)

## Rollup构建
`Vue.js`通过`rollup`构建工具进行构建，它是一个类似于`webpack`的打包工具，区别于`webpack`它更适合一个`Library`库的打包。在学习`Vue.js`源码之前，我们有必要知道`Vue.js`是如何构建不同版本的。

### Rollup基础知识
#### 核心概念
同`webpack`一样，`rollup`也有以下几大核心概念：
* `input`：入口文件，类比于`webpack`的`entry`，它指明了我们库文件入口位置。
* `output`：输出位置，它指明了打包后的输出信息，包括：输出目录，打包文件名等。
* `plugins`：插件，`rollup`在构建过程中，插件可提供一些辅助功能，例如：`alias`别名解析、转义`ES6`等。
* `external`：当我们的库依赖于其它第三方库时，我们不需要把这些第三方库一起打包，而是应该把依赖写在`external`里面。

同`webpack`一样，`rollup`同样适合使用配置文件的做法来配置打包的选项，例如：
```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' }
  ]
}
```

构建版本说明：
* `umd`：此选项构建出来的库文件主要适用于`Web`端，可以通过不同的方式去使用：`script`标签引入，`ES Module`规范引入和`CommonJs`规范引入等。
* `cjs`: 此选项构建出来的库文件主要为`CommonJs`规范，可在`Node`环境中使用。
* `es`：此版本构建出来的库文件主要为`ES Module`规范，可在支持`ES Module`也就是`import/export`的环境中使用。

有了以上配置文件，我们可以在`package.json`中进行如下修改：
```json
{
  "name": "Vue",
  "version": "1.0.0",
  "scripts": {
    "dev": "rollup -w -c scripts/rollup.config.dev.js",
    "build": "rollup -c scripts/rollup.config.prod.js"
  }
}
```

参数说明：
* `-c`：为`--config`的缩写，表示设置`rollup`打包的配置。
* `-w`：为`--watch`的缩写，在本地开发环境添加`-w`参数可以监控源文件的变化，自动重新打包。
#### 常用插件
`rollup`并不像`webpack`那样强大，它需要和其它插件配合使用才能完成特定的功能，常用的插件有：
* `@rollup/plugin-json`： 支持从`.json`读取信息，配合`rollup`的`Tree Shaking`可只打包`.json`文件中我们用到的部分。
* `@rollup/plugin-commonjs`：将`CommonJs`规范的模块转换为`ES6`提供`rollup`使用。
* `@rollup/plugin-node-resolve`：与`@rollup/plugin-commonjs`插件一起使用，配合以后就可以使用`node_modules`下的第三方模块代码了。
* `@rollup/plugin-babel`：把`ES6`代码转义成`ES5`代码，需要同时安装`@babel/core`和`@babel/preset-env`插件。注意：如果使用了高于`ES6`标准的语法，例如`async/await`，则需要进行额外的配置。
* `rollup-plugin-terser`：代码压缩插件，另外一种方案是`rollup-plugin-uglify` + `uglify-es`进行代码压缩，不过更推荐第一种方案。

以上插件使用方式如下：
```js
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const config =  {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue', exports: 'auto' }
  ],
  plugins: [
    json(),
    resolve(),
    babel(),
    commonjs(),
    terser()
  ]
}

export default config
```
#### 区分生产环境和开发环境
正如你在上面看到的那样，我们可以像`webpack`一样进行开发环境和生产环境的配置区分，我们把和`rollup`构建相关的文件都放在`scripts`目录下：
```sh
|-- scripts
|   |-- rollup.config.base.js      # 公共配置
|   |-- rollup.config.dev.js       # 开发环境配置
|   |-- rollup.config.prod.js      # 生产环境配置
```

根据我们的拆分逻辑，`rollup.config.base.js`代码如下：
```js
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const config =  {
  input: 'src/index.js',
  plugins: [
    json(),
    resolve(),
    babel(),
    commonjs()
  ]
}

export default config
```

`rollup.config.dev.js`代码如下：
```js
import baseConfig from './rollup.config.base.js'
import serve from 'rollup-plugin-serve'
import { name } from '../package.json'

const config =  {
  ...baseConfig,
  output: [
    { file: 'dist/vue.js', format: 'umd', name },
    { file: 'dist/vue.common.js', format: 'cjs', name, exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name, exports: 'default' }
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      port: '4300',
      openPage: '/example/index.html',
      contentBase: ''
    })
  ]
}
export default config
```
配置说明：本地开发环境下，我们可以有选择的添加`rollup-plugin-serve`插件，它类似于`webpack-dev-server`，能在开发环境下起一个服务方便我们进行开发和代码调试。

`rollup.config.prod.js`代码如下：
```js
import baseConfig from './rollup.config.base.js'
import { terser } from 'rollup-plugin-terser'
import { name } from '../package.json'
const config =  {
  ...baseConfig,
  output: [
    { file: 'dist/vue.min.js', format: 'umd', name },
    { file: 'dist/vue.common.min.js', format: 'cjs', name, exports: 'auto' },
    { file: 'dist/vue.esm.min.js', format: 'es', name, exports: 'default' }
  ],
  plugins: [
    ...baseConfig.plugins,
    terser()
  ]
}

export default config
```
配置说明：生产环境下，我们需要对代码进行压缩处理，对`ES Module`，`CommonJs`和`UMD`等规范分别生成其对应的压缩文件。

分别运行`npm run dev`和`npm run build`之后，我们可以得到如下的目录：
```sh
|-- dist
|   |-- vue.js            # UMD未压缩版本
|   |-- vue.min.js        # UMD压缩版本
|   |-- vue.esm.js        # ES Module未压缩版本
|   |-- vue.esm.min.js    # ES Module压缩版本
|   |-- vue.common.js     # CommonJs未压缩版本
|   |-- vue.common.min.js # CommonJs压缩版本
```

最后，如果我们像`Vue.js`一样构建的是一个库文件，那么我们还需要在`package.json`进行如下配置：
```json
{
  "main": "dist/vue.common.js",
  "module": "dist/vue.esm.js"
}
```



### Vue中的Rollup构建
在阅读`Vue.js`源码时，我们首先应该去看其`package.json`文件内容，在`Vue.js`项目中其精简掉与`compiler`、`weex`和`ssr`相关的内容以后，如下所示：
```json
{
  "name": "vue",
  "version": "2.6.11",
  "main": "dist/vue.runtime.common.js",
  "module": "dist/vue.runtime.esm.js",
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "build": "node scripts/build.js"
  }
}
```
我们可以从上面很容易的发现，其精简后的内容和我们在`rollup`基础知识里面的配置十分相似，其构建脚本同样放置在`scripts`目录下。在`scripts`目录下，我们需要重点关注下面几个文件：
* `alias.js`：与`rollup`构建别名相关的配置。
* `config.js`：与`rollup`构建不同版本相关的代码。
* `build.js`：`rollup`构建不同压缩版本`Vue.js`文件相关代码。

#### alias别名
我们在开发`Vue`应用时，经常会用到`@`别名，其中`@`代表`src`目录：
```js
// 使用别名
import HelloWorld from '@/components/HelloWorld.vue'

// 相当于
import HelloWorld from 'src/components/HelloWorld.vue'
```

在`scripts/alias.js`中，我们可以发现其别名配置代码如下：
```js
const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
```
以`core`别名为例，在`Vue.js`源码中，我们通过别名进行如下引入：
```js
// 使用core别名
import Vue from 'core/instance/index.js'

// 相当于
import Vue from 'src/core/instance/index.js'
```

其中`alias.js`文件是在`config.js`中引入并使用的：
```js
// config.js文件
import alias from 'rollup-plugin-alias'
import aliases from './alias.js'

function genConfig () {
  const config = {
    plugins: [
      alias(Object.assign({}, aliases))
    ])
  }
  return config
}
```

**注意**：由于`Vue.js`中使用`rollup`主版本以及其周边插件的版本较低，如果你使用了最新的`rollup`版本或者其周边的插件，需要按照最新插件的配置要求来，这里以最新的`@rollup/plugin-alias`插件为例：
```js
const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = [
  { file: 'vue', replacement: resolve('src/platforms/web/entry-runtime-with-compiler') },
  { file: 'compiler', replacement: resolve('src/compiler') },
  { file: 'core', replacement: resolve('src/core') },
  { file: 'shared', replacement: resolve('src/shared') },
  { file: 'web', replacement: resolve('src/platforms/web' },
  { file: 'weex', replacement: resolve('src/platforms/weex') },
  { file: 'server', replacement: resolve('src/server') },
  { file: 'sfc', replacement: resolve('src/sfc') }
]
```
其在`config.js`新的使用方式同样需要做调整，如下：
```js
// config.js文件
import alias from '@rollup/plugin-alias'
import aliases from './alias.js'

function genConfig () {
  const config = {
    plugins: [
      alias({ entries: aliases })
    ])
  }
  return config
}
```

#### config.js
首先我们从`package.json`打包命令中可以看到，在`development`环境下它通过`-c`指定了`rollup`的配置文件，所以会使用到`scripts/config.js`文件，并且打包命令还提供了一个叫做`TARGET`的环境变量：
```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
  }
}
```
那么在`scripts/config.js`文件下，我们可以看到它是通过`module.exports`导出的一个对象：
```js
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
  return config
}
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
```
在以上代码中，我们可以看到`module.exports`导出的对象，主要是通过`genConfig()`函数返回的，其中这个函数接受的参数正是我们在打包命令中提供的环境变量`TARGET`。我们再来粗略的看一下`genConfig()`函数，它的主要作用依然是生成`rollup`几大核心配置，然后返回配置完毕后的对象。

我们再来看一个叫做`builds`的对象，由于在源码中它的内容非常多，为了节省篇幅我们精简后其代码如下：
```js
const builds = {
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production'
  },
  // Runtime+compiler ES modules build (for bundlers)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es'
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development'
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production'
  }
}
```
我们可以发现它的键名正好是我们打包命令中提供的环境变量`TARGET`的值，这里以`web-full-dev`为例，它通过`web-full-dev`这个键可以得到一个对象：
```js
{
  entry: resolve('web/entry-runtime-with-compiler.js'),
  dest: resolve('dist/vue.js'),
  format: 'umd',
  env: 'development'
}
```
然后配合`resolve`函数和上面我们已经提到过的别名配置，就可以构造下面这样的`rollup`配置对象：
```js
{
  // 省略其它
  input: 'src/platforms/web/entry-runtime-with-compiler.js',
  output: {
    dest: 'dist/vue.js',
    format: 'umd',
    name: 'Vue'
  }
}
```


#### build.js
`srcipts/build.js`文件的作用就是通过配置然后生成不同版本的压缩文件，其中它获取配置的方式同样是在`scripts/config.js`文件中，其中关键代码为：
```js
// config.js中导出
exports.getAllBuilds = () => Object.keys(builds).map(genConfig)

// build.js中引入
let builds = require('./config').getAllBuilds()
```

## 从入口到Vue构造函数整体流程

在之前的介绍中，我们知道`Vue.js`内部会根据`Web浏览器`、`Weex`跨平台和`SSR服务端渲染`不同的环境寻找不同的入口文件，但其核心代码是在`src/core`目录下，我们这一节的主要目的是为了搞清楚从入口文件到`Vue`构造函数执行，这期间的整体流程。

### initGlobalAPI流程
我们会在`src/core/index.js`文件中看到如下精简代码：
```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
initGlobalAPI(Vue)

export default Vue
```
在以上代码中，我们发现它引入了`Vue`随后调用了`initGlobalAPI()`函数，此函数的作用是挂载一些全局`API`方法。

![initGlobalAPI](../images/vueAnalysis/initGlobalAPI.png)

我们首先能在`src/core/global-api`文件夹下看到如下目录结构：
```sh
|-- global-api        
|   |-- index.js      # 入口文件
|   |-- assets.js     # 挂载filter、component和directive
|   |-- extend.js     # 挂载extend方法
|   |-- mixin.js      # 挂载mixin方法
|   |-- use.js        # 挂载use方法
```

随后在`index.js`入口文件中，我们能看到如下精简代码：
```js
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { observe } from 'core/observer/index'
import { extend, nextTick } from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.observable = (obj) => {
    observe(obj)
    return obj
  }

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```
我们能从以上代码很清晰的看到在`index.js`入口文件中，会在`Vue`构造函数上挂载各种全局`API`函数，其中`set`、`delete`、`nextTick`和`observable`直接赋值为一个函数，而其他几种`API`则是调用了一个以`init`开头的方法，我们以`initAssetRegisters()`方法为例，它的精简代码如下：
```js
// ['component','directive', 'filter']
import { ASSET_TYPES } from 'shared/constants'

export function initAssetRegisters (Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function () {
      // 省略了函数的参数和函数实现代码
    }
  })
}
```
其中`ASSET_TYPES`是一个定义在`src/shared/constants.js`中的一个数组，然后在`initAssetRegisters()`方法中遍历这个数组，依次在`Vue`构造函数上挂载`Vue.component()`、`Vue.directive()`和`Vue.directive()`方法，另外三种`init`开头的方法调用挂载对应的全局`API`是一样的道理：
```js
// initUse
export function initUse(Vue) {
  Vue.use = function () {}
}

// initMixin
export function initMixin(Vue) {
  Vue.mixin = function () {}
}

// initExtend
export function initExtend(Vue) {
  Vue.extend = function () {}
}
```

最后，我们发现还差一个`Vue.compile()`方法，它其实是在`runtime+compile`版本才会有的一个全局方法，因此它在`src/platforms/web/entry-runtime-with-compile.js`中被定义：
```js
import Vue from './runtime/index'
import { compileToFunctions } from './compiler/index'
Vue.compile = compileToFunctions
export default Vue
```

因此我们根据`initGlobalAPI()`方法的逻辑，可以得到如下流程图：
![initGlobalAPI流程图](../images/vueAnalysis/initGlobalAPIProcess.png)


### initMixin流程
在上一节我们讲到了`initGlobalAPI`的整体流程，这一节，我们来介绍`initMixin`的整体流程。首选，我们把目光回到`src/core/index.js`文件中：
```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
initGlobalAPI(Vue)

export default Vue
```
我们发现，它从别的模块中引入了大`Vue`，那么接下来我们的首要任务就是揭开`Vue`构造函数的神秘面纱。

在看`src/core/instance/index.js`代码之前，我们发现`instance`目录结构如下：
```sh
|-- instance
|   |-- render-helpers      # render渲染相关的工具函数目录
|   |-- events.js           # 事件处理相关
|   |-- init.js             # _init等方法相关
|   |-- inject.js           # inject和provide相关
|   |-- lifecycle.js        # 生命周期相关
|   |-- proxy.js            # 代理相关
|   |-- render.js           # 渲染相关
|   |-- state.js            # 数据状态相关
|   |-- index.js            # 入口文件
```

可以看到，目录结构文件有很多，而且包含的面也非常杂，但我们现在只需要对我们最关心的几个部分做介绍：
* `events.js`：处理事件相关，例如：`$on`，`$off`，`$emit`以及`$once`等方法的实现。
* `init.js`：此部分代码逻辑包含了`Vue`从创建实例到实例挂载阶段的所有主要逻辑。
* `lifecycle.js`：生命周期相关，例如：`$destroy`、`$activated`和`$deactivated`。
* `state.js`：数据状态相关，例如：`data`、`props`以及`computed`等。
* `render.js`：渲染相关，其中最值得关注的是`Vue.prototype._render`渲染函数的定义。

在介绍了`instance`目录结构的及其各自的作用以后，我们再来看入口文件，其实入口文件这里才是`Vue`构造函数庐山真面目：
```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

代码分析：
* `Vue`构造函数其实就是一个普通的函数，我们只能通过`new`操作符进行访问，既`new Vue()`的形式，`Vue`函数内部也使用了`instanceof`操作符来判断实例的父类是否为`Vue`构造函数，不是的话则在开发环境下输出一个警告信息。
* 除了声明`Vue`构造函数，这部分的代码也调用了几种`mixin`方法，其中每种`mixin`方法各司其职，处理不同的内容。

从以上代码中，我们能得到`src/core/instance/index.js`文件非常直观的代码逻辑流程图：

![instance流程](../images/vueAnalysis/instance.png)

接下来我们的首要任务是弄清楚`_init()`函数的代码逻辑以及`initMixin`的整体流程。我们从上面的代码发现，在构造函数内部会调用`this._init()`方法，也就是说：
```js
// 实例化时，会调用this._init()方法。
new Vue({
  data: {
    msg: 'Hello, Vue.js'
  }
})
```

然后，我们在`init.js`中来看`initMixin()`方法是如何被定义的：
```js
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    // 省略代码
  }
}
```
我们可以发现，`initMixin()`方法的主要作用就是在`Vue.prototype`上定义一个`_init()`实例方法，接下来我们来看一下`_init()`函数的具体实现逻辑：
```js
Vue.prototype._init = function (options) {
    const vm = this
    // 1. 合并配置
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    // 2.render代理
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    // 3.初始化生命周期、初始化事件中心、初始化inject，初始化state、初始化provide、调用生命周期
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

    // 4.挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```
因为我们是要分析`initMixin`整体流程，对于其中某些方法的具体实现逻辑会在后续进行详细的说明，因此我们可以从以上代码得到`initMixin`的整体流程图。
<div style="text-align: center">
  <img src="../images/vueAnalysis/initMixin.png" alt="initMixin流程" />
</div>


### stateMixin流程

### eventsMixin流程

### lifecycleMixin流程

### renderMixin流程



## 深入响应式原理
### Object变化侦测
### Array变化侦测
### 变化侦测注意事项
### 变化侦测相关API实现




## 虚拟DOM和VNode介绍
### 虚拟DOM介绍
### VNode介绍



## 组件化
### 组件生成createComponent
### 合并策略
### 生命周期
### 组件注册
### 异步组件
### patch派发更新



## 编译原理
### 解析器parse
### 优化器optimize
### 代码生成器codegen


## 扩展
### 生命周期
### 指令
### 过滤器
### v-model
### 插槽
### event事件中心
### 内置组件


## 第三方插件
### VueRouter
### Vuex