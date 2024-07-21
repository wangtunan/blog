import{_ as e}from"./6-1115dd9e.js";import{_ as p,r as c,o as l,c as u,a as s,b as n,e as t,d as o}from"./app-302f5f8c.js";const i={},k=o('<h1 id="nexttick实现原理" tabindex="-1"><a class="header-anchor" href="#nexttick实现原理" aria-hidden="true">#</a> nextTick实现原理</h1><p>在使用<code>Vue.js</code>开发的时候，如果我们要根据数据状态操作正确的<code>DOM</code>，那么我们一定和<code>nextTick()</code>方法打过交道，它是<code>Vue.js</code>中一个比较核心的一个方法，在这一章节中我们来介绍<code>Vue.js</code>中<code>nextTick</code>是如何实现的。</p><h2 id="异步知识" tabindex="-1"><a class="header-anchor" href="#异步知识" aria-hidden="true">#</a> 异步知识</h2><p>由于<code>nextTick</code>涉及到许多与异步相关联的知识，因此为了降低学习难度，我们先来介绍这些异步知识。</p><h3 id="event-loop" tabindex="-1"><a class="header-anchor" href="#event-loop" aria-hidden="true">#</a> Event Loop</h3><p>我们都知道<code>JavaScript</code>是单线程的，它是基于<code>Event Loop</code>事件循环来执行的，<code>Event Loop</code>在执行的时候遵循一定的规则：所有同步任务都在主线程中执行，形成一个<strong>执行栈</strong>，所有异步任务，都会被暂时放入一个<strong>任务队列</strong>中，当所有同步任务执行完毕时，会读取这个任务队列让其进入执行栈，开始执行。以上介绍属于一次执行机制，主线程不断重复这个过程就形成了<code>Event Loop</code>事件循环。</p><p>以上是对<code>Event Loop</code>的大体介绍，但在<code>Event Loop</code>执行的时候，还有一些细节需要我们去掌握。</p><p>我们在派发更新章节提到过<code>tick</code>，那么什么是<code>tick</code>？<code>tick</code>就是主线程的一次执行过程。所有异步任务都是通过任务队列来调度的，任务队列中存放的是一个个任务(<code>task</code>)，而这一个个<code>task</code>按照规范，又分为<code>macro task</code>宏任务和<code>micro task</code>微任务。<code>macro task</code>和<code>micro task</code>在执行的时候存在一个微妙的关系：每个<code>macro task</code>执行结束后，会清空所有的<code>micro task</code>。</p><p>在浏览器环境下，<code>macro task</code>和<code>micro task</code>对应如下：</p><ul><li><code>macro task</code>宏任务：<code>MessageChannel</code>、<code>postMessage</code>、<code>setImmediate</code>和<code>setTimeout</code>。</li><li><code>micro task</code>微任务：<code>Promise.then</code>和<code>MutationObsever</code>。</li></ul><p><img src="'+e+'" alt="Event Loop"></p><h3 id="mutationobserver" tabindex="-1"><a class="header-anchor" href="#mutationobserver" aria-hidden="true">#</a> MutationObserver</h3>',12),r={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver",target:"_blank",rel:"noopener noreferrer"},d=s("code",null,"MutationObserver",-1),m=s("code",null,"MutationObserver",-1),b=o(`<p>我们按照文档介绍，来撰写一个例子：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;text node data change&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
<span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">const</span> textNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>textNode<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">characterData</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">func</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  count<span class="token operator">++</span>
  textNode<span class="token punctuation">.</span>data <span class="token operator">=</span> count
<span class="token punctuation">}</span>
<span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// text node data change</span>
</code></pre></div><p>代码分析：</p><ul><li>首先定义了<code>callback</code>回调函数和<code>MutationObserver</code>的实例对象，其中构造函数传递的参数是我们的<code>callback</code>。</li><li>然后创建一个文本节点并传入文本节点的初始文本，接着调用<code>MutationObserver</code>实例的<code>observe</code>方法，传入我们创建的文本节点和一个<code>config</code>观察配置对象，其中<code>characterData:true</code>的意思是：我们要观察<code>textNode</code>节点的文本变动。<code>config</code>还有其他选项属性，你可以在<code>MDN</code>文档中查看到。</li><li>接着，我们定义一个<code>func</code>函数，这个函数主要做的事情就是修改<code>textNode</code>文本节点中的文本内容，当文本内容变动后，<code>callback</code>会自动被调用，因此输出<code>text node data change</code>。</li></ul><p>在了解了<code>MutationObserver</code>的用法后，我们来看一下<code>nextTick</code>方法中，是如何使用<code>MutationObserver</code>的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isIE<span class="token punctuation">,</span> isNative <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./env&#39;</span>

