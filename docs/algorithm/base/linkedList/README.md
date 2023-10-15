# 链表

## 介绍
**链表(LinkedList)**：是一种线性数据结构，其中的每个元素都是一个节点对象，各个节点通过“引用”相连接。引用记录了下一个节点的内存地址，通过它可以从当前节点访问到下一个
节点。链表的设计使得各个节点可以被分散存储在内存各处。

![链表](https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list.assets/linkedlist_definition.png)

**链表**通常由链表节点`ListNode`对象组成，每个节点通常包含节点的值`val`和下一个节点的引用`next`。
```ts
class ListNode {
  public val: number;
  public next: ListNode | null;

  constructor (val?: number, next?: ListNode | null) {
    this.val = val || 0;
    this.next = next || null;
  }
}
```

**链表**通常有如下规定：
* 首个节点被称为**头结点(head)**，最后一个节点被称为**尾结点(tail)**，一般而言**尾结点**的`next`为空。
* **链表**的长度就是节点的长度，用`Size`来表示。

**链表**一般有三种类型：
* 单向链表：即普通链表。
* 双向链表：链接节点除了保存`next`下一个节点的引用，还报错`prev`上一个节点的引用。
* 循环链表：在普通链表的基础上，首尾相连，即**尾结点**的引用指向**头结点**。

![链表类型](https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list.assets/linkedlist_common_types.png)

## 单向链表

## 双向链表

## 循环链表

## 链表典型应用

## 参考
* [Hello 算法 链表](https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list/#424)
* [JavaScript 数据结构和算法 链表章节](https://www.ituring.com.cn/book/2653)