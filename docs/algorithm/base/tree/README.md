# 二叉树

## 二叉树
**二叉树**是一种非线性数据结构，代表着祖先和后代之间的派生关系，体现着**一分为二**的分治逻辑。

与链表类似，二叉树的基本单元是节点，其中每个节点包含：根节点、左节点和右节点。
```js
export default class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
}
```
![二叉树](https://www.hello-algo.com/chapter_tree/binary_tree.assets/binary_tree_definition.png)

### 二叉树的常见术语
在二叉树中，一般有如下常见术语：
* **根节点(rootNode)**: 二叉树的最顶层节点。
* **叶子节点(leafNode)**: 没有子节点的节点，即左、右节点全部为空(`null`)。
* **边(edge)**: 连接两个节点的线段，即节点的引用。
* **节点所在的层级(level)**: 根节点层级为1，从顶至底递增。
* **节点的度(degree)**: 节点的子节点数量，其中范围为0, 1, 2。分别表示没有子节点，即叶子节点；有一个子节点；有两个子节点。
* **节点高度(height)**: 从距离该节点最远的叶节点到该节点所经过的边的数量。
* **节点深度(Depth)**: 从根节点到该节点所经过的边的数量。
* **二叉树的高度(height)**: 从根节点到最远叶节点所经过的边的数量。

![二叉树常见术语](https://www.hello-algo.com/chapter_tree/binary_tree.assets/binary_tree_terminology.png)

### 二叉树的常见类型

## 二叉树的遍历
### 层序遍历
### 前、中、后序遍历

## 二叉树的数组实现

## 二叉搜索树

## AVL树

## 参考
* [Hello 算法 树](https://www.hello-algo.com/chapter_tree/)
* [JavaScript 数据结构和算法 二叉树章节](https://www.ituring.com.cn/book/2653)
