import{_ as n,o as a,c as s,d as t}from"./app-1a14474f.js";const o={},e=t(`<h1 id="go基础" tabindex="-1"><a class="header-anchor" href="#go基础" aria-hidden="true">#</a> Go基础</h1><h2 id="约定规则" tabindex="-1"><a class="header-anchor" href="#约定规则" aria-hidden="true">#</a> 约定规则</h2><p>Go中有一些约定的规则：</p><ul><li>每个<code>.go</code>文件必须有一个包名，例如<code>package main</code>，其中<code>main</code>即为包名。</li><li>严格区分大小写，大写开头的变量、常量或者方法可跨包访问。</li><li>双引号代表字符串，单引号代表字符，例如：<code>&quot;abc&quot;</code>和<code>&#39;a&#39;</code>。</li><li>不需要写分号。</li></ul><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
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
</code></pre></div><h2 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h2><p><code>Go</code>中，如果定义变量时没有赋初始值，则会根据其具体类型赋默认值。</p><p><code>bit</code>：比特位，二进制中的一位，信息的最小单位。 <code>byte</code>: 字节，1 byte = 8 bit。 <code>binary</code>: 二进制，一般用<code>0b</code>或者<code>0B</code>来表示，例如：<code>0b0101</code>。 <code>octal</code>: 八进制，一般用<code>0o</code>或者<code>0O</code>来表示，例如：<code>0o377</code>。 <code>hexadecimal</code>: 十六进制，一般用<code>0x</code>或者<code>0X</code>来表示，例如<code>0xFF</code>。</p><h3 id="整数型" tabindex="-1"><a class="header-anchor" href="#整数型" aria-hidden="true">#</a> 整数型</h3><p>分为有符号和无符号整数两种，例如：<code>int</code>(有符号)，<code>uint</code>(无符号)。</p><p>有符号和无符号的区别时，有符号整数第一个<code>bit</code>位会用来存放正负符号(0表示正数，1表示负数)，所以它所表示的最大数字要比无符号的整数要小。</p><ul><li>有符号：<code>00000101</code>，十进制<code>5</code>; <code>10000101</code>，十进制<code>-5</code>。</li><li>无符号：<code>00000101</code>，十进制<code>5</code>; <code>10000101</code>，十进制<code>133</code>。</li></ul><p>各种类型的<code>int</code>其对比如下：</p><table><thead><tr><th>类型</th><th>bit长度</th><th>范围</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>int8</td><td>8 bit</td><td>-2⁷ 到 2⁷ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint8</td><td>8 bit</td><td>-2⁸ 到 2⁸ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int16</td><td>16 bit</td><td>-2¹⁵ 到 2¹⁵ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint16</td><td>16 bit</td><td>2¹⁶ 到 2¹⁶ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int32</td><td>32 bit</td><td>-2³¹ 到 2³¹ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint32</td><td>32 bit</td><td>2³² 到 2³² - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int64</td><td>64 bit</td><td>-2⁶³ 到 -2⁶³ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint64</td><td>64 bit</td><td>2⁶⁴ 到 2⁶⁴ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int</td><td>32/64 bit</td><td></td><td>0</td><td>跟随32或者64位系统</td></tr><tr><td>uint</td><td>32/64 bit</td><td></td><td>0</td><td>跟随32或者64位系统</td></tr></tbody></table><h3 id="浮点型" tabindex="-1"><a class="header-anchor" href="#浮点型" aria-hidden="true">#</a> 浮点型</h3><p>浮点型主要有<code>float32</code>和<code>float64</code>这两类，其区别如下：</p><table><thead><tr><th>类型</th><th>bit长度</th><th>符号 + 整数 + 尾数</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>float32</td><td>32 bit</td><td>1 + 8 + 23</td><td>0</td><td></td></tr><tr><td>float64</td><td>64 bit</td><td>1 + 11 + 52</td><td>0</td><td>不指明类型时，默认</td></tr></tbody></table><h3 id="字符型" tabindex="-1"><a class="header-anchor" href="#字符型" aria-hidden="true">#</a> 字符型</h3><p>字符型用单引号来定义，<code>byte</code>和<code>rune</code>常用来定义字符型。</p><table><thead><tr><th>类型</th><th>别名</th><th>编码</th></tr></thead><tbody><tr><td>byte</td><td>uint8 的别名</td><td>ASCII</td></tr><tr><td>rune</td><td>int32 的别名</td><td>UTF-8(ASCII的超集)</td></tr></tbody></table><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		c1 <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token char">&#39;a&#39;</span>  <span class="token comment">// 97</span>
		c2 <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token char">&#39;A&#39;</span>  <span class="token comment">// 65</span>
		c3 <span class="token builtin">rune</span> <span class="token operator">=</span> <span class="token char">&#39;中&#39;</span> <span class="token comment">// 20013</span>
	<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;c1 val is %v, c2 val is %v, diff is %v\\n&quot;</span><span class="token punctuation">,</span> c1<span class="token punctuation">,</span> c2<span class="token punctuation">,</span> c1<span class="token operator">-</span>c2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;c3 val is %v\\n&quot;</span><span class="token punctuation">,</span> c3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="布尔型" tabindex="-1"><a class="header-anchor" href="#布尔型" aria-hidden="true">#</a> 布尔型</h3><p>布尔值，只有<code>true</code>和<code>false</code>两种值。</p><table><thead><tr><th>类型</th><th>bit长度</th><th>默认值</th></tr></thead><tbody><tr><td>bool</td><td>1 bit</td><td>false</td></tr></tbody></table><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		b1 <span class="token operator">=</span> <span class="token boolean">true</span>
		b2 <span class="token builtin">bool</span>
	<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;b1 val is %v, b2 val is %v \\n&quot;</span><span class="token punctuation">,</span> b1<span class="token punctuation">,</span> b2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="字符串型" tabindex="-1"><a class="header-anchor" href="#字符串型" aria-hidden="true">#</a> 字符串型</h3><p>字符串需要通过双引号来定义。</p><table><thead><tr><th>类型</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>string</td><td>可通过len()查看长度</td><td>&quot;&quot;</td></tr></tbody></table><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		s1 <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span>
		s2 <span class="token builtin">string</span>
	<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;s1 val is &#39;%s&#39;, s2 val is &#39;%s&#39; \\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;s1 length is %d, s2 length is %d \\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2><p><code>Golang</code>中取地址符使用<code>&amp;</code>符号，访问地址指向的值使用<code>*</code>，指针类型使用<code>*类型</code>，例如<code>*int</code>。</p><p>参数有如下两种传递方式：</p><ul><li>值拷贝：开辟一块新的内存空间，存放原值的副本，副本和原值互不干扰。</li></ul><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">increment</span><span class="token punctuation">(</span>num <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	num<span class="token operator">++</span>
	<span class="token keyword">return</span> num
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	num <span class="token operator">:=</span> <span class="token number">3</span>
	result <span class="token operator">:=</span> <span class="token function">increment</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>                              <span class="token comment">// 值拷贝</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;num is %d, result is %d \\n&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">,</span> result<span class="token punctuation">)</span> <span class="token comment">// 3, 4</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>值传递：开辟一块新的内存空间，存放原值的内存地址，可以通过原值的内存地址访问到原值。</li></ul><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// *int表示int类型的指针类型</span>
<span class="token comment">// *p代表指针指向的值</span>
<span class="token keyword">func</span> <span class="token function">incrementPointer</span><span class="token punctuation">(</span>p <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>p<span class="token operator">++</span>
	<span class="token keyword">return</span> <span class="token operator">*</span>p
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	num <span class="token operator">:=</span> <span class="token number">3</span>
	result <span class="token operator">:=</span> <span class="token function">incrementPointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num<span class="token punctuation">)</span>                      <span class="token comment">// 值传递</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;num is %d, result is %d \\n&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">,</span> result<span class="token punctuation">)</span> <span class="token comment">// 4, 4</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="fmt格式字符" tabindex="-1"><a class="header-anchor" href="#fmt格式字符" aria-hidden="true">#</a> fmt格式字符</h2><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><h2 id="流程控制语句" tabindex="-1"><a class="header-anchor" href="#流程控制语句" aria-hidden="true">#</a> 流程控制语句</h2><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><h2 id="数组和切片" tabindex="-1"><a class="header-anchor" href="#数组和切片" aria-hidden="true">#</a> 数组和切片</h2><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h2><h2 id="结构体和自定义数据类型" tabindex="-1"><a class="header-anchor" href="#结构体和自定义数据类型" aria-hidden="true">#</a> 结构体和自定义数据类型</h2><h2 id="方法和接口" tabindex="-1"><a class="header-anchor" href="#方法和接口" aria-hidden="true">#</a> 方法和接口</h2><h2 id="协程-channel" tabindex="-1"><a class="header-anchor" href="#协程-channel" aria-hidden="true">#</a> 协程/channel</h2>`,63),p=[e];function c(d,l){return a(),s("div",null,p)}const u=n(o,[["render",c],["__file","index.html.vue"]]);export{u as default};
