# 简单

## 41.数据流中的移动平均值
<leetcode-link title="41.数据流中的移动平均值" link="https://leetcode.cn/problems/qIsx9U" />

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