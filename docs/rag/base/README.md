---
sidebar: heading
---

# RAG基础

## 系统架构

![RAG系统架构](../../images/rag/rag-architecture.png)

## 相关名词
* RAG
* Embedding
* Vector
* Vector DB
* Retriever
* LCEL

## 关键技术

### Embedding

### Vector和Vector DB

### Retriever

## 简易RAG

### 前置准备
::: tip
所有跟llm请求相关的，默认都基于DeepSeek
:::
首先定义环境变量文件`.env`，其代码如下：
```env
# DeepSeek api key
DEEPSEEK_API_KEY = 'your api key'

# DeepSeek endpoint
DEEPSEEK_API_BASE = 'https://api.deepseek.com/v1'
```
然后安装一个依赖包：
```sh
$ pip install dotenv
```
接着定义两个文件`env_tools.py`和`chain.py`，其代码分别是：
```py
# env_tools.py
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

def get_api_key():
  return os.getenv('DEEPSEEK_API_KEY')

def get_api_base():
  return os.getenv('DEEPSEEK_API_BASE')
```

```py
# chain.py
from env_tools import get_api_key, get_api_base

api_key = get_api_key()
api_base = get_api_base()

print(api_key)
print(api_base)
```
### LangChain实现RAG
```py

```

### LangGraph实现RAG

### LangChain vs LangGraph

### 自定义实现RAG
