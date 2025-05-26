// RAG目录结构
const ragSidebar = [
  {
    text: 'RAG基础',
    collapsable: false,
    children: [
      '/rag/base/'
    ]
  },
  {
    text: '简易RAG',
    collapsable: false,
    children: [
      '/rag/basic/prepare/',
      '/rag/basic/langchain/',
      '/rag/basic/langgraph/',
      '/rag/basic/compare/'
    ]
  },
  {
    text: '数据导入(Loader)',
    collapsable: false,
    children: [
      '/rag/loader/',
      '/rag/loader/document/',
      '/rag/loader/text/',
      '/rag/loader/json/',
      '/rag/loader/html/',
      '/rag/loader/markdown/',
      '/rag/loader/csv/',
      '/rag/loader/ocr/',
      '/rag/loader/pdf/',
      '/rag/loader/db/'
    ]
  },
  {
    text: '文本切块(Chunking)',
    collapsable: false,
    children: [
      '/rag/chunking/',
      '/rag/chunking/methods/'
    ]
  },
  {
    text: '数据嵌入(Embedding)',
    collapsable: false,
    children: [
      '/rag/embedding/',
      '/rag/embedding/similarity/',
      '/rag/embedding/sparse/',
      '/rag/embedding/dense/',
      '/rag/embedding/hybrid/',
    ]
  },
  {
    text: '向量存储(VectorStore)',
    collapsable: false,
    children: [
      '/rag/vectorStore/'
    ]
  }
]

export default ragSidebar