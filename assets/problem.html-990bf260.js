import{_ as s,o as a,c as e,d as t}from"./app-c9515a38.js";const p={};function o(c,n){return a(),e("div",null,n[0]||(n[0]=[t(`<h1 id="变化侦测注意事项" tabindex="-1"><a class="header-anchor" href="#变化侦测注意事项" aria-hidden="true">#</a> 变化侦测注意事项</h1><p>虽然<code>Object.defineProperty()</code>方法很好用，但也会存在一些例外情况，这些例外情况的变动不能触发<code>setter</code>。这种情况，我们分为对象和数组两类来分析。</p><h2 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h2><p>假设我们有如下例子：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">obj</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.新增属性b，属性b不是响应式的，不会触发obj的setter</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token string">&#39;b&#39;</span>
    <span class="token comment">// 2.delete删除已有属性，无法触发obj的setter</span>
    <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">.</span>a
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从以上例子我们可以看到：</p><ul><li>当为一个响应式对象新增一个属性的时候，新增的属性不是响应式的，后续对于这个新增属性的任何修改，都无法触发其<code>setter</code>。为了解决这种问题，<code>Vue.js</code>提供了一个全局的<code>Vue.set()</code>方法和实例<code>vm.$set()</code>方法，它们实际上都是同一个<code>set</code>方法，我们会在后续的章节中介绍与响应式相关的全局<code>API</code>的实现。</li><li>当一个响应式对象删除一个已有属性的时候，不会触发<code>setter</code>。为了解决这个问题，<code>Vue.js</code>提供了一个全局的<code>vue.delete()</code>方法和实例<code>vm.$delete()</code>方法，它们实际上都是同一个<code>del</code>方法，我们会在后续的章节中介绍与响应式相关的全局<code>API</code>的实现。</li></ul><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><p>假设我们有如下例子：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.通过索引进行修改，无法捕获到数组的变动。</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">11</span>
    <span class="token comment">// 2.通过修改数组长度，无法捕获到数组的变动。</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从以上例子我们可以看到：</p><ul><li>通过索引直接修改数组，无法捕捉到数组的变动。</li><li>通过修改数组长度，无法捕获到数组的变动。</li></ul><p>对于第一种情况，我们可以使用前面提到过的<code>Vue.set</code>或者<code>vm.$set</code>来解决，对于第二种方法，我们可以使用数组的<code>splice()</code>方法解决。</p><p>在最新版<code>Vue3.0</code>中，使用到了<code>Proxy</code>来代替<code>Object.defineProperty()</code>实现响应式，使用<code>Proxy</code>后以上问题全部可以解决，然而<code>Proxy</code>属于<code>ES6</code>的内容，因此对于浏览器兼容性方面有一定的要求。</p>`,14)]))}const u=s(p,[["render",o],["__file","problem.html.vue"]]);export{u as default};
