import{_ as o,r as e,o as c,c as u,d as p,a as s,b as a,e as l}from"./app-c9515a38.js";const k="/blog/assets/vdom-hooks-c0275816.png",r={},i={href:"https://github.com/snabbdom/snabbdom",target:"_blank",rel:"noopener noreferrer"};function d(m,n){const t=e("ExternalLinkIcon");return c(),u("div",null,[n[10]||(n[10]=p(`<h1 id="createcomponent" tabindex="-1"><a class="header-anchor" href="#createcomponent" aria-hidden="true">#</a> createComponent</h1><p>在前面介绍<code>createElement</code>方法的过程中，我们提到过有两处都调用了<code>createComponent</code>方法，在这一节我们来详细分析一下<code>createComponent</code>方法的实现逻辑。</p><p><code>createComponent</code>是定义在<code>src/core/vmode/create-component.js</code>文件中的，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">Ctor</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">&gt;</span> <span class="token operator">|</span> Function <span class="token operator">|</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token operator">?</span>VNodeData<span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  tag<span class="token operator">?</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token operator">|</span> Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略其它</span>
  <span class="token keyword">const</span> baseCtor <span class="token operator">=</span> context<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_base
  <span class="token comment">// plain options object: turn it into a constructor</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Ctor <span class="token operator">=</span> baseCtor<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  data <span class="token operator">=</span> data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token comment">// resolve constructor options in case global mixins are applied after</span>
  <span class="token comment">// component constructor creation</span>
  <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span>

  <span class="token comment">// install component management hooks onto the placeholder node</span>
  <span class="token function">installComponentHooks</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

  <span class="token comment">// return a placeholder vnode</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> Ctor<span class="token punctuation">.</span>options<span class="token punctuation">.</span>name <span class="token operator">||</span> tag
  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue-component-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Ctor<span class="token punctuation">.</span>cid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    data<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span>
    <span class="token punctuation">{</span> Ctor<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> listeners<span class="token punctuation">,</span> tag<span class="token punctuation">,</span> children <span class="token punctuation">}</span><span class="token punctuation">,</span>
    asyncFactory
  <span class="token punctuation">)</span>
  <span class="token comment">// ...省略其它</span>
  <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>
</code></pre></div><p>因为<code>createComponent</code>方法要实现的功能点有很多，以上是我们的精简代码，其中被精简掉的代码有：<strong>组件检验相关</strong>、<strong>异步组件相关</strong>、<strong>获取prosData相关</strong>、<strong>抽象组件相关</strong>以及<strong>weex相关</strong>。</p><p>在分析<code>createComponent</code>方法的时候，我们主要关注两个方面的内容：<strong>构造子类构造函数</strong>和<strong>安装组件钩子函数</strong>。至于最后的创建组件<code>VNode</code>并返回<code>VNode</code>，则是最简单的，在这一步我们只需要知道创建组件<code>VNode</code>的时候，向<code>VNode</code>构造函数传递的第三个参数<code>children</code>为<code>undefined</code>，也就是说组件<code>VNode</code>没有<code>children</code>子节点，因为其值为<code>undefined</code>。</p><p>代码分析：</p><ul><li><strong>构造子类构造函数</strong>：在代码最开始，首先通过<code>$options._base</code>拿到基础构造函数，这个基础构造函数也就是大<code>Vue</code>的构造函数，<code>$options._base</code>赋值过程是在<code>initGlobalAPI</code>函数执行的过程中赋值的。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>_base <span class="token operator">=</span> Vue
<span class="token punctuation">}</span>
</code></pre></div><p>根据我们之前介绍的规则，我们在<code>options</code>上的属性，可以在后续通过<code>$options</code>拿到，这是因为在<code>this._init</code>方法的执行过程中，进行了<code>mergeOptions</code>配置合并。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
  <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span>
  options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  vm
<span class="token punctuation">)</span>
</code></pre></div><p>我们再来看一下<code>createComponent</code>的第一个参数，以<code>App.vue</code>组件为例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;@/components/HelloWorld.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    HelloWorld
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们在<code>App.vue</code>组件中<code>export</code>导出的是一个对象，其中对象定义了<code>name</code>、<code>data</code>以及<code>components</code>三个属性，那么<code>Ctor</code>参数就应该是这个对象，但当我们真实调试的时候却发现<code>Ctor</code>属性比我们想象的还要多，这是因为<code>vue-loader</code>在处理<code>.vue</code>文件的时候默认帮我们做了一些处理，以下是<code>App.vue</code>真实调试时的<code>Ctor</code>参数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Ctor <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">beforeCreate</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">beforeDestroy</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    HelloWorld
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">__file</span><span class="token operator">:</span> <span class="token string">&#39;./App.vue&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">_compiled</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接下来，我们来看一下<code>baseCtor.extend</code>，全局的<code>extend</code>方法的定义位置我们已经在之前介绍过了，它是在<code>initGlobalAPI</code>方法中调用<code>initExtend</code>时被定义的，其中<code>initExtend</code>定义在<code>src/core/global-api/extend.js</code>文件中，代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initExtend</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span>cid <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> cid <span class="token operator">=</span> <span class="token number">1</span>

  Vue<span class="token punctuation">.</span><span class="token function-variable function">extend</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">extendOptions</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
    extendOptions <span class="token operator">=</span> extendOptions <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">const</span> Super <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">const</span> SuperId <span class="token operator">=</span> Super<span class="token punctuation">.</span>cid
    <span class="token keyword">const</span> cachedCtors <span class="token operator">=</span> extendOptions<span class="token punctuation">.</span>_Ctor <span class="token operator">||</span> <span class="token punctuation">(</span>extendOptions<span class="token punctuation">.</span>_Ctor <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> name <span class="token operator">=</span> extendOptions<span class="token punctuation">.</span>name <span class="token operator">||</span> Super<span class="token punctuation">.</span>options<span class="token punctuation">.</span>name
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">validateComponentName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token function-variable function">Sub</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Super</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
    <span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> Sub
    Sub<span class="token punctuation">.</span>cid <span class="token operator">=</span> cid<span class="token operator">++</span>
    Sub<span class="token punctuation">.</span>options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
      Super<span class="token punctuation">.</span>options<span class="token punctuation">,</span>
      extendOptions
    <span class="token punctuation">)</span>
    Sub<span class="token punctuation">[</span><span class="token string">&#39;super&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Super

    <span class="token comment">// For props and computed properties, we define the proxy getters on</span>
    <span class="token comment">// the Vue instances at extension time, on the extended prototype. This</span>
    <span class="token comment">// avoids Object.defineProperty calls for each instance created.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initProps</span><span class="token punctuation">(</span>Sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initComputed</span><span class="token punctuation">(</span>Sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// allow further extension/mixin/plugin usage</span>
    Sub<span class="token punctuation">.</span>extend <span class="token operator">=</span> Super<span class="token punctuation">.</span>extend
    Sub<span class="token punctuation">.</span>mixin <span class="token operator">=</span> Super<span class="token punctuation">.</span>mixin
    Sub<span class="token punctuation">.</span>use <span class="token operator">=</span> Super<span class="token punctuation">.</span>use

    <span class="token comment">// create asset registers, so extended classes</span>
    <span class="token comment">// can have their private assets too.</span>
    <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Sub<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> Super<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// enable recursive self-lookup</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> Sub
    <span class="token punctuation">}</span>

    <span class="token comment">// keep a reference to the super options at extension time.</span>
    <span class="token comment">// later at instantiation we can check if Super&#39;s options have</span>
    <span class="token comment">// been updated.</span>
    Sub<span class="token punctuation">.</span>superOptions <span class="token operator">=</span> Super<span class="token punctuation">.</span>options
    Sub<span class="token punctuation">.</span>extendOptions <span class="token operator">=</span> extendOptions
    Sub<span class="token punctuation">.</span>sealedOptions <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> Sub<span class="token punctuation">.</span>options<span class="token punctuation">)</span>

    <span class="token comment">// cache constructor</span>
    cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span> <span class="token operator">=</span> Sub
    <span class="token keyword">return</span> Sub
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们看一下<code>Vue.extend</code>方法最核心的几段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Super <span class="token operator">=</span> <span class="token keyword">this</span>
<span class="token keyword">const</span> <span class="token function-variable function">Sub</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Super</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> Sub
</code></pre></div><p>在<code>extend</code>方法中，使用了非常经典的寄生组合继承的方式，来让<code>Sub</code>子类去继承父类的属性和方法。在原型继承之前，首先调用了<code>this._init</code>方法，这个方法的逻辑我们在之前已经提到过了，这里就不再累述。原型继承后，<code>Sub</code>子类就拥有了<code>Super</code>父类全部的属性和方法，例如：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">Super</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;Super&#39;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Super</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello Super&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">Sub</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Super</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Super</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> Sub

<span class="token keyword">const</span> sub <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sub</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sub<span class="token punctuation">.</span>id<span class="token punctuation">)</span>   <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sub<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// Super</span>
sub<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span>             <span class="token comment">// hellp Super</span>
</code></pre></div><p>我们来看另外几段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> cachedCtors <span class="token operator">=</span> extendOptions<span class="token punctuation">.</span>_Ctor <span class="token operator">||</span> <span class="token punctuation">(</span>extendOptions<span class="token punctuation">.</span>_Ctor <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span> <span class="token operator">=</span> Sub
</code></pre></div><p>这几段代码是用来缓存的，作用是：如果我们先在<code>A.vue</code>文件中引入了<code>header.vue</code>组件，它会执行一遍<code>extend</code>，随后我们又在<code>B.vue</code>文件中引入了<code>header.vue</code>，由于已经有了<code>header.vue</code>组件的缓存，因此不再执行后续的代码，直接返回。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// A.vue</span>
<span class="token keyword">import</span> MHeader <span class="token keyword">from</span> <span class="token string">&#39;@/components/header.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    MHeader
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// B.vue</span>
<span class="token keyword">import</span> MHeader <span class="token keyword">from</span> <span class="token string">&#39;@/components/header.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;BComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    MHeader
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// header.vue只会extend一次。</span>
</code></pre></div><p>最后在继承完毕后，还处理了<code>props</code>、<code>computed</code>以及各种全局API方法，这部分的逻辑跟之前我们提到过的是一样的，不再此累述。</p>`,26)),s("ul",null,[s("li",null,[n[1]||(n[1]=s("strong",null,"安装组件钩子函数",-1)),n[2]||(n[2]=a("：我们在前面提到过，")),n[3]||(n[3]=s("code",null,"Vue",-1)),n[4]||(n[4]=a("中的虚拟")),n[5]||(n[5]=s("code",null,"DOM",-1)),n[6]||(n[6]=a("借鉴了开源库")),s("a",i,[n[0]||(n[0]=a("snabbdom")),l(t)]),n[7]||(n[7]=a("的实现，在这个库里面当")),n[8]||(n[8]=s("code",null,"VNode",-1)),n[9]||(n[9]=a("节点处于不同的场景下，提供了对应的钩子函数来方便我们处理相关的逻辑，这些钩子函数如下："))])]),n[11]||(n[11]=p('<p><img src="'+k+`" alt="VNode钩子函数"></p><p>在<code>Vue</code>中也用到了这些钩子函数，它的定义如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> componentVNodeHooks <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">init</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>     <span class="token comment">// 初始化时触发</span>
  <span class="token function-variable function">prepatch</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// patch之前触发</span>
  <span class="token function-variable function">insert</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>   <span class="token comment">// 插入到DOM时触发</span>
  <span class="token function-variable function">destroy</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>   <span class="token comment">// 节点移除之前触发</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们来看一下，<code>installComponentHooks</code>方法的定义：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> hooksToMerge <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>componentVNodeHooks<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">installComponentHooks</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">data</span><span class="token operator">:</span> VNodeData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> hooks <span class="token operator">=</span> data<span class="token punctuation">.</span>hook <span class="token operator">||</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>hook <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> hooksToMerge<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> hooksToMerge<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">const</span> existing <span class="token operator">=</span> hooks<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">const</span> toMerge <span class="token operator">=</span> componentVNodeHooks<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>existing <span class="token operator">!==</span> toMerge <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>existing <span class="token operator">&amp;&amp;</span> existing<span class="token punctuation">.</span>_merged<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      hooks<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> existing <span class="token operator">?</span> <span class="token function">mergeHook</span><span class="token punctuation">(</span>toMerge<span class="token punctuation">,</span> existing<span class="token punctuation">)</span> <span class="token operator">:</span> toMerge
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>installComponentHooks</code>方法执行的时候，遍历了我们定义的<code>hooks</code>对象的属性，然后在遍历的过程中把这些<code>hook</code>赋值到我们传递的参数上面，其中有一个地方值得我们注意：如果已经有了相同的<code>hook</code>，则会执行<code>mergeHook</code>来合并，<code>mergeHook</code>方法的定义如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeHook</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">f1</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">f2</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">merged</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// flow complains about extra args which is why we use any</span>
    <span class="token function">f1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token function">f2</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  merged<span class="token punctuation">.</span>_merged <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> merged
<span class="token punctuation">}</span>
</code></pre></div><p>我们以下面代码为例，来举例说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 合并前</span>
<span class="token keyword">const</span> hooks <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">init</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;init hook 1&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">hook</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">init</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;init hook 2&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 合并</span>
<span class="token function">mergeHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 合并后</span>
<span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">hook</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">init</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">init1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">init2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>createComponent</code>这一小节，我们介绍了组件会进行<code>mergeOptions</code>配置合并，为了更好的理解<code>path</code>的过程，我们会在接下来的小节优先介绍<code>mergeOptions</code>配置合并策略。</p>`,10))])}const g=o(r,[["render",d],["__file","createComponent.html.vue"]]);export{g as default};
