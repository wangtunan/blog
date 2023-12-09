# 中等

## 98.验证二叉搜索树
<leetcode-link title="98.验证二叉搜索树" link="https://leetcode.cn/problems/validate-binary-search-tree" />
方法一：递归

```js
// n为二叉树的节点数量
// way1：递归
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈内存开销为O(n)
var isValidBST = function(root) {
  var dfs = (root, min, max) => {
    if (root === null) {
      return true;
    }
    if (root.val <= min || root.val >= max) {
      return false;
    }
    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max);
  }
  return dfs(root, -Infinity, Infinity)
};
```

方法二：中序遍历
```js
// n为二叉树的节点数量
// way2：中序遍历
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈内存开销为O(n)
var isValidBST = function (root) {
  var min = -Infinity;
  var inOrder = (root) => {
    if (root === null) {
      return true;
    }
    if (!inOrder(root.left)) {
      return false;
    }
    if (root.val <= min) {
      return false;
    }
    min = root.val;
    return inOrder(root.right);
  }
  return inOrder(root);
}
```


## 102.二叉树的层序遍历
<leetcode-link title="102.二叉树的层序遍历" link="https://leetcode.cn/problems/binary-tree-level-order-traversal" />

```js
// n为二叉树节点的数量
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下是一个链表，队列的内存开销为o(n)
var levelOrder = function (root) {
  const list = [];
  const queue = [];
  if (root !== null) {
    queue.push(root);
  }
  while (queue.length > 0) {
    const arr = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      const node = queue.shift();
      arr.push(node.val);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    list.push(arr);
  }
  return list;
};
```


## 105.从前序与中序遍历序列构造二叉树
<leetcode-link title="105.从前序与中序遍历序列构造二叉树" link="https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal" />

方法一：递归 + 哈希表
```js
// n为二叉树节点的数量
// way1: 递归 + 哈希表
// 时间复杂度：O(n)，需要遍历一遍每个节点
// 空间复杂度：O(n)，哈希表存储每个节点的内存开销
var buildTree = function (preorder, inorder) {
  const map = new Map();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  const buildHelper = (pStart, pEnd, iStart, iEnd) => {
    if (pStart > pEnd) {
      return null;
    }
    const rootVal = preorder[pStart];
    const root = new TreeNode(rootVal);
    const rootIndex = map.get(rootVal);
    const leftNum = rootIndex - iStart;
    root.left = buildHelper(pStart + 1, pStart + leftNum, iStart, rootIndex - 1);
    root.right = buildHelper(pStart + 1 + leftNum, pEnd, rootIndex + 1, iEnd);
    return root;
  }
  return buildHelper(0, preorder.length - 1, 0, inorder.length - 1);
};
```

方法二：递归(无哈希表)
```js
// n为二叉树节点的数量
// way2: 递归(无哈希表)
// 时间复杂度：O(n)，需要遍历一遍每个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈的开销为O(n)
var buildTree = function (preorder, inorder) {
  let p = 0;
  let i = 0;
  const buildHelper = (stop) => {
    if (inorder[i] !== stop) {
      const root = new TreeNode(preorder[p++]);
      root.left = buildHelper(root.val);
      i++;
      root.right = buildHelper(stop);
      return root;
    }
    return null;
  }
  return buildHelper();
}
```

## 114.二叉树展开为链表
<leetcode-link title="114.二叉树展开为链表" link="https://leetcode.cn/problems/flatten-binary-tree-to-linked-list" />


## 199.二叉树的右视图
<leetcode-link title="199.二叉树的右视图" link="https://leetcode.cn/problems/binary-tree-right-side-view" />


## 230.二叉搜索树中第K小的元素
<leetcode-link title="230.二叉搜索树中第K小的元素" link="https://leetcode.cn/problems/kth-smallest-element-in-a-bst" />


## 236.二叉树的最近公共祖先
<leetcode-link title="236.二叉树的最近公共祖先" link="https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree" />


## 437.路径总和 III
<leetcode-link title="236.二叉树的最近公共祖先" link="https://leetcode.cn/problems/path-sum-iii" />