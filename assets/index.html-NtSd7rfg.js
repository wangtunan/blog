import{_ as s,c as a,b as t,o as p}from"./app-BKxGWABj.js";const e={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="document类型" tabindex="-1"><a class="header-anchor" href="#document类型"><span>Document类型</span></a></h1><p><code>LangChain</code>中通过各种<code>loader</code>加载后的对象是<code>Document</code>类型，其包含<code>page_content</code>和<code>metadata</code>两个重要属性。</p><p>除了可以从<code>loader</code>加载，还可以手动构造<code>Document</code>对象数据，例如：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_core<span class="token punctuation">.</span>documents <span class="token keyword">import</span> Document</span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&quot;唐僧是师傅&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;source&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;师徒四人.txt&quot;</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&quot;悟空是大师兄&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;source&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;师徒四人.txt&quot;</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&quot;八戒是二师兄&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;source&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;师徒四人.txt&quot;</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&quot;沙僧是三师兄&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;source&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;师徒四人.txt&quot;</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&quot;白龙马是小师弟&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;source&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;师徒四人.txt&quot;</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>documents<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[</span>
<span class="line">  Document(metadata={&#39;source&#39;: &#39;师徒四人.txt&#39;}, page_content=&#39;唐僧是师傅&#39;),</span>
<span class="line">  Document(metadata={&#39;source&#39;: &#39;师徒四人.txt&#39;}, page_content=&#39;悟空是大师兄&#39;),</span>
<span class="line">  Document(metadata={&#39;source&#39;: &#39;师徒四人.txt&#39;}, page_content=&#39;八戒是二师兄&#39;),</span>
<span class="line">  Document(metadata={&#39;source&#39;: &#39;师徒四人.txt&#39;}, page_content=&#39;沙僧是三师兄&#39;),</span>
<span class="line">  Document(metadata={&#39;source&#39;: &#39;师徒四人.txt&#39;}, page_content=&#39;白龙马是小师弟&#39;)</span>
<span class="line">]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div>`,6)]))}const u=s(e,[["render",o]]),i=JSON.parse('{"path":"/rag/loader/document/","title":"Document类型","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748265568000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"52eefd799cbc72037e3928a0ff74fcbc4d121874","time":1748265568000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档Embedding文章撰写"}]},"filePathRelative":"rag/loader/document/README.md"}');export{u as comp,i as data};
