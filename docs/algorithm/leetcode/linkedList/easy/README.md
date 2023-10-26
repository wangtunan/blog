# 简单
## 21.合并两个有序链表
::: tip
**要求**：将两个升序链表合并为一个新的升序链表并返回。  
**输入**：list1 = [1, 2, 4], list2 = [1, 3, 4]  
**输出**：[1, 1, 2, 3, 4, 4]  
**原题链接**：[21.合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) 
::: 

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
## 160.相交链表
::: tip
LeetCode原题链接：[160.相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)
::: 
要求：
## 206.反转链表
## 234.回文链表


