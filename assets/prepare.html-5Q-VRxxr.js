import{_ as n,o as s,c as a,d as p}from"./app-CVBCq-32.js";const t={},o=p(`<h1 id="前置核心概念" tabindex="-1"><a class="header-anchor" href="#前置核心概念" aria-hidden="true">#</a> 前置核心概念</h1><h2 id="object-defineproperty介绍" tabindex="-1"><a class="header-anchor" href="#object-defineproperty介绍" aria-hidden="true">#</a> Object.defineProperty介绍</h2><p>也许你已经从很多地方了解到，<code>Vue.js</code>利用了<code>Object.defineProperty(obj, key, descriptor)</code>方法来实现响应式，其中<code>Object.defineProperty()</code>方法的参数介绍如下：</p><ul><li><code>obj</code>：要定义其属性的对象。</li><li><code>key</code>：要定义或修改属性的名称。</li><li><code>descriptor</code>：要定义或修改属性的描述符。</li></ul><p>其中<code>descriptor</code>有很多可选的键值， 然而对<code>Vue</code>响应式来说最重要的是<code>get</code>和<code>set</code>方法，它们分别会在获取属性值的时候触发<code>getter</code>，设置属性值的时候触发<code>setter</code>。在介绍原理之前，我们使用<code>Object.defineProperty()</code>来实现一个简单的响应式例子：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">defineReactive</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;get msg&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> val
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;set msg&#39;</span><span class="token punctuation">)</span>
      val <span class="token operator">=</span> newVal
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello, Vue.js&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token function">defineReactive</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span> vm<span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
msg <span class="token operator">=</span> vm<span class="token punctuation">.</span>msg          <span class="token comment">// get msg</span>
vm<span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token string">&#39;Hello, Msg&#39;</span> <span class="token comment">// set msg</span>
msg <span class="token operator">=</span> vm<span class="token punctuation">.</span>msg          <span class="token comment">// get msg</span>
</code></pre></div><p>为了在别的地方方便的使用<code>Object.defineProperty()</code>方法，因此我们把其封装成一个<code>defineReactive</code>函数。</p><h2 id="proxy代理" tabindex="-1"><a class="header-anchor" href="#proxy代理" aria-hidden="true">#</a> proxy代理</h2><p>在我们的开发过程中，我们经常会直接使用<code>this.xxx</code>的形式直接访问<code>props</code>或者<code>data</code>中的值，这是因为<code>Vue</code>为<code>props</code>和<code>data</code>默认做了<code>proxy</code>代理。关于什么是<code>proxy</code>代理，请先看一个简单的例子：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span>
<span class="token punctuation">}</span>
<span class="token comment">// 代理前</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// AAA</span>
<span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;_data&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 代理后</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>       <span class="token comment">// AAA</span>
</code></pre></div><p>接下来我们详细介绍<code>proxy()</code>方法是如何实现的，在<code>instance/state.js</code>文件中定义了<code>proxy</code>方法，它的代码也很简单：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> sharedPropertyDefinition <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">get</span><span class="token operator">:</span> noop<span class="token punctuation">,</span>
  <span class="token literal-property property">set</span><span class="token operator">:</span> noop
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">proxy</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">sourceKey</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  sharedPropertyDefinition<span class="token punctuation">.</span><span class="token function-variable function">get</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">proxyGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">[</span>sourceKey<span class="token punctuation">]</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  sharedPropertyDefinition<span class="token punctuation">.</span><span class="token function-variable function">set</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">proxySetter</span> <span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span>sourceKey<span class="token punctuation">]</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
  <span class="token punctuation">}</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> sharedPropertyDefinition<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以从上面的代码中发现，<code>proxy</code>方法主要是做了属性的<code>get</code>和<code>set</code>方法劫持。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;BBB&#39;</span>
<span class="token comment">// 等价于</span>
<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">.</span>name
<span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;BBB&#39;</span>
</code></pre></div><h2 id="options属性" tabindex="-1"><a class="header-anchor" href="#options属性" aria-hidden="true">#</a> $options属性</h2><p>在之前的介绍中，我们知道当我们初始化<code>Vue</code>实例的时候传递的<code>options</code>会根据不同的情况进行配置合并，关于具体的<code>options</code>合并策略我们会在之后的章节详细介绍，现阶段我们只需要知道<code>$options</code>可以拿到合并后的所有属性，例如<code>props</code>、<code>methods</code>以及<code>data</code>等等。</p><p>假设我们定义了如下实例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">&#39;BBB&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">sayHello</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, Vue.js&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fullName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>那么我们在之后可以通过下面的方式来取这些属性。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> opts <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options
<span class="token keyword">const</span> props <span class="token operator">=</span> opts<span class="token punctuation">.</span>props
<span class="token keyword">const</span> methods <span class="token operator">=</span> opts<span class="token punctuation">.</span>methods
<span class="token keyword">const</span> data <span class="token operator">=</span> opts<span class="token punctuation">.</span>data
<span class="token keyword">const</span> computed <span class="token operator">=</span> opts<span class="token punctuation">.</span>computed
<span class="token keyword">const</span> watch <span class="token operator">=</span> opts<span class="token punctuation">.</span>watch
<span class="token comment">// ...等等</span>
</code></pre></div>`,20),e=[o];function c(l,r){return s(),a("div",null,e)}const k=n(t,[["render",c],["__file","prepare.html.vue"]]);export{k as default};
