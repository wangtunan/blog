import{_ as n,o as a,c as s,d as p}from"./app-GLyE3c0s.js";const t={},o=p(`<h1 id="你不知道的javascript上" tabindex="-1"><a class="header-anchor" href="#你不知道的javascript上" aria-hidden="true">#</a> 你不知道的javascript上</h1><p>好书蒙尘，现在才阅读整理，罪过罪过！</p><h2 id="作用域和闭包" tabindex="-1"><a class="header-anchor" href="#作用域和闭包" aria-hidden="true">#</a> 作用域和闭包</h2><h3 id="作用域是什么" tabindex="-1"><a class="header-anchor" href="#作用域是什么" aria-hidden="true">#</a> 作用域是什么</h3><p>作用域就是根据名称来查找变量的一套规则。</p><div class="custom-container tip"><p class="custom-container-title">示例代码</p><p>var a = 2;</p></div><p>Javascript在执行一段代码之前，会经历三个步骤，统称为<strong>编译</strong></p><ul><li><strong>分词/词法分析</strong></li></ul><p>此阶段会将字符组成的字符串分解成有意义的代码块，这些代码块被称之为词法单元。 例如：示例代码可能会被分解成：<code>var，a，=，2</code>以及最后的分号</p><ul><li><strong>解析/语法分析</strong></li></ul><p>此阶段会将词法单元生成一个抽象语法树(AST)</p><ul><li><strong>代码生成</strong></li></ul><p>最后将AST转换成可执行的代码</p><p><strong>总的来说</strong>: 抛开具体细节，简单说就是将示例代码：<code>var a = 2</code>转换成一组机器指令，用来创建一个叫a的变量(包括分配内存等)，并将一个等于2的值存储在变量a中。</p><div class="custom-container tip"><p class="custom-container-title">性能优化</p><p>JavaScript引擎会在语法分析和代码生成阶段对代码进行性能优化</p></div><h3 id="编译的细节" tabindex="-1"><a class="header-anchor" href="#编译的细节" aria-hidden="true">#</a> 编译的细节</h3><ul><li><p><strong>声明(LHS操作)</strong>：当遇到<code>var a</code>时，编译器会询问作用域是否已经有一个该名称的变量存在于当前作用域的集合中。存在：则忽略该声明，继续进行编译；不存在，要求当前作用域申明一个新的变量，并命名为a</p></li><li><p><strong>赋值(RHS操作)</strong>：当遇到<code>a=2</code>这个赋值操作时，引擎会首先询问作用域，在当前作用域中是否存在一个叫a的变量。存在，使用这个变量，并赋值；不存在，继续一层一层向外层作用域查找，直到一直找到这个变量。</p></li></ul><h3 id="lhs和rhs" tabindex="-1"><a class="header-anchor" href="#lhs和rhs" aria-hidden="true">#</a> LHS和RHS</h3><h4 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h4><div class="custom-container tip"><p class="custom-container-title">定义</p><p>LHS：左侧查询变量容器本身<br> RHS：非左侧查询变量的值</p></div><h4 id="lhs案例" tabindex="-1"><a class="header-anchor" href="#lhs案例" aria-hidden="true">#</a> LHS案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 我们并不关心a具体值是多少，只是单纯想为=2这个赋值操作找一个目标，即：查找一个变量容器</span>
a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="rhs案例" tabindex="-1"><a class="header-anchor" href="#rhs案例" aria-hidden="true">#</a> RHS案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 这里没有a没有赋任何值，我们只是想找到变量a的值，进而传递给console.log()函数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="lhs和rhs综合案例" tabindex="-1"><a class="header-anchor" href="#lhs和rhs综合案例" aria-hidden="true">#</a> LHS和RHS综合案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 案例一</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">// 案例二</span>
<span class="token comment">// 隐式函数赋值 a=2即：LHS</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token comment">// 得到a的值，并传递给console.log()函数，即：RHS</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 函数调用即：RHS</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="思考" tabindex="-1"><a class="header-anchor" href="#思考" aria-hidden="true">#</a> 思考</h4><p>为什么上例中，<code>var foo，foo = function(a){console.log(a)}</code>没有指明是LHS和RHS引用呢？<br></p><p>这是因为：<strong>将函数声明简单的理解成LHS和RHS是不合适的</strong>。</p><h3 id="作用域嵌套" tabindex="-1"><a class="header-anchor" href="#作用域嵌套" aria-hidden="true">#</a> 作用域嵌套</h3><p>我们知道，所谓作用域就是根据名称查找变量的一套规则，那么变量的查找规则又是什么样子呢？<br></p><h4 id="变量查找规则" tabindex="-1"><a class="header-anchor" href="#变量查找规则" aria-hidden="true">#</a> 变量查找规则</h4><p>在理解变量查找规则前，首先应该明白，什么是作用域嵌套<br></p><p>所谓作用域嵌套就是当一个块或者函数在另一个块或者函数中时，就会发生作用域嵌套。</p><h4 id="作用域嵌套的案例" tabindex="-1"><a class="header-anchor" href="#作用域嵌套的案例" aria-hidden="true">#</a> 作用域嵌套的案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// foo作用域</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// bar作用域</span>
    <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token operator">+</span>c<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="查找规则" tabindex="-1"><a class="header-anchor" href="#查找规则" aria-hidden="true">#</a> 查找规则</h4><ul><li><p>在当前作用域中查找变量，例如上例中的变量b，没有找到时<br></p></li><li><p>往外层作用域中查找，一直到最顶层(全局作用域)为止，有则返回，无则报错(严格模式下)</p></li></ul><h3 id="异常" tabindex="-1"><a class="header-anchor" href="#异常" aria-hidden="true">#</a> 异常</h3><p><strong>LHS</strong>：如果LHS在所有作用域中查找不到，则引擎会抛出ReferenceError异常</p><p><strong>RHS</strong>：如果RHS查找不到变量，在非严格模式下，会全局变量中新建一个，严格模式下则会报错。与RHS相关的报错为TypeError，表示对这个变量的值进行了不合理的操作，例如引用了null或者undefined类型值中的属性。</p><h3 id="词语作用域" tabindex="-1"><a class="header-anchor" href="#词语作用域" aria-hidden="true">#</a> 词语作用域</h3><p>作用域分为两种最主要的工作模式</p><ul><li><p><strong>词法作用域</strong>：最普通也是最常见的模式。</p></li><li><p><strong>动态作用域</strong>：一些编程语言依然在使用。</p></li></ul><h4 id="变量的-遮蔽效应" tabindex="-1"><a class="header-anchor" href="#变量的-遮蔽效应" aria-hidden="true">#</a> 变量的&quot;遮蔽效应&quot;</h4><p>作用域会在查找到第一个匹配的标识符时停止，所用在多层作用域嵌套时，内层的变量会屏蔽掉外层的同名变量，这叫变量的<strong>遮蔽效应</strong></p><h4 id="遮蔽效应-案例" tabindex="-1"><a class="header-anchor" href="#遮蔽效应-案例" aria-hidden="true">#</a> &quot;遮蔽效应&quot;案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> <span class="token function-variable function">var</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 变量遮蔽，输出2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="访问被遮蔽的变量" tabindex="-1"><a class="header-anchor" href="#访问被遮蔽的变量" aria-hidden="true">#</a> 访问被遮蔽的变量</h4><p>一般来说，全局变量会自动的变量全局对象(window)的属性，可以借助<code>window[]</code>或者<code>window.</code>的形式访问被遮蔽的全局变量。</p><h4 id="访问被遮蔽的变量案例" tabindex="-1"><a class="header-anchor" href="#访问被遮蔽的变量案例" aria-hidden="true">#</a> 访问被遮蔽的变量案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// 变量遮蔽，输出3</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>a<span class="token punctuation">)</span>   <span class="token comment">// 访问全局对象属性a，输出2</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="欺骗词法" tabindex="-1"><a class="header-anchor" href="#欺骗词法" aria-hidden="true">#</a> 欺骗词法</h3><p>如果词法作用域完全由写代码期间函数所声明的位置来定义的话，那么有没有什么办法来修改这个词法作用域呢？</p><h4 id="eval函数" tabindex="-1"><a class="header-anchor" href="#eval函数" aria-hidden="true">#</a> eval函数</h4><p>eval函数接受一个字符串作用参数，并将其内容视为好像在书写时就存在于程序中的那个位置的代码一样。</p><h4 id="eval函数欺骗的案例" tabindex="-1"><a class="header-anchor" href="#eval函数欺骗的案例" aria-hidden="true">#</a> eval函数欺骗的案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">str，b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 欺骗，解析成var a = 3;</span>
  <span class="token function">eval</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出3，1        </span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a，b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token string">&#39;var a = 3;&#39;</span>，<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>在严格模式下，eval有自己独有的作用域，意味着其再也无法修改它所在的作用域了。</p></div><h4 id="with" tabindex="-1"><a class="header-anchor" href="#with" aria-hidden="true">#</a> with</h4><p>with通常被当做重复引用同一个对象中多个属性的快捷方式。</p><h4 id="with使用案例" tabindex="-1"><a class="header-anchor" href="#with使用案例" aria-hidden="true">#</a> with使用案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token comment">// 重复单调的引用obj</span>
obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token comment">// with快捷引用</span>
<span class="token keyword">with</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
  a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  c <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="with的缺点" tabindex="-1"><a class="header-anchor" href="#with的缺点" aria-hidden="true">#</a> with的缺点</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">with</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// obj2不存在变量a，根据变量查找规则，会在全局作用域上新建一个变量a</span>
    a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 第一个对象，存在a变量</span>
<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token comment">// 第二个对象，不存在a变量</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span>ojb1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 正确修改，输出10</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">foo</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 未正确赋值，undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// with变量泄露，输出10</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>不推荐使用with，因为在严格模式下，with被完全禁止。</p></div><h3 id="evel和with影响性能" tabindex="-1"><a class="header-anchor" href="#evel和with影响性能" aria-hidden="true">#</a> evel和with影响性能</h3><ul><li><p>JavaScript引擎会在编译阶段进行性能优化，其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定好所有变量和函数的定义位置，才能在执行过程中快速找到标识符。</p></li><li><p>如果引擎发现eval和with，它不能动态的分析代码，因此就不能做性能优化。</p></li><li><p>如果程序中出现大量的evel和with，则运行起来一定非常的慢，比起它们带来的效率所引起的性能问题，收益几乎为0</p></li></ul><h3 id="函数作用域" tabindex="-1"><a class="header-anchor" href="#函数作用域" aria-hidden="true">#</a> 函数作用域</h3><p><strong>定义</strong>：是指属于这个函数的全部变量都可以在整个函数的范围内使用及复用</p><h4 id="函数作用域隐藏内部变量和函数定义" tabindex="-1"><a class="header-anchor" href="#函数作用域隐藏内部变量和函数定义" aria-hidden="true">#</a> 函数作用域隐藏内部变量和函数定义</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出3</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 输出2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="函数隐藏内部变量和函数定义的问题" tabindex="-1"><a class="header-anchor" href="#函数隐藏内部变量和函数定义的问题" aria-hidden="true">#</a> 函数隐藏内部变量和函数定义的问题</h4><ul><li>必须声明一个具名函数(foo)，意味着foo本身也污染了它所在的作用域。</li><li>必须显示的调用这个具名函数，才能运行其中的代码。</li></ul><h4 id="解决办法-立即执行函数表达式iife" tabindex="-1"><a class="header-anchor" href="#解决办法-立即执行函数表达式iife" aria-hidden="true">#</a> 解决办法(立即执行函数表达式IIFE)</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 此处为函数表达式，不是一个函数声明</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出3</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="iife进阶用法" tabindex="-1"><a class="header-anchor" href="#iife进阶用法" aria-hidden="true">#</a> IIFE进阶用法</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// IIFE进阶用法：函数传参</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token constant">IIFE</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出3</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出2</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="匿名函数的缺点" tabindex="-1"><a class="header-anchor" href="#匿名函数的缺点" aria-hidden="true">#</a> 匿名函数的缺点</h4><ul><li>匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。</li><li>因为没有函数名，当引用自身时，会比较麻烦。</li><li>没有函数名，可读性变差了</li></ul><h4 id="解决办法" tabindex="-1"><a class="header-anchor" href="#解决办法" aria-hidden="true">#</a> 解决办法</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 始终给匿名函数一个函数名是一个很好的解决办法</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timerHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>，<span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="块作用域" tabindex="-1"><a class="header-anchor" href="#块作用域" aria-hidden="true">#</a> 块作用域</h3><h4 id="for和if没有块作用域" tabindex="-1"><a class="header-anchor" href="#for和if没有块作用域" aria-hidden="true">#</a> for和if没有块作用域</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 变量i泄露</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> bar<span class="token punctuation">;</span>
  <span class="token comment">// 输出2</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 变量bar泄露，输出1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 变量foo泄露，输出2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
</code></pre></div><h4 id="with块作用域的表现形式之一" tabindex="-1"><a class="header-anchor" href="#with块作用域的表现形式之一" aria-hidden="true">#</a> with块作用域的表现形式之一</h4><p>with从对象中创建出来的作用域仅在with声明中而非外部作用域中有效</p><h4 id="try-catch块作用域的表现形式之二" tabindex="-1"><a class="header-anchor" href="#try-catch块作用域的表现形式之二" aria-hidden="true">#</a> try/catch块作用域的表现形式之二</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">try</span><span class="token punctuation">{</span>
  <span class="token keyword">undefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// err只在catch中有效</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 报错</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="es6-let和-const块作用域的表现形式之三" tabindex="-1"><a class="header-anchor" href="#es6-let和-const块作用域的表现形式之三" aria-hidden="true">#</a> ES6 let和 const块作用域的表现形式之三</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> bar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// 输出2</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 报错</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 报错，访问不到i</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="变量、函数提升" tabindex="-1"><a class="header-anchor" href="#变量、函数提升" aria-hidden="true">#</a> 变量、函数提升</h3><h4 id="变量声明会提升到它当前作用域的顶部" tabindex="-1"><a class="header-anchor" href="#变量声明会提升到它当前作用域的顶部" aria-hidden="true">#</a> 变量声明会提升到它当前作用域的顶部</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 示例</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 提升后</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 变量声明提升</span>
  <span class="token keyword">var</span> a<span class="token punctuation">;</span>
  a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="函数声明会提升到它当前作用域的顶部" tabindex="-1"><a class="header-anchor" href="#函数声明会提升到它当前作用域的顶部" aria-hidden="true">#</a> 函数声明会提升到它当前作用域的顶部</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 先调用</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 再声明</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 输出undefined</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 提升后相当于</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 此时a没有赋值，为undefined</span>
  <span class="token keyword">var</span> a<span class="token punctuation">;</span>
  <span class="token comment">// 输出undefined;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// a变量正式赋值</span>
  a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 函数调用</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="函数表达式不会被提升" tabindex="-1"><a class="header-anchor" href="#函数表达式不会被提升" aria-hidden="true">#</a> 函数表达式不会被提升</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 先调用，报错TypeError</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;fun foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="函数会优先变量首先提升" tabindex="-1"><a class="header-anchor" href="#函数会优先变量首先提升" aria-hidden="true">#</a> 函数会优先变量首先提升</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 先调用</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 声明foo变量</span>
<span class="token keyword">var</span> foo<span class="token punctuation">;</span>
<span class="token comment">// 声明foo函数</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 声明foo表达式</span>
<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">// 提升后相当于</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出1</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 重复声明，忽略</span>
<span class="token keyword">var</span> foo<span class="token punctuation">;</span>

<span class="token comment">// 声明foo表达式</span>
<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo表达式覆盖前面的foo函数，输出2</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="作用域闭包" tabindex="-1"><a class="header-anchor" href="#作用域闭包" aria-hidden="true">#</a> 作用域闭包</h3><p><strong>定义</strong>：当一个函数能够记住并访问它所在的词法作用域时，就产生了闭包，即使函数是在词法作用域之外执行</p><h4 id="闭包的第一种表现形式" tabindex="-1"><a class="header-anchor" href="#闭包的第一种表现形式" aria-hidden="true">#</a> 闭包的第一种表现形式</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a  <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">// 这就是闭包</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出2，而不是1</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="闭包的第二种表现形式" tabindex="-1"><a class="header-anchor" href="#闭包的第二种表现形式" aria-hidden="true">#</a> 闭包的第二种表现形式</h4><p><strong>函数传递</strong>：无论通过何种手段将内部函数传递到它所在词法作用域之外，它都会持有队原始作用域的引用，无论在何处执行这个函数，都会产生闭包</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">bar</span><span class="token punctuation">(</span>baz<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 这就是闭包</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出2，而不是1</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="闭包的第三种表现形式" tabindex="-1"><a class="header-anchor" href="#闭包的第三种表现形式" aria-hidden="true">#</a> 闭包的第三种表现形式</h4><p><strong>回调函数</strong>：在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定时器</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timeHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;timer&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>，<span class="token number">100</span><span class="token punctuation">)</span>

<span class="token comment">// 事件监听</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#container&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;DOM Listener&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="一个非典型的闭包案例" tabindex="-1"><a class="header-anchor" href="#一个非典型的闭包案例" aria-hidden="true">#</a> 一个非典型的闭包案例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token constant">IIFE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 输出2</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>为什么说是一个非典型的闭包案例？<br></p><ul><li>首先IIFE函数并不是在它本身词法作用域之外执行</li><li>其次变量a是通过普通的词法作用域查找而来，而不是闭包被发现</li></ul><p><strong>那么，IIFE到底是不是一个闭包？</strong><br> 是，IIFE的确创建了闭包。</p><h3 id="循环和闭包" tabindex="-1"><a class="header-anchor" href="#循环和闭包" aria-hidden="true">#</a> 循环和闭包</h3><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 经典for循环+闭包案例</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>，i<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">预期结果(错的)</p><p>分别输出数字1-5，每秒一次，每次一个</p></div><div class="custom-container tip"><p class="custom-container-title">实际结果</p><p>每秒一次，每次一个，输出5个6</p></div><h4 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h4><ul><li>for循环，创建6个定时器，循环完毕后，i等于6</li><li>执行每一个定时器，输出i，而i此时等于6</li></ul><h4 id="改进一" tabindex="-1"><a class="header-anchor" href="#改进一" aria-hidden="true">#</a> 改进一</h4><p>使用IIFE立即执行函数表达式来创建闭包</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 改进一: 使用IIFE</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>，i<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">预期结果(错的)</p><p>分别输出数字1-5，每秒一次，每次一个</p></div><div class="custom-container tip"><p class="custom-container-title">实际结果</p><p>每秒一次，每次一个，输出5个6</p></div><h4 id="原因-1" tabindex="-1"><a class="header-anchor" href="#原因-1" aria-hidden="true">#</a> 原因</h4><ul><li>IIFE虽然创建了闭包作用域，但创建的的闭包作用域是空的</li><li>变量i依然是通过词法作用域向外查找，即i等于6</li></ul><h4 id="改进二" tabindex="-1"><a class="header-anchor" href="#改进二" aria-hidden="true">#</a> 改进二</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 改进二: 使用IIFE，在闭包作用域中缓存变量</span>
<span class="token comment">// 结果：正确依次输出1 2 3 4 5 </span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>，i<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="改进三" tabindex="-1"><a class="header-anchor" href="#改进三" aria-hidden="true">#</a> 改进三</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 改进三: 使用IIFE，闭包传参</span>
<span class="token comment">// 结果：正确依次输出1 2 3 4 5 </span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>，i<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="改进四" tabindex="-1"><a class="header-anchor" href="#改进四" aria-hidden="true">#</a> 改进四</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 改进四: 使用IIFE + let最优解</span>
<span class="token comment">// 结果：正确依次输出1 2 3 4 5 </span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>，i<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="闭包的模块模式" tabindex="-1"><a class="header-anchor" href="#闭包的模块模式" aria-hidden="true">#</a> 闭包的模块模式</h3><p>要形成模块模式则需要两个必要的条件</p><ul><li>必须有外部的封闭函数，该函数至少被调用一次</li><li>封闭函数内部必须至少返回一个内部函数，这样才能在封闭函数作用域中形成闭包</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 一个闭包模块的案例</span>
<span class="token keyword">function</span> <span class="token function">CoolModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> a
  <span class="token keyword">function</span> <span class="token function">_foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">_bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 必要条件二：返回内部函数</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> _foo，
    <span class="token literal-property property">bar</span><span class="token operator">:</span> _bar
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 必要条件一：被调用</span>
<span class="token keyword">var</span> fun <span class="token operator">=</span> <span class="token function">CoolModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fun<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
fun<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
</code></pre></div><h4 id="闭包模块的单例模式" tabindex="-1"><a class="header-anchor" href="#闭包模块的单例模式" aria-hidden="true">#</a> 闭包模块的单例模式</h4><p>在上例中，封闭函数每被调用一次，都会创建一个新的模块实例，如何达到单例的目的呢<br> 可以使用IIFE把封闭函数包裹起来，已达到单例的目的</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 模块的单例模式</span>
<span class="token keyword">var</span> fun <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">CoolModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> a
  <span class="token keyword">function</span> <span class="token function">_foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">_bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 必要条件二：返回内部函数</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> _foo，
    <span class="token literal-property property">bar</span><span class="token operator">:</span> _bar
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fun<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
fun<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
</code></pre></div><h2 id="this和对象原型" tabindex="-1"><a class="header-anchor" href="#this和对象原型" aria-hidden="true">#</a> this和对象原型</h2><h3 id="默认绑定" tabindex="-1"><a class="header-anchor" href="#默认绑定" aria-hidden="true">#</a> 默认绑定</h3><p><strong>默认绑定</strong>：独立函数调用，也可以理解成无法应用于其他规则时的默认规则</p><h4 id="默认绑定示例" tabindex="-1"><a class="header-anchor" href="#默认绑定示例" aria-hidden="true">#</a> 默认绑定示例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// this的默认绑定</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出2</span>
</code></pre></div><h4 id="示例解析" tabindex="-1"><a class="header-anchor" href="#示例解析" aria-hidden="true">#</a> 示例解析</h4><ul><li>foo是直接使用，不带任何修饰的函数引用而进行的函数调用</li><li>foo调用位置是全局作用域，此时this指向window，this.a即等于window.a</li></ul><div class="custom-container danger"><p class="custom-container-title">注意</p><p>在严格模式下，不能将全局对象用于默认绑定，此时this会绑定到undefined</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// this的默认绑定(严格模式下)</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token string">&#39;use strict&#39;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 报错</span>
</code></pre></div><h3 id="隐式绑定" tabindex="-1"><a class="header-anchor" href="#隐式绑定" aria-hidden="true">#</a> 隐式绑定</h3><p><strong>隐式绑定</strong>：函数调用的位置有上下文对象，即函数被某个对象拥有或者包含</p><h4 id="隐式绑定的示例形式一" tabindex="-1"><a class="header-anchor" href="#隐式绑定的示例形式一" aria-hidden="true">#</a> 隐式绑定的示例形式一</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// this的隐式绑定</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出2</span>
</code></pre></div><h4 id="示例解析-1" tabindex="-1"><a class="header-anchor" href="#示例解析-1" aria-hidden="true">#</a> 示例解析</h4><ul><li>foo函数的调用形式是对象obj调用</li><li>foo函数被对象obj所拥有，此时this指向obj对象本身，this.a即等于obj.a</li></ul><div class="custom-container warning"><p class="custom-container-title">注意</p><p>在对象属性的引用链上，只有在最后一层中，隐式绑定才起作用</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 对象引用链上有多层</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">32</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">obj2</span><span class="token operator">:</span> obj2
<span class="token punctuation">}</span>
obj1<span class="token punctuation">.</span>obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出32</span>
</code></pre></div><div class="custom-container danger"><p class="custom-container-title">注意</p><p>隐式绑定在某些情况下回发生丢失this的情况</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 隐式绑定丢失this的情况一</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> obj<span class="token punctuation">.</span>foo
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出3，而不是2</span>
</code></pre></div><h4 id="丢失this的原因分析" tabindex="-1"><a class="header-anchor" href="#丢失this的原因分析" aria-hidden="true">#</a> 丢失this的原因分析</h4><ul><li>var bar = obj.foo是用过函数别名来赋值的，即var bar = foo</li><li>bar的调用方式是独立函数调用</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 隐式绑定丢失this的情况二</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">dooFoo</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span>
<span class="token function">dooFoo</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出3，而不是2</span>
</code></pre></div><h4 id="丢失this的原因分析-1" tabindex="-1"><a class="header-anchor" href="#丢失this的原因分析-1" aria-hidden="true">#</a> 丢失this的原因分析</h4><ul><li>obj.foo通过参数传递，实质依然是通过别名传递，即dooFoo(foo)</li><li>dooFoo的调用方式是独立函数调用</li></ul><h3 id="显示绑定" tabindex="-1"><a class="header-anchor" href="#显示绑定" aria-hidden="true">#</a> 显示绑定</h3><p><strong>显示绑定</strong>：不在对象内部包含一个函数，通过call，apply以及bind形式强制进行函数调用</p><h4 id="显示绑定示例一-call-apply" tabindex="-1"><a class="header-anchor" href="#显示绑定示例一-call-apply" aria-hidden="true">#</a> 显示绑定示例一：call，apply</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// call显示绑定this</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出1</span>
</code></pre></div><h4 id="硬绑定解决this丢失问题" tabindex="-1"><a class="header-anchor" href="#硬绑定解决this丢失问题" aria-hidden="true">#</a> 硬绑定解决this丢失问题</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 硬绑定解决this丢失问题</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">doFoo</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出2，而不是3</span>
<span class="token function">doFoo</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出2，而不是3</span>
</code></pre></div><h4 id="显示绑定bind的由来" tabindex="-1"><a class="header-anchor" href="#显示绑定bind的由来" aria-hidden="true">#</a> 显示绑定bind的由来</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 一个简单的赋值硬绑定辅助函数</span>
<span class="token keyword">function</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">fn，obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj，arguments<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于硬绑定是一种非常常用的模式，ES5集成在Function.prototype.bind上</p><h4 id="显示绑定示例二-bind" tabindex="-1"><a class="header-anchor" href="#显示绑定示例二-bind" aria-hidden="true">#</a> 显示绑定示例二： bind</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// bind显示绑定</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> value
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出2： 1+1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出4： 1+3</span>
</code></pre></div><h3 id="new绑定" tabindex="-1"><a class="header-anchor" href="#new绑定" aria-hidden="true">#</a> new绑定</h3><p><strong>一个关于new的误解</strong>：<code>var stu = new Student()</code>，new操作符只是一个对Student构造函数的调用而已，更准确来说，不叫构造函数，而应该叫构造调用。</p><h4 id="new调用函数的过程" tabindex="-1"><a class="header-anchor" href="#new调用函数的过程" aria-hidden="true">#</a> new调用函数的过程</h4><ol><li>创建一个全新的对象</li><li>新对象进行[[Prototype]]链接</li><li>新对象绑定到函数调用的this</li><li>如果函数没有返回其他对象，则默认返回这个新对象</li></ol><h4 id="new绑定的示例" tabindex="-1"><a class="header-anchor" href="#new绑定的示例" aria-hidden="true">#</a> new绑定的示例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// new绑定的示例</span>
<span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
</code></pre></div><h3 id="四种绑定的优先级" tabindex="-1"><a class="header-anchor" href="#四种绑定的优先级" aria-hidden="true">#</a> 四种绑定的优先级</h3><h4 id="显示绑定和隐式绑定的优先级" tabindex="-1"><a class="header-anchor" href="#显示绑定和隐式绑定的优先级" aria-hidden="true">#</a> 显示绑定和隐式绑定的优先级</h4><div class="custom-container tip"><p class="custom-container-title">结论</p><p>显示绑定的优先级比隐式绑定的优先级高</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 显示绑定比隐式绑定优先级高的例子</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>

<span class="token comment">// 隐式绑定</span>
obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>

<span class="token comment">// 显示绑定</span>
obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
</code></pre></div><h4 id="new绑定和隐式绑定的优先级" tabindex="-1"><a class="header-anchor" href="#new绑定和隐式绑定的优先级" aria-hidden="true">#</a> new绑定和隐式绑定的优先级</h4><div class="custom-container tip"><p class="custom-container-title">结论</p><p>new绑定的优先级比隐式绑定的优先级高</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// new绑定比隐式绑定的优先级高的例子</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>

<span class="token comment">// 隐式绑定</span>
obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>

<span class="token comment">// new绑定</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">obj1<span class="token punctuation">.</span>foo</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出4</span>
</code></pre></div><h4 id="new绑定和显示绑定的优先级" tabindex="-1"><a class="header-anchor" href="#new绑定和显示绑定的优先级" aria-hidden="true">#</a> new绑定和显示绑定的优先级</h4><div class="custom-container tip"><p class="custom-container-title">结论</p><p>new绑定的优先级比显示绑定的优先级高</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// new绑定比显示绑定优先级高的例子</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 显示绑定</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>

<span class="token comment">// new绑定</span>
<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bar</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>baz<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出4</span>
</code></pre></div><p><strong>分析</strong>：在代码<code>var baz = new bar(4)</code>中，出乎意料之外的是，obj.a并没有被修改成4，依旧是2。这是因为在bind函数内部，遇到new操作符时，创建了一个新的this，把原来的this替换掉了。</p><h3 id="this绑定判断规则" tabindex="-1"><a class="header-anchor" href="#this绑定判断规则" aria-hidden="true">#</a> this绑定判断规则</h3><ol><li>函数是否在new中被调用，是则属于new绑定，this指向新创建的对象<br><code>var bar = new foo()</code></li><li>函数是否通过call，apply或者bind调用，是则属于显示绑定，this指向指定的对象<br><code>var bar = foo.call(obj)</code></li><li>函数是否在某个上下文对象中调用，则则属于隐式绑定，this指向这个上下文对象<br><code>var bar = obj.foo()</code></li><li>如果以上都不是，则使用默认绑定，严格模式下，绑定到undefined，非严格模式下绑定到全局对象window<br><code>var bar = foo()</code></li></ol><h3 id="绑定例外" tabindex="-1"><a class="header-anchor" href="#绑定例外" aria-hidden="true">#</a> 绑定例外</h3><h4 id="绑定例外一-忽略this" tabindex="-1"><a class="header-anchor" href="#绑定例外一-忽略this" aria-hidden="true">#</a> 绑定例外一：忽略this</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><code>null</code>或者<code>undefined</code>作为this的绑定对象传入<code>call</code>，<code>apply</code>或者<code>bind</code>时，在调用时会被忽略，实际应用的是默认绑定规则</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 绑定例外</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
</code></pre></div><h5 id="绑定例外一的运用-展开一个数组" tabindex="-1"><a class="header-anchor" href="#绑定例外一的运用-展开一个数组" aria-hidden="true">#</a> 绑定例外一的运用：展开一个数组</h5><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// apply展开一个数组的例子</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a，b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;a:&quot;</span><span class="token operator">+</span>a<span class="token operator">+</span><span class="token string">&#39;，b:&#39;</span><span class="token operator">+</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span>，<span class="token punctuation">[</span><span class="token number">1</span>，<span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出a:1，b:10</span>
</code></pre></div><h5 id="绑定例外一的运用-柯里化" tabindex="-1"><a class="header-anchor" href="#绑定例外一的运用-柯里化" aria-hidden="true">#</a> 绑定例外一的运用：柯里化</h5><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>柯里化：预设一些参数</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// bind柯里化</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a，b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;a:&quot;</span><span class="token operator">+</span>a<span class="token operator">+</span><span class="token string">&#39;，b:&#39;</span><span class="token operator">+</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 预设参数：a=1</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span>，<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 真正调用</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 输出a:1，b:2</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 输出a:1，b:8</span>
</code></pre></div><h5 id="object-create" tabindex="-1"><a class="header-anchor" href="#object-create" aria-hidden="true">#</a> Object.create</h5><p>由于绑定例外一确实使用了this，当传入<code>null</code>或者<code>undefined</code>时，在非严格模式下，this指向的是全局对象window，这有时候会造成一些难以追踪的bug<br></p><h5 id="世纪之问-真假美猴王" tabindex="-1"><a class="header-anchor" href="#世纪之问-真假美猴王" aria-hidden="true">#</a> 世纪之问，真假美猴王</h5><p><code>var obj = {}</code>和<code>var obj2 = Object.create(null)</code>谁才是真正的空对象？</p><p><strong>解答</strong>：</p><ul><li><code>var obj = {}</code>创建了一个&#39;空对象&#39;，他表面上没有任何属性，但是obj的原型指向Object，Object上的属性和方法依旧被obj所继承，所以obj不是一个真正的空对象。</li><li><code>var obj2 = Object.create(null)</code>通过<code>Object.create()</code>并不会常见<code>Object.prototype</code>这个委托，隐藏obj2是一个真正的空对象，vue.js源码中，大量使用了<code>Object.create()</code>来创建对象</li></ul><h5 id="优化绑定例外一" tabindex="-1"><a class="header-anchor" href="#优化绑定例外一" aria-hidden="true">#</a> 优化绑定例外一</h5><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 优化绑定例外的例子</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a，b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;a:&quot;</span><span class="token operator">+</span>a<span class="token operator">+</span><span class="token string">&#39;，b:&#39;</span><span class="token operator">+</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建一个真正的空对象o</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 扩展参数</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>o，<span class="token punctuation">[</span><span class="token number">1</span>，<span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出a:1，b:2</span>

<span class="token comment">// 柯里化：预设a=1</span>
<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>o，<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">baz</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出a:1，b:8</span>
<span class="token function">baz</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出a:1，b:10</span>
</code></pre></div><h4 id="绑定例外二-间接引用" tabindex="-1"><a class="header-anchor" href="#绑定例外二-间接引用" aria-hidden="true">#</a> 绑定例外二：间接引用</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 绑定例外二的例子</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span>，
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">4</span>
<span class="token punctuation">}</span>
o<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 隐式绑定，输出3</span>
<span class="token punctuation">(</span>p<span class="token punctuation">.</span>foo <span class="token operator">=</span> o<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 默认绑定，this指向全局对象window，输出2</span>
</code></pre></div><h5 id="绑定例外分析" tabindex="-1"><a class="header-anchor" href="#绑定例外分析" aria-hidden="true">#</a> 绑定例外分析</h5><ul><li><code>p.foo = o.foo</code>是一个赋值表达式，它返回的是foo函数的引用，此时的调用位置是全局，即：相当于直接使用<code>foo()</code>函数调用</li><li>在非严格模式下，独立函数调用，this指向全局window，此时window.a值为2</li></ul><h2 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h2><h3 id="两种定义方式" tabindex="-1"><a class="header-anchor" href="#两种定义方式" aria-hidden="true">#</a> 两种定义方式</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><strong>声明形式</strong>：是常用的定义方式，在此定义方式中，你可以一次添加多个键/值对<br><strong>构造形式</strong>：是非常少见的，在此定义方式中，你必须逐个添加属性</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 方式一：声明形式</span>
<span class="token keyword">var</span> myObj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span>，
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">12</span>，
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&#39;广东&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 方式二：构造形式</span>
<span class="token keyword">var</span> myObj2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myObj2<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">;</span>
myObj2<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
myObj2<span class="token punctuation">.</span>address <span class="token operator">=</span> <span class="token string">&#39;广东&#39;</span>
</code></pre></div><h3 id="基本类型" tabindex="-1"><a class="header-anchor" href="#基本类型" aria-hidden="true">#</a> 基本类型</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><strong>基本类型</strong>：本身并不是对象</p></div><ol><li>string</li><li>number</li><li>boolean</li><li>null</li><li>undefined</li><li>object</li></ol><h3 id="内置对象" tabindex="-1"><a class="header-anchor" href="#内置对象" aria-hidden="true">#</a> 内置对象</h3><ol><li>String</li><li>Number</li><li>Boolean</li><li>Object</li><li>Function</li><li>Array</li><li>Date</li><li>RegExp</li><li>Error</li></ol><h3 id="为什么-abc-length可以正常使用" tabindex="-1"><a class="header-anchor" href="#为什么-abc-length可以正常使用" aria-hidden="true">#</a> 为什么<code>&#39;ABC&#39;.length</code>可以正常使用</h3><p>思考：<code>var str = &#39;ABC&#39;</code>，str为一个字面量，而已知一个字面量是不能像对象一样拥有属性和方法的，但为什么能被正确使用？</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 字符串字面量访问属性和方法</span>
<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">&#39;ABC&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 输出3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 输出B</span>
<span class="token comment">// 数字访问方法</span>
<span class="token keyword">var</span> number <span class="token operator">=</span> <span class="token number">42.359</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>number<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出42.36</span>
</code></pre></div><h4 id="问题解答" tabindex="-1"><a class="header-anchor" href="#问题解答" aria-hidden="true">#</a> 问题解答</h4><p><strong>解答</strong>：引擎会自动把字面量转换成对应的对象，所以可以访问对象的属性和方法<br><code>&#39;ABC&#39;.length</code> 相当于 <code>new String(&#39;ABC&#39;).length</code><br><code>42.359.toFixed(2)</code> 相当于 <code>new Number(42.359).toFixed(2)</code></p><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>对于布尔字面量也是如此<br></li><li><code>null</code> 和 <code>undefined</code> 没有对应的构造形式，只有文字形式<br></li><li><code>Date</code>只有构造形式，没有对应的文字形式<br></li><li><code>Object</code>，<code>Function</code>，<code>Array</code>和<code>RegExp</code>这几种类型，无论使用文字形式还是构造形式，他们都是对象，不是字面量</li></ol></div><h3 id="对象属性的访问方式" tabindex="-1"><a class="header-anchor" href="#对象属性的访问方式" aria-hidden="true">#</a> 对象属性的访问方式</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>无论是哪种访问方式，属性名永远都是字符串(ES6之前)<br> 当使用非字符串作为属性时，会自动转换到其对应的字符串形式</p></div><ol><li>.操作符的属性访问方式</li><li>[]操作符的键访问方式</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token comment">// 属性访问方式</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
<span class="token comment">// 键访问方式</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出2</span>
</code></pre></div><h4 id="两种访问方式的却别" tabindex="-1"><a class="header-anchor" href="#两种访问方式的却别" aria-hidden="true">#</a> 两种访问方式的却别</h4><ul><li>属性访问方式，要求属性的命名必须满足标识符的命名规范。</li><li>键访问方式，任意UTF-8/Unicode的字符串即可。</li></ul><h3 id="浅拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝" aria-hidden="true">#</a> 浅拷贝</h3><p><strong>思考</strong>：如何准确的复制一个对象</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 思考，如何准确的拷贝myObject对象</span>
<span class="token keyword">function</span> <span class="token function">anotherFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;this is a function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> anotherObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span><span class="token string">&#39;AAA&#39;</span>，
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> anotherArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> anotherFunction，
  <span class="token literal-property property">c</span><span class="token operator">:</span> anotherObject，
  <span class="token literal-property property">d</span><span class="token operator">:</span> anotherArray
<span class="token punctuation">}</span>
<span class="token keyword">var</span> anotherArray <span class="token operator">=</span> <span class="token punctuation">[</span>anotherObject，myObject<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><strong>浅拷贝</strong>：复制出新对象，其中新对象a值=旧对象的a值，新对象b，c，d属性的引用=旧对象中b，c，d的引用</p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>浅拷贝无法复制出anotherArray数组中的引用，深拷贝才可以。</p></div><h4 id="浅拷贝的实现方法一-json格式化对象" tabindex="-1"><a class="header-anchor" href="#浅拷贝的实现方法一-json格式化对象" aria-hidden="true">#</a> 浅拷贝的实现方法一：JSON格式化对象</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>此种方法要求对象满足能够被JSON安全的解析<br> 例如如果对象中某一属性是一个函数的引用，则该属性解析结果是undefined，函数具体内容不会被解析出来</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// JSON格式化对象实现浅拷贝</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span>，
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token keyword">null</span>，
  <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token keyword">undefined</span>，
  <span class="token function-variable function">f</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;this is function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> newObj <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出&#39;AAA&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出undefined，f属性中的函数引用不能被JSON安全的解析出来</span>
</code></pre></div><h4 id="浅拷贝的实现方法一-object-assign" tabindex="-1"><a class="header-anchor" href="#浅拷贝的实现方法一-object-assign" aria-hidden="true">#</a> 浅拷贝的实现方法一： Object.assign()</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>Object.assign()遍历源对象中所有可枚举的键，并使用<code>=</code>操作符赋值到目标对象</li><li>对象中属性的特性(例如writable)，不能被复制到目标对象</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ES6 Object.assign() 实现浅拷贝</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token string">&#39;AAA&#39;</span>，
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token keyword">null</span>，
  <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token keyword">undefined</span>，
  <span class="token function-variable function">f</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;this is function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> newObj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>，obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出&#39;AAA&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出ƒ (){console.log(&#39;this is function&#39;)}</span>
</code></pre></div><h3 id="属性描述符" tabindex="-1"><a class="header-anchor" href="#属性描述符" aria-hidden="true">#</a> 属性描述符</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>通过<code>Object.defineProperty()</code>来操作属性的值或属性的特性</p></div><ol><li>writable(可写)</li><li>enumerable(可枚举)</li><li>configurable(可配置)</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object.defineProperty()添加新属性和特性配置</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;name&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>，
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span>， <span class="token comment">// 默认</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>， <span class="token comment">// 默认</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 默认</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出www</span>
</code></pre></div><h4 id="writable" tabindex="-1"><a class="header-anchor" href="#writable" aria-hidden="true">#</a> writable</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>writable决定是否可以修改属性的值</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// writable决定是否可以修改属性的值</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;name&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>，
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 不可修改name的值</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
myObject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">;</span>  <span class="token comment">// name的第二次赋值无效，严格模式下会报错，TypeError</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出www</span>
</code></pre></div><h4 id="configurable属性可配置的" tabindex="-1"><a class="header-anchor" href="#configurable属性可配置的" aria-hidden="true">#</a> configurable属性可配置的</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>configurable决定属性是否可以通过Object.defineProperty()配置<br></li><li>configurable一旦设置成false，则无法撤销<br></li><li>configurable为false时，会禁止delete删除该属性<br></li><li>不可配置的意思是：不能通过Object.defineProperty()来进行属性配置，但属性正常形式的赋值还是可以的</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// configurable决定属性是否可以通过Object.defineProperty()配置</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
myObject<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出3</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;a&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">4</span>，
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 不可配置</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出4</span>

myObject<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出5，属性不可配置，但依然可以正常赋值</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;a&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">6</span>，
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 报错，TypeError</span>
</code></pre></div><h4 id="enumerable属性可枚举" tabindex="-1"><a class="header-anchor" href="#enumerable属性可枚举" aria-hidden="true">#</a> enumerable属性可枚举</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>属性可枚举(enumerable)的意思是：能够通过<code>for..in</code>循环遍历到该属性，为true是可以遍历到，false时无法遍历</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// enumerable属性可枚举</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>，
  <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token string">&#39;女&#39;</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;age&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">18</span>，
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 女生的年龄是不能随便知道的</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 遍历对象</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 依次输出www 女</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="对象的常量属性" tabindex="-1"><a class="header-anchor" href="#对象的常量属性" aria-hidden="true">#</a> 对象的常量属性</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><strong>对象的常量属性</strong>：该属性不可修改，不可重定义或者不可被删除</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 对象的常量属性</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject， <span class="token string">&#39;CONST_NUMBER&#39;</span>， <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">42</span>，
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span>， <span class="token comment">// 不可修改</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 不可配置，不可删除</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token constant">CONST_NUMBER</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出42</span>
myObject<span class="token punctuation">.</span><span class="token constant">CONST_NUMBER</span> <span class="token operator">=</span> <span class="token number">45</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
<span class="token keyword">delete</span> myObject<span class="token punctuation">.</span><span class="token constant">CONST_NUMBER</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token constant">CONST_NUMBER</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出42，常量属性依然在</span>
</code></pre></div><h3 id="禁止扩展对象" tabindex="-1"><a class="header-anchor" href="#禁止扩展对象" aria-hidden="true">#</a> 禁止扩展对象</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><strong>禁止扩展对象</strong>：意思是，一旦设置了对象禁止扩展，则不能再添加新的属性</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 禁止扩展对象</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>，
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">12</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">preventExtensions</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 禁止扩展对象myObject</span>
myObject<span class="token punctuation">.</span>sex <span class="token operator">=</span> <span class="token string">&#39;女&#39;</span> <span class="token comment">// 非严格模式下，失败；严格模式下，报错TypeError</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出{name:&#39;www&#39;，age:12}，sex属性不存在</span>
</code></pre></div><h3 id="object-seal-和object-freeze" tabindex="-1"><a class="header-anchor" href="#object-seal-和object-freeze" aria-hidden="true">#</a> Object.seal()和Object.freeze()</h3><h4 id="object-seal-密封对象" tabindex="-1"><a class="header-anchor" href="#object-seal-密封对象" aria-hidden="true">#</a> Object.seal()密封对象</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>对象密封后，不能添加新的属性，不能重新配置也不能删除现有属性<br></li><li>可以修改现有属性的值</li><li>Object.seal()依次调用对象属性的Object.preventExtensions()方法</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object.seal()密封对象</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>，
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span>，
  <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token string">&#39;女&#39;</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 输出false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">delete</span> myObject<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token comment">// 输出{name:&#39;www&#39;，age: 23，sex:&#39;女&#39;}，name属性依然存在</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span>

<span class="token comment">// address属性添加失败，严格模式下报错TypeError</span>
myObject<span class="token punctuation">.</span>address <span class="token operator">=</span> <span class="token string">&#39;广州&#39;</span>
<span class="token comment">// 输出{name:&#39;www&#39;，age: 23，sex:&#39;女&#39;}，address属性添加失败</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 报错，TypeError</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;name&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="object-freeze-冻结对象" tabindex="-1"><a class="header-anchor" href="#object-freeze-冻结对象" aria-hidden="true">#</a> Object.freeze()冻结对象</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>对象冻结后，不能修改对象属性上的值</li><li>Object.freeze() 调用Object.seal()并把所有属性的writable修改为false</li><li>这是一个浅冻结，如果对象里还有对象，则对象的对象不收冻结影响</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object.freeze()冻结对象</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 赋值失败，严格模式下，报错TypeError</span>
myObject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 输出{name:&#39;www&#39;}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 报错TypeError</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;name&#39;</span>，<span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;BBB&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="属性的getter和setter" tabindex="-1"><a class="header-anchor" href="#属性的getter和setter" aria-hidden="true">#</a> 属性的Getter和Setter</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>getter和setter是一个隐藏函数，分别在获取属性值和设置属性值时被调用</li><li>一旦设置了getter和setter，该属性的value和writable则自动忽略</li><li>getter和setter通常是成对出现的</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取属性值getter和setter</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
myObject<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment">// 输出2，因为a属性只定义了getter，没有定义setter，赋值无效</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，<span class="token string">&#39;b&#39;</span>，<span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_b_<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>，
  <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_b_ <span class="token operator">=</span> val<span class="token operator">*</span><span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>，
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
myObject<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment">// 输出9，3*3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="判断某个属性是否存在" tabindex="-1"><a class="header-anchor" href="#判断某个属性是否存在" aria-hidden="true">#</a> 判断某个属性是否存在</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><strong>in</strong>：判断某个属性是否存在对象以及对象的原型链上<br><strong>hasOwnProperty</strong>：判断对象中是否存在某个属性</p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>in操作符在判断某个值是否存在数组时，判断的属性名是数组的下标，而非值<br><code>4 in [2，4，6]</code>返回false，因为数组<code>[2，4，6]</code>的属性名是<code>0，1，2</code></p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><ul><li>如果某个对象没有链接到Object.prototype，则不能直接使用hasOwnProperty方法来进行属性判断</li><li>这时可以通过Object.prototype.hasOwnProperty.call(myObject，&#39;xxx&#39;)的形式来判断</li></ul></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 判断某个属性是否存在</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span> <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span> <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出false</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// obj没有进行[[Prototype]]原型委托，所以没有hasOwnProperty方法</span>
obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;why&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 true</span>
</code></pre></div><h3 id="遍历的本质" tabindex="-1"><a class="header-anchor" href="#遍历的本质" aria-hidden="true">#</a> 遍历的本质</h3><h4 id="数组遍历" tabindex="-1"><a class="header-anchor" href="#数组遍历" aria-hidden="true">#</a> 数组遍历</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>for循环遍历下标</li><li>forEach()，every()，some()等辅助迭代器遍历值</li><li>for of遍历(ES6)</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 数组遍历</span>
<span class="token keyword">var</span> myArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span>， <span class="token number">2</span>， <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token comment">// 依次输出1 2 3</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>myArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 依次输出1 0 ，2 1，3 2</span>
myArray<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">item，index</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item，index<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 依次输出1 2 3</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> val <span class="token keyword">of</span> myArray<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p><code>for..of</code>遍历的本质：通过调用迭代器对象的next()方法来遍历所有返回的值，数组有内置的<code>@@iterator</code>，所以可以直接使用</p></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 手动进行数组的遍历</span>
<span class="token keyword">var</span> myArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span>， <span class="token number">2</span>， <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 获取数组内置的迭代器对象</span>
<span class="token keyword">var</span> it <span class="token operator">=</span> myArray<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{value:1，done:false}</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{value:2，done:false}</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{value:3，done:false}</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{value:undefined，done:true}</span>
</code></pre></div><h4 id="对象for-of遍历" tabindex="-1"><a class="header-anchor" href="#对象for-of遍历" aria-hidden="true">#</a> 对象<code>for..of</code>遍历</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><ol><li>定义对象迭代器，实现<code>for..of</code>遍历</li><li><code>for in</code>遍历</li></ol></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 对象\`for..of\`遍历</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject，Symbol<span class="token punctuation">.</span>iterator，<span class="token punctuation">{</span>
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span>，
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span>，
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span><span class="token comment">// 保存this</span>
    <span class="token keyword">var</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 当前遍历的索引</span>
    <span class="token keyword">var</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>_this<span class="token punctuation">)</span> <span class="token comment">// 当前对象所有的属性</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> _this<span class="token punctuation">[</span>keys<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">]</span>，
          <span class="token literal-property property">done</span><span class="token operator">:</span> index<span class="token operator">&gt;</span>keys<span class="token punctuation">.</span>length
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// for..of遍历对象</span>
<span class="token comment">// 依次输出1 true www</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> val <span class="token keyword">of</span> myObject<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 对象for..in遍历</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>，
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token boolean">true</span>，
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">&#39;www&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 依次输出1 true www</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div>`,294),e=[o];function c(l,u){return a(),s("div",null,e)}const k=n(t,[["render",c],["__file","know-up.html.vue"]]);export{k as default};
