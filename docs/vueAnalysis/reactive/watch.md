# watch处理
在介绍完处理`computed`相关的逻辑后，我们接下来看`watch`是如何处理的。

## watch初始化和更新
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
我们可以看到，`initWatch()`方法的实现非常简单，首先对`watch`做了判断，如果是数组则遍历这个数组调用`createWatcher()`方法，如果不是则直接调用`createWatcher()`。按照`watch`的使用规则，我们有如下几种形式的写法：
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
### 返回unwatchFn函数

## watch参数