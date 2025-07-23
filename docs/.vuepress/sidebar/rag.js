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
      '/rag/vectorStore/',
      '/rag/vectorStore/chroma/',
      '/rag/vectorStore/milvus/'
    ]
  },
  {
    text: '索引前处理(PreRetrieval)',
    collapsable: false,
    children: [
      '/rag/preRetrieval/',
      '/rag/preRetrieval/text2SQL/',
      '/rag/preRetrieval/text2Cypher/',
      '/rag/preRetrieval/metadataFilter/'
    ]
  },
  {
    text: '索引优化(Indexing)',
    collapsable: false,
    children: [
      '/rag/indexing/'
    ]
  },
  {
    text: '索引后处理(PostRetrieval)',
    collapsable: false,
    children: [
      '/rag/postRetrieval/'
    ]
  },
  {
    text: '评估RAG体系(Evaluation)',
    collapsable: false,
    children: [
      '/rag/evaluation/'
    ]
  },
]

export default ragSidebar