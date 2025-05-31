import{_ as a,c as s,b as t,o as p}from"./app-OZJ_mqn6.js";const e={};function o(l,n){return p(),s("div",null,n[0]||(n[0]=[t(`<h1 id="简单文本导入" tabindex="-1"><a class="header-anchor" href="#简单文本导入"><span>简单文本导入</span></a></h1><h2 id="textloader" tabindex="-1"><a class="header-anchor" href="#textloader"><span>TextLoader</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.text.TextLoader.html" target="_blank" rel="noopener noreferrer">TextLoader文档</a></p></div><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> TextLoader</span>
<span class="line"></span>
<span class="line">text_loader <span class="token operator">=</span> TextLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;./data/黑悟空/设定.txt&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  encoding<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> text_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>documents<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[</span>
<span class="line">  Document(</span>
<span class="line">    metadata={&#39;source&#39;: &#39;./data/黑悟空/设定.txt&#39;},</span>
<span class="line">    page_content=&#39;《黑神话：悟空》的故事可分为六个章节，名为“火照黑云”、“风起黄昏”、“夜生白露”、“曲度紫鸳”、“日落红尘”和“未竟”，</span>
<span class="line">    并且拥有两个结局，玩家的选择和经历将影响最终的结局。\\n\\n每个章节结尾，附有二维 和三维的动画过场，</span>
<span class="line">    展示和探索《黑神话：悟空》中的叙事和主题元素。游戏的设定融合了中国的文化和自然地标。</span>
<span class="line">    例如重庆的大足石刻、山西省的小西天、南禅寺、铁佛寺、广胜寺和鹳雀楼等，都在游戏中出现。</span>
<span class="line">    游戏也融入了佛教和道教的哲学元素。&#39;</span>
<span class="line">  )</span>
<span class="line">]</span>
<span class="line"></span></code></pre></div><h2 id="directoryloader" tabindex="-1"><a class="header-anchor" href="#directoryloader"><span>DirectoryLoader</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.directory.DirectoryLoader.html" target="_blank" rel="noopener noreferrer">DirectoryLoader文档</a></p></div><p>可使用<code>DirectoryLoader</code>一次性加载某个目录下所有<code>txt</code>文件。</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> DirectoryLoader<span class="token punctuation">,</span> TextLoader</span>
<span class="line"></span>
<span class="line">markdown_loader <span class="token operator">=</span> DirectoryLoader<span class="token punctuation">(</span></span>
<span class="line">  path<span class="token operator">=</span><span class="token string">&quot;./data/黑悟空&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  glob<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;**/*.txt&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  loader_cls<span class="token operator">=</span><span class="token keyword">lambda</span> path<span class="token punctuation">:</span> TextLoader<span class="token punctuation">(</span>path<span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> markdown_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;文档数：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">len</span><span class="token punctuation">(</span>documents<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="unstructured" tabindex="-1"><a class="header-anchor" href="#unstructured"><span>Unstructured</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://docs.unstructured.io/open-source/introduction/quick-start" target="_blank" rel="noopener noreferrer">Unstructured 文档</a></p></div><p>如要在加载文档时有自定义要求，可使用<code>Unstructured</code>获取更多信息。</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> unstructured<span class="token punctuation">.</span>partition<span class="token punctuation">.</span>text <span class="token keyword">import</span> partition_text</span>
<span class="line"></span>
<span class="line">elements <span class="token operator">=</span> partition_text<span class="token punctuation">(</span></span>
<span class="line">  <span class="token string">&quot;./data/黑悟空/设定.txt&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> element <span class="token keyword">in</span> elements<span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;============================&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;文档内容: </span><span class="token interpolation"><span class="token punctuation">{</span>element<span class="token punctuation">.</span>text<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;元数据:&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  metadata_dict <span class="token operator">=</span> element<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>__dict__</span>
<span class="line">  <span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> metadata_dict<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">not</span> key<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span><span class="token string">&#39;_&#39;</span><span class="token punctuation">)</span> <span class="token keyword">and</span> value <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>  </span>
<span class="line">      <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;  </span><span class="token interpolation"><span class="token punctuation">{</span>key<span class="token punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token punctuation">{</span>value<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">============================</span>
<span class="line">文档内容: 《黑神话：悟空》的故事可分为六个章节，名为“火照黑云”、“风起黄昏”、“夜生白露”、“曲度紫鸳”、“日落红尘”和“未竟”，</span>
<span class="line">并且拥有两个结局，玩家的选择和经历将影响最终的结局。</span>
<span class="line">元数据:</span>
<span class="line">  last_modified: 2025-04-27T22:13:40</span>
<span class="line">  languages: [&#39;zho&#39;]</span>
<span class="line">  file_directory: ./data/黑悟空</span>
<span class="line">  filename: 设定.txt</span>
<span class="line">  filetype: text/plain</span>
<span class="line">============================</span>
<span class="line">文档内容: 每个章节结尾，附有二维和三维的动画过场，展示和探索《黑神话：悟空》中的叙事和主题元素。</span>
<span class="line">元数据:</span>
<span class="line">  last_modified: 2025-04-27T22:13:40</span>
<span class="line">  languages: [&#39;zho&#39;]</span>
<span class="line">  file_directory: ./data/黑悟空</span>
<span class="line">  filename: 设定.txt</span>
<span class="line">  filetype: text/plain</span>
<span class="line">============================</span>
<span class="line">文档内容: 游戏的设定融合了中国的文化和自然地标。例如重庆的大足石刻、山西省的小西天、南禅寺、铁佛寺、广胜寺和鹳雀楼等，</span>
<span class="line">都在游戏中出现。游戏也融入了佛教和道教的哲学元素。</span>
<span class="line">元数据:</span>
<span class="line">  last_modified: 2025-04-27T22:13:40</span>
<span class="line">  languages: [&#39;zho&#39;]</span>
<span class="line">  file_directory: ./data/黑悟空</span>
<span class="line">  filename: 设定.txt</span>
<span class="line">  filetype: text/plain</span>
<span class="line"></span></code></pre></div>`,16)]))}const i=a(e,[["render",o]]),r=JSON.parse('{"path":"/rag/loader/text/","title":"简单文本导入","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748667955000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"4cae81a7be7882437e8f42d6762dbb92aa7d76e8","time":1748667955000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档向量存储文章撰写"}]},"filePathRelative":"rag/loader/text/README.md"}');export{i as comp,r as data};
