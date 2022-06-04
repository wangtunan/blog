---
sidebar: auto
---

# Type-Challenges

## 介绍
在学习完`TypeScript`一些基础知识后，我们已经可以熟练使用一些基本类型定义了，但对于`TypeScript`的高级用法却依旧无法入门，为了更有趣的学习`TypeScript`高级用法，我们选择[Type-Challenges](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)类型挑战来作为我们学习的目标。

在`Type-Challenges`中，可以从`简单`、`中等`、`困难`以及`地狱`难度，循序渐进的学习`TypeScript`高级技巧。

如果你需要选择其他的方向来深入学习`TypeScript`高级技巧，这里也有一些推荐的开源项目：
* 官方内置：在`lib.es5.d.ts`文件中，`TypeScript`官方默认内置了一些辅助工具函数，例如：`Partial`、`Required`、`Pick`以及`Record`等等。
* 非官方开源库：[utility-types](https://github.com/piotrwitek/utility-types)、[ts-toolbelt](https://github.com/millsp/ts-toolbelt)、[SimplyTyped](https://github.com/andnp/SimplyTyped)

在之后的挑战中，我们会尽力对每道题进行必要的讲解，力争在进行`Type-Challenges`类型挑战时弄清楚所有涉及到的知识点。

## 核心知识点

### 加号和减号
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

### keyof 和 in
`keyof`和`in`经常会连在一起使用，当它们连在一起使用时，通常表示一个迭代的过程。

#### keyof
在`TS`中，`keyof T`这段代码表示获取`T`类型中所有属性键，这些属性键组合成一个联合类型，例如：
```ts
type Person = {
  name: string;
  age: number;
}
// 'name' | 'age'
type result = keyof Person
```
`TS`中的`keyof T`，它有点类似`JavaScript`中的`Object.keys()`，它们的共同点都是获取属性键的集合，只不过`keyof T`得到的结果是一个联合类型，而`Object.keys()`得到的是一个数组。

#### in
`in`操作符的右侧通常跟一个联合类型，可以使用`in`来迭代这个联合类型，如下：
```ts
// 仅演示使用
in 'name' | 'age' | 'sex'
'name' // 第一次迭代结果
'age'  // 第二次迭代结果
'sex'  // 第三次迭代结果
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

// JavaScript中的迭代
for (let key in obj) 
```

### typeof
`TS`中的`typeof`，可以用来获取一个`JavaScript`变量的类型，通常用于获取一个普通对象或者一个函数的类型，如下：
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

### never
`never`类型表示永远不会有值的一种类型。

例如，如果一个函数抛出一个错误，那么这个函数就可以用`never`或者`void`来表示其返回值，如下：
```ts
function handlerError(message: string): never {
  throw new Error(message)
}
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

### extends
`extends`关键词，一般有两种用法：**类型约束**和**条件类型**。

#### 类型约束
类型约束经常和泛型一起使用：
```ts
// 类型约束
U extends keyof T
```
`keyof T`是一个整体，它表示一个联合类型。`U extends Union`这一整段表示`U`的类型被收缩在一个联合类型的范围内。

#### 条件类型
常见的条件类型表现形式如下：
```ts
T extends U ? 'Y' : 'N'
```
我们发现条件类型有点像`JavaScript`中的三元表达式，事实上它们的工作原理是类似的，例如：
```ts
type res1 = true extends boolean ? true : false                  // true
type res2 = 'name' extends 'name'|'age' ? true : false           // true
type res3 = [1, 2, 3] extends { length: number; } ? true : false // true
type res4 = [1, 2, 3] extends Array<number> ? true : false       // true
```
在条件类型中，有一个特别需要注意的东西就是：**分布式条件类型**，如下：
```ts
// 内置工具：交集
type Extract<T, U> = T extends U ? T : never;
type type1 = 'name'|'age'
type type2 = 'name'|'address'|'sex'

// 结果：'name'
type test = Extract<type1, type2>

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

### infer

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


### & 符号
在`TS`中有两种类型值得我们重点关注：**联合类型**和**交叉类型**。

联合类型一般适用于基本类型的"合并"，它使用`|`符号进行连接，如下：
```ts
type result = 'name' | 1 | true | null
```

而交叉类型则适用于对象或者函数的"合并"，它使用`&`符号进行连接，如下：
```ts
type result = T & U
```
`T & U`表示一个新的类型，其中这个类型包含`T`和`U`中所有的键，这和`JavaScript`中的`Object.assign()`函数的作用非常类似。

根据交叉类型的概念，我们可以封装一个合并对象的`merge`函数，如下：
```ts
function merge<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

const obj1 = { name: 'AAA' }
const obj2 = { age: 23 }
// 结果：{ name：'AAA'; age: 23; }
const resutl = merge(obj1, obj2)
```

## 初级
### 内置Pick(选取)
#### 用法
`Pick`表示从一个类型中选取指定的几个字段组合成一个新的类型，用法如下：
```ts
type Person = {
  name: string;
  age: number;
  address: string;
  sex: number;
}
// 结果: { name: string; address: string; }
type PickResult = Pick<Person, 'name' | 'address'>
```
#### 实现方式
```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
代码详解：
* `K extends keyof T`：表示`K`只能是`keyof T`的子类型，如果我们在使用`Pick`的时候传递了不存在于`T`的字段，会报错：
```ts
// 报错：phone无法分配给keyof T
type result = MyPick<Person, 'name' | 'phone'>
```


### 内置Readonly(只读)
#### 用法
`Readonly`是用来让所有属性变为只读，其用法为：
```ts
type Person = {
  readonly name: string;
  age: number;
}

// 结果：{ readonly name: string; readonly age: number; }
type ReadonlyResult = MyReadonly<Person>
```
#### 实现方式
```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### TupleToObject(元组转对象)
#### 用法
`TupleToObject<T>`是用来把一个元组转换成一个`key/value`相同的对象，例如：
```ts
const tuple = ['msg', 'name'] as const
// 结果：{ msg: 'msg'; name: 'name'; }
type result = TupleToObject<typeof tuple>
```
#### 实现方式
```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```
代码详解：
* `as const`：常用来进行常量断言，在此处表示将`['msg','name']`推导常量元组，表示其不能新增、删除、修改元素，可以使用`as readonly`来辅助理解。
* `T[number]`：表示返回所有数字型索引的元素，形成一个联合类型，例如：`'msg'|'name'`。

### First(数组第一个元素)
#### 用法
`First<T>`用来返回数组的第一个元素，用法如下：
```ts
// 结果：3
type result1 = First<[3, 2, 1]>
// 结果：never
type result2 = First<[]>
```
#### 实现方式
```ts
// 索引实现方式
type First<T extends any[]> = T extends [] ? never : T[0]
// 占位实现方式
type First<T extends any[]> = T extends [infer R, ...infer L] ? R : never
```
代码详解：
* `T extends []`：用来判断`T`是否是一个空数组。
* `T[0]`：根据下标取数组第一个元素。
* `infer R`： 表示数组第一个元素的占位。
* `...infer L`: 表示数组剩余元素的占位。

### Length(元组的长度)
#### 用法
`Length<T>`用来获取一个数组(包括类数组)的长度，用法如下：
```ts
// 结果：3
type result1 = Length<[1, 2, 3]>
// 结果：10
type result2 = Length<{ 5: '5', length: 10 }>
```
#### 实现方式
```ts
type Length<T extends any> = T extends { length: number; } ? T['length'] : never
```
代码详解：
* `T extends { length: number; }`：判断`T`是否是`{ length: number; }`的子类型，如果是则代表`T`为数组或者类数组。
* `T['length']`：取`T`对象的`length`属性的值(注意，在`TypeScript`中不能使用`T.length`来取值，而应该使用`T['length']`)。

### 内置Exclude(排除)
#### 用法
`Exclude`是排除的意思，它从`T`类型中排除属于`U`类型的子集，可以理解成取`T`对于`U`的差集，用法如下：
```ts
// 结果：'name'|'age'
type ExcludeResult = Exclude<'name'|'age'|'sex', 'sex'|'address'>
```
#### 实现方式
```ts
type MyExclude<T, U> = T extends U ? never : T
```
* `T extends U`：这段代码会从`T`的子类型开始分发，例如：
```ts
T extends U 
=> 'name'|'age'|'sex' extends 'sex'|'address'
=> (
  'name' extends 'sex'|'address' ? never : 'name' |
  'age' extends 'sex'|'address' ? never : 'age' |
  'sex' extends 'sex'|'address' ? never : 'sex'
)
=> 'name'|'age'
```

### PromiseType(promise包裹类型)
#### 用法
`PromiseType`是用来获取`Promise`包裹类型的，例如：
```ts
function getInfo (): Promise<string|number> {
  return Promise.resolve(1)
}
// 结果：(） => Promise<string|number>
type funcType = typeof getInfo
// 结果：Promise<string|number>
type returnResult = ReturnType<funcType>
// 结果：string|number
type PromiseResult = PromiseType<returnResult>
```
#### 实现方式
```ts
type PromiseType<T> =
  T extends Promise<infer R>
    ? R extends Promise<any>
      ? PromiseType<R>
      : R
    : never
```
代码详解：
* `T extends Promise<infer R>`：判断`T`是否是`Promise<infer R>`的子类型，也就是说`T`必须满足`Promise<any>`的形式。

### If(判断)
#### 用法
`If<C, T, F>`用来表示根据`C`的值来返回`T`或者`F`，如果`C`为`true`，则返回`T`；如果`C`为`false`，则返回`F`，例如：
```ts
// 结果：'a'
type result1 = If<true, 'a', 'b'>
// 结果：'b'
type result2 = If<false, 'a', 'b'>
```
根据上案例，我们可以直观的发现`If<C, T, F>`的作用有点类似`JavaScript`中的三元表达式：`C ? T : F`。
#### 实现方式
```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```
代码详解：
* `C extends boolean`：表示`C`为`boolean`类型的子类型，既`C`只能为`true`或者`false`，传递其它值报错。
* `C extends true`：如果用`JavaScript`来表示的话，相当于`C===true`.

### Concat(数组concat方法)
#### 用法
`Concat<T, U>`用来将两个数组合并起来，类似实现数组的`concat`方法，使用方式如下：
```ts
// 结果：[1, 2, 3, 4]
type result = Concat<[1, 2], [3, 4]>
```
#### 实现方式
```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```
代码详解：
* `T extends any[]`：用来限制`T`是一个数组，如果传递非数组会报错，`U`也是一样的道理。
* `[...T, ...U]`：可以理解成`JavaScript`的扩展运算符`...`。

### Includes(数组includes方法)
#### 用法
`Includes<T, U>`用来判断`U`是否在数组`T`中，类似实现数组的`includes`方法，用法如下：
```ts
// 结果：true
type result1 = Includes<[1, 2, 3], 1>
// 结果：false
type result2 = Includes<[1, 2, 3], '1'>
```
#### 实现方式
```ts
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

// 简单版
type MyIncludes<T extends readonly any[], U> = U extends T[number] ? true : false
// 完善版
type MyIncludes<T extends readonly any[], U> = 
  T extends [infer R, ...infer L]
    ? Equal<R, U> extends true
      ? true
      : MyIncludes<L, U>
    : false
```
代码详解：
* `T[number]`：它返回数组中所有数字类型键对应的值，将这些值构造成一个联合类型，例如：`1 | 2 | 3`。
* `U extends T[number]`：判断`U`是否是某个联合类型的子类型，例如：`1 extends 1 | 2 | 3`。
* `Equal`：是用来判断两个值是否相等的辅助方法。

### Push(数组push方法)
#### 用法
```ts
// 结果：[1, 2, 3, 4]
type result = Push<[1, 2, 3], 4>
```

#### 实现方式
```ts
// Push实现
type Push<T extends any[], K> = [...T, K]
```

### Shift和Unshift
与`pop`和`push`方法相似的另外一对方法叫`shift`和`unshift`，它们的实现思路是一样的。
#### 用法
```ts
// Shift结果：[2, 3]
type shiftResult = Shift<[1, 2, 3]>

// Unshift结果：[0, 1, 2, 3]
type unshiftResult = Unshift<[1, 2, 3], 0>
```
#### 使用方式
```ts
// Shift实现
type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : never

// Unshift实现
type Unshift<T extends any[], K> = [K, ...T]
```

### 内置Parameters(函数的参数类型)
#### 用法
`Parameters`是用来获取一个函数的参数类型的，其中获取的结果是一个元组，用法如下：
```ts
const add = (a: number, b: string): void => {}
// [number, string]
type result = MyParameters<typeof add>
```
#### 实现方式
```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : never
```

### 内置Partial(可填)和内置Required(必填)
#### 用法
`Partial`和`Required`一个是让所有属性可填、另外一个是让所有属性必填，用法如下：
```ts
type Person = {
  name: string;
  age?: number;
}

// 结果: { name?: string; age?: number; }
type PartialResult = MyPartial<Person>

// 结果: { name: string; age: number; }
type RequiredResult = MyRequired<Person> 
```
#### 实现方式
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
```


### 内置Record(构造)
#### 用法
`Record<K, T>`用来将`K`的每一个键(`k`)指定为`T`类型，这样由多个`k/T`组合成了一个新的类型，用法如下：
```ts
type keys = 'Cat'|'Dot'
type Animal = {
  name: string;
  age: number;
}
type Expected = {
  Cat: {
    name: string;
    age: number;
  };
  Dog: {
    name: string;
    age: number;
  }
}

// 结果：Expected
type RecordResult = Record<keys, Animal>
```
#### 实现方式
```ts
type MyRecord<k extends keyof any, T> = {
  [P in K]: T
}
```
代码详解：
* `k extends keyof any`：此代码表示`K`是`keyof any`任意类型其所有键的子类型，例如：
```ts
// K为 'Dog'|'cat'
type UnionKeys = 'Dog' | 'Cat'

// K为'name'|'age'
type Person = {
  name: string;
  age: number;
}
type TypeKeys = keyof Person
```

### 内置Extract(交集)
#### 用法
`Extract<T, U>`用来取联合类型`T`和`U`的交集，用法如下：
```ts
type Person = {
  name: string;
  age: number;
  address: string;
}

// 结果：'age'|'address'
type ExtractResult = Extract<keyof Person, 'age'|'address'|'sex'>
```
#### 实现方式
```ts
type MyExtract<T, U> = T extends U ? T : never
```
代码详解：
* `T extends U`：此代码会自动将`T`的子类型进行分发，例如：
```js
T extends U
=> 'name'|'age'|'address' extends 'age'|'address'|'sex' ? T : never
=> (
  'name' extends 'age'|'address'|'sex' ? 'name' : never |
  'age' extends 'age'|'address'|'sex' ? 'age' : never |
  'address' extends 'age'|'address'|'address' ? 'age' : never
)
=> 'age'|'address'
```


















## 中级

### 内置ReturnType(函数返回类型)
#### 用法
`ReturnType<T>`是用来获取一个函数的返回类型的，例如：
```js
function getRandom (): number {
  return Math.random()
}
// 结果：number
type result = ReturnType<typeof getRandom>
```
#### 实现方式
```ts
type ReturnType<T> = T extends (...args: any) => infer R ? R : never
```
代码详解：
* `T extends (...args: any) => infer R`：判断`T`类型是否是一个函数的子类型，既`T`是不是一个函数。
* `infer R`：表示待推导的函数返回类型为`R`，后续可以在表达式中使用`R`来代替真正的返回类型。

### 内置Omit(移除)
#### 用法
`Omit`是移除的意思，它用来在`T`类型中移除指定的字段，用法如下：
```ts
type Person = {
  name?: string;
  age: number;
  address: string;
}

// 结果：{ name？: string; age: number; }
type OmitResult = Omit<Person, 'address'>
```
#### 实现方式
`Omit`可以借助在上面已经实现过的`Pick`和`Exclude`配合来实现，如下：
```ts
// Omit实现
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>
```
代码详解：
* 使用`MyExclude<keyof T, K>`，可以从`T`中移除指定的字段，移除后得到一个新的联合类型：`'name'|'age'`
* 使用`MyPick<T, 'name'|'age'>`，可以从`T`中选取这两个字段，组合成一个新的类型。


### Readony(按需Readonly)
#### 用法
不同于初级实现中的`Readonly`，在中级实现的`Readonly`中，如果我们传递了指定的字段，那么`Readonly`会表现为按需实现`readonly`，用法如下。
```ts
interface Todo {
  title: string;
  desc?: string;
  completed: boolean;
}
interface Expected1 {
  readonly title: string;
  readonly desc?: string;
  readonly completed: boolean;
}
interface Expected2 {
  title: string;
  readonly desc?: string;
  readonly completed: boolean;
}

// 结果：Expected1
type ReadonlyResult1 = Readonly<Todo>
// 结果：Expected2
type ReadonlyResult2 = Readonly<Todo, 'desc'|'completed'>

// 测试：
const obj: ReadonlyResult2 = {
  title: 'AAA',
  desc: '23',
  completed: true
}
obj.title = 'aaa'
obj.desc = '32' // error
obj.completed = false // error
```
#### 实现方式
```ts
// ts v4.4+版本可直接用
type Readonly<T, K extends keyof T = keyof T> = T & {
  readonly [P in K]: T[P]
}
// ts v4.5+版本必须用
type Readonly<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P]
}
```
代码详解：
* `K extends keyof T = keyof T`：如要传递了`K`，那么只能是`T`中已经存在的属性，不存在则报错；如果不传递，则默认值为`keyof T`，意味着全部属性都添加`readonly`。
* `T & U`：在本例中表示将`T`和`U`中的字段结合起来，如果没有`&`，那么就丢失一些属性，例如`title`。

### DeepReadonly(深度Readonly)
#### 用法
`DeepReadonly`用来将一个嵌套对象类型中所有字段全部添加`readonly`关键词，例如：
```ts
// 类型：
type X = {
  b: string
  c: {
    d: boolean
    e: undefined,
    f: null
  }
}
// 结果：
type Y = {
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: undefined,
    readonly f: null
  }
}
```
#### 实现方式
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: any } ? DeepReadonly<T[P]> : T[P]
}
```
代码详解：
* `T[P] extends { [key: string]: any }`：这段表示`T[P]`是否是一个包含索引签名的字段，如果包含我们认为它是一个嵌套对象，就可以递归调用`DeepReadonly`。

