import{_ as e,r as c,o as l,c as u,d as o,a as s,b as a,e as t}from"./app-c9515a38.js";const r={},i={href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP",target:"_blank",rel:"noopener noreferrer"},k={href:"https://developers.google.com/web/fundamentals/security/csp/#if_you_absolutely_must_use_it",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/vuejs/vue/tree/1.0-csp",target:"_blank",rel:"noopener noreferrer"};function m(y,n){const p=c("ExternalLinkIcon");return l(),u("div",null,[n[25]||(n[25]=o(`<h1 id="compiletofunctions" tabindex="-1"><a class="header-anchor" href="#compiletofunctions" aria-hidden="true">#</a> compileToFunctions</h1><h2 id="compile核心方法" tabindex="-1"><a class="header-anchor" href="#compile核心方法" aria-hidden="true">#</a> compile核心方法</h2><p>我们知道，在<code>runtime + compiler</code>的版本中，<code>$mount</code>方法和<code>Vue.compile</code>全局<code>API</code>都用到了<code>compileToFunctions</code>方法。在<code>Web</code>平台下，它是从<code>src/platforms/web/compiler/index.js</code>文件中引入的，代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> baseOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./options&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createCompiler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;compiler/index&#39;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> compile<span class="token punctuation">,</span> compileToFunctions <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createCompiler</span><span class="token punctuation">(</span>baseOptions<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> compile<span class="token punctuation">,</span> compileToFunctions <span class="token punctuation">}</span>
</code></pre></div><p>在以上代码中，我们可以看到<code>compileToFunctions</code>是从<code>createCompiler</code>方法的调用结果中解构出来的，而<code>createCompiler</code>方法又是从<code>compiler/index.js</code>文件中引入的。根据之前<code>Rollup</code>章节提到过的知识，我们知道<code>compiler</code>是一个别名，真实路径为：<code>src/compiler/index.js</code>，其代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> parse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./parser/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> optimize <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./optimizer&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> generate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./codegen/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createCompilerCreator <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./create-compiler&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> createCompiler <span class="token operator">=</span> <span class="token function">createCompilerCreator</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">baseCompile</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span>
<span class="token punctuation">)</span><span class="token operator">:</span> CompiledResult <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>optimize <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">optimize</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    ast<span class="token punctuation">,</span>
    <span class="token literal-property property">render</span><span class="token operator">:</span> code<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
    <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> code<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>我们发现<code>createCompiler</code>它又是<code>createCompilerCreator</code>方法的调用结果，在这个方法中，我们可以看到传递给它的<code>baseCompile</code>函数参数的定义。在<code>baseCompile</code>方法中，它的代码量不是很多，但它包含了我们编译最主要的三大步骤：<code>parse</code>、<code>optimize</code>和<code>generate</code>。这说明，<code>baseCompile</code>才是我们最核心、最基本的编译方法。</p><p>那么，<code>createCompilerCreator</code>又是什么呢？它是如何返回一个函数的？我们来看它的实现代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createCompilerCreator</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">baseCompile</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createCompiler</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">baseOptions</span><span class="token operator">:</span> CompilerOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">compile</span> <span class="token punctuation">(</span>
      <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
      options<span class="token operator">?</span><span class="token operator">:</span> CompilerOptions</span>
    <span class="token punctuation">)</span><span class="token operator">:</span> CompiledResult <span class="token punctuation">{</span>
      <span class="token keyword">const</span> finalOptions <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>baseOptions<span class="token punctuation">)</span>
      <span class="token keyword">const</span> errors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">const</span> tips <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

      <span class="token keyword">let</span> <span class="token function-variable function">warn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> range<span class="token punctuation">,</span> tip</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token punctuation">(</span>tip <span class="token operator">?</span> tips <span class="token operator">:</span> errors<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>outputSourceRange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// $flow-disable-line</span>
          <span class="token keyword">const</span> leadingSpaceLength <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\s*</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length

          <span class="token function-variable function">warn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> range<span class="token punctuation">,</span> tip</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token literal-property property">data</span><span class="token operator">:</span> WarningMessage <span class="token operator">=</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>range<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>range<span class="token punctuation">.</span>start <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                data<span class="token punctuation">.</span>start <span class="token operator">=</span> range<span class="token punctuation">.</span>start <span class="token operator">+</span> leadingSpaceLength
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>range<span class="token punctuation">.</span>end <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                data<span class="token punctuation">.</span>end <span class="token operator">=</span> range<span class="token punctuation">.</span>end <span class="token operator">+</span> leadingSpaceLength
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">(</span>tip <span class="token operator">?</span> tips <span class="token operator">:</span> errors<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// merge custom modules</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>modules<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          finalOptions<span class="token punctuation">.</span>modules <span class="token operator">=</span>
            <span class="token punctuation">(</span>baseOptions<span class="token punctuation">.</span>modules <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>modules<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// merge custom directives</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>directives<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          finalOptions<span class="token punctuation">.</span>directives <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span>
            Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>baseOptions<span class="token punctuation">.</span>directives <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            options<span class="token punctuation">.</span>directives
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// copy other options</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!==</span> <span class="token string">&#39;modules&#39;</span> <span class="token operator">&amp;&amp;</span> key <span class="token operator">!==</span> <span class="token string">&#39;directives&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            finalOptions<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> options<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      finalOptions<span class="token punctuation">.</span>warn <span class="token operator">=</span> warn

      <span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">baseCompile</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> finalOptions<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">detectErrors</span><span class="token punctuation">(</span>compiled<span class="token punctuation">.</span>ast<span class="token punctuation">,</span> warn<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      compiled<span class="token punctuation">.</span>errors <span class="token operator">=</span> errors
      compiled<span class="token punctuation">.</span>tips <span class="token operator">=</span> tips
      <span class="token keyword">return</span> compiled
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      compile<span class="token punctuation">,</span>
      <span class="token literal-property property">compileToFunctions</span><span class="token operator">:</span> <span class="token function">createCompileToFunctionFn</span><span class="token punctuation">(</span>compile<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>虽然，<code>createCompilerCreator</code>方法的代码比较长，但我们适当精简后就会变得非常清晰：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 精简代码</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createCompilerCreator</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">baseCompile</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createCompiler</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">baseOptions</span><span class="token operator">:</span> CompilerOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">compile</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">baseCompile</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> finalOptions<span class="token punctuation">)</span>
      <span class="token keyword">return</span> compiled
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      compile<span class="token punctuation">,</span>
      <span class="token literal-property property">compileToFunctions</span><span class="token operator">:</span> <span class="token function">createCompileToFunctionFn</span><span class="token punctuation">(</span>compile<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>看到这里，我们把之前介绍的串联起来，无论是<code>$mount</code>方法中的<code>compileToFunctions</code>还是<code>Vue.compile</code>，都是<code>createCompiler</code>方法调用返回结果对象的<code>compileToFunctions</code>属性值，这个属性值它又是<code>createCompileToFunctionFn</code>方法的调用结果，其中参数是在<code>createCompiler</code>中定义的一个<code>compile</code>方法，我们再深入去看<code>createCompileToFunctionFn</code>的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createCompileToFunctionFn</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">compile</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">const</span> cache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">compileToFunctions</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> CompilerOptions<span class="token punctuation">,</span>
    vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> CompiledFunctionResult <span class="token punctuation">{</span>
    options <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// check cache</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> options<span class="token punctuation">.</span>delimiters
      <span class="token operator">?</span> <span class="token function">String</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>delimiters<span class="token punctuation">)</span> <span class="token operator">+</span> template
      <span class="token operator">:</span> template
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// compile</span>
    <span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">const</span> fnGenErrors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    res<span class="token punctuation">.</span>render <span class="token operator">=</span> <span class="token function">createFunction</span><span class="token punctuation">(</span>compiled<span class="token punctuation">.</span>render<span class="token punctuation">,</span> fnGenErrors<span class="token punctuation">)</span>
    res<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> compiled<span class="token punctuation">.</span>staticRenderFns<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">code</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">createFunction</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> fnGenErrors<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> res<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个方法中，我们精简一下，只关心以上几段代码。我们可以发现，在<code>createCompileToFunctionFn</code>方法中我们终于找到了<code>compileToFunctions</code>方法的最终定义，其核心代码只有一段：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
</code></pre></div><p>这里的<code>compile</code>就是我们之前提到过的最核心、最基本的编译方法<code>baseCompile</code>它的包裹函数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">compile</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">baseCompile</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> finalOptions<span class="token punctuation">)</span>
  <span class="token keyword">return</span> compiled
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">baseCompile</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span>
<span class="token punctuation">)</span><span class="token operator">:</span> CompiledResult <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>optimize <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">optimize</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    ast<span class="token punctuation">,</span>
    <span class="token literal-property property">render</span><span class="token operator">:</span> code<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
    <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> code<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="代码分析" tabindex="-1"><a class="header-anchor" href="#代码分析" aria-hidden="true">#</a> 代码分析</h2><p>在介绍完核心<code>compile</code>方法后，我们来分析一下<code>compileToFunctions</code>的实现逻辑：</p>`,19)),s("ul",null,[s("li",null,[n[1]||(n[1]=s("strong",null,"CSP限制",-1)),n[2]||(n[2]=a("：")),n[3]||(n[3]=s("code",null,"CSP",-1)),n[4]||(n[4]=a("是指内容安全策略，我们可以在")),s("a",i,[n[0]||(n[0]=a("MDN")),t(p)]),n[5]||(n[5]=a("上看到它对")),n[6]||(n[6]=s("code",null,"CSP",-1)),n[7]||(n[7]=a("的定义、描述以及一些示例，同时我们可以看到它有下面这样一段描述："))])]),n[26]||(n[26]=s("blockquote",null,[s("p",null,"一个策略由一系列策略指令所组成，每个策略指令都描述了一个针对某个特定类型资源以及生效范围的策略。你的策略应当包含一个default-src策略指令，在其他资源类型没有符合自己的策略时应用该策略(有关完整列表查看default-src )。一个策略可以包含 default-src 或者 script-src 指令来防止内联脚本运行, 并杜绝eval()的使用。 一个策略也可包含一个 default-src 或 style-src 指令去限制来自一个 style 元素或者style属性的內联样式。")],-1)),s("p",null,[n[9]||(n[9]=a("如果想了解")),n[10]||(n[10]=s("code",null,"CSP",-1)),n[11]||(n[11]=a("，你可以点击")),s("a",k,[n[8]||(n[8]=a("Content Security Policy")),t(p)]),n[12]||(n[12]=a("去深入学习有关")),n[13]||(n[13]=s("code",null,"CSP",-1)),n[14]||(n[14]=a("方面的知识。"))]),s("p",null,[n[16]||(n[16]=s("strong",null,"注意",-1)),n[17]||(n[17]=a("：")),n[18]||(n[18]=s("code",null,"Vue",-1)),n[19]||(n[19]=a("只在")),n[20]||(n[20]=s("code",null,"1.0+",-1)),n[21]||(n[21]=a("提供了特定的")),n[22]||(n[22]=s("code",null,"CSP",-1)),n[23]||(n[23]=a("兼容版本，你可以在")),s("a",d,[n[15]||(n[15]=a("Vue Github")),t(p)]),n[24]||(n[24]=a("分支仓库去查看这个版本的源代码。"))]),n[27]||(n[27]=o(`<p>根据以上描述，如果存在某些<code>CSP</code>限制，那么我们可能无法使用<code>text-to-JavaScript</code>机制，也就是说下面这些代码可能无法正常运行：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> func <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;return 1&#39;</span><span class="token punctuation">)</span>
<span class="token function">evel</span><span class="token punctuation">(</span><span class="token string">&#39;alert(1)&#39;</span><span class="token punctuation">)</span>
</code></pre></div><p>在<code>compileToFunctions</code>返回函数中，我们使用<code>try/catch</code>尝试检测<code>new Function(&#39;return 1&#39;)</code>是否存在<code>CSP</code>限制，如果存在就提示相关错误信息。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token string">&#39;It seems you are using the standalone build of Vue.js in an &#39;</span> <span class="token operator">+</span>
<span class="token string">&#39;environment with Content Security Policy that prohibits unsafe-eval. &#39;</span> <span class="token operator">+</span>
<span class="token string">&#39;The template compiler cannot work in this environment. Consider &#39;</span> <span class="token operator">+</span>
<span class="token string">&#39;relaxing the policy to allow unsafe-eval or pre-compiling your &#39;</span> <span class="token operator">+</span>
<span class="token string">&#39;templates into render functions.&#39;</span>
</code></pre></div><p>如果不存在，那么代表我们可以安全的使用<code>text-to-JavaScript</code>这种机制，在<code>compileToFunctions</code>中，它有如下核心代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
</code></pre></div><p>在以上代码执行后，<code>compiled.render</code>是一段字符串，我们可以举例说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">render</span><span class="token operator">:</span> <span class="token string">&#39;with(this){return 1}&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>res</code>返回对象中，<code>compileToFunctions</code>是使用下面这段代码来赋值的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> fnGenErrors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
res<span class="token punctuation">.</span>render <span class="token operator">=</span> <span class="token function">createFunction</span><span class="token punctuation">(</span>compiled<span class="token punctuation">.</span>render<span class="token punctuation">,</span> fnGenErrors<span class="token punctuation">)</span>
res<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> compiled<span class="token punctuation">.</span>staticRenderFns<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">code</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createFunction</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> fnGenErrors<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>我们可以看到，无论是<code>render</code>还是<code>staticRenderFns</code>都使用了<code>createFunction</code>，这个方法的主要作用就是将一段字符串代码，封装成一个函数并返回，其实现代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createFunction</span> <span class="token punctuation">(</span><span class="token parameter">code<span class="token punctuation">,</span> errors</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    errors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> err<span class="token punctuation">,</span> code <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> noop
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果<code>new Function</code>没有出错，那么我们就返回这个匿名函数，如果出错了就把出错信息<code>push</code>到<code>errors</code>数组中。借用上面的例子，它封装后如下所示：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 封装前</span>
<span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">render</span><span class="token operator">:</span> <span class="token string">&#39;with(this){return 1}&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 封装后</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li><strong>核心编译</strong>：在之前我们介绍过<code>compileToFunctions</code>方法，它只有一段最核心的代码：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 核心代码</span>
<span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> options<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">compile</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">baseCompile</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> finalOptions<span class="token punctuation">)</span>
  <span class="token keyword">return</span> compiled
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">baseCompile</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> CompilerOptions</span>
<span class="token punctuation">)</span><span class="token operator">:</span> CompiledResult <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>optimize <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">optimize</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    ast<span class="token punctuation">,</span>
    <span class="token literal-property property">render</span><span class="token operator">:</span> code<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
    <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> code<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当核心编译方法<code>compile</code>开始执行的时候，<code>baseCompile</code>自然而然的跟着一起执行了，当<code>baseCompile</code>执行的时候，也就意味着编译主要三大步骤开始了。由于这三大步骤比较复杂，我们会在后续章节中单独进行介绍。</p><ul><li><strong>编译缓存</strong>：在组件编译的时候，对于同一个组件而言我们应该只编译一次。当第一次编译完成后，我们应该把编译结果缓存起来，下一次遇到相同组件再次编译的时候先从缓存里面去获取，如果缓存里面有则直接返回，如果没有才会走编译的过程，这就是编译缓存，它属于编译优化的一种手段。其中，编译缓存是靠下面这几段代码来实现的：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> cache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">compileToFunctions</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">template</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> CompilerOptions<span class="token punctuation">,</span>
  vm<span class="token operator">?</span><span class="token operator">:</span> Component</span>
<span class="token punctuation">)</span><span class="token operator">:</span> CompiledFunctionResult <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">const</span> key <span class="token operator">=</span> options<span class="token punctuation">.</span>delimiters
    <span class="token operator">?</span> <span class="token function">String</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>delimiters<span class="token punctuation">)</span> <span class="token operator">+</span> template
    <span class="token operator">:</span> template
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们拿根实例举例说明：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App&#39;</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> App <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;App/&gt;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>编译缓存后，<code>cache</code>缓存对象如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> cache <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;&lt;App/&gt;&#39;</span><span class="token operator">:</span> <span class="token string">&#39;with(this) { xxxx }&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当再次编译<code>App</code>组件的时候，发现在<code>cache</code>对象中已经存在这个键，因此直接返回。</p>`,24))])}const f=e(r,[["render",m],["__file","compileToFunctions.html.vue"]]);export{f as default};
