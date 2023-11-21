import{_ as n,o as s,c as a,d as p}from"./app-iICYEmPT.js";const t="/blog/assets/props-akO_ZR_6.png",o={},e=p(`<h1 id="props处理" tabindex="-1"><a class="header-anchor" href="#props处理" aria-hidden="true">#</a> props处理</h1><p>介绍完以上前置核心概念后，我们第一个要学习的就是<code>Vue.js</code>是如何处理与<code>props</code>相关的逻辑的。我们把与<code>props</code>相关的逻辑主要分成三个部分，分别是<code>props</code>规范化、<code>props</code>初始化和<code>props</code>更新。</p><h2 id="props规范化" tabindex="-1"><a class="header-anchor" href="#props规范化" aria-hidden="true">#</a> props规范化</h2><p>在了解规范化之前，我们先来列举一下在日常的开发过程中，我们主要有如下几种撰写组件<code>props</code>的方式：</p><ul><li>数组形式：<code>props</code>可以写成一个数组，但数组中的<code>key</code>元素必须为<code>string</code>类型。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;age&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>键值不为对象：此种方式常见于只需要定义<code>key</code>类型的<code>props</code>。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>规范格式：此种方式是<code>Vue.js</code>接受<code>props</code>最好的格式，对于一个有很高要求的组件来说，它通常会撰写很严格的<code>props</code>规则，这在各个开源UI框架中是最常见的。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token function">validator</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> value <span class="token operator">&lt;=</span> <span class="token number">100</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>而<code>props</code>规范化所做的事情，就是把各种不是规范格式的形式，规范化为规范格式，方便<code>Vue.js</code>在后续的过程中处理<code>props</code>。那么接下来，我们就来分析<code>Vue.js</code>是如何对<code>props</code>规范化的。</p><p><code>props</code>规范化的过程发生在<code>this._init()</code>方法中的<code>mergeOptions</code>合并配置中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mergeOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">_init</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span>
  vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
    <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span>
    options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    vm
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中<code>mergeOptions()</code>方法是定义在<code>src/core/util/options.js</code>文件中，它在其中有一段这样的方法调用：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mergeOptions</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">parent</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">child</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Object <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token function">normalizeProps</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token keyword">return</span> options
<span class="token punctuation">}</span> 
</code></pre></div><p>我们可以发现，规范化<code>props</code>的代码，主要集中在<code>normalizeProps()</code>方法中，那么接下来我们详细分析<code>normalizeProps()</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">normalizeProps</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">options</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> <span class="token operator">?</span>Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> options<span class="token punctuation">.</span>props
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>props<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">let</span> i<span class="token punctuation">,</span> val<span class="token punctuation">,</span> name
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">=</span> props<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      val <span class="token operator">=</span> props<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        name <span class="token operator">=</span> <span class="token function">camelize</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
        res<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;props must be strings when using array syntax.&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      val <span class="token operator">=</span> props<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      name <span class="token operator">=</span> <span class="token function">camelize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      res<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
        <span class="token operator">?</span> val
        <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> val <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Invalid value for option &quot;props&quot;: expected an Array or an Object, </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">but got </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">toRawType</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  options<span class="token punctuation">.</span>props <span class="token operator">=</span> res
<span class="token punctuation">}</span>
</code></pre></div><p>为了更好的理解<code>normalizeProps()</code>方法，我们来撰写几个案例来详细说明：</p><ul><li>数组形式：当<code>props</code>是数组时，会首先倒序遍历这个数组，然后使用<code>typeof</code>来判断数组元素的类型。如果不是<code>string</code>类型，则在开发环境下报错，如果是<code>string</code>类型，则先把<code>key</code>转化为驼峰形式，然后把这个<code>key</code>赋值到临时的<code>res</code>对象中，此时的键值固定为<code>{ type: null }</code></li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 规范化前</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;nick-name&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 规范化后</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>对象形式：当为对象时会使用<code>for-in</code>遍历对象，紧接着和数组形式一样使用<code>camelize</code>来把<code>key</code>转成驼峰形式，然后使用<code>isPlainObject()</code>方法来判断是否为普通对象。如果不是，则转成<code>{ type: Type }</code>对象形式，其中<code>Type</code>为定义<code>key</code>时的<code>Type</code>，如果是，则直接使用这个对象。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 规范化前</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> Number
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 规范化后</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>既不是数组形式也不是对象形式：报错</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 报错：Invalid value for option &quot;props&quot;: expected an Array or an Object，but got String</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token string">&#39;name, age&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="props初始化" tabindex="-1"><a class="header-anchor" href="#props初始化" aria-hidden="true">#</a> props初始化</h2><p>在了解了<code>props</code>规范化后，我们紧接着来了解一下<code>props</code>初始化的过程。<code>props</code>初始化过程同样是发生在<code>this._init()</code>方法中，它在<code>initState</code>的时候被处理：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token function">initProps</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后我们来详细看一下<code>initProps</code>中的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initProps</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">propsOptions</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> propsData <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>_props <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">const</span> keys <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_propKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> isRoot <span class="token operator">=</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>$parent
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> propsOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">validateProp</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> propsOptions<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> hyphenatedKey <span class="token operator">=</span> <span class="token function">hyphenate</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReservedAttribute</span><span class="token punctuation">(</span>hyphenatedKey<span class="token punctuation">)</span> <span class="token operator">||</span>
          config<span class="token punctuation">.</span><span class="token function">isReservedAttr</span><span class="token punctuation">(</span>hyphenatedKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>hyphenatedKey<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is a reserved attribute and cannot be used as component prop.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token function">defineReactive</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isUpdatingChildComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Avoid mutating a prop directly since the value will be </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">overwritten whenever the parent component re-renders. </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Instead, use a data or computed property based on the prop&#39;s </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
            <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">value. Prop being mutated: &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
            vm
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">defineReactive</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_props</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在仔细阅读<code>initProps()</code>方法后，我们可以对<code>initProps()</code>方法进行总结，它主要做三件事情：<strong>props校验和求值</strong>、<strong>props响应式</strong>和<strong>props代理</strong>。</p><h3 id="props响应式" tabindex="-1"><a class="header-anchor" href="#props响应式" aria-hidden="true">#</a> props响应式</h3><p>我们先来看看最简单的<code>props</code>响应式，这部分的过程主要使用了我们在之前介绍过的<code>defineReactive</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">defineReactive</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isUpdatingChildComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Avoid mutating a prop directly since the value will be </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">overwritten whenever the parent component re-renders. </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Instead, use a data or computed property based on the prop&#39;s </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">value. Prop being mutated: &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>唯一值得注意的地方就是：在开发环境下，<code>props</code>的响应式劫持了<code>setter</code>方法，这样做的是为了保证<code>props</code>为单项数据流：既我们不能在子组件中直接修改父组件传递的<code>props</code>值。</p><h3 id="props代理" tabindex="-1"><a class="header-anchor" href="#props代理" aria-hidden="true">#</a> props代理</h3><p>经过<code>props</code>响应式后，我们会在实例上得到<code>this._props</code>对象，为了方便我们更好的获取<code>props</code>的值，我们需要对<code>props</code>做一层<code>proxy</code>代理。关于<code>proxy</code>的实现，我们已经在之前的章节中介绍过了。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>_props <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment">// 代理前</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_props<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_props</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
<span class="token comment">// 代理后</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre></div><h3 id="props校验求值" tabindex="-1"><a class="header-anchor" href="#props校验求值" aria-hidden="true">#</a> props校验求值</h3><p>最后我们来看稍微复杂一点的<code>props</code>校验求值，这部分的功能发生在<code>validateProp</code>，它的代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">validateProp</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">propOptions</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">propsData</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
<span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token keyword">const</span> prop <span class="token operator">=</span> propOptions<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token keyword">const</span> absent <span class="token operator">=</span> <span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>propsData<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token keyword">let</span> value <span class="token operator">=</span> propsData<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token comment">// boolean casting</span>
  <span class="token keyword">const</span> booleanIndex <span class="token operator">=</span> <span class="token function">getTypeIndex</span><span class="token punctuation">(</span>Boolean<span class="token punctuation">,</span> prop<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>booleanIndex <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>absent <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>prop<span class="token punctuation">,</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      value <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token string">&#39;&#39;</span> <span class="token operator">||</span> value <span class="token operator">===</span> <span class="token function">hyphenate</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// only cast empty string / same name to boolean if</span>
      <span class="token comment">// boolean has higher priority</span>
      <span class="token keyword">const</span> stringIndex <span class="token operator">=</span> <span class="token function">getTypeIndex</span><span class="token punctuation">(</span>String<span class="token punctuation">,</span> prop<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>stringIndex <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> booleanIndex <span class="token operator">&lt;</span> stringIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// check default value</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> <span class="token function">getPropDefaultValue</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">// since the default value is a fresh copy,</span>
    <span class="token comment">// make sure to observe it.</span>
    <span class="token keyword">const</span> prevShouldObserve <span class="token operator">=</span> shouldObserve
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span>prevShouldObserve<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// skip validation for weex recycle-list child component props</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>__WEEX__ <span class="token operator">&amp;&amp;</span> <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token string">&#39;@binding&#39;</span> <span class="token keyword">in</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertProp</span><span class="token punctuation">(</span>prop<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> absent<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> value
<span class="token punctuation">}</span>
</code></pre></div><p><strong>代码分析</strong>：我们可以从以上代码中发现，<code>validateProp</code>虽然说的是带有校验的功能，但它并不会抛出错误进而阻止<code>validateProp()</code>方法返回<code>value</code>，而是根据校验的过程中的不同情况尽可能的提示出很清晰的提示。实质上<code>validateProp()</code>方法最主要的还是返回<code>value</code>，同时也根据不同的<code>props</code>写法处理不同的情况。我们可以将<code>validateProp()</code>方法进行总结，它主要做如下几件事情：</p><ul><li>处理<code>Boolean</code>类型的<code>props</code>。</li><li>处理<code>default</code>默认数据。</li><li><code>props</code>断言。</li></ul><p>那么我们接下来将分别对这几件事情进行详细的描述。</p><h4 id="处理boolean类型" tabindex="-1"><a class="header-anchor" href="#处理boolean类型" aria-hidden="true">#</a> 处理Boolean类型</h4><p>我们先来看几个<code>props</code>传递<code>Boolean</code>的例子：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Component A</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fixed</span><span class="token operator">:</span> Boolean
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Component B</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token punctuation">[</span>Boolean<span class="token punctuation">,</span> String<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Component C</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后回到源码中处理<code>Boolean</code>类型<code>getTypeIndex</code>的地方，这个函数的代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getTypeIndex</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> expectedTypes</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>expectedTypes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">isSameType</span><span class="token punctuation">(</span>expectedTypes<span class="token punctuation">,</span> type<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> expectedTypes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameType</span><span class="token punctuation">(</span>expectedTypes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> i
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个函数的实现逻辑比较清晰：</p><ol><li>以<code>Component A</code>组件为例，它的<code>props</code>不是一个数组但却是<code>Boolean</code>类型，因此返回索引<code>0</code>。</li><li>以<code>Component B</code>组件为例，因为它的<code>props</code>是一个数组，所以要遍历这个数组，然后返回<code>Boolean</code>类型在数组中的索引<code>i</code>。</li><li>以<code>Component C</code>组件为例，虽然它是一个数组，但数组中没有任何元素，因此返回索引<code>-1</code>。</li></ol><p>在拿到<code>booleanIndex</code>后，我们需要走下面这段代码逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> booleanIndex <span class="token operator">=</span> <span class="token function">getTypeIndex</span><span class="token punctuation">(</span>Boolean<span class="token punctuation">,</span> prop<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>booleanIndex <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>absent <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>prop<span class="token punctuation">,</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token string">&#39;&#39;</span> <span class="token operator">||</span> value <span class="token operator">===</span> <span class="token function">hyphenate</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// only cast empty string / same name to boolean if</span>
    <span class="token comment">// boolean has higher priority</span>
    <span class="token keyword">const</span> stringIndex <span class="token operator">=</span> <span class="token function">getTypeIndex</span><span class="token punctuation">(</span>String<span class="token punctuation">,</span> prop<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>stringIndex <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> booleanIndex <span class="token operator">&lt;</span> stringIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      value <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li>在<code>if</code>条件判断中<code>absent</code>代表虽然我们在子组件中定义了<code>props</code>，但是父组件并没有传递任何值，然后<code>&amp;</code>条件又判断了子组件<code>props</code>有没有提供<code>default</code>默认值选项，如果没有，那么它的值只能为<code>false</code>。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件未传递fixed</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ParentComponent&#39;</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// 子组件fixed值取false</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ChildComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fixed</span><span class="token operator">:</span> Boolean
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>在<code>else if</code>条件判断中，我们判断了两种特殊的<code>props</code>传递方式：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Parent Component A</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ParentComponentA&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component fixed /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// Parent Component B</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ParentComponentB&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component fixed=&quot;fixed&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于第一个种情况<code>stringIndex</code>为<code>-1</code>，<code>booleanIndex</code>为<code>0</code>，因此<code>value</code>的值为<code>true</code>。对于第二种情况，则需要根据<code>props</code>的定义具体区分：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Child Component A</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ChildComponentA&#39;</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token punctuation">[</span>Boolean<span class="token punctuation">,</span> String<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Child Component B</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ChildComponentB&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Boolean<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><ol><li>对于<code>ChildComponentA</code>来说，由于<code>stringIndex</code>值为<code>1</code>，<code>booleanIndex</code>值为<code>0</code>，<code>booleanIndex &lt; stringIndex</code>因此我们可以认为<code>Boolean</code>具有更高的优先级，此时<code>value</code>的值为<code>true</code>。</li><li>对于<code>ChildComponentB</code>来说，由于<code>stringIndex</code>值为<code>0</code>，<code>booleanIndex</code>值为<code>1</code>，<code>stringIndex &lt; booleanIndex</code>因此我们可以认为<code>String</code>具有更高的优先级，此时<code>value</code>的值不处理。</li></ol><h4 id="处理default默认数据" tabindex="-1"><a class="header-anchor" href="#处理default默认数据" aria-hidden="true">#</a> 处理default默认数据</h4><p>处理完<code>Boolean</code>类型后，我们来处理默认值，既我们提到过的虽然子组件定义了<code>props</code>，但父组件没有传递的情况。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件未传递fixed</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ParentComponent&#39;</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// 子组件提供了default选项</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ChildComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于以上案例会走如下代码的逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  value <span class="token operator">=</span> <span class="token function">getPropDefaultValue</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getPropDefaultValue</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> <span class="token operator">?</span>Component<span class="token punctuation">,</span> <span class="token literal-property property">prop</span><span class="token operator">:</span> PropOptions<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token comment">// no default, return undefined</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>prop<span class="token punctuation">,</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">undefined</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> def <span class="token operator">=</span> prop<span class="token punctuation">.</span>default
  <span class="token comment">// warn against non-factory defaults for Object &amp; Array</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isObject</span><span class="token punctuation">(</span>def<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token string">&#39;Invalid default value for prop &quot;&#39;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&#39;&quot;: &#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;Props with type Object/Array must use a factory function &#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;to return the default value.&#39;</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// the raw prop value was also undefined from previous render,</span>
  <span class="token comment">// return previous default value to avoid unnecessary watcher trigger</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vm <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">&amp;&amp;</span>
    vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span>
    vm<span class="token punctuation">.</span>_props<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> vm<span class="token punctuation">.</span>_props<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// call factory function for non-Function types</span>
  <span class="token comment">// a value is Function if its prototype is function even across different execution context</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> def <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">getType</span><span class="token punctuation">(</span>prop<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">&#39;Function&#39;</span>
    <span class="token operator">?</span> <span class="token function">def</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token operator">:</span> def
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ol><li>首先判断了子组件有没有提供<code>default</code>默认值选项，没有则直接返回<code>undefined</code>。</li><li>随后判断了<code>default</code>如果是引用类型，则提示必须把<code>default</code>写成一个函数，既：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment">// 必须写成</span>
<span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li>最后再根据<code>default</code>的类型来取值，如果是函数类型则调用这个函数，如果不是函数类型则直接使用。</li><li>其中下面一段代码在这里我们并不会说明和分析它的具体作用，而是会在<code>props</code>更新章节来介绍。</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>vm <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">&amp;&amp;</span>
  vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span>
  vm<span class="token punctuation">.</span>_props<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> vm<span class="token punctuation">.</span>_props<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="props断言" tabindex="-1"><a class="header-anchor" href="#props断言" aria-hidden="true">#</a> props断言</h4><p>最后我们来分析一下<code>props</code>断言。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">assertProp</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">prop</span><span class="token operator">:</span> PropOptions<span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">vm</span><span class="token operator">:</span> <span class="token operator">?</span>Component<span class="token punctuation">,</span>
  <span class="token literal-property property">absent</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>prop<span class="token punctuation">.</span>required <span class="token operator">&amp;&amp;</span> absent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token string">&#39;Missing required prop: &quot;&#39;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&#39;&quot;&#39;</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>prop<span class="token punctuation">.</span>required<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> type <span class="token operator">=</span> prop<span class="token punctuation">.</span>type
  <span class="token keyword">let</span> valid <span class="token operator">=</span> <span class="token operator">!</span>type <span class="token operator">||</span> type <span class="token operator">===</span> <span class="token boolean">true</span>
  <span class="token keyword">const</span> expectedTypes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      type <span class="token operator">=</span> <span class="token punctuation">[</span>type<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> type<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>valid<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> assertedType <span class="token operator">=</span> <span class="token function">assertType</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> type<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      expectedTypes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>assertedType<span class="token punctuation">.</span>expectedType <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
      valid <span class="token operator">=</span> assertedType<span class="token punctuation">.</span>valid
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>valid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token function">getInvalidTypeMessage</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> value<span class="token punctuation">,</span> expectedTypes<span class="token punctuation">)</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> validator <span class="token operator">=</span> prop<span class="token punctuation">.</span>validator
  <span class="token keyword">if</span> <span class="token punctuation">(</span>validator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">validator</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Invalid prop: custom validator check failed for prop &quot;&#39;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&#39;&quot;.&#39;</span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>assertProp</code>中我们有三种情况需要去断言：</p><ul><li><code>required</code>：如果子组件<code>props</code>提供了<code>required</code>选项，代表这个<code>props</code>必须在父组件中传递值，如果不传递则抛出错误信息<code>Missing required prop: fixed</code>。</li><li>对于定义了多个<code>type</code>的类型数组，则我们会遍历这个类型数组，只要当前<code>props</code>的类型和类型数组中某一个元素匹配则终止遍历。，否则抛出错误提示信息。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Parent Component</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ParentComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component :age=&quot;true&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
<span class="token comment">// Chil Component</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ChilComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">[</span>Number<span class="token punctuation">,</span> String<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 报错：Invalid prop: type check failed for prop age，Expected Number, String，got with value true</span>
</code></pre></div><ul><li>用户自己提供的<code>validator</code>校验器我们也需要进行断言：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Parent Component</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ParentComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component :age=&quot;101&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
<span class="token comment">// Chil Component</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ChilComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token function">validator</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value <span class="token operator">&gt;=</span><span class="token number">0</span> <span class="token operator">&amp;&amp;</span> value <span class="token operator">&lt;=</span><span class="token number">100</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 报错：Invalid prop: custom validator check failed for prop age</span>
</code></pre></div><h2 id="props更新" tabindex="-1"><a class="header-anchor" href="#props更新" aria-hidden="true">#</a> props更新</h2><p>我们都知道子组件的<code>props</code>值来源于父组件，当父组件值更新时，子组件的值也会发生改变，同时触发子组件的重新渲染。我们先跳过父组件的具体编译逻辑，直接看父组件的值更新，改变子组件<code>props</code>值的步骤：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">updateChildComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">propsData</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">listeners</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">parentVnode</span><span class="token operator">:</span> MountedComponentVNode<span class="token punctuation">,</span>
  <span class="token literal-property property">renderChildren</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token comment">// update props</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>propsData <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>_props
    <span class="token keyword">const</span> propKeys <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_propKeys <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> propKeys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> key <span class="token operator">=</span> propKeys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">const</span> <span class="token literal-property property">propOptions</span><span class="token operator">:</span> any <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props <span class="token comment">// wtf flow?</span>
      props<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">validateProp</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> propOptions<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token comment">// keep a copy of raw propsData</span>
    vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">=</span> propsData
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ol><li>以上<code>vm</code>实例为子组件，<code>propsData</code>为父组件中传递的<code>props</code>的值，而<code>_propKeys</code>是之前<code>props</code>初始化过程中缓存起来的所有的<code>props</code>的key。</li><li>在父组件值更新后，会通过遍历<code>propsKey</code>来重新对子组件<code>props</code>进行<strong>校验求值</strong>，最后赋值。</li></ol><p>以上代码就是子组件<code>props</code>更新的过程，在<code>props</code>更新后会进行子组件的重新渲染，这个重新渲染的过程分两种情况：</p><ul><li>普通<code>props</code>值被修改：当<code>props</code>值被修改后，其中有段代码<code>props[key] = validateProp(key, propOptions, propsData, vm)</code>根据响应式原理，会触发属性的<code>setter</code>，进而子组件可以重新渲染。</li><li>对象<code>props</code>内部属性变化：当这种情况发生时，并没有触发子组件<code>prop</code>的更新，但是在子组件渲染的时候读取到了<code>props</code>，因此会收集到这个<code>props</code>的<code>render watcher</code>，当对象<code>props</code>内部属性变化的时候，根据响应式原理依然会触发<code>setter</code>，进而子组件可以重新进行渲染。</li></ul><h2 id="toggleobserving作用" tabindex="-1"><a class="header-anchor" href="#toggleobserving作用" aria-hidden="true">#</a> toggleObserving作用</h2><p><code>toggleObserving</code>是定义在<code>src/core/observer/index.js</code>文件中的一个函数，其代码很简单：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">let</span> <span class="token literal-property property">shouldObserve</span><span class="token operator">:</span> boolean <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">toggleObserving</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  shouldObserve <span class="token operator">=</span> value
<span class="token punctuation">}</span>
</code></pre></div><p>它的作用就是修改当前模块的<code>shouldObserve</code>变量，用来控制在<code>observe</code>的过程中是否需要把当前值变成一个<code>observer</code>对象。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">observe</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">asRootData</span><span class="token operator">:</span> <span class="token operator">?</span>boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> value <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> <span class="token literal-property property">ob</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
    shouldObserve <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>asRootData <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ob<span class="token punctuation">.</span>vmCount<span class="token operator">++</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ob
<span class="token punctuation">}</span>
</code></pre></div><p>接下来我们来分析，在处理<code>props</code>的过程中，什么时候<code>toggleObserving(true)</code>，什么时候<code>toggleObserving(false)</code>以及为什么需要这样处理？</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initProps</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">propsOptions</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 省略defineReactive的过程</span>
  <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>props</code>初始化的时候：<br> 我们可以看到在最开始判断了当为非根实例(子组件)的时候，进行了<code>toggleObserving(false)</code>的操作，这样做的目的是因为：当非根实例的时候，组件的<code>props</code>来自于父组件。当<code>props</code>为对象或者数组时，根据响应式原理，我们会递归遍历子属性然后进行<code>observe(val)</code>，而正是因为<code>props</code>来源于父组件，这个过程其实已经在父组件执行过了，如果不做任何限制，那么会在子组件中又重复一次这样的过程，因此这里需要<code>toggleObserving(false)</code>，用来避免递归<code>props</code>子属性的情况，这属于响应式优化的一种手段。在代码最后，又调用了<code>toggleObserving(true)</code>，把<code>shouldObserve</code>的值还原。</p><p><code>props</code>校验的时候：<br> 我们先来看<code>props</code>提供了<code>default</code>默认值，且默认值返回了对象或者数组。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">point</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
      <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
          <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Array<span class="token punctuation">,</span>
      <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于以上<code>point</code>和<code>list</code>取默认值的情况，这个时候的<code>props</code>值与父组件没有关系，那么这个时候我们需要<code>toggleObserving(true)</code>，在<code>observe</code>后再把<code>shouldObserve</code>变量设置为原来的值。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">validateProp</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略代码</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> <span class="token function">getPropDefaultValue</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">const</span> prevShouldObserve <span class="token operator">=</span> shouldObserve 
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span>prevShouldObserve<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>props</code>更新的时候：<br> 当父组件更新的时候，会调用<code>updateChildComponent()</code>方法，用来更新子组件的<code>props</code>值，这个时候其实和<code>props</code>初始化的逻辑一样，我们同样不需要对指向父组件的对象或数组<code>props</code>进行递归子属性<code>observe</code>的过程，因此这里需要执行<code>toggleObserving(false)</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">updateChildComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// update props</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>propsData <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>_props
    <span class="token keyword">const</span> propKeys <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_propKeys <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> propKeys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> key <span class="token operator">=</span> propKeys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">const</span> <span class="token literal-property property">propOptions</span><span class="token operator">:</span> any <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props <span class="token comment">// wtf flow?</span>
      props<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">validateProp</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> propOptions<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">=</span> propsData
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="整体流程图" tabindex="-1"><a class="header-anchor" href="#整体流程图" aria-hidden="true">#</a> 整体流程图</h2><p>在分析完以上所有与<code>props</code>相关的逻辑后，我们可以总结如下流程图。</p><div style="text-align:center;"><img src="`+t+'"></div>',102),c=[e];function l(r,u){return s(),a("div",null,c)}const i=n(o,[["render",l],["__file","props.html.vue"]]);export{i as default};
