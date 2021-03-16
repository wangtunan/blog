# codegen代码生成

在`optimize`优化章节介绍完毕以后，我们来到了编译的最后一步：`codegen`代码生成。

`codegen`代码生成阶段的逻辑相对来说还是比较多的，在这一节我们尽可能的分析常见的使用场景，例如：对`v-for`、`v-if/v-else`以及`v-for`等场景代码生成流程的分析。

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
  </ul>
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
`genChildren`是用来处理子节点的，对于子节点来说通常有两种情况：`v-for`循环的子节点、正常的子节点。

在调用`genElement`的时候，当节点不匹配前面提到的`genStatic`、`genIf`和`genFor`等等情况的时候，证明当前节点是一个普通节点，此时调用`genChildren`来处理它的子节点，当子节点处理完毕后只需要使用`_c`把子节点包裹起来就可以了。

```js
export function genElement (el: ASTElement, state: CodegenState): string {
  // ...
  const children = el.inlineTemplate ? null : genChildren(el, state, true);
  code = `_c('${el.tag}'${
    data ? `,${data}` : '' // data
  }${
    children ? `,${children}` : '' // children
  })`
  // ...
}
```

接下来，我们来看一下`genChildren`的代码：
```js
export function genChildren (
  el: ASTElement,
  state: CodegenState,
  checkSkip?: boolean,
  altGenElement?: Function,
  altGenNode?: Function
): string | void {
  const children = el.children
  if (children.length) {
    const el: any = children[0]
    // optimize single v-for
    if (children.length === 1 &&
      el.for &&
      el.tag !== 'template' &&
      el.tag !== 'slot'
    ) {
      const normalizationType = checkSkip
        ? state.maybeComponent(el) ? `,1` : `,0`
        : ``
      return `${(altGenElement || genElement)(el, state)}${normalizationType}`
    }
    const normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0
    const gen = altGenNode || genNode
    return `[${children.map(c => gen(c, state)).join(',')}]${
      normalizationType ? `,${normalizationType}` : ''
    }`
  }
}
```

### v-for遍历子节点
我们可以在`genChildren`中看到，它首先对`v-for`循环遍历的情况做了判断，为了更好的理解，我们使用在`genFor`小结的例子来举例说明：
```js
const list = ['AAA', 'BBB', 'CCC']
let html = `
<ul>
  <li v-for="item in list" :key="item">{{item}}</li>
</ul>`
```
当第一次调用`genElement`处理`ul`标签的时候，因为`ul`上没有任何属性或者指令，因此调用`genChildren`开始处理子节点。在`if`分支条件判断时，其值为真，会递归调用`genElement`来处理`li`标签。此时`li`标签因为有`v-for`，所以会使用`genFor`来处理，当`genFor`处理完毕后，其返回值如下：
```js
const code = '_l((list),function(item){return _c("li",{key:item},[_v(_s(item))])})'
```
待`li`标签处理完毕后，`genChildren`的返回值如下：
```js
return `_l((list),function(item){return _c('li',{key:item},[_v(_s(item))])}),0`
```
此时`ul`标签调用`genChildren`处理子节点完毕，最后使用`_c`把`children`包裹起来并赋值给`code`，其值如下：
```js
const code = `_c('ul',_l((list),function(item){return _c('li',{key:item},[_v(_s(item))])}),0)`
```

### 普通子节点
在介绍完`v-for`遍历子节点后，我们来看一种正常子节点的案例：
```js
const msg = 'hello'
let html = `
<div>
  <p>{{msg}}</p>
  <p>no data</p>
  文本节点
