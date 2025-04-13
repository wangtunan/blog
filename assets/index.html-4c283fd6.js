import{_ as n,o as a,c as p,d as o}from"./app-c9515a38.js";const t={};function e(c,s){return a(),p("div",null,s[0]||(s[0]=[o(`<h1 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h1><p>在开始之前，我们需要新建一个项目，并且创建一些必要的文件目录，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- rollup-learn
<span class="token operator">|</span>   <span class="token operator">|</span>-- src
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span>-- index.js  <span class="token comment"># 入口文件</span>
</code></pre></div><p>接着，在<code>src/index.js</code>文件撰写如下代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// src/index.js</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">helloRollup</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello, rollup&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后使用如下命令创建一个<code>package.json</code>文件：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> init <span class="token parameter variable">-y</span>
</code></pre></div><p>创建完毕后，再修改<code>package.json</code>，修改后如下：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup-learn&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c rollup.config.mjs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -c rollup.config.mjs&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;license&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ISC&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>打包参数说明：</p><ul><li><code>-w</code>：全称<code>--watch</code>，表示监听代码变化，自动打包。</li><li><code>-c</code>: 全称<code>--config</code>，表示指明打包配置文件。</li></ul><p>接着撰写<code>rollup.config.mjs</code>配置文件，如下：</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>对于<code>.mjs</code>格式的配置文件，<code>Rollup</code>直接支持<code>import/export</code>语法，不需要额外转义。</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.cjs.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;cjs&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.esm.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;es&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，安装依赖<code>Rollup</code>并执行打包命令:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装依赖(rollup@4.x+版本)</span>
$ <span class="token function">npm</span> <span class="token function">install</span> rollup --save-dev

<span class="token comment"># 运行打包命令</span>
$ <span class="token function">npm</span> run build
</code></pre></div><p>运行完毕后，在<code>dist</code>目录下，会出现三个打包文件，目录结构如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- dist
<span class="token operator">|</span>   <span class="token operator">|</span>-- vue.js     // umd规范打包产物
<span class="token operator">|</span>   <span class="token operator">|</span>-- vue.cjs.js // commonjs规范打包产物
<span class="token operator">|</span>   <span class="token operator">|</span>-- vue.esm.js // esm规范打包产物
</code></pre></div><p>这样，我们的基础目录已经有了，在之后的小节中，所有案例均基于这个基础的目录结构。</p>`,19)]))}const r=n(t,[["render",e],["__file","index.html.vue"]]);export{r as default};
