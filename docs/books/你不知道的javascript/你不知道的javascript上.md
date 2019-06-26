---
sidebar: auto
---
# 你不知道的javascript上

好书蒙尘，现在才阅读整理，罪过罪过！

## 作用域和闭包

### 作用域是什么

作用域就是根据名称来查找变量的一套规则。

::: tip 示例代码
var a = 2;
:::

Javascript在执行一段代码之前，会经历三个步骤，统称为"**编译**"

- **分词/词法分析**<br/>

此阶段会将字符组成的字符串分解成有意义的代码块，这些代码块被称之为"**词法单元**"。</br>
例如：示例代码可能会被分解成：`var，a，=，2`以及最后的分号

- **解析/语法分析**<br/>

此阶段会将词法单元生成一个抽象语法树(AST)

- **代码生成**<br/>

最后将AST转换成可执行的代码


**总的来说**:
抛开具体细节，简单说就是将示例代码：`var a = 2`转换成一组机器指令，用来创建一个叫a的变量(包括分配内存等)，并将一个等于2的值存储在变量a中。

::: tip 性能优化
JavaScript引擎会在语法分析和代码生成阶段对代码进行性能优化
:::

### 编译的细节

- **声明(LHS操作)**：当遇到`var a`时，编译器会询问作用域是否已经有一个该名称的变量存在于当前作用域的集合中<br/>

**存在**：则忽略该声明，继续进行编译<br/>
**不存在**：要求当前作用域申明一个新的变量，并命名为a


- **赋值(RHS操作)**：当遇到`a=2`这个赋值操作时，引擎会首先询问作用域，在当前作用域中是否存在一个叫a的变量。
<br/>

**存在**：使用这个变量，并赋值<br/>
**不存在**：继续一层一层向外层作用域查找，直到一直找到这个变量。


### LHS和RHS

#### 定义
::: tip 定义
LHS：左侧查询变量容器本身<br/>
RHS：非左侧查询变量的值
:::

#### LHS案例

``` javascript
// 我们并不关心a具体值是多少，只是单纯想为=2这个赋值操作找一个目标，即：查找一个变量容器
a = 2;
```

#### RHS案例

``` javascript
// 这里没有a没有赋任何值，我们只是想找到变量a的值，进而传递给console.log()函数
console.log(a);
```

#### LHS和RHS综合案例

```javascript
// 案例一
var a = 2;

// 案例二
// 隐式函数赋值 a=2即：LHS
function foo(a){
// 得到a的值，并传递给console.log()函数，即：RHS
console.log(a)
}
// 函数调用即：RHS
foo(2);
```

#### 思考

为什么上例中，`var foo，foo = function(a){console.log(a)}`没有指明是LHS和RHS引用呢？<br/>

这是因为：**将函数声明简单的理解成LHS和RHS是不合适的**。


### 作用域嵌套

我们知道，所谓作用域就是根据名称查找变量的一套规则，那么变量的查找规则又是什么样子呢？<br>

#### 变量查找规则

在理解变量查找规则前，首先应该明白，什么是作用域嵌套<br>

所谓作用域嵌套就是当一个块或者函数在另一个块或者函数中时，就会发生作用域嵌套。

#### 作用域嵌套的案例

```javascript
function foo(a){
  // foo作用域
  var b = 0;
  var bar = function(){
    // bar作用域
    var c = 1;
    console.log(b+c)
  }
}
```

#### 查找规则

- 在当前作用域中查找变量，例如上例中的变量b，没有找到时<br/>

- 往外层作用域中查找，一直到最顶层(全局作用域)为止，有则返回，无则报错(严格模式下)

### 异常

**LHS**：如果LHS在所有作用域中查找不到，则引擎会抛出ReferenceError异常

**RHS**：如果RHS查找不到变量，在非严格模式下，会全局变量中新建一个，严格模式下则会报错。与RHS相关的报错为TypeError，表示对这个变量的值进行了不合理的操作，例如引用了null或者undefined类型值中的属性。


### 词语作用域

作用域分为两种最主要的工作模式

- **词法作用域**：最普通也是最常见的模式。

- **动态作用域**：一些编程语言依然在使用。

#### 变量的"遮蔽效应"

作用域会在查找到第一个匹配的标识符时停止，所用在多层作用域嵌套时，内层的变量会屏蔽掉外层的同名变量，这叫变量的**遮蔽效应**

#### "遮蔽效应"案例

``` javascript
function foo(){
  var a = 1;
  var var = function(){
    var a = 2;
    console.log(a); // 变量遮蔽，输出2
  }
}
```

#### 访问被遮蔽的变量

一般来说，全局变量会自动的变量全局对象(window)的属性，可以借助`window[]`或者`window.`的形式访问被遮蔽的全局变量。

#### 访问被遮蔽的变量案例

