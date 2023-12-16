import{_ as n,o as s,c as a,d as t}from"./app-J3MrH26B.js";const p={},o=t(`<h1 id="插槽" tabindex="-1"><a class="header-anchor" href="#插槽" aria-hidden="true">#</a> 插槽</h1><h2 id="插槽的编译" tabindex="-1"><a class="header-anchor" href="#插槽的编译" aria-hidden="true">#</a> 插槽的编译</h2><p>对于插槽的编译，我们只需要记住一句话：<strong>父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。</strong></p><p><strong>注意</strong>：由于在<code>Vue2.6+</code>版本中，对于插槽相关的内容有所改动：它废弃了旧的用法，新增了<code>v-slot</code>指令。虽然依旧会在<code>Vue2.0</code>版本进行兼容，但在<code>Vue3.0</code>版本会将其进行移除，因此我们在分析插槽实现原理这一章节会以最新的<code>v-slot</code>新语法进行分析。</p><p>我们使用如下案例来分析插槽的编译原理：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 子组件</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div&gt;
    &lt;slot name=&quot;header&quot; /&gt;
    &lt;slot /&gt;
    &lt;slot name=&quot;footer&quot; /&gt;
  &lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 父组件</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;child-component&gt;
      &lt;template v-slot:header&gt;
        插槽头部内容
      &lt;/template&gt;
      &lt;template v-slot&gt;
        插槽内容
      &lt;/template&gt;
      &lt;template v-slot:footer&gt;
        插槽底部内容
      &lt;/template&gt;
    &lt;/child-component&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="父组件的插槽编译" tabindex="-1"><a class="header-anchor" href="#父组件的插槽编译" aria-hidden="true">#</a> 父组件的插槽编译</h3><p>当编译第一个<code>template</code>标签调用<code>processElement</code>方法的时候，会在这个方法里面调用<code>processSlotContent</code>来处理与插槽相关的内容：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">processElement</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">element</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token function">processSlotOutlet</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">return</span> element
<span class="token punctuation">}</span>


</code></pre></div><p>就我们的例子而言，在<code>processSlotContent</code>方法中，其相关代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> slotRE <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^v-slot(:|$)|^#</span><span class="token regex-delimiter">/</span></span>
<span class="token keyword">export</span> <span class="token keyword">const</span> emptySlotScopeToken <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_empty_</span><span class="token template-punctuation string">\`</span></span>
<span class="token keyword">function</span> <span class="token function">processSlotContent</span> <span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> slotScope
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// v-slot on &lt;template&gt;</span>
    <span class="token keyword">const</span> slotBinding <span class="token operator">=</span> <span class="token function">getAndRemoveAttrByRegex</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> slotRE<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>slotBinding<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ..异常处理</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> dynamic <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getSlotName</span><span class="token punctuation">(</span>slotBinding<span class="token punctuation">)</span>
      el<span class="token punctuation">.</span>slotTarget <span class="token operator">=</span> name
      el<span class="token punctuation">.</span>slotTargetDynamic <span class="token operator">=</span> dynamic
      el<span class="token punctuation">.</span>slotScope <span class="token operator">=</span> slotBinding<span class="token punctuation">.</span>value <span class="token operator">||</span> emptySlotScopeToken
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ol><li>首先调用<code>getAndRemoveAttrByRegex</code>方法并给第二个参数传入<code>slotRE</code>正则表达式，用来获取并移除当前<code>ast</code>对象上的<code>v-slot</code>属性。</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// before</span>
<span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">attrsList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;v-slot:header&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">// after</span>
<span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">attrsList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="2"><li>随后通过调用<code>getSlotName</code>方法来获取插槽的名字以及获取是否为动态插槽名。</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> dynamic <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getSlotName</span><span class="token punctuation">(</span>slotBinding<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>     <span class="token comment">// &quot;header&quot;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dynamic<span class="token punctuation">)</span>  <span class="token comment">// false</span>

<span class="token keyword">function</span> <span class="token function">getSlotName</span> <span class="token punctuation">(</span><span class="token parameter">binding</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> name <span class="token operator">=</span> binding<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>slotRE<span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>binding<span class="token punctuation">.</span>name<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">&#39;#&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      name <span class="token operator">=</span> <span class="token string">&#39;default&#39;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">v-slot shorthand syntax requires a slot name.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        binding
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> dynamicArgRE<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token comment">// dynamic [name]</span>
    <span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> name<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token literal-property property">dynamic</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    <span class="token comment">// static name</span>
    <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token literal-property property">dynamic</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li>最后如果正则解析到有作用域插槽，则赋值给<code>slotScope</code>属性，如果没有则取一个默认的值<code>_empty_</code>。</li></ol><p>对于第二个、第三个<code>template</code>标签而言，它们的编译过程是一样的，当这三个标签全部编译完毕后，我们可以得到如下三个<code>ast</code>对象：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// header</span>
<span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;header&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span> <span class="token punctuation">}</span>
<span class="token comment">// default</span>
<span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;default&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span> <span class="token punctuation">}</span>
<span class="token comment">// footer</span>
<span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;footer&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span> <span class="token punctuation">}</span>
</code></pre></div><p>随后，我们在<code>closeElement</code>方法中可以看到如下代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>element<span class="token punctuation">.</span>slotScope<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// scoped slot</span>
  <span class="token comment">// keep it in the children list so that v-else(-if) conditions can</span>
  <span class="token comment">// find it as the prev node.</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> element<span class="token punctuation">.</span>slotTarget <span class="token operator">||</span> <span class="token string">&#39;&quot;default&quot;&#39;</span>
  <span class="token punctuation">;</span><span class="token punctuation">(</span>currentParent<span class="token punctuation">.</span>scopedSlots <span class="token operator">||</span> <span class="token punctuation">(</span>currentParent<span class="token punctuation">.</span>scopedSlots <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> element
<span class="token punctuation">}</span>
currentParent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
element<span class="token punctuation">.</span>parent <span class="token operator">=</span> currentParent
</code></pre></div><p>首先，我们关注<code>if</code>分支里面的逻辑，<code>element</code>可以理解为以上任意一个<code>template</code>标签的<code>ast</code>对象。当<code>ast</code>对象存在<code>slotScope</code>属性的时候，<code>Vue</code>把当前<code>ast</code>节点挂到父级的<code>scopedSlots</code>属性上面：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 举例使用，实际为AST对象</span>
<span class="token keyword">const</span> parentAST <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">scopedSlots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;header&#39;</span><span class="token operator">:</span> <span class="token string">&#39;headerAST&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;default&#39;</span><span class="token operator">:</span> <span class="token string">&#39;defaultAST&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;footer&#39;</span><span class="token operator">:</span> <span class="token string">&#39;footerAST&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>if</code>分支外面，它又维护了父、子<code>AST</code>对象的树形结构，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 举例使用，实际为AST对象</span>
<span class="token keyword">const</span> parentAST <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;header&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span> <span class="token string">&#39;parentAST&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;default&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span> <span class="token string">&#39;parentAST&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;footer&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span> <span class="token string">&#39;parentAST&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">scopedSlots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;header&#39;</span><span class="token operator">:</span> <span class="token string">&#39;headerAST&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;default&#39;</span><span class="token operator">:</span> <span class="token string">&#39;defaultAST&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;footer&#39;</span><span class="token operator">:</span> <span class="token string">&#39;footerAST&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>看到这里，你可能会非常疑惑：<strong>插槽的内容应该分发到子组件，为什么要把插槽AST对象添加到父级的Children数组中呢？</strong></p><p>如果你注意观察上面代码注释的话，你就能明白为什么样这样做，这样做的目的是：<strong>正确维护<code>v-else或者v-else-if</code>标签关系。</strong></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div&gt;
    &lt;p v-if=&quot;showSlot&quot;&gt;&lt;/p&gt;
    &lt;template v-else-if=&quot;showDefaultSlot&quot; v-slot:default&gt;插槽内容&lt;/template&gt;
    &lt;p v-else&gt;&lt;/p&gt;
  &lt;/div&gt;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>当<code>tree</code>层级关系确定后，再从<code>children</code>数组中过滤掉插槽<code>AST</code>元素：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// final children cleanup</span>
<span class="token comment">// filter out scoped slots</span>
element<span class="token punctuation">.</span>children <span class="token operator">=</span> element<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token punctuation">(</span>c<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>slotScope<span class="token punctuation">)</span>
</code></pre></div><p>当父组件编译完毕后，我们可以得到如下<code>ast</code>对象：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">scopedSlots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;header&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;header&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;default&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;default&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;footer&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotTarget</span><span class="token operator">:</span> <span class="token string">&#39;&quot;footer&quot;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotScope</span><span class="token operator">:</span> <span class="token string">&#39;_empty_&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>既然<code>parse</code>解析过程已经结束了，那么我们来看<code>codegen</code>阶段。在<code>genData</code>方法中，与插槽相关的处理逻辑如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token comment">// slot target</span>
  <span class="token comment">// only for non-scoped slots</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>slotTarget <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>slotScope<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">slot:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>el<span class="token punctuation">.</span>slotTarget<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">// scoped slots</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>scopedSlots<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genScopedSlots</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> el<span class="token punctuation">.</span>scopedSlots<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于父组件而言，因为它有<code>scopedSlots</code>属性，所以会调用<code>genScopedSlots</code>方法来处理，我们来看一下这个方法的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genScopedSlots</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> ASTElement <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span>
<span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">const</span> generatedSlots <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>slots<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> <span class="token function">genScopedSlot</span><span class="token punctuation">(</span>slots<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">scopedSlots:_u([</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>generatedSlots<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
    needsForceUpdate <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,null,true</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
    <span class="token operator">!</span>needsForceUpdate <span class="token operator">&amp;&amp;</span> needsKey <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,null,false,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">hash</span><span class="token punctuation">(</span>generatedSlots<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">genScopedSlot</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span>
<span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isLegacySyntax <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;slot-scope&#39;</span><span class="token punctuation">]</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">const</span> slotScope <span class="token operator">=</span> el<span class="token punctuation">.</span>slotScope <span class="token operator">===</span> emptySlotScopeToken
    <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
    <span class="token operator">:</span> <span class="token function">String</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>slotScope<span class="token punctuation">)</span>
  <span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">function(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>slotScope<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">){</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">return </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;template&#39;</span>
      <span class="token operator">?</span> el<span class="token punctuation">.</span>if <span class="token operator">&amp;&amp;</span> isLegacySyntax
        <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>el<span class="token punctuation">.</span>if<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;undefined&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:undefined</span><span class="token template-punctuation string">\`</span></span>
        <span class="token operator">:</span> <span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;undefined&#39;</span>
      <span class="token operator">:</span> <span class="token function">genElement</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
    <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">\`</span></span>
  <span class="token comment">// reverse proxy v-slot without scope on this.$slots</span>
  <span class="token keyword">const</span> reverseProxy <span class="token operator">=</span> slotScope <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,proxy:true</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">{key:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>el<span class="token punctuation">.</span>slotTarget <span class="token operator">||</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&quot;default&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,fn:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>fn<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>reverseProxy<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果我们仔细观察<code>genScopedSlots</code>和<code>genScopedSlot</code>的代码，就能发现核心代码是在<code>genScopedSlot</code>方法对于<code>fn</code>变量的赋值这一块。我们现在不用把所有判断全部搞清楚，只需要按照我们的例子进行分解即可：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">function(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>slotScope<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">){
  return </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;undefined&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>因为<code>template</code>里面只是一个简单的文本内容，所以当调用<code>genChildren</code>方法完毕后，<code>genScopedSlot</code>返回值如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> headerResult <span class="token operator">=</span> <span class="token string">&#39;{key:&quot;header&quot;,fn:function(){return [_v(&quot;插槽头部内容&quot;)]},proxy:true}&#39;</span>
<span class="token keyword">let</span> defaultResult <span class="token operator">=</span> <span class="token string">&#39;{key:&quot;default&quot;,fn:function(){return [_v(&quot;插槽内容&quot;)]},proxy:true}&#39;</span>
<span class="token keyword">let</span> footerResult <span class="token operator">=</span> <span class="token string">&#39;{key:&quot;footer&quot;,fn:function(){return [_v(&quot;插槽底部内容&quot;)]},proxy:true}&#39;</span>
</code></pre></div><p>最后，回到<code>genScopedSlots</code>方法中，把结果串联起来：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  {
    scopedSlots:_u([
      { key:&quot;header&quot;,fn:function(){return [_v(&quot;插槽头部内容&quot;)]},proxy:true },
      { key:&quot;default&quot;,fn:function(){return [_v(&quot;插槽内容&quot;)]},proxy:true },
      { key:&quot;footer&quot;,fn:function(){return [_v(&quot;插槽底部内容&quot;)]},proxy:true}
    ])
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p><strong>注意</strong>：<code>_u</code>方法是<code>resolveScopedSlots</code>方法的缩写形式，我们会在后面进行介绍。</p><p>当<code>codegen</code>代码生成阶段执行完毕后，得到的<code>render</code>函数如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;child-component&#39;, {
    scopedSlots:_u([
      { key:&quot;header&quot;,fn:function(){return [_v(&quot;插槽头部内容&quot;)]},proxy:true },
      { key:&quot;default&quot;,fn:function(){return [_v(&quot;插槽内容&quot;)]},proxy:true },
      { key:&quot;footer&quot;,fn:function(){return [_v(&quot;插槽底部内容&quot;)]},proxy:true}
    ])
  })
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><h3 id="子组件的插槽编译" tabindex="-1"><a class="header-anchor" href="#子组件的插槽编译" aria-hidden="true">#</a> 子组件的插槽编译</h3><p>子组件的插槽的<code>parse</code>解析过程与普通标签没有太大的区别，我们直接看<code>parse</code>阶段完毕后的<code>ast</code>:</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;slot&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotName</span><span class="token operator">:</span> <span class="token string">&#39;&quot;header&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;slot&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotName</span><span class="token operator">:</span> <span class="token string">&#39;&quot;default&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;slot&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">slotName</span><span class="token operator">:</span> <span class="token string">&#39;&quot;footer&quot;&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>codegen</code>代码生成阶段，当调用<code>genElement</code>方法时，会命中如下分支：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;slot&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">genSlot</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>命中<code>else if</code>分支后，会调用<code>genSlot</code>方法，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genSlot</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">const</span> slotName <span class="token operator">=</span> el<span class="token punctuation">.</span>slotName <span class="token operator">||</span> <span class="token string">&#39;&quot;default&quot;&#39;</span>
  <span class="token keyword">const</span> children <span class="token operator">=</span> <span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_t(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>slotName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>children <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>children<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">const</span> attrs <span class="token operator">=</span> el<span class="token punctuation">.</span>attrs <span class="token operator">||</span> el<span class="token punctuation">.</span>dynamicAttrs
    <span class="token operator">?</span> <span class="token function">genProps</span><span class="token punctuation">(</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>attrs <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>dynamicAttrs <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">attr</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token comment">// slot props are camelized</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token function">camelize</span><span class="token punctuation">(</span>attr<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> attr<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
        <span class="token literal-property property">dynamic</span><span class="token operator">:</span> attr<span class="token punctuation">.</span>dynamic
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token keyword">const</span> bind <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;v-bind&#39;</span><span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>attrs <span class="token operator">||</span> bind<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,null</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>attrs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>attrs<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>bind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>attrs <span class="token operator">?</span> <span class="token string">&#39;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;,null&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bind<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res <span class="token operator">+</span> <span class="token string">&#39;)&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>genSlot</code>方法不是很复杂，也很好理解，所以我们直接看最后生成的<code>render</code>函数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;div&#39;,[
    _t(&quot;header&quot;),
    _t(&quot;default&quot;),
    _t(&quot;footer&quot;)
  ],2)
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p><strong>注意</strong>：<code>_t</code>是<code>renderSlot</code>方法的缩写形式。</p><h2 id="插槽的patch" tabindex="-1"><a class="header-anchor" href="#插槽的patch" aria-hidden="true">#</a> 插槽的patch</h2><p>当处于<code>patch</code>阶段的时候，它会调用<code>render</code>函数生成<code>vnode</code>。在上一节中，我们得到了父、子组件两个<code>render</code>函数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件render函数</span>
<span class="token keyword">const</span> parentRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;child-component&#39;, {
    scopedSlots:_u([
      { key:&quot;header&quot;,fn:function(){return [_v(&quot;插槽头部内容&quot;)]},proxy:true },
      { key:&quot;default&quot;,fn:function(){return [_v(&quot;插槽内容&quot;)]},proxy:true },
      { key:&quot;footer&quot;,fn:function(){return [_v(&quot;插槽底部内容&quot;)]},proxy:true}
    ])
  })
}</span><span class="token template-punctuation string">\`</span></span>

<span class="token comment">// 子组件render函数</span>
<span class="token keyword">const</span> childRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;div&#39;,[
    _t(&quot;header&quot;),
    _t(&quot;default&quot;),
    _t(&quot;footer&quot;)
  ],2)
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>当执行<code>render</code>函数的时候，会调用<code>_c</code>、<code>_u</code>、<code>_v</code>以及<code>_t</code>这些函数，在这几个函数中我们重点关注<code>_u</code>和<code>_t</code>这两个函数。</p><p><code>_u</code>函数的代码如下，它定义在<code>src/core/instance/render-helpers/resolve-scoped-slots.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// _u函数</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveScopedSlots</span> <span class="token punctuation">(</span>
  <span class="token literal-property property">fns</span><span class="token operator">:</span> ScopedSlotsData<span class="token punctuation">,</span> <span class="token comment">// see flow/vnode</span>
  res<span class="token operator">?</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token comment">// the following are added in 2.6</span>
  hasDynamicKeys<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  contentHashKey<span class="token operator">?</span><span class="token operator">:</span> number
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> Function<span class="token punctuation">,</span> <span class="token literal-property property">$stable</span><span class="token operator">:</span> boolean <span class="token punctuation">}</span> <span class="token punctuation">{</span>
  res <span class="token operator">=</span> res <span class="token operator">||</span> <span class="token punctuation">{</span> <span class="token literal-property property">$stable</span><span class="token operator">:</span> <span class="token operator">!</span>hasDynamicKeys <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> fns<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> slot <span class="token operator">=</span> fns<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">resolveScopedSlots</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> res<span class="token punctuation">,</span> hasDynamicKeys<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// marker for reverse proxying v-slot without scope on this.$slots</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>slot<span class="token punctuation">.</span>proxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        slot<span class="token punctuation">.</span>fn<span class="token punctuation">.</span>proxy <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
      res<span class="token punctuation">[</span>slot<span class="token punctuation">.</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> slot<span class="token punctuation">.</span>fn
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>contentHashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>res<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>$key <span class="token operator">=</span> contentHashKey
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：当<code>resolveScopedSlots</code>函数调用的时候，我们传递了一个<code>fns</code>数组，在这个方法中首先会遍历<code>fns</code>，然后把当前遍历的对象赋值到<code>res</code>对象中，其中<code>slot.key</code>当做键，<code>slot.fn</code>当做值。当<code>resolveScopedSlots</code>方法调用完毕后，我们能得到如下<code>res</code>对象：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">header</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;插槽头部内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;插槽内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">footer</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;插槽底部内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>_t</code>函数的代码如下，它定义在<code>src/core/instance/render-helpers/render-slot.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// _t函数</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">renderSlot</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">fallback</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">bindObject</span><span class="token operator">:</span> <span class="token operator">?</span>Object</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> scopedSlotFn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
  <span class="token keyword">let</span> nodes
  <span class="token keyword">if</span> <span class="token punctuation">(</span>scopedSlotFn<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// scoped slot</span>
    props <span class="token operator">=</span> props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bindObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>bindObject<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">&#39;slot v-bind without argument expects an Object&#39;</span><span class="token punctuation">,</span>
          <span class="token keyword">this</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      props <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> bindObject<span class="token punctuation">)</span><span class="token punctuation">,</span> props<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    nodes <span class="token operator">=</span> <span class="token function">scopedSlotFn</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">||</span> fallback
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    nodes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">||</span> fallback
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> target <span class="token operator">=</span> props <span class="token operator">&amp;&amp;</span> props<span class="token punctuation">.</span>slot
  <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$createElement</span><span class="token punctuation">(</span><span class="token string">&#39;template&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">slot</span><span class="token operator">:</span> target <span class="token punctuation">}</span><span class="token punctuation">,</span> nodes<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> nodes
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们在分析<code>renderSlot</code>方法之前，先来看<code>this.$scopedSlots</code>这个属性。当调用<code>renderSlot</code>方法的时候，这里的<code>this</code>代表子组件实例，其中<code>$scopedSlots</code>方法是在子组件的<code>_render</code>方法被调用的时候赋值的。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_render</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> _parentVnode <span class="token punctuation">}</span> <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>_parentVnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>$scopedSlots <span class="token operator">=</span> <span class="token function">normalizeScopedSlots</span><span class="token punctuation">(</span>
      _parentVnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>scopedSlots<span class="token punctuation">,</span>
      vm<span class="token punctuation">.</span>$slots<span class="token punctuation">,</span>
      vm<span class="token punctuation">.</span>$scopedSlots
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，它调用了<code>normalizeScopedSlots</code>方法，并且第一个参数传递的是父组件的<code>scopedSlots</code>属性，这里的<code>scopedSlots</code>属性就是<code>_u</code>方法返回的<code>res</code>对象：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">header</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;插槽头部内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;插槽内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">footer</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;插槽底部内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>到这里，我们就把<code>_u</code>和<code>_t</code>这两个方法串联起来了。接下来再看<code>renderSlot</code>方法就容易很多。<code>renderSlot</code>方法的主要作用就是把<code>res.header</code>、<code>res.default</code>以及<code>res.footer</code>方法依次调用一遍并且返回生成的<code>vnode</code>。</p><p>当<code>renderSlot</code>方法调用完毕后，可以得到子组件如下<code>vnode</code>对象：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> childVNode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;插槽头部内容&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;插槽内容&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;插槽底部内容&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="作用域插槽" tabindex="-1"><a class="header-anchor" href="#作用域插槽" aria-hidden="true">#</a> 作用域插槽</h2><p>在分析插槽的<code>parse</code>、插槽的<code>patch</code>过程中我们提供的插槽都是普通插槽，还有一种插槽使用方式，我们叫做作用域插槽，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg1</span><span class="token operator">:</span> <span class="token string">&#39;header&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">msg2</span><span class="token operator">:</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">msg3</span><span class="token operator">:</span> <span class="token string">&#39;footer&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div&gt;
    &lt;slot name=&quot;header&quot; :msg=&quot;msg1&quot; /&gt;
    &lt;slot :msg=&quot;msg2&quot; /&gt;
    &lt;slot name=&quot;footer&quot; :msg=&quot;msg3&quot; /&gt;
  &lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">isShow</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;child-component&gt;
      &lt;template v-slot:header=&quot;props&quot;&gt;
        {{props.msg}}
      &lt;/template&gt;
      &lt;template v-slot=&quot;props&quot;&gt;
        {{props.msg}}
      &lt;/template&gt;
      &lt;template v-slot:footer=&quot;props&quot;&gt;
        {{props.msg}}
      &lt;/template&gt;
    &lt;/child-component&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>作用域插槽和普通插槽最本质的区别是：<strong>作用域插槽能拿到子组件的props</strong>。对于这一点区别，它体现在生成<code>fn</code>函数的参数上：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;child-component&#39;,{
    scopedSlots:_u([
      { key:&quot;header&quot;,fn:function(props){return [_v(_s(props.msg))]} },
      { key:&quot;default&quot;,fn:function(props){return [_v(_s(props.msg))]} },
      { key:&quot;footer&quot;,fn:function(props){return [_v(_s(props.msg))]} }
    ])
  })
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>这里的<code>props</code>就是我们在子组件<code>slot</code>标签上传递的值：</p><div class="language-html" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>header<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>msg1<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">:msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>msg2<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>msg3<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><p>所以，对于我们的例子而言，最后生成的子组件<code>vnode</code>对象如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> childVNode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;header&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;default&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;footer&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="插槽的更新" tabindex="-1"><a class="header-anchor" href="#插槽的更新" aria-hidden="true">#</a> 插槽的更新</h2><p>以上关于插槽的介绍，都是在讲述组件初始化阶段，有些情况下当组件重新渲染时，需要去通知子组件重新进行渲染，这些情况有：</p><ul><li><code>slot</code>插槽中使用了父组件的响应式变量，例如：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;child-component&gt;
      &lt;template v-slot:header&gt;
        {{msg}}
      &lt;/template&gt;
    &lt;/child-component&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>在<code>slot</code>中，我们使用了来自父组件的响应式变量<code>msg</code>，当父组件初始化完毕时，会在<code>mounted</code>生命周期函数中延时<code>3s</code>去改变<code>msg</code>的值。因为<code>msg</code>的值发生了变动，所以需要通知子组件重新进行渲染，关于这部分的逻辑它属于<strong>依赖收集</strong>、<strong>派发更新</strong>的范畴。</p><p>因为我们在模板中使用到了<code>msg</code>变量，而这个变量又是定义在插槽中的，当<code>_t</code>函数执行的时候，当前上下文环境为子组件，既<code>msg</code>会把这个上下文进行依赖收集。随后在<code>setTimeout</code>延时器方法中修改<code>msg</code>的时候，会<code>dep.notify()</code>通知依赖列表进行更新。</p><ul><li>插槽<code>template</code>上存在<code>v-if</code>、<code>v-for</code>或动态插槽名等情况，例如：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// v-if </span>
<span class="token operator">&lt;</span>template v<span class="token operator">-</span>slot<span class="token operator">:</span>header v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;showSlot&quot;</span><span class="token operator">&gt;</span>header<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token comment">// dynamic slotTarget + v-for</span>
<span class="token operator">&lt;</span>template v<span class="token operator">-</span>slot<span class="token operator">:</span><span class="token punctuation">[</span>item<span class="token punctuation">]</span> v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;item in list&quot;</span><span class="token operator">&gt;</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
</code></pre></div><p>对于使用<code>v-if</code>来控制是否显示插槽这个例子而言，当<code>showSlot</code>值变动的时候，它应该通知子组件重新进行渲染，这是一件很正常的事情，但问题的关键点在于什么时候？如何通知子组件重新进行渲染？</p><p>我们先放下这两个问题，先来看第二个例子，对于这个例子而言，父组件和子组件生成的<code>render</code>函数如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> parentRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;child-component&#39;,{
    scopedSlots:_u([_l((list),function(item){
      return {
        key:item,
        fn:function(){
          return [_v(_s(item))]
        },
        proxy:true
      }
    })],null,true)
  })
}</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> childRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;div&#39;,[
    _t(&quot;header&quot;,null,{&quot;msg&quot;:msg1}),
    _t(&quot;default&quot;,null,{&quot;msg&quot;:msg2}),
    _t(&quot;footer&quot;,null,{&quot;msg&quot;:msg3})
  ],2)
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p><code>_l</code>函数就是<code>renderList</code>方法的简写形式，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">renderList</span> <span class="token punctuation">(</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
    <span class="token literal-property property">keyOrIndex</span><span class="token operator">:</span> string <span class="token operator">|</span> number<span class="token punctuation">,</span>
    index<span class="token operator">?</span><span class="token operator">:</span> number</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> VNode
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token literal-property property">ret</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> l<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> key
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ret <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> val<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ret<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>val<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">&#39;number&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...省略代码</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...省略代码</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isDef</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">(</span>ret<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>_isVList <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> ret
<span class="token punctuation">}</span>
</code></pre></div><p>由于传递的第一个参数是一个数组形式，因此命中<code>if</code>分支的逻辑，当遍历完毕后返回的<code>ret</code>数组如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;header&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;footer&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre></div><p>我们把这个结果再带回到<code>parentRender</code>函数中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> parentRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">with(this){
  return _c(&#39;child-component&#39;, {
    scopedSlots:_u([
      { key:&quot;header&quot;,fn:function(){return [_v(&quot;插槽头部内容&quot;)]},proxy:true },
      { key:&quot;default&quot;,fn:function(){return [_v(&quot;插槽内容&quot;)]},proxy:true },
      { key:&quot;footer&quot;,fn:function(){return [_v(&quot;插槽底部内容&quot;)]},proxy:true}
    ])
  })
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>这和我们在前面提到过的例子一模一样，但关键点在于这里使用的<code>v-for</code>指令，如果我们在父组件初始化完毕后，再去修改<code>list</code>数组的内容，那么应该需要去通知子组件重新进行渲染。</p><p>既然我们搞清楚了这两个例子为什么要通知子组件重新进行渲染，接下来让我们来回答前面遗留的两个问题：<strong>什么时候通知子组件重新进行渲染？</strong>、<strong>怎么通知子组件重新进行渲染？</strong>。</p><p>问：<strong>什么时候通知子组件重新进行渲染？</strong><br> 答：当我们在父组件初始化完毕后，再次修改<code>list</code>数组时，父组件会触发<code>prepatch</code>钩子函数，在这个钩子函数中它调用了<code>updateChildComponent</code>方法，在这个方法中有如下代码逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">updateChildComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">propsData</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">listeners</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
  <span class="token literal-property property">parentVnode</span><span class="token operator">:</span> MountedComponentVNode<span class="token punctuation">,</span>
  <span class="token literal-property property">renderChildren</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">const</span> newScopedSlots <span class="token operator">=</span> parentVnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>scopedSlots
  <span class="token keyword">const</span> oldScopedSlots <span class="token operator">=</span> vm<span class="token punctuation">.</span>$scopedSlots
  <span class="token keyword">const</span> hasDynamicScopedSlot <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span>newScopedSlots <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>newScopedSlots<span class="token punctuation">.</span>$stable<span class="token punctuation">)</span> <span class="token operator">||</span>
    <span class="token punctuation">(</span>oldScopedSlots <span class="token operator">!==</span> emptyObject <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>oldScopedSlots<span class="token punctuation">.</span>$stable<span class="token punctuation">)</span> <span class="token operator">||</span>
    <span class="token punctuation">(</span>newScopedSlots <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">.</span>$key <span class="token operator">!==</span> newScopedSlots<span class="token punctuation">.</span>$key<span class="token punctuation">)</span>
  <span class="token punctuation">)</span>

  <span class="token comment">// Any static slot children from the parent may have changed during parent&#39;s</span>
  <span class="token comment">// update. Dynamic scoped slots may also have changed. In such cases, a forced</span>
  <span class="token comment">// update is necessary to ensure correctness.</span>
  <span class="token keyword">const</span> needsForceUpdate <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>
    renderChildren <span class="token operator">||</span>               <span class="token comment">// has new static slots</span>
    vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_renderChildren <span class="token operator">||</span>  <span class="token comment">// has old static slots</span>
    hasDynamicScopedSlot
  <span class="token punctuation">)</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token comment">// resolve slots + force update if has children</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>needsForceUpdate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>$slots <span class="token operator">=</span> <span class="token function">resolveSlots</span><span class="token punctuation">(</span>renderChildren<span class="token punctuation">,</span> parentVnode<span class="token punctuation">.</span>context<span class="token punctuation">)</span>
    vm<span class="token punctuation">.</span><span class="token function">$forceUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从上面例子中我们可以看出来，当<code>needsForceUpdate</code>逻辑判断为真时，就会调用<code>$forceUpdate()</code>方法进行子组件的重新渲染逻辑，我们仔细分析后可以知道<code>needsForceUpdate</code>主要与<code>$stable</code>或<code>$key</code>这两个属性挂钩，这两个属性就是<strong>怎么通知子组件重新进行渲染</strong>的关键。</p><p>问：<strong>怎么通知子组件重新进行渲染？</strong><br> 答：在介绍插槽的<code>parse</code>编译小节时，对于<code>genScopedSlots</code>方法、我们故意省略了一部分代码没有进行说明，完整代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genScopedSlots</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> ASTElement <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span>
<span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token comment">// by default scoped slots are considered &quot;stable&quot;, this allows child</span>
  <span class="token comment">// components with only scoped slots to skip forced updates from parent.</span>
  <span class="token comment">// but in some cases we have to bail-out of this optimization</span>
  <span class="token comment">// for example if the slot contains dynamic names, has v-if or v-for on them...</span>
  <span class="token keyword">let</span> needsForceUpdate <span class="token operator">=</span> el<span class="token punctuation">.</span>for <span class="token operator">||</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>slots<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> slot <span class="token operator">=</span> slots<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      slot<span class="token punctuation">.</span>slotTargetDynamic <span class="token operator">||</span>
      slot<span class="token punctuation">.</span>if <span class="token operator">||</span>
      slot<span class="token punctuation">.</span>for <span class="token operator">||</span>
      <span class="token function">containsSlotChild</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span> <span class="token comment">// is passing down slot from parent which may be dynamic</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// #9534: if a component with scoped slots is inside a conditional branch,</span>
  <span class="token comment">// it&#39;s possible for the same component to be reused but with different</span>
  <span class="token comment">// compiled slot content. To avoid that, we generate a unique key based on</span>
  <span class="token comment">// the generated code of all the slot contents.</span>
  <span class="token keyword">let</span> needsKey <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>el<span class="token punctuation">.</span>if

  <span class="token comment">// OR when it is inside another scoped slot or v-for (the reactivity may be</span>
  <span class="token comment">// disconnected due to the intermediate scope variable)</span>
  <span class="token comment">// #9438, #9506</span>
  <span class="token comment">// TODO: this can be further optimized by properly analyzing in-scope bindings</span>
  <span class="token comment">// and skip force updating ones that do not actually use scope variables.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>needsForceUpdate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> parent <span class="token operator">=</span> el<span class="token punctuation">.</span>parent
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>slotScope <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>slotScope <span class="token operator">!==</span> emptySlotScopeToken<span class="token punctuation">)</span> <span class="token operator">||</span>
        parent<span class="token punctuation">.</span>for
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        needsForceUpdate <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>if<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        needsKey <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
      parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> generatedSlots <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>slots<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> <span class="token function">genScopedSlot</span><span class="token punctuation">(</span>slots<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">scopedSlots:_u([</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>generatedSlots<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
    needsForceUpdate <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,null,true</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
    <span class="token operator">!</span>needsForceUpdate <span class="token operator">&amp;&amp;</span> needsKey <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,null,false,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">hash</span><span class="token punctuation">(</span>generatedSlots<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>从上面代码可以看到，在代码生成阶段，它会根据标签上是否存在<code>v-if</code>、<code>v-for</code>以及动态插槽名等情况来对<code>needsForceUpdate</code>变量进行赋值，直白一点的说：只要出现了<code>v-if</code>、<code>v-for</code>或动态插槽名，<code>needsForceUpdate</code>值就为<code>true</code>。</p><p>如果以上情况都没有，还会调用<code>hash</code>方法对我们生成的字符串进行计算，如果计算的结果不一样(新旧$key对比)，同样会通知子组件重新进行渲染：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> hash <span class="token operator">=</span> <span class="token number">5381</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> str<span class="token punctuation">.</span>length
  <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    hash <span class="token operator">=</span> <span class="token punctuation">(</span>hash <span class="token operator">*</span> <span class="token number">33</span><span class="token punctuation">)</span> <span class="token operator">^</span> str<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span><span class="token operator">--</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> hash <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从最后一个<code>return</code>语句中，我们可以发现，<code>needsForceUpdate</code>变量主要控制<code>_u</code>函数的第三个参数、<code>hash</code>计算的结果主要控制第四个参数，我们再来回顾一下<code>_u</code>函数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveScopedSlots</span> <span class="token punctuation">(</span>
  <span class="token literal-property property">fns</span><span class="token operator">:</span> ScopedSlotsData<span class="token punctuation">,</span> <span class="token comment">// see flow/vnode</span>
  res<span class="token operator">?</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token comment">// the following are added in 2.6</span>
  hasDynamicKeys<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  contentHashKey<span class="token operator">?</span><span class="token operator">:</span> number
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> Function<span class="token punctuation">,</span> <span class="token literal-property property">$stable</span><span class="token operator">:</span> boolean <span class="token punctuation">}</span> <span class="token punctuation">{</span>
  res <span class="token operator">=</span> res <span class="token operator">||</span> <span class="token punctuation">{</span> <span class="token literal-property property">$stable</span><span class="token operator">:</span> <span class="token operator">!</span>hasDynamicKeys <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>contentHashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>res<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>$key <span class="token operator">=</span> contentHashKey
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre></div><p>分析至此，我们已经能够回答以上问题了：<strong>父组件通过控制scopedSlots.$stable变量以及scopedSlots.$key变量的值，来控制是否应该通知子组件重新进行渲染</strong>。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>在这一小节，我们首先回顾了插槽的<code>parse</code>编译过程以及插槽的<code>patch</code>过程。</p><p>随后，我们对比了普通插槽和作用域插槽的区别，它们本质上的区别在于数据的作用域，普通插槽在生成<code>vnode</code>时无法访问子组件的<code>props</code>数据，但作用域插槽可以。</p><p>最后，我们知道了当插槽<code>template</code>使用了来自父组件的响应式变量或者与<code>v-if</code>、<code>v-for</code>以及动态插槽名一起使用时，当响应式变量更新后，会强制通知子组件重新进行渲染。</p>`,115),e=[o];function c(l,r){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","slot.html.vue"]]);export{k as default};
