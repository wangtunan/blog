// RAG目录结构
const ragSidebar = [
  {
    text: 'RAG基础',
    collapsable: false,
    children: [
      '/rag/base/',
      '/rag/base/concept/'
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
      '/rag/loader/markdown/'
    ]
  }
]

export default ragSidebar