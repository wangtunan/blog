import{_ as t}from"./python-vscode-6630e1d3.js";import{_ as s,r as d,o as i,c as h,a as e,b as n,e as r,d as l}from"./app-d99c486e.js";const c={},p={href:"https://docs.python.org/zh-cn/3.13/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://pypi.org/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.conda.io/projects/conda/en/stable/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.anaconda.com/docs/main",target:"_blank",rel:"noopener noreferrer"};function b(x,a){const o=d("ExternalLinkIcon");return i(),h("div",null,[a[4]||(a[4]=e("h1",{id:"python高级技巧",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#python高级技巧","aria-hidden":"true"},"#"),n(" Python高级技巧")],-1)),a[5]||(a[5]=e("h2",{id:"文档",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#文档","aria-hidden":"true"},"#"),n(" 文档")],-1)),e("ul",null,[e("li",null,[e("a",p,[a[0]||(a[0]=n("官方文档")),r(o)])]),e("li",null,[e("a",u,[a[1]||(a[1]=n("第三方库")),r(o)])]),e("li",null,[e("a",m,[a[2]||(a[2]=n("Conda")),r(o)])]),e("li",null,[e("a",f,[a[3]||(a[3]=n("Miniconda")),r(o)])])]),a[6]||(a[6]=l('<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><ul><li>Python：推荐安装v3.10+版本，以下所有代码示例均基于Python@3.10+。</li><li>Conda：推荐安装Miniconda。</li></ul><h2 id="vscode插件" tabindex="-1"><a class="header-anchor" href="#vscode插件" aria-hidden="true">#</a> VSCode插件</h2><p><img src="'+t+`" alt="python VSCode插件"></p><h2 id="虚拟环境" tabindex="-1"><a class="header-anchor" href="#虚拟环境" aria-hidden="true">#</a> 虚拟环境</h2><p>强烈建议任何时候都通过类似<code>Conda</code>这样的工具创建一个虚拟环境并指定<code>Python</code>版本。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># 规则</span>
$ conda create <span class="token operator">-</span>n your_env_name python<span class="token operator">=</span>版本号

<span class="token comment"># 示例</span>
$ conda create <span class="token operator">-</span>n open_webui python<span class="token operator">=</span><span class="token number">3.11</span>
</code></pre></div><p><code>Conda</code>常见命令如下：</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># 激活某个虚拟环境</span>
$ conda activate your_env_name

<span class="token comment"># 取消激活当前虚拟环境</span>
$ conda deactivate

<span class="token comment"># 查看所有虚拟环境</span>
$ conda env <span class="token builtin">list</span>

<span class="token comment"># 删除某个虚拟环境</span>
$ conda env remove <span class="token operator">-</span>n your_env_name
</code></pre></div><h2 id="高级技巧" tabindex="-1"><a class="header-anchor" href="#高级技巧" aria-hidden="true">#</a> 高级技巧</h2><h3 id="错误和异常" tabindex="-1"><a class="header-anchor" href="#错误和异常" aria-hidden="true">#</a> 错误和异常</h3><h3 id="装饰器" tabindex="-1"><a class="header-anchor" href="#装饰器" aria-hidden="true">#</a> 装饰器</h3><h3 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器" aria-hidden="true">#</a> 生成器</h3><h3 id="推导式" tabindex="-1"><a class="header-anchor" href="#推导式" aria-hidden="true">#</a> 推导式</h3><h3 id="lambda表达式" tabindex="-1"><a class="header-anchor" href="#lambda表达式" aria-hidden="true">#</a> Lambda表达式</h3><h3 id="file文件操作" tabindex="-1"><a class="header-anchor" href="#file文件操作" aria-hidden="true">#</a> File文件操作</h3>`,16))])}const y=s(c,[["render",b],["__file","index.html.vue"]]);export{y as default};
