# update和patch
来回顾一下之前提到的`mountComponent`方法，它有这样一段代码：
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```
在之前的章节中，我们介绍了`_render`方法及其`createElement`和`createComponent`的逻辑，知道`_render`返回的是一个`VNode`树形结构。而`_update`方法的作用就是利用这个`VNode`树形结构，来生成真正`DOM`节点。

这一章节，我们来分析一下`update`方法的实现以及其中`patch`的逻辑。

## $forceUpdate
在正式介绍`update/patch`之前，我们先来认识一个`API`方法：`$forceUpdate`，这个方法是用来强制组件重新渲染的。在开发`Vue`应用的时候，我们有可能遇到过虽然我们的响应式数据更改了，但组件并没有正确渲染。当遇到这种情况的时候，我们可以调用`$forceUpdate`来强制组件重新进行渲染。它的实现代码如下：
```js
Vue.prototype.$forceUpdate = function () {
  const vm: Component = this
  if (vm._watcher) {
    vm._watcher.update()
  }
}
```
我们可以看到`$forceUpdate`方法的代码非常简单，它首先判断了`vm._watcher`是否存在，也就是判断当前组件的`render watcher`是否存在，如果存在则调用`render watcher`的`update`方法。在调用`update`方法后，这里的过程就跟派发更新的过程相同 ，因为这里是`render watcher`，因此它最后会调用下面这段代码，也就是我们这个章节的核心`update/patch`：
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```

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
* `activeInstance`：从命名可以看出来，它的意思是当前激活的实例对象。我们知道组件渲染是一个递归的过程，渲染顺序是先子后父。那么在这种递归渲染的过程中，我们必须正确保证一对引用关系：当前渲染的组件实例以及其父级组件实例。`activeInstance`就是当前渲染的组件实例，它是一个模块变量：
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
在`initLifecycle`方法执行的过程中，通过`while`循环来保存`parent`和`children`父子关系，对于父级来说，`$children`中存储了它所有的子节点，对于子级来说，可以通过`vm.$parent`获取到它的父级。
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
**注意**：这里定义的`hooks`与我们组件的生命周期钩子函数很相似，但它并不是处理组件生命周期的，它们是在`VNode`钩子函数执行阶段或者其它时机调用的，例如：在`VNode`插入的时候，需要执行`created`相关的钩子函数，在`VNode`移除的时候，需要执行`remove/destroy`相关的钩子函数。

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
在`invokeCreateHooks`方法中，它通过`for`来遍历`cbs.create`钩子函数数组，然后依次调用这里面的每一个方法。在方法的最后，它还调用了`VNode`的2个钩子函数，在`createComponent`章节中我们提到过`vnode.data.hook`。
```js
const componentVNodeHooks = {
  init: function () {},     // 初始化时触发
  prepatch: function () {}, // patch之前触发
  insert: function () {},   // 插入到DOM时触发
  destroy: function () {}   // 节点移除之前触发
  ...
}
```

### 返回patch函数
我们回顾一下之前的代码：
```js
export const patch: Function = createPatchFunction({ nodeOps, modules })
```
我们可以发现，`patch`赋值的是`createPatchFunction`方法调用的结果，那么我们看一下`createPatchFunction`方法内部是如何定义这个返回函数的：
```js
export function createPatchFunction (backend) {
  // ...
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) { 
      // ...
    } else {
      // ...
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
```
在`patch`返回函数的最开始，它判断了`vnode`是否为`undefined`或者`null`，如果是并且`oldVnode`条件判断为真，那么它会调用`invokeDestroyHook`。执行`invokeDestroyHook`是为了触发子节点的销毁动作，那么很显然这段代码会在**组件销毁**的时候执行，我们可以在`$destroy`方法中看到下面这段代码(`$destroy`方法我们会在组件生命周期小节中介绍)：
```js
Vue.prototype.$destroy = function () {
  // ...
  vm.__patch__(vm._vnode, null)
  // ...
}
```
判断完`vnode`后，我们发现它对`oldVnode`也进行了判断，因此会有一个`if/else`分支逻辑。那么什么时候走`if`分支逻辑？什么时候走`else`分支逻辑？

