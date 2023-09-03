# 中等

## 内置ReturnType(函数返回类型)
<link-and-solution num="2" />

### 用法
`ReturnType<T>`是用来获取一个函数的返回类型的，例如：
```js
function getRandom (): number {
  return Math.random()
}
// 结果：number
type result = ReturnType<typeof getRandom>
```
### 实现方式
```ts
type ReturnType<T> = T extends (...args: any) => infer R ? R : never
```
代码详解：
* `T extends (...args: any) => infer R`：判断`T`类型是否是一个函数的子类型，既`T`是不是一个函数。
* `infer R`：表示待推导的函数返回类型为`R`，后续可以在表达式中使用`R`来代替真正的返回类型。

## 内置Omit(移除)
<link-and-solution num="3" />

### 用法
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
### 实现方式
`Omit`可以借助在上面已经实现过的`Pick`和`Exclude`配合来实现，如下：
```ts
// Omit实现
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>
```
代码详解：
* 使用`MyExclude<keyof T, K>`，可以从`T`中移除指定的字段，移除后得到一个新的联合类型：`'name'|'age'`
* 使用`MyPick<T, 'name'|'age'>`，可以从`T`中选取这两个字段，组合成一个新的类型。


## Readonly(按需Readonly)
<link-and-solution num="8" />

### 用法
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
### 实现方式
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
* `T & U`：在本例中表示将`T`和`U`中的字段结合起来，如果没有`&`会丢失一些属性，例如`title`。

## DeepReadonly(深度Readonly)
<link-and-solution num="9" />

### 用法
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
### 实现方式
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: any } ? DeepReadonly<T[P]> : T[P]
}
```
代码详解：
* `T[P] extends { [key: string]: any }`：这段表示`T[P]`是否是一个包含索引签名的字段，如果包含我们认为它是一个嵌套对象，就可以递归调用`DeepReadonly`。

## TupleToUnion(元组转联合类型)
<link-and-solution num="10" />

### 用法
`TupleToUnion`是用来将一个元组转换成联合类型的，其用法如下：
```ts
// 结果：'1' | '2' | '3'
type result = TupleToUnion<['1', '2', '3']>
```
### 实现方式
```ts
// way1: T[number]
type TupleToUnion<T extends readonly any[]> = T[number]
// way2: 递归
type TupleToUnion<T extends readonly any[]> = 
  T extends readonly [infer R, ...infer args]
    ? R | TupleToUnion<args>
    : never
```
代码详解：
* `T[number]`：它会自动迭代元组的数字型索引，然后将所有元素组合成一个联合类型。
* `R | TupleToUnion<args>`：`R`表示每一次迭代中的第一个元素，它的迭代过程可以用下面伪代码表示：
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

## Chainable(可串联构造器)
<link-and-solution num="12" />

### 用法
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
### 实现方式
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

## Last(数组最后一个元素)
<link-and-solution num="15" />

### 用法
`Last`是用来获取数组中最后一个元素的，它和我们之前已经实现的`First`思路很相似。
```ts
// 结果：3
type result = Last<[1, 2, 3]>
```
### 实现方式
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

## Pop(数组Pop方法)
<link-and-solution num="16" />

继续沿用以上处理索引思想或占位的思想，我们能快速实现数组`pop`方法。
### 用法
```ts
// 结果1：[1, 2]
type result1 = Pop<[1, 2, 3]>
// 结果2：[]
type result2 = Pop<[]>
```
### 实现方式
```ts
// Pop实现
type Pop<T extends any[]> =
  T extends []
    ? []
    : T extends [...infer Rest, infer L]
      ? Rest
      : never
```

## PromiseAll返回类型
<link-and-solution num="20" />

### 用法
`PromiseAll`是用来取`Promise.all()`函数所有返回的类型，其用法如下
```ts
const result1 = PromiseAll([1, 2, 3] as const)
const result2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const result3 = PromiseAll([1, 2, Promise.resolve(3)])
const result4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

