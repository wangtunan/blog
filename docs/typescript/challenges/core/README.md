# 核心知识点

## 加号和减号
::: tip
加号和减号的用法类似。
:::
在一些内置工具中，可能会出现`+`或者`-`这些符号，例如：
```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
type Person = {
  name: string;
  age?: number;
}

// 结果：{ name: string; age: number; }
type result = Required<Person>
```
观察以上结果可以得出结论：`-?`是去掉类型中属性后面的`?`，整个`Required`的实际效果是去掉`T`类型中所有属性键后面的`?`，让所有属性变成必填的。

## keyof 和 in
`keyof`和`in`经常会连在一起使用，当它们连在一起使用时，通常表示一个迭代的过程。

### keyof
在`TS`中，`keyof T`这段代码表示获取`T`类型中所有属性键，这些属性键组合成一个联合类型，例如：
```ts
type Person = {
  name: string;
  age: number;
}
// 结果：'name' | 'age'
type result = keyof Person
```
`TS`中的`keyof T`，它有点类似`JavaScript`中的`Object.keys()`，它们的共同点都是获取属性键的集合，只不过`keyof T`得到的结果是一个联合类型，而`Object.keys()`得到的是一个数组。

### in
`in`操作符的右侧通常跟一个联合类型，可以使用`in`来迭代这个联合类型，如下：
```ts
// 仅演示使用, K为每次迭代的项
K in 'name' | 'age' | 'sex'
K = 'name' // 第一次迭代结果
K = 'age'  // 第二次迭代结果
K = 'sex'  // 第三次迭代结果
```

根据`keyof`和`in`的特点，我们可以撰写一些辅助工具，这里以`Readonly`为例。
```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
type Person = {
  name: string;
  age: number;
}
// 结果：{ readony name: string; readonly age: number; }
type result = Readonly<Person>
```
代码详解：

* `[P in keyof T]`：这段代码表示遍历`T`中的每一个属性键，每次遍历时属性键取名为`P`，这和`JavaScript`中的`for in`非常类似：
```js
// ts中的迭代
P in keyof T

// js中的迭代
for (let key in obj) 
```

## typeof
`TS`中的`typeof`，可以用来获取一个`JavaScript`变量的类型，经常用于获取一个普通对象或者一个函数的类型，如下：
```ts
const add = (a: number, b: number): number => {
  return a + b
}
const obj = {
  name: 'AAA',
  age: 23
}

// 结果：(a: number, b:number) => number
type t1  = typeof add
// 结果：{ name: string; age: number; }
type t2 = typeof obj
```

## never
`never`类型表示永远不会有值的一种类型。

例如，如果一个函数抛出一个错误，那么这个函数就可以用`never`或者`void`来表示其返回值，如下：
```ts
// never更适合用来表示永远没有返回值的函数
function handlerError(message: string): never {
  throw new Error(message)
}
// void适合用来表示返回值为空的函数
function handlerError(message: string): void {
  throw new Error(message)
}
```

关于`never`的另外一个知识点是：如果一个联合类型中存在`never`，那么实际的联合类型并不会包含`never`，如下：
```ts
// 定义
type test = 'name' | 'age' | never
// 实际
type test = 'name' | 'age'
```

## extends
`extends`关键词，一般有两种用法：**类型约束**和**条件类型**。

### 类型约束
类型约束经常和泛型一起使用：
```ts
// 类型约束
U extends keyof T
```
`keyof T`是一个整体，它表示一个联合类型。`U extends Union`这一整段表示`U`的类型被收缩在一个联合类型的范围内。例如： `U extends 'name' | 'age'`，则表示`U`只能为`name`或者`age`二者其中之一。

