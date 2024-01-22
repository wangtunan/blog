# 分治

## 分治算法
**分治(Divide And Conquer)**：全称分而治之，是一种非常重要且常见的算法策略。分治通常基于递归实现，包括以下两个步骤：
* **分(划分阶段)**：递归的将原问题分解为两个或者多个子问题，直至到达最小问题时终止。
* **治(合并阶段)**：从已知解的最小问题开始，从底至顶地将问题的解进行合并，从而构建出原问题的解。

![分治算法](https://www.hello-algo.com/chapter_divide_and_conquer/divide_and_conquer.assets/divide_and_conquer_merge_sort.png)

### 如何判断分治问题
* **问题可以分解**：原问题可以分解称规模更小、类似的子问题，以及能够以相同的方式进行递归。
* **子问题是独立的**：子问题之间没有重叠，互补依赖，可以独立解决。
* **子问题的解可以合并**：原问题的解通过合并子问题的解得来。

### 分治常见应用
* 常见算法：**寻找最近点对**、**大整数乘法(例如Karatsuba)**、**矩阵乘法(例如Strassen)**、**汉诺塔问题**、**求解逆序对**。
* 常见算法和数据结构：**二分查找**、**归并排序**、**快速排序**、**桶排序**、**树**、**堆**、**哈希表**。

## 分治搜索策略
基于分治思想，实现二分查找：将搜索区间标记为`[i, j]`，对应的子问题标记为`f(i, j)`，以原问题`f(0, n - 1)`为起始点，通过以下步骤实现二分查找：
1. 计算搜索区间`[i, j]`的中点`m`，根据它排除一半的搜索区间。
2. 递归求解规模减小一半的子问题，可能为`f(i, m - 1)`或`f(m + 1, j)`。
3. 循环以上两步，直至找到`target`目标元素或者搜索区间为空。

![基于分治实现的二分查找](https://www.hello-algo.com/chapter_divide_and_conquer/binary_search_recur.assets/binary_search_recur.png)

```js
function dfs(nums, target, i, j) {
  // 区间为空
  if (i > j) {
    return -1;
  }
  const mid = i + ((j - i) >> 1);
  if (nums[mid] < target) {
    return dfs(nums, target, mid + 1, j);
  } else if (nums[mid] > target) {
    return dfs(nums, target, i, mid - 1);
  } else {
    return mid;
  }
}
function binarySearchRecursion(nums, target) {
  const len = nums.length;
  return dfs(nums, target, 0, len - 1);
}
```
## 构建树问题

## 汉诺塔问题

## 参考
* [Hello 算法 分治](https://www.hello-algo.com/chapter_divide_and_conquer/)