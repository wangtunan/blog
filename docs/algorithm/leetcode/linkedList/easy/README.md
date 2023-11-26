# 简单
## 21.合并两个有序链表
<leetcode-link title="21.合并两个有序链表" link="https://leetcode.cn/problems/merge-two-sorted-lists/" />

方法一：递归
```js
// m和n分别为两个链表的长度
// 时间复杂度：O(m + n)
// 空间复杂度：O(m + n)，递归调用时存在栈空间开销
var mergeTwoLists = function(list1, list2) {
  if(list1 === null) {
    return list2
  } else if (list2 === null) {
    return list1
  } else if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }
}
```

方法二：迭代
```js
// m和n分别为两个链表的长度
// 时间复杂度：O(m + n)
// 空间复杂度：O(1)，仅需要常量存储空间
var mergeTwoLists = function(list1, list2) {
  const dummy = new ListNode(0)
  let curr = dummy
  while(list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curr.next = list1
      list1 = list1.next 
    } else {
      curr.next = list2
      list2 = list2.next
    }
    curr = curr.next
  }

  // while循环结束后，list1和list2中还有未合并的节点，直接使用
  curr.next = list1 === null ? list2 : list1
  return dummy.next
};
```

## 141.环形链表
<leetcode-link title="141.环形链表" link="https://leetcode.cn/problems/linked-list-cycle/" />

方法一：哈希表
```js
// n为链表的长度
// 时间复杂度：O(n)，最坏情况遍历全部节点
// 空间复杂度：O(n)，为哈希表的内存开销
var hasCycle = function(head) {
  if (head === null) {
    return false
  }
  const set = new Set()
  while(head !== null) {
    // 如果哈希表中存在相同的节点，则表示有环
    if(set.has(head)) {
      return true
    }
    set.add(head)
    head = head.next
  }
  return false
};
```

方法二：快慢指针
```js
// n为链表的长度
// 时间复杂度：O(n)，最坏情况遍历全部节点
// 空间复杂度：O(1)，仅定义了两个快慢指针变量
var hasCycle = function(head) {
  if (head === null) {
    return false
  }
  // slow和fast不在同一个位置，是为了执行while循环，如果是do-while，可设置为同一个位置
  let slow = head
  let fast = head.next
  while(slow !== fast) {
    // 快指针遍历完毕时，还没有相等，则表示无环
    if (fast === null || fast.next === null) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
  }
  return true
}
```


## 160.相交链表
<leetcode-link title="160.相交链表" link="https://leetcode.cn/problems/intersection-of-two-linked-lists/" />


方法一：哈希表
```js
// m，n分别为两个链表的长度
// 时间复杂度：O(m + n)，需要分别遍历两个链表
// 空间复杂度：O(m)，需要把其中一个链表的节点存储到哈希表中
var getIntersectionNode = function(headA, headB) {
  const set = new Set()
  let curr = headA
  // 把第一个链表中的节点存储到哈希表中
  while(curr !== null) {
    set.add(curr)
    curr = curr.next
  }
  // 遍历第二个链表，如果存在一个节点在哈希表中，则代表其为相交节点
  curr = headB
  while(curr !== null) {
    if (set.has(curr)) {
      return curr
    }
    curr = curr.next
  }
  return null
};
```

方法二：双指针
```js
// m，n分别为两个链表的长度
// 时间复杂度：O(m + n)，两个链表都需要遍历一遍
// 空间复杂度：O(1)，仅需要定义两个指针变量
var getIntersectionNode = function(headA, headB) {
  if (headA === null || headB === null) {
    return null
  }
  let pA = headA
  let pB = headB
  // headA遍历完毕时，从headB重新开始遍历
  // headB遍历完毕时，从headA重新开始遍历
  // while循环终止时，有相交节点的情况下，pA或者pB即为相交节点；否的话，表示两个链表已遍历完毕
  while(pA !== pB) {
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }
  return pA
}
```

## 206.反转链表
<leetcode-link title="206.反转链表" link="https://leetcode.cn/problems/reverse-linked-list/" />


方法一：双指针
```js
// n为链表的长度
// 时间复杂度：O(n)，需要遍历链表
// 空间复杂度：O(1)，定义双指针变量
var reverseList = function(head) {
  let prev = null
  let curr = head
  while(curr !== null) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
};
```

## 234.回文链表
<leetcode-link title="234.回文链表" link="https://leetcode.cn/problems/palindrome-linked-list/" />

方法一：数组 + 双指针
```js
// n为链表的长度
// 时间复杂度：O(n) + O(n/2) = O(n)，一次链表遍历 + 一半数组遍历
// 空间复杂度：O(n)，定义数组存储链表信息
var isPalindrome = function(head) {
  const list = []
  while(head !== null) {
    list.push(head.val)
    head = head.next
  }
  for(let i = 0, j = list.length - 1; i < j; i++, j--) {
    if (list[i] !== list[j]) {
      return false
    }
  }
  return true
};
```