当使用`isUndef`方法对`oldVnode`逻辑判断为真时，证明此时的`oldVnode`没有，那么它表示组件是首次渲染，因此会走`if`分支逻辑。当挂载根实例或者派发更新的时候，此时的`oldVnode`存在，它会走`else`分支逻辑。由于这两块的分支逻辑相对来说比较复杂，因此我们会在后续单独划分模块说明。

在返回函数`patch`的最后，它调用了`invokeInsertHook`，这个方法的目的是为了触发`VNode`的`insert`钩子函数，其代码如下：
```js
 function invokeInsertHook (vnode, queue, initial) {
  // delay insert hooks for component root nodes, invoke them after the
  // element is really inserted
  if (isTrue(initial) && isDef(vnode.parent)) {
    vnode.parent.data.pendingInsert = queue
  } else {
    for (let i = 0; i < queue.length; ++i) {
      queue[i].data.hook.insert(queue[i])
    }
  }
}
```
对于`VNode`的`insert`钩子函数而言，它主要做的事情就是触发组件的`mounted`钩子函数。对于组件一系列生命周期，我们会在下一个章节中介绍，这里只做了解。

### 根实例patch
我们回顾一下`_update`方法，它有这样一段代码：
```js
if (!prevVnode) {
  // initial render
  vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
} else {
  // updates
  vm.$el = vm.__patch__(prevVnode, vnode)
}
```
在首次渲染的时候，对于根实例而言，它传递的是一个真实的`DOM`节点，也就是说在`patch`返回函数中，第一个参数`oldVnode`不仅为真值，并且它还是一个真实的`DOM`节点。因此在`patch`返回函数中，它走下面这些代码：
```js
return function patch (oldVnode, vnode, hydrating, removeOnly) {
  // ...
  if (isUndef(oldVnode)) {
    // ...
  } else {
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // ...
    } else {
      if (isRealElement) {
        // ...
        // either not server-rendered, or hydration failed.
        // create an empty node and replace it
        oldVnode = emptyNodeAt(oldVnode)
      }

      // replacing existing element
      const oldElm = oldVnode.elm
      const parentElm = nodeOps.parentNode(oldElm)

      // create new node
      createElm(
        vnode,
        insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      )
      // ...

      // destroy old node
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0)
      } else if (isDef(oldVnode.tag)) {
        invokeDestroyHook(oldVnode)
      }
    }
  }
}
```
因为`oldVnode`参数为一个真实的`DOM`节点，所以`isRealElement`变量为`true`，它会调用`emptyNodeAt`。这个方法的作用是把一个真实`DOM`转换成一个`VNode`实例，其代码如下：
```js
function emptyNodeAt (elm) {
  return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
}
```
紧接着调用`createElm`方法，这个方法的主要作用就是把`VNode`实例转换成真实的`DOM`节点，我们会在后面的章节中单独介绍`createElm`，这里只做了解。

在代码最后，它通过判断`parentElm`是否为真，来调用不同的方法，我们以`Vue-Cli`脚手架生成的`App.vue`组件为例。对于根实例而言，它的挂载节点为`<div id='app'></div>`，因此此时的`parentEl`为`body`节点，条件判断为真，因此调用`removeVnodes`方法，我们看一下这个方法的实现代码：
```js
function removeVnodes (vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (isDef(ch)) {
      if (isDef(ch.tag)) {
        removeAndInvokeRemoveHook(ch)
        invokeDestroyHook(ch)
      } else { // Text node
        removeNode(ch.elm)
      }
    }
  }
}
function removeAndInvokeRemoveHook (vnode, rm) {
  if (isDef(rm) || isDef(vnode.data)) {
    let i
    const listeners = cbs.remove.length + 1
    if (isDef(rm)) {
      // we have a recursively passed down rm callback
      // increase the listeners count
      rm.listeners += listeners
    } else {
      // directly removing
      rm = createRmCb(vnode.elm, listeners)
    }
    // recursively invoke hooks on child component root node
    if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
      removeAndInvokeRemoveHook(i, rm)
    }
    for (i = 0; i < cbs.remove.length; ++i) {
      cbs.remove[i](vnode, rm)
    }
    if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
      i(vnode, rm)
    } else {
      rm()
    }
  } else {
    removeNode(vnode.elm)
  }
}
```
我们可以看到，在`removeVnodes`方法中，它会删除旧的`id`等于`app`的节点，然后创建一个新的`id`为`app`的节点。看到这里，我们就能明白`Vue`官网上面这样一段话了：
**所有的挂载元素会被 Vue 生成的 DOM 替换。因此不推荐挂载 root 实例到 html 或者 body 上**

