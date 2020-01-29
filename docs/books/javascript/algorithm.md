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

创建和初始化数组有两种方式：构造函数和字面量，使用构造函数创建和初始化数组像下面这样：
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
栈是一种遵从后进先出(`LIFO`)原则的邮箱有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。

### 创建一个基于数组的栈结构
在前面我们已经发现，数组因为有了`push()`和`pop()`方法，非常适合用来表示栈结构，因此我们将创建一个基于数组的类来表示栈：
```js
class Stack {
  constructor () {
    this.items = []
  }
}
```
接下来我们需要为栈声明一些方法：
* `push()`：在栈顶添加一个或者多个元素。
* `pop()`：移除栈顶的第一个元素，同时返回被移除的元素。
* `peek()`：返回栈顶的元素。
* `isEmpty()`：判断栈是否为空，是则返回`true`，否则返回`false`
* `clear()`：移除栈中的所有元素。
* `size()`：返回栈中元素的个数。

在梳理完以上方法后，我们需要撰写代码来完善它：
```js
class Stack {
  constructor () {
    this.items = []
  }
  push (element) {
    this.items.push(elememt)
  }
  pop () {
    return this.items.pop()
  }
  peek () {
    return this.items[this.size - 1]
  }
  isEmpty () {
    return this.size === 0
  }
  clear () {
    return this.items = []
  }
  size () {
    return this.items.length
  }
}
```

#### 使用Stack类
在完善完`Stack`类以后，我们需要写一点代码来测试一下：
```js
const stack = new Stack()
console.log(stack.isEmpty())  // true
stack.push(1)
stack.push(2)
console.log(stack.peek())     // 2
stack.push(4)
console.log(stack.size())     // 3
console.log(stack.pop())      // 4
console.log(stack.size())     // 2
stack.clear()
console.log(stack.isEmpty())  // true
```


### 创建一个基于对象的栈结构
创建一个`Stack`类最简单的方式就是使用一个数组来存储其元素，但在处理大量数据的时候，我们需要评估如何操作数据是最高效的，在使用数组的时候，大部分方法的时间复杂度为`O(n)`，另外数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。<br/>

因此，接下来我们需要使用基于对象来创建一个栈结构：
```js
class Stack {
  constructor () {
    this.count = 0
    this.items = []
  }
}
```
与基于数组的栈结构拥有相同的方法，唯一区别是多了一个`toString()`方法：
* `push()`：在栈顶添加一个或者多个元素。
* `pop()`：移除栈顶的第一个元素，同时返回被移除的元素。
* `peek()`：返回栈顶的元素。
* `isEmpty()`：判断栈是否为空，是则返回`true`，否则返回`false`
* `clear()`：移除栈中的所有元素。
* `size()`：返回栈中元素的个数。
* `toString()`：将栈结构转换为字符串。

现在我们需要使用代码来完善：
```js
class Stack {
  constructor () {
    this.count = 0
    this.items = {}
  }
  push (element) {
    this.items[this.count] = element
    this.count++
  }
  size () {
    return this.count
  }
  isEmpty () {
    return this.size() === 0
  }
  pop () {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek () {
    return this.items[this.count - 1]
  }
  clear () {
    this.count = 0
    this.items = {}
  }
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let str = this.items['0']
    for(let i = 1; i < this.count; i++) {
      str = `${str},${this.items[i]}`
    }
    return str
  }
}
```

代码分析：
* `push()`：我们知道`JavaScript`对象是键值对的集合，当我们使用如下例子后，它的结果如下：
```js
let stack = new Stack()
stack.push(1)
stack.push(2)

// 此时的stack相当于
const stack = {
  0: 1,
  1: 2
}
```

* `pop()`：首选我们需要判断当前对象的长度`count`是否为0，如果为0则直接返回`undefined`，如果不为0，我们需要把`count`减去1得到栈顶元素所属的键，随后使用`delete`删除这个对象的属性。
```js
let stack = new Stack()
stack.push(1)
stack.push(2)

// 此时的stack相当于
const stack = {
  0: 1,
  1: 2
}
// 此时count--后等于1，得到栈顶元素的键和其键对应的值
this.count--
const result = 2

// 随后删除这个键，返回result
delete this.items[1]
return 2
```

