import{_ as o,r as e,o as c,c as l,a as n,b as s,e as t,d as p}from"./app-5br5jqyI.js";const u={},k=n("h1",{id:"困难",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#困难","aria-hidden":"true"},"#"),s(" 困难")],-1),r=n("h2",{id:"_23-合并k个升序链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_23-合并k个升序链表","aria-hidden":"true"},"#"),s(" 23.合并K个升序链表")],-1),i={class:"custom-container tip"},d=n("p",{class:"custom-container-title"},"TIP",-1),m=n("strong",null,"要求",-1),h=n("br",null,null,-1),_=n("strong",null,"输入",-1),w=n("br",null,null,-1),y=n("strong",null,"输出",-1),f=n("br",null,null,-1),g=n("strong",null,"原题链接",-1),v={href:"https://leetcode.cn/problems/merge-k-sorted-lists",target:"_blank",rel:"noopener noreferrer"},x=p(`<p>基础：合并两个有序链表。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy

  <span class="token keyword">while</span><span class="token punctuation">(</span>list1 <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> list2 <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> list2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1
      list1 <span class="token operator">=</span> list1<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list2
      list2 <span class="token operator">=</span> list2<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1 <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> list2 <span class="token operator">:</span> list1

  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span>
</code></pre></div><p>方法一：顺序合并</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度，k为链表的个数</span>
<span class="token comment">// 时间复杂度：O(k²n)，两两合并</span>
<span class="token comment">// 空间复杂度：O(1)，仅定义常量</span>
<span class="token keyword">var</span> <span class="token function-variable function">mergeKLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">lists</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> head <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> lists<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    head <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> lists<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> head
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>方法二：分而治之</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度，k为链表的个数</span>
<span class="token comment">// 时间复杂度：O(kn * logn)</span>
<span class="token comment">// 空间复杂度：O(logk)，递归时栈空间的开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">merge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">lists<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">===</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> lists<span class="token punctuation">[</span>start<span class="token punctuation">]</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">&gt;</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> middle <span class="token operator">=</span> <span class="token punctuation">(</span>start <span class="token operator">+</span> end<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">1</span>
    <span class="token keyword">return</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>
      <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> start<span class="token punctuation">,</span> middle<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> middle <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> end<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> 
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">mergeKLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">lists</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> lists<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_25-k个一组翻转链表" tabindex="-1"><a class="header-anchor" href="#_25-k个一组翻转链表" aria-hidden="true">#</a> 25.K个一组翻转链表</h2>`,7),b={class:"custom-container tip"},j=n("p",{class:"custom-container-title"},"TIP",-1),L=n("strong",null,"要求",-1),K=n("br",null,null,-1),N=n("strong",null,"输入",-1),O=n("br",null,null,-1),T=n("strong",null,"输出",-1),I=n("br",null,null,-1),V=n("strong",null,"原题链接",-1),B={href:"https://leetcode.cn/problems/reverse-nodes-in-k-group",target:"_blank",rel:"noopener noreferrer"},E=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，需要(n/k)次迭代。</span>
<span class="token comment">// 时间复杂度：O(1)，仅定义常量。</span>
<span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> tail</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>prev <span class="token operator">!==</span> tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
    prev <span class="token operator">=</span> curr<span class="token punctuation">;</span>
    curr <span class="token operator">=</span> next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>tail<span class="token punctuation">,</span> head<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">reverseKGroup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> tail <span class="token operator">=</span> pre<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      tail <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> next <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">[</span>head<span class="token punctuation">,</span> tail<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> tail<span class="token punctuation">)</span><span class="token punctuation">;</span>
    pre<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
    tail<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
    pre <span class="token operator">=</span> tail<span class="token punctuation">;</span>
    head <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,1);function P(C,G){const a=e("ExternalLinkIcon");return c(),l("div",null,[k,r,n("div",i,[d,n("p",null,[m,s("：给你一个链表数组，每个链表都已经按升序排列，请你将所有链表合并到一个升序链表中，返回合并后的链表。"),h,_,s("：lists = [[1, 4, 5], [1, 3, 4], [2, 6]]"),w,y,s("：[1, 1, 2, 3, 4, 4, 5, 6]"),f,g,s("："),n("a",v,[s("23.合并K个升序链表"),t(a)])])]),x,n("div",b,[j,n("p",null,[L,s("：给你链表的头节点head，每k个节点一组进行翻转，请你返回修改后的链表。"),K,N,s("：head = [1, 2, 3, 4, 5], k = 2"),O,T,s("：[2, 1, 4, 3, 5]"),I,V,s("："),n("a",B,[s("25.K个一组翻转链表"),t(a)])])]),E])}const q=o(u,[["render",P],["__file","index.html.vue"]]);export{q as default};
