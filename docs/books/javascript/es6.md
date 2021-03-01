---
sidebar: auto
---

# 深入理解ES6
在`ECMAScript6`标准定稿之前，已经开始出现了一些实验性的`转译器(Transpiler)`，例如谷歌的`Traceur`，可以将代码从`ECMAScript6`转换成`ECMAScript5`。但它们大多功能非常有限，或难以插入现有的`JavaScript`构建管道。<br/>
但是，随后出现了新型转译器`6to5`改变了这一切。它易于安装，可以很好的集成现有的工具中，生成的代码可读，于是就像野火一样逐步蔓延开来，`6to5`也就是现在鼎鼎大名的`Babel`。

## 前言

### ECMAScript6的演变之路
::: tip
JavaScript核心的语言特性是在标准`ECMA-262`中被定义，该标准中定义的语言被称作`ECMAScript`，它是`JavaScript`的子集。
:::

* `停滞不前`：逐渐兴起的`Ajax`开创了动态`Web`应用的新时代，而自1999年第三版`ECMA-262`发布以来，`JavaScript`却没有丝毫的改变。
* `转折点`：2007年，`TC-39`委员会将大量规范草案整合在了`ECMAScript4`中，其中新增的语言特性涉足甚广，包括：模块、类、类继承、私有对象成员等众多其它的特性。
* `分歧`：然而`TC-39`组织内部对`ECMAScript4`草案产生了巨大的分歧，部分成员认为不应该一次性在第四版标准中加入过多的新功能，而来自雅虎、谷歌和微软的技术负责人则共同提交了一份`ECMAScript3.1`草案作为下一代`ECMAScript`的可选方案，其中此方案只是对现有标准进行小幅度的增量修改。行为更专注于优化属性特性、支持原生`JSON`以及为已有对象增加新的方法。
* `从未面世的ECMAScript4`：2008年，`JavaScript`创始人`Brendan Eich`宣布`TC-39`委员一方面会将合理推进`ECMAScript3.1`的标准化工作，另一方面会暂时将`ECMAScript4`标准中提出的大部分针对语法及特性的改动搁置。
* `ECMAScript5`：经过标准化的`ECMAScript3.1`最终作为`ECMA-262`第五版于2009年正式发布，同时被命名为`ECMAScript5`。
* `ECMAScript6`：在`ECMAScript5`发布后，`TC-39`委员会于2013年冻结了`ECMAScript6`的草案，不再添加新的功能。2013年`ECMAScript6`草案发布，在进过12个月各方讨论和反馈后。2015年`ECMAScript6`正式发布，并命名为`ECMAScript 2015`。

## 块级作用域绑定
过去`JavaScript`中的变量声明机制一直令我们感到困惑，大多数类C语言在声明变量的同时也会创建变量，而在以前的`JavaScript`中，何时创建变量要看如何声明变量，`ES6`引入块级作用域可以让我们更好的控制作用域。

### var声明和变量提升机制

问：提升机制(`hoisting`)是什么？<br/>
答：在函数作用域或全局作用域中通过关键字`var`声明的变量，无论实际上是在哪里声明的，都会被当成在当前作用域顶部声明的变量，这就是我们常说的提升机制。除了`var`变量会提升以外，`function`函数声明也存在`hoisting`机制，<br/>
以下实例代码说明了这种提升机制：
```js
function getValue (condition) {
  if (condition) {
    var value = 'value'
    return value
  } else {
    // 这里可以访问到value，只不过值为undefined
    console.log(value)
    return null
  }
}
getValue(false) // 输出undefined
```
你可以在以上代码中看到，当我们传递了`false`的值，但依然可以访问到`value`这个变量，这是因为在预编译阶段，`JavaScript`引擎会将上面函数的代码修改成如下形式：
```js
function getValue (condition) {
  var value
  if (condition) {
    value = 'value'
    return value
  } else {
    console.log(value)
    return null
  }
}
```

经过以上示例，我们可以发现：变量`value`的声明被提升至函数作用域的顶部，而初始化操作依旧留在原处执行，正因为`value`变量只是声明而没有赋值，因此以上代码才会打印出`undefined`。


### 块级声明
::: tip
块级声明用于声明在指定的作用域之外无妨访问的变量，块级作用域存在于：函数内部和块中。
:::

`let`声明：
* `let`声明和`var`声明的用法基本相同。
* `let`声明的变量不会被提升。
* `let`不能在同一个作用域中重复声明已经存在的变量，会报错。
* `let`声明的变量作用域范围仅存在于当前的块中，程序进入块开始时被创建，程序退出块时被销毁。
* 全局作用域下使用`let`声明的变量不再挂载到`window`对象上。

根据`let`声明的规则，改动上面的代码后像下面这样：
```js
function getValue (condition) {
  if (condition) {
    // 变量value只存在于这个块中。
    let value = 'value'
    return value
  } else {
    // 访问不到value变量
    console.log(value)
    return null
  }
}
```

`const`声明：`const`声明和`let`声明大多数情况是相同的，唯一的本质区别在于，`const`是用来声明常量的，其声明后的变量不能再被修改，即意味着：`const`声明必须进行初始化。
```js
const MAX_ITEMS = 30
// 报错
MAX_ITEMS = 50
```

::: warning 注意
我们说的`const`变量不可变，需要分两种类型来说：
* 值类型：变量的值不能改变。
* 引用类型：变量的地址不能改变，值可以改变。
:::
```js
const num = 23
const arr = [1, 2, 3, 4]
const obj = {
  name: 'why',
  age: 23
}

// 报错
num = 25

// 不报错
arr[0] = 11
obj.age = 32
console.log(arr) // [11, 2, 3, 4]
console.log(obj) // { name: 'why', age: 32 }

// 报错
arr = [4, 3, 2, 1]
```

### 暂时性死区
因为`let`和`const`声明的变量不会进行声明提升，所以在`let`和`const`变量声明之前任何访问(即使是`typeof`也不行)此变量的操作都会引发错误：
```js
if (condition) {
  // 报错
  console.log(typeof value)
  let value = 'value'
}
```
问：为什么会报错？<br/>
答：`JavaScript`引擎在扫描代码发现变量声明时，要么将它们提升至作用域的顶部(`var`声明)，要么将声明放在`TDZ`(暂时性死区)中(`let`和`const`声明)。访问`TDZ`中的变量会触发错误，只有执行变量声明语句之后，变量才会从`TDZ`中移出，随后才能正常访问。

### 全局块作用域绑定
我们都知道：如果我们在全局作用域下通过`var`声明一个变量，那么这个变量会挂载到全局对象`window`上：
```js
var name = 'why'
console.log(window.name) // why
```
但如果我们使用`let`或者`const`在全局作用域下创建一个新的变量，这个变量不会添加到`window`上。
```js
const name = 'why'
console.log('name' in window) // false
```

### 块级绑定的最佳实践
在`ES6`早期，人们普遍认为应该默认使用`let`来代替`var`，这是因为对于开发者而言，`let`实际上与他们想要的`var`一样，直接替换符合逻辑。但随着时代的发展，另一种做法也越来越普及：默认使用`const`，只有确定变量的值会在后续需要修改时才会使用`let`声明，因为大部分变量在初始化后不应再改变，而预料以外的变量值改变是很多`bug`的源头。

## 字符串
本章节中关于`unicode`和正则部分未整理。


### 模块字面量
::: tip
模板字面量是扩展`ECMAScript`基础语法的语法糖，其提供了一套生成、查询并操作来自其他语言里内容的`DSL`，且可以免受`XSS`注入攻击和`SQL`注入等等。
:::

在`ES6`之前，`JavaScript`一直以来缺少许多特性：
* **多行字符串**：一个正式的多行字符串的概念。
* **基本的字符串格式化**：将变量的值嵌入字符串的能力。
* **HTML转义**：向`HTML`插入经过安全转换后的字符串的能力。

而在`ECMAScript 6`中，通过模板字面量的方式对以上问题进行了填补，一个最简单的模板字面量的用法如下：
```js
const message = `hello,world!`
console.log(message)        // hello,world!
console.log(typeof message) // string
```
一个需要注意的地方就是，如果我们需要在字符串中使用反撇号，需要使用`\`来进行转义，如下：
```js
const message = `\`hello\`,world!`
console.log(message) // `hello`,world!
```

#### 多行字符串
自`JavaScript`诞生起，开发者们就一直在尝试和创建多行字符串，以下是`ES6`之前的方法：
::: tip
在字符串的新行最前方加上`\`可以承接上一行代码，可以利用这个小`bug`来创建多行字符串。
:::
```js
const message = 'hello\
,world!'
console.log(message) // hello,world
```

在`ES6`之后，我们可以使用模板字面量，在里面直接换行就可以创建多行字符串，如下：
::: tip
在模板字面量中，即反撇号中所有空白字符都属于字符串的一部分。
:::
```js
const message = `hello
,world!`
console.log(message) // hello
                     // ,world!
```

#### 字符串占位符
模板字面量与普通字符串最大的区别是模板字符串中的占位符功能，其中占位符中的内容，可以是任意合法的`JavaScript`表达式，例如：变量，运算式，函数调用，甚至是另外一个模板字面量。

```js
const age = 23
const name = 'why'
const message = `Hello ${name}, you are ${age} years old!`
console.log(message) // Hello why, you are 23 years old!
```
模板字面量嵌套：
```js
const name = 'why'
const message = `Hello, ${`my name is ${name}`}.`
console.log(message) // Hello, my name is why.
```

#### 标签模板
::: tip
标签指的是在模板字面量第一个反撇号前方标注的字符串，每一个模板标签都可以执行模板字面量上的转换并返回最终的字符串值。
:::
```js
// tag就是`Hello world!`模板字面量的标签模板
const message = tag`Hello world!`
```
标签可以是一个函数，标签函数通常使用不定参数特性来定义占位符，从而简化数据处理的过程，就像下面这样：
```js
function tag(literals, ...substitutions) {
  // 返回一个字符串
}
const name = 'why'
const age = 23
const message = tag`${name} is ${age} years old!`
```
其中`literals`是一个数组，它包含：
* 第一个占位符前的空白字符串：""。
* 第一个、第二个占位符之间的字符串：" is "。
* 第二个占位符后的字符串：" years old!"

`substitutions`也是一个数组：
* 数组第一项为：`name`的值，即：`why`。
* 数组第二项为：`age`的值，即：`23`。

通过以上规律我们可以发现：
* `literals[0]`始终代表字符串的开头。
* `literals`总比`substitutions`多一个。

我们可以通过以上这种模式，将`literals`和`substitutions`这两个数组交织在一起重新组成一个字符串，来模拟模板字面量的默认行为，像下面这样：
```js
function tag(literals, ...substitutions) {
  let result = ''
  for (let i = 0; i< substitutions.length; i++) {
    result += literals[i]
    result += substitutions[i]
  }

  // 合并最后一个
  result += literals[literals.length - 1]
  return result
}
const name = 'why'
const age = 23
const message = tag`${name} is ${age} years old!`
console.log(message) // why is 23 years old!
```

#### 原生字符串信息
通过模板标签可以访问到字符串转义被转换成等价字符串前的原生字符串。

```js
const message1 = `Hello\nworld`
const message2 = String.raw`Hello\nworld`
console.log(message1) // Hello
                      // world
