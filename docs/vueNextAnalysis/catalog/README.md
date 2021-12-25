# 源码目录
因为`Vue3`采用`Monorepo`进行项目代码管理，所以我们着重关注`packages`目录，其中比较关键的几个`package`如下：
```sh
|-- packages            
|   |-- compiler-core
|   |-- compiler-dom
|   |-- compiler-sfc
|   |-- compiler-ssr
|   |-- reactivity
|   |-- runtime-core
|   |-- runtime-dom
|   |-- vue
```
`package`功能介绍：
* `compiler-core`：跟环境无关的公共编译模块。
* `compiler-dom`：针对`web`浏览器端编译模块。
* `compiler-sfc`：`.vue`单文件解析模块，我们比较熟悉的`vue-loader`打包插件会使用到它。
* `compiler-ssr`: 服务端渲染相关的编译模块。
* `reactivity`：响应式模块，例如`ref`和`reactive`都定义在此模块中。
* `runtime-core`：跟环境无关的公共运行时模块。
* `runtime-dom`：针对`web`浏览器端的运行时模块。
* `vue`: 集合几乎所有模块为一身的完整包。