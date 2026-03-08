import{_ as a,c as s,b as t,o as p}from"./app-OaFy6Fsj.js";const e={};function o(c,n){return p(),s("div",null,[...n[0]||(n[0]=[t(`<h1 id="markdown" tabindex="-1"><a class="header-anchor" href="#markdown"><span>Markdown</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.markdown.UnstructuredMarkdownLoader.html" target="_blank" rel="noopener noreferrer">UnstructuredMarkdownLoader文档</a></p></div><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> UnstructuredMarkdownLoader</span>
<span class="line"></span>
<span class="line">data_loader <span class="token operator">=</span> UnstructuredMarkdownLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;./data/黑悟空/黑悟空版本介绍.md&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  mode<span class="token operator">=</span><span class="token string">&quot;elements&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  strategy<span class="token operator">=</span><span class="token string">&quot;fast&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> data_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> doc <span class="token keyword">in</span> documents<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;========文档内容========&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;element_id=</span><span class="token interpolation"><span class="token punctuation">{</span>doc<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;element_id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, parent_id=</span><span class="token interpolation"><span class="token punctuation">{</span>doc<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;parent_id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;&quot;&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>doc<span class="token punctuation">.</span>page_content<span class="token punctuation">}</span></span><span class="token string">&quot;&quot;&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">========文档内容========</span>
<span class="line">element_id=b89add9386b58a1638e0b96d19f08d0d, parent_id=None</span>
<span class="line">黑神话：悟空 🐵</span>
<span class="line">========文档内容========</span>
<span class="line">element_id=4d1fd58a257960aafb046fc47605c217, parent_id=b89add9386b58a1638e0b96d19f08d0d</span>
<span class="line">黑神话：悟空 是由中国游戏开发团队制作的一款备受瞩目的动作冒险游戏，以《西游记》为背景，重新演绎了经典故事，带来了极 </span>
<span class="line">具冲击力的视觉和游戏体验。</span>
<span class="line">========文档内容========</span>
<span class="line">element_id=2aecac605c643fd6e5877eb2943061d9, parent_id=b89add9386b58a1638e0b96d19f08d0d</span>
<span class="line">游戏版本介绍</span>
<span class="line">========文档内容========</span>
<span class="line">element_id=066222dfa5c88f6daf909cc9f97ddc30, parent_id=2aecac605c643fd6e5877eb2943061d9</span>
<span class="line">1. 数字标准版 💻</span>
<span class="line">========文档内容========</span>
<span class="line">element_id=871db441632d0e97daf97578eef69d48, parent_id=066222dfa5c88f6daf909cc9f97ddc30</span>
<span class="line">包含基础游戏</span>
<span class="line"></span></code></pre></div>`,5)])])}const i=a(e,[["render",o]]),r=JSON.parse('{"path":"/rag/loader/markdown/","title":"Markdown","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1772984204000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"e96529beef17e8a0c38964015556fbed0cbcbab0","time":1772984204000,"email":"why583440138@gmail.com","author":"wangtunan","message":"llm: Agent介绍"}]},"filePathRelative":"rag/loader/markdown/README.md"}');export{i as comp,r as data};
