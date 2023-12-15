# 中等

## 200.岛屿的数量
<leetcode-link title="200.岛屿的数量" link="https://leetcode.cn/problems/number-of-islands/" />

方法一：广度优先遍历BFS
```js
// way1: 广度优先遍历
// m和n分别为矩阵行的数量和列的数量
// 时间复杂度：O(m * n)
// 空间复杂度：O(min(m, n))，最坏情况下遍历完整个矩阵
var bfs = (grid, i, j) => {
  const queue = [[i, j]];
  while (queue.length > 0) {
    const [i, j] = queue.shift();
    if (i >= 0 && j >= 0 && i < grid.length && j < grid[0].length && grid[i][j] === '1') {
      grid[i][j] = '0';
      queue.push([i + 1, j]);
      queue.push([i - 1, j]);
      queue.push([i, j + 1]);
      queue.push([i, j - 1]);
    }
  }
}
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        bfs(grid, i, j);
        count++;
      }
    }
  }
  return count;
}
```