### TupleToUnion(元组转联合类型)
#### 用法
`TupleToUnion`是用来将一个元组转换成联合类型的，其用法如下：
```ts
// 结果：'1' | '2' | '3'
type result = TupleToUnion<['1', '2', '3']>
```
#### 实现方式
```ts
// way1: T[number]
type TupleToUnion<T extends readonly any[]> = T[number]
// way2: 递归
type TupleToUnion<T extends readonly any[]> = 
  T extends [infer R, ...infer args]
    ? R | TupleToUnion<args>
    : never
```
代码详解：
* `T[number]`：它会自动迭代元组的数字型索引，然后将所以元素组合成一个联合类型。
* `R | TupleToUnion<args>`：R表示每一次迭代中的第一个元素，它的迭代过程可以用下面伪代码表示：
```ts
// 第一次迭代
const R = '1'
const args = ['2', '3']
const result = '1' | TupleToUnion<args>

// 第二次迭代
const R = '2'
const args = ['3']
const result = '1' | '2' | TupleToUnion<args>

// 第三次迭代
const R = '3'
const args = ['']
const result = '1' | '2' | '3'
```

### Chainable(可串联构造器)
#### 用法
`Chainable`是用来让一个对象可以进行链式调用的，用法如下：
```ts
type Expected = {
  foo: number
  bar: {
    value: string
  }
  name: string
}
declare const obj: Chainable<{}>
// 结果：Expected
const result = obj
  .options('foo', 123)
  .options('bar', { value: 'Hello' })
  .options('name', 'TypeScript')
  .get()
```
#### 实现方式
```ts
type Chainable<T> = {
  options<K extends string, V>(key: K, value: V): Chainable<T & {[k in K]: V}>
  get(): T
}
```
代码详解：
* `{[k in K]: V}`：每次调用`options`时，把`key/value`构造成一个对象，例如：`{ foo: 123 }`。
* `T & U`：此处使用到`&`关键词，用来合并`T`和`U`两个对象中的所有`key`。
* `Chainable<>`：递归调用`Chainable`，赋予新对象以链式调用的能力。

### Last(数组最后一个元素)
#### 用法
`Last`是用来获取数组中最后一个元素的，它和我们之前已经实现的`First`思路很相似。
```ts
// 结果：3
type result = Last<[1, 2, 3]>
```
#### 实现方式
`Last`的实现方式很巧妙，因为它既可以在索引上做文章来实现，也可以用占位的思想来实现。
```ts
// way1：索引思想
type Last<T extends any[]> = [any, ...T][T['length']]
// way2: 后占位思想
type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never
```
代码详解：
* `[any, ...T]`：此代码表示我们构建了一个新数组，并添加了一个新元素到第一个位置，然后把原数组`T`中的元素依次扩展到新数组中，可以用以下伪代码表示：
```ts
// 原数组
const T = [1, 2, 3]
// 新数组
const arr = [any, 1, 2, 3]
// 结果: 3
const result = arr[T['length']]
```
* `T['length']`：这里我们获取到的是原始`T`数组的长度，例如`[1, 2, 3]`，长度值为`3`。而在新数组中，索引为`3`的位置正好是最后一个元素的索引，通过这种方式就能达到我们的目的。
* `T extends [...infer R, infer L]`：这段代码表示，我们将原数组中最后一个元素使用`L`进行占位，而其它元素我们用一个`R`数组表示。这样，如果数组满足这种格式，就能正确返回最后一个元素的值。

### Pop(数组Pop方法)
继续沿用以上处理索引思想或占位的思想，我们能快速实现数组`pop`方法。
#### 用法
```ts
// 结果：[1, 2]
type result = Pop<[1, 2, 3]>
```
#### 实现方式
```ts
// Pop实现
type Pop<T extends any[]> =
  T extends []
    ? []
    : T extends [...infer Rest, infer L]
      ? Rest
      : never
```

