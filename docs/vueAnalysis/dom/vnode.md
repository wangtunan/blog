# VNode介绍
在`DOM`元素中有不同类型的节点，例如：**元素节点**、**文本节点**和**注释节点**，如果`VNode`实例代表节点的话，那么`VNode`实例应该能创建不同类型的实例，用来表示不同类型的节点，而`VNode`也确实可以做到。`VNode`类定义在`src/core/vdom/vnode.js`文件中，其代码如下：
```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>, 
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

我们可以从以上代码看到，`VNode`有很多个属性，我们千万不要被这些属性吓到，最重要的属性只有几个：`tag`、`data`、`children`和`key`。其余很多属性只是在`Vue`中为适用不同的场景，额外添加的。

`Vue`中的`VNode`实例有几种类型，具体如下：
* 注释节点：注释节点可以使用`text`和`isComment`两个属性来配合表示。
```vue
<template>
  <!-- 一个注释节点 -->
</template>
```
在`Vue`中，我们通过`createEmptyVNode`方法来定义注释节点，此方法跟`VNode`类是定义在同一个地方，其代码如下：
```js
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
```
* 文本节点：文本节点比注释节点更简单，只需要`text`属性即可。
```vue
<template>
  一个文本节点
</template>
```
创建文本节点可以使用`createTextVNode`方法，此方法跟`VNode`类是定义在同一个地方，其代码如下：
```js
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}
```
* 克隆节点：克隆节点是将现有某个节点的所有属性全部克隆到另外一个新节点，让新节点和某个节点属性保持一致，唯一的区别是新克隆节点的`isCloned`属性为`true`，我们会在后续组件章节介绍克隆节点的具体作用。
```js
// 原始文本节点
const originNode = {
  text: '原始节点',
  isCloned: false
}

// 克隆文本节点
const cloneNode = {
  text: '原始节点',
  isCloned: true
}
```
克隆一个节点，可以使用`cloneVNode`方法，它与`VNode`类是定义在同一个地方，其代码如下：
```js
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}
```
* 元素节点：元素节点是我们日常开发中接触最多的，它可以使用`tag`、`data`、`children`和`context`几个属性配合表示。
```vue
<template>
  <div id="app" class="app-main">元素节点</div>
</template>
```
假设以上`template`模板，那么`div`元素节点可以使用`VNode`表示为：
```js
const vnode = {
  tag: 'div',
  data: {
    attrs: {
      id: 'app'
    }
    class: 'app-main'
  },
  children: [VNode],
  context: vm
}
```
1. `tag`表示为元素标签的类型，例如：`p`、`div`或者`ul`等。
2. `data`表示节点上的数据，包括`atts`、`style`和`class`等。
3. `children`表示子节点列表，它是一个`VNode`实例数组。
4. `context`当前节点所处的编译作用域。

* 组件节点：组件节点和元素节点有很多相似的地方，但它有两个独有的属性，分别是`componentOptions`和`componentInstance`，其中`componentOptions`表示组件的`options`选项，`componentInstance`表示当前组件的实例。
```vue
<template>
  <child-component />
</template>
```