---
sidebar: auto
---

# type-Challenges


## 介绍
在学习完`TypeScript`一些基础知识后，我们已经可以熟练使用一些基本类型定义了，但对于`TypeScript`的高级用法却依旧无法入门，为了更有趣的学习`TypeScript`高级用法，我们选择[Type-Challenges](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)类型挑战来作为我们学习的目标。

在`Type-Challenges`中，我们可以从`简单`、`中等`、`困难`以及`地狱`难度，循序渐进的学习`TypeScript`高级技巧。

如果你需要选择其他的方向来深入学习高级技巧，这里也有一些推荐的开源项目：
* 官方内置：在`lib.es5.d.ts`文件中，官方默认内置的一些辅助工具函数，例如：`Partial`、`Required`、`Pick`以及`Record`等等。
* 非官方开源库：[utility-types](https://github.com/piotrwitek/utility-types)、[ts-toolbelt](https://github.com/millsp/ts-toolbelt)、[SimplyTyped](https://github.com/andnp/SimplyTyped)

在之后的挑战中，我们会尽力对每道题进行必要的讲解，力争在进行`Type-Challenges`类型挑战时收益最大化。

## 核心知识点
### keyof和in
撰写中....
### typeof
撰写中....
### never
撰写中....
### extends
撰写中....
### infer
撰写中....
### 加号和减号
撰写中....
### as
撰写中...
### is
撰写中...
### &符号
撰写中...

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
::: tip
知识点：`keyof`、`in`、`-`
:::
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
```
代码解读：
* `keyof T`：[keyof和in](#keyof和in)。
* `P in keyof T`：[keyof和in](#keyof和in)。
* `T[P]`：属于一个正常的取值操作，在`TypeScript`中，不能通过`T.P`的形式取值，而应该用`T[P]`。
* `-?`：[加号和减号](#加号和减号)。

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
type MutableResult = 和Mutable<Person>
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
* `keyof T`：[keyof和in](#keyof和in)。
* `P in keyof T`：[keyof和in](#keyof和in)。
* `T[P]`：属于一个正常的取值操作，在`TypeScript`中，不能通过`T.P`的形式取值，而应该用`T[P]`。
* `-readonly`：表示把`readonly`关键词去掉，去掉之后此字段变为可改的，知识点[加号和减号](#加号和减号)。

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
* `P in K`：[keyof和in](#keyof和in)

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
* `never`：[never](#never)
* `T extends U`：会从`T`的子类型开始分发，例如：
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
// Pick实现
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
// Exclude实现
type MyExclude<T, U> = T extends U ? never : T
// Omit实现
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>
```
代码详解：
* 使用`MyExclude<keyof T, K>`，我们能从`T`中移除指定的字段，得到一个联合类型，例如：`'name'|'age'`
* 使用`MyPick<T, 'name'|'age'>`，我们可以从`T`中选取这两个字段组合成一个新的类型。

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
// K为 ‘Dog’|'cat'
type UnionKeys = 'Dog' | 'Cat'

// K为‘name’|'age'
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
* `as const`：常用来进行常量断言，在此处表示将`['msg','name']`推导常量元组，表示其不能新增、删除、修改元素。我们也可以使用`as readonly`来理解。
* `T[number]`：表示返回元素所有数字型索引的元素，形成一个联合类型，例如：`'msg'|'name'`。

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
* `infer R`：[infer](#infer)

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
* `T[number]`：它返回数组中所有数字类型键对应的值，将这些值构造成一个联合类型，例如：`1|2|3`。
* `U extends T[number]`：判断`U`是否是某个联合类型的子类型，例如：`1 extends 1|2|3`。

## 中级
### Readony(按需Readonly)
#### 用法
不同于初级实现中的`Readonly`，在中级实现的`Readonly`中，如果我们传递了指定的字段，那么`Readonly`会表现为按需实现`readonly`，具体用法如下：
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
type Readonly<T, K = any> = T & {
  readonly [P in keyof T as P extends K ? P : never]: T[P] 
}
```
代码详解：
* `K=any`：类型默认值，如果不传递`K`，则默认所有字段都变为`readonly`。
* `as`：`[T as U]`表示对于`T`进行进一步的"加工/判断"，在此处具体表现为：我们只对指定字段进行迭代并添加`readonly`关键词。知识点[as](#as)
* `T & U`：在本例中表示将`T`和`U`中的字段结合起来，如果没有`&`，那么就丢失一些属性，例如`title`。知识点[&符号](#&符号)

### DeepReadonly(深度Readonly)
#### 用法
`DeepReadonly`用来将一个嵌套类型中所有字段全部添加`readonly`关键词，例如：
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
type Y = {
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: undefined,
    readonly f: null
  }
}

// 结果：Y
type result = DeepReadonly<X>
```
#### 实现方式
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: any } ? DeepReadonly<T[P]> : T[P]
}
```
代码详解：
* `T[P] extends { [key: string]: any }`：这段表示`T[P]`是否是一个包含索引签名的字段，如果包含我们认为它是一个嵌套对象，就可以递归调用`DeepReadonly`。

### TupleToUnion(元组转集合)
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
* `T[number]`：它会自动迭代元组的数字型索引，然后将所以元素组合成一个联华类型。
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

### Chainable(可串联)

### Last(数组最后一个元素)
#### 用法
`Last`是用来获取数组中最后一个元素的，它和我们之前已经实现的`First`很相似。
```ts
// 结果：3
type result = Last<[1, 2, 3]>
```
#### 实现方式
`Last`的实现方式很巧妙，因为它既可以在索引上做文章来实现，也可以用占位的思想来实现。
```ts
// way1：处理索引
type Last<T extends any[]> = [any, ...T][T['length']]