### 条件类型
常见的条件类型表现形式如下：
```ts
T extends U ? 'Y' : 'N'
```
我们发现条件类型有点像`JavaScript`中的三元表达式，事实上它们的工作原理是类似的，例如：
```ts
type result1 = true extends boolean ? true : false                    // true
type result2 = 'name' extends 'name' | 'age' ? true : false           // true
type result3 = [1, 2, 3] extends { length: number; } ? true : false   // true
type result4 = [1, 2, 3] extends Array<number> ? true : false         // true
```
在条件类型中，有一个特别需要注意的东西就是：**分布式条件类型**，如下：
```ts
// 内置工具：交集
type Extract<T, U> = T extends U ? T : never;
type type1 = 'name'|'age'
type type2 = 'name'|'address'|'sex'

// 交集结果：'name'
type result = Extract<type1, type2>

// 推理步骤
'name'|'age' extends 'name'|'address'|'sex' ? T : never
step1： ('name' extends 'name'|'address'|'sex' ? 'name' : never) => 'name'
step2:  ('age' extends 'name'|'address'|'sex' ? 'age' : never)   => never
result: 'name' | never => 'name'
```
代码详解：
* `T extends U ? T : never`：因为`T`是一个联合类型，所以这里适用于**分布式条件类型**的概念。根据其概念，在实际的过程中会把`T`类型中的每一个子类型进行迭代，如下：
```ts
// 第一次迭代：
'name' extends 'name'|'address'|'sex' ? 'name' : never
// 第二次迭代：
'age' extends 'name'|'address'|'sex' ? 'age' : never
```
* 在迭代完成之后，会把每次迭代的结果组合成一个新的联合类型(根据`never`类型的特点，最后的结果会剔除掉`never`)，如下：
```ts
type result = 'name' | never => 'name'
```

## infer

`infer`关键词的作用是延时推导，它会在类型未推导时进行占位，等到真正推导成功后，它能准确的返回正确的类型。

为了更好的理解`infer`关键词的用法，我们使用`ReturnType`这个例子来说明，`ReturnType`是一个用来获取函数返回类型的工具。

```ts
type ReturnType<T> = T extends (...args: any) => infer R ? R : never

const add = (a: number, b: number): number => {
  return a + b
}
// 结果: number
type result = ReturnType<typeof add>
```

代码详解：

* `T extends (...args: any) => infer R`：如果不看`infer R`，这段代码实际表示：`T`是不是一个函数类型。
* `(...args: any) => infer R`：这段代码实际表示一个函数类型，其中把它的参数使用`args`来表示，把它的返回类型用`R`来进行占位。
如果`T`满足是一个函数类型，那么我们返回其函数的返回类型，也就是`R`；如果不是一个函数类型，就返回`never`。

`TS`中的`infer`占位更像`JavaScript`中的模板字符串：
```ts
// 函数的返回类型使用R占位表示
(...args: any) => info R

// 模板字符串中的值，使用变量name占位表示
const str = `hello, ${name}`
```

## & 符号
在`TS`中有两种类型值得我们重点关注：**联合类型**和**交叉类型**。

联合类型一般适用于基本类型的**合并**，它使用`|`符号进行连接，如下：
```ts
type result = 'name' | 1 | true | null
```

而交叉类型则适用于对象或者函数的**合并**，它使用`&`符号进行连接，如下：
```ts
type result = T & U
```
`T & U`表示一个新的类型，其中这个类型包含`T`和`U`中所有的键，这和`JavaScript`中的`Object.assign()`函数的作用非常类似。

根据交叉类型的概念，我们可以封装一个合并对象的`merge`函数，如下：
```ts
// ts v4.8.4以上版本
function merge<T, U, K extends T & U>(to: T, from: U): K {
  for (let key in from) {
    ;(to as unknown as K)[key] = from[key] as any
  }
  return to as unknown as K
}

// ts v4.8.4以下版本
function merge<T, U, K extends T & U>(to: T, from: U): K  {
  for (let key in from) {
    ;(to as K)[key] = from[key] as any
  }
  return to as K
}

const obj1 = { name: 'AAA' }
const obj2 = { age: 23 }
// js结果：{ name：'AAA'; age: 23; }
// ts结果：{ name: string; age: number; }
const result = merge(obj1, obj2)
```
