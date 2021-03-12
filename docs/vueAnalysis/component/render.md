# render和renderProxy
介绍完`$mount`后，我们来看一下`render`以及`renderProxy`相关的逻辑，这一节的主要目标是：弄清楚`renderProxy`的作用以及`render`的实现原理。

## renderProxy
我们在之前介绍的`initMixin`方法中，有下面这样一段代码：
```js
import { initProxy } from './proxy'
export default initMixin (Vue) {
  Vue.prototype._init = function () {
    // ...
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // ...
  }
}
```
`initProxy`是定义在`src/core/instance/proxy.js`文件中的一个方法，其代码如下：
```js
let initProxy
initProxy = function initProxy (vm) {
  if (hasProxy) {
    // determine which proxy handler to use
    const options = vm.$options
    const handlers = options.render && options.render._withStripped
      ? getHandler
      : hasHandler
    vm._renderProxy = new Proxy(vm, handlers)
  } else {
    vm._renderProxy = vm
  }
}
```
代码分析：

* 这个方法首先判断了当前环境是否支持原生`Proxy`，如果支持则创建一个`Proxy`代理，其中`hasProxy`是一个`boolean`值，它的实现逻辑如下：
```js
const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy)
```
* 然后根据`options.render`和`options.render._withStripped`的值来选择使用`getHandler`还是`hasHandler`，当使用`vue-loader`解析`.vue`文件时，这个时候`options.render._withStripped`为真值，因此选用`getHandler`。当选择使用`compiler`版本的`Vue.js`时，我们的入口文件中根实例是这样定义的:
```js
import Vue from 'vue'
import App from './App'
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
这个时候，对于根实例而言其`options.render._withStripped`为`undefined`，因此使用`hasHandler`。在搞清楚什么时候使用`getHandler`和`hasHandler`后，我们可能会有另外的问题：
`getHandler`和`hasHandler`是干什么的？怎么触发？

在回答第一个问题之前，我们先来看一下`getHandler`和`hasHandler`的定义：
```js
const allowedGlobals = makeMap(
  'Infinity,undefined,NaN,isFinite,isNaN,' +
  'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
  'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
  'require' // for Webpack/Browserify
)

const warnNonPresent = (target, key) => {
  warn(
    `Property or method "${key}" is not defined on the instance but ` +
    'referenced during render. Make sure that this property is reactive, ' +
    'either in the data option, or for class-based components, by ' +
    'initializing the property. ' +
    'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
    target
  )
}

const warnReservedPrefix = (target, key) => {
  warn(
    `Property "${key}" must be accessed with "$data.${key}" because ` +
    'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
    'prevent conflicts with Vue internals. ' +
    'See: https://vuejs.org/v2/api/#data',
    target
  )
}

const hasHandler = {
  has (target, key) {
    const has = key in target
    const isAllowed = allowedGlobals(key) ||
      (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data))
    if (!has && !isAllowed) {
      if (key in target.$data) warnReservedPrefix(target, key)
      else warnNonPresent(target, key)
    }
    return has || !isAllowed
  }
}

const getHandler = {
  get (target, key) {
    if (typeof key === 'string' && !(key in target)) {
      if (key in target.$data) warnReservedPrefix(target, key)
      else warnNonPresent(target, key)
    }
    return target[key]
  }
}
```
我们可以看到，`getHandler`和`hasHandler`所做的事情几乎差不多，都是**在渲染阶段对不合法的数据做判断和处理**。对于`warnNonPresent`而言，它提示我们在模板中使用了未定义的变量；对于`warnReservedPrefix`而言，它提示我们不能定义带`$`或者`_`开头的变量，因为这样容易和一些内部的属性相互混淆。
```vue
<template>
  {{msg1}}
  {{$age}}
</template>
<script>
// msg1报错
// $age报错
export default {
  data () {
    return {
      msg: 'message',
      $age: 23
    }
  }
}
</script>
```
紧接着，我们第二个问题：`getHandler`和`hasHandler`如何触发？这其实涉及到一点`ES6 Proxy`方面的知识，我们以下面这段代码为例来进行说明：
```js
const obj = {
  a: 1,
  b: 2,
  c: 3
}
const proxy = new Proxy(obj, {
  has (target, key) {
    console.log(key)
    return key in target
  },
  get (target, key) {
    console.log(key)
    return target[key]
  }
})

// 触发getHandler，输出a
proxy.a 

// 触发hasHandler，输出 b c
with(proxy){
  const d = b + c
}
```
在以上代码中，我们定义了一个`proxy`代理，当我们访问`proxy.a`的时候，根据`Proxy`相关的知识会触发`getHandler`，因此会输出`a`。当我们使用`with`访问`proxy`的时候，在其中任何属性的访问都会触发`hasHandler`，因此会输出`b`和`c`。

在以上代码分析完毕后，我们就可以对`initProxy`的作用进行一个总结：**在渲染阶段对不合法的数据做判断和处理**。

## render
在之前的代码中，我们在`mountComponent`中遇到过下面这样一段代码：
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```
在这一节，我们来分析一下`_render`函数的实现，它其实是在`src/core/instance/render.js`文件中被定义：
```js
export function renderMixin (Vue) {
  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options
    // ...省略代码
    let vnode
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
    }
    // ...省略代码
    vnode.parent = _parentVnode
    return vnode
  }
}
```
其中通过`$options`解构出来的`render`，就是我们实例化的时候提供的`render`选择或者通过`template`编译好的`render`函数。在`_render`代码中，最重要的一步是`render.call`函数的调用，`render`函数执行后会返回`VNode`，`VNode`会在之后的处理过程中使用到。

我们在`render.call`方法调用的时候，除了传递我们的`renderProxy`代理，还传递了一个`$createElement`函数，其中这个函数是在`initRender`方法中被定义：
```js
export function initRender (vm) {
  // ...省略代码
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
  // ...省略代码
}
```
我们发现，`vm.$createElement`和`vm._c`的函数定义是差不多的，唯一的区别是在调用`createElement`方法的时候，传递的最后一个参数不相同。`$createElement`和`_c`方法虽然方法定义差不多，但使用场景是不一样的，`$createElement`通常是用户手动提供的`render`来使用，而`_c`方法通常是模板编译生成的`render`来使用的。

根据`render`函数的定义，我们可以把`template`例子改写成使用`render`的形式：
```vue
<template>
  <div id="app">
    {{msg}}
  </div>
</template>
<script>
export default () {
  data () {
    return {
      msg: 'message'
    }
  }
}
</script>
```
`render`改写后：
```js
export default {
  data () {
    return {
      msg: 'message'
    }
  },
  render: ($createElement) {
    return  $createElement('div', {
      attrs: {
        id: 'app'
      }
    }, this.message)
  }
}
```
在这一小节，我们分析了`render`的实现，在下一小节我们将深入学习`createElement`方法的实现原理。