### 组件patch
在`patch`返回函数中，对于组件的首次渲染和派发更新渲染处理逻辑是不相同的，其中的差别体现在如下代码：
```js
return function patch (oldVnode, vnode, hydrating, removeOnly) {
  // ...
  if (isUndef(oldVnode)) {
    // 组件首次渲染
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // 组件派发更新渲染
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {
      // ...
    }
  }
}
```
在组件`update/patch`章节，我们不会分析`patchVnode`方法，而是把它放在后面**编译**章节中。在这里，我们只需要看组件首次渲染即可。对于组件的首次渲染而言，依然还是调用`createElm`方法，不过这里要注意，它只传递了2个参数。

### createElm
在上面两个小节，我们都提到过`createElm`，也知道它的主要作用是把`VNode`实例转换成真实的`DOM`节点，在这个小节我们来详细介绍`createElm`方法。
```js
function createElm (
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  // ...
  vnode.isRootInsert = !nested // for transition enter check
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }

  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    if (process.env.NODE_ENV !== 'production') {
      if (data && data.pre) {
        creatingElmInVPre++
      }
      if (isUnknownElement(vnode, creatingElmInVPre)) {
        warn(
          'Unknown custom element: <' + tag + '> - did you ' +
          'register the component correctly? For recursive components, ' +
          'make sure to provide the "name" option.',
          vnode.context
        )
      }
    }

    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)

    /* istanbul ignore if */
    if (__WEEX__) {
      // ...
    } else {
      createChildren(vnode, children, insertedVnodeQueue)
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue)
      }
      insert(parentElm, vnode.elm, refElm)
    }

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}
```
我们可以在上面看到`createElm`方法的精简代码，它有几个主要的步骤：**创建组件节点**、**创建普通节点**、**创建注释节点**以及**创建文本节点**。

* **创建组件节点**：在`createElm`方法的最开始，它通过调用`createComponent`方法尝试创建一个组件节点，如果`vnode`是一个组件`vnode`则返回`true`，并且提前`return`终止`createElm`方法，否则返回`false`。我们来看一下`createComponent`方法的实现代码：
```js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```
对于组件`vnode`而言，判断其`data`条件是满足的，条件满足以后它处理了`i`，将其赋值为`i.init`。其实这里的`init`就是组件`vnode`的`init`钩子函数，其代码如下：
```js
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  }
  // ...
}
```
当`i`方法执行时，它会在代码中通过`createComponentInstanceForVnode`来创建`Vue`实例，然后调用实例的`$mount`方法来挂载子组件。因为在这里调用了子组件的`$mount`方法，所以子组件会从头开始递归走一遍`update/patch`的过程，当子组件处理完毕后，会把子组件对应的真实`DOM`节点树插入到父级中该组件占位符的位置。这样经过一层层递归，反复执行`update/patch`的方式就可以构建成一个完整的组件树形结构。

* **创建普通节点**：如果`VNode`实例的`tag`属性为真，则首先校验一遍`tag`是否为正确的标签，如果不是则会提示非法标签。如果是则先调用`createChildren`方法处理其子节点，子节点处理完毕后再调用`insert`直接插入到父级中。
```js
function createChildren (vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(children)
    }
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}
```
我们可以看到在`createChildren`方法中，它首先判断了`VNode`的`children`子节点是否为数组，如果不是则直接创建一个文本节点插入到父级中，如果是则遍历子节点数组，然后递归调用`createElm`。根据以上分析，我们可以知道创建节点的过程是一个深度优先遍历的过程，子节点首先会被创建然后插入到其父级下面，最后才是父节点。因为子节点会优先创建并被插入，因此子节点会首先调用`insert`方法，其代码如下：
```js
function insert (parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}
```
其中`insertBefore`和`appendChild`是对真实`DOM`的一层封装。
```js
export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}
export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}
```
* **创建注释节点和创建文本节点**：创建注释节点和创建文本节点非常简单，它们分别调用了`createComment`和`createTextNode`，其实这两个方法是对原始`DOM`操作的一层封装而已：
```js
export function createTextNode (text: string): Text {
  return document.createTextNode(text)
}
export function createComment (text: string): Comment {
  return document.createComment(text)
}
```