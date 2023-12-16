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

方法一：广度优先遍历(入度表 + 邻接表)
```js
// way1: 广度优先遍历(入度表 + 邻接表)
// n为节点数量，m为邻接边的数量
// 时间复杂度：O(n + m)，每个节点和边都需要访问一遍
// 空间复杂度：O(n + m)，邻接表的内存开销
var canFinish = function (numCourses, prerequisites) {
  const indegrees = new Array(numCourses).fill(0);
  const adjList = {};
  const queue = [];
  // 获取到每个节点的入度表和节点的邻接表
  for (const item of prerequisites) {
    const [after, before] = item;
    indegrees[after]++;
    if (!adjList[before]) {
      adjList[before] = [];
    }
    adjList[before].push(after);
  }
  // 找到入度为0的节点，既没有先行课依赖
  for (let i = 0; i < numCourses; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
    }
  }
  // 队列队首出队，并对其邻接表的入度-1，如果为0则添加到队列中
  while (queue.length > 0) {
    const head = queue.shift();
    const dependList = adjList[head] || [];
    numCourses--;
    for (let item of dependList) {
      if (--indegrees[item] === 0) {
        queue.push(item);
      }
    }
  }
  return numCourses === 0;
};
```

方法二：深度优先遍历(标志表 + 邻接表)
```js
// way2: 深度优先遍历(标志表 + 邻接表)
// 标志表含义：0表示节点未被访问过，-1表示被其它节点访问过，1表示被当前节点访问过
// n为节点数量，m为邻接边的数量
// 时间复杂度：O(n + m)，每个节点和边都需要访问一遍
// 空间复杂度：O(n + m)，邻接表的内存开销
var dfs = (adjList, flags, i) => {
  if (flags[i] === 1) {
    return false;
  }
  if(flags[i] === -1) {
    return true;
  }
  const dependList = adjList[i] || [];
  flags[i] = 1;
  for (const j of dependList) {
    if (!dfs(adjList, flags, j)) {
      return false;
    }
  }
  flags[i] = -1;
  return true;
}
var canFinish = function (numCourses, prerequisites) {
  const adjList = {};
  const flags = new Array(numCourses).fill(0);

  for(const item of prerequisites) {
    const [after, before] = item;
    if (!adjList[before]) {
      adjList[before] = [];
    }
    adjList[before].push([after]);
  }
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(adjList, flags, i)) {
      return false;
    }
  }
  return true;
}
```

## 208.实现 Trie (前缀树)
<leetcode-link title="208.实现 Trie (前缀树)" link="https://leetcode.cn/problems/implement-trie-prefix-tree" />

## 994.腐烂的橘子
<leetcode-link title="994.腐烂的橘子" link="https://leetcode.cn/problems/rotting-oranges" />

方法一：多源广度优先遍历
```js
// way1: 多源广度优先遍历
// m和n分别为矩阵的行数和列数
// 时间复杂度：O(m * n)，需要完整的遍历完一遍矩阵
// 空间复杂度：O(m * n)，队列中最多存储m * n个节点
var orangesRotting = function (grid) {
  const M = grid.length;
  const N = grid[0].length;
  const queue = [];
  let round = 0;
  let count = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 1) {
        count++;
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }
  while (count > 0 && queue.length > 0) {
    const len = queue.length;
    round++;
    for (let i = 0; i < len; i++) {
      const [m, n] = queue.shift();
      if (m - 1 >= 0 && grid[m - 1][n] === 1) {
        grid[m - 1][n] = 2;
        count--;
        queue.push([m - 1, n]);
      }
      if (m + 1 < M && grid[m + 1][n] === 1) {
        grid[m + 1][n] = 2;
        count--;
        queue.push([m + 1, n]);
      }
      if (n - 1 >= 0 && grid[m][n - 1] === 1) {
        grid[m][n - 1] = 2;
        count--;
        queue.push([m, n - 1]);
      }
      if (n + 1 < N && grid[m][n + 1] === 1) {
        grid[m][n + 1] = 2;
        count--;
        queue.push([m, n + 1]);
      }
    }
  }
  return count > 0 ? -1 : round;
};
```