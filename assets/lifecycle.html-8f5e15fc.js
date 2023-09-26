import{_ as n,o as s,c as a,d as t}from"./app-9fa24cce.js";const e="/blog/assets/lifecycleMixin-dd95ef52.png",c={},p=t(`<h1 id="lifecyclemixin流程" tabindex="-1"><a class="header-anchor" href="#lifecyclemixin流程" aria-hidden="true">#</a> lifecycleMixin流程</h1><p>和以上其它几种方法一样，<code>lifecycleMixin</code>主要是定义实例方法和生命周期，例如：<code>$forceUpdate()</code>、<code>$destroy</code>，另外它还定义一个<code>_update</code>的私有方法，其中当调用<code>$forceUpdate()</code>方法强制组件重新渲染时会调用这个方法，<code>lifecycleMixin</code>精简代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">lifecycleMixin</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 私有方法</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_update</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token comment">// 实例方法</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$forceUpdate</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_watcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_watcher<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$destroy</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码分析：</p><ul><li><code>_update()</code>会在组件渲染的时候调用，其具体的实现我们会在组件章节详细介绍。</li><li><code>$forceUpdate()</code>为一个强制<code>Vue</code>实例重新渲染的方法，它的内部调用了<code>_update</code>，也就是强制组件重新编译渲染。</li><li><code>$destroy()</code>为组件销毁方法，在其具体的实现中，会处理父子组件的关系，事件监听，触发生命周期等操作。</li></ul><p><code>lifecycleMixin()</code>方法的代码不是很多，我们也能很容易的得到如下流程图：</p><div style="text-align:center;"><img src="`+e+'"></div>',7),o=[p];function l(i,u){return s(),a("div",null,o)}const k=n(c,[["render",l],["__file","lifecycle.html.vue"]]);export{k as default};
