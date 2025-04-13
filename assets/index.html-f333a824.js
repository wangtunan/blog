import{_ as a,o as n,c as o,d as e}from"./app-c9515a38.js";const p={};function t(c,s){return n(),o("div",null,s[0]||(s[0]=[e(`<h1 id="配置package-json" tabindex="-1"><a class="header-anchor" href="#配置package-json" aria-hidden="true">#</a> 配置package.json</h1><p>我们需要在<code>package.json</code>中配置如下信息：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token comment">// package.json文件</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.cjs.js&quot;</span><span class="token punctuation">,</span>   <span class="token comment">// commonjs规范引入</span>
  <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.esm.js&quot;</span><span class="token punctuation">,</span> <span class="token comment">// esm规范引入</span>
  <span class="token property">&quot;browser&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.js&quot;</span><span class="token punctuation">,</span>    <span class="token comment">// script引入</span>
  <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.d.ts&quot;</span><span class="token punctuation">,</span>    <span class="token comment">// ts类型定义文件</span>
  <span class="token property">&quot;files&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;dist&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上配置具体含义如下：</p><ul><li><code>main</code>: 指明<code>commonjs</code>规范引入时的入口文件，例如：<code>require(xxx)</code>。</li><li><code>module</code>: 指明<code>esm</code>规范引入时的入口文件，例如：<code>import xxx from &#39;xxx&#39;</code>。</li><li><code>browser</code>: 指明浏览器<code>script</code>脚本引入时的入口文件，例如<code>&lt;script src=&quot;xxxx&quot;&gt;&lt;/script&gt;</code></li><li><code>types</code>: 如果库提供了<code>ts</code>类型定义，一般需要配置<code>types</code>选项。</li><li><code>files</code>: 配置<code>npm install</code>时，拉取的文件。以上配置后，在<code>node_modules</code>文件下，其安装文件目录如下：</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- node_modules
<span class="token operator">|</span>  <span class="token operator">|</span>-- vue
<span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span> -- dist
<span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>-- vue.cjs.js
<span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>-- vue.esm.js
<span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>-- vue.c.js
<span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>-- index.d.ts
<span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span> -- package.json
</code></pre></div>`,6)]))}const l=a(p,[["render",t],["__file","index.html.vue"]]);export{l as default};
