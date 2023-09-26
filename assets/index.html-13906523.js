import{_ as o,r as e,o as c,c as l,a as n,b as s,e as p,d as t}from"./app-c6c1ed2e.js";const u={},i=t('<h1 id="sass" tabindex="-1"><a class="header-anchor" href="#sass" aria-hidden="true">#</a> SASS</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p><code>SASS</code> 是一款强化<code>CSS</code>的辅助工具，它在<code>CSS</code>语法的基础上增加了变量 (<code>variables</code>)、嵌套 (<code>nested rules</code>)、混合 (<code>mixins</code>)、导入 (<code>inline imports</code>) 等高级功能，这些拓展令<code>CSS</code>更加强大与优雅。</p><p>参考文档和链接地址：</p>',4),k={href:"https://sass-lang.com/documentation/",target:"_blank",rel:"noopener noreferrer"},r={href:"https://www.sassmeister.com/",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装","aria-hidden":"true"},"#"),s(" 安装")],-1),m=n("p",null,[s("你可以使用如下两种方式来学习体验"),n("code",null,"SASS"),s("：")],-1),g={href:"https://www.sassmeister.com/",target:"_blank",rel:"noopener noreferrer"},b=n("li",null,[s("通过"),n("code",null,"sass"),s("的"),n("code",null,"npm"),s("包自主编译，适合深入学习(本篇文章采用方式，推荐)。")],-1),y=t(`<p>首先，你需要按照下面命令创建一个新的项目，然后使用<code>npm</code>命令初始化生成<code>package.json</code>文件，如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建目录</span>
$ <span class="token function">mkdir</span> sass-learn

<span class="token comment"># 使用默认配置，生成package.json文件</span>
$ <span class="token function">npm</span> init <span class="token parameter variable">-y</span>
</code></pre></div><p>执行完以上命令后，代码结构如下所示：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- sass-learn
<span class="token operator">|</span>   <span class="token operator">|</span>-- package.json
</code></pre></div><p>接着，通过编辑器终端安装<code>sass</code>：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装sass</span>
$ <span class="token function">npm</span> <span class="token function">install</span> sass
</code></pre></div><p>紧接着，在<code>package.json</code>文件中添加两个命令，如下：</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token comment">// dev为本地开发命令，--watch是监听文件变化，自动编译</span>
<span class="token comment">// build为正式打包命令，--style为打包风格，compressed为压缩模式，expanded为展开模式</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npx sass index.scss output.css --watch&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npx sass index.scss index.css --style=compressed&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后，在项目中创建<code>index.scss</code>，并撰写如下内容：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，运行如下命令，进入本地开发模式：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> run dev
</code></pre></div><p>此时完整目录结构如下所示：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- sass-learn
<span class="token operator">|</span>   <span class="token operator">|</span>-- index.scss
<span class="token operator">|</span>   <span class="token operator">|</span>-- output.css
<span class="token operator">|</span>   <span class="token operator">|</span>-- output.css.map
<span class="token operator">|</span>   <span class="token operator">|</span>-- package.json
</code></pre></div><h2 id="scss还是sass" tabindex="-1"><a class="header-anchor" href="#scss还是sass" aria-hidden="true">#</a> Scss还是Sass</h2><p><code>SASS</code>支持两种不同的语法，分别是文件后缀为<code>.scss</code>和<code>.sass</code>，这两种语法功能一样，只是风格不同。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// .scss语法：有括号，有分号</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token selector">button </span><span class="token punctuation">{</span>
    <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// .sass缩进语法：无括号，无分号，只有缩进和换行</span>
.box
  button
    <span class="token property">outline</span><span class="token punctuation">:</span> none
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc
</code></pre></div><p>所以叫<code>scss</code>还是<code>sass</code>其实都一样，具体如何使用根据个人喜好即可。</p><h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><p><code>SASS</code>中的注释一般有两种，<code>//</code>和<code>/**/</code>，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 不会出现在编译内容中的注释</span>
<span class="token comment">/* 除压缩模式以外都出现的注释  */</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中，<code>/**/</code>还有另外一种用法，通常用来在样式文件中显示版权信息。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">/*! 始终存在的注释，即使是压缩模式，通常用来撰写版权信息  */</span>
<span class="token comment">/*! copyright by wangtunan */</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="嵌套" tabindex="-1"><a class="header-anchor" href="#嵌套" aria-hidden="true">#</a> 嵌套</h3><p><code>SASS</code>允许将一套<code>CSS</code>样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token selector">.item </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #58a
  <span class="token punctuation">}</span>

  <span class="token selector">p, span </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box .item </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box p, .box span </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="父级选择器" tabindex="-1"><a class="header-anchor" href="#父级选择器" aria-hidden="true">#</a> 父级选择器(&amp;)</h3><p>基于嵌套规则，在<code>SASS</code>中有一个比较重要的选择器就是父级选择器(<code>&amp;</code>)，在<code>SASS</code>中，它使用<code>&amp;</code>代表外层的父级选择器，这让在复杂场景下重复父级选择器成为可能，例如：添加伪类，实现<code>BEM</code>等等。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>__item </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
    <span class="token selector"><span class="token parent important">&amp;</span>--title </span><span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>__row </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f60<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译生成：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box::after </span><span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box__item </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box__item--title </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box__row </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f60<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="占位符选择器" tabindex="-1"><a class="header-anchor" href="#占位符选择器" aria-hidden="true">#</a> 占位符选择器(%)</h3><p>当我们在撰写一些样式库的时候，有些样式我们并不关心具体的样式名，只关心样式的内容，此时可以通过占位符选择器(%)来实现。</p><p>占位符选择器的好处是：</p><ul><li>在不通过<code>@extend</code>引用的时候不会编译到最终的<code>css</code>代码中。</li><li>不用强制外部用户遵循样式库的样式命名。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector"><span class="token placeholder">%ellipsis</span> </span><span class="token punctuation">{</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> no-wrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 不引用，占位符代码不编译</span>
<span class="token selector">.title </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 引用，占位符代码编译</span>
<span class="token selector">.title </span><span class="token punctuation">{</span>
  <span class="token keyword">@extend</span> <span class="token placeholder selector">%ellipsis</span><span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><p><code>SASS</code>中定义变量的公式如下：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// $符号固定，variables为变量名，expression为表达式</span>
$&lt;variables&gt;<span class="token punctuation">:</span> &lt;expression&gt;<span class="token punctuation">;</span>

<span class="token property"><span class="token variable">$font-size-medium</span></span><span class="token punctuation">:</span> 32px <span class="token operator">/</span> 2<span class="token punctuation">;</span>     <span class="token comment">// 16px</span>
<span class="token property"><span class="token variable">$font-size-normal</span></span><span class="token punctuation">:</span> 12px <span class="token operator">+</span> 2px<span class="token punctuation">;</span>   <span class="token comment">// 14px</span>
<span class="token property"><span class="token variable">$font-size-small</span></span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>          <span class="token comment">// 12px</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>SASS</code>中的变量是命令式的，意味着你在修改变量前后，值可能不相同的。</p></div><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span> <span class="token comment">// 14px</span>
<span class="token punctuation">}</span>

