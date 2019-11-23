---
sidebar: auto
---
# 你不知道的javascript中

## 类型和语法
### 七种内置类型
::: tip
ES5 6种<br/>
ES6 新增1种
:::
1. number(数字类型)
2. string(字符串类型)
3. bool(布尔类型)
4. null(空值)
5. undefined(未定义)
6. object(对象)
7. symbol(符号)

### 数组
::: tip
数组可以存放任意类型的值：数字，字符串，布尔，对象，甚至是另一个数组。
:::
#### 稀疏数组
::: tip
**稀疏数组**：数组中含有空白或者空缺单元的数组。
:::
```js
// 稀疏数组
var arr = [];
arr[0] = 0;
arr[2] = 2;
console.log(arr[1]);     // 输出 undefined
console.log(arr.length); // 输出 3
```
#### 类数组
::: tip
**类数组**：与数组的结果类似，但并不是真正的数组。
:::
```js
// 类数组的案例
function foo() {
  // arguments就是类数组
  console.log(arguments);
}
foo('a','b','c');
```

#### 类数组转成真正的数组
::: tip
1. `Array.prototype.slice()`工具函数转
2. `Array.from()`ES6新方法转
:::
```js
// 类数组转真正数组的案例
function foo(){
  var arr = Array.prototype.slice.call(arguments);
  var arr2 = Array.from(arguments);
  arr.push(3);
  arr2.push(4);
  // 输出[1, 2, 3]
  console.log(arr);
  // 输出[1, 2, 4]
  console.log(arr2);
}
foo(1,2);

```
### 字符串和字符数组
#### 相似之处
1. 都是类数组
2. 都有`length`属性
3. 都有`indexOf`，`concat`方法
```js
// 字符串和字符的相似之处
var a = "foo";
var b = ['f','o','o'];
console.log(a.length); // 输出3
console.log(b.length); // 输出3

console.log(a.indexOf('o')); // 输出1
console.log(b.indexOf('o')); // 输出1

var c = a.concat('bar');
var d = b.concat(['b','a','r']);
console.log(c); // 输出foobar
console.log(d); // 输出['f','o','o','b','a','r']
```

#### 为什么字符串不可变
::: tip
字符串不可变：意思是字符串的成员函数不会改变原始的值，而是创建并返回一个新的字符串。
:::
```js
// 字符串的不可变性
var a = 'foo';
var b = a.concat('bar');
console.log(b); // 输出foobar
console.log(a); // 输出foo

var c = a.toUpperCase();
console.log(c); // 输出FOO
console.log(a); // 输出foo
```
#### 字符串借用数组的方法
```js
// 字符串借用数组的方法
var a = 'foo';
var b = Array.prototype.join.call(a,'-');
console.log(b); // 输出f-o-o
var c = Array.prototype.map.call(a,function(v){
  return v.toUpperCase()+'.';
}).join('');
console.log(c); // 输出F.O.O.
```

#### 字符串借用数组方法反转
```js
// 最暴力的字符串反转方法
var a = 'why';
var b = a.split('').reverse().join('');
console.log(b); // 输出yhw
```

### 十种原生函数
::: tip
ES5 9种<br/>
ES6 新增1种
:::
1. String()
2. Number()
3. Boolean()
4. Array()
5. Function()
6. Object()
7. RegExp()
8. Date()
9. Error()
10. Symbol() (ES6新增)

#### 原生函数的运用
```js
// 原生函数的运用
var strObj = new String('abc');
var str = 'abc';

console.log(typeof str);    // 输出string
console.log(typeof strObj); // 输出Object

console.log(str);     // 输出abc
console.log(strObj);  // 输出String {0:'a',1:'b',2:'c',length:3}
```
::: tip
再次强调：利用原生函数创建的是一个封装对象，而非其基本类型的值
:::

#### [[CLASS]]内部属性
::: tip
1. 所有`typeof`返回`object`的对象，都有一个内部属性，这个属性无法访问，一般通过`Object.prototype.toString.call()`访问
2. `null`和`undefined`虽然没有其对应的原生构造函数，但其内部`[[CLASS]]`依然是`Null`和`Undefined`
:::
```js
// 内部属性
console.log(Object.prototype.toString.call([1,2,3]));    // 输出[object Array]
console.log(Object.prototype.toString.call('abc'));     // 输出[object String]
console.log(Object.prototype.toString.call(12));        // 输出[object Number]
console.log(Object.prototype.toString.call(null));      // 输出[object Null]
console.log(Object.prototype.toString.call(undefined)); // 输出[object Undefined]
```

#### 封装对象的封装和拆封
::: tip
1. 基本类型值会自动封装成一个封装对象
2. 封装对象永远返回的是一个对象，其布尔值为`true`，即使是对`false`值进行的封装的对象，其布尔值也是`true`
3. 获取封装对象中的基本类型值，用`valueOf()`函数
:::
``` js
// 封装对象的封装和拆封
var str = 'abc';
console.log(str.length);        // 输出3
console.log(str.toUpperCase()); // 输出ABC

var flag = new Boolean(false);
if(!flag){
  console.log('执行不到这里，因为flag为封装对象，其布尔值为true')
}

var number = new Number(123);   
console.log(str.valueOf());     // 输出abc
console.log(number.valueOf());  // 输出123
```

### 强制类型转换
::: tip
**显示强制类型转换**：发生在静态类型语言的编译阶段<br/>
**隐式强制类型转换**：发生在动态语言的运行时
:::
```js
// 两种强制类型转换
var a = 42;
var b = a + '';      // 隐式强制类型转换
var c = String(a);   // 显示强制类型转换
```

#### ToString类型转换规则
::: tip
1. 数字按照规则转换成对应的字符串格式
2. `null`转换成字符串`null`
3. `undefined`转换成字符串`undefined`
4. 布尔值转换成对应的字符串格式，`true`转换成字符串`true`,`false`转换成字符串`false`
5. 数组，将所有单元以`,`号连接起来
6. 对象，如果对象没有重新定义其`toString()`方法，返回其对应的内部属性`[[CLASS]]`的值，如`[object Object]`
::: 

