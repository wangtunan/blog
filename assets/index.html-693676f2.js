import{_ as e,a as c}from"./python-vscode-f5c829e2.js";import{_ as l,r as u,o as k,c as i,d as o,a as s,b as t,e as p}from"./app-c9515a38.js";const r="/blog/assets/try-except-55fa6f1c.png",d={},m={href:"https://docs.python.org/zh-cn/3.13/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://pypi.org/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.conda.io/projects/conda/en/stable/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.anaconda.com/docs/main",target:"_blank",rel:"noopener noreferrer"};function w(g,n){const a=u("ExternalLinkIcon");return k(),i("div",null,[n[4]||(n[4]=o('<h1 id="python高级技巧" tabindex="-1"><a class="header-anchor" href="#python高级技巧" aria-hidden="true">#</a> Python高级技巧</h1><h2 id="生态全景" tabindex="-1"><a class="header-anchor" href="#生态全景" aria-hidden="true">#</a> 生态全景</h2><p><img src="'+e+'" alt="Python生态"></p><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>',4)),s("ul",null,[s("li",null,[s("a",m,[n[0]||(n[0]=t("官方文档")),p(a)])]),s("li",null,[s("a",y,[n[1]||(n[1]=t("第三方库")),p(a)])]),s("li",null,[s("a",h,[n[2]||(n[2]=t("Conda")),p(a)])]),s("li",null,[s("a",f,[n[3]||(n[3]=t("Miniconda")),p(a)])])]),n[5]||(n[5]=o('<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><ul><li>Python：推荐安装v3.10+版本，以下所有代码示例均基于Python@3.10+。</li><li>Conda：推荐安装Miniconda。</li></ul><h2 id="vscode插件" tabindex="-1"><a class="header-anchor" href="#vscode插件" aria-hidden="true">#</a> VSCode插件</h2><p><img src="'+c+`" alt="python VSCode插件"></p><h2 id="虚拟环境" tabindex="-1"><a class="header-anchor" href="#虚拟环境" aria-hidden="true">#</a> 虚拟环境</h2><p>强烈建议任何时候都通过类似<code>Conda</code>这样的工具创建一个虚拟环境并指定<code>Python</code>版本。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># 规则</span>
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
</code></pre></div><h2 id="高级技巧" tabindex="-1"><a class="header-anchor" href="#高级技巧" aria-hidden="true">#</a> 高级技巧</h2><h3 id="错误和异常" tabindex="-1"><a class="header-anchor" href="#错误和异常" aria-hidden="true">#</a> 错误和异常</h3><p>如果要处理<code>Python</code>中的异常，可以使用<code>try/except</code>语法，其完整语法如下： <img src="`+r+`" alt="try-except"></p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">safe_divide</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> x <span class="token operator">==</span> y<span class="token punctuation">:</span>
      <span class="token keyword">raise</span> ValueError<span class="token punctuation">(</span><span class="token string">&quot;除数不能与被除数相等&quot;</span><span class="token punctuation">)</span>
    result <span class="token operator">=</span> x <span class="token operator">/</span> y
  <span class="token keyword">except</span> ValueError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;错误：</span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">except</span> ZeroDivisionError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;错误：除数不能为零！&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">except</span> TypeError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;错误：请输入数字类型！&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;未知错误&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;计算结果：</span><span class="token interpolation"><span class="token punctuation">{</span>x<span class="token punctuation">}</span></span><span class="token string"> / </span><span class="token interpolation"><span class="token punctuation">{</span>y<span class="token punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> result
  <span class="token keyword">finally</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;计算结束（无论是否出错都会执行）&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 测试用例</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
  <span class="token comment"># 正常情况</span>
  safe_divide<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment"># 触发 else</span>

  <span class="token comment"># 自定义错误</span>
  safe_divide<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment"># 触发ValueError</span>
  
  <span class="token comment"># 除零错误</span>
  safe_divide<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment"># 触发 ZeroDivisionError</span>
  
  <span class="token comment"># 类型错误</span>
  safe_divide<span class="token punctuation">(</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment"># 触发 TypeError</span>
  
  <span class="token comment"># 其他未知错误</span>
  safe_divide<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span> <span class="token comment"># 触发 TypeError（会被最后一个 except 捕获）</span>

</code></pre></div><h3 id="装饰器" tabindex="-1"><a class="header-anchor" href="#装饰器" aria-hidden="true">#</a> 装饰器</h3><p><strong>装饰器(<code>Decorator</code>)</strong>: 是<code>Python</code>中一种修改或增强函数/类行为的高级语法，基于闭包和函数式编程实现，它允许在不修改源代码的情况下，通过装饰器的语法动态添加功能(如日志，计时，权限校验等)。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time

<span class="token keyword">def</span> <span class="token function">timer</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span>
    res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    end <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;函数</span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">}</span></span><span class="token string">运行时间：</span><span class="token interpolation"><span class="token punctuation">{</span>end <span class="token operator">-</span> start<span class="token punctuation">:</span><span class="token format-spec">.4f</span><span class="token punctuation">}</span></span><span class="token string">秒&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> res
  <span class="token keyword">return</span> wrapper

<span class="token decorator annotation punctuation">@timer</span>
<span class="token keyword">def</span> <span class="token function">heavy_computation</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">return</span> <span class="token builtin">sum</span><span class="token punctuation">(</span>i <span class="token operator">*</span> i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span>

heavy_computation<span class="token punctuation">(</span><span class="token number">10</span><span class="token operator">**</span><span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment"># 函数heavy_computation运行时间：0.0356秒</span>
</code></pre></div><h3 id="迭代器" tabindex="-1"><a class="header-anchor" href="#迭代器" aria-hidden="true">#</a> 迭代器</h3><p><strong>迭代器</strong>：用来访问集合元素的一种方式，它从集合的第一个元素开始访问，直到所有的元素被访问完结束，且迭代器只能前进不能后退。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># 创建迭代器</span>
it1 <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
it2 <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 自动迭代(自动调用next)</span>
<span class="token keyword">for</span> x <span class="token keyword">in</span> it1<span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment"># 1 2 3 4</span>

<span class="token comment"># 手动迭代</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>it2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>it2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>it2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 3</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>it2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 4</span>
</code></pre></div><p><strong>自定义迭代器</strong>： 可以把一个类作为一个迭代器，只需要在类中实现<code>__iter__</code>和<code>__next__</code>即可。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># 自定义迭代器</span>
<span class="token keyword">class</span> <span class="token class-name">AutoIncrementNumber</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__iter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>num <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> self
  <span class="token keyword">def</span> <span class="token function">__next__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> self<span class="token punctuation">.</span>num <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">:</span>
      <span class="token keyword">raise</span> StopIteration
    x <span class="token operator">=</span> self<span class="token punctuation">.</span>num
    self<span class="token punctuation">.</span>num <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> x

myClass <span class="token operator">=</span> AutoIncrementNumber<span class="token punctuation">(</span><span class="token punctuation">)</span>
myIter <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>myClass<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myIter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myIter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myIter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 3</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myIter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 4</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myIter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 5</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myIter<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 报错</span>
</code></pre></div><h3 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器" aria-hidden="true">#</a> 生成器</h3><p><strong>生成器</strong>：在<code>Python</code>中，如果一个函数使用了<code>yield</code>，则这个函数被称为”生成器“。</p><p><strong>区别</strong>：和普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">countDown</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">while</span> n <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
    <span class="token keyword">yield</span> n
    n <span class="token operator">-=</span> <span class="token number">1</span>

generator <span class="token operator">=</span> countDown<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> val <span class="token keyword">in</span> generator<span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token comment"># 5 4 3 2 1</span>
</code></pre></div><h3 id="推导式" tabindex="-1"><a class="header-anchor" href="#推导式" aria-hidden="true">#</a> 推导式</h3><p><strong>推导式(Comprehension)</strong>：是一种简洁高效的语法结构，用于快速创建数据容器(列表、字典、集合等)</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># 列表推导式</span>
<span class="token comment"># 语法: [expression for item in iterable if condition]</span>
squares <span class="token operator">=</span> <span class="token punctuation">[</span>x<span class="token operator">**</span><span class="token number">2</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
evens <span class="token operator">=</span> <span class="token punctuation">[</span>x <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">if</span> x <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>squares<span class="token punctuation">)</span> <span class="token comment"># [1, 4, 9, 16]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>evens<span class="token punctuation">)</span> <span class="token comment"># [0, 2, 4, 6, 8]</span>

<span class="token comment"># 字典推导式</span>
<span class="token comment"># 语法: {key_expression: value_expression for item in iterable if condition}</span>
d <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span>
reversed_d <span class="token operator">=</span> <span class="token punctuation">{</span>v<span class="token punctuation">:</span> k <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> d<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>reversed_d<span class="token punctuation">)</span> <span class="token comment"># {1: &#39;a&#39;, 2: &#39;b&#39;}</span>

<span class="token comment"># 集合推导式</span>
<span class="token comment"># 语法: {expression for item in iterable if condition}</span>
words <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;world&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">]</span>
unique_upper <span class="token operator">=</span> <span class="token punctuation">{</span>word<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> word <span class="token keyword">in</span> words<span class="token punctuation">}</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>unique_upper<span class="token punctuation">)</span> <span class="token comment"># {&#39;HELLO&#39;, &#39;WORLD&#39;}</span>

<span class="token comment"># 生成器推导式</span>
<span class="token comment"># 语法: (expression for item in iterable if condition)</span>
gen <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token operator">**</span><span class="token number">2</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">if</span> x <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>gen<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 0 (逐个生成，节省内存)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>gen<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 9 (逐个生成，节省内存)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>gen<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 36 (逐个生成，节省内存)</span>
</code></pre></div><h3 id="lambda表达式" tabindex="-1"><a class="header-anchor" href="#lambda表达式" aria-hidden="true">#</a> Lambda表达式</h3><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>lambda表达式中不能使用多分支</p></div><p><code>lambda</code>表达式：是<code>Python</code>中一种匿名函数，用关键词<code>lambda</code>定义，通常用于简化代码，特别是在需要短小函数的地方。</p><p>基本语法：<code>lambda arguments: expression</code></p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># lambda表达式和普通函数</span>
add_lambda <span class="token operator">=</span> <span class="token keyword">lambda</span> a<span class="token punctuation">,</span> b<span class="token punctuation">:</span> a <span class="token operator">+</span> b

<span class="token comment"># 和add_lambda等价</span>
<span class="token keyword">def</span> <span class="token function">add_func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b

<span class="token keyword">print</span><span class="token punctuation">(</span>add_func<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 3</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>add_lambda<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 3</span>

<span class="token comment"># lambda表达式和map函数</span>
squares <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x<span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>squares<span class="token punctuation">)</span> <span class="token comment"># [0, 1, 4]</span>
</code></pre></div><h3 id="file文件操作" tabindex="-1"><a class="header-anchor" href="#file文件操作" aria-hidden="true">#</a> File文件操作</h3><p>在<code>Python</code>中，<code>Open</code>方法用于打开一个文件，并返回文件对象。 语法格式：<code>open(file_path, mode)</code></p><div class="language-python" data-ext="py"><pre class="language-python"><code>file_path <span class="token operator">=</span> <span class="token string">&quot;./file.txt&quot;</span>

<span class="token keyword">def</span> <span class="token function">create_file</span><span class="token punctuation">(</span>file_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token triple-quoted-string string">&quot;&quot;&quot;创建一个文件&quot;&quot;&quot;</span>
  <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;Hello, World\\n&quot;</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;Hello, Python\\n&quot;</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;Hello, Vue.js\\n&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">view_file</span><span class="token punctuation">(</span>file_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token triple-quoted-string string">&quot;&quot;&quot;查看文件内容&quot;&quot;&quot;</span>
  <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 全部读取</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment"># 按行读取</span>
    <span class="token keyword">for</span> line <span class="token keyword">in</span> f<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">edit_file</span><span class="token punctuation">(</span>file_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token triple-quoted-string string">&quot;&quot;&quot;编辑文件内容(追加)&quot;&quot;&quot;</span>
  <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;Hello, React.js\\n&quot;</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;Hello, Vite\\n&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 创建文件</span>
create_file<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>

<span class="token comment"># 查看文件</span>
view_file<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>

<span class="token comment"># 编辑文件</span>
edit_file<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>

<span class="token comment"># 查看文件</span>
view_file<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>
</code></pre></div>`,36))])}const x=l(d,[["render",w],["__file","index.html.vue"]]);export{x as default};
