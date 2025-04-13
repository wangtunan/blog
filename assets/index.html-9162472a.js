import{_ as s,o as a,c as p,d as t}from"./app-c9515a38.js";const o={};function e(c,n){return a(),p("div",null,n[0]||(n[0]=[t(`<h1 id="支持typescript" tabindex="-1"><a class="header-anchor" href="#支持typescript" aria-hidden="true">#</a> 支持TypeScript</h1><p>如果要支持<code>TypeScript</code>，需要安装几个<code>npm</code>包，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装rollup插件和其依赖包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @rollup/plugin-typescript tslib <span class="token parameter variable">-D</span>
</code></pre></div><p>安装完毕后，把<code>rollup.config.mjs</code>配置文件中，把入口文件改成改为<code>.ts</code>后缀并引入<code>typescript</code>插件：</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// rollup.config.mjs</span>
<span class="token keyword">import</span> typescript <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-typescript&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>省略其它
  input<span class="token operator">:</span> <span class="token string">&#39;./src/index.ts&#39;</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">typescript</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接着，在<code>src</code>目录下新建<code>math.ts</code>文件，将<code>add</code>和<code>minus</code>方法移动过去并填写相关类型：</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> minus <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">-</span> b
<span class="token punctuation">}</span>
</code></pre></div><p>最后，入口文件<code>src/index.js</code>改成<code>src/index.js</code>，并在其中引用<code>add和minus方法</code>：</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/index.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> add<span class="token punctuation">,</span> minus <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./math&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> helloRollup <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">minus</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello, rollup&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>运行<code>npm run build</code>命令，在<code>dist</code>目录下打包出来的<code>vue.esm.js</code>文件代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">minus</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">helloRollup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">minus</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello, rollup&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> helloRollup <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,11)]))}const u=s(o,[["render",e],["__file","index.html.vue"]]);export{u as default};