// 结果1： Promise<[1, 2, 3]>
type t1 = typeof result1
// 结果2： Promise<[1, 2, number]>
type t2 = typeof result2
// 结果3： Promise<[number, number, number]>
type t3 = typeof result3
// 结果4： Promise<number[]>
type t4 = typeof result4
```
### 实现方式
与之前的例子不同，`PromiseAll`我们声明的是一个`function`而不是`type`。
```ts
// Awaited为内置类型
type PromiseAllType<T> = Promise<{
  [P in keyof T]: Awaited<T[P]>
}>
declare function PromiseAll<T extends any[]>(values: readonly [...T]): PromiseAllType<T>
```
代码详解：
* 因为`Promise.all()`函数接受的是一个数组，因此泛型`T`限制为一个`any[]`类型的数组。
* `PromiseAllType`的实现思路有点像之前的`PromiseType`，只不过这里多了一层`Promise`的包裹，因为`Promise.all()`的返回类型也是一个`Promise`。


## LookUp(查找)
<link-and-solution num="62" />

### 用法
`LookUp`是用来根据类型值查`type`找类型的，其用法如下：
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
### 实现方式
```ts
type LookUp<
  U extends { type: string; },
  T extends string
> = U extends { type: T } ? U : never
```
代码详解：
* `U extends { type: string; }`：这段代码限制`U`的类型必须是具有属性为`type`的对象。
* `U extends { type: T }`：如果把`T`的值实际带入，为`U extends { type: 'dog' }`，表示判断`U`中的`type`值是不是`dog`，是则返回`U`。

## Trim、TrimLeft以及TrimRight
TrimLeft：<link-and-solution num="106" />
TrimRight：<link-and-solution num="4803" />
Trim：<link-and-solution num="108" />

### 用法
`Trim`、`TrimLeft`以及`TrimRight`这几个工具比较好理解，它们都是用来移除字符串中的空白符的。
```ts
type t1 = TrimLeft<' str'>  // 'str'
type t2 = Trim<' str '>     // 'str'
type t3 = TrimRight<'str '> // 'str'
```
### 实现方式
```ts
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S
type Trim<S extends string> = S extends (`${Space}${infer R}` | `${infer R}${Space}`) ? Trim<R> : S
type TrimRight<S extends string> = S extends `${infer R}${Space}` ? TrimRight<R> : S
```
代码详解：
* `TrimLeft`和`TrimRight`的实现思路是相同的，区别在于空白符的占位出现在左侧还是右侧。
* `Trim`的实现就是把`TrimLeft`和`TrimRight`所做的事情结合起来。

## Capitalize(首字母大写)和UnCapitalize(首字母小写)
<link-and-solution num="110" />

### 用法
`Capitalize`是用来将一个字符串的首字母变成大写的，而`UnCapitalize`所做的事情跟它相反，其用法如下：
```ts
type t1 = Capitalize<'hello'>   // 'Hello'
type t2 = UnCapitalize<'Hello'> // 'hello'
```
### 实现方式
```ts
type Capitalize<S extends string> = S extends `${infer char}${infer L}` ? `${Uppercase<char>}${L}` : S
type UnCapitalize<S extends string> = S extends `${infer char}${infer L}` ? `${Lowercase<char>}${L}` : S
```
代码详解：
* 无论是`Capitalize`还是`UnCapitalize`，它们都依赖内置的工具函数`Uppercase`或者`Lowercase`。对于`Capitalize`而言，我们只需要把首字母隔离出来，然后调用`Uppercase`即可。对于`UnCapitalize`而言，我们把首字母调用`Lowercase`即可。


## Replace
<link-and-solution num="116" />

### 用法
`Replace`是用来将字符串中第一次出现的某段内容，使用指定的字符串进行替换，而`ReplaceAll`是全部替换，其用法如下：
```ts
// 结果1：'foofoobar'
type t1 = Replace<'foobarbar', 'bar', 'foo'>
// 结果2： foobarbar
type t2 = Replace<'foobarbar', '', 'foo'>
```
### 实现方式
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

## ReplaceAll
<link-and-solution num="119" />

### 用法
`ReplaceAll`是用来将字符串中指定字符全部替换的，其用法如下：
```ts
// 结果：'foofoofoo'
type t = ReplaceAll<'foobarbar', 'bar', 'foo'> 
```
### 实现方式
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

## AppendArgument(追加参数)
<link-and-solution num="191" />

### 用法
`AppendArgument`是用来向一个函数追加一个参数的，其用法如下：
```ts
//  结果：(a: number, b: number) => number
type result = AppendArgument<(a: number) => number, number>
```
### 实现方式
```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never
```
代码详解：
* 我们首先利用`infer`关键词得到了`Fn`函数的参数类型以及返回类型，然后把新的参数添加到参数列表，并原样返回其函数类型。

## Permutation(排列组合)
<link-and-solution num="296" />

### 用法
`Permutation`是用来将联合类型中的每一个类型进行排列组合，其用法如下：
```ts
// 结果1：['A', 'B'] | ['B', 'A']
type result1 = Permutation<'A' | 'B'>
// 结果2：['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
type result2 = Permutation<'A' | 'B' | 'C'>
```
### 实现方式
```ts
type Permutation<T, U = T> = 
  [T] extends [never]
    ? []
    : T extends U
      ? [T, ...Permutation<Exclude<U, T>>]
      : never