<span class="token comment">// 修改值</span>
<span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token selector">.item </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span> <span class="token comment">// 16px</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="默认变量" tabindex="-1"><a class="header-anchor" href="#默认变量" aria-hidden="true">#</a> 默认变量</h3><p>有些时候，我们希望定义一些变量并给默认值，这样外部用户使用的时候，可以重新定义相同的变量，但变量的值由外部用户自己规定，此时可以使用默认变量<code>!default</code>：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$theme-color</span></span><span class="token punctuation">:</span> #4093ff <span class="token statement keyword">!default</span><span class="token punctuation">;</span>

<span class="token comment">// 使用默认</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>          <span class="token comment">// 14px;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$theme-color</span><span class="token punctuation">;</span> <span class="token comment">// #4093ff;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自己定义</span>
<span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$theme-color</span></span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>          <span class="token comment">// 16px</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$theme-color</span><span class="token punctuation">;</span> <span class="token comment">// #58a;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在一些组件库或者样式库中，几乎都允许用户自定义样式，其本质就是默认变量在起作用。</p><h3 id="局部变量" tabindex="-1"><a class="header-anchor" href="#局部变量" aria-hidden="true">#</a> 局部变量</h3><p>因为<code>SASS</code>允许嵌套规则，所以变量也可以定义在嵌套规则中。当在嵌套规则中定义一个变量时，此变量的访问范围只存在于此规则内，对于外部不可见，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token selector">.item </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span> <span class="token comment">// 16px;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.row </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span> <span class="token comment">// error Undefined variable</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于嵌套规则中相同命名的变量，内层的变量会<strong>遮蔽</strong>外层的变量，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token selector">.item </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span> <span class="token comment">// 16px;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>在一些流程控制语句中，变量没有遮蔽效果</p></div><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$is-active</span></span><span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$theme-color</span></span><span class="token punctuation">:</span>#4093ff<span class="token punctuation">;</span>

