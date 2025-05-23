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
    text: 'RAG数据导入',
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
    text: 'RAG文本切块',
    collapsable: false,
    children: [
      '/rag/chunking/',
      '/rag/chunking/methods/'
    ]
  },
  {
    text: 'RAG向量嵌入',
    collapsable: false,
    children: [
      '/rag/embedding/',
      '/rag/embedding/similarity/'
    ]
  }
]

export default ragSidebar