```js
// ToString类型转换的规则
var a = String(42);
var b = String(null);
var c = String(undefined);
var d = String(true);
var e = String([1,2,3]);
var f = {
  name: 'www',
  age: 12,
  toString: function(){
    return this.age
  }
}
var h = {
  name: 'AAA',
  age: 11
}

console.log(a);             // 输出42
console.log(b);             // 输出null 
console.log(c);             // 输出undefined
console.log(d);             // 输出true
console.log(e);             // 输出1,2,3
console.log(f.toString());  // 输出12，f对象重新定义了toString()方法
console.log(h.toString());  // 输出[object Object]，返回的是h对象的内部属性[[CLASS]]的值
```

#### JSON字符串化
::: tip
1. 数字字符串化为其对应的字符串格式
2. 字符串字符串化为其对应的字符串格式，但有两对引号，其中一对是字符串本身的
3. 布尔字符串为其对应的字符串格式
4. `null`字符串化为`"null"`
5. 数组字符串化为其对应的字符串化格式，例如`[1,2,3]`字符串化为`"[1,2,3]"`
6. `undefined`、函数`function`和`symbol`会自动忽略，变成`undefined`，如果在数组中，则返回`null`以保证数组中单元位置不变 
:::
```js
// JSON字符串化
var a = 42;
var b = 'abc';
var c = true;
var d = null;
var e = [1,2,3]
console.log(JSON.stringify(a)); // 输出"42"
console.log(JSON.stringify(b)); // 输出""abc""
console.log(JSON.stringify(c)); // 输出"true"
console.log(JSON.stringify(d)); // 输出"null"
console.log(JSON.stringify(e)); // 输出"[1,2,3]"

var f = undefined;
var h = [1,undefined,function(){},4];
var i = {
  name:'why',
  age: 12,
  sayHello: function(){
    consoel.log(this.age)
  }
}

console.log(JSON.stringify(f)); // 忽略，变成undefined
console.log(JSON.stringify(h)); // 忽略数组第二项，第三项 输出"[1,null,null,4]"
console.log(JSON.stringify(i)); // 忽略对象中的方法，sayHello属性不字符串化，输出"{"name":'why',"age": 12}"
```

#### JSON字符串化对象
::: tip
1. 未定义其`toJSON`方法，则按正常规则进行序列化
2. 定义了其`toJSON`方法，则按具体定义`toJSON()`方法的返回值来进行序列化
:::

::: warning 注意
对象的字符串化方法`toJSON()`并不是直接返回字符串化的值，而是返回一个能够被JSON字符串化的一个JSON安全的值，最后通过`JSON.stringify()`来字符串化
:::

```js
// 对象的字符串化
var obj1 = {
  name: 'why',
  age: 12
}
var obj2 = {
  name: 'why',
  age: 12,
  toJSON: function(){
    // 只字符串化name属性，age属性不
    return {
      name:this.name
    };
  }
}

console.log(JSON.stringify(obj1)); // 输出{"name":"why","age":12}
console.log(JSON.stringify(obj2)); // 输出{"name":"why"}
```
#### JSON字符串化参数运用
::: tip
- 第一个可选参数：可以是一个数组或者一个函数，用来指定对象序列化过程中，哪些属性应该被处理，哪些属性应该被排斥。当参数为数组时，只序列化数组中的属性；当参数为函数时，函数返回什么就序列化什么。
- 第二个可选参数：用来指定输出的缩进格式，不常用
:::

```js
// JSON字符串格式化参数的运用
var obj = {
  a: 42,
  b: '42',
  c: true,
  d: [1,2,3]
}
var result1 = JSON.stringify(obj,['a','b','d']);
var result2 = JSON.stringify(obj,function(key,value){
  if(key!=='c'){
    return value;
  }
})

console.log(result1); // 输出{"a":"42","b":"42","d":"[1,2,3]"}}(给什么输出什么)
console.log(result2); // 输出{"a":"42","b":"42","d":"[1,2,3]"}}(返回什么输出什么)
```
#### ToNumber转换规则
::: tip
1. `true`转换为1
2. `false`转换为0
3. 空字符串转换为0，非空字符串转换为1
4. null转换为0，undefined转换为NaN
5. 对象或者数组，先查找`valueOf()`再查找`toString()`，都没有则报`TypeError`错误
:::

```js
// ToNumber转换规则
var a = true;
var b = false;
var c = null;
var d = undefined;
var e = {
  a: 42,
  valueOf: function(){
    return this.a;
  },
  toString: function(){
    return 24;
  }
}
var f = {
  a: 42,
  toString: function(){
    return this.a;
  }
}
var h = [1,2,3];
h.toString = function(){
  return this.join('');
}

console.log(Number(a)); // 输出1
console.log(Number(b)); // 输出0
console.log(Number(c)); // 输出0
console.log(Number(d)); // 输出NaN
console.log(Number(e)); // 输出42，先判断valueOf()
console.log(Number(f)); // 输出42,没有valueOf()时，判断toString()
console.log(Number(h)); // 输出123
```

#### ToBoolean转换规则
::: tip
**假值**：可以被强制类型转换为false的值<br/>
**真值**：其他<br/>
:::
::: tip JS规范假值表
1. `undefined`
2. `null`
3. `false`
4. `+0 -0`和NaN
5. 空字符串
:::
```js
// ToBoolean转换规则
var a = Boolean(42);
var b = Boolean(0);
var c = Boolean(null);
var d = Boolean(undefined);
var e = Boolean('');
var f = Boolean('0');
var g = Boolean('false');
var h = Boolean(NaN);
var i = Boolean([]);
var j = Boolean({});
var k = Boolean(function(){console.log('k')});

console.log(a);   // 输出true
console.log(b);   // 输出false
console.log(c);   // 输出false
console.log(d);   // 输出false
console.log(e);   // 输出false
console.log(f);   // 输出true
console.log(g);   // 输出true
console.log(h);   // 输出fasle
console.log(i);   // 输出true
console.log(j);   // 输出true
console.log(k);   // 输出true
```

