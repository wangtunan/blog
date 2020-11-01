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
当不传递`data`的时候，我们需要把第三、第四个参数往后移动一个位置，然后把`data`赋值为`undefined`，最后在把处理好的参数传递给`_createElement`。接下来，我们先看一下`_createElement`方法几个参数的具体作用：
* `context`：`VNode`当前上下环境。
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

* **规范化子节点**：
* **创建VNode节点**：