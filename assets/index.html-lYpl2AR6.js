import{_ as p,r as t,o,c as e,e as c,a as n,b as s,d as l}from"./app-whhss94l.js";const k={},u=n("h1",{id:"简单",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简单","aria-hidden":"true"},"#"),s(" 简单")],-1),r=n("h2",{id:"_20-有效括号",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_20-有效括号","aria-hidden":"true"},"#"),s(" 20.有效括号")],-1),i=l(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为字符串的长度</span>
<span class="token comment">// 时间复杂度：O(n)，需要遍历一遍字符串</span>
<span class="token comment">// 空间复杂度：O(n)，定义栈数组</span>
<span class="token keyword">var</span> <span class="token function-variable function">isValid</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">s</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> matchMap <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;)&#39;</span><span class="token operator">:</span> <span class="token string">&#39;(&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;}&#39;</span><span class="token operator">:</span> <span class="token string">&#39;{&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;]&#39;</span><span class="token operator">:</span> <span class="token string">&#39;[&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> char <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> peek <span class="token operator">=</span> stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>peek <span class="token operator">&amp;&amp;</span> peek <span class="token operator">===</span> matchMap<span class="token punctuation">[</span>char<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> stack<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,1);function d(h,m){const a=t("leetcode-link");return o(),e("div",null,[u,r,c(a,{title:"20.有效括号",link:"https://leetcode.cn/problems/valid-parentheses"}),i])}const y=p(k,[["render",d],["__file","index.html.vue"]]);export{y as default};