``` javascript
var a = 2;
function foo(){
  var a = 3;
  console.log(a);         // 变量遮蔽，输出3
  console.log(window.a)   // 访问全局对象属性a，输出2
}
```

### 欺骗词法

如果词法作用域完全由写代码期间函数所声明的位置来定义的话，那么有没有什么办法来修改这个词法作用域呢？

#### eval函数

eval函数接受一个字符串作用参数，并将其内容视为好像在书写时就存在于程序中的那个位置的代码一样。

#### eval函数欺骗的案例

``` javascript
function foo(str，b){
  // 欺骗，解析成var a = 3;
  eval(str);
  // 输出3，1        
  console.log(a，b)
}
var a = 2;
foo('var a = 3;'，1);
```

::: warning 注意
在严格模式下，eval有自己独有的作用域，意味着其再也无法修改它所在的作用域了。
:::

#### with

with通常被当做重复引用同一个对象中多个属性的快捷方式。

#### with使用案例

``` javascript
var obj = {
  a: 1，
  b: 2，
  c: 3
}
// 重复单调的引用obj
obj.a = 2;
obj.b = 3;
obj.c = 4;
// with快捷引用
with(obj){
  a = 2;
  b = 3;
  c = 4;
}
```

#### with的缺点

``` javascript
function foo(obj){
  with(obj){
    // obj2不存在变量a，根据变量查找规则，会在全局作用域上新建一个变量a
    a = 10;
  }
}

// 第一个对象，存在a变量
var obj1 = {
  a: 2
}
// 第二个对象，不存在a变量
var obj2 = {
  b: 3
}

foo(ojb1);
// 正确修改，输出10
console.log(obj1.a);

foo(obj2);
// 未正确赋值，undefined
console.log(obj2.a);

// with变量泄露，输出10
console.log(a);
```

::: warning 注意
不推荐使用with，因为在严格模式下，with被完全禁止。
:::


### evel和with影响性能

- JavaScript引擎会在编译阶段进行性能优化，其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定好所有变量和函数的定义位置，才能在执行过程中快速找到标识符。

- 如果引擎发现eval和with，它不能动态的分析代码，因此就不能做性能优化。

- 如果程序中出现大量的evel和with，则运行起来一定非常的慢，比起它们带来的效率所引起的性能问题，收益几乎为0


### 函数作用域

**定义**：是指属于这个函数的全部变量都可以在整个函数的范围内使用及复用

#### 函数作用域隐藏内部变量和函数定义
``` js
var a = 2;

function foo(){
  var a = 3;
  // 输出3
  console.log(3);
}
foo();

// 输出2
console.log(a);
```

#### 函数隐藏内部变量和函数定义的问题

- 必须声明一个具名函数(foo)，意味着foo本身也污染了它所在的作用域。
- 必须显示的调用这个具名函数，才能运行其中的代码。

#### 解决办法(立即执行函数表达式IIFE)
``` js
// 此处为函数表达式，不是一个函数声明
(function foo(){
  var a = 3;
  // 输出3
  console.log(a);
})();
```

#### IIFE进阶用法
``` js
// IIFE进阶用法：函数传参
var a = 2;
(function IIFE(window){
  var a = 3;
  // 输出3
  console.log(a);
  // 输出2
  console.log(window.a);
})(window);
// 输出2
console.log(a);
```

#### 匿名函数的缺点

- 匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。
- 因为没有函数名，当引用自身时，会比较麻烦。
- 没有函数名，可读性变差了

#### 解决办法
```js
// 始终给匿名函数一个函数名是一个很好的解决办法
setTimeout(function timerHandler(){
  console.log('ok');
}，1000);
```

### 块作用域

#### for和if没有块作用域
``` js
for(var i = 0;i<10; i++){
  console.log(i);
}
// 变量i泄露
console.log(10);
``` 

```js
var flag = true;
if(flag){
  var bar = 1;
  var foo = 2 * bar;
  // 输出2
  console.log(foo);
}
// 变量bar泄露，输出1
console.log(bar);
// 变量foo泄露，输出2
console.log(foo)
```

#### with块作用域的表现形式之一
with从对象中创建出来的作用域仅在with声明中而非外部作用域中有效

#### try/catch块作用域的表现形式之二
``` js
try{
  undefined();
}catch(err){
  // err只在catch中有效
  console.log(err);
}
// 报错
console.log(err);
```
#### ES6 let和 const块作用域的表现形式之三
```js
var flag = true;
if(flag){
  let bar = 1;
  // 输出2
  console.log(bar*2);
}
// 报错
console.log(bar);
```

``` js let循环
for(let i=0;i<10;i++){
  console.log(i);
}
// 报错，访问不到i
console.log(i);
```

### 变量、函数提升

#### 变量声明会提升到它当前作用域的顶部
```js
// 示例
function foo(){
  var a = 2;
}

// 提升后
function foo(){
  // 变量声明提升
  var a;
  a = 2;
}
```

