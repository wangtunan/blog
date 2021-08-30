---
sidebar: auto
---

# Type-Challenges

## 介绍
在学习完`TypeScript`一些基础知识后，我们已经可以熟练使用一些基本类型定义了，但对于`TypeScript`的高级用法却依旧无法入门，为了更有趣的学习`TypeScript`高级用法，我们选择[Type-Challenges](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)类型挑战来作为我们学习的目标。

在`Type-Challenges`中，我们可以从`简单`、`中等`、`困难`以及`地狱`难度，循序渐进的学习`TypeScript`高级技巧。

如果你需要选择其他的方向来深入学习高级技巧，这里也有一些推荐的开源项目：
* 官方内置：在`lib.es5.d.ts`文件中，官方默认内置的一些辅助工具函数，例如：`Partial`、`Required`、`Pick`以及`Record`等等。
* 非官方开源库：[utility-types](https://github.com/piotrwitek/utility-types)、[ts-toolbelt](https://github.com/millsp/ts-toolbelt)、[SimplyTyped](https://github.com/andnp/SimplyTyped)

在之后的挑战中，我们会尽力对每道题进行必要的讲解，力争在进行`Type-Challenges`类型挑战时收益最大化。

## 核心知识点

### 加号和减号
::: tip
加号和减号的用法类似，不赘述，只介绍减号。
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
观察结果我们可以知道，`-?`是去掉类型中属性后面的`?`，整个`Required`的实际效果是去掉`T`类型中所有属性键后面的`?`，让所有属性变成必填的。

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
`TS`中的`in`操作符原理，跟`JavaScript`中的`for in`遍历有点类似。

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
`TS`中的`typeof`，可以用来获取一个`JavaScript`变量的类型，通常同于获取一个对象或者一个函数的类型，如下：
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

如果一个函数抛出了一个错误，那么这个函数就可以用`never`来表示其返回值，如下：
```ts
function handlerError(message: string): never {
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
`extends`关键词，一般有两种用法：类型约束和条件类型。

#### 类型约束
类型约束经常和泛型一起使用：
```ts
// 类型约束
U extends keyof T
```
`keyof T`是一个整体，它表示一个联合类型。`U extends Union`这一整段表示`U`的类型被收缩在一个联合类型的范围内。

这样做的实际表现为：第二个参数传递的字符串只能是`T`键名中的一个，传递不存在的键名会报错。
#### 条件类型
常见的条件类型表现形式如下：
```ts
T extends U ? 'Y' : 'N'
```
我们发现条件类型有点像`JavaScript`中的三元表达式，事实上它们的工作原理是类似的，例如：
```ts
type res1 = true extends boolean ? true : false // true
type res2 = 'name' extends 'name'|'age' ? true : false // true
type res3 = [1, 2, 3] extends { length: number; } ? true : false // true
type res4 = [1, 2, 3] extends Array<number> ? true : false // true
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
'name'|'age' extends 'name'|'address'|'sex' ? 'name'|'age' : never
=> ('name' extends 'name'|'address'|'sex' ? 'name' : never) |
   ('age' extends 'name'|'address'|'sex' ? 'age' : never)
=> 'name' | never
=> 'name'
```
代码详解：
* `T extends U ? T : never`：因为`T`是一个联合类型，所以这里适用于**分布式条件类型**的概念。根据其概念，在实际的过程中会把`T`类型中的每一个子类型进行迭代，如下：
```ts
// 第一次迭代：
'name' extends 'name'|'address'|'sex' ? 'name' : never
// 第二次迭代：
'age' extends 'name'|'address'|'sex' ? 'age' : never
```
* 在迭代完成之后，会把每次迭代的结果组合成一个新的联合类型(剔除`never`)，如下：
```ts
type result = 'name' | never => 'name'
```

### infer

`infer`关键词的作用是延时推导，它会在类型未推导时进行占位，等到真正推导成功后，它能准确的返回正确的类型。

为了更好的理解infer关键词的用法，我们使用ReturnType这个例子来说明，`ReturnType`是一个用来获取函数返回类型的工具。

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
在`TS`中有两种类型值得我们关注：**联合类型**和**交叉类型**。

联合类型一般适用于基本类型的"合并"，它使用`|`符号进行连接，如下：
```ts
type result = 'name' | 1 | true | null
```

而交叉类型则适用于对象的"合并"，它使用`&`符号进行连接，如下：
```ts
type result = T & U
```
`T & U`表示一个新的类型，其中这个类型包含`T`和`U`中所有的键，这和`JavaScript`中的`Object.assign()`函数的作用非常类似。

根据交叉类型的概念，我们可以手动封装一个对象的`merge`函数，如下：
```ts
const obj1 = { name: 'AAA' }
const obj2 = { age: 23 }
function merge<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 结果：{ name：'AAA'; age: 23; }
const resutl = merge(obj1, obj2)
```

## 初级

### Partial(可填)和Required(必填)
#### 用法
`Partial`和`Required`一个是让所有类型可填、另外一个是让所有类型必填，用法如下：
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

### Readonly(只读)和Mutable(可改)
#### 用法
`Readonly`和`Mutable`一个是让所有属性变为只读，另外一个是让所有属性变为可改的(移除`readonly`关键词)，其用法为：
```ts
type Person = {
  readonly name: string;
  age: number;
}

// 结果：{ readonly name: string; readonly age: number; }
type ReadonlyResult = Readonly<Person>

// 结果：{ name: string; age: number; }
type MutableResult = Mutable<Person>
```
#### 实现方式
```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
type MyMutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```
代码解读：
* `-readonly`：表示把`readonly`关键词去掉，去掉之后此字段变为可改的.

### Pick(选取)
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

### Exclude(排除)
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

### Omit(移除)
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

### Record(构造)
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

### Extract(交集)
#### 用法
`Extract<T, U>`用来取联合类型`T`和`U`的交集，用法如下：
```ts
type Person = {
  name: string;
  age: number;
  address: string;
}

// 结果：{ age:number;address:string; }
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

### TupleToObject(元组转对象)
#### 用法
`TupleToObject<T>`是用来把一个元组转换成一个`key/value`相同的对象，例如：
```ts
type tuple = ['msg', 'name'] as const
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
* `T[number]`：表示返回所有数字型索引的元素，形成的一个联合类型，例如：`'msg'|'name'`。

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
type First<T extends any[]> = T extends [] ? never : T[0]
```
代码详解：
* `T extends []`：用来判断`T`是否是一个空数组。
* `T[0]`：根据下标取数组第一个元素。


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


### ReturnType(函数返回类型)
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
* `infer R`：表示待推导的函数返回类型为`R`，后续可以在表达式中使用`R`来代替真正的返回类型，知识点[infer](#infer)

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
type PromiseType<T> = T extends Promise<infer R> ? R : never
```
代码详解：
* `T extends Promise<infer R>`：判断`T`是否是`Promise<infer R>`的子类型，也就是说`T`必须满足`Promise<any>`的形式。

### If(判断)
#### 用法
`If<C, T, F>`用来表示根据`C`的值来返回`T`或者`F`，如果`C`为`true`，则返回`T`；如果`C`为`false`，则返回`F`，例如：
```ts
// 结果：'a'
type result1 = If<true, 'a', 'b'>
// 结果：‘b’
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
`Concat<T, U>`用来实现讲两个数组合并起来，类似实现数组的`concat`方法，使用方式如下：
```ts
// 结果：[1, 2, 3, 4]
type result = Concat<[1, 2], [3, 4]>
```
#### 实现方式
```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```
代码详解：
* `T extends any[]`：用来限制`T`是一个数字，如果传递非数组会报错，`U`也是一样的道理。
* `[...T, ...U]`：我们可以理解成`JavaScript`的扩展运算符`...`。

### Includes(数组includes方法)
#### 用法
`Includes<T, U>`用来判断`U`是否在在数组`T`中，类似实现数组的`includes`方法，用法如下：
```ts
// 结果：true
type result1 = Includes<[1, 2, 3], 1>
// 结果：false
type result2 = Includes<[1, 2, 3], '1'>
```
#### 实现方式
```ts
type Includes<T extends any [], U> = U extends T[number] ? true : false
```
代码详解：
* `T[number]`：它返回数组中所有数字类型键对应的值，将这些值构造成一个联合类型，例如：`1 | 2 | 3`。
* `U extends T[number]`：判断`U`是否是某个联合类型的子类型，例如：`1 extends 1 | 2 | 3`。

## 中级
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
#### 使用方式
```ts
type Readonly<T, K extends keyof T = any> = T & {
  readonly [P in keyof T as P extends K ? P : never]: T[P]
}
```
代码详解：
* `K extends keyof T = any`：如要传递了`K`，那么只能是`T`中已经存在的属性，不存在则报错；如果不传递，则默认值为`any`，意味着全部属性都添加`readonly`。
* `as`：`T as U`表示对于`T`进行进一步的**加工/判断**，在此处具体表现为：我们只对指定字段进行迭代并添加`readonly`关键词。
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

### Pop和Push
继续沿用以上处理索引思想和占位的思想，我们能快速实现数组`pop`方法和`push`方法。
#### 用法
```ts
// Pop结果：[1, 2]
type popResult = Pop<[1, 2, 3]>

// Push结果：[1, 2, 3, 4]
type pushResult = Push<[1, 2, 3], 4>
```
#### 实现方式
```ts
// Pop实现
type Pop<T extends any[]> = T extends [...infer R, infer L] ? R : never

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
type t1 = Replace<'foobarbar', 'bar', 'foo'>    // 'foofoobar'
type t2 = ReplaceAll<'foobarbar', 'bar', 'foo'> // 'foofoofoo'
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

type ReplaceAll<
  S extends string,
  from extends string,
  to extends string
> = S extends `${infer L}${from}${infer R}`
      ? from extends ''
        ? S
        : ReplaceAll<`${L}${to}${R}`, from, to>
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
* 我们通过一个泛型的辅助数组来帮我们计算字符串的长度，在第一次符合条件时，我们将其第一个字符添加到数组中，在后续的递归过程中，如果不符合条件，直接返回`T['length']`，这个过程可以用如下代码表示：
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

### MergeType(类型合并)
#### 用法
`MergeType`是用来合并两个类型，如果有重复的字段类型，则第二个的字段类型覆盖第一个的，其用法如下：
```ts
type Foo = {
  a: number;
  b: string;
}
type Bar = {
  b: number;
}

// 结果：{ a: number; b: number; }
type result = MergeType<Foo, Bar>
```
#### 实现方式
```ts
type MergeType<F, S> = {
  [P in keyof F]: P extends keyof S ? S[P] : F[P]
}
```

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
`AnyOf`用来判断数组元素，若果任意值为真，返回true；数组为空或者全部为false，才返回false，其用法如下：
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

## 困难
### Currying(柯里化)

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

// 结果：Expected1
type result1 = TupleToEnum<typeof OperatingSystem>
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
在有了以上`keys`后，我们就能实现`TupleToEnum`了，如下：
```ts
type TupleToEnum<T extends readonly string[]> = {
  readonly [K in TupleKeys<T> as Capitalize<T[K]>]: T[K]
}
```


### Format(字符串格式化函数类型)

### LengthOfString(字符串的长度)

### Join(字符串拼接)

### DeepPick(深层次Pick)

### Camelize(类型属性键转小驼峰)

## 地狱
撰写中...