#### 显示强制类型转换(字符串与数字之间)
::: tip
1. 数字转字符串用`String()`方法，没有使用`new`
2. 字符串转数字用`Number()`方法，没有使用`new`
3. 其他方法
:::

```js
// 字符串与数字之间的强制类型转换
var a = 42;
var b = String(a);

var c = "3.14";
var d = Number(c);

console.log(b); // 输出"42"
console.log(d); // 输出3.14
```

##### 字符串与数字之间转换的其他方法
```js
// 字符串与数字之间转换的其他方法
var a = 42;
var b = a.toString(); // 隐式类型转换，创建一个封装对象

var c = "3.14";
var d = +c; // 一元运算符，显示转换为数字类型

console.log(b); // 输出"42"
console.log(d); // 输出3.14
```

#### 显示转换为布尔值
::: tip
1. 其他类型转换为布尔值时，使用`Boolean()`，没有使用`new`操作符
2. 其他方法
:::
```js
// 其他类型值转换为布尔值
var a = 0;
var b = "0";
var c = null;
var d = undefined;
var e = [];
var f = {};
var h = '';
var i = 'false'

console.log(Boolean(a));  //输出false
console.log(Boolean(b));  //输出true
console.log(Boolean(c));  //输出false
console.log(Boolean(d));  //输出false
console.log(Boolean(e));  //输出true
console.log(Boolean(f));  //输出true
console.log(Boolean(h));  //输出false
console.log(Boolean(i));  //输出true
```

##### 显示转换为布尔值的其他方法
```js
// 显示转换为布尔值的其他方法
var a = [];
var b = '';

var c = !a;     // !一元运算符，显示强制类型转换，将其真值转换为假值，假值转换为真值
var d = !b;

var e = !!a;    // !!二元运算符，在!一元运算符的基础上，把值再次取反
var f = !!b;

console.log(c); // 输出false
console.log(d); // 输出true
console.log(e); // 输出true
console.log(f); // 输出false
```

#### 隐式强制类型转换

#### 隐式强制类型转换形式一：运算符
::: tip
1. 运算符`+`可以隐式将数字转换为字符串
2. 运算符`-`可以隐式的将字符串转换为数字
:::
```js
// 隐式强制类型转换形式一：运算符
var a = 42;
var b = '0';

var c = a + b;
var d = c - 0;
console.log(c); // 输出"420"
console.log(d); // 输出420

var e = [1,2];
var f = [3,4];
var g = e + f;
// 输出1,23,4 数组相加时，会隐式的调用数组的valueOf()或者toString()
// e.toString() => "1,2"
// f.toString() => "3,4"
console.log(g);

// 提问一 i==j 或者j==i中 是数字转换成字符串再进行比较；还是字符串转换成数字，再进行比较
// 解答：ES5规范定义：数字==字符串 判断是，是字符串转换成数字，再和数字比较
var i = 42;
var j = "42";
console.log(i==j);
console.log(j==i);

// 提问二：数字==布尔值时，是数字转出布尔值，再进行判断；还是布尔值转成数字，再进行判断
// 解答：ES5规范：数字==布尔值时，是布尔值转换成对应的数字，再和数字比较(true:1,false:0)
var p = true;
var q = 0;
console.log(p==q);
```

#### 隐式强制类型转换形式一：隐式转换为布尔值
::: tip 隐式转换为布尔值的情况
1. `if`语句的条件判断
2. `for循环的第二条条件判断语句`
3. `do..while`和`while`循环的循环判断条件
4. `?:`三元运算符
5. `||`和`&&`逻辑运算符
:::

::: tip 注意
`||`和`&&`逻辑操作符返回的不一定是布尔值，而是两个数中的其中一个数
:::

```js
// || 和 && 逻辑运算符的返回值
var a = 42;
var b = "abc";
var c = false;

console.log(a&&b); // 输出"abc"，a为真，直接返回第二个数，不管第二个数为真还是为假
console.log(b&&a); // 输出42，规则同上

console.log(a||b); // 输出42，a为真，直接返回第一个数，不管第二个数为真还是为假
console.log(b||a); // 输出"abc",规则同上

console.log(c&&b); // 输出false，c为假，直接返回第一个数，不管第二个数为真还是为假
console.log(c||b); // 输出"abc"，c为假，直接返回第二个数，不管是真还是假
```

```js
// 三元运算符和逻辑操作符的大致关系
var a = 42;
var b = false;

// a||b 大致相当于 a?a:b
console.log(a||b);  // 输出42
console.log(a?a:b); // 输出42

// a&&b 大致相当于 a?b:a
console.log(a&&b);  // 输出false
console.log(a?b:a); // 输出false
```

#### 隐式强制类型转换形式一：符号
::: tip
1. `==`宽松相等：只判断值是否相等
2. `===`严格相等不仅判断值，还要判断类型
:::
```js
// 隐式强制类型转换形式一：符号
var a = 42;
var b = "42";

console.log(a==b);  // 输出true
console.log(a===b); // 输出false，a为数字类型，b为字符串类型
```

#### 逻辑运算符`&&`扩展运用
##### 提问
```js
// 提问：如何让下面的判断成立，输出ok
if(a==1 && a==2 && a==3){
  console.log('ok');
}
```

##### 解答
::: tip 技巧点
改写`Number.prototype.valueOf`方法，已达到每一次调用`valueOf`方法时，自增其变量
:::
```js
// 情况一:当a为数字时
var i = 0;
// 情况一关键点：改写Number.prototype.valueOf方法
Number.prototype.valueOf = function(){
  return i++;
}
var a = new Number();
if(a==1 && a==2 && a==3){
  console.log('ok');
}

// 情况二：当a为对象时
// 情况二关键点：定义对象自己的valueOf方法
var a = {
  b: 1,
  valueOf: function(){
    return this.b++;
  }
}

if(a==1 && a==2 &&a==3){
  console.log('ok');
}
```

## 异步

### 分块的程序
::: tip
1. 现在执行的块程序
2. 将来执行的块程序
:::
```js
// 分块的程序
function now() {
  return 21;
}
function later() {
  answer = answer * 2;
  console.log('later:' + answer);
}
var answer = now();
setTimeout(function(){
  later();
},1000);

// 现在执行的块：
function now() {
  return 21;
}
function later() {};
var answer = now();
setTimeout(function(){
  later();
},1000);

// 将来执行的块：
answer = answer * 2;
console.log('later:' + answer);
```

