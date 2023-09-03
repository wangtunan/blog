# 简单

## 内置Pick(选取)
<link-and-solution num="4" />

### 用法
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
### 实现方式
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


## 内置Readonly(只读)
<link-and-solution num="7" />
### 用法
`Readonly`是用来让所有属性变为只读，其用法为：
```ts
type Person = {
  readonly name: string;
  age: number;
}

// 结果：{ readonly name: string; readonly age: number; }
type result = MyReadonly<Person>
```
### 实现方式
```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

## TupleToObject(元组转对象)
<link-and-solution num="11" />

### 用法
`TupleToObject<T>`是用来把一个元组转换成一个`key/value`相同的对象，例如：
```ts
// 类型：readonly ['msg', 'name']
const tuple = ['msg', 'name'] as const
// 结果：{ msg: 'msg'; name: 'name'; }
type result = TupleToObject<typeof tuple>
```
### 实现方式
```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```
代码详解：
* `as const`：常用来进行常量断言，在此处表示将`['msg','name']`推导常量元组，表示其不能新增、删除、修改元素，可以使用`as readonly`来辅助理解。
* `T[number]`：表示返回数组中所有数字型索引的元素，形成一个联合类型，例如：`'msg'|'name'`。

## First(数组第一个元素)
<link-and-solution num="14" />

### 用法
`First<T>`用来返回数组的第一个元素，用法如下：
```ts
// 结果：3
type result1 = First<[3, 2, 1]>
// 结果：never
type result2 = First<[]>
```
### 实现方式
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

## Length(元组的长度)
<link-and-solution num="18" />
### 用法
`Length<T>`用来获取一个数组(包括类数组)的长度，用法如下：
```ts
// 结果：3
type result1 = Length<[1, 2, 3]>
// 结果：10
type result2 = Length<{ 5: '5', length: 10 }>
```
### 实现方式
```ts
type Length<T extends any> = T extends { length: number; } ? T['length'] : never
```
代码详解：
* `T extends { length: number; }`：判断`T`是否是`{ length: number; }`的子类型，如果是则代表`T`为数组或者类数组。
* `T['length']`：取`T`对象的`length`属性的值(注意，在`TypeScript`中不能使用`T.length`来取值，而应该使用`T['length']`)。

## 内置Exclude(排除)
<link-and-solution num="43" />
### 用法
`Exclude`是排除的意思，它从`T`类型中排除属于`U`类型的子集，可以理解成取`T`对于`U`的差集，用法如下：
```ts
// 结果：'name'|'age'
type ExcludeResult = Exclude<'name'|'age'|'sex', 'sex'|'address'>
```
### 实现方式
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

## PromiseType(promise包裹类型)
<link-and-solution num="189" />
### 用法
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
### 实现方式
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

## If(判断)
<link-and-solution num="268" />
### 用法
`If<C, T, F>`用来表示根据`C`的值来返回`T`或者`F`，如果`C`为`true`，则返回`T`；如果`C`为`false`，则返回`F`，例如：
```ts
// 结果：'a'
type result1 = If<true, 'a', 'b'>
// 结果：'b'
type result2 = If<false, 'a', 'b'>
```
根据上案例，我们可以直观的发现`If<C, T, F>`的作用有点类似`JavaScript`中的三元表达式：`C ? T : F`。
### 实现方式
```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```
代码详解：
* `C extends boolean`：表示`C`为`boolean`类型的子类型，既`C`只能为`true`或者`false`，传递其它值报错。
* `C extends true`：如果用`JavaScript`来表示的话，相当于`C===true`.

## Concat(数组concat方法)
<link-and-solution num="533" />
### 用法
`Concat<T, U>`用来将两个数组合并起来，类似实现数组的`concat`方法，使用方式如下：
```ts
// 结果：[1, 2, 3, 4]
type result = Concat<[1, 2], [3, 4]>
```
### 实现方式
```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```
代码详解：
* `T extends any[]`：用来限制`T`是一个数组，如果传递非数组会报错，`U`也是一样的道理。
* `[...T, ...U]`：可以理解成`JavaScript`的扩展运算符`...`。

## Includes(数组includes方法)
<link-and-solution num="898" />

### 用法
`Includes<T, U>`用来判断`U`是否在数组`T`中，类似实现数组的`includes`方法，用法如下：
```ts
// 结果：true
type result1 = Includes<[1, 2, 3], 1>
// 结果：false
type result2 = Includes<[1, 2, 3], '1'>
```
### 实现方式
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

## Push(数组push方法)
<link-and-solution num="3057" />

### 用法
```ts
// 结果：[1, 2, 3, 4]
type result = Push<[1, 2, 3], 4>
```

### 实现方式
```ts
// Push实现
type Push<T extends any[], K> = [...T, K]
```

## Unshift(数组unshift方法)
<link-and-solution num="3060" />

与`pop`和`push`方法相似的另外一对方法叫`shift`和`unshift`，它们的实现思路是一样的。
### 用法
```ts
// 结果：[0, 1, 2, 3]
type result = Unshift<[1, 2, 3], 0>
```
### 实现方式
```ts
// Unshift实现
type Unshift<T extends any[], K> = [K, ...T]
```

## 内置Parameters(函数的参数类型)
<link-and-solution num="3312" />

### 用法
`Parameters`是用来获取一个函数的参数类型的，其中获取的结果是一个元组，用法如下：
```ts
const add = (a: number, b: string): void => {}
// [number, string]
type result = MyParameters<typeof add>
```
### 实现方式
```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : never
```

## 内置Partial(可填)和内置Required(必填)
::: tip
此题不属于type-challenges类型挑战题
:::
### 用法
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
### 实现方式
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
```


## 内置Record(构造)
::: tip
此题不属于type-challenges类型挑战题
:::
### 用法
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
### 实现方式
```ts
type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}
```
代码详解：
* `K extends keyof any`：此代码表示`K`是`keyof any`任意类型其所有键的子类型，例如：
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

## 内置Extract(交集)
::: tip
此题不属于type-challenges类型挑战题
:::
### 用法
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
### 实现方式
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

















