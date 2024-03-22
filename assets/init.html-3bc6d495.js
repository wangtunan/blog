import{_ as n,o as s,c as a,d as t}from"./app-2cac7dbf.js";const p="/blog/assets/instance-b475d413.png",o="/blog/assets/initMixin-899510af.png",e={},c=t(`<h1 id="initmixin流程" tabindex="-1"><a class="header-anchor" href="#initmixin流程" aria-hidden="true">#</a> initMixin流程</h1><p>在上一节我们讲到了<code>initGlobalAPI</code>的整体流程，这一节，我们来介绍<code>initMixin</code>的整体流程。首先，我们把目光回到<code>src/core/index.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./instance/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initGlobalAPI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./global-api/index&#39;</span>
<span class="token function">initGlobalAPI</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre></div><p>我们发现，它从别的模块中引入了大<code>Vue</code>，那么接下来我们的首要任务就是揭开<code>Vue</code>构造函数的神秘面纱。</p><p>在看<code>src/core/instance/index.js</code>代码之前，我们发现<code>instance</code>目录结构如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- instance
<span class="token operator">|</span>   <span class="token operator">|</span>-- render-helpers      <span class="token comment"># render渲染相关的工具函数目录</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- events.js           <span class="token comment"># 事件处理相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- init.js             <span class="token comment"># _init等方法相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- inject.js           <span class="token comment"># inject和provide相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- lifecycle.js        <span class="token comment"># 生命周期相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- proxy.js            <span class="token comment"># 代理相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- render.js           <span class="token comment"># 渲染相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- state.js            <span class="token comment"># 数据状态相关</span>
<span class="token operator">|</span>   <span class="token operator">|</span>-- index.js            <span class="token comment"># 入口文件</span>
</code></pre></div><p>可以看到，目录结构文件有很多，而且包含的面也非常杂，但我们现在只需要对我们最关心的几个部分做介绍：</p><ul><li><code>events.js</code>：处理事件相关，例如：<code>$on</code>，<code>$off</code>，<code>$emit</code>以及<code>$once</code>等方法的实现。</li><li><code>init.js</code>：此部分代码逻辑包含了<code>Vue</code>从创建实例到实例挂载阶段的所有主要逻辑。</li><li><code>lifecycle.js</code>：生命周期相关，例如：<code>$destroy</code>、<code>$activated</code>和<code>$deactivated</code>。</li><li><code>state.js</code>：数据状态相关，例如：<code>data</code>、<code>props</code>以及<code>computed</code>等。</li><li><code>render.js</code>：渲染相关，其中最值得关注的是<code>Vue.prototype._render</code>渲染函数的定义。</li></ul><p>在介绍了<code>instance</code>目录结构的及其各自的作用以后，我们再来看入口文件，其实入口文件这里才是<code>Vue</code>构造函数庐山真面目：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./init&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./state&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./render&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./events&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./lifecycle&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> warn <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>

<span class="token keyword">function</span> <span class="token function">Vue</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vue</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;Vue is a constructor and should be called with the \`new\` keyword&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre></div><p>代码分析：</p><ul><li><code>Vue</code>构造函数其实就是一个普通的函数，我们只能通过<code>new</code>操作符进行访问，既<code>new Vue()</code>的形式，<code>Vue</code>函数内部也使用了<code>instanceof</code>操作符来判断实例的父类是否为<code>Vue</code>构造函数，不是的话则在开发环境下输出警告信息。</li><li>除了声明<code>Vue</code>构造函数，这部分的代码也调用了几种<code>mixin</code>方法，其中每种<code>mixin</code>方法各司其职，处理不同的内容。</li></ul><p>从以上代码中，我们能得到<code>src/core/instance/index.js</code>文件非常直观的代码逻辑流程图：</p><p><img src="`+p+`" alt="instance流程"></p><p>接下来我们的首要任务是弄清楚<code>_init()</code>函数的代码逻辑以及<code>initMixin</code>的整体流程。我们从上面的代码发现，在构造函数内部会调用<code>this._init()</code>方法，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 实例化时，会调用this._init()方法。</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello, Vue.js&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>然后，我们在<code>init.js</code>中来看<code>initMixin()</code>方法是如何被定义的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initMixin</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略代码</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以发现，<code>initMixin()</code>方法的主要作用就是在<code>Vue.prototype</code>上定义一个<code>_init()</code>实例方法，接下来我们来看一下<code>_init()</code>函数的具体实现逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token comment">// 1. 合并配置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>_isComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initInternalComponent</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
        <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span>
        options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 2.render代理</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initProxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_renderProxy <span class="token operator">=</span> vm
    <span class="token punctuation">}</span>

    <span class="token comment">// 3.初始化生命周期、初始化事件中心、初始化inject，</span>
    <span class="token comment">//   初始化state、初始化provide、调用生命周期</span>
    vm<span class="token punctuation">.</span>_self <span class="token operator">=</span> vm
    <span class="token function">initLifecycle</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initEvents</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initRender</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;beforeCreate&#39;</span><span class="token punctuation">)</span>
    <span class="token function">initInjections</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initState</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initProvide</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;created&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">// 4.挂载</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre></div><p>因为我们是要分析<code>initMixin</code>整体流程，对于其中某些方法的具体实现逻辑会在后续进行详细的说明，因此我们可以从以上代码得到<code>initMixin</code>的整体流程图。</p><div style="text-align:center;"><img src="`+o+'"></div>',22),i=[c];function l(u,k){return s(),a("div",null,i)}const d=n(e,[["render",l],["__file","init.html.vue"]]);export{d as default};