### 无法理解的`console.log`函数
`console.log`函数到底是异步的还是同步的？<br/>

::: tip
1. `console.log`函数并不是`JavaCcript`的正式一部分，它是宿主环境添加到`JavaScript`中的
2. 在`Node.js`环境下，它是严格的同步的
3. 在浏览器下，正常情况下是'同步'的，非正常情况下是异步的。
:::

```js
// '无法理解的'`console.log`函数
var a = {
  index: 1
}
console.log(a);
a.index++;
console.log(a);

// 有些浏览器在某些环境下，会把console.log 等I/O操作放在后台执行，意味着a.index++
// 操作执行完毕后，才执行两个console.log函数，造成输出结果是：{index:2}
```

### 为什么`setTimeout`不精准
`setTimeout`设置一个定时器，在指定的时间之后才放入事件循环队列中，而如果队列中有很多个项目，秉承队列先进先出的原则，需要等到它前面所有的项目都执行完毕后，才执行定时器里的函数，这就造成了定时器往往并不是一个精准的时间。


## ES6

### let和const
#### `let`和`const`的共同点
1. 只在自己声明的作用域中有效
2. 一旦声明，则不能重复声明同一个变量
3. 不再像`var`声明那样存在变量提升

```js
var bar = 1;
{
  var foo = 2;
  let baz = 3;
  const PI = 3.1415;
  PI = 3.1415926; //报错 
}

console.log(foo); //输出2
console.log(baz); //报错
```

### 扩展/收缩运算符
::: tip
ES6新运算符`...`，称为扩展或者收缩，具体作用取决于到底如何使用
:::

```js
// ...的扩展
function foo(x,y,z) {
  console.log(x,y,z); // 输出1,2,3
}
var arr = [1,2,3];
foo(...arr);          // 扩展数组：ES6写法
foo.apply(null,arr);  // 扩展数组：ES5写法


// ...的收缩
// 1.收集参数：ES6写法
function bar(...arr) {
  console.log(arr);   // 输出1,2,3,4,5
}
// 2.收集参数：ES5写法
function foo(){
  var args = Array.prototype.slice.call(arguments);
  console.log(args);  // 输出1,2,3,4,5
}
bar(1,2,3,4,5);
foo(1,2,3,4,5)
```

### 参数设置默认值
::: tip
1. ES6参数默认值可以是普通的赋值
2. ES6参数默认值可以是一个表达式
3. ES6参数默认值可以是一个函数调用的返回值
:::

```js
// ES5设置参数默认值和ES6设置参数默认值
function foo(x,y){
  x = x || 11;
  y = y || 22;
  console.log(x+y);
}
foo();            // 输出33
foo(5,undefined); // 输出27
foo(undefined,6); // 输出17
foo(null,6);      // 输出17
foo(0,10);        // 弊端：参数无法传递0，输出21

// ES5改进
function bar(x,y) {
  x = (x!=undefined) ? x : 11;
  y = (y!=undefined) ? y : 22;
  console.log(x+y);
}
bar();            // 输出33
bar(5,undefined); // 输出27
bar(undefined,6); // 输出17
bar(null,6);      // 输出17
bar(0,10);        // 输出10

// ES6方法
function baz(x=11,y=22){
  console.log(x+y);
}
baz();            // 输出33
baz(5,undefined); // 输出27
baz(undefined,6); // 输出17
baz(null,6);      // 输出6(与预期结果不一致，是因为null被强制转换成了0，实际baz(0,6))
baz(0,10);        // 输出10
```

#### ES6参数默认表达式
::: tip
1. 参数默认表达式中的参数是惰性的，意味着他们只在运行时才会发生，即其值省略或者为`undefined`
2. 默认表达式中的参数也是有作用域的，在参数列表中有的，不会向外层获取。
:::
```js
// ES6参数默认表达式
function foo(x = y + 3, z = bar(x)) {
  console.log(x, z);
}
function bar(val) {
  return val + 1;
}
var y = 5;
foo(5);             // 输出11 (5+6)
foo(undefined, 10)  // 输出18 (8+10)

var w = 1, z = 2;
function baz(x = w + 1, y = x + 1, z = z + 1) {
  console.log(x,y,z);
}
baz(); // 报错，参数列表中有z，不在取外层的z，而z = z + 1时，右边的z没有赋值就使用，即报错
```

### 解构
::: tip 常用解构方式
1. 对象解构
2. 数组解构
:::

```js
// 常用解构方式:解构对象 or 解构数组

// ES6之前的获取返回数组和返回对象的方式
function foo() {
  return [1,2,3];
}
function bar() {
  return {
    X: 4,
    Y: 5,
    Z: 6
  }
}
var arr = foo();
var a = arr[0];
var b = arr[1];
var c = arr[2];
var obj = bar();
var x = obj.X;
var y = obj.Y;
var z = obj.Z;
console.log(a,b,c); // 输出1,2,3
console.log(x,y,z); // 输出4,5,6

// ES6之后获取返回数组和返回对象的方式
var [A,B,C] = foo();
var {X,Y,Z} = bar();
console.log(A,B,c); // 输出1,2,3
console.log(X,Y,Z); // 输出4,5,6
```

#### 解构赋值技巧一：属性要一一对应
::: tip
解构赋值`{x,y,z} = {x:1,y:2,z:3}`中，左侧省略了`x:`，`y:`以及`z:`
:::
```js
// 解构赋值技巧一：属性要一一对应
var {x,y,z} = {x:1,y:2,z:3};        // 简写方式
var {x:x,y:y,z:z} = {x:1,y:2,z:3}   // 完整写法
var {x:X,y:Y,z:Z} = {x:1,y:2,z:3}   // 属性一一对应是指，左侧的属性必须同右侧的一致
```
#### 解构赋值技巧二：交换两个变量的值
```js
// 解构赋值技巧二：交换两个变量的值
var x = 10, y = 20;
[y,x] = [x,y];
console.log(x,y); // 输出20,10
```

