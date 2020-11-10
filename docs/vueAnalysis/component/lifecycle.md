# 组件生命周期
在介绍完组件`patch`章节后，从`new Vue`实例化到最终渲染成真实`DOM`到视图的主线过程我们已经介绍完毕了，那么我们回顾一下这个过程，再看组件生命周期，在`Vue.js`官网中有这样一张组件生命周期流程图。

<div style="text-align: center">
  <img src="https://cn.vuejs.org/images/lifecycle.png" alt="组件生命周期">
</div>

## callhook
在介绍生命周期函数之前，我们先来看一下`callHook`方法的实现，它是定义在`src/core/instance/lifecycle.js`文件中的一个方法，其代码如下：
```js
export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```
代码分析：
* 我们可以看到在`for`遍历之前，使用了`pushTarget`，在遍历之后使用了`popTarget`。`pushTarget`和`popTarget`在之前的章节中我们介绍过，这里主要提一个[issue 7573](https://github.com/vuejs/vue/issues/7573)，你在这个`issue`上面可以看到为什么要添加这两段代码。
* 通过在`this.$options`对象上拿到`hook`参数对应`callback`数组，然后使用`for`循环遍历，在每个循环中通过`invokeWithErrorHandling`来触发回调函数。`invokeWithErrorHandling`方法是定义在`src/core/util/error.js`文件中的一个方法，其代码如下：
```js
export function invokeWithErrorHandling (
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}
```
我们可以看到`invokeWithErrorHandling`方法的代码不是很多，核心就是下面这段代码，其它属于异常处理。
```js
res = args ? handler.apply(context, args) : handler.call(context)
```
* 在`for`循环遍历之后，它判断了`vm._hasHookEvent`，你可能会很好奇这个内部属性在哪里定义的？是做什么的？在`initEvents`方法中，首先默认设置这个属性为`false`，代码如下：
```js
export function initEvents (vm: Component) {
  // ...
  vm._hasHookEvent = false
  // ...
}
```
在事件中心`$on`方法中，它根据正则条件判断，如果判断为真则赋值为`true`，代码如下：
```js
Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
  const vm: Component = this
  if (Array.isArray(event)) {
    for (let i = 0, l = event.length; i < l; i++) {
      vm.$on(event[i], fn)
    }
  } else {
    (vm._events[event] || (vm._events[event] = [])).push(fn)
    // optimize hook:event cost by using a boolean flag marked at registration
    // instead of a hash lookup
    if (hookRE.test(event)) {
      vm._hasHookEvent = true
    }
  }
  return vm
}
```
当`_hasHookEvent`属性为真，组件会触发对应的生命周期钩子函数，那么我们可以利用这个功能做两件事情：**监听子组件生命周期**和**监听组件自身生命周期**。

假设我们有如下组件：
```vue
<template>
  <div id="app">
    <hello-world @hook:created="handleChildCreated" :msg="msg" />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'message'
    }
  },
  methods: {
    handleChildCreated () {
      console.log('child created hook callback')
    }
  },
  created () {
    const listenResize = () => {
      console.log('window resize callback')
    }
    window.addEventListener('resize', listenResize)
    this.$on('hook:destroyed', () => {
      window.removeEventListener('resize', listenResize)
    })
  }
}
</script>
```
代码分析：
* 在`template`模板中，我们可以使用`@hook:xxx`的形式来监听子组件对应的生命周期，当对应的生命周期函数被触发的时候，会执行我们提供的回调函数，这种做法对于需要监听子组件某个生命周期的需求来说十分有用。
* 在撰写`Vue`应用的时候，我们经常需要在`created/mounted`等生命周期中监听`resize/scroll`等事件，然后在`beforeDestroy/destroyed`生命周期中移除。对于这种需求，我们可以把逻辑写在同一个地方，而不是分散在两个生命周期中，这对于需要监听自身生命周期的需要来说也十分有用。

## 生命周期
我们先来看`beforeCreate`和`created`这一对钩子函数，它们是在`this._init`方法中被触发的：
```js
Vue.prototype._init = function () {
  // ...
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
  // ...
}
```