</div>`
```
因为`div`标签上没有任何属性和指令，因此它会调用`genChildren`来处理子节点，当执行到`genChildren`后，它不满足`if`分支的逻辑判断条件，因此会执行下面这段代码：
```js
export function genChildren (
  el: ASTElement,
  state: CodegenState,
  checkSkip?: boolean,
  altGenElement?: Function,
  altGenNode?: Function
): string | void {
  const children = el.children
  if (children.length) {
    const el: any = children[0]
    // ...省略v-for相关
    const normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0
    const gen = altGenNode || genNode
    return `[${children.map(c => gen(c, state)).join(',')}]${
      normalizationType ? `,${normalizationType}` : ''
    }`
  }
}
```
在`genChildren`代码中，它会遍历`children`子节点数组，通过`genNode`按照`ast`的`type`类型分情况调用`genElement`、`genComment`和`genText`。
```js
function genNode (node: ASTNode, state: CodegenState): string {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}
export function genText (text: ASTText | ASTExpression): string {
  return `_v(${text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))
  })`
}
export function genComment (comment: ASTText): string {
  return `_e(${JSON.stringify(comment.text)})`
}
```
代码分析：
* 当`children`第一次遍历时，它是一个`p`标签并且子节点是一个带变量的插值表达式，会递归调用`genElement`，在遍历完毕后，它的返回值如下：
```js
const p = `_c('p', [_v(_s(msg))])`
```
* 当`children`第二次遍历时，它同样是一个`p`标签，但它是一个静态节点，其子节点是一个纯文本，会递归调用`genElement`，在遍历完毕后，它的返回值如下：
```js
const p = `_c('p', [_v('no data')])`
```
* 当`children`第三次遍历时，它是一个纯文本，会调用`genText`来处理，在遍历完毕后，它的返回值如下：
```js
const text = `_v('文本节点')`
```
* 最后，当`children`都遍历完毕后，会调用`join(',')`方法把数组元素用逗号连接成字符串，也就是说`genChildren`的返回值如下：
```js
return `[_c('p', [_v(_s(msg))]),_c('p', [_v('no data')]),_v('文本节点')]`
```
`genChildren`处理子节点完毕以后，会使用`_c`把子节点包裹起来并赋值给`code`，其值如下：
```js
const code = `_c('div', [_c('p', [_v(_s(msg))]),_c('p', [_v('no data')]),_v('文本节点')])`
```

## genComponent
```js
export function genElement (el: ASTElement, state: CodegenState): string {
  // ...
  if (el.component) {
    code = genComponent(el.component, el, state)
  } else {
    // ...
  }
  return code
}
```
我们在`genElement`方法中可以看到，想要调用`genComponent`方法，`AST`的`component`属性必须有值。我们先来看一下`component`属性什么时候被赋值，其实它是在`parse`编译的时候赋值的，在`processComponent`方法中有如下代码：
```js
function processComponent (el) {
  let binding
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true
  }
}
```
我们可以看到，它使用`getBindingAttr`获取了`is`属性，如果有值且判断为真则赋值给`el.component`。那么，让我们回想一下什么组件可以撰写`is`属性呢？答案是内置组件`component`，也就是说`genComponent`是用来处理`component`内置组件的。

