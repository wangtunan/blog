# DataBase
::: tip
[SQLDatabaseLoader 文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.sql_database.SQLDatabaseLoader.html)
:::

使用`SQLDatabaseLoader`加载数据库数据时，我们以`SQLite`数据库为例。

## 数据准备
```py
import sqlite3

# 创建测试数据库
def create_sample_db(db_path: str):
  conn = sqlite3.connect(db_path)
  cursor = conn.cursor()
  
  # 创建users表
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      active INTEGER DEFAULT 1
  )
  """)
  
  # 插入测试数据
  cursor.executemany(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [
        ("张三", "zhang@example.com"),
        ("李四", "li@example.com"),
        ("王五", "wang@example.com"),
        ("赵六", "zhao@example.com"),
        ("钱七", "qian@example.com")
      ]
  )

  
  conn.commit()
  conn.close()

if __name__ == "__main__":
  create_sample_db("example.db")
  print("测试数据库已创建")
```

## 加载数据

```py
from langchain_community.document_loaders import SQLDatabaseLoader
from langchain_community.utilities import SQLDatabase

db = SQLDatabase.from_uri(f"sqlite:///example.db")
    
data_loader = SQLDatabaseLoader(
  db=db,
  query="SELECT id, name FROM users WHERE active = 1"
)

documents = data_loader.load()

for document in documents:
  print(document.page_content)
  print("=" * 50)

```
输出结果：
```py
id: 1
name: 张三
==================================================
id: 2
name: 李四
==================================================
id: 3
name: 王五
==================================================
id: 4
name: 赵六
==================================================
id: 5
name: 钱七
==================================================
```