#### 函数声明会提升到它当前作用域的顶部
``` js
// 先调用
foo();

// 再声明
function foo(){
  // 输出undefined
  console.log(a);
  var a = 2;
}

// 提升后相当于
function foo(){
  // 此时a没有赋值，为undefined
  var a;
  // 输出undefined;
  console.log(a);
  // a变量正式赋值
  a = 2;
}

// 函数调用
foo();
```

#### 函数表达式不会被提升
``` js
// 先调用，报错TypeError
foo();

var foo = function (){
  console.log('fun foo');
}
```

#### 函数会优先变量首先提升
``` js
// 先调用
foo();
// 声明foo变量
var foo;
// 声明foo函数
function foo(){
  console.log(1);
}
// 声明foo表达式
var foo = function(){
  console.log(2);
}
foo();


// 提升后相当于
function foo(){
  console.log(1);
}
// 输出1
foo();

// 重复声明，忽略
var foo;

// 声明foo表达式
var foo = function(){
  console.log(2);
}
// foo表达式覆盖前面的foo函数，输出2
foo();
```

### 作用域闭包

**定义**：当一个函数能够记住并访问它所在的词法作用域时，就产生了闭包，即使函数是在词法作用域之外执行

#### 闭包的第一种表现形式
```js
var a  = 1;
function foo(){
  var a = 2;
  // 这就是闭包
  return function(){
    console.log(a);
  }
}
var bar = foo();
// 输出2，而不是1
bar();
```

#### 闭包的第二种表现形式
**函数传递**：无论通过何种手段将内部函数传递到它所在词法作用域之外，它都会持有队原始作用域的引用，无论在何处执行这个函数，都会产生闭包
``` js
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();
```

#### 闭包的第三种表现形式
**回调函数**：在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包
``` js
// 定时器
setTimeout(function timeHandler(){
  console.log('timer');
}，100)

// 事件监听
$('#container').click(function(){
  console.log('DOM Listener');
})
```

#### 一个非典型的闭包案例
``` js
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```
为什么说是一个非典型的闭包案例？<br>
- 首先IIFE函数并不是在它本身词法作用域之外执行
- 其次变量a是通过普通的词法作用域查找而来，而不是闭包被发现

**那么，IIFE到底是不是一个闭包？**<br/>
是，IIFE的确创建了闭包。

### 循环和闭包
```js
// 经典for循环+闭包案例
for(var i=1;i<=5;i++){
  setTimeout(function timer(){
    console.log(i)
  }，i*1000)
}
```
::: warning 预期结果(错的)
分别输出数字1-5，每秒一次，每次一个
:::
::: tip 实际结果
每秒一次，每次一个，输出5个6
:::

#### 原因

- for循环，创建6个定时器，循环完毕后，i等于6
- 执行每一个定时器，输出i，而i此时等于6

#### 改进一
使用IIFE立即执行函数表达式来创建闭包
```js
// 改进一: 使用IIFE
for(var i=1;i<=5;i++){
  (function(){
    setTimeout(function timer(){
      console.log(i)
    }，i*1000)
  })()
}
```
::: warning 预期结果(错的)
分别输出数字1-5，每秒一次，每次一个
:::
::: tip 实际结果
每秒一次，每次一个，输出5个6
:::

#### 原因

- IIFE虽然创建了闭包作用域，但创建的的闭包作用域是空的
- 变量i依然是通过词法作用域向外查找，即i等于6

#### 改进二
```js
// 改进二: 使用IIFE，在闭包作用域中缓存变量
// 结果：正确依次输出1 2 3 4 5 
for(var i=1;i<=5;i++){
  (function(){
    var j = i;
    setTimeout(function timer(){
      console.log(j)
    }，i*1000)
  })()
}
```

#### 改进三
```js
// 改进三: 使用IIFE，闭包传参
// 结果：正确依次输出1 2 3 4 5 
for(var i=1;i<=5;i++){
  (function(j){
    setTimeout(function timer(){
      console.log(j)
    }，i*1000)
  })(i)
}
```

#### 改进四
```js
// 改进四: 使用IIFE + let最优解
// 结果：正确依次输出1 2 3 4 5 
for(let i=1;i<=5;i++){
  setTimeout(function timer(){
    console.log(i)
  }，i*1000)
}
```

### 闭包的模块模式

要形成模块模式则需要两个必要的条件

- 必须有外部的封闭函数，该函数至少被调用一次
- 封闭函数内部必须至少返回一个内部函数，这样才能在封闭函数作用域中形成闭包