* `toString()`：我们在数组版本的`Stack`中并不需要关心`toString()`方法的实现，因为数组已经有`toString()`方法了，但对于对象版本的`Stack`，我们需要自己写一个`toString()`方法。其实现步骤第一步先拿到对象键为0的值，随后通过`count`的长度来从1开始遍历对象，并进行字符串拼接。

#### 使用Stack类
同样的，我们在撰写完这个版本`Stack`类以后，需要写一点代码测试一下：
```js
let stack = new Stack()
console.log(stack.isEmpty())  // true
stack.push(1)
stack.push(3)
stack.push(5)
console.log(stack.size())     // 3
console.log(stack.peek())     // 5
console.log(stack.pop())      // 5
console.log(stack.toString()) // 1,3
stack.clear()
console.log(stack.size())     // 0
console.log(stack.isEmpty())  // true
```

### 用栈解决实际问题
栈的实际应用非常广泛，在回溯问题中，它可以用来存储访问过的任务或路径、撤销等操作。

#### 十进制到二进制
**技巧**：要把十进制转换成二进制，我们可以将该十进制除以2并对商取整，直到结果为0。<br/>

使用`JavaScript`对象版的`Stack`：
```js
function decimalToBinary (decNumber) {
  const stack = new Stack()
  let number = decNumber
  let rem 
  let binaryString = ''
  while (number > 0) {
    rem = Math.floor(number % 2)
    stack.push(rem)
    number = Math.floor(number / 2)
  }
  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }
  return binaryString
}
console.log(decimalToBinary(233))   // 11101001
console.log(decimalToBinary(10))    // 1010
console.log(decimalToBinary(1000))  // 1111101000
```

代码分析：当我们将十进制的`10`转换为二进制时，步骤如下：
1. `rem = Math.floor(10 % 2)`，此时`rem`结果为`0`。
2. 随后把`rem`的结果放置在栈中，此时如果使用数组来表示栈的话，结果为`[0]`。
3. 然后`number = Math.floor(10 / 2)`，此时`number`结果为`5`，第一轮循环完毕。
4. 第二轮循环开始，`rem = Math.floor(5 % 2)`，此时`rem`结果为`1`。
5. 随后把`rem`的结果放置在栈中，此时如果使用数组来表示栈的话，结果为`[0, 1]`。
6. 然后`number = Math.floor(5 / 2)`，此时`number`结果为`2`，第二轮循环完毕。
7. 第三轮循环开始，`rem = Math.floor(2 % 2)`，此时`rem`结果为`0`。
8. 随后把`rem`的结果放置在栈中，此时如果使用数组来表示栈的话，结果为`[0, 1, 0]`。
9. 然后`number = Math.floor(2 / 2)`，此时`number`结果为`1`，第三轮循环完毕。
7. 第四轮循环开始，`rem = Math.floor(1 % 2)`，此时`rem`结果为`1`。
8. 随后把`rem`的结果放置在栈中，此时如果使用数组来表示栈的话，结果为`[0, 1, 0, 1]`。
9. 然后`number = Math.floor(1 / 2)`，此时`number`结果为`0`，第四轮循环完毕。
10. `0 > 0`，循环条件不满足，循环终止。此时栈结构数组表示为`[0, 1, 0, 1]`。

随后根据栈结构后进先出的原则，我们将栈结构拼接在一起，就得到了十进制`10`转换为二进制后的结果，即：`1010`。

#### 通用进制转换算法
根据以上的思路，我们可以不仅可以把十进制转换为二进制，还可以把十进制转换成基数为`2~36`的任意进制。
```js
function baseConverter (decNumber, base) {
  const stack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString = ''
  if (!(base >= 2 && base <= 36)) {
    return ''
  }
  while (number > 0) {
    rem = Math.floor(number % base)
    stack.push(rem)
    number = Math.floor(number / base)
  }
  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()]
  }
  return baseString
}
console.log(baseConverter(100, 2))  // 1100100
console.log(baseConverter(100, 8))  // 144
console.log(baseConverter(100, 16)) // 64
console.log(baseConverter(100, 32)) // 34
```
代码分析：在将十进制转换为二进制时，余数为0或1；在将十进制转换八进制时，余数为`0~7`；在将十进制转换为十六进制时，余数为`0~9`+ `A、B、C、D、E、F`(分别对应10、11、12、13、14、15)。

