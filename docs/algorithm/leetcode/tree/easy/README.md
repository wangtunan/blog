# 简单

## 94.二叉树的中序遍历
<leetcode-link title="94.二叉树的中序遍历" link="https://leetcode.cn/problems/binary-tree-inorder-traversal" />

方法一：递归
```js
// n为二叉树节点的数量
// way1: 递归
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，需要维护递归调用栈
var dfs = function (root, list) {
  if (root === null) {
    return;
  }
  dfs(root.left, list);
  list.push(root.val);
  dfs(root.right, list);
}
var inOrderTraversal = function (root) {
  let result = [];
  dfs(root, result);
  return result;
};
```
方法二：栈
```js
// n为二叉树节点的数量
// way1: 栈
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，维护栈空间的大小
var inOrderTraversal = function (root) {
  let result = [];
  let stack = [];
  while (root || stack.length) {
    if (root !== null) {
      stack.push(root);
      root = root.left;
    } else {
      const node = stack.pop();
      result.push(node.val);
      root = node.right;
    }
  }
  return result;
}
```

## 101.对称二叉树
<leetcode-link title="101.对称二叉树" link="https://leetcode.cn/problems/symmetric-tree" />

```js
// n为二叉树节点的数量
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，需要维护递归栈的内存开销
var checkNode = function (left, right) {
  if (left === null && right === null) {
    return true;
  }
  if (left === null || right === null) {
    return false;
  }
  return left.val === right.val
    && checkNode(left.left, right.right)
    && checkNode(left.right, right.left)
}
var isSymmetric = function (root) {
  return checkNode(root.left, root.right);
};
```

## 104.二叉树的最大深度
<leetcode-link title="104.二叉树的最大深度" link="https://leetcode.cn/problems/maximum-depth-of-binary-tree" />

方法一：深度优先遍历(DFS)
```js
// n为二叉树中节点的数量
// way1: 深度优先遍历(DFS)
// 时间复杂度：O(n)，需要遍历每个节点
// 空间复杂度：O(n)，最坏情况下是一个链表，递归调用栈的内存开销
var maxDepth = function(root) {
  if(root === null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

方法二：广度优先遍历(BFS)
```js
// n为二叉树中节点的数量
// way1: 广度优先遍历(BFS)
// 时间复杂度：O(n)，需要遍历每个节点
// 空间复杂度：O(n)，最坏情况下是一个平衡二叉树，对了中存储n/2个节点
var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  let queue = [root];
  let size = 0;
  while(queue.length > 0) {
    for(let i = 0, len = queue.length; i < len; i++) {
      let node = queue.shift()
      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
    }
    size++
  }
  return size;
}
```

## 108.将有序数组转换为二叉搜索树
<leetcode-link title="108.将有序数组转换为二叉搜索树" link="https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree" />

```js
// n为数组的长度
// 时间复杂度：O(n)，需要遍历每一个数组元素
// 空间复杂度：O(logn)，递归栈的内存开销
var buildTree = function (nums, left, right) {
  if (left > right) {
    return null;
  }
  let mid = (left + right) >> 1;
  const node = new TreeNode(nums[mid]);
  node.left = buildTree(nums, left, mid -1);
  node.right = buildTree(nums, mid + 1, right);
  return node;
}
var sortedArrayToBST = function(nums) {
  return buildTree(nums, 0, nums.length - 1);
};
```

## 226.翻转二叉树
<leetcode-link title="226.翻转二叉树" link="https://leetcode.cn/problems/invert-binary-tree" />

方法一：递归
```js
// n为二叉树节点的数量
// way1: 递归
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下是一个链表，递归调用栈的内存开销是O(n)
var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  const leftNode = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(leftNode);
  return root;
};
```

方法二：辅助栈
```js
// n为二叉树节点的数量
// way2: 辅助栈
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下是一个链表，辅助栈内存开销为O(n)
var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  let stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node.left !== null) {
      stack.push(node.left);
    }
    if (node.right !== null) {
      stack.push(node.right);
    }
    const leftNode = node.left;
    node.left = node.right;
    node.right = leftNode;
  }
  return root;
}
```

## 543.二叉树的直径
<leetcode-link title="543.二叉树的直径" link="https://leetcode.cn/problems/diameter-of-binary-tree" />

```js
// n为二叉树节点的数量
// 时间复杂度：O(n)，需要遍历一遍每个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归栈空间开销为o(n)
var diameterOfBinaryTree = function (root) {
  var res = 0;
  var dfs = function (node) {
    if (node === null) {
      return 0;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    res = Math.max(res, left + right);
    return Math.max(left, right) + 1;
  }
  dfs(root);
  return res;
};
```