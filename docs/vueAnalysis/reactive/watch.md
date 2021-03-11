# watch处理
在介绍完处理`computed`相关的逻辑后，我们接下来看`watch`是如何处理的。

## watch初始化
```js
export function initState (vm: Component) {
  // 省略代码
  const opts = vm.$options
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
我们可以看到，处理`watch`的逻辑发生在`initWatch()`方法中，在这个方法调用之前，首先对`watch`做了判断，其中`nativeWatch`是定义在`src/core/util/env.js`中的一个常量：
```js
// Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch
```
然后，让我们来看一下`initWatch`的实现，它定义在`src/core/instance/state.js`文件中：
```js
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```
我们可以看到，`initWatch()`方法的实现非常简单，首先对`watch`做了判断，如果是数组则遍历这个数组调用`createWatcher()`方法，如果不是则直接调用`createWatcher()`。按照`watch`的使用规则，我们有如下几种常见的写法：
```js
export default {
  data () {
    return {
      age: 23,
      name: 'AAA',
      nested: {
        a: {
          b: 'b'
        }
      }
    }
  },
  watch: {
    name (newVal, oldVal) {
      console.log(newVal, oldVal)
    },
    nested: {
      handler (newVal, oldVal) {
        console.log(newVal, oldVal),
      },
      deep: true
    }
  }
}
```
接着，我们需要来看一下`createWatcher()`函数的具体实现：
```js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```
代码分析：
* `createWatcher()`方法的主要作用就是进行`watch`参数规范化，然后将规范化后的参数传递给`vm.$watch()`。
* 在`createWatcher()`中首先判断了`handler`参数是否为普通对象，如果是普通对象则代表是如下形式定义的`watch`：
```js
{
  watch: {
    nested: {
      handler (newVal, oldVal) {
        console.log(newVal, oldVal),
      },
      deep: true
    }
  }
}
```
此时，应该把`handler`赋值给可选的`options`参数，然后`handler`赋值为真正的回调函数。

* 接着，对`handler`进行了类型判断，如果是`string`类型则把此时`vm[handler]`赋值给它。根据这段代码的逻辑，意味着我们可以选择把`watch`回调函数定义在`methods中`：
```js
export default {
  data () {
    return {
      name: 'AAA'
    }
  },
  watch: {
    name: 'nameWatchCallback'
  },
  methods: {
    nameWatchCallback (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
}
```
* 最后，把规范化后的参数传递给`vm.$watch()`。关于`$watch()`何时挂载到`Vue.prototype`上，我们已经在之前介绍过了，它发生在`stateMixin`中。

在分析完`createWatcher()`方法实现逻辑后，我们接着来看`$watch()`方法的具体实现逻辑：
```js
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  const vm: Component = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
    }
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}
```
我们可以发现，`$watch`方法主要做两件事情：**创建Watcher实例**和**返回unwatchFn函数**，接下来我们分别对这两部分的逻辑进行详细的解释。

### 创建Watcher实例
我们先来看一下`Watcher`构造函数的代码：
```js
// 精简代码
class Watcher {
  constructor (vm, expOrFn, cb, options, isRenderWatcher) {
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
  }
}
```
我们从构造函数中可以看到，当实例化一个`watch`的时候，会根据传递的`options`来处理`deep`、`user`、`lazy`、`sync`以及`before`属性。`watcher`根据不同的用法，有几种不同的分类：
* `render watcher`：渲染`watcher`，例如当在`template`模板中使用`{{}}`语法读取一个变量的时候，此时这个变量收集的依赖就是`render watcher`，当这个变量值更新的时候会触发`render watcher`进行组件的重新渲染。是否为渲染`warcher`，使用构造函数参数`isRenderWatcher`为`true`进行区分。
* `computed watcher`：计算属性`watcher`，当我们在定义计算属性的时候，计算属性收集的依赖就是另外一个或者多个变量，当其中一个变量的值发生变量，就会触发计算属性重新进行求值。是否为计算属性`watcher`，使用`options.lazy`为`true`进行区分。
* `user watcher`：用户自定义`watcher`，多发生在`this.$watch`或者组件`watch`选择配置中，此时收集的依赖就是变量自身，当变量的值发生变化的时候，就会调用`watch`提供的回调函数。是否为用户自定义`watcher`，使用`options.user`为`true`进行区分。

### 返回unwatchFn函数
我们在构造函数中可以发现，它定义了一个`_watchers`变量，然后在每次实例化的时候，把自身添加到这个数组中，这样做的目的是为了方便清除依赖。在之前的介绍中，我们知道`$watch`返回了一个`unwatchFn`函数，它用来取消监听。接下来，我们看一下`teardown()`方法的具体实现。
```js
// Watcher类精简代码
class Watcher {
  constructor () {
    this.active = true
    this.deps = []
  }
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

// Dep类精简代码
class Dep {
  constructor () {
    this.subs = []
  }
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }
}
```
`teardown()`方法的实现很简单，就是从`deps`数组中移除当前的`watcher`，其中`deps`存储的是`Dep`实例。