### PromiseAll返回类型
#### 用法
`PromiseAll`是用来取`Promise.all()`函数所有返回的类型，其用法如下
```ts
// 结果：Promise<[number, number, number]>
type result = typeof PromiseAll([1, 2, Promise.resolve(3)])
```
#### 实现方式
与之前的例子不同，`PromiseAll`我们声明的是一个`function`而不是`type`。
```ts
type PromiseAllType<T> = Promise<{
  [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
}>
declare function PromiseAll<T extends any[]>(values: readonly [...T]): PromiseAllType<T>
```
代码详解：
* 因为`Promise.all()`函数接受的是一个数组，因此泛型`T`限制为一个`any[]`类型的数组。
* `PromiseAllType`的实现思路有点像之前的`PromiseType`，只不过这里多了一层`Promise`的包裹，因为`Promise.all()`的返回类型也是一个`Promise`。


### LookUp(查找)
#### 用法
`LookUp`是用来根据类型值查找类型的，其用法如下：
```ts
interface Cat {
  type: 'cat'
  color: 'black' | 'orange' | 'gray'
}
interface Dog {
  type: 'dog'
  color: 'white'
  name: 'wang'
}

// 结果：Dog
type result = LookUp<Cat | Dog, 'dog'>
```
#### 实现方式
```ts
type LookUp<
  U extends { type: string; },
  T extends string
> = U extends { type: T } ? U : never
```
代码详解：
* ` U extends { type: string; }`：这段代码限制`U`的类型必须是具有属性为`type`的对象。

### Trim、TrimLeft以及TrimRight
#### 用法
`Trim`、`TrimLeft`以及`TrimRight`这几个工具比较好理解，它们都是用来移除字符串中的空白符的。
```ts
const t1 = TrimLeft<' str'>  // 'str'
const t2 = Trim<' str '>     // 'str'
const t3 = TrimRight<'str '> // 'str'
```
#### 实现方式
```ts
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S
type Trim<S extends string> = S extends (`${Space}${infer R}` | `${infer R}${Space}`) ? Trim<R> : S
type TrimRight<S extends string> = S extends `${infer R}${Space}` ? TrimRight<R> : S
```
代码详解：
* `TrimLeft`和`TrimRight`的实现思路是相同的，区别在于空白符的占位出现在左侧还是右侧。
* `Trim`的实现就是把`TrimLeft`和`TrimRight`所做的事情结合起来。

### Capitalize(首字母大写)和Uncapatilize(首字母小写)
#### 用法
`Capitalize`是用来将一个字符串的首字母变成大写的，而`Uncapatilize`所做的事情跟它相反，其用法如下：
```ts
type t1 = Capitalize<'hello'>   // 'Hello'
type t2 = Uncapatilize<'Hello'> // 'hello'
```
#### 实现方式
```ts
type Capatilize<S extends string> = S extends `${infer char}${infer L}` ? `${Uppercase<char>}${L}` : S
type Uncapatilize<S extends string> = S extends `${infer char}${infer L}` ? `${Lowercase<char>}${L}` : S
```
代码详解：
* 无论是`Capatilize`还是`Uncapatilize`，它们都依赖内置的工具函数`Uppercase`或者`Lowercase`。对于`Capatilize`而言，我们只需要把首字母隔离出来，然后调用`Uppercase`即可。对于`Uncapatilize`而言，我们把首字母调用`Lowercase`即可。


### Replace和ReplaceAll
#### 用法
`Replace`是用来将字符串中第一次出现的某段内容，使用指定的字符串进行替换，而`和ReplaceAll`是全部替换，其用法如下：
```ts
// 结果：'foofoobar'
type t = Replace<'foobarbar', 'bar', 'foo'>
```
#### 实现方式
```ts
type Replace<
  S extends string,
  from extends string,
  to extends string
> = S extends `${infer L}${from}${infer R}`
      ? from extends ''
        ? S
        : `${L}${to}${R}`
      : S
```

### ReplaceAll
#### 用法
`ReplaceAll`是用来将字符串中指定字符全部替换的，其用法如下：
```ts
// 结果：'foofoofoo'
type t = ReplaceAll<'foobarbar', 'bar', 'foo'> 
```
#### 实现方式
```ts
type ReplaceAll<
  S extends string,
  from extends string,
  to extends string
> = S extends `${infer L}${from}${infer R}`
              ? from extends ''
                ? S
                : `${ReplaceAll<L, from, to>}${to}${ReplaceAll<R, from, to>}`
              : S
```

### AppendArgument(追加参数)
#### 用法
`AppendArgument`是用来向一个函数追加一个参数的，其用法如下：
```ts
//  结果：(a: number, b: number) => number
type result = AppendArgument<(a: number) => number, number>
```
#### 实现方式
```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never
```
代码详解：
* 我们首先利用`infer`关键词得到了`Fn`函数的参数类型以及返回类型，然后把新的参数添加到参数列表，并原样返回其函数类型。

### Permutation(排列组合)
#### 用法
`Permutation`是用来将联合类型中的每一个类型进行排列组合，其用法如下：
```ts
// 结果：['A', 'B'] | ['B', 'A']
type result = Permutation<'A' | 'B'>
```
#### 实现方式
```ts
type Permutation<T, U = T> = 
  [T] extends [never]
    ? []
    : T extends T
      ? [T, ...Permutation<Exclude<U, T>>]
      : never
```

代码详解：
* `[T] extends [never]`：这段代码主要是为了处理联合类型为空的情况。
* `T extends T`：这段代码主要是需要使用**分布式条件类型**这个知识点，当`T extends T`成立时，在其后的判断语句中，`T`代表当前迭代的类型。
* `<Exclude<U, T>`：因为此时的`T`代表当前迭代的类型，所以我们从原始联合类型中排除当前类型，然后递归调用`Permutation`。当`T`为`A`时，递归调用`Permutation<'B' | 'C'>`, 此时结果为`['A']` + `['B', 'C']` 或 `['A']` + `['C', 'B']`。

### LengthOfString(字符串的长度)
#### 用法
`LengthOfString`是用来计算一个字符串长度的，其用法如下：
```ts
type result = LengthOfString<'Hello'> // 5
```
#### 实现方式
```ts
type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer Char}${infer R}`
      ? LengthOfString<R, [...T, Char]>
      : T['length']
```
代码详解：
* 我们通过一个泛型的辅助数组来帮计算字符串的长度，在第一次符合条件时，将其第一个字符添加到数组中，在后续的递归过程中，如果不符合条件，直接返回`T['length']`，这个过程可以用如下代码表示：
```ts
// 第一次递归
const T = ['H'], S = 'hello', R = 'ello'
// 第二次递归
const T = ['H','e'], S = 'ello', R = 'llo'
// 第三次递归
const T = ['H','e','l'], S = 'llo', R = 'lo'
// 第四次递归
const T = ['H','e','l','l'], S = 'lo', R = 'o'
// 第五次递归
const T = ['H','e','l','l', 'o'], S = 'o', R = ''
```

### Flatten(数组降维)
#### 用法
`Flatten`是用来将多维数组进行降维的，其用法如下：
```ts
// 结果：[1, 2, 3]
type result = Flatten<[1, 2, [3]]>
```
#### 实现方式
```ts
type Flatten<
  T extends any[]
> = T extends [infer L, ...infer R]
      ? L extends any[]
        ? [...Flatten<L>, ...Flatten<R>]
        : [L, ...Flatten<R>]
      : []
```
代码详解：`Flatten`数组降维的主要思路是，遍历数组中的每一个元素，判断其是否为一个数组，如果是，则递归调用`Flatten`，进行降维。

### AppendToObject(对象添加新属性)
#### 用法
`AppendToObject`是用来向指定对象添加一个额外的属性(`key/value`)，其用法如下：
```ts
// 结果：{ id: number; name: string; }
type result = AppendToObject<{ id: number; }, 'name', string>
```
#### 实现方式
```ts
type basicKeyType = string | number | symbol
type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}
```
代码详解：
* `basicKeyType`：在`JavaScript`中，因为一个对象的属性只能是`string`、`number`或者`symbol`这三种类型，所以我们限定`K`必须满足此条件。
* `keyof T | K`：这里表示`keyof T`的联合类型和`K`，组合成一个新的联合类型。

### Absolute(绝对值)
#### 用法
`Absolute`是用来取一个数的绝对值的，其用法如下：
```ts
// 结果："531"
type result = Absolute<-531>
```
#### 实现方式
```ts
type NumberLike = number | string
type Absolute<T extends NumberLike> =  `${T}` extends `-${infer N}` ? N : `${T}`
```
代码详解：
* `NumberLike`：我们认为`'1'`和`1`都是一个合法的数字，所以定义一个辅助的`NumberList`联合类型。
* `${T}` extends `-${infer N}`：这里判断我们传递的数字是否为负数，如果是则直接取其正数部分，否则直接返回。

**注意**：这里说到的取绝对值，最后的结果之所以是一个字符串类型，是因为`TS`对递归次数有限制。如果你想要真正的数字类型，可以考虑实现一个`MakeArray`辅助方法，使用此方法可以将字符串类型的数字，转换成一个真正的数字类型，如下：
```ts
type MakeArray<N extends string, T extends any[] = []> =
  N extends `${T['length']}`
  ? T
  : MakeArray<N, [...T, 0]>

// 结果：3
type result = MakeArray<'3'>['length']
```

### StringToArray(字符串转数组)
#### 用法
`StringToArray`是用来将一个字符串转换成一个数组的，其用法如下：
```ts
// 结果：['h', 'e', 'l', 'l', 'o']
type result = StringToArray<'hello'>
```
#### 实现方式
```ts
type StringToArray<
  S extends string,
  U extends any[] = []
> = S extends `${infer Char}${infer R}`
      ? StringToArray<R, [...U, Char]>
      : U
```
代码详解：`StringToArray`的实现主要是使用了递归的思想，它每次拿到字符串中一个字符，然后存入一个辅助数组中，当字符串为空时，直接返回这个辅助数组。

### StringToUnion(字符串转联合类型)
#### 用法
在实现`StringToArray`后，我们能够很容易实现`StringToUnion`，其用法如下：
```ts
// 结果：'h' | 'e' | 'l' | 'l' | 'o'
type result = StringToUnion<'hello'>
```
#### 实现方式
```ts
// way1: 递归思想
type StringToUnion<
  S extends string
> = S extends `${infer Char}${infer R}`
      ? Char | StringToUnion<R>
      : never
// way2: 借用StringToArray
type StringToUnion<S extends string> = StringToArray<S>[number]
```
代码详解：`StringToArray<S>`返回的是一个数组，`T[number]`表示对一个数组进行数字类型索引迭代，其迭代结果是每个元素组合成的一个联合类型。

### Merge(类型合并)
#### 用法
`Merge`是用来合并两个类型，如果有重复的字段类型，则第二个的字段类型覆盖第一个的，其用法如下：
```ts
type Foo = {
  a: number;
  b: string;
}
type Bar = {
  b: number;
  c: boolean;
}

// 结果：{ a: number; b: number; c: boolean; }
type result = Merge<Foo, Bar>
```
#### 实现方式
```ts
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never
}
```
代码详解：
* `keyof F | keyof S`：这段代码的含义是将`F`和`S`这两个对象的键组合成一个新的联合类型。
* `P extends`：这里进行了两次`extends`判断，其中第二次不能直接写成`F[P]`，而应该多判断一次，当满足条件时才使用`F[P]`，这是因为`P`的类型判断无法作用于`:`符号后面。

### CamelCase(连字符字符串转小驼峰)
#### 用法
`CamelCase`是用来将连字符字符串转驼峰的，其用法如下：
```ts
// 结果：fooBarBaz
type result = CamelCase<'foo-bar-baz'>
```
#### 实现方式
```ts
type CamelCase<
  S extends string
