# 中等

## 200.岛屿的数量
::: tip
**要求**：给你一个由'1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。   
**输入**：  
grid = [  
  ["1","1","1","1","0"],  
  ["1","1","0","1","0"],  
  ["1","1","0","0","0"],  
  ["0","0","0","0","0"]  
]   
**输出**：1     
**说明**：岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成，此外，你可以假设该网格的四条边均被水包围。   
**原题链接**：[200.岛屿的数量](https://leetcode.cn/problems/number-of-islands/) 
:::
方法一：广度优先遍历BFS
```js
// m和n分别为矩阵行的数量和列的数量
// 时间复杂度：O(m * n)
// 空间复杂度：O(min(m, n))，最坏情况下遍历完整个矩阵
var bfs = (grid, i, j) => {
  if (
    i < 0 || i >= grid.length ||
    j < 0 || j >= grid[0].length ||
    grid[i][j] === '0'
  ) {
    return;
  }
  grid[i][j] = '0';

  bfs(grid, i - 1, j);
  bfs(grid, i + 1, j);
  bfs(grid, i, j - 1);
  bfs(grid, i, j + 1);
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
};
```