console.log(message2) // Hello\nworld
```

## 函数

### 形参默认值

在`ES6`之前，你可能会通过以下这种模式创建函数并为参数提供默认值：
```js
function makeRequest (url, timeout, callback) {
  timeout = timeout || 2000
  callback = callback || function () {}
}
```
代码分析：在以上示例中，`timeout`和`callback`是可选参数，如果不传入则会使用逻辑或操作符赋予默认值。然而这种方式也有一定的缺陷，如果我们想给`timeout`传递值为`0`，虽然这个值是合法的，但因为有或逻辑运算符的存在，最终还是为`timeout`赋值`2000`。<br/>

针对以上情况，我们应该通过一种更安全的做法(使用`typeof`)来重写一下以上示例：
```js
function makeRequest (url, timeout, callback) {
  timeout = typeof timeout !== 'undefined' ? timeout : 2000
  callback = typeof callback !== 'undefined' ? callback : function () {} 
}
```
代码分析：尽管以上方法更安全一些，但我们任然需要额外的撰写更多的代码来实现这种非常基础的操作。针对以上问题，`ES6`简化了为形参提供默认值的过程，就像下面这样：
::: tip
对于默认参数而言，除非不传或者主动传递`undefined`才会使用参数默认值(如果传递`null`，这是一个合法的参数，不会使用默认值)。
:::
```js
function makeRequest (url, timeout = 2000, callback = function () {}) {
  // todo
}
// 同时使用timeout和callback默认值
makeRequest('https://www.taobao.com')
// 使用callback默认值
makeRequest('https://www.taobao.com', 500)
// 不使用默认值
makeRequest('https://www.taobao.com', 500, function (res) => {
  console.log(res)
})
```
#### 形参默认值对arguments对象的影响
在`ES5`非严格模式下，如果修改参数的值，这些参数的值会同步反应到`arguments`对象中，如下：
```js
function mixArgs(first, second) {
  console.log(arguments[0]) // A
  console.log(arguments[1]) // B
  first = 'a'
  second = 'b'
  console.log(arguments[0]) // a
  console.log(arguments[1]) // b
}
mixArgs('A', 'B')
```
而在`ES5`严格模式下，修改参数的值不再反应到`arguments`对象中，如下：
```js
function mixArgs(first, second) {
  'use strict'
  console.log(arguments[0]) // A
  console.log(arguments[1]) // B
  first = 'a'
  second = 'b'
  console.log(arguments[0]) // A
  console.log(arguments[1]) // B
}
mixArgs('A', 'B')
```

对于使用了`ES6`的形参默认值，`arguments`对象的行为始终保持和`ES5`严格模式一样，无论当前是否为严格模式，即：`arguments`总是等于最初传递的值，不会随着参数的改变而改变，总是可以使用`arguments`对象将参数还原为最初的值，如下：
```js
function mixArgs(first, second = 'B') {
  console.log(arguments.length) // 1
  console.log(arguments[0])      // A
  console.log(arguments[1])      // undefined
  first = 'a'
  second = 'b'
  console.log(arguments[0])      // A
  console.log(arguments[1])      // undefined
}
// arguments对象始终等于传递的值，形参默认值不会反映在arguments上
mixArgs('A')
```

#### 默认参数表达式
函数形参默认值，除了可以是原始值的默认值，也可以是表达式，即：变量，函数调用也是合法的。

```js
function getValue () {
  return 5
}
function add (first, second = getValue()) {
  return first + second
}
console.log(add(1, 1)) // 2
console.log(add(1))    // 6
```
代码分析：当我们第一次调用`add(1,1)`函数时，由于未使用参数默认值，所以`getValue`并不会调用。只有当我们使用了`second`参数默认值的时候`add(1)`，`getValue`函数才会被调用。<br/>

正因为默认参数是在函数调用时求值，所以我们可以在后定义的参数表达式中使用先定义的参数，即可以把先定义的参数当做变量或者函数调用的参数，如下：
```js
function getValue(value) {
  return value + 5
}
function add (first, second = first + 1) {
  return first + second
}
function reduce (first, second = getValue(first)) {
  return first - second
}
console.log(add(1))     // 3
console.log(reduce(1))  // -5
```
#### 默认参数的暂时性死区
在前面已经提到过`let`和`const`存在暂时性死区，即：在`let`和`const`变量声明之前尝试访问该变量会触发错误。相同的道理，在函数默认参数中也存在暂时性死区，如下：
```js
function add (first = second, second) {
  return first + second
}
add(1, 1)         // 2
add(undefined, 1) // 抛出错误
```
代码分析：在第一次调用`add(1,1)`时，我们传递了两个参数，则`add`函数不会使用参数默认值；在第二次调用`add(undefined, 1)`时，我们给`first`参数传递了`undefined`，则`first`参数使用参数默认值，而此时`second`变量还没有初始化，所以被抛出错误。

### 不定参数
`JavaScript`的函数语法规定：无论函数已定义的命名参数有多少个，都不限制调用时传入的实际参数的数量。在`ES6`中，当传入更少的参数时，使用参数默认值来处理；当传入更多数量的参数时，使用不定参数来处理。


我们以`underscore.js`库中的`pick`方法为例：
::: tip
`pick`方法的用法是：给定一个对象，返回指定属性的对象的副本。
:::
```js
function pick(object) {
  let result = Object.create(null)
  for (let i = 1, len = arguments.length; i < len; i++) {
    let item = arguments[i]
    result[item] = object[item]
  }
  return result
}
const book = {
  title: '深入理解ES6',
  author: '尼古拉斯',
  year: 2016
}
console.log(pick(book, 'title', 'author')) // { title: '深入理解ES6', author: '尼古拉斯' }
```
代码分析：
* 不容易发现这个函数可以接受任意数量的参数。
* 当需要查找待拷贝的属性的时候，不得不从索引1开始。

在`ES6`中提供了不定参数，我们可以使用不定参数的特性来重写`pick`函数：
```js
function pick(object, ...keys) {
  let result = Object.create(null)
  for (let i = 0, len = keys.length; i < len; i++) {
    let item = keys[i]
    result[item] = object[item]
  }
  return result
}
const book = {
  title: '深入理解ES6',
  author: '尼古拉斯',
  year: 2016
}
console.log(pick(book, 'title', 'author')) // { title: '深入理解ES6', author: '尼古拉斯' }
```

#### 不定参数的限制
不定参数在使用的过程中有几点限制：
* 一个函数最多只能有一个不定参数。
* 不定参数一定要放在所有参数的最后一个。
* 不能在对象字面量`setter`之中使用不定参数。

```js
// 报错，只能有一个不定参数
function add(first, ...rest1, ...rest2) {
  console.log(arguments)
}
// 报错，不定参数只能放在最后一个参数
function add(first, ...rest, three) {
  console.log(arguments)
}
// 报错，不定参数不能用在对象字面量`setter`之中
const object = {
  set name (...val) {
    console.log(val)
  }
}
```

### 展开运算符
在`ES6`的新功能中，展开运算符和不定参数是最为相似的，不定参数可以让我们指定多个各自独立的参数，并通过整合后的数组来访问；而展开运算符可以让你指定一个数组，将它们打散后作为各自独立的参数传入函数。<br/>
在`ES6`之前，我们如果使用`Math.max`函数比较一个数组中的最大值，则需要像下面这样使用：
```js
const arr = [4, 10, 5, 6, 32]
console.log(Math.max.apply(Math, arr)) // 32
```
代码分析：在`ES6`之前使用这种方式是没有任何问题的，但关键的地方在于我们要借用`apply`方法，而且要特别小心的处理`this`(第一个参数)，在`ES6`中我们有更加简单的方式来达到以上的目的：
```js
const arr = [4, 10, 5, 6, 32]
console.log(Math.max(...arr)) // 32
```

### 函数name属性
问：为什么`ES6`会引入函数的`name`属性。<br/>
答：在`JavaScript`中有多种定义函数的方式，因而辨别函数就是一项具有挑战性的任务，此外匿名函数表达式的广泛使用也加大了调试的难度，为了解决这些问题，在`ESCAScript 6`中为所有函数新增了`name`属性。

#### 常规name属性
在函数声明和匿名函数表达式中，函数的`name`属性相对来说是固定的：
```js
function doSomething () {
  console.log('do something')
}
let doAnotherThing = function () {
  console.log('do another thing')
}
console.log(doSomething.name)    // doSomething
console.log(doAnotherThing.name) // doAnotherThing
```

#### name属性的特殊情况
尽管确定函数声明和函数表达式的名称很容易，但还是有一些其他情况不是特别容易识别：
* 匿名函数表达式显示提供函数名的情况：函数名称本身比函数本身被赋值的变量的权重高。
* 对象字面量：在不提供函数名称的情况下，取对象字面量的名称；提供函数名称的情况下就是提供的名称
* 属性的`getter`和`setter`：在对象上存在`get + 属性`的`get`或者`set`方法。
* 通过`bind`：通过`bind`函数创建的函数，`name`为会带有`bound`前缀
* 通过构造函数：函数名称固定为`anonymous`。

```js
let doSomething = function doSomethingElse () {
  console.log('do something else')
}
let person = {
  // person对象上存在name为get firstName的方法
  get firstName () {
    return 'why'
  },
  sayName: function () {
    console.log('why')
  },
  sayAge: function sayNewAge () {
    console.log(23)
  }
}
console.log(doSomething.name)         // doSomethingElse
console.log(person.sayName.name)      // sayName
console.log(person.sayAge.name)       // sayNewAge
console.log(doSomething.bind().name)  // bound doSomethingElse
console.log(new Function().name)      // anonymous
```

### 函数的多种用途
在`JavaScript`中函数具有多重功能，可以结合`new`使用，函数内的`this`值指向一个新对象，函数最终会返回这个新对象，如下：
```js
function Person (name) {
  this.name = name
}
const person = new Person('why')
console.log(person.toString()) // [object Object]
```

在`ES6`中，函数有两个不同的内部方法，分别是：
::: tip
具有`[[Construct]]`方法的函数被称为构造函数，但并不是所有的函数都有`[[Construct]]`方法，例如：箭头函数。
:::
* `[[Call]]`：如果不通过`new`关键字进行调用函数，则执行`[[Call]]`函数，从而直接执行函数体中的代码。
* `[[Construct]]`：当通过`new`关键字调用函数时，执行的是`[[Construct]]`函数，它负责创建一个新对象，然后再执行函数体，将`this`绑定到实例上。

在`ES6`之前，如果要判断一个函数是否通过`new`关键词调用，最流行的方法是使用`instanceof`来判断，例如：
```js
function Person (name) {
  if (this instanceof Person) {
    this.name = name
  } else {
    throw new Error('必须通过new关键词来调用Person')
  }
}
const person = new Person('why')
const notPerson = Person('why') // 抛出错误
```
代码分析：这段代码中，首先会判断`this`的值，看是否是`Person`的实例，如果是则继续执行，如果不是则抛出错误。通常来说这种做法是正确的，但是也不是十分靠谱，有一种方式可以不依赖`new`关键词也可以把`this`绑定到`Person`的实例上，如下：
```js
function Person (name) {
  if (this instanceof Person) {
    this.name = name
  } else {
    throw new Error('必须通过new关键词来调用Person')
  }
}
const person = new Person('why')
const notPerson = Person.call(person, 'why') // 不报错，有效
```

为了解决判断函数是否通过`new`关键词调用的问题，`ES6`引入了`new.target`这个元属性<br/>
问：什么是元属性？<br/>
答：元属性是指非对象的属性，其可以提供非对象目标的补充信息。当调用函数的`[[Construct]]`方法时，`new.target`被赋值为`new`操作符的目标，通常是新创建对象的实例，也就是函数体内`this`的构造函数；如果调用`[[Call]]`方法，则`new.target`的值为`undefined`。

根据以上`new.target`的特点，我们改写一下上面的代码：
::: warning
在函数外使用`new.target`是一个语法错误。
:::
```js
function Person (name) {
  if (typeof new.target !== 'undefined') {
    this.name = name
  } else {
    throw new Error('必须通过new关键词来调用Person')
  }
}
const person = new Person('why')
const notPerson = Person.call(person, 'why') // 抛出错误
```

### 块级函数
在`ECMAScript 3`和早期版本中，在代码块中声明一个块级函数严格来说是一个语法错误，但是所有的浏览器任然支持这个特性，却又因为浏览器的差异导致支持程度稍有不同，所以**最好不要使用这个特性，如果要用可以使用匿名函数表达式**。
```js
// ES5严格模式下，在代码块中声明一个函数会报错
// 在ES6下，因为有了块级作用域的概念，所以无论是否处于严格模式，都不会报错。
// 但在ES6中，当处于严格模式时，会将函数声明提升至当前块级作用域的顶部
// 当处于非严格模式时，提升至外层作用域
'use strict'
if (true) {
  function doSomething () {
    console.log('do something')
  }
}
```

### 箭头函数
在`ES6`中，箭头函数是其中最有趣的新增特性之一，箭头函数是一种使用箭头`=>`定义函数的新语法，但它和传统的`JavaScript`函数有些许不同：
* **没有this、super、arguments和new.target绑定**：箭头函数中的`this`、`super`、`arguments`和`new.target`这些值由外围最近一层非箭头函数所决定。
* **不能通过new关键词调用**：因为箭头函数没有`[[Construct]]`函数，所以不能通过`new`关键词进行调用，如果使用`new`进行调用会抛出错误。
* **没有原型**：因为不会通过`new`关键词进行调用，所以没有构建原型的需要，也就没有了`prototype`这个属性。
* **不可以改变this的绑定**：在箭头函数的内部，`this`的值不可改变(即不能通过`call`、`apply`或者`bind`等方法来改变)。
* **不支持arguments对象**：箭头函数没有`arguments`绑定，所以必须使用命名参数或者不定参数这两种形式访问参数。
* **不支持重复的命名参数**：无论是否处于严格模式，箭头函数都不支持重复的命名参数。

#### 箭头函数的语法
::: tip
箭头函数的语法多变，根据实际的使用场景有多种形式。所有变种都由函数参数、箭头和函数体组成。
:::
表现形式之一：
```js
// 表现形式之一：没有参数
let reflect = () => 5
// 相当于
let reflect = function () {
  return 5
}
```

表现形式之二：
```js
// 表现形式之二：返回单一值
let reflect = value => value
// 相当于
let reflect = function (value) {
  return value
}
```

表现形式之三：
```js
// 表现形式之三：多个参数
let reflect = (val1, val2) => val1 + val2
// 或者
let reflect = (val, val2) => {
  return val1 + val2
}
// 相当于
let reflect = function (val1, val2) {
  return val1 + val2
}
```

表现形式之四：
```js
// 表现形式之四：返回字面量
let reflect = (id) => ({ id: id, name: 'why' })
// 相当于
let reflect = function (id) {
  return {
    id: id,
    name: 'why'
  }
}
```

#### 箭头函数和数组
箭头函数的语法简洁，非常适用于处理数组。
```js
const arr = [1, 5, 3, 2]
// 非箭头函数排序写法
arr.sort(function(a, b) {
  return a -b
})
// 箭头函数排序写法
arr.sort((a, b) => a - b)
```


### 尾调用优化
::: tip
尾调用指的是函数作为另一个函数的最后一条语句被调用并返回。
:::
尾调用示例：
```js
function doSomethingElse () {
  console.log('do something else')
}
function doSomething () {
  return doSomethingElse()
}
```

在`ECMAScript 5`的引擎中，尾调用的实现与其他函数调用的实现类似：创建一个新的栈帧，将其推入调用栈来表示函数调用，即意味着：在循环调用中，每一个未使用完的栈帧都会被保存在内存中，当调用栈变得过大时会造成程序问题。<br/>

针对以上可能会出现的问题，`ES6`缩减了严格模式下尾调用栈的大小，当全部满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧：
* **尾调用不访问当前栈帧的变量(函数不是一个闭包。)**
* **尾调用是最后一条语句**
* **尾调用的结果作为函数返回**
<br/>

满足以上条件的一个尾调用示例：
```js
'use strict'
function doSomethingElse () {
  console.log('do something else')
}
function doSomething () {
  return doSomethingElse()
}
```

不满足以上条件的尾调用示例：
```js
function doSomethingElse () {
  console.log('do something else')
}
function doSomething () {
  // 无法优化，没有返回
  doSomethingElse()
}
function doSomething () {
  // 无法优化，返回值又添加了其它操作
  return 1 + doSomethingElse()
}
function doSomething () {
  // 可能无法优化
  let result = doSomethingElse
  return result
}
function doSomething () {
  let number = 1
  let func = () => number
  // 无法优化，该函数是一个闭包
  return func()
}
```

递归函数是其最主要的应用场景，当递归函数的计算量足够大，尾调用优化可以大幅提升程序的性能。
```js
// 优化前
function factorial (n) {
  if (n <= 1) {
    return 1
  } else {
    // 无法优化
    return n * factorial (n - 1)
  }
}

// 优化后
function factorial (n, p = 1) {
  if (n <= 1) {
    return 1 * p
  } else {
    let result = n * p
    return factorial(n -1, result)
  }
}
```

## 对象的扩展

### 对象字面量的扩展
对象字面量扩展包含两部分：
* **属性初始值的简写**：当对象的属性和本地变量同名时，不必再写冒号和值，简单的只写属性即可。
* **对象方法的简写**： 消除了冒号和`function`关键字。
* **可计算属性名**：在定义对象时，对象的属性值可通过变量来计算。
::: tip
通过对象方法简写语法创建的方法有一个`name`属性，其值为小括号前的名称。
:::
```js
const name = 'why'
const firstName = 'first name'
const person = {
  name,
  [firstName]: 'ABC',
  sayName () {
    console.log(this.name)
  }
  
}
// 相当于
const name = 'why'
const person = {
  name: name,
  'first name': 'ABC',
  sayName: function () {
    console.log(this.name)
  }
}
```

### 新增方法

#### Object.is
在使用`JavaScript`比较两个值的时候，我们可能会习惯使用`==`或者`===`来进行判断，使用全等`===`在比较时可以避免触发强制类型转换，所以深受许多人的喜爱。但全等`===`也并非是完全准确的，例如：
`+0===-0`会返回`true`，`NaN===NaN`会返回`false`。针对以上情况，`ES6`引入了`Object.is`方法来弥补。
```js
// ===和Object.is大多数情况下结果是相同的，只有极少数结果不同
console.log(+0 === -0)            // true
console.log(Object.is(+0, -0))    // false
console.log(NaN === NaN)          // false
console.log(Object.is(NaN, NaN))  // true
```

#### Object.assign
::: tip 什么是Mixin？
混合`Mixin`是`JavaScript`中实现对象组合最流行的一种模式。在一个`mixin`中，一个对象接受来自另一个对象的属性和方法(`mixin`方法为浅拷贝)。
:::
```js
// mixin方法
function mixin(receiver, supplier) {
  Object.keys(supplier).forEach(function(key) {
    receiver[key] = supplier[key]
  })
  return receiver
}
const person1 = {
  age: 23,
  name: 'why'
}
const person2 = mixin({}, person1)
console.log(person2) // { age: 23, name: 'why' }
```
由于这种混合模式非常流行，所以`ES6`引入了`Object.assign`方法来实现相同的功能，这个方法接受一个接受对象和任意数量的源对象，最终返回接受对象。
::: tip
如果源对象中有同名的属性，后面的源对象会覆盖前面源对象中的同名属性。
:::
```js
const person1 = {
  age: 23,
  name: 'why'
}
const person2 = {
  age: 32,
  address: '广东广州'
}
const person3 = Object.assign({}, person1, person2)
console.log(person3) // { age: 32, name: 'why', address: '广东广州' }
```
::: warning
`Object.assign`方法不能复制属性的`get`和`set`。
:::
```js
let receiver = {}
let supplier = {
  get name () {
    return 'why'
  }
}
Object.assign(receiver, supplier)
const descriptor = Object.getOwnPropertyDescriptor(receiver, 'name')
console.log(descriptor.value) // why
console.log(descriptor.get)   // undefined
console.log(receiver)         // { name: 'why' }
```

### 重复的对象字面量属性
在`ECMAScript 5`严格模式下，给一个对象添加重复的属性会触发错误：
```js
'use strict'
const person = {
  name: 'AAA',
  name: 'BBB' // ES5环境触发错误
}
```

但在`ECMAScript 6`中，无论当前是否处于严格模式，添加重复的属性都不会报错，而是选取最后一个取值：
```js
'use strict'
const person = {
  name: 'AAA',
  name: 'BBB' // ES6环境不报错
}
console.log(person) // { name: 'BBB' }
```

### 自有属性枚举顺序
::: tip
`ES5`中未定义对象属性的枚举顺序，由浏览器厂商自行决定。而在`ES6`中严格规定了对象自有属性被枚举时的返回顺序。
:::
**规则**：
* 所有数字键按升序排序。
* 所有字符键按照它们被加入对象的顺序排序。
* 所有`Symbol`键按照它们被加入对象的顺序排序。

根据以上规则，以下这些方法将受到影响：
* `Object.getOwnPropertyNames()`。
* `Reflect.keys()`。
* `Object.assign()`。

不确定的情况：
* `for-in`循环依旧由厂商决定枚举顺序。
* `Object.keys()`和`JSON.stringify()`也同`for-in`循环一样由厂商决定枚举顺序。
```js
const obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1
}
obj.d = 1
console.log(Reflect.keys(obj).join('')) // 012acbd
```

### 增强对象原型
`ES5`中，对象原型一旦实例化之后保持不变。而在`ES6`中添加了`Object.setPrototypeOf()`方法来改变这种情况。

```js
const person = {
  sayHello () {
    return 'Hello'
  }
}
const dog = {
  sayHello () {
    return 'wang wang wang'
  }
}
let friend = Object.create(person)
console.log(friend.sayHello())                        // Hello
console.log(Object.getPrototypeOf(friend) === person) // true
Object.setPrototypeOf(friend, dog)
console.log(friend.sayHello())                        // wang wang wang
console.log(Object.getPrototypeOf(friend) === dog)    // true
```
#### 简化原型访问的Super引用
在`ES5`中，如果我们想重写对象实例的方法，又需要调用与它同名的原型方法，可以像下面这样：
```js
const person = {
  sayHello () {
    return 'Hello'
  }
}
const dog = {
  sayHello () {
    return 'wang wang wang'
  }
}
const friend = {
  sayHello () {
    return Object.getPrototypeOf(this).sayHello.call(this) + '!!!'
  }
}
Object.setPrototypeOf(friend, person)
console.log(friend.sayHello())                        // Hello!!!
console.log(Object.getPrototypeOf(friend) === person) // true
Object.setPrototypeOf(friend, dog)
console.log(friend.sayHello())                        // wang wang wang!!!
console.log(Object.getPrototypeOf(friend) === dog)    // true
```
代码分析：要准确记住如何使用`Object.getPrototypeOf()`和`xx.call(this)`方法来调用原型上的方法实在是有点复杂。而且存在多继承的情况下，`Object.getPrototypeOf()`会出现问题。<br/>
根据以上问题，`ES6`引入了`super`关键字，其中`super`相当于指向对象原型的指针，所以以上代码可以修改如下：
::: tip
`super`关键字只能出现在对象简写方法里，普通方法中使用会报错。
:::
```js
const person = {
  sayHello () {
    return 'Hello'
  }
}
const dog = {
  sayHello () {
    return 'wang wang wang'
  }
}
const friend = {
  sayHello () {
    return super.sayHello() + '!!!'
  }
}
Object.setPrototypeOf(friend, person)
console.log(friend.sayHello())                        // Hello!!!
console.log(Object.getPrototypeOf(friend) === person) // true
Object.setPrototypeOf(friend, dog)
console.log(friend.sayHello())                        // wang wang wang!!!
console.log(Object.getPrototypeOf(friend) === dog)    // true
```

### 正式的方法定义
在`ES6`之前从未正式定义过"方法"的概念，方法仅仅是一个具有功能而非数据的对象属性。而在`ES6`中正式将方法定义为一个函数，它会有一个内部`[[HomeObject]]`属性来容纳这个方法从属的对象。

```js
const person = {
  // 是方法 [[HomeObject]] = person
  sayHello () {
    return 'Hello'
  }
}
// 不是方法
function sayBye () {
  return 'goodbye'
}
```
根据以上`[[HomeObject]]`的规则，我们可以得出`super`是如何工作的：
* 在`[[HomeObject]]`属性上调用`Object.getPrototypeOf()`方法来检索原型的引用。 
* 搜索原型找到同名函数。
* 设置`this`绑定并且调用相应的方法。

```js
const person = {
  sayHello () {
    return 'Hello'
  }
}
const friend = {
  sayHello () {
    return super.sayHello() + '!!!'
  }
}
Object.setPrototypeOf(friend, person)
console.log(friend.sayHello()) // Hello!!!
```
代码分析：
* `friend.sayHello()`方法的`[[HomeObject]]`属性值为`friend`。
* `friend`的原型是`person`。
* `super.sayHello()`相当于`person.sayHello.call(this)`。

## 解构
解构是一种打破数据结构，将其拆分为更小部分的过程。


### 为何使用解构功能
在`ECMAScript 5`及其早期版本中，为了从对象或者数组中获取特定数据并赋值给变量，编写了许多看起来同质化的代码：
```js
const person = {
  name: 'AAA',
  age: 23
}
const name = person.name
const age = person.age
```
代码分析：我们必须从`person`对象中提取`name`和`age`的值，并把其值赋值给对应的同名变量，过程极其相似。假设我们要提取许多变量，这种过程会重复更多次，如果其中还包含嵌套结构，只靠遍历是找不到真实信息的。<br/>

针对以上问题，`ES6`引入了解构的概念，按场景可分为：
* 对象解构
* 数组解构
* 混合解构
* 解构参数

### 对象解构
我们使用`ES6`中的对象结构，改写以上示例：
```js
const person = {
  name: 'AAA',
  age: 23
}
const { name, age } = person
console.log(name) // AAA
console.log(age)  // 23
```
::: warning
必须为解构赋值提供初始化程序，同时如果解构右侧为`null`或者`undefined`，解构会发生错误。
:::
```js
// 以下代码为错误示例，会报错
var { name, age }
let { name, age }
const { name, age }
const { name, age } = null
const { name, age } = undefined
```

#### 解构赋值
我们不仅可以在解构时重新定义变量，还可以解构赋值已存在的变量：
```js
const person = {
  name: 'AAA',
  age: 23
}
let name, age
// 必须添加()，因为如果不加，{}代表是一个代码块，而语法规定代码块不能出现在赋值语句的左侧。
({ name, age } = person)
console.log(name) // AAA
console.log(age)  // 23
```

#### 解构默认值
使用解构赋值表达式时，如果指定的局部变量名称在对象中不存在，那么这个局部变量会被赋值为`undefined`，此时可以随意指定一个默认值。

```js
const person = {
  name: 'AAA',
  age: 23
}
let { name, age, sex = '男' } = person
console.log(sex) // 男
```

#### 为非同名变量赋值
目前为止我们解构赋值时，待解构的键和待赋值的变量是同名的，但如何为非同名变量解构赋值呢？
```js
const person = {
  name: 'AAA',
  age: 23
}
let { name, age } = person
// 相当于
let { name: name, age: age } = person
```
`let { name: name, age: age } = person`含义是：在`person`对象中取键为`name`和`age`的值，并分别赋值给`name`变量和`age`变量。<br/>
那么，我们根据以上的思路，为非同名变量赋值可以改写成如下形式：
```js
const person = {
  name: 'AAA',
  age: 23
}
let { name: newName, age: newAge } = person
console.log(newName) // AAA
console.log(newAge)  // 23
```

#### 嵌套对象结构
解构嵌套对象任然与对象字面量语法相似，只是我们可以将对象拆解成我们想要的样子。

```js
const person = {
  name: 'AAA',
  age: 23,
  job: {
    name: 'FE',
    salary: 1000
  },
  department: {
    group: {
      number: 1000,
      isMain: true
    }
  }
}
let { job, department: { group } } = person
console.log(job)    // { name: 'FE', salary: 1000 }
console.log(group)  // { number: 1000, isMain: true }
```
`let { job, department: { group } } = person`含义是：在`person`中提取键为`job`、在`person`的嵌套对象`department`中提取键为`group`的值，并把其赋值给对应的变量。


### 数组解构
数组的解构赋值与对象解构的语法相似，但简单许多，它使用的是数组字面量，且解构操作全部在数组内完成，解构的过程是按值在数组中的位置进行提取的。

```js
const colors = ['red', 'green', 'blue']
let [firstColor, secondColor] = colors
// 按需解构
let [,,threeColor] = colors
console.log(firstColor)   // red
console.log(secondColor)  // green
console.log(threeColor)   // blue
```

与对象一样，解构数组也能解构赋值给已经存在的变量，只是可以不需要像对象一样额外的添加括号：
```js
const colors = ['red', 'green', 'blue']
let firstColor, secondColor
[firstColor, secondColor] = colors
console.log(firstColor)   // red
console.log(secondColor)  // green
```
按以上原理，我们可以轻松扩展一下解构赋值的功能(快速交换两个变量的值)：
```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```
与对象一样，数组解构也可以设置解构默认值：
```js
const colors = ['red']
const [firstColor, secondColor = 'green'] = colors
console.log(firstColor)   // red
console.log(secondColor)  // green
```

当存在嵌套数组时，我们也可以使用和解构嵌套对象的思路来解决：
```js
const colors = ['red', ['green', 'lightgreen'], 'blue']
const [firstColor, [secondColor]] = colors
console.log(firstColor)   // red
console.log(secondColor)  // green
```

#### 不定元素
在解构数组时，不定参数只能放在最后一个，在后面继续添加逗号会导致报错。<br/>

在数组解构中，有一个和函数的不定参数相似的功能：在解构数组时，可以使用`...`语法将数组中剩余元素赋值给一个特定的变量：
```js
let colors = ['red', 'green', 'blue']
let [firstColor, ...restColors] = colors
console.log(firstColor) // red
console.log(restColors) // ['green', 'blue']
```
根据以上解构数组中的不定元素的原理，我们可以实现同`concat`一样的数组复制功能：
```js
const colors = ['red', 'green', 'blue']
const concatColors = colors.concat()
const [...restColors] = colors
console.log(concatColors) // ['red', 'green', 'blue']
console.log(restColors)   // ['red', 'green', 'blue']
```

### 解构参数
当我们定一个需要接受大量参数的函数时，通常我们会创建可以可选的对象，将额外的参数定义为这个对象的属性：
```js
function setCookie (name, value, options) {
  options = options || {}
  let path = options.path,
      domain = options.domain,
      expires = options.expires
  // 其它代码
}

