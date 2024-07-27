import{_ as n,o as s,c as a,d as p}from"./app-efbb9da8.js";const t={},o=p(`<h1 id="支持typescript" tabindex="-1"><a class="header-anchor" href="#支持typescript" aria-hidden="true">#</a> 支持TypeScript</h1><p>如果要支持<code>TypeScript</code>，需要安装几个<code>npm</code>包，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装rollup插件</span>
$ <span class="token function">npm</span> <span class="token function">install</span> rollup-plugin-typescript2 <span class="token parameter variable">-D</span>

<span class="token comment"># 安装ts相关包</span>
$ <span class="token function">npm</span> <span class="token function">install</span> typescript tslib <span class="token parameter variable">-D</span>
</code></pre></div><p>安装完毕后，把入口文件后缀改为<code>.ts</code>，并且分别给<code>add</code>和<code>minus</code>这两个方法添加类型：</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> minus <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">-</span> b
<span class="token punctuation">}</span>
</code></pre></div><p>最后，在<code>rollup.base.config.js</code>文件中使用<code>rollup</code>插件。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-commonjs&#39;</span>
<span class="token keyword">import</span> resolve <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-node-resolve&#39;</span>
<span class="token keyword">import</span> babel <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-babel&#39;</span>
<span class="token keyword">import</span> typescript <span class="token keyword">from</span> <span class="token string">&#39;rollup-plugin-typescript2&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">&#39;src/index.ts&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">babel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">typescript</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br></div></div><p>再次运行<code>npm run dev</code>或者<code>npm run build</code>后，在<code>dist</code>目录下查看打包后的源码，可以看到已经能正确识别<code>ts</code>代码了。</p>`,8),e=[o];function c(l,r){return s(),a("div",null,e)}const u=n(t,[["render",c],["__file","index.html.vue"]]);export{u as default};
