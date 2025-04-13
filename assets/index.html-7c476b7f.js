import{_ as a,o as s,c as p,d as o}from"./app-c9515a38.js";const t={};function e(c,n){return s(),p("div",null,n[0]||(n[0]=[o(`<h1 id="babel转义" tabindex="-1"><a class="header-anchor" href="#babel转义" aria-hidden="true">#</a> Babel转义</h1><p>在上一章节，我们提到了<code>@rollup/plugin-babel</code>这个插件，它是用来把<code>ES6</code>代码在打包的时候转义成<code>ES5</code>的。</p><p>下面详细介绍<code>Rollup</code>中如何进行<code>Babel</code>转义。</p><p>首先，需要我们安装几个<code>npm</code>包，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装rollup 相关插件包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @rollup/plugin-commonjs <span class="token parameter variable">-D</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @rollup/plugin-node-resolve <span class="token parameter variable">-D</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @rollup/plugin-babel <span class="token parameter variable">-D</span>

<span class="token comment"># 安装babel相关包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @babel/core @babel/preset-env <span class="token parameter variable">-D</span>
</code></pre></div><p>安装完毕后，需要在<code>rollup.config.mjs</code>中使用插件，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-commonjs&#39;</span>
<span class="token keyword">import</span> nodeResolve <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-node-resolve&#39;</span>
<span class="token keyword">import</span> babel <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-babel&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>省略其它
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">nodeResolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">babel</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">babelHelpers</span><span class="token operator">:</span> <span class="token string">&#39;bundled&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后，需要在根目录下新建<code>.babelrc</code>文件，并撰写如下内容：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;@babel/preset-env&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为了测试是否正确的处理了<code>ES6</code>相关的代码，我们需要改动一下入口文件<code>src/index.js</code>，并添加如下两个函数:</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">minus</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">-</span> b
<span class="token punctuation">}</span>
</code></pre></div><p>最后，我们再次运行<code>npm run build</code>打包命令，查看<code>dist</code>目录下<code>vue.esm.js</code>文件打包后的代码。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">minus</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">minus</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> add<span class="token punctuation">,</span> minus <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>可以看到，<code>ES6</code>相关的代码已经被正确的转义了。</p>`,14)]))}const u=a(t,[["render",e],["__file","index.html.vue"]]);export{u as default};