```

代码详解：
* `[T] extends [never]`：这段代码主要是为了处理联合类型为空的情况。
* `T extends U`：这段代码主要是需要使用**分布式条件类型**这个知识点，当`T extends U`成立时，在其后的判断语句中，`T`代表当前迭代的类型。
* `<Exclude<U, T>`：因为此时的`T`代表当前迭代的类型，所以我们从原始联合类型中排除当前类型，然后递归调用`Permutation`。当`T`为`A`时，递归调用`Permutation<'B' | 'C'>`, 此时结果为`['A']` + `['B', 'C']` 或 `['A']` + `['C', 'B']`。

## LengthOfString(字符串的长度)
<link-and-solution num="298" />

### 用法
`LengthOfString`是用来计算一个字符串长度的，其用法如下：
```ts
type result = LengthOfString<'Hello'> // 5
```
### 实现方式
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

## Flatten(数组降维)
<link-and-solution num="459" />

### 用法
`Flatten`是用来将多维数组进行降维的，其用法如下：
```ts
// 结果：[1, 2, 3]
type result = Flatten<[1, 2, [3]]>
```
### 实现方式
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

## AppendToObject(对象添加新属性)
<link-and-solution num="527" />

### 用法
`AppendToObject`是用来向指定对象添加一个额外的属性(`key/value`)，其用法如下：
```ts
// 结果：{ id: number; name: string; }
type result = AppendToObject<{ id: number; }, 'name', string>
```
### 实现方式
```ts
type basicKeyType = string | number | symbol
type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}
```
代码详解：
* `basicKeyType`：在`JavaScript`中，因为一个对象的属性只能是`string`、`number`或者`symbol`这三种类型，所以我们限定`K`必须满足此条件。
* `keyof T | K`：这里表示`keyof T`的联合类型和`K`，组合成一个新的联合类型。

## Absolute(绝对值)
<link-and-solution num="529" />

### 用法
`Absolute`是用来取一个数的绝对值的，其用法如下：
```ts
// 结果1："531"
type result1 = Absolute<-531>
// 结果2："9999"
type result2 = Absolute<9_999n>
```
### 实现方式
```ts
type NumberLike = number | string | bigint
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

