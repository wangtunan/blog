# 分块方法

## 按固定字符数分块
::: tip
[CharacterTextSplitter 文档](https://python.langchain.com/api_reference/text_splitters/character/langchain_text_splitters.character.CharacterTextSplitter.html)
:::

```py
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

data_loader = TextLoader(
  file_path="data/山西文旅/云冈石窟.txt",
  encoding="utf-8"
)

documents = data_loader.load()

splitter = CharacterTextSplitter(
  chunk_size=1000, # 每个chunk的大小
  chunk_overlap=200, # 每个chunk的overlap
)

chunks = splitter.split_documents(documents)

print("\n========= 文档分块结果 =========")
for i, chunk in enumerate(chunks, 1):
  print(f"内容: {chunk.page_content}")
  print("=" * 50)
```