# LangChain实现RAG

安装`langchain_community`包，并使用`loader`加载网页数据。
```py
from langchain_community.document_loaders import WebBaseLoader

# 加载网页数据
web_data = WebBaseLoader(
  web_path="https://zh.wikipedia.org/wiki/黑神话：悟空"
).load()

print(web_data)
```

安装`langchain_text_splitters`包，并使用分割器分割网页数据。
```py
from langchain_text_splitters import RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(
  chunk_size=1000,
  chunk_overlap=200
)
text_split_data = text_splitter.split_documents(web_data)

print(text_split_data)
```

安装`langchain-huggingface`，并设置`embedding`。
```py
from langchain_huggingface import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
  model_name="BAAI/bge-small-zh-v1.5"
)
```

安装`langchain_core`，并设置向量存储。
```py
from langchain_core.vectorstores import InMemoryVectorStore

vector_store = InMemoryVectorStore(embeddings)
vector_store.add_documents(text_split_data)
```
至此，网页数据已经向量化存入到我们的内存中。

存入内存以后，需要做检索相关的工作。
```py
# retriever
question = "黑神话是哪家公司开发的，是什么类型的游戏，什么时间发布的？"
retriever_docs = vector_store.similarity_search(
  query=question,
  k=2
)
retriever_content = "\n\n".join(doc.page_content for doc in retriever_docs)

print(retriever_content)
```

向量存储检索完毕后，接下来要准备检索内容放置到提示词中。
```py
# prompt
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_template("""
  请你依据上下文来回答问题\n
  如果上下文中没有，你直接回答"抱歉，我无法从上下文中提供相关信息。"
  上下文：{context}
  问题：{question}
  回答：
""")
query = prompt.format(
  context=retriever_content,
  question=question
)

print(query)
```
最后，安装`langchain_deepseek`，并调用大模型`api`得到结果。
```py
llm = ChatDeepSeek(
  model="deepseek-chat",
  api_key=api_key,
  temperature=0.5
)
response = llm.invoke(
  input=query
)

print(response.content)
```
最后回答：
```markdown
1. **开发公司**：游戏科学（Game Science）  
2. **游戏类型**：动作角色扮演（ARPG）  
3. **发布时间**：  
   - Microsoft Windows 和 PlayStation 5 平台：**2024年8月20日**  
   - Xbox Series X/S 版：**待定**（暂未发售）  

其他补充：  
- 中国新华社称其为“中国首款3A游戏”，改编自《西游记》。  
- 首发3天销量破1000万份，一个月内销量超2000万份。
```
