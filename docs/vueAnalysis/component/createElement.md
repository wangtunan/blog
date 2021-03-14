# createElement
在上一节，我们知道了`render`函数执行的时候，会调用`$createElement`或者`_c`方法，也知道了它们最后其实调用的是同一个`createElement`方法，只不过最后一个参数有点区别。在这一节，我们来详细分析一下`createElement`方法的实现逻辑。

`createElement`是定义在`src/core/vdom/create-element.js`文件中，其代码如下：
```js
const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}
```

在分析代码之前，我们来看一下`$createElement`和`_c`方法最后一个不相同的参数，在`createElement`中体现在什么地方。我们可以从最后一个参数命名猜测其作用，对于模板编译调用`_c`时，其`alwaysNormalize`传递的是`false`，因为`_c`只会在内部使用，因此其方法调用的时候参数格式是比较规范的，我们不需要过多的进行`normalize`。而`$createElement`是提供给用户使用的，为了让`$createElement`更加简洁和实用，允许用户传递不同形式的参数来调用`$createElement`，这也就造成了用户手写的`render`，我们必须始终进行`normalize`。

在上述分析完毕后，我们就知道了`$createElement`和`_c`最后一个不相同的参数，体现在什么地方了：调用`_c`时对`children`进行简单规范化，调用`$createElement`时必须始终对`children`进行规范化。

回到正题，我们发现`createElement`其实是对`_createElement`方法的一层包裹，之所以这样做是为了让`createElement`达到一种类似于**函数重载**的功能(`JavaScript`实际并没有这个概念)。其中第三个参数`data`是可以不传的。
```js
// 不传递data 
createElement(this, 'div', 'Hello, Vue', 1, false)
// 传递data
createElement(this, 'div', undefined, 'Hello, Vue', 1, false)
```
当不传递`data`的时候，我们需要把第三、第四个参数往后移动一个位置，然后把`data`赋值为`undefined`，最后在把处理好的参数传递给`_createElement`。

接下来，我们先看一下`_createElement`方法几个参数的具体作用：
* `context`：`VNode`当前上下文环境。
* `tag`：标签，可以是正常的`HTML`元素标签，也可以是`Component`组件。
* `data`：`VNode`的数据，其类型为`VNodeData`，可以在根目录`flow/vnode.js`文件中看到其具体定义。
* `children`：`VNode`的子节点。
* `normalizationType`：`children`子节点规范化类型。

其具体实现代码如下：
```js
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  // ...省略代码
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn(
          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
          context
        )
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  // ...省略代码
}
```
`_createElement`的代码看起来有点多，但它主要做两件事情：**规范化子节点和创建VNode节点**，接下来我们围绕这两个方面来详细介绍。

