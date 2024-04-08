# 动态规划
动态规划`Dynamic Programming`是一种重要的算法范式，它将一个问题分解为一系列更小的子问题，并通过存储子问题的解来避免重复计算，从而大幅提升时间效率。

## 初探动态规划
假设给定`n`个楼梯，每步只能1阶或者2阶，请问有多少种方案可以爬到楼顶？我们以`n`为3具体，具体爬楼梯过程如下图：
![动态规划-爬楼梯](https://www.hello-algo.com/chapter_dynamic_programming/intro_to_dynamic_programming.assets/climbing_stairs_example.png)

### 方法一：回溯
对于这一个问题，可以用上一节回溯算法来实现，其代码如下：
```js
const backTracking = (state, n, choices, res) => {
  // 爬到第n个台阶，数量加1
  if (state === n) {
    res.set(0, res.get(0) + 1);
    return;
  }
  // 遍历所有选择
  for (const choice of choices) {
    // 剪枝：不允许超过n
    if(state + choice > n) {
      continue;
    }
    // 尝试：做出选择，更新状态
    backTracking(state + choice, n, choices, res);
    // 回退：无
  }
};
export default function climbingStairsBacktrack(n) {
  // 步骤选择
  const choices = [1, 2];
  // 从0阶开始爬
  const state = 0;
  // 存储最终结果
  const res = new Map();
  res.set(0, 0);

  backTracking(state, n, choices, res);
  return res.get(0);
}
```

### 方法二：暴力搜索
回溯算法通常并不显示的对问题进行拆解，而是将求解问题看做一系列决策步骤，通过试探和剪枝，搜索所有可能得解。

如果通过问题分解的角度来分析问题，可得到这样一个规律：**爬到第i - 1阶的方案加上爬到第i - 2阶的方案就等于爬到第i阶的方案数**，其公式为：**dp[i] = dp[i - 1] + dp[i - 2]**。

![动态规划-暴力搜索](https://www.hello-algo.com/chapter_dynamic_programming/intro_to_dynamic_programming.assets/climbing_stairs_state_transfer.png)

其实现代码如下：
```js
const dfs = (n) => {
  if (n === 1 || n === 2) {
    return n;
  }
  const count = dfs(n - 1) + dfs(n - 2);
  return count;
};
export default function climbingStairsDFS(n) {
  return dfs(n);
}
```

### 方法三：记忆化搜索
对于暴力搜索解法，以`n = 9`为例，其分解图如下：
![动态规划-暴力搜索问题分解](https://www.hello-algo.com/chapter_dynamic_programming/intro_to_dynamic_programming.assets/climbing_stairs_dfs_tree.png)

可以看到，暴力搜索形成的递归树，其递归深度为`n`，时间复杂度为`O(2ⁿ)`。指数阶属于爆炸式增长，如果我们输入一个比较大的数，则会陷入漫长的等待中。

通过观察，指数阶的时间复杂度是**重叠子问题**导致的，例如`dp[9]`被分解为`dp[8]`和`dp[7]`，而`dp[8]`又被分解为`dp[7]`和`dp[6]`，它们都包含子问题`dp[7]`。

为了解决以上问题，可通过引入记忆数组的方式来解决，其实现代码如下：
```js
const dfsMember = (n, member) => {
  if (n === 1 || n === 2) {
    return n
  }
  if (member[n] !== -1) {
    return member[n]
  }
  const count = dfsMember(n - 1, member) + dfsMember(n - 2, member)
  member[n] = count
  return count
}
export default function climbingStairsDfsMember (n) {
  const member = new Array(n + 1).fill(-1)
  return dfsMember(n, member)
}
```
经过以上处理，实际分解子问题如下图所示：
![动态规划-记忆化搜索](https://www.hello-algo.com/chapter_dynamic_programming/intro_to_dynamic_programming.assets/climbing_stairs_dfs_memo_tree.png)

### 方法四：动态规划
**记忆化搜索**是一种从顶至底的方法：我们从原问题开始出发，递归的将较大的问题分解为较小的问题，直至解已知的最小子问题。之后，通过回溯层层收集问题的解，构建出原问题的解。

与之相反，**动态规划**是一种从底到顶的方法：从最小子问题的解开始，迭代地构建更大的子问题的解，直至得到原问题的解。

其实现代码如下：
```js
export default function climbingStairsDP (n) {
  if (n === 1 || n === 2) {
    return n
  }
  // 初始化dp表
  const dp = new Array(n + 1).fill(-1)
  // 初始状态：预设最小问题的解
  dp[1] = 1
  dp[2] = 2
  // 状态转移：从较小子问题逐步求解较大子问题
  for(let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
```

根据以上代码可以发现：**dp[i]至于dp[i - 1] + dp[i - 2]有关**，因此无须定义`dp`数组，其空间优化代码如下：
```js
export default function climbingStairsDP (n) {
  if (n === 1 || n === 2) {
    return n
  }
  // 初始状态：预设最小问题的解
  let a = 1
  let b = 2
  // 状态转移：从较小子问题逐步求解较大子问题
  for(let i = 3; i <= n; i++) {
    let temp = b
    b = a + b
    a = temp
  }
  return b
}
```

以上代码，使用图例表示如下：
![动态规划](https://www.hello-algo.com/chapter_dynamic_programming/intro_to_dynamic_programming.assets/climbing_stairs_dp.png)

在动态规划中，有一些术语：
* **dp表**：例如以上代码中的`dp`数组。其中`dp[i]`被称为对应子问题的解。
* **初始状态**：最小子问题对应的状态，例如以上代码中的`1`和`2`。
* **状态转移方程**：以上代码中的递推公式：`dp[i] = dp[i - 1] + dp[i - 2]`。

## DP问题特性
子问题分解是一种通用的算法思路，在分治，动态规划和回溯中的侧重点不同，如下：
* 分治算法：分治算法递归的将原问题划分为多个相互独立的子问题，直至最小子问题，并在回溯中合并子问题的解，最终得到原问题的解。
* 动态规划：动态规划也对问题进行分解，但与分治算法的主要区别是，动态规划中的子问题是相互依赖的，在分解过程中会出现许多重叠的子问题。
* 回溯算法：回溯算法在尝试和回退中穷举所有可能的解，并通过剪枝避免不必要的搜索分支。原问题的解由一系列决策步骤构成，可以将每个决策步骤之前的子序列看出一个子问题。

实际上，动态规划常用来求解最优化问题，它们不仅包含重叠子问题，还具有另外两大特性：**最优子结构**、**无后效性**。

### 最优子结构
**最优子结构**的含义：**原问题的最优解是从子问题的最优解构建得来的**。

假设有这样一个问题：给定一个楼梯，每步可以上1阶或者2阶，每一阶楼梯上都贴有一个非负整数，表示在该台阶所需要付出的代价。给定一个非负整数数组`cost`，其中`cost[i]`表示在第`i`个台阶需要付出的代价，`cost[0]`为地面(起始点)，请问最小需要付出多少代价才能到达顶部？

![最优子结构](https://www.hello-algo.com/chapter_dynamic_programming/dp_problem_features.assets/min_cost_cs_example.png)

设`dp[i]`为爬到第`i`阶累计付出的代价，由于第`i`阶只能从`i - 1`或者`i - 2`阶走来，因此`d[i]`只可能等于`dp[i - 1] + cost[i]`或者`dp[i - 2] + cost[i]`。为了尽可能减少代价，应该选择两者中较小的那一个，其公式为：`dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]`。

其实现代码如下：
```js
export default function minCostClimbingStairsDP(cost) {
  const n = cost.length - 1;
  if (n === 1 || n === 2) {
    return cost[n];
  }
  // 初始状态：预设最小问题的解
  let a = cost[1];
  let b = cost[2];
  // 状态转移：从较小的子问题逐步求解较大子问题
  for(let i = 3; i <= n; i++) {
    let temp = b;
    b = Math.min(a, b) + cost[i];
    a = temp;
  }
  return b;
}
```
![最优子结构-过程](https://www.hello-algo.com/chapter_dynamic_programming/dp_problem_features.assets/min_cost_cs_dp.png)

### 无后效性
**无后效性**：无后效性是动态规划能够有效解决问题的重要特性之一，其定义为：**给定一个确定的状态，它的未来发展只与当前状态有关，而与过去的经历的所有状态无关**。

假设有这样一个问题：给定一个`n`阶的楼梯，每步可以上`1`阶或者`2`阶，但不能连续两轮跳`1`阶，请问有多少种方案可以爬到楼顶？

![无后效性](https://www.hello-algo.com/chapter_dynamic_programming/dp_problem_features.assets/climbing_stairs_constraint_example.png)

在以上问题中，如果上一轮是跳1阶而来，那么下一轮就必须是2阶。这意味着：下一步选择不能由当前状态独立决定，还和前一个状态有关。

为此，我们需要扩展状态的定义：**状态[i, j]表示处在第i阶并且上一轮跳了j阶，其中j∈{1,2}**。
* **dp[i,1] = dp[i-1,2]**：上一轮跳了1阶时，上上一轮只能选择跳2阶。
* **dp[i,2] = dp[i-2,1] + dp[i-2,2]**：上一轮跳2阶时，上上一轮可选择跳1阶或者2阶。
* **dp[n] = dp[n,1] + dp[n,2]**：两者之和代表爬到`n`阶的方案总数。

![无后效行-状态转移](https://www.hello-algo.com/chapter_dynamic_programming/dp_problem_features.assets/climbing_stairs_constraint_state_transfer.png)

实现代码如下：
```js
export default function climbingStairsConstraintDP (n) {
  if (n === 1 || n === 2) {
    return 1
  }
  // 初始化dp表，用于存储子问题的解
  const dp = Array.from(new Array(n + 1), () => new Array(3))
  // 初始状态：预设最小子问题的解
  dp[1][1] = 1
  dp[1][2] = 0
  dp[2][1] = 0
  dp[2][2] = 1
  // 状态转移：从较小子问题逐步求解较大子问题
  for(let i = 3; i <= n; i++) {
    dp[i][1] = dp[i - 1][2]
    dp[i][2] = dp[i - 2][1] + dp[i - 2][2]
  }
  return dp[n][1] + dp[n][2]
}
```

## DP解题思路

### 问题判断
如果一个问题包含重叠子问题、最优子结构，并满足无后效性，那么它通常适合使用动态规划求解。然而，我们很难从问题描述中直接提取出这些特性。因此，我们通常会放宽条件，先观察问题是否适合使用回溯解决。

适合用回溯解决的问题通常满足“决策树模型”，这种问题可以使用树形结构来描述，其中每个节点代表一个决策，每条路径代表一个决策序列。

换句话说，如果问题包含明确的决策概念，并且解是通过一系列决策产生的，那么它就满足决策树模型，通常可以使用回溯来解决。

在此基础上，动态规划问题还有一些判断的加分项：
* 问题包含最大、最小、最多、最少等最优化描述。
* 问题的状态能够使用一个列表，多维矩阵或者树来表示，并且一个状态与其周围的状态存在递推关系。

相应的，也存在一些减分项：
* 问题的目标是找出所有可能得解决方案，而不是找出最优解。
* 问题描述中右明显的排列组合的特征，需要返回具体的多个方案。

### 问题求解步骤
动态规划的解题流程会因问题的性质和难度有所不同，但通常遵循以下步骤：**描述决策**、**定义状态**、**建立dp表**、**推到状态转移方程**、**确定边界条件等**。

假设有这样一个问题：给定`n * m`的二维网格，网格中每个单元格包含一个非负整数，表示该单元格的代价。机器人从以左上角单元格为起点，每次只能向下或者向右移动一步，直至到达右下角单元格。请返回，从左上角到右下角的最小路径和。

![最小路径和](https://www.hello-algo.com/chapter_dynamic_programming/dp_solution_pipeline.assets/min_path_sum_example.png)

**第一步**：思考每轮的决策，定义状态，从而得到`dp`表。
* **每轮决策**：从当前格子向下或者向右走一步。
* **定义状态**：当前格子的行列索引为`[i,j]`，向下或者向右后，其对应状态分别为：`[i+1,j]`和`[i,j+1]`。
* **dp表**：尺寸与网格`grid`相同的矩阵。

![最小路径和-定义状态和dp表](https://www.hello-algo.com/chapter_dynamic_programming/dp_solution_pipeline.assets/min_path_sum_solution_state_definition.png)

**第二步**：找出最优子结构，进而推导出状态转移方程。
* **最优子结构**：对于状态`[i,j]`，它只能从上边格子`[i-1,j]`和左边格子`[i,j-1]`转移而来，因此最优子结构为：到达`[i,j]`的最小路径和由`[i-1,j]`和`[i,j-1]`的最小路径和中较小的那一个决定。
* **状态转移方程**：根据最优子结构，可以推导出其状态转移方程为：`dp[i,j] = min(dp[i-1,j], dp[i,j-1]) + grid[i,j]`。
![最小路径和-最优子结构和状态转移方程](https://www.hello-algo.com/chapter_dynamic_programming/dp_solution_pipeline.assets/min_path_sum_solution_state_transition.png)


**第三步**：确定边界问题和状态转移顺序
* **边界问题**：处在首行的状态，其只能从其左边的状态得来；处在首列的状态，其只能从其上边的状态得来。因此，首行`i = 0`，首列`j = 0`就是边界条件。
* **状态转移顺序**：由于每个格子只能由其左方格子和上方格子转移而来，因此我们使用循环来遍历矩阵，外层循环遍历各行，内层循环遍历各列。
![最小路径和-边界问题和状态转移顺序](https://www.hello-algo.com/chapter_dynamic_programming/dp_solution_pipeline.assets/min_path_sum_solution_initial_state.png)


**方法一：暴力搜索**：

从状态`[i,j]`开始搜索，不断的分解为更小的状态`[i-1,j]`和`[i,j-1]`，递归函数包括以下要素：
* **递归参数**：状态`[i,j]`
* **返回值**：从`[0,0]`到`[i,j]`的最小路径和`dp[i,j]`
* **终止条件**：当`i=0`且`j=0`时，返回代价`grid[0,0]`
* **剪枝**：当`i < 0`或者`j < 0`时，返回代价`+∞`，代表不可行。

其实现代码如下：
```js
// 方法一：暴力搜索
export const minPathSumDFS = (grid, i, j) => {
  // 终止条件
  if(i === 0 && j === 0) {
    return grid[0][0];
  }
  // 越界
  if(i < 0 || j < 0) {
    return Infinity;
  }
  // 计算左上角到[i-1,j]的最小路径和
  const left = minPathSumDFS(grid, i - 1, j);
  // 计算左上角到[i,j-1]的最小路径和
  const up = minPathSumDFS(grid, i, j - 1);
  // 计算左上角到[i,j]的最小路径和
  return Math.min(left, up) + grid[i][j];
};
```
暴力搜素存在一些重叠子问题，其原因是：存在多条路径可以从左上角到达某个单元格。
![暴力搜索](https://www.hello-algo.com/chapter_dynamic_programming/dp_solution_pipeline.assets/min_path_sum_dfs.png)


**方法二：记忆化搜索**：

为了解决暴力搜索中的问题，我们引入和网格`grid`相同大小的`member`记忆网格，用于记录各个问题的解，并将重叠子问题进行剪枝：

其实现代码如下：
```js
// 方法二：记忆化搜索
export const minPathSumMemberDFS = (grid, member, i, j) => {
  // 终止条件
  if(i === 0 && j === 0) {
    return grid[0][0];
  }
  // 越界
  if(i < 0 || j < 0) {
    return Infinity;
  }
  // 剪枝：如果有记录，则直接返回
  if(member[i][j] !== -1) {
    return member[i][j];
  }
  // 计算左上角到[i-1,j]的最小路径和
  const left = minPathSumDFS(grid, i - 1, j);
  // 计算左上角到[i,j-1]的最小路径和
  const up = minPathSumDFS(grid, i, j - 1);
  // 记忆化
  member[i][j] = Math.min(left, up) + grid[i][j];
  return member[i][j];
};
```
在引入记忆化后，所有子问题的解只需计算一次。
![记忆化搜索](https://www.hello-algo.com/chapter_dynamic_programming/dp_solution_pipeline.assets/min_path_sum_dfs_mem.png)

**方法三：动态规划**：

基于迭代实现动态规划，其代码如下：
```js
// 方法三：动态规划
export const minPathSumDP = (grid) => {
  const n = grid.length;
  const m = grid[0].length;
  // 初始化dp表
  const dp = Array.from({ length: n }, () => Array.from({ length: m }, () => 0));
  dp[0][0] = grid[0][0];
  // 状态转移：首行
  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }
  // 状态转移：首列
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  // 状态转移：其余行和列
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  return dp[n - 1][m - 1];
};
```
空间优化：由于每个格子只与其左边和上边的格子有关，因此我们可以只用一个单行数组来实现`dp`表。

```js
// 方法三：动态规划(空间优化版)
export const minPathSumDPComp = (grid) => {
  const n = grid.length;
  const m = grid[0].length;
  // 初始化dp表
  const dp = new Array(m);
  dp[0] = grid[0][0];
  // 状态转移：首行
  for (let j = 1; j < m; j++) {
    dp[j] = dp[j - 1] + grid[0][j];
  }
  // 状态转移：其余行和列
  for (let i = 1; i < n; i++){
    // 状态转移：首列
    dp[0] = dp[0] + grid[i][0];
    // 状态转移：其余列
    for (let j = 1; j < m; j++) {
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }
  }
  return dp[m - 1];
};
```

## 0-1背包问题

假设有这样一个问题：给定`n`个物品，第`i`个物品的重量为`wgt[i - 1]`、价值为`val[i - 1]`，和一个容量为`cap`的背包。每个物品只能选择一次，问在限定背包容量下能放入物品的最大价值。

![0-1背包问题](https://www.hello-algo.com/chapter_dynamic_programming/knapsack_problem.assets/knapsack_example.png)

**第一步**：思考每轮的决策、定义状态、从而得到`dp`表。
* **每轮决策**：对于每个物品来说，可选择放入和不放入。放入时，背包容量减少，价值增加；不放入时，背包容量不变，价值不变。
* **定义状态**：`[i, c]`，其中`i`表示物品编号，`c`表示剩余背包容量。即`dp[i, c]`表示第`i`个物品在剩余容量为`c`的背包中的最大价值。
* **dp表**：`(n + 1) * (c + 1)`的二维表。

**第二步**：找出最优子结构，进而推导出状态转移方程。
当我们做出物品`i`的决策后，剩余的是前`i - 1`个物品的决策，可分为两种情况：
1. 不放入物品`i`：背包容量不变，状态变化为`[i - 1, c]`。
2. 放入物品`i`：背包容量减少`wgt[i - 1]`，价值增加`val[i - 1]`，状态变化为`[i - 1, c - wgt[i - 1]]`。

分析完上述问题后，我们可以得出：
* **最优子结构**：最大价值`dp[i, c]`等于不放入物品`i`和放入物品`i`两种方案种价值更大的那一个。
* **状态转移方程**：`dp[i, c] = max(dp[i - 1, c], dp[i - 1, c - wgt[i - 1]] + val[i - 1])`。

**第三步**：确定边界条件和状态转移顺序。
* **边界条件**：当无物品或无剩余背包容量时，最大价值为`0`，即首行`dp[0, c]`和首列`dp[i, 0]`都等于`0`。
* **状态转移顺序**：当前状态`[i, c]`从上方状态`[i - 1, c]`和左上方的状态`[i - 1, c - wgt[i - 1]]`转移而来。

### 方法一：暴力搜索
暴力搜索包含以下要素：
* **递归参数**：状态`[i, c]`。
* **返回值**：子问题的解`dp[i, c]`
* **终止条件**：当物品编号越界`i = 0`或背包容量为`0`时，终止递归并返回价值`0`。
* **剪枝**：若当前物品重量超出背包剩余容量，则只能选择不放入。
```js
// 方法一：暴力搜索
export const knapsackDFS = (wgt, val, i, c) => {
  // 已选完或背包容量为0，则返回价值0
  if(i === 0 || c === 0) {
    return 0;
  }
  // 物品重量超过背包剩余容量，不放入物品
  if(wgt[i - 1] > c) {
    return knapsackDFS(wgt, val, i - 1, c);
  }
  // 计算不放入物品i的最大价值
  const noVal = knapsackDFS(wgt, val, i - 1, c);
  // 计算放入物品i的最大价值
  const yesVal = knapsackDFS(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1];
  // 返回最大价值
  return Math.max(noVal, yesVal);
};
```
观察递归树，容易发现其中存在重复子问题，如下图：
![0-1背包问题-暴力搜索](https://www.hello-algo.com/chapter_dynamic_programming/knapsack_problem.assets/knapsack_dfs.png)

### 方法二：记忆化搜索
为了保证重叠子问题只被计算一次，我们可以借助记忆列表`member`，其中`member[i][c]`表示`dp[i][c]`。

记忆化搜索实现代码如下：
```js
// 方法二：记忆化搜索
export const knapsackMemberDFS = (wgt, val, member, i, c) => {
  // 已选完或背包容量为0，则返回价值0
  if(i === 0 || c === 0) {
    return 0;
  }
  // 如果已被计算过，则直接返回
  if(member[i][c] !== -1) {
    return member[i][c];
  }
  // 物品重量超过背包剩余容量，不放入物品
  if(wgt[i - 1] > c) {
    return knapsackMemberDFS(wgt, val, member, i - 1, c);
  }
  // 计算不放入物品i的最大价值
  const noVal = knapsackMemberDFS(wgt, val, member,  i - 1, c);
  // 计算放入物品i的最大价值
  const yesVal = knapsackMemberDFS(wgt, val, member, i - 1, c - wgt[i - 1]) + val[i - 1];
  // 存储当前计算结果
  member[i][c] = Math.max(noVal, yesVal);
  // 返回最大价值
  return member[i][c];
};
```

### 方法三：动态规划
动态规划实质上就是在状态转移的过程中填充`dp`表的过程，其实现代码如下：
```js
export const knapsackDP = (wgt, val, cap) => {
  const n = wgt.length;
  // 初始dp表
  const dp = Array.from({ length: n + 1 }, () => new Array(cap + 1).fill(0));
  // 状态转移
  for (let i = 1; i <= n; i++) {
    for (let c = 1; c <= cap; c++) {
      // 物品重量超过背包剩余容量，不放入物品
      if(wgt[i - 1] > c) {
        dp[i][c] = dp[i - 1][c];
      } else {
        dp[i][c] = Math.max(
          dp[i - 1][c],
          dp[i - 1][c - wgt[i - 1]] + val[i - 1]
        );
      }
    }
  }
  return dp[n][cap];
};
```

### 空间优化
可使用一个一维数组，其中内层循环倒序遍历，如下：
![0-1背包问题-空间优化](https://www.hello-algo.com/chapter_dynamic_programming/knapsack_problem.assets/knapsack_dp_comp_step5.png)

其空间优化代码如下：
```js
export const knapsackDPComp = (wgt, val, cap) => {
  const n = wgt.length;
  // 初始dp表
  const dp = new Array(cap + 1).fill(0);
  // 状态转移
  for (let i = 1; i <= n; i++) {
    for(let c = cap; c >= 1; c--) {
      if(wgt[i - 1] <= c) {
        dp[c] = Math.max(
          dp[c],
          dp[c - wgt[i - 1]] + val[i - 1]
        );
      }
    }
  }
  return dp[cap];
};
```

## 完全背包问题

### 完全背包问题

### 零钱兑换问题Ⅰ

### 零钱兑换问题Ⅱ

## 编辑距离问题

### 动态规划思路

### 代码实现

### 空间优化

## 参考
* [Hello 算法 动态规划](https://www.hello-algo.com/chapter_dynamic_programming/)