#### 解构赋值技巧三：快速提取对象中的属性或者对象中的对象(数组)
```js
// 解构赋值技巧三：快速提取对象中的属性或者对象中的对象(数组)
var { a: { x, y }, a }  = { a: {x: 1, y: 2} }
console.log(x,y); // 输出1,2
console.log(a);   // 输出{x:1,y:2}
```

#### 解构赋值技巧四：按需提取
::: tip
往往在用解构赋值时，有一些对象或者数组的值，是我们不必要的，可以通过占位的形式绕过它，不提取
:::
```js
// 解构赋值技巧四：按需提取
function foo() {
  return [1,2,3];
}
function bar() {
  return {
    X: 4,
    Y: 5,
    Z: 6
  }
}
var [,a,] = foo();
console.log(a);     // 只提取第二个数，输出2

var {X,Z} = bar();  
console.log(X,Z);   // 只提取X属性和Z属性的值，输出4,6
```

#### 解构赋值技巧五：解构的默认值
::: tip
解构默认值是指：在解构的过程中，发生解构失败(左侧需要而右侧没有)时，左侧赋值一个默认的值
:::
```js
// 解构赋值技巧五：解构的默认值
function foo() {
  return [1,2,3];
}
function bar() {
  return {
    X: 4,
    Y: 5,
    Z: 6
  }
}
var [a=1,b=1,c=1,d=4]  = foo();
console.log(a,b,c,d); // 输出1,2,3,4  foo函数返回的数组中只有三个，d应用默认值4
var {X=1,Y=2,Z=3,K=0} = bar();
console.log(X,Y,Z,K); // 输出4,5,6,0  bar返回的对象中，没有K属性，K应用默认值0
```

#### 解构赋值技巧六：解构参数
```js
// 解构赋值技巧六：解构参数
function foo([x,y]) {
  console.log(x,y);
}
foo([1,2]); // 输出1,2
foo([2]);   // 输出2,undefined
foo([]);    // 输出undefined,undefined

function bar({x,y}) {
  console.log(x,y);
}
bar({x:3,y:4}); // 输出3,4
bar({x:3});     // 输出3,undefined
bar({});        // 输出undefined,undefined
```

### 对象字面量扩展

#### 简洁写法
::: tip
1. 属性的简洁写法：当属性和标识符同名是，可以省略，只写一个，例如`x:x => x`
2. 方法的简洁写法
:::
```js
// 简洁写法
var x = 2, y = 3;
var obj = {
  x: x,
  y: y
}
var myObj = {
  x,
  y
}
console.log(myObj.x);   // 输出2
console.log(myObj.y);   // 输出3


var foo = {
  sayHello: function sayHello() {
    console.log('Hello');
  },
  sayHi: function sayHi() {
    console.log('Hi');
  }
}
var newFoo = {
  sayHello() {
    console.log('hello');
  },
  sayHi() {
    console.log('Hi');
  }
}
newFoo.sayHello();    // 输出Hello
newFoo.sayHi();       // 输出Hi
```
### 字符串模板
::: tip
`${内容}`：字符串模板里的内容可以是变量、函数调用以及表达式
:::
```js
// 字符串模板
var name = 'why';
var age = 23;
var address = '广州';

// ES5拼接字符串
var str = '我叫：'+name+',我的年龄是：'+age+',我的地址是：'+address;

// ES6模板字符串
var newStr = `我叫：${name},我的年龄是：${age},我的地址是：${address}`;

console.log(str);     // 输出:我叫：why,我的年龄是：23，我的地址是：广州
console.log(newStr);  // 输出:我叫：why,我的年龄是：23，我的地址是：广州
```

### 箭头函数

::: tip 箭头函数使用规则
1. 如果只是一个简单的计算并且`return`计算结果，那么可以使用箭头函数
2. 如果主要依赖于`var self = this`中的`self`来工作
3. 其他复杂的情况，慎用箭头函数
:::
#### 箭头函数的使用场景一
```js
// 箭头函数的使用场景一：没有参数时
var foo = function() {
  return 12;
}
var bar = () => 12;
console.log(foo()); // 输出12
console.log(bar()); // 输出12
```
#### 箭头函数的使用场景二
```js
// 箭头函数的使用场景二：只有一个参数时
var foo = function(x) {
  return x+1;
}
var bar = x => x+1;
console.log(foo(1)); // 输出2
console.log(bar(1)); // 输出2
```

#### 箭头函数的使用场景三
```js
// 箭头函数的使用场景三：有多个参数时
var sum1 = function(x,y) {
  return x+y;
}
var sum2 = (x,y) => x+y;// 完整:return x+y;
var result1 = sum1(1,2);
var result2 = sum2(1,2);
console.log(result1);   // 输出3
console.log(result2);   // 输出3
```

#### 箭头函数的使用场景四
```js
// 箭头函数的使用场景四：遍历
var a = [1,2,3,4,5];
a = a.map(v => v+1);
console.log(a); // 输出2,3,4,5,6
```

#### 箭头函数的使用场景五
```js
// 箭头函数的使用场景五：不改变this
var controller = {
  makeRequest: function() {
    var self = this;
    setTimeout(function(){
      self.sayHello();
    },0)
  },
  makeResponse: function() {
    setTimeout(() =>{
      this.sayHello();
    },0)
  },
  sayHello() {
    console.log('Hello')
  }
}
controller.makeRequest();   // 输出Hello
controller.makeResponse();  // 输出Hello
```

### 迭代器
::: tip
定义：迭代器是一种有序的、连续的、基于拉取的用于消耗数据的组织方式
:::
```js
// 迭代器
var arr = [1,2,3]
var it = arr[Symbol.iterator]();
it.next();  // 输出{value: 1, done: false}
it.next();  // 输出{value: 2, done: false}
it.next();  // 输出{value: 3, done: false}
it.next();  // 输出{value: undefined, done: true}，true代表已迭代完毕
```
#### 迭代器可选接口
::: tip
1. `return`：向迭代器发出一个信号，表明消费者代码已经完毕，不会再从其中提取任何值。
2. `throw`：向迭代器抛出一个异常/错误
:::

