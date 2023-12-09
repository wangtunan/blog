import{_ as n,o as a,c as s,d as t}from"./app-is_SRShd.js";const p="/blog/assets/data-Hl7akeUx.png",o={},e=t(`<h1 id="data处理" tabindex="-1"><a class="header-anchor" href="#data处理" aria-hidden="true">#</a> data处理</h1><p><code>Vue</code>中关于<code>data</code>的处理，根实例和子组件有一点点区别，接下来我们着重分析子组件中关于<code>data</code>的处理过程。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initData</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在以上代码中，首先判断了<code>opts.data</code>，如果值为真则代表是子组件(子组件如果没有显示定义<code>data</code>，则使用默认值)，否则代表是根实例。对于根实例而言我们不需要执行<code>initData</code>的过程，只要对<code>vm._data</code>进行<code>observe</code>即可。</p><p>接下来，我们详细分析<code>initData</code>的过程，它是定义在<code>src/core/instance/state.js</code>文件中的一个方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> data <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>data
  data <span class="token operator">=</span> vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
    <span class="token operator">?</span> <span class="token function">getData</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token operator">:</span> data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token string">&#39;data functions should return an object:\\n&#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function&#39;</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// proxy data on instance</span>
  <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props
  <span class="token keyword">const</span> methods <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>methods
  <span class="token keyword">let</span> i <span class="token operator">=</span> keys<span class="token punctuation">.</span>length
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>methods <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>methods<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Method &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; has already been defined as a data property.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>props <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">The data property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is already declared as a prop. </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Use prop default value instead.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isReserved</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_data</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// observe data</span>
  <span class="token function">observe</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>虽然<code>initData()</code>方法的代码有点长，但我们详细观察后可以发现，其主要做的就是四件事情：<strong>类型判断取值</strong>、<strong>命名冲突判断</strong>、<strong>proxy代理</strong>以及<strong>observe(data)</strong>。</p><p>然后，我们分别对以上几块进行详细解释：</p><ul><li><strong>类型判断取值</strong>：对于子组件而言，由于组件可以多次复用，因此函数必须通过工厂函数模式返回一个对象，这样在组件多次复用时就能避免引用类型的问题。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Child Component</span>
<span class="token comment">// 抛出错误：data functions should return an object</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello, Data&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于<code>data</code>是一个函数的情况，我们调用<code>getData</code>方法来取值，<code>getData</code>方法定义如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">data</span><span class="token operator">:</span> Function<span class="token punctuation">,</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">data</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">data()</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token function">popTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：<code>pushTarget</code>是一个与响应式依赖收集有关的，我们会在后续进行详细说明。<code>getData</code>的取值过程包裹在<code>try/catch</code>中，通过<code>data.call(vm, vm)</code>进行调用返回，如果函数调用出错，则使用<code>handleError</code>进行错误统一处理。</p><ul><li><strong>命名冲突判断</strong>：由于<code>props</code>和<code>methods</code>有更高的优先级，因此<code>data</code>属性的命名不能和<code>props</code>、<code>methods</code>中的命名冲突，因为无论是<code>props</code>、<code>methods</code>还是<code>data</code>最后都会反映在实例上。另外一种命名冲突，是不能以<code>$</code>或者<code>_</code>开头，因为这样很容易和实例私有方法、属性或对外暴露以<code>$</code>开头的方法、属性冲突。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1.与methods命名冲突</span>
<span class="token comment">// 抛出错误：Method name has already been defined as a data property.</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;data name&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">name</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;methods name&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2.与props命名冲突</span>
<span class="token comment">// 抛出错误：The data property name is already declared as a prop.</span>
<span class="token comment">//          Use prop default value instead.</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;data name&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3.不能以$和_开头</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">$data</span><span class="token operator">:</span> <span class="token string">&#39;$data&#39;</span>
      <span class="token literal-property property">_isVue</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li><strong>proxy代理</strong>：我们在之前已经介绍过<code>proxy</code>代理的作用，也讲过<code>proxy</code>代理<code>_props</code>的例子，这里代理<code>_data</code>跟代理<code>_props</code>是同样的道理。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello, Msg&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 代理前</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
<span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;_data&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 代理后</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
</code></pre></div><ul><li><strong>observe(data)</strong>：<code>observe</code>的作用是把传入值所有的属性(包括嵌套属性)递归的进行响应式<code>defineReactive</code>，我们会在之后的章节中详细介绍<code>observe</code>的实现原理，在<code>initData</code>中我们只要知道<code>observe(data)</code>会把<code>data</code>函数返回对象的所有属性全部变成响应式的即可。</li></ul><p>在分析完<code>initData</code>的实现后，我们可以得到<code>initData</code>的整体流程图。</p><div style="text-align:center;"><img src="`+p+'"></div>',20),c=[e];function l(u,k){return a(),s("div",null,c)}const r=n(o,[["render",l],["__file","data.html.vue"]]);export{r as default};
