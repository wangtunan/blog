import{_ as s,o as a,c as t,d as p}from"./app-522bbc04.js";const o="/blog/assets/computed-7d15fd01.png",e={};function c(u,n){return a(),t("div",null,n[0]||(n[0]=[p(`<h1 id="computed处理" tabindex="-1"><a class="header-anchor" href="#computed处理" aria-hidden="true">#</a> computed处理</h1><p>处理<code>computed</code>相关的逻辑，发生在<code>initState</code>中，接下来我们详细分析与<code>computed</code>相关的逻辑。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们知道<code>computed</code>计算属性是依赖于其它响应式变量的，因此我们分析<code>computed</code>的时候会分为两个步骤：<strong>computed初始化</strong>和<strong>computed更新</strong>。</p><h2 id="computed初始化" tabindex="-1"><a class="header-anchor" href="#computed初始化" aria-hidden="true">#</a> computed初始化</h2><p>在<code>initState()</code>方法中如果我们传递了<code>computed</code>，那么会调用<code>initComputed()</code>方法。<code>initComputed()</code>方法定义在<code>src/core/instance/state.js</code>文件中，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> computedWatcherOptions <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">initComputed</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">computed</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// $flow-disable-line</span>
  <span class="token keyword">const</span> watchers <span class="token operator">=</span> vm<span class="token punctuation">.</span>_computedWatchers <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token comment">// computed properties are just getters during SSR</span>
  <span class="token keyword">const</span> isSSR <span class="token operator">=</span> <span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userDef <span class="token operator">=</span> computed<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">const</span> getter <span class="token operator">=</span> <span class="token keyword">typeof</span> userDef <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">?</span> userDef <span class="token operator">:</span> userDef<span class="token punctuation">.</span>get
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> getter <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Getter is missing for computed property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isSSR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// create internal watcher for the computed property.</span>
      watchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
        vm<span class="token punctuation">,</span>
        getter <span class="token operator">||</span> noop<span class="token punctuation">,</span>
        noop<span class="token punctuation">,</span>
        computedWatcherOptions
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// component-defined computed properties are already defined on the</span>
    <span class="token comment">// component prototype. We only need to define computed properties defined</span>
    <span class="token comment">// at instantiation here.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">defineComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> userDef<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">.</span>$data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">The computed property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is already defined in data.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props <span class="token operator">&amp;&amp;</span> key <span class="token keyword">in</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">The computed property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is already defined as a prop.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li>在<code>initComputed()</code>方法中，首先定义了一个<code>_computedWatchers</code>的变量，这个变量的作用是缓存当前实例所有计算属性的<code>watcher</code>。</li><li>接下来遍历所有的<code>computed</code>，然后对每一个<code>computed</code>进行类型判断，如果是<code>function</code>类型，那么直接使用，如果是对象则代表是<code>get/set</code>形式，则直接取<code>get</code>。如果最后获取到的<code>computed</code>的<code>getter</code>为<code>null</code>，则在开发环境下提示错误。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 两种类型的计算属性</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;index&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">&#39;last&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fullName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;update:index&#39;</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上面代码为例，两种类型的<code>computed</code>获取到的<code>getter</code>分别如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// function类型</span>
<span class="token keyword">const</span> <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName
<span class="token punctuation">}</span>

<span class="token comment">// get/set类型</span>
<span class="token keyword">const</span> <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index
<span class="token punctuation">}</span>
</code></pre></div><ul><li>然后在非<code>SSR</code>服务端渲染的情况下，会在<code>_computedWatchers</code>上新建一个<code>Watcher</code>的实例。以上面代码为例，<code>_computedWatchers</code>在遍历完毕后，可以用如下代码表示：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 当前vm实例</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">_computedWatchers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fullName</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>最后、首先判断了当前遍历的<code>computed</code>是否已经在<code>vm</code>实例上，如果不在则调用<code>defineComputed()</code>方法，如果在还需要判断当前遍历的<code>computed</code>是否和<code>props</code>、<code>data</code>命名冲突，如果冲突则提示错误。</li></ul><p><strong>注意</strong>：对于子组件而言，这个时候当前遍历的<code>computed</code>已经在<code>vm</code>实例上了，所以并不会调用<code>defineComputed()</code>方法，我们从上面代码注释也能看的出来。对于子组件而言，真正<code>initComputed</code>的过程是发生在<code>Vue.extend</code>方法中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function-variable function">extend</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">extendOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token keyword">const</span> Super <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token keyword">const</span> <span class="token function-variable function">Sub</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Super</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
  <span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> Sub

  <span class="token comment">// 初始化子组件的computed</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initComputed</span><span class="token punctuation">(</span>Sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// extend.js中的initComputed定义</span>
<span class="token keyword">function</span> <span class="token function">initComputed</span> <span class="token punctuation">(</span><span class="token parameter">Comp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> computed <span class="token operator">=</span> Comp<span class="token punctuation">.</span>options<span class="token punctuation">.</span>computed
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">defineComputed</span><span class="token punctuation">(</span><span class="token class-name">Comp</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> key<span class="token punctuation">,</span> computed<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后<code>initComputed</code>调用的<code>defineComputed()</code>方法，就和我们现在的<code>defineComputed()</code>方法是同一个方法，它和此时的<code>initComputed()</code>方法定义在同一个位置(<code>src/core/instance/state.js</code>)：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> sharedPropertyDefinition <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">get</span><span class="token operator">:</span> noop<span class="token punctuation">,</span>
  <span class="token literal-property property">set</span><span class="token operator">:</span> noop
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineComputed</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">userDef</span><span class="token operator">:</span> Object <span class="token operator">|</span> Function</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> shouldCache <span class="token operator">=</span> <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> userDef <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sharedPropertyDefinition<span class="token punctuation">.</span>get <span class="token operator">=</span> shouldCache
      <span class="token operator">?</span> <span class="token function">createComputedGetter</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">createGetterInvoker</span><span class="token punctuation">(</span>userDef<span class="token punctuation">)</span>
    sharedPropertyDefinition<span class="token punctuation">.</span>set <span class="token operator">=</span> noop
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    sharedPropertyDefinition<span class="token punctuation">.</span>get <span class="token operator">=</span> userDef<span class="token punctuation">.</span>get
      <span class="token operator">?</span> shouldCache <span class="token operator">&amp;&amp;</span> userDef<span class="token punctuation">.</span>cache <span class="token operator">!==</span> <span class="token boolean">false</span>
        <span class="token operator">?</span> <span class="token function">createComputedGetter</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">createGetterInvoker</span><span class="token punctuation">(</span>userDef<span class="token punctuation">.</span>get<span class="token punctuation">)</span>
      <span class="token operator">:</span> noop
    sharedPropertyDefinition<span class="token punctuation">.</span>set <span class="token operator">=</span> userDef<span class="token punctuation">.</span>set <span class="token operator">||</span> noop
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>
      sharedPropertyDefinition<span class="token punctuation">.</span>set <span class="token operator">===</span> noop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sharedPropertyDefinition<span class="token punctuation">.</span><span class="token function-variable function">set</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Computed property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; was assigned to but it has no setter.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token keyword">this</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> sharedPropertyDefinition<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>defineComputed()</code>方法的逻辑很简单，根据不同的类型的<code>computed</code>，对<code>sharedPropertyDefinition</code>的<code>get</code>和<code>set</code>进行赋值。<code>sharedPropertyDefinition</code>在之前的<code>proxy</code>中，我们已经介绍过， 它就是<code>Object.defineProperty()</code>方法<code>descriptor</code>参数的一个共享配置。</p><p>在非<code>SSR</code>服务端渲染的情况，<code>sharedPropertyDefinition.get</code>的值是调用了<code>createComputedGetter()</code>方法，而在<code>SSR</code>服务端渲染的情况下是调用了<code>createGetterInvoker()</code>方法。我们在分析<code>Vue</code>源码的过程中，因为侧重于<code>Web</code>浏览器端的表现，因此我们接下来会分析<code>createComputedGetter()</code>方法的实现。<code>createComputedGetter()</code>方法和<code>defineComputed()</code>方法定义在同一个位置，代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createComputedGetter</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">computedGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_computedWatchers <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_computedWatchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        watcher<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        watcher<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> watcher<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到<code>createComputedGetter()</code>方法返回了一个函数，这个函数会在获取<code>computed</code>的时候被调用，例如组件渲染的时候：</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{fullName}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>根据以上代码我们再来看<code>computedGetter()</code>方法：组件渲染的时候会获取<code>fullName</code>计算属性，然后调用<code>computedGetter()</code>方法，在这个方法执行的时候，首先判断<code>watcher.dirty</code>属性，这个属性在<code>new Watcher()</code>的时候与我们传入的<code>const computedWatcherOptions = { lazy: true }</code>有关。在<code>Watcher</code>类的构造函数中，有这样一段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">,</span> isRenderWatcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为我们传入的<code>lazy</code>值为<code>true</code>，因此<code>watcher.dirty</code>条件判断为真，进行<code>watcher.evaluate()</code>计算。随后判断了<code>Dep.target</code>为真，则进行依赖收集<code>watcher.depend()</code>，关于依赖收集我们会在之后的章节详细介绍。我们只要知道，当在组件渲染的时候触发的<code>computed</code>依赖收集，收集的是<code>render watcher</code>。最后，我们看一下<code>watcher.evaluate()</code>方法的实现：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */</span>
  <span class="token function">evaluate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>evaluate()</code>方法它的实现非常简单，就是触发<code>computed</code>的<code>getter</code>进行求值，然后把<code>dirty</code>设置为<code>false</code>。</p><h2 id="computed更新" tabindex="-1"><a class="header-anchor" href="#computed更新" aria-hidden="true">#</a> computed更新</h2><p>在介绍完了<code>computed</code>的初始化后，我们在来看<code>computed</code>的更新过程，以下面例子为例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;{{fullName}}&lt;/div&gt;
    &lt;button @click=&quot;change&quot;&gt;change&lt;/button&gt;
  </span><span class="token template-punctuation string">\`</span></span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">total</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">&#39;last&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fullName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>total <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;pleace click&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">change</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>total<span class="token operator">++</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为<code>total</code>、<code>firstName</code>和<code>lastName</code>全部为响应式变量，所以<code>fullName</code>这个计算属性初始化的时候，此时<code>total</code>值为<code>0</code>，<code>fullName</code>计算属性有两个<code>Watcher</code>，其中一个是计算属性<code>watcher</code>，另外一个是渲染<code>watcher</code>。当点击按钮触发事件后，会触发<code>total</code>属性的<code>setter</code>方法，进而调用一个叫做<code>notify</code>的方法。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">set</span>： <span class="token keyword">function</span> <span class="token function">reactiveSetter</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略</span>
  dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中<code>notify()</code>是定义在<code>Dep</code>类中的一个方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
   <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">notify</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// stabilize the subscriber list first</span>
    <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// subs aren&#39;t sorted in scheduler if not running async</span>
      <span class="token comment">// we need to sort them now to make sure they fire in correct</span>
      <span class="token comment">// order</span>
      subs<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>id <span class="token operator">-</span> b<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> subs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      subs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>subs</code>就是我们收集起来的<code>watcher</code>，它是一个数组，对应上面案例的话它是一个长度为2的数组并且其中一个元素为<code>render watcher</code>，另一个元素为<code>computed watcher</code>。</li><li>在<code>notify()</code>方法调用时，会遍历<code>subs</code>数组，然后依次调用当前<code>watcher</code>的<code>update</code>方法。其中<code>update</code>方法是定义在<code>Watcher</code>类中的一个实例方法，代码如下：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略其它</span>
  <span class="token function">update</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* istanbul ignore else */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当第一次遍历时，此时的<code>watcher</code>为计算属性<code>watcher</code>，我们已经在前面介绍过计算属性<code>watcher</code>它的<code>this.lazy</code>值为<code>true</code>，因此会进行<code>this.dirty = true</code>。<br> 当第二次遍历时，此时的<code>watcher</code>为渲染<code>watcher</code>，对于渲染<code>watcher</code>而言，它的<code>lazy</code>值为<code>false</code>，<code>this.sync</code>为<code>false</code>，因此会调用<code>queueWatcher()</code>方法。我们目前不需要知道<code>queueWatcher</code>是怎么实现的，只需要知道<code>queueWatcher()</code>方法在调用时，会触发<code>updateComponent()</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到<code>updateComponent()</code>方法调用了<code>vm._update</code>方法，而这个方法的作用就是重新进行组件渲染，在组件渲染的过程中，会再次读取<code>fullName</code>的值，也就是说会调用下面这段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">fullName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>total <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;pleace click&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为此时的<code>total</code>值为<code>1</code>，所以会返回<code>this.firstName + this.lastName</code>的值，而<code>firstName</code>和<code>lastName</code>又是定义在<code>data</code>中的响应式变量，会依次触发<code>firstName</code>和<code>lastName</code>的<code>getter</code>，然后进行依赖收集。在组件渲染完毕后，<code>fullName</code>的依赖数组<code>subs</code>此时会有四个<code>watcher</code>，分别是三个计算属性<code>watcher</code>和一个渲染<code>watcher</code>。无论这三个计算属性<code>watcher</code>哪一个值更新了，都会再次重复以上的流程，这就是<code>computed</code>更新的过程。</p><p>在分析完<code>computed</code>的相关流程后，我们可以得到如下流程图</p><div style="text-align:center;"><img src="`+o+'"></div>',46)]))}const k=s(e,[["render",c],["__file","computed.html.vue"]]);export{k as default};
