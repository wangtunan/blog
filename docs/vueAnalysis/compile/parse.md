# parse模板解析
在之前提到的`baseCompile`基础编译方法中，有这样一段代码：
```js
import { parse } from './parser/index'
function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  // ...
}
```
我们可以发现，它调用了`parse`方法来对`template`模板进行编译，编译的结果是一个`AST`抽象语法树，这个`AST`抽象语法树会在之后使用到，在这一小节我们的目标是弄清楚`parse`模板编译的原理。

## AST抽象语法树

### JavaScript中的AST
`AST`是`Abstract Syntax Tree`的缩写，中文翻译成抽象语法树，它是对源代码抽象语法结构的树状表现形式。在很多优秀的开源库中，都有`AST`的身影，例如：`Babel`、`Webpack`、`TypeScript`、`JSX`以及`ESlint`等等。

我们不会在这里对`AST`做过多的介绍，仅举例说明在其`JavaScript`中的使用案例。假设我们有以下方法定义，我们需要对这段代码进行解析：
```js
function add (a, b) {
  return a + b
}
```
* 对于整段代码而言，它属于一个`FunctionDeclaration`函数定义，因此我们可以使用一个对象来表示：
```js
const FunctionDeclaration = {
  type: 'FunctionDeclaration'
}
```
* 我们可以将上面这个函数定义分层三个主要部分：**函数名**、**函数参数**以及**函数体**，其中它们分别使用`id`、`params`以及`body`来表示，此时函数对象添加这几个属性后如下：
```js
const FunctionDeclaration = {
  type: 'FunctionDeclaration',
  id: {},
  params: [],
  body: {}
}
```
* 对于函数名`id`而言，我们无法再对它进行拆分，因为它已经是最小的单位了，我们用`Identifier`来表示：
```js
const FunctionDeclaration = {
  type: 'FunctionDeclaration',
  id: {
    type: 'Identifier',
    name: 'add'
  },
  ...
}
```
* 对于函数参数`params`而言，我们可以看成是一个`Identifier`的一个数组：
```js
const FunctionDeclaration = {
  type: 'FunctionDeclaration',
  params: [
    { type: 'Identifier', name: 'a' },
    { type: 'Identifier', name: 'b' }
  ],
  ...
}
```
* 对于函数体而言，也就是花括号以及花括号里面的内容，我们首先用`BlockStatement`来表示花括号，然后用`body`来表示花括号里面的内容：
```js
const FunctionDeclaration = {
  type: 'FunctionDeclaration',
  body: {
    type: 'BlockStatement',
    body: []
  }
}
```
在花括号中，我们可以有多段代码，因此它是一个数组形式。在我们的例子中，它使用`return`返回一个表达式的值，对于`return`我们可以使用`ReturnStatement`来表示，而对于`a + b`这种形式，我们可以使用`BinaryExpression`。对于`BinaryExpression`而言，它存在`left`(`a`)、`operator`(`+`)和`right`(`b`)三个属性。在介绍完以上概念后，对于上面的例子它完整的解析对象可以用下面对象来表示：
```js
const FunctionDeclaration = {
  type: 'FunctionDeclaration',
  id: { type: 'Identifier', name: 'add' },
  params: [
    { type: 'Identifier', name: 'a' },
    { type: 'Identifier', name: 'b' }
  ],
  body: {
    type: 'BlockStatement',
    body: [
      {
        type: 'ReturnStatement',
        argument: {
          type: 'BinaryExpression',
          left: { type: 'Identifier', name: 'a' },
          operator: '+',
          right: { type: 'Identifier', name: 'a' }
        }
      }
    ]
  }
}
```

