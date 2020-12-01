# codegen代码生成

在`optimize`优化章节介绍完毕以后，我们来到了编译的最后一步：代码生成。`codegen`代码生成阶段的逻辑相对来说还是比较多的，在这一节我们尽可能的分析常见的使用场景，例如：对`v-for`、`v-if/v-else`以及`v-for`等场景代码生成流程的分析。

在`baseCompile`方法中，我们可以看到在`parse`和`optimize`这两个主要流程之后，最后一步`codegen`的过程：
```js
import { generate } from './codegen/index'
function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}
```

## generate
在`baseCompile`方法中，`codegen`负责将优化好的`AST`树形结构转换成可执行代码，其中最重要的是`code.render`。`generate`方法就是用来负责处理这个过程的，它是从`src/compiler/codegen/index.js`文件中引入的，其代码如下：
```js
export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  const state = new CodegenState(options)
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
}
```
在`generate`方法中它首先判断了`ast`，如果没有`ast`，则`code`赋值为`_c("div")`，如果有则调用`genElement`方法。在其返回对象的`render`属性中，它使用`with`把我们的代码进行了包裹。在`compileToFunctions`章节中，我们介绍过它会使用`new Function`的形式把字符串代码转换成真正的`Function`。
```js
function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err, code })
    return noop
  }
}

// 转换前
const render = 'with(this){return _c("div")}'

// 转换后
const func = function () {
  with (this) {
    return _c('div')
  }
}
```
还记得`_c`是什么吗？，`_c`是在`initRender`中定义的一个方法：
```js
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
```
在`codegen`代码生成阶段，我们会接触到各种类似命名的函数，它们都是辅助函数，我们可以在`src/core/instance/render-helpers/index.js`文件中找到：
```js
export function installRenderHelpers (target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}
```
上面的辅助函数有很多，我们来重点说明几个最常用的：
```js
export function installRenderHelpers (target: any) {
  target._s = toString          // 转字符串
  target._l = renderList        // 处理v-for列表
  target._t = renderSlot        // 处理插槽
  target._m = renderStatic      // 处理静态节点
  target._f = resolveFilter     // 处理过滤器
  target._v = createTextVNode   // 创建文本VNode
  target._e = createEmptyVNode  // 创建空VNode
}
```

## genElement
在`generate`方法中，它通过调用`genElement`来返回一个对象，我们来看一下这个方法的定义：
```js
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    let code
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}
```
我们可以在`genElement`方法中清晰的看到，它会根据`ast`属性的不同来分别调用不同的代码生成函数。例如：`genStatic`用来处理生成静态节点的、`genFor`用来处理`v-for`循环的，`genChildren`用来处理子节点的以及`genComponent`用来处理组件的。

下一步，我们的目标是对这些不同的代码生成函数来进行分析，同时由于`codegen`代码生成的逻辑相对来说还是比较多的，因此我们只介绍最常见的几种。

## genStatic
在之前的`optimize`章节中，我们分析过是否为静态根节点的条件，假设我们有以下`template`：
```js
const html = `<div><p>Hello</p></div>`
```
根据之前的分析过程，我们知道`div`节点会被标记为`staticRoot`静态根节点。在第一次执行`genElement`方法的时候，因为`staticRoot`为`true`，`staticProcessed`为`false`，因此会调用`genStatic`方法。接下来，我们来看一下`genStatic`方法的代码：
```js
function genStatic (el: ASTElement, state: CodegenState): string {
  el.staticProcessed = true
  // ...省略pre相关
  state.staticRenderFns.push(`with(this){return ${genElement(el, state)}}`)
   // ...省略pre相关
  return `_m(${
    state.staticRenderFns.length - 1
  }${
    el.staticInFor ? ',true' : ''
  })`
}
```
在`genStatic`方法的最开始，它首先对`staticProcessed`赋值为`true`，这样做是为了防止在递归调用`genElement`方法的过程中，重复调用`genStatic`。接着，它递归调用`genElement`来处理`div`的子节点`p`。在处理`p`节点的过程中，因为`p`节点不满足静态根节点的条件，因此它会走其他代码生成函数。我们这里为了方便，直接说明结果，至于结果如何来的，我们会在之后的小节中进行介绍：
```js
// p节点的文本内容
const text = '_v(["Hello"])'

// p节点
const p = '_c("p", [_v(["Hello"])])'

// div节点
const div = '_c("div", [_c("p", [_v(["Hello"])])])'

// state.staticRenderFns数组
const state = {
  staticRenderFns: ['_c("div", [_c("p", [_v(["Hello"])])])']
}
```
我们最后来看`genStatic`的返回值，因为`staticRenderFns`数组只有一条数据并且`staticInFor`为`false`，因此函数返回值为：
```js
return '_m(0)'
```
在分析完`genStatic`方法后，我们可以知道：**静态根节点代码生成的render存放在staticRenderFns中，而不是render**

最后回到`baseCompile`方法，在我们的例子中，我们使用`generate`生成`code`后，`baseCompile`方法的返回值如下：
```js
return {
  ...,
  render: '_m(0)',
  staticRenderFns: ['_c("div", [_c("p", [_v(["Hello"])])])']
}
```

## genIf

## genFor

## genChildren

## genComponent