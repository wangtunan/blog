# 介绍
在上一章节，我们分析过`initState()`方法的整体流程，知道它会处理`props`、`methods`和`data`等等相关的内容：
```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
那么我们的深入响应式原理介绍会以`initState()`方法开始，逐步分析`Vue`中响应式的原理，下面这张图可以很好的展示响应式的原理。

<div style="text-align:center;">
  <img src="../../images/vueAnalysis/reactive.png" alt="响应式原理图" width="740" />
</div>