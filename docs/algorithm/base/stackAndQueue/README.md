# 栈和队列

## 栈
栈`Stack`是一种遵循先入后出逻辑的线性数据结构。

栈数据结构一般而言有如下几种概念：
1. 栈数据结构的顶部叫做**栈顶**。
2. 栈数据结构的底部叫做**栈底**。
3. 移除栈顶元素的过程叫做**出栈**。
4. 向栈顶添加元素的过程叫做**入栈**或者**压栈**。

![栈](https://www.hello-algo.com/chapter_stack_and_queue/stack.assets/stack_operations.png)

根据以上概念或过程，一般栈有如下几种常见操作：
1. 入栈`push()`，时间复杂度`O(1)`。
2. 出栈`pop()`，时间复杂度`O(1)`。
3. 访问栈顶元素`peek()`，时间复杂度`O(1)`。

根据不同语言的不同特性，栈有不同的实现方式，在`JavaScript`中，可以使用数组或者链表来实现栈结构。其中栈结构的属性和方法如下：
* `push()`：向栈顶添加一个元素。
* `pop()`：移除栈顶元素。
* `peek()`：访问栈顶元素。
* `isEmpty()`: 判断栈结构是否为空。
* `clear()`：清空栈中所有元素。
* `getSize()`: 获取栈中元素个数。
* `toArray()`：返回栈数组结构。

### 栈数组实现
栈的数组实现，请参考[ArrayStack](https://github.com/wangtunan/js-algorithm/blob/master/src/utils/arrayStack.js)

### 栈的链表实现
栈的链表实现，请参考[LinkedListStack](https://github.com/wangtunan/js-algorithm/blob/master/src/utils/linkedListStack.js)

### 两种实现方式对比

### 栈的典型应用

## 队列