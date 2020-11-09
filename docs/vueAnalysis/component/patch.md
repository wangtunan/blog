# update和patch
来回顾一下之前提到的`mountComponent`方法，它有这样一段代码：
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```
在之前的章节中，我们介绍了`_render`方法及其`createElement`和`createComponent`的逻辑，知道`_render`返回的是一个`VNode`树形结构。而`_update`方法的作用就是利用这个`VNode`树形结构，来生成真正`DOM`节点。

这一章节，我们来分析一下`update`方法的实现以及其中`patch`的逻辑。

## update
`_update`其实是一个内部私有方法，它的调用时机有两个：**初始化挂载阶段**和**派发更新阶段**，其代码是在`lifecycleMixin`方法中被定义的，如下：
```js
export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }
}
```
`_update`代码并不是很多，其核心就是调用`__patch__`方法。在介绍`__patch__`之前，为了更好的理解后续相关的逻辑，我们先介绍几个小的知识点。
* `activeInstance`：从命名可以看出来，它的意思是当前激活的实例对象。我们知道组件渲染是一个递归的过程，它会先从子节点开始渲染，等到所有子节点渲染完毕后，最后再渲染父级。那么在这种递归渲染的过程中，我们必须正确保证一对引用关系：当前渲染的组件实例以及其父级组件实例。`activeInstance`就是当前渲染的组件实例，它是一个模块变量：
```js
export let activeInstance: any = null
```
在`_update`方法中，它使用`setActiveInstance`来设置当前激活的实例，使用`restoreActiveInstance`来恢复，`setActiveInstance`方法定义如下：
```js
const restoreActiveInstance = setActiveInstance(vm)
export function setActiveInstance(vm: Component) {
  const prevActiveInstance = activeInstance
  activeInstance = vm
  return () => {
    activeInstance = prevActiveInstance
  }
}
```
我们可以看到在`setActiveInstance`中，它首先定义了闭包变量保存了当前激活的实例，然后把`activeInstance`设置为当前的参数`vm`，最后返回了一个函数，这个函数的目的是用来恢复`activeInstance`到上一个缓存下来的激活实例，也就是调用`restoreActiveInstance`方法。

既然当前渲染的实例已经解决了，那么我们来看一下父级在这个过程中是如何保证的。在`initLifecycle`的过程中，有这样一段代码：
```js
export function initLifecycle (vm: Component) {
  const options = vm.$options
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm
  // ...省略代码
}
```
在`initLifecycle`方法执行的过程中，通过`while`循环来保存`parent`和`children`父子关系，对于父级来说，`$children`中存储了它所有的子节点，对于`$children`来说，可以通过`vm.$parent`获取到它的父级。
* `_vnode和$vnode`：`_vnode`和`$vnode`也是一对父子关系，其中`_vnode`表示当前`VNode`节点，`$vnode`表示其父节点。我们来回顾一下`_render`方法，它有这样几段代码：
```js
Vue.prototype._render = function () {
  // ...省略代码
  const { render, _parentVnode } = vm.$options
  vm.$vnode = _parentVnode
  let vnode
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement)
  }
  vnode.parent = _parentVnode
  return vnode
}
```

在介绍完这两组对应关系后，我们来看一下最核心的`__patch__`方法的实现，这个方法是多平台公用方法，它在`src/platforms/web/runtime/index.js`和`src/platforms/weex/runtime/index.js`文件中都有定义，我们主要看第一种，其定义代码如下：
```js
import { patch } from './patch'
Vue.prototype.__patch__ = inBrowser ? patch : noop
```
在以上代码中，它使用`inBrowser`判断了当前是否处于浏览器环境，如果是则赋值为`path`，否则就是`noop`空函数。这样判断是因为`Vue`还可以运行在`node`服务端。接下来，我们在`path.js`中看一下`path`方法是如何定义的：
```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