// 使用解构参数
function setCookie (name, value, { path, domain, expires } = {}) {
  // 其它代码
}
```
代码分析：`{ path, domain, expires } = {}`必须提供一个默认值，如果不提供默认值，则不传递第三个参数会报错：
```js
function setCookie (name, value, { path, domain, expires }) {
  // 其它代码
}
// 报错
setCookie('type', 'js')
// 相当于解构了undefined，所以会报错
{ path, domain, expires } = undefined
```


## Symbol及其Symbol属性
在`ES6`之前，`JavaScript`语言只有五种原始类型：`string`、`number`、`boolean`、`null`和`undefiend`。在`ES6`中，添加了第六种原始类型：`Symbol`。

可以使用`typeof`来检测`Symbol`类型：
```js
const symbol = Symbol('Symbol Test')
console.log(typeof symbol) // symbol
```
### 创建Symbol
可以通过全局的`Symbol`函数来创建一个`Symbol`。

```js
const firstName = Symbol()
const person = {}
person[firstName] = 'AAA'
console.log(person[firstName]) // AAA
```

可以在`Symbol()`中传递一个可选的参数，可以让我们添加一段文本描述我们创建的`Symbol`，其中文本是存储在内部属性`[[Description]]`中，只有当调用`Symbol`的`toString()`方法时才可以读取这个属性。
```js
const firstName = Symbol('Symbol Description')
const person = {}
person[firstName] = 'AAA'
console.log(person[firstName]) // AAA
console.log(firstName)         // Symbol('Symbol Description')
```

### Symbol的使用方法
所有可以使用可计算属性名的地方，都可以使用`Symbol`。

```js
let firstName = Symbol('first name')
let lastName = Symbol('last name')
const person = {
  [firstName]: 'AAA'
}
Object.defineProperty(person, firstName, {
  writable: false
})
Object.defineProperties(person, {
  [lastName]: {
    value: 'BBB',
    writable: false
  }
})
console.log(person[firstName])  // AAA
console.log(person[lastName])   // BBB
```
### Symbol共享体系
`ES6`提供了一个可以随时访问的全局`Symbol`注册表来让我们可以创建共享`Symbol`的能力，可以使用`Symbol.for()`方法来创建一个共享的`Symbol`。

```js
// Symbol.for方法的参数，也被用做Symbol的描述内容
const uid = Symbol.for('uid')
const object = {
  [uid]: 12345
}
console.log(person[uid]) // 12345
console.log(uid)         // Symbol(uid)
```
代码分析：
* `Symbol.for()`方法首先会在全局`Symbol`注册变中搜索键为`uid`的`Symbol`是否存在。
* 存在，直接返回已有的`Symbol`。
* 不存在，则创建一个新的`Symbol`，并使用这个键在`Symbol`全局注册变中注册，随后返回新创建的`Symbol`。

还有一个和`Symbol`共享有关的特性，可以使用`Symbol.keyFor()`方法在`Symbol`全局注册表中检索与`Symbol`有关的键，如果存在则返回，不存在则返回`undefined`：
```js
const uid = Symbol.for('uid')
const uid1 = Symbol('uid1')
console.log(Symbol.keyFor(uid))   // uid
console.log(Symbol.keyFor(uid1))  // undefined
```
### Symbol与类型强制转换
其它原始类型没有与`Symbol`逻辑相等的值，尤其是不能将`Symbol`强制转换为字符串和数字。

```js
const uid = Symbol.for('uid')
console.log(uid)
console.log(String(uid))
// 报错
uid = uid + ''
uid = uid / 1
```
代码分析：我们使用`console.log()`方法打印`Symbol`，会调用`Symbol`的`String()`方法，因此也可以直接调用`String()`方法输出`Symbol`。然而尝试将`Symbol`和一个字符串拼接，会导致程序抛出异常，`Symbol`也不能和每一个数学运算符混合使用，否则同样会抛出错误。

### Symbol属性检索
`Object.keys()`和`Object.getOwnPropertyNames()`方法可以检索对象中所有的属性名，其中`Object.keys`返回所有可以枚举的属性，`Object.getOwnPropertyNames()`无论属性是否可以枚举都返回，但是这两个方法都无法返回`Symbol`属性。因此`ES6`引入了一个新的方法`Object.getOwnPropertySymbols()`方法。
```js
const uid = Symbol.for('uid')
let object = {
  [uid]: 123
}
const symbols = Object.getOwnPropertySymbols(object)
console.log(symbols.length) // 1
console.log(symbols[0])     // Symbol(uid)
```

### Symbol暴露内部的操作
`ES6`通过在原型链上定义与`Symbol`相关的属性来暴露更多的语言内部逻辑，这些内部操作如下：
* `Symbol.hasInstance`：一个在执行`instanceof`时调用的内部方法，用于检测对象的继承信息。
* `Symbol.isConcatSpreadable`：一个布尔值，用于表示当传递一个集合作为`Array.prototype.concat()`方法的参数时，是否应该将集合内的元素规整到同一层级。
* `Symbol.iterator`：一个返回迭代器的方法。
* `Symbol.match`：一个在调用`String.prototype.match()`方法时调用的方法，用于比较字符串。
* `Symbol.replace`：一个在调用`String.prototype.replace()`方法时调用的方法，用于替换字符串中的子串。
* `Symbol.search`：一个在调用`String,prototype.search()`方法时调用的方法，用于在字符串中定位子串。
* `Symbol.split`：一个在调用`String.prototype.split()`方法时调用的方法，用于分割字符串。
* `Symbol.species`：用于创建派生对象的构造函数。
* `Symbol.toPrimitive`：一个返回对象原始值的方法。
* `Symbol.toStringTag`：一个在调用`Object.prototype.toString()`方法时使用的字符串，用于创建对象描述。
* `Symbol.unscopables`：一个定义了一些不可被`with`语句引用的对象属性名称的对象集合。

重写一个由`well-known Symbol`定义的方法，会导致对象内部的默认行为被改变，从而一个普通对象会变为一个奇异对象。

#### Symbol.hasInstance
每一个函数都有`Symbol.hasInstance`方法，用于确定对象是否为函数的实例，并且该方法不可被枚举、不可被写和不可被配置。

```js
function MyObject () {
  // 空函数
}
Object.defineProperty(MyObject, Symbol.hasInstance, {
  value: function () {
    return false
  }
})
let obj = new MyObject()
console.log(obj instanceof MyObject) // false
```
代码分析：使用`Object.defineProperty`方法，在`MyObject`函数上改写`Symbol.hasInstance`，为其定义一个总是返回`false`的新函数，即使`obj`确实是`MyObject`的实例，但依然在进行`instanceof`判断时返回了`false`。
::: warning
注意如果要触发`Symbol.hasInstance`调用，`instanceof`的左操作符必须是一个对象，如果为非对象则会导致`instanceof`始终返回`false`。
:::

#### Symbol.isConcatSpreadable
在`JavaScript`数组中`concat()`方法被用于拼接两个数组：
```js
const colors1 = ['red', 'green']
const colors2 = ['blue']
console.log(colors1.concat(colors2, 'brown')) // ['red', 'green', 'blue', 'brown']
```
在`concat()`方法中，我们传递了第二个参数，它是一个非数组元素。如果`Symbol.isConcatSpreadable`为`true`，那么表示对象有`length`属性和数字键，故它的数值型键会被独立添加到`concat`调用的结果中，它是对象的可选属性，用于增强作用于特定对象类型的`concat`方法的功能，有效简化其默认特性：
```js
const obj = {
  0: 'hello',
  1: 'world',
  length: 2,
  [Symbol.isConcatSpreadable]: true
}
const message = ['Hi'].concat(obj)
console.log(message) // ['Hi', 'hello', 'world']
```

#### Symbol.match，Symbol.replace，Symbol.search，Symbol.split
在`JavaScript`中，字符串与正则表达式经常一起出现，尤其是字符串类型的几个方法，可以接受正则表达式作为参数：
* `match`：确定给定字符串是否匹配正则表达式。
* `replace`：将字符串中匹配正则表达式的部分替换为给定的字符串。
* `search`：在字符串中定位匹配正则表示位置的索引。
* `split`：按照匹配正则表达式的元素将字符串进行分割，并将分割结果存入数组中。

在`ES6`之前，以上几个方法无法使用我们自己定义的对象来替代正则表达式进行字符串匹配，而在`ES6`之后，引入了与上述几个方法相对应`Symbol`，将语言内建的`Regex`对象的原生特性完全外包出来。
```js
const hasLengthOf10 = {
  [Symbol.match] (value) {
    return value.length === 10 ? [value] : null
  },
  [Symbol.replace] (value, replacement) {
    return value.length === 10 ? replacement : value
  },
  [Symbol.search] (value) {
    return value.length === 10 ? 0 : -1
  },
  [Symbol.split] (value) {
    return value.length === 10 ? [,] : [value]
  }
}
const message1 = 'Hello world'
const message2 = 'Hello John'
const match1 = message1.match(hasLengthOf10)
const match2 = message2.match(hasLengthOf10)
const replace1 = message1.replace(hasLengthOf10)
const replace2 = message2.replace(hasLengthOf10, 'AAA')
const search1 = message1.search(hasLengthOf10)
const search2 = message2.search(hasLengthOf10)
const split1 = message1.split(hasLengthOf10)
const split2 = message2.split(hasLengthOf10)
console.log(match1)     // null
console.log(match2)     // [Hello John]
console.log(replace1)   // Hello world
console.log(replace2)   // AAA
console.log(search1)    // -1
console.log(search2)    // 0
console.log(split1)     // [Hello John]
console.log(split2)     // [,]
```

#### Symbol.toPrimitive
`Symbol.toPrimitive`方法被定义在每一个标准类型的原型上，并且规定了当对象被转换为原始值时应该执行的操作，每当执行原始值转换时，总会调用`Symbol.toPrimitive`方法并传入一个值作为参数。<br/>
对于大多数标准对象，数字模式有以下特性，根据优先级的顺序排序如下：
* 调用`valueOf()`方法，如果结果为原始值，则返回。
* 否则，调用`toString()`方法，如果结果为原始值，则返回。
* 如果再无可选值，则抛出错误。

同样对于大多数标准对象，字符串模式有以下优先级顺序：
* 调用`toString()`方法，如果结果为原始值，则返回。
* 否则，调用`valueOf()`方法，如果结果为原始值，则返回。
* 如果再无可选值，则抛出错误。

在大多数情况下，标准对象会将默认模式按数字模式处理(除`Date`对象，在这种情况下，会将默认模式按字符串模式处理)，如果自定义了`Symbol.toPrimitive`方法，则可以覆盖这些默认的强制转换行为。
```js
function Temperature (degress) {
  this.degress = degress
}
Temperature.prototype[Symbol.toPrimitive] = function (hint) {
  switch (hint) {
    case 'string':
      return this.degress + '℃'
    case 'number':
      return this.degress
    case 'default':
      return this.deress + ' degress'
  }
}
const freezing = new Temperature(32)
console.log(freezing + '')      // 32 degress
console.log(freezing / 2)       // 16
console.log(String(freezing))   // 32℃
```

代码分析：我们在对象`Temperature`原型上重写了`Symbol.toPrimitive`，新方法根据参数`hint`指定的模式返回不同的值，其中`hint`参数由`JavaScript`引擎传入。其中`+`运算符触发默认模式，`hint`被设置为`default`;`/`运算符触发数字模式，`hint`被设置为`number`;`String()`函数触发字符串模式，`hint`被设置为`string`。

#### Symbol.toStringTag
在`JavaScript`中，如果我们同时存在多个全局执行环境，例如在浏览器中一个页面包含`iframe`标签，因为`iframe`和它外层的页面分别代表不同的领域，每一个领域都有自己的全局作用域，有自己的全局对象，在任何领域中创建的数组，都是一个正规的数组。然而，如果将这个数字传递到另外一个领域中，`instanceof Array`语句的检测结果会返回`false`，此时`Array`已经是另一个领域的构造函数，显然被检测的数组不是由这个构造函数创建的。<br/>

针对以上问题，我们很快找到了一个相对来说比较实用的解决方案：
```js
function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}
console.log(isArray([])) // true
```
与上述问题有一个类似的案例，在`ES5`之前我们可能会引入第三方库来创建全局的`JSON`对象，而在浏览器开始实现`JSON`全局对象后，就有必要区分`JSON`对象是`JavaScript`环境本身提供的还是由第三方库提供的：
```js
function supportsNativeJSON () {
  return typeof JSON !== 'undefined' && Object.prototype.toString.call(JSON) === '[object JSON]'
}
```
在`ES6`中，通过`Symbol.toStringTag`这个`Symbol`改变了调用`Object.prototype.toString()`时返回的身份标识，其定义了调用对象的`Object.prototype.toString.call()`方法时返回的值：
```js
function Person (name) {
  this.name = name
}
Person.prototype[Symbol.toStringTag] = 'Person'
const person = new Person('AAA')
console.log(person.toString())                        // [object Person]
console.log(Object.prototype.toString.call(person))   // [object Person]
```

## Set和Map集合
`Set`集合是一种无重复元素的列表，通常用来检测给定的值是否在某个集合中；`Map`集合内含多组键值对，集合中每个元素分别存放着可访问的键名和它对应的值，`Map`集合经常被用来缓存频繁取用的数据。

### ES5中的Set和Map集合
在`ES6`还没有正式引入`Set`集合和`Map`集合之前，开发者们已经开始使用对象属性来模拟这两种集合了：
```js
const set = Object.create(null)
const map = Object.create(null)
set.foo = true
map.bar = 'bar'
// set检查
if (set.foo) {
  console.log('存在')
}
// map取值
console.log(map.bar) // bar
```
以上程序很简单，确实可以使用对象属性来模拟`Set`集合和`Map`集合，但却在实际使用的过程中有诸多的不方便：
* 对象属性名必须为字符串：
```js
const map = Object.create(null)
map[5] = 'foo'
// 本意是使用数字5作为键名，但被自动转换为了字符串
console.log(map['5']) // foo
```
* 对象不能作为属性名：
```js
const map = Object.create(null)
const key1 = {}
const key2 = {}
map[key1] = 'foo'
// 本意是使用key1对象作为属性名，但却被自动转换为[object Object]
// 因此map[key1] = map[key2] = map['[object Object]']
console.log(map[key2]) // foo
```
* 不可控制的强制类型转换：
```js
const map = Object.create(null)
map.count = 1
// 本意是检查count属性是否存在，实际检查的确是map.count属性的值是否为真
if (map.count) {
  console.log(map.count)
}
```
### ES6中的Set集合
::: tip
`Set`集合是一种有序列表，其中含有一些相互独立的非重复值，在`Set`集合中，不会对所存的值进行强制类型转换。
:::
其中`Set`集合涉及到的属性和方法有：
* `Set`构造函数：可以使用此构造函数创建一个`Set`集合。
* `add`方法：可以向`Set`集合中添加一个元素。
* `delete`方法：可以移除`Set`集合中的某一个元素。
* `clear`方法：可以移除`Set`集合中所有的元素。
* `has`方法：判断给定的元素是否在`Set`集合中。
* `size`属性：`Set`集合的长度。

#### 创建Set集合
`Set`集合的构造函数可以接受任何可迭代对象作为参数，例如：数组、`Set`集合或者`Map`集合。

```js
const set = new Set()
set.add(5)
set.add('5')
// 重复添加的值会被忽略
set.add(5)
console.log(set.size) // 2
```

#### 移除元素
使用`delete()`方法可以移除集合中的某一个值，使用`clear()`方法可以移除集合中所有的元素。

```js
const set = new Set()
set.add(5)
set.add('5')
console.log(set.has(5)) // true
set.delete(5)
console.log(set.has(5)) // false
console.log(set.size)   // 1
set.clear()
console.log(set.size)   // 0
```

#### Set集合的forEach()方法
::: tip
除`forEach()`以外，还支持`keys()`、`values()`以及`entries()`方法。
:::
`Set`集合的`forEach()`方法和数组的`forEach()`方法是一样的，唯一的区别在于`Set`集合在遍历时，第一和第二个参数是一样的。
```js
const set = new Set([1, 2])
set.forEach((value, key, arr) => {
  console.log(`${value} ${key}`)
  console.log(arr === set)
})
// 1 1
// true
// 2 2
// true
```

#### Set集合转换为数组
因为`Set`集合不可以像数组那样通过索引去访问元素，最好的做法是将`Set`集合转换为数组。
```js
const set = new Set([1, 2, 3, 4])
// 方法一：展开运算符
const arr1 = [...set]
// 方法二：Array.from方法
const arr2 = Array.from(set)
console.log(arr1) // [1, 2, 3, 4]
console.log(arr2) // [1, 2, 3, 4]
```

#### Weak Set集合
通过以上对`Set`集合的梳理，我们可以发现：只要`Set`实例中的引用存在，垃圾回收机制就不能释放该对象的内存空间，所以我们把`Set`集合看作是一个强引用的集合。为了更好的处理`Set`集合的垃圾回收，引入了一个叫`Weak Set`的集合：
::: tip
`Weak Set`集合只支持三种方法：`add`、`has`和`delete`。
:::
```js
const weakSet = new WeakSet()
const key = {}
weakSet.add(key)
console.log(weakSet.has(key)) // true
weakSet.delete(key)
console.log(weakSet.has(key)) // false
```
`Set`集合和`Weak Set`集合有许多共同的特性，但它们之间还是有一定的差别的：
* `Weak Set`集合只能存储对象元素，向其添加非对象元素会导致抛出错误，同理`has()`和`delete()`传递非对象也同样会报错。
* `Weak Set`集合不可迭代，也不暴露任何迭代器，因此也不支持`forEach()`方法。
* `Weak Set`集合不支持`size`属性。

### ES6中的Map集合
`ES6`中的`Map`类型是一种存储着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型，键名的等价性判断是通过调用`Object.is`方法来实现的。
```js
const map = new Map()
const key1 = {
  name: 'key1'
}
const key2 = {
  name: 'key2'
}
map.set(5, 5)
map.set('5', '5')
map.set(key1, key2)
console.log(map.get(5))     // 5
console.log(map.get('5'))   // '5'
console.log(map.get(key1))  // {name:'key2'}
```

#### Map集合支持的方法
与`Set`集合类似，`Map`集合也支持以下几种方法：
* `has`：判断指定的键名是否在`Map`集合中存在。
* `delete`：在`Map`集合中移除指定键名及其对应的值。
* `clear`：移除`Map`集合中所有的键值对。
```js
const map = new Map()
map.set('name', 'AAA')
map.set('age', 23)
console.log(map.size)        // 2
console.log(map.has('name')) // true
console.log(map.get('name')) // AAA
map.delete('name')
console.log(map.has('name')) // false
map.clear()
console.log(map.size)        // 0
```

#### Map集合的初始化方法
在初始化`Map`集合的时候，也可以像`Set`集合传入数组，但此时数组中的每一个元素都是一个子数组，子数组中包含一个键值对的键名和值两个元素。
```js
const map = new Map([['name', 'AAA'], ['age', 23]])
console.log(map.has('name'))  // true
console.log(map.has('age'))   // true
console.log(map.size)         // 2
console.log(map.get('name'))  // AAA
console.log(map.get('age'))   // 23
```

#### Map集合的forEach()方法
`Map`集合中的`forEach()`方法的回调参数和数组类似，每一个参数的解释如下：
* 第一个参数是键名
* 第二个参数是值
* 第三个参数是`Map`集合本身

```js
const map = new Map([['name', 'AAA'], ['age', 23]])
map.forEach((key, value, ownMap) => {
  console.log(`${key} ${value}`)
  console.log(ownMap === map)
})
// name AAA
// true
// age 23
// true
```

#### Weak Map集合
`Weak Map`它是一种存储着许多键值对的无序列表，集合中的键名必须是一个对象，如果使用非对象键名会报错。
::: tip
`Weak Map`集合只支持`set()`、`get()`、`has()`和`delete()`。
:::
```js
const key1 = {}
const key2 = {}
const key3 = {}
const weakMap = new WeakMap([[key1, 'AAA'], [key2, 23]])
weakMap.set(key3, '广东')