<span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$is-active</span> </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$theme-color</span></span><span class="token punctuation">:</span>#f60<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>          <span class="token comment">// 16px</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$theme-color</span><span class="token punctuation">;</span> <span class="token comment">// #f60</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="list变量" tabindex="-1"><a class="header-anchor" href="#list变量" aria-hidden="true">#</a> list变量</h3><p><code>SASS</code>中的列表表示一系列值的集合，且定义列表的形式多种多样，如下：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 通过逗号分隔</span>
<span class="token property"><span class="token variable">$themes</span></span><span class="token punctuation">:</span> primary<span class="token punctuation">,</span> warning<span class="token punctuation">,</span> danger<span class="token punctuation">;</span>
<span class="token comment">// 通过空格分隔</span>
<span class="token property"><span class="token variable">$themes</span></span><span class="token punctuation">:</span> primary warning danger<span class="token punctuation">;</span>
<span class="token comment">// 通过中括号包裹</span>
<span class="token property"><span class="token variable">$themes</span></span><span class="token punctuation">:</span> [primary<span class="token punctuation">,</span> warning<span class="token punctuation">,</span> danger]<span class="token punctuation">;</span>
<span class="token comment">// 通过括号包裹</span>
<span class="token property"><span class="token variable">$themes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>primary warning danger<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><code>list</code>变量通常使用<code>@each</code>进行迭代遍历，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// $theme为每一次迭代的值，命名自定义</span>
<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$theme</span> in <span class="token variable">$themes</span> </span><span class="token punctuation">{</span>
  <span class="token selector">.button.is-<span class="token variable">#{$theme}</span> </span><span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译结果</span>
<span class="token selector">.button.is-primary </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.button.is-warning </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.button.is-danger </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="map变量" tabindex="-1"><a class="header-anchor" href="#map变量" aria-hidden="true">#</a> map变量</h3><p><code>SASS</code>中的<code>map</code>和<code>list</code>变量有些相似，但在定义上有些区别，其格式如下：<code>(&lt;key&gt;: &lt;value&gt;, &lt;key&gt;: &lt;value&gt; ...)</code>，其中<code>key</code>必须唯一，且外部必须用括号包裹起来。</p><p><code>map</code>同样可以通过<code>@each</code>来遍历，甚至可以进行解构：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$themes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
  <span class="token property">primary</span><span class="token punctuation">:</span> <span class="token string">&#39;#409EFF&#39;</span><span class="token punctuation">,</span>
  <span class="token property">warning</span><span class="token punctuation">:</span> <span class="token string">&#39;#E6A23C&#39;</span><span class="token punctuation">,</span>
  <span class="token property">danger</span><span class="token punctuation">:</span> <span class="token string">&#39;#F56C6C&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// key解构赋值给theme, value解构赋值给$color</span>
<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$theme</span>, <span class="token variable">$color</span> in <span class="token variable">$themes</span> </span><span class="token punctuation">{</span>
  <span class="token selector">.button.is-<span class="token variable">#{$theme}</span> </span><span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译结果</span>
<span class="token selector">.button.is-primary </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token string">&quot;#409EFF&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.button.is-warning </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token string">&quot;#E6A23C&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.button.is-danger </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token string">&quot;#F56C6C&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="变量导出" tabindex="-1"><a class="header-anchor" href="#变量导出" aria-hidden="true">#</a> 变量导出</h3><p><code>SASS</code>中的变量，也可以在<code>js</code>中访问，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// variables.scss</span>
<span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$theme-color</span></span><span class="token punctuation">:</span>#4093ff<span class="token punctuation">;</span>

<span class="token selector">:export </span><span class="token punctuation">{</span>
  <span class="token property">fontSize</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
  <span class="token property">themeColor</span><span class="token punctuation">:</span> <span class="token variable">$theme-color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>需要<code>webpack</code>等打包工具的<code>sass-loader</code>支持，支持以后就可以直接在<code>JavaScript</code>中使用：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> vars <span class="token keyword">from</span> <span class="token string">&#39;variables.scss&#39;</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>vars<span class="token punctuation">.</span>fontSize<span class="token punctuation">)</span>    <span class="token comment">// &#39;14px&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>vars<span class="token punctuation">.</span>themeColor<span class="token punctuation">)</span>  <span class="token comment">// &#39;#4093ff&#39;</span>
</code></pre></div><h2 id="插值语法" tabindex="-1"><a class="header-anchor" href="#插值语法" aria-hidden="true">#</a> 插值语法</h2><p>插值语法，格式是：<code>#{expresssion}</code>，它几乎可以用在<code>SASS</code>中任何地方，例如：</p><ol><li>样式规则的选择器</li><li>属性名称</li><li>变量</li><li>注释</li><li>其它地方</li></ol><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">position</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$position</span><span class="token punctuation">,</span> <span class="token variable">$topOrBottom</span><span class="token punctuation">,</span> <span class="token variable">$leftOrRight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token selector"><span class="token variable">#{$name}</span>.is-<span class="token variable">#{$position}</span> </span><span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> <span class="token variable">$position</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">#{$topOrBottom}</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">#{$leftOrRight}</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@include</span> <span class="token function">position</span><span class="token punctuation">(</span><span class="token string">&#39;.box&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;absolute&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;top&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;left&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>以上代码编译成：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box.is-absolute </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> <span class="token string">&quot;absolute&quot;</span><span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="规则" tabindex="-1"><a class="header-anchor" href="#规则" aria-hidden="true">#</a> @规则</h2><h3 id="debug、-error和-warn" tabindex="-1"><a class="header-anchor" href="#debug、-error和-warn" aria-hidden="true">#</a> @debug、@error和@warn</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><code>SASS</code>中的<code>@debug</code>、<code>@error</code>、<code>@warn</code>分别和<code>JavaScript</code>中的<code>console.log()</code>、<code>console.error()</code>、<code>console.warn()</code>类似。</p></div><p><code>@debug</code>可以打印一些信息，在这调试一些表达式或变量值的时候非常有用，如下：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">position</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$position</span><span class="token punctuation">,</span> <span class="token variable">$topOrBottom</span><span class="token punctuation">,</span> <span class="token variable">$leftOrRight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@debug</span> <span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$position</span><span class="token punctuation">;</span>
  <span class="token selector"><span class="token variable">#{$name}</span>.is-<span class="token variable">#{$position}</span> </span><span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> <span class="token variable">$position</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">#{$topOrBottom}</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">#{$leftOrRight}</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">@include</span> <span class="token function">position</span><span class="token punctuation">(</span><span class="token string">&#39;.box&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;absolute&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;top&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;left&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 打印内容</span>
index.<span class="token property">scss</span><span class="token punctuation">:</span>2 <span class="token property">Debug</span><span class="token punctuation">:</span> <span class="token string">&quot;.box&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;absolute&quot;</span>
</code></pre></div><p><code>@warn</code>和<code>@error</code>通常用来对外部传入的值进行校验，看是否符合规范，如果不符合则提示警告信息和报错信息，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">position</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$position</span><span class="token punctuation">,</span> <span class="token variable">$topOrBottom</span><span class="token punctuation">,</span> <span class="token variable">$leftOrRight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$position</span> != &#39;relative&#39; and <span class="token variable">$position</span> != &#39;absolute&#39; </span><span class="token punctuation">{</span>
    <span class="token keyword">@warn</span> <span class="token string">&#39;position must be relative or absolute&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$topOrBottom</span> != &#39;top&#39; and <span class="token variable">$topOrBottom</span> != &#39;bottom&#39; </span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@error</span> <span class="token string">&#39;topOrBottom must be top or bottom&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token variable">#{$name}</span>.is-<span class="token variable">#{$position}</span></span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> <span class="token variable">$position</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">#{$topOrBottom}</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">#{$leftOrRight}</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">@include</span> <span class="token function">position</span><span class="token punctuation">(</span><span class="token string">&#39;.box&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;fixed&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;top1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;left&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 警告内容</span>
<span class="token property">Warning</span><span class="token punctuation">:</span> <span class="token string">&quot;position must be relative or absolute&quot;</span>
<span class="token comment">// 报错内容</span>
<span class="token property">Error</span><span class="token punctuation">:</span> <span class="token string">&quot;topOrBottom must be top or bottom&quot;</span>
</code></pre></div><h3 id="if和-else" tabindex="-1"><a class="header-anchor" href="#if和-else" aria-hidden="true">#</a> @if和@else</h3><p><code>SASS</code>中的<code>@if/@else</code>和<code>JavaScript</code>中的<code>if/else</code>规则是一样的，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">triangle</span><span class="token punctuation">(</span><span class="token variable">$size</span><span class="token punctuation">,</span> <span class="token variable">$color</span><span class="token punctuation">,</span> <span class="token variable">$direction</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token variable">$size</span> <span class="token operator">/</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$direction</span> == &#39;top&#39; </span><span class="token punctuation">{</span>
    <span class="token property">border-top-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span> <span class="token operator">==</span> <span class="token string">&#39;bottom&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">border-bottom-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span> <span class="token operator">==</span> <span class="token string">&#39;left&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">border-left-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span> <span class="token operator">==</span> <span class="token string">&#39;right&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">border-right-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token keyword">@warn</span> <span class="token string">&#39;direction must be top, bottom, left or right&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> <span class="token string">&#39;#f60&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;right&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>@if</code>和<code>@else if</code>也能使用<code>SASS</code>中的<code>not</code>、<code>or</code>和<code>and</code>，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">triangle</span><span class="token punctuation">(</span><span class="token variable">$size</span><span class="token punctuation">,</span> <span class="token variable">$color</span><span class="token punctuation">,</span> <span class="token variable">$direction</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$directions</span></span><span class="token punctuation">:</span> top<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left<span class="token punctuation">,</span> right<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token variable">$size</span> <span class="token operator">/</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// index为全局内置函数，判断$direction是否在$directions值的集合中，是则返回索引，否则返回null</span>
  <span class="token keyword">@if</span> <span class="token operator">not</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token variable">$directions</span><span class="token punctuation">,</span> <span class="token variable">$direction</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@warn</span> <span class="token string">&#39;direction must be top, bottom, left or right&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token property">border-<span class="token variable">#{$direction}</span>-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> <span class="token string">&#39;#f60&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;right&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上代码编译结果均为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token property">border-right-color</span><span class="token punctuation">:</span> <span class="token string">&quot;#f60&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="each" tabindex="-1"><a class="header-anchor" href="#each" aria-hidden="true">#</a> @each</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><code>SASS</code>中的<code>@each</code>和<code>JavaScript</code>的<code>forEach()</code>类似。</p></div><p><code>SASS</code>中的<code>@each</code>通常是用来迭代一个<code>list</code>或者<code>map</code>的，其公式为：<code>@each &lt;variable&gt; in &lt;expression&gt;</code>。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 这是一个list列表</span>
<span class="token property"><span class="token variable">$sizes</span></span><span class="token punctuation">:</span> 10px<span class="token punctuation">,</span> 20px<span class="token punctuation">,</span> 30px<span class="token punctuation">,</span> 40px<span class="token punctuation">;</span>

<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$size</span> in <span class="token variable">$sizes</span> </span><span class="token punctuation">{</span>
 <span class="token selector">.box-<span class="token variable">#{$size}</span> </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box-10px </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-20px </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-30px </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-40px </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>@each</code>也可以用来迭代<code>key/value</code>形式的<code>map</code>结构，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$sizeMap</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
 <span class="token property">h1</span><span class="token punctuation">:</span> 20px<span class="token punctuation">,</span>
 <span class="token property">h2</span><span class="token punctuation">:</span> 16px<span class="token punctuation">,</span>
 <span class="token property">h3</span><span class="token punctuation">:</span> 14px 
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$el</span>, <span class="token variable">$size</span> in <span class="token variable">$sizeMap</span> </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token variable">#{$el}</span> </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">h1 </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">h2 </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">h3 </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>甚至可以用来解构，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$statusList</span></span><span class="token punctuation">:</span> 
  <span class="token punctuation">(</span>text<span class="token punctuation">,</span> text<span class="token punctuation">,</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>button<span class="token punctuation">,</span> pointer<span class="token punctuation">,</span> <span class="token string">&#39;#ccc&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>div<span class="token punctuation">,</span> move<span class="token punctuation">,</span> <span class="token string">&#39;#0000&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span>

<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$el</span>, <span class="token variable">$pointer</span>, <span class="token variable">$color</span> in <span class="token variable">$statusList</span> </span><span class="token punctuation">{</span>
  <span class="token selector">.is-<span class="token variable">#{$el}</span> </span><span class="token punctuation">{</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> <span class="token variable">$pointer</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.is-text </span><span class="token punctuation">{</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> text<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token string">&quot;#333&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.is-button </span><span class="token punctuation">{</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token string">&quot;#ccc&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.is-div </span><span class="token punctuation">{</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> move<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token string">&quot;#0000&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> @for</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><code>SASS</code>中的索引从<code>1</code>开始而不是<code>0</code>。</p></div><p><code>SASS</code>中的<code>@for</code>同样可以用来迭代，但它只能限制在一定的范围内，通常用来重复生成相同或者类似的样式，其公式有如下两种：</p><ol><li><code>@for &lt;variable&gt; from &lt;expression&gt; to &lt;expression&gt;</code>，不包含最后一个值，类似于<code>[)</code>。</li><li><code>@for &lt;variable&gt; from &lt;expression&gt; through &lt;expression&gt;</code>，包含最后一个值，类似于<code>[]</code>。</li></ol><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 不包含3</span>
<span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> <span class="token selector">1 to 3 </span><span class="token punctuation">{</span>
  <span class="token selector">.item-<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px <span class="token operator">*</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.item-1 </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item-2 </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="mixin和-include" tabindex="-1"><a class="header-anchor" href="#mixin和-include" aria-hidden="true">#</a> @mixin和@include</h3><p><code>SASS</code>中的<code>@mixin</code>和<code>@include</code>经常配对使用的，<code>@mixin</code>负责定义，<code>@include</code>负责引用。</p><p><code>@mixin</code>一般是用来定义一些经常会用到的代码，例如：<code>ellipsis</code>和<code>clearfix</code>等。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token selector">ellipsis </span><span class="token punctuation">{</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token selector">clearfix </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>::before,
  <span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> both
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>@mixin</code> 也可以用来接收参数，甚至参数还可以使用默认值，当给参数定义默认值时，表示此参数为可选参数：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// PC端版心mixin</span>
<span class="token keyword">@mixin</span> <span class="token function">pc-center</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$margin</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$width</span></span><span class="token punctuation">:</span> 1200px<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token variable">$margin</span> auto<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$width</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用参数默认值</span>
<span class="token selector">.box1 </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> pc-center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 自定义参数</span>
<span class="token selector">.box2 </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">pc-center</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> 1000px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 显示传值：显示给$width传递值，而$margin依旧使用参数默认值</span>
<span class="token selector">.box3 </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">pc-center</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$width</span></span><span class="token punctuation">:</span> 1000px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>@mixin</code>中，也可以接收外部的内容，用<code>@content</code>来表示，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token selector">btn-hover </span><span class="token punctuation">{</span>
  <span class="token punctuation">:</span><span class="token function">not</span><span class="token punctuation">(</span>.is-disabled<span class="token punctuation">)</span><span class="token selector">:hover </span><span class="token punctuation">{</span>
    <span class="token keyword">@content</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.button </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token selector">btn-hover </span><span class="token punctuation">{</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code>.<span class="token property">button</span> <span class="token punctuation">:</span><span class="token function">not</span><span class="token punctuation">(</span>.is-disabled<span class="token punctuation">)</span><span class="token selector">:hover </span><span class="token punctuation">{</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="extend" tabindex="-1"><a class="header-anchor" href="#extend" aria-hidden="true">#</a> @extend</h3>`,121),h={href:"https://sass-lang.com/documentation/at-rules/extend",target:"_blank",rel:"noopener noreferrer"},v=t(`<h3 id="function" tabindex="-1"><a class="header-anchor" href="#function" aria-hidden="true">#</a> @function</h3><p><code>SASS</code>中的<code>@function</code>允许我们在值的基础上进行复杂的计算，其格式为<code>@function &lt;name&gt;(&lt;arguments...&gt;) { ... }</code>。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token variable">$base</span><span class="token punctuation">,</span> <span class="token variable">$exponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$result</span></span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token keyword">@for</span> <span class="token variable">$_</span> <span class="token keyword">from</span> 1 <span class="token keyword">through</span> <span class="token selector"><span class="token variable">$exponent</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$result</span></span><span class="token punctuation">:</span> <span class="token variable">$result</span> <span class="token operator">*</span> <span class="token variable">$base</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@return</span> <span class="token variable">$result</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.sidebar </span><span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> <span class="token function">pow</span><span class="token punctuation">(</span>4<span class="token punctuation">,</span> 3<span class="token punctuation">)</span> <span class="token operator">*</span> 1px<span class="token punctuation">;</span> <span class="token comment">// 64px</span>
<span class="token punctuation">}</span>
</code></pre></div><p>与<code>mixin</code>类似，<code>@function</code>也支持参数默认值以及<code>参数收缩</code>，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token variable">$numbers</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$result</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$number</span> in <span class="token variable">$numbers</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$result</span></span><span class="token punctuation">:</span> <span class="token variable">$result</span> <span class="token operator">+</span> <span class="token variable">$number</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@return</span> <span class="token variable">$result</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.sidebar </span><span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">sum</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> 20px<span class="token punctuation">,</span> 30px<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 60px</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="import" tabindex="-1"><a class="header-anchor" href="#import" aria-hidden="true">#</a> @import</h3><p><code>@import</code>最常见的用法是引入一个<code>.scss</code>文件，例如：</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token atrule"><span class="token rule">@import</span> <span class="token string">&#39;./index.scss&#39;</span><span class="token punctuation">;</span></span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>当然，也可以在嵌套规则中使用<code>@import</code>，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// dark.scss</span>
<span class="token selector">div </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.box.is-dark </span><span class="token punctuation">{</span>
  <span class="token keyword">@import</span> <span class="token string">&#39;./dark.scss&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box.is-dark div </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="use" tabindex="-1"><a class="header-anchor" href="#use" aria-hidden="true">#</a> @use</h3><p><code>SASS</code>中的<code>@use</code>可以加载其他<code>scss</code>样式表中的<code>mixins</code>，<code>fucntions</code>和<code>variables</code>，同时可以对加载的模块做一些其他额外的事情。</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// dark.scss文件</span>
<span class="token selector">div </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 此处的use仅仅只是把\`dark.scss\`中的代码合并到当前样式表中，和\`@import\`的作用一样。</span>
<span class="token keyword">@use</span> <span class="token string">&#39;dark&#39;</span><span class="token punctuation">;</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">div </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>@use</code>可以在引入的时候可以做一些额外的事情，例如使用自定义命名空间：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// mixins.scss</span>
<span class="token keyword">@mixin</span> <span class="token selector">ellipsis </span><span class="token punctuation">{</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// index.scss</span>
<span class="token keyword">@use</span> <span class="token string">&#39;mixins.scss&#39;</span> <span class="token module-modifier keyword">as</span> mix <span class="token comment">// 默认的命名空间为mixins</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> mix.ellipsis<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>@use</code>也可以对加载的模块进行配置，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// mixins.scss</span>
<span class="token property"><span class="token variable">$defaultLine</span></span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token function">multline-ellipsis</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$line</span></span><span class="token punctuation">:</span> <span class="token variable">$defaultLine</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
  <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
  <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> <span class="token variable">$line</span><span class="token punctuation">;</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// index.scss</span>
<span class="token keyword">@use</span> <span class="token string">&#39;mixins.scss&#39;</span> <span class="token module-modifier keyword">as</span> mix <span class="token module-modifier keyword">with</span> <span class="token punctuation">(</span>
  <span class="token property"><span class="token variable">$defaultLine</span></span><span class="token punctuation">:</span> 3
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> mix.multline-ellipsis<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
  <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
  <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="at-root" tabindex="-1"><a class="header-anchor" href="#at-root" aria-hidden="true">#</a> @at-root</h3><p><code>@at-root</code>的作用通常使用来把样式置顶到当前样式表文档的根部，这在一些嵌套样式中有时候非常有用，例如：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.wrapper </span><span class="token punctuation">{</span>
  <span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token comment">// 使用at-root，把.box-input样式置顶到最外层</span>
    <span class="token atrule"><span class="token rule">@at-root</span> .box-input</span> <span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 不使用at-root，遵循嵌套规则</span>
    <span class="token selector">.box-input </span><span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><p>以上代码编译结果为：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 使用at-root编译结果</span>
<span class="token selector">.box-input </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 不使用at-root编译结果</span>
<span class="token selector">.wrapper .box .box-input </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="内置模块" tabindex="-1"><a class="header-anchor" href="#内置模块" aria-hidden="true">#</a> 内置模块</h2><p><code>SASS</code>内置了许多有用的函数，它们同样也是<code>SASS</code>中的一部分，在内置模块这个章节，我们只介绍常用的内置函数，其它函数可以通过点击每个章节后面提供的链接进行学习。</p><h3 id="math" tabindex="-1"><a class="header-anchor" href="#math" aria-hidden="true">#</a> math</h3><p>常用的变量有：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;sass:math&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">@debug</span> math.<span class="token variable">$pi</span><span class="token punctuation">;</span>   <span class="token comment">// 数学中的π 3.1415926536</span>
<span class="token keyword">@debug</span> math.<span class="token variable">$e</span><span class="token punctuation">;</span>    <span class="token comment">// 数学中的e 2.7182818285</span>
</code></pre></div><p>常用的函数有：</p><ul><li><code>ceil($number) =&gt; number</code>：向上取整函数，全局函数。</li><li><code>floor($number) =&gt; number</code>：向下取整函数，全局函数。</li><li><code>round($number) =&gt; number</code>：四舍五入函数，全局函数。</li><li><code>max($numbers...) =&gt; number</code>：最大值比较函数，全局函数。</li><li><code>min($numbers...) =&gt; number</code>：最小值比较函数，全局函数。</li><li><code>random() =&gt; number</code>：取<code>0-1</code>之间随机数函数，全局函数。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@debug</span> <span class="token function">ceil</span><span class="token punctuation">(</span>4.2<span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 5</span>
<span class="token keyword">@debug</span> <span class="token function">floor</span><span class="token punctuation">(</span>4.2<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 4</span>
<span class="token keyword">@debug</span> <span class="token function">round</span><span class="token punctuation">(</span>4.2<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 4</span>
<span class="token keyword">@debug</span> <span class="token function">max</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> 1px<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10px</span>
<span class="token keyword">@debug</span> <span class="token function">min</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> 1px<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 1px</span>
<span class="token keyword">@debug</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 随机 0.7768899209</span>
</code></pre></div>`,36),x={href:"https://sass-lang.com/documentation/modules/math",target:"_blank",rel:"noopener noreferrer"},f=t(`<h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> list</h3><p>常用的<code>list</code>内置函数有：</p><ul><li><code>append($list, $val, $separator: auto) =&gt; list</code>：向<code>list</code>列表中添加一个新元素，其中<code>$separator</code>为可选参数，有三种取值(<code>space</code>空格， <code>comma</code>逗号，<code>slash</code>斜杠)，全局函数用。</li><li><code>index($list, $val) =&gt; index | null</code>: 返回<code>list</code>列表中，<code>$val</code>元素的索引位置(从1开始，而不是0)，没有则返回<code>null</code>，全局函数。</li><li><code>join($list1, $list2, $separator: auto, $bracketed: auto) =&gt; list</code>: 把<code>list1</code>列表和<code>list2</code>列表联合起来，返回一个新的列表，全局函数。</li><li><code>length($list) =&gt; number</code>: 返回<code>list</code>列表的长度，全局函数。</li><li><code>nth($list, $index)</code>: 在<code>list</code>列表中按索引取值<code>index</code>取值，全局函数。</li><li><code>set-nth($list, $index, $value)</code>: 在<code>list</code>列表中按索引设置值，全局函数。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$list1</span></span><span class="token punctuation">:</span> 10px<span class="token punctuation">,</span> 20px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$list2</span></span><span class="token punctuation">:</span> 20px<span class="token punctuation">,</span> 30px<span class="token punctuation">;</span>
<span class="token keyword">@debug</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 30px<span class="token punctuation">)</span><span class="token punctuation">;</span>                    <span class="token comment">// 10px, 20px, 30px</span>
<span class="token keyword">@debug</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 30px<span class="token punctuation">,</span> <span class="token string">&#39;slash&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// 10px / 20px / 30px</span>
<span class="token keyword">@debug</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 10px<span class="token punctuation">)</span><span class="token punctuation">;</span>                     <span class="token comment">// 1</span>
<span class="token keyword">@debug</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 21px<span class="token punctuation">)</span><span class="token punctuation">;</span>                     <span class="token comment">// null</span>
<span class="token keyword">@debug</span> <span class="token function">join</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> <span class="token variable">$list2</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$bracketed</span></span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// [10px, 20px, 20px, 30px]</span>
<span class="token keyword">@debug</span> <span class="token function">length</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                          <span class="token comment">// 2</span>
<span class="token keyword">@debug</span> <span class="token function">nth</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>                          <span class="token comment">// 10px</span>
<span class="token keyword">@debug</span> <span class="token function">set-nth</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 2<span class="token punctuation">,</span> 200px<span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// 10px, 200px</span>
</code></pre></div>`,4),$={href:"https://sass-lang.com/documentation/modules/list",target:"_blank",rel:"noopener noreferrer"},w=t(`<h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h3><p>常用的<code>map</code>内置函数有：</p><ul><li><code>get($map, $key, $keys...)</code>: 通过<code>key</code>获取<code>value</code>，其中<code>key</code>支持传递多个，既可以深层次获取<code>value</code>，全局访问通过<code>map-get()</code>，命名空间通过<code>map.get()</code>。</li><li><code>set($map, $key, $keys..., $value) =&gt; map</code>: 通过<code>key</code>设置<code>value</code>，其中<code>key</code>支持传递多个，既可以深层次设置<code>key</code>，非全局函数只能通过命名空间<code>map.set()</code>。</li><li><code>keys($map) =&gt; list</code>: 获取<code>map</code>的键，返回是由所有<code>key</code>组成的<code>list</code>，全局访问通过<code>map-keys()</code>，命名空间通过<code>map.keys()</code>。</li><li><code>values($map) =&gt; list</code>: 获取<code>map</code>的值，返回是由所有<code>value</code>组成的<code>list</code>，全局访问通过<code>map-values()</code>，命名空间通过<code>map.values()</code>。</li><li><code>has-key($map, $key, $keys...) =&gt; boolean</code>：判断<code>map</code>是否包含某个键，支持深层次判断，全局访问通过<code>map-has-key()</code>，命名空间通过<code>map.has-key()</code>。</li><li><code>remove($map, $keys...) =&gt; map</code>: 在<code>map</code>中移除一个或者多个<code>key</code>，全局访问通过<code>map-remove()</code>，命名空间通过<code>map.remove()</code>。</li><li><code>deep-remove($map, $key, $keys...) =&gt; map</code>: 在<code>map</code>中深层次移除<code>key</code>，只能通过命名空间<code>map.deep-remove()</code>。</li><li><code>merge($map1, $map2) =&gt; map</code>: 浅层合并<code>map1</code>和<code>map2</code>，相同的键，以<code>map2</code>的值为准，全局访问通过<code>map-merge()</code>，命名空间通过<code>map.merge()</code>。</li><li><code>deep-merge($map1, $map2) =&gt; map</code>: 深层次合并两个<code>map</code>，只能通过命名空间<code>map.deep-merge()</code>。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;sass:map&#39;</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$map1</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
  <span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
  <span class="token property">age</span><span class="token punctuation">:</span> 18<span class="token punctuation">,</span>
  <span class="token property">sex</span><span class="token punctuation">:</span> 1<span class="token punctuation">,</span>
  <span class="token property">job</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">&#39;FE&#39;</span><span class="token punctuation">,</span>
    <span class="token property">salary</span><span class="token punctuation">:</span> 1000<span class="token punctuation">,</span>
    <span class="token property">city</span><span class="token punctuation">:</span> <span class="token string">&#39;shanghai&#39;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$map2</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
  <span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span>
  <span class="token property">age</span><span class="token punctuation">:</span> 23<span class="token punctuation">,</span>
  <span class="token property">address</span><span class="token punctuation">:</span> <span class="token string">&#39;shanghai&#39;</span><span class="token punctuation">,</span>
  <span class="token property">job</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">&#39;BE&#39;</span><span class="token punctuation">,</span>
    <span class="token property">salary</span><span class="token punctuation">:</span> 1000<span class="token punctuation">,</span>
    <span class="token property">email</span><span class="token punctuation">:</span> <span class="token string">&#39;admin@gmail.com&#39;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">@debug</span> <span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                                <span class="token comment">// &#39;a&#39;</span>
<span class="token keyword">@debug</span> <span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;job&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                         <span class="token comment">// &#39;FE&#39;</span>
<span class="token keyword">@debug</span> map.<span class="token function">set</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                           <span class="token comment">// (name: &#39;A&#39; ....)</span>
<span class="token keyword">@debug</span> <span class="token function">map-keys</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                                       <span class="token comment">// name, age, sex, job</span>
<span class="token keyword">@debug</span> <span class="token function">map-values</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                                     <span class="token comment">// &#39;a&#39;, 18, 1, ....</span>
<span class="token keyword">@debug</span> <span class="token function">map-has-key</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                            <span class="token comment">// true</span>
<span class="token keyword">@debug</span> <span class="token function">map-has-key</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;job&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                     <span class="token comment">// true</span>
<span class="token keyword">@debug</span> <span class="token function">map-remove</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;job&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                      <span class="token comment">// { age: 18..... }</span>
<span class="token keyword">@debug</span> map.<span class="token function">deep-remove</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token string">&#39;job&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                 <span class="token comment">// ....</span>
<span class="token keyword">@debug</span> <span class="token function">map-merge</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">&#39;A&#39;</span><span class="token punctuation">,</span> <span class="token property">age</span><span class="token punctuation">:</span> 18<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token property">name</span><span class="token punctuation">:</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token property">sex</span><span class="token punctuation">:</span> 1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// (name: &#39;B&#39;, age: 18, sex: 1)</span>
<span class="token keyword">@debug</span> map.<span class="token function">deep-merge</span><span class="token punctuation">(</span><span class="token variable">$map1</span><span class="token punctuation">,</span> <span class="token variable">$map2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                          <span class="token comment">// ...</span>
</code></pre></div>`,4),S={href:"https://sass-lang.com/documentation/modules/map",target:"_blank",rel:"noopener noreferrer"},_=t(`<h3 id="meta" tabindex="-1"><a class="header-anchor" href="#meta" aria-hidden="true">#</a> meta</h3><p>常用的<code>meta</code>内置函数有：</p><ul><li><code>type-of($value)</code>: 返回值的类型，全局函数。</li></ul><table><thead><tr><th>Type</th><th>Result</th></tr></thead><tbody><tr><td>Argument list</td><td>&quot;arglist&quot;</td></tr><tr><td>Boolean</td><td>&quot;bool&quot;</td></tr><tr><td>Calculation</td><td>&quot;calculation&quot;</td></tr><tr><td>Color</td><td>&quot;color&quot;</td></tr><tr><td>Function</td><td>&quot;function&quot;</td></tr><tr><td>List</td><td>&quot;list&quot;</td></tr><tr><td>Map</td><td>&quot;map&quot;</td></tr><tr><td>Null</td><td>&quot;null&quot;</td></tr><tr><td>Number</td><td>&quot;number&quot;</td></tr><tr><td>String</td><td>&quot;string&quot;</td></tr></tbody></table><ul><li><code>content-exists() =&gt; boolean</code>: 判断在调用<code>mixin</code>的时候，是否撰写了<code>content</code>内容，全局函数。</li><li><code>function-exists($name, $module: null) =&gt; boolean</code>: 判断某个模块或者当前样式表是否存在某个<code>function</code>，全局函数。</li><li><code>mixin-exists($name, $module: null) =&gt; boolean</code>: 判断某个模块或者当前样式表是否存在某个<code>mixin</code>，全局函数。</li><li><code>global-variable-exists($name, $module: null) =&gt; boolean</code>: 判断某个模块或者当前样式表是否存在某个全局变量，全局函数。</li><li><code>variable-exists($name) =&gt; boolean</code>: 判断当前作用域中是否存在某个变量，全局函数。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;sass:meta&#39;</span><span class="token punctuation">;</span>

<span class="token property"><span class="token variable">$theme-color</span></span><span class="token punctuation">:</span> #409Eff<span class="token punctuation">;</span>
<span class="token keyword">@function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token variable">$numbers</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$result</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$number</span> in <span class="token variable">$numbers</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$result</span></span><span class="token punctuation">:</span> <span class="token variable">$result</span> <span class="token operator">+</span> <span class="token variable">$number</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@return</span> <span class="token variable">$result</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">@mixin</span> <span class="token selector">ellipsis </span><span class="token punctuation">{</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@debug</span> <span class="token function">type-of</span><span class="token punctuation">(</span>10px<span class="token punctuation">)</span><span class="token punctuation">;</span>                         <span class="token comment">// number</span>
<span class="token keyword">@debug</span> <span class="token function">type-of</span><span class="token punctuation">(</span><span class="token function">calc</span><span class="token punctuation">(</span>100% <span class="token operator">+</span> 10px<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>            <span class="token comment">// calculation</span>
<span class="token keyword">@debug</span> <span class="token function">type-of</span><span class="token punctuation">(</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> 20px<span class="token punctuation">,</span> 30px<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// list</span>
<span class="token keyword">@debug</span> <span class="token function">function-exists</span><span class="token punctuation">(</span><span class="token string">&#39;sum&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">// true</span>
<span class="token keyword">@debug</span> <span class="token function">mixin-exists</span><span class="token punctuation">(</span><span class="token string">&#39;ellipsis&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>              <span class="token comment">// true</span>
<span class="token keyword">@debug</span> <span class="token function">global-variable-exists</span><span class="token punctuation">(</span><span class="token string">&#39;theme-color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token keyword">@debug</span> <span class="token function">variable-exists</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// false</span>
</code></pre></div>`,6),q={href:"https://sass-lang.com/documentation/modules/meta",target:"_blank",rel:"noopener noreferrer"},z=t(`<h3 id="selector" tabindex="-1"><a class="header-anchor" href="#selector" aria-hidden="true">#</a> selector</h3><p>常用的<code>selector</code>内置函数有：</p><ul><li><code>append($selectors...) =&gt; selector</code>: 把选择器联合成一个，全局访问通过<code>selector-append</code>。</li><li><code>nest($selectors...) =&gt; selector</code>: 把选择器进行嵌套，全局访问通过<code>selector-nest</code>。</li><li><code>replace($selector, $original, $replacement) =&gt; selector</code>: 将选择器中的指定选择器，替换成另外一个，全局访问通过<code>selector-replace</code>。</li><li><code>unify($selector1, $selector2) =&gt; selector || null</code>: 返回两个选择器公共匹配的部分，全局访问通过<code>selector-unify</code>。</li><li><code>simple-selectors($selector) =&gt; list</code>: 将选择器拆分成一系列选择器组成的<code>list</code>列表，全局函数。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;sass:selector&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">@debug</span> selector.<span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.disabled&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>            <span class="token comment">// a.disabled</span>
<span class="token keyword">@debug</span> selector.<span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&#39;.accordion&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;__copy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// .accordion__copy</span>
<span class="token keyword">@debug</span> selector.<span class="token function">nest</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                    <span class="token comment">// ul li</span>
<span class="token keyword">@debug</span> selector.<span class="token function">nest</span><span class="token punctuation">(</span><span class="token string">&#39;.alert, .warning&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// .alert p, .warning p</span>
<span class="token keyword">@debug</span> selector.<span class="token function">nest</span><span class="token punctuation">(</span><span class="token string">&#39;.alert&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&amp;:hover&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// .alert:hover</span>
<span class="token keyword">@debug</span> selector.<span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;a.disabled&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.link&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// .link.disabled</span>
<span class="token keyword">@debug</span> selector.<span class="token function">unify</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.disabled&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// a.disabled</span>
<span class="token keyword">@debug</span> selector.<span class="token function">unify</span><span class="token punctuation">(</span><span class="token string">&#39;a.disabled&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a.outgoing&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// a.disabled.outgoing</span>
<span class="token keyword">@debug</span> <span class="token function">simple-selectors</span><span class="token punctuation">(</span><span class="token string">&#39;main.blog:after&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// main, .blog, :after</span>
</code></pre></div>`,4),A={href:"https://sass-lang.com/documentation/modules/selector",target:"_blank",rel:"noopener noreferrer"},j=t(`<h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> string</h3><p>常用的<code>string</code>内置函数有：</p><ul><li><code>index($string, $substring) =&gt; number</code>: 返回子字符串所在位置的索引(索引从1开始，而不是0)，全局访问通过<code>str-index</code>。</li><li><code>insert($string, $insert, $index) =&gt; string</code>: 向字符串指定索引位置插入一个字符串，全局访问通过<code>str-insert</code>。</li><li><code>length($string) =&gt; number</code>: 返回字符串的长度，全局访问通过<code>str-length</code>。</li><li><code>slice($string, $start, $end: -1) =&gt; string</code>: 通过指定开始位置和结束位置截取字符串，全局访问通过<code>str-slice</code>。</li><li><code>to-upper-case($string) =&gt; string</code>: 将字符串转换成大写形式，全局函数。</li><li><code>to-lower-case($string) =&gt; string</code>: 将字符串转换成小写形式，全局函数。</li><li><code>unique-id() =&gt; string</code>: 随机生成一个在当前编译环境下唯一的一个字符串，全局函数。</li><li><code>unquote($string) =&gt; string</code>: 移除字符串引号，全局函数。</li><li><code>quote($string) =&gt; string</code>: 添加字符串引号，全局函数。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;sass:string&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">@debug</span> <span class="token function">str-index</span><span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 1</span>
<span class="token keyword">@debug</span> <span class="token function">str-insert</span><span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// abbc</span>
<span class="token keyword">@debug</span> <span class="token function">str-length</span><span class="token punctuation">(</span><span class="token string">&#39;abc ef&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 6</span>
<span class="token keyword">@debug</span> <span class="token function">str-slice</span><span class="token punctuation">(</span><span class="token string">&#39;abcd&#39;</span><span class="token punctuation">,</span> 2<span class="token punctuation">,</span> 4<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// bcd</span>
<span class="token keyword">@debug</span> <span class="token function">to-upper-case</span><span class="token punctuation">(</span><span class="token string">&#39;abcd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// ABCD</span>
<span class="token keyword">@debug</span> <span class="token function">to-lower-case</span><span class="token punctuation">(</span><span class="token string">&#39;ABCD&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// abcd</span>
<span class="token keyword">@debug</span> <span class="token function">unique-id</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// 随机 uxxxxxx</span>
<span class="token keyword">@debug</span> <span class="token function">unquote</span><span class="token punctuation">(</span><span class="token string">&#39;abcd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// abcd</span>
<span class="token keyword">@debug</span> <span class="token function">quote</span><span class="token punctuation">(</span>abcd<span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// &#39;abcd&#39;</span>
</code></pre></div>`,4),B={href:"https://sass-lang.com/documentation/modules/string",target:"_blank",rel:"noopener noreferrer"},C=t(`<h3 id="color" tabindex="-1"><a class="header-anchor" href="#color" aria-hidden="true">#</a> color</h3><ul><li><code>mix($color1, $color2, $weight: 50%) =&gt; color</code>: 表示将两种颜色进行混合，<code>$color1</code>的比重为<code>$weight</code>，<code>$color2</code>的比重为<code>100% - $weigth</code>，全局函数。</li><li><code>opacify($color, $amount) =&gt; color</code>: 设置颜色拓透明度，全局函数。</li><li><code>opacity() =&gt; number</code>: 获取颜色透明度，全局函数。</li></ul><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;sass:color&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">@debug</span> <span class="token function">mix</span><span class="token punctuation">(</span>#409EFF<span class="token punctuation">,</span> #fff<span class="token punctuation">,</span> 10%<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// #ecf5ff 更接近白色</span>
<span class="token keyword">@debug</span> <span class="token function">mix</span><span class="token punctuation">(</span>#409EFF<span class="token punctuation">,</span> #fff<span class="token punctuation">,</span> 90%<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// #53a8ff 更接近蓝色</span>
<span class="token keyword">@debug</span> <span class="token function">opacify</span><span class="token punctuation">(</span><span class="token function">rgba</span><span class="token punctuation">(</span>#036<span class="token punctuation">,</span> 0.7<span class="token punctuation">)</span><span class="token punctuation">,</span> 0.2<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// rgba(#036, 0.9)</span>
<span class="token keyword">@debug</span> <span class="token function">opacity</span><span class="token punctuation">(</span><span class="token function">rgba</span><span class="token punctuation">(</span>#036<span class="token punctuation">,</span> 0.7<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 0.7</span>
</code></pre></div>`,3),E={href:"https://sass-lang.com/documentation/modules/color",target:"_blank",rel:"noopener noreferrer"},O=t(`<h2 id="实践案例" tabindex="-1"><a class="header-anchor" href="#实践案例" aria-hidden="true">#</a> 实践案例</h2><h3 id="封装实用的mixins" tabindex="-1"><a class="header-anchor" href="#封装实用的mixins" aria-hidden="true">#</a> 封装实用的mixins</h3><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 单行折叠省略</span>
<span class="token keyword">@mixin</span> <span class="token selector">ellipsis </span><span class="token punctuation">{</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 多行折叠省略</span>
<span class="token keyword">@mixin</span> <span class="token function">multline-ellipsis</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$line</span></span><span class="token punctuation">:</span> 2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token function">type-of</span><span class="token punctuation">(</span><span class="token variable">$line</span><span class="token punctuation">)</span> <span class="token selector">!= &#39;number&#39; </span><span class="token punctuation">{</span>
    @error <span class="token string">&#39;$line must be number&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
  <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
  <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> <span class="token variable">$line</span><span class="token punctuation">;</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 取消滚动条</span>
<span class="token keyword">@mixin</span> <span class="token selector">no-scrollbar </span><span class="token punctuation">{</span>
  <span class="token property">-ms-overflow-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">scrollbar-width</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token selector"><span class="token parent important">&amp;</span>::-webkit-scrollbar </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token important">!important</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 扩展可点击区域</span>
<span class="token keyword">@mixin</span> <span class="token function">extend-click</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$extend</span></span><span class="token punctuation">:</span> -5px<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token keyword">@each</span> <span class="token variable">$direction</span> in <span class="token punctuation">(</span>top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token property"><span class="token variable">#{$direction}</span></span><span class="token punctuation">:</span> <span class="token variable">$extend</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 添加浏览器前缀</span>
<span class="token keyword">@mixin</span> <span class="token function">prefix</span><span class="token punctuation">(</span><span class="token variable">$property</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$prefixes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&#39;webkit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;moz&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ms&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;o&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$prefix</span> in <span class="token variable">$prefixes</span> </span><span class="token punctuation">{</span>
    <span class="token property">-<span class="token variable">#{$prefix}</span>-<span class="token variable">#{$property}</span></span><span class="token punctuation">:</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">#{$property}</span></span><span class="token punctuation">:</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 清除浮动</span>
<span class="token keyword">@mixin</span> <span class="token selector">clearfix </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span>

  <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
    <span class="token selector"><span class="token variable">#{$selector}</span>::before,
    <span class="token variable">#{$selector}</span>::after </span><span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
      <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector"><span class="token variable">#{$selector}</span>::after </span><span class="token punctuation">{</span>
      <span class="token property">clear</span><span class="token punctuation">:</span> both
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><h3 id="响应式设计和屏幕断点" tabindex="-1"><a class="header-anchor" href="#响应式设计和屏幕断点" aria-hidden="true">#</a> 响应式设计和屏幕断点</h3><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 屏幕断点</span>
<span class="token property"><span class="token variable">$breakpoints</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
  <span class="token string">&#39;medium&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">&#39;large&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1000px<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">&#39;huge&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 响应式mixin</span>
<span class="token keyword">@mixin</span> response-to <span class="token punctuation">(</span><span class="token variable">$key</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$map</span></span><span class="token punctuation">:</span> <span class="token variable">$breakpoints</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token function">map-has-key</span><span class="token punctuation">(</span><span class="token variable">$map</span><span class="token punctuation">,</span> <span class="token variable">$key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    @media only screen <span class="token operator">and</span> #<span class="token punctuation">{</span><span class="token function">inspect</span><span class="token punctuation">(</span><span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$map</span><span class="token punctuation">,</span> <span class="token variable">$key</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
      <span class="token keyword">@content</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token keyword">@warn</span> <span class="token string">&quot;undefeined points: \`#{$key}\`&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">response-to</span><span class="token punctuation">(</span><span class="token string">&#39;medium&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@include</span> <span class="token function">response-to</span><span class="token punctuation">(</span><span class="token string">&#39;large&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@include</span> <span class="token function">response-to</span><span class="token punctuation">(</span><span class="token string">&#39;huge&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译结果：</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token atrule"><span class="token rule">@media</span> only screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@media</span> only screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1000px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@media</span> only screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,7);function F(L,M){const a=e("ExternalLinkIcon");return c(),l("div",null,[i,n("ul",null,[n("li",null,[n("a",k,[s("SASS官网"),p(a)])]),n("li",null,[n("a",r,[s("SASS Playground"),p(a)])])]),d,m,n("ul",null,[n("li",null,[s("在线方式："),n("a",g,[s("SASS Playground"),p(a)]),s(" 提供即时编译结果，适合快速学习。")]),b]),y,n("p",null,[s("个人不建议在项目中使用😒，你可以点击"),n("a",h,[s("链接"),p(a)]),s("去官网学习这部分的内容。")]),v,n("p",null,[s("其它变量和函数，请点击"),n("a",x,[s("Math内置变量和函数"),p(a)])]),f,n("p",null,[s("其它函数，请点击"),n("a",$,[s("List内置函数"),p(a)])]),w,n("p",null,[s("其它函数，请点击"),n("a",S,[s("Map内置函数"),p(a)])]),_,n("p",null,[s("其它函数，请点击"),n("a",q,[s("Meta内置函数"),p(a)])]),z,n("p",null,[s("其它函数，请点击"),n("a",A,[s("Selector内置函数"),p(a)])]),j,n("p",null,[s("其它函数，请点击"),n("a",B,[s("String内置函数"),p(a)])]),C,n("p",null,[s("其它函数，请点击"),n("a",E,[s("Color内置函数"),p(a)])]),O])}const N=o(u,[["render",F],["__file","index.html.vue"]]);export{N as default};