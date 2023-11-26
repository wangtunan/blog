# 困难
## 23.合并K个升序链表
<leetcode-link title="23.合并K个升序链表" link="https://leetcode.cn/problems/merge-k-sorted-lists" />


基础：合并两个有序链表。
```js
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

  curr.next = list1 === null ? list2 : list1

  return dummy.next
}
```

方法一：顺序合并
```js
// n为链表的长度，k为链表的个数
// 时间复杂度：O(k²n)，两两合并
// 空间复杂度：O(1)，仅定义常量
var mergeKLists = function(lists) {
  let head = null
  for(let i = 0; i < lists.length; i++) {
    head = mergeTwoLists(head, lists[i])
  }
  return head
};
```

方法二：分而治之
```js
// n为链表的长度，k为链表的个数
// 时间复杂度：O(kn * logn)
// 空间复杂度：O(logk)，递归时栈空间的开销
var merge = function(lists, start, end) {
  if (start === end) {
    return lists[start]
  } else if (start > end) {
    return null
  } else {
    const middle = (start + end) >> 1
    return mergeTwoLists(
      merge(lists, start, middle),
      merge(lists, middle + 1, end)
    ) 
  }
}
var mergeKLists = function(lists) {
  return merge(lists, 0, lists.length - 1)
}
```

## 25.K个一组翻转链表
<leetcode-link title="25.K个一组翻转链表" link="https://leetcode.cn/problems/reverse-nodes-in-k-group" />

```js
// n为链表的长度
// 时间复杂度：O(n)，需要(n/k)次迭代。
// 时间复杂度：O(1)，仅定义常量。
var reverseList = function(head, tail) {
  let prev = null;
  let curr = head;
  while(prev !== tail) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return [tail, head];
};

var reverseKGroup = function (head, k) {
  const dummy = new ListNode(0, head);
  let pre = dummy;

  while (head) {
    let tail = pre;
    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (!tail) {
        return dummy.next;
      }
    }

    const next = tail.next;
    [head, tail] = reverseList(head, tail);
    pre.next = head;
    tail.next = next;
    pre = tail;
    head = tail.next;
  }

  return dummy.next;
};
```
