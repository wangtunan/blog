import{_ as i,r as o,o as c,c as l,a as s,b as a,e as n,F as u,f as k,t as d,d as t}from"./app-lYr3OMt4.js";const g="/blog/assets/1-KLdJruvU.png",h="/blog/assets/2-XTeUcy8Q.png",m="/blog/assets/3-JlirtL-I.png",y="/blog/assets/20-2EyWB-gR.png",v="/blog/assets/4-YvfFmnwS.png",x="/blog/assets/5-NHYl0BYl.png",b="/blog/assets/6-ulE1UqMs.png",f="/blog/assets/9-uzqx_NUU.png",j="/blog/assets/10-U521Kqlh.png",_="/blog/assets/11-Xl5f6oY8.png",w="/blog/assets/12-GOJDWAHZ.png",S="/blog/assets/13-ybZSFEUo.png",V="/blog/assets/7-lpjOaAwk.png",q="/blog/assets/8-1UYncZSb.png",C="/blog/assets/14-VWMlSNRK.png",P="/blog/assets/15-4rOytuIF.png",L="/blog/assets/16-amVP5-4x.png",E="/blog/assets/17-T4wMJ5tM.png",M="/blog/assets/18-bqHZQsL1.png",A="/blog/assets/19-YLLyPLrP.png",T={},B={id:"vuepress",tabindex:"-1"},H=s("a",{class:"header-anchor",href:"#vuepress","aria-hidden":"true"},"#",-1),J=s("code",null,"blog",-1),$=s("code",null,"blog",-1),I={href:"https://github.com/wangtunan/vuepress-blog-demo",target:"_blank",rel:"noopener noreferrer"},D=t(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><h3 id="如何而来" tabindex="-1"><a class="header-anchor" href="#如何而来" aria-hidden="true">#</a> 如何而来</h3><p>VuePress 是一个<strong>静态网站生成器</strong>，使用它我们一方面可以专注输出技术类文档，也可以使用基于Vue的开发方式来开发我们其它的静态网站。<br> 每一个由 VuePress 生成的静态页面都是经过服务端渲染(SSR)而来，因此由 VuePress 生成的页面在加载性能和搜索引擎优化(SEO)上有很明显的优势。</p><h3 id="组成部分" tabindex="-1"><a class="header-anchor" href="#组成部分" aria-hidden="true">#</a> 组成部分</h3><p>通常而言，一个由 VuePress 生成的网站，它是用<code>Vue</code>、<code>Vue-router</code>、<code>Webpack</code>以及利用服务端渲染(<code>SSR</code>)而来，它不仅支持 Vue 组件的写法，还内置 <code>Stylus</code> 语法。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="custom-container warning"><p class="custom-container-title">注意</p><p>本博客VuePress主版本为<code>0.x</code>，相关配置最新的<code>1.x</code>也兼容，请放心使用。另请确认你的Node.js &gt;= 8</p></div><h3 id="全局安装-推荐" tabindex="-1"><a class="header-anchor" href="#全局安装-推荐" aria-hidden="true">#</a> 全局安装(推荐)</h3><p>通常而言，全局安装 VuePress 会非常省心，可以通过如下命令进行全局安装</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> vuepress
</code></pre></div><h3 id="本地安装" tabindex="-1"><a class="header-anchor" href="#本地安装" aria-hidden="true">#</a> 本地安装</h3><p>区别于全局安装，本地安装会把<code>npm</code>包安装在本项目上，生成一个叫<code>node_modules</code>目录，可以通过如下命令进行本地安装（需同时安装<code>vuepress</code>和<code>webpack-dev-middleware</code>）</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> vuepress webpack-dev-middleware --save-dev
</code></pre></div><h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置" aria-hidden="true">#</a> 基本配置</h2><div class="custom-container tip"><p class="custom-container-title">提醒</p><p>基本配置下的内容适用于 VuePress 的默认主题，对于自定义主题配置可能会不太一样</p></div><h3 id="脚本命令" tabindex="-1"><a class="header-anchor" href="#脚本命令" aria-hidden="true">#</a> 脚本命令</h3><p>我们需要至少两个脚本命令，分别用于本地开发和打包上线，脚本命令需要配置在根目录<code>package.json</code>文件中，它的配置如下</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 本地开发</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// 打包上线</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>本地开发请使用如下命令，它在本地启用了一个小型的服务器，你可以在浏览器中使用<code>localhost:8080</code>(默认情况下)进行访问</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> run docs:dev
</code></pre></div><p>打包命令请使用如下命令，它在<code>.vuepress</code>目录下生成一个<code>dist</code>文件夹</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> run docs:build
</code></pre></div><h3 id="项目目录" tabindex="-1"><a class="header-anchor" href="#项目目录" aria-hidden="true">#</a> 项目目录</h3><p>VuePress 作为一个静态网站生成器，它对于项目的目录是有一定的限制的，一个基本的项目结构如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span> docs <span class="token comment">// 特定的目录</span>
    <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">README</span><span class="token punctuation">.</span>md <span class="token comment">// 首页</span>
    <span class="token operator">|</span><span class="token operator">--</span> <span class="token punctuation">.</span>vuepress <span class="token comment">// 特定的目录</span>
        <span class="token operator">|</span><span class="token operator">--</span> config<span class="token punctuation">.</span>js <span class="token comment">// 特定的配置文件</span>
<span class="token operator">|</span><span class="token operator">--</span> <span class="token keyword">package</span><span class="token punctuation">.</span>json <span class="token comment">// 脚本命令</span>
</code></pre></div><h3 id="首页" tabindex="-1"><a class="header-anchor" href="#首页" aria-hidden="true">#</a> 首页</h3><p>默认主题提供了一个首页(<code>HomePage</code>)，即上面目录结构中的<code>README.md</code>文件中的内容，首页是可选的，对于 VuePress 中默认主题的首页，我们可以进行如下配置</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">lang</span><span class="token punctuation">:</span> zh<span class="token punctuation">-</span>CN
<span class="token key atrule">heroText</span><span class="token punctuation">:</span> A  Personal Blog
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> /logo.jpg
<span class="token key atrule">actionText</span><span class="token punctuation">:</span> 开始 →
<span class="token key atrule">actionLink</span><span class="token punctuation">:</span> /interview/
<span class="token key atrule">features</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> A Blog
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 专注写作前端博客，记录日常所得。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> For Me
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 故九万里，则风斯在下矣，而后乃今培风；背负青天，而莫之夭阏者，而后乃今将图南。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> For Interview
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 广州，已入坑ღ( ´･ᴗ･\` )比心
<span class="token key atrule">footer</span><span class="token punctuation">:</span> Copyright © 2019<span class="token punctuation">-</span>present Wangtunan
<span class="token punctuation">---</span>
</code></pre></div><p>以上配置即为本博客的首页效果</p><p><img src="`+g+`" alt="vuepress首页效果"></p><h4 id="首页配置说明" tabindex="-1"><a class="header-anchor" href="#首页配置说明" aria-hidden="true">#</a> 首页配置说明</h4><p>在首页的<code>YAML</code>格式配置中，我们填写了一些配置，下面我们将详细描述每一个配置的具体含义</p><ul><li><code>home:true</code>：标记此页面是否为首页</li><li><code>lang:zh-CN</code>：表示本页面的语言为zh-CN(简体中文)</li><li><code>heroText</code>: 首页的标题内容</li><li><code>heroImage</code>: 首页的标题图片，其中全路径为<code>docs/.vuepress/public/logo.jpg</code>，默认去<code>public</code>目录下找静态资源</li><li><code>actionText</code>: 首页跳转按钮的内容</li><li><code>actionLink</code>: 首页跳转按钮挑战的路径，其中全路径为<code>docs/interview/readme.md</code>，默认<code>readme</code>命名的文件可以省略不写链接的后面内容，省略后的链接如上</li><li><code>features</code>: 表明首页的特征，固定的格式为<code>title</code> + <code>details</code>，以三栏流式布局的方式展示</li><li><code>footer</code>: 为底部内容，与普通的网页一样，我们可以在<code>footer</code>里面写版权信息</li></ul><h3 id="配置icon图标" tabindex="-1"><a class="header-anchor" href="#配置icon图标" aria-hidden="true">#</a> 配置icon图标</h3><p>配置<code>icon</code>需要在<code>config.js</code>进行设置，其中<code>icon</code>图标<strong>必须</strong>存放在<code>.vuepress/public</code>文件夹下面，它的配置如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&#39;icon&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;/icon.png&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>按上面的要求放置图片后，我们的<code>public</code>文件夹的目录如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span> <span class="token keyword">public</span>
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> logo<span class="token punctuation">.</span>png
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> icon<span class="token punctuation">.</span>png
</code></pre></div><h3 id="导航栏" tabindex="-1"><a class="header-anchor" href="#导航栏" aria-hidden="true">#</a> 导航栏</h3><div class="custom-container tip"><p class="custom-container-title">提示</p><p>配置导航栏需要在<code>.vuepress/config.js</code>文件中进行配置</p></div><p>在默认主题下，导航栏需要在<code>themeConfig</code>属性上进行配置<code>nav</code>，导航栏的两个重要属性为<code>text</code>和<code>link</code>，其中<code>text</code>指明了导航的文字内容，<code>link</code>指明了导航的链接。</p><h4 id="基本导航栏" tabindex="-1"><a class="header-anchor" href="#基本导航栏" aria-hidden="true">#</a> 基本导航栏</h4><p>一个基本的导航栏链接可以配置成如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;首页&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/html/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/CSS/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/JavaScript/&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>基本导航栏配置结果</p><p><img src="`+h+`" alt="基本导航栏配置结果"></p><h4 id="导航栏下拉列表" tabindex="-1"><a class="header-anchor" href="#导航栏下拉列表" aria-hidden="true">#</a> 导航栏下拉列表</h4><p>下拉列表需要配置<code>items</code>属性，它是一个数组，数组里的对象依然是一个普通导航对象，即拥有<code>text</code>和<code>link</code>属性，一个导航栏下拉列表可以配置成如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;首页&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;前端三剑客&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/html/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/CSS/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/JavaScript/&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue.jss&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/vue/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>导航栏下拉列表配置结果</p><p><img src="`+m+'" alt="导航栏下拉列表配置结果"></p><h4 id="下拉列表分组" tabindex="-1"><a class="header-anchor" href="#下拉列表分组" aria-hidden="true">#</a> 下拉列表分组</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p>下拉列表分组适用于下拉选项较多的情况</p></div><p>相信熟悉<code>Vue.js</code>官网的你，一定看过如下的下拉框情况</p><p><img src="'+y+`" alt="下拉列表分组"> 要实现以上的情况，可以如下进行配置</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;首页&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;前端三剑客&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/html/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/CSS/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/JavaScript/&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue.jss&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/vue/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;生态系统&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;帮助&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;论坛&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;聊天室&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;聚会&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;工具&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Devtools&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue Cli&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue Loader&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上配置完毕后，务必重新启动一下服务器，再查看效果，会有惊喜哦。❤️❤️❤️</p><h4 id="禁用导航栏" tabindex="-1"><a class="header-anchor" href="#禁用导航栏" aria-hidden="true">#</a> 禁用导航栏</h4><p>禁用导航栏分为两种情况，第一种禁用所有的导航栏，第二种在某个页面禁用导航栏，针对这两种不同的情况，相关的配置是不同的，具体如下所示<br><strong>第一种：</strong> 禁用所有导航栏，通过配置<code>navbar</code>属性为<code>false</code>，此种方式禁用后，将<strong>不会存在</strong>任何导航栏</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">navbar</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>第二种：</strong> 单个禁用导航栏，在每一个页面(<code>.md</code>文件)最顶部，配置<code>navbar</code>属性为false，此种方式禁用后，对应的导航栏依然存在，只是<strong>不能点击跳转</strong>。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">navbar</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token punctuation">---</span>
</code></pre></div><h3 id="内置搜索" tabindex="-1"><a class="header-anchor" href="#内置搜索" aria-hidden="true">#</a> 内置搜索</h3><p>我们在以上配置导航栏的过程中，除了我们配置的导航，还会出现一个搜索框，这就是 VuePress 内置的搜索，内置的搜索只能搜索页面的<code>h2</code>和<code>h3</code>标题构成的索引，我们依然可以对内置的搜索进行一下配置：</p><ul><li><code>search</code>: 通过配置此属性为<code>false</code>，来禁用内置搜索</li><li><code>searchMaxSuggestions</code>: 通过配置此属性为一个数字，对内置的搜索进行最多结果数量的限制</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">search</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">searchMaxSuggestions</span><span class="token operator">:</span> <span class="token number">10</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="侧边栏" tabindex="-1"><a class="header-anchor" href="#侧边栏" aria-hidden="true">#</a> 侧边栏</h3><h4 id="侧边栏分组" tabindex="-1"><a class="header-anchor" href="#侧边栏分组" aria-hidden="true">#</a> 侧边栏分组</h4><div class="custom-container tip"><p class="custom-container-title">解释</p><p>侧边栏分组即意味着把链接进行分组，每一个链接对应一个页面，配置侧边栏分组后，自动生成侧边栏<code>sidebar:auto</code>会自动失效。</p></div><p>侧边栏分组可以如下进行配置，其中<code>collapsable</code>属性设置为<code>false</code>，意味着展开这个分组，属性设置为<code>true</code>，意味着折叠这个分组。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其它配置</span>
    <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;前端三剑客&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">collapsable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;/CSS/&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;/HTML/&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;/JavaScript/&#39;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Vue.js&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">collapsable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;/Vue/&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;/Vue/Vuex.md&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;/Vue/Vue-Router.md&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>要实现以上分组结果，目录结构可以如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span> docs
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">CSS</span>
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">README</span><span class="token punctuation">.</span>md
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">HTML</span>
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">README</span><span class="token punctuation">.</span>md
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> JavaScript
<span class="token operator">|</span>   <span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">README</span><span class="token punctuation">.</span>md
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> Vue
<span class="token operator">|</span>       <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">README</span><span class="token punctuation">.</span>md
<span class="token operator">|</span>       <span class="token operator">|</span><span class="token operator">--</span> Vue<span class="token operator">-</span>Router<span class="token punctuation">.</span>md
<span class="token operator">|</span>       <span class="token operator">|</span><span class="token operator">--</span> Vuex<span class="token punctuation">.</span>md
<span class="token operator">|</span>   <span class="token operator">|</span><span class="token operator">--</span> <span class="token constant">README</span><span class="token punctuation">.</span>md
</code></pre></div><p>侧边栏分组的结果</p><p><img src="`+v+`" alt="侧边栏分组结果"></p><h4 id="自动生成侧边栏" tabindex="-1"><a class="header-anchor" href="#自动生成侧边栏" aria-hidden="true">#</a> 自动生成侧边栏</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p>如果我们仅仅只是希望能根据<code>.md</code>中的标题自动生成侧边栏的话，可以设置<code>sidebar: auto</code>属性即可</p></div><p>如果我们要为所有<code>.md</code>都开启自动生成侧边栏的话，需要进行如下配置</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 所有页面全部开启自动生成侧边栏</span>
    <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token string">&#39;auto&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果我们只是针对某一个<code>.md</code>文件开启自动生成侧边栏的话，需要在<code>.md</code>文件的最上方，通过设置<code>YAML</code>属性，相关配置如下</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">sidebar</span><span class="token punctuation">:</span> auto
<span class="token punctuation">---</span>
<span class="token comment"># Vue.js</span>
这里是Vue.js文件的内容部分
</code></pre></div><h4 id="禁用侧边栏" tabindex="-1"><a class="header-anchor" href="#禁用侧边栏" aria-hidden="true">#</a> 禁用侧边栏</h4><p>正如上面所提到的单独配置文件的侧边栏，同样的道理，我们也能单独禁用侧边栏。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">sidebar</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token punctuation">---</span>
<span class="token comment"># Vue.js</span>
这里是Vue.js文件的内容部分
</code></pre></div><h3 id="最后更新时间" tabindex="-1"><a class="header-anchor" href="#最后更新时间" aria-hidden="true">#</a> 最后更新时间</h3><div class="custom-container tip"><p class="custom-container-title">说明</p><p>最后更新时间默认<strong>不开启</strong>，它是基于<code>git</code>提交的时间戳，所以我们的静态站点是需要通过<code>git init</code>的仓库进行管理的，并且它是按<code>git commit</code>的时间来计算的。</p></div><p>最后更新时间可以通过配置<code>lastUpdated</code>，它的默认值为<code>false</code>，接受字符串（<code>String</code>）和布尔值<code>boolean</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.接受字符串，它设置了最后更新时间的label，例如：最后更新时间：2019年5月3日 21:51:53</span>
    <span class="token literal-property property">lastUpdated</span><span class="token operator">:</span> <span class="token string">&#39;最后更新时间&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 2.设置true，开启最后更新时间</span>
    <span class="token literal-property property">lastUpdated</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 3.设置false，不开启最后更新时间(默认)</span>
    <span class="token literal-property property">lastUpdated</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="上一篇-下一篇" tabindex="-1"><a class="header-anchor" href="#上一篇-下一篇" aria-hidden="true">#</a> 上一篇/下一篇</h3><div class="custom-container tip"><p class="custom-container-title">提醒</p><p>如果我们没有上一篇或者下一篇，只需要把其对应的<code>YAML</code>属性设置为<code>false</code>即可</p></div><p>上一篇下一篇可以通过配置<code>YAML</code>的<code>prev</code>和<code>next</code>来显示的配置，链接地址同导航的地址一样的书写规则，一个配置了上一篇/下一篇的<code>.md</code>文件可以如下所示</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span> /HTML/
<span class="token key atrule">next</span><span class="token punctuation">:</span> /JavaScript/
<span class="token punctuation">---</span>
<span class="token comment"># HTML5</span>

这里是HTML5的内容部分
</code></pre></div><p>上一篇/下一篇的配置结果如下图所示</p><p><img src="`+x+`" alt="上一篇/下一篇的结果"></p><h3 id="git仓库和编辑链接" tabindex="-1"><a class="header-anchor" href="#git仓库和编辑链接" aria-hidden="true">#</a> Git仓库和编辑链接</h3><p>在输出我们的静态网站的时候，我们可能需要有一个导航链接到我们的<code>GitHub</code>仓库，对于这个需求我们可以通过如下配置来解决</p><div class="custom-container tip"><p class="custom-container-title">Git仓库说明</p><p><code>repo</code>代表我们的链接地址，<code>repoLabel</code>代表链接的名称，配置后它会自动出现在我们<code>nav</code>导航的最后一个位置</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其它配置</span>
    <span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">&#39;https://github.com/wangtunan/blog&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">repoLabel</span><span class="token operator">:</span> <span class="token string">&#39;Github&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;首页&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;前端三剑客&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/html/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/CSS/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/JavaScript/&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue.jss&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/vue/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">编辑链接说明</p><p>编辑功能默认是没有开启的，我们可以通过配置<code>editLinks</code>来设置是否出现编辑链接，<code>editLinkText</code>指明编辑功能的文字内容</p></div><p>一个启用了编辑链接的配置可以如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其它配置</span>
    <span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">&#39;https://github.com/wangtunan/blog&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">repoLabel</span><span class="token operator">:</span> <span class="token string">&#39;Github&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">editLinks</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">editLinkText</span><span class="token operator">:</span> <span class="token string">&#39;编辑此页&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;首页&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;前端三剑客&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/html/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/CSS/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/JavaScript/&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue.jss&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/vue/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>配置了编辑链接后结果可能如下图所示</p><p><img src="`+b+`" alt="编辑功能"></p><p>你也可以通过设置<code>YAML</code>来单独禁止某个<code>.md</code>文件启用编辑链接功能</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">editLink</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token punctuation">---</span>
</code></pre></div><h2 id="markdown扩展" tabindex="-1"><a class="header-anchor" href="#markdown扩展" aria-hidden="true">#</a> Markdown扩展</h2><h3 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h3><h4 id="锚链接" tabindex="-1"><a class="header-anchor" href="#锚链接" aria-hidden="true">#</a> 锚链接</h4><p>在VuePress 中所有<code>.md</code>文件中的标题(默认<code>h2</code>和<code>h3</code>)都会自动添加锚点链接(<code>anchor</code>)，所以如果我们需要跳转至固定的锚点，可以如下进行设置</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token url">[<span class="token content">锚点链接</span>](<span class="token url">/vuepress/#pwa配置</span>)</span>
</code></pre></div><h4 id="内部链接" tabindex="-1"><a class="header-anchor" href="#内部链接" aria-hidden="true">#</a> 内部链接</h4><p>在 VuePress 内部，以<code>.md</code>或者<code>.html</code>结尾的文件，会被转换成<code>&lt;router-link&gt;</code>用于<code>SPA</code>导航，它是大小写敏感的。<br> 如果文件名为<code>README.md</code>，它会被编译成<code>index.html</code>，所以当我们访问<code>/vuepress/</code>时，其实就是在访问<code>/vuepress/README.md</code>或者<code>/vuepress/index.html</code></p><h3 id="自定义容器" tabindex="-1"><a class="header-anchor" href="#自定义容器" aria-hidden="true">#</a> 自定义容器</h3><p>VuePress 内置了三种不同状态的自定义容器，分别有<code>tip</code>、<code>warning</code>和<code>danger</code>三种类型，在紧挨着类型的旁边，可以设置自定义容器标题，不写的话默认为<code>TIP</code>，它们的书写规则如下所示</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>::: tip 提醒
这里是tip容器
:::

::: warning 警告
这里是警告容器
:::

::: danger 危险
这里是危险容器
:::
</code></pre></div><p>三种自定义容器的结果如下图所示</p><div class="custom-container tip"><p class="custom-container-title">提醒</p><p>这里是tip容器</p></div><div class="custom-container warning"><p class="custom-container-title">警告</p><p>这里是警告容器</p></div><div class="custom-container danger"><p class="custom-container-title">危险</p><p>这里是危险容器</p></div><h3 id="代码块类别" tabindex="-1"><a class="header-anchor" href="#代码块类别" aria-hidden="true">#</a> 代码块类别</h3><p>对于不同的代码块，需要设置不同的类型进行展示，常见的代码块类型有如下所示</p><ul><li><strong><code>html</code></strong> 类型：它表示代码块是<code>html</code>格式的</li><li><strong><code>css</code></strong> 类型：它表示代码块是<code>css</code>格式的</li><li><strong><code>js</code></strong> 类型：它表示代码块是<code>javascript</code>格式的</li><li><strong><code>stylus</code></strong> 类型：它表示代码块是<code>stylus</code>格式的，类似的类型还有<code>less</code>和<code>scss</code></li><li><strong><code>md</code></strong> 类型：它表示代码块是<code>markdown</code>格式的</li><li><strong><code>json</code></strong> 类型：它表示代码块是<code>json</code>格式的<br></li></ul><p>他们的对应的配置如下所示<br><code>HTML</code>格式的代码块(观测代码块右上角小角标)</p><div class="language-html" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>html类型的代码块<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p><code>css</code>格式的代码块(观测代码块右上角小角标)</p><div class="language-css" data-ext="css"><pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>js</code>格式的代码块(观测代码块右上角小角标)</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;js格式的代码块&#39;</span><span class="token punctuation">)</span>
</code></pre></div><p>其它格式的代码块<strong>同理</strong>，就不再次累述</p><h3 id="代码块高亮和行号" tabindex="-1"><a class="header-anchor" href="#代码块高亮和行号" aria-hidden="true">#</a> 代码块高亮和行号</h3><h4 id="代码块高亮" tabindex="-1"><a class="header-anchor" href="#代码块高亮" aria-hidden="true">#</a> 代码块高亮</h4><p>在<code>Markdown</code>中，我们可以如下所示来进行代码块的高亮设置(<strong>类型后跟一个花括号</strong>)</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>\`\` js{4}
export default {
  data () {
    return {
      msg: &#39;Highlighted!&#39;
    }
  }
}
\`\`
</code></pre></div><p>它的结果可能会是这样的(第四行高亮，<strong>行数不是从0开始的</strong>)</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Highlighted!&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br><br></div></div><p>多行高亮，只需要把行号用逗号隔开即可，例如<code>js {1,3,5}</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Highlighted!&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line"> </div><br><div class="highlight-line"> </div><br><div class="highlight-line"> </div><br><br></div></div><h4 id="代码块行号" tabindex="-1"><a class="header-anchor" href="#代码块行号" aria-hidden="true">#</a> 代码块行号</h4><p>代码块行号配置同样需要在<code>config.js</code>中进行配置，如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 显示代码块行号</span>
    <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>配置后，代码块行号的结果如下图所示</p><p><img src="`+f+'" alt="代码块行号"></p><h3 id="使用emoji表情" tabindex="-1"><a class="header-anchor" href="#使用emoji表情" aria-hidden="true">#</a> 使用Emoji表情</h3><div class="custom-container warning"><p class="custom-container-title">注意</p><p>并不是所有<code>Emoji</code>表情都支持</p></div>',144),N=s("code",null,".md",-1),R=s("code",null,"Emoji",-1),G={href:"https://emoji.muan.co/",target:"_blank",rel:"noopener noreferrer"},U=s("code",null,"Emoji",-1),Y={href:"https://gitmoji.carloscuesta.me/",target:"_blank",rel:"noopener noreferrer"},W=s("code",null,"Emoji",-1),O=s("code",null,"Emoji",-1),F=t(`<div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">####</span> 这里是Emoji表情 :tada:</span>
:100: :rocket:
</code></pre></div><h4 id="这里是emoji表情" tabindex="-1"><a class="header-anchor" href="#这里是emoji表情" aria-hidden="true">#</a> 这里是Emoji表情 🎉</h4><p>💯 🚀</p><h3 id="github风格的表格" tabindex="-1"><a class="header-anchor" href="#github风格的表格" aria-hidden="true">#</a> Github风格的表格</h3><p>有时候我们想要在<code>.md</code>文件中列一些简单的表格，可以像下面这样配置</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important"> 序号          </span><span class="token punctuation">|</span><span class="token table-header important"> 订单编号      </span><span class="token punctuation">|</span><span class="token table-header important"> 订单金额</span><span class="token punctuation">|</span>
</span><span class="token table-line"><span class="token punctuation">|</span> <span class="token punctuation">-------------</span><span class="token punctuation">|</span><span class="token punctuation">:-------------:</span><span class="token punctuation">|</span> <span class="token punctuation">------:</span><span class="token punctuation">|</span>
</span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> 1             </span><span class="token punctuation">|</span><span class="token table-data"> 20180101     </span><span class="token punctuation">|</span><span class="token table-data"> $1600  </span><span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token table-data"> 2             </span><span class="token punctuation">|</span><span class="token table-data"> 20180102     </span><span class="token punctuation">|</span><span class="token table-data">   $12  </span><span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token table-data"> 3             </span><span class="token punctuation">|</span><span class="token table-data"> 20180103     </span><span class="token punctuation">|</span><span class="token table-data">    $1  </span><span class="token punctuation">|</span>
</span></span></code></pre></div><p>以上表格同<code>Github</code>表格风格是一致的，它的结果如下所示</p><table><thead><tr><th>序号</th><th style="text-align:center;">订单编号</th><th style="text-align:right;">订单金额</th></tr></thead><tbody><tr><td>1</td><td style="text-align:center;">20180101</td><td style="text-align:right;">$1600</td></tr><tr><td>2</td><td style="text-align:center;">20180102</td><td style="text-align:right;">$12</td></tr><tr><td>3</td><td style="text-align:center;">20180103</td><td style="text-align:right;">$1</td></tr></tbody></table><h3 id="自动生成目录" tabindex="-1"><a class="header-anchor" href="#自动生成目录" aria-hidden="true">#</a> 自动生成目录</h3><p>我们有时候希望根据标题自动生成目录，可以使用<code>[[toc]]</code>来输出我们的目录，它默认只列举<code>h2</code>标题和<code>h3</code>标题</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>[[toc]]

<span class="token title important"><span class="token punctuation">#</span> H1标题</span>

<span class="token title important"><span class="token punctuation">##</span> h2标题</span>
<span class="token title important"><span class="token punctuation">###</span> h3标题</span>
<span class="token title important"><span class="token punctuation">###</span> h3标题</span>

<span class="token title important"><span class="token punctuation">##</span> h2标题</span>
<span class="token title important"><span class="token punctuation">###</span> h3标题</span>
<span class="token title important"><span class="token punctuation">###</span> h3标题</span>
</code></pre></div><p>它的结果可能如下所示</p><p><img src="`+j+`" alt="目录"></p><h3 id="使用vue模板语法" tabindex="-1"><a class="header-anchor" href="#使用vue模板语法" aria-hidden="true">#</a> 使用Vue模板语法</h3><h4 id="使用插值" tabindex="-1"><a class="header-anchor" href="#使用插值" aria-hidden="true">#</a> 使用插值</h4><p>在<code>.md</code>文件中，可以使用 Vue 的插值表达式，像下面这样</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 插值表达式</span>
1 + 1 的结果是 {{1+1}}
</code></pre></div><p>1 + 1 的结果是 2</p><h4 id="指令" tabindex="-1"><a class="header-anchor" href="#指令" aria-hidden="true">#</a> 指令</h4><p>除了像上面那样使用插值表达式，我们还可以使用<code>v-for</code>等指令，下面是一个使用<code>v-for</code>指令的例子</p><div class="language-html" data-ext="html"><pre class="language-html"><code>列表渲染的结果是：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>number in 5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{number}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,21),K=t(`<h3 id="使用原生javascript和css" tabindex="-1"><a class="header-anchor" href="#使用原生javascript和css" aria-hidden="true">#</a> 使用原生JavaScript和CSS</h3><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果我们要在原生JS中操作DOM，那么一定要记住VuePress的页面是经过服务端渲染而来，最好是在页面加载完毕之后再操作DOM</p></div><p>VuePress 赋予了我们在<code>.md</code>文件中直接书写原生<code>js</code>和<code>css</code>的能力，它们可以是下面这样的形式</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span>
.box {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
  background-color: #58a;
}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token title important"><span class="token punctuation">####</span> 使用原生的JS和CSS</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span>
window.onload = function() {
  var dom = document.getElementById(&#39;container&#39;);
  dom.innerHTML = &#39;box content&#39;
  dom.className = &#39;box&#39;
}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>以上代码的结果如下图所示</p><p><img src="`+_+`" alt="使用原生JS和CSS"></p><h3 id="使用css预处理器" tabindex="-1"><a class="header-anchor" href="#使用css预处理器" aria-hidden="true">#</a> 使用CSS预处理器</h3><p>VuePress 不仅像上面一样赋予我们使用原生<code>JS</code>和<code>CSS</code>的能力，还赋予我们使用<code>CSS</code>预处理器的能力，它内置了相关<code>CSS</code>预处理器的配置，我们只需要安装对应的依赖并使用即可，特别要注意的是，VuePress 内置了<code>Stylus</code>，我们无需安装，直接使用即可，现在让我们使用<code>Stylus</code>来改写上面的例子</p><div class="language-html" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylus<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
.box
  <span class="token property">width</span><span class="token punctuation">:</span> 100%
  <span class="token property">height</span><span class="token punctuation">:</span> 100px
  <span class="token property">line-height</span><span class="token punctuation">:</span> 100px
  <span class="token property">text-align</span><span class="token punctuation">:</span> center
  <span class="token property">color</span><span class="token punctuation">:</span> #fff
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fb3
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
#### 使用原生的JS和CSS
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> dom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;container&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  dom<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;box content&#39;</span>
  dom<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">&#39;box&#39;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>使用<code>Stylus</code>预处理器后的结果如下图所示:</p><p><img src="`+w+`" alt="使用原生JS和CSS"></p><h3 id="使用内置组件" tabindex="-1"><a class="header-anchor" href="#使用内置组件" aria-hidden="true">#</a> 使用内置组件</h3><h4 id="外部链接" tabindex="-1"><a class="header-anchor" href="#外部链接" aria-hidden="true">#</a> 外部链接</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p><code>OutboundLink</code>用来标识一个外部链接，它紧跟在链接后面，在<code>.md</code>文件中设置外部链接时，已默认使用了此组件。</p></div><p>下面是一个外部链接的配置，它链接到百度</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token url">[<span class="token content">百度一下</span>](<span class="token url">https://www.baidu.com</span>)</span>
</code></pre></div>`,16),z=s("code",null,"OutboundLink",-1),Z={href:"https://www.baidu.com",target:"_blank",rel:"noopener noreferrer"},X=t(`<h4 id="badge-角标" tabindex="-1"><a class="header-anchor" href="#badge-角标" aria-hidden="true">#</a> Badge(角标)</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p>内置组件<code>Badge</code>有三个属性需要传递：</p><ul><li><code>text</code>：它指明了角标的内容</li><li><code>type</code>：同自定义容器类似，它有三种不同的类型，分别是<code>tip</code>、<code>warn</code>和<code>error</code>，默认是<code>tip</code></li><li><code>vertical</code>：它指明了角标同内容的对齐方式，有两个值，分别是<code>top</code>和<code>middle</code>，默认是<code>top</code></li></ul></div><p>角标的使用如下所示</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">####</span> Vue &lt;Badge text=&quot;2.5.0+&quot;/&gt; </span>
<span class="token title important"><span class="token punctuation">####</span> Vuex &lt;Badge text=&quot;beta&quot; type=&quot;warn&quot; vertical=&quot;top&quot;/&gt; </span>
<span class="token title important"><span class="token punctuation">####</span> Vue-Resource&lt;Badge text=&quot;废弃&quot; vertical=&quot;middle&quot; type=&quot;error&quot;/&gt;</span>
</code></pre></div>`,4),Q={id:"vue",tabindex:"-1"},ss=s("a",{class:"header-anchor",href:"#vue","aria-hidden":"true"},"#",-1),as={id:"vuex",tabindex:"-1"},ns=s("a",{class:"header-anchor",href:"#vuex","aria-hidden":"true"},"#",-1),ts={id:"vue-resource",tabindex:"-1"},ps=s("a",{class:"header-anchor",href:"#vue-resource","aria-hidden":"true"},"#",-1),es=t(`<h3 id="使用vue组件" tabindex="-1"><a class="header-anchor" href="#使用vue组件" aria-hidden="true">#</a> 使用Vue组件</h3><p>VuePress 除了让我们使用内置组件以外，还可以让我们使用自己的组件，它默认把在<code>.vuepress/components</code>目录下所有的组件全局注册，注册后我们可以直接在<code>.md</code>文件中使用。 我们先在<code>.vuepress/components</code>目录下(无则新建)一个<code>customer-component</code>的<code>.vue</code>文件，它的内容如下所示</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;customer-component&quot;</span><span class="token operator">&gt;</span>
    <span class="token literal-property property">todoList</span><span class="token operator">:</span>
    <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;item in list&quot;</span> <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">&quot;item.id&quot;</span><span class="token operator">&gt;</span>
      项目：<span class="token punctuation">{</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>text<span class="token punctuation">}</span><span class="token punctuation">}</span>，状态：<span class="token punctuation">{</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>done <span class="token operator">?</span> <span class="token string">&#39;完成&#39;</span><span class="token operator">:</span> <span class="token string">&#39;进行中&#39;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;CustomerComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue.js&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;VuePress&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><p>在<code>.md</code>文件中引入</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">###</span> 使用自定义组件</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>customer-component</span><span class="token punctuation">/&gt;</span></span>
</code></pre></div><p>VuePress 运行结果</p><p><img src="`+S+`" alt="VuePress运行结果"></p><h2 id="进阶配置" tabindex="-1"><a class="header-anchor" href="#进阶配置" aria-hidden="true">#</a> 进阶配置</h2><h3 id="基本配置api" tabindex="-1"><a class="header-anchor" href="#基本配置api" aria-hidden="true">#</a> 基本配置API</h3><h4 id="title-标题" tabindex="-1"><a class="header-anchor" href="#title-标题" aria-hidden="true">#</a> title(标题)</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p><code>title</code>标题能让我们配置静态站点的标题，它固定在我们顶部左上角</p></div><p>可以像下面这样来配置<code>title</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>配置后的结果如下图所示</p><p><img src="`+V+`" alt="title配置结果"></p><h4 id="description-网站的描述" tabindex="-1"><a class="header-anchor" href="#description-网站的描述" aria-hidden="true">#</a> description(网站的描述)</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p><code>description</code>它将会以 <code>&lt;meta&gt;</code> 标签渲染到当前页面的 HTML 中，它是给搜索引擎去识别的，这属于<code>SEO</code>配置</p></div><p>可以像下面这样配置<code>description</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog 的网站描述&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>配置后的结果如下图所示</p><p><img src="`+q+`" alt="description配置结果"></p><h4 id="base" tabindex="-1"><a class="header-anchor" href="#base" aria-hidden="true">#</a> base</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p><code>base</code>默认值为<code>/</code>,它属于部署环节，配置它我们可以在<code>GitHub Pages</code>哪个目录下访问我们的项目</p></div><p>简单来说，如果我们要配置在<code>https://xxx.github.io/blog/</code>这个地址，那么我们的<code>base</code>需要进行如下配置</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/blog/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog 的网站描述&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="host-主机名-和post-端口" tabindex="-1"><a class="header-anchor" href="#host-主机名-和post-端口" aria-hidden="true">#</a> host(主机名)和post(端口)</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p><code>host</code>默认值为<code>0.0.0.0</code>，此参数可以指明我们主机名(IP地址)<br><code>port</code>默认值为<code>8080</code>，此参数可以指明我们的端口号</p></div><p>配置了<code>host</code>和<code>port</code>后，我们可以在浏览器上通过<code>IP</code>地址+<code>port</code>端口进行访问，例如</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/blog/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog 的网站描述&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上配置成功后我们可以<code>127.0.0.1:3000</code>来访问我们的项目</p><h4 id="dest-输出目录" tabindex="-1"><a class="header-anchor" href="#dest-输出目录" aria-hidden="true">#</a> dest(输出目录)</h4><div class="custom-container tip"><p class="custom-container-title">说明</p><p><code>dest</code>默认值为<code>.vuepress/dist</code>，配置它可以显示的帮助我们设置打包文件的输出目录</p></div><p>如果我们想把<code>dist</code>目录输出在根路径下，而不是<code>.vuepress</code>文件夹下，可以进行如下配置</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">dest</span><span class="token operator">:</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/blog/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;VuePress Blog 的网站描述&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="简单的样式覆盖" tabindex="-1"><a class="header-anchor" href="#简单的样式覆盖" aria-hidden="true">#</a> 简单的样式覆盖</h3><p>如果你只是希望能够在默认样式中进行一些简单的样式覆盖，你需要在<code>.vuepress</code>目录下创建两个样式文件<code>override.styl</code>和<code>style.styl</code>，它们都是<code>stylus</code>文件(<strong>也可以是其它类型的样式文件</strong>)，这两个文件的具体作用如下</p><ol><li><strong><code>override.styl</code></strong> 重置默认主题的样式变量</li><li><strong><code>style.styl</code></strong> 运用到默认主题下的自定义样式</li></ol><h4 id="override-styl" tabindex="-1"><a class="header-anchor" href="#override-styl" aria-hidden="true">#</a> override.styl</h4><p>对于 VuePress 的默认主题，它提供了一些主题常量来让我们可以自由配置，可以配置的常量和其对应的解释如下</p><div class="language-stylus" data-ext="styl"><pre class="language-stylus"><code><span class="token comment">// 默认主题下的hover颜色(主题绿)</span>
<span class="token variable-declaration"><span class="token variable">$accentColor</span> <span class="token operator">=</span> <span class="token hexcode">#3eaf7c</span> </span>
<span class="token comment">// 默认主题下的文本颜色</span>
<span class="token variable-declaration"><span class="token variable">$textColor</span> <span class="token operator">=</span> <span class="token hexcode">#2c3e50</span></span>
<span class="token comment">// 默认主题下的border颜色</span>
<span class="token variable-declaration"><span class="token variable">$borderColor</span> <span class="token operator">=</span> <span class="token hexcode">#eaecef</span></span>
<span class="token comment">// 默认主题下的代码块背景色(背景黑)</span>
<span class="token variable-declaration"><span class="token variable">$codeBgColor</span> <span class="token operator">=</span> <span class="token hexcode">#282c34</span></span>
</code></pre></div><p>为了演示效果，我们给这些常亮设置一个醒目的颜色</p><div class="language-stylus" data-ext="styl"><pre class="language-stylus"><code><span class="token variable-declaration"><span class="token variable">$accentColor</span> <span class="token operator">=</span> <span class="token hexcode">#fb3</span> </span>
<span class="token variable-declaration"><span class="token variable">$textColor</span> <span class="token operator">=</span> <span class="token color">green</span></span>
<span class="token variable-declaration"><span class="token variable">$borderColor</span> <span class="token operator">=</span> <span class="token color">red</span></span>
<span class="token variable-declaration"><span class="token variable">$codeBgColor</span> <span class="token operator">=</span> <span class="token hexcode">#58a</span></span>
</code></pre></div><p>以上设置的效果如下</p><p><img src="`+C+`" alt="样式覆盖的结果"></p><h4 id="style-styl" tabindex="-1"><a class="header-anchor" href="#style-styl" aria-hidden="true">#</a> style.styl</h4><p>什么是自定义的样式？举个栗子，如果我们觉得默认主题下单行代码块的文字颜色和背景色不够醒目，在利用浏览器审查元素后，我们可以这样设置我们的自定义样式</p><div class="language-stylus" data-ext="styl"><pre class="language-stylus"><code><span class="token selector">.content</span>
  <span class="token selector">code</span>
    <span class="token property-declaration"><span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token hexcode">#fff5f5</span><span class="token punctuation">;</span></span>
    <span class="token property-declaration"><span class="token property">color</span><span class="token punctuation">:</span> <span class="token hexcode">#ff502c</span><span class="token punctuation">;</span></span>
</code></pre></div><p>运用以上自定义样式后，默认主题下的单行代码块的效果如下</p><p><img src="`+P+`" alt="自定义样式的效果"></p><h3 id="引入代码片段" tabindex="-1"><a class="header-anchor" href="#引入代码片段" aria-hidden="true">#</a> 引入代码片段</h3><p>如果我们在写<code>.md</code>文档中，需要导入我们已经存在的<code>js</code>代码，而我们又不想再去使用代码块复制粘贴一遍，这个时候 VuePress 允许我们引入已经存在的<code>js</code>代码片段，它的语法如下</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>&lt;&lt;&lt; @filepath
// 导入的同时也支持高亮
&lt;&lt;&lt; @filepath{highlightLines}
</code></pre></div><p>具体示例如下</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>&lt;&lt;&lt; @/docs/.vuepress/js/hello.js {2}
</code></pre></div><p>导入代码片段的结果</p><p>&lt;&lt;&lt; @/docs/.vuepress/js/hello.js {2}</p><h3 id="algolia搜索" tabindex="-1"><a class="header-anchor" href="#algolia搜索" aria-hidden="true">#</a> Algolia搜索</h3><p>在基础配置章节我们讲到了内置搜索，内置搜索只会为页面的<code>h2</code>和<code>h3</code>标题建立索引，而如果我们想进行全文搜索，就需要使用到本小结的<code>Algolia</code>搜索了，它的配置可以是下面这样的</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">algolia</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;&lt;API_KEY&gt;&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">indexName</span><span class="token operator">:</span> <span class="token string">&#39;&lt;INDEX_NAME&gt;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>不同于内置搜索的开箱即用，使用<code>Algolia</code>搜索，需要我们将网站提交给它们以建立索引</p></div>`,60),os={href:"https://community.algolia.com/docsearch/",target:"_blank",rel:"noopener noreferrer"},cs=s("br",null,null,-1),ls=s("strong",null,"Vue官网",-1),rs=t('<p><img src="'+L+`" alt="Algolia搜索"></p><h3 id="管理静态资源" tabindex="-1"><a class="header-anchor" href="#管理静态资源" aria-hidden="true">#</a> 管理静态资源</h3><p>在<code>.md</code>文件中，如果我们要使用静态资源，我们有如下几种方式来引用资源</p><ul><li>相对路径/绝对路径</li><li><code>Webpack</code> 别名<br></li></ul><p>下面我们来一一进行介绍</p><h4 id="相对路径" tabindex="-1"><a class="header-anchor" href="#相对路径" aria-hidden="true">#</a> 相对路径</h4><p>要在<code>.md</code>文件中引用一个图片资源，它的固定格式如下</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>// 格式
<span class="token url"><span class="token operator">!</span>[<span class="token content">图片缺失时的alt</span>](<span class="token url">图片的路径</span>)</span>

// 示例：绝对路径
<span class="token url"><span class="token operator">!</span>[<span class="token content">百度logo</span>](<span class="token url">https://www.baidu.com/logo.png</span>)</span>
// 示例：相对路径
<span class="token url"><span class="token operator">!</span>[<span class="token content">Algolia搜索</span>](<span class="token url">../images/vuepress/16.png</span>)</span>
</code></pre></div><p>如果你的目录结构相对简单，那么使用相对路径或者利用图床技术，先把图片上传到图床服务器，再填写绝对路径，这往往是<strong>非常简便和易懂</strong>的一种做法。</p><h4 id="webpack别名" tabindex="-1"><a class="header-anchor" href="#webpack别名" aria-hidden="true">#</a> Webpack别名</h4><p>就像<code>Vue-cli</code>脚手架那样，在路径比较长或者目录结构比较复杂的时候，使用<code>Webpack</code>别名进行访问，它通常是非常友好的，它的配置可以是这样的</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .vuepress/config.js下配置</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;@vuepress&#39;</span><span class="token operator">:</span> <span class="token string">&#39;../images/vuepress&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;@vue&#39;</span><span class="token operator">:</span> <span class="token string">&#39;../images/vue&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;@interview&#39;</span><span class="token operator">:</span> <span class="token string">&#39;../images/interview&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>通过上面的配置以后，我们就可以在<code>.md</code>文件中这样使用</p><div class="language-markdown" data-ext="md"><pre class="language-markdown"><code>// 不使用别名
<span class="token url"><span class="token operator">!</span>[<span class="token content">Algolia搜索</span>](<span class="token url">../images/vuepress/16.png</span>)</span>

// 使用别名
<span class="token url"><span class="token operator">!</span>[<span class="token content">Algolia搜索</span>](<span class="token url">~@vuepress/16.png</span>)</span>
</code></pre></div><h3 id="自定义页面样式类" tabindex="-1"><a class="header-anchor" href="#自定义页面样式类" aria-hidden="true">#</a> 自定义页面样式类</h3><p>有时候我们希望在特定的页面使用特定的样式，VuePress允许我们这样做，你只需要在<code>.vuepress/style.styl</code>中编写自定义样式并在对应的页面使用即可，它们可能是这样配置的</p><div class="language-stylus" data-ext="styl"><pre class="language-stylus"><code><span class="token selector"><span class="token comment">// .vuepress/style.styl</span>
.customer-page-class</span>
  <span class="token property-declaration"><span class="token property">color</span><span class="token punctuation">:</span> <span class="token hexcode">#fb3</span><span class="token punctuation">;</span></span>
  <span class="token property-declaration"><span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token hexcode">#333</span><span class="token punctuation">;</span></span>
</code></pre></div><p>在对应的<code>.md</code>文件的最顶部，使用<code>YAML</code>语法进行引用自定义样式</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">pageClass</span><span class="token punctuation">:</span> customer<span class="token punctuation">-</span>page<span class="token punctuation">-</span>class
<span class="token punctuation">---</span>
</code></pre></div><p>使用自定义样式它的结果</p><p><img src="`+E+`" alt="自定义样式的结果"></p><h3 id="自定义页面布局" tabindex="-1"><a class="header-anchor" href="#自定义页面布局" aria-hidden="true">#</a> 自定义页面布局</h3><p>在默认主题下，每一个<code>.md</code>文件都会被渲染在<code>&lt;div class=&quot;page&quot;&gt;&lt;/div&gt;</code>这样的一个标签中，同时生成页面的侧边栏、编辑链接(如果有)、最新更新时间(如果有)以及上一篇/下一篇(如果有)。<br> 但是如果我们不想生成这样的页面，而是想使用自定义布局，也就是使用<code>Vue</code>组件来进行自定义页面开发，VuePress提供给了我们这样的能力，它在<strong>保留导航栏</strong>的基础上，其它一切我们都可以自定义的，它的配置可能是这样的</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code>// 在需要自定义的.md文件中使用YAML语法
<span class="token punctuation">---</span>
<span class="token key atrule">layout</span><span class="token punctuation">:</span> customerComponent
<span class="token punctuation">---</span>
</code></pre></div><p>上面这样的一个组件名，它对应的路径为<code>.vuepress/components/customerComponent.vue</code>，由于 VuePress会自动帮我们把<code>.vuepress/components</code>目录下的所有组件全部注册，这样我们可以在任何一个<code>.md</code>文件中进行使用，<code>customerComponent.vue</code>中的代码可以是下面这样的</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>customer-component<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>left<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>123<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>center<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>123<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>right<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>123<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylus<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  .customer-component
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100vh - 60px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    &amp; &gt; div
      <span class="token property">flex</span><span class="token punctuation">:</span> 0 0 200px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center
    .left
      <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
    .center
      <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #fb3<span class="token punctuation">;</span>
    .right
      <span class="token property">background-color</span><span class="token punctuation">:</span> #58a<span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>使用自定义布局的结果如下</p><p><img src="`+M+`" alt="自定义布局"></p><h3 id="使用第三方主题" tabindex="-1"><a class="header-anchor" href="#使用第三方主题" aria-hidden="true">#</a> 使用第三方主题</h3><p>VuePress支持使用第三方主题，需要在<code>.vuepress/config.js</code>中如下进行配置即可</p><div class="custom-container tip"><p class="custom-container-title">提醒</p><p>VuePress的插件，命名是固定的，一般为<code>vuepress-theme-xxx</code>，<code>npm install</code>安装第三方主题后，在配置时只需要写最后一个名字即可。例如：<code>vuepress-theme-reco</code>主题，只需如下进行配置即可。</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其它配置</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">&#39;reco&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="使用第三方库" tabindex="-1"><a class="header-anchor" href="#使用第三方库" aria-hidden="true">#</a> 使用第三方库</h3><p>在写文档的时候，我们如果希望使用<code>npm</code>包或者其它第三方库，我们该如何进行使用，VuePress提供给我们<code>enhanceApp.js</code>来让我们可以进行应用级别的配置，它的路径为<code>.vuepress/enhanceApp.js</code>，相关配置如下</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用自定义样式</span>
<span class="token keyword">import</span> <span class="token string">&#39;./style/index.styl&#39;</span>
<span class="token comment">// 使用第三方包</span>
<span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">&#39;lodash&#39;</span>
<span class="token comment">// 其它</span>
<span class="token comment">// import xxx from xxx</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
  Vue<span class="token punctuation">,</span>
  options<span class="token punctuation">,</span>
  router<span class="token punctuation">,</span>
  siteData 
<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...做一些其他的应用级别的优化</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="引入element-ui案例" tabindex="-1"><a class="header-anchor" href="#引入element-ui案例" aria-hidden="true">#</a> 引入Element-ui案例</h4><p>先使用如下命令安装<code>element-ui</code></p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> element-ui <span class="token parameter variable">--save</span>
</code></pre></div><p>安装完毕后，在<code>enhanceApp.js</code>中引入<code>element-ui</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> ElementUI <span class="token keyword">from</span> <span class="token string">&#39;element-ui&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;element-ui/lib/theme-chalk/index.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
  Vue<span class="token punctuation">,</span>
  options<span class="token punctuation">,</span>
  router<span class="token punctuation">,</span>
  siteData 
<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使用element-ui</span>
  Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上配置完毕后，就可以在 VuePress 中使用<code>element-ui</code>了，快去试一试吧。</p><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><h3 id="部署到github-pages" tabindex="-1"><a class="header-anchor" href="#部署到github-pages" aria-hidden="true">#</a> 部署到Github Pages</h3><p>部署到<code>Github Pages</code>，我们需要以下几个步骤</p><ul><li>打包生成<code>dist</code>文件夹</li><li>新建一个仓库，再在此仓库下新建一个<code>gh-pages</code>分支</li><li>提交代码到远程仓库(包含<code>master</code>分支和<code>gh-pages</code>分支)</li></ul><h4 id="打包" tabindex="-1"><a class="header-anchor" href="#打包" aria-hidden="true">#</a> 打包</h4><p>在部署前，我们需要使用我们配置的打包命令</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br></div></div><p>运行打包命令<code>npm run docs:build</code>，它会在<code>.vuepress</code>目录下生成一个<code>dist</code>文件夹，随后我们只需要把这个文件夹上传到<code>Github</code>即可，它的打包结果可以参考如下</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&gt;</span> vuepress build docs
 <span class="token constant">WAIT</span>  Extracting site metadata<span class="token operator">...</span>
<span class="token punctuation">[</span><span class="token number">23</span><span class="token operator">:</span><span class="token number">53</span><span class="token operator">:</span><span class="token number">00</span><span class="token punctuation">]</span> Compiling Client
<span class="token punctuation">[</span><span class="token number">23</span><span class="token operator">:</span><span class="token number">53</span><span class="token operator">:</span><span class="token number">00</span><span class="token punctuation">]</span> Compiling Server
Language does not exist sh
Language does not exist sh
<span class="token punctuation">[</span><span class="token number">23</span><span class="token operator">:</span><span class="token number">53</span><span class="token operator">:</span><span class="token number">07</span><span class="token punctuation">]</span> Compiled Server <span class="token keyword">in</span> 7s
<span class="token punctuation">[</span><span class="token number">23</span><span class="token operator">:</span><span class="token number">53</span><span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">]</span> Compiled Client <span class="token keyword">in</span> 12s
<span class="token constant">WAIT</span>  Rendering <span class="token keyword">static</span> <span class="token constant">HTML</span><span class="token operator">...</span>
<span class="token constant">DONE</span>  Success<span class="token operator">!</span> Generated <span class="token keyword">static</span> files <span class="token keyword">in</span> docs\\<span class="token punctuation">.</span>vuepress\\dist<span class="token punctuation">.</span>
</code></pre></div><h4 id="新建仓库并创建github-pages分支" tabindex="-1"><a class="header-anchor" href="#新建仓库并创建github-pages分支" aria-hidden="true">#</a> 新建仓库并创建Github Pages分支</h4><p>新建一个<code>github</code>仓库和新建分支的具体步骤就不在此累述，如果你新建成功了的话，你的仓库看起来应该是这样子的</p><p><img src="`+A+`" alt="新建仓库和分支"></p><h4 id="提交到github" tabindex="-1"><a class="header-anchor" href="#提交到github" aria-hidden="true">#</a> 提交到Github</h4><p>上面我们新建了一个远程仓库，我们可以在<code>dist</code>目录下进行如下的命令</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>// 新建仓库
$ <span class="token function">git</span> init

// 关联你的远程仓库
$ <span class="token function">git</span> remote <span class="token function">add</span> origin xxxx

// 切换到gh-pages分支
$ <span class="token function">git</span> checkout gh-pages

// 提交代码到gh-pages分支
$ <span class="token function">git</span> push origin gh-pages

// 合并到master分支
$ <span class="token function">git</span> checkout master
$ <span class="token function">git</span> merge gh-pages
</code></pre></div><p>在提交成功后，可以通过<code>https://xxx.github.io</code>或者<code>https://xxx.github.io/xxx/</code>进行访问</p><div class="custom-container warning"><p class="custom-container-title">提醒</p><p>关于自动化部署，如果你是新手，那么按照正常的流程提交代码到远程仓库即可，不建议新手使用自动化部署。</p></div>`,58);function is(us,ks){const e=o("Badge"),p=o("ExternalLinkIcon");return c(),l("div",null,[s("h1",B,[H,a(" VuePress "),n(e,{text:"0.x"})]),s("p",null,[a("本"),J,a("配套了一个基于 VuePress 的一个简单的配置案例，此配置案例包含了本"),$,a("绝大部分配置案例，更多详情请移步这里"),s("a",I,[a("VuePress配置案例"),n(p)])]),D,s("p",null,[a("在"),N,a("文件中，我们可以使用"),R,a("表情，你也可以访问"),s("a",G,[a("Emoji Search"),n(p)]),a("来查询你喜欢的"),U,a("表情，访问"),s("a",Y,[a("Common Emoji"),n(p)]),a("来访问常用的"),W,a("，一个"),O,a("可以是这样写的")]),F,s("p",null,[a("列表渲染的结果是："),(c(),l(u,null,k(5,r=>s("span",null,d(r),1)),64))]),K,s("p",null,[a("此时，百度一下文字后面的小图标就是内置组件"),z,s("a",Z,[a("百度一下"),n(p)])]),X,s("h4",Q,[ss,a(" Vue "),n(e,{text:"2.5.0+"})]),s("h4",as,[ns,a(" Vuex "),n(e,{text:"beta",type:"warn",vertical:"top"})]),s("h4",ts,[ps,a(" Vue-Resource"),n(e,{text:"废弃",vertical:"middle",type:"error"})]),es,s("p",null,[a("此小结的配置由于特殊性，并没有配置成功，如果你感兴趣，请移步这里👉"),s("a",os,[a("Algolia搜索"),n(p)]),cs,a(" 如果你配置成功了，它们的搜索效果会是下面这样子的("),ls,a(")")]),rs])}const gs=i(T,[["render",is],["__file","index.html.vue"]]);export{gs as default};