#### 迭代器与循环
```js
// 迭代器与循环
for(v of it) {
  console.log(v)
}

// for-of循环的等价形式
for(var v,res; (res=it.next()) &&!res.done;) {
  v = res.value;
  console.log(v)
}
```

#### 自定义迭代器
```js
// 自定义斐波拉契数组迭代器
var Fib = {
  [Symbol.iterator]() {
    var n1 = 2, n2 = 1;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        var current = n2;
        n2 = n1;
        n1 = n2 + current;
        return {
          value: current,
          done: false
        }
      },
      return(v) {
        return {
          value: v,
          done: true
        }
      }
    }
  }
}

// 输出1 1 2 3 5 8 13 21 34 55
for(var v of Fib) {
  console.log(v);
  if(v>50) {
    break;
  }
}
```

### 生成器
在`ES6`之前，一个函数一旦开始执行，将不会被中断，一直到函数执行完毕；在`ES6`之后，由于生成器的存在，函数可以暂停自身，待到合适的机会再开始运行。

```js
// 生成器函数的语法: *号的位置可以随意
function *foo() {};
function * foo() {};
function* foo() {};
function * foo() {};
```
#### 运行生成器
::: tip
生成器函数同普通函数一样，可以传参，可以调用，不同是的，调用并不会向普通函数一样立即执行
:::
```js
// 运行生成器
function *foo(x,y) {
  console.log(x + y);
}
var it = foo(5,10);
it.next(); // it.next()运行生成器函数里的代码
// 输出：15
// 输出：{value: undefined, done: true}
```

#### yield生成器暂停点
::: tip
1. `yield`表示生成器函数遇到此处时，暂停，待生成器恢复时再运行其后的代码
2. `yield`在同一个生成器函数中可以出现多次
3. `yield`不只是一个暂停点，还可以是一个表达式
:::
```js
// yield生成器暂停点
function *foo() {
  var x = 10;
  var y = 20;
  yield;
  var x = x + y;
  console.log(x)
}
var it = foo();
it.next();  // 输出{value: undefined, done: false}，表示yield执行的代码已全部执行，生成器已暂停，待下一次next时，再运行其后的代码
it.next();  // 输出30 {value: undefined, done: true}，true表示生成器已运行完毕
```
```js
// yield表达式
function *foo() {
  var x = 10;
  var y = 20;
  var z = yield x+y; // 发出x+y的值30，接收参数33并赋值给z
  console.log('z:'+z);
}
var it = foo();
it.next();    // 输出{value: 30, done: false}
it.next(33);  // 输出z:33 {value: undefined, done: true}

function *bar() {
  var arr = [yield 1, yield 2, yield 3];
  console.log(arr, yield 4);
}
var itBar = bar();
itBar.next(); // 输出{value: 1, done: false}
itBar.next(); // 输出{value: 2, done: false}
itBar.next(); // 输出{value: 3, done: false}
itBar.next(); // 输出{value: 4, done: false}
itBar.next(); // 输出[undefined,undefined,undefined],undefined  {value: undefined, done: true}
```

#### `yield*`委托
::: tip
1. `yield*`委托的行为和`yield`相同
2. `yield*`委托是把生成器控制委托给一个`iterator`，这个`iterator`迭代完毕即意味着生成器迭代完毕
:::
```js
// yield*委托
function *foo() {
  yield *[1,2,3];
}
var it = foo();
it.next();  // 输出{value: 1, done: false}
it.next();  // 输出{value: 2, done: false}
it.next();  // 输出{value: 3, done: false}
it.next();  // 输出{value: undefined, done: true}
```

### Promise
::: tip
1. `Promise`不是对回调的替代
2. `Promise`只能被决议一次，其后的决议会被忽略
3. `Promise`决议只有两种结果：完成或拒绝
:::
```js
// 构造Promise
var promise = new Promise((resolve,reject) {
  // ..
  // resolve()：完成
  // reject()：拒绝
})
```

#### Promise与回调的对比
```js
// Promise与回调的对比
function ajax(url,cb) {
  // ...
}
ajax('www.baidu.com',function handle(error,contents) {
  if(err) {
    // 处理错误
  } else {
    // 处理成功
  }
})

function ajax(url) {
  return new Promise((resolve,reject) {
    // ...
  })
}
ajax(url).then((contents) => {
  // 处理成功
}, (err) = {
  // 处理错误
})
```

#### Promise.all()
::: tip
1. `Promise.all()`函数接受一个或多个值的数组
2. 只有当数组中全部被决议(完成或拒绝)才返回
:::
```js
// Promise.all()
var p1 = Promise.resolve(1);
var p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 100);
})
var v3 = 3;
var p4 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject('err');
  },10)
})

Promise.all([p1,p2,v3]).then((res) => {
  console.log(res); // 输出[1,2,3]
})
```

#### Promise.race()
::: tip
1. `Promise.race()`函数接受一个或多个值的数组
2. 数组中只要有一个被决议，函数就返回
:::
```js
// Promise.race()
var p1 = Promise.resolve(1);
var p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 100);
})
var v3 = 3;
var p4 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject('err');
  },10)
})

Promise.race([p2,p1,v3]).then((res) => {
  console.log(res); // 输出1
})
Promise.race([p2,p4]).then((res) => {
  console.log(res); // 不会执行到这里 
},(err) => {
  console.log(err); // 输出err
})
```
### Map和WeakMap

#### Map结构
::: tip
对象是创建无序键值对数据结构映射的主要机制<br>
在ES6之前，对象的属性只能是字符串<br>
在ES6之后，`Map`结构允许使用对象、数组等作为键
:::