console.log(weakMap.has(key1)) // true
console.log(weakMap.get(key1)) // AAA
weakMap.delete(key1)
console.log(weakMap.has(key)) // false
```
`Map`集合和`Weak Map`集合有许多共同的特性，但它们之间还是有一定的差别的：
* `Weak Map`集合的键名必须为对象，添加非对象会报错。
* `Weak Map`集合不可迭代，因此不支持`forEach()`方法。
* `Weak Map`集合不支持`clear`方法。
* `Weak Map`集合不支持`size`属性。

## 迭代器(Iterator)和生成器(Generator)

### 循环语句的问题
我们在日常的开发过程中，很可能写过下面这样的代码：
```js
var colors = ['red', 'gree', 'blue']
for(var i = 0, len = colors.length; i < len; i++) {
  console.log(colors[i])
}
// red
// green
// blue
```
代码分析：虽然循环语句的语法简单，但是如果将多个循环嵌套则需要追踪多个变量，代码复杂度会大大增加，一不小心就会错误使用了其它`for`循环的跟踪变量，从而造成程序出错，而`ES6`引入迭代器的宗旨就是消除这种复杂性并减少循环中的错误。

### 什么是迭代器
问：什么是迭代器？<br/>
答：迭代器是一种特殊的对象，它具有一些专门为迭代过程设计的专有接口，所有迭代器都有一个叫`next`的方法，每次调用都返回一个结果对象。结果对象有两个属性，一个是`value`表示下一次将要返回的值；另外一个是`done`，它是一个布尔类型的值，当没有更多可返回的数据时返回`true`。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次`next`方法，都会返回下一个可用的值。<br/>

在了解迭代器的概念后，我们使用`ES5`语法来创建一个迭代器：
```js
function createIterator (items) {
  var i = 0
  return {
    next: function () {
      var done = i >= items.length
      var value = !done ? items[i++] : undefined
      return {
        done: done,
        value: value
      }
    }
  }
}
var iterator = createIterator([1, 2, 3])
console.log(iterator.next())  // { value: 1, done: false }
console.log(iterator.next())  // { value: 2, done: false }
console.log(iterator.next())  // { value: 3, done: false }
console.log(iterator.next())  // { value: undefined, done: true }
```
正如上面那样，我们使用了`ES5`语法来创建我们自己的迭代器，它的内部实现很复杂，而`ES6`除了引入了迭代器的概念还引入了一个叫生成器的概念，使用它我们可以让创建迭代器的过程更加简单一点。

### 什么是生成器
问：什么是生成器？<br/>
答：生成器是一种返回迭代器的函数，通过`function`关键字后的`*`号来表示，函数中会用到新的关键词`yield`。

```js
function * createIterator () {
  yield 1
  yield 2
  yield 3
}
const iterator = createIterator()
console.log(iterator.next().value)  // 1
console.log(iterator.next().value)  // 2
console.log(iterator.next().value)  // 3
```
正如我们上面的输出结果一样，它和我们使用`ES5`语法创建的迭代器输出结果是一致的。<br/>

**生成器函数最重要的一点是：每执行完一条`yield`语句，函数就会自动终止**：我们在`ES6`之前，函数一旦开始执行，则一直会向下执行，一直到函数`return`语句都不会中断，但生成器函数却打破了这一惯例：当执行完一条`yield`语句时，函数会自动停止执行，除非代码手动调用迭代器的`next`方法。<br/>

我们也可以在循环中使用生成器：
```js
function * createIterator (items) {
  for(let i = 0, len = items.length; i < len; i++) {
    yield items[i]
  }
}
const it = createIterator([1, 2, 3])
console.log(it.next())  // { done: false, value: 1 }
console.log(it.next())  // { done: false, value: 2 }
console.log(it.next())  // { done: false, value: 3 }
console.log(it.next())  // { done: true, value: undefined }
```

::: warning 限制
`yield`关键字只能在生成器内部使用，在其他地方使用会导致抛出错误，即使是在生成器内部的函数中使用也是如此。
:::
```js
function * createIterator (items) {
  items.forEach(item => {
    // 抛出错误
    yield item + 1
  })
}
```

### 可迭代对象和for-of循环
问：可迭代对象有什么特点？<br/>
答：可迭代对象具有`Symbol.iterator`属性，是一种与迭代器密切相关的对象。`Symbol.iterator`通过指定的函数可以返回一个作用于附属对象的迭代器。在`ES6`中，所有的集合对象(数组、`Set`集合以及`Map`集合)和字符串都是可迭代对象，这些对象中都有默认的迭代器。由于生成器默认会为`Symbol.iterator`属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象。<br/>

`ES6`新引入了`for-of`循环每执行一次都会调用可迭代对象的`next`方法，并将迭代器返回的结果对象的`value`属性存储在一个变量中，循环将持续执行这一过程直到返回对象的`done`属性的值为`true`。
```js
const value = [1, 2, 3]
for (let num of value) {
  console.log(num);
}
// 1
// 2
// 3
```

#### 访问默认的迭代器
可以通过`Symbol.iterator`来访问对象的默认迭代器

```js
const values = [1, 2, 3]
const it = values[Symbol.iterator]()
console.log(it.next())  // {done:false, value:1}
console.log(it.next())  // {done:false, value:2}
console.log(it.next())  // {done:false, value:3}
console.log(it.next())  // {done:true, value:undefined}
```

由于具有`Symbol.iterator`属性的对象都有默认的迭代器对象，因此可以用它来检测对象是否为可迭代对象：
```js
function isIterator (object) {
  return typeof object[Symbol.iterator] === 'function'
}

console.log(isIterator([1, 2, 3]))  // true
console.log(isIterator('hello'))    // true，字符串也可以迭代，原理等同于数组
console.log(isIterator(new Set()))  // true
console.log(isIterator(new Map))    // true
```

#### 创建可迭代对象
默认情况下，我们自己定义的对象都是不可迭代对象，但如果给`Symbol.iterator`属性添加一个生成器，则可以将其变为可迭代对象。

```js
let collection = {
  items: [1, 2, 3],
  *[Symbol.iterator] () {
    for (let item of this.items) {
      yield item
    }
  }
}
for (let value of collection) {
  console.log(value)
}
// 1
// 2
// 3
```

### 内建迭代器

#### 集合对象迭代器
在`ES6`中有三种类型的集合对象：数组、`Set`集合和`Map`集合，它们都内建了如下三种迭代器：
* `entries`：返回一个迭代器，其值为多个键值对。
* `values`：返回一个迭代器，其值为集合的值。
* `keys`：返回一个迭代器，其值为集合中的所有键名。

`entries()`迭代器：
```js
const colors = ['red', 'green', 'blue']
const set = new Set([1, 2, 3])
const map = new Map([['name', 'AAA'], ['age', 23], ['address', '广东']])

for (let item of colors.entries()) {
  console.log(item)
  // [0, 'red']
  // [1, 'green']
  // [2, 'blue']
}
for (let item of set.entries()) {
  console.log(item)
  // [1, 1]
  // [2, 2]
  // [3, 3]
}
for (let item of map.entries()) {
  console.log(item)
  // ['name', 'AAA']
  // ['age', 23]
  // ['address', '广东']
}
```

`values`迭代器：
```js
const colors = ['red', 'green', 'blue']
const set = new Set([1, 2, 3])
const map = new Map([['name', 'AAA'], ['age', 23], ['address', '广东']])

for (let item of colors.values()) {
  console.log(item)
  // red
  // green
  // blue
}
for (let item of set.values()) {
  console.log(item)
  // 1
  // 2
  // 3
}
for (let item of map.values()) {
  console.log(item)
  // AAA
  // 23
  // 广东
}
```


`keys`迭代器：
```js
const colors = ['red', 'green', 'blue']
const set = new Set([1, 2, 3])
const map = new Map([['name', 'AAA'], ['age', 23], ['address', '广东']])

