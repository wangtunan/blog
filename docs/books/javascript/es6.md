---
sidebar: auto
---

# 深入理解ES6
在`ECMAScript6`标准定稿之前，已经开始出现了一些实验性的`转译器(Transpiler)`，例如谷歌的`Traceur`，可以将代码从`ECMAScript6`转换成`ECMAScript5`。但它们大多功能非常有限，或难以插入现有的`JavaScript`构建管道。<br/>
但是，随后出现了的新型转译器`6to5`改变了这一切。它易于安装，可以很好的集成现有的工具中，生成的代码可读，于是就像野火一样逐步蔓延开来，`6to5`也就是现在鼎鼎大名的`Babel`。

## 前言

### ECMAScript6的演变之路
::: tip
JavaScript核心的语言特性是在标准`ECMA-262`中被定义，该标准中定义的语言被称作`ECMAScript`，它是`JavaScript`的子集。
:::

* `停滞不前`：逐渐兴起的`Ajax`开创了动态`Web`引用的新时代，而自1999年第三版`ECMA-262`发布以来，`JavaScript`却没有丝毫的改变。
* `转折点`：2007年，`TC-39`委员会将大量规范草案整合在了`ECMAScript4`中，其中新增的语言特性涉足甚广，包括：模块、类、类继承、私有对象成员等众多其它的特性。
* `分歧`：然而`TC-39`组织内部对`ECMAScript4`草案产生了巨大的分歧，部分成员认为不应该一次性在第四版标准中加入过多的新功能，而来自雅虎、谷歌和微软的技术负责人则共同提交了一份`ECMAScript3.1`草案作为下一代`ECMAScript`的可选方案，其中此方案只是对现有标准进行小幅度的增量修改。行为更专注于优化属性特性、支持原生`JSON`以及为已有对象增加新的方法。
* `从未面世的ECMAScript4`：2008年，`JavaScript`创始人`Brendan Eich`宣布`TC-39`委员一方面会将合理推进`ECMAScript3.1`的标准化工作，另一方面会暂时将`ECMAScript4`标准中提出的大部分针对语法及特性的改动搁置。
* `ECMAScript5`：经过标准化的`ECMAScript3.1`最终作为`ECMA-262`第五版与2009年正式发布，同时被命名为`ECMAScript5`。
* `ECMAScript6`：在`ECMAScript5`发布后，`TC-39`委员会于2013年冻结了`ECMAScript6`的草案，不再添加新的功能。2013年`ECMAScript6`草案发布，在进过12个月各方讨论和反馈后。2015年`ECMAScript6`正式发布，并命名为`ECMAScript 2015`。

## 块级作用域绑定
::: tip 引入的目的
一直以来`JavaScript`中的变量生声明机制一直令我们感到困惑，大多数类C语言在声明变量的同时也会创建变量，而在以前的`JavaScript`中，何时创建变量要看如何声明的变量，`ES6`引入块级作用域可以让我们更好的控制作用域。
:::

### var声明和变量提升机制

问：提升机制是什么？<br/>
答：在函数作用域或全局作用域中通过关键字`var`声明的变量，无论实际上是在哪里声明的，都会被当成在当前作用域顶部声明的变量，这就是我们常说的提升机制。<br/>
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

经过以上示例，我们可以发现：变量`value`的声明被提升至函数作用域的顶部，而初始化操作依旧留在原处执行，正因为`value`变量只是声明了而没有赋值，因此以上代码才会打印出`undefined`。


### 块级声明
::: tip
块级声明用于声明在指定的作用于之外无妨访问的变量，块级作用域存在于：函数内部和块中。
:::

`let`声明：
* `let`声明和`var`声明的用法基本相同。
* `let`声明的变量不会被提升。
* `let`不能在同一个作用域中重复声明已经存在的变量，会报错。
* `let`声明的变量作用域范围仅存在于当前的块中，程序进入快开始时被创建，程序退出块时被销毁。

根据`let`声明的规则，改动以上代码后像下面这样：
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

`const`声明：`const`声明和`let`声明大多数情况是相同的，唯一的本质区别在于，`const`是用来声明常量的，其声明后的变量值不能再被修改，即意味着：`const`声明必须进行初始化。
```js
const MAX_ITEMS = 30
// 报错
MAX_ITEMS = 50
```

::: warning 注意
我们说的`const`变量值不可变，需要分两种类型来说：
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
答：`JavaScript`引擎在扫描代码发现变量声明时，要么将它们提升至作用域的顶部(`var`声明)，要么将声明放在`TDZ`(暂时性死区)中(`let`和`const`)。访问`TDZ`中的变量会触发错误，只有执行变量声明语句之后，变量才会从`TDZ`中移出，随后才能正常访问。

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

### 块级绑定最佳实践的进化
在`ES6`早期，人们普遍认为应该默认使用`let`来代替`var`，这是因为对于开发者而言，`let`实际上与他们想要的`var`一样，直接替换符合逻辑。但随着时代的发展，另一种做法也越来越普及：默认使用`const`，只有确定变量的值会在后续需要修改时才会使用`let`声明，因为大部分变量在初始化后不应再改变，而预料以外的变量值改变是很多`bug`的源头。

## 字符串

### 模块字面量
::: tip
模板字面量是扩展`ECMAScript`基础语法的语法糖，其提供了一套生成、查询并操作来自其他语言里内容的`DSL`，且可以免受`XSS`注入攻击和`SQL`注入等等。
:::