根据我们的分析，我们假设有如下案例：
```js
const name = 'App'
let html = '<component :is="name" />'
```
当调用`genElement`方法的时候，因为`el.component`值为`name`，条件判断为真调用`genComponent`。我们来看一下`genComponent`方法的实现代码，如下：
```js
function genComponent (
  componentName: string,
  el: ASTElement,
  state: CodegenState
): string {
  const children = el.inlineTemplate ? null : genChildren(el, state, true)
  return `_c(${componentName},${genData(el, state)}${
    children ? `,${children}` : ''
  })`
}
```
`genComponent`代码不是很多，因为`component`内置组件没有子节点，所以`genChildren`不返回任何内容。就我们的例子而言，它最后的返回值如下：
```js
return `_c(name,{tag:"component"}`
```
你可能会很好奇，返回值中的`tag:"component"`是如何来的，它其实是通过`genData`方法返回的。在`genData`方法中，对于内置组件`component`处理的相关代码如下：
```js
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  // ...
  if (el.component) {
    data += `tag:"${el.tag}",`
  }
  data = data.replace(/,$/, '') + '}'
  // ...
  return data
}
```

## genData
`genData`是用来处理节点上各种属性、指令、事件、作用域插槽以及`ref`等等，它的功能非常多，代码也多，但并不是很复杂，更多的是使用`if`分支来判断以上各种情况。

因此，为了有针对性的学习我们并不会对`genData`的每一行代码进行说明，而是针对几个常用的`case`案例来分析。
```js
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  // ...
  // key
  if (el.key) {
    data += `key:${el.key},`
  }
  // ref
  if (el.ref) {
    data += `ref:${el.ref},`
  }
  // module data generation functions
  for (let i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el)
  }
  // attributes
  if (el.attrs) {
    data += `attrs:${genProps(el.attrs)},`
  }
  data = data.replace(/,$/, '') + '}'
  // ...
  return data
}
```

假设，我们有如下`template`模板：
```js
let html = `
  <div>
    <p ref="pRef" key="p">123</p>
    <div class="box" style="{width:100px}" data-index="100"></div>
  </div>`
```
代码分析：
* 当处理`p`标签的时候，因为它有`ref`和`key`两属性，因此其返回值和生成的`code`如下：
```js
const data = `{ref:"pRef",key:"p"}`
const code = `_c("p", {ref:"pRef",key:"p"}, [_v("123")])`
```
* 当处理`div`标签的时候，它有`class`和`style`，对于这两个属性它们是使用`state.dataGenFns`来处理的。在`CodegenState`构造函数中，有这样一段代码：
```js
export class CodegenState {
  // ...
  constructor (options: CompilerOptions) {
    // ...
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData')
    // ...
  }
}
```
实例属性`dataGenFns`是通过所处不同的平台扩展而来的，对于`Web`浏览器端而言，`css Module`和`style Module`都定义了`genData`方法，它们在`src/platforms/web/compiler/modules`目录下的`class.js`和`style.js`。
```js
// css module
function genData (el: ASTElement): string {
  let data = ''
  if (el.staticStyle) {
    data += `staticStyle:${el.staticStyle},`
  }
  if (el.styleBinding) {
    data += `style:(${el.styleBinding}),`
  }
  return data
}
// style module
function genData (el: ASTElement): string {
  let data = ''
  if (el.staticClass) {
    data += `staticClass:${el.staticClass},`
  }
  if (el.classBinding) {
    data += `class:${el.classBinding},`
  }
  return data
}
```
所以对于实例属性`dataGenFns`而言，它是一个数组，其中有两个元素，一个是`css`的`genData`方法，另外一个是`style`的`genData`方法。当`for`循环遍历`state.dataGenFns`的时候，会分别调用它们。在遍历完毕后，此时的`data`值如下：
```js
let data = `{staticClass:"box",staticStyle:{"{width":"100px}"},`
```
* 最后，就是来处理`data-index`属性，它是通过`genProps`来处理的，这个方法的代码如下：
```js
function genProps (props: Array<ASTAttr>): string {
  let staticProps = ``
  let dynamicProps = ``
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const value = __WEEX__
      ? generateValue(prop.value)
      : transformSpecialNewlines(prop.value)
    if (prop.dynamic) {
      dynamicProps += `${prop.name},${value},`
    } else {
      staticProps += `"${prop.name}":${value},`
    }
  }
  staticProps = `{${staticProps.slice(0, -1)}}`
  if (dynamicProps) {
    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`
  } else {
    return staticProps
  }
}
```
当`genData`执行到最后时，其`data`返回值以及`div`标签生成`code`的值如下：
```js
let data = `{staticClass:"box",staticStyle:{"{width":"100px}"},attrs:{"data-index":"100"}}`
const code = `_c("div", {staticClass:"box",staticStyle:{"{width":"100px}"},attrs:{"data-index":"100"}})`
```

**小结**：在分析完`genData`这一小节后，标志着`codegen`代码生成章节已经全部介绍完毕了，通过这一章节我们知道了把`AST`转换成`code`过程中的各种细节。虽然我们极力撰写很多案例来说明，但依旧很有多逻辑我们无法覆盖到，例如：插槽/作用域插槽，`event`事件以及`v-model`等等。对于这些内容，我们会安排在后续的**扩展**章节进行分析。