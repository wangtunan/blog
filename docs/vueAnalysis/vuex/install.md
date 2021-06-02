# Vuex安装

由于`Vuex`也属于`Vue`的插件，因此我们在使用`Vuex`的时候，需要使用`Vue.use()`方法进行注册。

在`store.js`中其代码如下：
```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```
根据`Vue`插件机制原理，插件需要提供一个`install`方法，在`Vuex`源码中，`install`的代码路径为`src/store.js`，其实现代码如下：
```js
import applyMixin from './mixin'

let Vue
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

在这个方法中，它所做的事情很简单，第一个就是把我们传递的`Vue`实例缓存起来，以方便后续实例化`Store`的时候使用。第二件事情就是调用`applyMixin`方法，此方法代码路径为`src/mixin.js`。
```js
// mixin.js文件
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // 省略Vue1.0+版本逻辑
  }
}
```
因为我们`Vue`源码分析是基于`Vue2.6.11`，因此我们省略关于`else`分支的逻辑。

当`Vue`的版本高于`2.0`时，它会调用`Vue.mixin()`方法全局混入一个`beforeCreate`生命周期，当`beforeCreate`生命周期执行的时候，会调用`vuexInit`，其代码如下：
```js
// vuexInit中的this代表当前Vue实例
function vuexInit () {
  const options = this.$options
  // store injection
  if (options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
```

在入口`main.js`文件中，我们有这样一段代码：
```js
// main.js
import store from './store'

new Vue({
  el: '#app',
  store
})
```
我们在`vuexInit`方法中拿到的`options.store`就是我们传入的`store`，我们再来把目光跳转到`store.js`文件中，其代码如下：
```js
// store.js
import Vuex from 'vuex'

export default new Vuex.Store({})
```
原来我们在根实例中传递的是一个`Store`实例，这样我们就明白了`vuexInit`方法的主要作用了：**给每一个Vue实例都赋值一个$store属性。**

这样，我们在组件中就不用去手动引入`store`了，而是可以直接使用`$store`，例如：
```html
<template>
  <div>{{$store.state.xxx}}</div>
</template>
```