for (let item of colors.keys()) {
  console.log(item)
  // 0
  // 1
  // 2
}
for (let item of set.keys()) {
  console.log(item)
  // 1
  // 2
  // 3
}
for (let item of map.keys()) {
  console.log(item)
  // name
  // age
  // address
}
```

**不同集合类型的默认迭代器**：每一个集合类型都有一个默认的迭代器，在`for-of`循环中，如果没有显示的指定则使用默认的迭代器：
* 数组和`Set`集合：默认迭代器为`values`。
* `Map`集合：默认为`entries`。

```js
const colors = ['red', 'green', 'blue']
const set = new Set([1, 2, 3])
const map = new Map([['name', 'AAA'], ['age', 23], ['address', '广东']])
for (let item of colors) {
  console.log(item)
  // red
  // green
  // blue
}
for (let item of set) {
  console.log(item)
  // 1
  // 2
  // 3
}
for (let item of map) {
  console.log(item)
  // ['name', 'AAA']
  // ['age', 23]
  // ['address', '广东']
}
```

**解构和for-of循环**：如果要在`for-of`循环中使用解构语法，则可以简化编码过程：
```js
const map = new Map([['name', 'AAA'], ['age', 23], ['address', '广东']])
for (let [key, value] of map.entries()) {
  console.log(key, value)
  // name AAA
  // age 23
  // address 广东
}
```
#### 字符串迭代器
自`ES6`发布以来，`JavaScript`字符串的行为慢慢变得更像数组了：
```js
let message = 'Hello'
for(let i = 0, len = message.length; i < len; i++) {
  console.log(message[i])
  // H
  // e
  // l
  // l
  // o
}
```

#### NodeList迭代器
`DOM`标准中有一个`NodeList`类型，代表页面文档中所有元素的集合。`ES6`为其添加了默认的迭代器，其行为和数组的默认迭代器一致：
```js
let divs = document.getElementByTagNames('div')
for (let div of divs) {
  console.log(div)
}
```

### 展开运算符和非数组可迭代对象
我们在前面的知识中已经知道，我们可以使用展开运算符把一个`Set`集合转换成一个数组，像下面这样：
```js
let set = new Set([1, 2, 3, 4])
let array = [...set]
console.log(array) // [1, 2, 3, 4]
```
**代码分析**：在我们所用`...`展开运算符的过程中，它操作的是`Set`集合的默认可迭代对象(`values`)，从迭代器中读取所有值，然后按照返回顺序将他们依次插入到数组中。
```js
const map = new Map([['name', 'AAA'], ['age', 23], ['address', '广东']])
const array = [...map]
console.log(array) // [['name', 'AAA'], ['age', 23], ['address', '广东']]
```
**代码分析**：在我们使用`...`展开运算符的过程中，它操作的是`Map`集合的默认可迭代对象(`entries`)，从迭代器中读取多组键值对，依次插入数组中。

```js
const arr1 = ['red', 'green', 'blue']
const arr2 = ['yellow', 'white', 'black']
const array = [...arr1, ...arr2]
console.log(array) // ['red', 'green', 'blue', 'yellow', 'white', 'black']
```
**代码分析**：在使用`...`展开运算符的过程中，同`Set`集合一样使用的都是其默认迭代器(`values`)，然后按照返回顺序依次将他们插入到数组中。

### 高级迭代器功能

#### 给迭代器传递参数
如果给迭代器`next()`方法传递参数，则这个参数的值就会替代生成器内部上一条`yield`语句的返回值。

```js
function * createIterator () {
  let first = yield 1
  let second = yield first + 2
  yield second + 3
}
let it = createIterator()
console.log(it.next(11)) // {done: false, value: 1}
console.log(it.next(4))  // {done: false, value: 6}
console.log(it.next(5))  // {done: false, value: 8}
console.log(it.next())   // {done: true, value: undefined}
```
代码分析：除了第一个迭代器，其它几个迭代器我们能很快计算出结果，但为什么第一个`next()`方法的参数无效呢？这是因为传给`next()`方法的参数是替代上一次`yield`的返回值，而在第一次调用`next()`方法之前不会执行任何`yield`语句，因此给第一次调用的`next()`方法传递参数，无论传递任何值都将被舍弃。


#### 在迭代器中抛出错误
除了给迭代器传递数据外，还可以给他传递错误条件，让其恢复执行时抛出一个错误。

```js
function * createIterator () {
  let first = yield 1
  let second = yield first + 2
  // 不会被执行
  yield second + 3
}
let it = createIterator()
console.log(it.next())                    // {done: false, value: 1}
console.log(it.next(4))                   // {done: false, value: 6}
console.log(it.throw(new Error('break'))) // 抛出错误
```
正如我们上面看到的那样，我们向生成器内部传递了一个错误对象，迭代器恢复执行时会抛出一个错误，我们可以使用`try-catch`语句来捕获这种错误：
```js
function * createIterator () {
  let first = yield 1
  let second
  try {
    second = yield first + 2
  } catch(ex) {
    second = 6
  }
  yield second + 3
}
let it = createIterator()
console.log(it.next())                    // {done: false, value: 1}
console.log(it.next(4))                   // {done: false, value: 6}
console.log(it.throw(new Error('break'))) // {done: false, value: 9}
console.log(it.next())                    // {done: true, value: undefined}
```

#### 生成器返回语句
由于生成器也是函数，因此可以通过`return`语句提前退出函数执行，对于最后一次`next()`方法调用，可以主动为其指定一个返回值。

```js
function * createIterator () {
  yield 1
  return 2
  // 不会被执行
  yield 3
  yield 4
}
let it = createIterator()
console.log(it.next())  // {done: false, value: 1}
console.log(it.next())  // {done: true, value: 2}
console.log(it.next())  // {done: true, value: undefined}
```
代码分析：在生成器中，`return`语句表示所有的操作都已经完成，属性值`done`会被设置成`true`，如果同时提供了响应的值，则属性`value`会被设置为这个值，并且`return`语句之后的`yield`不会被执行。

::: warning
展开运算符和`for-of`循环会直接忽略通过`return`语句指定的任何返回值，因为只要`done`被设置为`true`，就立即停止读取其他的值。
:::
```js
const obj = {
  items: [1, 2, 3, 4, 5],
  *[Symbol.iterator] () {
    for (let i = 0, len = this.items.length; i < len; i++) {
      if (i === 3) {
        return 300
      } else {
        yield this.items[i]
      }
    } 
  }
}
for (let value of obj) {
  console.log(value)
  // 1
  // 2
  // 3
}
console.log([...obj]) // [1, 2, 3]
```

#### 委托生成器
我们可以将两个迭代器合二为一，这样就可以创建一个生成器，再给`yield`语句添加一个星号，以达到将生成数据的过程委托给其他迭代器。

```js
function * createColorIterator () {
  yield ['red', 'green', 'blue']
}
function * createNumberIterator () {
  yield [1, 2, 3, 4]
}
function * createCombineIterator () {
  yield * createColorIterator();
  yield * createNumberIterator();
}
let it = createCombineIterator()
console.log(it.next().value)  // ['red', 'green', 'blue']
console.log(it.next().value)  // [1, 2, 3, 4]
console.log(it.next().value)  // undefined
```

## JavaScript中的类

### ES5中的近类结构
在`ES5`及早期版本中没有类的概念，最相近的思路是创建一个自定义类型：首先创建一个构造函数，然后定义另一个方法并赋值给构造函数的原型，例如：
```js
function Person (name) {
  this.name = name
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
let person = new Person('AAA')
person.sayName()                      // AAA
console.log(person instanceof Person) // true
console.log(person instanceof Object) // true
```
通过以上一个在`ES5`中近似类的结构的特性，许多`JavaScript`类库都基于这个模式进行开发，而且`ES6`中的类也借鉴了类似的方法。

### 类的声明
要声明一个类，需要使用`class`关键来声明，**注意**：类声明仅仅只是对已有自定义类型声明的语法糖而已。

```js
class Person {
  // 相当于Person构造函数
  constructor (name) {
    this.name = name
  }
  // 相当于Person.prototype.sayName
  sayName () {
    console.log(this.name)
  }
}
const person = new Person('AAA')
person.sayName()                      // AAA
console.log(person instanceof Person) // true
console.log(person instanceof Object) // true
```
代码分析：
* `constructor()`：我们可以看到`constructor()`方法相当于我们上面写到的`Person`构造函数，在`constructor()`方法中我们定义了一个`name`的自有属性。所谓自有属性，就是类实例的属性，其不会出现在原型上，且只能在类的构造函数或方法中被创建。
* `sayName()`：`sayName()`方法就相当于我们上面写到的`Person.prototype.sayName`。有一个特别需要注意的地方就是：与函数有所不同，类属性不可被赋予新值，例如：`Person.prototype`就是这样一个只读的类属性。

#### 类和自定义类型的差异：
* 函数声明可以被提升，而类声明与`let`声明类似，不能被提升；真正执行声明语句之前，它们一直存在暂时性死区。
* 类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行。
* 在自定义方法中，需要通过`Object.defineProperty()`方法手动指定某个方法不可枚举；而在类中，所有方法都是不可枚举的。
* 每一个类都有一个名叫`[[Construct]]`的内部方法，通过关键字`new`调用那些不含`[[Construct]]`的方法会导致程序抛出错误。
* 使用除关键字`new`以外的方式调用类的构造函数会导致程序抛出错误。
* 在类中修改类名会导致程序报错。<br/>

在了解了类和自定义类型的差异以后，我们可以使用除了类之外的语法来编写等价的代码：
```js
// ES5等价类
let Person = (function() {
  'use strict'
  const Person = function(name) {
    if (typeof new.target === 'undefined') {
      throw new Error('必须通过关键字new调用此构造函数')
    }
    this.name = name
  }
  Object.defineProperty(Person.prototype, 'sayName', {
    value: function () {
      if (typeof new.target !== 'undefined') {
        throw new Error('不可通过关键字new来调用此方法')
      }
      console.log(this.name)
    },
    enumerable: false,
    writable: false,
    configurable: true
  })
  return Person
}())

const person = new Person('AAA')
person.sayName()                      // AAA
console.log(person instanceof Person) // true
```

### 类的表达式
类和函数都有两种存在形式：声明形式和表达式形式

```js
// 类的表达式形式
let Person = class {
  constructor (name) {
    this.name
  }
  sayName () {
    console.log(this.name)
  }
}
```
从以上代码可以看出：类声明和类表达式的功能极为相似，只是编写的方式略有差异，二者均不会像函数声明和函数表达式一样被提升。<br/>
在我们最上面，我们的类声明是一个匿名的类表达式，其实类和函数一样，都可以定义为命名表达式：
```js
let PersonClass = class Person{
  constructor (name) {
    this.name
  }
  sayName () {
    console.log(this.name)
  }
}
const person = new PersonClass('AAA')
person.sayName()                // AAA
console.log(typeof PersonClass) // function
console.log(typeof Person)      // undefined
```

#### 类和单例
类表达式还有一种用法：通过立即调用类构造函数可以创建单例，用`new`调用类表达式，紧接着通过一对小括号调用这个表达式：
```js
let person = new class {
  constructor (name) {
    this.name = name
  }
  sayName () {
    console.log(this.name)
  }
}('AAA')
person.sayName() // AAA
```

### 一等公民的类
一等公民是指一个可以传入函数，也可以从函数中返回，并且可以赋值给变量的值。

```js
function createObject (classDef) {
  return new classDef()
}
const obj = createObject (class {
  sayHi () {
    console.log('Hello!')
  }
})
obj.sayHi() // Hello!
```


### 访问器属性
除了可以在构造函数中创建自己的属性，还可以在类的原型上直接定义访问器属性。

```js
class Person {
  constructor (message) {
    this.animal.message = message
  }
  get message () {
    return this.animal.message
  }
  set message (message) {
    this.animal.message = message
  }
}
const desc = Object.getOwnPropertyDescriptor(Person.prototype, 'message')
console.log('get' in desc)  // true
console.log('set' in desc)  // true
```
为了更好的理解类的访问器属性，我们使用`ES5`代码来改写有关访问器部分的代码：
```js
// 省略其它部分
Object.defineProperty(Person.prototype, 'message', {
  enumerable: false,
  configurable: true,
  get: function () {
    return this.animal.message
  },
  set: function (val) {
    this.animal.message = val
  }
})
```
我们经过对比可以发现，比起`ES5`等价代码而言，使用`ES6`类的语法要简洁得多。

### 可计算成员名称
类和对象字面量还有很多相似之处，类方法和访问器属性也支持使用可计算名称。

```js
const methodName= 'sayName'
const propertyName = 'newName'
class Person {
  constructor (name) {
    this.name = name
  }
  [methodName] () {
    console.log(this.name)
  }
  get [propertyName] () {
    return this.name
  }
  set [propertyName] (val) {
    this.name = val
  }
}
let person = new Person('AAA')
person.sayName()            // AAA
person.name = 'BBB'
console.log(person.newName) // BBB
```

### 生成器方法
在类中，同样可以像对象字面量一样，在方法名前面加一个星号(*)的方式来定义生成器。
```js
class MyClass {
  * createIterator () {
    yield 1
    yield 2
    yield 3
  }
}
let instance = new MyClass()
let it = instance.createIterator()
console.log(it.next().value)  // 1
console.log(it.next().value)  // 2
console.log(it.next().value)  // 3
console.log(it.next().value)  // undefined
```
尽管生成器方法很有用，但如果类仅仅只是用来表示值的集合，那么为它定义一个默认的迭代器会更加有用。
```js
class Collection {
  constructor () {
    this.items = [1, 2, 3]
  }
  *[Symbol.iterator]() {
    yield *this.items.values()
  }
}
const collection = new Collection()
for (let value of collection) {
  console.log(value)
  // 1
  // 2
  // 3
}
```

### 静态成员
在`ES5`及其早期版本中，直接将方法添加到构造函数中来模拟静态成员是一种常见的模式：
```js
function PersonType (name) {
  this.name = name
}
// 静态方法
PersonType.create = function (name) {
  return new PersonType(name)
}
// 实例方法
PersonType.prototype.sayName = function () {
  console.log(this.name)
}
const person = PersonType.create('AAA')
person.sayName() // AAA
```
在`ES6`中，类语法简化了创建静态成员的过程，在方法或者访问器属性名前面使用正式的静态注释`static`即可。<br/>
**注意**：静态成员只能在类中访问，不能在实例中访问

```js
class Person {
  constructor (name) {
    this.name = name
  }
  sayName () {
    console.log(this.name)
  }
  static create (name) {
    return new Person(name)
  }
}
const person = Person.create('AAA')
person.sayName() // AAA
```

### 继承与派生类
在`ES6`之前，实现继承与自定义类型是一个不小的工作，严格意义上的继承需要多个步骤实现。
```js
function Rectangle (width, height) {
  this.width = width
  this.height = height
}
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}
function Square(length) {
  Rectangle.call(this, length, length)
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    enumerable: true,
    configurable: true,
    writabel: true
  }
})
const square = new Square(3)
console.log(square.getArea())             // 9
console.log(square instanceof Square)     // true
console.log(Square instanceof Rectangle)  // false
```
代码分析：为了使用`ES6`之前的语法实现继承，我们必须用一个创建自`Rectangle.prototype`的新对象来重写`Square.prototype`并调用`Rectangle.call()`方法。在`ES6`中由于类的出现我们可以轻松的实现继承，需要使用我们熟悉的关键词`extends`来指定类继承的函数。原型会自动调用，通过调用`super()`方法即可访问基类的构造函数，因此我们使用`ES6`类的语法来重写以上示例：
```js
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
}
class Square extends Rectangle {
  constructor (length) {
    // 等价于 Rectangle.call(this, length, length)
    super(length, length)
  }
}
const square = new Square(3)
console.log(square.getArea())             // 9
console.log(square instanceof Square)     // true
console.log(Square instanceof Rectangle)  // false
```
**注意**：继承自其它类的类被称作派生类，如果在派生类中指定了构造函数则必须要调用`super()`，否则会抛出错误。如果不选择使用构造函数，则当创建新的实例时会自动调用`super()`并传入所有参数，如下：
```js
// 省略其它代码
class Square extends Rectangle {
  // 没有构造函数
}
// 等价于
class Square extends Rectangle {
  constructor (...args) {
    super(...args)
  }
}
```

#### 类方法遮蔽
**注意**：派生类中的方法总是会覆盖基类中的同名方法。

```js
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
}
class Square extends Rectangle {
  constructor (length) {
    super(length, length)
    this.length = length
  }
  getArea () {
    return this.length * this.length
  }
}
const square = new Square(3)
console.log(square.getArea()) // 9
```
代码分析：由于`Square`类已经定义了`getArea()`方法，便不能在`Square`的实例中调用`Rectangle.prototype.getArea()`方法。如果我们想调用基类中的同名方法，可以使用`super.getArea()`。
```js
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
}
class Square extends Rectangle {
  constructor (length) {
    super(length, length)
    this.length = length
  }
  getArea () {
    return super.getArea()
  }
}
const square = new Square(3)
console.log(square.getArea()) // 9
```
#### 静态成员继承
如果基类中有静态成员，那么这些静态成员在派生类中也可以使用。

```js
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
  static create (width, length) {
    return new Rectangle(width, length)
  }
}
class Square extends Rectangle {
  constructor (length) {
    super(length, length)
  }
}
const square1 = new Square(3)
const square2 = Square.create(4, 4)
console.log(square1.getArea())             // 9
console.log(square2.getArea())             // 16
console.log(square1 instanceof Square)     // true
console.log(square2 instanceof Rectangle)  // true，因为square2是Rectangle的实例，而不是Square的实例
```

#### 派生自表达式的类
`ES6`最强大的一面或许是表达式导出类的功能了，只要表达式可以被解析成为一个函数并且具有`[[Construct]]`属性和原型，那么就可以用`extends`进行派生。

```js
function Rectangle (width, height) {
  this.width = width
  this.height = height
}
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}
class Square extends Rectangle {
  constructor (length) {
    super(length, length)
  }
}
var square = new Square(3)
console.log(square.getArea())             // 9
console.log(square instanceof Rectangle)  // true
```
代码分析：`Rectangle`是一个典型的`ES5`风格的构造函数，`Square`是一个类，由于`Rectangle`具有`[[Constructor]]`属性和原型，因此`Square`类可以直接继承它。

#### extends动态继承
`extends`强大的功能使得类可以继承自任意类型的表达式，从而创造更多的可能性，例如动态确定类的继承目标。

```js
function Rectangle (width, height) {
  this.width = width
  this.height = height
}
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}
function getBaseClass () {
  return Rectangle
}
class Square extends getBaseClass() {
  constructor (length) {
    super(length, length)
  }
}
var square = new Square(3)
console.log(square.getArea())             // 9
console.log(square instanceof Rectangle)  // true
```
我们已经可以从上面的例子中看到，可以用一个函数调用的形式，动态的返回需要继承的类，那么扩展开来，我们可以创建不同的继承`mixin`方法：
```js
const NormalizeMixin = {
  normalize () {
    return JSON.stringify(this)
  }
}
const AreaMixin = {
  getArea () {
    return this.width * this.height
  }
}
function mixin(...mixins) {
  const base = function () {}
  Object.assign(base.prototype, ...mixins)
  return base
}
class Square extends mixin(AreaMixin, NormalizeMixin) {
  constructor (length) {
    super()
    this.width = length
    this.height = length
  }
}
const square = new Square(3)
console.log(square.getArea())     // 9
console.log(square.normalize())   // {width:3, height: 3}
```
代码分析：与`getBaseClass()`方法直接返回单一对象不同的是，我们定义了一个`mixin()`方法，作用是把多个对象的属性合并在一起并返回，然后使用`extends`来继承这个对象，从而达到继承`NormalizeMixin`对象的`normalize()`方法和`AreaMixin`对象的`getArea()`方法的目的。

#### 内建对象的继承
在`ES5`及其早期版本中，如果我们想要通过继承的方式来创建属于我们自己的特殊数组几乎是不可能的，例如：
```js
// 内建数组的行为
const colors = []
colors[0] = 'red'
console.log(colors.length)  // 1
colors.length = 0
console.log(colors[0])      // undefined
// 尝试ES5语法继承数组
function MyArray () {
  Array.apply(this, arguments)
}
MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    enumerable: true,
    writable: true,
    configurable: true
  }
})
const colors1 = new MyArray()
colors1[0] = 'red'
console.log(colors1.length)  // 0
colors1.length = 0
console.log(colors1[0])      // 'red'
```
代码分析：我们可以看到我们自己的特殊数组的两条打印结果都不符合我们的预期，这是因为通过传统的`JavaScript`继承形式实现的数组继承没有从`Array.apply()`或原型赋值中继承相关的功能。

因为`ES6`引入了类的语法，因此使用`ES6`类的语法我们可以轻松的实现自己的特殊数组：
```js
class MyArray extends Array {}
const colors = new MyArray()
colors['0'] = 'red'
console.log(colors.length)  // 1
colors.length = 0
console.log(colors[0])      // undefined
```

#### Symbol.species属性
内建对象继承的一个实用之处是：原本在内建对象中返回的实例自身的方法将自动返回派生类的实例。例如：如果我们有一个继承自`Array`的派生类`MyArray`，那么像`slice()`这样的方法也会返回一个`MyArray`的实例。
```js
class MyArray extends Array {}
const items1 = new MyArray(1, 2, 3, 4)
const items2 = items1.slice(1, 3)
console.log(items1 instanceof MyArray) // true
console.log(items2 instanceof MyArray) // true
```
`Symbol.species`属性是诸多内部`Symbol`中的一个，它被用于定义返回函数的静态访问器属性。被返回的函数是一个构造函数，每当要在实例的方法中创建类的实例时必须使用这个构造函数，以下内建类型都已定义了`Symbol.species`属性：
* `Array`
* `ArrayBuffer`
* `Map`
* `Promise`
* `RegExp`
* `Set`
* `Typed arrays`

### 构造函数中的new.target
我们在之前曾经了解过`new.target`及其值会根据函数被调用的方式而改变的原理，在类的构造函数中也可以通过`new.target`来确定类是如何被调用的，一般而言`new.target`等于类的构造函数。
```js
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
    console.log(new.target === Rectangle)
  }
}
const rect = new Rectangle(3, 4)  // 输出true 
```
然而当类被继承的时候，`new.target`是等于派生类的：
```js
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
    console.log(new.target === Rectangle)
    console.log(new.target === Square)
  }
}
class Square extends Rectangle {
  constructor (length) {
    super(length, length)
  }
}
const square = new Square(3)
// 输出false
// 输出true
```

根据`new.target`的特性，我们可以定义一种抽象基类：即不能被直接实例化，必须通过继承的方式来使用。
```js
class Shape {
  constructor () {
    if (new.target === Shape) {
      throw new Error('不能被直接实例化')
    }
  }
}
class Rectangle extends Shape {
  constructor (width, height) {
    super()
    this.width = width
    this.height = height
  }
}
const rect = new Rectangle(3, 4)
console.log(rect instanceof Shape) // true
```

## 改进的数组功能
此章节关于定型数组的部分暂未整理。

### 创建数组

#### 背景
在`ES6`之前，创建数组只有两种形式，一种是使用`Array`构造函数，另外一种是使用数组字面量。如果我们想将一个类数组对象(具有数值型索引和`length`属性的对象)转换为数组，可选的方法十分有限，经常需要编写额外的代码。在此背景下，`ES6`新增了`Array.of`和`Array.from`这两个方法。

#### Array.of
在`ES6`之前，使用`Array`构造函数创建数组有许多怪异的地方容易让人感到迷惑，例如：
```js
let items = new Array(2)
console.log(items.length) // 2
console.log(items[0])     // undefined
console.log(items[1])     // undefined

items = new Array('2')
console.log(items.length) // 1
console.log(items[0])     // '2'

items = new Array(1, 2)
console.log(items.length) // 2
console.log(items[0])     // 1
console.log(items[1])     // 2

items = new Array(3, '2')
console.log(items.length) // 2
console.log(items[0])     // 3
console.log(items[1])     // '2'
```
迷惑行为：
* 如果给`Array`构造函数传入一个数值型的值，那么数组的`length`属性会被设置为该值。
* 如果传入一个非数值类型的值，那么这个值会成为目标数据的唯一项。
* 如果传入多个值，此时无论这些值是不是数值类型，都会变成数组的元素。

为了解决以上的问题，`ES6`引入了`Array.of()`方法来解决这个问题。
::: tip
`Array.of()`总会创建一个包含所有参数的数组，无论有多少个参数，无论参数是什么类型。
:::
```js
let items = Array.of(1, 2)
console.log(items.length) // 2
console.log(items[0])     // 1
console.log(items[1])     // 2

items = Array.of(2)
console.log(items.length) // 1
console.log(items[0])     // 2

