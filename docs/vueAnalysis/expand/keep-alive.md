# Keep-Alive
`KeepAlive`是一个内置组件，它在`Vue`实例化的时候已经进行了全局注册，所以我们可以在任何子组件中使用它，其中`KeepAlive`内助组件的缓存策略是基于一种`LRU`缓存机制。

## LRU缓存机制
`LRU`缓存机制：最近、最少使用原则，它是一种缓存淘汰算法，因为浏览器内存空间有限，所以需要根据一定的条件淘汰掉那些不经常使用的缓存，从而为新缓存腾出空间。

我们以[LeetCode](https://leetcode-cn.com/problems/lru-cache/)原题为例，给出了两种实现方式。

### 数组实现方式
```js
function LRUCache (capacity) {
  this.capacity = capacity
  this.keys = new Set()
  this.cache = Object.create(null)
}
LRUCache.prototype.get = function (key) {
  if (this.keys.has(key)) {
    this.keys.delete(key)
    this.keys.add(key)
    return this.cache[key]
  }
  return -1
}
LRUCache.prototype.put = function (key, value) {
  if (this.keys.has(key)) {
    this.keys.delete(key)
    this.cache[key] = value
    this.keys.add(key)
  } else {
    this.keys.add(key)
    this.cache[key] = value
    if (this.capacity && this.keys.size > this.capacity) {
      const deleteKey = Array.from(this.keys)[0]
      delete this.cache[deleteKey]
      this.keys.delete(deleteKey)
    }
  }
  return null
}
```
我们基于以上单例撰写如下测试：
```js
const lruCache = new LRUCache(2);
console.log(lruCache.put(1, 1)); // 缓存是 {1=1}
console.log(lruCache.put(2, 2)); // 缓存是 {1=1, 2=2}
console.log(lruCache.get(1));    // 返回 1
console.log(lruCache.put(3, 3)); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lruCache.get(2));    // 返回 -1 (未找到)
console.log(lruCache.put(4, 4)); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lruCache.get(1));    // 返回 -1 (未找到)
console.log(lruCache.get(3));    // 返回 3
console.log(lruCache.get(4));    // 返回 4
```

### 链表实现方式
```js
function LRUCache (max) {
  this.map = {}
  this.size = 0
  this.maxSize = max
  this.head = {
    prev: null,
    next: null
  }
  this.tail = {
    prev: this.head,
    next: null
  }
  this.head.next = this.tail
}
LRUCache.prototype.get = function (key) {
  if (key in this.map) {
    const node = this.extractNode(this.map[key])
    // 最近访问的节点放到链表头部
    this.insertToHead(node)
    return this.map[key].value
  } else {
    return -1
  }
}
LRUCache.prototype.put = function (key, value) {
  let node
  if (key in this.map) {
    node = this.extractNode(this.map[key])
    node.value = value
  } else {
    node = {
      prev: null,
      next: null,
      value: value,
      key: key
    }
    this.map[key] = node
    this.size++
  }
  // 插入到链表头部
  this.insertToHead(node)
  // 判断是否溢出
  if (this.size > this.maxSize) {
    const nodeToDelete = this.tail.prev
    this.extractNode(nodeToDelete)
    this.size--
    delete this.map[nodeToDelete.key]
  }
}
LRUCache.prototype.extractNode = function (node) {
  const beforeNode = node.prev
  const afterNode = node.next
  beforeNode.next = afterNode
  afterNode.prev = beforeNode
  node.prev = null
  node.next = null
  return node
}
LRUCache.prototype.insertToHead = function (node) {
  const head = this.head
  const lastFirstNode = head.next
  head.next = node
  node.prev = head
  node.next = lastFirstNode
  lastFirstNode.prev = node
  return node
}
```
我们基于以上代码，撰写如下测试：
```js
const lruCache = new LRUCache(2);
console.log(lruCache.put(1, 1)); // 缓存是 {1=1}
console.log(lruCache.put(2, 2)); // 缓存是 {1=1, 2=2}
console.log(lruCache.get(1));    // 返回 1
console.log(lruCache.put(3, 3)); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lruCache.get(2));    // 返回 -1 (未找到)
console.log(lruCache.put(4, 4)); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lruCache.get(1));    // 返回 -1 (未找到)
console.log(lruCache.get(3));    // 返回 3
console.log(lruCache.get(4));    // 返回 4
```

## 内置组件
`KeepAlive`作为一个内置组件，它是在`initGlobalAPI`的时候被注册的，代码如下：
```js
import builtInComponents from '../components/index'
export function initGlobalAPI (Vue: GlobalAPI) {
  // 省略代码
  extend(Vue.options.components, builtInComponents)
  // 省略代码
}
```
内置组件的路径为`src/core/components`，其目录结构如下：
```sh
|-- components          # 内置组件
|   |-- index.js        # 入口文件
|   |-- keep-alive.js   # keep-alive内置组件
```
其中`keep-alive`导出结果如下：
```js
export default {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created () {
    this.cache = Object.create(null)
    this.keys = []
  },
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```
代码分析：
* `created`：在`keep-alive`组件初始化的时候，它在组件实例上挂载了两个属性，这两个都是跟缓存有关的，`this.cache`主要用来存放缓存的`vnode`，它是`key/value`形式，其中`key`为组件的`key`(`cid+tag`)，`value`为组件的`vnode`。
* `destroyed`: 在`keep-alive`组件销毁的时候，它遍历`this.cache`对象的属性键，然后调用`pruneCacheEntry`执行一些清理操作：**销毁缓存组件**、**移除缓存vnode**以及**移除缓存组件key**
```js
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```
* `mounted`: 在`keep-alive`挂载的时候，它监听了`include`和`exclude`的变动，如果它们有任意一项存在变动，就调用`pruneCache`方法：
```js
function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
```
可以用一句话总结`pruneCache`方法：当`include`或者`exclude`发生变化时，只要缓存对象不满足匹配条件，就调用`pruneCacheEntry`去清理这个组件及其对应的缓存。
* `render`: `keep-alive`的`render`所做的事情并不复杂：
1. 首先拿到组件的`slots`插槽内容并且取到第一个组件节点。
2. 如果当前组件不满足`include`或者满足`exclude`的匹配条件，证明此组件不需要缓存，直接返回其`vnode`即可。
3. 如果已经在缓存中存在，那么把它从原来旧的位置删除，并添加到栈顶。
4. 如果不存在，这证明是新缓存组件，这个时候除了需要把它添加到栈顶，还需要判断是否已经超过了缓存设置的最大值，如果超过了就需要把栈尾的缓存删掉，为新缓存腾出空间。

## 组件渲染
在介绍`keep-alive`组件渲染的时候，我们以下面代码为例进行说明：
```vue
<template>
  <div>
    <keep-alive>
      <component :is="componentName" />
    </keep-alive>
    <button @click="toggleName">Toggle</button>
  </div>
</template>
<script>
import A from './A.vue'
import B from './B.vue'
export default {
  name: 'App',
  data () {
    return {
      componentName: 'A'
    }
  },
  components: {
    A,
    B
  },
  methods: {
    toggleName () {
      this.componentName = this.componentName === 'A' ? 'B' : 'A'
    }
  }
}
</script>
```

### 首次渲染
我们在之前介绍过，在渲染的时候，当遇到组件节点的时候，会调用`createComponent`来创建组件节点，代码如下：
```js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
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
我们重点关注`isReactivated`的取值，在组件`A`第一次渲染的时候，`vnode.componentInstance`为`undefined`，`keepAlive`为`true`，因此`isReactivated`为`false`。

根据之后的代码，如果`isReactivated`为`false`，那么它是不会调用`reactivateComponent`方法的。

对我们的例子而言，当我们点击`Toggle`按钮的时候，它会由渲染`A`组件调整为渲染`B`，而此时`B`组件也是首次渲染。

根据以上代码我们可以知道：对于组件的首次渲染而言，使用`keep-alive`和不使用`keep-alive`结果基本一样，最大的区别是多了`activated`和`deactivated`这两个生命周期，我们会在之后的小节中进行介绍。

### 缓存渲染
假设我们已经做了如下流程：组件`A`初次渲染 => 点击`Toggle`按钮 => 组件`B`初次渲染。

当我们再次点击`Toggle`按钮的时候，根据响应式原理，组件会重新进行渲染。也就是说，会再次执行`keep-alive`的`render`函数。

此时就会命中`if`缓存逻辑分支：
```js
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance
  // make current key freshest
  remove(keys, key)
  keys.push(key)
}
```
我们先来回顾一下`vnode`的`init`钩子函数：
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
}
```
因为此时的`A`组件`vnode.componentInstance`有值并且`vnode.data.keepAlive`为真，所以它不会调用`$mount`方法重新挂载`A`组件，而是直接使用我们缓存下来的`vnode`。

