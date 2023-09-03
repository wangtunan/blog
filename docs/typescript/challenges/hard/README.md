# 困难

## Currying(柯里化)
在`JavaScript`中`Currying`是用来实现函数柯里化的，其用法如下：
```js
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```
### 用法
`Currying`是用来实现`JavaScript`中的柯里化的，其用法如下：
```js
const func = Currying((a: number, b: string, c: boolean) => true)
// (a: string) => (a: number) => (a: boolean) => true
type funcType = typeof func
```
### 实现方式
```js
type Curry<P, R> =
  P extends []
    ? () => R
    : P extends [infer First, ...infer Rest]
      ? (a: First) => Rest['length'] extends 0 ? R : Curry<Rest, R>
      : R
declare function Currying<F>(fn: F): F extends (...args: infer P) => infer R ? Curry<P, R> : never
```

## UnionToIntersection(元组取交集)
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

### 用法
`UnionToIntersection`所做的事情和`&`符号是一样的，其用法如下：
```ts
// 结果：never
type result1 = UnionToIntersection<1 | 'foo' | true>
// 结果：{ a: number; b: number; c: boolean; }
type result2 = UnionToIntersection<{ a: number; b: number; } | { b: string | number; c: boolean; }>
// 结果：(a: boolean | number) => string
type result3 = UnionToIntersection<((a: boolean) => string | number) | ((a: number) => string)>
```
### 实现方式
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

## RequiredKeys(所有必填字段)
### 用法
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
### 实现方式
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

## GetRequired(必填字段组成的类型)
### 用法
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
### 实现方式
在`RequiredKeys`的基础上，能够很容易的实现`GetRequired`。
```ts
type GetRequired<T> = {
  [P in RequiredKeys<T>]: T[P]
}
```

## OptionalKeys(所有可选字段)
`OptionalKeys`和`RequiredKeys`所做的事情相反，其获取的是所有可选字段。
### 用法
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
### 实现方式
```ts
type OptionalKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? never : P
}[keyof T]
```
代码详解：从上面代码中可以看出，它和`RequiredKeys`实现思路是一样的，区别只是在`extends`关键词后面的处理不同。

## GetOptional(可选字段组成的类型)
### 用法
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
### 实现方式
```ts
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P]
}
```

## CapitalizeWords(所有单词首字母大写)
### 用法
`CapitalizeWords`是用来把一个字符串中所有单词，变为大写字母的，其中这个字符串以固定的分隔符分割，用法如下：
```ts
// 结果：'Foobar'
type t1 = CapitalizeWords<'foobar'>
// 结果：'Foo Bar.Hello,World'
type t2 = CapitalizeWords<'foo bar.hello,world'>
```
### 实现方式
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

## CamelCase(下划线字符串转小驼峰)
### 用法
与**中级**章节实现不同，此章节中`CamelCase`是用来将下划线字符串转小驼峰的，其用法如下：
```ts
// 结果：'fooBarHelloWorld'
type result = CamelCase<'foo_bar_hello_world'>
```
### 实现方式
```ts
type CamelCase<
  S extends string
> = S extends `${infer left}_${infer char}${infer right}`
      ? `${Lowercase<left>}${Uppercase<char>}${CamelCase<right>}`
      : Lowercase<S>
```

## ParsePrintFormat(获取字符串格式化参数)
### 用法
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
### 实现方式
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

## IsAny和NotAny
### 用法
`IsAny`是用来判断一个类型是否为`any`的，`NotAny`和它做的事情相反。
```ts
type t1 = IsAny<undefined> // false
type t2 = IsAny<never>     // false
type t3 = IsAny<any>       // true

type t4 = NotAny<undefined> // true
type t5 = NotAny<never>     // true
type t6 = NotAny<any>       // false
```
### 实现方式
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

## Get(字符串路径取值)
### 用法
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
### 实现方式
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

## StringToNumber(字符串数字转数字)
### 用法
`StringToNumber`是用来将字符串形式的数字转换成真正数字类型数字的，其用法如下：
```ts
// 结果：123
type result = StringToNumber<'123'>
```
### 实现方式
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


## FilterOut(数组元素过滤)
### 用法
`FilterOut`是用来从数组中移除指定元素的，其用法如下：
```ts
// 结果：[2]
type result = FilterOut<[1, 'a', 2], 'a' | 1>
```
### 实现方式
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

## TupleToEnum(元组转枚举)
### 用法
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
### 实现方式
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

## Format(字符串格式化函数类型)
`%s`表示格式化为`(x: string) => any`形式，`%d`表示格式化为`(x: number) => any`形式。
### 用法
`Format`是将字符串格式化为指定函数类型的，用法如下：
```ts
// 结果1：(x: string) => string
type result1 = Format<'a%sbc'>
// 结果2：(x: number) => string
type result2 = Format<'a%dbc'>
// 结果3：(x: number) => (x: string) => string>
type result3 = Format<'a%dbc%s'>
```
### 实现方式
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

## LengthOfString(字符串的长度)
我们之前在**中级**大章节中已经实现过`LengthOfString`，但它面临的问题是，如果字符有上百个，由于`TS`对于递归的次数存在限制，会提示嵌套过深。
### 用法
```ts
// 结果：91
type result = LengthOfString<'1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'>
```
### 实现方式
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

## UnionToTuple(联合类型转元组)
### 用法
`UnionToTuple`是用来将联合类型转成元组的，用法如下：
```ts
// 结果1：['a', 'b']
type result1 = UnionToTuple<'a'>
// 结果2：['a', 'b']
type result2 = UnionToTuple<'a' | 'b'>
// 结果3：['a', 'b']
type result3 = UnionToTuple<'a' | 'b' | never>

```
### 实现方式
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

## Join(字符串拼接)
### 用法
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
### 实现方式
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

## DeepPick(深层次Pick)
### 用法
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
### 实现方式
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

## Camelize(对象属性键转小驼峰)
### 用法
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
### 实现方式
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

## DropString(移除全部字符)
### 用法
`DropString`是用来移除全部字符的，用法如下：
```ts
// 结果：'ooar!'
type result = DropString<'foobar!', 'fb'>
```
### 实现方式
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

## Split(字符串Split方法)
### 用法
`Split`是用来实现字符串`split`方法的，其用法如下：
```ts
// 结果：["Hi!", "How", "are", "you?"]
type result = Split<'Hi! How are you?', ' '>
```
### 实现方式
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

## IsRequiredKeys(是否为必填key)
### 用法
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
### 实现方式
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

## ObjectEntries(对象的entries方法)
### 用法
### 实现方式

## IsPalindrome(是否为回文)
### 用法
### 实现方式

## MutableKeys(所有可写键)
### 用法
### 实现方式

## Intersection(交集)
### 用法
### 实现方式

## BinaryToDecimal(二进制转十进制)
### 用法
### 实现方式
