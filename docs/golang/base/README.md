---
sidebar: auto
---

# Go基础

## 约定规则
Go中有一些约定的规则：
* 每个`.go`文件必须有一个包名，例如`package main`，其中`main`即为包名。
* 严格区分大小写，大写开头的变量、常量或者方法可跨包访问。
* 双引号代表字符串，单引号代表字符，例如：`"abc"`和`'a'`。
* 不需要写分号。

## 注释
```go
package main
/*
  这是一个main函数的多行注释
  多行注释
  多行注释
*/
func main() {
  // 这是单行注释
  fmt.Print("main")
}
```

## 变量和常量
变量和常量分别使用`var`和`const`关键词来定义。

### 定义方式
`var`变量定义方式如下：
```go
var v1 int     // 变量名 + 指明类型
var v2 int = 2 // 变量名 + 指明类型 + 初始值
var v3 = 3     // 变量名 + 初始值(自动推导类型)
v1 = 1         // 仅赋值
v4 := 4        // 不需要关键词且自动推导类型(推荐)

// 使用括号定义多个变量
var (
  v5 = 5
  v6 int
  v7 int = 7
)
```
`const`常量定义方式如下：
```go
const v1 int = 1 // 常量名 + 指明类型 + 初始值
const v2 = 2     // 常量名 + 初始值(自动推导类型)
v3 := 3          // 不需要关键词且自动推导类型(推荐)

// 使用括号定义多个常量
const (
  v4     = 4
  v5 int = 5
)
```

### 全局变量(常量)
在`.go`文件中，定义在最外层的变量、常量，在整个文件中都可以使用，它们叫这个包的全局变量(常量)。
```go
var mainGlobalVar = "global"

func main() {
	fmt.Printf("global var is %s", mainGlobalVar)
}
```

### 跨包变量(常量)
跨包变量(常量)，必须满足以下两个条件：
* 为全局变量(常量)。
* 必须大写开头，小写开头的变量(常量)被认为是这个包的私有变量(常量)，不能被访问。

`math/math.go`文件代码：
```go
package goMath

const PI = 3.1415926

func main() {

}
```

`main.go`文件代码：
```go
package main

import (
	"fmt"
	goMath "go-learn/math"
)

func main() {
	fmt.Printf("pi var is %f", goMath.PI)
}
```

## 基本数据类型
`Go`中，如果定义变量时没有赋初始值，则会根据其具体类型赋默认值。

`bit`：比特位，二进制中的一位，信息的最小单位。
`byte`: 字节，1 byte = 8 bit。
`binary`: 二进制，一般用`0b`或者`0B`来表示，例如：`0b0101`。
`octal`: 八进制，一般用`0o`或者`0O`来表示，例如：`0o377`。
`hexadecimal`: 十六进制，一般用`0x`或者`0X`来表示，例如`0xFF`。

### 整数型
分为有符号和无符号整数两种，例如：`int`(有符号)，`uint`(无符号)。

有符号和无符号的区别时，有符号整数第一个`bit`位会用来存放正负符号(0表示正数，1表示负数)，所以它所表示的最大数字要比无符号的整数要小。
* 有符号：`00000101`，十进制`5`; `10000101`，十进制`-5`。
* 无符号：`00000101`，十进制`5`; `10000101`，十进制`133`。

各种类型的`int`其对比如下：

| 类型 | bit长度 | 范围 | 默认值 | 说明 | 
| --- | --- | --- | --- | --- |
| int8 | 8 bit | -2⁷ 到 2⁷ - 1 | 0 | 长度确定 |
| uint8 | 8 bit | -2⁸ 到 2⁸ - 1 | 0 | 长度确定  |
| int16 | 16 bit | -2¹⁵ 到 2¹⁵ - 1 | 0 | 长度确定 |
| uint16 | 16 bit | 2¹⁶ 到 2¹⁶ - 1 | 0 | 长度确定  |
| int32 | 32 bit | -2³¹ 到 2³¹ - 1 | 0 | 长度确定  |
| uint32 | 32 bit | 2³² 到 2³² - 1 | 0 | 长度确定  |
| int64 | 64 bit | -2⁶³ 到 -2⁶³ - 1 | 0 | 长度确定  | 
| uint64 | 64 bit | 2⁶⁴ 到 2⁶⁴ - 1 | 0 | 长度确定 |
| int | 32/64 bit |  | 0 | 跟随32或者64位系统  |
| uint | 32/64 bit |  | 0 | 跟随32或者64位系统 |

### 浮点型
浮点型主要有`float32`和`float64`这两类，其区别如下：
| 类型 | bit长度 | 符号 + 整数 + 尾数 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| float32 | 32 bit | 1 + 8 + 23 | 0 |  |
| float64 | 64 bit | 1 + 11 + 52 | 0 | 不指明类型时，默认  | 

### 字符型
字符型用单引号来定义，`byte`和`rune`常用来定义字符型。
| 类型 | 别名 | 编码 |
| --- | --- | --- |
| byte | uint8 的别名 | ASCII |
| rune | int32 的别名 | UTF-8(ASCII的超集) |    

```go
package main

import "fmt"

func main() {
	var (
		c1 byte = 'a'  // 97
		c2 byte = 'A'  // 65
		c3 rune = '中' // 20013
	)
	fmt.Printf("c1 val is %v, c2 val is %v, diff is %v\n", c1, c2, c1-c2)
	fmt.Printf("c3 val is %v\n", c3)
}
```

### 布尔型
布尔值，只有`true`和`false`两种值。
| 类型 | bit长度 | 默认值 |
| --- | --- | --- |
| bool | 1 bit | false |

```go
package main

import "fmt"

func main() {
	var (
		b1 = true
		b2 bool
	)

	fmt.Printf("b1 val is %v, b2 val is %v \n", b1, b2)
}
```

### 字符串型
字符串需要通过双引号来定义。
| 类型 | 说明 | 默认值 |
| --- | --- | --- |
| string | 可通过len()查看长度 | "" |

```go
package main

import "fmt"

func main() {
	var (
		s1 = "abc"
		s2 string
	)

	fmt.Printf("s1 val is '%s', s2 val is '%s' \n", s1, s2)
	fmt.Printf("s1 length is %d, s2 length is %d \n", len(s1), len(s2))
}
```

## 指针
`Golang`中取地址符使用`&`符号，访问地址指向的值使用`*`，指针类型使用`*类型`，例如`*int`。

参数有如下两种传递方式：
* 值拷贝：开辟一块新的内存空间，存放原值的副本，副本和原值互不干扰。
```go
package main

import "fmt"

func increment(num int) int {
	num++
	return num
}

func main() {
	num := 3
	result := increment(num)                              // 值拷贝
	fmt.Printf("num is %d, result is %d \n", num, result) // 3, 4
}
```
* 值传递：开辟一块新的内存空间，存放原值的内存地址，可以通过原值的内存地址访问到原值。
```go
package main

import "fmt"

// *int表示int类型的指针类型
// *p代表指针指向的值
func incrementPointer(p *int) int {
	*p++
	return *p
}

func main() {
	num := 3
	result := incrementPointer(&num)                      // 值传递
	fmt.Printf("num is %d, result is %d \n", num, result) // 4, 4
}
```

## fmt格式字符

## 运算符

## 流程控制语句

## 函数

## 数组和切片

## map

## 结构体和自定义数据类型

## 方法和接口

## 协程/channel