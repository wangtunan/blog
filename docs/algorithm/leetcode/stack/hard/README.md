# 困难
## 84.柱状图中最大的矩形
::: tip
**要求**：给定n个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。   
**输入**：heights = [2, 1, 5, 6, 2, 3]
**输出**：10
**原题链接**：[84.柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram)
:::
方法一：暴力法
::: warning
能运行测试用例，但提交会判定超时
:::
```js
// n为数组的长度
// 时间复杂度：O(n²)，外层for循环 + 内存while循环
// 空间复杂度：O(1)，仅变量存储开销
var largestRectangleArea = function(heights) {
  const len = heights.length;
  let result = 0;
  for(let i = 0; i < len; i++) {
    const currHeight = heights[i]
    let left = i;
    let right = i;

    while(left > 0 && heights[left - 1] >= currHeight) {
      left--;
    }
    while(right < len - 1 && heights[right + 1] >= currHeight) {
      right++;
    }

    const width = right - left + 1;
    result = Math.max(result, width * currHeight);
  }
  return result;
};
```
方法二：单调栈 + 空间优化
```js
// n为数组的长度
// 时间复杂度：O(n)，遍历数组
// 空间复杂度：O(n)，栈和预处理数组(left，right)的存储开销
var largestRectangleArea = function(heights) {
  const length = heights.length;
  const left = new Array(length).fill(-1);
  const right = new Array(length).fill(length);
  const stack = [];
  let result = 0;

  for(let index = 0; index < length; index++) {
    while(stack.length > 0 && heights[index] < heights[stack[stack.length - 1]]) {
      right[stack.pop()] = index;
    }
    left[index] = stack.length === 0 ? -1 : stack[stack.length - 1]
    stack.push(index);
  }

  for(let index = 0; index < length; index++) {
    const height = heights[index];
    const width = right[index] - left[index] - 1;
    result = Math.max(result, height * width);
  }
  return result;
}
```
方法三：单调栈 + 哨兵
```js
// n为数组的长度
// 时间复杂度：O(n)，遍历数组
// 空间复杂度：O(n)，栈和添加了哨兵的新数组的存储开销
var largestRectangleArea = function(heights) {
  const newHeights = [0, ...heights, 0];
  const length = newHeights.length;
  const stack = new Array(length).fill(0);
  let result = 0;
  for (let index = 0; index < length; index++) {
    while(newHeights[index] < newHeights[stack[stack.length - 1]]) {
      const height = newHeights[stack.pop()];
      const width = index - stack[stack.length - 1] - 1;
      result = Math.max(result, width * height);
    }
    stack.push(index);
  }

  return result;
}
```