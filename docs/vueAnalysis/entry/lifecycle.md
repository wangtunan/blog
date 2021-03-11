# lifecycleMixin流程
和以上其它几种方法一样，`lifecycleMixin`主要是定义实例方法和生命周期，例如：`$forceUpdate()`、`$destroy`，另外它还定义一个`_update`的私有方法，其中当调用`$forceUpdate()`方法强制组件重新渲染时会调用这个方法，`lifecycleMixin`精简代码如下：
```js
export function lifecycleMixin (Vue) {
  // 私有方法
  Vue.prototype._update = function () {}

  // 实例方法
  Vue.prototype.$forceUpdate = function () {
    if (this._watcher) {
      this._watcher.update()
    }
  }
  Vue.prototype.$destroy = function () {}
}
```
代码分析：
* `_update()`会在组件渲染的时候调用，其具体的实现我们会在组件章节详细介绍。
* `$forceUpdate()`为一个强制`Vue`实例重新渲染的方法，它的内部调用了`_update`，也就是强制组件重新编译渲染。
* `$destroy()`为组件销毁方法，在其具体的实现中，会处理父子组件的关系，事件监听，触发生命周期等操作。

`lifecycleMixin()`方法的代码不是很多，我们也能很容易的得到如下流程图：
<div style="text-align: center">
  <img src="../../images/vueAnalysis/lifecycleMixin.png" />
</div>