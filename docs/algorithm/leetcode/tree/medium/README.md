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

方法一：前序遍历 + 存储节点
```js
// way1: 前序遍历 + 存储节点
// n为二叉树节点的数量
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈的内存开销为O(n)
var preOrder = (root, list) => {
  if (root === null) {
    return;
  }
  list.push(root);
  preOrder(root.left, list);
  preOrder(root.right, list);
}
var flatten = function (root) {
  const list = [];
  preOrder(root, list);

  for (let i = 1, len = list.length; i < len; i++) {
    const prev = list[i - 1];
    const curr = list[i];
    prev.left = null;
    prev.right = curr;
  }
};
```

方法二：前序遍历 + 栈
```js
// way2: 前序遍历 + 栈
// n为二叉树节点的数量
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，栈内存开销为O(n)
var flatten = function (root) {
  if (root === null) {
    return null;
  }
  const stack = [root];
  let prev = null;
  while (stack.length > 0) {
    const node = stack.pop();
    if (prev !== null) {
      prev.left = null;
      prev.right = node;
    }
    if (node.right !== null) {
      stack.push(node.right);
    }
    if (node.left !== null) {
      stack.push(node.left);
    }
    prev = node;
  }
}
```


## 199.二叉树的右视图
<leetcode-link title="199.二叉树的右视图" link="https://leetcode.cn/problems/binary-tree-right-side-view" />

方法一：广度优先遍历(BFS)
```js
// way1: 广度优先遍历(BFS) + 存储每层最后一个元素
// n为二叉树节点的数量
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，队列内存开销为O(n)
var rightSideView = function (root) {
  const list = [];
  if (root === null) {
    return list;
  }
  const queue = [root];
  while (queue.length > 0) {
    const items = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      const node = queue.shift();
      items.push(node.val);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    list.push(items.pop());
  }
  return list;
};
```

方法二：深度优先遍历
```js
// way2: 深度优先遍历 + 记录节点深度
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈的内存开销为O(n)
var rightSideView = function (root) {
  const result = [];
  if (root === null) {
    return result;
  }
  const dfs = (root, depth) => {
    if (root === null) {
      return;
    }
    if (depth === result.length) {
      result.push(root.val);
    }
    depth++;
    dfs(root.right, depth);
    dfs(root.left, depth);
  }
  dfs(root, 0);
  return result;
}
```

## 230.二叉搜索树中第K小的元素
<leetcode-link title="230.二叉搜索树中第K小的元素" link="https://leetcode.cn/problems/kth-smallest-element-in-a-bst" />

方法一：中序遍历(二叉搜索树中序遍历为升序数组)
```js
// way1: 中序遍历(二叉搜索树中序遍历为升序数组)
// 时间复杂度：O(n)，需要遍历每一个节点
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈堆内存开销为O(n)
var kthSmallest = function(root, k) {
  let res;
  var inOrder = (root) => {
    if (root === null) {
      return;
    }
    inOrder(root.left);
    if (k === 0) {
      return;
    }
    if (--k === 0) {
      res = root.val;
    }
    inOrder(root.right);
  }
  inOrder(root);
  return res
};
```


## 236.二叉树的最近公共祖先
<leetcode-link title="236.二叉树的最近公共祖先" link="https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree" />

方法一：深度优先遍历
```js
// way1: 深度优先遍历
// n为二叉树的节点数量
// 时间复杂度：O(n)
// 空间复杂度：O(n)，最坏情况下为一个链表，递归调用栈的内存开销为O(n)
var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left === null && right === null) {
    return null;
  }
  if (left === null) {
    return right;
  }
  if (right === null) {
    return left;
  }
  return root;
};
```

## 437.路径总和 III
<leetcode-link title="236.二叉树的最近公共祖先" link="https://leetcode.cn/problems/path-sum-iii" />

方法一：深度优先遍历(以每个节点为root，探索所有的路径和)
```js
// way1: 深度优先遍历(以每个节点为root，探索所有的路径和)
// n为二叉树节点的数量
// 时间复杂度：O(n²)，对任意节点，遍历子树O(n)，求和O(n)
// 空间复杂度：O(n)，递归调用栈的内存开销
var rootSum = function (root, targetSum) {
  let total = 0;
  if (root === null) {
    return 0;
  }
  if (root.val === targetSum) {
    total++;
  }
  total += rootSum(root.left, targetSum - root.val);
  total += rootSum(root.right, targetSum - root.val);
  return total;
}
var pathSum = function (root, targetSum) {
  if (root === null) {
    return 0;
  }
  let total = rootSum(root, targetSum);
  total += pathSum(root.left, targetSum);
  total += pathSum(root.right, targetSum);
  return total;
};
```