如果你对如何把`JavaScript`解析成`AST`有兴趣的话，你可以在[AST Explorer](https://astexplorer.net/)网站上看到根据`JavaScript`代码实时生成的`AST`。

### Vue中的AST
在`Vue`的模板编译阶段，它使用`createASTElement`方法来创建`AST`，其代码如下：
```js
export function createASTElement (
  tag: string,
  attrs: Array<ASTAttr>,
  parent: ASTElement | void
): ASTElement {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent,
    children: []
  }
}
```
我们可以看到，`createASTElement`方法很简单，仅仅是返回一个`ASTElement`类型的对象而已，其中`ASTElement`类型定义在`flow/compiler.js`中可以找到。他的属性有很多，我们只介绍几种：
```flow
declare type ASTElement = {
  type: 1;                          // 元素类型
  tag: string;                      // 元素标签
  attrsList: Array<ASTAttr>;        // 元素属性数组
  attrsMap: { [key: string]: any }; // 元素属性key-value
  parent: ASTElement | void;        // 父元素
  children: Array<ASTNode>;         // 子元素集合
}
```
为了方便我们更好的理解模板编译生成的`AST`，我们举例说明，假设有以下模板：

**注意**：如果你要调试、查看编译生成的`AST`，你应该使用`runtime + compiler`版本，如果是`runtime + only`版本的话，组件会被`vue-loader`处理，不会进行`parse`编译。
```js
new Vue({
  el: '#app',
  data () {
    return {
      list: ['AAA', 'BBB', 'CCC']
    }
  },
  template: `
    <ul v-show="list.length">
      <li v-for="item in list" :key="item" class="list-item">{{item}}</li>
    </ul>
  `
})
```
在`baseCompile`方法中，我们对于`parse`这行代码断点的话，我们可以看到此时生成的`AST`如下：
```js
// ul标签AST精简对象
const ulAST = {
  type: 1,
  tag: 'ul',
  attrsList: [
    { name: 'v-show', value: 'list.length' }
  ],
  attrsMap: {
    'v-show': "list.length"
  },
  parent: undefined,
  directives: [
    { name: 'show', rawName: 'v-show', value: 'list.length' }
  ],
  children: [], // li的AST对象
}
// li标签的AST精简对象
const liAST = {
  type: 1,
  tag: 'li',
  alias: 'item',
  attrsList: [],
  attrsMap: {
    'v-for': 'item in list',
    'class': 'list-item',
    ':key': 'item'
  },
  for: 'list',
  forProcessed: true,
  key: 'item',
  staticClass: '"list-item"',
  parent: {}, // ul的AST对象
  children: [], // 文本节点的AST对象
}
// 文本节点的AST精简对象
const textAST = {
  type: 2,
  expression: "_s(item)",
  text: "{{item}}",
  tokens: [
    { '@binding': 'item' }
  ]
}
```
根据以上`ul`，`li`以及文本节点的`AST`对象，可以通过`parent`和`children`链接起来构造出一个简单的`AST`树形结构。


## HTML解析器
在`parse`模板解析的时候，根据不同的情况分为三种解析器：**HTML解析器**、**文本解析器**和**过滤器解析器**。其中，`HTML`解析器是最主要、最核心的解析器。

### 整体思想
在`parse`方法中，我们可以看到它调用了`parseHTML`方法来编译模板，它是在`html-parser.js`文件中定义的：
```js
export function parseHTML (html, options) {
  let index = 0
  let last, lastTag
  while (html) {
    // ...
  }
}
```
由于`parseHTML`的代码极其复杂，我们不必搞清楚每行代码的含义，掌握其**整体思想**才是最关键的， 其**整体思想**是通过字符串的`substring`方法来截取`html`字符串，直到整个`html`被解析完毕，也就是`html`为空时`while`循环结束。

为了更好的理解这种`while`循环，我们举例说明：
```js
// 变量、方法定义
let html = `<div class="list-box">{{msg}}</div>`
let index = 0
function advance (n) {
  index += n
  html = html.substring(n)
}

// 第一次截取
advance(4)
let html = ` class="list-box">{{msg}}</div>`

// 第二次截取
advance(17)
let html = `>{{msg}}</div>`

// ...

// 最后一次截取
let html = `</div>`
advance(6)
let html = ``
```
在最后一次截取后，`html`变成了空字符串，此时`while`循环结束，也就代表整个`parse`模板解析过程结束了。在`while`循环的过程中，对于在哪里截取字符串是有讲究的，它实质上是使用正则表达式去匹配，当满足一定条件时，会触发对应的钩子函数，在钩子函数中我们可以做一些事情。

### 钩子函数
我们发现当调用`parseHTML`方法的时候，它传递了一个对象`options`，其中这个`options`包括一些钩子函数，它们会在`HTML`解析的时候自动触发，这些钩子函数有：
```js
parseHTML(template, {
  start () {
    // 开始标签钩子函数
  },
  end () {
    // 结束标签钩子函数
  },
  char () {
    // 文本钩子函数
  },
  comment () {
    // 注释钩子函数
  }
})
```
为了更好的理解钩子函数，我们举例说明，假设我们有以下`template`模板：
```html
<div>文本</div>
```
解析分析：
* 开始标签钩子函数：当模板开始解析的时候，会走下面这段代码的逻辑：
```js
// Start tag:
const startTagMatch = parseStartTag()
if (startTagMatch) {
  handleStartTag(startTagMatch)
  if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
    advance(1)
  }
  continue
}
```
就整段代码逻辑而言，它根据`parseStartTag`方法的调用结果来判断，如果条件为真则再调用`handleStartTag`方法，在`handleStartTag`方法中它会调用了`options.start`钩子函数。
```js
function handleStartTag () {
  // ...
  if (options.start) {
    options.start(tagName, attrs, unary, match.start, match.end)
  }
}
```
我们回过头来再看`parseStartTag`方法，它的代码如下：
```js
import { unicodeRegExp } from 'core/util/lang'
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)

function parseStartTag () {
  const start = html.match(startTagOpen)
  if (start) {
    const match = {
      tagName: start[1],
      attrs: [],
      start: index
    }
    advance(start[0].length)
    let end, attr
    while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
      attr.start = index
      advance(attr[0].length)
      attr.end = index
      match.attrs.push(attr)
    }
    if (end) {
      match.unarySlash = end[1]
      advance(end[0].length)
      match.end = index
      return match
    }
  }
}
```
在`parseStartTag`方法的最开始，它使用`match`方法并传递一个匹配开始标签的正则表达式，如果匹配成功则会返回一个对象。在目前阶段，我们不需要过多的关注`parseStartTag`方法过多的细节，我们只需要知道两点：
1. 当匹配开始标签成功时，会返回一个对象。
2. 在匹配的过程中，会调用`advance`方法截取掉这个开始标签。
```js
// 调用前
let html = '<div>文本</div>'

// 调用
parseStartTag()

// 调用后
let html = '文本</div>'
```
* 文本钩子函数：在截取掉开始标签后，会通过`continue`走向第二次`while`循环，此时`textEnd`会重新求值：
```js
let html = '文本</div>'
let textEnd = html.indexOf('<') // 2
```
因为第二次`while`循环时，`textEnd`值为`2`，因此会走下面这段逻辑：
```js
let text, rest, next
if (textEnd >= 0) {
  rest = html.slice(textEnd)
  while (
    !endTag.test(rest) &&
    !startTagOpen.test(rest) &&
    !comment.test(rest) &&
    !conditionalComment.test(rest)
  ) {
    // < in plain text, be forgiving and treat it as text
    next = rest.indexOf('<', 1)
    if (next < 0) break
    textEnd += next
    rest = html.slice(textEnd)
  }
  text = html.substring(0, textEnd)
}

if (textEnd < 0) {
  text = html
}

if (text) {
  advance(text.length)
}
if (options.chars && text) {
  options.chars(text, index - text.length, index)
}
```
当以上代码`while`循环完毕后，`text`值为`文本`，然后调用`advence`以及触发`chars`钩子函数。
```js
// 截取前
let html = '文本<div>'

// 截取
advence(2)

// 截取后
let html = '<div>'
```
* 结束标签钩子函数：在文本被截取之后，开始进入下一轮循环，重新对`textEnd`进行求值：
```js
let html = '</div>'
let textEnd = html.indexOf('<') // 0
```
当`textEnd`为`0`的时候，会走下面这段逻辑：
```js
import { unicodeRegExp } from 'core/util/lang'
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

// End tag:
const endTagMatch = html.match(endTag)
if (endTagMatch) {
  const curIndex = index
  advance(endTagMatch[0].length)
  parseEndTag(endTagMatch[1], curIndex, index)
  continue
}
```
当使用`match`传入一个匹配结束标签的正则表达式时，如果匹配成功会返回一个对象，然后调用`advance`和`parseEndTag`这两个方法。当调用`advence`后，就把结束标签全部截取掉了，此时`html`为一个空字符串。在`parseEndTag`方法中，它会调用`options.end`钩子函数。
```js
function parseEndTag () {
  // ...
  if (options.end) {
    options.end(tagName, start, end)
  }
}
```

* 注释钩子函数：对于`HTML`注释节点来说，它会走下面这段代码的逻辑：
```js
// 注释节点的例子
let html = '<!-- 注释节点 -->'
// Comment:
if (comment.test(html)) {
  const commentEnd = html.indexOf('-->')

  if (commentEnd >= 0) {
    if (options.shouldKeepComment) {
      options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
    }
    advance(commentEnd + 3)
    continue
  }
}
```
当匹配到注释节点的时候，会先触发`options.comment`钩子函数，然后调用`advence`把注释节点截取掉。对于`comment`钩子函数所做的事情，它非常简单：
```js
comment (text: string, start, end) {
  // adding anything as a sibling to the root node is forbidden
  // comments should still be allowed, but ignored
  if (currentParent) {
    const child: ASTText = {
      type: 3,
      text,
      isComment: true
    }
    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
      child.start = start
      child.end = end
    }
    currentParent.children.push(child)
  }
}
```
从以上代码可以看出来，当触发此钩子函数的时候，仅仅生成一个注释节点的`AST`对象，然后把它`push`到其父级的`children`数组中即可。

### 不同的解析类型
在介绍钩子函数这个小节，我们已经遇到过几种不同的解析类型了，它们分别是：**开始标签**、**结束标签**、**注释标签**以及**文本标签**。在`HTML`模板解析的时候，前面几种是最常见的，但还有几种解析类型我们同样需要去了解。
1. 开始标签
2. 结束标签
3. 文本标签
4. 注释标签
5. DOCTYPE
6. 条件注释标签

因为前面四种解析类型我们已经分析过，这里我们来分析一下最后两种解析类型。

#### DOCTYPE
解析`DOCTYPE`类型时，解析器要做的事情并不复杂，只需要将其截取掉就行，并不需要触发对应的钩子函数或者做其它事情，假设我们有如下`html`模板：
```js
let html = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body></body>
  </html>
`
```
`HTML`模板解析器在解析的时候，会使用正则表达式去匹配`DOCTYPE`，它会走下面这段代码的逻辑。
```js
const doctype = /^<!DOCTYPE [^>]+>/i
// Doctype:
const doctypeMatch = html.match(doctype)
if (doctypeMatch) {
  advance(doctypeMatch[0].length)
  continue
}
```
如果正则匹配成功，则调用`advence`将其截取掉，然后`continue`继续`while`循环。就以上例子而言，`DOCTYPE`截取后的值如下：
```js
let html = `
  <html>
    <head></head>
    <body></body>
  </html>
`
```

#### 条件注释标签
条件注释标签和`DOCTYPE`一样，我们并不需要做其它额外的事情，只需要截取掉就行，假设我们有如下注释标签的模板：
```js
let html = `
  <![if !IE]>
    <link href="xxx.css" rel="stylesheet">
  <![endif]>
`
```
当`HTML`解析器解析到的时候，会走下面这段代码的逻辑。
```js
const conditionalComment = /^<!\[/
if (conditionalComment.test(html)) {
  const conditionalEnd = html.indexOf(']>')

  if (conditionalEnd >= 0) {
    advance(conditionalEnd + 2)
    continue
  }
}
```
当`HTML`解析器第一次执行的时候，条件注释通过其正则表达式匹配成功，然后调用`advence`将其截取掉。至于中间的`link`则走正常的标签解析流程，最后一次解析时遇到条件注释标签的闭合标签，同样满足其正则表达式，然后通过`advence`将其截取掉，此时`html`为空字符串，`parse`模板解析流程结束。
```js
// 第一次解析后
let html = `
    <link href="xxx.css" rel="stylesheet">
  <![endif]>
`
// ...

// 最后一次解析
let html = `<![endif]>`
advence(n)
let html = ``
```
**注意**：通过以上条件注释解析过程分析，我们可以得出一个结论：在`Vue`的`template`模板中写条件注释语句是没有用的，因为它会被截取掉。
```vue
<!-- 原始tempalte -->
<template>
  <div>
    <![if !IE]>
      <link href="xxx.css" rel="stylesheet">
    <![endif]>
    <p>{{msg}}</p>
  </div>
</template>

<!-- 解析后的html -->
<div>
  <link href="xxx.css" rel="stylesheet">
  <p>xxx</p>
</div>
```

### DOM层级维护
我们都知道`HTML`标签是一个`DOM`属性结构，在模板解析的时候，我们要正确维护这种`DOM`层级关系。在`Vue`中，它定义了一个`stack`栈数组来实现。这个`stack`栈数组不仅能帮我们维护`DOM`层级关系，还能帮我们做一些其它事情。

那么，在`Vue`中是如何通过`stack`栈数组来维护这种关系的呢？其实，维护这种`DOM`层级结构，需要和我们之前提到过的两个钩子函数进行配合：`start`开始标签钩子函数和`end`结束标签钩子函数。其实现思路是：**当触发开始标签钩子函数的时候，把当前节点推入栈数组中；当触发结束标签钩子函数的时候，把栈数组中栈顶元素推出。**

为了更好的理解，我们举例说明，假设有如下`template`模板和`stack`栈数组：
```js
const stack = []
let html = `
  <div>
    <p></p>
    <span></span>
  </div>
`
```
解析流程分析：
* 当第一次触发开始标签钩子函数的时候，也就是`div`节点的开始标签钩子函数，这个时候需要把当前节点推入`stack`栈数组中：
```js
// 举例使用，实际为AST对象
const stack = ['div']
```
* 当第二次触发开始标签钩子函数的时候，也就是`p`节点的开始标签钩子函数，这个时候需要把当前节点推入`stack`栈数组中：
```js
// 举例使用，实际为AST对象
const stack = ['div', 'p']
```
* 当第一次触发结束标签钩子函数的时候，也就是`p`节点的结束标签钩子函数，这个时候需要把栈顶元素推出`stack`栈数组：
```js
const stack = ['div']
```
* 当第三次触发开始标签钩子函数的时候，也就是`span`节点的开始标签钩子函数，这个时候需要把当前节点推入`stack`栈数组中：
```js
// 举例使用，实际为AST对象
const stack = ['div', 'span']
```
* 当第二次触发结束标签钩子函数的时候，也就是`span`节点的结束标签钩子函数，这个时候需要把栈顶元素推出`stack`栈数组：
```js
const stack = ['div']
```
* 当第三次触发结束标签钩子函数的时候，也就是`div`节点的结束标签钩子函数，这个时候需要把栈顶元素推出`stack`栈数组：
```js
const stack = []
```

在分析完以上解析流程后，我们来看一下在源码的钩子函数中，是如何处理的：
```js
parseHTML(template, {
  start (tag, attrs, unary, start, end) {
    // ...
    let element: ASTElement = createASTElement(tag, attrs, currentParent)
    // ...
    if (!unary) {
      currentParent = element
      stack.push(element)
    } else {
      closeElement(element)
    }
  },
  end (tag, start, end) {
    const element = stack[stack.length - 1]
    // pop stack
    stack.length -= 1
    // ...
    closeElement(element)
  }
})
```
代码分析：
* **start**: 首先在`start`钩子函数的最后，它有一段`if/else`分支逻辑，在`if`分支中它直接把`element`推入到了`stack`栈数组中，而在`else`分支逻辑中则调用了`closeElement`方法。造成存在这种逻辑分支的关键点在于`unary`参数，那么`unary`到底是什么？既然它是`start`钩子函数的参数，我们在此钩子函数调用的地方去找这个参数是如何传递的，其实它是在`handleStartTag`中定义的一个常量：
```js
export const isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
)
const options.isUnaryTag = isUnaryTag
const isUnaryTag = options.isUnaryTag || no
const unary = isUnaryTag(tagName) || !!unarySlash
```
其实`unary`代表一元的意思，我们可以发现`isUnaryTag`常量在赋值的过程中，给`makeMap`传递的参数标签全部是自闭合标签。这些自闭合标签，我们能触发其开始标签钩子函数，但无法触发其结束标签钩子函数，因此如果当前标签是自闭合标签的话，我们需要在`else`分支逻辑中调用`closeElement`方法手动闭合标签，而不需要把其推入`stack`栈数组中。

* **end**: 在触发结束标签钩子函数的时候，它做的事情并不复杂，首先拿到栈顶元素，然后把栈数组的`length`长度减去`1`以达到推出栈顶元素的目的，最后调用`closeElement`方法来处理后续的事情。由于`closeElement`方法的代码很多，我们并不需要全部理解。在这`stack`栈数组维护`DOM`层级这一小节我们只需要知道，在`closeElement`方法中，它会去正确处理`AST`对象的`parent`和`children`属性即可。

我们在之前提到过，`stack`栈数组不仅能帮我们来维护`DOM`层级关系，还能帮我们来检查元素标签是否正确闭合，如果没有正确闭合则会提示相应错误信息。假设，我们有如下`template`模板：
```js
// p标签没有正确闭合
let html = `<div><p></div>`
```
当我们提供了以上错误的`html`模板后，`Vue`不仅会提示如下错误信息给我们，而且还会自动帮我们把`p`标签进行闭合：
```
tag <p> has no matching end tag.
```
那么，`Vue`是如何发现这种错误的呢？又是如何进行闭合的呢？其实，当`p`节点的开始标签钩子函数触发以后，此时的`stack`栈数组如下：
```js
// 举例使用，实际为AST对象
const stack = ['div', 'p']
```
因为`p`标签没有闭合，因此在随后的
### 属性解析

#### class
#### style
#### v-for
#### v-if/v-show

## 文本解析器

### 纯文本
### 带变量的文本

## 过滤器解析器

## 创建、管理AST树