> = S extends `${infer S1}-${infer S2}`
      ? S2 extends Capitalize<S2>
        ? `${S1}-${CamelCase<S2>}` 
        : `${S1}${CamelCase<Capitalize<S2>>}`
      : S
```
代码详解：`CamelCase`的实现，使用到了递归的思路，以上面例子为例：
```ts
type result = CamelCase<'foo-bar-baz'>

// 第一次递归调用 S满足${infer S1}-${infer S2} S2不满足extends Capitalize<S2>
S = 'foo-bar-baz' S1 = 'foo' S2 = 'bar-baz'

// 第二次递归调用 S满足${infer S1}-${infer S2} S2不满足extends Capitalize<S2>
S = 'Bar-baz' S1 = 'Bar' S2 = 'baz'

// 第三次递归调用 S不满足${infer S1}-${infer S2}
S = 'Baz'

// 结果：fooBarBaz
type result = 'foo' + 'Bar' + 'Baz' => 'fooBarBaz'
```

### KebabCase(字符串转连字符)
#### 用法
在实现`CamelCase`后，我们很容易能够实现`KebabCase`，它是用来将驼峰形式字符串，转成连字符形式字符串的，其用法如下：
```ts
// 结果：foo-bar-baz
type result = KebabCase<'FooBarBaz'>
```
#### 实现方式
```ts
type KebabCase<
  S extends string
> = S extends `${infer S1}${infer S2}`
      ? S2 extends Uncapitalize<S2>
        ? `${Uncapitalize<S1>}${KebabCase<S2>}`
        : `${Uncapitalize<S1>}-${KebabCase<S2>}`
      : S
```

### Diff(类型差异部分)
#### 用法
`Diff`是用来获取两个类型的不同部分的，其用法如下：
```ts
type Foo = {
  id: number;
  name: string;
  age: string;
}
type Bar = {
  name: string;
  age: string;
  gender: number;
}

// 结果：{ id: number; gender: number; }
type result = Diff<Foo, Bar>
```
#### 实现方式
```ts
type DiffKeys<T, U> = Exclude<keyof T | keyof U, keyof (T | U)>
type Diff<T, U> = {
  [k in DiffKeys<T, U>]: k extends keyof T ? T[k] : k extends keyof U ? U[k] : never
}
```
代码详解：
* `keyof Foo | keyof Bar`：这段代码是把`T`和`U`中的所有属性组合成一个新的联合类型。
* `keyof (T | U)`：这段代码是取`T`和`U`的公共属性。
* `Exclude<K1, K2>`：这段代码主要是用来从`K1`中排除`K2`，带入以上例子也就是排除掉所有公共属性。
* `Diff<T, U>`：在获取到`DiffKeys`后，就可以迭代的方式获取到每个属性`key`，它所对应的类型了。

### AnyOf(数组元素真值判断)
#### 用法
`AnyOf`用来判断数组元素，如果任意值为真，返回true；数组为空或者全部为false，才返回false，其用法如下：
```ts
// 结果：true
type result1 = AnyOf<[0, false, 0, { name: 'name' }]>
// 结果：false
type result2 = AnyOf<[0, '', false, [], {}]>
```
#### 实现方式
```ts
type FalseType = 0 | '' | false | [] | { [key: string]: never }
type AnyOf<T extends readonly any[]> = T[number] extends FalseType ? false : true
```
代码详解：因为我们就是要区分`true/false`，所以我们把所有为`false`的值全部列举出来，然后使用`T[number]`索引迭代，依次去跟`FalseType`比较。

### IsNever(是否是Never类型)
#### 用法
`IsNever`是用来判断是否为`never`类型，其用法如下：
```ts
// 结果：false
type result1 = IsNever<undefined>
// 结果：true
type result2 = IsNever<never>
```
#### 实现方式
```ts
type IsNever<T> = T[] extends never[] ? true : false
```

### IsUnion(是否联合类型)
#### 用法 
`IsUnion`是用来判断一个类型是否为联合类型的，其用法如下：
```ts
// 结果：true
type result1 = IsUnion<string|number|boolean>
// 结果：false
type result2 = IsUnion<string>
```
#### 实现方式
```ts
type IsUnion<T, U = T> =
  T extends T
  ? [Exclude<U, T>] extends [never]
    ? false
    : true
  : never
```
代码详解：上面的实现虽然代码不多，但可能无法一下子就弄明白，为了更好的理解这种实现方式，我们来看如下两个案例分析：
```ts
// 案例一
type T = string | number
step1: string | number extends string | number
step2: string extends string | number => [number] extends [never] => true
step3: number extends string | number => [string] extends [never] => true
step4: true | true
result: true

// 案例二
type T = string
step1: string extends string
step2: [never] extends [never] => false
result: false
```
根据之前我们学到的**分布式条件类型**知识，`T extends T`的时候，会把`T`进行子类型分发。

如案例一的`step3`、`step4`，在分发后会把每次迭代的结果联合起来，组合成最终的结果。

### ReplaceKeys(类型替换)
#### 用法
`ReplaceKeys`是用来在一个类型中，使用指定的Y类型来替换已经存在的T类型的，其用法如下：
```ts
// 结果：{ id: number; name: boolean; }
type result = ReplaceKeys<{ id: number; name: string; }, 'name', { name: boolean; }>
```
#### 实现方式
```ts
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]:
    P extends T
      ? P extends keyof Y
        ? Y[P]
        : never
      : U[P]
}
```

### RemoveIndexSignature(移除索引签名)
#### 用法
`RemoveIndexSignature`是用来移除一个类型中的索引签名的，其用法如下：
```ts
type Foo = {
  [key: string]: any;
  foo(): void;
}

// 结果：{ foo(): void; }
type result = RemoveIndexSignature<Foo>
```
#### 实现方式
```ts
type NeverIndex<P> = string extends P ? never : number extends P ? never : P
type RemoveIndexSignature<T> = {
  [P in keyof T as NeverIndex<P>]: T[P]
}
```
代码详解：
* `NeverIndex`：因为索引签名有一个特点，为`string`或者`number`类型，所以我们通过`string extends P`或者`number extends P`的形式排除此索引签名。
* `as NeverIndex<P`：在之前的案例中，我们介绍过`as`的用法，在这里有**加工**或**再次断言**的意思。在使用`in`操作符进行迭代时，对每一个`P`再使用`NeverIndex`加工一下，如果是索引签名，这里的结果为`never`，为`never`时表示跳过当前迭代，进而达到排除索引签名的目的。

### PercentageParser(百分比解析)
#### 用法
`PercentageParser`是用来解析百分比字符串的，其用法如下：
```ts
type result1 = PercentageParser<'+85%'> // ['+', '85', '%']
type result2 = PercentageParser<'-85%'> // ['-', '85', '%']
type result3 = PercentageParser<'85'>   // ['', '85', '']
```

#### 实现方式
```ts
type CheckPrefix<S extends string> = S extends '+' | '-' ? S : never
type CheckSuffix<S extends string> = S extends `${infer L}%` ? [L, '%'] : [S, '']

type PercentageParser<S extends string> = 
  S extends `${CheckPrefix<infer L>}${infer R}`
    ? [L, ...CheckSuffix<R>]
    : ['', ...CheckSuffix<S>]
```

代码详解：
* `CheckPrefix`是用来处理百分比字符串前面的符号的，如果存在`+`或者`-`，则原样返回，如果不存在则返回`never`，表示没有符号。
* `CheckSuffix`是用来处理百分比字符串后面的百分比符号的，如果存在，则返回一个数组(最后一项固定为百分比符号)；如果不存在，则返回的数组最后一个元素固定为空字符串。

### DropChar(移除字符)
#### 用法
`DropChar`是用来在字符串中移除指定字符的，其用法如下：
```ts
// 结果：butterfly!
type result = DropChar<' b u t t e r f l y ! ', ' '>
```
#### 实现方式
```ts
type DropChar<
  S extends string,
  C extends string
> = C extends ''
  ? S
  : S extends `${infer L}${C}${infer R}`
    ? DropChar<`${L}${R}`, C>
    : S
```
代码详解：`DropChar`和`ReplaceAll`的实现思路非常相似，首先需要判断待移除的字符是不是空字符串，如果是，则直接返回原始字符串；如果不是，先判断字符串中是否包含待移除的字符，包含则递归调用；不包含则直接返回原始字符串。

### MinusOne(减一)
`MinusOne`是用来实现数字减一的，其用法如下：
#### 用法
```ts
// 结果：99
type result = MinusOne<100>
```

#### 实现方式
```ts
type MinusOne<
  N extends number,
  T extends any[] = []
> = N extends T['length']
  ? T extends [infer F, ...infer Rest]
    ? Rest['length']
    : never
  : MinusOne<N, [0, ...T]>
```

代码详解：在实现`MinusOne`的时候，借用了一个空数组，首先判断数组的长度是否等于传递的数字`N`，如果相等则从数组中随意移除一位，然后返回剩下数组的长度即可；如果不相等，则往数组中添加一个元素，再递归调用`MinusOne`。

**注意**：由于`TS`在递归调用时存在最大递归调用次数，所以对于比较大的数字会提示错误。

### PickByType(根据类型选取)
#### 用法
`PickByType`是用来根据类型选取属性的，其用法如下：
```ts
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}
// 结果：{ isReadonly: boolean, isEnable: boolean }
type result = PickByType<Model, boolean>
```
#### 实现方式
```ts
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
```
代码详解：`PickByType`的实现，可以使用`as`进行第二次断言，当类型满足时就返回当前迭代的`P`，不满足类型时就返回`never`，因为`never`最后会被排除，所以最后的迭代结果只有满足类型的键。

### StartsWith(字符串startsWith方法)
#### 用法
`StartsWith`是用来实现`JavaScript`中字符串的`startsWith`功能，其用法如下：
```ts
// 结果：true
type result = StartsWith<'abc', 'ab'>
```
#### 实现方式
```ts
type StartsWith<
  S extends string,
  C extends string
> = S extends `${C}${string}` ? true : false
```

### EndsWith(字符串endsWith方法)
#### 用法
`EndsWith`是用来实现`JavaScript`中字符串的`endsWith`功能，其用法如下：
```ts
// 结果：true
type result = endsWith<'abc', 'bc'>
```
#### 实现方式
```ts
type EndsWith<
  S extends string,
  C extends string
> = S extends `${string}${C}` ? true : false
```

### PartialByKeys(按需可选)
#### 用法
`PartialByKeys`是用来实现按需可选的，其用法如下：
```ts
interface User {
  name: string
  age: number
  address: string
}
interface UserPartialName {
  name?: string,
  age: number
  address: string 
}

// 结果：UserPartialName
type result = PartialByKeys<User, 'name'>
```
#### 实现方式
```ts
type CopyKeys<T> = {
  [P in keyof T]: T[P]
}
type PartialByKeys<
  T,
  K extends keyof any = keyof T
