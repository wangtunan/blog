# Chroma
::: tip
[Chroma 文档](https://docs.trychroma.com/docs/overview/introduction)
:::

## 准备

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