``` js
// 一个闭包模块的案例
function CoolModule() {
  var a = 1;
  var b = 2 * a
  function _foo() {
    console.log(a)
  }
  function _bar() {
    console.log(b)
  }

  // 必要条件二：返回内部函数
  return {
    foo: _foo，
    bar: _bar
  }
}

// 必要条件一：被调用
var fun = CoolModule();
fun.foo(); // 输出1
fun.bar(); // 输出2
```

#### 闭包模块的单例模式

在上例中，封闭函数每被调用一次，都会创建一个新的模块实例，如何达到单例的目的呢<br>
可以使用IIFE把封闭函数包裹起来，已达到单例的目的

```js
// 模块的单例模式
var fun = (function CoolModule(){
  var a = 1;
  var b = 2 * a
  function _foo() {
    console.log(a)
  }
  function _bar() {
    console.log(b)
  }

  // 必要条件二：返回内部函数
  return {
    foo: _foo，
    bar: _bar
  }
})();

fun.foo(); // 输出1
fun.bar(); // 输出2
```

## this和对象原型

### 默认绑定
**默认绑定**：独立函数调用，也可以理解成无法应用于其他规则时的默认规则

#### 默认绑定示例
``` js
// this的默认绑定
function foo(){
  console.log(this.a)
}
var a = 2
foo();// 输出2
```
#### 示例解析

- foo是直接使用，不带任何修饰的函数引用而进行的函数调用
- foo调用位置是全局作用域，此时this指向window，this.a即等于window.a

::: danger 注意
在严格模式下，不能将全局对象用于默认绑定，此时this会绑定到undefined
:::

``` js
// this的默认绑定(严格模式下)
function foo(){
  'use strict'
  console.log(this.a)
}
var a = 2
foo();// 报错
```

### 隐式绑定
**隐式绑定**：函数调用的位置有上下文对象，即函数被某个对象拥有或者包含

#### 隐式绑定的示例形式一
``` js
// this的隐式绑定
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2，
  foo: foo
}
obj.foo();// 输出2
```

#### 示例解析

- foo函数的调用形式是对象obj调用
- foo函数被对象obj所拥有，此时this指向obj对象本身，this.a即等于obj.a

::: warning 注意
在对象属性的引用链上，只有在最后一层中，隐式绑定才起作用
:::

``` js
// 对象引用链上有多层
function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 32，
  foo: foo
}
var obj1 = {
  a: 2，
  obj2: obj2
}
obj1.obj2.foo();// 输出32
```

::: danger 注意
隐式绑定在某些情况下回发生丢失this的情况
:::

``` js
// 隐式绑定丢失this的情况一
function foo(){
  console.log(this.a)
}
var obj = {
  a: 2，
  foo: foo
}
var bar = obj.foo
var a = 3
bar();// 输出3，而不是2
```

#### 丢失this的原因分析

- var bar = obj.foo是用过函数别名来赋值的，即var bar = foo
- bar的调用方式是独立函数调用

``` js
// 隐式绑定丢失this的情况二
function foo(){
  console.log(this.a)
}
function dooFoo(fn){
  fn()
}
var obj = {
  a: 2，
  foo: foo
}
var a = 3
dooFoo(obj.foo);// 输出3，而不是2
```

#### 丢失this的原因分析
- obj.foo通过参数传递，实质依然是通过别名传递，即dooFoo(foo)
- dooFoo的调用方式是独立函数调用


### 显示绑定
**显示绑定**：不在对象内部包含一个函数，通过call，apply以及bind形式强制进行函数调用

#### 显示绑定示例一：call，apply
``` js
// call显示绑定this
function foo(){
  console.log(this.a)
}
var obj = {
  a: 1，
  b: 2
}
foo.call(obj);// 输出1
```

#### 硬绑定解决this丢失问题
```js
// 硬绑定解决this丢失问题
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  fn();
}
var obj = {
  a: 2
}
var bar = function(){
  foo.call(obj)
}
var a = 3;
bar();// 输出2，而不是3
doFoo(bar);// 输出2，而不是3
```

#### 显示绑定bind的由来
``` js
// 一个简单的赋值硬绑定辅助函数
function bind(fn，obj){
  return function() {
    return fn.apply(obj，arguments)
  }
}
```

由于硬绑定是一种非常常用的模式，ES5集成在Function.prototype.bind上

#### 显示绑定示例二： bind
``` js
// bind显示绑定
function foo(value){
  return this.a + value
}
var obj = {
  a: 1
}
var bar = foo.bind(obj)
console.log(bar(1));// 输出2： 1+1
console.log(bar(3));// 输出4： 1+3
```
### new绑定

**一个关于new的误解**：`var stu = new Student()`，new操作符只是一个对Student构造函数的调用而已，更准确来说，不叫构造函数，而应该叫构造调用。

#### new调用函数的过程
1. 创建一个全新的对象
2. 新对象进行[[Prototype]]链接
3. 新对象绑定到函数调用的this
4. 如果函数没有返回其他对象，则默认返回这个新对象

