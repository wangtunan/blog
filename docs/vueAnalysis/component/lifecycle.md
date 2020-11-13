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

### beforeCreate和created
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
在`beforeCreate`和`created`生命周期中间，它调用了三个方法，这几个方法是用来初始化`inject`、`data`、`props`、`methods`、`computed`、`watch`以及`provide`等这些配置选项的。那么我们可以得出一个结论，以上这些属性我们只有在`created`中才可以访问到，在`beforeCreate`中访问不到，因为还没有初始化。

### beforeMount和mounted
在前面介绍`$mount`方法的时候，我们提到过`beforeMount`和`mounted`这两个方法，它们是在`mountComponent`中被触发的，代码如下：
```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  // ...
  callHook(vm, 'beforeMount')
  let updateComponent
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    // ...
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }
  // ...
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```
我们可以看到，在`mountComponent`方法的最前面，它首先调用了`beforeMount`方法，然后开始执行`vm._update()`，这个方法在组件首次渲染和派发更新时递归渲染父子组件的时候被调用。

在渲染完毕后，它判断了`vm.$vode == null`，如果条件满足才会触发`mounted`方法。你可能会很奇怪为什么这样做？在之前介绍`update/path`章节的时候，我们提到过一对父子关系：`vm._vnode`和`vm.$vnode`，其中`vm.$vnode`表示父级的`vnode`。那么什么时候`vm.$vnode`会为`null`呢？答案是只有根实例，因为只有根实例才会满足这个条件，也就是说这里触发的是根实例的`mounted`方法，而不是组件的`mounted`方法。

根据`beforeMount`和`mounted`的调用时机，我们可以知道：`beforeMount`生命周期是在`vm._update()`之前调用的，因此在这个生命周期的时候，我们还无法获取到正确的`DOM`。而`mounted`生命周期是在`vm._update()`方法之后执行的，所以我们可以在这个生命周期获取到正确的`DOM`。

在`patch`的时候，我们提到过`VNode`有一些钩子函数，我们来回顾一下：
```js
const componentVNodeHooks = {
  init: function () {},
  prepatch: function () {},
  insert: function (vnode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    // ...
  },
  destroy: function () {}
}
```
其中，在`insert`钩子函数被触发的时候，它也触发了其组件的`mounted`方法，因此组件的`mounted`生命周期是在`VNode`触发`insert`钩子函数的时候被调用的。


### beforeUpdate和updated
`beforeUpdate`和`updated`这一对生命周期钩子函数，是在派发更新的过程中被触发的。我们回顾一下依赖收集/派发更新这两个小节的内容，当某个响应式变量值更新的时候，会触发`setter`。
```js
Object.defineProperty(obj, key {
  set: function reactiveSetter (newVal) {
    // ...
    dep.notify()
  }
})
```
在`setter`中会调用`dep.notify()`方法，去通知观察者更新，在`notify`实现方法中，它遍历了其`subs`数组，然后依次调用`update()`方法。
```js
export default class Dep {
  // ...
  notify () {
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```
这些`Watcher`实例的`update`最后会走到`flushSchedulerQueue`方法，在这个方法中会调用一个`callUpdatedHooks`方法
```js
function flushSchedulerQueue () {
  // ...
  callUpdatedHooks(updatedQueue)
}
function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated')
    }
  }
}
```
在`callUpdatedHooks`这个方法里面，它会遍历`queue`的`Watcher`实例队列，在每个遍历的过程中，会触发`vm`的`updated`方法。当`updated`钩子函数被触发后，就代表派发更新阶段已经完成。 

以上是对`updated`钩子函数的介绍，那么`beforeUpdate`呢，其实它是在实例化`render watcher`的时候被处理的。
```js
export function mountComponent () {
  // ...
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
}
```
我们可以看到，在实例化`render watcher`的时候，它给第四个参数传对象递了一个`before`属性，这个属性会被赋值到`Watcher`实例的`before`属性上。然后在`flushSchedulerQueue`方法遍历`queue`队列的时候，它首先判断了`watcher.before`是否存在，存在则调用这这个方法。
```js
function flushSchedulerQueue () {
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    // ...
  }
  // ...
  callUpdatedHooks(updatedQueue)
}
```

