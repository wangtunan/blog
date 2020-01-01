---
sidebar: auto
---

# JavaScript数据结构和算法

## 数组
数组存储了一系列同一种数据类型的值，虽然在`JavaScript`中，也可以在数组中保存不同类的值，但我们还是需要遵守最佳实践，避免这样做。

### 为什么用数组？
问：为什么我们需要使用数组？<br/>
答：在生活中，我们经常会碰到类似于如下这样的需求：保存所在城市每个月的平均温度。
```js
const averageTempJan = 31.9
const averageTempFeb = 35.3
const averageTempMar = 42.4
const averageTempApr = 52
const averageTempMay = 60.8
```
幸运的时，一年只有12个月，我们最多只需要定义12个变量便能满足以上的需求。但如果我们需要记录一年365天每一天的平均温度，那么我们是否需要定义365个变量呢？<br/>
这个时候，如果能够一种结构，能够存储这一类的数据，那么就可以解决我们当前遇到的问题，正如你所猜到的那样，这种结构就是数组：
```js
const averageTemp = []
averageTemp[0] = 31.9
averageTemp[1] = 35.3
averageTemp[2] = 42.4
averageTemp[3] = 52
averageTemp[4] = 60.8
```

### 创建和初始化数组
::: tip
创建和初始化数组有两种方式：构造函数和字面量
:::

使用构造函数创建和初始化数组像下面这样：
```js
let arr = new Array()           // 创建一个空数组
let arr1 = new Array(7)         // 创建一个长度为7的数组
let arr2 = new Array(1, 2, 3)   // 创建一个数组，其元素为1， 2， 3
console.log(arr)                // []
console.log(arr1)               // [empty*7]
console.log(arr2)               // [1, 2, 3]
```
除了使用`new`调用构造函数的方式以外，我们使用最常见的是字面量：
```js
let arr = []           // 创建一个空数组
let arr2 = [1, 2, 3]   // 创建一个数组，其元素为1， 2， 3
console.log(arr)       // []
console.log(arr2)      // [1, 2, 3]
```
#### 访问元素和迭代数组
::: tip
要访问数组中特定位置的元素，可以用中括号传递数值位置，进而得到想知道的值或赋新的值。
:::
```js
let arr = [1, 2, 3, 4, 5]
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
// 输出
// 1
// 2
// 3
// 4
// 5
```

### 添加元素
在数组中添加和删除元素有时候很容易，有时候也很棘手，这取决于具体的情况。

#### 在数组末尾添加元素
```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers[numbers.length] = 10
console.log(numbers)  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
代码分析：在`JavaScript`中数组是一个可以修改的对象，如果添加元素，数组的长度就会动态增长，即：添加之前`numbers.length`值为9，添加之后`numbers.length`值为10。

如果只是在数组的末尾添加元素，那么数组已经提供给了我们一个简便的方法：`push()`方法：
```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers.push(10)
console.log(numbers)  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
numbers.push(11, 12)
console.log(numbers)  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

#### 在数组开头添加元素
不同于我们直接在数组的末尾添加一个元素那样简单，如果要在数组的开头添加一个元素，需要我们依次把数组中的每一个元素往后移动一位，最后把待添加的元素放置到最前面。
```js
Array.prototype.insertFirstPosition = function (value) {
  for (let i = this.length; i>=0; i--) {
    this[i] = this[i - 1]
  }
  this[0] = value
}
const numbers = [1, 2, 3]
numbers.insertFirstPosition(0)
console.log(numbers)  // [0, 1, 2, 3]
```
对于数组而言，在数组的开头添加元素是一个非常常见的场景，因此数组给我们提供了一个`unshift()`方法：
```js
const numbers = [1, 2, 3]
numbers.unshift(0)
console.log(numbers)  // [0, 1, 2, 3]
```

### 删除元素

### 在任意位置添加和删除元素

### 二维和多维数组

### JavaScript的数组方法参考

## 栈

### 创建一个JavaScript数据结构和算法库

### 栈数据结构

### 创建一个基于JavaScript对象的栈结构

### 保护数据结构内部元素

### 用栈解决实际问题

## 队列和双端队列

### 队列数据结构

### 双端队列数据结构

### 使用队列和双端队列解决实际问题

## 链表

### 链表数据结构

### 双向链表

### 循环链表

### 有序链表

### 创建StackLinkedList类

## 集合

### 构建数据集合

### 创建集合类

### 集合运算

### ES6中的Set类

### 多重集或袋

## 字典和散列表

### 字典

### 散列表

### ES6中的Map类

### ES6中的WeakMap类和WeakSet类

## 递归

### 理解递归

### 计算一个数的阶乘

### 斐波那契数列

### 为什么要用递归？


## 树

### 树数据结构

### 树的相关术语

### 二叉树和二叉搜索树

### 树的遍历

### 搜索树中的值

### 自平衡树

## 二叉堆和堆排序

### 二叉堆数据结构

### 堆排序算法

## 图

### 图的相关术语

### 图的表示

### 创建Graph类

### 图的遍历

### 最短路径算法

### 最小生成树


## 排序和搜索算法

### 排序算法

### 搜索算法

### 随机算法

## 算法设计与技巧

### 分而治之

### 动态规划

### 贪心算法

### 回溯算法

### 函数式编程简介

## 算法复杂度

### 大`O`表示法

### 用算法娱乐身心