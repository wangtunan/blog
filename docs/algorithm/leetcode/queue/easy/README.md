# 简单

## 41.数据流中的移动平均值
::: tip
**要求**：给定一个窗口大小和一个整数数据流，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。  
**输入**：  
inputs = ["MovingAverage", "next", "next", "next", "next"]  
inputs = [[3], [1], [10], [3], [5]]   
**输出**：[null, 1.0, 5.5, 4.66667, 6.0]   
**说明**：给定一个固定长度的数组，其中数组中的值是固定的，求此数组中元素的平均值。   
**原题链接**：[41.数据流中的移动平均值](https://leetcode.cn/problems/qIsx9U) 
:::
```js
// n为窗口大小size
// 时间复杂度：O(1)，next时往数组尾部添加元素，时间复杂度O(1)
// 空间复杂度：O(n)，队列数组的内存开销
var MovingAverage = function(size) {
  this.queue = [];
  this.size = size;
  this.sum = 0;
};
MovingAverage.prototype.next = function(val) {
  if (this.queue.length >= this.size) {
    this.sum -= this.queue.shift();
  }
  this.sum += val;
  this.queue.push(val);
  return this.sum / this.queue.length;
};
```