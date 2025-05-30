import{_ as s,c as a,b as p,o as t}from"./app-CTs8QVok.js";const e={};function l(c,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="分块方法" tabindex="-1"><a class="header-anchor" href="#分块方法"><span>分块方法</span></a></h1><h2 id="固定字符数分块" tabindex="-1"><a class="header-anchor" href="#固定字符数分块"><span>固定字符数分块</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://python.langchain.com/api_reference/text_splitters/character/langchain_text_splitters.character.CharacterTextSplitter.html" target="_blank" rel="noopener noreferrer">CharacterTextSplitter 文档</a></p></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> TextLoader</span>
<span class="line"><span class="token keyword">from</span> langchain_text_splitters <span class="token keyword">import</span> CharacterTextSplitter</span>
<span class="line"></span>
<span class="line">data_loader <span class="token operator">=</span> TextLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;data/山西文旅/云冈石窟.txt&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  encoding<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> data_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">splitter <span class="token operator">=</span> CharacterTextSplitter<span class="token punctuation">(</span></span>
<span class="line">  chunk_size<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token comment"># 每个chunk的大小</span></span>
<span class="line">  chunk_overlap<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token comment"># 每个chunk的overlap</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">chunks <span class="token operator">=</span> splitter<span class="token punctuation">.</span>split_documents<span class="token punctuation">(</span>documents<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n========= 文档分块结果 =========&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">for</span> chunk <span class="token keyword">in</span> chunks<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;内容: </span><span class="token interpolation"><span class="token punctuation">{</span>chunk<span class="token punctuation">.</span>page_content<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">文档分块数量: 9</span>
<span class="line"></span>
<span class="line">========= 文档分块结果 =========</span>
<span class="line">内容: 云冈石窟</span>
<span class="line">云冈石窟位于中国北部山西省大同市西郊17公里处的武周山南麓，石窟依山开凿，东西绵延1公里。存有主要洞窟45个，大小窟龛252个，石雕造像51000余 </span>
<span class="line">躯，为中国规模最大的古代石窟群之一，与敦煌莫高窟、洛阳龙门石窟和天水麦积山石窟并称为中国四大石窟艺术宝库。 1961年被国务院公布为全国首批 </span>
<span class="line">重点文物保护单位，2001年12月14日被联合国教科文组织列入世界遗产名录，2007年5月8日被国家旅游局评为首批国家5A级旅游景区。</span>
<span class="line">==================================================</span>
<span class="line">内容: 云冈五华洞</span>
<span class="line">位于云冈石窟中部的第 9——13窟。这五窟因清代施泥彩绘云冈石窟景观而得名。五华洞雕饰绮丽，丰富多彩，是研究北魏历史、艺术、音乐、舞蹈、书法和</span>
<span class="line">建筑的珍贵资料，为云冈石窟群的重要组成部分。</span>
<span class="line">==================================================</span>
<span class="line">内容: 塔洞</span>
<span class="line">云冈东部窟群，指云冈石窟东端1——4，均为塔洞。第1、2窟为同期开的一组，凿于孝文帝迁洛前，窟内中央雕造方形塔柱，四面开龛造像。</span>
<span class="line">第一窟主像是弥勒，塔南面下层雕释迦多宝像，上层雕释迦像。浮雕五层小塔，是研究北魏建筑的形象资料。</span>
<span class="line">第二窟是释迦像，塔南面下层雕释迦多宝像，上层雕三世佛。</span>
<span class="line">两窟南壁窟门两侧都雕有维摩、文殊。第三窟为云冈石窟中规模最大的洞窟，前立壁高约25米，传为昙曜译经楼。</span>
<span class="line">==================================================</span>
<span class="line">内容: 武州山</span>
<span class="line">武周山，亦名武州山，在大同城西山中。宋《太平寰宇记》引《冀州图》云：“武周山在郡西北，东西数百里，南北五十里。山之南面，千仞壁立。”云冈石</span>
<span class="line">窟即因武周山南缘斩山开凿。</span>
<span class="line">==================================================</span>
<span class="line">内容: 昙曜五窟</span>
<span class="line">第十六至二十窟，是云冈石窟最早开业凿的五个洞窟，通称“昙曜五窟。”十六窟为平面呈椭圆形。</span>
<span class="line">正中主像释迦像，高13.5米，立于莲花座上，周壁雕有千佛和佛龛。第11窟第十七窟，主像是三世佛，正中为交弥勒坐像，高15.6米。</span>
<span class="line">东、西两壁各雕龛，东为坐像，西为立像。</span>
<span class="line">明窗东侧的北魏太和十三年(公元489年)佛龛，是以后补刻的。</span>
<span class="line">景点地址云冈石窟位于中国北部山西省大同市西郊17公里处的武周山南麓</span>
<span class="line">==================================================</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><h2 id="递归分块" tabindex="-1"><a class="header-anchor" href="#递归分块"><span>递归分块</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://python.langchain.com/api_reference/text_splitters/character/langchain_text_splitters.character.RecursiveCharacterTextSplitter.html" target="_blank" rel="noopener noreferrer">RecursiveCharacterTextSplitter 文档</a></p></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_community<span class="token punctuation">.</span>document_loaders <span class="token keyword">import</span> TextLoader</span>
<span class="line"><span class="token keyword">from</span> langchain_text_splitters <span class="token keyword">import</span> RecursiveCharacterTextSplitter</span>
<span class="line"></span>
<span class="line">data_loader <span class="token operator">=</span> TextLoader<span class="token punctuation">(</span></span>
<span class="line">  file_path<span class="token operator">=</span><span class="token string">&quot;data/山西文旅/云冈石窟.txt&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  encoding<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">documents <span class="token operator">=</span> data_loader<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 定义分割符列表，按优先级依次使用</span></span>
<span class="line">separators <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;\\n\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;，&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">splitter <span class="token operator">=</span> RecursiveCharacterTextSplitter<span class="token punctuation">(</span></span>
<span class="line">  chunk_size<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">,</span></span>
<span class="line">  chunk_overlap<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span></span>
<span class="line">  separators<span class="token operator">=</span>separators</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">chunks <span class="token operator">=</span> splitter<span class="token punctuation">.</span>split_documents<span class="token punctuation">(</span>documents<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;文档分块数量: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">len</span><span class="token punctuation">(</span>chunks<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n========= 文档分块结果 =========&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">for</span> chunk <span class="token keyword">in</span> chunks<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;内容: </span><span class="token interpolation"><span class="token punctuation">{</span>chunk<span class="token punctuation">.</span>page_content<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">文档分块数量: 12</span>
<span class="line"></span>
<span class="line">========= 文档分块结果 =========</span>
<span class="line">内容: 云冈石窟</span>
<span class="line">云冈石窟位于中国北部山西省大同市西郊17公里处的武周山南麓，石窟依山开凿，东西绵延1公里。</span>
<span class="line">存有主要洞窟45个，大小窟龛252个，石雕造像51000余 躯，为中国规模最大的古代石窟群之一，</span>
<span class="line">与敦煌莫高窟、洛阳龙门石窟和天水麦积山石窟并称为中国四大石窟艺术宝库。 </span>
<span class="line">1961年被国务院公布为全国首批 重点文物保护单位，2001年12月14日被联合国教科文组织列入世界遗产名录</span>
<span class="line">==================================================</span>
<span class="line">内容: ，2007年5月8日被国家旅游局评为首批国家5A级旅游景区。</span>
<span class="line">==================================================</span>
<span class="line">内容: 云冈五华洞</span>
<span class="line">位于云冈石窟中部的第 9——13窟。这五窟因清代施泥彩绘云冈石窟景观而得名。五华洞雕饰绮丽，丰富多彩，</span>
<span class="line">是研究北魏历史、艺术、音乐、舞蹈、书法和建筑的珍贵资料，为云冈石窟群的重要组成部分。</span>
<span class="line">==================================================</span>
<span class="line">内容: 塔洞</span>
<span class="line">云冈东部窟群，指云冈石窟东端1——4，均为塔洞。第1、2窟为同期开的一组，凿于孝文帝迁洛前，窟内中央雕造方形塔柱，四面开龛造像。</span>
<span class="line">第一窟主像是弥勒，塔南面下层雕释迦多宝像，上层雕释迦像。</span>
<span class="line">浮雕五层小塔，是研究北魏建筑的形象资料。</span>
<span class="line">第二窟是释迦像，塔南面下层雕释迦多宝像，上层雕三世佛。两窟南壁窟门两侧都雕有维摩、文殊。</span>
<span class="line">第三窟为云冈石窟中规模最大的洞窟，前立壁高约25米，传为昙曜译经楼。</span>
<span class="line">==================================================</span>
<span class="line">内容: 武州山</span>
<span class="line">武周山，亦名武州山，在大同城西山中。宋《太平寰宇记》引《冀州图》云：“武周山在郡西北，东西数百里，南北五十里。</span>
<span class="line">山之南面，千仞壁立。”云冈石窟即因武周山南缘斩山开凿。</span>
<span class="line">==================================================</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><h2 id="为代码分块" tabindex="-1"><a class="header-anchor" href="#为代码分块"><span>为代码分块</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>langchain_text_splitters</code>中已内置了一些语言的分隔符号。</p></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> langchain_text_splitters <span class="token keyword">import</span> Language<span class="token punctuation">,</span> RecursiveCharacterTextSplitter</span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>RecursiveCharacterTextSplitter<span class="token punctuation">.</span>get_separators_for_language<span class="token punctuation">(</span>Language<span class="token punctuation">.</span>PYTHON<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>RecursiveCharacterTextSplitter<span class="token punctuation">.</span>get_separators_for_language<span class="token punctuation">(</span>Language<span class="token punctuation">.</span>JS<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><details><summary>原始代码块：</summary><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">class</span> <span class="token class-name">CombatSystem</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">      self<span class="token punctuation">.</span>health <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">      self<span class="token punctuation">.</span>stamina <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">      self<span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;IDLE&quot;</span></span>
<span class="line">      self<span class="token punctuation">.</span>attack_patterns <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token string">&quot;NORMAL&quot;</span><span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;SPECIAL&quot;</span><span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;ULTIMATE&quot;</span><span class="token punctuation">:</span> <span class="token number">50</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> delta_time<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">      self<span class="token punctuation">.</span>_update_stats<span class="token punctuation">(</span>delta_time<span class="token punctuation">)</span></span>
<span class="line">      self<span class="token punctuation">.</span>_handle_combat<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">_update_stats</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> delta_time<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">      self<span class="token punctuation">.</span>stamina <span class="token operator">=</span> <span class="token builtin">min</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>stamina <span class="token operator">+</span> <span class="token number">5</span> <span class="token operator">*</span> delta_time<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">_handle_combat</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token keyword">if</span> self<span class="token punctuation">.</span>state <span class="token operator">==</span> <span class="token string">&quot;ATTACKING&quot;</span><span class="token punctuation">:</span></span>
<span class="line">          self<span class="token punctuation">.</span>_execute_attack<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">_execute_attack</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token keyword">if</span> self<span class="token punctuation">.</span>stamina <span class="token operator">&gt;=</span> self<span class="token punctuation">.</span>attack_patterns<span class="token punctuation">[</span><span class="token string">&quot;SPECIAL&quot;</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">          damage <span class="token operator">=</span> <span class="token number">50</span></span>
<span class="line">          self<span class="token punctuation">.</span>stamina <span class="token operator">-=</span> self<span class="token punctuation">.</span>attack_patterns<span class="token punctuation">[</span><span class="token string">&quot;SPECIAL&quot;</span><span class="token punctuation">]</span></span>
<span class="line">          <span class="token keyword">return</span> damage</span>
<span class="line">      <span class="token keyword">return</span> self<span class="token punctuation">.</span>attack_patterns<span class="token punctuation">[</span><span class="token string">&quot;NORMAL&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">InventorySystem</span><span class="token punctuation">:</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       self<span class="token punctuation">.</span>items <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">       self<span class="token punctuation">.</span>capacity <span class="token operator">=</span> <span class="token number">20</span></span>
<span class="line">       self<span class="token punctuation">.</span>gold <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">add_item</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item_id<span class="token punctuation">,</span> quantity<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>items<span class="token punctuation">)</span> <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>capacity<span class="token punctuation">:</span></span>
<span class="line">           <span class="token keyword">if</span> item_id <span class="token keyword">in</span> self<span class="token punctuation">.</span>items<span class="token punctuation">:</span></span>
<span class="line">               self<span class="token punctuation">.</span>items<span class="token punctuation">[</span>item_id<span class="token punctuation">]</span> <span class="token operator">+=</span> quantity</span>
<span class="line">           <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">               self<span class="token punctuation">.</span>items<span class="token punctuation">[</span>item_id<span class="token punctuation">]</span> <span class="token operator">=</span> quantity</span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">remove_item</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item_id<span class="token punctuation">,</span> quantity<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">if</span> item_id <span class="token keyword">in</span> self<span class="token punctuation">.</span>items<span class="token punctuation">:</span></span>
<span class="line">           self<span class="token punctuation">.</span>items<span class="token punctuation">[</span>item_id<span class="token punctuation">]</span> <span class="token operator">-=</span> quantity</span>
<span class="line">           <span class="token keyword">if</span> self<span class="token punctuation">.</span>items<span class="token punctuation">[</span>item_id<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">               <span class="token keyword">del</span> self<span class="token punctuation">.</span>items<span class="token punctuation">[</span>item_id<span class="token punctuation">]</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">get_item_count</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item_id<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">return</span> self<span class="token punctuation">.</span>items<span class="token punctuation">.</span>get<span class="token punctuation">(</span>item_id<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">QuestSystem</span><span class="token punctuation">:</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       self<span class="token punctuation">.</span>active_quests <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">       self<span class="token punctuation">.</span>completed_quests <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">       self<span class="token punctuation">.</span>quest_log <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">add_quest</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> quest_id<span class="token punctuation">,</span> quest_data<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">if</span> quest_id <span class="token keyword">not</span> <span class="token keyword">in</span> self<span class="token punctuation">.</span>active_quests<span class="token punctuation">:</span></span>
<span class="line">           self<span class="token punctuation">.</span>active_quests<span class="token punctuation">[</span>quest_id<span class="token punctuation">]</span> <span class="token operator">=</span> quest_data</span>
<span class="line">           self<span class="token punctuation">.</span>quest_log<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Started quest: </span><span class="token interpolation"><span class="token punctuation">{</span>quest_data<span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">complete_quest</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> quest_id<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">if</span> quest_id <span class="token keyword">in</span> self<span class="token punctuation">.</span>active_quests<span class="token punctuation">:</span></span>
<span class="line">           self<span class="token punctuation">.</span>completed_quests<span class="token punctuation">.</span>add<span class="token punctuation">(</span>quest_id<span class="token punctuation">)</span></span>
<span class="line">           <span class="token keyword">del</span> self<span class="token punctuation">.</span>active_quests<span class="token punctuation">[</span>quest_id<span class="token punctuation">]</span></span>
<span class="line">   <span class="token keyword">def</span> <span class="token function">get_active_quests</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token builtin">list</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>active_quests<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div></details><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token keyword">from</span> langchain_text_splitters <span class="token keyword">import</span> Language<span class="token punctuation">,</span> RecursiveCharacterTextSplitter</span>
<span class="line"></span>
<span class="line">splitter <span class="token operator">=</span> RecursiveCharacterTextSplitter<span class="token punctuation">.</span>from_language<span class="token punctuation">(</span></span>
<span class="line">  language<span class="token operator">=</span>Language<span class="token punctuation">.</span>PYTHON<span class="token punctuation">,</span></span>
<span class="line">  chunk_size<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span></span>
<span class="line">  chunk_overlap<span class="token operator">=</span><span class="token number">0</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">chunks <span class="token operator">=</span> splitter<span class="token punctuation">.</span>create_documents<span class="token punctuation">(</span><span class="token punctuation">[</span>code<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;文档分块数量: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">len</span><span class="token punctuation">(</span>chunks<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n========= 文档分块结果 =========&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">for</span> chunk <span class="token keyword">in</span> chunks<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;内容: </span><span class="token interpolation"><span class="token punctuation">{</span>chunk<span class="token punctuation">.</span>page_content<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;=&quot;</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">文档分块数量: 3</span>
<span class="line"></span>
<span class="line">========= 文档分块结果 =========</span>
<span class="line">内容: class CombatSystem:</span>
<span class="line">   def __init__(self):</span>
<span class="line">       self.health = 100</span>
<span class="line">       self.stamina = 100</span>
<span class="line">       self.state = &quot;IDLE&quot;</span>
<span class="line">       self.attack_patterns = {</span>
<span class="line">           &quot;NORMAL&quot;: 10,</span>
<span class="line">           &quot;SPECIAL&quot;: 30,</span>
<span class="line">           &quot;ULTIMATE&quot;: 50</span>
<span class="line">       }</span>
<span class="line">   def update(self, delta_time):</span>
<span class="line">       self._update_stats(delta_time)</span>
<span class="line">       self._handle_combat()</span>
<span class="line">   def _update_stats(self, delta_time):</span>
<span class="line">       self.stamina = min(100, self.stamina + 5 * delta_time)</span>
<span class="line">   def _handle_combat(self):</span>
<span class="line">       if self.state == &quot;ATTACKING&quot;:</span>
<span class="line">           self._execute_attack()</span>
<span class="line">   def _execute_attack(self):</span>
<span class="line">       if self.stamina &gt;= self.attack_patterns[&quot;SPECIAL&quot;]:</span>
<span class="line">           damage = 50</span>
<span class="line">           self.stamina -= self.attack_patterns[&quot;SPECIAL&quot;]</span>
<span class="line">           return damage</span>
<span class="line">       return self.attack_patterns[&quot;NORMAL&quot;]</span>
<span class="line">==================================================</span>
<span class="line">内容: class InventorySystem:</span>
<span class="line">   def __init__(self):</span>
<span class="line">       self.items = {}</span>
<span class="line">       self.capacity = 20</span>
<span class="line">       self.gold = 0</span>
<span class="line">   def add_item(self, item_id, quantity):</span>
<span class="line">       if len(self.items) &lt; self.capacity:</span>
<span class="line">           if item_id in self.items:</span>
<span class="line">               self.items[item_id] += quantity</span>
<span class="line">           else:</span>
<span class="line">               self.items[item_id] = quantity</span>
<span class="line">   def remove_item(self, item_id, quantity):</span>
<span class="line">       if item_id in self.items:</span>
<span class="line">           self.items[item_id] -= quantity</span>
<span class="line">           if self.items[item_id] &lt;= 0:</span>
<span class="line">               del self.items[item_id]</span>
<span class="line">   def get_item_count(self, item_id):</span>
<span class="line">       return self.items.get(item_id, 0)</span>
<span class="line">==================================================</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div>`,18)]))}const i=s(e,[["render",l]]),u=JSON.parse('{"path":"/rag/chunking/methods/","title":"分块方法","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748623235000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"650cd2b9f76950464baaa8c7ae78e1777342b6ca","time":1748623235000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档向量存储文章撰写"}]},"filePathRelative":"rag/chunking/methods/README.md"}');export{i as comp,u as data};
