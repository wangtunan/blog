import{_ as e,c as o,a as s,e as p,b as t,r as c,o as l}from"./app-OZJ_mqn6.js";const i={};function u(k,n){const a=c("leetcode-link");return l(),o("div",null,[n[0]||(n[0]=s("h1",{id:"困难",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#困难"},[s("span",null,"困难")])],-1)),n[1]||(n[1]=s("h2",{id:"_23-合并k个升序链表",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_23-合并k个升序链表"},[s("span",null,"23.合并K个升序链表")])],-1)),p(a,{title:"23.合并K个升序链表",link:"https://leetcode.cn/problems/merge-k-sorted-lists"}),n[2]||(n[2]=t(`<p>基础：合并两个有序链表。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy</span>
<span class="line"></span>
<span class="line">  <span class="token keyword">while</span><span class="token punctuation">(</span>list1 <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> list2 <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>list1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> list2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1</span>
<span class="line">      list1 <span class="token operator">=</span> list1<span class="token punctuation">.</span>next</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list2</span>
<span class="line">      list2 <span class="token operator">=</span> list2<span class="token punctuation">.</span>next</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1 <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> list2 <span class="token operator">:</span> list1</span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>方法一：顺序合并</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// n为链表的长度，k为链表的个数</span></span>
<span class="line"><span class="token comment">// 时间复杂度：O(k²n)，两两合并</span></span>
<span class="line"><span class="token comment">// 空间复杂度：O(1)，仅定义常量</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token function-variable function">mergeKLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">lists</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> head <span class="token operator">=</span> <span class="token keyword">null</span></span>
<span class="line">  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> lists<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    head <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> lists<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> head</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>方法二：分而治之</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// n为链表的长度，k为链表的个数</span></span>
<span class="line"><span class="token comment">// 时间复杂度：O(kn * logn)</span></span>
<span class="line"><span class="token comment">// 空间复杂度：O(logk)，递归时栈空间的开销</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token function-variable function">merge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">lists<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">===</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> lists<span class="token punctuation">[</span>start<span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">&gt;</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">null</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> middle <span class="token operator">=</span> <span class="token punctuation">(</span>start <span class="token operator">+</span> end<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> start<span class="token punctuation">,</span> middle<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> middle <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> end<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span> </span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token function-variable function">mergeKLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">lists</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> lists<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="_25-k个一组翻转链表" tabindex="-1"><a class="header-anchor" href="#_25-k个一组翻转链表"><span>25.K个一组翻转链表</span></a></h2>`,7)),p(a,{title:"25.K个一组翻转链表",link:"https://leetcode.cn/problems/reverse-nodes-in-k-group"}),n[3]||(n[3]=t(`<div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// n为链表的长度</span></span>
<span class="line"><span class="token comment">// 时间复杂度：O(n)，需要(n/k)次迭代。</span></span>
<span class="line"><span class="token comment">// 时间复杂度：O(1)，仅定义常量。</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> tail</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">while</span><span class="token punctuation">(</span>prev <span class="token operator">!==</span> tail<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span></span>
<span class="line">    prev <span class="token operator">=</span> curr<span class="token punctuation">;</span></span>
<span class="line">    curr <span class="token operator">=</span> next<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">[</span>tail<span class="token punctuation">,</span> head<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> <span class="token function-variable function">reverseKGroup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> tail <span class="token operator">=</span> pre<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      tail <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>tail<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> next <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">[</span>head<span class="token punctuation">,</span> tail<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> tail<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    pre<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span></span>
<span class="line">    tail<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span></span>
<span class="line">    pre <span class="token operator">=</span> tail<span class="token punctuation">;</span></span>
<span class="line">    head <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div>`,1))])}const d=e(i,[["render",u]]),m=JSON.parse('{"path":"/algorithm/leetcode/linkedList/hard/","title":"困难","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1748667955000,"contributors":[{"name":"wangtunan","username":"wangtunan","email":"why583440138@gmail.com","commits":1,"url":"https://github.com/wangtunan"}],"changelog":[{"hash":"4cae81a7be7882437e8f42d6762dbb92aa7d76e8","time":1748667955000,"email":"why583440138@gmail.com","author":"wangtunan","message":"blog RAG结构化文档向量存储文章撰写"}]},"filePathRelative":"algorithm/leetcode/linkedList/hard/README.md"}');export{d as comp,m as data};