> = CopyKeys<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>
```
代码详解：
* `Pick`部分：首先取`keyof T`和`K`的交集，然后使用`Pick`从`T`中选取交集的`key`组成一个新类型，最后给新类型添加可选。
* `Omit`部分：根据之前介绍的`Omit`的知识，`Omit<T, K>`表示从`T`中剔除含有`K`的类型。
* `CopyKeys`部分：如果不使用`CopyKeys`，最后的结果为`T & U`形式，它实际上与使用`CopyKeys`的结果是一样的。这里使用`CopyKeys`，很大程度上是为了测试。
```ts
// 使用CopyKeys，结果为true；不使用，结果为false
type result1 = Equal<PartialByKeys<User, 'name'>, UserPartialName>
```

### RequiredByKeys(按需必填)
在实现`PartialByKeys`后，很容易按照相同的思路去实现`RequiredByKeys`。
#### 用法
`RequiredByKeys`是用来实现按需必填的，其用法如下：
```ts
interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string 
}

// 结果：UserRequiredName
type result = RequiredByKeys<User, 'name'>
```

#### 实现方式
```ts
type CopyKeys<T> = {
  [P in keyof T]: T[P]
}
type RequiredByKeys<
  T,
  K extends keyof any = keyof T
> = CopyKeys<Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>
```
代码详解：实现思路参考`PartialByKeys`。

### Mutable(可改)
#### 用法
`Mutable`是用来让所有属性变为可改的(移除`readonly`关键词)，其用法为：
```ts
type Person = {
  readonly name: string;
  age: number;
}
// 结果：{ name: string; age: number; }
type MutableResult = MyMutable<Person>
```
#### 实现方式
```ts
type MyMutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```
代码解读：
* `-readonly`：表示把`readonly`关键词去掉，去掉之后此字段变为可改的。

### OmitByType(按类型移除)
`OmitByType`的实现思路和`PickByType`类似。
#### 用法
`OmitByType`是用来按照类型移除的，其用法如下：
```ts
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}
interface ModelOmitBoolean {
  name: string;
  count: number
}

// 结果：ModelOmitBoolean
type result = OmitByType<Model, boolean>
```

#### 实现方式
```ts
type OmitByType<T, U> = {
  [P in keyof T as U extends T[P] ? never : P]: T[P]
}
```
代码解析：实现思路参考`PickByType`。

### ObjectEntries
#### 用法
`ObjectEntries`是用来实现`JavaScript`中的`Object.entries()`方法，其用法如下：
```ts
interface Model {
  name: string;
  age: number;
  locations?: string[] | null;
}
type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

// 结果：ModelEntries
type result = ObjectEntries<Model>
```
#### 实现方式
```ts
type ObjectEntries<T, U = Required<T>> = {
  [P in keyof U]: [P, U[P]]
}[keyof U]
```
代码详解：借助`U`类型，然后对其`Required`是为了去掉可选类型，`U[keyof U]`表示取出`U`中键的类型组成的联合类型。

### TupleToNestedObject(元组转嵌套对象)
#### 用法
`TupleToNestedObject`是用来将元组转成嵌套对象的，其用法如下：
```ts
// 结果：{ a: { b: string; } }
type result = TupleToNestedObject<['a', 'b'], string>
```
#### 实现方式
```ts
type TupleToNestedObject<T extends any[], U> =
  T extends [infer F, ...infer R]
    ? F extends string
      ? { [P in F]: TupleToNestedObject<R, U> }
      : never
    : U
```

### Reverse
#### 用法
`Reverse`是用来实现数组的`reverse()`方法的，其用法如下：
```ts
// 结果：['b', 'a']
type result = Reverse<['a', 'b']>
```
#### 实现方式
```ts
type Reverse<T extends any[]> =
  T extends [...infer R, infer L]
    ? [L, ...Reverse<R>]
    : []
```

### FlipArguments(反转函数参数)
借助上面的`Reverse`方法，可以很容易实现函数参数的反转。
#### 用法
`FlipArguments`是用来实现函数参数反转的，其用法如下：
```ts
// 结果：(a: number, b: string) => string | number
type result = FlipArguments<(a: string, b: number) => string | number>
```
#### 实现方式
```ts
type FlipArguments<T> = 
  T extends (...args: infer A) => infer R
    ? (...args: Reverse<A>) => R
    : never
```

### FlattenDepth(数组按深度降维)
#### 用法
`FlattenDepth`是用来按深度进行数组降维的，其用法如下：
```ts
// 结果：
type result = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>
```
#### 实现方式
```ts
type FlattenDepth<
  T extends any[],
  D extends number = 1,
  U extends any[] = []
> = T extends [infer F, ...infer R]
  ? U['length'] extends D
    ? T
    : F extends any[]
      ? [...FlattenDepth<F, D, [0, ...U]>, ...FlattenDepth<R, D>]
      : [F, ...FlattenDepth<R, D, U>]
    : T
```
代码详解：`FlattenDepth`的实现思路和`Flatten`基本一直，区别是按深度降维时需要一个数组去记录降维的次数。

### BEM
#### 用法
`BEM`是用来将字符串连接成CSS BEM格式的，其用法如下：
```ts
// 结果：'btn--price__small' | 'btn--price__mini' 
type result = BEM<'btn', ['price'], ['small', 'mini']>
```
#### 实现方式
```ts
type ArrayToString<
  T extends any[],
  P extends string
> = T extends [] ? '' : `${P}${T[number]}`
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${ArrayToString<E, '__'>}${ArrayToString<M, '--'>}`
```
代码详解：实现`BEM`的思路并不复杂，只需要记住如下两个知识点：
* 判断是一个空数组，可以使用`T extends []`或者`T['length'] extends 0`。
* `T[number]`会自动迭代数组，例如：
```ts
// 结果: 'A_B' | 'A_C' | 'A_D'
type result = `A__${['B', 'C', 'D'][number]}`
```

### InOrderTraversal(中序遍历)
**先序遍历**：先访问根节点，然后访问左节点，最后访问右节点。
**中序遍历**：先访问左节点，然后访问根节点，最后访问右节点。
**后序遍历**：先访问左节点，然后访问右节点，最后访问根节点。
#### 用法
`InOrderTraversal`是用来实现二叉树中序遍历的，其用法如下：
```ts
const tree = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
}

// 结果: [1, 3, 2]
type result = InOrderTraversal<typeof tree>
```
#### 实现方式
```ts
// 一个二叉树节点
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
// way1:
type InOrderTraversal<
  T extends TreeNode | null,
  U extends TreeNode = NonNullable<T>
> = T extends TreeNode
  ? [...InOrderTraversal<U['left']>, U['val'], ...InOrderTraversal<U['right']>]
  : []

// way2:
type InOrderTraversal<T extends TreeNode | null> = 
  T extends TreeNode
    ? T['left'] extends TreeNode
      ? [...InOrderTraversal<T['left']>, T['val'], ...InOrderTraversal<T['right']>]
      : T['right'] extends TreeNode
        ? [T['val'], ...InOrderTraversal<T['right']>]
        : [T['val']]
    : []
```
**注意**：如果以上代码在编辑器中提示**类型实例化过深，且可能无限**这是正常现象，因为`TypeScript`对于递归的次数是有限制的。

### FlipObject(对象键值交换)
#### 用法
`FlipObject`是用来将对象的键值交换的，其用法如下：
```ts
// 结果：{ pi: 'a' }
type result = FlipObject<{ a: 'pi' }>
```
#### 实现方式
```ts
type BasicType = string | number | boolean
type FlipObject<T extends Record<string, BasicType>> = {
  [P in keyof T as `${T[P]}`]: P
}
```

### Fibonacci(斐波那契数列)
**菲波那切数列**：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
#### 用法
`Fibonacci`是用来实现菲波那切数列的，用法如下：
```ts
type result = Fibonacci<5>
```
#### 实现方式
```ts
type Fibonacci<
  T extends number,
  Index extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = Index['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...Index, 1], Current, [...Prev, ...Current]>
```

### AllCombinations(全排列)
#### 用法
`ALlCombitation`是用来列举全部排列组合可能性的，其用法如下：
```ts
// 结果：'' | 'A' | 'AB' | 'B' | 'BA'
type result = AllCombination<'AB'>
```
#### 实现方式
```ts
type StringToUnion<S extends string> =
  S extends `${infer F}${infer R}`
    ? F | StringToUnion<R>
    : never
type Combination<
  S extends string,
  U extends string = '',
  K = S
> = [S] extends [never]
  ? U
  : K extends S
    ? Combination<Exclude<S, K>, U | `${U}${K}`>
    : U
type AllCombination<S extends string> = Combination<StringToUnion<S>>
```
代码详解：
* `StringToUnion`是用来将字符串变成一个联合类型的，例如：
```ts
// 结果： 'A' | 'B'
type result = StringToUnion<'AB'>
```
* `Combination`是用来将联合类型进行排列组合的，以以上`'A' | 'B'`这个联合类型为例，步骤如下：
```ts
// 第一步：从'A' | 'B这个联合类型中排除当前迭代的字符'A'
K = 'A' S = 'A' | 'B'  => Exclude<'A' | 'B', 'A'>
// 第一步子递归：
Combination<'B', '' | 'A'> => '' | 'A' | `${'' | 'A'}B` => '' | 'A' | 'B' | 'AB'

// 第二步：从'A' | 'B'这个联合类型中排除当前迭代的字符'B'
K = 'B' S = 'A' | 'B' => Exclude<'A' | 'B', 'B'>
// 第二步子递归：
Combination<'A', '' | 'B'> => '' | 'B' | `${'' | 'B'}A` => '' | 'B' | 'A' | 'BA'

// 结果：剔除相同元素
result = '' | 'A' | 'AB' | 'B' | 'BA' 
```

### GreaterThan(大于)
#### 用法
`GreaterThan<T, N>`是来用判断正整数T是否大于正整数N的，其用法如下：
```ts
// 结果：true
type result = GreaterThan<2, 1>
```
#### 实现方式
```ts
type GreaterThan<
  T extends Number,
  N extends Number,
  R extends any[] = []
> = T extends R['length']
    ? false
    : N extends R['length']
      ? true
      : GreaterThan<T, N, [...R, 0]>
```
代码详解：使用一个空数组来辅助，每次递归添加一个元素，如果正整数`T`先等于这个数组的长度，则为`false`；如果正整数`N`先等于这个数组的长度，则为`true`。

### Zip(按位置匹配)
#### 用法
`Zip`是用来将两个元组按照相同索引位置组合成一个新数组的，用法如下：
```ts
// 结果：[[1, true], [2, false]]
type result = Zip<[1, 2], [true, false]>
```
#### 实现方式
```ts
type Zip<
  T extends readonly any[],
  U extends readonly any[]
> = T extends [infer First, ...infer Rest]
    ? U extends [infer Head, ...infer Tail]
      ? [[First, Head], ...Zip<Rest, Tail>]
      : []
    : []
```

### IsTuple(是否为元组)
#### 用法
`IsTuple`是用来判断是否为一个元组的，用法如下：
```ts
// 结果：true
type result = IsTuple<[number]>
```
#### 实现方式
```ts
type IsTuple<T> =
  [T] extends [never]
    ? false
    : T extends readonly any[]
      ? number extends T['length']
        ? false
        : true
      : false
```
代码解析：以上代码中，比较关键的代码是`number extends T['length']`，这里不能写成`T['length'] extends number`，如下：
```ts
// 第一种方式
number extends T['length']
=> number extends 1
=> false

// 第二种方式
T['length'] extends number
=> 1 extends number
=> true
```