#### new绑定的示例
``` js
// new绑定的示例
function Foo(a){
  this.a = a;
}
var bar = new Foo(2);
console.log(bar.a); // 输出2
```

### 四种绑定的优先级

#### 显示绑定和隐式绑定的优先级
::: tip 结论
显示绑定的优先级比隐式绑定的优先级高
:::

``` js
// 显示绑定比隐式绑定优先级高的例子
function foo(){
  console.log(this.a);
}
var obj1 = {
  a: 1，
  foo: foo
}
var obj2 = {
  a: 2，
  foo: foo
}

// 隐式绑定
obj1.foo(); // 输出1
obj2.foo(); // 输出2

// 显示绑定
obj1.foo.apply(obj2); // 输出2
obj2.foo.apply(obj1); // 输出1
```

#### new绑定和隐式绑定的优先级
::: tip 结论
new绑定的优先级比隐式绑定的优先级高
:::

```js
// new绑定比隐式绑定的优先级高的例子
function foo(a){
  this.a = a;
}
var obj1 = {
  foo: foo
}

// 隐式绑定
obj1.foo(1);
console.log(obj1.a); // 输出1

// new绑定
var bar = new obj1.foo(4);
console.log(obj1.a); // 输出1
console.log(bar.a);  // 输出4
```

#### new绑定和显示绑定的优先级
::: tip 结论
new绑定的优先级比显示绑定的优先级高
:::

``` js
// new绑定比显示绑定优先级高的例子
function foo(a) {
  this.a = a;
}
var obj = {};

// 显示绑定
var bar = foo.bind(obj);
bar(2);
console.log(obj.a); // 输出2

// new绑定
var baz = new bar(4);
console.log(obj.a); // 输出2
console.log(baz.a); // 输出4
```

**分析**：在代码`var baz = new bar(4)`中，出乎意料之外的是，obj.a并没有被修改成4，依旧是2。这是因为在bind函数内部，遇到new操作符时，创建了一个新的this，把原来的this替换掉了。

### this绑定判断规则
1. 函数是否在new中被调用，是则属于new绑定，this指向新创建的对象<br>
  `var bar = new foo()`
2. 函数是否通过call，apply或者bind调用，是则属于显示绑定，this指向指定的对象<br>
  `var bar = foo.call(obj)`
3. 函数是否在某个上下文对象中调用，则则属于隐式绑定，this指向这个上下文对象<br>
  `var bar = obj.foo()`
4. 如果以上都不是，则使用默认绑定，严格模式下，绑定到undefined，非严格模式下绑定到全局对象window<br>
  `var bar = foo()`


### 绑定例外

#### 绑定例外一：忽略this
::: tip
`null`或者`undefined`作为this的绑定对象传入`call`，`apply`或者`bind`时，在调用时会被忽略，实际应用的是默认绑定规则
:::

```js
// 绑定例外
function foo(){
  console.log(this.a);
}
var a = 2;
foo.call(null); // 输出2
```

##### 绑定例外一的运用：展开一个数组

```js
// apply展开一个数组的例子
function foo(a，b){
  console.log("a:"+a+'，b:'+b);
}
foo.apply(null，[1，10]); // 输出a:1，b:10
```

##### 绑定例外一的运用：柯里化
::: tip
柯里化：预设一些参数
:::
```js
// bind柯里化
function foo(a，b){
  console.log("a:"+a+'，b:'+b);
}

// 预设参数：a=1
var bar = foo.bind(null，1);
// 真正调用
bar(2);   // 输出a:1，b:2
bar(8);   // 输出a:1，b:8
```

##### Object.create
由于绑定例外一确实使用了this，当传入`null`或者`undefined`时，在非严格模式下，this指向的是全局对象window，这有时候会造成一些难以追踪的bug<br>

##### 世纪之问，真假美猴王
`var obj = {}`和`var obj2 = Object.create(null)`谁才是真正的空对象？

**解答**：
- `var obj = {}`创建了一个'空对象'，他表面上没有任何属性，但是obj的原型指向Object，Object上的属性和方法依旧被obj所继承，所以obj不是一个真正的空对象。
- `var obj2 = Object.create(null)`通过`Object.create()`并不会常见`Object.prototype`这个委托，隐藏obj2是一个真正的空对象，vue.js源码中，大量使用了`Object.create()`来创建对象

##### 优化绑定例外一
```js
// 优化绑定例外的例子
function foo(a，b){
  console.log("a:"+a+'，b:'+b);
}
// 创建一个真正的空对象o
var o = Object.create(null);

// 扩展参数
foo.apply(o，[1，2]); // 输出a:1，b:2

// 柯里化：预设a=1
var baz = foo.bind(o，1);
baz(8);  // 输出a:1，b:8
baz(10); // 输出a:1，b:10
```

