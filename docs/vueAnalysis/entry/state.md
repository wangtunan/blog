# stateMixin流程
`stateMixin`主要是处理跟实例相关的属性和方法，它会在`Vue.prototype`上定义实例会使用到的属性或者方法，这一节我们主要任务是弄清楚`stateMixin`的主要流程。在`src/core/instance/state.js`代码中，它精简后如下所示：
```js
import { set, del } from '../observer/index'
export function stateMixin (Vue) {
  // 定义$data, $props
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  // 定义$set, $delete, $watch
  Vue.prototype.$set = set
  Vue.prototype.$delete = del
  Vue.prototype.$watch = function() {}
}
```
我们可以从上面代码中发现，`stateMixin()`方法中在`Vue.prototype`上定义的几个属性或者方法，全部都是和响应式相关的，我们来简要分析一下以上代码：
* `$data和$props`：根据以上代码，我们发现`$data`和`$props`分别是`_data`和`_props`的访问代理，从命名中我们可以推测，以下划线开头的变量，我们一般认为是私有变量，然后通过`$data`和`$props`来提供一个对外的访问接口，虽然可以通过属性的`get()`方法去取，但对于这两个私有变量来说是并不能随意`set`，对于`data`来说不能替换根实例，而对于`props`来说它是只读的。因此在原版源码中，还劫持了`set()`方法，当设置`$data`或者`$props`时会报错：
```js
if (process.env.NODE_ENV !== 'production') {
  dataDef.set = function () {
    warn(
      'Avoid replacing instance root $data. ' +
      'Use nested data properties instead.',
      this
    )
  }
  propsDef.set = function () {
    warn(`$props is readonly.`, this)
  }
}
```
* `$set`和`$delete`：`set`和`delete`这两个方法被定义在跟`instance`目录平级的`observer`目录下，在`stateMixin()`中，它们分别赋值给了`$set`和`$delete`方法，而在`initGlobalAPI`中，也同样使用到了这两个方法，只不过一个是全局方法，一个是实例方法。

* `$watch`：在`stateMixin()`方法中，详细实现了`$watch()`方法，此方法实现的核心是通过一个`watcher`实例来监听。当取消监听时，同样是使用`watcher`实例相关的方法，关于`watcher`我们会在后续响应式章节详细介绍。
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
    return function  () {
      watcher.teardownunwatchFn()
    }
  }
```
在以上代码分析完毕后，我们可以得到`stateMixin`如下流程图：
<div style="text-align: center">
  <img src="../../images/vueAnalysis/stateMixin.png" />
</div>