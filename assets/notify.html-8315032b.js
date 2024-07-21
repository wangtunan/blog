import{_ as n,o as s,c as a,d as t}from"./app-302f5f8c.js";const p="/blog/assets/notify-77c9d7cc.png",o={},e=t(`<h1 id="派发更新" tabindex="-1"><a class="header-anchor" href="#派发更新" aria-hidden="true">#</a> 派发更新</h1><p>在介绍完依赖收集后，我们紧接着来分析一下派发更新。在这一小节，我们的目标是弄清楚派发更新主要做什么事情以及派发更新的具体过程实现。</p><p>问：<strong>派发更新主要做什么事情？</strong></p><p>答：派发更新就是当响应式数据发生变动的时候，通知所有订阅了这个数据变化的<code>Watcher</code>(既<code>Dep</code>依赖)执行<code>update</code>。对于<code>render watcher</code>渲染<code>Watcher</code>而言，<code>update</code>就是触发组件重新进行渲染；对于<code>computed watcher</code>计算属性<code>Watcher</code>而言，<code>update</code>就是对计算属性重新求值；对于<code>user watcher</code>用户自定义<code>Watcher</code>而言，<code>update</code>就是调用用户提供的回调函数。</p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><p>大多数人分析派发更新的场景，只说明了<code>Object.defineProperty()</code>方法中<code>setter</code>被触发的时候会进行派发更新，其实一共有四处派发更新的地方，其它三处分别为：</p><ul><li><code>Vue.js</code>中七种数组变异方法被调用时，会进行派发更新。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> methodsToPatch <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;pop&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;shift&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;unshift&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;splice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;sort&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;reverse&#39;</span><span class="token punctuation">]</span>

methodsToPatch<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">def</span><span class="token punctuation">(</span>arrayMethods<span class="token punctuation">,</span> method<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">mutator</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 精简代码</span>
    ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> result
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><ul><li><code>Vue.set</code>或者<code>this.$set</code>的时候，会进行派发更新。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">set</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">|</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
  <span class="token comment">// 精简代码</span>
  <span class="token function">defineReactive</span><span class="token punctuation">(</span>ob<span class="token punctuation">.</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
  ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> val
<span class="token punctuation">}</span>
</code></pre></div><ul><li><code>Vue.delete</code>或者<code>this.$delete</code>的时候，会进行派发更新。</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">del</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">|</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 精简代码</span>
  <span class="token keyword">delete</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中，以上三种派发更新与<code>Object.defineProperty()</code>方法中的<code>setter</code>被触发时的派发更新有一点不一样，<code>setter</code>中的派发更新，它的<code>dep</code>是一个在<code>defineReactive</code>方法中定义的闭包变量，意味着其只能服务于<code>defineReactive</code>方法。前者的<code>dep</code>是从<code>this.__ob__</code>对象中取的，<code>this.__ob__</code>属性是在<code>Observer</code>被实例化的时候被定义的，它指向<code>Observer</code>实例，我们在之前已经介绍过。这种独特的处理方式，方便了我们在以上三种场景下，能方便的读取到<code>dep</code>依赖，进而进行依赖的派发更新。</p><h2 id="过程" tabindex="-1"><a class="header-anchor" href="#过程" aria-hidden="true">#</a> 过程</h2><p>在以上代码中，我们已经了解到了<code>dep.notify()</code>被调用的各种时机，在这一个小节中我们需要来看一下派发更新的过程。</p><p>当<code>dep.notify()</code>被调用时，它会执行<code>notify()</code>方法中的代码，我们来看一下<code>Dep</code>类中关于这个方法的实现：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">notify</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> subs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    subs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以发现，<code>notify</code>主要做的就是遍历<code>subs</code>数组，然后调用<code>update</code>方法。下一步，我们来看一下<code>Watcher</code>类中关于<code>update</code>方法的代码实现：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> queueWatcher <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./scheduler&#39;</span>
<span class="token function">update</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在<code>update</code>方法被执行的时候，首先判断了<code>this.lazy</code>和<code>this.sync</code>两个属性，其中<code>this.lazy</code>为<code>computed watcher</code>计算属性的标志，因为计算属性会延后进行求值，因此这里只是把<code>this.dirty</code>赋值为<code>true</code>，<code>this.sync</code>不属于派发更新这一章节的重点，因此不做过多的介绍。</p><p>我们来重点分析<code>queueWatcher</code>，它是撰写在<code>observer/scheduler.js</code>文件中的一个方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token literal-property property">queue</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Watcher<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> <span class="token literal-property property">has</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> number<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token operator">?</span><span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> waiting <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">let</span> flushing <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">queueWatcher</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">watcher</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> id <span class="token operator">=</span> watcher<span class="token punctuation">.</span>id
  <span class="token keyword">if</span> <span class="token punctuation">(</span>has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>watcher<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// if already flushing, splice the watcher based on its id</span>
      <span class="token comment">// if already past its id, it will be run next immediately.</span>
      <span class="token keyword">let</span> i <span class="token operator">=</span> queue<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> index <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>id <span class="token operator">&gt;</span> watcher<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token operator">--</span>
      <span class="token punctuation">}</span>
      queue<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> watcher<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// queue the flush</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>waiting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      waiting <span class="token operator">=</span> <span class="token boolean">true</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">flushSchedulerQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token function">nextTick</span><span class="token punctuation">(</span>flushSchedulerQueue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以在以上代码最顶部发现定义了几个变量，其中有几个比较重要的变量，它们的作用如下：</p><ul><li><code>queue</code>：各种<code>Watcher</code>执行队列，无论是<code>render watcher</code>、<code>user watcher</code>还是<code>computed watcher</code>，只要不是重复的<code>Watcher</code>，最终都会被推入到<code>queue</code>队列数组中。</li><li><code>has</code>：用来防止重复添加<code>Watcher</code>的标志对象：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 表示id为1,2的Watcher实例已经被添加到了queue</span>
<span class="token comment">// 后续遇到同样的Watcher实例，不会重复添加到队列中</span>
<span class="token keyword">const</span> has <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token number">1</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li><code>index</code>：当前遍历的<code>Watcher</code>实例索引，它就是<code>flushSchedulerQueue</code>方法中使用<code>for</code>循环遍历<code>queue</code>队列数组的<code>index</code>。</li></ul><p>介绍完以上几个重要变量后，我们来分析一下<code>queueWatcher</code>的过程：</p><ul><li>代码首先通过获取当前<code>Watcher</code>的自增<code>id</code>，判断在标志对象<code>has</code>中是否已经存在，如果不存在，则对这个<code>id</code>进行标记，赋值为<code>true</code>。</li><li>随后判断是否为<code>flushing</code>状态，如果不是，则代表我们可以正常的把当前<code>Watcher</code>推入到<code>queue</code>队列数组中。</li><li>接着判断了是否为<code>waiting</code>状态，如果不是，则代表可以执行<code>queue</code>队列数组，然后设置<code>waiting</code>为<code>true</code>，最后调用<code>nextTick(flushSchedulerQueue)</code>，<code>nextTick</code>方法是<code>Vue.js</code>自己封装的一个处理异步逻辑的工具函数，我们现在只要知道：<code>nextTick</code>中的函数参数，会在下一个<code>tick</code>执行。</li></ul><p>接着，我们来看<code>flushSchedulerQueue</code>函数是如何实现的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">flushSchedulerQueue</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  currentFlushTimestamp <span class="token operator">=</span> <span class="token function">getNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  flushing <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">let</span> watcher<span class="token punctuation">,</span> id

  <span class="token comment">// Sort queue before flush.</span>
  <span class="token comment">// This ensures that:</span>
  <span class="token comment">// 1. Components are updated from parent to child. (because parent is always</span>
  <span class="token comment">//    created before the child)</span>
  <span class="token comment">// 2. A component&#39;s user watchers are run before its render watcher (because</span>
  <span class="token comment">//    user watchers are created before the render watcher)</span>
  <span class="token comment">// 3. If a component is destroyed during a parent component&#39;s watcher run,</span>
  <span class="token comment">//    its watchers can be skipped.</span>
  queue<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>id <span class="token operator">-</span> b<span class="token punctuation">.</span>id<span class="token punctuation">)</span>

  <span class="token comment">// do not cache length because more watchers might be pushed</span>
  <span class="token comment">// as we run existing watchers</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    watcher <span class="token operator">=</span> queue<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>before<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      watcher<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    id <span class="token operator">=</span> watcher<span class="token punctuation">.</span>id
    has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
    watcher<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// in dev build, check and stop circular updates.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">&gt;</span> <span class="token constant">MAX_UPDATE_COUNT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">&#39;You may have an infinite update loop &#39;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>
            watcher<span class="token punctuation">.</span>user
              <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">in watcher with expression &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>watcher<span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span>
              <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">in a component render function.</span><span class="token template-punctuation string">\`</span></span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
          watcher<span class="token punctuation">.</span>vm
        <span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// keep copies of post queues before resetting state</span>
  <span class="token keyword">const</span> activatedQueue <span class="token operator">=</span> activatedChildren<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> updatedQueue <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">resetSchedulerState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// call component updated and activated hooks</span>
  <span class="token function">callActivatedHooks</span><span class="token punctuation">(</span>activatedQueue<span class="token punctuation">)</span>
  <span class="token function">callUpdatedHooks</span><span class="token punctuation">(</span>updatedQueue<span class="token punctuation">)</span>

  <span class="token comment">// devtool hook</span>
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>devtools <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>devtools<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    devtools<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;flush&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们粗略观看<code>flushSchedulerQueue</code>函数代码，可以发现它主要做几件事情：<strong>还原flushing状态</strong>、<strong>排序queue队列</strong>、<strong>遍历queue</strong>、<strong>还原状态</strong>、<strong>触发组件钩子函数</strong>。我们按照这几个步骤，分别说明:</p><ul><li><strong>还原flushing状态</strong>：在<code>flushSchedulerQueue</code>首先对<code>flushing</code>进行了还原，这样做的目的是为了不影响在执行<code>queue</code>队列的时候，有<code>Watcher</code>推入到<code>queue</code>队列中。</li><li><strong>排序queue队列</strong>：使用数组的<code>sort</code>方法，把<code>queue</code>队列中的<code>Watcher</code>按照自增<code>id</code>的值从小到大进行了排序，这样做是为了保证以下三种场景：</li></ul><ol><li>我们都知道，组件的更新是从父组件开始，然后到子组件。在组件渲染的时候，会从父组件开始渲染，这时候会创建父组件的<code>render watcher</code>，假设此时的<code>parent render watcher</code>自增<code>id</code>为<code>1</code>，接着渲染子组件，实例化子组件的<code>render watcher</code>，假设此时的<code>child render watcher</code>自增<code>id</code>为<code>2</code>。进行<code>queue.sort()</code>排序后，<code>id</code>值小的排序到数组前面，这样在<code>queue</code>进行遍历的时候，就能保证首先处理<code>parent render watcher</code>，然后再处理<code>child render watcher</code></li><li>因为用户自定义<code>Watcher</code>可以在组件渲染之前创建，因此对于用户自定义<code>Watcher</code>而言，需要优先于<code>render watcher</code>执行。</li></ol><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>{{msg}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>change<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Add<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 先执行回调函数，再组件渲染</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">change</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><ol start="3"><li>如果一个子组件在父组件执行<code>queueWatcher</code>的过程中被销毁了，那么子组件所有的<code>Watcher</code>执行都应该跳过。</li></ol><ul><li><strong>遍历queue</strong>：在使用<code>for</code>循环遍历的时候，我们需要注意遍历条件，它先对<code>queue</code>的长度进行了求值，然后再判断循环条件，这样做是因为在遍历<code>queue</code>数组的过程中，<code>queue</code>数组中的元素有可能会发生变动。在遍历的过程中，首先会释放当前<code>Watcher</code>在<code>has</code>标志对象中的状态，然后调用<code>watcher.run()</code>方法。<code>run</code>是定义在<code>Watcher</code>类中的一个方法：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token comment">// 精简代码</span>
  <span class="token function">run</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        value <span class="token operator">!==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">||</span>
        <span class="token comment">// Deep watchers and watchers on Object/Arrays should fire even</span>
        <span class="token comment">// when the value is the same, because the value may</span>
        <span class="token comment">// have mutated.</span>
        <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deep
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// set new value</span>
        <span class="token keyword">const</span> oldValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>run</code>方法的代码不是很复杂，就是对不同的<code>Watcher</code>进行不同的处理，如果是<code>render watcher</code>，它在执行<code>this.get()</code>的过程中会执行<code>this.getter</code>，<code>this.getter</code>对应以下方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 组件渲染方法</span>
  vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果是<code>user watcher</code>，其<code>this.user</code>值为<code>true</code>，会调用<code>this.cb.call()</code>，此时的<code>this.cb</code>就是用户写的<code>user callback</code>：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// user callback</span>
    <span class="token comment">// this.cb = userCallback</span>
    <span class="token keyword">const</span> <span class="token function-variable function">userCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">,</span> userCallback<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果是<code>computed watcher</code>，其<code>this.user</code>值为<code>false</code>，会调用<code>this.cb.call()</code>，此时的<code>this.cb</code>就是我们提供的计算属性方法:</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// this.cb = newMsg () {}</span>
    <span class="token function">newMsg</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">+</span> <span class="token string">&#39;!!!&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li><strong>还原状态</strong>：调用<code>resetSchedulerState</code>函数的目的是，当<code>queue</code>队列都执行完毕时，把所有相关状态还原为初始状态，这其中包括<code>queue</code>、<code>has</code>和<code>index</code>等：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">resetSchedulerState</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  index <span class="token operator">=</span> queue<span class="token punctuation">.</span>length <span class="token operator">=</span> activatedChildren<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
  has <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    circular <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  waiting <span class="token operator">=</span> flushing <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li><strong>触发组件钩子函数</strong>：调用<code>callActivatedHooks</code>和<code>callUpdatedHooks</code>分别是为了触发组件<code>activated</code>和<code>updated</code>钩子函数，其中<code>activated</code>是与<code>keep-alive</code>相关的钩子函数。</li></ul><h2 id="死循环" tabindex="-1"><a class="header-anchor" href="#死循环" aria-hidden="true">#</a> 死循环</h2><p>在使用<code>Vue.js</code>进行开发的时候，有时候我们会不小心写出死循环的代码，例如：</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>{{msg}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>change<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Add<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;msg&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">change</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">msg</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>当我们点击按钮调用<code>change</code>方法修改<code>this.msg</code>的值的时候，因为我们使用<code>watch</code>监听了<code>msg</code>的值更新，所以会执行<code>watch</code>监听函数，但是在<code>watch</code>监听函数中我们又修改了<code>this.msg</code>的值，这样会导致一直调用我们写的监听函数，存在一个死循环。在<code>Vue.js</code>中，为了避免死循环导致浏览器崩溃，它做了特殊处理。</p><p>在<code>queueWatcher</code>的时候，我们并没有分析以下<code>else</code>这段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">MAX_UPDATE_COUNT</span> <span class="token operator">=</span> <span class="token number">100</span>
<span class="token keyword">let</span> <span class="token literal-property property">circular</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> number<span class="token punctuation">]</span><span class="token operator">:</span> number <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>watcher<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// if already flushing, splice the watcher based on its id</span>
  <span class="token comment">// if already past its id, it will be run next immediately.</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> queue<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> index <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>id <span class="token operator">&gt;</span> watcher<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i<span class="token operator">--</span>
  <span class="token punctuation">}</span>
  queue<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> watcher<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们以上面的例子来分析以下这段代码：</p><ul><li>当我们点击按钮修改<code>this.msg</code>的值的时候，触发<code>msg</code>的<code>setter</code>，然后进行<code>dep.notify</code>派发更新，接着调用<code>queueWatcher</code>，此时<code>msg</code>存在两个<code>Dep</code>依赖，一个是<code>render watcher</code>，另外一个是<code>user watcher</code>，因此<code>this.subs</code>是一个长度为<code>2</code>的<code>Watcher</code>数组。当初次<code>queueWatcher</code>的时候，<code>flushing</code>状态为<code>false</code>，因为<code>user watcher</code>比<code>render watcher</code>先创建，因此这个时候<code>user watcher</code>会先推入到<code>queue</code>队列，接着是<code>render watcher</code>:</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 展示使用，实际为Watcher实例</span>
<span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;user watcher&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;render watcher&#39;</span><span class="token punctuation">]</span>
</code></pre></div><ul><li>接着会执行<code>watch</code>监听函数，再次执行<code>queueWatcher</code>的时候，此时的<code>flushing</code>为<code>false</code>，走<code>else</code>分支逻辑，<code>while</code>循环的作用主要是为了查找应该在<code>queue</code>数组什么位置插入新的<code>watcher</code>，例如：</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;user watcher&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;render watcher&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
<span class="token comment">// 当执行watch监听函数的时候，此时的watcher应该插入到数组第二项</span>
<span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;user watcher&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;user watcher&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;render watcher&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre></div><p>因为我们撰写的特殊例子，<code>queue</code>数组会不断的推入<code>user watcher</code>，当<code>queue</code>中的数量超过限制的时候，<code>Vue.js</code>提前终止这种行为(某些<code>Watcher</code>被遍历超过100次时)，<code>Vue.js</code>使用<code>circular</code>标记对象来进行计数，它标记了每一个<code>Watcher</code>被遍历的次数，例如：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// id为1的Watcher被遍历了101次</span>
<span class="token comment">// id为2的Watcher被遍历了1次</span>
<span class="token keyword">const</span> circular <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token number">1</span><span class="token operator">:</span> <span class="token number">101</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>circular</code>计数更新和终止的代码在<code>flushSchedulerQueue</code>函数中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  watcher <span class="token operator">=</span> queue<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>before<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    watcher<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  id <span class="token operator">=</span> watcher<span class="token punctuation">.</span>id
  has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
  watcher<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// in dev build, check and stop circular updates.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">&gt;</span> <span class="token constant">MAX_UPDATE_COUNT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token string">&#39;You may have an infinite update loop &#39;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>
          watcher<span class="token punctuation">.</span>user
            <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">in watcher with expression &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>watcher<span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span>
            <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">in a component render function.</span><span class="token template-punctuation string">\`</span></span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        watcher<span class="token punctuation">.</span>vm
      <span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因此对于以上例子，<code>Vue.js</code>会在控制台输出这样一个错误信息：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// You may have an infinite update loop in watcher with expression &quot;msg&quot;</span>
</code></pre></div><h2 id="整体流程图" tabindex="-1"><a class="header-anchor" href="#整体流程图" aria-hidden="true">#</a> 整体流程图</h2><p>在分析完以上派发更新的过程后，我们可以得到如下流程图。</p><div style="text-align:center;"><img src="`+p+'" alt="派发更新流程"></div>',66),c=[e];function u(l,k){return s(),a("div",null,c)}const r=n(o,[["render",u],["__file","notify.html.vue"]]);export{r as default};