## StringToArray(字符串转数组)
::: tip
此题不属于type-challenges类型挑战题
:::
### 用法
`StringToArray`是用来将一个字符串转换成一个数组的，其用法如下：
```ts
// 结果：['h', 'e', 'l', 'l', 'o']
type result = StringToArray<'hello'>
```
### 实现方式
```ts
type StringToArray<
  S extends string,
  U extends any[] = []
> = S extends `${infer Char}${infer R}`
      ? StringToArray<R, [...U, Char]>
      : U
```
代码详解：`StringToArray`的实现主要是使用了递归的思想，它每次拿到字符串中一个字符，然后存入一个辅助数组中，当字符串为空时，直接返回这个辅助数组。

## StringToUnion(字符串转联合类型)
<link-and-solution num="531" />

### 用法
在实现`StringToArray`后，我们能够很容易实现`StringToUnion`，其用法如下：
```ts
// 结果：'h' | 'e' | 'l' | 'l' | 'o'
type result = StringToUnion<'hello'>
```
### 实现方式
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

## Merge(类型合并)
<link-and-solution num="599" />

### 用法
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
### 实现方式
```ts
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never
}
```
代码详解：
* `keyof F | keyof S`：这段代码的含义是将`F`和`S`这两个对象的键组合成一个新的联合类型。
* `P extends`：这里进行了两次`extends`判断，其中第二次不能直接写成`F[P]`，而应该多判断一次，当满足条件时才使用`F[P]`，这是因为`P`的类型判断无法作用于`:`符号后面。


## KebabCase(字符串转连字符)
<link-and-solution num="612" />

### 用法
`KebabCase`是用来将驼峰形式字符串，转成连字符形式字符串的，其用法如下：
```ts
// 结果：foo-bar-baz
type result = KebabCase<'FooBarBaz'>
```
### 实现方式
```ts
type KebabCase<
  S extends string
> = S extends `${infer S1}${infer S2}`
      ? S2 extends Uncapitalize<S2>
        ? `${Uncapitalize<S1>}${KebabCase<S2>}`
        : `${Uncapitalize<S1>}-${KebabCase<S2>}`
      : S
```

## Diff(类型差异部分)
<link-and-solution num="645" />

### 用法
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
### 实现方式
```ts
type DiffKeys<T, U> = Exclude<keyof T | keyof U, keyof (T | U)>
type Diff<T, U> = {
  [K in DiffKeys<T, U>]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never
}
```
代码详解：
* `keyof Foo | keyof Bar`：这段代码是把`T`和`U`中的所有属性组合成一个新的联合类型。
* `keyof (T | U)`：这段代码是取`T`和`U`的公共属性。
* `Exclude<K1, K2>`：这段代码主要是用来从`K1`中排除`K2`，带入以上例子也就是排除掉所有公共属性。
* `Diff<T, U>`：在获取到`DiffKeys`后，就可以迭代的方式获取到每个属性`key`，它所对应的类型了。
* `K extends keyof U`：额外再判断一次，是因为`K`不能在三元表达式右侧使用。

## AnyOf(数组元素真值判断)
<link-and-solution num="949" />

### 用法
`AnyOf`用来判断数组元素真假值的，如果任一值为真，返回`true`；数组为空或者全部为`false`，才返回`false`，其用法如下：
```ts
// 结果1：true
type result1 = AnyOf<[0, false, 0, { name: 'name' }]>
// 结果2：false
type result2 = AnyOf<[0, '', false, [], {}]>
```
### 实现方式
```ts
type FalsyType = 0 | '' | false | undefined | null | [] | { [key: string]: never }
type AnyOf<T extends readonly any[]> = T[number] extends FalsyType ? false : true
```
代码详解：因为我们就是要区分`true/false`，所以我们把所有为`false`的值全部列举出来，然后使用`T[number]`索引迭代，依次去跟`FalsyType`比较，其中`{ [key: string]: never }`表示空对象`{}`。

## IsNever(是否是Never类型)
<link-and-solution num="1042" />

### 用法
`IsNever`是用来判断是否为`never`类型，其用法如下：
```ts
// 结果1：false
type result1 = IsNever<undefined>
// 结果2：true
type result2 = IsNever<never>
// 结果3：false
type result3 = IsNever<never | string>
```
### 实现方式
```ts
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

// way1: 类型数组
type IsNever<T> = T[] extends never[] ? true : false
// way2: 数组值
type IsNever<T> = [T] extends [never] ? true : false
// way3: 值比较
type IsNever<T> = Equal<T, never>
```

