# 中等
## 2.两数相加
::: tip
**要求**：给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。  
**输入**：l1 = [2, 4, 3], l2 = [5, 6, 4]    
**输出**：[7, 0, 8]  
**解释**：342 + 465 = 807  
**原题链接**：[2.两数相加](https://leetcode.cn/problems/add-two-numbers/) 
:::
```js
// m为l1链表的长度，n为l2链表的长度
// 时间复杂度：O(max(m, n))，需要遍历两个链表，复杂度取决于最长的链表
// 空间复杂度：O(1)，仅定义常量
var addTwoNumbers = function(l1, l2) {
  let head = null
  let tail = null
  let carry = 0

  while(l1 || l2) {
    const val1 = l1 ? l1.val : 0
    const val2 = l2 ? l2.val : 0
    const sum = val1 + val2 + carry
    const node = new ListNode(sum % 10)

    if (head === null) {
      head = tail = node
    } else {
      tail.next = node
      tail = tail.next
    }

    carry = Math.floor(sum / 10)

    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }

    if (carry > 0) {
      tail.next = new ListNode(carry)
    }
  }

  return head
}
```

## 19.删除链表的倒数第N个结点
::: tip
**要求**：给你一个链表，删除链表的倒数第n个结点，并且返回链表的头结点。   
**输入**：head = [1, 2, 3, 4, 5], n = 2      
**输出**：[1, 2, 3, 5]    
**原题链接**：[19.删除链表的倒数第N个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) 
:::
方法一：迭代计算出链表长度
```js
// n为链表的长度
// 时间复杂度：O(n)，需要遍历链表计算出其长度
// 空间复杂度：O(1)，定义变量
const getLinkedListLength = (head) => {
  let length = 0
  while(head !== null) {
    length++
    head = head.next
  }
  return length
}
var removeNthFromEnd = function(head, n) {
  const length = getLinkedListLength(head)
  const dummy = new ListNode(0, head)
  let curr = dummy

  // 节点从第一个开始
  for(let i = 1; i < length - n + 1; i++) {
    curr = curr.next
  }
  curr.next = curr.next.next

  return dummy.next
}
```
方法二：栈存储法
```js
// n为链表的长度
// 时间复杂度：O(n)，遍历链表
// 空间复杂度：O(n)，栈存储链表节点
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0, head)
  const stack = []
  let curr = dummy
  let prev = null

  while(curr !== null) {
    stack.push(curr)
    curr = curr.next
  }

  for(let i = 0; i < n; i++) {
    stack.pop()
  }

  prev = stack[stack.length - 1]
  prev.next = prev.next.next

  return dummy.next
}
```
方法三：快慢指针
```js
// n为链表的长度
// 时间复杂度：O(n)，遍历链表
// 空间复杂度：O(1)，定义变量
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0, head)
  let first = head
  let second = dummy

  for(let i = 0; i < n; i++) {
    first = first.next
  }

  while(first !== null) {
    first = first.next
    second = second.next
  }

  second.next = second.next.next

  return dummy.next
}
```

## 24.两两交互链表中的节点
::: tip
**要求**：给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题。     
**输入**：head = [1, 2, 3, 4]     
**输出**：[2, 1, 4, 3]  
**原题链接**：[24.两两交互链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/) 
:::
方法一：递归法
```js
// n为链表的长度
// 时间复杂度：O(n)，遍历链表
// 空间复杂度：O(n)，递归调用的栈空间
var swapPairs = function(head) {
  // 需要两个及以上的节点才能交换
  if (head === null || head.next === null) {
    return head
  }

  const newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head

  return newHead
}
```
方法二：迭代
```js
// n为链表的长度
// 时间复杂度：O(n)，遍历链表
// 空间复杂度：O(1)，定义变量
var swapPairs = function(head) {
  const dummy = new ListNode(0, head)
  let curr = dummy

  while(curr.next !== null && curr.next.next !== null) {
    const node1 = curr.next
    const node2 = curr.next.next

    curr.next = node2
    node1.next = node2.next
    node2.next = node1
    curr = node1
  }

  return dummy.next
}
```

## 138.随机链表的复制
::: tip
**要求**：给你一个长度为n的链表，每个节点包含一个额外增加的随机指针random，该指针可以指向链表中的任何节点或空节点，请构造这个链表的深拷贝。    
**输入**：head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]    
**输出**：[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]  
**原题链接**：[138.随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/) 
:::
```js
// n为链表的长度
// 时间复杂度：O(n)，两次遍历链表
// 空间复杂度：O(n)，定义map集合存储链表节点
var copyRandomList = function(head) {
  if (head === null) {
    return head
  }
  const map = new Map()
  let curr = head

  while(curr !== null) {
    map.set(curr, new Node(curr.val))
    curr = curr.next
  }

  curr = head
  while(curr !== null) {
    const currNode = map.get(curr)
    currNode.next = map.get(curr.next) || null
    currNode.random = map.get(curr.random) || null
    curr = curr.next
  }

  return map.get(head)
}
```

## 142.环形链表Ⅱ
::: tip
**要求**：给你一个长度为n的链表，每个节点包含一个额外增加的随机指针random，该指针可以指向链表中的任何节点或空节点，请构造这个链表的深拷贝。    
**输入**：head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]    
**输出**：[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]  
**原题链接**：[142.环形链表Ⅱ](https://leetcode.cn/problems/linked-list-cycle-ii/) 
:::
方法一：哈希表
```js
// n为链表中节点的数量
// 时间复杂度：O(n)，遍历链表中的每个节点
// 空间复杂度：O(n)，使用Set存储链表中的节点
var detectCycle = function(head) {
  const set = new Set()
  
  while(head !== null) {
    if (set.has(head)) {
      return head
    }
    set.add(head)
    head = head.next
  }

  return null
};
```
方法二：快慢指针
```js
// n为链表中节点的数量
// 时间复杂度：O(n)，遍历链表中的每个节点
// 空间复杂度：O(1)，定义常量
var detectCycle = function(head) {
  let fast = head
  let slow = head

  while(true) {
    if(fast === null || fast.next === null) {
      return null
    }
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      break;
    }
  }
  
  fast = head
  while(slow !== fast) {
    fast = fast.next
    slow = slow.next
  }
  return fast
}
```

## 146.LRU缓存
::: tip
**要求**：实现一个满足LRU缓存约束的数据结构。    
**说明**：[LRU解释](https://baike.baidu.com/item/LRU)    
**原题链接**：[146.LRU缓存](https://leetcode.cn/problems/lru-cache) 
:::
```js
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.keys = new Set()
  this.cache = Object.create(null)
};
LRUCache.prototype.get = function(key) {
  if (this.keys.has(key)) {
    this.keys.delete(key)
    this.keys.add(key)
    return this.cache[key]
  }
  return -1
};
LRUCache.prototype.put = function(key, value) {
  if (this.keys.has(key)) {
    this.keys.delete(key)
    this.keys.add(key)
    this.cache[key] = value
  } else {
    this.keys.add(key)
    this.cache[key] = value
    if (this.capacity && this.keys.size > this.capacity) {
      const deleteKey = Array.from(this.keys)[0]
      delete this.cache[deleteKey]
      this.keys.delete(deleteKey)
    }
  }
  return null
};
```

## 148.排序链表