## 队列和双端队列
队列是一种遵循先进先出(`FIFO`)原则的一组有序的项，队列在尾部添加新元素，并从顶部移除元素，而双端队列是一种将栈的原则和队列的原则混合在一起的数据结构。

### 队列数据结构
首先我们需要使用类来表示一个队列：
```js
class Queue {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
}
```
代码分析：我们仿照栈数据结构，为了写出一个在获取元素时更高效的数据结构，我们使用一个对象来存储我们的元素，其中需要声明一个`count`变量来控制队列的大小，声明一个`lowestCount`变量来帮我们追踪第一个元素。

在撰写完队列的类以后，我们还需要为队列声明一下可调用的方法：
* `enqueue()`：向队列的尾部添加元素。
* `dequeue()`：在队列的开头移除第一个元素，并返回被移除的元素。
* `peek()`：返回队列的第一个元素。
* `isEmpty()`：判断队列是否为空。
* `size()`：返回队列包含元素的个数。
* `clear()`：清空队列。
* `toString()`：将队列转换成字符串格式。

```js
class Queue {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  size () {
    return this.count - this.lowestCount
  }
  isEmpty () {
    return this.size() === 0
  }
  enqueue (element) {
    this.items[this.count] = element
    this.count++
  }
  dequeue () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  peek () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  clear () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let objStr = this.items[this.lowestCount]
    for(let i = this.lowestCount + 1; i < this.count; i++) {
      objStr = `${objStr},${this.items[i]}`
    }
    return objStr
  }
}
```
在撰写完队列的基本方法后，我们需要撰写一点代码来测试我们的队列：
```js
const queue = new Queue()
console.log(queue.isEmpty())  // true
queue.enqueue('AAA')
queue.enqueue('BBB')
queue.enqueue('CCC')
console.log(queue.isEmpty())  // false
console.log(queue.size())     // 3
console.log(queue.toString()) // AAA,BBB,CCC
console.log(queue.peek())     // AAA
queue.dequeue()
queue.clear()
console.log(queue.isEmpty())  // true
```

### 双端队列数据结构
双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队列，在计算机科学中，双端队列的一个常见应用是存储一系列撤销操作，每当用户在软件中进行了一个操作，该操作被存在一个双端队列中，当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。在进行预先定义的一定数量的操作后，最新进行的操作会被从双端队列的前端移除。<br/>

和之前一样，我们先声明一个`Deque`类：
```js
class Deque {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
}
```
既然双端队列是一种特殊的队列，我们可以看到其构造函数中的部分代码和队列相同，同时也拥有一些相同的方法：`isEmpty()`、`clear()`、`size()`和`toString()`。除了这些相同的方法，双端队列还拥有一些特殊的方法方便我们去调用：
* `addFront()`：在双端队列的前端添加新元素。
* `addBack()`：在双端队列的后端添加新元素。
* `removeFront()`：在双端队列的前端移除新元素。
* `removeBack()`：在双端队列的后端移除新元素。
* `peekFront()`：返回双端队列前端的第一个元素。
* `peekBack()`：返回双端队列后端的第一个元素。

```js
class Deque {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  size () {
    return this.count - this.lowestCount
  }
  isEmpty () {
    return this.size() === 0
  }
  clear () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let strObj = this.items[this.lowestCount]
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      strObj = `${strObj},${this.items[i]}`
    }
    return strObj
  }
  addFront (element) {
    // 1.添加之前没有数据
    // 2.lowestCount > 0
    // 3.lowestCount = 0
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }
  addBack (element) {
    this.items[this.count] = element
    this.count++
  }
  removeFront () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  removeBack () {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peekFront () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  peekBack () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }
}
```

将一个元素添加到双端队列的前端，存在以下三种场景：
* 双端队里为空：这个时候只需要执行`addBack()`方法，在双端队列的后端添加元素即可。
* 已经从双端队列前端移除了元素：这种情况只需要把新元素放置到在`lowestCount-1`的位置即可。
* 双端队列前端未移除任何元素：我们可以设置一个负值的键，同时更新双端队列的长度。

