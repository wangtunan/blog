import{_ as s,o as n,c as a,d as p}from"./app-4d1df267.js";const o={},t=p(`<h1 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h1><p>在介绍配置案例之前，我们需要新建一个项目，并且创建一些必要的文件目录，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- rollup-learn
<span class="token operator">|</span>   <span class="token operator">|</span>-- src
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span>-- index.js  <span class="token comment"># 入口文件</span>
</code></pre></div><p>然后使用如下命令创建一个<code>package.json</code>文件：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> init <span class="token parameter variable">-y</span>
</code></pre></div><p>创建完毕后，再修改<code>package.json</code>，修改后如下：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup-learn&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c rollup.config.js&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -c rollup.config.js&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wangtunan&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;license&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MIT&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这样，我们的基础目录已经有了，在之后的小节中，所有案例均基于这个基础的目录结构。</p><h3 id="基础配置-1" tabindex="-1"><a class="header-anchor" href="#基础配置-1" aria-hidden="true">#</a> 基础配置</h3><p>根据之前的章节，我们需要安装一些<code>npm</code>包，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装rollup核心包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> rollup <span class="token parameter variable">-D</span>

<span class="token comment"># 安装rollup插件包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @rollup/plugin-commonjs @rollup/plugin-node-resolve <span class="token parameter variable">-D</span>
</code></pre></div><p>随后，根目录新建<code>rollup.config.js</code>，并撰写如下内容：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-commonjs&#39;</span>
<span class="token keyword">import</span> resolve <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-node-resolve&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">&#39;src/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.common.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;cjs&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token string">&#39;auto&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">&#39;dist/vue.esm.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;es&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后，我们需要在入口文件撰写一些内容:</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">minus</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">-</span> b
<span class="token punctuation">}</span>
</code></pre></div><p>最后，运行我们在<code>package.json</code>文件中定义的<code>build</code>命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> run build
</code></pre></div><p>运行完毕后，会在<code>dist</code>目录下生成三个文件，此时的文件目录结构如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- rollup-learn
<span class="token operator">|</span>   <span class="token operator">|</span>-- dist
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span>-- vue.js
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span>-- vue.common.js
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span>-- vue.esm.js
<span class="token operator">|</span>   <span class="token operator">|</span>-- src
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span>-- index.js
<span class="token operator">|</span>   <span class="token operator">|</span>-- rollup.config.js
<span class="token operator">|</span>   <span class="token operator">|</span>-- package.json
</code></pre></div><p>我们以<code>vue.esm.js</code>文件为例，其打包后的文件代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">minus</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">-</span> b
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> add<span class="token punctuation">,</span> minus <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>为了让我们<code>rollup</code>打包出来的库，能够支持<code>commonjs</code>和<code>esm</code>这两种方式引入，我们需要修改一下<code>package.json</code>，改动如下：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// ... 省略其它</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.commin.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.esm.js&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// ... 省略其它</span>
<span class="token punctuation">}</span>
</code></pre></div>`,23),e=[t];function c(r,l){return n(),a("div",null,e)}const k=s(o,[["render",c],["__file","index.html.vue"]]);export{k as default};
