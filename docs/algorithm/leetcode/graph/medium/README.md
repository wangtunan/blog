# 中等

## 200.岛屿的数量
<leetcode-link title="200.岛屿的数量" link="https://leetcode.cn/problems/number-of-islands/" />

方法一：深度优先遍历
```js
// way1: 深度优先遍历
// m和n分别为矩阵行的数量和列的数量
// 时间复杂度：O(m * n)
// 空间复杂度：O(m * n)，最坏情况下遍历完整个矩阵
var dfs = (grid, i, j) => {
  if (
    i < 0 || i >= grid.length ||
    j < 0 || j >= grid[0].length ||
    grid[i][j] === '0'
  ) {
    return;
  }
  grid[i][j] = '0';
  dfs(grid, i - 1, j);
  dfs(grid, i + 1, j);
  dfs(grid, i, j - 1);
  dfs(grid, i, j + 1);
}
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j)
        count++;
      }
    }
  }
  return count;
};
```

## 207.课程表
<leetcode-link title="207.课程表" link="https://leetcode.cn/problems/course-schedule" />

## 208.实现 Trie (前缀树)
<leetcode-link title="208.实现 Trie (前缀树)" link="https://leetcode.cn/problems/implement-trie-prefix-tree" />

## 994.腐烂的橘子
<leetcode-link title="994.腐烂的橘子" link="https://leetcode.cn/problems/rotting-oranges" />