#### 绑定例外二：间接引用
```js
// 绑定例外二的例子
function foo(){
  console.log(this.a);
}
var a = 2;
var o = {
  a: 3，
  foo: foo
}
var p = {
  a: 4
}
o.foo();// 隐式绑定，输出3
(p.foo = o.foo)(); // 默认绑定，this指向全局对象window，输出2
```

##### 绑定例外分析
- `p.foo = o.foo`是一个赋值表达式，它返回的是foo函数的引用，此时的调用位置是全局，即：相当于直接使用`foo()`函数调用
- 在非严格模式下，独立函数调用，this指向全局window，此时window.a值为2


## 对象

### 两种定义方式
::: tip
**声明形式**：是常用的定义方式，在此定义方式中，你可以一次添加多个键/值对<br/>
**构造形式**：是非常少见的，在此定义方式中，你必须逐个添加属性
:::

```js
// 方式一：声明形式
var myObj = {
  name: 'AAA'，
  age: 12，
  address: '广东'
}
// 方式二：构造形式
var myObj2 = new Object();
myObj2.name = 'AAA';
myObj2.age = 12;
myObj2.address = '广东'
```

### 基本类型
::: tip
**基本类型**：本身并不是对象
:::
1. string
2. number
3. boolean
4. null
5. undefined
6. object

### 内置对象
1. String
2. Number
3. Boolean
4. Object
5. Function
6. Array
7. Date
8. RegExp
9. Error

### 为什么`'ABC'.length`可以正常使用
思考：`var str = 'ABC'`，str为一个字面量，而已知一个字面量是不能像对象一样拥有属性和方法的，但为什么能被正确使用？
```js
// 字符串字面量访问属性和方法
var str = 'ABC';
console.log(str.length);   // 输出3
console.log(str.charAt(1));// 输出B
// 数字访问方法
var number = 42.359;
console.log(number.toFixed(2)); // 输出42.36
```
#### 问题解答
**解答**：引擎会自动把字面量转换成对应的对象，所以可以访问对象的属性和方法<br>
`'ABC'.length` 相当于 `new String('ABC').length`<br>
`42.359.toFixed(2)` 相当于 `new Number(42.359).toFixed(2)`

::: tip
1. 对于布尔字面量也是如此<br/>
2. `null` 和 `undefined` 没有对应的构造形式，只有文字形式<br/>
3. `Date`只有构造形式，没有对应的文字形式<br/>
4. `Object`，`Function`，`Array`和`RegExp`这几种类型，无论使用文字形式还是构造形式，他们都是对象，不是字面量
:::

### 对象属性的访问方式
::: tip
无论是哪种访问方式，属性名永远都是字符串(ES6之前)<br/>
当使用非字符串作为属性时，会自动转换到其对应的字符串形式
:::
1. .操作符的属性访问方式
2. []操作符的键访问方式
```js
var obj = {
  a: 2
}
// 属性访问方式
console.log(obj.a); // 输出2
// 键访问方式
console.log(obj['a']); // 输出2
```
#### 两种访问方式的却别
- 属性访问方式，要求属性的命名必须满足标识符的命名规范。
- 键访问方式，任意UTF-8/Unicode的字符串即可。 

### 浅拷贝
**思考**：如何准确的复制一个对象
``` js
// 思考，如何准确的拷贝myObject对象
function anotherFunction(){
  console.log('this is a function');
}
var anotherObject = {
  a:1，
  b:'AAA'，
  c: true
}
var anotherArray = [];
var myObject = {
  a: 2，
  b: anotherFunction，
  c: anotherObject，
  d: anotherArray
}
var anotherArray = [anotherObject，myObject];
```
::: tip
**浅拷贝**：复制出新对象，其中新对象a值=旧对象的a值，新对象b，c，d属性的引用=旧对象中b，c，d的引用
:::
::: danger
浅拷贝无法复制出anotherArray数组中的引用，深拷贝才可以。
:::

#### 浅拷贝的实现方法一：JSON格式化对象
::: tip
此种方法要求对象满足能够被JSON安全的解析<br/>
例如如果对象中某一属性是一个函数的引用，则该属性解析结果是undefined，函数具体内容不会被解析出来
:::
```js
// JSON格式化对象实现浅拷贝
var obj = {
  a: 1，
  b: 'AAA'，
  c: true，
  d: null，
  e: undefined，
  f: function(){console.log('this is function')}
}
var newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj.a); // 输出1
console.log(newObj.b); // 输出'AAA'
console.log(newObj.c); // 输出true
console.log(newObj.d); // 输出null
console.log(newObj.e); // 输出undefined
console.log(newObj.f); // 输出undefined，f属性中的函数引用不能被JSON安全的解析出来
```