在撰写完双端队里的实现代码后，我们需要写一点代码来测试:
```js
const deque = new Deque()
console.log(deque.isEmpty())  // true
deque.addBack('AAA')
deque.addBack('BBB')
console.log(deque.toString()) // AAA,BBB
deque.addBack('CCC')
console.log(deque.toString()) // AAA,BBB,CCC
console.log(deque.size())     // 3
deque.removeFront() 
console.log(deque.toString()) // BBB,CCC
deque.removeBack()
console.log(deque.toString()) // BBB
deque.addFront('DDD')
console.log(deque.peekFront())// DDD
console.log(deque.peekBack()) // BBB
console.log(deque.toString()) // DDD,BBB
```

### 使用队列和双端队列解决实际问题
由于队列经常被应用于计算机领域和我们的现实生活中，就出现了一些队列的修改版本，其中之一就叫做循环队列。在本章节，将讲述使用队列来模拟击鼓传花游戏和使用双端队列来检查一个短语是否为回文。

#### 击鼓传花
游戏规则：需要游戏参与者围成一个圈，并按固定的顺序传递给旁边的人，某一时刻传花结束，此时花在谁手里，谁就退出圆圈，结束游戏，重复这个过程，直到只剩最后一个孩子即为胜利者。
```js
function hotPotato (elementList, num) {
  const queue = new Queue()
  const elimitatedList = []
  for (let i = 0; i < elementList.length; i++) {
    queue.enqueue(elementList[i])
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    elimitatedList.push(queue.dequeue())
  }
  return {
    elimitated: elimitatedList,
    winner: queue.dequeue()
  }
}
```

代码分析：
1. 首先我们使用到了最开始我们创建的队列`Queue`类。
2. 随后我们会得到一份游戏参与者的名单和给定的数字。
3. 开始迭代队列，从队列开头移除一个，并同时往队里的末尾添加，来模拟循环游戏的概念。
4. 当传递次数等于我们给定的数字时，拿着花的那个人就被淘汰，移除队列并同时添加到淘汰数组中。
5. 一直进行以上的操作，直到队列中只有一个人时，结束循环。

在撰写完以上的代码后，我们实际写一个例子来验证：
```js
const names = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE']
const result = hotPotato(names, 7)
for (let i = 0; i < result.elimitated.length; i++) {
  console.log(`${result.elimitated[i]}在击鼓传花游戏中被淘汰。`)
}
console.log(`胜利者：${result.winner}`)
// CCC在击鼓传花游戏中被淘汰。
// BBB在击鼓传花游戏中被淘汰。
// EEE在击鼓传花游戏中被淘汰。
// DDD在击鼓传花游戏中被淘汰。
// 胜利者：AAA
```

#### 回文检查器
问：什么是回文？<br/>
答：回文是正反都能读通的单词、词组、数或一系列字符的序列，例如`madam`和`racecar`。<br>

有不同的算法可以检查一个词组或字符串是否为回文，最简单的方式是将字符串反向排列并检查它和原始字符串是否相同，如果相同，则它就是一个回文，在这个案例中我们使用双端队列来实现：
```js
function palindromeChecker (str) {
  if (str === undefined || str === null || (str !== null && str.length === 0)) {
    return false
  }
  const deque = new Deque()
  const lowerStr = str.toLowerCase().split('').join('')
  let isEqual = true
  let firstChar, lastChar
  for (let i = 0; i < lowerStr.length; i++) {
    deque.addBack(lowerStr.charAt(i))
  }
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }
  return isEqual
}
```
代码分析：
1. 在我们检查是否回文之前，需要先对传入的字符串做一些校验，如果传递的是`undefined`，`null`或者空字符串直接返回`false`。
2. 随后我们实例化了一个我们在之前写好的双端队列`Deque`类。
3. 为了避免字符串大小写的问题，我们统一把传入的字符串转换成小写的形式。
4. 遍历字符串，并把字符串中的每一个字符依次添加到双端队列的末尾。
5. 循环在双端队列的前端和后端移除一个元素，并比较这两个元素，如果相等则进行下一次循环，如果不相等则结束循环。

在撰写问回文检查器代码后，我们写一点代码来测试一下：
```js
console.log(palindromeChecker('a'))      // true
console.log(palindromeChecker('aa'))     // true
console.log(palindromeChecker('kayak'))  // true
console.log(palindromeChecker('level'))  // true
console.log( palindromeChecker('ABBC'))  // false
```

## 链表
问：为什么在有了数组这种数据结构以后，还需要引入链表？<br/>
答：因为在大多数语言中数组的大小是固定的，在数组的起点或者中间插入或移除项的成本很高。

