import{_ as p,r as o,o as e,c,a as s,b as a,e as l,d as r}from"./app-c9515a38.js";const k={};function u(i,n){const t=o("leetcode-link");return e(),c("div",null,[n[0]||(n[0]=s("h1",{id:"简单",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#简单","aria-hidden":"true"},"#"),a(" 简单")],-1)),n[1]||(n[1]=s("h2",{id:"_35-搜索插入位置",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_35-搜索插入位置","aria-hidden":"true"},"#"),a(" 35.搜索插入位置")],-1)),l(t,{title:"35.搜索插入位置",link:"https://leetcode.cn/problems/search-insert-position"}),n[2]||(n[2]=r(`<p>方法：二分查找</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为数组元素的数量</span>
<span class="token comment">// 时间复杂度：O(nlogn)</span>
<span class="token comment">// 空间复杂度：O(1)</span>
<span class="token keyword">var</span> <span class="token function-variable function">searchInsert</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> mid <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> val <span class="token operator">=</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,2))])}const m=p(k,[["render",u],["__file","index.html.vue"]]);export{m as default};