items = Array.of('2')
console.log(items.length) // 1
console.log(items[0])     // '2'
```


#### Array.from
`JavaScript`不支持直接将非数组对象转换为真实的数组，`arguments`就是一种类数组对象，在`ES5`中将类数组对象转换为数组的代码可以这样下：
```js
function makeArray(arrayLike) {
  let result = []
  for (let i = 0; i < arrayLike.length; i++) {
    result.push(arrayLike[i])
  }
  return result
}
function doSomething () {
  let args = makeArray(arguments)
  console.log(args)
}
doSomething(1, 2, 3, 4) // 输出[1, 2, 3, 4]
```
以上方法是使用`for`循环的方式来创建一个新数组，然后遍历`arguments`参数并将它们一个一个的`push`到数组中，最终返回。除了以上代码，我们还可以使用另外一种方式来达到相同的目的：
```js
function makeArray (arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}
function doSomething () {
  let args = makeArray(arguments)
  console.log(args)
}
doSomething(1, 2, 3, 4) // 输出[1, 2, 3, 4]
```
尽管我们提供了`ES5`两种不同的方案来将类数组转换为数组，但`ES6`还是给我们提供了一种语义清晰、语法简洁的新方法`Array.from()`
::: tip
`Array.from()`方法接受可迭代对象或者类数组对象作为第一个参数。
:::
```js
function doSomething () {
  let args = Array.from(arguments)
  console.log(args)
}
doSomething(1, 2, 3, 4) // 输出[1, 2, 3, 4]
```

##### Array.from映射转换
可以提供一个映射函数作为`Array.from()`方法的第二个参数，这个函数用来将类数组对象的每一个值转换成其他形式，最后将这些结果按顺序存储在结果数组相应的索引中。

```js
function translate() {
  return Array.from(arguments, (value) => value + 1)
}
let numbers = translate(1, 2, 3)
console.log(numbers) // [2, 3, 4]
```
正如我们上面看到的那样，我们使用一个`(value) => value + 1`的映射函数，分别为我们的参数`+1`，最终结果然后`[2, 3, 4]`。另外一种情况是，如果我们的映射函数处理的是对象的话，可以给`Array.from()`方法的第三个参数传递一个对象，来处理映射函数中相关`this`指向问题。
```js
let helper = {
  diff: 1,
  add (value) {
    return value + this.diff
  }
}
function translate () {
  return Array.from(arguments, helper.add, helper)
}
let numbers = translate(1, 2, 3)
console.log(numbers) // [2, 3, 4]
```

##### Array.from转换可迭代对象
`Array.from()`可以将所有含有`Symbol.iterator`属性的对象转换为数组。

```js
let iteratorObj = {
  * [Symbol.iterator]() {
    yield 1
    yield 2
    yield 3
  }
}
let numbers = Array.from(iteratorObj)
console.log(numbers) // [1, 2, 3]
```
**注意**：如果一个对象即是类数组对象又是可迭代对象，那么`Array.from`会优先根据迭代器来决定转换哪个值。


### ES6数组新增方法
`ES6`为数组新增了几个方法：
* `find()`和`findIndex()`方法可以帮助我们在数组中查找任意值。
* `fill()`方法可以用指定的值填充数组。
* `copyWithin()`方法可以帮助我们在数组中复制元素，它和`fill()`方法是有许多相似之处的。

#### find()方法和findIndex()方法
::: tip
`find()`和`findIndex()`都接受两个参数：一个是回调函数，另一个是可选参数，用于指定回调函数中的`this`值。
:::
函数介绍：`find()`和`findIndex()`方法都是根据传入的回调函数来查找，区别是`find()`方法返回查找到的值，`findIndex()`方法返回查找到的索引，而一旦查找到，即回调函数返回`true`，那么`find()`和`findIndex()`方法会立即停止搜索剩余的部分。
```js
let numbers = [25, 30, 35, 40, 45]
console.log(numbers.find(item => item >= 35))       // 35
console.log(numbers.findIndex(item => item === 35)) // 2
```

#### fill()方法
`find()`方法可以用指定的值填充一个至多个数组元素，当传入一个值时，`fill()`方法会用这个值重写数组中的所有值。

```js
let numbers = [1, 2, 3, 4]
numbers.fill(1)
console.log(numbers.toString()) // [1, 1, 1, 1]
```
如果只想改变数组中的某一部分值，可以传入开始索引(第二个参数)和不包含结束索引(第三个参数)这两个可选参数，像下面这样：
```js
let numbers = [1, 2, 3, 4]
numbers.fill(1, 2)
console.log(numbers)  // [1, 2, 1, 1]
numbers.fill(0, 1, 3)
console.log(numbers)  // [1, 0, 0, 1]
```

#### copyWithin()方法
`copyWithin()`方法需要传入两个参数：一个是方法开始填充值的索引位置，另一个是开始复制值的索引位置。

```js
let numbers = [1, 2, 3, 4]
numbers.copyWithin(2, 0)
console.log(numbers.toString()) // 1, 2, 1, 2
```
代码分析：根据`copyWithin()`方法的特性，`numbers.copyWithin(2, 0)`可以解读为：使用索引`0-1`处对应的值，在索引`2-3`除开始复制粘贴值，默认情况下，如果不提供`copyWithin()`的第三个参数，则默认一直复制到数组的末尾，`3`和`4`的值会被重写，即结果为`[1, 2, 1, 2]`。

```js
let numbers = [1, 2, 3, 4]
numbers.copyWithin(2, 0, 1)
console.log(numbers.toString()) // 1, 2, 1, 4
```
代码分析：根据`copyWithin()`方法的特性，我们传递了第三个参数，结束复制的位置为`1`，即数组中只有`3`的值被替换为了`1`，其它值不变，即结果为：`[1, 2, 1, 4]`

## Promise和异步编程

### 异步编程的背景知识
`JavaScript`引擎是基于单线程事件循环的概念创建的，同一时间只允许一个代码块在执行，所以需要跟踪即将运行的代码。那些代码被放在一个叫做任务队列中，每当一段代码准备执行时，都会被添加到任务队列中。每当`JavaScript`引擎中的一段代码结束执行，事件循环会执行队列中的下一个任务，它是`JavaScript`引擎中的一段程序，负责监控代码执行并管理任务队列。

#### 事件模型
当用户点击按钮或者按下键盘上的按键时会触发类似`onClick`这样的事件，它会向任务队列添加一个新任务来响应用户的操作，这是`JavaScript`中最基础的异步编程模式，直到事件触发时才执行事件处理程序，且执行上下文与定义时的相同。
```js
let button = document.getElemenetById('myBtn')
button.onClick = function () {
  console.log('click!')
}
```
事件模型适用于处理简单的交互，然而将多个独立的异步调用连接在一起会使程序更加复杂，因为我们必须跟踪每个事件的事件目标。

#### 回调模式
`Node.js`通过普及回调函数来改进异步编程模型，回调函数与事件模型类似，异步代码都会在未来的某个时间点执行，二者的区别是回调模式中被调用的函数是作为参数传入的，如下：
```js
readFile('example.pdf', function(err, contents) {
  if (err) {
    throw err
  }
  console.log(contents)
})
```
我们可以发现回调模式比事件模型更灵活，因此通过回调模式链接多个调用更容易：
```js
readFile('example.pdf', function(err, contents) {
  if (err) {
    throw err
  }
  writeFile('example.pdf', function(err, contents) {
    if (err) {
      throw err
    }
    console.log('file was written!')
  })
})
```
我们可以发现，通过回调嵌套的形式，可以帮助我们解决许多问题，然而随着模块越来越复杂，回调模式需要嵌套的函数也越来越多，就形成了回调地狱，如下：
```js
method1(function(err, result) {
  if (err) {
    throw err
  }
  method2(function(err, result) {
    if (err) {
      throw err
    }
    method3(function(err, result) {
      if (err) {
        throw err
      }
      method4(function(err, result) {
        if (err) {
          throw err
        }
        method5(result)
      })
    })
  })
})
```

### Promise基础
`Promise`相当于异步操作结果的占位符，它不会去订阅一个事件，也不会传递一个回调函数给目标函数，而是让函数返回一个`Promise`。

#### Promise的生命周期
每个`Promise`都会经历一个短暂的生命周期： 先是处于`pending`进行中的状态，此时操作尚未完成，所以它也是未处理状态的，一旦操作执行结束，`Promise`则变为已处理。操作结束后，`Promise`可能会进入到以下两个状态中的其中一个：
* `Fulfilled`：异步操作成功完成。
* `Rejected`：由于程序错误或者一些其他原因，异步操作未能成功完成。

根据以上介绍的状态，`Promise`的内部属性`[[PromiseState]]`被用来表示这三种状态：`pending`、`fulfilled`和`rejected`。这个属性不会暴露在`Promise`对象上，所以不能通过编码的方式检测`Promise`的状态。

#### Promise.then()方法
我们已经知道，`Promise`会在操作完成之后进入`Fulfilled`和`Rejected`其中一个，而`Promise`提供了`Promise.then()`方法。它有两个参数，第一个是`Promise`的状态变为`fulfilled`时要调用的函数，第二个是当`Promise`状态变为`rejected`时调用的函数，其中这两个参数都是可选的。
::: tip
如果一个对象实现了上述`.then()`方法，那么这个对象我们称之为`thenable`对象。
:::
```js
let Promise = readFile('example.pdf')
// 同时提供执行完成和执行被拒的回调
Promise.then(function(content) {
  console.log('complete')
}, function(err) {
  console.log(err.message)
})
// 仅提供完成的回调
Promise.then(function(content) {
  console.log('complete')
})
// 仅提供被拒的回调
Promise.then(null, function(err) {
  console.log(err.message)
})
```
#### Promise.catch()方法
`Promise`还有一个`catch()`方法，相当于只给其传入拒绝处理程序的`then()`方法，所以和以上最后一个例子等价的`catch()`代码如下：
```js
promise.catch(function(err) {
  console.log(err.message)
})
// 等价于
Promise.then(null, function(err) {
  console.log(err.message)
})
```
`then()`方法和`catch()`方法一起使用才能更好的处理异步操作结果。这套体系能够清楚的指明操作结果是成功还是失败，比事件和回调函数更好用。如果使用事件，在遇到错误时不会主动触发；如果使用回调函数，则必须要记得每次都检查错误参数。如果不给`Promise`添加拒绝处理程序，那所有失败就自动被忽略。

#### 创建未完成的Promise
用`Promise`构造函数可以创建新的`Promise`，构造函数只接受一个参数：包含初始化`Promise`代码的执行器函数。执行器函数接受两个参数，分别是`resolve`函数和`reject`函数。执行器成功完成时调用`resolve`函数，失败时则调用`reject`函数。

```js
let fs = require('fs')
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, contents) {
      if (err) {
        reject(err)
        return
      }
      resolve(contents)
    })
  })
}
let promise = readFile('example.pdf')
promise.then((contents) => {
  console.log(contents)
}, (err) => {
  console.log(err.message)
})
```

#### 创建已处理的Promise
`Promise.resolve()`方法只接受一个参数并返回一个完成态的`Promise`，该方法永远不会存在拒绝状态，因而该`Promise`的拒绝处理程序永远不会被调用。
```js
let promise = Promise.resolve(123)
promise.then(res => {
  console.log(res) // 123
})
```
可以使用`Promise.reject()`方法来创建已拒绝`Promise`，它与`Promise.resolve()`方法很像，唯一的区别是创建出来的是拒绝态的`Promise`。
```js
let promise = Promise.reject(123)
promise.catch((err) => {
  console.log(err) // 123
})
```

#### 非Promise的Thenable对象
`Promise.resolve()`方法和`Promise.reject()`方法都可以接受非`Promise`的`thenable`对象作为参数。如果传入一个非`Promise`的`thenable`对象，则这些方法会创建一个新的`Promise`，并在`then()`函数中被调用。<br/>
拥有`then()`方法并且接受`resolve`和`reject`这两个参数的普通对象就是非`Promise`的`Thenable`对象。
```js
let thenable = {
  then (resolve, reject) {
    resolve(123)
  }
}
let promise1 = Promise.resolve(thenable)
promise1.then((res) => {
  console.log(res) // 123
})
```
#### 执行器错误
如果执行器内部抛出一个错误，则`Promise`的拒绝处理程序就会被调用。

```js
let promise = new Promise((resolve, reject) => {
  throw new Error('promise err')
})
promise.catch((err) => {
  console.log(err.message) // promise err
})
```
代码分析：在上面这段代码中，执行器故意抛出了一个错误，每个执行器中都隐含一个`try-catch`块，所以错误会被捕获并传入拒绝处理程序，以上代码等价于：
```js
let promise = new Promise((resolve, reject) => {
  try {
    throw new Error('promise err')
  } catch (ex) {
    reject(ex)
  }
})
promise.catch((err) => {
  console.log(err.message) // promise err
})
```

### 串联Promise
每当我们调用`then()`或者`catch()`方法时实际上创建并返回了另一个`Promise`，只有当第一个`Promise`完成或被拒绝后，第二个才会被解决。这给了我们可以将`Promise`串联起来实现更复杂的异步特性的方法。

```js
let p1 = new Promise((resolve, reject) => {
  resolve(123)
})
p1.then(res => {
  console.log(res)      // 123
}).then(res => {
  console.log('finish') // finish
})
```
如果我们将以上例子拆解开来，那么会是如下的情况：
```js
let p1 = new Promise((resolve, reject) => {
  resolve(123)
})
let p2 = p1.then(res => {
  console.log(res)      // 123
})
p2.then(res => {
  console.log('finish') // finish
})
```

#### 串联Promise中捕获错误
我们已经知道，一个`Promise`的完成处理程序或者拒绝处理程序都有可能发生错误，而在`Promise`链中是可以捕获这些错误的：
```js
let p1 = new Promise((resolve, reject) => {
  resolve(123)
})
p1.then(res => {
  throw new Error('error')
}).catch(error => {
  console.log(error.message)  // error
})
```
不仅可以捕获到`then()`方法中的错误，还可以捕获到`catch()`方法中的错误：
```js
let p1 = new Promise((resolve, reject) => {
  resolve(123)
})

p1.then(res => {
  throw new Error('error then')
}).catch(error => {
  console.log(error.message)  // error then
  throw new Error('error catch')
}).catch(error => {
  console.log(error.message)  // error catch
})
```

#### Promise链返回值
`Promise`链的一个重要特性就是可以给下游的`Promise`传递值。

```js
let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
p1.then(res => {
  console.log(res)  // 1
  return res + 1
}).then(res => {
  console.log(res)  // 2
  return res + 2
}).then(res => {
  console.log(res)  // 4
})
```

#### 在Promise链中返回Promise
我们在上面的例子中已经知道了，可以给下游的`Promise`传递值，但如果我们`return`的是另外一个`Promise`对象又该如何去走呢？实际上，这取决于这个`Promise`是完成还是拒绝，完成则会调用`then()`，拒绝则会调用`catch()`
```js
let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
let p2 = new Promise((resolve, reject) => {
  resolve(2)
})
let p3 = new Promise((resolve, reject) => {
  reject(new Error('error p3'))
})
p1.then(res => {
  console.log(res)            // 1
  return p2
}).then(res => {
  // p2完成，会调用then()
  console.log(res)            // 2
})

