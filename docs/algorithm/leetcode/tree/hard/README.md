# 困难

## 124.二叉树中的最大路径和
<leetcode-link title="124.二叉树中的最大路径和" link="https://leetcode.cn/problems/binary-tree-maximum-path-sum" />

方法一：深度优先遍历
```js
// way1: 深度优先遍历
// n为二叉树节点的数量
// 时间复杂度：O(n)，每个节点都需要遍历
// 空间复杂度：O(n)，最坏情况为一个链表，递归调用栈的内存开销为O(n)
var maxPathSum = function (root) {
  var maxSum = -Infinity;
  var maxGain = (root) => {
    if (root === null) {
      return 0;
    }
    const leftGain = Math.max(maxGain(root.left), 0);
    const rightGain = Math.max(maxGain(root.right), 0);
    const pathGain = root.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathGain);
    return root.val + Math.max(leftGain, rightGain);
  }
  maxGain(root);
  return maxSum;
};
```