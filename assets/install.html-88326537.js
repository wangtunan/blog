import{_ as s,o as a,c as p,d as t}from"./app-c9515a38.js";const o={};function e(c,n){return a(),p("div",null,n[0]||(n[0]=[t(`<h1 id="vuex安装" tabindex="-1"><a class="header-anchor" href="#vuex安装" aria-hidden="true">#</a> Vuex安装</h1><p>由于<code>Vuex</code>也属于<code>Vue</code>的插件，因此我们在使用<code>Vuex</code>的时候，需要使用<code>Vue.use()</code>方法进行注册。</p><p>在<code>store.js</code>中其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// store.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span>
</code></pre></div><p>根据<code>Vue</code>插件机制原理，插件需要提供一个<code>install</code>方法，在<code>Vuex</code>源码中，<code>install</code>的代码路径为<code>src/store.js</code>，其实现代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> applyMixin <span class="token keyword">from</span> <span class="token string">&#39;./mixin&#39;</span>

<span class="token keyword">let</span> Vue
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">install</span> <span class="token punctuation">(</span><span class="token parameter">_Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Vue <span class="token operator">&amp;&amp;</span> _Vue <span class="token operator">===</span> Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>
        <span class="token string">&#39;[vuex] already installed. Vue.use(Vuex) should be called only once.&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  Vue <span class="token operator">=</span> _Vue
  <span class="token function">applyMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个方法中，它所做的事情很简单，第一个就是把我们传递的<code>Vue</code>实例缓存起来，以方便后续实例化<code>Store</code>的时候使用。第二件事情就是调用<code>applyMixin</code>方法，此方法代码路径为<code>src/mixin.js</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// mixin.js文件</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> version <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>version<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">beforeCreate</span><span class="token operator">:</span> vuexInit <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略Vue1.0+版本逻辑</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为我们<code>Vue</code>源码分析是基于<code>Vue2.6.11</code>，因此我们省略关于<code>else</code>分支的逻辑。</p><p>当<code>Vue</code>的版本高于<code>2.0</code>时，它会调用<code>Vue.mixin()</code>方法全局混入一个<code>beforeCreate</code>生命周期，当<code>beforeCreate</code>生命周期执行的时候，会调用<code>vuexInit</code>，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// vuexInit中的this代表当前Vue实例</span>
<span class="token keyword">function</span> <span class="token function">vuexInit</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options
  <span class="token comment">// store injection</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>store<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$store <span class="token operator">=</span> <span class="token keyword">typeof</span> options<span class="token punctuation">.</span>store <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
      <span class="token operator">?</span> options<span class="token punctuation">.</span><span class="token function">store</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token operator">:</span> options<span class="token punctuation">.</span>store
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>parent <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>$store<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$store <span class="token operator">=</span> options<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>$store
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在入口<code>main.js</code>文件中，我们有这样一段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  store
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>我们在<code>vuexInit</code>方法中拿到的<code>options.store</code>就是我们传入的<code>store</code>，我们再来把目光跳转到<code>store.js</code>文件中，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// store.js</span>
<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>原来我们在根实例中传递的是一个<code>Store</code>实例，这样我们就明白了<code>vuexInit</code>方法的主要作用了：<strong>给每一个Vue实例都赋值一个$store属性。</strong></p><p>这样，我们在组件中就不用去手动引入<code>store</code>了，而是可以直接使用<code>$store</code>，例如：</p><div class="language-html" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{$store.state.xxx}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,18)]))}const l=s(o,[["render",e],["__file","install.html.vue"]]);export{l as default};
