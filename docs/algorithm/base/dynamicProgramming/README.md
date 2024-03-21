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

### 方法三：记忆化搜索

### 方法四：动态规划

## DP问题特性

## DP解题思路

## 0-1背包问题

## 完全背包问题

## 编辑距离问题

## 参考
* [Hello 算法 动态规划](https://www.hello-algo.com/chapter_dynamic_programming/)