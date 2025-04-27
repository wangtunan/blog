# 文本导入
::: tip
需要安装依赖 `pip install langchain-community`
:::

`TextLoader`文档地址：[Text Loader文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.text.TextLoader.html)

```py
from langchain_community.document_loaders import TextLoader

text_loader = TextLoader(
  file_path="./data/黑悟空/设定.txt",
  encoding="utf-8"
)

documents = text_loader.load()

print(documents)
```
输出结果：
```text
[Document(metadata={'source': './data/黑悟空/设定.txt'}, page_content='《黑神话：悟空》的故事可分为六个章节，名为“火照黑云”、“风起
黄昏”、“夜生白露”、“曲度紫鸳”、“日落红尘”和“未竟”，并且拥有两个结局，玩家的选择和经历将影响最终的结局。\n\n每个章节结尾，附有二维 
和三维的动画过场，展示和探索《黑神话：悟空》中的叙事和主题元素。\n\n游戏的设定融合了中国的文化和自然地标。例如重庆的大足石刻、山西
省的小西天、南禅寺、铁佛寺、广胜寺和鹳雀楼等，都在游戏中出现。游戏也融入了佛教和道教的哲学元素。')]
```