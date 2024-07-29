import{_ as a,r as e,o as p,c,a as s,b as n,e as t,d as l}from"./app-87212aaa.js";const r={},i=l(`<h1 id="常用插件" tabindex="-1"><a class="header-anchor" href="#常用插件" aria-hidden="true">#</a> 常用插件</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>注意，<code>Rollup</code>中插件的顺序是有要求的，一般会把解析和转换相关的插件写在前面。</p></div><p><code>Rollup</code>并不像<code>webpack</code>那样强大，它需要和其它插件配合使用才能完成特定的功能，常用的插件有：</p><ul><li><code>@rollup/plugin-commonjs</code>：将<code>CommonJs</code>规范的模块转换为<code>ESM</code>规范，提供<code>Rollup</code>使用。</li><li><code>@rollup/plugin-node-resolve</code>：与<code>@rollup/plugin-commonjs</code>插件一起使用，配合以后就可以使用<code>node_modules</code>下的第三方模块代码了。</li><li><code>@rollup/plugin-babel</code>：把<code>ES6</code>代码转义成<code>ES5</code>代码，需要同时安装<code>@babel/core</code>和<code>@babel/preset-env</code>插件。注意：如果使用了高于<code>ES6</code>标准的语法，例如<code>async/await</code>，则需要进行额外的配置。</li><li><code>@rollup/plugin-terser</code>：代码压缩插件。</li><li><code>@rollup/plugin-json</code>： 支持从<code>.json</code>读取信息，配合<code>Rollup</code>的<code>Tree Shaking</code>可只打包<code>.json</code>文件中我们真正用到的部分。</li></ul><p>以上插件使用案例如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// rollup.config.mjs</span>
<span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-commonjs&#39;</span>
<span class="token keyword">import</span> nodeResolve <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-node-resolve&#39;</span>
<span class="token keyword">import</span> babel <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-babel&#39;</span>
<span class="token keyword">import</span> json <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-json&#39;</span>
<span class="token keyword">import</span> typescript <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-typescript&#39;</span>
<span class="token keyword">import</span> terser <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-terser&#39;</span>

<span class="token keyword">const</span> config <span class="token operator">=</span>  <span class="token punctuation">{</span>
  <span class="token operator">...</span>省略其它
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">typescript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">babel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">terser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> config
</code></pre></div>`,6),u=s("code",null,"Rollup",-1),d=s("code",null,"plugins",-1),k={href:"https://github.com/rollup/plugins",target:"_blank",rel:"noopener noreferrer"};function m(g,f){const o=e("ExternalLinkIcon");return p(),c("div",null,[i,s("p",null,[n("以上仅列举最常见的插件，"),u,n("维护了很多其它"),d,n("，你可点击"),s("a",k,[n("Rollup官方插件列表"),t(o)]),n("查看更多内容。")])])}const y=a(r,[["render",m],["__file","index.html.vue"]]);export{y as default};
