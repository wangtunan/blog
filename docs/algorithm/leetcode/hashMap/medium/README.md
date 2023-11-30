# 中等

## 49.字母异位词分组
<leetcode-link title="49.字母异位词分组" link="https://leetcode.cn/problems/group-anagrams" />

方法一：排序
```js
// m和n分别表示strs数组的长度以及其中字符串长度最长的元素
// 时间复杂度：O(mnlogn), nlogn表示需要字符串元素进行排序
// 空间复杂度：O(mn)，维护哈希表的内存开销
var groupAnagrams = function (strs) {
  const map = {};
  for (let i = 0; i < strs.length; i++) {
    const newStr = strs[i].split('').sort().join(',');
    if (map.hasOwnProperty(newStr)) {
      map[newStr].push(strs[i]);
    } else {
      map[newStr] = [strs[i]];
    }
  }
  return Object.values(map);
};
```

方法二：质数乘积
```js
// way2: 质数乘积
// m和n分别表示strs数组的长度以及其中字符串长度最长的元素
// 时间复杂度：O(mn), 需要遍历一遍strs字符串以及每次迭代的字符串的每个字母
// 空间复杂度：O(mn)，维护哈希表的内存开销
var groupAnagrams = function (strs) {
  const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
  const map = {};
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    let sum = 1;
    for (let j = 0; j < str.length; j++) {
      sum *= prime[str.charCodeAt(j) - 97];
    }
    if (map.hasOwnProperty(sum)) {
      map[sum].push(str);
    } else {
      map[sum] = [str];
    }
  }
  return Object.values(map);
};
```

## 128.最长连续序列
<leetcode-link title="128.最长连续序列" link="https://leetcode.cn/problems/longest-consecutive-sequence" />

```js
// n为nums数组的长度
// 时间复杂度：O(n)，需要遍历一遍数组
// 时间复杂度：O(n)，去重后哈希表的内存开销
var longestConsecutive = function (nums) {
  const numsSet = new Set(nums);
  let length = 0;
  for (const num of numsSet) {
    if (!numsSet.has(num - 1)) {
      let currNum = num;
      let currLength = 1;
      while (numsSet.has(currNum + 1)) {
        currNum++;
        currLength++;
      }
      length = Math.max(length, currLength);
    }
  }
  return length;
};
```