<span class="token comment">// 省略代码</span>
<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isIE <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> MutationObserver <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>
  <span class="token function">isNative</span><span class="token punctuation">(</span>MutationObserver<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token comment">// PhantomJS and iOS 7.x</span>
  MutationObserver<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;[object MutationObserverConstructor]&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Use MutationObserver where native Promise is not available,</span>
  <span class="token comment">// e.g. PhantomJS, iOS7, Android 4.4</span>
  <span class="token comment">// (#6466 MutationObserver is unreliable in IE11)</span>
  <span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>
  <span class="token keyword">const</span> textNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">)</span>
  observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>textNode<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">characterData</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    counter <span class="token operator">=</span> <span class="token punctuation">(</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span>
    textNode<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  isUsingMicroTask <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre></div>`,6),h=s("code",null,"nextTick",-1),f=s("code",null,"IE",-1),v=s("code",null,"MutationObserver",-1),g=s("code",null,"MutationObserver",-1),w=s("code",null,"MutationObserver",-1),y=s("code",null,"IE",-1),x=s("code",null,"Vue.js",-1),_=s("code",null,"issue",-1),T={href:"https://github.com/vuejs/vue/issues/6466",target:"_blank",rel:"noopener noreferrer"},M=s("h3",{id:"setimmediate和settimeout",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#setimmediate和settimeout","aria-hidden":"true"},"#"),n(" setImmediate和setTimeout")],-1),O=s("p",null,[s("code",null,"setTimeout"),n("对于大部分人来说是非常常见的一个定时器方法，因此我们不做过多的介绍。")],-1),I=s("code",null,"nextTick",-1),j=s("code",null,"setImmediate",-1),N={href:"https://www.caniuse.com/?search=setImmediate",target:"_blank",rel:"noopener noreferrer"},E=s("code",null,"API",-1),P=s("code",null,"IE",-1),S=s("code",null,"Edge",-1),C=o(`<p>那么为什么会使用这个方法呢，这是因为我们之前提到的一个<code>issue</code>：<code>MutationObserver</code>在<code>IE</code>浏览器中并不可靠，因此在<code>IE</code>浏览器下降级到使用<code>setImmediate</code>，我们可以把<code>setImmediate</code>看做和<code>setTimeout</code>一样。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">setImmediate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setImmediate&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment">// 约等于</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="nexttick实现" tabindex="-1"><a class="header-anchor" href="#nexttick实现" aria-hidden="true">#</a> nextTick实现</h2><p>介绍完<code>nextTick</code>与异步相关的知识后，我们来的分析一下<code>nextTick</code>方法的实现，首先要说的是：<strong>异步降级</strong>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> timerFunc

<span class="token comment">// The nextTick behavior leverages the microtask queue, which can be accessed</span>
<span class="token comment">// via either native Promise.then or MutationObserver.</span>
<span class="token comment">// MutationObserver has wider support, however it is seriously bugged in</span>
<span class="token comment">// UIWebView in iOS &gt;= 9.3.3 when triggered in touch event handlers. It</span>
<span class="token comment">// completely stops working after triggering a few times... so, if native</span>
<span class="token comment">// Promise is available, we will use it:</span>
<span class="token comment">/* istanbul ignore next, $flow-disable-line */</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Promise <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isNative</span><span class="token punctuation">(</span>Promise<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>
    <span class="token comment">// In problematic UIWebViews, Promise.then doesn&#39;t completely break, but</span>
    <span class="token comment">// it can get stuck in a weird state where callbacks are pushed into the</span>
    <span class="token comment">// microtask queue but the queue isn&#39;t being flushed, until the browser</span>
    <span class="token comment">// needs to do some other work, e.g. handle a timer. Therefore we can</span>
    <span class="token comment">// &quot;force&quot; the microtask queue to be flushed by adding an empty timer.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isIOS<span class="token punctuation">)</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>noop<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  isUsingMicroTask <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isIE <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> MutationObserver <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>
  <span class="token function">isNative</span><span class="token punctuation">(</span>MutationObserver<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token comment">// PhantomJS and iOS 7.x</span>
  MutationObserver<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;[object MutationObserverConstructor]&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Use MutationObserver where native Promise is not available,</span>
  <span class="token comment">// e.g. PhantomJS, iOS7, Android 4.4</span>
  <span class="token comment">// (#6466 MutationObserver is unreliable in IE11)</span>
  <span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>
  <span class="token keyword">const</span> textNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">)</span>
  observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>textNode<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">characterData</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    counter <span class="token operator">=</span> <span class="token punctuation">(</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span>
    textNode<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  isUsingMicroTask <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> setImmediate <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isNative</span><span class="token punctuation">(</span>setImmediate<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Fallback to setImmediate.</span>
  <span class="token comment">// Technically it leverages the (macro) task queue,</span>
  <span class="token comment">// but it is still a better choice than setTimeout.</span>
  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setImmediate</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// Fallback to setTimeout.</span>
  <span class="token function-variable function">timerFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>flushCallbacks<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们在前面介绍过<code>Event Loop</code>事件循环，由于<code>macro task</code>和<code>micro task</code>特殊的执行机制，我们首先判断当前浏览器是否支持<code>Promise</code>，如果不支持，则降级到判断是否支持<code>MutationObserver</code>，如果还不支持，则继续降级到判断是否支持<code>setImmediate</code>，最后降级使用<code>setTimeout</code>。</p><p>在介绍完异步降级之后，我们来看<code>nextTick</code>的实现代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> pending <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">nextTick</span> <span class="token punctuation">(</span><span class="token parameter">cb<span class="token operator">?</span><span class="token operator">:</span> Function<span class="token punctuation">,</span> ctx<span class="token operator">?</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> _resolve
  callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> <span class="token string">&#39;nextTick&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>_resolve<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">_resolve</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    pending <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">timerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// $flow-disable-line</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cb <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Promise <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      _resolve <span class="token operator">=</span> resolve
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>nextTick</code>真正的代码并不复杂，首先会把传入的<code>cb</code>收集起来，然后判断<code>pending</code>为<code>false</code>的时候开始执行<code>timerFunc</code>方法，其中<code>timeFunc</code>在异步降级的过程中被定义的。<code>nextTick</code>方法在最后还进行了判断，如果没有传入<code>cb</code>并且支持<code>Promise</code>的话，它会返回一个<code>promise</code>，因此我们在使用<code>nextTick</code>的时候可以有两种使用方式：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;nextTick callback&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 方式一</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>

<span class="token comment">// 方式二</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>在最后，我们来看一个在之前没有提到的<code>flushCallbacks</code>方法实现：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> pending <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">function</span> <span class="token function">flushCallbacks</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pending <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">const</span> copies <span class="token operator">=</span> callbacks<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  callbacks<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> copies<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    copies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>flushCallbacks</code>方法的主要作用就是：将<code>pending</code>状态还原为<code>false</code>并且遍历<code>callbacks</code>数组中的方法并执行。</p>`,13);function F(L,V){const a=c("ExternalLinkIcon");return l(),u("div",null,[k,s("p",null,[n("在"),s("a",r,[n("MDN文档"),t(a)]),n("中，我们可以看到"),d,n("的详细用法，它不是很复杂，它的作用是：创建并返回一个新的 "),m,n("实例，它会在指定的DOM发生变化时被调用。")]),b,s("p",null,[n("我们可以看到，"),h,n("中首先判断了非"),f,n("浏览器并且"),v,n("可用且为原生"),g,n("时才会使用"),w,n("。对于判断非"),y,n("浏览器的情况，你可以看"),x,n("的"),_,s("a",T,[n("#6466"),t(a)]),n("来查看原因。")]),M,O,s("p",null,[n("在"),I,n("方法实现中，它使用到了"),j,n("，我们在"),s("a",N,[n("Can I Use"),t(a)]),n("网站上可以发现，这个"),E,n("方法只存在于高版本"),P,n("浏览器和低版本"),S,n("浏览器中，其它浏览器不支持。")]),C])}const q=p(i,[["render",F],["__file","nexttick.html.vue"]]);export{q as default};