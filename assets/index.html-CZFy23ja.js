import{_ as s,c as a,b as p,o as t}from"./app-ug_sVrMA.js";const e={};function o(c,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="langgraph实现rag" tabindex="-1"><a class="header-anchor" href="#langgraph实现rag"><span>LangGraph实现RAG</span></a></h1><p>安装<code>langchain_community</code>包，并使用<code>loader</code>加载网页数据。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> WebBaseLoader</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加载网页数据</span></span>
<span class="line">web_data <span class="token operator">=</span> WebBaseLoader<span class="token punctuation">(</span></span>
<span class="line">  web_path<span class="token operator">=</span><span class="token string">&quot;https://zh.wikipedia.org/wiki/黑神话：悟空&quot;</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>web_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>安装<code>langchain_text_splitters</code>包，并使用分割器分割网页数据。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_text_splitters <span class="token keyword">import</span> RecursiveCharacterTextSplitter</span>
<span class="line">text_splitter <span class="token operator">=</span> RecursiveCharacterTextSplitter<span class="token punctuation">(</span></span>
<span class="line">  chunk_size<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span></span>
<span class="line">  chunk_overlap<span class="token operator">=</span><span class="token number">200</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line">text_split_data <span class="token operator">=</span> text_splitter<span class="token punctuation">.</span>split_documents<span class="token punctuation">(</span>web_data<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>text_split_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>安装<code>langchain-huggingface</code>，并设置<code>embedding</code>。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_huggingface <span class="token keyword">import</span> HuggingFaceEmbeddings</span>
<span class="line"></span>
<span class="line">embedding <span class="token operator">=</span> HuggingFaceEmbeddings<span class="token punctuation">(</span></span>
<span class="line">  model_name<span class="token operator">=</span><span class="token string">&quot;BAAI/bge-small-zh-v1.5&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>安装<code>langchain_core</code>，并设置向量存储。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_core<span class="token punctuation">.</span>vectorstores <span class="token keyword">import</span> InMemoryVectorStore</span>
<span class="line"></span>
<span class="line">vector_store <span class="token operator">=</span> InMemoryVectorStore<span class="token punctuation">(</span>embeddings<span class="token punctuation">)</span></span>
<span class="line">vector_store<span class="token punctuation">.</span>add_documents<span class="token punctuation">(</span>text_split_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>至此，网页数据已经向量化存入到我们的内存中。</p><p>接下来，需要安装<code>langgraph</code>：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ pip <span class="token function">install</span> langgraph</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>然后设置定义<code>State</code>、<code>Retriever</code>和<code>Generation</code>。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain <span class="token keyword">import</span> hub</span>
<span class="line"><span class="token keyword">from</span> typing_extensions <span class="token keyword">import</span> TypedDict</span>
<span class="line"><span class="token keyword">from</span> langchain_deepseek <span class="token keyword">import</span> ChatDeepSeek</span>
<span class="line"><span class="token keyword">from</span> langchain_core<span class="token punctuation">.</span>documents <span class="token keyword">import</span> Document</span>
<span class="line"><span class="token keyword">from</span> langgraph<span class="token punctuation">.</span>graph <span class="token keyword">import</span> START<span class="token punctuation">,</span> StateGraph</span>
<span class="line"><span class="token keyword">from</span> typing <span class="token keyword">import</span> List</span>
<span class="line"></span>
<span class="line"><span class="token comment"># prompt</span></span>
<span class="line">prompt <span class="token operator">=</span> hub<span class="token punctuation">.</span>pull<span class="token punctuation">(</span><span class="token string">&quot;rlm/rag-prompt&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">State</span><span class="token punctuation">(</span>TypedDict<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  question<span class="token punctuation">:</span> <span class="token builtin">str</span></span>
<span class="line">  context<span class="token punctuation">:</span> List<span class="token punctuation">[</span>Document<span class="token punctuation">]</span></span>
<span class="line">  answer<span class="token punctuation">:</span> <span class="token builtin">str</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># retrieve</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">retrieve</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> State<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  retriever_docs <span class="token operator">=</span> vector_store<span class="token punctuation">.</span>similarity_search<span class="token punctuation">(</span></span>
<span class="line">    query<span class="token operator">=</span>state<span class="token punctuation">[</span><span class="token string">&#39;question&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    k<span class="token operator">=</span><span class="token number">2</span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line">  retriever_content <span class="token operator">=</span> <span class="token string">&quot;\\n\\n&quot;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>doc<span class="token punctuation">.</span>page_content <span class="token keyword">for</span> doc <span class="token keyword">in</span> retriever_docs<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token string">&quot;context&quot;</span><span class="token punctuation">:</span> retriever_content <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># generate</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">generate</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> State<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  llm <span class="token operator">=</span> ChatDeepSeek<span class="token punctuation">(</span></span>
<span class="line">    model<span class="token operator">=</span><span class="token string">&quot;deepseek-chat&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    api_key<span class="token operator">=</span>api_key<span class="token punctuation">,</span></span>
<span class="line">    temperature<span class="token operator">=</span><span class="token number">0.5</span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line">  query <span class="token operator">=</span> prompt<span class="token punctuation">.</span>invoke<span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;question&quot;</span><span class="token punctuation">:</span> state<span class="token punctuation">[</span><span class="token string">&#39;question&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;context&quot;</span><span class="token punctuation">:</span> state<span class="token punctuation">[</span><span class="token string">&#39;context&#39;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  response <span class="token operator">=</span> llm<span class="token punctuation">.</span>invoke<span class="token punctuation">(</span></span>
<span class="line">    <span class="token builtin">input</span><span class="token operator">=</span>query</span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token string">&quot;answer&quot;</span><span class="token punctuation">:</span> response<span class="token punctuation">.</span>content <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>最后定义<code>Graph</code>并调用大模型<code>API</code>得到结果：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">graph <span class="token operator">=</span> <span class="token punctuation">(</span></span>
<span class="line">  StateGraph<span class="token punctuation">(</span>State<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">.</span>add_sequence<span class="token punctuation">(</span><span class="token punctuation">[</span>retrieve<span class="token punctuation">,</span> generate<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span>START<span class="token punctuation">,</span> <span class="token string">&#39;retrieve&#39;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">question<span class="token operator">=</span><span class="token string">&quot;黑神话是什么公司开发的，什么类型的游戏，什么时间发布？&quot;</span></span>
<span class="line">response_content <span class="token operator">=</span> graph<span class="token punctuation">.</span>invoke<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&quot;question&quot;</span><span class="token punctuation">:</span> question <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>response_content<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;answer&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>最后回答：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">《黑神话：悟空》是由游戏科学开发的动作角色扮演游戏，于2024年8月20日发布。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div>`,18)]))}const i=s(e,[["render",o]]),u=JSON.parse('{"path":"/rag/basic/langgraph/","title":"LangGraph实现RAG","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748271331000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"74c8bf57080593fba5e75b94a6f446cf86a12560","time":1748271331000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档向量文章撰写"}]},"filePathRelative":"rag/basic/langgraph/README.md"}');export{i as comp,u as data};