在`ES6`之前，`JavaScript`一直以来缺少许多特性：
* **多行字符串**：一个正式的多行字符串的概念。
* **基本的字符串格式化**：将变量的值嵌入字符串的能力。
* **HTML转义**：向`HTML`插入经过安全转换后的字符串的能力。

而在`ECMAScript 6`中，通过模板字面量的方式多以上问题进行了填补，一个最简单的模板字面量的用法如下：
```js
const message = `hello,world!`
console.log(message) // hello,world!
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

在`ES6`之后，我们可以使用模板字面量，在里面直接还行就可以创建多行字符串，如下：
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
::: tip
模板字面量于普通字符串最大的区别是模板字符串中的占位符功能，其中占位符中的内容，可以是任意合法的`JavaScript`表达式，例如：变量，运算式，函数调用，设置是另外一个模板字面量。
:::
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
标签指的是在模板字面量第一个反撇号前方的标注的字符串，每一个模板标签都可以执行模板字面量上的转换并返回最终的字符串值。
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
::: tip
通过模板标签可以访问到字符串转义被转换成等价字符串前的原生字符串。
:::
```js
const message1 = `Hello\nworld`
const message2 = String.raw`Hello\nworld`
console.log(message1) // Hello
                      // world
console.log(message2) // Hello\nworld
```

## 函数

### 形参默认值

在`ES6`之前，你可以会通过以下这种模式创建函数并为参数提供默认值：
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
::: tip
函数形参默认值，除了可以是原始值的默认值，也可以是表达式，即：变量，函数调用也是合法的。
:::
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
::: tip
在`JavaScript`的函数语法规定：无论函数已定义的命名参数有多少个，都不限制调用时传入的实际参数的数量。在`ES6`中，当传入更少的参数时，使用参数默认值来处理；当传入更多数量的参数时，使用不定参数来处理。
:::

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
问：为什么`ES6`会引入函数的`name`属性。
答：在`JavaScript`中有多重定义函数的方式，因而辨别函数就是一项具有挑战性的任务，此外匿名函数表达式的广泛使用也加大了调试的难度，为了解决这些问题，在`ESCAScript 6`中为所有函数新增了`name`属性。

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
* 对象字面量：在不提供函数名称的情况下，取对象字面量的名称；提供函数名称的情况下就是此名称
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
* `[[Call]]`：当通过`new`关键字调用函数时，执行的是`[[Construct]]`函数，它负责创建一个新对象，然后再执行函数体，将`this`绑定到实例上。
* `[[Construct]]`：如果不通过`new`关键字进行调用函数，则执行`[[Call]]`函数，从而直接执行代码中的函数体。

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
在`ECMAScript 3`和早期版本中，在代码块中声明一个块级函数严格来说是一个语法错误，但是所有的浏览器任然支持这个热性，却又因为浏览器的差异导致支撑程度稍有不同，所以**最好不要使用这个特性，如果要用可以使用匿名函数表达式**。
```js
// ES5严格模式下，在代码块中声明一个函数会报错
// 在ES6下，因为有了块级作用域的概念，所以无论是否处于严格模式，都不会报错。
// 但在ES6中，当处于严格模式时：会将函数声明提升至当前块级作用域的顶部
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
* **没有this、super、arguments和new.target绑定**：箭头函数中的`this`、`super`、`arguments`和`new.target`这些值又外围最近一层非箭头函数所决定。
* **不能通过new关键词调用**：因为箭头函数没有`[[Construct]]`函数，所以不能通过`new`关键词进行调用，如果使用`new`进行调用会抛出错误。
* **没有原型**：因为不会通过`new`关键词进行调用，所以没有构建原型的需要，也就没有了`prototype`这个属性。
* **不可以改变this的绑定**：在箭头函数的内部，`this`的之不可改变(即不能通过`call`、`apply`或者`bind`等方法来改变)。
* **不支持argument对象**：箭头函数没有`arguments`绑定，所以必须使用命名参数或者不定参数这两种形式访问参数。
* **不支持重复的命名参数**：无论是否处于严格模式，箭头函数都不支持重复的命名参数。

#### 箭头函数的语法
::: tip
箭头函数的语法多变，根据实际的使用场景有多种形式。所有变种度由函数参数、箭头和函数体组成。
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
::: tip
箭头函数的语法简洁，非常适用于处理数组。
:::
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
尾调用指的是函数作为另一个函数的最后一条语句被调用。
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

在`ECMAScript 5`的引擎中，尾调用的实现与其他函数调用的实现类似：创建一个新的栈帧，将其推入调用栈来表示函数调用，即意味着：在循环调用中，每一个未使用完的栈帧度会被保存在内存中，当调用栈变得过大时会造成程序问题。<br/>

针对以上可能会出现的问题，`ES6`缩减了严格模式下尾调用栈的大小，当全部满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧：
* **尾调用不访问当前栈帧的变量(函数不是一个闭包。)**
* **尾调用不是最后一条语句**
* **尾调用的结果作为函数返回**
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

::: tip
递归函数是其最主要的应用场景，当递归函数的计算量足够大，尾调用优化可以大幅提升程序的性能。
:::
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
  'irst name': 'ABC',
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

### 增强对象原型

### 正式的方法定义

## 解构

### 为何使用解构功能

### 对象解构

### 数组解构

### 混合解构

### 解构参数

## Symbol及其Symbol属性

### 创建Symbol

### Symbol的使用方法

### Symbol与类型强制转换

### Symbol属性检索

### Symbol暴露内部操作


## Set和Map集合

## 迭代器(Iterator)和生成器(Generator)

## JavaScript中的类

## 数据的改进

## Promise和异步编程

## 代理(Proxy)和反射(Reflect)API

## 用模块封装代码


