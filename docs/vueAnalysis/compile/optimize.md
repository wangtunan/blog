# optimize优化
在经过`parse`模板编译完成后，我们可以得到一个`ast`树形结构，接下来进行`optimize`优化第二大步骤。这个过程相比较其它两个步骤，是最简单的。

```js
import { parse } from './parser/index'
import { optimize } from './optimizer'

function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // ...
}
```

优化的**目的**在于：在编译的时候有些节点自首次渲染完毕后，在后续的派发更新过程中不会随着数据的变动而变动，因此我们在进行节点对比的时候，可以直接跳过这些节点，进一步加快组件渲染的速度。

在`optimize`优化的过程中，它的处理方式是深度遍历`ast`树形结构，遇到静态节点的时候把它的`ast.static`属性设置为`true`。同时对于一个父`ast`节点来说，当其`children`子节点全部为静态节点的时候，那么其本身也是一个静态节点，我们把它的`ast.staticRoot`设置为`true`。

在介绍`optimize`优化这个章节的时候，我们以下面这个例子为例：
```js
let html = `
  <div>
    <p>{{msg}}</p>
    <span>静态节点</span>
  </div>
`
```
在以上例子中，`span`节点因为其内容是纯文本，因此它的`ast.static`一定为`true`。

我们回过头来看一下`optimize`方法的定义，其代码如下：
```js
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  markStatic(root)
  // second pass: mark static roots.
  markStaticRoots(root, false)
}
```

在这个方法中，它首先调用`markStatic`标记静态节点，然后调用`markStaticRoots`来标记静态根节点。

## 静态节点类型
在`markStatic`方法中，它首先调用`isStatic`方法来判断当前`ast`是否为一个静态节点，其代码如下：
```js
function markStatic (node: ASTNode) {
  node.static = isStatic(node)
  // ...
}
function isStatic (node: ASTNode): boolean {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}
```
在阅读完`isStatic`方法后，我们发现静态节点必须满足以下几种情况：
1. 带插值(表达式)的文本节点，不是静态节点，例如：
```js
// 不是静态节点
let html = `<div>{{msg}}</div>`
```
2. 纯文本节点，是静态节点，例如：
```js
// 是静态节点
let html = `<div>Hello, Vue.js</div>`
```
3. 如果是普通元素节点，并且使用了`v-pre`指令，则是静态节点，例如：
```js
// 是静态节点
let html = `<div v-pre>{{msg}}</div>`
```
4. 如果是普通元素，在没有使用`v-pre`指令的情况下，还必须同时满足：没有动态绑定属性、没有使用`v-if`、没有使用`v-for`、不是内置组件`slot/component`、是平台保留标签、不是带有`v-for`的`template`标签的直接子节点、节点的所有属性的`key`都是静态`key`，例如：
```js
// 是静态节点
let html = '<div class="box"></div>'
```

## 标记静态节点
在分析完`isStatic`方法后，我们来分析一下`markStatic`标记静态节点方法的实现原理，其代码如下：
```js
function markStatic (node: ASTNode) {
  node.static = isStatic(node)
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        node.static = false
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}
```
代码分析：
* `type=2`或`type=3`的时候，代表它们分别是带表达式的插值文本和纯文本，这个时候使用`isStatic`方法的返回结果，直接标记`static`属性为`true`即可。
* 对于`type=1`，它是普通元素节点的时候，判断逻辑稍微复杂一点。第一步首先需要使用`for`循环去遍历`children`子节点，然后在`for`循环中递归调用`markStatic`方法，以达到深度遍历并标记子节点的目的。在这个过程中，唯一一个值得注意的地方就是，在对`children`子节点标记完毕后，会根据子节点的`static`属性来设置父节点的`static`属性。只要有一个子节点的`static`属性不为`true`，那么父节点也一定不为`true`。第二步，如果当前节点有`v-if/v-else-if/v-else`等指令，由于这些节点并不会保存在`children`数组中，而是在`node.ifConditions`属性下面，因此我们需要遍历`ifConditions`数组，来递归标记子节点。同样的，在标记完子节点后，我们需要根据子节点的`static`来同步更新父节点的`static`。
```js
const showMsg = false
let html = `
  <div>
    <div v-if="showMsg">show</div>
    <div v-else="showMsg">not show</div>
  </div>
`

const node = {
  ifConditions: [
    { exp: 'showMsg', block: 'div的ast节点' }，
    { exp: undefined, block: 'div的ast节点' }
  ]
}
```

## 标记静态根节点
在介绍完标记静态节点后，我们接着要介绍标记静态根节点`markStaticRoots`方法，其代码如下：
```js
function markStaticRoots (node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}
```
我们可以看到，在`markStaticRoots`方法中它对于`children`子节点和带`v-if/v-else-if/v-else`等指令的处理过程是类似的，我们省略这部分内容重复的介绍。

我们来看下面这段有意思的代码：
```js
// For a node to qualify as a static root, it should have children that
// are not just static text. Otherwise the cost of hoisting out will
// outweigh the benefits and it's better off to just always render it fresh.
if (node.static && node.children.length && !(
  node.children.length === 1 &&
  node.children[0].type === 3
)) {
  node.staticRoot = true
  return
} else {
  node.staticRoot = false
}
```
我们从注释中也可以看出来，如果当前节点`static`属性为`true`了，要标记它为静态根节点的话，还必须满足它的子节点不能只有一个纯文本节点，因为这样做其优化成本要大于其收益。