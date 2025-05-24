# 密集嵌入

**密集嵌入(Dense Embedding)**：每个词或对象用一个低维、稠密向量表示。

## 特点

* 维度：通常是几维到几千维，维度较低。
* 可解释性：难以理解单个维度的含义，可解释性差。
* 语义信息：通过模型训练出来的连续表示，包含语义信息。
* 效率：适合用余弦相似度/点积做相似度计算，效率较高。
* 上下文：包含上下文，例如`BERT`输出。

## 示例
* **词嵌入模型**：`Word2Vec`、`GloVe`。
* **上下文模型**：`BERT`、`GPT`(基于`Transformer`编码)。
* **推荐系统**：矩阵分解(`MF`)、深度神经网络(如`YouTube DNN`)。

## 应用场景
* **文本处理**：语义搜索、机器翻译。
* **推荐系统**：用户/物品的隐向量匹配。
* **计算机视觉**：`CNN`特征(如`ResNet`输出)。
* **分类任务**：深度学习模型(如`BERT`微调)。

## 实现案例
::: tip
[FlagEmbedding 文档](https://github.com/FlagOpen/FlagEmbedding)
:::

```py
from FlagEmbedding import BGEM3FlagModel

passage = ["猢狲施展烈焰拳，击退妖怪；随后开启金刚体，抵挡神兵攻击。"]
model = BGEM3FlagModel(
  model_name_or_path="BAAI/bge-m3",
  use_fp16=True
)

passage_embedding = model.encode(
  sentences=passage,
  return_sparse=True, # 返回稀疏嵌入
  return_dense=True # 返回密集嵌入
)

 # 分别提取稀疏嵌入、密集嵌入和多向量嵌入
dense_vecs = passage_embedding.get('dense_vecs')
sparse_vecs = passage_embedding.get('lexical_weights')

# 展示稀疏嵌入和密集嵌入的示例
print("密集嵌入维度:", dense_vecs[0].shape)
print("密集嵌入前10维:", dense_vecs[0][:10])  # 仅显示前10维

print("稀疏嵌入总长度:", len(sparse_vecs[0]))
print("稀疏嵌入前10个非零值:", list(sparse_vecs[0].items())[:10])  # 仅显示前10个非零值
```
输出结果：
```text
密集嵌入维度: (1024,)
密集嵌入前10维: [
  0.0115688, 
  0.02439203,
  -0.02763909,
  -0.00984308,
  -0.04426071,
  -0.02911919,
  0.03953099,
  0.02165177,
  0.01074664,
  -0.03528614
]

稀疏嵌入总长度: 23
稀疏嵌入前10个非零值: [
  ('6', np.float32(0.07353998)),
  ('28323', np.float32(0.07607669)),
  ('8869', np.float32(0.15832466)),
  ('48124', np.float32(0.16404563)),
  ('213212', np.float32(0.20880711)),
  ('75133', np.float32(0.25368175)),
  ('4', np.float32(0.05709494)),
  ('31833', np.float32(0.111040354)),
  ('12461', np.float32(0.18773092)),
  ('101184', np.float32(0.18636838))
]
```