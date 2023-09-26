import{_ as n,o as s,c as a,d as p}from"./app-0efc644a.js";const o={},t=p(`<h1 id="vnode介绍" tabindex="-1"><a class="header-anchor" href="#vnode介绍" aria-hidden="true">#</a> VNode介绍</h1><p>在<code>DOM</code>元素中有不同类型的节点，例如：<strong>元素节点</strong>、<strong>文本节点</strong>和<strong>注释节点</strong>，如果<code>VNode</code>实例代表节点的话，那么<code>VNode</code>实例应该能创建不同类型的实例，用来表示不同类型的节点，而<code>VNode</code>也确实可以做到。<code>VNode</code>类定义在<code>src/core/vdom/vnode.js</code>文件中，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VNode</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> VNodeData <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">elm</span><span class="token operator">:</span> Node <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">ns</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// rendered in this component&#39;s scope</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string <span class="token operator">|</span> number <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">componentOptions</span><span class="token operator">:</span> VNodeComponentOptions <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">componentInstance</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// component instance</span>
  <span class="token literal-property property">parent</span><span class="token operator">:</span> VNode <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// component placeholder node</span>

  <span class="token comment">// strictly internal</span>
  <span class="token literal-property property">raw</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// contains raw HTML? (server only)</span>
  <span class="token literal-property property">isStatic</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// hoisted static node</span>
  <span class="token literal-property property">isRootInsert</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// necessary for enter transition check</span>
  <span class="token literal-property property">isComment</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// empty comment placeholder?</span>
  <span class="token literal-property property">isCloned</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// is a cloned node?</span>
  <span class="token literal-property property">isOnce</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// is a v-once node?</span>
  <span class="token literal-property property">asyncFactory</span><span class="token operator">:</span> Function <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// async component factory function</span>
  <span class="token literal-property property">asyncMeta</span><span class="token operator">:</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">isAsyncPlaceholder</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">ssrContext</span><span class="token operator">:</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">fnContext</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// real context vm for functional nodes</span>
  <span class="token literal-property property">fnOptions</span><span class="token operator">:</span> <span class="token operator">?</span>ComponentOptions<span class="token punctuation">;</span> <span class="token comment">// for SSR caching</span>
  <span class="token literal-property property">devtoolsMeta</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">;</span> <span class="token comment">// used to store functional render context for devtools</span>
  <span class="token literal-property property">fnScopeId</span><span class="token operator">:</span> <span class="token operator">?</span>string<span class="token punctuation">;</span> <span class="token comment">// functional scope id support</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span>
    <span class="token parameter">tag<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    data<span class="token operator">?</span><span class="token operator">:</span> VNodeData<span class="token punctuation">,</span>
    children<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span> 
    text<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    elm<span class="token operator">?</span><span class="token operator">:</span> Node<span class="token punctuation">,</span>
    context<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    componentOptions<span class="token operator">?</span><span class="token operator">:</span> VNodeComponentOptions<span class="token punctuation">,</span>
    asyncFactory<span class="token operator">?</span><span class="token operator">:</span> Function</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> tag
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data
    <span class="token keyword">this</span><span class="token punctuation">.</span>children <span class="token operator">=</span> children
    <span class="token keyword">this</span><span class="token punctuation">.</span>text <span class="token operator">=</span> text
    <span class="token keyword">this</span><span class="token punctuation">.</span>elm <span class="token operator">=</span> elm
    <span class="token keyword">this</span><span class="token punctuation">.</span>ns <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> context
    <span class="token keyword">this</span><span class="token punctuation">.</span>fnContext <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>fnOptions <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>fnScopeId <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> data <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>key
    <span class="token keyword">this</span><span class="token punctuation">.</span>componentOptions <span class="token operator">=</span> componentOptions
    <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>raw <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isStatic <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isRootInsert <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isComment <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isCloned <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isOnce <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>asyncFactory <span class="token operator">=</span> asyncFactory
    <span class="token keyword">this</span><span class="token punctuation">.</span>asyncMeta <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isAsyncPlaceholder <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// DEPRECATED: alias for componentInstance for backwards compat.</span>
  <span class="token comment">/* istanbul ignore next */</span>
  <span class="token keyword">get</span> <span class="token function">child</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以从以上代码看到，<code>VNode</code>有很多个属性，我们千万不要被这些属性吓到，最重要的属性只有几个：<code>tag</code>、<code>data</code>、<code>children</code>和<code>key</code>。其余很多属性只是在<code>Vue</code>中为适用不同的场景，额外添加的。</p><p><code>Vue</code>中的<code>VNode</code>实例有几种类型，具体如下：</p><ul><li>注释节点：注释节点可以使用<code>text</code>和<code>isComment</code>两个属性来配合表示。</li></ul><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 一个注释节点 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>在<code>Vue</code>中，我们通过<code>createEmptyVNode</code>方法来定义注释节点，此方法跟<code>VNode</code>类是定义在同一个地方，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> createEmptyVNode <span class="token operator">=</span> <span class="token punctuation">(</span>text<span class="token operator">:</span> string <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  node<span class="token punctuation">.</span>text <span class="token operator">=</span> text
  node<span class="token punctuation">.</span>isComment <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> node
<span class="token punctuation">}</span>
</code></pre></div><ul><li>文本节点：文本节点比注释节点更简单，只需要<code>text</code>属性即可。</li></ul><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  一个文本节点
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>创建文本节点可以使用<code>createTextVNode</code>方法，此方法跟<code>VNode</code>类是定义在同一个地方，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createTextVNode</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">val</span><span class="token operator">:</span> string <span class="token operator">|</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token function">String</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>克隆节点：克隆节点是将现有某个节点的所有属性全部克隆到另外一个新节点，让新节点和某个节点属性保持一致，唯一的区别是新克隆节点的<code>isCloned</code>属性为<code>true</code>，我们会在后续组件章节介绍克隆节点的具体作用。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 原始文本节点</span>
<span class="token keyword">const</span> originNode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;原始节点&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">isCloned</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// 克隆文本节点</span>
<span class="token keyword">const</span> cloneNode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;原始节点&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">isCloned</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre></div><p>克隆一个节点，可以使用<code>cloneVNode</code>方法，它与<code>VNode</code>类是定义在同一个地方，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">cloneVNode</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vnode</span><span class="token operator">:</span> VNode</span><span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token punctuation">{</span>
  <span class="token keyword">const</span> cloned <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span>
    vnode<span class="token punctuation">.</span>tag<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
    <span class="token comment">// #7975</span>
    <span class="token comment">// clone children array to avoid mutating original in case of cloning</span>
    <span class="token comment">// a child.</span>
    vnode<span class="token punctuation">.</span>children <span class="token operator">&amp;&amp;</span> vnode<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>text<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>context<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>componentOptions<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>asyncFactory
  <span class="token punctuation">)</span>
  cloned<span class="token punctuation">.</span>ns <span class="token operator">=</span> vnode<span class="token punctuation">.</span>ns
  cloned<span class="token punctuation">.</span>isStatic <span class="token operator">=</span> vnode<span class="token punctuation">.</span>isStatic
  cloned<span class="token punctuation">.</span>key <span class="token operator">=</span> vnode<span class="token punctuation">.</span>key
  cloned<span class="token punctuation">.</span>isComment <span class="token operator">=</span> vnode<span class="token punctuation">.</span>isComment
  cloned<span class="token punctuation">.</span>fnContext <span class="token operator">=</span> vnode<span class="token punctuation">.</span>fnContext
  cloned<span class="token punctuation">.</span>fnOptions <span class="token operator">=</span> vnode<span class="token punctuation">.</span>fnOptions
  cloned<span class="token punctuation">.</span>fnScopeId <span class="token operator">=</span> vnode<span class="token punctuation">.</span>fnScopeId
  cloned<span class="token punctuation">.</span>asyncMeta <span class="token operator">=</span> vnode<span class="token punctuation">.</span>asyncMeta
  cloned<span class="token punctuation">.</span>isCloned <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> cloned
<span class="token punctuation">}</span>
</code></pre></div><ul><li>元素节点：元素节点是我们日常开发中接触最多的，它可以使用<code>tag</code>、<code>data</code>、<code>children</code>和<code>context</code>几个属性配合表示。</li></ul><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app-main<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>元素节点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>假设以上<code>template</code>模板，那么<code>div</code>元素节点可以使用<code>VNode</code>表示为：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;app&#39;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">&#39;app-main&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>VNode<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> vm
<span class="token punctuation">}</span>
</code></pre></div><ol><li><code>tag</code>表示为元素标签的类型，例如：<code>p</code>、<code>div</code>或者<code>ul</code>等。</li><li><code>data</code>表示节点上的数据，包括<code>atts</code>、<code>style</code>和<code>class</code>等。</li><li><code>children</code>表示子节点列表，它是一个<code>VNode</code>实例数组。</li><li><code>context</code>当前节点所处的编译作用域。</li></ol><ul><li>组件节点：组件节点和元素节点有很多相似的地方，但它有两个独有的属性，分别是<code>componentOptions</code>和<code>componentInstance</code>，其中<code>componentOptions</code>表示组件的<code>options</code>选项，<code>componentInstance</code>表示当前组件的实例。</li></ul><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-component</span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,24),e=[t];function c(l,r){return s(),a("div",null,e)}const u=n(o,[["render",c],["__file","vnode.html.vue"]]);export{u as default};
