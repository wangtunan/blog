import{_ as s,o as a,c as t,d as p}from"./app-d99c486e.js";const o={};function e(c,n){return a(),t("div",null,n[0]||(n[0]=[p(`<h1 id="go基础" tabindex="-1"><a class="header-anchor" href="#go基础" aria-hidden="true">#</a> Go基础</h1><h2 id="约定规则" tabindex="-1"><a class="header-anchor" href="#约定规则" aria-hidden="true">#</a> 约定规则</h2><p>Go中有一些约定的规则：</p><ul><li>每个<code>.go</code>文件必须有一个包名，例如<code>package main</code>，其中<code>main</code>即为包名。</li><li>严格区分大小写，大写开头的变量、常量或者方法可跨包访问。</li><li>双引号代表字符串，单引号代表字符，例如：<code>&quot;abc&quot;</code>和<code>&#39;a&#39;</code>。</li><li>不需要写分号。</li></ul><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
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
</code></pre></div><h2 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h2><p><code>Go</code>中，如果定义变量时没有赋初始值，则会根据其具体类型赋默认值。</p><ul><li><code>bit</code>：比特位，二进制中的一位，信息的最小单位。</li><li><code>byte</code>: 字节，1 byte = 8 bit。</li><li><code>binary</code>: 二进制，一般用<code>0b</code>或者<code>0B</code>来表示，例如：<code>0b0101</code>。</li><li><code>octal</code>: 八进制，一般用<code>0o</code>或者<code>0O</code>来表示，例如：<code>0o377</code>。</li><li><code>hexadecimal</code>: 十六进制，一般用<code>0x</code>或者<code>0X</code>来表示，例如<code>0xFF</code>。</li></ul><h3 id="整数型" tabindex="-1"><a class="header-anchor" href="#整数型" aria-hidden="true">#</a> 整数型</h3><p>分为有符号和无符号整数两种，例如：<code>int</code>(有符号)，<code>uint</code>(无符号)。</p><p>有符号和无符号的区别时，有符号整数第一个<code>bit</code>位会用来存放正负符号(0表示正数，1表示负数)，所以它所表示的最大数字要比无符号的整数要小。</p><ul><li>有符号：<code>00000101</code>，十进制<code>5</code>; <code>10000101</code>，十进制<code>-5</code>。</li><li>无符号：<code>00000101</code>，十进制<code>5</code>; <code>10000101</code>，十进制<code>133</code>。</li></ul><p>各种类型的<code>int</code>其对比如下：</p><table><thead><tr><th>类型</th><th>bit长度</th><th>范围</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>int8</td><td>8 bit</td><td>-2⁷ 到 2⁷ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint8</td><td>8 bit</td><td>-2⁸ 到 2⁸ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int16</td><td>16 bit</td><td>-2¹⁵ 到 2¹⁵ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint16</td><td>16 bit</td><td>2¹⁶ 到 2¹⁶ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int32</td><td>32 bit</td><td>-2³¹ 到 2³¹ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint32</td><td>32 bit</td><td>2³² 到 2³² - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int64</td><td>64 bit</td><td>-2⁶³ 到 -2⁶³ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>uint64</td><td>64 bit</td><td>2⁶⁴ 到 2⁶⁴ - 1</td><td>0</td><td>长度确定</td></tr><tr><td>int</td><td>32/64 bit</td><td></td><td>0</td><td>跟随32或者64位系统</td></tr><tr><td>uint</td><td>32/64 bit</td><td></td><td>0</td><td>跟随32或者64位系统</td></tr></tbody></table><h3 id="浮点型" tabindex="-1"><a class="header-anchor" href="#浮点型" aria-hidden="true">#</a> 浮点型</h3><p>浮点型主要有<code>float32</code>和<code>float64</code>这两类，其区别如下：</p><table><thead><tr><th>类型</th><th>bit长度</th><th>符号 + 整数 + 尾数</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>float32</td><td>32 bit</td><td>1 + 8 + 23</td><td>0</td><td></td></tr><tr><td>float64</td><td>64 bit</td><td>1 + 11 + 52</td><td>0</td><td>不指明类型时，默认</td></tr></tbody></table><h3 id="字符型" tabindex="-1"><a class="header-anchor" href="#字符型" aria-hidden="true">#</a> 字符型</h3><p>字符型用单引号来定义，<code>byte</code>和<code>rune</code>常用来定义字符型。</p><table><thead><tr><th>类型</th><th>别名</th><th>编码</th></tr></thead><tbody><tr><td>byte</td><td>uint8 的别名</td><td>ASCII</td></tr><tr><td>rune</td><td>int32 的别名</td><td>UTF-8(ASCII的超集)</td></tr></tbody></table><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

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
</code></pre></div><h2 id="fmt格式字符" tabindex="-1"><a class="header-anchor" href="#fmt格式字符" aria-hidden="true">#</a> fmt格式字符</h2><table><thead><tr><th>符号</th><th>类型</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>%%</td><td>通用</td><td>%</td><td>输出百分号(%)</td></tr><tr><td>%v</td><td>通用</td><td>value</td><td>输出value值</td></tr><tr><td>%T</td><td>通用</td><td>Type</td><td>输出值对应的类型</td></tr><tr><td>%p</td><td>通用</td><td>Pointer</td><td>0x开头的16进制指针地址</td></tr><tr><td>%d</td><td>整数</td><td>decimal</td><td>十进制</td></tr><tr><td>%b</td><td>整数</td><td>binary</td><td>二进制(没有前缀)</td></tr><tr><td>%o</td><td>整数</td><td>octal</td><td>八进制(没有前缀)</td></tr><tr><td>%x</td><td>整数</td><td>hexadecimal</td><td>十六进制a-f(没有前缀)</td></tr><tr><td>%X</td><td>整数</td><td>hexadecimal</td><td>十六进制A-F(没有前缀)</td></tr><tr><td>%c</td><td>整数</td><td>character</td><td>Unicode码值对应的字符</td></tr><tr><td>%f或者%F</td><td>浮点数</td><td>float</td><td>小数</td></tr><tr><td>%.xf</td><td>浮点数</td><td>float</td><td>保留x位小数，不足位数补0</td></tr><tr><td>%e</td><td>浮点数</td><td>float</td><td>小写e的科学计数法</td></tr><tr><td>%E</td><td>浮点数</td><td>float</td><td>大写e的科学计数法</td></tr><tr><td>%t</td><td>布尔值</td><td>bool</td><td>输出true或者false</td></tr><tr><td>%s</td><td>字符串</td><td>string</td><td>按字符串输出</td></tr><tr><td>%q</td><td>字符串</td><td>string</td><td>带引号的字符串输出</td></tr></tbody></table><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p1 <span class="token operator">:=</span> <span class="token string">&quot;admin&quot;</span>
	p2 <span class="token operator">:=</span> <span class="token number">123</span>
	p3 <span class="token operator">:=</span> <span class="token number">123.456</span>
	p4 <span class="token operator">:=</span> <span class="token boolean">true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%%\\n&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p, %p, %p, %p&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>p1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>p2<span class="token punctuation">,</span> <span class="token operator">&amp;</span>p3<span class="token punctuation">,</span> <span class="token operator">&amp;</span>p4<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%b\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%o\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%x\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%X\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%f\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123.456</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%F\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123.456</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%.5f\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123.456</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%e\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123.456</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%E\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123.456</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%t\\n&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><table><thead><tr><th>运算符</th><th>分类</th><th>说明和示例</th></tr></thead><tbody><tr><td><code>+, -, *, /</code></td><td>算数运算符</td><td><code>+</code>还可用于字符串的拼接，例如：<code>&quot;hello,&quot; + &quot;world&quot;</code></td></tr><tr><td><code>++, --</code></td><td>算数运算符</td><td>自增和自减， <code>num++, num--</code></td></tr><tr><td><code>&gt;&gt;, &lt;&lt;</code></td><td>位运算符</td><td>按位整体左移或者右移，例如：<code>0b1100&gt;&gt;2</code>变成<code>0b11</code>，<code>0b1100&lt;&lt;2</code>变成<code>0b110000</code></td></tr><tr><td><code>&amp;</code></td><td>位运算符</td><td>按位与，对应位置都为1，则1，其它为0，例如：<code>0b110&amp;0b010</code> =&gt; <code>0b010</code></td></tr><tr><td><code>|</code></td><td>位运算符</td><td>按位或，对应位置只要有一个1，则1，例如：<code>0b110|0b010</code> =&gt; <code>0b110</code></td></tr><tr><td><code>^</code></td><td>位运算符</td><td>按位亦或，对应位置不相同则为1，其它为0，例如：<code>0b110^0b010</code> =&gt; <code>0b100</code></td></tr><tr><td><code>=, +=, /= ...</code></td><td>赋值运算符</td><td>赋值(简写形式), <code>num += 1</code>, 表示 <code>num = num + 1</code></td></tr><tr><td><code>&gt;, &gt;=, &lt;, &lt;=, ==, !=</code></td><td>关系运算符</td><td>判断逻辑关系，<code>17 &gt;= 18</code></td></tr><tr><td><code>&amp;&amp;</code></td><td>逻辑运算符</td><td>且逻辑，只有两个都为真，才为真</td></tr><tr><td><code>||</code></td><td>逻辑运算符</td><td>或逻辑，只要有一个为真，就为真</td></tr><tr><td><code>！</code></td><td>逻辑运算符</td><td>取反，<code>!true</code>变成<code>false</code>, <code>!false</code>取反变成<code>true</code></td></tr><tr><td><code>&amp;</code></td><td>地址运算符</td><td>取变量的指针地址， <code>&amp;num</code></td></tr><tr><td><code>*</code></td><td>地址运算符</td><td>去指针对应的值， <code>*pointer</code></td></tr><tr><td><code>()</code></td><td>优先级运算符</td><td>提升运算优先级，例如：<code>a&amp;&amp;(b||c)</code>，会先计算括号内的</td></tr></tbody></table><h2 id="流程控制语句" tabindex="-1"><a class="header-anchor" href="#流程控制语句" aria-hidden="true">#</a> 流程控制语句</h2><h3 id="if-else" tabindex="-1"><a class="header-anchor" href="#if-else" aria-hidden="true">#</a> if/else</h3><p><code>Golang</code>中的<code>if</code>和<code>else if</code>不需要使用括号把条件包裹起来：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	age <span class="token operator">:=</span> <span class="token number">18</span>
	<span class="token keyword">if</span> age <span class="token operator">&lt;</span> <span class="token number">18</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;未成年&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> age <span class="token operator">&gt;=</span> <span class="token number">18</span> <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;</span> <span class="token number">35</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;青年&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> age <span class="token operator">&gt;=</span> <span class="token number">35</span> <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;</span> <span class="token number">60</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;中年&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;老年人&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>Golang</code>中的<code>if</code>语句可以定义变量，此变量仅在<code>if/else</code>各个分支中访问，例如：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> age <span class="token operator">:=</span> <span class="token number">36</span><span class="token punctuation">;</span> age <span class="token operator">&lt;</span> <span class="token number">18</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;未成年&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> age <span class="token operator">&gt;=</span> <span class="token number">18</span> <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;</span> <span class="token number">35</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;青年&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> age <span class="token operator">&gt;=</span> <span class="token number">35</span> <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;</span> <span class="token number">60</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;中年&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;老年人&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 错误：age is undefined</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="switch-case" tabindex="-1"><a class="header-anchor" href="#switch-case" aria-hidden="true">#</a> switch/case</h3><p><code>Golang</code>中的<code>switch/case</code>语句有如下几个特点：</p><ul><li>可代替<code>if/else </code>写法。</li><li><code>case</code>分支自动添加<code>break</code>。</li><li><code>default</code>分支可省略。</li><li>如果想要贯穿多个<code>case</code>，需要使用<code>fallthrough</code></li></ul><p>以上<code>if/else</code>案例等价于：</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	age <span class="token operator">:=</span> <span class="token number">18</span>

	<span class="token keyword">switch</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> age <span class="token operator">&lt;</span> <span class="token number">18</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;未成年&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> age <span class="token operator">&gt;=</span> <span class="token number">18</span> <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;</span> <span class="token number">35</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;青年&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> age <span class="token operator">&gt;=</span> <span class="token number">35</span> <span class="token operator">&amp;&amp;</span> age <span class="token operator">&lt;</span> <span class="token number">60</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;中年&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;老年人&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><h2 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h2><p>在<code>Golang</code>的<code>for</code>循环中，<code>break</code>和<code>continue</code>依旧分别表示中断循环和继续下一次循环。</p><h3 id="for循环的三种方式" tabindex="-1"><a class="header-anchor" href="#for循环的三种方式" aria-hidden="true">#</a> for循环的三种方式</h3><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 方式一：初始条件 + 判断条件 + 后续处理 + 循环体</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;=========&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 方式二：判断条件 + 循环体</span>
	i <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
		i<span class="token operator">++</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;=========&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 方式三：仅循环体</span>
	j <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> j <span class="token operator">==</span> <span class="token number">10</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		j<span class="token operator">++</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="for-range循环" tabindex="-1"><a class="header-anchor" href="#for-range循环" aria-hidden="true">#</a> for/range循环</h3><p><code>Golang</code>中的<code>for/range</code>可同来迭代字符串、数组、切片和<code>map</code>对象。</p><div class="language-go" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 迭代切片(数组)</span>
	list <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;AAA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;BBB&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CCC&quot;</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> list <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token comment">// k为索引，v为值</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;=========&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// 迭代字符串</span>
	str <span class="token operator">:=</span> <span class="token string">&quot;hello&quot;</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token comment">// k为索引，v为字符的码值</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;=========&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// 迭代map对象</span>
	student <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>    <span class="token string">&quot;AAA&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span>     <span class="token string">&quot;23&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;address&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;shanghai&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> student <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token comment">// k为键，v为值</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><h2 id="数组和切片" tabindex="-1"><a class="header-anchor" href="#数组和切片" aria-hidden="true">#</a> 数组和切片</h2><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h2><h2 id="结构体和自定义数据类型" tabindex="-1"><a class="header-anchor" href="#结构体和自定义数据类型" aria-hidden="true">#</a> 结构体和自定义数据类型</h2><h2 id="方法和接口" tabindex="-1"><a class="header-anchor" href="#方法和接口" aria-hidden="true">#</a> 方法和接口</h2><h2 id="协程-channel" tabindex="-1"><a class="header-anchor" href="#协程-channel" aria-hidden="true">#</a> 协程/channel</h2>`,83)]))}const l=s(o,[["render",e],["__file","index.html.vue"]]);export{l as default};