// way2: 后占位
type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never
```
代码详解：
* `[any, ...T]`：此代码表示我们构建了一个新数组，并添加了一个新元素到第一个位置，然后把原数组`T`中的元素依次扩展到新数组中，可以用以下伪代码表示：
```ts
// 原数组
const T = [1, 2, 3]

// 新数组
const arr = [any, 1, 2, 3]
```
* `T['length']`：这里我们获取到的是原始`T`数组的长度，例如`[1, 2, 3]`，我们获取到的长度值为`3`。而在新数组中，索引为`3`的位置正好是最后一个元素的索引，通过这种方式就能达到我们的目的。
* `T extends [...infer R, infer L]`：这段代码表示，我们将原数组中最后一个元素使用`L`进行占位，而其它元素我们用一个`R`数组表示。这样，如果数组满足这种格式，就能正确返回最后一个元素的值。

### Pop和Push
继续沿用以上处理索引和占位的思想，我们能实现数组`pop`方法和`push`方法
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

### PromiseAll(Promise.all返回类型)
#### 用法
`PromiseAll`是用来取`Promise.all()`函数所有返回的类型，其用法如下
```ts
// 结果：Promise<[number, number, number]>
const result = PromiseAll([1, 2, Promise.resolve(3)])
```
#### 实现方式
与之前的例子不同，`PromiseAll`我们申明的是一个`function`而不是`type`。
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


### Replace(替换一次)和ReplaceAll(全部替换)
#### 用法
`Replace`是用来将字符串中第一次出现的某段内容，使用指定的字符串进行替换，而`和ReplaceAll`是全部替换，其用法如下：
```ts
type t1 = Replace<'foobarbar', 'bar', 'foo'>      // 'foofoobar'
type t2 = 和ReplaceAll<'foobarbar', 'bar', 'foo'> // 'foofoofoo'
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

### Permutation(元素排列)

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

### AppendToObject(对象添加新属性)

### Absolute(绝对值)

### StringToArray(字符串转数组)
### StringToUnion(字符串转联合类型)
### MergeType(类型合并)
### CamelCase(字符串转小驼峰)
### KebabCase(字符串转连字符)
### Diff(类型差异部分)
### AnyOf(数组元素真值判断)
### IsNever(是否是Never类型)
### IsUnion(是否联合类型)
### ReplaceKeys(类型替换)
### RemoveIndexSignature(移除索引签名)

## 困难
### UnionToIntersection(元组取交集)
### Currying(柯里化)
### RequiredKeys(所有必填字段)
### GetRequired(必填字段组成的类型)
### OptionalKeys(所有可选字段)
### GetOptional(可选字段组成的类型)
### CapitalizeWords(所有单词首字母大写)
### CamelCase(字符串转小驼峰)
### ParsePrintFormat(字符串格式化内容)
### IsAny和NotAny
### Get(字符串路径取值)
### StringToNumber(字符串数字转数字)
### FilterOut(数组元素过滤)
### TupleToEnum(元组转枚举)
### Format(字符串格式化函数类型)
### LengthOfString(字符串的长度)
### Join(字符串拼接)
### DeepPick(深层次Pick)
### Camelize(类型属性键转小驼峰)

## 地狱
撰写中...

## 内置测试工具

### Equal和NotEqual
撰写中....
### isTrue和isFalse
撰写中....
### Expect、ExpectTrue和ExpectFalse
撰写中....
### IsAny和NotAny
撰写中....
