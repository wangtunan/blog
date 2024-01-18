# 中等

## 33.搜索旋转排序数组
<leetcode-link title="33.搜索旋转排序数组" link="https://leetcode.cn/problems/search-in-rotated-sorted-array" />

方法一：分别找行和列
```js
// m为二维矩阵的行数、n为二维矩阵的列数
// 时间复杂度：O(logm + logn)
// 空间复杂度：O(1)
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  // 第一次找所在行
  let top = 0;
  let bottom = m - 1;
  while (top < bottom) {
    const mid = Math.floor((top + bottom + 1) / 2);
    if (matrix[mid][0] === target) {
      return true;
    } else if (matrix[mid][0] < target) {
      top = mid;
    } else {
      bottom = mid - 1;
    }
  }
  // 第二次找所在列
  let row = bottom;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (matrix[row][mid] == target) {
      return true;
    } else if (matrix[row][mid] < target) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return matrix[row][right] === target;
};
```

方法二：二维矩阵看出一位数组
```js
// m为二维矩阵的行数、n为二维矩阵的列数
// 时间复杂度：O(log(m * n))
// 空间复杂度：O(1)
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] < target) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  const row = Math.floor(right / n);
  const col = right % n;
  return matrix[row][col] === target;
}
```

## 34.在排序数组中查找元素的第一个和最后一个位置
<leetcode-link title="34.在排序数组中查找元素的第一个和最后一个位置" link="https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array" />

```js
// n为数组的元素长度
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
var searchRange = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let first = -1;
  let last = -1;
  // 第一次查找，找到起始位置
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) {
      first = mid;
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  // 第二次查找，找到结束位置
  left = 0;
  right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) {
      last = mid;
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return [first, last];
};
```

## 74.搜索二维矩阵
<leetcode-link title="74.搜索二维矩阵" link="https://leetcode.cn/problems/search-a-2d-matrix" />

```js
// n为数组元素的数量
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] >= nums[left]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
```

## 153.寻找旋转排序数组中的最小值
<leetcode-link title="153.寻找旋转排序数组中的最小值" link="https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array" />

```js
// n为数组元素数量
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + right >> 1;
    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
};
```