import{_ as n,o as a,c as p,d as o}from"./app-c9515a38.js";const t={};function e(c,s){return a(),p("div",null,s[0]||(s[0]=[o(`<h1 id="环境区分" tabindex="-1"><a class="header-anchor" href="#环境区分" aria-hidden="true">#</a> 环境区分</h1><p>在<code>Rollup</code>中，区分开发环境和生产环境配置十分简单，其中一个方法是可以使用不同的配置文件进行区分即可。</p><p>对于配置文件，我们做如下规定：</p><ul><li><code>rollup.base.config.mjs</code>: 公共配置。</li><li><code>rollup.dev.config.mjs</code>: 开发环境配置。</li><li><code>rollup.prod.config.mjs</code>: 生产环境配置。</li></ul><p>在根目录下新建<code>build</code>文件夹，然后分别新建以上三个文件：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- build
<span class="token operator">|</span>   <span class="token operator">|</span>-- rollup.base.config.mjs
<span class="token operator">|</span>   <span class="token operator">|</span>-- rollup.dev.config.mjs
<span class="token operator">|</span>   <span class="token operator">|</span>-- rollup.prod.config.mjs
</code></pre></div><p><code>rollup.base.config.mjs</code>完整代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-commonjs&#39;</span>
<span class="token keyword">import</span> nodeResolve <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-node-resolve&#39;</span>
<span class="token keyword">import</span> babel <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-babel&#39;</span>
<span class="token keyword">import</span> typescript <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-typescript&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">&#39;src/index.ts&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">nodeResolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">typescript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">babel</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">babelHelpers</span><span class="token operator">:</span> <span class="token string">&#39;bundled&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>rollup.dev.config.mjs</code>完整代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> baseConfig <span class="token keyword">from</span> <span class="token string">&#39;./rollup.base.config&#39;</span>

<span class="token keyword">const</span> devConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>baseConfig<span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.cjs.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;cjs&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.esm.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;es&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> devConfig
</code></pre></div><p><code>prod</code>环境下，区分与开发环境，我们需要对代码进行代码。需要安装<code>Rollup</code>压缩代码的相关<code>npm</code>包：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装rollup相关包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @rollup/plugin-terser <span class="token parameter variable">-D</span>
</code></pre></div><p><code>rollup.prod.config.mjs</code>完整代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> terser <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-terser&#39;</span>
<span class="token keyword">import</span> baseConfig <span class="token keyword">from</span> <span class="token string">&#39;./rollup.base.config.mjs&#39;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;rollup&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>RollupOptions <span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>baseConfig<span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.cjs.min.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;cjs&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.esm.min.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;es&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.min.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token operator">...</span>baseConfig<span class="token punctuation">.</span>plugins<span class="token punctuation">,</span>
    <span class="token function">terser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接着，我们需要在<code>package.json</code>文件中修改打包命令：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c ./build/rollup.dev.config.mjs&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -c ./build/rollup.prod.config.mjs&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，我们尝试使用<code>npm run build</code>命令打包生产环境代码，执行后会在<code>dist</code>目录下生成三个<code>.min.js</code>文件且代码是经过压缩的。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span> dist
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> vue<span class="token punctuation">.</span>cjs<span class="token punctuation">.</span>min<span class="token punctuation">.</span>js
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> vue<span class="token punctuation">.</span>esm<span class="token punctuation">.</span>min<span class="token punctuation">.</span>js
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> vue<span class="token punctuation">.</span>min<span class="token punctuation">.</span>js
</code></pre></div>`,18)]))}const r=n(t,[["render",e],["__file","index.html.vue"]]);export{r as default};