* `set()`：新增一个map结构的数据
* `get(key)`：根据键获取值
* `size`：获取map结构的长度
* `delete(key)`：根据指定的键删除
* `has(key)`：判断指定的键是否存在于map结构中
* `keys()`遍历，`values()`遍历，`entries()`键值对遍历
* `clear`清空map结构
```js
// Map结构
var map = new Map();
var x = { id: 1 },
    y = { id: 2 };

// 设置map数据
map.set(x,'bar');
map.set(y,'foo');

// 获取map数据
console.log(map.get(x));  // 输出bar
console.log(map.get(y));  // 输出foo

// 获取map结构的长度
console.log(map.size);    // 输出2

// 根据指定键删除map数据
map.delete(x);

// 根据指定的键判断是否存在于map结构中
console.log(map.has(x));  // 输出false

// 遍历map键
for(var key of map.keys()) {
  console.log(key);       // 输出{id:2}
}

// 遍历map值
for(var value of map.values()) {
  console.log(value);     // 输出foo
}

// 遍历map键值对
for(var item of map.entries()) {
  console.log(item[0]);   // 输出y
  console.log(item[1]);   // 输出{id:2}
}
```

#### WeakMap
::: tip
1. 表现形式基本与`Map`结构类似
2. 没有`clear()`方法和`size`属性
3. 不暴露任何键、值和迭代器，因此无法进行`keys()`、`values()`和`entries()`遍历
4. 同`Map`结构最明显的区别是，键必须是对象，如果键是可以被GC的，那么`Map`结构对应的值也会被GC
:::
```js
var map = new Map();
var x = { id: 1 },
var y = { id: 2 },
var z = { id: 3 }

map.set(x,y,z);
x = null; // {id:1}可以被GC
y = null; // {id:2}可以被GC
```

### Set和WeakSet

#### Set结构
::: tip
`Set`是一个集合，它里面的值是唯一的，重复添加会被忽略(`Set`结构不允许强制类型转换，`1`和`"1"`被认为是两个不同的值)
:::

* `add()`：添加新值
* `size`：获取`Set`结构的长度
* `delete()`：根据指定的键删除
* `has()`：判断指定的键是否存在`Set`集合中
* `keys()`遍历、`values()`遍历、`entries()`遍历
* `clear()`：清空`Set`结构

```js
// Set结构
var set = new Set();
var x = { id: 1 };
var y = { id: 2 };
var a = 1;
var b = "1";
var c = true

// 添加Set数据
set.add(x);
set.add(y);
set.add(a);
set.add(b);
set.add(c);

// 获取Set数据的长度
console.log(set.size);  // 输出5

// 删除Set数据
set.delete(c);

// 判断某个值是否存在Set结构中
console.log(set.has(c));// 输出false

// 遍历Set的键
for(var key of set.keys()) {
  console.log(key);     // 输出{id：1} {id:2} 1 "1"
}

// 遍历Set的值
for(var value of set.values()) {
  console.log(value);   // 输出{id:1} {id:2} 1 "1"
}

// 遍历Set的键值对
for(var item of set.entries()) {
  console.log(item[0]); // 输出 {id:1} {id:2} 1 "1"
  console.log(item[1]); // 输出 {id:1} {id:2} 1 "1"
}
```

#### Set集合的运用
```js
// Set集合的运用：数组的去重、并集、交集、差集
var set1 = new Set([1,2,1,3,4,5]);
var set2 = new Set([4,5,6,7]);
console.log(Array.from(set1));    // 去重：输出1,2,3,4,5

var union = new Set([...set1,...set2]);
console.log(Array.from(union));   // 并集：输出1,2,3,4,5,6,7

var intec = new Set([...set1].filter(x => set2.has(x)));
console.log(Array.from(intec));   // 交集：输出4,5

var diff1 = new Set([...set1].filter(x => !set2.has(x)));
console.log(Array.from(diff1));    // 差集(set1-set2)：1,2,3
var diff2 = new Set([...set2].filter(x => !set1.has(x)));
console.log(Array.from(diff2));    // 差集(set2-set1)：6,7
```

#### WeakSet
::: tip
1. `WeakSet`基本表现同`Set`类似
2. `WeakSet`必须是对象
:::

### Array新增API
::: tip
1. `Array.of()`新的数组构造器
2. `Array.from()`将类数组对象转换成真正的数组
3. `copyWithin()`复制数组中一部分内容到同一个数组的另一个位置，覆盖原来位置的值
4. `fill()`填充数组
5. `find()`在数组中查找某个值是否存在
6. `findIndex()`在数组中某个值的索引
7. `keys()`遍历，`values()`遍历以及`entries()`遍历
:::

#### Array.of()
::: tip
`Array.of(3)`构造一个长度为1，第一个值为3的数组，而不会像`Array(3)`那样构造一个长度为3空槽数组
:::
```js
// Array.of()
var a = Array(3);
console.log(a.length);  // 输出3
console.log(a[0]);      // 输出undefined

var b = Array.of(3);
var c = Array.of(1,2,3);
console.log(b.length);  // 输出1
console.log(b[0]);      // 输出3
console.log(c);         // 输出[1,2,3]
```

#### Array.from
::: tip
常见的类数组有：`arguments`、`classList`以及自定义的类数组对象
:::
```js
var arrLike = {
  0: '1',
  1: true,
  2: 23,
  length: 3
}
// ES5做法
var arr1 = Array.prototype.slice.call(arrLike);
console.log(arr1);  // 输出["1",true,23]

// ES6做法
var arr2 = Array.from(arrLike);
console.log(arr2);  // 输出["1",true,23]
```

#### Array.from第二个参数的运用
```js
// Array.from第二个参数的运用
var arrLike = {
  0: true,
  1: 12,
  2: 'foo',
  length: 3
}
var arr = Array.from(arrLike,(value,index) => {
  if(typeof value === 'boolean') {
    return !value;
  }
  else if(typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value
  }
})
console.log(arr); // 输出[false,12,'FOO']
```



