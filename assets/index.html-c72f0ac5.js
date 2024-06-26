import{_ as n,o as a,c as s,d as e}from"./app-9340970a.js";const o={},t=e(`<h1 id="go基础" tabindex="-1"><a class="header-anchor" href="#go基础" aria-hidden="true">#</a> Go基础</h1><h2 id="约定规则" tabindex="-1"><a class="header-anchor" href="#约定规则" aria-hidden="true">#</a> 约定规则</h2><p>Go中有一些约定的规则：</p><ul><li>每个<code>.go</code>文件必须有一个包名，例如<code>package main</code>，其中<code>main</code>即为包名。</li><li>严格区分大小写，大写开头的变量、常量或者方法可跨包访问。</li><li>双引号代表字符串，单引号代表字符，例如：<code>&quot;abc&quot;</code>和<code>&#39;a&#39;</code>。</li><li>不需要写分号。</li></ul><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token comment">/*
  这是一个main函数的多行注释
  多行注释
  多行注释
*/</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这是单行注释</span>
  fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="变量和常量" tabindex="-1"><a class="header-anchor" href="#变量和常量" aria-hidden="true">#</a> 变量和常量</h2><p>变量和常量分别使用<code>var</code>和<code>const</code>关键词来定义。</p><h3 id="定义方式" tabindex="-1"><a class="header-anchor" href="#定义方式" aria-hidden="true">#</a> 定义方式</h3><p><code>var</code>变量定义方式如下：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> v1 <span class="token builtin">int</span>     <span class="token comment">// 变量名 + 指明类型</span>
<span class="token keyword">var</span> v2 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 变量名 + 指明类型 + 初始值</span>
<span class="token keyword">var</span> v3 <span class="token operator">=</span> <span class="token number">3</span>     <span class="token comment">// 变量名 + 初始值(自动推导类型)</span>
v1 <span class="token operator">=</span> <span class="token number">1</span>         <span class="token comment">// 仅赋值</span>
v4 <span class="token operator">:=</span> <span class="token number">4</span>        <span class="token comment">// 不需要关键词且自动推导类型(推荐)</span>

<span class="token comment">// 使用括号定义多个变量</span>
<span class="token keyword">var</span> <span class="token punctuation">(</span>
  v5 <span class="token operator">=</span> <span class="token number">5</span>
  v6 <span class="token builtin">int</span>
  v7 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">7</span>
<span class="token punctuation">)</span>
</code></pre></div><p><code>const</code>常量定义方式如下：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> v1 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 常量名 + 指明类型 + 初始值</span>
<span class="token keyword">const</span> v2 <span class="token operator">=</span> <span class="token number">2</span>     <span class="token comment">// 常量名 + 初始值(自动推导类型)</span>
v3 <span class="token operator">:=</span> <span class="token number">3</span>          <span class="token comment">// 不需要关键词且自动推导类型(推荐)</span>

<span class="token comment">// 使用括号定义多个常量</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
  v4     <span class="token operator">=</span> <span class="token number">4</span>
  v5 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">5</span>
<span class="token punctuation">)</span>
</code></pre></div><h3 id="全局变量-常量" tabindex="-1"><a class="header-anchor" href="#全局变量-常量" aria-hidden="true">#</a> 全局变量(常量)</h3><p>在<code>.go</code>文件中，定义在最外层的变量、常量，在整个文件中都可以使用，它们叫这个包的全局变量(常量)。</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> mainGlobalVar <span class="token operator">=</span> <span class="token string">&quot;global&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;global var is %s&quot;</span><span class="token punctuation">,</span> mainGlobalVar<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="跨包变量-常量" tabindex="-1"><a class="header-anchor" href="#跨包变量-常量" aria-hidden="true">#</a> 跨包变量(常量)</h3><p>跨包变量(常量)，必须满足以下两个条件：</p><ul><li>为全局变量(常量)。</li><li>必须大写开头，小写开头的变量(常量)被认为是这个包的私有变量(常量)，不能被访问。</li></ul><p><code>math/math.go</code>文件代码：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> goMath

<span class="token keyword">const</span> PI <span class="token operator">=</span> <span class="token number">3.1415926</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre></div><p><code>main.go</code>文件代码：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	goMath <span class="token string">&quot;go-learn/math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;pi var is %f&quot;</span><span class="token punctuation">,</span> goMath<span class="token punctuation">.</span>PI<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h2><p><code>Go</code>中，如果定义变量时没有赋初始值，则会根据其具体类型赋默认值。</p><p><code>bit</code>：比特位，二进制中的一位，信息的最小单位。 <code>byte</code>: 字节，1 byte = 8 bit。</p><h3 id="整数型" tabindex="-1"><a class="header-anchor" href="#整数型" aria-hidden="true">#</a> 整数型</h3><p>分为有符号和无符号整数两种，例如：<code>int</code>(有符号)，<code>uint</code>(无符号)。</p><p>有符号和无符号的区别时，有符号整数第一个<code>bit</code>位会用来存放正负符号(0表示正数，1表示负数)，所以它所表示的最大数字要比无符号的整数要小。</p><ul><li>有符号：<code>00000101</code>，十进制<code>5</code>; <code>10000101</code>，十进制<code>-5</code>。</li><li>无符号：<code>00000101</code>，十进制<code>5</code>; <code>10000101</code>，十进制<code>133</code>。</li></ul><h3 id="浮点型" tabindex="-1"><a class="header-anchor" href="#浮点型" aria-hidden="true">#</a> 浮点型</h3><h3 id="字符型" tabindex="-1"><a class="header-anchor" href="#字符型" aria-hidden="true">#</a> 字符型</h3><h3 id="布尔型" tabindex="-1"><a class="header-anchor" href="#布尔型" aria-hidden="true">#</a> 布尔型</h3><h3 id="字符串型" tabindex="-1"><a class="header-anchor" href="#字符串型" aria-hidden="true">#</a> 字符串型</h3><h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2>`,35),p=[t];function c(l,i){return a(),s("div",null,p)}const r=n(o,[["render",c],["__file","index.html.vue"]]);export{r as default};
