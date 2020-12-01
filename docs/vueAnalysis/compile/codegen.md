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
`genIf`是用来处理`v-if/v-else`等指令的，在前面章节中我们介绍过如果存在`v-if/v-else`指令，那么其子节点是存放在`ifConditions`数组中的，以下面代码为例：
```js
const showMsg = true
let html = `
  <div>
    <div v-if="showMsg">show</div>
    <div v-else>not show</div>
  </div>
`
const ast = {
  if: true,
  ifConditions: [
    { exp: 'showMsg', block: 'div元素的ast' },
    { exp: undefined, block: 'div元素的ast' }
  ]
}
```
在调用`genElement`方法的时候，因为`ast`对象的`if`属性为`true`，并且`ifProcessed`属性为`false`，所以会调用`genIf`方法。接下来，我们来看一下`genIf`方法的代码：
```js
export function genIf (
  el: any,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {
  el.ifProcessed = true // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}
function genIfConditions (
  conditions: ASTIfConditions,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  const condition = conditions.shift()
  if (condition.exp) {
    return `(${condition.exp})?${
      genTernaryExp(condition.block)
    }:${
      genIfConditions(conditions, state, altGen, altEmpty)
    }`
  } else {
    return `${genTernaryExp(condition.block)}`
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}
```
在`genIf`方法中，它首先把`ifProcessed`赋值为`true`，这样做的目的在之前`genStatic`小节也提到过了，主要是为了防止递归调用`genElement`时重复执行`genIf`方法。然后，它调用`genIfConditions`来处理`ifConditions`数组。

在`genIfConditions`中，它每次获取数组的第一个，然后判断其`exp`表达式，如果有则使用三目运算表达式来返回，同时会递归调用`genIfConditions`，如果没有则直接返回`genTernaryExp`方法的调用结果。

我们结合之前我们提到的例子，来进行说明：
```js
// 第一次调用genIfConditions时
const condition = { exp: 'showMsg', block: 'div元素的ast' }

// if判断exp为真，调用genTernaryExp，再递归调用genElement，处理div的文本节点
const txt = '_v("show")'
const div = '_c("div", [_v("show")])'

// 递归调用genIfConditions时
const condition = { exp: undefined, block: 'div元素的ast' }

// if判断exp为假，调用genTernaryExp，再递归调用genElement，处理div的文本节点
const txt = '_v("not show")'
const div = '_c("div", [_v("not show")])'

// genIfConditions递归调用结束，genIf方法返回值
return '(showMsg)?_c("div", [_v("show")]):_c("div", [_v("not show")])'
```
再回到`baseCompiler`方法中，通过`generate`方法返回`code`后，最终的返回值如下：
```js
return {
  ...,
  render: 'with(this){return _c("div", [(showMsg)?_c("div", [_v("show")]):_c("div", [_v("not show")])])}',
  staticRenderFns: []
}
```

## genFor
`genFor`是用来处理`v-for`循环的，我们以下面代码为例来说明：
```js
const list = ['AAA', 'BBB', 'CCC']
let html =  `
  <ul>
    <li v-for="(item, index) in list" :key="index">{{item}}</li>
  </div>
`
```
在第一次调用`genElement`因为`ul`标签上没有任何指令或者属性，也不是一个组件，因此会调用`genChildren`递归调用`genElement`来处理子节点。第二次调用`genElement`时，这个时候处理`li`标签，因为`li`标签上存在`v-for`指令，它的`ast`对象的`for`属性为判断为真，并且`forProcessed`属性为`false`，因此会调用`genFor`方法。接下来，我们来看一下`genFor`方法的代码：
```js
export function genFor (
  el: any,
  state: CodegenState,
  altGen?: Function,
  altHelper?: string
): string {
  const exp = el.for
  const alias = el.alias
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : ''
  const iterator2 = el.iterator2 ? `,${el.iterator2}` : ''

  // ...

  el.forProcessed = true // avoid recursion
  return `${altHelper || '_l'}((${exp}),` +
    `function(${alias}${iterator1}${iterator2}){` +
      `return ${(altGen || genElement)(el, state)}` +
    '})'
}
```
在`genFor`方法的最开始，重新定义了几个属性，根据我们的例子这些属性值为：
```js
const exp = 'list'
const alias = 'item'
const iterator1 = ',index'
const iterator2 = ''
```
接着，它通过调用`genElement`来处理`li`标签及其的文本节点：
```js
const txt = '_v(_s(item))'
const li = '_c("li",{key:index},[_v(_s(item))])'
```
处理完毕以后，`genFor`方法的返回值如下：
```js
return '_l((list),function(item,index){return _c("li",{key:index},[_v(_s(item))])})'
```
在`genChildren`递归处理子节点完毕后，其值如下：
```js
const code = '_c("ul",l((list),function(item,index){return _c("li",{key:index},[_v(_s(item))])}),0)'
```
再回到`baseCompiler`方法中，通过`generate`方法返回`code`后，最终的返回值如下：
```js
return {
  ...,
  render: 'with(this){return _c("ul",l((list),function(item,index){return _c("li",{key:index},[_v(_s(item))])}),0)',
  staticRenderFns: []
}
```

## genChildren

## genComponent

## genData