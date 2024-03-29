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
栈的数组实现，请参考[ArrayStack](https://github.com/wangtunan/js-algorithm/blob/master/src/stack/arrayStack.js)

### 栈的链表实现
栈的链表实现，请参考[LinkedListStack](https://github.com/wangtunan/js-algorithm/blob/master/src/stack/linkedListStack.js)

### 两种实现方式对比
**时间效率**：
1. 基于数组实现的栈，如果入栈的数量超过初始容量，会触发扩容操作，此时效率会变低，但平均效率高。
2. 基于链表实现的栈，可以提供比较稳定的效率表现。

**空间效率**：
1. 基于数组实现的栈，在扩容后可能会存在一定的空间浪费。
2. 基于链表实现的栈，需要额外存储节点指针，空间开销相对比较大。

### 栈的典型应用
* **浏览器的前进，后退；软件中的撤销，反撤销**：当打开网页时，会将上一个网页进行入栈操作，这样我们可以通过浏览器的后退功能回到上一页，其中后退操作其实就是出栈。
* **程序内存管理**：每次调用函数时，系统都会在栈顶添加一个栈帧，用于记录函数的上下文信息。在递归函数中，向下递推阶段会不断执行入栈操作，而向上回溯阶段则会执行出栈操作。

## 队列
队列`Queue`是一种遵循先入先出规则的线性数据结构。

队列数据结构一般而言有如下几种概念：
1. 队列的头部叫做**队首**。
2. 队列的尾部叫做**队尾**。
3. 队列的尾部添加元素叫**入队**。
4. 队列的头部移除元素叫**出队**。

![队列](https://www.hello-algo.com/chapter_stack_and_queue/queue.assets/queue_operations.png)

根据以上概念或过程，一般队列有如下几种常见操作：
1. 入队`push()`，时间复杂度`O(1)`。
2. 出队`pop()`，时间复杂度`O(1)`。
3. 访问队首元素`peek()`，时间复杂度`O(1)`。

根据不同语言的不同特性，队列有不同的实现方式，在`JavaScript`中，可以使用数组或者链表来实现队列结构。其中队列结构的属性和方法如下：
* `push()`：入队，向队列尾部添加一个元素。
* `pop()`：出队，移除队首元素。
* `peek()`：访问队首元素。
* `isEmpty()`: 判断队列结构是否为空。
* `clear()`：清空队列中所有元素。
* `getSize()`: 获取队列元素个数。
* `toArray()`：返回队列数组结构。

### 队列数组实现
队列的数组实现，请参考[ArrayQueue](https://github.com/wangtunan/js-algorithm/blob/master/src/queue/arrayQueue.js)

### 队列链表实现
队列的链表实现，请参考[LinkedListQueue](https://github.com/wangtunan/js-algorithm/blob/master/src/queue/linkedListQueue.js)

### 队列典型应用
* **购物商城订单**：购物者下单后，订单将加入队列中，系统随后会根据顺序依次处理队列中的订单。
* **各类待办事项**：任何需要实现“先来后到”功能的场景，例如打印机的任务队列、餐厅的出餐队列等。队列在这些场景中可以有效地维护处理顺序。

## 双端队列
在队列`Queue`中，我们仅能在队首删除元素，队尾添加元素。为了增加灵活性，双端队列`Dequeue`允许我们在队首和队尾添加和删除元素。
![双端队列](https://www.hello-algo.com/chapter_stack_and_queue/deque.assets/deque_operations.png)

根据双端队列的特性，一般双端队列有如下几种常见操作：
1. 队首入队`pushFirst`，时间复杂度`O(1)`。
2. 队尾入队`pushLast`，时间复杂度`O(1)`。
3. 队首出队`popFirst`，时间复杂度`O(1)`。
4. 队尾出队`popLast`，时间复杂度`O(1)`。
5. 访问队首元素`peekFirst`，时间复杂度`O(1)`。
6. 访问队尾元素`peekLast`，时间复杂度`O(1)`。

### 双端队列数组实现
双端队列的数组实现，请参考[ArrayDequeue](https://github.com/wangtunan/js-algorithm/blob/master/src/queue/arrayDequeue.js)

### 双端队列链表实现
双端队列的链表实现，请参考[LinkedListDequeue](https://github.com/wangtunan/js-algorithm/blob/master/src/queue/linkedListDequeue.js)

### 双端队列典型应用
双向队列兼具栈与队列的逻辑，因此它可以实现这两者的所有应用场景，同时提供更高的自由度。

许多软件的**撤销**功能通常使用栈来实现：系统每次将更改操作`push`到栈中，然后通过`pop`实现撤销。然而实际场景下，会考虑到系统资源占用情况，例如只存储50次更改操作。超过时，需要在栈底(队首)执行删除操作，但栈是无法做到在栈底执行删除操作的，所以需要使用**双端队列**来实现。

## 参考
* [Hello 算法 栈和队列](https://www.hello-algo.com/chapter_stack_and_queue/)