### beforeDestroy和destroyed
无论是`beforeDestroy`还是`destroyed`生命周期，都是在`vm.$destroy`实例方法中被触发的，这个方法它是在`lifecycleMixin`中被定义的，其代码如下：
```js
export function lifecycleMixin (Vue) {
  // ..
  Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // fire destroyed hook
    callHook(vm, 'destroyed')
    // turn off all instance listeners.
    vm.$off()
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
}
```
我们可以看到，在`$destroy`方法的最开始，它首先触发了`beforeDestroy`生命周期，随后又处理了一些其它操作：**在父组件的$children移除自身**、**移除自身依赖**、**触发子组件销毁动作**以及**移除事件监听**等。

接下来，我们以上面这几个步骤来说明：
* **在父组件的$children移除自身**：当某个组件销毁的时候，我们需要从其父组件的`$children`列表中移除自身，以下面代码为例：
```vue
<template>
  <div class="parent">
    <child-component />
  </div>
</template>
```
在`ChildComponent`组件销毁之前，`ParentComponent`组件的`$children`数组保存了其引用关系，当`ChildComponent`销毁的时候，为了正确保持这种引用关系，我们需要从`$children`列表中移除。
```js
// 展示使用，实际为vm实例
// 移除前
const $children = ['child-component', ...]

// 移除后
const $children = [...]
```
* **移除自身依赖**：在之前，我们提到过`vm._watchers`维护了一份观察者数组，它们都是`Watcher`实例，另外一个`vm._watcher`指的是当前组件的`render watcher`。当组件销毁的时候，需要把这些观察者移除掉，它们都通过`Watcher`实例的`teardown`方法来实现，其代码如下：
```js
export default class Watcher {
  // ...
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
```
* **触发子组件销毁动作**：在移除`Watcher`以后，它随后调用了`vm.__patch__`方法，我们在之前`update/patch`章节介绍过这个方法，这里注意它第二个参数传递了`null`，我们回顾一下`patch`方法的实现：
```js
export function createPatchFunction (backend) {
  // ...
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }
    // ...
  }
}
```
在`patch`方法中，当我们传递的第二个参数`vnode`为`null`的时候，它会调用`invokeDestroyHook`方法，这个方法的代码如下：
```js
function invokeDestroyHook (vnode) {
  let i, j
  const data = vnode.data
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode)
    for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
  }
  if (isDef(i = vnode.children)) {
    for (j = 0; j < vnode.children.length; ++j) {
      invokeDestroyHook(vnode.children[j])
    }
  }
}
```
这个方法的主要作用就是递归调用子组件`VNode`的`destroy`钩子函数，我们来看一下`VNode`钩子函数`destroy`具体做了哪些事情：
```js
const componentVNodeHooks = {
  // ...
  destroy (vnode: MountedComponentVNode) {
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy()
      } else {
        deactivateChildComponent(componentInstance, true /* direct */)
      }
    }
  }
}
```
我们可以看到，在`destroy`钩子函数中，如果忽略`keep-alive`相关的逻辑，它的核心还是调用组件的`$destroy()`方法。

**小结**：组件销毁的过程，应该是从父组件开始，然后递归销毁子组件，当子组件都销毁完毕时，父组件基本完成了销毁动作。因此父子组件关于`beforeDestroy`和`destroyed`这两个生命周期钩子函数的执行顺序为：
```js
// parent beforeDestroy
// child beforeDestroy
// child destroyed
// parent destroyed
```
* **移除事件监听**：在前面我们提到当子组件完成销毁动作时，父组件基本也完成了销毁动作。这是因为，在使用`callHook`触发`destroyed`生命周期钩子函数之后，我们还需要移除相关的事件监听，它使用`$off`来实现，我们回顾一下代码：
```js
Vue.prototype.$off = function (
  event?: string | Array<string>,
  fn?: Function
): Component {
  const vm: Component = this
  // all
  if (!arguments.length) {
    vm._events = Object.create(null)
    return vm
  }
  // ...
  return vm
}
```
当我们不传递任何参数的时候，它直接把`vm._events`赋值为一个空对象，这样就达到了移除事件监听的目的。

### activated和deactivated
这两个生命周期方法是与`keep-alive`内置组件强相关的生命周期钩子函数，因此我们会把这两个钩子函数的介绍放在之后的`keep-alive`小节。