import{_ as s,c as a,b as e,o as p}from"./app-D8JxhRFz.js";const t={};function i(l,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="langchain实现rag" tabindex="-1"><a class="header-anchor" href="#langchain实现rag"><span>LangChain实现RAG</span></a></h1><p>安装<code>langchain_community</code>包，并使用<code>loader</code>加载网页数据。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> WebBaseLoader</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加载网页数据</span></span>
<span class="line">web_data <span class="token operator">=</span> WebBaseLoader<span class="token punctuation">(</span></span>
<span class="line">  web_path<span class="token operator">=</span><span class="token string">&quot;https://zh.wikipedia.org/wiki/黑神话：悟空&quot;</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>web_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装<code>langchain_text_splitters</code>包，并使用分割器分割网页数据。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">from</span> langchain_text_splitters <span class="token keyword">import</span> RecursiveCharacterTextSplitter</span>
<span class="line">text_splitter <span class="token operator">=</span> RecursiveCharacterTextSplitter<span class="token punctuation">(</span></span>
<span class="line">  chunk_size<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span></span>
<span class="line">  chunk_overlap<span class="token operator">=</span><span class="token number">200</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line">text_split_data <span class="token operator">=</span> text_splitter<span class="token punctuation">.</span>split_documents<span class="token punctuation">(</span>web_data<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>text_split_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装<code>langchain-huggingface</code>，并设置<code>embedding</code>。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">from</span> langchain_huggingface <span class="token keyword">import</span> HuggingFaceEmbeddings</span>
<span class="line"></span>
<span class="line">embedding <span class="token operator">=</span> HuggingFaceEmbeddings<span class="token punctuation">(</span></span>
<span class="line">  model_name<span class="token operator">=</span><span class="token string">&quot;BAAI/bge-small-zh-v1.5&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装<code>langchain_core</code>，并设置向量存储。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">from</span> langchain_core<span class="token punctuation">.</span>vectorstores <span class="token keyword">import</span> InMemoryVectorStore</span>
<span class="line"></span>
<span class="line">vector_store <span class="token operator">=</span> InMemoryVectorStore<span class="token punctuation">(</span>embeddings<span class="token punctuation">)</span></span>
<span class="line">vector_store<span class="token punctuation">.</span>add_documents<span class="token punctuation">(</span>text_split_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，网页数据已经向量化存入到我们的内存中。</p><p>存入内存以后，需要做检索相关的工作。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token comment"># retriever</span></span>
<span class="line">question <span class="token operator">=</span> <span class="token string">&quot;黑神话是哪家公司开发的，是什么类型的游戏，什么时间发布的？&quot;</span></span>
<span class="line">retriever_docs <span class="token operator">=</span> vector_store<span class="token punctuation">.</span>similarity_search<span class="token punctuation">(</span></span>
<span class="line">  query<span class="token operator">=</span>question<span class="token punctuation">,</span></span>
<span class="line">  k<span class="token operator">=</span><span class="token number">2</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line">retriever_content <span class="token operator">=</span> <span class="token string">&quot;\\n\\n&quot;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>doc<span class="token punctuation">.</span>page_content <span class="token keyword">for</span> doc <span class="token keyword">in</span> retriever_docs<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>retriever_content<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向量存储检索完毕后，接下来要准备检索内容放置到提示词中。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token comment"># prompt</span></span>
<span class="line"><span class="token keyword">from</span> langchain_core<span class="token punctuation">.</span>prompts <span class="token keyword">import</span> ChatPromptTemplate</span>
<span class="line"></span>
<span class="line">prompt <span class="token operator">=</span> ChatPromptTemplate<span class="token punctuation">.</span>from_template<span class="token punctuation">(</span><span class="token triple-quoted-string string">&quot;&quot;&quot;</span>
<span class="line">  请你依据上下文来回答问题\\n</span>
<span class="line">  如果上下文中没有，你直接回答&quot;抱歉，我无法从上下文中提供相关信息。&quot;</span>
<span class="line">  上下文：{context}</span>
<span class="line">  问题：{question}</span>
<span class="line">  回答：</span>
<span class="line">&quot;&quot;&quot;</span><span class="token punctuation">)</span></span>
<span class="line">query <span class="token operator">=</span> prompt<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span></span>
<span class="line">  context<span class="token operator">=</span>retriever_content<span class="token punctuation">,</span></span>
<span class="line">  question<span class="token operator">=</span>question</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，安装<code>langchain_deepseek</code>，并调用大模型<code>api</code>得到结果。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line">llm <span class="token operator">=</span> ChatDeepSeek<span class="token punctuation">(</span></span>
<span class="line">  model<span class="token operator">=</span><span class="token string">&quot;deepseek-chat&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  api_key<span class="token operator">=</span>api_key<span class="token punctuation">,</span></span>
<span class="line">  temperature<span class="token operator">=</span><span class="token number">0.5</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line">response <span class="token operator">=</span> llm<span class="token punctuation">.</span>invoke<span class="token punctuation">(</span></span>
<span class="line">  <span class="token builtin">input</span><span class="token operator">=</span>query</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>content<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后回答：</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code><span class="line"><span class="token list punctuation">1.</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">开发公司</span><span class="token punctuation">**</span></span>：游戏科学（Game Science）  </span>
<span class="line"><span class="token list punctuation">2.</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">游戏类型</span><span class="token punctuation">**</span></span>：动作角色扮演（ARPG）  </span>
<span class="line"><span class="token list punctuation">3.</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">发布时间</span><span class="token punctuation">**</span></span>：  </span>
<span class="line">   <span class="token list punctuation">-</span> Microsoft Windows 和 PlayStation 5 平台：<span class="token bold"><span class="token punctuation">**</span><span class="token content">2024年8月20日</span><span class="token punctuation">**</span></span>  </span>
<span class="line">   <span class="token list punctuation">-</span> Xbox Series X/S 版：<span class="token bold"><span class="token punctuation">**</span><span class="token content">待定</span><span class="token punctuation">**</span></span>（暂未发售）  </span>
<span class="line"></span>
<span class="line">其他补充：  </span>
<span class="line"><span class="token list punctuation">-</span> 中国新华社称其为“中国首款3A游戏”，改编自《西游记》。  </span>
<span class="line"><span class="token list punctuation">-</span> 首发3天销量破1000万份，一个月内销量超2000万份。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18)]))}const o=s(t,[["render",i]]),r=JSON.parse('{"path":"/rag/basic/langchain/","title":"LangChain实现RAG","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1747844258000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"a61499cf26228ec9a46000daf509a076ba0f295f","time":1747844258000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档分块文章撰写"}]},"filePathRelative":"rag/basic/langchain/README.md"}');export{o as comp,r as data};