## IsUnion(是否联合类型)
<link-and-solution num="1097" />

### 用法 
`IsUnion`是用来判断一个类型是否为联合类型的，其用法如下：
```ts
// 结果1：true
type result1 = IsUnion<string|number|boolean>
// 结果2：false
type result2 = IsUnion<string>
// 结果3：false
type result2 = IsUnion<never>
```
### 实现方式
```ts
// way1: 排除法
type IsUnion<T, U = T> =
  [T] extends [never]
    ? false
    : T extends U
      ? [Exclude<U, T>] extends [never]
        ? false
        : true
      : false
// way2: 正反对比法
type IsUnion<T, U = T> = 
  (T extends U
    ? U extends T
      ? true
      : unknown
    : false
  ) extends true ? false : true
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
根据之前我们学到的**分布式条件类型**知识，`T extends U`的时候，会把`T`进行子类型分发。

如案例一的`step3`、`step4`，在分发后会把每次迭代的结果联合起来，组合成最终的结果。

## ReplaceKeys(类型替换)
<link-and-solution num="1130" />

### 用法
`ReplaceKeys`是用来在一个类型中，使用指定的Y类型来替换已经存在的T类型的，其用法如下：
```ts
// 结果：{ id: number; name: boolean; }
type result = ReplaceKeys<{ id: number; name: string; }, 'name', { name: boolean; }>
```
### 实现方式
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

## RemoveIndexSignature(移除索引签名)
<link-and-solution num="1367" />

### 用法
`RemoveIndexSignature`是用来移除一个类型中的索引签名的，其用法如下：
```ts
type Foo = {
  [key: string]: any;
  foo(): void;
}

// 结果：{ foo(): void; }
type result = RemoveIndexSignature<Foo>
```
### 实现方式
```ts
type NeverIndex<P> = string extends P ? never : number extends P ? never : P
type RemoveIndexSignature<T> = {
  [P in keyof T as NeverIndex<P>]: T[P]
}
```
代码详解：
* `NeverIndex`：因为索引签名有一个特点，为`string`或者`number`类型，所以我们通过`string extends P`或者`number extends P`的形式排除此索引签名。
* `as NeverIndex<P`：在之前的案例中，我们介绍过`as`的用法，在这里有**加工**或**再次断言**的意思。在使用`in`操作符进行迭代时，对每一个`P`再使用`NeverIndex`加工一下，如果是索引签名，这里的结果为`never`，为`never`时表示跳过当前迭代，进而达到排除索引签名的目的。

## PercentageParser(百分比解析)
<link-and-solution num="1978" />

### 用法
`PercentageParser`是用来解析百分比字符串的，其用法如下：
```ts
type result1 = PercentageParser<'+85%'> // ['+', '85', '%']
type result2 = PercentageParser<'-85%'> // ['-', '85', '%']
type result3 = PercentageParser<'85'>   // ['', '85', '']
```

### 实现方式
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

## DropChar(移除字符)
<link-and-solution num="2070" />

### 用法
`DropChar`是用来在字符串中移除指定字符的，其用法如下：
```ts
// 结果：butterfly!
type result = DropChar<' b u t t e r f l y ! ', ' '>
```
### 实现方式
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

## MinusOne(减一)
<link-and-solution num="2257" />

`MinusOne`是用来实现数字减一的，其用法如下：
### 用法
```ts
// 结果：99
type result = MinusOne<100>
```

### 实现方式
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

## PickByType(根据类型选取)
<link-and-solution num="2595" />

### 用法
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
### 实现方式
```ts
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
```
代码详解：`PickByType`的实现，可以使用`as`进行第二次断言，当类型满足时就返回当前迭代的`P`，不满足类型时就返回`never`，因为`never`最后会被排除，所以最后的迭代结果只有满足类型的键。

## StartsWith(字符串startsWith方法)
<link-and-solution num="2688" />

### 用法
`StartsWith`是用来实现`JavaScript`中字符串的`startsWith`功能，其用法如下：
```ts
// 结果：true
type result = StartsWith<'abc', 'ab'>
```
### 实现方式
```ts
type StartsWith<
  S extends string,
  C extends string
