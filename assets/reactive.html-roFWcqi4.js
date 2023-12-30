import{_ as t,r as o,o as e,c,a as s,b as n,e as p,d as u}from"./app-DAgRp0ub.js";const l={},k=s("h1",{id:"深入响应式原理",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#深入响应式原理","aria-hidden":"true"},"#"),n(" 深入响应式原理")],-1),r=s("p",null,[n("在介绍完"),s("code",null,"props"),n("、"),s("code",null,"data"),n("、"),s("code",null,"watch"),n("以及"),s("code",null,"computed"),n("后，我们对响应式原理有了一定的初步认识，在这一章节中我们再次回顾响应式，来探究其实现原理。")],-1),i=s("code",null,"Vue.js",-1),d=s("code",null,"Object.defineProperty(obj, key, descriptor)",-1),y={href:"https://www.caniuse.com/?search=Object.defineProperty",target:"_blank",rel:"noopener noreferrer"},f=s("code",null,"IE8",-1),m=s("code",null,"Vue.js",-1),g=s("code",null,"IE8",-1),v={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",target:"_blank",rel:"noopener noreferrer"},w=s("code",null,"descriptor",-1),b=s("code",null,"Vue.js",-1),h=s("code",null,"get",-1),j=s("code",null,"set",-1),_=u(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> val <span class="token operator">=</span> <span class="token string">&#39;msg&#39;</span>
<span class="token keyword">const</span> reactiveObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>reactiveObj<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> <span class="token punctuation">{</span>
   <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 当访问reactiveObj.msg时被调用</span>
     <span class="token keyword">return</span> val
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 当设置reactiveObj.msg时被调用</span>
     val <span class="token operator">=</span> newVal
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>在<code>Vue</code>的响应式对象中，它会在<code>getter</code>中<strong>收集依赖</strong>、在<code>setter</code>中<strong>派发更新</strong>，我们会在之后的章节中分别对<code>getter</code>的<strong>收集依赖</strong>，<code>setter</code>的<strong>派发更新</strong>做单独的讲解。</p><p>在介绍完<code>Object.defineProperty</code>，我们来回答一个问题，什么是响应式对象？在<code>Vue.js</code>中对于什么是响应式对象，我们可以简单的理解成：用<code>Object.defineProperty()</code>方法定义时同时提供了<code>get</code>和<code>set</code>选项，我们就可以将其称之为响应式对象。</p><p>在<code>Vue.js</code>实例化时，会把<code>props</code>、<code>data</code>和<code>computed</code>等变成响应式对象，在介绍响应式对象时，我们会重点介绍<code>props</code>和<code>data</code>的处理过程，这个过程发生在<code>this._init()</code>方法中的<code>initState(vm)</code>中。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>_watchers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token function">initProps</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span> <span class="token function">initMethods</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initData</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>watch <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>watch <span class="token operator">!==</span> nativeWatch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initWatch</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>watch<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们先来看<code>initProps</code>是如何处理<code>props</code>相关的逻辑的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initProps</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">propsOptions</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> propsData <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>_props <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// cache prop keys so that future props updates can iterate using Array</span>
  <span class="token comment">// instead of dynamic object key enumeration.</span>
  <span class="token keyword">const</span> keys <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_propKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> isRoot <span class="token operator">=</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>$parent
  <span class="token comment">// root instance props should be converted</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> propsOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">validateProp</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> propsOptions<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token comment">/* istanbul ignore else */</span>
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
    <span class="token comment">// static props are already proxied on the component&#39;s prototype</span>
    <span class="token comment">// during Vue.extend(). We only need to proxy props defined at</span>
    <span class="token comment">// instantiation here.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_props</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在之前分析<code>initProps</code>整体流程的过程中，我们知道<code>initProps</code>主要做三件事情：<strong>props校验和求值</strong>、<strong>props响应式</strong>和<strong>props代理</strong>。对于<code>props</code>代理而言它很简单，主要作用是方便我们取值。</p><h2 id="proxy代理" tabindex="-1"><a class="header-anchor" href="#proxy代理" aria-hidden="true">#</a> proxy代理</h2><p><code>proxy()</code>方法是定义在<code>src/core/instance/state.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> sharedPropertyDefinition <span class="token operator">=</span> <span class="token punctuation">{</span>
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
</code></pre></div><p>代码分析：</p><ul><li><code>noop</code>：它代表空函数，空函数代表什么都不做。</li><li><code>target</code>：它是目标代理对象，在<code>Vue.js</code>中就是<code>Vue</code>实例。</li><li><code>sourceKey</code>：它是源属性，在<code>props</code>代理中传递的是<code>_props</code>内部私有属性。</li><li><code>key</code>：它是要代理的属性，在<code>props</code>中就是我们撰写的各种<code>props</code>属性。</li><li><code>sharedPropertyDefinition</code>：它就是<code>Object.defineProperty(obj, key, descriptor)</code>方法的<code>descriptor</code>参数，可以从上面代码中看到，在<code>props</code>代理中它提供了<code>enumerable</code>、<code>configurable</code>、<code>get</code>和<code>set</code>这几个选项。</li></ul><p>假设我们有如下<code>Vue</code>实例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;age&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>proxy</code>代理后，我们就能通过<code>this.msg</code>和<code>this.age</code>代替<code>this._props.msg</code>和<code>this._props.age</code>的形式直接访问或者设置值：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 代理前</span>
<span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_props<span class="token punctuation">.</span>msg
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token comment">// 单项数据流，只要演示，实际不能修改props的值</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>_props<span class="token punctuation">.</span>msg <span class="token operator">=</span> &#39;<span class="token keyword">new</span> <span class="token class-name">msg</span>

<span class="token comment">// 代理后</span>
<span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>msg
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token comment">// 单项数据流，只要演示，实际不能修改props的值</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token string">&#39;new msg&#39;</span>
</code></pre></div><p>以上就是<code>props</code>的代理过程分析，对于<code>data</code>代理而言是相同的道理，这里就不再累述。</p><h2 id="definereactive" tabindex="-1"><a class="header-anchor" href="#definereactive" aria-hidden="true">#</a> defineReactive</h2><p>在介绍完<code>proxy</code>代理后，我们紧接着要分析<code>defineReactive</code>的实现逻辑，关于响应式的代码实现，绝大多数是在<code>src/core/observer</code>目录下，其中<code>defineReactive</code>方法是定义在其目录的<code>index.js</code>入口文件中</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineReactive</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  customSetter<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Function<span class="token punctuation">,</span>
  shallow<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> property <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>configurable <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// cater for pre-defined getter/setters</span>
  <span class="token keyword">const</span> getter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>get
  <span class="token keyword">const</span> setter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>set
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">!</span>getter <span class="token operator">||</span> setter<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> arguments<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    val <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">dependArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
      <span class="token comment">/* eslint-disable no-self-compare */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">===</span> value <span class="token operator">||</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> newVal <span class="token operator">&amp;&amp;</span> value <span class="token operator">!==</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token comment">/* eslint-enable no-self-compare */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> customSetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">customSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// #7981: for accessor properties without setter</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>getter <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>setter<span class="token punctuation">)</span> <span class="token keyword">return</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>setter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        val <span class="token operator">=</span> newVal
      <span class="token punctuation">}</span>
      childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
      dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>defineReactive</code>实际上就是对<code>Object.defineProperty()</code>方法的一层包裹，主要是处理<code>getter</code>和<code>setter</code>相关的逻辑。</li><li><code>defineReactive</code>首先通过<code>Object.getOwnPropertyDescriptor()</code>方法获取了当前<code>obj.key</code>的属性描述，如果其属性<code>configurable</code>为<code>false</code>，则不能被定义为响应式对象，因此对于<code>obj.key</code>任何赋值都不会触发组件更新，例如：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">obj</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>obj <span class="token operator">=</span> obj
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// this.obj.msg不是响应式对象，修改后不会触发组件更新</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token string">&#39;new msg&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="observe和observer" tabindex="-1"><a class="header-anchor" href="#observe和observer" aria-hidden="true">#</a> observe和Observer</h2><p>我们可以在<code>defineReactive</code>中看到<code>observe(val)</code>这段代码，接下来让我们介绍<code>observe()</code>方法以及<code>Observer</code>类。<code>observe()</code>方法定义与<code>defineReactive()</code>方法定义在同一个文件中，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">observe</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">asRootData</span><span class="token operator">:</span> <span class="token operator">?</span>boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
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
</code></pre></div><p>代码分析：</p><ul><li>首先对传递的<code>value</code>进行了类型判断，不为对象或者是<code>VNode</code>实例时不进行任何操作，其中<code>VNode</code>是一个类，它会在生成虚拟DOM的时候使用到，我们会在后面进行介绍，<code>isObject</code>是一个定义在<code>src/shared/utils.js</code>文件中的工具方法。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isObject</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> mixed</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token keyword">return</span> obj <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> obj <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>然后对<code>value</code>使用<code>hasOwn</code>判断是否有<code>__ob__</code>属性且<code>__ob__</code>为<code>Observer</code>实例，添加这个属性是为了防止重复观察(避免重复定义响应式)，既：如果已经是响应式对象了，直接返回，否则才会进行下一步操作。<code>hasOwn</code>是一个定义在<code>src/shared/utils.js</code>文件中的工具方法：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> hasOwnProperty <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">hasOwn</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object <span class="token operator">|</span> Array<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>最后<code>value</code>又进行了一些条件判断，其中最重要的两个条件为<code>Array.isArray</code>和<code>isPlainObject</code>，它们分别判断<code>value</code>是否为数组，是否为普通对象，其它几个边界条件暂时不做介绍。其中<code>isPlainObject</code>是一个定义在<code>src/shared/utils.js</code>文件中的工具方法：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isPlainObject</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">_toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;[object Object]&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接下来，我们需要看一下<code>Observer</code>类的实现：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">;</span>
  <span class="token literal-property property">dep</span><span class="token operator">:</span> Dep<span class="token punctuation">;</span>
  <span class="token literal-property property">vmCount</span><span class="token operator">:</span> number<span class="token punctuation">;</span> <span class="token comment">// number of vms that have this object as root $data</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
    <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vmCount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>hasProto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">protoAugment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">copyAugment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */</span>
  <span class="token function">walk</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">defineReactive</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Observe a list of Array items.
   */</span>
  <span class="token function">observeArray</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">items</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">observe</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>def</code>为定义在<code>src/core/utils/lang.js</code>文件中的一个工具方法，<code>def</code>本质上也是对<code>Object.defineProperty()</code>方法的一层包裹封装，使用<code>def</code>定义<code>__ob__</code>的目的是让<code>__ob__</code>在对象属性遍历的时候不可被枚举出来。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">def</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span> enumerable<span class="token operator">?</span><span class="token operator">:</span> boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> val<span class="token punctuation">,</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token operator">!</span>enumerable<span class="token punctuation">,</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>在<code>Vue.js</code>中对于纯对象和数组的响应式的处理方式是不同的，代码首先判断了<code>value</code>是否为数组。如果不是数组，则调用<code>walk()</code>方法。<code>walk()</code>方法实际上就是递归遍历对象属性，然后调用<code>defineReactive()</code>的过程，例如：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> nestedObj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">&#39;c&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 递归调用</span>
<span class="token function">defineReactive</span><span class="token punctuation">(</span>nestedObj<span class="token punctuation">)</span>
<span class="token function">defineReactive</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token function">defineReactive</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token function">defineReactive</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
</code></pre></div><p>如果是数组，则调用<code>observeArray()</code>方法，<code>observeArray</code>也是一个遍历递归调用的过程，只不过这里遍历的是数组，而不是对象的属性键。然后我们还发现，在<code>observeArray()</code>方法调用之前，还进行了<code>hasProto</code>判断，然后根据判断结果进行不同的操作。其中，<code>hasProto</code>是定义在<code>src/core/util/env.js</code>文件中的一个常量，它的目的就是为了判断当前浏览器是否支持<code>__proto__</code>属性：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> hasProto <span class="token operator">=</span> <span class="token string">&#39;__proto__&#39;</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>我们都知道因为原生<code>API</code>某些限制因素，<code>Vue.js</code>对数组七种可以改变自身数组的方法提供了变异方法支持，这七种方法分别为：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> methodsToPatch <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;pop&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;shift&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;unshift&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;splice&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;sort&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;reverse&#39;</span>
<span class="token punctuation">]</span>
</code></pre></div><p>对这七种方法的变异处理逻辑在<code>src/core/ovserver/array.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> def <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>
<span class="token keyword">const</span> arrayProto <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype
<span class="token keyword">export</span> <span class="token keyword">const</span> arrayMethods <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>arrayProto<span class="token punctuation">)</span>

