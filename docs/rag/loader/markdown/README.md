# Markdown
::: tip
[UnstructuredMarkdownLoader文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.markdown.UnstructuredMarkdownLoader.html)
:::

```py
from langchain_community.document_loaders import UnstructuredMarkdownLoader

data_loader = UnstructuredMarkdownLoader(
  file_path="./data/黑悟空/黑悟空版本介绍.md",
  mode="elements",
  strategy="fast"
)

documents = data_loader.load()

for doc in documents[:5]:
  print("========文档内容========")
  print(f"""element_id={doc.metadata.get('element_id')}, parent_id={doc.metadata.get('parent_id')}""")
  print(f"""{doc.page_content}""")
```
输出结果：
```text
========文档内容========
element_id=b89add9386b58a1638e0b96d19f08d0d, parent_id=None
黑神话：悟空 🐵
========文档内容========
element_id=4d1fd58a257960aafb046fc47605c217, parent_id=b89add9386b58a1638e0b96d19f08d0d
黑神话：悟空 是由中国游戏开发团队制作的一款备受瞩目的动作冒险游戏，以《西游记》为背景，重新演绎了经典故事，带来了极 
具冲击力的视觉和游戏体验。
========文档内容========
element_id=2aecac605c643fd6e5877eb2943061d9, parent_id=b89add9386b58a1638e0b96d19f08d0d
游戏版本介绍
========文档内容========
element_id=066222dfa5c88f6daf909cc9f97ddc30, parent_id=2aecac605c643fd6e5877eb2943061d9
1. 数字标准版 💻
========文档内容========
element_id=871db441632d0e97daf97578eef69d48, parent_id=066222dfa5c88f6daf909cc9f97ddc30
包含基础游戏
```