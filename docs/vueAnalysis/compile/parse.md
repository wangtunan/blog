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

## parseHTML及其钩子函数
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
由于`parseHTML`的代码及其复杂，它的**整体思想**是通过字符串的`substring`方法来截取字符串，直到整个`template`被解析完毕，也就是`html`为空时`while`循环结束。为了更好的理解这种`while`循环，我们举例说明：
```js
// 方法定义
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
## parse细节

## parse流程图
