# 回溯

## 回溯算法
**回溯算法(BackTracking)**：是一种通过穷举来解决问题的方法，它的核心思想是从一个初始状态出发，暴力搜索所有可能的解决方案，当遇到正确的解则将其记录，
直到找到解或者尝试了所有可能的选择都无法找到解为止。

### 常见术语
| 名词 | 定义 |
| --- | --- |
| 解`Solution` | 解是满足问题特定条件的答案，可能有一个或者多个 | 
| 约束条件`Constraint` | 约束条件是问题中限制解的可行性的条件，通常用于剪枝 | 
| 状态`State` | 状态表示问题在某一时刻的情况，包括已经做出的选择 | 
| 尝试`Attempt` | 尝试是根据可用选择来探索解空间的过程，包括做出选择，更新状态，检查是否为解 |
| 回退`BackTracking` | 回退指遇到不满足约束条件的状态时，撤销前面做出的选择，回到上一个状态 |  
| 剪枝`Pruning` | 剪枝是根据问题特性和约束条件避免无意义的搜索路径的方法，可提高搜索效率 | 

### 案例
假设给定一颗二叉树，搜索并记录所有值为7的节点，请返回根节点到这些节点的路径，并要求路径中不包含值为3的节点。

```js
function preOrder(root, path, res) {
  // 剪枝
  if (!root || root.val === 3) {
    return;
  }
  // 尝试
  path.push(root);
  // 记录解
  if(root.val === 7) {
    res.push([...path]);
  }
  preOrder(root.left, path, res);
  preOrder(root.right, path, res);
  // 回退
  path.pop();
}
```
![回溯剪枝](https://www.hello-algo.com/chapter_backtracking/backtracking_algorithm.assets/preorder_find_constrained_paths.png)

### 框架代码
将回溯的**尝试**、**回退**和**剪枝**的主体框架提炼出来，提升其代码的通用性：
* **state**：表示状态，在上面案例中代表节点的遍历路径。
* **choice**：表示当前状态下可做出的选择，在上面案例中代表当前节点以及其左、右节点。
* **isSolution**：表示判断是否为解，在上面案例中代表是否为值为7的节点。
* **recordSolution**：表示记录解，在上面案例中代表将符合条件的路径添加到`res`中。
* **isValid**：表示剪枝，在上面案例中代表非叶子节点且非值为3的节点。
* **makeChoice**：表示尝试，在上面案例中代表尝试把当前节点添加到遍历路径中。
* **backtrack**：表示进行下一轮选择，在上面案例中代表遍历当前节点的左、右节点。
* **undoChoice**：表示回退，在上面案例中代表把当前节点从遍历路径中移除。

```js
function isSolution(state) {
  const lastNode = state.length > 0 ? state[state.length - 1] : {};
  return lastNode.val === 7;
}
function recordSolution(state, res) {
  res.push([...state]);
}
function isValid(choice) {
  return !!choice && choice.val !== 3;
}
function makeChoice(state, choice) {
  state.push(choice);
}
function undoChoice(state) {
  state.pop();
}
function backTracking(state, choices, res) {
  // 判断是否为解
  if(isSolution(state)) {
    recordSolution(state, res);
  }
  // 遍历所有选择
  for (const choice of choices) {
    // 剪枝
    if(isValid(choice)) {
      // 尝试做出选择
      makeChoice(state, choice);
      // 下一轮选择
      backTracking(state, [choice.left, choice.right], res);
      // 回退
      undoChoice(state);
    }
  }
}
```

### 优点和局限性
**优点**：回溯算法本质上是一种深度优先搜索算法，它尝试所有可能的解决方案直到找到满足条件的解。这种方法的优点在于能够找到所有可能的解决方案，而且在合理的剪枝操作下，
具有很高的效率。

**局限性**：在处理大规模或者复杂问题时，回溯算法的运行效率可能难以接受。
* **时间**：回溯算法通常需要遍历状态空间的所有可能，时间复杂度可以达到指数阶或者阶称阶。
* **空间**：在递归调用中需要保存当前的状态(例如路径，用于剪枝的辅助变量等)，当深度很大时，空间需求可能会变的很大。


### 回溯典型例题
回溯算法可用于解决许多搜索问题，约束满足问题和组合优化问题。

**搜索问题**：这类问题的目标是找到满足特定条件的解决方案。
1. 全排列问题
2. 子集和问题
3. 汉诺塔问题

**约束满足问题**：这类问题的目标是找到满足所有约束条件的解。
1. N皇后
2. 数独
3. 图着色问题

**组合优化问题**：这类问题的目标是在一个组合空间中找到满足某些条件的最优解。
1. 背包问题
2. 旅行商问题
3. 最大团问题

## 全排列问题
全排列问题是回溯算法的一个典型应用，它的定义是在给定一个集合(数组或字符串)的情况下，找出其中元素的所有可能的排列。

### 无相等元素情况
假设输入一个整数数组，其中不包含重复元素，返回所有可能的排列。

从回溯算法的角度看，我们可以把生成排列的过程想象成一系列选择的结果，回退表示撤销一个选择，之后继续尝试其它选择。

从回溯代码的角度看，候选集合`choices`是输入数组中的所有元素，状态`state`是直至目前已被选择的元素，且同一个元素只能被选择一次。

![无相等元素-全排列](https://www.hello-algo.com/chapter_backtracking/permutations_problem.assets/permutations_i.png)

为了控制一个元素只能被选择一次，在回溯过程中需要进行剪枝操作。我们引入`selected`布尔型数组，其中`selected[i]`表示`choices[i]`是否已被选择，并基于它实现以下剪枝操作：
* 在做出选择时，将`selected[i]`赋值为`true`，代表它已经被选择。
* 遍历选择列表`choices`时，跳过所有已被选择元素，即剪枝操作。

![无相等元素-全排列-剪枝](https://www.hello-algo.com/chapter_backtracking/permutations_problem.assets/permutations_i_pruning.png)

其代码实现如下：
```js
// 无相同元素全排列回溯算法
export const backTrackingNoEqualValue = (state, choices, selected, res) => {
  // 已选择数量等于元素数量时，退出回溯
  if(state.length === choices.length) {
    res.push([...state]);
  }
  // 遍历元素列表
  choices.forEach((choice, i) => {
    // 剪枝：不允许重复元素
    if(!selected[i]) {
      // 尝试：做出选择
      selected[i] = true;
      state.push(choice);
      // 下一次选择
      backTrackingNoEqualValue(state, choices, selected, res);
      // 回退：撤销选择，恢复到之前的状态
      selected[i] = false;
      state.pop();
    }
  });
};

// 无相同元素全排列
export const permutationsNoEqualValue = (nums) => {
  const selected = new Array(nums.length).fill(false);
  const res = [];
  backTrackingNoEqualValue([], nums, selected, res);
  return res;
};
```
### 有相等元素情况
假设输入一个整数数组，数组中可能包含重复元素，返回所有不重复的排列。

有相同元素和无相同元素的区别是最终的排列是否包含重复结果，为了避免这种情况，应该在剪枝的过程中处理：在遍历的时候，开启一个哈希表，当元素被选择时记录到哈希表中，下次遍历时判断不在此哈希表中的才允许遍历。

![相同元素-全排列-剪枝](https://www.hello-algo.com/chapter_backtracking/permutations_problem.assets/permutations_ii_pruning.png)

其代码实现如下：
```js
// 有相同元素全排列回溯算法
export const backTrackingHasEqualValue = (state, choices, selected, res) => {
  // 已选择数量等于元素数量时，退出回溯
  if(state.length === choices.length) {
    res.push([...state]);
    return;
  }
  // 开启重复项哈希表
  const duplicated = new Set();
  // 遍历元素列表
  choices.forEach((choice, i) => {
    // 剪枝：不允许重复元素且不允许相等元素
    if(!selected[i] && !duplicated.has(choice)) {
      // 尝试：做出选择
      selected[i] = true;
      state.push(choice);
      duplicated.add(choice);
      // 下一次选择
      backTrackingHasEqualValue(state, choices, selected, res);
      // 回退：撤销选择，恢复到之前的状态
      selected[i] = false;
      state.pop();
    }
  });
};

// 有相同元素全排列
export const permutationsHasEqualValue = (nums) => {
  const selected = new Array(nums.length).fill(false);
  const res = [];
  backTrackingHasEqualValue([], nums, selected, res);
  return res;
};
```

## 子集和问题

### 无相等元素情况
假设给定一个正整数`nums`和一个目标正整数`target`，请找出所有可能的组合，使得组合中的元素和等于`target`。假设给定的数组无重复元素，且每个元素可以被选择多次，且不区分子集中元素的顺序。

例如：输入集合`[3, 4, 5]`和目标整数9，解为`[3, 3, 3]`和`[4, 5]`

![子集和问题-无相等元素](https://www.hello-algo.com/chapter_backtracking/subset_sum_problem.assets/subset_sum_i.png)

为了方便剪枝，我们需要对代码进行以下优化：
* 在开启搜索前，先将数组`nums`排序，在遍历时，当子集和超过`target`后直接结束循环。
* 设置开始遍历索引位置，避免出现重复的子集。

其代码实现如下：
```js
// 无重复元素子集和回溯算法
export const backTrackingNoEqualValue = (state, target, choices, start, res) => {
  // 子集和等于目标值，记录子集
  if(target === 0) {
    res.push([...state]);
    return;
  }
  // 遍历所有选择
  // 剪枝一：从start开始遍历，避免出现重复自己
  for (let i = start; i < choices.length; i++) {
    const choice = choices[i];
    // 剪枝二：如果子集和超过target，结束循环
    if(target - choice < 0) {
      break;
    }
    // 尝试：做出选择，更新target和start
    state.push(choice);
    // 下一次选择
    backTrackingNoEqualValue(state, target - choice, choices, i, res);
    // 回退：撤销选择
    state.pop();
  }
}; 
// 无重复元素子集和
export const subsetSumNoEqualValue = (nums, target) => {
  const state = []; // 子集
  const res = [];   // 结果 
  const start = 0;  // 起始遍历索引
  nums.sort((a, b) => a - b); // 排序数组
  backTrackingNoEqualValue(state, target, nums, start, res);
  return res;
};
```

### 有相等元素情况
假设给定一个正整数数组`nums`和一个目标正整数`target`，请找出所有可能的组合，使得组合中的元素和等于`target`。假设给定的数字包含重复元素，每个元素只能被选取一次。

例如：输入数组`[4, 4, 5]`，目标数组`9`，相比于不重复数组，包含重复元素的输入数组最终得到的结果为`[4, 5]`和`[4, 5]`，如下图：

![子集和-有相等元素](https://www.hello-algo.com/chapter_backtracking/subset_sum_problem.assets/subset_sum_ii_repeat.png)

为了解决以上问题，我们需要在剪枝的时候处理：因为已经是排序过后的数组，因此我们判断`choices[i]`和`choices[i + 1]`不相等时，直接跳过当前循环。

其实现代码如下：
```js
export const backTrackingHasEqualValue = (state, target, choices, start, res) => {
  // 子集和等于目标值，记录子集
  if(target === 0) {
    res.push([...state]);
    return;
  }
  // 遍历所有选择
  // 剪枝一：从start开始遍历，避免出现重复自己
  for (let i = start; i < choices.length; i++) {
    const choice = choices[i];
    // 剪枝二：如果子集和超过target，结束循环
    if(target - choice < 0) {
      break;
    }
    // 剪枝三：相同元素时，直接跳过
    if(choice === choices[i - 1]) {
      continue;
    }
    // 尝试：做出选择，更新target和start
    state.push(choice);
    // 下一次选择
    backTrackingHasEqualValue(state, target - choice, choices, i, res);
    // 回退：撤销选择
    state.pop();
  }
};

// 有重复元素字节和
export const subsetSumHasEqualValue = (nums, target) => {
  const state = []; // 子集
  const res = [];   // 结果 
  const start = 0;  // 起始遍历索引
  nums.sort((a, b) => a - b); // 排序数组
  backTrackingHasEqualValue(state, target, nums, start, res);
  return res;
};
```

## N皇后问题
根据国际象棋的规则，皇后可以攻击与其同处一行，一列或一条斜线上的棋子，给定`n`个皇后和`n * n`大小的棋盘，寻找使得所有皇后之间无法互相攻击的摆放方案。

例如，当`n = 4`时，可以有两种摆放方案，如下图：
![N皇后问题](https://www.hello-algo.com/chapter_backtracking/n_queens_problem.assets/solution_4_queens.png)

下图为展示皇后摆放位置规则：**多个皇后不能同处一行，一列或一条对角线上**。

![N皇后摆放规则](https://www.hello-algo.com/chapter_backtracking/n_queens_problem.assets/n_queens_constraints.png)

### 逐行放置策略
皇后的数量和棋盘的行数都为`n`，因此我们可以知道：**棋盘的每一行只允许放置一个皇后**。

按照此规则，意味着我们需要采取逐行放置策略：**从第一行开始，在每行放置一个皇后，直至最后一行结束**。如下图：
![N皇后逐行放置](https://www.hello-algo.com/chapter_backtracking/n_queens_problem.assets/n_queens_placing.png)

### 列和对角线剪枝
* 为了满足列的要求，定义长度为`n`的布尔型数组`cols`，记录每一列是否有皇后。在每次放置前，通过`cols`来进行剪枝操作，并在回溯中动态更新`cols`的状态。
* 为了满足对角线的约束，我们假设棋盘中某个格子的行列索引为`[row, col]`，则从主对角线上可以发现：**row - col**的值是恒定的，例如：`[1, 1], [2, 2], [3, 3]`和`[1, 2], [2, 3]`。从次对角线上可以发现：**row + col**的值是恒定的，例如：`[1, 3], [2, 2], [3, 1]`和`[1, 2], [2, 1]`。

![N皇后-列和对角线剪枝](https://www.hello-algo.com/chapter_backtracking/n_queens_problem.assets/n_queens_cols_diagonals.png)

分别用长度为`2n - 1`的布尔型数组`diags1`和`diags2`代表主对角线、次对角线上是否存在皇后。

### 代码实现
```js
// n皇后回溯算法
export const backTracking = (row, n, state, cols, diags1, diags2, res) => {
  // 放置完所有行，记录解
  if(row === n) {
    res.push(state.map(arr => arr.slice()));
    return;
  }
  // 遍历所有列
  for (let col = 0; col < n; col++) {
    // 计算该格子对应的主对角线和次对角线
    const diag1 = row - col + n - 1;
    const diag2 = row + col;
    // 剪枝：不允许该格子所在的列，主/次对角线有皇后
    if(!cols[col] && !diags1[diag1] && !diags2[diag2]) {
      // 尝试：将皇后放置在该格子
      state[row][col] = 'Q';
      cols[col] = true;
      diags1[diag1] = true;
      diags2[diag2] = true;
      // 放置下一行
      backTracking(row + 1, n, state, cols, diags1, diags2, res);
      // 回退：将该格子恢复为空位
      state[row][col] = '#';
      cols[col] = false;
      diags1[diag1] = false;
      diags2[diag2] = false;
    }
  }
};
// n皇后
export const nQueue = (n) => {
  // 初始化n * n的棋盘，Q代表皇后，#代表空位
  const state = Array.from({ length: n }, () => new Array(n).fill('#'));
  // 记录列皇后摆放情况
  const cols = new Array(n).fill(false);
  // 记录主对角线上皇后摆放情况
  const diags1 = new Array(2 * n - 1).fill(false);
  // 记录次对角线上皇后摆放情况
  const diags2 = new Array(2 * n - 1).fill(false);
  const res = [];

  backTracking(0, n, state, cols, diags1, diags2, res);
  return res;
};
```

## 参考
* [Hello 算法 回溯](https://www.hello-algo.com/chapter_backtracking/)