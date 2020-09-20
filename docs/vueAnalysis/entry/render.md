# renderMixin流程
相比于以上几种方法，`renderMixin`是最简单的，它主要在`Vue.prototype`上定义各种私有方法和一个非常重要的实例方法：`$nextTick`，其精简代码如下：
```js
export function renderMixin (Vue) {
  // 挂载各种私有方法，例如this._c，this._v等
  installRenderHelpers(Vue.prototype)
  Vue.prototype._render = function () {}

  // 实例方法
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  }
}
```
代码分析：
* `installRenderHelpers`：它会在`Vue.prototype`上挂载各种私有方法，例如`this._n = toNumber`、`this._s = toString`、`this._v = createTextVNode`和`this._e = createEmptyVNode`。
* `_render()`：`_render()`方法会把模板编译成`VNode`，我们会在其后的编译章节详细介绍。
* `nextTick`：就像我们之前介绍过的，`nextTick`会在`Vue`构造函数上挂载一个全局的`nextTick()`方法，而此处为实例方法，本质上引用的是同一个`nextTick`。

在以上代码分析完毕后，我们可以得到`renderMixin`如下流程图：
<div style="text-align: center">
  <img src="../../images/vueAnalysis/renderMixin.png" />
</div>