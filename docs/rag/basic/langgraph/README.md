# LangGraph实现RAG
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

接下来，需要安装`langgraph`：
```sh
$ pip install langgraph
```
然后设置定义`State`、`Retriever`和`Generation`。
```py
from langchain import hub
from typing_extensions import TypedDict
from langchain_deepseek import ChatDeepSeek
from langchain_core.documents import Document
from langgraph.graph import START, StateGraph
from typing import List

# prompt
prompt = hub.pull("rlm/rag-prompt")

class State(TypedDict):
  question: str
  context: List[Document]
  answer: str

# retrieve
def retrieve(state: State):
  retriever_docs = vector_store.similarity_search(
    query=state['question'],
    k=2
  )
  retriever_content = "\n\n".join(doc.page_content for doc in retriever_docs)
  return { "context": retriever_content }

# generate
def generate(state: State):
  llm = ChatDeepSeek(
    model="deepseek-chat",
    api_key=api_key,
    temperature=0.5
  )
  query = prompt.invoke({
    "question": state['question'],
    "context": state['context']
  })
  response = llm.invoke(
    input=query
  )
  return { "answer": response.content }
```

最后定义`Graph`并调用大模型`API`得到结果：
```py
graph = (
  StateGraph(State)
  .add_sequence([retrieve, generate])
  .add_edge(START, 'retrieve')
  .compile()
)

question="黑神话是什么公司开发的，什么类型的游戏，什么时间发布？"
response_content = graph.invoke({ "question": question })
print(response_content.get('answer'))
```

最后回答：
```text
《黑神话：悟空》是由游戏科学开发的动作角色扮演游戏，于2024年8月20日发布。
```