> = S extends `${C}${string}` ? true : false
```

## EndsWith(字符串endsWith方法)
<link-and-solution num="2693" />

### 用法
`EndsWith`是用来实现`JavaScript`中字符串的`endsWith`功能，其用法如下：
```ts
// 结果：true
type result = endsWith<'abc', 'bc'>
```
### 实现方式
```ts
type EndsWith<
  S extends string,
  C extends string
> = S extends `${string}${C}` ? true : false
```

## PartialByKeys(按需可选)
<link-and-solution num="2757" />

### 用法
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
### 实现方式
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

## RequiredByKeys(按需必填)
<link-and-solution num="2759" />

在实现`PartialByKeys`后，很容易按照相同的思路去实现`RequiredByKeys`。
### 用法
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

### 实现方式
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

## Mutable(可改)
<link-and-solution num="2793" />

### 用法
`Mutable`是用来让所有属性变为可改的(移除`readonly`关键词)，其用法为：
```ts
type Person = {
  readonly name: string;
  age: number;
}
// 结果：{ name: string; age: number; }
type MutableResult = MyMutable<Person>
```
### 实现方式
```ts
type MyMutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```
代码解读：
* `-readonly`：表示把`readonly`关键词去掉，去掉之后此字段变为可改的。

## OmitByType(按类型移除)
<link-and-solution num="2852" />

`OmitByType`的实现思路和`PickByType`类似。
### 用法
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

### 实现方式
```ts
type OmitByType<T, U> = {
  [P in keyof T as U extends T[P] ? never : P]: T[P]
}
```
代码解析：实现思路参考`PickByType`。

## ObjectEntries
<link-and-solution num="2946" />

### 用法
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
### 实现方式
```ts
type ObjectEntries<T, U = Required<T>> = {
  [P in keyof U]: [P, U[P]]
}[keyof U]
```
代码详解：借助`U`类型，然后对其`Required`是为了去掉可选类型，`U[keyof U]`表示取出`U`中键的类型组成的联合类型。

<link-and-solution num="3060" />

与`pop`和`push`方法相似的另外一对方法叫`shift`和`unshift`，它们的实现思路是一样的。

## Shift(数组shift方法)
<link-and-solution num="3062" />

### 用法
```ts
// Shift结果：[2, 3]
type shiftResult = Shift<[1, 2, 3]>
```
### 实现方式
```ts
// Shift实现
type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : never
```

## TupleToNestedObject(元组转嵌套对象)
<link-and-solution num="3188" />

### 用法
`TupleToNestedObject`是用来将元组转成嵌套对象的，其用法如下：
```ts
// 结果：{ a: { b: string; } }
type result = TupleToNestedObject<['a', 'b'], string>
```
### 实现方式
```ts
type TupleToNestedObject<T extends any[], U> =
  T extends [infer F, ...infer R]
    ? F extends string
      ? { [P in F]: TupleToNestedObject<R, U> }
      : never
    : U
```

## Reverse
<link-and-solution num="3192" />

### 用法
`Reverse`是用来实现数组的`reverse()`方法的，其用法如下：
```ts
// 结果：['b', 'a']
type result = Reverse<['a', 'b']>
```
### 实现方式
```ts
type Reverse<T extends any[]> =
  T extends [...infer R, infer L]
    ? [L, ...Reverse<R>]
    : []