回到`createComponent`方法中，因为`componentInstance`条件以及`keepAlive`条件以及满足，所以会调用`reactivateComponent`方法。
```js
function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  // 省略代码
  insert(parentElm, vnode.elm, refElm)
}
```
此处代码的作用就是把缓存下来的`DOM`元素插入到其父级的下面，至此缓存渲染以及完毕。

## 生命周期
跟`keep-alive`相关的生命周期有两个：`activated`和`deactivated`。

在介绍这两个跟缓存有关的生命周期的时候，我们在上面例子的基础上添加如下代码：
```js
// A组件
export default {
  mounted () {
    console.log('A mounted')
  },
  activated () {
    console.log('A activated')
  },
  deactivated () {
    console.log('A deactivated')
  }
}

// B组件
export default {
  mounted () {
    console.log('B mounted')
  },
  activated () {
    console.log('B activated')
  },
  deactivated () {
    console.log('B deactivated')
  }
}
```

### activated
当`A`组件首次渲染的时候，它依次输出：
```js
'A mounted'
'A activated'
```
当组件缓存渲染的时候，它输出：
```js
'A activated'
```
那么，我们来看一下`activated`生命周期是什么时候开始执行的。

我们再来回顾一下`vnode`的`insert`钩子函数：
```js
const componentVNodeHooks = {
  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  }
}
```
我们可以看到，当`A`组件首次渲染的时候，它会调用`activateChildComponent`，而缓存渲染的时候会调用`queueActivatedComponent`。

