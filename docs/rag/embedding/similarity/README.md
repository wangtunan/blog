# 向量相似度计算

**向量相似度计算**：是衡量两个嵌入向量`Embedding`之间关联性的核心技术，广泛应用于搜索、推荐、聚类等场景。

## 余弦相似度
::: tip
[余弦相似度 维基百科](https://zh.wikipedia.org/wiki/%E4%BD%99%E5%BC%A6%E7%9B%B8%E4%BC%BC%E6%80%A7)
:::
**余弦相似度(Cosine Similarity)**：忽略向量长度，专注方向一致性(范围[-1, 1]，1表示完全相似)，适用于文本、推荐系统(如比较用户兴趣向量)。

公式：
$$
\text{cosine}(A, B) = \frac{A \cdot B}{\|A\| \cdot \|B\|}
$$

示例：
```py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

# 示例向量
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

cos_sim = cosine_similarity([A], [B])[0][0]  
print(cos_sim) # 输出 0.974
```

## 点积
::: tip
[点积 维基百科](https://zh.wikipedia.org/wiki/%E7%82%B9%E7%A7%AF)
:::

**点积(Dot Product)**：受向量长度影响，适合长度本身有意义的场景(如加权评分)，例如推荐系统中用户/物品得分的直接计算(矩阵分解)。

公式：
$$
\text{dot}(A, B) = A \cdot B = \sum_{i=1}^n A_i B_i
$$

示例：
```py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

# 示例向量
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

dot_product = np.dot(A, B)
print(dot_product)  # 输出 32
```

## 欧氏距离
::: tip
[欧氏距离 维基百科](https://zh.wikipedia.org/wiki/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E8%B7%9D%E7%A6%BB)
:::

**欧氏距离(Euclidean Distance)**：衡量向量空间中的绝对距离(越小越相似)，用于聚类(如K-Means)、图像检索。

公式：
$$
\text{euclidean}(A, B) = \sqrt{\sum_{i=1}^n (A_i - B_i)^2}
$$

示例：
```py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

# 示例向量
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

euclidean_dist = euclidean_distances([A], [B])[0][0]
print(euclidean_dist)  # 输出 5.196
```

## 曼哈顿距离

::: tip
[曼哈顿距离 维基百科](https://zh.wikipedia.org/wiki/%E6%9B%BC%E5%93%88%E9%A0%93%E8%B7%9D%E9%9B%A2)
:::

**曼哈顿距离(Manhattan Distance)**：对异常值更鲁棒，适用于高维稀疏数据，例如用户行为分析。

公式：
$$
\text{manhattan}(A, B) = \sum_{i=1}^n |A_i - B_i|
$$

示例：
```py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

# 示例向量
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

manhattan_dist = manhattan_distances([A], [B])[0][0]
print(manhattan_dist)  # 输出 9.0
```

## 雅卡尔指数
::: tip
[雅卡尔指数 维基百科](https://zh.wikipedia.org/wiki/%E9%9B%85%E5%8D%A1%E5%B0%94%E6%8C%87%E6%95%B0)
:::

**雅卡尔指数(Jaccard)**：用于比较二进制向量或集合，如用户兴趣标签匹配。

公式：
$$
\text{jaccard}(A, B) = \frac{|A \cap B|}{|A \cup B|}
$$

示例：
```text
A = {苹果, 香蕉, 梨}
B = {香蕉, 梨, 西瓜}

A ∩ B = {香蕉,梨}
A U B = {苹果,香蕉,梨,西瓜}

J(A,B) = 2 / 4 = 0.5
```

## 皮尔逊相关系数
::: tip
[皮尔逊相关系数 维基百科](https://zh.wikipedia.org/wiki/%E7%9A%AE%E5%B0%94%E9%80%8A%E7%A7%AF%E7%9F%A9%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0)
:::

**皮尔逊相关系数(Pearson Correlation)**：衡量线性相关性(范围[-1, 1])，适用于评分预测，例如电影推荐。

公式：
$$
\text{pearson}(A, B) = \frac{\text{Cov}(A, B)}{\sigma_A \cdot \sigma_B}
$$

示例：
```py
import numpy as np
from scipy.stats import pearsonr

# 示例向量
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

r, p = pearsonr(x, y)
print(f"相关系数 r = {r:.3f}, p值 = {p:.3f}") # 输出：r = 1.000, p = 0.000
```

## 对比和选择建议

| **方法** | **适用场景** | **计算效率** | **鲁棒性**   | **特点** |
|---|---|---|---|---|
| **余弦相似度(Cosine Similarity)** | 文本、高维稀疏数据 | 高 | 中 | 忽略向量长度，专注方向一致性 |
| **点积(Dot Product)** | 推荐系统（显式评分 | 高 | 低 | 受向量长度影响，需归一化 |
| **欧氏距离(Euclidean Distance)** | 图像、聚类 | 中 | 高 | 衡量绝对距离，对尺度敏感 |
| **曼哈顿距离(Manhattan Distance)** | 异常检测、稀疏特征 | 中 | 高 | 对异常值鲁棒 |
| **雅卡尔指数(Jaccard)** | 集合、标签匹配 | 高 | 高 | 适用于二进制数据或集合 |
| **皮尔逊相关系数(Pearson Correlation)** | 评分预测、连续变量相关性分析 | 中 | 中 | 消除均值影响，衡量线性相关性（范围[-1,1]）|