### 链表数据结构
**特点：** 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个与元素由一个存储自身的节点和一个指向下一个元素的引用组成，所以链表的一个好处在于：添加和移除元素的时候不需要移动其它元素。然而，链表需要使用指针，因此不像在数组中可以直接访问任何位置的任何元素，链表需要我们从起点或者头开始迭代链表直到找到所需的元素。<br/>

在理解了什么是链表以后，我们开始实现`LinkedList`类：
```js
class LinkedList {
  constructor (equalsFn = defaultEquals) {
    this.count = 0
    this.head = null
    this.equalsFn = equalsFn
  }
}
```
代码分析：
* `count`：我们使用`count`来记录链表中的总数。
* `head`：由于链表数据结构是动态的，因此我们需要将第一个元素的引用保存下来。
* `equalsFn()`：如果我们要在链表中遍历，判断当前节点是否是我们需要的节点，而链表中的节点不仅仅是值类型还可能是引用类型，因此需要我们提供一个比较方法，当没有这个方法的时候我们则使用默认的`defaultEquals()`方法，因为它可能会在其它数据结构中也使用到，因此我们把它提取到`utils.js`文件中：
```js
// utils.js
function defaultEquals (a, b) {
  return a === b
}
```

要表示链表中的节点，我们需要另外一个助手`Node`类，它表示我们想要添加到链表中的项，它包含：
* `element`：表示要加入链表元素的值。
* `next`：指向链表下一个元素的指针。

```js
class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}
```

在搭建好`LinkedList`类的骨架后，我们需要实现一些方法，如下：
* `push(element)`：向链表尾部添加一个新元素。
* `insert(element,position)`：在链表指定位置插入一个新元素。
* `getElementAt(index)`：返回链表中特定位置的元素，如果没有则返回`undefined`。
* `remove(element)`：从链表中移除一个元素。
* `indexOf(element)`：返回元素在链表中的索引，如果没有则返回`-1`。
* `removeAt(position)`：从链表指定位置移除一个元素。
* `isEmpty()`：如果链表中不包含任何元素，则返回`true`，否则返回`false`。
* `size()`：返回链表包含的元素个数。
* `getHead()`：返回链表的第一个元素。
* `toString()`：返回表示整个链表的字符串。

#### 向链表尾部添加元素
向链表尾部添加元素时，有两种可能性：链表为空，添加的就是第一个元素；链表不为空，向其追加元素。
```js
push (element) {
  let current = null
  const node = new Node(element)
  if (this.head === null) {
    this.head = node
  } else {
    current = this.head
    while (current.next !== null) {
      current = current.next
    }
    current.next = node
  }
  this.count++
}
```
代码分析：
* 当`head`为`null`时，代表整个链表为空，因此我们要插入的元素就是第一个元素，直接赋值给`head`即可。
* 当`head`不为`null`时，代表链表有数据，即我们需要迭代链表一直到最后一个元素(`current.next=null`)，此时直接把要插入的元素赋值给`current.next`即可。
* 最后需要更新`count`的数量。

#### 迭代链表直到目标位置
```js
getElementAt (index) {
  if (index >= 0 && index <= this.count) {
    let current = this.head
    for (let i = 0; i < index && current !== null; i++) {
      current = current.next
    }
    return current
  }
  return undefined
}
```
代码分析：为了保证我们能够迭代链表直到找到一个合法的位置，因此我们需要对传入的`index`参数进行合法性验证，然后迭代整个链表直到我们需要的位置位置。

#### 从链表中移除指定位置元素
从链表中移除元素由两种场景：第一种是移除第一个元素，第二种是移除第一个元素之外的其它元素。
```js
removeAt (index) {
  if (index >= 0 && index < this.count) {
    let current = this.head
    if (index === 0) {
      this.head = current.next
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
    return current.element
  }
  return undefined
}
```
代码分析：和`getElementAt()`方法相同的道理，我们需要对传入的`index`进行合法性校验，然后判断要移除的`index`是否为0，为0则表示移除第一个元素；不为0，则表示移除第一个元素之外其它元素，这个时候我们需要迭代整个列表找到目标位置之前的元素，我们可以借助已经实现的`getElementAt()`方法来简化我们的代码。随后，只需要`previous.next = current.next`跳过`current`，进而达到移除的目的。


