import{_ as t,r as o,o as e,c,a as s,b as n,e as l,d as a}from"./app-c6c1ed2e.js";const r={},u=a(`<h1 id="编写自己的loader" tabindex="-1"><a class="header-anchor" href="#编写自己的loader" aria-hidden="true">#</a> 编写自己的Loader</h1><p>在我们使用 Webpack 的过程中，我们使用了很多的<code>loader</code>，那么那些<code>loader</code>是哪里来的？我们能不能写自己的<code>loader</code>然后使用？ 答案当然是可以的，Webpack 为我们提供了一些<code>loader</code>的API，通过这些API我们能够编写出自己的<code>loader</code>并使用。</p><h2 id="如何编写及使用自己的loader" tabindex="-1"><a class="header-anchor" href="#如何编写及使用自己的loader" aria-hidden="true">#</a> 如何编写及使用自己的Loader</h2><div class="custom-container tip"><p class="custom-container-title">场景</p><p>我们需要把<code>.js</code>文件中，所有出现<code>Webpack is good!</code>，改成<code>Webpack is very good!</code>。实际上我们需要编写自己的<code>loader</code>，所以我们有如下的步骤需要处理：</p><ul><li>新建<code>webpack-loader</code>项目</li><li>使用<code>npm init -y</code>命令生成<code>package.json</code>文件</li><li>创建<code>webpack.config.js</code>文件</li><li>创建<code>src</code>目录，并在<code>src</code>目录下新建<code>index.js</code></li><li>创建<code>loaders</code>目录，并在<code>loader</code>目录下新建<code>replaceLoader.js</code></li><li>安装<code>webpack</code>、<code>webpack-cli</code></li></ul></div><p>按上面的步骤新建后的项目目录如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span> loaders
<span class="token operator">|</span>   <span class="token operator">|</span> <span class="token operator">--</span> replaceLoader<span class="token punctuation">.</span>js
<span class="token operator">|</span><span class="token operator">--</span> src
<span class="token operator">|</span>   <span class="token operator">|</span> <span class="token operator">--</span> index<span class="token punctuation">.</span>js
<span class="token operator">|</span><span class="token operator">--</span> webpack<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
<span class="token operator">|</span><span class="token operator">--</span> <span class="token keyword">package</span><span class="token punctuation">.</span>json
</code></pre></div><p>首先需要在<code>webpack.config.js</code>中添加下面的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./loaders/replaceLoader.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>随后在<code>package.json</code>文件添加<code>build</code>打包命令：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 其它配置</span>
<span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line"> </div><br><br></div></div><p>接下来在<code>src/index.js</code>文件中添加一行代码：这个文件使用最简单的例子，只是打印一句话。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Webpack is good!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>最后就是在<code>loader/replaceLoader.js</code>编写我们自己<code>loader</code>文件中的代码：</p><div class="custom-container tip"><p class="custom-container-title">说明</p><ul><li>编写<code>loader</code>时，<code>module.exports</code>是固定写法，并且它只能是一个普通函数，不能写箭头函数(<code>this</code>指向)</li><li><code>source</code>是打包文件的源文件内容</li></ul></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;loader-utils&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> source<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;good&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;very good&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用我们的<code>loader</code>: 要使用我们的<code>loader</code>，则需要在<code>modules</code>中写<code>loader</code>:</p><div class="custom-container tip"><p class="custom-container-title">理解</p><p><code>resolveLoader</code>：它告诉了 Webpack 使用<code>loader</code>时，应该去哪些目录下去找，默认是<code>node_modules</code>，做了此项配置后，我们就不用去显示的填写其路径了，因为它会自动去<code>loaders</code>文件夹下面去找。</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resolveLoader</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;node_modules&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;./loaders&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;replaceLoader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;wanghuayu&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br></div></div><p>最后我们运行<code>npm run build</code>，在生成的<code>dist</code>目录下打开<code>main.js</code>文件，可以看到文件内容已经成功替换了，说明我们的<code>loader</code>已经使用成功了。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/***/ &quot;./src/index.js&quot;:
/*!**********************!*\\
  !*** ./src/index.js ***!
  \\**********************/</span>
<span class="token comment">/*! no static exports found */</span>
<span class="token doc-comment comment">/***/ (function(module, exports) <span class="token punctuation">{</span>

eval(&quot;console.log(&#39;Webpack is very good!&#39;);\\n\\n//# sourceURL=webpack:///./src/index.js?&quot;);

/***/</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/******/</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="如何向loader传参及返回多个值" tabindex="-1"><a class="header-anchor" href="#如何向loader传参及返回多个值" aria-hidden="true">#</a> 如何向Loader传参及返回多个值</h2><div class="custom-container tip"><p class="custom-container-title">问题</p><ul><li>我们如何返回多个值？</li><li>我们如何向自己的Loader传递参数？</li></ul></div><h4 id="如何返回多个值" tabindex="-1"><a class="header-anchor" href="#如何返回多个值" aria-hidden="true">#</a> 如何返回多个值</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p>Webpack 的 API允许我们使用<code>callback(error, result, sourceMap?, meta?)</code>返回多个值，它有四个参数：</p><ul><li><code>Error || Null</code> ：错误类型， 没有错误传递<code>null</code></li><li><code>result</code> ：转换后的结果</li><li><code>sourceMap</code>：可选参数，处理分析后的<code>sourceMap</code></li><li><code>meta</code>: 可选参数，元信息</li></ul></div><p>返回多个值，可能有如下情况：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 第三，第四个参数是可选的。</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="如何传递参数" tabindex="-1"><a class="header-anchor" href="#如何传递参数" aria-hidden="true">#</a> 如何传递参数</h4><p>我们知道在使用<code>loader</code>的时候，可以写成如下的形式：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// options里面可以传递一些参数</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;replaceLoader&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">word</span><span class="token operator">:</span> <span class="token string">&#39;very good&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div>`,29),i=s("code",null,"options",-1),k={href:"https://github.com/webpack/loader-utils",target:"_blank",rel:"noopener noreferrer"},d=s("code",null,"options",-1),g=a(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;loader-utils&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> options <span class="token operator">=</span> loaderUtils<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> source<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;good&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>word<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="如何在loader中写异步代码" tabindex="-1"><a class="header-anchor" href="#如何在loader中写异步代码" aria-hidden="true">#</a> 如何在Loader中写异步代码</h2><p>在上面的例子中，我们都是使用了同步的代码，那么如果我们有必须异步的场景，该如何实现呢？我们不妨做这样的假设，先写一个<code>setTimeout</code>：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;loader-utils&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> options <span class="token operator">=</span> loaderUtils<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;World&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果你运行了<code>npm run build</code>进行打包，那么一定会报错，解决办法是：使用<code>this.async()</code>主动标识有异步代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;loader-utils&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> options <span class="token operator">=</span> loaderUtils<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;World&#39;</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br><br><br><br></div></div><p>至此，我们已经掌握了如何编写、如何引用、如何传递参数以及如何写异步代码，在下一小节当中我们将学习如何编写自己的<code>plugin</code>。</p>`,7);function y(v,m){const p=o("ExternalLinkIcon");return e(),c("div",null,[u,s("p",null,[n("再使用"),i,n("传递参数后，我们可以使用官方提供的"),s("a",k,[n("loader-utils"),l(p)]),n("来获取"),d,n("参数，可以像下面这样写：")]),g])}const b=t(r,[["render",y],["__file","loader.html.vue"]]);export{b as default};