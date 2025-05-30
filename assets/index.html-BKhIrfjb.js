import{_ as s,c as a,b as e,o as p}from"./app-CTs8QVok.js";const t={};function l(o,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="前置准备" tabindex="-1"><a class="header-anchor" href="#前置准备"><span>前置准备</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>所有跟llm请求相关的，默认都基于DeepSeek</p></div><p>首先定义环境变量文件<code>.env</code>，其代码如下：</p><div class="language-env line-numbers-mode" data-highlighter="prismjs" data-ext="env"><pre><code class="language-env"><span class="line"># DeepSeek api key</span>
<span class="line">DEEPSEEK_API_KEY = &#39;your api key&#39;</span>
<span class="line"></span>
<span class="line"># DeepSeek endpoint</span>
<span class="line">DEEPSEEK_API_BASE = &#39;https://api.deepseek.com/v1&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>然后安装一个依赖包：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ pip <span class="token function">install</span> dotenv</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>接着定义两个文件<code>env_tools.py</code>和<code>chain.py</code>，其代码分别是：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># env_tools.py</span></span>
<span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">from</span> dotenv <span class="token keyword">import</span> load_dotenv<span class="token punctuation">,</span> find_dotenv</span>
<span class="line"></span>
<span class="line">load_dotenv<span class="token punctuation">(</span>find_dotenv<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">get_api_key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">return</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">&#39;DEEPSEEK_API_KEY&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">get_api_base</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">return</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">&#39;DEEPSEEK_API_BASE&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># chain.py</span></span>
<span class="line"><span class="token keyword">from</span> env_tools <span class="token keyword">import</span> get_api_key<span class="token punctuation">,</span> get_api_base</span>
<span class="line"></span>
<span class="line">api_key <span class="token operator">=</span> get_api_key<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">api_base <span class="token operator">=</span> get_api_base<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>api_key<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>api_base<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div>`,9)]))}const i=s(t,[["render",l]]),r=JSON.parse('{"path":"/rag/basic/prepare/","title":"前置准备","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748623235000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"650cd2b9f76950464baaa8c7ae78e1777342b6ca","time":1748623235000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档向量存储文章撰写"}]},"filePathRelative":"rag/basic/prepare/README.md"}');export{i as comp,r as data};
