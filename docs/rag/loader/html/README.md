# HTML网页数据
::: tip
[WebBaseLoader文档](https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.web_base.WebBaseLoader.html)
:::

## 选型方案对比
| 加载器名称 | 动态渲染支持 | 核心功能 | 优势场景 | 主要限制|
|----|----|----|----|----|
| **WebBaseLoader** | ❌ | 静态HTML快速解析 | 轻量级抓取静态页面（如文档、博客）| 无法处理JavaScript动态内容|
| **UnstructuredURLLoader** | ❌  | 多格式解析（HTML/PDF等），自动清理文本 | 混合格式内容提取（如带PDF的网页） | 复杂页面可能丢失部分结构  |
| **SeleniumURLLoader** | ✅ | 完整浏览器环境渲染 | 需要登录或交互的动态页面（如SPA） | 配置复杂，运行效率低 |
| **RSSFeedLoader** | ❌ | 结构化解析RSS/Atom订阅源 | 新闻/博客更新追踪 | 仅支持标准订阅格式 |
| **AsyncHtmlLoader**   | ❌ | 异步并发批量抓取 | 大规模静态页面采集（50+URLs）| 需要异步编程支持 |


## WebBaseLoader
::: tip
[WebBaseLoader 文档](https://python.langchain.com/docs/integrations/document_loaders/web_base/)
:::

```py
import bs4
from langchain_community.document_loaders import WebBaseLoader

# bs_kwargs参数作用是只加载网页主题内容
data_loader = WebBaseLoader(
  web_path="https://zh.wikipedia.org/wiki/黑神话：悟空",
  bs_kwargs={
    "parse_only": bs4.SoupStrainer(id="bodyContent")
  }
)

documents = data_loader.load()
document = documents[0]
print(f"{document.metadata}\n")
print(document.page_content)
```

## RSSFeedLoader
::: tip
[RSSFeedLoader 文档](https://python.langchain.com/docs/integrations/document_loaders/rss/)
:::

首先需要安装必要的包：
```sh
$ pip install feedparser newspaper3k listparser
```

```py
import os
import certifi

from langchain_community.document_loaders import RSSFeedLoader

# 设置SSL，防止加载时报错
os.environ["SSL_CERT_FILE"] = certifi.where()

# RSS Feed地址
urls = [
  "https://36kr.com/feed",
  "https://www.huxiu.com/rss/1.xml",
  "https://www.ruanyifeng.com/blog/atom.xml",
  "https://www.oschina.net/news/rss"
]

loader = RSSFeedLoader(urls=urls)
documents = loader.load()

for i, doc in enumerate(documents[:5]):
  print(f"文章 {i+1}:")
  print(f"标题: {doc.metadata.get('title', '无标题')}")
  print(f"发布时间: {doc.metadata.get('published', '未知时间')}")
  print(f"来源: {doc.metadata.get('source', '未知来源')}")
  print(f"链接: {doc.metadata.get('link', '无链接')}")
  print("-" * 80)
```
输出结果：
```text
文章 1:
标题: 谷歌的 NotebookLM 能生成中文播客了
发布时间: 未知时间
来源: 未知来源
链接: http://www.ruanyifeng.com/blog/2025/05/notebooklm.html
--------------------------------------------------------------------------------
文章 2:
标题: 科技爱好者周刊（第 346 期）：未来就是永恒感的丧失
发布时间: 未知时间
来源: 未知来源
链接: http://www.ruanyifeng.com/blog/2025/04/weekly-issue-346.html
--------------------------------------------------------------------------------
文章 3:
标题: 巨头的新战场：AI 编程 IDE（暨 字节 Trae 调用 MCP 教程）
发布时间: 未知时间
来源: 未知来源
链接: http://www.ruanyifeng.com/blog/2025/04/trae-mcp.html
--------------------------------------------------------------------------------
```