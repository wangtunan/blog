# 回溯

## 回溯算法
**回溯算法(BackTracking)**：是一种通过穷举来解决问题的方法，它的核心思想是从一个初始状态出发，暴力搜索所有可能的解决方案，当遇到正确的解则将其记录，
直到找到解或者尝试了所有可能的选择都无法找到解为止。

### 常见术语
| 名词 | 定义 |
| --- | --- |
| 解`Solution` | 解是满足问题特定条件的答案，可能有一个或者多个 | 
| 约束条件`Constraint` | 约束条件是问题中限制解的可行性的条件，通常用于剪枝 | 
| 状态`State` | 状态表示问题在某一时刻的情况，包括已经做出的选择 | 
| 尝试`Attempt` | 尝试是根据可用选择来探索解空间的过程，包括做出选择，更新状态，检查是否为解 |
| 回退`BackTracking` | 回退指遇到不满足约束条件的状态时，撤销前面做出的选择，回到上一个状态 |  
| 剪枝`Pruning` | 剪枝是根据问题特性和约束条件避免无意义的搜索路径的方法，可提高搜索效率 | 

### 案例
假设给定一颗二叉树，搜索并记录所有值为7的节点，请返回根节点到这些节点的路径，并要求路径中不包含值为3的节点。

```js
function preOrder(root, path, res) {
  // 剪枝
  if (!root || root.val === 3) {
    return;
  }
  // 尝试
  path.push(root);
  // 记录解
  if(root.val === 7) {
    res.push([...path]);
  }
  preOrder(root.left, path, res);
  preOrder(root.right, path, res);
  // 回退
  path.pop();
}
```
![回溯剪枝](https://www.hello-algo.com/chapter_backtracking/backtracking_algorithm.assets/preorder_find_constrained_paths.png)

### 框架代码
将回溯的**尝试**、**回退**和**剪枝**的主体框架提炼出来，提升其代码的通用性：
* **state**：表示状态，在上面案例中代表节点的遍历路径。
* **choice**：表示当前状态下可做出的选择，在上面案例中代表当前节点以及其左、右节点。
* **isSolution**：表示判断是否为解，在上面案例中代表是否为值为7的节点。
* **recordSolution**：表示记录解，在上面案例中代表将符合条件的路径添加到`res`中。
* **isValid**：表示剪枝，在上面案例中代表非叶子节点且非值为3的节点。
* **makeChoice**：表示尝试，在上面案例中代表尝试把当前节点添加到遍历路径中。
* **backtrack**：表示进行下一轮选择，在上面案例中代表遍历当前节点的左、右节点。
* **undoChoice**：表示回退，在上面案例中代表把当前节点从遍历路径中移除。

```js
function isSolution(state) {
  const lastNode = state.length > 0 ? state[state.length - 1] : {};
  return lastNode.val === 7;
}
function recordSolution(state, res) {
  res.push([...state]);
}
function isValid(choice) {
  return !!choice && choice.val !== 3;
}
function makeChoice(state, choice) {
  state.push(choice);
}
function undoChoice(state) {
  state.pop();
}
function backTracking(state, choices, res) {
  // 判断是否为解
  if(isSolution(state)) {
    recordSolution(state, res);
  }
  // 遍历所有选择
  for (const choice of choices) {
    // 剪枝
    if(isValid(choice)) {
      // 尝试做出选择
      makeChoice(state, choice);
      // 下一轮选择
      backTracking(state, [choice.left, choice.right], res);
      // 回退
      undoChoice(state);
    }
  }
}
```

### 优点和局限性
**优点**：回溯算法本质上是一种深度优先搜索算法，它尝试所有可能的解决方案直到找到满足条件的解。这种方法的优点在于能够找到所有可能的解决方案，而且在合理的剪枝操作下，
具有很高的效率。

**局限性**：在处理大规模或者复杂问题时，回溯算法的运行效率可能难以接受。
* **时间**：回溯算法通常需要遍历状态空间的所有可能，时间复杂度可以达到指数阶或者阶称阶。
* **空间**：在递归调用中需要保存当前的状态(例如路径，用于剪枝的辅助变量等)，当深度很大时，空间需求可能会变的很大。


### 回溯典型例题
回溯算法可用于解决许多搜索问题，约束满足问题和组合优化问题。

**搜索问题**：这类问题的目标是找到满足特定条件的解决方案。
1. 全排列问题
2. 子集和问题
3. 汉诺塔问题

**约束满足问题**：这类问题的目标是找到满足所有约束条件的解。
1. N皇后
2. 数独
3. 图着色问题

**组合优化问题**：这类问题的目标是在一个组合空间中找到满足某些条件的最优解。
1. 背包问题
2. 旅行商问题
3. 最大团问题

## 全排列问题

### 无相等元素情况

### 有相等元素情况

## 子集和问题

### 无相等元素情况

### 有相等元素情况

## N皇后问题

### 逐行放置策略

### 列和对角线剪枝

### 代码实现

# 参考
* [Hello 算法 回溯](https://www.hello-algo.com/chapter_backtracking/)