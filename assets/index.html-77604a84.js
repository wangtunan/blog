import{_ as o,r as e,o as p,c,a as n,b as s,e as t,d as l}from"./app-961e2660.js";const r={},i=n("h1",{id:"简单",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简单","aria-hidden":"true"},"#"),s(" 简单")],-1),u=n("h2",{id:"_21-合并两个有序链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_21-合并两个有序链表","aria-hidden":"true"},"#"),s(" 21.合并两个有序链表")],-1),k={class:"custom-container tip"},d=n("p",{class:"custom-container-title"},"TIP",-1),_=n("strong",null,"要求",-1),h=n("br",null,null,-1),m=n("strong",null,"输入",-1),w=n("br",null,null,-1),f=n("strong",null,"输出",-1),y=n("br",null,null,-1),x=n("strong",null,"原题链接",-1),v={href:"https://leetcode.cn/problems/merge-two-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},g=l(`<p>方法一：递归</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m和n分别为两个链表的长度</span>
<span class="token comment">// 时间复杂度：O(m + n)</span>
<span class="token comment">// 空间复杂度：O(m + n)，递归调用时存在栈空间开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>list1 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> list2
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>list2 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> list1
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>list1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> list2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    list1<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>list1<span class="token punctuation">.</span>next<span class="token punctuation">,</span> list2<span class="token punctuation">)</span>
    <span class="token keyword">return</span> list1
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    list2<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>list1<span class="token punctuation">,</span> list2<span class="token punctuation">.</span>next<span class="token punctuation">)</span>
    <span class="token keyword">return</span> list2
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>方法二：迭代</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m和n分别为两个链表的长度</span>
<span class="token comment">// 时间复杂度：O(m + n)</span>
<span class="token comment">// 空间复杂度：O(1)，仅需要常量存储空间</span>
<span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
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

  <span class="token comment">// while循环结束后，list1和list2中还有未合并的节点，直接使用</span>
  curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1 <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> list2 <span class="token operator">:</span> list1
  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_141-环形链表" tabindex="-1"><a class="header-anchor" href="#_141-环形链表" aria-hidden="true">#</a> 141.环形链表</h2><h2 id="_160-相交链表" tabindex="-1"><a class="header-anchor" href="#_160-相交链表" aria-hidden="true">#</a> 160.相交链表</h2>`,6),b={class:"custom-container tip"},L=n("p",{class:"custom-container-title"},"TIP",-1),T={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists/",target:"_blank",rel:"noopener noreferrer"},j=n("p",null,"要求：",-1),N=n("h2",{id:"_206-反转链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_206-反转链表","aria-hidden":"true"},"#"),s(" 206.反转链表")],-1),I=n("h2",{id:"_234-回文链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_234-回文链表","aria-hidden":"true"},"#"),s(" 234.回文链表")],-1);function O(V,B){const a=e("ExternalLinkIcon");return p(),c("div",null,[i,u,n("div",k,[d,n("p",null,[_,s("：将两个升序链表合并为一个新的升序链表并返回。"),h,m,s("：list1 = [1, 2, 4], list2 = [1, 3, 4]"),w,f,s("：[1, 1, 2, 3, 4, 4]"),y,x,s("："),n("a",v,[s("21.合并两个有序链表"),t(a)])])]),g,n("div",b,[L,n("p",null,[s("LeetCode原题链接："),n("a",T,[s("160.相交链表"),t(a)])])]),j,N,I])}const C=o(r,[["render",O],["__file","index.html.vue"]]);export{C as default};