#### 浅拷贝的实现方法一： Object.assign()
::: tip
1. Object.assign()遍历源对象中所有可枚举的键，并使用`=`操作符赋值到目标对象
2. 对象中属性的特性(例如writable)，不能被复制到目标对象
:::
```js
// ES6 Object.assign() 实现浅拷贝
var obj = {
  a: 1，
  b: 'AAA'，
  c: true，
  d: null，
  e: undefined，
  f: function(){console.log('this is function')}
}
var newObj = Object.assign({}，obj);
console.log(newObj.a); // 输出1
console.log(newObj.b); // 输出'AAA'
console.log(newObj.c); // 输出true
console.log(newObj.d); // 输出null
console.log(newObj.e); // 输出undefined
console.log(newObj.f); // 输出ƒ (){console.log('this is function')}
```

### 属性描述符
::: tip
通过`Object.defineProperty()`来操作属性的值或属性的特性
:::
1. writable(可写)
2. enumerable(可枚举)
3. configurable(可配置)

```js
// Object.defineProperty()添加新属性和特性配置
var myObject = {};
Object.defineProperty(myObject，'name'，{
  value: 'www'，
  writable: true， // 默认
  configurable: true， // 默认
  enumerable: true // 默认
})
console.log(myObject.name); // 输出www
```

#### writable
::: tip
writable决定是否可以修改属性的值
:::

``` js
// writable决定是否可以修改属性的值
var myObject = {};
Object.defineProperty(myObject，'name'，{
  value: 'www'，
  writable: false // 不可修改name的值
})
myObject.name = 'AAA';  // name的第二次赋值无效，严格模式下会报错，TypeError
console.log(myObject.name); // 输出www
```

#### configurable属性可配置的
::: tip
1. configurable决定属性是否可以通过Object.defineProperty()配置<br>
2. configurable一旦设置成false，则无法撤销<br/>
3. configurable为false时，会禁止delete删除该属性<br/>
4. 不可配置的意思是：不能通过Object.defineProperty()来进行属性配置，但属性正常形式的赋值还是可以的
:::
```js
// configurable决定属性是否可以通过Object.defineProperty()配置
var myObject = {
  a: 2
}
myObject.a = 3;
console.log(myObject.a); // 输出3

Object.defineProperty(myObject，'a'，{
  value: 4，
  configurable: false // 不可配置
})
console.log(myObject.a); // 输出4

myObject.a = 5;
console.log(myObject.a); // 输出5，属性不可配置，但依然可以正常赋值

Object.defineProperty(myObject，'a'，{
  value: 6，
  configurable: true
}) // 报错，TypeError
```

#### enumerable属性可枚举
::: tip
属性可枚举(enumerable)的意思是：能够通过`for..in`循环遍历到该属性，为true是可以遍历到，false时无法遍历
:::
``` js
// enumerable属性可枚举
var myObject = {
  name: 'www'，
  sex: '女'
}
Object.defineProperty(myObject，'age'，{
  value: 18，
  enumerable: false // 女生的年龄是不能随便知道的
})

// 遍历对象
for(var key in myObject){
  console.log(myObject[key]); // 依次输出www 女
}
```

### 对象的常量属性
::: tip
**对象的常量属性**：该属性不可修改，不可重定义或者不可被删除
:::
``` js
// 对象的常量属性
var myObject = {}
Object.defineProperty(myObject， 'CONST_NUMBER'， {
  value: 42，
  writable: false， // 不可修改
  configurable: false // 不可配置，不可删除
})
console.log(myObject.CONST_NUMBER); // 输出42
myObject.CONST_NUMBER = 45; // 报错
delete myObject.CONST_NUMBER // false
console.log(myObject.CONST_NUMBER); // 输出42，常量属性依然在
```

### 禁止扩展对象
::: tip
**禁止扩展对象**：意思是，一旦设置了对象禁止扩展，则不能再添加新的属性
:::
``` js
// 禁止扩展对象
var myObject = {
  name: 'www'，
  age: 12
}
Object.preventExtensions(myObject); // 禁止扩展对象myObject
myObject.sex = '女' // 非严格模式下，失败；严格模式下，报错TypeError
console.log(myObject); // 输出{name:'www'，age:12}，sex属性不存在
```

### Object.seal()和Object.freeze()
#### Object.seal()密封对象
::: tip
1. 对象密封后，不能添加新的属性，不能重新配置也不能删除现有属性<br/>
2. 可以修改现有属性的值
3. Object.seal()依次调用对象属性的Object.preventExtensions()方法
:::
``` js
// Object.seal()密封对象
var myObject = {
  name: 'www'，
  age: 23，
  sex: '女'
}
Object.seal(myObject);

// 输出false
console.log(delete myObject.name)
// 输出{name:'www'，age: 23，sex:'女'}，name属性依然存在
console.log(myObject)

// address属性添加失败，严格模式下报错TypeError
myObject.address = '广州'
// 输出{name:'www'，age: 23，sex:'女'}，address属性添加失败
console.log(myObject);

// 报错，TypeError
Object.defineProperty(myObject，'name'，{
  configurable: true，
  writable: true，
  enumerable: true
})
```