p1.then(res => {
  console.log(res)            // 1
  return p3
}).catch((error) => {
  // p3拒绝，会调用catch()
  console.log(error.message)  // error p3
})
```


### 响应对个Promise

#### Promise.all()方法
特点：`Promise.all()`方法只接受一个参数并返回一个`Promise`，且这个参数必须为一个或者多个`Promise`的可迭代对象(例如数组)，只有当这个参数中的所有`Promise`对象全部被解决后才返回这个`Promise`。另外一个地方值得注意的是：`Promise`返回值，是按照参数数组中的`Promise`顺序存储的，所以可以根据`Promise`所在参数中的位置的索引去最终结果的`Promise`数组中进行访问。
```js
let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
let p2 = new Promise((resolve, reject) => {
  resolve(2)
})
let p3 = new Promise((resolve, reject) => {
  resolve(3)
})
let pAll = Promise.all([p1, p2, p3])
pAll.then(res => {
  console.log(res[0]) // 1：对应p1的结果
  console.log(res[1]) // 2：对应p2的结果
  console.log(res[2]) // 3：对应p3的结果
})
```

#### Promise.race()方法
特点：`Promise.race()`方法和`Promise.all()`方法对于参数是一致的，但是在行为和结果上有一点差别：`Promise.race()`方法接受参数数组，只要数组中的任意一个`Promise`被完成，那么`Promise.race()`方法就返回，所以`Promise.race()`方法的结果只有一个，也就是最先被解决的`Promise`的结果。
```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 100)
})
let p2 = new Promise((resolve, reject) => {
  resolve(2)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 100)
})
let pRace = Promise.race([p1, p2, p3])
pRace.then(res => {
  console.log(res) // 2 对应p2的结果
})
```

### 自Promise继承
`Promise`与其他内建类型一样，也是可以当做基类派生其他类的。

```js
class MyPromise extends Promise {
  // 派生Promise，并添加success方法和failure方法
  success(resolve, reject) {
    return this.then(resolve, reject)
  }
  failure(reject) {
    return this.catch(reject)
  }
}
let p1 = new MyPromise((resolve, reject) => {
  resolve(1)
})
let p2 = new MyPromise((resolve, reject) => {
  reject(new Error('mypromise error'))
})
p1.success(res => {
  console.log(res)            // 1
})
p2.failure(error => {
  console.log(error.message)  // mypromise error
})
```

## 代理(Proxy)和反射(Reflect)API

### 数组问题
在`ES6`出现之前，我们不能通过自己定义的对象模仿`JavaScript`数组对象的行为方式：当给数组的特定元素赋值时，会影响到数组的`length`属性，也可以通过`length`属性修改数组元素。
```js
let colors = ['red', 'blue', 'green']
colors[3] = 'black'
console.log(colors.length) // 4
colors.length = 2
console.log(colors.length) // 2
console.log(colors)        // ['red', 'blue']
```

### 代理和反射
代理：代理可以拦截`JavaScript`引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应特定操作的陷阱函数。<br/>
反射：反射`API`以`Reflect`对象的形式出现，对象中方法的默认特性与相同的底层操作一致，而代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的`Reflect`方法。<br/>

| 代理陷阱 | 覆写特性 | 默认特性 |
|------|------------|------------|
| get  | 读取一个属性值 | Reflect.get |
| set  | 写入一个属性   | Reflect.set |
| has  | in操作符      | Reflect.has |
| apply  | 调用一个函数  | Reflect.apply() |
| deleteProperty  | delete操作符  | Reflect.deleteProperty() |
| construct  | 用new调用一个函数  | Reflect.construct() |
| getPrototypeOf  | Object.getPrototypeOf() | Reflect.getPrototypeOf() |
| setPrototypeOf  | Object.setPrototypeOf() | Reflect.setPrototypeOf() |
| isExtensible  | Object.isExtensible()     | Reflect.isExtensible() |
| preventExtensions  | Object.preventExtensions()     | Reflect.preventExtensions() |
| getOwnPropertyDescriptor  | Object.getOwnPropertyDescriptor()     | Reflect.getOwnPropertyDescriptor() |
| defineProperty  | Object.defineProperty()     | Reflect.defineProperty() |
| ownKeys  | Object.keys()、Object.getOwnPropertyNames()和Object.getOwnPropertySymbols()  | Reflect.ownKeys() |


### 创建一个简单的代理
用`Proxy`构造函数创建代理需要传入两个参数：目标`target`和处理程序`handler`。

处理程序`handler`是定义了一个或者多个陷阱的对象，在代理中，除了专门为操作定义的陷阱外，其余操作均使用默认特性，即意味着：不使用任何陷阱的处理程序等价于简单的转发代理。
```js
let target = {}
let proxy = new Proxy(target, {})
proxy.name = 'AAA'
console.log(proxy.name)   // AAA
console.log(target.name)  // AAA
target.name = 'BBB'
console.log(proxy.name)   // BBB
console.log(target.name)  // BBB
```

### 使用set陷阱

`set`陷阱接受4个参数：
* `trapTarget`：用于接受属性(代理的目标)的对象。
* `key`：要写入的属性键(字符串或者`Symbol`类型)。
* `value`：被写入属性的值。
* `receiver`：操作发生的对象。

特点：`Reflect.set()`是`set`陷阱对应的反射方法和默认特性，它和`set`代理陷阱一样也接受相同的四个参数，以方便在陷阱中使用。如果属性已设置陷阱应该返回`true`，否则返回`false`。

案例：如果我们想创建一个属性值是数字的对象，对象中每新增一个属性都要加以验证，如果不是数字必须抛出错误。
```js
let target = {
  name: 'target'
}
let proxy = new Proxy(target, {
  // 已有属性不检测
  set (trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError('属性值必须为数字')
      }
    }
    return Reflect.set(trapTarget, key, value, receiver)
  }
})
proxy.count = 1
console.log(proxy.count)  // 1
console.log(target.count) // 1
proxy.name = 'AAA'
console.log(proxy.name)   // AAA
console.log(target.name)  // AAA
proxy.anotherName = 'BBB' // 属性值非数字，抛出错误
```

### 使用get陷阱

`get`陷阱接受三个参数：
* `trapTarget`：被读取属性的源对象(代理的目标)。
* `key`：要读取的属性键(字符串或者`Symbol`)。
* `receiver`：操作发生的对象。

`JavaScript`有一个我们很常见的特性，当我们试图访问某个对象不存在的属性的时候，不会报错而是返回`undefined`。如果这不是你想要的结果，那么可以通过`get`陷阱来验证对象结构。
```js
let proxy = new Proxy({}, {
  get (trapTarget, key, receiver) {
    if (!(key in trapTarget)) {
      throw new Error(`属性${key}不存在`)
    }
    return Reflect.get(trapTarget, key, receiver)
  }
})
proxy.name = 'proxy'
console.log(proxy.name)  // proxy
console.log(proxy.nme)   // 属性值不存在，抛出错误
```

### 使用has陷阱

`has`陷阱接受两个参数：
* `trapTarget`：读取属性的对象(代理的目标)
* `key`：要检查的属性键(字符串或者`Symbol`)

`in`操作符特点：`in`操作符可以用来检测对象中是否含有某个属性，如果自有属性或原型属性匹配这个名称或者`Symbol`就返回`true`，否则返回`false`。
```js
let target = {
  value: 123
}
console.log('value' in target)    // 自有属性返回true
console.log('toString' in target) // 原型属性，继承自Object，也返回true
```
以上展示了`in`操作符的特性，可以使用`has`陷阱来改变这一特性：
```js
let target = {
  value: 123,
  name: 'AAA'
}
let proxy = new Proxy(target, {
  has (trapTarget, key) {
    // 屏蔽value属性
    if (key === 'value') {
      return false
    } else {
      return Reflect.has(trapTarget, key)
    }
  }
})
console.log('value' in proxy)     // false
console.log('name' in proxy)      // true
console.log('toString' in proxy)  // true
```

### 使用deleteProperty陷阱
`deleteProperty`陷阱接受两个参数：
* `trapTarget`：要删除属性的对象(代理的目标)。
* `key`：要删除的属性键(字符串或者`Symbol`)。

我们都知道，`delete`操作符可以删除对象中的某个属性，删除成功则返回`true`，删除失败则返回`false`。如果有一个对象属性是不可以被删除的，我们可以通过`deleteProperty`陷阱方法来处理：
```js
let target = {
  name: 'AAA',
  value: 123
}
let proxy = new Proxy(target, {
  deleteProperty(trapTarget, key) {
    if (key === 'value') {
      return false
    } else {
      return Reflect.deleteProperty(trapTarget, key)
    }
  }
})
console.log('value' in proxy)   // true
let result1 = delete proxy.value
console.log(result1)            // false
console.log('value' in proxy)   // true
let result2 = delete proxy.name
console.log(result2)            // true
console.log('name' in proxy)    // false
```

### 使用原型代理陷阱

`setPrototypeOf`陷阱接受两个参数：
* `trapTarget`：接受原型设置的对象(代理的目标)。
* `proto`：作为原型使用的对象。
<br/>

`getPrototypeOf`陷阱接受一个参数：
* `trapTarget`：接受获取原型的对象(代理的目标)。

我们在之前已经了解过，`ES6`新增了`Object.setPrototypeOf()`方法，它是`ES5`中`Object.getPrototypeOf()`方法的补充。当我们想要在一个对象被设置原型或者读取原型的时候做一点什么，可以使用`setPrototypeOf()`陷阱和`getPrototypeOf()`陷阱。
```js
let target = {}
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    // 必须返回对象或者null
    return null
  },
  setPrototypeOf(trapTarget, proto) {
    // 只要返回的不是false的值，就代表设置原型成功。
    return false
  }
})
let targetProto = Object.getPrototypeOf(target)
let proxyProto = Object.getPrototypeOf(proxy)
console.log(targetProto === Object.prototype) // true
console.log(proxyProto === Object.prototype)  // false
console.log(proxyProto)                       // null
Object.setPrototypeOf(target, {})             // 设置成功
Object.setPrototypeOf(proxy, {})              // 抛出错误
```
代码分析：以上代码重点强调了`target`和`proxy`的行为差异：
* `Object.getPrototypeOf()`方法给`target`返回的是值，而给`proxy`返回的是`null`，这是因为`proxy`我们使用了`getPrototypeOf()`陷阱。
* `Object.setPrototypeOf()`方法成功为`target`设置了原型，而在`proxy`中，因为我们使用了`setPrototypeOf()`陷阱，手动返回了`false`，所以设置原型不成功。

根据以上的分析，我们可以得到`Object.getPrototypeOf()`和`Object.setPrototypeOf()`的默认行为：
```js
let target = {}
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    // 必须返回对象或者null
    return Reflect.getPrototypeOf(trapTarget)
  },
  setPrototypeOf(trapTarget, proto) {
    // 只要返回的不是false的值，就代表设置原型成功。
    return Reflect.setPrototypeOf(trapTarget, proto)
  }
})
let targetProto = Object.getPrototypeOf(target)
let proxyProto = Object.getPrototypeOf(proxy)
console.log(targetProto === Object.prototype) // true
console.log(proxyProto === Object.prototype)  // true
Object.setPrototypeOf(target, {})             // 设置成功
Object.setPrototypeOf(proxy, {})              // 设置成功
```

#### 两组方法的区别
`Reflect.getPrototypeOf()`方法和`Reflect.setPrototypeOf()`方法看起来和`Object.getPrototypeOf()`和`Object.setPrototypeOf()`看起来执行相似的操作，但它们还是有一些不同之处的：
1. `Reflect.getPrototypeOf()`方法和`Reflect.setPrototypeOf()`方法底层操作，其赋予开发者可以访问之前只在内部操作的`[[GetPrototypeOf]]`和`[[SetPrototypeOf]]`权限。而 `Object.getPrototypeOf()`和`Object.setPrototypeOf()`方法是高级操作，创建伊始就是方便开发者使用的。
2. 如果传入的参数不是对象，则`Reflect.getPrototypeOf()`会抛出错误，而`Object.getPrototypeOf()`方法则会在操作前先将参数强制转换为一个对象。
```js
let result = Object.getPrototypeOf(1)
console.log(result === Number.prototype)  // true
Reflect.getPrototypeOf(1)                 // 抛出错误
```
3. `Object.setPrototypeOf()`方法会通过一个布尔值来表示操作是否成功，成功时返回`true`，失败时返回`false`。而`Reflect.setPrototypeOf()`设置失败时会抛出错误。


### 使用对象可扩展陷阱
在`ES6`之前对象已经有两个方法来修正对象的可扩展性：`Object.isExtensible()`和`Object.preventExtensions()`，在`ES6`中可以通过代理中的`isExtensible()`和`preventExtensions()`陷阱拦截这两个方法并调用底层对象。

* `isExtensible()`陷阱返回一个布尔值，表示对象是否可扩展，接受唯一参数`trapTarget`
* `preventExtensions()`陷阱返回一个布尔值，表示操作是否成功，接受唯一参数`trapTarget`

以下示例是`isExtensible()`和`preventExtensions()`的默认行为：
```js
let target = {}
let proxy = new Proxy(target, {
  isExtensible (trapTarget) {
    return Reflect.isExtensible(trapTarget)
  },
  preventExtensions (trapTarget) {
    return Reflect.preventExtensions(trapTarget)
  }
})
console.log(Object.isExtensible(target))  // true
console.log(Object.isExtensible(proxy))   // true
Object.preventExtensions(proxy)
console.log(Object.isExtensible(target))  // false
console.log(Object.isExtensible(proxy))   // false
```
现在如果有这样一种情况，我们想让`Object.preventExtensions()`对于`proxy`失效，那么可以把以上示例修改成如下的形式：
```js
let target = {}
let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget)
  },
  preventExtensions(trapTarget) {
    return false
  }
})
console.log(Object.isExtensible(target))  // true
console.log(Object.isExtensible(proxy))   // true
Object.preventExtensions(proxy)
console.log(Object.isExtensible(target))  // true
console.log(Object.isExtensible(proxy))   // true
```

两组方法的对比：
* `Object.preventExtensions()`无论传入的是否为一个对象，它总是返回该参数，而`Reflect.isExtensible()`方法如果传入一个非对象，则会抛出一个错误。
* `Object.isExtensible()`当传入一个非对象值时，返回`false`，而`Reflect.isExtensible()`则会抛出一个错误。

### 使用属性描述符陷阱

`Object.defineProperty`陷阱接受三个参数：
* `trapTarget`：要定义属性的对象(代理的目标)
* `key`：属性的键。
* `descriptor`：属性的描述符对象。
<br/>

`Object.getOwnPropertyDescriptor`陷阱接受两个参数：
* `trapTarget`：要获取属性的对象(代理的目标)。
* `key`：属性的键。

在代理中可以使用`defineProperty`和`getOwnPropertyDescriptor`陷阱函数分别拦截`Object.defineProperty()`和`Object.getOwnPropertyDescriptor()`方法的调用。以下示例展示了`defineProperty`和`getOwnPropertyDescriptor`陷阱的默认行为。
```js
let proxy = new Proxy({}, {
  defineProperty(trapTarget, key, descriptor) {
    return Reflect.defineProperty(trapTarget, key, descriptor)
  },
  getOwnPropertyDescriptor(trapTarget, key) {
    return Reflect.getOwnPropertyDescriptor(trapTarget, key)
  }
})
Object.defineProperty(proxy, 'name', {
  value: 'AAA'
})
console.log(proxy.name)         // AAA
const descriptor = Object.getOwnPropertyDescriptor(proxy, 'name')
console.log(descriptor.value)   // AAA
```

#### Object.defineProperty()添加限制
`defineProperty`陷阱返回布尔值来表示操作是否成功，返回`true`时，表示`Object.defineProperty()`执行成功；返回`false`时，`Object.defineProperty()`抛出错误。<br/>
假设我们现在有这样一个需求：一个对象的属性键不能设置为`Symbol`属性的，我们可以使用`defineProperty`陷阱来实现：
```js
let proxy = new Proxy({}, {
  defineProperty(trapTarget, key, descriptor) {
    if (typeof key === 'symbol') {
      return false
    }
    return Reflect.defineProperty(trapTarget, key, descriptor)
  }
})
Object.defineProperty(proxy, 'name', {
  value: 'AAA'
})
console.log(proxy.name) // AAA
const nameSymbol = Symbol('name')
// 抛出错误
Object.defineProperty(proxy, nameSymbol, {
  value: 'BBB'
})
```

#### Object.getOwnPropertyDescriptor()添加限制
无论将什么对象作为第三个参数传递给`Object.defineProperty()`方法，都只有属性`enumerable`、`configurable`、`value`、`writable`、`get`和`set`将出现在传递给`defineProperty`陷阱的描述符对象中，也意味着`Object.getOwnPropertyDescriptor()`方法总是返回以上几种属性。
```js
let proxy = new Proxy({}, {
  defineProperty(trapTarget, key, descriptor) {
    console.log(descriptor.value) // AAA
    console.log(descriptor.name)  // undeinfed
    return Reflect.defineProperty(trapTarget, key, descriptor)
  },
  getOwnPropertyDescriptor(trapTarget, key) {
    return Reflect.getOwnPropertyDescriptor(trapTarget, key)
  }
})
Object.defineProperty(proxy, 'name', {
  value: 'AAA',
  name: 'custom'
})
const descriptor = Object.getOwnPropertyDescriptor(proxy, 'name')
console.log(descriptor.value) // AAA
console.log(descriptor.name)  // undeinfed
```

**注意**：`getOwnPropertyDescriptor()`陷阱的返回值必须是一个`null`、`undefined`或者一个对象。如果返回的是一个对象，则对象的属性只能是`enumerable`、`configurable`、`value`、`writable`、`get`和`set`，使用不被允许的属性会抛出一个错误。

```js
let proxy = new Proxy({}, {
  getOwnPropertyDescriptor(trapTarget, key) {
    return {
      name: 'proxy'
    }
  }
})
// 抛出错误
let descriptor = Object.getOwnPropertyDescriptor(proxy, 'name')
```

两组方法对比：
* `Object.defineProperty()`方法和`Reflect.defineProperty()`方法只有返回值不同，前者只返回第一个参数；而后者返回值与操作有关，成功则返回`true`，失败则返回`false`。
```js
let target = {}
let result1 = Object.defineProperty(target, 'name', {
  value: 'AAA'
})
let result2 = Reflect.defineProperty(target, 'name', {
  value: 'AAA'
})
console.log(result1 === target) // true
console.log(result2)            // true
```
* `Object.getOwnPropertyDescriptor()`方法传入一个原始值作为参数，内部会把这个值强制转换为一个对象；而`Reflect.getOwnPropertyDescriptor()`方法传入一个原始值，则会抛出错误。
```js
let descriptor1 = Object.getOwnPropertyDescriptor(2, 'name')
console.log(descriptor1)  // undefined
// 抛出错误
let descriptor2 = Reflect.getOwnPropertyDescriptor(2, 'name')
```


### 使用ownKeys陷阱
`ownKeys`代理陷阱可以拦截内部方法`[[OwnPropertyKeys]]`，我们通过返回一个数组的值来覆写其行为。这个数组被用于`Object.keys()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`和`Object.assign()`四个方法，其中`Object.assign()`方法用数组来确定需要复制的属性。`ownKeys`陷阱唯一接受的参数是操作的目标，返回值是一个数组或者类数组对象，否则就会抛出错误。


几种方法的区别：
* `Reflect.ownKeys()`：返回的数组中包含所有对象的自有属性的键名，包括字符串类型和`Symbol`类型。
* `Object.getOwnPropertyNames()`和`Object.keys()`：返回的数组中排除了`Symbol`类型。
* `Object.getOwnPropertySymbols()`：返回的数组中排出了字符串类型。
* `Object.assign()`：字符串和`Symbol`类型都支持。

假设我们在使用以上几种方法的时候，不想要指定规则的属性键，那么可以使用`Reflect.ownKeys()`陷阱来实现：
```js
let proxy = new Proxy({}, {
  ownKeys (trapTarget) {
    return Reflect.ownKeys(trapTarget).filter(key => {
      // 排除属性开头带有_的键
      return typeof key !== 'string' || key[0] !== '_'
    })
  }
})
let nameSymbol = Symbol('name')
proxy.name = 'AAA'
proxy._name = '_AAA'
proxy[nameSymbol] = 'Symbol'
let names = Object.getOwnPropertyNames(proxy)
let keys = Object.keys(proxy)
let symbols = Object.getOwnPropertySymbols(proxy)
console.log(names)    // ['name']
console.log(keys)     // ['name']
console.log(symbols)  // ['Symbol(name)']
```


### 使用apply和construct陷阱

`apply`陷阱接受以下几个参数：
* `trapTarget`：被执行的函数(代理的目标)。
* `thisArg`：函数被调用时内部`this`的值。
* `argumentsList`：传递给函数的参数数组。

`construct`陷阱函数接受以下几个参数：
* `trapTarget`：被执行的函数(代理的目标)。
* `argumentsList`：传递给函数的参数数组。

`apply`和`construct`陷阱函数是所有代理陷阱中，代理目标是一个函数的仅有的两个陷阱函数。我们在之前已经了解过，函数有两个内部方法`[[Call]]`和`[[Construct]]`，当使用`new`调用时，执行`[[Construct]]`方法，不用`new`调用时，执行`[[Call]]`方法。
<br/>
以下实例为`apply`陷阱和`construct`陷阱的默认行为：
```js
let target = function () {
  return 123
}
let proxy = new Proxy(target, {
  apply (trapTarget, thisArg, argumentsList) {
    return Reflect.apply(trapTarget, thisArg, argumentsList)
  },
  construct (trapTarget, argumentsList) {
    return Reflect.construct(trapTarget, argumentsList)
  }
})
console.log(typeof proxy)               // function
console.log(proxy())                    // 123
let instance = new proxy()
console.log(instance instanceof proxy)  // true
console.log(instance instanceof target) // true
```

#### 验证函数参数
假设我们有这样一个需求：一个函数，其参数只能为数字类型。可以使用`apply`陷阱或者`construct`陷阱来实现：
```js
function sum(...values) {
  return values.reduce((prev, current) => prev + current, 0) 
}
let sumProxy = new Proxy(sum, {
  apply(trapTarget, thisArg, argumentsList) {
    argumentsList.forEach(item => {
      if (typeof item !== 'number') {
        throw new TypeError('所有参数必须是数字类型')
      }
    })
    return Reflect.apply(trapTarget, thisArg, argumentsList)
  },
  construct (trapTarget, argumentsList) {
    throw new TypeError('该函数不能通过new来调用')
  }
})
console.log(sumProxy(1, 2, 3, 4, 5))    // 15
let proxy = new sumProxy(1, 2, 3, 4, 5) // 抛出错误
```
#### 不用new调用构造函数
在前面的章节中，我们已经了解到`new.target`元属性，它是用`new`调用函数时对该函数的引用，可以使用`new.target`的值来确定函数是否是通过`new`来调用：
```js
function Numbers(...values) {
  if (typeof new.target === 'undefined') {
    throw new TypeError('该函数必须通过new来调用。')
  }
  this.values = values
}
let instance = new Numbers(1, 2, 3, 4, 5)
console.log(instance.values) // [1, 2, 3, 4, 5]
Numbers(1, 2, 3, 4)          // 报错
```
假设我们有以上的一个函数，其必须通过`new`来调用，但我们依然想让其能够使用非`new`调用的形式来使用，这个时候我们可以使用`apply`陷阱来实现：
```js
function Numbers(...values) {
  if (typeof new.target === 'undefined') {
    throw new TypeError('该函数必须通过new来调用。')
  }
  this.values = values
}
let NumbersProxy = new Proxy(Numbers, {
  construct (trapTarget, argumentsList) {
    return Reflect.construct(trapTarget, argumentsList)
  },
  apply (trapTarget, thisArg, argumentsList) {
    return Reflect.construct(trapTarget, argumentsList)
  }
})
let instance1 = new NumbersProxy(1, 2, 3, 4, 5)
let instance2 = NumbersProxy(1, 2, 3, 4, 5)
console.log(instance1.values) // [1, 2, 3, 4, 5]
console.log(instance2.values) // [1, 2, 3, 4, 5]
```

#### 覆写抽象基类构造函数
`construct`陷阱还接受第三个可选参数函数，其作用是被用作构造函数内部的`new.target`的值。

假设我们现在有这样一个场景：有一个抽象基类，其必须被继承，但我们依然想不这么做，这个时候可以使用`construct`陷阱还是来实现：
```js
class AbstractNumbers {
  constructor (...values) {
    if (new.target === AbstractNumbers) {
      throw new TypeError('此函数必须被继承')
    }
    this.values = values
  }
}
let AbstractNumbersProxy = new Proxy(AbstractNumbers, {
  construct (trapTarget, argumentsList) {
    return Reflect.construct(trapTarget, argumentsList, function () {})
  }
})
let instance = new AbstractNumbersProxy(1, 2, 3, 4, 5)
console.log(instance.values)  // 1, 2, 3, 4, 5
```

#### 可调用的类构造函数
我们都知道必须使用`new`来调用类的构造函数，因为类构造函数的内部方法`[[Call]]`被指定来抛出一个错误，但我们依然可以使用`apply`代理陷阱实现不用`new`就能调用构造函数：
```js
class Person {
  constructor(name) {
    this.name = name
  }
}
let PersonProxy = new Proxy(Person, {
  apply (trapTarget, thisArg, argumentsList) {
    return new trapTarget(...argumentsList)
  }
})
let person = PersonProxy('AAA')
console.log(person.name)                    // AAA
console.log(person instanceof PersonProxy)  // true
console.log(person instanceof Person)       // true
```

### 可撤销代理
在我们之前的所有代理例子中，全部都是不可取消的代理。但有时候我们希望能够对代理进行控制，让他能在需要的时候撤销代理，这个时候可以使用`Proxy.revocable()`函数来创建可撤销的代理，该方法采用与`Proxy`构造函数相同的参数，其返回值是具有以下属性的对象：
* `proxy`：可撤销的代理对象。
* `revoke`：撤销代理要调用的函数。
当调用`revoke()`函数的时候，不能通过`proxy`执行进一步的操作，任何与代理对象交互的尝试都会触发代理陷阱抛出错误。
```js
let target = {
  name: 'AAA'
}
let { proxy, revoke } = Proxy.revocable(target, {})
console.log(proxy.name) // AAA
revoke()
console.log(proxy.name) // 抛出错误
```

### 解决数组问题
我们在之前已经了解过，在`ES6`之前我们无法完全模拟数组的行为，就像下面的示例一样：
```js
let colors = ['red', 'green', 'blue']
console.log(colors.length)  // 3
colors[3] = 'black'
console.log(colors.length)  // 4
console.log(colors[3])      // black
colors.length = 2
console.log(colors.length)  // 2
console.log(colors)         // ['red', 'green']
```
无法模拟的两个重要行为：
* 添加新元素时增加`length`的值
* 减少`length`的值可以删除元素

#### 检测数组索引
判断一个属性是否为数组索引，需要满足规范条件：当且仅当`ToString(ToUnit32(P))`等于`P`，并且`ToUnit32(P)`不等于`2³²-1`。

```js
function toUnit32(value) {
  return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32)
}
function isArrayIndex(key) {
  let numbericKey = toUnit32(key)
  return String(numbericKey) === key && numbericKey < (Math.pow(2, 32) - 1)
}
```
代码分析：`toUnit32()`函数通过规范中描述的算法将给定的值转换为无符号32位整数；`isArrayIndex()`函数先将键转换为`uint32`结构，然后进行一次比较以确定这个键是否是数组索引。
 
#### 添加新元素时增加length的值
```js
function toUnit32(value) {
  return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32)
}
function isArrayIndex(key) {
  let numbericKey = toUnit32(key)
  return String(numbericKey) === key && numbericKey < (Math.pow(2, 32) - 1)
}
function createMyArray (length = 0) {
  return new Proxy({ length }, {
    set (trapTarget, key, value) {
      let currentLength = Reflect.get(trapTarget, 'length')
      if (isArrayIndex(key)) {
        let numbericKey = Number(key)
        if (numbericKey >= currentLength) {
          Reflect.set(trapTarget, 'length', numbericKey + 1)
        }
      }
      return Reflect.set(trapTarget, key, value)
    }
  })
}
let colors = createMyArray(3)
console.log(colors.length)  // 3
colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
console.log(colors.length)  // 3
colors[3] = 'black'
console.log(colors.length)  // 4
console.log(colors[3])      // black 
```

#### 减少length的值可以删除元素
```js
function toUnit32(value) {
  return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32)
}
function isArrayIndex(key) {
  let numbericKey = toUnit32(key)
  return String(numbericKey) === key && numbericKey < (Math.pow(2, 32) - 1)
}
function createMyArray (length = 0) {
  return new Proxy({ length }, {
    set (trapTarget, key, value) {
      let currentLength = Reflect.get(trapTarget, 'length')
      if (isArrayIndex(key)) {
        let numbericKey = Number(key)
        if (numbericKey >= currentLength) {
          Reflect.set(trapTarget, 'length', numbericKey + 1)
        }
      } else if(key === 'length') {
        if (value < currentLength) {
          for(let index = currentLength - 1; index >= value; index--) {
            Reflect.deleteProperty(trapTarget, index)
          }
        }
      }
      return Reflect.set(trapTarget, key, value)
    }
  })
}
let colors = createMyArray(3)
console.log(colors.length)  // 3
colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'black'
console.log(colors.length)  // 4
colors.length = 2
console.log(colors.length)  // 2
console.log(colors[3])      // undefined
console.log(colors[2])      // undefined
console.log(colors[1])      // green
console.log(colors[0])      // red
```

#### 实现MyArray类
如果我们想要创建使用代理的类，最简单的方法是像往常一样定义类，然后在构造函数中返回一个代理，像下面这样：
```js
class Thing {
  constructor () {
    return new Proxy(this, {})
  }
}
let myThing = new Thing()
console.log(myThing instanceof Thing) // true
```
在理解了以上概念后，我们可以使用代理创建一个自定义的数组类：
```js
function toUnit32(value) {
  return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32)
}
function isArrayIndex(key) {
  let numbericKey = toUnit32(key)
  return String(numbericKey) === key && numbericKey < (Math.pow(2, 32) - 1)
}
class MyArray {
  constructor(length = 0) {
    this.length = length
    return new Proxy(this, {
      set (trapTarget, key, value) {
        let currentLength = Reflect.get(trapTarget, 'length')
        if (isArrayIndex(key)) {
          let numbericKey = Number(key)
          if (numbericKey >= currentLength) {
            Reflect.set(trapTarget, 'length', numbericKey + 1)
          }
        } else if(key === 'length') {
          if (value < currentLength) {
            for(let index = currentLength - 1; index >= value; index--) {
              Reflect.deleteProperty(trapTarget, index)
            }
          }
        }
        return Reflect.set(trapTarget, key, value)
      }
    })
  }
}
let colors = new MyArray(3)
console.log(colors instanceof MyArray)  // true
console.log(colors.length)              // 3
colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'black'
console.log(colors.length)              // 4
colors.length = 2
console.log(colors.length)              // 2
console.log(colors[3])                  // undefined
console.log(colors[2])                  // undefined
console.log(colors[1])                  // green
console.log(colors[0])                  // red
```
代码总结：虽然从类构造函数返回代理很容易，但这也意味着每创建一个实例都要创建一个新代理。

### 将代理作为原型
针对上节所提到的：可以从类构造函数返回代理，但每创建一个实例都要创建一个新代理，这个问题可以使用将代理用作原型，让所有实例共享一个代理。
```js
let target = {}
let newTarget = Object.create(new Proxy(target, {
  defineProperty(trapTarget, name, descriptor) {
    return false
  }
}))
Object.defineProperty(newTarget, 'name', {
  value: 'newTarget'
})
console.log(newTarget.name)                   // newTarget
console.log(newTarget.hasOwnProperty('name')) // true
```
代码分析：调用`Object.defineProperty()`方法并传入`newTarget`来创建一个名为`name`的自有属性，在对象上定义属性的操作不需要操作对象的原型，所以代理中的`defineProperty`陷阱永远不会被调用。正如你所看到的那样，这种方式限制了代理作为原型的能力，但依然有几个陷阱是十分有用的。

#### 在原型上使用get陷阱
调用内部方法`[[Get]]`读取属性的操作现查找自有属性，如果未找到指定名称的自有属性，则继续到原型中查找，直到没有更多可以查找的原型过程结束，如果设置一个`get`陷阱，就能捕获到在原型上查找属性的陷阱。
```js
let target = {}
let newTarget = Object.create(new Proxy(target, {
  get (trapTarget, key, receiver) {
    throw new ReferenceError(`${key}不存在。`)
  }
}))
newTarget.name = 'AAA'
console.log(newTarget.name) // AAA
console.log(newTarget.nme)  // 抛出错误
```
代码分析：我们使用一个代理作为原型创建了一个新对象，当调用它时，如果其上不存在给定的键，那么`get`陷阱会抛出错误；而`name`属性存在，所以读取它的时候不会调用原型上的`get`陷阱。

#### 在原型上使用set陷阱
内部方法`[[Set]]`同样会检查目标对象中是否含有某个自有属性，如果不存在则继续在原型上查找。但现在最棘手的问题是：无论原型上是否存在同名属性，给该属性赋值时都将默认在实例中创建该属性：
```js
let target = {}
let thing = Object.create(new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    return Reflect.set(trapTarget, key, value, receiver)
  }
}))
console.log(thing.hasOwnProperty('name')) // false
thing.name = 'AAA'                        // 触发set陷阱
console.log(thing.name)                   // AAA
console.log(thing.hasOwnProperty('name')) // true
thing.name = 'BBB'                        // 不触发set陷阱
console.log(thing.name)                   // BBB
```
#### 在原型上使用has陷阱
只有在搜索原型链上的代理对象时才会调用`has`陷阱，而当你用代理作为原型时，只有当指定名称没有对应的自有属性时才会调用`has`陷阱。
```js
let target = {}
let thing = Object.create(new Proxy(target, {
  has (trapTarget, key) {
    return Reflect.has(trapTarget, key)
  }
}))
console.log('name' in thing)  // false，触发了原型上的has陷阱
thing.name = 'AAA'
console.log('name' in thing)  // true，没有触发原型上的has陷阱
```

#### 将代理用作类的原型
由于类的`prototype`属性是不可写的，因此不能直接修改类来使用代理作为类的原型，但是可以通过继承的方法来让类误认为自己可以将代理用作自己的原型。
```js
function NoSuchProperty () {

}
NoSuchProperty.prototype = new Proxy({}, {
  get(trapTarget, key, receiver) {
    throw new ReferenceError(`${key}不存在`)
  }
})
let thing = new NoSuchProperty()
console.log(thing.name) // 抛出错误
```
以上代码是一个使用`ES5`风格的类型定义，那么接下来，我们需要使用`ES6`的`extends`语法，来让类实现继承：
```js
function NoSuchProperty () {

}
NoSuchProperty.prototype = new Proxy({}, {
  get(trapTarget, key, receiver) {
    throw new ReferenceError(`${key}不存在`)
  }
})
class Square extends NoSuchProperty {
  constructor (width, height) {
    super()
    this.width = width
    this.height = height
  }
}
let shape = new Square(2, 5)
let area1 = shape.width * shape.height
console.log(area1)                      // 10
let area2 = shape.length * shape.height // 抛出错误
```
代码分析：`Square`类继承`NoSuchProperty`，所以它的原型链中包含代理，之后创建的`shape`对象是`Square`的新实例，它有两个自有属性：`width`和`height`。当我们访问`shape`实例上不存在的`length`属性时，会在原型链中查找，进而触发`get`陷阱，抛出一个错误。

## 用模块封装代码

### 什么是模块
**模块**是自动运行在严格模式下并且没有办法退出运行的`JavaScript`代码，与共享一切架构相反，它有如下几个特点：
* 在模块顶部创建的变量不会自动被添加到全局共享作用域，而是仅在模块的顶级作用域中存在。
* 模块必须导出一些外部代码可以访问的元素，例如：变量或者函数。
* 模块也可以从其他模块导入绑定。
* 在模块的顶部，`this`的值是`undefined`。

### 导出的基本语法
可以用`export`关键字将一部分已发布的代码暴露给其他模块。

```js
// example.js
export let color = 'red'
export const PI = 3.1415
export function sum (num1, num2) {
  return num1 + num2
}
export class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
}
// 模块私有的，外部无法访问
function privateFunc (num1, num2) {
  return num1 + num2
}
```

### 导入的基本语法
从模块中导入的功能可以通过`import`关键字在另一个模块中访问，`import`语句的两个部分分别是：要导入的标识符和标识符从哪个模块导入。<br/>
以下示例是导入语句的基本形式：
```js
import { identifier1, indentifier2 } from './example.js'
```
注意：当从模块中导入一个绑定时，它就好像使用了`const`定义的一样。结果是我们不能定义另一个同名的变量，也无法在`import`语句前使用标识符或改变绑定的值。

#### 导入单个绑定和导入多个绑定
```js
// 只导入一个
import { sum } from './math.js'
sum(1, 2)