const modules = platformModules.concat(baseModules)
export const patch: Function = createPatchFunction({ nodeOps, modules })
```
在这里我们可以看到，`patch`赋值的是`createPatchFunction`方法的调用结果，我们先不看`createPatchFunction`是如何定义的，我们先看来一下它传递的参数。
* `nodeOps`: `nodeOps`是引入了`web/runtime/node-ops.js`文件中的内容，我们选取一部分来举例说明它到底是什么。
```js
export function createElement (tagName: string, vnode: VNode): Element {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}
export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}
export function removeChild (node: Node, child: Node) {
  node.removeChild(child)
}
export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}
```
我们可以发现，`node-ops.js`文件中封装的方法，实际上就是对真实`DOM`操作的一层封装，传递`nodeOps`的目的是为了在虚拟`DOM`转成真实`DOM`节点的过程中提供便利。
* `modules`: `modules`是`platformModules`和`baseModules`两个数组合并的结果，其中`baseModules`是对模板标签上`ref`和`directives`各种操作的封装。`platformModules`是对模板标签上`class`、`style`、`attr`以及`events`等操作的封装。

**小结**：
1. 在`update`这一节，我们知道了首次渲染和派发更新重新渲染的`patch`是有一点差异的，其差异为首次渲染时提供的根节点是一个真实的`DOM`元素，在派发更新重新渲染时提供的是一个`VNode`，这里差异的逻辑是在下面这段代码中：
```js
if (!prevVnode) {
  // initial render
  vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
} else {
  // updates
  vm.$el = vm.__patch__(prevVnode, vnode)
}
```
2. 在父子组件递归渲染的时候，首先渲染子组件，子组件渲染完毕后才会去渲染父组件，在这个递归的过程中，`activeInstance`始终指向当前渲染的组件实例。同时根据父子组件递归渲染的顺序，我们可以知道父子组件关于`create`和`mount`两个生命周期的执行顺序：
```js
// parent beforeCreate
// parent created
// parent beforeMount
// child beforeCreate
// child created
// child beforeMount
// child mounted
// parent mounted
```
3. `render`函数执行会得到一个`VNode`的树形结构，`update`的作用就是把这个虚拟`DOM`节点树转换成真实的`DOM`节点树。因此结合前面介绍的所有内容，我们可以得到一个从实例初始化到最终渲染成真实`DOM`到视图的一个主线流程图。

<div style="text-align: center">
  <img src="../../images/vueAnalysis/vue-process.png" alt="流程图">
</div>

## patch
在上一个章节，我们遗留了一个`createPatchFunction`方法还没有分析，在`patch`这个章节，我们主要任务就是弄清楚`createPatchFunction`的实现原理。

因为在`v2.6.11`版本中，`createPatchFunction`方法代码非常多，因此我们采取分段来说明，建议一边看文章一边对照源码学习。

### hooks钩子函数
在`createPatchFunction`最开始，它首先处理了一些`hooks`钩子函数，代码如下：
```js
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']
export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
  const { modules, nodeOps } = backend

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
  // ...
}
```
注意：这里定义的`hooks`与我们组件的生命周期钩子函数很相似，但它并不是处理组件生命的，这些钩子函数是在`VNode`钩子函数执行阶段或者其它时机调用的，例如：在`VNode`插入的时候，需要执行`created`相关的钩子函数，在`VNode`移除的时候，需要执行`remove`相关的钩子函数。

代码分析：
* 首先通过解构获取到`modules`，它是一个数组，每个数组元素都有可能定义`create`、`update`、`remove`以及`destroy`等钩子函数，它可能是下面这样：
```js
const modules = [
  {
    created: function () {},
    update: function () {}
  },
  {
    update: function () {},
    remove: function () {}
  },
  {
    remove: function () {},
    destroy: function () {}
  }
]
```
* 解构获取到`modules`后，使用`for`循环来遍历`modules`，目的是要把`hooks`当做`key`，`hooks`的函数当做`value`，循环遍历完毕后，它可能是下面这样：
```js
// 遍历前
const cbs = {}

// 遍历后
const cbs = {
  create: [ function () {}, function () {} ],
  activate: [],
  update: [ function () {}, function () {}, function () {} ],
  remove: [ function () {} ],
  destroy: [ function () {} ]
}
```

* 以`create`钩子函数为例，它会在合适的时机调用，调用`create`的代码如下：
```js
function invokeCreateHooks (vnode, insertedVnodeQueue) {
  for (let i = 0; i < cbs.create.length; ++i) {
    cbs.create[i](emptyNode, vnode)
  }
  i = vnode.data.hook // Reuse variable
  if (isDef(i)) {
    if (isDef(i.create)) i.create(emptyNode, vnode)
    if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
  }
}
```
在`invokeCreateHooks`方法中，它通过`for`来遍历`cbs.create`钩子函数数组，然后依次调用这里面的每一个方法。在方法的最后，它还调用了`VNode`的2个钩子函数，在`createComponent`章节中我们提到过`vnode.data.hook`，它是`VNode`的钩子函数。
```js
const componentVNodeHooks = {
  init: function () {},     // 初始化时触发
  prepatch: function () {}, // patch之前触发
  insert: function () {},   // 插入到DOM时触发
  destroy: function () {}   // 节点移除之前触发
  ...
}
```