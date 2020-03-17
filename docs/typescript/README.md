---
sidebar: auto
---
# TypeScript

`TypeScript`是`JavaScript`的一个超集，主要提供了**类型系统**和对**ES6**的支持，它与2012年10月正式发布第一个版本。

优势：
* 能在开发过程中更快的发现潜在问题。
* 对编辑器更友好的代码提示功能。
* 代码语义更清晰易懂。

## 安装

### Node.js
你首先需要在[Node.js官网](https://nodejs.org/zh-cn/)按照你电脑的操作系统下载对应的`Node`版本进行按照。

### TypeScript
你需要使用如下命令全局安装`TypeScript`:
```sh
# 安装命令
$ npm install -g typescript

# 安装完毕后，查看版本号
$ tsc -v
```
::: warning
如果你对具体版本有严格的要求，你同样可以按照指定版本号进行安装。
:::
如下：
```sh
# 按指定版本号进行安装
$ npm install -g typescript@3.6.4

# 安装完毕后，查看版本号
$ tsc -v
```

## 起步

### 目录
在正式开始学习`TypeScript`之前，我们需要创建一个叫做`TypeScript`的文件夹：
```sh
# 创建文件夹
$ mkdir TypeScript
```
随后在`TypeScript`文件夹中创建`demo.ts`文件，其代码如下：
```ts
console.log('Hello,world')
```
### 编译
`.ts`中的代码一般而言是不能直接运行在浏览器的，需要我们把`typescript`代码进行编译成普通的`javascript`代码以后才能运行在浏览器，我们可以使用如下命令来进行编译：
```sh
# 编译命令
$ tsc demo.ts
```
当编译完毕后，我们可以在文件夹中看到多出来了一个叫做`demo.js`文件：
```sh
|-- TypeScript
|   |-- demo.js
|   |-- demo.ts
```
随后我们需要使用如下命令来执行我们编译后的`javascript`代码：
```sh
# 执行
$ node demo.js
```
当执行完毕以上命令后，你可以在终端上看到输出一下内容：
```js
Hello,world
```

**简化过程**：我们发现，如果要运行一个`.ts`文件，我们首先需要使用`tsc`命令去编译它，随后再使用`node`命令去执行它，那么有没有一种工具能够一个步骤就帮我们做完以上的事情呢？我们需要全局安装一个叫做`ts-node`的工具：
```sh
# 安装ts-node
$ npm install ts-node -g

# 安装完毕，查看版本号
$ ts-node -v
```
在`ts-node`安装完毕后，我们先删除`demo.js`文件，随后使用`ts-node`命令来编译并执行我们的代码：
```sh
# 删除demo.js文件
$ rm demo.js

# 编译并执行
$ ts-node demo.ts
```
以上命令执行完毕后，你将会看到与上面实例相同的输出结果。

## 基础

### 原始数据类型
我们知道`JavaScript`分为**原始数据类型**和**对象类型**，原始数据类型包括：`number`、`string`、`boolean`、`null`、`undefined`和`symbol`。
在`TypeScript`中，我们可以如下定义：
```ts
let tsNum: number = 123
let tsStr: string = 'AAA'
let tsFlag: boolean = true
let tsNull: null = null
let tsUndefined: undefined = undefined
```

#### void空值
我们知道在`JavaScript`中，是没有空值(`void`)的概念的，但在`TypeScript`中，可以使用`void`来表示一个没有返回值的函数：
```ts
function sayHello (): void {
  console.log('Hello, world')
}
```
我们也可以定义一个`void`类型的变量，不过这样的变量并没有什么意义，因为我们只能给这种变量赋值为`null`或`undefined`。
```ts
let voidValue1: void = null
let voidValue2: void = undefined
```

#### void、null和undefined
`void`和`null`与`undefined`是有一定区别的，在`TypeScript`中，`null`和`undefined`是所有类型的子类型，也就是说可以把`undefined`或`null`赋值给`number`类型的变量:
```ts
let tsNumber1: number = undefined
let tsNumber2: number = null
```
而对于`void`而言，它只能被赋值为`null`或者`undefined`：
```ts
// 这两行代码会编译报错
let voidValue1: void = 123
let voidValue2: void = '123'
```

### 任意值
任意值`Any`用来表示可以接受任何类型的值。

在有以上内容的基础上，我们知道以下代码会报错：
```ts
// 变量被定义为number，那么它只能接受number类型的值，不能改变其类型，会编译报错
let tsNumber: number = 123
tsNumber = '123'
```
但是如果一个变量被定义为`any`，那么代表它可以接受任何类型的值：
```ts
// 以下代码是正确的，编译成功
let tsAny: any = 123
tsAny = '123'
```
现在我们来思考一个问题，如果我们定义了一个变量，没有指定其类型，也没有初始化，那么它默认为`any`类型：
```ts
// 以下代码是正确的，编译成功
let tsValue
tsValue = 123
tsValue = '123'
```

### 类型注解和类型推断
在以上的所有实例中，我们都为每一个变量提供了一个确定的类型，这种做法就叫做**类型注解**。而有些时候，当我们没有为其提供一个确定的类型，但提供了一个确定的值，那么`TypeScript`会根据我们给定的值的类型自动推断出这个变量的类型，这就叫**类型推断**。
```ts
// typescript会自动为num1变量推断为number
let num1 = 123

// typescript会自动为num4变量推断为number
let num2 = 456
let num3 = 789
let num4 = num2 + num3
```
根据以上的案例，当我们给一个变量一个明确值的情况下，我们可以省略为其定义类型。当如果在函数参数中，则我们必须为其指定一个类型，如果不指定则默认为`any`:
```ts
function add (num1: number, num2: number): number {
  return num1 + num2
}
// 或者省略函数的返回值类型，因为typescript会基于num1和num1全部为number类型，从而推断出函数返回值为number类型
function add (num1: number, num2: number) {
  return num1 + num2
}
```

**建议**：始终为函数返回值提供一个确定的类型是有一个比较推荐的好习惯。

### 联合类型
**联合类型**：表示取值可以为多种类型中的一种，多种类型使用`|`分隔开。
```ts
let value: string | number
value = 123
value = '123'
```

::: warning
当我们使用联合类型的时候，因为`TypeScript`不确定到底是哪一个类型，所以我们只能访问此联合类型的所有类型公用的属性和方法。
:::
```ts
// 会编译报错
function getLength (value: string | number): number {
  return value.length
}

// 以下代码不会编译报错
function valueToStr (value: string | number): string {
  return value.toString()
}
```

::: warning
另外一个值得注意的地方就是，当联合类型被赋值后，`TypeScript`会根据类型推断来确定变量的类型，一旦确定后，则此变量只能使用这种类型的属性和方法。
:::
```ts
let tsValue: string | number
tsValue = '123'
console.log(tsValue.length) // 编译正确
tsValue = 123
console.log(tsValue.length) // 编译报错
```

### 接口

### 函数的类型
在`JavaScript`中，定义函数有三种表现形式：
* 函数声明。
* 函数表达式。
* 箭头函数

```ts
// 函数声明
function func1 () {
  console.log('Hello, world')
}
// 函数表达式
const func2 = function () {
  console.log('Hello, world')
}
// 箭头函数
const func3 = () => {
  console.log('Hello, world')
}
```

如果函数有参数，则必须在`TypeScript`中未其定义具体的类型：
```ts
function add (x: number, y: number): number {
  return x + y
}
console.log(add(1, 2))    // 输出3
console.log(add(1, '2'))  // 报错
```

#### 接口定义函数
函数也可以使用接口来定义其类型：
```ts
interface AddInterface {
  (x: number, y: number): number
}
const add: AddInterface = function (x: number, y: number): number {
  return x + y
}
console.log(add(1, 2))    // 输出3
```

#### 可选参数
前面我们已经提到过，必须为具体的参数提供具体的类型，但如果一个函数接受一个参数，这个参数又是可选的，那么我们可以如下方式进行定义：
```ts
function getArea (a: number, b?: number): number {
  return  b ? a * b : a * a
}
console.log(getArea(4))     // 16
console.log(getArea(4, 5))  // 20
```

::: warning
可选参数必须放在最后一个位置，否则会报错。
:::
```ts
// 编译报错
function getArea (b?: number, a: number): number {
  return  b ? a * b : a * a
}
```

#### 参数默认值
在`JavaScript`中，函数允许我们给参数设置默认值，因此另外一种处理可选参数的方式是，为参数提供一个默认值，此时`TypeScript`将会把该参数识别为可选参数：
```ts
function getArea (a: number, b: number = 1): number {
  return  a * b
}
console.log(getArea(4))     // 4
console.log(getArea(4, 5))  // 20
```
::: tip
给一个参数设置了默认值后，就不再受`TypeScript`可选参数必须在最后一个位置的限制了。
:::
```ts
function getArea (b: number = 1, a: number): number {
  return  a * b
}
// 此时必须显示的传递一个undefined进行占位
console.log(getArea(undefined,4)) // 4
console.log(getArea(4, 5))        // 20
```

#### 剩余参数
在`ES6`中，我们可以使用`...`符号进行收缩剩余参数，在`TypeScript`中，我们依然可以这么做：
```js
// rest是一个数组，我们可以使用数组的类型来定义它
function getTotal (a: number, ...rest: number[]) {
  console.log(a)    // 1
  console.log(rest) // [2, 3, 4]
}

getTotal(1, 2, 3, 4,)
```

#### 函数重载
因为在`JavaScript`中，并没有限制函数参数的个数或者类型，因此`JavaScript`没有函数重载的概念，在`TypeScript`中对于函数重载的理解是：只要函数的参数个数或者函数参数的数量不同时，就可以认为这是两个函数。
```ts
// 前两个为函数声明，最后一个才是函数实现
function add (a: number, b: number): number;
function add (a: string, b: string): string;
function add (a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  } else {
    return a + '' + b
  }
}
console.log(add(1, 2))      // 3
console.log(add('1', '2'))  // 12
```
::: warning
在有函数重载时，会优先从第一个进行逐一匹配，因此如果重载函数有包含关系，应该将最精准的函数定义写在最前面。
:::

### 类型断言

### 声明文件

### 内置对象

## 进阶

### 类型别名

### 字符串字面量类型

### 数组和元组

#### 数组
和普通的变量一样，数组中的类型定义也有一定的规则：类型+方括号表示
```ts
// 只允许存储number类型
let numArray: number[] = [1, 2, 3]
// 只允许存储string类型
let strArray: string[] = ['1', '2', '3']
```
值得一提的是，以上案例还有一种泛型方式的写法：
```ts
// 只允许存储number类型
let numArray: Array<number> = [1, 2, 3]
// 只允许存储string类型
let strArray: Array<string> = ['1', '2', '3']
```

在数组中也可以使用联合类型：
```ts
// 只允许存储number和string类型的值
let tsArray: (number | string) [] = [1, '2', '3']
```

我们知道，在数组中不仅可以存储基础数据类型，还可以存储对象类型，如果需要存储对象类型，可以如下方式进行定义：
```ts
// 只允许存储对象仅有name和age，且name为string类型，age为number类型的对象
let objArray: ({ name: string, age: number })[] = [
  { name: 'AAA', age: 23 }
]
```
为了更加方便的撰写代码，我们可以使用类型别名的方式来管理以上类型：
```ts
// 类型别名
type person = {
  name: string,
  age: number
}
let objArray: person[] = [
  { name: 'AAA', age: 23 }
]
```

#### 元组
对元组的理解是：一个数组如果知道它确定的长度，且每个位置的值的类型也是确定的，那么就可以把这样的数组称为元组。
```ts
// tuple数组只有2个元素，并且第一个元素类型为string，第二个元素类型为number
let tuple: [string, number] = ['AAA', 123]
```
::: warning
当访问元组中已知位置的索引时，将得到其对应正确的值；当访问元组中未知位置的索引时，会报错。
:::
```ts
let tuple: [string, number] = ['AAA', 123]
console.log(tuple[1]) // 123
console.log(tuple[2]) // 报
```

### 枚举

### 类

### 类和接口

### 泛型

### 声明合并

## 工程

### 代码检查

### 工程配置