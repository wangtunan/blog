import{_ as n,o as s,c as a,d as p}from"./app-01b6e8b2.js";const t={},o=p(`<h1 id="合并策略" tabindex="-1"><a class="header-anchor" href="#合并策略" aria-hidden="true">#</a> 合并策略</h1><p>在这一节合并策略中，我们主要分三个步骤来说明：<strong>配置合并的背景</strong>、<strong>配置合并的场景</strong>以及<strong>合并策略</strong>。</p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>我们可能会很好奇，为什么要进行配置合并？这是因为<code>Vue</code>内部存在一些默认的配置，在初始化的时候又允许我们提供一些自定义配置，这是为了在不同的场景下达到定制化个性需求的目的。纵观一些优秀的开源库、框架它们的设计理念几乎都是类似的。</p><p>我们举例来说明一下配置合并的背景：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;global created mixin&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;global mounted mixin&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>假设我们使用<code>Vue.mixin</code>方法全局混入了两个生命周期配置<code>created</code>和<code>mounted</code>，那么在我们的应用中，这两个生命周期配置都会反应到各个实例上去，无论是根实例还是各种组件实例。但对于根实例或者组件实例而言，它们也可能会拥有自己的<code>created</code>或<code>mounted</code>配置，如果不进行合理的配置合并，那么会出现一些意料之外的问题。</p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><p>要进行配置合并的场景不止一两处，我们主要介绍以下四种场景：</p><ul><li><strong>vue-loader</strong>：在之前我们提到过当我们使用<code>.vue</code>文件的形式进行开发的时候，由于<code>.vue</code>属于特殊的文件扩展，<code>webpack</code>无法原生识别，因此需要对应的<code>loader</code>去解析，它就是<code>vue-loader</code>。假如我们撰写以下<code>HelloWorld.vue</code>组件，然后在别的地方去引入它。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// HelloWorld.vue</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;HelloWorld&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello, world&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// App.vue</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;@/components/HelloWorld.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    HelloWorld
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为我们在<code>HelloWorld.vue</code>文件中只提供了<code>name</code>和<code>data</code>两个配置选项，但真正调试的时候我们发现<code>HelloWorld</code>组件的实例上多了很多额外的属性，这是因为<code>vue-loader</code>帮我们默认添加的。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> HelloWorld <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">beforeCreate</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">beforeDestroy</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;HelloWorld&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello, world&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以发现<code>vue-loader</code>默认添加的有<code>beforeCreate</code>和<code>beforeDestroy</code>两个配置，如果我们组件自身也提供了这两个配置的话，这种情况必须进行配置合并。</p><ul><li><strong>extend</strong>：在上一节我们介绍<code>createComponent</code>的时候，我们知道子组件会继承大<code>Vue</code>上的一些属性或方法，假设我们全局注册了一个组件。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;@/components/HelloWorld.vue&#39;</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;HelloWorld&#39;</span><span class="token punctuation">,</span> HelloWorld<span class="token punctuation">)</span>
</code></pre></div><p>当我们在其它组件中也注册了一些组件，这样大<code>Vue</code>上的<code>components</code>就要和组件中的<code>components</code>进行合理的配置合并。</p><ul><li><strong>mixin</strong>：在前面的<strong>配置合并背景</strong>小节中，我们使用<code>Vue.mixin</code>全局混入了两个生命周期配置，这属于<code>mixin</code>配置合并的范围，我们来举例另外一种组件内的<code>mixin</code>混入场景：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// mixin定义</span>
<span class="token keyword">const</span> sayMixin <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello mixin created&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello mixin mounted&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 组件引入mixin</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span>sayMixin<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;app component created&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;app component mounted&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当在<code>App.vue</code>组件中提供<code>mixins</code>选择的时候，因为在我们定义的<code>sayMixin</code>也提供了<code>created</code>和<code>mounted</code>两个生命周期配置，因此这种情况下也要进行配置合并。又因为<code>mixins</code>接受一个数组选项，假如我们传递了多个已经定义的<code>mixin</code>，而这些<code>mixin</code>又可能会存在提供了相同配置的情况，因此同样需要进行配置合并。</p><p><strong>注意</strong>：<code>Vue.mixin</code>全局<code>API</code>方法在内部调用了<code>mergeOptions</code>来进行混入，它的定义位置我们在之前的<code>initGlobalAPI</code>小节中提到过，其实现代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mergeOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initMixin</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span><span class="token function-variable function">mixin</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">mixin</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">,</span> mixin<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li><strong>this._init</strong>：严格意义上来说，这里其实并不算是一个配置合并的场景，而应该是一种配置合并的手段。对于第一种<code>vue-loader</code>和第二种<code>extend</code>的场景，它们在必要的场景下也会在<code>this._init</code>进行配置合并，例如在子组件实例化的时候，它在构造函数中就调用了<code>this._init</code>:</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">Sub</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略其它</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>_isComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// optimize internal component instantiation</span>
    <span class="token comment">// since dynamic options merging is pretty slow, and none of the</span>
    <span class="token comment">// internal component options needs special treatment.</span>
    <span class="token function">initInternalComponent</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
      <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span>
      options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略其它</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="合并策略-1" tabindex="-1"><a class="header-anchor" href="#合并策略-1" aria-hidden="true">#</a> 合并策略</h2><p>我们先来看看合并策略的代码，它是定义在<code>src/core/util/options.js</code>文件中，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mergeOptions</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parent</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">child</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Object <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">checkComponents</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> child <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    child <span class="token operator">=</span> child<span class="token punctuation">.</span>options
  <span class="token punctuation">}</span>

  <span class="token function">normalizeProps</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token function">normalizeInject</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token function">normalizeDirectives</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>

  <span class="token comment">// Apply extends and mixins on the child options,</span>
  <span class="token comment">// but only if it is a raw options object that isn&#39;t</span>
  <span class="token comment">// the result of another mergeOptions call.</span>
  <span class="token comment">// Only merged options has the _base property.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>child<span class="token punctuation">.</span>_base<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>extends<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      parent <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> child<span class="token punctuation">.</span>extends<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>mixins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> child<span class="token punctuation">.</span>mixins<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parent <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> child<span class="token punctuation">.</span>mixins<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">let</span> key
  <span class="token keyword">for</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">mergeField</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> child<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mergeField</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">mergeField</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> strat <span class="token operator">=</span> strats<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">||</span> defaultStrat
    options<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">strat</span><span class="token punctuation">(</span>parent<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> child<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> vm<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> options
<span class="token punctuation">}</span>
</code></pre></div><p>我们先忽略<code>mergeOptions</code>方法中其它的代码，来看最核心的<code>mergeField</code>，在这个方法里面，它会根据不同的<code>key</code>，调用策略对象<code>strats</code>中的策略方法，然后把合并完的配置再赋值到<code>options</code>上，<code>strats</code>策略对象每个<code>key</code>的具体定义我们会在之后对应的章节中介绍。</p><h3 id="默认合并策略" tabindex="-1"><a class="header-anchor" href="#默认合并策略" aria-hidden="true">#</a> 默认合并策略</h3><p>在<code>mergeField</code>方法中，我们看到当传入的<code>key</code>没有对应的策略方法时，会使用<code>defaultStrat</code>默认合并策略，它的定义代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">defaultStrat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">childVal</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token keyword">return</span> childVal <span class="token operator">===</span> <span class="token keyword">undefined</span>
    <span class="token operator">?</span> parentVal
    <span class="token operator">:</span> childVal
<span class="token punctuation">}</span>
</code></pre></div><p><code>defaultStrat</code>默认合并策略的代码非常简单，即：简单的覆盖已有值，例如：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">defaultStrat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">parentVal<span class="token punctuation">,</span> childVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> childVal <span class="token operator">===</span> <span class="token keyword">undefined</span>
    <span class="token operator">?</span> parentVal
    <span class="token operator">:</span> childVal
<span class="token punctuation">}</span>
<span class="token keyword">const</span> parent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;parent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;child&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&#39;广州&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">mergeOptions</span> <span class="token punctuation">(</span><span class="token parameter">parent<span class="token punctuation">,</span> child</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">mergeField</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> child<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>parent<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mergeField</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">mergeField</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    options<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">defaultStrat</span><span class="token punctuation">(</span>parent<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> child<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> options
<span class="token punctuation">}</span>
<span class="token keyword">const</span> $options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> child<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>$options<span class="token punctuation">)</span> <span class="token comment">// { age: 23, name: &#39;child&#39;, sex: 1, address: &#39;广州&#39; }</span>
</code></pre></div><p>代码分析：在以上案例中，<code>age</code>和<code>name</code>都存在于<code>parent</code>和<code>child</code>对象中，因为<code>child.age</code>值为<code>undefined</code>，所以最后取<code>parent.age</code>值，这种情况也适用于<code>sex</code>属性的合并。因为<code>child.name</code>值不为<code>undefined</code>，所以最后取<code>child.name</code>的值，这种情况也适用于<code>address</code>属性的合并。</p><p><strong>注意</strong>：如果你想针对某一个选项修改它的默认合并策略，可以使用<code>Vue.config.optionMergeStrategies</code>去配置，例如：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 自定义el选择的合并策略，只取第二个参数的。</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>optionMergeStrategies<span class="token punctuation">.</span>el <span class="token operator">=</span> <span class="token punctuation">(</span>toVal<span class="token punctuation">,</span> fromVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> fromVal
<span class="token punctuation">}</span>
</code></pre></div><h3 id="el和propsdata合并" tabindex="-1"><a class="header-anchor" href="#el和propsdata合并" aria-hidden="true">#</a> el和propsData合并</h3><p>对于<code>el</code>和<code>propsData</code>属性的合并，在<code>Vue</code>中使用了默认合并策略，其定义代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> strats <span class="token operator">=</span> config<span class="token punctuation">.</span>optionMergeStrategies
<span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  strats<span class="token punctuation">.</span>el <span class="token operator">=</span> strats<span class="token punctuation">.</span><span class="token function-variable function">propsData</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">parent<span class="token punctuation">,</span> child<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...省略其它</span>
    <span class="token keyword">return</span> <span class="token function">defaultStrat</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> child<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于<code>el</code>和<code>propsData</code>这两个选项来说，使用默认合并策略的原因很简单，因为<code>el</code>和<code>propsData</code>只允许有一份。</p><h3 id="生命周期hooks合并" tabindex="-1"><a class="header-anchor" href="#生命周期hooks合并" aria-hidden="true">#</a> 生命周期hooks合并</h3><p>对于生命周期钩子函数而言，它们都是通过<code>mergeHook</code>方法来合并的，<code>strats</code>策略对象上关于<code>hooks</code>属性定义代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">LIFECYCLE_HOOKS</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;beforeCreate&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;created&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;beforeMount&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;mounted&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;beforeUpdate&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;updated&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;beforeDestroy&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;destroyed&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;activated&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;deactivated&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;errorCaptured&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;serverPrefetch&#39;</span>
<span class="token punctuation">]</span>

<span class="token constant">LIFECYCLE_HOOKS</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">hook</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  strats<span class="token punctuation">[</span>hook<span class="token punctuation">]</span> <span class="token operator">=</span> mergeHook
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>我们接下来看一下<code>mergeHook</code>是如何实现的，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeHook</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>Function<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> <span class="token operator">?</span>Function <span class="token operator">|</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>Function<span class="token operator">&gt;</span></span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>Function<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> childVal
    <span class="token operator">?</span> parentVal
      <span class="token operator">?</span> parentVal<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>childVal<span class="token punctuation">)</span>
      <span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>childVal<span class="token punctuation">)</span>
        <span class="token operator">?</span> childVal
        <span class="token operator">:</span> <span class="token punctuation">[</span>childVal<span class="token punctuation">]</span>
    <span class="token operator">:</span> parentVal
  <span class="token keyword">return</span> res
    <span class="token operator">?</span> <span class="token function">dedupeHooks</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token operator">:</span> res
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">dedupeHooks</span> <span class="token punctuation">(</span><span class="token parameter">hooks</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> hooks<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>hooks<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>hooks<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到在<code>mergeHook</code>方法中，它用到了三层三目运算来判断，首先判断了是否有<code>childVal</code>，如果没有则直接返回<code>parentVal</code>；如果有，再判断<code>parentVal</code>有没有，如果有则一定是数组形式，这个时候直接把<code>childVal</code>添加到<code>parentVal</code>数组的末尾；如果没有，则需要判断一下<code>childVal</code>是不是数组，如果不是数组则转成数组，如果已经是数组了，则直接返回。</p><p>在最后还判断了<code>res</code>，然后满足条件则调用<code>dedupeHooks</code>，这个方法的作用很简单，就是剔除掉数组中的重复项。最后，我们根据以上逻辑撰写几个案例来说明。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 情况一</span>
<span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created1</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token keyword">undefined</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created1</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>

<span class="token comment">// 情况二</span>
<span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created1</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created2</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created1</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">created2</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>

<span class="token comment">// 情况三</span>
<span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token keyword">undefined</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created2</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token function">created2</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre></div><p>我们再来看一个比较特殊的场景：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// mixin.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> sayMixin <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;say mixin created&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> helloMixin <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello mixin created&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// App.vue</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> sayMixin<span class="token punctuation">,</span> helloMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./mixin.js&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span>sayMixin<span class="token punctuation">,</span> helloMixin<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;component created&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行顺序</span>
<span class="token comment">// say mixin created</span>
<span class="token comment">// hello mixin created</span>
<span class="token comment">// component created</span>
</code></pre></div><p>代码分析：我们可以看到<code>mixins</code>里面的<code>created</code>生命周期函数会优先于组件自身提供的<code>created</code>生命周期函数，这是因为在遍历<code>parent</code>和<code>child</code>的属性之前，会优先处理<code>extends</code>和<code>mixins</code>选项。以<code>mixins</code>为例，它会首先遍历我们提供的<code>mixins</code>数组，然后依次把这些配置按照规则合并到<code>parent</code>上，最后在遍历<code>child</code>的属性时，才会把其自身的配置合并对应的位置，在我们提供的例子当中，自身提供的<code>created</code>会使用数组<code>concat</code>方法添加到数组的末尾。当组件触发<code>created</code>生命周期的时候，会按照数组顺序依次调用。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>child<span class="token punctuation">.</span>_base<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>extends<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    parent <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> child<span class="token punctuation">.</span>extends<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>mixins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> child<span class="token punctuation">.</span>mixins<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      parent <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> child<span class="token punctuation">.</span>mixins<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="data和provide合并" tabindex="-1"><a class="header-anchor" href="#data和provide合并" aria-hidden="true">#</a> data和provide合并</h3><p>对于<code>data</code>和<code>provide</code>而言，它们最后都使用<code>mergeDataOrFn</code>来合并，只不过对于<code>data</code>选项比较特殊，它需要单独包裹一层，它们在<code>strats</code>策略对象上的属性定义如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>strats<span class="token punctuation">.</span><span class="token function-variable function">data</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Function <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>childVal <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> childVal <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token string">&#39;The &quot;data&quot; option should be a function &#39;</span> <span class="token operator">+</span>
        <span class="token string">&#39;that returns a per-instance value in component &#39;</span> <span class="token operator">+</span>
        <span class="token string">&#39;definitions.&#39;</span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>

      <span class="token keyword">return</span> parentVal
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">mergeDataOrFn</span><span class="token punctuation">(</span>parentVal<span class="token punctuation">,</span> childVal<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">mergeDataOrFn</span><span class="token punctuation">(</span>parentVal<span class="token punctuation">,</span> childVal<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
strats<span class="token punctuation">.</span>provide <span class="token operator">=</span> mergeDataOrFn
</code></pre></div><p>在合并<code>data</code>的包裹函数中，对<code>childVal</code>进行了检验，如果不是函数类型，提示错误信息并直接返回。如果时，再调用<code>mergeDataOrFn</code>方法来合并。接下来，我们来看一下<code>mergeDataOrFn</code>方法的具体实现逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mergeDataOrFn</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Function <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// in a Vue.extend merge, both should be functions</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>childVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> parentVal
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>parentVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> childVal
    <span class="token punctuation">}</span>
    <span class="token comment">// when parentVal &amp; childVal are both present,</span>
    <span class="token comment">// we need to return a function that returns the</span>
    <span class="token comment">// merged result of both functions... no need to</span>
    <span class="token comment">// check if parentVal is a function here because</span>
    <span class="token comment">// it has to be a function to pass previous merges.</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">mergedDataFn</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">mergeData</span><span class="token punctuation">(</span>
        <span class="token keyword">typeof</span> childVal <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">?</span> <span class="token function">childVal</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token operator">:</span> childVal<span class="token punctuation">,</span>
        <span class="token keyword">typeof</span> parentVal <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">?</span> <span class="token function">parentVal</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token operator">:</span> parentVal
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">mergedInstanceDataFn</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// instance merge</span>
      <span class="token keyword">const</span> instanceData <span class="token operator">=</span> <span class="token keyword">typeof</span> childVal <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
        <span class="token operator">?</span> <span class="token function">childVal</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
        <span class="token operator">:</span> childVal
      <span class="token keyword">const</span> defaultData <span class="token operator">=</span> <span class="token keyword">typeof</span> parentVal <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
        <span class="token operator">?</span> <span class="token function">parentVal</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
        <span class="token operator">:</span> parentVal
      <span class="token keyword">if</span> <span class="token punctuation">(</span>instanceData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">mergeData</span><span class="token punctuation">(</span>instanceData<span class="token punctuation">,</span> defaultData<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> defaultData
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>mergeDataOrFn</code>方法中，我们可以发现它根据<code>vm</code>进行了区分，但这两块的合并思路是一致的：如果<code>parentVal</code>和<code>childVal</code>是函数类型，则分别调用这个函数，然后合并它们返回的对象，这种情况主要针对<code>data</code>合并。对于<code>provide</code>而言，它不需要是<code>function</code>类型，因此直接使用<code>mergeData</code>来合并即可。我们再回过头来看，为什么要区分<code>vm</code>，这是因为要处理兼容<code>provide</code>的情况，当传递<code>provide</code>的时候，因为这个属性是在父级定义的，因此<code>this</code>属于父级而不是当前组件<code>vm</code>。</p><p>最后来看一下<code>mergeData</code>方法的实现代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">to</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">from</span><span class="token operator">:</span> <span class="token operator">?</span>Object</span><span class="token punctuation">)</span><span class="token operator">:</span> Object <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>from<span class="token punctuation">)</span> <span class="token keyword">return</span> to
  <span class="token keyword">let</span> key<span class="token punctuation">,</span> toVal<span class="token punctuation">,</span> fromVal

  <span class="token keyword">const</span> keys <span class="token operator">=</span> hasSymbol
    <span class="token operator">?</span> Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>from<span class="token punctuation">)</span>
    <span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>from<span class="token punctuation">)</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token comment">// in case the object is already observed...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">)</span> <span class="token keyword">continue</span>
    toVal <span class="token operator">=</span> to<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    fromVal <span class="token operator">=</span> from<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">set</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> key<span class="token punctuation">,</span> fromVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      toVal <span class="token operator">!==</span> fromVal <span class="token operator">&amp;&amp;</span>
      <span class="token function">isPlainObject</span><span class="token punctuation">(</span>toVal<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token function">isPlainObject</span><span class="token punctuation">(</span>fromVal<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mergeData</span><span class="token punctuation">(</span>toVal<span class="token punctuation">,</span> fromVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> to
<span class="token punctuation">}</span>
</code></pre></div><p><code>mergeData</code>和前面提到<code>extend</code>方法所做的事情几乎是一样的，只不过由于<code>data</code>中所有的属性(包括嵌套对象的属性)，我们需要使用<code>set</code>处理成响应式的。<code>set</code>方法就是<code>Vue.set</code>或<code>this.$set</code>方法的本体，它定义在<code>src/core/observer/index.js</code>文件中，我们之前在响应式章节提到过。</p><h3 id="components、directives和filters合并" tabindex="-1"><a class="header-anchor" href="#components、directives和filters合并" aria-hidden="true">#</a> components、directives和filters合并</h3><p>对于<code>components</code>、<code>directives</code>以及<code>filters</code>的合并是同一个<code>mergeAssets</code>方法，<code>strats</code>策略对象上关于这几种属性定义代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">ASSET_TYPES</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;component&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;directive&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;filter&#39;</span>
<span class="token punctuation">]</span>
<span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  strats<span class="token punctuation">[</span>type <span class="token operator">+</span> <span class="token string">&#39;s&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> mergeAssets
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>接下来，我们看一下<code>mergeAssets</code>具体定义：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeAssets</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span><span class="token number">1</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Object <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>parentVal <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>childVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">assertObjectType</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> childVal<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">extend</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> childVal<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>mergeAssets</code>方法的代码不是很多，逻辑也很清晰，首先以<code>parentVal</code>创建一个<code>res</code>原型，如果<code>childVal</code>没有，则直接返回这个<code>res</code>原型；如果有，则使用<code>extend</code>把<code>childVal</code>上的所有属性扩展到<code>res</code>原型上。有一点需要注意，<code>extend</code>不是我们之前提到的<code>Vue.extend</code>或者<code>this.$extend</code>，它是定义在<code>src/shared/utils.js</code>文件中的一个方法，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">extend</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">to</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">_from</span><span class="token operator">:</span> <span class="token operator">?</span>Object</span><span class="token punctuation">)</span><span class="token operator">:</span> Object <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> _from<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    to<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> _from<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> to
<span class="token punctuation">}</span>
</code></pre></div><p>我们撰写一个简单的例子来说明一下<code>extend</code>方法的用法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&#39;广州&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> extendObj <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span>obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>extendObj<span class="token punctuation">)</span> <span class="token comment">// { name: &#39;AAA&#39;, age: 23, sex: &#39;男&#39;, address: &#39;广州&#39; }</span>
</code></pre></div><p>在介绍完<code>extend</code>方法后，我们回到<code>mergeAssets</code>方法，我们同样举例说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;@/components/HelloWorld.vue&#39;</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;HelloWorld&#39;</span><span class="token punctuation">,</span> HelloWorld<span class="token punctuation">)</span>

<span class="token comment">// App.vue</span>
<span class="token keyword">import</span> Test <span class="token keyword">from</span> <span class="token string">&#39;@/components/test.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Test
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>main.js</code>入口文件中，我们全局定义了一个<code>HelloWorld</code> 全局组件，然后在<code>App.vue</code>中又定义了一个<code>Test</code>局部组件，当代码运行到<code>mergeAssets</code>的时候，部分参数如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">HelloWorld</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">KeepAlive</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">Transition</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">TransitionGroup</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">Test</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为<code>parentVal</code>和<code>childVal</code>都有值，因此会调用<code>extend</code>方法，调用前和调用后的<code>res</code>如下所示：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 调用前</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">__proto__</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">HelloWorld</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">KeepAlive</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Transition</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">TransitionGroup</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// extend调用后</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">Test</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">__proto__</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">HelloWorld</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">KeepAlive</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Transition</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">TransitionGroup</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>假如我们在<code>App.vue</code>组件中都使用了这两个组件，如下：</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>hello-world</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>在<code>App.vue</code>组件渲染的过程中，当编译到<code>&lt;test /&gt;</code>时，会在其<code>components</code>选项中查找组件，马上在自身属性上找到了<code>test.vue</code>。然后当编译到<code>&lt;hello-world /&gt;</code>的时候，在自身对象上找不到这个属性，根据原型链的规则会在原型上去找，然后在<code>__proto__</code>上找到了<code>HelloWorld.vue</code>组件，两个组件得以顺利的被解析和渲染。</p><p>对于另外两个选项<code>directives</code>和<code>filters</code>，它们跟<code>components</code>是一样的处理逻辑。</p><h3 id="watch合并" tabindex="-1"><a class="header-anchor" href="#watch合并" aria-hidden="true">#</a> watch合并</h3><p>对于<code>watch</code>选项而言，它使用的合并方法是单独定义的，其在<code>strats</code>策略对象上的属性定义如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>strats<span class="token punctuation">.</span><span class="token function-variable function">watch</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Object <span class="token punctuation">{</span>
  <span class="token comment">// work around Firefox&#39;s Object.prototype.watch...</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>parentVal <span class="token operator">===</span> nativeWatch<span class="token punctuation">)</span> parentVal <span class="token operator">=</span> <span class="token keyword">undefined</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>childVal <span class="token operator">===</span> nativeWatch<span class="token punctuation">)</span> childVal <span class="token operator">=</span> <span class="token keyword">undefined</span>
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>childVal<span class="token punctuation">)</span> <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>parentVal <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertObjectType</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> childVal<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>parentVal<span class="token punctuation">)</span> <span class="token keyword">return</span> childVal
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">extend</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> parentVal<span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> childVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> parent <span class="token operator">=</span> ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">const</span> child <span class="token operator">=</span> childVal<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      parent <span class="token operator">=</span> <span class="token punctuation">[</span>parent<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> parent
      <span class="token operator">?</span> parent<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
      <span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span> <span class="token operator">?</span> child <span class="token operator">:</span> <span class="token punctuation">[</span>child<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到<code>watch</code>配置的合并与<code>hooks</code>合并的思路几乎差不多，只是多了一些微小的差异，当<code>childVal</code>没有时，直接返回按照<code>parentVal</code>创建的原型，类似的当<code>parentVal</code>没有时，直接返回<code>childVal</code>，注意这里因为是自身的配置，因此不需要像<code>parentVal</code>那样创建并一个原型。当<code>parentVal</code>和<code>childVal</code>都存在时，首先把<code>parentVal</code>上的属性全部扩展到<code>ret</code>对象上，然后遍历<code>childVal</code>的属性键。在遍历的过程中如果<code>parent</code>值不为数组形式，则手动处理成数组形式，然后把<code>child</code>使用数组<code>concat</code>方法添加到数组的末尾。以上代码分析，可以使用下面的示例来说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 情况一</span>
<span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">msg</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;parent watch msg&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token keyword">undefined</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">__proto__</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">msg</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;parent watch msg&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 情况二</span>
<span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token keyword">undefined</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">msg</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;child watch msg&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">msg</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;child watch msg&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 情况三</span>
<span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">msg</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;parent watch msg&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">msg</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;child watch msg&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;parent watch msg&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;child watch msg&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>与<code>hooks</code>一样，如果在<code>mixins</code>里面也提供了与自身组件一样的<code>watch</code>，那么会优先执行<code>mixins</code>里面的<code>watch</code>，然后在执行自身组件中的<code>watch</code>。</p><h3 id="props、methods、inject和computed合并" tabindex="-1"><a class="header-anchor" href="#props、methods、inject和computed合并" aria-hidden="true">#</a> props、methods、inject和computed合并</h3><p><code>props</code>、<code>methods</code>、<code>inject</code>和<code>computed</code>和之前我们提到的几种配置有点不一样，这几种配置有一个共同点：不允许存在相同的属性，例如我们在<code>methods</code>上提供的属性，不管来自于哪里，我们只需要把所有属性合并在一起即可。</p><p>接下来我们来看一下这几个属性在<code>strats</code>策略对象上的具体定义：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>strats<span class="token punctuation">.</span>props <span class="token operator">=</span>
strats<span class="token punctuation">.</span>methods <span class="token operator">=</span>
strats<span class="token punctuation">.</span>inject <span class="token operator">=</span>
strats<span class="token punctuation">.</span><span class="token function-variable function">computed</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parentVal</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Object <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>childVal <span class="token operator">&amp;&amp;</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertObjectType</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> childVal<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>parentVal<span class="token punctuation">)</span> <span class="token keyword">return</span> childVal
  <span class="token keyword">const</span> ret <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token function">extend</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> parentVal<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>childVal<span class="token punctuation">)</span> <span class="token function">extend</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> childVal<span class="token punctuation">)</span>
  <span class="token keyword">return</span> ret
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，在其实现方法中代码并不是很复杂，仅仅使用到<code>extend</code>方法合并对象属性即可。当<code>parentVal</code>没有时，直接返回<code>childVal</code>，这里也不需要创建并返回一个原型，原因在上面提到过。如果<code>parentVal</code>有，则先创建一个原型，再使用<code>extend</code>把<code>parentVal</code>上的所有属性全部扩展到<code>ret</code>对象上。最后再判断<code>childVal</code>，如果有则再使用<code>extend</code>把<code>childVal</code>上的对象扩展到<code>ret</code>上，如果没有，则直接返回。以上代码分析，我们举例说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> parentVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> childVal <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&#39;广州&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&#39;广州&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,92),e=[o];function c(l,u){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","merge.html.vue"]]);export{r as default};
