# 设计

## 源码目录设计
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
* `packages`：`Vue.js`衍生的其它`npm`包，它们在`Vue`构建时自动从源码中生成并且始终和`Vue.js`保持相同的版本，主要是`vue-server-renderer`和`vue-template-compiler`这两个包，其中最后一个包在我们使用脚手架生成项目，也就是使用`.vue`文件开发`Vue`项目时会使用到这个包(`vue-loader`)。
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


## 架构设计
我们通过以上目录结构可以很容易的发现，`Vue.js`整体分为三个部分：**核心代码**、**跨平台相关**和**公共工具函数**。

同时其架构是分层的，最底层是一个构造函数(普通的函数)，最上层是一个入口，也就是将一个完整的构造函数导出给用户使用。在中间层，我们需要逐渐添加一些方法和属性，主要是原型`prototype`相关和全局API相关。

![Vue架构设计](../../images/vueAnalysis/composition.png)