<span class="token keyword">const</span> methodsToPatch <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;pop&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;shift&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;unshift&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;splice&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;sort&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;reverse&#39;</span>
<span class="token punctuation">]</span>

<span class="token doc-comment comment">/**
 * Intercept mutating methods and emit events
 */</span>
methodsToPatch<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// cache original method</span>
  <span class="token keyword">const</span> original <span class="token operator">=</span> arrayProto<span class="token punctuation">[</span>method<span class="token punctuation">]</span>
  <span class="token function">def</span><span class="token punctuation">(</span>arrayMethods<span class="token punctuation">,</span> method<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">mutator</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">original</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">const</span> ob <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__ob__
    <span class="token keyword">let</span> inserted
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>method<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;push&#39;</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token string">&#39;unshift&#39;</span><span class="token operator">:</span>
        inserted <span class="token operator">=</span> args
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;splice&#39;</span><span class="token operator">:</span>
        inserted <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>inserted<span class="token punctuation">)</span> ob<span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>inserted<span class="token punctuation">)</span>
    <span class="token comment">// notify change</span>
    ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> result
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div><p>代码分析：</p><ul><li>首先以<code>Array.prototype</code>原型创建一个新的变量，这个变量会在<code>protoAugment</code>或者<code>copyAugment</code>方法的时候使用到。</li><li>然后遍历七种方法，使用<code>def</code>来重新定义一个包裹方法。也就是说：当我们调用这七种任意一种方法的时候，首先调用我们的包裹方法，在包裹方法里面再调用原生对应的数组方法，这样做的目的是让我们可以在这个包裹方法中做我们自己的事情，例如<code>notify</code>，这个过程可以使用以下伪代码实例描述：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Array.prototype.push方法为例</span>
<span class="token keyword">function</span> <span class="token function">mutatorFunc</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token comment">// do something</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// 相当于</span>
    <span class="token function">mutatorFunc</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后我们接下来看一下<code>protoAugment</code>和<code>copyAugment</code>的实现，首先是最简单的<code>protoAugment</code>：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> arrayMethods <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>arrayProto<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">protoAugment</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> <span class="token literal-property property">src</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> src
