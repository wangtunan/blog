import{_ as o,r as e,o as c,c as l,e as a,a as n,b as t,d as p}from"./app-NrJ6qDSo.js";const u={},k=n("h1",{id:"困难",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#困难","aria-hidden":"true"},"#"),t(" 困难")],-1),r=n("h2",{id:"_23-合并k个升序链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_23-合并k个升序链表","aria-hidden":"true"},"#"),t(" 23.合并K个升序链表")],-1),i=p(`<p>基础：合并两个有序链表。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
</code></pre></div><h2 id="_25-k个一组翻转链表" tabindex="-1"><a class="header-anchor" href="#_25-k个一组翻转链表" aria-hidden="true">#</a> 25.K个一组翻转链表</h2>`,7),d=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div>`,1);function m(w,y){const s=e("leetcode-link");return c(),l("div",null,[k,r,a(s,{title:"23.合并K个升序链表",link:"https://leetcode.cn/problems/merge-k-sorted-lists"}),i,a(s,{title:"25.K个一组翻转链表",link:"https://leetcode.cn/problems/reverse-nodes-in-k-group"}),d])}const v=o(u,[["render",m],["__file","index.html.vue"]]);export{v as default};
