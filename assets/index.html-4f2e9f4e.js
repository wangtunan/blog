import{_ as e,r as o,o as t,c as p,a as s,b as n,e as c,d as l}from"./app-efbb9da8.js";const r={},i=l(`<h1 id="配置项类型提示" tabindex="-1"><a class="header-anchor" href="#配置项类型提示" aria-hidden="true">#</a> 配置项类型提示</h1><p>为了方便在写<code>Rollup</code>配置项时，有充足的<code>ts</code>类型提示，可使用如下两种方式：</p><p>第一种：<code>JSDoc</code>形式，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// rollup.config.mjs</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;rollup&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>RollupOptions<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>省略
<span class="token punctuation">}</span>
</code></pre></div><p>第二种，使用<code>Rollup</code>提供的<code>defineConfig</code>方法，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// rollup.config.mjs</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rollup&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span>省略
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,6),d={href:"https://cn.rollupjs.org/command-line-interface/#config-intellisense",target:"_blank",rel:"noopener noreferrer"};function u(k,m){const a=o("ExternalLinkIcon");return t(),p("div",null,[i,s("p",null,[n("以上仅列举官方提供的两种方式，你可以点击"),s("a",d,[n("Rollup配置智能提示"),c(a)]),n("了解更多。")])])}const _=e(r,[["render",u],["__file","index.html.vue"]]);export{_ as default};