### Chunk(lodash分割数组)
[Lodash Chunk](https://www.lodashjs.com/docs/lodash.chunk): 将一个数组分割成长度为N的多个小数组。
#### 用法
```ts
// 结果：[[1, 2], [3, 4]]
type result = Chunk<[1, 2, 3, 4], 2>
```
#### 实现方式
```ts
type Chunk<
  T extends any[],
  Size extends number,
  R extends any[] = []
> = R['length'] extends Size
  ? [R, ...Chunk<T, Size>]
  : T extends [infer F, ...infer L]
    ? Chunk<L, Size, [...R, F]>
    : R['length'] extends 0
      ? []
      : [R]
```
代码详解：实现`Chunk`大体思路是：借助一个辅助空数组，在遍历数组时往这个辅助数组中添加元素，一直到等于指定长度，然后进行下一次相同操作。


### Fill(数组fill方法)
实现`Fill`时，不考虑索引，全部替换。
#### 用法
```ts
// 解雇：[true, true, true]
type result = Fill<[1, 2, 3], true>
```
#### 实现方式
```ts
type Fill<
  T extends any[],
  U
> = T extends [any, ...infer Rest]
    ? [U, ...Fill<Rest, U>]
    : []
```

### Without(移除)
`Without<T, F>`，其中`T`需要是数组形式，`F`可以是一个数字或者一个数组。
#### 用法
`Without`是用来从数组中移除指定元素的，其用法如下：
```ts
// 结果：
type result = Without<[1, 2, 1, 2, 3], [1, 2]>
```
#### 实现方式
```ts
type ToUnion<T> = T extends any[] ? T[number] : T
type Without<
  T extends any[],
  F,
  U = ToUnion<F>,
  R extends any[] = []
> = T extends [infer First, ...infer Rest]
    ? First extends U
      ? Without<Rest, F, U, [...R]>
      : Without<Rest, F, U, [...R, First]>
    : R
```
代码详解：因为`F`支持单数字和数组，所以定义一个`ToUion`来统一处理成联合类型。随后直接遍历数组，如果当前迭代的元素在联合类型中，则直接跳过进行下一次迭代；否则，把当前迭代元素添加到`R`辅助数组中。

### Trunc(数学trunc取整)
#### 用法
`Trunc`是用来实现`Math.trunc()`方法的，其用法如下：
```ts
// 结果：100
type result = Trunc<100.32>
```
#### 实现方式
```ts
type Trunc<T extends number | string> = `${T}` extends `${infer L}.${string}` ? L : `${T}`
```

### IndexOf(数组indexOf方法)
#### 用法
`IndexOf`是用来实现数组`indexOf`方法的，其用法如下：
```ts
// 结果：2
type result = IndexOf<[1, 2, 3, 4], 3>
```
#### 实现方式
```ts
type IndexOf<
  T extends any[],
  U,
  Index extends any[] = []
> = T extends [infer First, ...infer Rest]
    ? First extends U
      ? Index['length']
      : IndexOf<Rest, U, [...Index, 0]>
    : -1
```

### Join(数组join方法)
#### 用法
`Join`是用来实现数组`join`方法的，其用法如下：
```ts
// 结果：'a-p-p-l-e'
type result = Join<['a', 'p', 'p', 'l', 'e'], '-'>
```
#### 实现方式
```ts
type Join<
  T extends any[],
  U extends string | number,
  R extends string = ''
> = T extends [infer First, ...infer Rest]
    ? Rest['length'] extends 0
      ? `${R extends '' ? '' : `${R}${U}`}${First&string}`
      : Join<Rest, U, `${R extends '' ? '' : `${R}${U}`}${First&string}`>
    : R
```

### LastIndexOf(数组lastIndexOf方法)
#### 用法
`LastIndexOf`是用来实现数组`lastIndexOf`方法的，其用法如下：
```ts
// 结果：3
type result = LastIndexOf<[1, 2, 3, 4, 5], 4>
```
#### 实现方式
```ts
type Pop<T extends any[]> = T extends [...infer Rest, any] ? Rest : never
type LastIndexOf<
  T extends any[],
  U,
  Index extends any[] = Pop<T>
> = T extends [...infer Rest, infer Last]
    ? Last extends U
      ? Index['length']
      : LastIndexOf<Rest, U, Pop<Index>>
    : -1
```

### Unique(数组去重)
#### 用法
`Unique`是用来实现数组去重的，其用法如下：
```ts
// 结果：[1, 2, 3]
type result = Unique<[1, 1, 2, 2, 3, 3]>
```
#### 实现方式
```ts
type Unique<
  T extends any[],
  R extends any[] = []
> = T extends [infer First, ...infer Rest]
    ? First extends R[number]
      ? Unique<Rest, [...R]>
      : Unique<Rest, [...R, First]>
    : R
```

### MapTypes(类型转换)
#### 用法
`MapTypes`是用来根据指定类型进行替换的，其用法如下：
```ts
// 结果：{ type: number; age: number; }
type result = MapTypes<{ type: string; age: number; }, { mapFrom: string;mapTo: number; }>
```
#### 实现方式
```ts
type GetMapType<
  T, 
  R,
  Type = R extends { mapFrom: T, mapTo: infer To } ? To : never
> = [Type] extends [never] ? T : Type
type MapTypes<T, R> = {
  [P in keyof T]: GetMapType<T[P], R>
}
```
代码详解：在以上的实现中，最核心的代码是获取`Type`类型。
* `R extends { mapFrom: T, mapTo: infer To }`：这段代码表示，`R`是不是右边的子类型，我们以以上案例来说明：
```ts
// 当P = 'type'时，
T[P] = string, R = { mapFrom: string;mapTo: number; }
=> { mapFrom: string; mapTo: number; } extends { mapFrom: string, mapTo: infer To }
=> To = number
=> { type: number }

// 当P = 'age'时
T[P] = number, R = { mapFrom: string;mapTo: number; }
=> { mapFrom: string; mapTo: number; } extends { mapFrom: number, mapTo: infer To }
=> never
=> GetMapType<T[P], R> = number
=> { age: number } 
```

## 困难

### Currying(柯里化)
在`JavaScript`中`Currying`是用来实现函数柯里化的，其用法如下：
```js
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```
#### 用法
`Currying`是用来实现`JavaScript`中的柯里化的，其用法如下：
```js
const func = Currying((a: number, b: string, c: boolean) => true)
// (a: string) => (a: number) => (a: boolean) => true
type funcType = typeof func
```
#### 实现方式
```js
type Curry<P, R> =
  P extends []
    ? () => R
    : P extends [infer First, ...infer Rest]
      ? (a: First) => Rest['length'] extends 0 ? R : Curry<Rest, R>
      : R
declare function Currying<F>(fn: F): F extends (...args: infer P) => infer R ? Curry<P, R> : never
```

### UnionToIntersection(元组取交集)
在实现`UnionToIntersection`之前，我们先来回顾一下`TS`中`&`符号的作用：
```ts
// 结果：never
type result1 = 1 & 'foo' & true
// 结果：{ a: number; b: number; c: boolean; }
type result2 = { a: number; b: number; } & { b: string | number; c: boolean; }
// 结果：(a: boolean | number) => string
type result3 = ((a: boolean) => string | number) & ((a: number) => string)
```
案例解析：
* 案例一：因为`1`、`foo`以及`true`，没有交集部分，所以这里结果为`never`。
* 案例二：对于`a`和`c`属性而言，它们只存在于自身类型，所以交集部分是自身；对于`b`属性而言，它在两个类型中都存在，且其属性的类型存在交集部分，既：`number`。
* 案例三：对于函数的交叉类型，我们从函数参数、函数返回值这两个部分来说明。对于函数参数而言，取其联合类型；对于函数返回值而言，取其交叉类型。

从以上几个案例中可以看出，`TS`中的`&`符号是取交集的意思，也叫**交叉类型**。

#### 用法
`UnionToIntersection`所做的事情和`&`符号是一样的，其用法如下：
```ts
// 结果：never
type result1 = UnionToIntersection<1 | 'foo' | true>
// 结果：{ a: number; b: number; c: boolean; }
type result2 = UnionToIntersection<{ a: number; b: number; } | { b: string | number; c: boolean; }>
// 结果：(a: boolean | number) => string
type result3 = UnionToIntersection<((a: boolean) => string | number) | ((a: number) => string)>
```
#### 实现方式
```ts
type UnionToIntersection<U> = 
  (U extends any 
    ? (x: U) => any 
    : never
  ) extends (x: infer V) => any 
    ? V
    : never
```
代码详解：
* `U extends any ? X : Y`： 这里把`U`类型处理成`(x: U) => any`的函数类型。
* `T extends (x: infer V) => any ? V : never`：这里的`T`就是上一步的函数类型，如果`extends`成立，则返回`V`，此时的`V`必然满足`U & V`。

### RequiredKeys(所有必填字段)
#### 用法
`RequiredKeys`是用来返回一个类型中所有必填字段，其用法如下：
```ts
type Person = {
  name: string;
  age: number;
  sex?: undefined;
  address?: string;
}

// 结果：'name' | 'age'
type result = RequiredKeys<Person>
```
#### 实现方式
```ts
type RequiredKeys<T> = {
  [P in keyof T]: T extends Record<P,T[P]> ? P : never
}[keyof T]
```
代码详解：
* `T extends Record<P,T[P]>`：`Record`之前已经实现过，这里不在赘述，理解这段代码，可以参考如下案例：
```ts
// 第一步 P = 'name'
T extends { name: string; } => 'name'
// 第二步 p = 'age'
T extends { age: number; } => 'age'
// 第三步 p = 'sex'
T extends { sex?: undefined; } => never
// 第四步 p = 'address'
T extends { address?: string; } => never
```
在经过以上四个步骤后，得到的新类型为：
```ts
type T = {
  name: 'name';
  age: 'age';
  sex?: never;
  address?: never;
}
```
* `T[keyof T]`：`keyof T`得到所有的属性，然后根据属性取其类型。
```ts
// keyof T的结果
type P = 'name' | 'age' | 'sex' | 'address'

// T[P]的结果，类型为never自动过滤
type result = 'name' | 'age' | never | never => 'name' | 'age'
```

### GetRequired(必填字段组成的类型)
#### 用法
`GetRequired`是用来取一个类型中那些由必填字段组成的一个新类型的，其用法如下：
```ts
type Person = {
  name?: string;
  age: number;
  address?: string;
  sex: undefined;
}

// 结果：{ age: number; sex: undefined; }
type result = GetRequired<Person>
```
#### 实现方式
在`RequiredKeys`的基础上，能够很容易的实现`GetRequired`。
```ts
type GetRequired<T> = {
  [P in RequiredKeys<T>]: T[P]
}
```

### OptionalKeys(所有可选字段)
`OptionalKeys`和`RequiredKeys`所做的事情相反，其获取的是所有可选字段。
#### 用法
```ts
type Person = {
  name: string;
  age: number;
  sex?: undefined;
  address?: string;
}

// 结果：'sex' | 'address'
type result = OptionalKeys<Person>
```
#### 实现方式
```ts
type OptionalKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? never : P
}[keyof T]
```
代码详解：从上面代码中可以看出，它和`RequiredKeys`实现思路是一样的，区别只是在`extends`关键词后面的处理不同。

### GetOptional(可选字段组成的类型)
#### 用法
在实现了`OptionalKeys`后，我们来实现其对应的`GetOptional`，其对应方法使用方式如下：
```ts
type Person = {
  name: string;
  age: number;
  sex?: undefined;
  address?: string;
}

// 结果：{ sex?: undefined; address?: string; }
type result = GetOptional<Person>
```
#### 实现方式
```ts
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P]
}
```

### CapitalizeWords(所有单词首字母大写)
#### 用法
`CapitalizeWords`是用来把一个字符串中所有单词，变为大写字母的，其中这个字符串以固定的分隔符分割，用法如下：
```ts
// 结果：'Foobar'
type t1 = CapitalizeWords<'foobar'>
// 结果：'Foo Bar.Hello,World'
type t2 = CapitalizeWords<'foo bar.hello,world'>
```
#### 实现方式
```ts
type CapitalizeWords<
  S extends string,
  R extends string = ''
> =  S extends `${infer left}${infer split}${infer right}`
      ? split extends ' ' | '.' | ','
         ? CapitalizeWords<Capitalize<right>, `${R}${left}${split}`>
         : CapitalizeWords<right, `${R}${left}${split}`>
      : Capitalize<`${R}${S}`>
```
代码详解：在以上实现方法中，我们借用辅助字符串来实现，以第二个例子为例，详细解析分析如下：
```ts
// 第一次迭代
R = '' left = 'f' split = 'o' right = 'oo bar.hello,world'
split不满足条件，递归调用

// 第二次迭代
R = 'fo' left = 'o' split = ' ' right = 'bar.hello,world'
split满足条件，递归调用

// 第三次迭代
R = 'foo ' left = 'b' split = 'a' right = 'r.hello,world'
split不满足条件，递归调用

... 省略

// 最后一次迭代
R = 'foo Bar.Hello,Worl' S = 'd'
S不满足条件

最后结果：R + S = Capitalize<'foo Bar.Hello,worl' + 'd'> => 'Foo Bar.hello,world'
```

### CamelCase(下划线字符串转小驼峰)
#### 用法
与**中级**章节实现不同，此章节中`CamelCase`是用来将下划线字符串转小驼峰的，其用法如下：
```ts
// 结果：'fooBarHelloWorld'
type result = CamelCase<'foo_bar_hello_world'>
```
#### 实现方式
```ts
type CamelCase<
  S extends string
> = S extends `${infer left}_${infer char}${infer right}`
      ? `${Lowercase<left>}${Uppercase<char>}${CamelCase<right>}`
      : Lowercase<S>
```

### ParsePrintFormat(获取字符串格式化参数)
#### 用法
`ParsePrintFormat`是用来获取字符串格式化参数的，其用法如下：
```ts
// 参数映射表
type ControlMap = {
  'c': 'char',
  's': 'string',
  'd': 'dec',
  'o': 'oct',
  'h': 'hex',
  'f': 'float',
  'p': 'pointer'
}

// 结果：['string', 'dec']
type result = ParsePrintFormat<'Hello %s: score is %d'>
```
#### 实现方式
```ts
type ControlMap = {
  'c': 'char',
  's': 'string',
  'd': 'dec',
  'o': 'oct',
  'h': 'hex',
  'f': 'float',
  'p': 'pointer'
}

type ParsePrintFormat<
  S extends string,
  R extends string[] = []
> = S extends `${infer S1}%${infer Char}${infer S2}`
    ? Char extends keyof ControlMap
      ? ParsePrintFormat<S2, [...R, ControlMap[Char]]>
      : ParsePrintFormat<S2, R>
    : R
```
代码详解：在以上实现方法中，借用了辅助数组的思想，拿上面案例来说，具体迭代分析如下：
```ts
// 第一次迭代
S满足条件 R = [] S1 = 'Hello ' Char = 's' S2 = ': score is %d'

// 第二次迭代
S满足条件 R = ['string']  S1 = ': score is ' Char = 'd' S2 = ''

// 最后一次迭代
S不满足条件 R = ['string', 'dec']

// 结果
result = R = ['string', 'dec']
```

### IsAny和NotAny
#### 用法
`IsAny`是用来判断一个类型是否为`any`的，`NotAny`和它做的事情相反。
```ts
type t1 = IsAny<undefined> // false
type t2 = IsAny<never>     // false
type t3 = IsAny<any>       // true

type t4 = NotAny<undefined> // true
type t5 = NotAny<never>     // true
type t6 = NotAny<any>       // false
```
#### 实现方式
```ts
type IsAny<T> = 0 extends (1&T) ? true : false
type NotAny<T> = true extends IsAny<T> ? false : true
```
代码详解：`1 & T`的结果只能是：`1`、`never`或者`any`。当使用`0 extends`这三个结果的时候，只有`any`判断为真。
```ts
// 结果：false
type t1 = 0 extends 1 ? true : false
// 结果：false
type t2 = 0 extends never ? true : false
// 结果：true
type t3 = 0 extends any ? true : false
```

### Get(字符串路径取值)
#### 用法
`Get`是用来进行字符串路径取值的，其用法如下：
```ts
type Data = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    include: true,
  },
  hello: 'world'
}

// 结果：world
type t1 = Get<Data, 'hello'>
// 结果：foobar
type t2 = Get<Data, 'foo.bar.value'>
// 结果： never
type t3 = Get<Data, 'no.exits'>
```
#### 实现方式
```ts
type Get<T, S extends string> =
  S extends `${infer S1}.${infer S2}`
    ? S1 extends keyof T
      ? Get<T[S1], S2>
      : never
    : S extends keyof T
      ? T[S]
      : never
```
代码详解：对于`Get`的实现，主要分为两部分：含有`.`符号的字符串和不含`.`符号的字符串。
* 不含有`.`符号的字符串：对于这种情况，我们只需要判断它是否为`T`类型中的某个`key`，如果是则直接取值；如果不是，则返回`never`。
* 含有`.`符号的字符串：对于这种情况，我们先判断`.`符号左侧部分是否满足为`T`类型的某个`key`，如果满足则递归调用`Get`；如果不满足，则直接返回`never`。

### StringToNumber(字符串数字转数字)
#### 用法
`StringToNumber`是用来将字符串形式的数字转换成真正数字类型数字的，其用法如下：
```ts
// 结果：123
type result = StringToNumber<'123'>
```
#### 实现方式
在`JavaScript`中，我们可以很方便的调用`Number()`方法或者`parseInt()`方法来将字符串类型的数字，转换成数字类型的数字。但在`TS`中，并没有这样的方法，需要我们来手动实现。

`StringToNumber`的实现并不容易理解，我们需要将其进行拆分，一步步来完善，其实现思路如下：
* 第一步：可以很容易获取字符串`'123'`中每一位字符，我们将其存储在辅助数组`T`中，如下：
```ts
type StringToNumber<S extends string, T extends any[] = []> = 
  S extends `${infer S1}${infer S2}`
    ? StringToNumber<S2, [...T, S1]>
    : T

// 结果：['1', '2', '3']
type result = StringToNumber<'123'>
```
* 第二步：我们需要将单个字符串类型的数字，转换成真正数字类型的数字，可以借助中间数组来帮忙，例如：
```ts
'1' => [0]['length'] => 1
'2' => [0,0]['length'] => 2
'3' => [0,0,0]['length'] = 3
...
'9' => [0,0,0,0,0,0,0,0,0]['length'] => 9
```
根据以上规律，我们封装一个`MakeArray`方法，它的实现代码如下：
```ts
type MakeArray<N extends string, T extends any[] = []> = N extends `${T['length']}` ? T : MakeArray<N, [...T, 0]>

type t1 = MakeArray<'1'> // [0]
type t2 = MakeArray<'2'> // [0, 0]
type t3 = MakeArray<'3'> // [0, 0, 0]
```
* 第三步：现在有了百位，十位和个位的数字，我们应该运用算术把它们按照一定的规律累加起来，如下：
```js
const arr = [1, 2, 3]
let target = 0

// 第一次迭代
target = 10 * 0 + 1 = 1
// 第二次迭代
target = 10 * 1 + 2 = 12
// 第三次迭代
target = 10 * 12 + 3 = 123
// 迭代规律
target = 10 * target + N
```
根据以上思路，我们还需要一个乘十的工具函数，对应到实际需求，就是需要把一个数组`copy`十次，因此我们封装一个`Multiply10`工具，其实现代码如下：
```ts
type Multiply10<T extends any[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]

type result = Multiply10<[1]> // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```
* 第四步：根据前几步的分析，把所有东西串联起来，`StringToNumber`完整实现代码如下：
```ts
type Digital = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
type Multiply10<T extends any[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
type MakeArray<N extends string, T extends any[] = []> = N extends `${T['length']}` ? T : MakeArray<N, [...T, 0]>

type StringToNumber<S extends string, T extends any[] = []> = 
  S extends `${infer S1}${infer S2}`
    ? S1 extends Digital
      ? StringToNumber<S2, [...Multiply10<T>, ...MakeArray<S1>]>
      : never
    : T['length']
```
* 第五步：为了更好的理解递归的过程，我们拆解成如下步骤来说明：
```ts
type result = StringToNumber<'123'>

// 第一次递归，S满足${infer S1}${infer S2}， S1满足Digital
S = '123' S1 = '1' S2 = '23' T = [0] T['length'] = 1

// 第二次递归，S满足${infer S1}${infer S2}， S1满足Digital
S = '23'  S1 = '2' S2 = '3' T = [0,....0] T['length'] = 10

// 第三次递归，S满足${infer S1}${infer S2}， S1满足Digital
S = '3'  S1 = '3' S2 = '' T = [0,....0] T['length'] = 120

// 第四次递归，S不满足${infer S1}${infer S2} T['length']取值
S = '' T = [0,....0] T['length'] = 123

// 结果：
type result = StringToNumber<'123'> // 123
```


### FilterOut(数组元素过滤)
#### 用法
`FilterOut`是用来从数组中移除指定元素的，其用法如下：
```ts
// 结果：[2]
type result = FilterOut<[1, 'a', 2], 'a' | 1>
```
#### 实现方式
```ts
type FilterOut<
  T extends any[],
  F,
  K extends any[] = []
> = T extends [infer R, ...infer args]
      ? [R] extends [F]
        ? FilterOut<args, F, [...K]>
        : FilterOut<args, F, [...K, R]>
      : K
```
代码详解：
* 第一步：我们借用赋值函数来存放最后的结果。
* 第二步：迭代数组`T`，拿每一个元素去和指定的`F`进行判断，如果`R`是`F`的子类型，则不添加此元素到结果数组中，反之添加。
* 第三步：当迭代完毕时，直接返回结果数组`K`。

### TupleToEnum(元组转枚举)
#### 用法
`TupleToEnum`是用来将元组转换为枚举的，其用法如下：
```ts
const OperatingSystem = ['macOs', 'Windows', 'Linux'] as const
type Expected1 = {
  readonly MacOs: 'macOs';
  readonly Windows: 'Windows';
  readonly Linux: 'Linux'
}
type Expected2 = {
  readonly MacOs: 0;
  readonly Windows: 1;
  readonly Linux: 2
}

// 结果：Expected1
type result1 = TupleToEnum<typeof OperatingSystem>
// 结果：Expected2
type result2 = TupleToEnum<typeof OperatingSystem, true>
```
#### 实现方式
在实现`TupleToEnum`之前，我们先来实现`TupleKeys`，它是用来获取所有元组索引组合成的联合类型的。
```ts
type TupleKeys<
  T extends readonly any[]
> = T extends readonly [infer R, ...infer args]
      ? TupleKeys<args> | args['length']
      : never

// 结果：0 | 1 | 2
type keys = TupleKeys<typeof OperatingSystem>
```
在有了以上`keys`后，就能很容易实现`TupleToEnum`了，如下：
```ts
type TupleToEnum<
  T extends readonly string[],
  N extends boolean = false
> = {
  readonly [K in TupleKeys<T> as Capitalize<T[K]>]: N extends true ? K : T[K]
}
```

### Format(字符串格式化函数类型)
`%s`表示格式化为`(x: string) => any`形式，`%d`表示格式化为`(x: number) => any`形式。
#### 用法
`Format`是将字符串格式化为指定函数类型的，用法如下：
```ts
// 结果1：(x: string) => string
type result1 = Format<'a%sbc'>
// 结果2：(x: number) => string
type result2 = Format<'a%dbc'>
// 结果3：(x: number) => (x: string) => string>
type result3 = Format<'a%dbc%s'>
```
#### 实现方式
```ts
type FormatMaps = {
  's': string;
  'd': number;
}
type Format<
  S extends string
> = S extends `${infer S1}%${infer P}${infer S2}`
      ? P extends keyof FormatMaps
        ? (x: FormatMaps[P]) => Format<S2>
        : string
      : string
```

### LengthOfString(字符串的长度)
我们之前在**中级**大章节中已经实现过`LengthOfString`，但它面临的问题是，如果字符有上百个，由于`TS`对于递归的次数存在限制，会提示嵌套过深。
#### 用法
```ts
// 结果：91
type result = LengthOfString<'1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'>
```
#### 实现方式
```ts
type LengthOfString<
  S extends string,
  R extends any[] = []
> = S extends `${infer S0}${infer S1}${infer S2}${infer S3}${infer S4}${infer S5}${infer S6}${infer S7}${infer S8}${infer S9}${infer Rest}`
      ? LengthOfString<Rest, [...R, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>
      : S extends `${infer S1}${infer S2}`
          ? LengthOfString<S2, [...R, S1]>
          : R['length']
```
代码解析：这里我们巧妙的使用占位的思想，`S extends ${infer S1}${infer S2}${infer S3}`，如果`S`满足这个占位形式，则表示`S`的长度至少为`2`，带入到上面的例子，解析步骤如下：
```ts
// 第一次递归
S满足至少10个字符的长度，R = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// 第二弟递归
S满足至少10个字符的长度，R = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// 省略
// 最后一次递归
S = '1'不满足至少10个字符的长度，R = [1, ....., 1]
// 最后结果
R['length'] = 91
```

### UnionToTuple(联合类型转元组)
#### 用法
`UnionToTuple`是用来将联合类型转成元组的，用法如下：
```ts
// 结果1：['a', 'b']
type result1 = UnionToTuple<'a'>
// 结果2：['a', 'b']
type result2 = UnionToTuple<'a' | 'b'>
// 结果3：['a', 'b']
type result3 = UnionToTuple<'a' | 'b' | never>

```
#### 实现方式
```ts
type UnionToIntersection<U> = (
  U extends any 
  ? (x: U) => any 
  : never
) extends (x: infer R) => any 
  ? R
  : never

type LastUnion<U> = UnionToIntersection<
  U extends any
    ? (x: U) => 0
    : never
> extends (x: infer R) => 0
  ? R
  : never

type UnionToTuple<
  T,
  Last = LastUnion<T>
> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last] 
```
代码详解：
* `UnionToIntersection`: 联合类型取交集，在之前已经实现过，这里不再赘述。主要理解以下案例：
```ts
type f1 = (x: 1) => 0
type f2 = (x: 2) => 0

// 函数重载结果
// function (x: 1): 0;
// function (x: 2): 0;
type result = UnionToIntersection<f1 | f2>

```
对于函数参数的交集而言，不是简单的把参数取交集，而是"联合"起来，也就是构造一个新的函数类型，即：**函数重载**
* `LastUnion`: 取联合类型最后的一个元素，如果一个函数存在重载的情况，`TS`会取最后一个函数签名，例如：
```ts
type f1 = (x: 1) => 0
type f2 = (x: 2) => 0

// 结果1：2
type result1 = f1 & f2 extends (x: infer R) => 0 ? R : never
// 结果2：1
type result2 = f2 & f1 extends (x: infer R) => 0 ? R : never
```

### Join(字符串拼接)
#### 用法
`Join`是用来实现拼接字符串的，用法如下：
```ts
// 结果1： ''
const Expected1 = join('-')();
// 结果2： 'a'
const Expected2 = join('-')('a');
// 结果3： 'abc'
const Expected3 = join('')('a', 'b', 'c');
// 结果4： 'a-b-c'
const Expected4 = join('-')('a', 'b', 'c');
```
#### 实现方式
```ts
type Tail<T extends string[]> = T extends [any, ...infer Rest] ? Rest : []
type StringJoin<
  D extends string,
  P extends string[] = []
> = P extends []
    ? ''
    : P extends [infer Only]
      ? Only
      : `${P[0]}${D}${StringJoin<D, Tail<P>>}`

declare function join<D extends string>(delimiter: D): <P extends string[] = []>(...parts: P) => StringJoin<D, P>;
```

### DeepPick(深层次Pick)
#### 用法
`DeepPick`是用来深层次获取属性值的，用法如下：
```ts
type Obj = {
  a: number,
  b: string,
  c:  boolean,
  obj: {
    d: number,
    e: string,
    f:  boolean,
    obj2: {
      g: number,
      h: string,
      i: boolean,
    }
  }
}
// 结果1：Obj
type result1 = DeepPick<Obj, ''>
// 结果2：{ a: number; }
type result2 = DeepPick<Obj, 'a'>
// 结果3：{ a: number; } & { obj: { d: number; } }
type result3 = DeepPick<Obj, 'a', 'obj.d'>
```
#### 实现方式
在之前，我们实现过根据属性路径取值`Get`，根据其思路我们很容易实现`DeepPick`，如下：
```ts
type UnionToIntersection<U> = 
  (U extends any 
    ? (x: U) => any 
    : never
  ) extends (x: infer V) => any 
    ? V
    : never

type GetType<T, S> = 
  S extends `${infer S1}.${infer S2}`
    ? S1 extends keyof T
      ? { [K in S1]: GetType<T[S1], S2> }
      : never
    : S extends keyof T
      ? { [K in S]: T[K] }
      : never

type DeepPick<
  T,
  U extends string
> = UnionToIntersection<
  U extends infer keys ? GetType<T, keys> : never
>
```

### Camelize(对象属性键转小驼峰)
#### 用法
`Camelize`是用来将对象中的`key`全部转换为小驼峰的，用法如下：
```ts
type Person = {
  some_PROP: string;
  prop: {
    another_prop: string;
  };
  array: [
    { snake_case: string; }
  ]
}
type Expected = {
  someProp: string;
  prop: { 
    anotherProp: string;
  };
  array: [
    { snakeCase: string; }
  ]
}

// 结果：Expected
type result = Camelize<Person>
```
#### 实现方式
```ts
type CamelCase<S> = 
  S extends `${infer S1}_${infer S2}`
    ? `${Lowercase<S1>}${CamelCase<Capitalize<Lowercase<S2>>>}`
    : S

type Camelize<T> = {
  [K in keyof T as CamelCase<K>]: 
    T[K] extends [infer R]
      ? [Camelize<R>]
      : T[K] extends Object
        ? Camelize<T[K]>
        : T[K]
}
```
代码详解：`CamelCase`的实现可以分为两个部分，第一部分来自于处理属性`key`转小驼峰的情况，第二部分来自于嵌套对象的情况。
* 处理属性`key`：根据之前介绍过的`as`用法，我们可以在`in`迭代过程中使用`as`来进一步**加工或者处理**属性`key`，也就是`CamelCase`的部分。
* 处理嵌套对象：对于`T[P]`而言，我们考虑嵌套对象为数组和普通对象的情况，首先判断是否为数组类型，如果是则迭代数组递归调用`Camelize`；如果是普通对象，则直接调用`Camelize`；如果都不是，则直接返回`T[P]`即可。

### DropString(移除全部字符)
#### 用法
`DropString`是用来移除全部字符的，用法如下：
```ts
// 结果：'ooar!'
type result = DropString<'foobar!', 'fb'>
```
#### 实现方式
```ts
type StrngToUnion<S extends string> = 
  S extends `${infer S1}${infer S2}`
    ? S1 | StrngToUnion<S2>
    : S

type DropString<
  S extends string,
  R extends string,
  U = StrngToUnion<R>
> = S extends `${infer S1}${infer S2}`
    ? S1 extends U
      ? DropString<S2, R>
      : `${S1}${DropString<S2, R>}`
    : S
```
代码详解：实现`DropString`的核心是将指定的字符串转换为联合类型，转换之后只需要迭代字符串，判断当前迭代的字符是不是在联合类型中，如果是则直接丢弃，不是则原样保留。

### Split(字符串Split方法)
#### 用法
`Split`是用来实现字符串`split`方法的，其用法如下：
```ts
// 结果：["Hi!", "How", "are", "you?"]
type result = Split<'Hi! How are you?', ' '>
```
#### 实现方式
```ts
type Split<
  S extends string,
  SEP extends string,
  R extends any[] = []
> = S extends `${infer _}`
      ? S extends `${infer S1}${SEP}${infer S2}`
        ? Split<S2, SEP, [...R, S1]>
        : S extends ''
          ? SEP extends ''
            ? R
            : [...R, S]
          : [...R, S]
      : string[]
```

### IsRequredKeys(是否为必填key)
#### 用法
`IsRequredKeys`是用来判断是否为必填`key`的，其用法如下：
```ts
type Obj = {
  a: number,
  b?: string
}
// 结果1：true
type result1 = IsRequredKeys<Obj, 'a'>
// 结果2：false
type result2 = IsRequredKeys<Obj, 'b'>
```
#### 实现方式
```ts
type IsRequiredKey<T, K extends keyof T> = T extends Record<K, T[K]> ? true : false
```
根据`IsRequiredKey`的实现思路，我们可以很容易实现`IsOptionalKey`，如下：
```ts
type IsOptionalKey<T, K extends keyof T> = {} extends { [P in K]: T[P] } ? true : false

// 结果1：false
type result1 = IsOptionalKey<Obj, 'a'>
// 结果2：true
type result2 = IsOptionalKey<Obj, 'b'>
```

### ObjectEntries(对象的entries方法)
#### 用法
#### 实现方式

### IsPalindrome(是否为回文)
#### 用法
#### 实现方式

### MutableKeys(所有可写键)
#### 用法
#### 实现方式

### Intersection(交集)
#### 用法
#### 实现方式

### BinaryToDecimal(二进制转十进制)
#### 用法
#### 实现方式

## 地狱
撰写中...