<span class="token punctuation">}</span>

<span class="token comment">// 调用</span>
<span class="token function">protoAugment</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">)</span>

<span class="token comment">// 调用后</span>
arr<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略其它</span>
  <span class="token function-variable function">push</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">pop</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">shift</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">unshift</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">splice</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">sort</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">reverse</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>代码分析：当浏览器支持<code>__proto__</code>属性的时候，直接把<code>__proto__</code>指向我们创建的<code>arrayMethods</code>变量，这个包含我们在上面定义的七种变异方法。</p><p>当浏览器不支持<code>__proto__</code>属性的时候，我们就调用<code>copyAugment</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> arrayKeys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span>arrayMethods<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> arrayMethods <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>arrayProto<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">copyAugment</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">src</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">keys</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token function">def</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> src<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 调用</span>
<span class="token function">copyAugment</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>

<span class="token comment">// 调用后</span>
arr <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 省略其它</span>
  <span class="token function-variable function">push</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">pop</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">shift</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">unshift</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">splice</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">sort</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">reverse</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>代码分析：我们可以从代码中看到，当浏览器不支持<code>__proto__</code>的时候，会把我们创建的<code>arrayMethods</code>变量上所有的<code>key</code>，遍历赋值到<code>value</code>数组上。</p>`,56);function O(x,P){const a=o("ExternalLinkIcon");return e(),c("div",null,[k,r,s("p",null,[n("在之前的章节中，我们以及介绍过："),i,n("通过"),d,n("方法来定义响应式对象，我们可以在"),s("a",y,[n("Can I Use"),p(a)]),n("网站上搜索到，"),f,n("浏览器并不支持这个方法，这就是"),m,n("不支持"),g,n("及其以下版本浏览器的真正原因。")]),s("p",null,[n("在"),s("a",v,[n("MDN"),p(a)]),n("网站上，我们可以发现这个方法支持很多个参数，其中"),w,n("支持许多个可选的属性，对于"),b,n("实现响应式对象来说，最重要的是"),h,n("和"),j,n("属性。")]),_])}const V=t(l,[["render",O],["__file","reactive.html.vue"]]);export{V as default};