```

## FlipArguments(反转函数参数)
<link-and-solution num="3196" />

借助上面的`Reverse`方法，可以很容易实现函数参数的反转。
### 用法
`FlipArguments`是用来实现函数参数反转的，其用法如下：
```ts
// 结果：(a: number, b: string) => string | number
type result = FlipArguments<(a: string, b: number) => string | number>
```
### 实现方式
```ts
type FlipArguments<T> = 
  T extends (...args: infer A) => infer R
    ? (...args: Reverse<A>) => R
    : never
```

## FlattenDepth(数组按深度降维)
<link-and-solution num="3243" />

### 用法
`FlattenDepth`是用来按深度进行数组降维的，其用法如下：
```ts
// 结果：
type result = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>
```
### 实现方式
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

## BEM
<link-and-solution num="3326" />

### 用法
`BEM`是用来将字符串连接成CSS BEM格式的，其用法如下：
```ts
// 结果：'btn--price__small' | 'btn--price__mini' 
type result = BEM<'btn', ['price'], ['small', 'mini']>
```
### 实现方式
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

## InOrderTraversal(中序遍历)
<link-and-solution num="3376" />

**先序遍历**：先访问根节点，然后访问左节点，最后访问右节点。
**中序遍历**：先访问左节点，然后访问根节点，最后访问右节点。
**后序遍历**：先访问左节点，然后访问右节点，最后访问根节点。
### 用法
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
### 实现方式
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

## FlipObject(对象键值交换)
<link-and-solution num="4179" />

### 用法
`FlipObject`是用来将对象的键值交换的，其用法如下：
```ts
// 结果：{ pi: 'a' }
type result = FlipObject<{ a: 'pi' }>
```
### 实现方式
```ts
type BasicType = string | number | boolean
type FlipObject<T extends Record<string, BasicType>> = {
  [P in keyof T as `${T[P]}`]: P
}
```

## Fibonacci(斐波那契数列)
<link-and-solution num="4182" />

**菲波那切数列**：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
### 用法
`Fibonacci`是用来实现菲波那切数列的，用法如下：
```ts
type result = Fibonacci<5>
```
### 实现方式
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

## AllCombination(全排列)
<link-and-solution num="4260" />

### 用法
`AllCombination`是用来列举全部排列组合可能性的，其用法如下：
```ts
// 结果：'' | 'A' | 'AB' | 'B' | 'BA'
type result = AllCombination<'AB'>
```
### 实现方式
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

## GreaterThan(大于)
<link-and-solution num="4425" />

### 用法
`GreaterThan<T, N>`是来用判断正整数T是否大于正整数N的，其用法如下：
```ts
// 结果：true
type result = GreaterThan<2, 1>
```
### 实现方式
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

## Zip(按位置匹配)
<link-and-solution num="4471" />

### 用法
`Zip`是用来将两个元组按照相同索引位置组合成一个新数组的，用法如下：
```ts
// 结果：[[1, true], [2, false]]
type result = Zip<[1, 2], [true, false]>
```
### 实现方式
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

## IsTuple(是否为元组)
<link-and-solution num="4484" />

### 用法
`IsTuple`是用来判断是否为一个元组的，用法如下：
```ts
// 结果：true
type result = IsTuple<[number]>
```
### 实现方式
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

## Chunk(lodash分割数组)
<link-and-solution num="4499" />

[Lodash Chunk](https://www.lodashjs.com/docs/lodash.chunk): 将一个数组分割成长度为N的多个小数组。
### 用法
```ts
// 结果：[[1, 2], [3, 4]]
type result = Chunk<[1, 2, 3, 4], 2>
```
### 实现方式
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


## Fill(数组fill方法)
<link-and-solution num="4518" />

实现`Fill`时，不考虑索引，全部替换。
### 用法
```ts
// 解雇：[true, true, true]
type result = Fill<[1, 2, 3], true>
```
### 实现方式
```ts
type Fill<
  T extends any[],
  U
> = T extends [any, ...infer Rest]
    ? [U, ...Fill<Rest, U>]
    : []