#### 在任意位置插入元素
在链表中插入一个元素，也存在两种情况：在第一个位置插入元素，在第一个位置之外的位置插入元素。
```js
insert (element, index) {
  if (index >= 0 && index <= this.count) {
    const node = new Node(element)
    if (index === 0) {
      const current = this.head
      node.next = current
      this.head = node
    } else {
      const previous = this.getElementAt(index - 1)
      const current = previous.next
      node.next = current
      previous.next = node
    }
    this.count++
    return true
  }
  return false
}
```
代码分析：
* 与`removeAt()`方法类似，我们需要判断参数`index`是否合法，不合法则直接返回`false`。
* 与`removeAt()`直接跳过`current`不同的时，`insert`时需要我们先将`previous`和`node`链接起来，既：`node.next = current`，随后再将`previous`和`node`链接起来，既：`previous.next=node`。


#### 返回一个元素的位置
`indexOf()`方法接受一个元素的值，如果我们在链表中找到了它，就返回元素的位置，否则返回`-1`。
```js
indexOf (element) {
  let current = this.head
  for (let index = 0; index < this.count && current !== null; index++) {
    if (this.equalsFn(element, current.element)) {
      return index
    }
    current = current.next
  }
  return -1
}
```

#### 从链表中移除元素
`remove()`方法区别于`removeAt()`方法，对于前者而言我们并不知道改在什么地方移除，因此需要遍历一次链表以得到具体的索引位置，而对于后者而言由于接受的参数就是`index`，所以比`remove()`方法要简单一些，由于我们在上面已经实现了`indexOf()`方法和`removeAt()`方法，因此我们可以直接借用它们：
```js
remove (element) {
  let index = this.indexOf(element)
  return this.removeAt(index)
}
```
注意：我们并不关心`index`是否为-1，因为在`removeAt()`方法中已经检查了`index`参数的合法性，因此这里并不需要额外判断`index`等于-1的情况。


#### 链表剩余方法
在实现以上那些方法后，我们还有`size()`、`isEmpty()`、`getHead()`和`toString()`方法未实现，他们的代码如下：
```js
size () {
  return this.count
}
isEmpty() {
  return this.size() === 0
}
getHead () {
  return this.head === null ? undefined : this.head.element
}
toString () {
  if (this.count === 0) {
    return ''
  }
  let str = `${this.head.element}`
  let current = this.head.next
  for (let index = 0; index < this.count && current != null; index++) {
    str = `${str},${current.element}`
    current = current.next
  }
  return str
}
```

#### 使用链表
在完成所有的链表方法后，我们需要编写一段代码来测试我们的链表：
```js
const linkedList = new LinkedList()
console.log(linkedList.size())          // 0 
console.log(linkedList.isEmpty())       // true
linkedList.push(1)
console.log(linkedList.getHead())       // 1
linkedList.push(3)
linkedList.push(2)
linkedList.push(5)
console.log(linkedList.size())          // 4
let node = linkedList.getElementAt(2)
console.log(node.element)               // 2
console.log(linkedList.indexOf(5))      // 3
console.log(linkedList.indexOf(8))      // -1
console.log(linkedList.insert(9, 1))    // true
console.log(linkedList.toString())      // 1,9,3,2,5
console.log(linkedList.remove(2))       // true
console.log(linkedList.toString())      // 1,9,3,5
console.log(linkedList.removeAt(2))     // 3
console.log(linkedList.toString())      // 1,9,5
```

### 双向链表
双向链表和普通链表的区别在于：在链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链表是双向的，一个链向下一个元素，另一个链向前一个元素。<br/>
在了解了双向链表的概念后，我们可以实现如下代码：
```js
class DoublyLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = null
  }
}

class DoublyNode extends Node {
  constructor (element, next, prev) {
    super(element, next)
    this.prev = prev
  }
} 
```
代码分析：我们知道双向链表是一种特殊的链表，所以我们让其继承`LinkedList`类，在`DoublyLinkedList`双向链表的构造函数中，我们还需要定义一个变量`tail`，用来表示指向双向链表的最后一个元素。同时，我们还扩展了`DoublyNode`双线链表节点，它继承自`LinkedList`链表的`Node`节点，其还新增了一个指向上一个元素的指针`prev`。
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