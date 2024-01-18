import{_ as n,o as s,c as a,d as t}from"./app-oGmC-EEb.js";const p={},e=t(`<h1 id="render和renderproxy" tabindex="-1"><a class="header-anchor" href="#render和renderproxy" aria-hidden="true">#</a> render和renderProxy</h1><p>介绍完<code>$mount</code>后，我们来看一下<code>render</code>以及<code>renderProxy</code>相关的逻辑，这一节的主要目标是：弄清楚<code>renderProxy</code>的作用以及<code>render</code>的实现原理。</p><h2 id="renderproxy" tabindex="-1"><a class="header-anchor" href="#renderproxy" aria-hidden="true">#</a> renderProxy</h2><p>我们在之前介绍的<code>initMixin</code>方法中，有下面这样一段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initProxy <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./proxy&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">initMixin</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initProxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_renderProxy <span class="token operator">=</span> vm
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>initProxy</code>是定义在<code>src/core/instance/proxy.js</code>文件中的一个方法，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> initProxy
<span class="token function-variable function">initProxy</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">initProxy</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hasProxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// determine which proxy handler to use</span>
    <span class="token keyword">const</span> options <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
    <span class="token keyword">const</span> handlers <span class="token operator">=</span> options<span class="token punctuation">.</span>render <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>render<span class="token punctuation">.</span>_withStripped
      <span class="token operator">?</span> getHandler
      <span class="token operator">:</span> hasHandler
    vm<span class="token punctuation">.</span>_renderProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>_renderProxy <span class="token operator">=</span> vm
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li>这个方法首先判断了当前环境是否支持原生<code>Proxy</code>，如果支持则创建一个<code>Proxy</code>代理，其中<code>hasProxy</code>是一个<code>boolean</code>值，它的实现逻辑如下：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> hasProxy <span class="token operator">=</span> <span class="token keyword">typeof</span> Proxy <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isNative</span><span class="token punctuation">(</span>Proxy<span class="token punctuation">)</span>
</code></pre></div><ul><li>然后根据<code>options.render</code>和<code>options.render._withStripped</code>的值来选择使用<code>getHandler</code>还是<code>hasHandler</code>，当使用<code>vue-loader</code>解析<code>.vue</code>文件时，这个时候<code>options.render._withStripped</code>为真值，因此选用<code>getHandler</code>。当选择使用<code>compiler</code>版本的<code>Vue.js</code>时，我们的入口文件中根实例是这样定义的:</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App&#39;</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> App <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;App/&gt;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>这个时候，对于根实例而言其<code>options.render._withStripped</code>为<code>undefined</code>，因此使用<code>hasHandler</code>。在搞清楚什么时候使用<code>getHandler</code>和<code>hasHandler</code>后，我们可能会有另外的问题： <code>getHandler</code>和<code>hasHandler</code>是干什么的？怎么触发？</p><p>在回答第一个问题之前，我们先来看一下<code>getHandler</code>和<code>hasHandler</code>的定义：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> allowedGlobals <span class="token operator">=</span> <span class="token function">makeMap</span><span class="token punctuation">(</span>
  <span class="token string">&#39;Infinity,undefined,NaN,isFinite,isNaN,&#39;</span> <span class="token operator">+</span>
  <span class="token string">&#39;parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,&#39;</span> <span class="token operator">+</span>
  <span class="token string">&#39;Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,&#39;</span> <span class="token operator">+</span>
  <span class="token string">&#39;require&#39;</span> <span class="token comment">// for Webpack/Browserify</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">warnNonPresent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">warn</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Property or method &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is not defined on the instance but </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
    <span class="token string">&#39;referenced during render. Make sure that this property is reactive, &#39;</span> <span class="token operator">+</span>
    <span class="token string">&#39;either in the data option, or for class-based components, by &#39;</span> <span class="token operator">+</span>
    <span class="token string">&#39;initializing the property. &#39;</span> <span class="token operator">+</span>
    <span class="token string">&#39;See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.&#39;</span><span class="token punctuation">,</span>
    target
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">warnReservedPrefix</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">warn</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; must be accessed with &quot;$data.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; because </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
    <span class="token string">&#39;properties starting with &quot;$&quot; or &quot;_&quot; are not proxied in the Vue instance to &#39;</span> <span class="token operator">+</span>
    <span class="token string">&#39;prevent conflicts with Vue internals. &#39;</span> <span class="token operator">+</span>
    <span class="token string">&#39;See: https://vuejs.org/v2/api/#data&#39;</span><span class="token punctuation">,</span>
    target
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> hasHandler <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">has</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> has <span class="token operator">=</span> key <span class="token keyword">in</span> target
    <span class="token keyword">const</span> isAllowed <span class="token operator">=</span> <span class="token function">allowedGlobals</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token punctuation">(</span><span class="token keyword">typeof</span> key <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;_&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> target<span class="token punctuation">.</span>$data<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>has <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isAllowed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> target<span class="token punctuation">.</span>$data<span class="token punctuation">)</span> <span class="token function">warnReservedPrefix</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      <span class="token keyword">else</span> <span class="token function">warnNonPresent</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> has <span class="token operator">||</span> <span class="token operator">!</span>isAllowed
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> getHandler <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">get</span> <span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> key <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> target<span class="token punctuation">.</span>$data<span class="token punctuation">)</span> <span class="token function">warnReservedPrefix</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      <span class="token keyword">else</span> <span class="token function">warnNonPresent</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，<code>getHandler</code>和<code>hasHandler</code>所做的事情几乎差不多，都是<strong>在渲染阶段对不合法的数据做判断和处理</strong>。对于<code>warnNonPresent</code>而言，它提示我们在模板中使用了未定义的变量；对于<code>warnReservedPrefix</code>而言，它提示我们不能定义带<code>$</code>或者<code>_</code>开头的变量，因为这样容易和一些内部的属性相互混淆。</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{msg1}}
  {{$age}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// msg1报错</span>
<span class="token comment">// $age报错</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">$age</span><span class="token operator">:</span> <span class="token number">23</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>紧接着，我们第二个问题：<code>getHandler</code>和<code>hasHandler</code>如何触发？这其实涉及到一点<code>ES6 Proxy</code>方面的知识，我们以下面这段代码为例来进行说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">has</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> key <span class="token keyword">in</span> target
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">get</span> <span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 触发getHandler，输出a</span>
proxy<span class="token punctuation">.</span>a 

<span class="token comment">// 触发hasHandler，输出 b c</span>
<span class="token keyword">with</span><span class="token punctuation">(</span>proxy<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> d <span class="token operator">=</span> b <span class="token operator">+</span> c
<span class="token punctuation">}</span>
</code></pre></div><p>在以上代码中，我们定义了一个<code>proxy</code>代理，当我们访问<code>proxy.a</code>的时候，根据<code>Proxy</code>相关的知识会触发<code>getHandler</code>，因此会输出<code>a</code>。当我们使用<code>with</code>访问<code>proxy</code>的时候，在其中任何属性的访问都会触发<code>hasHandler</code>，因此会输出<code>b</code>和<code>c</code>。</p><p>在以上代码分析完毕后，我们就可以对<code>initProxy</code>的作用进行一个总结：<strong>在渲染阶段对不合法的数据做判断和处理</strong>。</p><h2 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> render</h2><p>在之前的代码中，我们在<code>mountComponent</code>中遇到过下面这样一段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这一节，我们来分析一下<code>_render</code>函数的实现，它其实是在<code>src/core/instance/render.js</code>文件中被定义：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">renderMixin</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_render</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> _parentVnode <span class="token punctuation">}</span> <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
    <span class="token comment">// ...省略代码</span>
    <span class="token keyword">let</span> vnode
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// There&#39;s no need to maintain a stack because all render fns are called</span>
      <span class="token comment">// separately from one another. Nested component&#39;s render fns are called</span>
      <span class="token comment">// when parent component is patched.</span>
      currentRenderingInstance <span class="token operator">=</span> vm
      vnode <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_renderProxy<span class="token punctuation">,</span> vm<span class="token punctuation">.</span>$createElement<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">render</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...省略代码</span>
    vnode<span class="token punctuation">.</span>parent <span class="token operator">=</span> _parentVnode
    <span class="token keyword">return</span> vnode
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中通过<code>$options</code>解构出来的<code>render</code>，就是我们实例化的时候提供的<code>render</code>选择或者通过<code>template</code>编译好的<code>render</code>函数。在<code>_render</code>代码中，最重要的一步是<code>render.call</code>函数的调用，<code>render</code>函数执行后会返回<code>VNode</code>，<code>VNode</code>会在之后的处理过程中使用到。</p><p>我们在<code>render.call</code>方法调用的时候，除了传递我们的<code>renderProxy</code>代理，还传递了一个<code>$createElement</code>函数，其中这个函数是在<code>initRender</code>方法中被定义：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initRender</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  vm<span class="token punctuation">.</span><span class="token function-variable function">_c</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token comment">// normalization is always applied for the public version, used in</span>
  <span class="token comment">// user-written render functions.</span>
  vm<span class="token punctuation">.</span><span class="token function-variable function">$createElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token comment">// ...省略代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们发现，<code>vm.$createElement</code>和<code>vm._c</code>的函数定义是差不多的，唯一的区别是在调用<code>createElement</code>方法的时候，传递的最后一个参数不相同。<code>$createElement</code>和<code>_c</code>方法虽然方法定义差不多，但使用场景是不一样的，<code>$createElement</code>通常是用户手动提供的<code>render</code>来使用，而<code>_c</code>方法通常是模板编译生成的<code>render</code>来使用的。</p><p>根据<code>render</code>函数的定义，我们可以把<code>template</code>例子改写成使用<code>render</code>的形式：</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    {{msg}}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;message&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p><code>render</code>改写后：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;message&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">render</span><span class="token operator">:</span> <span class="token punctuation">(</span>$createElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>  <span class="token function">$createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;app&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>message<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这一小节，我们分析了<code>render</code>的实现，在下一小节我们将深入学习<code>createElement</code>方法的实现原理。</p>`,35),o=[e];function c(l,r){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","render.html.vue"]]);export{k as default};