// 导入多个
import { sum, minus } from './math.js'
sum(1, 2)
minus(1, 2)
```
#### 导入整个模块
特殊情况下，可以导入整个模块作为一个单一的对象，然后所有的导出都可以作为对象的属性使用：
```js
import * as Math from './math.js'
Math.sum(1, 2)
Math.minus(1, 2)
```

注意：
* 不管在`import`语句中把一个模块写多少次，该模块始终只执行一次，因为导入模块执行后，实例化过的模块被保存在内存中，只要另一个`import`语句引用它就可以重复使用。
```js
// math.js中的代码只执行了一次
import { sum } from './math.js'
import { minus } from './math.js'
```
* `export`和`import`语句必须在其他语句和函数之外使用，在其中使用会报错。
```js
if (flag) {
  // 报错
  export flag 
}
function tryImport() {
  // 报错
  import * as Math from './math.js'
}
```

### 导出和导入时重命名
正如上面我们所看到的那样，导出的绑定就像`const`定义的变量一样，我们无法更改，如果多个模块之间存在同名绑定，这种情况下我们可以使用`as`来给绑定取一个别名，进而可以避免重名。
```js
// math.js 导出时别名
function sum(num1, num2) {
  return num1 + num2
}
export {
  sum as SUM
}

// math.js 导入时别名
import { SUM as sum  } from './math.js'
console.log(typeof SUM) // undefined
sum(1, 2)
```

### 模块的默认值
模块的默认值指的是通过`default`关键字指定的单个变量、函数或者类，只能为每个模块设置一个默认的导出值，导出时多次使用`default`关键字会报错。

```js
// example.js 导出默认值
export default function (num1, num2) {
  return num1 + num2
}
// example.js 导入默认值
import sum from './example.js'
sum(1, 2)
```
注意：导入默认值和导入非默认值是可以混用的，例如：
导出`example.js`：
```js
export const colors = ['red', 'green', 'blue']
export default function (num1, num2) {
  return num1 + num2
}
```
导入`example.js`:
```js
import sum, { colors } from './example.js'
```

### 重新导出一个绑定
有时候我们可能会重新导出我们已经导入的内容，就像下面这样：
```js
import { sum } from './example.js'
export { sum }
// 可以简写成
export { sum } from './example.js'
// 简写+别名
export { sum as SUM } from './example.js'
// 全部重新导出
export * from './example.js'
```

### 无绑定导入
无绑定导入最有可能被应用于创建`polyfill`和`shim`。<br/>

尽管我们已经知道模块中的顶层管理、函数和类不会自动出现在全局作用域中，但这并不意味这模块无法访问全局作用域。<br/>
例如：如果我们想向所有数组添加`pushAll()`方法，可以像下面这样：
无绑定导出`array.js`：
```js
Array.prototype.pushAll = function (items) {
  if (!Array.isArray(items)) {
    throw new TypeError('参数必须是一个数组。')
  }
  return this.push(...items)
}
```
无绑定导入`array.js`：
```js
import './array.js'
let colors = ['red', 'green', 'blue']
let items = []
items.pushAll(colors)
```

### 加载模块
我们都知道，在`Web`浏览器中使用一个脚本文件，可以通过如下三种方式来实现：
* 在`script`元素中通过`src`属性指定一个加载代码的地址来加载`js`脚本。
* 将`js`代码内嵌到没有`src`属性的`script`元素中。
* 通过`Web Worker`或者`Service Worker`的方式加载并执行`js`代码。

为了完全支持模块的功能，`JavaScript`扩展了`script`元素的功能，使其能够通过设置`type/module`的形式来加载模块：
```js
// 外联一个模块文件
<script type="module" src="./math.js"></script>
// 内联模块代码
<script type="module">
  import { sum } from './example.js'
  sum(1, 2)
</script>
```

#### Web浏览器中模块加载顺序
模块和脚本不同，它是独一无二的，可以通过`import`关键字来指明其所依赖的其他文件，并且这些文件必须加载进该模块才能正确执行，因此为了支持该功能，`<script type="module"></script>`执行时自动应用`defer`属性。
```js
// 最先执行
<script type="module" src="./math.js"></script>
// 其次执行
<script type="module">
  import { sum } from './math.js'
</script>
// 最后执行
<script type="module" src="./math1.js"></script>
```

#### Web浏览器中的异步模块加载
`async`属性也可以应用在模块上，在`<script type="module"></script>`元素上应用`async`属性会让模块以类似于脚本的方式执行，唯一的区别在于：在模块执行前，模块中的所有导入资源必须全部下载下来。
```js
// 无法保证哪个模块先执行
<script type="module" src="./module1.js" async></script>
<script type="module" src="./module2.js" async></script>
```

#### 将模块作为Worker加载
为了支持加载模块，`HTML`标准的开发者向`Worker`这些构造函数添加了第二个参数，第二个参数是一个对象，其`type`属性的默认值是`script`，可以将`type`设置为`module`来加载模块文件。
```js
let worker = new Worker('math.js', {
  type: 'module'
})
```

#### 浏览器模块说明符解析
我们可以发现，我们之前的所有示例中，模块说明符使用的都是相对路径，浏览器要求模块说明符具有以下几种格式之一：
* 以`/`开头的解析为根目录开始。
* 以`./`开头的解析为当前目录开始。
* 以`../`开头的解析为父目录开始。
* `URL`格式。

```js
import { first } from '/example1.js'
import { second } from './example2.js'
import { three } from '../example3.js'
import { four } from 'https://www.baidu.com/example4.js'
```

下面这些看起来正常的模块说明符在浏览器中实际上是无效的：
```js
import { first } from 'example1.js'
import { second } from 'example/example2.js'
```