* **规范化子节点**：因为虚拟`DOM`是一个树形结构，每一个节点都应该是`VNode`类型，但是`children`参数又是任意类型的，所以如果有子节点，我们需要把它进行规范化成`VNode`类型，如果没有子节点，那么`children`就是`undefined`。至于如何规范化，则是通过`normalizationType`参数来实现的，其中`normalizationType`可能的值我们只说三种：`undefined`表示不进行规范化，`1`表示简单规范化，`2`表示始终规范化。我们先来看当值为`1`的情况，它调用了`simpleNormalizeChildren`，这个方法和`normalizeChildren`是定义在同一个地方`src/core/vdom/helpers/normalize-children.js`文件中，其代码如下：
```js
export function simpleNormalizeChildren (children: any) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
```
`simpleNormalizeChildren`的作用是把多维数组降低一个维度，例如二维数组降低到一维数组，三维数组降低到二维数组，这样做的目的是为了方便后续遍历`children`。
```js
// 展示使用，实例为VNode
let children = ['VNode', ['VNode', 'VNode'], 'VNode']

// 简单规范化子节点
children = simpleNormalizeChildren(children)

// 规范化后
console.log(children) // ['VNode', 'VNode', 'VNode', 'VNode']
```
接下来我们来看值为`2`的情况，它调用了`normalizeChildren`，其代码如下：
```js
export function normalizeChildren (children: any): ?Array<VNode> {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}
```
`normalizeChildren`的代码不是很多，也不是很复杂。当`children`是基础类型值的时候，直接返回一个文本节点的`VNode`数组，`createTextVNode`我们在之前已经介绍过了。如果不是，则再判断是否为数组，不是则其`children`就是`undefined`，是的话就调用`normalizeArrayChildren`来规范化。接下来，我们重点分析以下`normalizeArrayChildren`的实现，它和`normalizeChildren`是定义在同一个位置，其实现代码如下：
```js
function normalizeArrayChildren (children: any, nestedIndex?: string): Array<VNode> {
  const res = []
  let i, c, lastIndex, last
  for (i = 0; i < children.length; i++) {
    c = children[i]
    if (isUndef(c) || typeof c === 'boolean') continue
    lastIndex = res.length - 1
    last = res[lastIndex]
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, `${nestedIndex || ''}_${i}`)
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]: any).text)
          c.shift()
        }
        res.push.apply(res, c)
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c)
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c))
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text)
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = `__vlist${nestedIndex}_${i}__`
        }
        res.push(c)
      }
    }
  }
  return res
}
```
虽然`normalizeArrayChildren`的代码很多，但做的事情并不复杂，我们只要关注遍历过程中几个重要的逻辑分支即可。
1. 遍历项为数组：这种情况稍微复杂一点，多见于`v-for`或者`slot`的时候，会出现嵌套`VNode`数组的情况，如果存在嵌套`VNode`的情况会递归调用`normalizeArrayChildren`，我们以下面这个例子为例：
```vue
<template>
  <div id="app">
    <p>{{msg}}</p>
    <span v-for="(item, index) in list" :key="index">{{item}}</span>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'message',
      list: [1, 2, 3]
    }
  }
}
</script>
```
当`App`组件`render`函数执行的时候，其`children`子节点会出现`VNode`嵌套数组的情况，可以用以下代码示例说明：
```js
const children = [
  [ { tag: 'p' }, ... ],
  [
    [ { tag: 'span', ... } ],
    [ { tag: 'span', ... } ],
    [ { tag: 'span', ... } ]
  ]
]
```
递归调用`normalizeArrayChildren`方法后，嵌套数组被处理成了一维数组，如下：
```js
const children = [
  [ { tag: 'p' }, ... ],
  [ { tag: 'span', ... } ],
  [ { tag: 'span', ... } ],
  [ { tag: 'span', ... } ]
]
```
2. 遍历项为基础类型：当为基础类型的时候，调用封装的`createTextVNode`方法来创建一个文本节点，然后`push`到结果数组中。
3. 遍历项已经是`VNode`类型：这种情况最简单，如果不属于以上两种情况，那么代表本身已经是`VNode`类型了，这时候我们什么都不需要做，直接`push`到结果数组中即可。

在这三个逻辑分支中，都判断了`isTextNode`，这部分的代码主要是用来优化文本节点：如果存在两个连续的文本节点，则将其合并成一个文本节点。
```js
// 合并前
const children = [
  { text: 'Hello ', ... },
  { text: 'Vue.js', ... },
]

// 合并后
const children = [
  { text: 'Hello Vue.js', ... }
]
```
* **创建VNode节点**：创建`VNode`节点的逻辑有两大分支，`tag`为`string`类型和`component`类型，其中`string`类型又存在几个小的逻辑判断分支。在`createElement`章节，我们重点介绍类型为`string`的分支。在这个分支中，首先判断`tag`提供的标签名是不是平台保留标签(`html`或`svg`标签)，如果是则直接创建对应标签的`VNode`节点，如果不是则尝试在已经全局或者局部注册的组件中去匹配，匹配成功则使用`createComponent`去创建组件节点，如果没有匹配上则创建一个未知标签的`VNode`节点，例如：
```vue
<template>
  <div id="app">
    <div>{{msg}}</div>
    <hello-world :msg="msg" />
    <cms>12321321</cms>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'App',
  data () {
    return {
      msg: 'message',
    }
  },
  components: {
    HelloWorld
  }
}
</script>
```
`tag`为`cms`，但它既不像`div`一样是平台保留标签，又不像`hello-world`一样是已经局部注册过的组件，它属于未知的标签。这里之所以直接创建未知标签的`VNode`而不是报错，这是因为子节点在`createElement`的过程中，有可能父节点会为其提供一个`namespace`，真正做未知标签校验的过程发生在`path`阶段，`path`的过程我们将在后续进行介绍。