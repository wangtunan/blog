import{_ as n,o as a,c as p,d as t}from"./app-c9515a38.js";const o="/blog/assets/9-b865505d.png",e="/blog/assets/10-7450de06.png",c="/blog/assets/11-fa8627da.png",l="/blog/assets/12-9e1c1dc7.png",r="/blog/assets/13-f4fcae6e.png",i="/blog/assets/14-60718748.png",u={};function k(d,s){return a(),p("div",null,s[0]||(s[0]=[t(`<h1 id="打包静态资源" tabindex="-1"><a class="header-anchor" href="#打包静态资源" aria-hidden="true">#</a> 打包静态资源</h1><h2 id="什么是loader" tabindex="-1"><a class="header-anchor" href="#什么是loader" aria-hidden="true">#</a> 什么是loader？</h2><div class="custom-container tip"><p class="custom-container-title">概念</p><p><code>loader</code>是一种打包规则，它告诉了 Webpack 在遇到非<code>.js</code>文件时，应该如何处理这些文件</p></div><p><code>loader</code>有如下几种固定的运用规则：</p><ul><li>使用<code>test</code>正则来匹配相应的文件</li><li>使用<code>use</code>来添加文件对应的<code>loader</code></li><li>对于多个<code>loader</code>而言，从 <strong>右到左</strong> 依次调用</li></ul><h2 id="使用loader打包图片" tabindex="-1"><a class="header-anchor" href="#使用loader打包图片" aria-hidden="true">#</a> 使用loader打包图片</h2><div class="custom-container tip"><p class="custom-container-title">安装依赖</p><p>打包图片需要用到<code>file-loader</code>或者<code>url-loader</code>，需使用<code>npm install</code>进行安装</p></div><h4 id="一点小改动" tabindex="-1"><a class="header-anchor" href="#一点小改动" aria-hidden="true">#</a> 一点小改动</h4><p>在打包图片之前，让我们把<code>index.html</code>移动到上一节打包后的<code>dist</code>目录下，<code>index.html</code>中相应的<code>.js</code>引入也需要修改一下，像下面这样</p><div class="language-html" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./main.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h4 id="添加打包图片规则" tabindex="-1"><a class="header-anchor" href="#添加打包图片规则" aria-hidden="true">#</a> 添加打包图片规则</h4><p>对于打包图片，我们需要在<code>webpack.config.js</code>中进行相应的配置，它可以像下面这样</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// path为Node的核心模块</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;file-loader&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="改写index-js" tabindex="-1"><a class="header-anchor" href="#改写index-js" aria-hidden="true">#</a> 改写<code>index.js</code></h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> avatar <span class="token keyword">from</span> <span class="token string">&#39;./avatar.jpg&#39;</span>

<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> avatar
root<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span>
</code></pre></div><h4 id="打包后的项目目录" tabindex="-1"><a class="header-anchor" href="#打包后的项目目录" aria-hidden="true">#</a> 打包后的项目目录</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span> dist
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> bd7a45571e4b5ccb8e7c33b7ce27070a<span class="token punctuation">.</span>jpg
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> main<span class="token punctuation">.</span>js
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>html
<span class="token operator">|</span><span class="token operator">--</span> index<span class="token punctuation">.</span>js
<span class="token operator">|</span><span class="token operator">--</span> avatar<span class="token punctuation">.</span>jpg
<span class="token operator">|</span><span class="token operator">--</span> <span class="token keyword">package</span><span class="token punctuation">.</span>json
<span class="token operator">|</span><span class="token operator">--</span> webpack<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
</code></pre></div><h4 id="打包结果" tabindex="-1"><a class="header-anchor" href="#打包结果" aria-hidden="true">#</a> 打包结果</h4><p><img src="`+o+`" alt="打包结果"></p><h4 id="运用占位符" tabindex="-1"><a class="header-anchor" href="#运用占位符" aria-hidden="true">#</a> 运用占位符</h4><p>在以上打包图片的过程中，我们发现打包生成的图片名字好像是一串乱码，如果我们要原样输出原图片的名字的话，又该如何进行配置呢？这个问题，可以使用 <strong>占位符</strong> 进行解决。</p><div class="custom-container tip"><p class="custom-container-title">占位符说明</p><p>文件占位符它有一些固定的规则，像下面这样：</p><ul><li><code>[name]</code>代表原本文件的名字。</li><li><code>[ext]</code>代表原本文件的后缀。</li><li><code>[hash]</code>代表一个<code>md5</code>的唯一编码。</li></ul></div><p>根据占位符的规则再次改写<code>webpack.config.js</code>文件，</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// path为Node的核心模块</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;file-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;[name]_[hash].[ext]&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>根据上面占位符的运用，打包生成的图片，它的名字如下</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token operator">|</span>-- dist
<span class="token operator">|</span>   <span class="token operator">|</span>-- avatar_bd7a45571e4b5ccb8e7c33b7ce27070a.jpg
</code></pre></div><h2 id="使用loader打包css" tabindex="-1"><a class="header-anchor" href="#使用loader打包css" aria-hidden="true">#</a> 使用loader打包CSS</h2><div class="custom-container tip"><p class="custom-container-title">打包说明</p><p>样式文件分为几种情况，每一种都需要不同的<code>loader</code>来处理：</p><ol><li>普通<code>.css</code>文件，使用<code>style-loader</code>和<code>css-loader</code>来处理</li><li><code>.less</code>文件，使用<code>less-loader</code>来处理</li><li><code>.sass或者.scss</code>文件，需要使用<code>sass-loader</code>来处理</li><li><code>.styl</code>文件，需要使用<code>stylus-loader</code>来处理</li></ol></div><h4 id="打包css文件" tabindex="-1"><a class="header-anchor" href="#打包css文件" aria-hidden="true">#</a> 打包css文件</h4><div class="custom-container tip"><p class="custom-container-title">安装依赖</p><p>首先安装<code>style-loader</code>和<code>css-loader</code></p></div><p>改写webpack配置文件：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// path为Node的核心模块</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;file-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;[name]_[hash].[ext]&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>根目录下创建<code>index.css</code></p><div class="language-css" data-ext="css"><pre class="language-css"><code><span class="token selector">.avatar</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>改写<code>index.js</code>文件</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> avatar <span class="token keyword">from</span> <span class="token string">&#39;./avatar.jpg&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> avatar<span class="token punctuation">;</span>
img<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;avatar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><strong>打包结果</strong></p><p><img src="`+e+`" alt="css打包结果"></p><h4 id="打包scss文件" tabindex="-1"><a class="header-anchor" href="#打包scss文件" aria-hidden="true">#</a> 打包Scss文件</h4><div class="custom-container tip"><p class="custom-container-title">安装依赖</p><p>需要安装<code>sass-loader</code>和<code>node-sass</code></p></div><p>改写<code>webpack.config.js</code>文件</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// path为Node的核心模块</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;file-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;[name]_[hash].[ext]&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(sass|scss)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;sass-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>根目录下添加<code>index-scss.scss</code>文件</p><div class="language-scss" data-ext="scss"><pre class="language-scss"><code><span class="token selector">body</span><span class="token punctuation">{</span>
  <span class="token selector">.avatar-sass</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>改写<code>index.js</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> avatar <span class="token keyword">from</span> <span class="token string">&#39;./avatar.jpg&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index-scss.scss&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> avatar<span class="token punctuation">;</span>
img<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;avatar-sass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>根据上面的配置和代码改写后，再次打包，打包的结果会是下面这个样子</p><p><img src="`+c+`" alt="打包结果"></p><h4 id="自动添加css厂商前缀" tabindex="-1"><a class="header-anchor" href="#自动添加css厂商前缀" aria-hidden="true">#</a> 自动添加CSS厂商前缀</h4><p>当我们在<code>css</code>文件中写一些需要处理兼容性的样式的时候，需要我们分别对于不同的浏览器添加不同的厂商前缀，使用<code>postcss-loader</code>可以帮我们在<code>webpack</code>打包的时候自动添加这些厂商前缀。</p><div class="custom-container tip"><p class="custom-container-title">安装依赖</p><p>自动添加厂商前缀需要<code>npm install</code>安装<code>postcss-loader</code>和<code>autoprefixer</code></p></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> postcss-loader autoprefixer <span class="token parameter variable">-D</span>
</code></pre></div><p>修改<code>index-sass.scss</code></p><div class="language-css" data-ext="css"><pre class="language-css"><code><span class="token selector">.avatar-sass</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>50px<span class="token punctuation">,</span>50px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在修改<code>sass</code>文件代码后，我们需要对<code>webpack.config.js</code></p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token comment">// path为Node的核心模块</span>
const path = require(&#39;path&#39;);

module.exports = <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> /\\.(png|jpg|gif)$/<span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">{</span>
          loader<span class="token operator">:</span> &#39;file-loader&#39;<span class="token punctuation">,</span>
          options<span class="token operator">:</span> <span class="token punctuation">{</span>
            name<span class="token operator">:</span> &#39;<span class="token punctuation">[</span>name<span class="token punctuation">]</span>_<span class="token punctuation">[</span>hash<span class="token punctuation">]</span>.<span class="token punctuation">[</span>ext<span class="token punctuation">]</span>&#39;
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> /\\.css$/<span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>&#39;style-loader&#39;<span class="token punctuation">,</span> &#39;css-loader&#39;<span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> /\\.(sass|scss)$/<span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>&#39;style-loader&#39;<span class="token punctuation">,</span>&#39;css-loader&#39;<span class="token punctuation">,</span>&#39;sass-loader&#39;<span class="token punctuation">,</span>&#39;postcss-loader&#39;<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br></div></div><p>根目录下添加<code>postcss.config.js</code>，并添加代码</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;autoprefixer&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>根据上面的配置，我们再次打包运行，在浏览器中运行<code>index.html</code>，它的结果如下图所示</p><p><img src="`+l+`" alt="打包运行结果"></p><p><strong>注意一</strong>：如果<code>autoprefixer</code>没有生效，可以在<code>package.json</code>中配置目标浏览器，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token string-property property">&quot;browserslist&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token string">&quot;defaults&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;last 2 versions&quot;</span>
<span class="token punctuation">]</span>
</code></pre></div><p>或者在根目录新建<code>.browserslistrc</code>并填写：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>defaults
last 2 versions
</code></pre></div><p><strong>注意二</strong>：如果你使用的是<code>Stylus</code>预处理器，由于<code>Stylus</code>可以省略<code>css</code>的花括号，这对于<code>postcss-loader</code>来说可能会识别不出来，这时需要我们把<code>postcss-loader</code>移动到<code>stylus-loader</code>的前面，如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.styl$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;postcss-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;stylus-loader&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="模块化打包css文件" tabindex="-1"><a class="header-anchor" href="#模块化打包css文件" aria-hidden="true">#</a> 模块化打包CSS文件</h4><div class="custom-container tip"><p class="custom-container-title">概念</p><p><code>CSS</code>的模块化打包的理解是：各个样式相互独立，除非我主动引用你的样式，否则你打包的样式不能影响到我。</p></div><p>根目录下添加<code>createAvatar.js</code>文件，并填写下面这段代码</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> avatar <span class="token keyword">from</span> <span class="token string">&#39;./avatar.jpg&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">CreateAvatar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  img<span class="token punctuation">.</span>src <span class="token operator">=</span> avatar<span class="token punctuation">;</span>
  img<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;avatar-sass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  root<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>改写<code>index.js</code>，引入<code>createAvatar.js</code>并调用</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> avatar <span class="token keyword">from</span> <span class="token string">&#39;./avatar.jpg&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> createAvatar <span class="token keyword">from</span> <span class="token string">&#39;./createAvatar&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index-sass.scss&#39;</span><span class="token punctuation">;</span>

<span class="token function">createAvatar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> avatar<span class="token punctuation">;</span>
img<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;avatar-sass&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line"> </div><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br></div></div><p><strong>打包运行</strong></p><p><img src="`+r+`" alt="打包运行"></p><p>我们可以看到，在<code>createAvatar.js</code>中，我们写的<code>img</code>标签的样式，它受<code>index-sass.scss</code>样式文件的影响，如果要消除这种影响，需要我们开启对<code>css</code>样式文件的模块化打包。</p><p>进一步改写<code>webpack.config.js</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// path为Node的核心模块</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;file-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;[name]_[hash].[ext]&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(sass|scss)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> 
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token string">&#39;sass-loader&#39;</span><span class="token punctuation">,</span> 
          <span class="token string">&#39;postcss-loader&#39;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br></div></div><p>开启<code>css</code>模块化打包后，我们需要在<code>index.js</code>中做一点小小的改动，像下面这样子</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> avatar <span class="token keyword">from</span> <span class="token string">&#39;./avatar.jpg&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> createAvatar <span class="token keyword">from</span> <span class="token string">&#39;./createAvatar&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> style <span class="token keyword">from</span>  <span class="token string">&#39;./index-sass.scss&#39;</span><span class="token punctuation">;</span>

<span class="token function">createAvatar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> avatar<span class="token punctuation">;</span>
img<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>style<span class="token punctuation">[</span><span class="token string">&#39;avatar-sass&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><div class="highlight-line"> </div><br><br><br></div></div><p>打包运行后，我们发现使用<code>createAvatar.js</code>创建出来的<code>img</code>没有受到样式文件的影响，证明我们的<code>css</code>模块化配置已经生效，下图是<code>css</code>模块化打包的结果：</p><p><img src="`+i+'" alt="打包结果"></p>',81)]))}const m=n(u,[["render",k],["__file","static.html.vue"]]);export{m as default};
