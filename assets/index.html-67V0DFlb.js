import{_ as n,o as s,c as a,d as t}from"./app-4jB4LVGt.js";const o={},p=t(`<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p>在之前几个章节中，我们提到过很多次组件的概念，组件在我们日常的开发过程中出现频率是非常高的，它也是<code>Vue</code>的两大核心之一：<strong>数据驱动</strong>和<strong>组件化</strong>。</p><p>在前面章节我们已经介绍完了<strong>数据驱动</strong>，在这个章节我们会着重介绍与<strong>组件化</strong>相关的知识，我们将从入口文件<code>main.js</code>开始探索组件化的奥秘。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>

Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router<span class="token punctuation">,</span>
  store<span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre></div>`,4),e=[p];function c(r,l){return s(),a("div",null,e)}const u=n(o,[["render",c],["__file","index.html.vue"]]);export{u as default};
