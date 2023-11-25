import{_ as e,o,c as a,d as c}from"./app-KCH_RNRM.js";const s={},n=c(`<h1 id="源码目录" tabindex="-1"><a class="header-anchor" href="#源码目录" aria-hidden="true">#</a> 源码目录</h1><p>因为<code>Vue3</code>采用<code>Monorepo</code>进行项目代码管理，所以我们着重关注<code>packages</code>目录，其中比较关键的几个<code>package</code>如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- packages            
<span class="token operator">|</span>   <span class="token operator">|</span>-- compiler-core
<span class="token operator">|</span>   <span class="token operator">|</span>-- compiler-dom
<span class="token operator">|</span>   <span class="token operator">|</span>-- compiler-sfc
<span class="token operator">|</span>   <span class="token operator">|</span>-- compiler-ssr
<span class="token operator">|</span>   <span class="token operator">|</span>-- reactivity
<span class="token operator">|</span>   <span class="token operator">|</span>-- runtime-core
<span class="token operator">|</span>   <span class="token operator">|</span>-- runtime-dom
<span class="token operator">|</span>   <span class="token operator">|</span>-- vue
</code></pre></div><p><code>package</code>功能介绍：</p><ul><li><code>compiler-core</code>：跟环境无关的公共编译模块。</li><li><code>compiler-dom</code>：针对<code>web</code>浏览器端编译模块。</li><li><code>compiler-sfc</code>：<code>.vue</code>单文件解析模块，我们比较熟悉的<code>vue-loader</code>打包插件会使用到它。</li><li><code>compiler-ssr</code>: 服务端渲染相关的编译模块。</li><li><code>reactivity</code>：响应式模块，例如<code>ref</code>和<code>reactive</code>都定义在此模块中。</li><li><code>runtime-core</code>：跟环境无关的公共运行时模块。</li><li><code>runtime-dom</code>：针对<code>web</code>浏览器端的运行时模块。</li><li><code>vue</code>: 集合几乎所有模块为一身的完整包。</li></ul>`,5),r=[n];function p(t,d){return o(),a("div",null,r)}const i=e(s,[["render",p],["__file","index.html.vue"]]);export{i as default};
