# Document类型

`LangChain`中通过各种`loader`加载后的对象是`Document`类型，其包含`page_content`和`metadata`两个重要属性。

除了可以从`loader`加载，还可以手动构造`Document`对象数据，例如：

```py
from langchain_core.documents import Document

documents = [
  Document(
    page_content="唐僧是师傅",
    metadata={"source": "师徒四人.txt"}
  ),
  Document(
    page_content="悟空是大师兄",
    metadata={"source": "师徒四人.txt"}
  ),
  Document(
    page_content="八戒是二师兄",
    metadata={"source": "师徒四人.txt"}
  ),
  Document(
    page_content="沙僧是三师兄",
    metadata={"source": "师徒四人.txt"}
  ),
  Document(
    page_content="白龙马是小师弟",
    metadata={"source": "师徒四人.txt"}
  )
]

print(documents)
```
输出结果：
```text
[
  Document(metadata={'source': '师徒四人.txt'}, page_content='唐僧是师傅'),
  Document(metadata={'source': '师徒四人.txt'}, page_content='悟空是大师兄'),
  Document(metadata={'source': '师徒四人.txt'}, page_content='八戒是二师兄'),
  Document(metadata={'source': '师徒四人.txt'}, page_content='沙僧是三师兄'),
  Document(metadata={'source': '师徒四人.txt'}, page_content='白龙马是小师弟')
]
```