```

## Without(移除)
<link-and-solution num="5117" />

`Without<T, F>`，其中`T`需要是数组形式，`F`可以是一个数字或者一个数组。
### 用法
`Without`是用来从数组中移除指定元素的，其用法如下：
```ts
// 结果：
type result = Without<[1, 2, 1, 2, 3], [1, 2]>
```
### 实现方式
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

## Trunc(Math.trunc取整)
<link-and-solution num="5140" />

### 用法
`Trunc`是用来实现`Math.trunc()`方法的，其用法如下：
```ts
// 结果：100
type result = Trunc<100.32>
```
### 实现方式
```ts
type Trunc<T extends number | string> = `${T}` extends `${infer L}.${string}` ? L : `${T}`
```

## IndexOf(数组indexOf方法)
<link-and-solution num="5153" />

### 用法
`IndexOf`是用来实现数组`indexOf`方法的，其用法如下：
```ts
// 结果：2
type result = IndexOf<[1, 2, 3, 4], 3>
```
### 实现方式
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

## Join(数组join方法)
<link-and-solution num="5310" />

### 用法
`Join`是用来实现数组`join`方法的，其用法如下：
```ts
// 结果：'a-p-p-l-e'
type result = Join<['a', 'p', 'p', 'l', 'e'], '-'>
```
### 实现方式
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

## LastIndexOf(数组lastIndexOf方法)
<link-and-solution num="5317" />

### 用法
`LastIndexOf`是用来实现数组`lastIndexOf`方法的，其用法如下：
```ts
// 结果：3
type result = LastIndexOf<[1, 2, 3, 4, 5], 4>
```
### 实现方式
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

## Unique(数组去重)
<link-and-solution num="5360" />

### 用法
`Unique`是用来实现数组去重的，其用法如下：
```ts
// 结果：[1, 2, 3]
type result = Unique<[1, 1, 2, 2, 3, 3]>
```
### 实现方式
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

## MapTypes(类型转换)
<link-and-solution num="5821" />

### 用法
`MapTypes`是用来根据指定类型进行替换的，其用法如下：
```ts
// 结果：{ type: number; age: number; }
type result = MapTypes<{ type: string; age: number; }, { mapFrom: string;mapTo: number; }>
```
### 实现方式
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
'
'

## ConstructTuple(构造元组)
<link-and-solution num="7544" />

### 用法
### 实现方式

## NumberRange(限定范围数字)
<link-and-solution num="8640" />

### 用法
### 实现方式

## Combination(元素组合)
<link-and-solution num="8767" />

### 用法
### 实现方式

## Subsequence(元组子序列)
<link-and-solution num="8987" />

### 用法
### 实现方式

## CheckRepeatedChars(是否包含相同字符)
<link-and-solution num="9142" />

### 用法
### 实现方式

## FirstUniqueCharIndex(字符串中第一个唯一字符)
<link-and-solution num="9286" />

### 用法
### 实现方式

## ParseUrlParams(解析url路径参数)
<link-and-solution num="9616" />

### 用法
### 实现方式

## GetMiddleElement(数组中位数)
<link-and-solution num="9896" />

### 用法
### 实现方式

## FindEles(数组只出现一次的元素)
<link-and-solution num="9898 " />

### 用法
### 实现方式

## CountElementNumberToObject(计数元素出现的次数)
<link-and-solution num="9989 " />

### 用法
### 实现方式

## Integer(数字整数)
<link-and-solution num="9989 " />

### 用法
### 实现方式

## ToPrimitive(转化基本类型)
<link-and-solution num="16259 " />

### 用法
### 实现方式

## DeepMutable(深度Mutable)
<link-and-solution num="17973 " />

### 用法
### 实现方式

## All(数组元素是否于给定元素相同)
<link-and-solution num="18142 " />

### 用法
### 实现方式

## Filter(数组过滤)
<link-and-solution num="18220 " />

### 用法
### 实现方式

## FindAllIndex(查找数组中给定元素所有索引)
<link-and-solution num="21104 " />

### 用法
### 实现方式
