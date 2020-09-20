# eventsMixin流程
在使用`Vue`做开发的时候，我们一定经常使用到`$emit`、`$on`、`$off`和`$once`等几个实例方法，`eventsMixin`主要做的就是在`Vue.prototype`上定义这四个实例方法：
```js
export function eventsMixin (Vue) {
  // 定义$on
  Vue.prototype.$on = function (event, fn) {}

  // 定义$once
  Vue.prototype.$once = function (event, fn) {}

  // 定义$off
  Vue.prototype.$off = function (event, fn) {}

  // 定义$emit
  Vue.prototype.$emit = function (event) {}
}
```
通过以上代码，我们发现`eventsMixin()`所做的事情就是使用**发布-订阅**模式来处理事件，接下来让我们先使用**发布-订阅**实现自己的事件中心，随后再来回顾源码。

## $on的实现
`$on`方法的实现比较简单，我们先来实现一个基础版本的：
```js
function Vue () {
  this._events = Object.create(null)
}

Vue.prototype.$on = function (event, fn) {
  if (!this._events[event]) {
    this._events[event] = []
  }
  this._events[event].push(fn)
  return this
}
```
接下来对比一下`Vue`源码中，关于`$on`的实现：
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
代码分析：
1. 我们发现在`Vue`源码中，`$on`方法还接受一个数组`event`，这其实是在`Vue2.2.0`版本以后才有的，当传递一个`event`数组时，会通过遍历数组的形式递归调用`$on`方法。
2. 我们还发现，所有`$on`的事件全部绑定在`_events`私有属性上，这个属性其实是在我们上面已经提到过的`initEvents()`方法中被定义的。
```js
export function initEvents (vm) {
  vm._events = Object.create(null)
}
```

## $emit的实现
我们先来实现一个简单的`$emit`方法：
```js
Vue.prototype.$emit = function (event) {
  const cbs = this._events[event]
  if (cbs) {
    const args = Array.prototype.slice.call(arguments, 1)
    for (let i = 0; i < cbs.length; i++) {
      const cb = cbs[i]
      cb && cb.apply(this, args)
    }
  }
  return this
}
```
接下来，我们使用`$emit`和`$on`来配合测试事件的监听和触发：
```js
const app = new Vue()
app.$on('eat', (food) => {
  console.log(`eating ${food}!`)
})
app.$emit('eat', 'orange')
// eating orange!
```
最后我们来看`Vue`源码中关于`$emit`的实现：
```js
Vue.prototype.$emit = function (event: string): Component {
  const vm: Component = this
  // ...省略处理边界代码
  let cbs = vm._events[event]
  if (cbs) {
    cbs = cbs.length > 1 ? toArray(cbs) : cbs
    const args = toArray(arguments, 1)
    const info = `event handler for "${event}"`
    for (let i = 0, l = cbs.length; i < l; i++) {
      invokeWithErrorHandling(cbs[i], vm, args, vm, info)
    }
  }
  return vm
}
```
代码分析：
1. 从整体上看，`$emit`实现方法非常简单，第一步从`_events`对象中取出对应的`cbs`，接着一个个遍历`cbs`数组、调用并传参。
1. `invokeWithErrorHandling`代码中会使用`try/catch`把我们函数调用并执行的地方包裹起来，当函数调用出错时，会执行`Vue`的`handleError()`方法，这种做法不仅更加友好，而且对错误处理也非常有用。

## $off的实现
`$off`方法的实现，相对来说比较复杂一点，因为它需要根据不同的传参做不同的事情：
* 当没有提供任何参数时，移除全部事件监听。
* 当只提供`event`参数时，只移除此`event`对应的监听器。
* 同时提供`event`参数和`fn`回调，则只移除此`event`对应的`fn`这个监听器。

在了解了以上功能点后，我们来实现一个简单的`$off`方法：
```js
Vue.prototype.$off = function (event, fn) {
  // 没有传递任何参数
  if (!arguments.length) {
    this._events = Object.create(null)
    return this
  }
  // 传递了未监听的event
  const cbs = this._events[event]
  if (!cbs) {
    return this
  }
  // 没有传递fn
  if (!fn) {
    this._events[event] = null
    return this
  }
  // event和fn都传递了
  let i = cbs.length
  let cb
  while (i--) {
    cb = cbs[i]
    if (cb === fn) {
      cbs.splice(i, 1)
      break
    }
  }
  return this
}
```
接下来，我们撰写测试代码：
```js
const app = new Vue()
function eatFood (food) {
  console.log(`eating ${food}!`)
}
app.$on('eat', eatFood)
app.$emit('eat', 'orange')
app.$off('eat', eatFood)
// 不执行回调
app.$emit('eat', 'orange')
```

最后我们来看`Vue`源码中关于`$off`的实现：
```js
Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
  const vm: Component = this
  // all
  if (!arguments.length) {
    vm._events = Object.create(null)
    return vm
  }
  // array of events
  if (Array.isArray(event)) {
    for (let i = 0, l = event.length; i < l; i++) {
      vm.$off(event[i], fn)
    }
    return vm
  }
  // specific event
  const cbs = vm._events[event]
  if (!cbs) {
    return vm
  }
  if (!fn) {
    vm._events[event] = null
    return vm
  }
  // specific handler
  let cb
  let i = cbs.length
  while (i--) {
    cb = cbs[i]
    if (cb === fn || cb.fn === fn) {
      cbs.splice(i, 1)
      break
    }
  }
  return vm
}
```

## $once的实现
关于`$once`方法的实现比较简单，可以简单的理解为在回调之后立马调用`$off`，因此我们来实现一个简单的`$once`方法：
```js
Vue.prototype.$once = function (event, fn) {
  function onFn () {
    this.$off(event, onFn)
    fn.apply(this, arguments)
  }
  this.$on(event, onFn)
  return this
}
```
接着我们对比一下`Vue`源码中的`$once`方法：
```js
Vue.prototype.$once = function (event: string, fn: Function): Component {
  const vm: Component = this
  function on () {
    vm.$off(event, on)
    fn.apply(vm, arguments)
  }
  on.fn = fn
  vm.$on(event, on)
  return vm
}
```
**注意**：在源码中`$once`的实现是在回调函数中使用`fn`绑定了原回调函数的引用，在上面已经提到过的`$off`方法中也同样进行了`cb.fn === fn`的判断。

在实现完以上几种方法后，我们可以得到`eventsMixin`如下流程图：
<div style="text-align: center">
  <img src="../../images/vueAnalysis/eventsMixin.png" />
</div>
