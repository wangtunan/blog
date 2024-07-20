import{_ as n,o as s,c as a,d as t}from"./app-48262509.js";const p={},o=t(`<h1 id="v-model" tabindex="-1"><a class="header-anchor" href="#v-model" aria-hidden="true">#</a> v-model</h1><p><code>v-model</code>指令可以用来在表单元素<code>input</code>、<code>select</code>等或者组件上创建双向数据绑定，既：<strong>数据的改变会驱动视图更新、视图的更新反过来又会影响数据的变化。</strong></p><h2 id="v-model的解析" tabindex="-1"><a class="header-anchor" href="#v-model的解析" aria-hidden="true">#</a> v-model的解析</h2><p>在<strong>directive指令</strong>章节，我们提到过<code>v-model</code>和<code>v-show</code>是<code>Vue</code>默认提供的全局指令，我们可以直接拿来使用。</p><p>既然<code>v-model</code>也是指令的一种，那么其解析逻辑应该和普通的指令是类似的。注意，我们提到的普通指令，它区别于<code>v-bind</code>和<code>v-on</code>。</p><p>在分析<code>v-model</code>的解析原理这个小节，我们以下面代码为例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello, msg&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input v-model=&quot;msg&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>在<code>v-model</code>的<code>parse</code>解析阶段，它会在<code>processElement</code>方法中调用<code>processAttrs</code>来处理标签上面解析的各种属性：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">processElement</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">element</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token function">processAttrs</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
  <span class="token keyword">return</span> element
<span class="token punctuation">}</span>
</code></pre></div><p>然后，又回到了我们在<strong>directive指令</strong>和<strong>event事件处理</strong>中反复提到过的<code>processAttrs</code>方法。由于<code>v-model</code>属于一般指令，因此我们省略与<code>v-bind</code>和<code>v-on</code>相关的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> dirRE <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VBIND_PROP_SHORTHAND</span>
  <span class="token operator">?</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^v-|^@|^:|^\\.|^#</span><span class="token regex-delimiter">/</span></span>
  <span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^v-|^@|^:|^#</span><span class="token regex-delimiter">/</span></span>
<span class="token keyword">const</span> argRE <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">:(.*)$</span><span class="token regex-delimiter">/</span></span>
<span class="token keyword">function</span> <span class="token function">processAttrs</span> <span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> list <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsList
  <span class="token keyword">let</span> i<span class="token punctuation">,</span> l<span class="token punctuation">,</span> name<span class="token punctuation">,</span> rawName<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">,</span> syncGen<span class="token punctuation">,</span> isDynamic
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> list<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    name <span class="token operator">=</span> rawName <span class="token operator">=</span> list<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>name
    value <span class="token operator">=</span> list<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>value
    <span class="token keyword">if</span> <span class="token punctuation">(</span>dirRE<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      el<span class="token punctuation">.</span>hasBindings <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// modifiers省略代码</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bindRE<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// v-bind省略代码</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>onRE<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// v-on省略代码</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// normal directives</span>
        name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>dirRE<span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
        <span class="token comment">// parse arg</span>
        <span class="token keyword">const</span> argMatch <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>argRE<span class="token punctuation">)</span>
        <span class="token keyword">let</span> arg <span class="token operator">=</span> argMatch <span class="token operator">&amp;&amp;</span> argMatch<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
        isDynamic <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token punctuation">(</span>arg<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>dynamicArgRE<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arg <span class="token operator">=</span> arg<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            isDynamic <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">addDirective</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> name<span class="token punctuation">,</span> rawName<span class="token punctuation">,</span> value<span class="token punctuation">,</span> arg<span class="token punctuation">,</span> isDynamic<span class="token punctuation">,</span> modifiers<span class="token punctuation">,</span> list<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> name <span class="token operator">===</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">checkForAliasModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...省略代码</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>else</code>分支中，首先使用<code>dirRE</code>正则表达式把<code>v-model</code>字符串中的<code>v-</code>前缀去掉，此时<code>name</code>的值就变成了<code>model</code>。紧接着，它又使用了<code>argRE</code>正则表达式来匹配指令参数。稍微改动一下我们的案例，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input v-model:value=&quot;msg&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>

<span class="token comment">// 匹配到的指令参数</span>
<span class="token keyword">const</span> arg <span class="token operator">=</span> <span class="token string">&#39;value&#39;</span>
</code></pre></div><p>处理完毕后，调用<code>addDirective</code>方法，给<code>ast</code>对象添加<code>directives</code>属性：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">addDirective</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">rawName</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">arg</span><span class="token operator">:</span> <span class="token operator">?</span>string<span class="token punctuation">,</span>
  <span class="token literal-property property">isDynamicArg</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  <span class="token literal-property property">modifiers</span><span class="token operator">:</span> <span class="token operator">?</span>ASTModifiers<span class="token punctuation">,</span>
  range<span class="token operator">?</span><span class="token operator">:</span> Range</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>el<span class="token punctuation">.</span>directives <span class="token operator">||</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>directives <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">rangeSetItem</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token punctuation">,</span>
    rawName<span class="token punctuation">,</span>
    value<span class="token punctuation">,</span>
    arg<span class="token punctuation">,</span>
    isDynamicArg<span class="token punctuation">,</span>
    modifiers
  <span class="token punctuation">}</span><span class="token punctuation">,</span> range<span class="token punctuation">)</span><span class="token punctuation">)</span>
  el<span class="token punctuation">.</span>plain <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>parse</code>解析过程完毕后，生成的<code>ast</code>结果如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsMap</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;v-model&#39;</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">rawName</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接下来在<code>codegen</code>代码生成阶段，会在<code>genData</code>方法中调用<code>genDirectives</code>来处理指令：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token string">&#39;{&#39;</span>
  <span class="token keyword">const</span> dirs <span class="token operator">=</span> <span class="token function">genDirectives</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>dirs<span class="token punctuation">)</span> data <span class="token operator">+=</span> dirs <span class="token operator">+</span> <span class="token string">&#39;,&#39;</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">return</span> data
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">genDirectives</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dirs <span class="token operator">=</span> el<span class="token punctuation">.</span>directives
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dirs<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token string">&#39;directives:[&#39;</span>
  <span class="token keyword">let</span> hasRuntime <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">let</span> i<span class="token punctuation">,</span> l<span class="token punctuation">,</span> dir<span class="token punctuation">,</span> needRuntime
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> dirs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dir <span class="token operator">=</span> dirs<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    needRuntime <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">const</span> <span class="token literal-property property">gen</span><span class="token operator">:</span> DirectiveFunction <span class="token operator">=</span> state<span class="token punctuation">.</span>directives<span class="token punctuation">[</span>dir<span class="token punctuation">.</span>name<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>gen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// compile-time directive that manipulates AST.</span>
      <span class="token comment">// returns true if it also needs a runtime counterpart.</span>
      needRuntime <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token function">gen</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> dir<span class="token punctuation">,</span> state<span class="token punctuation">.</span>warn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>needRuntime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      hasRuntime <span class="token operator">=</span> <span class="token boolean">true</span>
      res <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">{name:&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dir<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;,rawName:&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dir<span class="token punctuation">.</span>rawName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
        dir<span class="token punctuation">.</span>value <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,value:(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dir<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">),expression:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>dir<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
      <span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
        dir<span class="token punctuation">.</span>arg <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,arg:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dir<span class="token punctuation">.</span>isDynamicArg <span class="token operator">?</span> dir<span class="token punctuation">.</span>arg <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dir<span class="token punctuation">.</span>arg<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
      <span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
        dir<span class="token punctuation">.</span>modifiers <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">,modifiers:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>dir<span class="token punctuation">.</span>modifiers<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
      <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">},</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hasRuntime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;]&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>与其它指令不同的是，在这里我们要关注一下<code>state.directives</code>，这个属性是在<code>CodegenState</code>类的构造函数中被处理的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CodegenState</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions<span class="token punctuation">;</span>
  <span class="token literal-property property">warn</span><span class="token operator">:</span> Function<span class="token punctuation">;</span>
  <span class="token literal-property property">transforms</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>TransformFunction<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">dataGenFns</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>DataGenFunction<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> DirectiveFunction <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function-variable function">maybeComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">onceId</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
  <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">pre</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">=</span> options
    <span class="token comment">// ...省略代码</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>directives <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> baseDirectives<span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>directives<span class="token punctuation">)</span>
    <span class="token comment">// ...省略代码</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中<code>options</code>是与平台相关的参数，在<code>web</code>浏览器端，这个参数定义在<code>src/platforms/web/runtime/options.js</code>文件中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> directives <span class="token keyword">from</span> <span class="token string">&#39;./directives/index&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">baseOptions</span><span class="token operator">:</span> CompilerOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">expectHTML</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  modules<span class="token punctuation">,</span>
  directives<span class="token punctuation">,</span>
  isPreTag<span class="token punctuation">,</span>
  isUnaryTag<span class="token punctuation">,</span>
  mustUseProp<span class="token punctuation">,</span>
  canBeLeftOpenTag<span class="token punctuation">,</span>
  isReservedTag<span class="token punctuation">,</span>
  getTagNamespace<span class="token punctuation">,</span>
  <span class="token literal-property property">staticKeys</span><span class="token operator">:</span> <span class="token function">genStaticKeys</span><span class="token punctuation">(</span>modules<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们关注<code>directives</code>，它包含了<code>v-text</code>、<code>v-html</code>以及<code>v-model</code>，在这一小节我们只关心<code>v-model</code>相关，既<code>directives/model.js</code>文件中的内容。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">model</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">dir</span><span class="token operator">:</span> ASTDirective<span class="token punctuation">,</span>
  <span class="token literal-property property">_warn</span><span class="token operator">:</span> Function</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>boolean <span class="token punctuation">{</span>
  warn <span class="token operator">=</span> _warn
  <span class="token keyword">const</span> value <span class="token operator">=</span> dir<span class="token punctuation">.</span>value
  <span class="token keyword">const</span> modifiers <span class="token operator">=</span> dir<span class="token punctuation">.</span>modifiers
  <span class="token keyword">const</span> tag <span class="token operator">=</span> el<span class="token punctuation">.</span>tag
  <span class="token keyword">const</span> type <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">.</span>type

  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// inputs with type=&quot;file&quot; are read only and setting the input&#39;s</span>
    <span class="token comment">// value will throw an error.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;input&#39;</span> <span class="token operator">&amp;&amp;</span> type <span class="token operator">===</span> <span class="token string">&#39;file&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>el<span class="token punctuation">.</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> v-model=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; type=&quot;file&quot;&gt;:\\n</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">File inputs are read only. Use a v-on:change listener instead.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        el<span class="token punctuation">.</span>rawAttrsMap<span class="token punctuation">[</span><span class="token string">&#39;v-model&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">genComponentModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
    <span class="token comment">// component v-model doesn&#39;t need extra runtime</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;select&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">genSelect</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;input&#39;</span> <span class="token operator">&amp;&amp;</span> type <span class="token operator">===</span> <span class="token string">&#39;checkbox&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">genCheckboxModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;input&#39;</span> <span class="token operator">&amp;&amp;</span> type <span class="token operator">===</span> <span class="token string">&#39;radio&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">genRadioModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;input&#39;</span> <span class="token operator">||</span> tag <span class="token operator">===</span> <span class="token string">&#39;textarea&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">genDefaultModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>config<span class="token punctuation">.</span><span class="token function">isReservedTag</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">genComponentModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
    <span class="token comment">// component v-model doesn&#39;t need extra runtime</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>el<span class="token punctuation">.</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> v-model=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;&gt;: </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">v-model is not supported on this element type. </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token string">&#39;If you are working with contenteditable, it\\&#39;s recommended to &#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;wrap a library dedicated for that purpose inside a custom component.&#39;</span><span class="token punctuation">,</span>
      el<span class="token punctuation">.</span>rawAttrsMap<span class="token punctuation">[</span><span class="token string">&#39;v-model&#39;</span><span class="token punctuation">]</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ensure runtime directive metadata</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>model</code>方法中，首先判断如果在<code>type=&#39;file&#39;</code>的<code>input</code>标签上使用了<code>v-model</code>，那么会在开发环境提示错误信息，因为附件是只读的。随后根据标签类型，分别调用对应的方法。在我们的例子中，它会命中<code>genDefaultModel</code>，对于其它分支逻辑我们会在对应的小节中介绍，这里先有一个印象即可。</p><p>我们淡化<code>genDefaultModel</code>其它方面的逻辑，只看最核心的两段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genDefaultModel</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">modifiers</span><span class="token operator">:</span> <span class="token operator">?</span>ASTModifiers</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>boolean <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token function">addProp</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token function">addHandler</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> event<span class="token punctuation">,</span> code<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token comment">// ...省略代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>addProp</code>：调用<code>addProp</code>是为了给<code>ast</code>添加一个<code>value</code>的<code>props</code>属性。</li><li><code>addHandler</code>：调用<code>addHandler</code>是为了给<code>ast</code>添加一个事件监听，至于到底监听什么事件取决于<code>v-model</code>作用于什么标签。</li></ul><p>在我们的例子中，有了上面两段关键代码，等价于我们像下面这样写：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token string">&#39;&lt;input v-model=&quot;msg&quot; /&gt;&#39;</span>
<span class="token comment">// 等价于(有点细微的区别)</span>
<span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input :value=&quot;msg&quot; @input=&quot;msg=$event.target.value&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>从以上分析中我们可以看出来：<strong><code>v-model</code>处理双向绑定，本质上就是一种语法糖，它负责监听用户的输入事件然后更新数据，并对一些极端场景做了一些特殊处理</strong>。</p><p>绕了那么大一个圈子，现在让我们回到<code>genData</code>方法中，在调用<code>genDirectives</code>方法后，当前<code>ast</code>对象中多了<code>props</code>和<code>events</code>属性：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsMap</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;v-model&#39;</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">rawName</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;(msg)&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
  <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">&#39;if($event.target.composing)return;msg=$event.target.value&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为<code>ast</code>对象中多了<code>props</code>和<code>events</code>属性，所以<code>genData</code>方法中除了会像普通指令一样处理指令，还会处理<code>props</code>属性和<code>events</code>事件：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token string">&#39;{&#39;</span>
  <span class="token comment">// directive</span>
  <span class="token keyword">const</span> dirs <span class="token operator">=</span> <span class="token function">genDirectives</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>dirs<span class="token punctuation">)</span> data <span class="token operator">+=</span> dirs <span class="token operator">+</span> <span class="token string">&#39;,&#39;</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token comment">// DOM props</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">domProps:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genProps</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">// event handlers</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genHandlers</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>events<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">return</span> data
<span class="token punctuation">}</span>
</code></pre></div><p>当<code>genData</code>方法处理完毕后，<code>codegen</code>代码生成阶段大部分工作也就结束了，其最后生成的<code>render</code>函数结果如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  with(this){
    return _c(&#39;input&#39;,{
      directives:[
        { name:&quot;model&quot;, rawName:&quot;v-model&quot;, value:(msg), expression:&quot;msg&quot; }
      ],
      domProps:{
        &quot;value&quot;:(msg)
      },
      on:{
        &quot;input&quot;:function($event){
          if($event.target.composing)return;
          msg=$event.target.value
        }
      }
    })
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>在这一小节，我们花了很大的篇幅去介绍<code>v-model</code>是如何解析以及如何根据<code>ast</code>生成对应的<code>render</code>函数的，这样做是为了节省后面两个章节的篇幅，因为无论是<code>v-model</code>作用于表单元素，还是组件它们对于<code>v-model</code>的解析过程基本相同。</p><h2 id="绑定表单元素" tabindex="-1"><a class="header-anchor" href="#绑定表单元素" aria-hidden="true">#</a> 绑定表单元素</h2><p>在介绍绑定表单元素这一小节，我们选择根据不同的表单元素，有选择性的进行分类说明。</p><ol><li><code>input</code>文本框和<code>textarea</code>文本域。</li><li><code>checkbox</code>复选框。</li></ol><h3 id="input和textarea" tabindex="-1"><a class="header-anchor" href="#input和textarea" aria-hidden="true">#</a> input和textarea</h3><p><code>v-model</code>作用于<code>input</code>标签和作用于<code>textarea</code>标签的处理逻辑是相同的，我们以<code>input</code>标签为例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello, msg&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input v-model=&quot;msg&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>在<code>parse</code>解析完毕后，其<code>ast</code>结果如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsMap</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;v-model&#39;</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">rawName</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>随后<code>codegen</code>代码生成阶段，调用<code>genData</code>来处理<code>directives</code>指令、<code>props</code>属性以及<code>events</code>事件：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token string">&#39;{&#39;</span>
  <span class="token keyword">const</span> dirs <span class="token operator">=</span> <span class="token function">genDirectives</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>dirs<span class="token punctuation">)</span> data <span class="token operator">+=</span> dirs <span class="token operator">+</span> <span class="token string">&#39;,&#39;</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token comment">// DOM props</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">domProps:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genProps</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">// event handlers</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genHandlers</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>events<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
  data <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">,$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;}&#39;</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">return</span> data
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>genDirectives</code>：首先调用了<code>genDirectives</code>方法来处理指令，在这个方法中会调用一个与平台相关的<code>model</code>方法，在这个<code>model</code>方法中会根据不同元素标签的类型来分别处理，<code>input</code>或者<code>textarea</code>标签的处理逻辑如下：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;input&#39;</span> <span class="token operator">||</span> tag <span class="token operator">===</span> <span class="token string">&#39;textarea&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">genDefaultModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们接下来看一下<code>genDefaultModel</code>方法的完整代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genDefaultModel</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">modifiers</span><span class="token operator">:</span> <span class="token operator">?</span>ASTModifiers</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>boolean <span class="token punctuation">{</span>
  <span class="token keyword">const</span> type <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">.</span>type

  <span class="token comment">// warn if v-bind:value conflicts with v-model</span>
  <span class="token comment">// except for inputs with v-bind:type</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;v-bind:value&#39;</span><span class="token punctuation">]</span> <span class="token operator">||</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;:value&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> typeBinding <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;v-bind:type&#39;</span><span class="token punctuation">]</span> <span class="token operator">||</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;:type&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>typeBinding<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> binding <span class="token operator">=</span> el<span class="token punctuation">.</span>attrsMap<span class="token punctuation">[</span><span class="token string">&#39;v-bind:value&#39;</span><span class="token punctuation">]</span> <span class="token operator">?</span> <span class="token string">&#39;v-bind:value&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;:value&#39;</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>binding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; conflicts with v-model on the same element </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token string">&#39;because the latter already expands to a value binding internally&#39;</span><span class="token punctuation">,</span>
        el<span class="token punctuation">.</span>rawAttrsMap<span class="token punctuation">[</span>binding<span class="token punctuation">]</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span> lazy<span class="token punctuation">,</span> number<span class="token punctuation">,</span> trim <span class="token punctuation">}</span> <span class="token operator">=</span> modifiers <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">const</span> needCompositionGuard <span class="token operator">=</span> <span class="token operator">!</span>lazy <span class="token operator">&amp;&amp;</span> type <span class="token operator">!==</span> <span class="token string">&#39;range&#39;</span>
  <span class="token keyword">const</span> event <span class="token operator">=</span> lazy
    <span class="token operator">?</span> <span class="token string">&#39;change&#39;</span>
    <span class="token operator">:</span> type <span class="token operator">===</span> <span class="token string">&#39;range&#39;</span>
      <span class="token operator">?</span> <span class="token constant">RANGE_TOKEN</span>
      <span class="token operator">:</span> <span class="token string">&#39;input&#39;</span>

  <span class="token keyword">let</span> valueExpression <span class="token operator">=</span> <span class="token string">&#39;$event.target.value&#39;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>trim<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    valueExpression <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">$event.target.value.trim()</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    valueExpression <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_n(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>valueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> code <span class="token operator">=</span> <span class="token function">genAssignmentCode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> valueExpression<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>needCompositionGuard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    code <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">if($event.target.composing)return;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>

  <span class="token function">addProp</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token function">addHandler</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> event<span class="token punctuation">,</span> code<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>trim <span class="token operator">||</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">addHandler</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;blur&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;$forceUpdate()&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>genDefaultModel</code>所做的事情并不是很复杂，它主要做四件事情：<strong>异常处理</strong>、<strong>修饰符处理</strong>、<strong>添加props属性</strong>以及<strong>添加event事件</strong>。</p><ul><li><code>genProps</code>: 在调用<code>genDirectives</code>方法后，因为添加了<code>props</code>属性，所以会调用<code>genProps</code>方法来处理<code>props</code>属性：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// [ { name: &#39;value&#39;, value: &#39;(msg)&#39;, dynamic: undefined } ]</span>
<span class="token keyword">function</span> <span class="token function">genProps</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">props</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>ASTAttr<span class="token operator">&gt;</span></span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">let</span> staticProps <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">let</span> dynamicProps <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> props<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> prop <span class="token operator">=</span> props<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> __WEEX__
      <span class="token operator">?</span> <span class="token function">generateValue</span><span class="token punctuation">(</span>prop<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">transformSpecialNewlines</span><span class="token punctuation">(</span>prop<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop<span class="token punctuation">.</span>dynamic<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      dynamicProps <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prop<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      staticProps <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prop<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  staticProps <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">{</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>staticProps<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>dynamicProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_d(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>staticProps<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,[</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dynamicProps<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">])</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> staticProps
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>genProps</code>方法中，它会遍历<code>props</code>参数数组，由于我们传递的参数只有一条且<code>dynamic</code>为<code>undefined</code>，因此最后直接返回了<code>staticProps</code>，其结果如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> staticProps <span class="token operator">=</span> <span class="token string">&#39;{&quot;value&quot;:(msg)}&#39;</span>
</code></pre></div><ul><li><code>genHandlers</code>：由于这部分的逻辑我们在<strong>event事件处理</strong>章节中已经反复提到过，所以我们不再赘述。其中，这个方法的返回结果如下：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">on:{
  &quot;input&quot;:function($event){
    if($event.target.composing)return;
    msg=$event.target.value
  }
}</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><h3 id="checkbox" tabindex="-1"><a class="header-anchor" href="#checkbox" aria-hidden="true">#</a> checkbox</h3><p>当<code>v-model</code>作用于单个<code>checkbox</code>标签时，<code>v-model</code>绑定一个布尔值；当<code>v-model</code>作用于多个<code>checkbox</code>标签时，<code>v-model</code>绑定一个数组。</p><p>我们先以单个<code>checkbox</code>标签为例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">checked</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;input v-model=&quot;checked&quot; type=&quot;checkbox&quot; /&gt;是否勾选
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>当<code>parse</code>解析完毕后，其<code>input</code>标签的<code>ast</code>对象如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;checked&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">rawName</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>codegen</code>代码生成阶段，当调用与平台相关<code>model</code>方法时，会调用<code>genCheckboxModel</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> <span class="token string">&#39;input&#39;</span> <span class="token operator">&amp;&amp;</span> type <span class="token operator">===</span> <span class="token string">&#39;checkbox&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">genCheckboxModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中<code>genCheckboxModel</code>方法代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genCheckboxModel</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">modifiers</span><span class="token operator">:</span> <span class="token operator">?</span>ASTModifiers</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> number <span class="token operator">=</span> modifiers <span class="token operator">&amp;&amp;</span> modifiers<span class="token punctuation">.</span>number
  <span class="token keyword">const</span> valueBinding <span class="token operator">=</span> <span class="token function">getBindingAttr</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;null&#39;</span>
  <span class="token keyword">const</span> trueValueBinding <span class="token operator">=</span> <span class="token function">getBindingAttr</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;true-value&#39;</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;true&#39;</span>
  <span class="token keyword">const</span> falseValueBinding <span class="token operator">=</span> <span class="token function">getBindingAttr</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;false-value&#39;</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;false&#39;</span>
  <span class="token function">addProp</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;checked&#39;</span><span class="token punctuation">,</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Array.isArray(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">?_i(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>valueBinding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)&gt;-1</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span> <span class="token punctuation">(</span>
      trueValueBinding <span class="token operator">===</span> <span class="token string">&#39;true&#39;</span>
        <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">:(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
        <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">:_q(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>trueValueBinding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token function">addHandler</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">var $$a=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token string">&#39;$$el=$event.target,&#39;</span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">$$c=$$el.checked?(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>trueValueBinding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">):(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>falseValueBinding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">);</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
    <span class="token string">&#39;if(Array.isArray($$a)){&#39;</span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">var $$v=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>number <span class="token operator">?</span> <span class="token string">&#39;_n(&#39;</span> <span class="token operator">+</span> valueBinding <span class="token operator">+</span> <span class="token string">&#39;)&#39;</span> <span class="token operator">:</span> valueBinding<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
          <span class="token string">&#39;$$i=_i($$a,$$v);&#39;</span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">if($$el.checked){$$i&lt;0&amp;&amp;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genAssignmentCode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;$$a.concat([$$v])&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)}</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">else{$$i&gt;-1&amp;&amp;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genAssignmentCode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;$$a.slice(0,$$i).concat($$a.slice($$i+1))&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)}</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">}else{</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">genAssignmentCode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;$$c&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>genCheckboxModel</code>方法逻辑不是很复杂，但传递给<code>addProp</code>和<code>addHandler</code>这两个方法的参数却有点不太好理解，我们直接来看<code>input</code>标签生成的<code>render</code>函数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  _c(&#39;input&#39;,{
    directives:[
      { name:&quot;model&quot;, rawName:&quot;v-model&quot;, value:(checked), expression:&quot;checked&quot; }
    ],
    attrs:{
      &quot;type&quot;:&quot;checkbox&quot;
    },
    domProps:{
      &quot;checked&quot;:Array.isArray(checked)?_i(checked,null)&gt;-1:(checked)
    },
    on:{
      &quot;change&quot;:function($event){
        var $$a=checked,$$el=$event.target,$$c=$$el.checked?(true):(false);
        if(Array.isArray($$a)){
          var $$v=null,$$i=_i($$a,$$v);
          if($$el.checked){
            $$i&lt;0&amp;&amp;(checked=$$a.concat([$$v]))
          }else{
            $$i&gt;-1&amp;&amp;(checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)))
          }
        }else{
          checked=$$c
        }
      }
    }
  }
)</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p><strong>注意</strong>：这里的<code>_i</code>工具函数和我们之前提到的<code>_s</code>等工具函数是差不多处理方式，它是<code>looseIndexOf</code>方法的简写形式：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">looseIndexOf</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">arr</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> mixed</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">looseEqual</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> i
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从以上代码可以看到，虽然我们撰写的<code>template</code>模板很简单，但是生成的<code>render</code>却有一大坨代码，到这里我们应该对<strong>v-model双向绑定只是一种语法糖</strong>这句话有了更加深刻的认识。</p><h2 id="绑定组件" tabindex="-1"><a class="header-anchor" href="#绑定组件" aria-hidden="true">#</a> 绑定组件</h2><h3 id="自定义输入组件" tabindex="-1"><a class="header-anchor" href="#自定义输入组件" aria-hidden="true">#</a> 自定义输入组件</h3><p>在<code>Vue2.2.0+</code>版本，<code>v-model</code>还支持作用于一个组件上，我们以下面代码为例来进行分析：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input :value=&quot;value&quot; @input=&quot;handleInput&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleInput</span> <span class="token punctuation">(</span><span class="token parameter">$event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> $event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component v-model=&quot;msg&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>既然<code>v-model</code>双向绑定的原理是需要一个属性和一个事件监听，那么我们按照标准写法，在子组件<code>input</code>标签上面提供一个<code>value</code>属性以及一个<code>input</code>事件监听。</p><p>对于子组件的<code>parse</code>解析逻辑，我们在之前的章节中已经分析过了，它们的过程是一样的，现在我们先来看一看父组件<code>parse</code>解析结果：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">rawName</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接下来再看一下<code>codegen</code>阶段，父组件在<code>genData</code>方法中会调用<code>genDirectives</code>来处理指令，此时又会去执行与平台相关的<code>model</code>方法。因为在父组件中，<code>v-model</code>作用于一个组件，所有会执行下面这段分支的逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>config<span class="token punctuation">.</span><span class="token function">isReservedTag</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">genComponentModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
  <span class="token comment">// component v-model doesn&#39;t need extra runtime</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果你对比源码，可以发现在<code>model</code>方法中，还有一个分支的逻辑也同样调用了<code>genComponentModel</code>:</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">genComponentModel</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">,</span> modifiers<span class="token punctuation">)</span>
  <span class="token comment">// component v-model doesn&#39;t need extra runtime</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>要命中这个<code>if</code>分支的逻辑，我们只需要简单的把父组件的<code>template</code>修改一下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token string">&#39;&lt;component v-model=&quot;msg&quot; is=&quot;ChildComponent&quot; /&gt;&#39;</span>
</code></pre></div><p>回过头来，我们来看一下<code>genComponentModel</code>方法的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genComponentModel</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">modifiers</span><span class="token operator">:</span> <span class="token operator">?</span>ASTModifiers</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>boolean <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> number<span class="token punctuation">,</span> trim <span class="token punctuation">}</span> <span class="token operator">=</span> modifiers <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">const</span> baseValueExpression <span class="token operator">=</span> <span class="token string">&#39;$$v&#39;</span>
  <span class="token keyword">let</span> valueExpression <span class="token operator">=</span> baseValueExpression
  <span class="token keyword">if</span> <span class="token punctuation">(</span>trim<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    valueExpression <span class="token operator">=</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(typeof </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>baseValueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> === &#39;string&#39;</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">? </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>baseValueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.trim()</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>baseValueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    valueExpression <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_n(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>valueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> assignment <span class="token operator">=</span> <span class="token function">genAssignmentCode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> valueExpression<span class="token punctuation">)</span>

  el<span class="token punctuation">.</span>model <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">expression</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">callback</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">function (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>baseValueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">) {</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>assignment<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>调用<code>genComponentModel</code>方法后，当前<code>ast</code>对象多了一个<code>model</code>属性：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">rawName</span><span class="token operator">:</span> <span class="token string">&#39;v-model&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">model</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;(msg)&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">expression</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">callback</span><span class="token operator">:</span> <span class="token string">&#39;function ($$v) {msg=$$v}&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当<code>codegen</code>阶段完毕后，此时父组件生成的<code>render</code>函数如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_c(&#39;child-component&#39;,{
  model:{
    value:(msg),
    callback:function ($$v) {
      msg=$$v
    },
    expression:&quot;msg&quot;
  }
})</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>既然已经生成了<code>render</code>函数，那么在<code>patch</code>阶段，会生成一个组件<code>VNode</code>，创建组件<code>VNode</code>的方法是<code>createComponent</code>，代码路径为<code>src/core/vdom/create-component.js</code>：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">Ctor</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">&gt;</span> <span class="token operator">|</span> Function <span class="token operator">|</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token operator">?</span>VNodeData<span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  tag<span class="token operator">?</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token operator">|</span> Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>model<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">transformModel</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">.</span>options<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...省略代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当执行到<code>createComponent</code>方法的时候，由于我们存在<code>model</code>属性，所以会调用<code>transformModel</code>来处理这部分的逻辑，我们来看一下<code>transformModel</code>这个方法的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">transformModel</span> <span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> prop <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>model <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>model<span class="token punctuation">.</span>prop<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;value&#39;</span>
  <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>model <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>model<span class="token punctuation">.</span>event<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;input&#39;</span>
  <span class="token punctuation">;</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>attrs <span class="token operator">||</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>attrs <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">.</span>model<span class="token punctuation">.</span>value
  <span class="token keyword">const</span> on <span class="token operator">=</span> data<span class="token punctuation">.</span>on <span class="token operator">||</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>on <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> existing <span class="token operator">=</span> on<span class="token punctuation">[</span>event<span class="token punctuation">]</span>
  <span class="token keyword">const</span> callback <span class="token operator">=</span> data<span class="token punctuation">.</span>model<span class="token punctuation">.</span>callback
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>existing<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>existing<span class="token punctuation">)</span>
        <span class="token operator">?</span> existing<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span>
        <span class="token operator">:</span> existing <span class="token operator">!==</span> callback
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      on<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>callback<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>existing<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    on<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> callback
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ol><li><code>prop</code>和<code>event</code>：代码中会优先获取组件的<code>options.model</code>属性，如果没有定义则为默认的<code>value</code>或者<code>input</code>。这段代码的逻辑表明如果<code>v-model</code>作用于一个组件，我们可以给组件提供<code>model</code>属性来改变<code>props</code>接收属性和派发的事件名，例如：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> parent <span class="token operator">=</span> <span class="token string">&#39;&lt;child-component v-model=&quot;msg&quot; /&gt;&#39;</span>

<span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">model</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">prop</span><span class="token operator">:</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token string">&#39;change&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input type=&quot;checkbox&quot; :value=&quot;value&quot; @change=&quot;handleChange&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleChange</span> <span class="token punctuation">(</span><span class="token parameter">$event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> $event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>checked<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="2"><li><code>on[event]</code>：处理事件的逻辑也非常简单，判断当前组件派发的指定事件是否存在，如果存在则根据是否为数组形式分别进行处理，如果不存在则直接赋值。</li></ol><p>在<code>transformModel</code>方法执行完毕时，扩展后的<code>data</code>对象结果如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">model</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">callback</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">$$v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      msg <span class="token operator">=</span> $$v
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">expression</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">input</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">$$v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      msg <span class="token operator">=</span> $$v
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>拿我们父组件的例子来说，换成非<code>v-model</code>形式等价于：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;child-component :value=&quot;msg&quot; @input=&quot;msg=arguments[0]&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="sync修饰符" tabindex="-1"><a class="header-anchor" href="#sync修饰符" aria-hidden="true">#</a> .sync修饰符</h4><p>某些情况下，在组件上使用<code>v-model</code>非常方便，但也同时带来了新的问题：<strong>由于子组件可以变更父组件的数据、但在父组件和子组件之间没有明显的变更来源，这给真正的双向绑定带来了一些维护上的问题</strong></p><p>为了解决以上问题，在<code>Vue2.3.0+</code>版本，提供了<code>.sync</code>修饰符，同时在子组件中我们使用<code>$emit(&#39;update:xxx&#39;)</code>的形式触发事件，例如：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> parent <span class="token operator">=</span> <span class="token string">&#39;&lt;child-component :value.sync=&quot;msg&quot; /&gt;&#39;</span>

<span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input :value=&quot;value&quot; @input=&quot;handleInput&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleInput</span> <span class="token punctuation">(</span><span class="token parameter">$event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;update:value&#39;</span><span class="token punctuation">,</span> $event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于<code>sync</code>是一种修饰符，如果把<code>sync</code>修饰符去掉，对于以上例子<code>parse</code>解析阶段的过程跟以前一样，这里不在赘述。我们直接看<code>processAttrs</code>方法中，关于<code>sync</code>修饰符的处理逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>modifiers<span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  syncGen <span class="token operator">=</span> <span class="token function">genAssignmentCode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">$event</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isDynamic<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">addHandler</span><span class="token punctuation">(</span>
      el<span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">update:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">camelize</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      syncGen<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token boolean">false</span><span class="token punctuation">,</span>
      warn<span class="token punctuation">,</span>
      list<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到，如果提供了<code>sync</code>修饰符，会在父组件中添加一个<code>update:xxx</code>的事件监听，当<code>parse</code>解析过程完毕后，生成的<code>ast</code>内容如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;child-component&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">dynamic</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;:value.sync&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">attrsMap</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;:value.sync&#39;</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;update:value&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;msg=$event&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当<code>codegen</code>代码生成阶段完毕后，生成的<code>render</code>函数结果如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  with(this){
    return _c(&#39;child-component&#39;,{
      attrs:{&quot;value&quot;:msg},
      on:{
        &quot;update:value&quot;:function($event){
          msg=$event
        }
      }
    })
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><h2 id="修饰符" tabindex="-1"><a class="header-anchor" href="#修饰符" aria-hidden="true">#</a> 修饰符</h2><h3 id="number和-trim修饰符" tabindex="-1"><a class="header-anchor" href="#number和-trim修饰符" aria-hidden="true">#</a> .number和.trim修饰符</h3><p>对于<code>.number</code>修饰符和<code>.trim</code>修饰符的处理非常简单，在<code>genDefaultModel</code>方法中其逻辑如下(其它地方处理过程类似)：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> number<span class="token punctuation">,</span> trim <span class="token punctuation">}</span> <span class="token operator">=</span> modifiers <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> valueExpression <span class="token operator">=</span> <span class="token string">&#39;$event.target.value&#39;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>trim<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  valueExpression <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">$event.target.value.trim()</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  valueExpression <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_n(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>valueExpression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>当提供了<code>.number</code>修饰符时，使用了<code>_n</code>工具函数进行包裹，<code>_n</code>工具函数就是<code>toNumber</code>方法的缩写形式。</p><h3 id="lazy修饰符" tabindex="-1"><a class="header-anchor" href="#lazy修饰符" aria-hidden="true">#</a> .lazy修饰符</h3><p>我们先来看官网中对于<code>.lazy</code>修饰符的说明：<strong>在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件之后进行同步</strong>。</p><p>假设我们有如下案例：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// normali</span>
<span class="token keyword">const</span> normalTemplate <span class="token operator">=</span> <span class="token string">&#39;&lt;input v-model=&quot;msg&quot; /&gt;&#39;</span>

<span class="token comment">// lazy</span>
<span class="token keyword">const</span> lazyTemplate <span class="token operator">=</span> <span class="token string">&#39;&lt;input v-model.lazy=&quot;msg&quot; /&gt;&#39;</span>
</code></pre></div><p>在<code>codegen</code>代码生成后，它们生成的<code>render</code>函数<code>on</code>事件部分分别如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// normal</span>
<span class="token keyword">const</span> normalRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  on:{
    input:function($event){
      if($event.target.composing)return;
      msg=$event.target.value
    }
  }
</span><span class="token template-punctuation string">\`</span></span>

<span class="token comment">// lazy</span>
<span class="token keyword">const</span> lazyRender <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  on:{
    change:function($event){
      msg=$event.target.value
    }
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><p>正如官网介绍中的那样，使用<code>lazy</code>修饰符后，它由监听<code>input</code>事件变成了监听<code>change</code>事件。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>在<code>v-model</code>这一小节，我们先详细介绍了<code>v-model</code>在<code>parse</code>解析、<code>codegen</code>代码生成环节的处理过程。</p><p>接着，我们分别对<code>v-model</code>作用于表单元素<code>input</code>、<code>checkbox</code>以及组件的过程进行了分析。</p><p>然后，我们对于<code>v-model</code>作用于组件的新方式<code>sync</code>修饰符的处理过程进行了介绍。</p><p>最后，我们还对<code>v-model</code>配合使用的常见修饰符<code>.number</code>、<code>.trim</code>以及<code>.lazy</code>等进行了分析。</p>`,135),e=[o];function c(l,r){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","vmodel.html.vue"]]);export{i as default};
