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



## DP解题思路

## 0-1背包问题

## 完全背包问题

## 编辑距离问题

## 参考
* [Hello 算法 动态规划](https://www.hello-algo.com/chapter_dynamic_programming/)