---
sidebar: auto
---

# Vue2.0源码分析

## 源码目录设计
```sh
|-- src
|   |-- compiler      # 编译相关
|   |-- core          # 核心代码
|   |-- platforms     # 跨平台支持
|   |-- server        # 服务端渲染
|   |-- sfc           # .vue文件解析
|   |-- shared        # 工具函数
```

### Compiler
`compiler`目录包含了`Vue.js`编译相关的代码，它包括：模板编译成AST抽象语法树、AST抽象语法树优化、代码生成等。

编译的工作可以在构建时做`runtime-only`版本，借助`webpack`和`vue-loader`等工具或插件。也可以再运行时做，使用包含构建功能的`runtime + compiler`版本。显然，编译是一项比较消耗性能的工作，所以我们日常的开发中，更推荐使用`runtime-only`的版本开发(体积也更小)，也就是通过`.vue`文件的形式开发，而不是通过如下的方式：
```js
const myComponent = {
  template: '<div>hello,world</div>'
}
```
### Core
`core`目录包含了`Vue.js`的核心代码，包括：内置组件、全局API、Vue实例化、观察者、虚拟DOM、响应式和工具函数等。
### Platform
`Vue.js`是一个跨平台的`MVVM`框架。在`React`中，有`React Native`跨平台客户端，而在`Vue`中其对应的跨平台就是`Weex`。`platform`有2个目录：
```js
|-- platform
|   |-- web      # web平台浏览器端
|   |-- weex     # native客户端
```
### Server
`Vue.js2.0`开始就支持了服务端渲染，所有跟服务端渲染相关的代码都在`server`目录下，此部分代码是运行在服务端，而非Web浏览器端。
### Sfc
通常来说，我们开发`Vue`应用是借助了`Webpack`等工具的构建，然后通过`.vue`单文件来编写组件，而`vue-loader`就是专门用来解析`.vue`文件的。这个目录下的代码，只要作用是把`.vue`文件解析成一个`JavaScript`对象。
### Shared
此目录下存放了一些在Web浏览器端和服务端都会用到的共享代码。


## 初始化实例
