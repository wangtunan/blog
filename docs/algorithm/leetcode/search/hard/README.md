# 困难

## 4.寻找两个正序数组的中位数
<leetcode-link title="4.寻找两个正序数组的中位数" link="https://leetcode.cn/problems/median-of-two-sorted-arrays" />

方法一：暴力合并数组
```js
// m，n分别为两个数组的元素数量
// 时间复杂度：O(m + n)
// 空间复杂度：O(m + n)
var getNumsMid = function (nums) {
  const len = nums.length;
  const mid = Math.floor(len / 2);
  if (len % 2 === 0) {
    return (nums[mid - 1] + nums[mid]) / 2;
  } else {
    return nums[mid];
  }
}
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  if (m === 0) {
    return getNumsMid(nums2);
  }
  if (n === 0) {
    return getNumsMid(nums1);
  }
  let count = 0;
  let i = 0;
  let j = 0;
  let nums = [];
  while (count < (m + n)) {
    // 第一个数组先遍历完毕时
    if (i === m) {
      while (j < n) {
        nums[count++] = nums2[j++];
      }
      break;
    }
    // 第二个数组先遍历完毕时
    if (j === n) {
      while (i < m) {
        nums[count++] = nums1[i++];
      }
      break;
    }
    // 按大小排序
    if (nums1[i] < nums2[j]) {
      nums[count++] = nums1[i++];
    } else {
      nums[count++] = nums2[j++];
    }
  }
  // 在新数组中去中位数
  return getNumsMid(nums);
};
```
方法二：虚拟合并
```js
// m，n分别为两个数组的元素数量
// 时间复杂度：O(m + n)
// 空间复杂度：O(1)
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  let len = m + n;
  let left = -1;
  let right = -1;
  let aStart = 0;
  let bStart = 0;
  let i = 0;
  while (i <= len / 2) {
    left = right;
    if (aStart < m && (nums1[aStart] < nums2[bStart] || bStart >= n)) {
      right = nums1[aStart++];
    } else {
      right = nums2[bStart++];
    }
    i++;
  }
  if (len % 2 === 0) {
    return (left + right) / 2;
  } else {
    return right;
  }
}
```
方法三：二分法
```js
// 撰写中。。。
```