# 简单

## 1.两数之和
<leetcode-link title="1.两数之和" link="https://leetcode.cn/problems/two-sum" />

```js
// n表示nums数组的长度
// 时间复杂度：O(n)，需要遍历一遍数组
// 空间复杂度：O(n)，为哈希表存储开销
var twoSum = function (nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.hasOwnProperty(diff)) {
      return [map[diff], i];
    } else {
      map[nums[i]] = i;
    }
  }
  return [];
};
```

## 242.有效的字母异位词
<leetcode-link title="242.有效的字母异位词" link="https://leetcode.cn/problems/valid-anagram" />

```js
// n为最长字符串的长度
// 时间复杂度：O(n)，需要遍历一次最长的字符串
// 空间复杂度：O(1)，仅为字符串26个字母数组的内存开销
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  let map = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    map[s.charCodeAt(i) - 97]++;
  }
  for (let j = 0; j < t.length; j++) {
    const currCode = t.charCodeAt(j) - 97;
    map[currCode]--;
    if (map[currCode] < 0) {
      return false;
    }
  }
  return true;
};
```