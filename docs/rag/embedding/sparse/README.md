# 稀疏嵌入

**稀疏嵌入(Sparse Embedding)**：向量的大部分维度为`0`，只有极少数维度有值(如`1`)。

## 特点

* 维度：每个维度对应一个特定的`token`或特征，通常维度极高。
* 可解释性：每一位可映射回某个词或特征，可解释性强。
* 效率：依赖稀疏矩阵处理技术。
* 上下文信息：静态表示，不包含上下文。


## 示例
* `One-hot`：是一种最基本的文本表示方法，对于一个词汇表中的每个词，创建一个全为`0`的向量，只有该词对应的位置才为`1`。
```py
# 词汇表
glossary = ["apple", "banana", "orange"]

# banana向量
banana = [0, 1, 0]
```
* `TF-IDF`：是一种加权技术，用于衡量词对文档的重要程度。其中`TF`表示某词在该文档中出现的频率(频数)，`IDF`衡量某词在整个语料库中是否具有代表性(逆文档频率)。
$$
\mathrm{TF}(t, d) = \frac{词t在文档d中出现的次数}{文档d中的总词数}
$$

$$
\mathrm{IDF}(t) = \log\left(\frac{N}{1 + 包含词t的文档数} \right)
$$

* `BM-25`：是一种信息检索中的打分函数，用于估算文档与查询词的相关性。它是在`TF-IDF`的基础上改进的。
$$
\mathrm{BM25}(d, q) = \sum_{t \in q} \mathrm{IDF}(t) \cdot \frac{f(t, d) \cdot (k_1 + 1)}{f(t, d) + k_1 \cdot \left(1 - b + b \cdot \frac{|d|}{\mathrm{avgdl}}\right)}
$$

## 应用场景
* **文本处理**：关键词检索，布尔搜索。
* **推荐系统**：用户行为日志。
* **计算机视觉**：传统特征。
* **分类任务**：线性模型。

## 实现案例
::: tip
以`IF-IDF`为例
:::

```py
import math
from collections import Counter

# 战斗日志
battle_logs = [
  "猢狲，施展，烈焰拳，击退，妖怪；随后开启，金刚体，抵挡，神兵，攻击。",
  "妖怪，使用，寒冰箭，攻击，猢狲，但被，烈焰拳，反击，击溃。",
  "猢狲，召唤，烈焰拳，与，毁灭咆哮，击败，妖怪，随后，收集，妖怪，精华。"
]
# 超参数
k1 = 1.5
b = 0.75

# 构建词表
vocabulary = set(word for log in battle_logs for word in log.split("，"))
vocab_to_idx = {word: idx for idx, word in enumerate(vocabulary)}

# 计算df idf
N = len(battle_logs)
df = Counter(word for log in battle_logs for word in set(log.split("，")))
idf = {word: math.log((N - df[word] + 0.5) / (df[word] + 0.5) + 1) for word in vocabulary}

# 日志长度
avg_log_len = sum(len(log.split("，")) for log in battle_logs) / N

# BM25稀疏嵌入生成
def bm25_sparse_embedding(log):
  tf = Counter(log.split("，"))
  log_len = len(log.split("，"))
  embedding = {}
  for word, freq in tf.items():
    if word in vocabulary:
      idx = vocab_to_idx[word]
      score = idf[word] * (freq * (k1 + 1)) / (freq + k1 * (1 - b + b * log_len / avg_log_len))
      embedding[idx] = score
  return embedding

# 生成稀疏向量
for log in battle_logs:
  print(f"log: {log}")
  sparse_embedding = bm25_sparse_embedding(log)
  print(f"稀疏嵌入：{sparse_embedding}")
  print("=" * 50)
```
输出结果：
```text
log: 猢狲，施展，烈焰拳，击退，妖怪；随后开启，金刚体，抵挡，神兵，攻击。
稀疏嵌入：{
  12: 0.13780819879399125,
  8: 1.0122437130726,
  18: 0.13780819879399125,
  7: 1.0122437130726,
  2: 1.0122437130726,
  10: 1.0122437130726,
  13: 1.0122437130726,
  21: 1.0122437130726,
  20: 1.0122437130726
}
==================================================
log: 妖怪，使用，寒冰箭，攻击，猢狲，但被，烈焰拳，反击，击溃。
稀疏嵌入：{
  14: 0.485057126267841,
  5: 1.0122437130726,
  16: 1.0122437130726,
  4: 1.0122437130726,
  12: 0.13780819879399125,
  22: 1.0122437130726,
  18: 0.13780819879399125,
  11: 1.0122437130726,
  0: 1.0122437130726
}
==================================================
log: 猢狲，召唤，烈焰拳，与，毁灭咆哮，击败，妖怪，随后，收集，妖怪，精华。
稀疏嵌入：{
  12: 0.12572760993867385,
  19: 0.9235080629006516,
  18: 0.12572760993867385,
  17: 0.9235080629006516,
  6: 0.9235080629006516,
  3: 0.9235080629006516,
  14: 0.6429294928361478, 
  9: 0.9235080629006516,
  1: 0.9235080629006516,
  15: 0.9235080629006516
}
==================================================
```