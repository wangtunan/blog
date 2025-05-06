# 简单文本导入

## TextLoader
::: tip
[TextLoader文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.text.TextLoader.html)
:::

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
[
  Document(
    metadata={'source': './data/黑悟空/设定.txt'},
    page_content='《黑神话：悟空》的故事可分为六个章节，名为“火照黑云”、“风起黄昏”、“夜生白露”、“曲度紫鸳”、“日落红尘”和“未竟”，
    并且拥有两个结局，玩家的选择和经历将影响最终的结局。\n\n每个章节结尾，附有二维 和三维的动画过场，
    展示和探索《黑神话：悟空》中的叙事和主题元素。游戏的设定融合了中国的文化和自然地标。
    例如重庆的大足石刻、山西省的小西天、南禅寺、铁佛寺、广胜寺和鹳雀楼等，都在游戏中出现。
    游戏也融入了佛教和道教的哲学元素。'
  )
]
```

## DirectoryLoader
::: tip
[DirectoryLoader文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.directory.DirectoryLoader.html)
:::

可使用`DirectoryLoader`一次性加载某个目录下所有`txt`文件。
```py
from langchain_community.document_loaders import DirectoryLoader, TextLoader

markdown_loader = DirectoryLoader(
  path="./data/黑悟空",
  glob=["**/*.txt"],
  loader_cls=lambda path: TextLoader(path, encoding="utf-8")
)

documents = markdown_loader.load()

print(f"文档数：{len(documents)}")
```

## Unstructured
::: tip
[Unstructured 文档](https://docs.unstructured.io/open-source/introduction/quick-start)
:::

如要在加载文档时有自定义要求，可使用`Unstructured`获取更多信息。
```py
from unstructured.partition.text import partition_text

elements = partition_text(
  "./data/黑悟空/设定.txt"
)

for element in elements:
  print("============================")
  print(f"文档内容: {element.text}")

  print("元数据:")
  metadata_dict = element.metadata.__dict__
  for key, value in metadata_dict.items():
    if not key.startswith('_') and value is not None:  
      print(f"  {key}: {value}")
```

输出结果：
```text
============================
文档内容: 《黑神话：悟空》的故事可分为六个章节，名为“火照黑云”、“风起黄昏”、“夜生白露”、“曲度紫鸳”、“日落红尘”和“未竟”，
并且拥有两个结局，玩家的选择和经历将影响最终的结局。
元数据:
  last_modified: 2025-04-27T22:13:40
  languages: ['zho']
  file_directory: ./data/黑悟空
  filename: 设定.txt
  filetype: text/plain
============================
文档内容: 每个章节结尾，附有二维和三维的动画过场，展示和探索《黑神话：悟空》中的叙事和主题元素。
元数据:
  last_modified: 2025-04-27T22:13:40
  languages: ['zho']
  file_directory: ./data/黑悟空
  filename: 设定.txt
  filetype: text/plain
============================
文档内容: 游戏的设定融合了中国的文化和自然地标。例如重庆的大足石刻、山西省的小西天、南禅寺、铁佛寺、广胜寺和鹳雀楼等，
都在游戏中出现。游戏也融入了佛教和道教的哲学元素。
元数据:
  last_modified: 2025-04-27T22:13:40
  languages: ['zho']
  file_directory: ./data/黑悟空
  filename: 设定.txt
  filetype: text/plain
```