# 简单

## 35.搜索插入位置
<leetcode-link title="35.搜索插入位置" link="https://leetcode.cn/problems/search-insert-position" />

方法：二分查找
```js
// n为数组元素的数量
// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)
var searchInsert = function (nums, target) {
  const len = nums.length;
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = nums[mid];
    if (val === target) {
      return mid;
    } else if (val < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
```