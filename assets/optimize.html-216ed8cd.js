import{_ as n,o as s,c as a,d as t}from"./app-9fa24cce.js";const p={},o=t(`<h1 id="optimize优化" tabindex="-1"><a class="header-anchor" href="#optimize优化" aria-hidden="true">#</a> optimize优化</h1><p>在经过<code>parse</code>模板编译完成后，我们可以得到一个<code>ast</code>树形结构，接下来进行<code>optimize</code>优化第二大步骤。这个过程相比较其它两个步骤，是最简单的。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> parse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./parser/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> optimize <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./optimizer&#39;</span>

<span class="token keyword">function</span> <span class="token function">baseCompile</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span>
<span class="token punctuation">)</span><span class="token operator">:</span> CompiledResult <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>optimize <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">optimize</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>优化的<strong>目的</strong>在于：在编译的时候有些节点自首次渲染完毕后，在后续的派发更新过程中不会随着数据的变动而变动，因此我们在进行节点对比的时候，可以直接跳过这些节点，进一步加快组件渲染的速度。</p><p>在<code>optimize</code>优化的过程中，它的处理方式是深度遍历<code>ast</code>树形结构，遇到静态节点的时候把它的<code>ast.static</code>属性设置为<code>true</code>。同时对于一个父<code>ast</code>节点来说，当其<code>children</code>子节点全部为静态节点的时候，那么其本身也是一个静态节点，我们把它的<code>ast.staticRoot</code>设置为<code>true</code>。</p><p>在介绍<code>optimize</code>优化这个章节的时候，我们以下面这个例子为例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;span&gt;静态节点&lt;/span&gt;
  &lt;/div&gt;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>在以上例子中，<code>span</code>节点因为其内容是纯文本，因此它的<code>ast.static</code>一定为<code>true</code>。</p><p>我们回过头来看一下<code>optimize</code>方法的定义，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">optimize</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token operator">?</span>ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span>
  isStaticKey <span class="token operator">=</span> <span class="token function">genStaticKeysCached</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>staticKeys <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  isPlatformReservedTag <span class="token operator">=</span> options<span class="token punctuation">.</span>isReservedTag <span class="token operator">||</span> no
  <span class="token comment">// first pass: mark all non-static nodes.</span>
  <span class="token function">markStatic</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token comment">// second pass: mark static roots.</span>
  <span class="token function">markStaticRoots</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个方法中，它首先调用<code>markStatic</code>标记静态节点，然后调用<code>markStaticRoots</code>来标记静态根节点。</p><h2 id="静态节点类型" tabindex="-1"><a class="header-anchor" href="#静态节点类型" aria-hidden="true">#</a> 静态节点类型</h2><p>在<code>markStatic</code>方法中，它首先调用<code>isStatic</code>方法来判断当前<code>ast</code>是否为一个静态节点，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">markStatic</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">node</span><span class="token operator">:</span> ASTNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span>static <span class="token operator">=</span> <span class="token function">isStatic</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">isStatic</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">node</span><span class="token operator">:</span> ASTNode</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// expression</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// text</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>pre <span class="token operator">||</span> <span class="token punctuation">(</span>
    <span class="token operator">!</span>node<span class="token punctuation">.</span>hasBindings <span class="token operator">&amp;&amp;</span> <span class="token comment">// no dynamic bindings</span>
    <span class="token operator">!</span>node<span class="token punctuation">.</span>if <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>node<span class="token punctuation">.</span>for <span class="token operator">&amp;&amp;</span> <span class="token comment">// not v-if or v-for or v-else</span>
    <span class="token operator">!</span><span class="token function">isBuiltInTag</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// not a built-in</span>
    <span class="token function">isPlatformReservedTag</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// not a component</span>
    <span class="token operator">!</span><span class="token function">isDirectChildOfTemplateFor</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span>isStaticKey<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在阅读完<code>isStatic</code>方法后，我们发现静态节点必须满足以下几种情况：</p><ol><li>带插值(表达式)的文本节点，不是静态节点，例如：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 不是静态节点</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;{{msg}}&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><ol start="2"><li>纯文本节点，是静态节点，例如：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 是静态节点</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hello, Vue.js&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><ol start="3"><li>如果是普通元素节点，并且使用了<code>v-pre</code>指令，则是静态节点，例如：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 是静态节点</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div v-pre&gt;{{msg}}&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><ol start="4"><li>如果是普通元素，在没有使用<code>v-pre</code>指令的情况下，还必须同时满足：没有动态绑定属性、没有使用<code>v-if</code>、没有使用<code>v-for</code>、不是内置组件<code>slot/component</code>、是平台保留标签、不是带有<code>v-for</code>的<code>template</code>标签的直接子节点、节点的所有属性的<code>key</code>都是静态<code>key</code>，例如：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 是静态节点</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token string">&#39;&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;&#39;</span>
</code></pre></div><h2 id="标记静态节点" tabindex="-1"><a class="header-anchor" href="#标记静态节点" aria-hidden="true">#</a> 标记静态节点</h2><p>在分析完<code>isStatic</code>方法后，我们来分析一下<code>markStatic</code>标记静态节点方法的实现原理，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">markStatic</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">node</span><span class="token operator">:</span> ASTNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span>static <span class="token operator">=</span> <span class="token function">isStatic</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// do not make component slot content static. this avoids</span>
    <span class="token comment">// 1. components not able to mutate slot nodes</span>
    <span class="token comment">// 2. static slot content fails for hot-reloading</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token operator">!</span><span class="token function">isPlatformReservedTag</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      node<span class="token punctuation">.</span>tag <span class="token operator">!==</span> <span class="token string">&#39;slot&#39;</span> <span class="token operator">&amp;&amp;</span>
      node<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;inline-template&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> child <span class="token operator">=</span> node<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token function">markStatic</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>child<span class="token punctuation">.</span>static<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>static <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>ifConditions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> l <span class="token operator">=</span> node<span class="token punctuation">.</span>ifConditions<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> block <span class="token operator">=</span> node<span class="token punctuation">.</span>ifConditions<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>block
        <span class="token function">markStatic</span><span class="token punctuation">(</span>block<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>block<span class="token punctuation">.</span>static<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          node<span class="token punctuation">.</span>static <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>type=2</code>或<code>type=3</code>的时候，代表它们分别是带表达式的插值文本和纯文本，这个时候使用<code>isStatic</code>方法的返回结果，直接标记<code>static</code>属性为<code>true</code>即可。</li><li>对于<code>type=1</code>，它是普通元素节点的时候，判断逻辑稍微复杂一点。第一步首先需要使用<code>for</code>循环去遍历<code>children</code>子节点，然后在<code>for</code>循环中递归调用<code>markStatic</code>方法，以达到深度遍历并标记子节点的目的。在这个过程中，唯一一个值得注意的地方就是，在对<code>children</code>子节点标记完毕后，会根据子节点的<code>static</code>属性来设置父节点的<code>static</code>属性。只要有一个子节点的<code>static</code>属性不为<code>true</code>，那么父节点也一定不为<code>true</code>。第二步，如果当前节点有<code>v-if/v-else-if/v-else</code>等指令，由于这些节点并不会保存在<code>children</code>数组中，而是在<code>node.ifConditions</code>属性下面，因此我们需要遍历<code>ifConditions</code>数组，来递归标记子节点。同样的，在标记完子节点后，我们需要根据子节点的<code>static</code>来同步更新父节点的<code>static</code>。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> showMsg <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div&gt;
    &lt;div v-if=&quot;showMsg&quot;&gt;show&lt;/div&gt;
    &lt;div v-else=&quot;showMsg&quot;&gt;not show&lt;/div&gt;
  &lt;/div&gt;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">ifConditions</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">exp</span><span class="token operator">:</span> <span class="token string">&#39;showMsg&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">block</span><span class="token operator">:</span> <span class="token string">&#39;div的ast节点&#39;</span> <span class="token punctuation">}</span>，
    <span class="token punctuation">{</span> <span class="token literal-property property">exp</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">block</span><span class="token operator">:</span> <span class="token string">&#39;div的ast节点&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="标记静态根节点" tabindex="-1"><a class="header-anchor" href="#标记静态根节点" aria-hidden="true">#</a> 标记静态根节点</h2><p>在介绍完标记静态节点后，我们接着要介绍标记静态根节点<code>markStaticRoots</code>方法，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">markStaticRoots</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">node</span><span class="token operator">:</span> ASTNode<span class="token punctuation">,</span> <span class="token literal-property property">isInFor</span><span class="token operator">:</span> boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>static <span class="token operator">||</span> node<span class="token punctuation">.</span>once<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      node<span class="token punctuation">.</span>staticInFor <span class="token operator">=</span> isInFor
    <span class="token punctuation">}</span>
    <span class="token comment">// For a node to qualify as a static root, it should have children that</span>
    <span class="token comment">// are not just static text. Otherwise the cost of hoisting out will</span>
    <span class="token comment">// outweigh the benefits and it&#39;s better off to just always render it fresh.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>static <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>
      node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span>
      node<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">3</span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      node<span class="token punctuation">.</span>staticRoot <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      node<span class="token punctuation">.</span>staticRoot <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">markStaticRoots</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> isInFor <span class="token operator">||</span> <span class="token operator">!</span><span class="token operator">!</span>node<span class="token punctuation">.</span>for<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>ifConditions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> l <span class="token operator">=</span> node<span class="token punctuation">.</span>ifConditions<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">markStaticRoots</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>ifConditions<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>block<span class="token punctuation">,</span> isInFor<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，在<code>markStaticRoots</code>方法中它对于<code>children</code>子节点和带<code>v-if/v-else-if/v-else</code>等指令的处理过程是类似的，我们省略这部分内容重复的介绍。</p><p>我们来看下面这段有意思的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// For a node to qualify as a static root, it should have children that</span>
<span class="token comment">// are not just static text. Otherwise the cost of hoisting out will</span>
<span class="token comment">// outweigh the benefits and it&#39;s better off to just always render it fresh.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>static <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>
  node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span>
  node<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">3</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span>staticRoot <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span>staticRoot <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们从注释中也可以看出来，如果当前节点<code>static</code>属性为<code>true</code>了，要标记它为静态根节点的话，还必须满足它的子节点不能只有一个纯文本节点，因为这样做其优化成本要大于其收益。</p>`,36),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","optimize.html.vue"]]);export{k as default};
