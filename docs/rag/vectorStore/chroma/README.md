# Chroma
::: tip
[Chroma 文档](https://docs.trychroma.com/docs/overview/introduction)
:::

## 安装

执行此命令安装`chroma`包：
```sh
$ pip install chromadb
```

## 客户端
`Chroma`中的客户端一份分为如下几种类型：
* **临时客户端(Ephemeral Client)**：数据存储在本地内存中，适合快速严重一些特性。
* **持久化客户端(Persistent Client)**：数据存储在本地硬盘中，在`Chroma`其中时自动加载硬盘已经存储的数据。
* **客户端-服务端模式(Client Server Mode)**：服务端和客户端可分离。

### 临时客户端
通过如下代码创建临时客户端：
```py
import chromadb

client = chromadb.EphemeralClient()
```

### 持久化客户端
通过如下代码创建持久化客户端：
```py
import chromadb

client = chromadb.PersistentClient(
  path="./data"
)
```
上述代码执行后会创建一个本地`db`：
```sh
| - data
| - | - chroma.sqlite3
```

### 服务端-客户端模式
通过如下代码启动服务端：
```sh
# 默认端口和host
$ chroma run --path /db_path

# 自定义端口和host
$ chroma run --host localhost --port 80000 --path /db_path
```
![Chroma Server](../../../images/rag/rag_chroma_server.png)

通过如下代码链接服务端：
```py
import chromadb

client = chromadb.HttpClient(
  host="localhost",
  port=8080,
)
```

## 集合(Collection)
::: tip
`Collection`是向量数据库中存储一组相似数据的逻辑单元，类似于传统数据库中的表`Table`
:::

集合相关操作如下：
```py
# 创建集合(仅创建)
collection = client.create_collection(
  name="test_collection"
)
# 创建集合(如果存在则返回，如果不存在则创建)
collection = client.get_or_create_collection(
  name="test_collection"
)


# 修改集合名称
collection.modify(name="dev")

# 删除集合(不可逆，谨慎操作)
client.delete_collection(
  name="test_collection"
)

# 集合其它方法
print(collection.peek()) # 返回一组items列表
print(collection.count()) # 返回items的数量
```

## 集合数据(Collection Data)
在操作集合数据时，有如下几个关键参数：
* **documents**: 可选，与`embeddings`不能同时为空，原始文档对象的列表。
* **embeddings**：可选，与`documents`不能同时为空，一组向量列表。
* **metadatas**：可选，元数据列表，需要和`documents` 和 `embeddings`在维度上相同。
* **ids**：必填，一组唯一`id`的列表，需要和`documents` 和 `embeddings`在维度上相同。


### 添加集合数据
```py
# 添加数据
collection.add(
  documents=["Vue.js", "React.js", "Svelte.js"],
  metadatas=[
    { "framework": "FE", "version": "2.7" },
    { "framework": "FE", "version": "18.0" },
    { "framework": "FE", "version": "5.0" }
  ],
  ids=["id1", "id2", "id3"]
)
print(collection.count())
```

### 更新集合数据
```py
# 同时更新document和metadata
collection.update(
  ids=["id1"],
  documents=["Vue.js"]
  metadatas=[
    { "framework": "FE", "version": "3.0" }
  ]
)

# 插入数据
collection.upsert(
  documents=["Angular.js"],
  metadatas=[
    { "framework": "FE", "version": "20.0" }
  ],
  ids=["id4"]
)
```

### 删除集合数据
```py
# ids可选，如果不提供，则删除满足where条件所有的数据
collection.delete(
  ids=["id3"],
  where={
    "version": "5.0"
  }
)
```