我们先来看一下`activateChildComponent`方法，其代码如下：
```js
export function activateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = false
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false
    for (let i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm, 'activated')
  }
}
```
我们可以从以上代码发现：`activateChildComponent`方法不仅会手动触发`activated`生命周期钩子函数，还会递归遍历子节点并触发其`activated`钩子函数，前提是子节点也使用了`keep-alive`进行包裹。

接下来，我们再来看一下`queueActivatedComponent`方法，它定义在`src/core/observer/scheduler.js`文件中，其代码如下：
```js
export function queueActivatedComponent (vm: Component) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false
  activatedChildren.push(vm)
}
```
它所做的事情很简单，就是把当前组件实例添加到`activatedChildren`数组中，其中这个数组在`nextTick`的时候，调用`flushSchedulerQueue`方法的时候被处理：
```js
function flushSchedulerQueue () {
  // 省略代码
  const activatedQueue = activatedChildren.slice()
  callActivatedHooks(activatedQueue)
  // 省略代码
} 

function callActivatedHooks (queue) {
  for (let i = 0; i < queue.length; i++) {
    queue[i]._inactive = true
    activateChildComponent(queue[i], true)
  }
}
```

### deactivated
当从`A`组件切换到`B`组件的时候，会分别触发`A`组件的`deactivated`钩子函数和`B`组件的`activated`钩子函数，反之亦然。

对于`deactivated`钩子函数的处理逻辑，它发生在`vnode`的`destroy`钩子函数中，代码如下：
```js
const componentVNodeHooks = {
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
我们可以看到，如果不是缓存组件则直接调用`$destroy`进行组件销毁，如果是缓存组件则调用`deactivateChildComponent`。

我们来看一下`deactivateChildComponent`方法的代码，如下：
```js
export function deactivateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = true
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true
    for (let i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i])
    }
    callHook(vm, 'deactivated')
  }
}
```
我们可以发现`deactivateChildComponent`和我们前面介绍的`activateChildComponent`方法所做的事情有点类似，区别只是它们触发了不同的钩子函数而已。
