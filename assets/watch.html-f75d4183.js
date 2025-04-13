import{_ as a,o as s,c as p,d as t}from"./app-c9515a38.js";const o={};function e(c,n){return s(),p("div",null,n[0]||(n[0]=[t(`<h1 id="watch处理" tabindex="-1"><a class="header-anchor" href="#watch处理" aria-hidden="true">#</a> watch处理</h1><p>在介绍完处理<code>computed</code>相关的逻辑后，我们接下来看<code>watch</code>是如何处理的。</p><h2 id="watch初始化" tabindex="-1"><a class="header-anchor" href="#watch初始化" aria-hidden="true">#</a> watch初始化</h2><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>watch <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>watch <span class="token operator">!==</span> nativeWatch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initWatch</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>watch<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，处理<code>watch</code>的逻辑发生在<code>initWatch()</code>方法中，在这个方法调用之前，首先对<code>watch</code>做了判断，其中<code>nativeWatch</code>是定义在<code>src/core/util/env.js</code>中的一个常量：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Firefox has a &quot;watch&quot; function on Object.prototype...</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> nativeWatch <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>watch
</code></pre></div><p>然后，让我们来看一下<code>initWatch</code>的实现，它定义在<code>src/core/instance/state.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initWatch</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">watch</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> watch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> handler <span class="token operator">=</span> watch<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> handler<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> handler<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，<code>initWatch()</code>方法的实现非常简单，首先对<code>watch</code>做了判断，如果是数组则遍历这个数组调用<code>createWatcher()</code>方法，如果不是则直接调用<code>createWatcher()</code>。按照<code>watch</code>的使用规则，我们有如下几种常见的写法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">nested</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token string">&#39;b&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">name</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nested</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">handler</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接着，我们需要来看一下<code>createWatcher()</code>函数的具体实现：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createWatcher</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
  <span class="token literal-property property">handler</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> Object</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    options <span class="token operator">=</span> handler
    handler <span class="token operator">=</span> handler<span class="token punctuation">.</span>handler
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> handler <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    handler <span class="token operator">=</span> vm<span class="token punctuation">[</span>handler<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> vm<span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>createWatcher()</code>方法的主要作用就是进行<code>watch</code>参数规范化，然后将规范化后的参数传递给<code>vm.$watch()</code>。</li><li>在<code>createWatcher()</code>中首先判断了<code>handler</code>参数是否为普通对象，如果是普通对象则代表是如下形式定义的<code>watch</code>：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nested</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">handler</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>此时，应该把<code>handler</code>赋值给可选的<code>options</code>参数，然后<code>handler</code>赋值为真正的回调函数。</p><ul><li>接着，对<code>handler</code>进行了类型判断，如果是<code>string</code>类型则把此时<code>vm[handler]</code>赋值给它。根据这段代码的逻辑，意味着我们可以选择把<code>watch</code>回调函数定义在<code>methods中</code>：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;nameWatchCallback&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">nameWatchCallback</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>最后，把规范化后的参数传递给<code>vm.$watch()</code>。关于<code>$watch()</code>何时挂载到<code>Vue.prototype</code>上，我们已经在之前介绍过了，它发生在<code>stateMixin</code>中。</li></ul><p>在分析完<code>createWatcher()</code>方法实现逻辑后，我们接着来看<code>$watch()</code>方法的具体实现逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$watch</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
  <span class="token literal-property property">cb</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> Object</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  options <span class="token operator">=</span> options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  options<span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> watcher<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">handleError</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for immediate watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>watcher<span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">unwatchFn</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    watcher<span class="token punctuation">.</span><span class="token function">teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以发现，<code>$watch</code>方法主要做两件事情：<strong>创建Watcher实例</strong>和<strong>返回unwatchFn函数</strong>，接下来我们分别对这两部分的逻辑进行详细的解释。</p><h2 id="创建watcher实例" tabindex="-1"><a class="header-anchor" href="#创建watcher实例" aria-hidden="true">#</a> 创建Watcher实例</h2><p>我们先来看一下<code>Watcher</code>构造函数的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 精简代码</span>
<span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">,</span> isRenderWatcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isRenderWatcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_watcher <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>
    vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>deep
      <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>user
      <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy
      <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>sync
      <span class="token keyword">this</span><span class="token punctuation">.</span>before <span class="token operator">=</span> options<span class="token punctuation">.</span>before
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们从构造函数中可以看到，当实例化一个<code>watch</code>的时候，会根据传递的<code>options</code>来处理<code>deep</code>、<code>user</code>、<code>lazy</code>、<code>sync</code>以及<code>before</code>属性。<code>watcher</code>根据不同的用法，有几种不同的分类：</p><ul><li><code>render watcher</code>：渲染<code>watcher</code>，例如当在<code>template</code>模板中使用<code>{{}}</code>语法读取一个变量的时候，此时这个变量收集的依赖就是<code>render watcher</code>，当这个变量值更新的时候会触发<code>render watcher</code>进行组件的重新渲染。是否为渲染<code>warcher</code>，使用构造函数参数<code>isRenderWatcher</code>为<code>true</code>进行区分。</li><li><code>computed watcher</code>：计算属性<code>watcher</code>，当我们在定义计算属性的时候，计算属性收集的依赖就是另外一个或者多个变量，当其中一个变量的值发生变量，就会触发计算属性重新进行求值。是否为计算属性<code>watcher</code>，使用<code>options.lazy</code>为<code>true</code>进行区分。</li><li><code>user watcher</code>：用户自定义<code>watcher</code>，多发生在<code>this.$watch</code>或者组件<code>watch</code>选择配置中，此时收集的依赖就是变量自身，当变量的值发生变化的时候，就会调用<code>watch</code>提供的回调函数。是否为用户自定义<code>watcher</code>，使用<code>options.user</code>为<code>true</code>进行区分。</li></ul><h2 id="返回unwatchfn函数" tabindex="-1"><a class="header-anchor" href="#返回unwatchfn函数" aria-hidden="true">#</a> 返回unwatchFn函数</h2><p>我们在构造函数中可以发现，它定义了一个<code>_watchers</code>变量，然后在每次实例化的时候，把自身添加到这个数组中，这样做的目的是为了方便清除依赖。在之前的介绍中，我们知道<code>$watch</code>返回了一个<code>unwatchFn</code>函数，它用来取消监听。接下来，我们看一下<code>teardown()</code>方法的具体实现。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Watcher类精简代码</span>
<span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">teardown</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// remove self from vm&#39;s watcher list</span>
      <span class="token comment">// this is a somewhat expensive operation so we skip it</span>
      <span class="token comment">// if the vm is being destroyed.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_isBeingDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
      <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">removeSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Dep类精简代码</span>
<span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">removeSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">,</span> sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>teardown()</code>方法的实现很简单，就是从<code>deps</code>数组中移除当前的<code>watcher</code>，其中<code>deps</code>存储的是<code>Dep</code>实例。</p>`,31)]))}const u=a(o,[["render",e],["__file","watch.html.vue"]]);export{u as default};