#### Object.freeze()冻结对象
::: tip
1. 对象冻结后，不能修改对象属性上的值
2. Object.freeze() 调用Object.seal()并把所有属性的writable修改为false
3. 这是一个浅冻结，如果对象里还有对象，则对象的对象不收冻结影响
:::

``` js
// Object.freeze()冻结对象
var myObject = {
  name: 'www'
}
Object.freeze(myObject);

// 赋值失败，严格模式下，报错TypeError
myObject.name = 'AAA';
// 输出{name:'www'}
console.log(myObject);

// 报错TypeError
Object.defineProperty(myObject，'name'，{
  value: 'BBB'
})
```

### 属性的Getter和Setter
::: tip
1. getter和setter是一个隐藏函数，分别在获取属性值和设置属性值时被调用
2. 一旦设置了getter和setter，该属性的value和writable则自动忽略
3. getter和setter通常是成对出现的
:::
``` js
// 获取属性值getter和setter
var myObject = {
  get a() {
    return 2;
  }
}
myObject.a = 3;
// 输出2，因为a属性只定义了getter，没有定义setter，赋值无效
console.log(myObject.a);

Object.defineProperty(myObject，'b'，{
  get: function(){
    return this._b_;
  }，
  set: function(val){
    this._b_ = val*3;
  }，
  enumerable: true
})
myObject.b = 3;
// 输出9，3*3
console.log(myObject.b);
```

### 判断某个属性是否存在
::: tip
**in**：判断某个属性是否存在对象以及对象的原型链上<br/>
**hasOwnProperty**：判断对象中是否存在某个属性
:::
::: danger
in操作符在判断某个值是否存在数组时，判断的属性名是数组的下标，而非值<br>
`4 in [2，4，6]`返回false，因为数组`[2，4，6]`的属性名是`0，1，2`
:::
::: danger
- 如果某个对象没有链接到Object.prototype，则不能直接使用hasOwnProperty方法来进行属性判断
- 这时可以通过Object.prototype.hasOwnProperty.call(myObject，'xxx')的形式来判断
:::
```js
// 判断某个属性是否存在
var myObject = {
  a: 2
}
console.log("a" in myObject); // 输出true
console.log("b" in myObject); // 输出false
console.log(myObject.hasOwnProperty('a')); // 输出true
console.log(myObject.hasOwnProperty('b')); // 输出false

var obj = Object.create(null); // obj没有进行[[Prototype]]原型委托，所以没有hasOwnProperty方法
obj.name = 'why';
console.log(Object.prototype.hasOwnProperty.call(obj,'name')); // 输出 true
```

### 遍历的本质

#### 数组遍历
::: tip
1. for循环遍历下标
2. forEach()，every()，some()等辅助迭代器遍历值
3. for of遍历(ES6)
:::
```js
// 数组遍历
var myArray = [1， 2， 3]
// 依次输出1 2 3
for(var i=0; i<myArray.length; i++){
  console.log(myArray[i])
}

// 依次输出1 0 ，2 1，3 2
myArray.forEach(function(item，index){
  console.log(item，index)
})

// 依次输出1 2 3
for(var val of myArray){
  console.log(val)
}
```
::: tip
`for..of`遍历的本质：通过调用迭代器对象的next()方法来遍历所有返回的值，数组有内置的`@@iterator`，所以可以直接使用
:::

```js
// 手动进行数组的遍历
var myArray = [1， 2， 3];
// 获取数组内置的迭代器对象
var it = myArray[Symbol.iterator]();
it.next(); //{value:1，done:false}
it.next(); //{value:2，done:false}
it.next(); //{value:3，done:false}
it.next(); //{value:undefined，done:true}
```
#### 对象`for..of`遍历
::: tip
1. 定义对象迭代器，实现`for..of`遍历
2. `for in`遍历
:::
```js
// 对象`for..of`遍历
var myObject = {
  a: 1，
  b: true，
  c: 'www'
}
Object.defineProperty(myObject，Symbol.iterator，{
  writable: false，
  enumerable: false，
  configurable: true，
  value: function(){
    var _this = this;// 保存this
    var index = 0; // 当前遍历的索引
    var keys = Object.keys(_this) // 当前对象所有的属性
    return {
      next: function(){
        return {
          value: _this[keys[index++]]，
          done: index>keys.length
        }
      }
    }
  }
})

// for..of遍历对象
// 依次输出1 true www
for(var val of myObject){
  console.log(val);
}
```

```js
// 对象for..in遍历
var myObject = {
  a: 1，
  b: true，
  c: 'www'
}
// 依次输出1 true www
for(var key in myObject){
  console.log(myObject[key])
}
```