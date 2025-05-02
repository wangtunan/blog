import{_ as s,c as a,b as p,o as e}from"./app-BAxTuE_T.js";const t={};function l(o,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="json" tabindex="-1"><a class="header-anchor" href="#json"><span>JSON</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.json_loader.JSONLoader.html" target="_blank" rel="noopener noreferrer">JSON Loader文档</a></p></div><p><code>JSON</code>格式的数据也可以使用<code>TextLoader</code>来加载，但与<code>JSONLoader</code>相比，它有以下两大缺点：</p><ul><li>加载出来的只是纯文本，不包含格式。</li><li>只能加载全部内容，不能指定某个字段。</li></ul><details><summary>原始JSON内容：</summary><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;gameTitle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;西游记&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;basicInfo&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;engine&quot;</span><span class="token operator">:</span> <span class="token string">&quot;虚幻引擎5&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;releaseDate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2024-08-20&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;genre&quot;</span><span class="token operator">:</span> <span class="token string">&quot;动作角色扮演&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;platforms&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;PC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;PS5&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;Xbox Series X/S&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;supportedLanguages&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;简体中文&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;繁体中文&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;英语&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;日语&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;韩语&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;mainCharacter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;孙悟空&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;backstory&quot;</span><span class="token operator">:</span> <span class="token string">&quot;混沌初开之时，盘古开天辟地，天地灵气凝结成仙石，其中孕育出一只石猴。这只石猴拜师菩提老祖，修得一身本领，后被赐名孙悟空。&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;abilities&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;七十二变&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;筋斗云&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;火眼金睛&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;金刚不坏之身&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;weapons&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;如意金箍棒&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;法器&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;神通符咒&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;combatStyle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;基于变身系统的高速格斗，结合中国传统神话元素的技能组合&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;supportCharacters&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;白龙马&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;identity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;八部天龙之一&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;background&quot;</span><span class="token operator">:</span> <span class="token string">&quot;原为西海龙王三太子敖烈，因冒犯天条被贬为马，后随唐僧西行取经，成为孙悟空的伙伴&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;abilities&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;水遁&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;腾云驾雾&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;变化&quot;</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;红孩儿&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;identity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;圣婴大王&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;background&quot;</span><span class="token operator">:</span> <span class="token string">&quot;牛魔王与铁扇公主之子，修炼火焰三昧，掌握三昧真火&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;abilities&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;三昧真火&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;火眼&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;战斗形态&quot;</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;六耳猕猴&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;identity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;孙悟空分身&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;background&quot;</span><span class="token operator">:</span> <span class="token string">&quot;天地间与美猴王最像的存在，有着与孙悟空相似的能力&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;abilities&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;七十二变&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;法术&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;分身术&quot;</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;gameFeatures&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;worldSetting&quot;</span><span class="token operator">:</span> <span class="token string">&quot;基于西游记神话背景，融合虚构的玄幻世界&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;combatSystem&quot;</span><span class="token operator">:</span> <span class="token string">&quot;独特的变身战斗系统，结合高难度动作玩法&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;progression&quot;</span><span class="token operator">:</span> <span class="token string">&quot;技能树发展系统，解锁新的战斗技能和变身形态&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;exploration&quot;</span><span class="token operator">:</span> <span class="token string">&quot;开放式地图探索，丰富的支线任务和隐藏剧情&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;graphics&quot;</span><span class="token operator">:</span> <span class="token string">&quot;采用虚幻引擎5, 实现高质量画面表现和实时光线追踪&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="使用textloader加载" tabindex="-1"><a class="header-anchor" href="#使用textloader加载"><span>使用TextLoader加载</span></a></h2><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> TextLoader</span>
<span class="line"></span>
<span class="line">text_loader <span class="token operator">=</span> TextLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;./data/灭神纪/人物角色.json&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  encoding<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> text_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>documents<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用jsonloader加载对象字段" tabindex="-1"><a class="header-anchor" href="#使用jsonloader加载对象字段"><span>使用JSONLoader加载对象字段</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>安装依赖包<code>pip install jq</code></p></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">import</span> json</span>
<span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> TextLoader<span class="token punctuation">,</span> JSONLoader</span>
<span class="line"></span>
<span class="line">json_loader <span class="token operator">=</span> JSONLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;./data/灭神纪/人物角色.json&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  jq_schema<span class="token operator">=</span><span class="token string">&#39;.mainCharacter | &quot;姓名：&quot; + .name + &quot;，背景：&quot; + .backstory&#39;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> json_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>documents<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">[</span>
<span class="line">  Document(</span>
<span class="line">    metadata={</span>
<span class="line">      &#39;source&#39;: &#39;./data/灭神纪/人物角色.json&#39;,</span>
<span class="line">      &#39;seq_num&#39;: 1</span>
<span class="line">    },</span>
<span class="line">    page_content=&#39;姓名：孙悟空，背景：混沌初开之时，盘古开天辟地，天地灵气凝结成仙石，其中孕育出一只石猴。</span>
<span class="line">    这只石 猴拜师菩提老祖，修得一身本领，后被赐名孙悟空。&#39;</span>
<span class="line">  )</span>
<span class="line">]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用jsonloader加载数组字段" tabindex="-1"><a class="header-anchor" href="#使用jsonloader加载数组字段"><span>使用JSONLoader加载数组字段</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>安装依赖包<code>pip install jq</code></p></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> JSONLoader</span>
<span class="line"></span>
<span class="line">support_loader <span class="token operator">=</span> JSONLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;./data/灭神纪/人物角色.json&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  jq_schema<span class="token operator">=</span><span class="token string">&#39;.supportCharacters[] | &quot;姓名：&quot; + .name + &quot;, 背景：&quot; + .background&#39;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">support_loader <span class="token operator">=</span> support_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>support_loader<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token punctuation">[</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;source&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;./data/灭神纪/人物角色.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;seq_num&#39;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&#39;姓名：白龙马, 背景：原为西海龙王三太子敖烈，因冒犯天条被贬为马，后随唐僧西行取经，成为孙悟空的 伙伴&#39;</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;source&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;./data/灭神纪/人物角色.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;seq_num&#39;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> </span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&#39;姓名：红孩儿, 背景：牛魔王与铁扇公主之子，修炼火焰三昧，掌握三昧真火&#39;</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  Document<span class="token punctuation">(</span></span>
<span class="line">    metadata<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;source&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;./data/灭神纪/人物角色.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;seq_num&#39;</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    page_content<span class="token operator">=</span><span class="token string">&#39;姓名：六耳猕猴, 背景：天地间与美猴王最像的存在，有着与孙悟空相似的能力&#39;</span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17)]))}const c=s(t,[["render",l]]),u=JSON.parse('{"path":"/rag/loader/json/","title":"JSON","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1746159668000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"bfa856f67384f9df0246c2a3e5f7475dc35c94eb","time":1746159668000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档导入文章撰写"}]},"filePathRelative":"rag/loader/json/README.md"}');export{c as comp,u as data};
