# 中等

## 215.数组中的第K个最大元素
<leetcode-link title="215.数组中的第K个最大元素" link="https://leetcode.cn/problems/kth-largest-element-in-an-array"></leetcode-link>

方法一：基于大顶堆排序
```js
class MaxHeap {
  constructor(nums) {
    const size = nums.length;
    this.nums = nums;
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
      this.maxHeapify(i, size);
    }
  }
  swap(i, j) {
    const temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
  maxHeapify(i, size) {
    while (true) {
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      let m = i;
      if (l < size && this.nums[l] > this.nums[m]) {
        m = l;
      }
      if (r < size && this.nums[r] > this.nums[m]) {
        m = r;
      }
      if (m === i) {
        break;
      }
      this.swap(m, i)
      i = m;
    }
  }
}

// way1: 基于大顶堆
// n为数组的元素长度
// 时间复杂度：O(nlogn)，O(nlogn)
// 空间复杂度：O(logn)，递归使用栈空间的开销
var findKthLargest = function (nums, k) {
  let size = nums.length;
  const heap = new MaxHeap(nums);
  for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
    heap.swap(0, i);
    --size;
    heap.maxHeapify(0, size);
  }
  return nums[0];
};
```

## 347.前K个高频元素
<leetcode-link title="347.前K个高频元素" link="https://leetcode.cn/problems/top-k-frequent-elements"></leetcode-link>