#### copyWithin
::: tip
* `target(必填)`：要复制到的索引
* `start(可选)`：复制开始的索引，默认是0
* `end(可选)`：复制结束的索引，默认是数组的长度
:::
```js
// copyWithin
console.log([1,2,3,4,5].copyWithin(3));     // 输出[1,2,3,1,2]
console.log([1,2,3,4,5].copyWithin(1,2));   // 输出[1,3,4,5,5]
console.log([1,2,3,4,5].copyWithin(1,2,3)); // 输出[1,3,3,4,5]
```
#### fill
::: tip
1. `fill`用指定值完全或者部分填充已存在的数组
2. `start(可选)`：填充的起始位置
3. `end(可选)`：填充的结束位置
:::
```js
// fill
var arr  = Array(4).fill('www');
console.log(arr);   // 输出['www','www','www','www']

var arr1 = Array(4).fill(42,1,2);
console.log(arr1);  // 输出[undefined,42,undefined,undefined]
```
#### find和findIndex
::: tip
1. `find`和`findIndex`参数都是一个回调函数
2. 回调函数的参数分别是`value`,`index`以及`array`
:::
```js
// find和findIndex
var arr = [1,2,3,4,5];
var flag = arr.find((value,index,arr) => {
  return value==2
})
console.log(flag);  // 输出true

var index = arr.findIndex((value,index,arr) => {
  return value==2
})
console.log(index); // 输出1
```

### Object新增API
::: tip
1. `Object.is()`执行比`===`比较更严格的值比较
2. `Object.getOwnPropertySymbols()`从对象中获取所有符号属性
3. `Object.setPrototypeOf()`设置对象的原型委托
4. `Object.assign()`把其他对象的属性赋值到目标对象上
:::

#### Object.is
::: tip
如果不是严格要是别`NaN`和`-0`的话，还是建议使用`===`比较
:::
```js
// Object.is()
var x = NaN;
var y = 0;
var z = -0;
console.log(x===x);           // 输出false
console.log(y===z);           // 输出true
console.log(Object.is(x,x));  // 输出true
console.log(Object.is(y,z));  // 输出false
```

#### Object.getOwnPropertySymbols
```js
// Object.getOwnPropertySymbols()
var obj = {
  "age": 42,
  [Symbol('name')]: 'why',
  [Symbol('isMan')]: true
}
console.log(Object.getOwnPropertySymbols(obj)); // 输出[Symbol(name),Symbol(isMan)]
```

#### Object.setPrototypeOf
```js
// Object.setPrototypeOf()
var obj1 = {
  foo() {
    console.log('obj1');
  },
  sayHello() {
    console.log('hello,world');
  }
}
var obj2  = {};
Object.setPrototypeOf(obj2,obj1);
obj2.foo();       // 输出obj1
obj2.sayHello();  // 输出hello,world
```
#### Object.assign
::: tip
1. `Object.assign()`是浅拷贝
2. 只会拷贝对象本身中可枚举的属性或者符号
3. 通过`=`进行简单赋值操作
4. 相同的属性的值以最后一个为准
:::
```js
var obj1 = { a: 1 };
var obj2 = { b: 2 };
var obj3 = { a: 100, c: 3 };

Object.defineProperty(obj1,'a1', {
  value: 11,
  enumerable: true,
  configurable: true,
  writable: true
})
Object.defineProperty(obj2,'b', {
  enumerable: false
})
Object.defineProperty(obj3,Symbol('c1'), {
  value: 33,
  enumerable: true,
  configurable: true,
  writable: true
})

var result = Object.assign({},obj1,obj2,obj3);
console.log(result); // 输出{ a:100,a1:11,c:3,Symbol(c1):33 }
```

### Number新增API
::: tip
1. `Number.MAX_SAFE_INTEGER`能够被安全表达的最大整数：2^53-1
2. `Number.MIN_SAFE_INTEGER`能够被安全表达的最小整数：-(2^53-1)
3. `Number.isNaN()`判断是否等于`NaN`，是返回`true`，否则返回`false`
4. `Number.isFinite()`判断是否是一个有效的数字(非无限的)
5. `Number.isInteger()`判断是否是一个整数
:::

#### Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER
```js
// Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER
console.log(Number.MAX_SAFE_INTEGER); // 输出9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // 输出-9007199254740991
```

#### Number.isNaN
::: tip
* 全局函数`isNaN()`有缺陷，只要是非数字就返回`true`，即使是`NaN`
* `Number.isNaN()`判断的是`NaN`，只有判断传入的是`NaN`才返回`true`
:::
```js
// Number.isNaN()
var a = NaN;
var b = 'NaN';
var c = 42;

console.log(isNaN(a));        // 输出true
console.log(isNaN(b));        // 输出true isNaN()做了强制类型转换
console.log(isNaN(c));        // 输出false

console.log(Number.isNaN(a)); // 输出true
console.log(Number.isNaN(b)); // 输出false
console.log(Number.isNaN(c)); // 输出false
```

#### Number.isFinite()
::: tip
* 全局函数`isFinite()`会对参数进行强制类型转换
* `Number.isFinite()`则不会对参数进行强制类型转换
:::
```js
// Number.isFinite()
var a = NaN;
var b = Infinity;
var c = "42";

console.log(isFinite(a));         // 输出false
console.log(isFinite(b));         // 输出false
console.log(isFinite(c));         // 输入true

console.log(Number.isFinite(a));  // 输出false
console.log(Number.isFinite(b));  // 输出false
console.log(Number.isFinite(c));  // 输出false
```

#### Number.isInteger
::: tip
`42`,`42.0`以及`42.`没有什么区别
:::
```js
// Number.isInteger
var num1 = 42;
var num2 = 42.0;
var num3 = 42.;
var num4 = 42.2;
var num5 = "42";
console.log(Number.isInteger(num1));  // 输出true
console.log(Number.isInteger(num2));  // 输出true
console.log(Number.isInteger(num3));  // 输出true
console.log(Number.isInteger(num4));  // 输出false
console.log(Number.isInteger(num5));  // 输出false
```

### String新增API
::: tip
1. `repeat()`复制字符串，参数为要复制的次数
2. `startsWith()`判断字符串是否以指定字符串开头
3. `endsWith()`判断字符串是否以指定字符串结尾
4. `includes()`判断字符串是否包含指定的字符串
:::

#### repeat
```js
var str = 'why';
var newStr = str.repeat(3);
console.log(newStr);  // 输出whywhywhy
```

#### startsWith、endsWith以及includes
```js
var str = 'www . baidu . com/why';

console.log(str.startsWith('www'));   // 输出true
console.log(str.endsWith('why'));     // 输出true
console.log(str.includes('/'));       // 输出true
```