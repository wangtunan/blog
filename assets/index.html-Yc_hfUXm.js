import{_ as o,r as e,o as c,c as u,a as n,b as s,e as t,d as p}from"./app-oLmLB8d3.js";const l={},k=n("h1",{id:"中等",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#中等","aria-hidden":"true"},"#"),s(" 中等")],-1),i=n("h2",{id:"_155-最小栈",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_155-最小栈","aria-hidden":"true"},"#"),s(" 155.最小栈")],-1),r={class:"custom-container tip"},d=n("p",{class:"custom-container-title"},"TIP",-1),m=n("strong",null,"要求",-1),h=n("br",null,null,-1),_=n("strong",null,"输入",-1),f=n("br",null,null,-1),y=n("strong",null,"输出",-1),w=n("br",null,null,-1),g=n("strong",null,"原题链接",-1),b={href:"https://leetcode.cn/problems/min-stack",target:"_blank",rel:"noopener noreferrer"},v=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为元素的数量</span>
<span class="token comment">// 时间复杂度：O(1)，入栈、出栈时间复杂度为常数阶</span>
<span class="token comment">// 空间复杂度：O(n + n)，常规栈空间大小 + 辅助栈空间大小</span>
<span class="token keyword">var</span> <span class="token function-variable function">MinStack</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>minStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">Infinity</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">MinStack</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">push</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>minStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getMin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">MinStack</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">pop</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>minStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">MinStack</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">top</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stack<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">MinStack</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getMin</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>minStack<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>minStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_394-字符串解码" tabindex="-1"><a class="header-anchor" href="#_394-字符串解码" aria-hidden="true">#</a> 394.字符串解码</h2>`,2),x={class:"custom-container tip"},S=n("p",{class:"custom-container-title"},"TIP",-1),j=n("strong",null,"要求",-1),I=n("br",null,null,-1),M=n("strong",null,"输入",-1),N=n("br",null,null,-1),O=n("strong",null,"输出",-1),T=n("br",null,null,-1),V=n("strong",null,"原题链接",-1),A={href:"https://leetcode.cn/problems/decode-string",target:"_blank",rel:"noopener noreferrer"},B=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为字符串的长度</span>
<span class="token comment">// 时间复杂度：O(n)，需要遍历字符串</span>
<span class="token comment">// 空间复杂度：O(n)，两个栈数组的开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">decodeString</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">s</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> numStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> strStacck <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> char <span class="token keyword">of</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNaN</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      num <span class="token operator">=</span> num <span class="token operator">*</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">Number</span><span class="token punctuation">(</span>char<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;[&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      numStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
      strStacck<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
      num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      res <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;]&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res <span class="token operator">=</span> strStacck<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> res<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>numStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      res <span class="token operator">+=</span> char<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_739-每日温度" tabindex="-1"><a class="header-anchor" href="#_739-每日温度" aria-hidden="true">#</a> 739.每日温度</h2>`,2),E={class:"custom-container tip"},P=n("p",{class:"custom-container-title"},"TIP",-1),L=n("strong",null,"要求",-1),C=n("br",null,null,-1),G=n("strong",null,"输入",-1),R=n("strong",null,"输出",-1),W=n("strong",null,"原题链接",-1),q={href:"https://leetcode.cn/problems/daily-temperatures",target:"_blank",rel:"noopener noreferrer"},z=p(`<p>方法一：暴力对比</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>能运行测试用例，但提交会判定超时</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n是温度数组的长度</span>
<span class="token comment">// 时间复杂度：O(n²)，需要两次遍历对比</span>
<span class="token comment">// 空间复杂度：O(n)，返回结果数组的存储开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">dailyTemperatures</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">temperatures</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> temperatures<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> current <span class="token operator">=</span> temperatures<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>temperatures<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> j <span class="token operator">-</span> i
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>方法二：单调栈</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n是温度数组的长度</span>
<span class="token comment">// 时间复杂度：O(n)，需要遍历一遍温度列表</span>
<span class="token comment">// 空间复杂度：O(n)，需要维护下标栈存储开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">dailyTemperatures</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">temperatures</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> temperatures<span class="token punctuation">.</span>length；
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>；
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> temperatures<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">&gt;</span> temperatures<span class="token punctuation">[</span>stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> peekIndex <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      result<span class="token punctuation">[</span>peekIndex<span class="token punctuation">]</span> <span class="token operator">=</span> index <span class="token operator">-</span> peekIndex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5);function D(F,H){const a=e("ExternalLinkIcon");return c(),u("div",null,[k,i,n("div",r,[d,n("p",null,[m,s("：设计一个支持push，pop，top操作，并能在常数时间内检索到最小元素的栈。"),h,_,s("：stack = [-2, 0, -3, 1], getMin()"),f,y,s("：-3"),w,g,s("："),n("a",b,[s("155.最小栈"),t(a)])])]),v,n("div",x,[S,n("p",null,[j,s("：给定一个经过编码的字符串，返回它解码后的字符串。"),I,M,s('：s = "3[a2[c]]"'),N,O,s('："accaccacc"'),T,V,s("："),n("a",A,[s("394.字符串解码"),t(a)])])]),B,n("div",E,[P,n("p",null,[L,s("：给定一个整数数组temperatures，表示每天的温度，返回一个数组answer，其中answer[i]是指对于第i天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。"),C,G,s("：temperatures = [73, 74, 75, 71, 69, 72, 76, 73] "),R,s("：[1, 1, 4, 2, 1, 1, 0, 0] "),W,s("："),n("a",q,[s("739.每日温度"),t(a)])])]),z])}const K=o(l,[["render",D],["__file","index.html.vue"]]);export{K as default};