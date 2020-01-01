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

#### 从数组末尾删除元素
::: tip
要删除数组末尾的元素，可以使用`pop()`方法，而通过`push()`方法和`pop()`方法，就能用数组来模拟栈结构。
:::
```js
let numbers = [1, 2, 3, 4, 5]
numbers.pop()
console.log(numbers)  // [1, 2, 3, 4]
```

#### 从数组开头删除元素
如果要从数组开头删除元素，其逻辑和在数组开头添加元素相反，需要把每一个元素向前挪动一位：
```js
let numbers = [1, 2, 3, 4, 5]
for(let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i + 1]
}
console.log(numbers)  // [2, 3, 4, 5, undefined]
```
代码分析：虽然我们把每一位往前移动了以为，但数组的长度依然为5，其中最后一个元素的值为`undefined`，且最后一个` numbers[i + 1]`已经超出了数组的最大长度，在其他语言中这种做法会抛出错误。<br/>
为了处理这个问题，我们需要像前面提到的往数组开头添加元素一样，定义一个方法：
```js
Array.prototype.reIndex = function (array) {
  const newArray = []
  for(let i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      newArray.push(array[i])
    }
  }
  return newArray
}
Array.prototype.removeFirstPosition = function () {
  for(let i = 0; i < this.length; i++) {
    this[i] = this[i + 1]
  }
  return this.reIndex(this)
}
let numbers = [1, 2, 3, 4, 5]
numbers.removeFirstPosition()
console.log(numbers)  // [2, 3, 4, 5]
```
::: tip
`shift()`方法和`unshift()`方法可以让数组模拟基本的队列数据结构。
:::
注意：上面的代码仅仅只是起到了在数组开头删除元素的示范作用，要真正运用到实际生产中，可以使用数组提供的`shift()`方法：
```js
let numbers = [1, 2, 3, 4, 5]
numbers.shift()
console.log(numbers)  // [2, 3, 4, 5]
```

### 在任意位置添加和删除元素
::: tip
使用`splice()`方法可以让我们在数组中的任意位置删除或添加元素，其参数为：
* 第一个参数：表示想要删除或插入的元素的索引。
* 第二个参数：表示删除元素的格式。
* 第三个参数：表示添加到数组中的值。
:::
```js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
numbers.splice(0, 1)        // 表示：在索引为0处，删除一个元素
console.log(numbers)        // 结果：[2, 3, 4, 5, 6, 7, 8, 9, 10]
numbers.splice(3, 2)        // 表示：在索引为3处，删除两个元素
console.log(numbers)        // 结果：[2, 3, 4, 7, 8, 9, 10]
numbers.splice(5, 0, 0, 1)  // 表示：在索引为5处，添加0和1这两个元素
console.log(numbers)        // 结果：[2, 3, 4, 7, 8, 0，1，9, 10]
```

### 二维和多维数组
`JavaScript`只支持一维数组，并不支持矩阵，但我们可以在数组中嵌套数组，来实现矩阵或任一多维数组。

#### 二维数组
一个二维数组的案例：
```js
let numbers = [
  [1, 2, 3, 4, 5],
  [11, 12, 13, 14, 15],
  [21, 22, 23, 24, 25]
]
```

二维数组可以使用`for`循环嵌套来输出：
```js
let numbers = [
  [1, 2, 3, 4, 5],
  [11, 12, 13, 14, 15],
  [21, 22, 23, 24, 25]
]
for(let i = 0; i < numbers.length; i++) {
  for(let j = 0; j < numbers[i].length; j++) {
    console.log(numbers[i][j])
  }
}
```

### JavaScript的数组方法参考
以下是在`ES5`就支持数组核心方法：
| 方法 | 描述 |
|------|------------|
| concat  | 连接2个或者更多数组，并返回结果 |
| every  | 对数组中的每一个元素运行给定的函数，如果该函数对每一个元素都返回`true`，则返回`true` |
| filter  | 对数组中的每一个元素运行给定的函数，返回该函数会返回`true`的元素组成的数组 |
| forEach  | 对数组中的每一个元素运行给定的函数 |
| join  | 将所有的数组元素以指定的字符链接成一个字符串 |
| indexOf  | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1 |
| lastIndexOf  | 从数组末尾开始搜索，并返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1 |
| map  | 对数组中的每一个元素运行给定的函数，返回每次函数调用的结果组成的数组 |
| reverse  | 颠倒数组中元素的顺序 |
| slice  | 传入索引值，将数组里对应索引范围内的元素作为新数组返回 |
| some  | 对数组中的每个元素运行给定的函数，如果任一元素返回`true`，则返回`true` |
| sort  | 按照元素的`ASCII`值进行排序 |
| reduce  | 返回数组中所以元素值的合计 |
| toString  | 将数组作为字符串返回 |
| valueOf  | 和`toString`类似，将数组作为字符串返回 |


以下是`ES6`新增的数组方法：
| 方法 | 描述 |
|------|----------------|
| @@iterator  | 返回一个包含数组键值对的迭代器对象，可以通过同步调用的方式得到数组元素的键值对 |
| copyWhthin  | 复制数组中的一系列元素到同一数组指定的起始位置 |
| entries  | 返回包含数组所有键值对的`@@iterator` |
| find  | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素 |
| findIndex  | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素的索引 |
| fill  | 用静态值填充数组 |
| from  | 将一个类数组转换为一个真正的数组 |
| of  | 根据传入的参数创建一个新数组 |
| values  | 返回包含数组中所以值的`@@iterator` |

以下是`ES7`新增的数组方法：
| 方法 | 描述 |
|------|----------------|
| includes  | 如果数组中存在某个元素，则返回`true`，否则返回`false` |

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