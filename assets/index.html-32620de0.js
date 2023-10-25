import{_ as o,r as e,o as c,c as l,a as n,b as s,e as t,d as p}from"./app-582d7d65.js";const u={},k=p(`<h1 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p><strong>链表(LinkedList)</strong>：是一种线性数据结构，其中的每个元素都是一个节点对象，各个节点通过<strong>引用</strong>相连接。<strong>引用</strong>记录了下一个节点的内存地址，通过它可以从当前节点访问到下一个 节点。链表的设计使得各个节点可以被分散存储在内存各处。</p><p><img src="https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list.assets/linkedlist_definition.png" alt="链表"></p><p><strong>链表</strong>通常由链表节点<code>ListNode</code>对象组成，每个节点通常包含节点的值<code>val</code>和下一个节点的引用<code>next</code>。</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// listNode.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ListNode</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>链表</strong>通常有如下规定：</p><ul><li>首个节点被称为<strong>头结点(head)</strong>，最后一个节点被称为<strong>尾结点(tail)</strong>，一般而言<strong>尾结点</strong>的<code>next</code>为空。</li><li><strong>链表</strong>的长度就是节点的长度。</li></ul><p><strong>链表</strong>一般有三种类型：</p><ul><li>单向链表：即普通链表。</li><li>双向链表：链接节点除了保存<code>next</code>下一个节点的引用，还报错<code>prev</code>上一个节点的引用。</li><li>循环链表：在普通链表的基础上，首尾相连，即<strong>尾结点</strong>的引用指向<strong>头结点</strong>。</li></ul><p><img src="https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list.assets/linkedlist_common_types.png" alt="链表类型"></p><h2 id="单向链表" tabindex="-1"><a class="header-anchor" href="#单向链表" aria-hidden="true">#</a> 单向链表</h2>`,12),i={class:"custom-container tip"},r=n("p",{class:"custom-container-title"},"TIP",-1),d={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/utils/linkedList.js",target:"_blank",rel:"noopener noreferrer"},h=p(`<p><strong>单向链表</strong>：由<code>ListNode</code>节点组成，通常只有一个<code>val</code>(节点的值)、<code>next</code>(下个节点的引用)组成。单向链表是实现双向链表、循环链表的基础。 对单向链表而言，其一般有如下属性或方法：</p><ul><li><code>_size</code>: 内部属性，链表的长度。</li><li><code>_head</code>：内部属性，链表的头结点。</li><li><code>push(val)</code>：方法，向链表尾部添加节点。</li><li><code>insert(val, index)</code>：方法，向链表指定索引位置添加节点。成功插入返回<code>true</code>，反之返回<code>false</code>。</li><li><code>remove(val)</code>：方法，移除指定值的节点。</li><li><code>removeAt(index)</code>：方法，在链表中移除指定索引的节点。</li><li><code>getNodeAt(index)</code>：方法，在链表中获取指定索引位置的节点。成功获取返回节点，反之返回<code>null</code>。</li><li><code>getSize()</code>：方法，返回链表的长度。</li><li><code>getHead()</code>：方法，返回链表头结点。</li><li><code>isEmpty()</code>：方法，判断链表是否为空，为空返回<code>true</code>，反之返回<code>false</code>。</li><li><code>indexOf(val)</code>：方法，根据节点的值，返回其节点的索引位置，不存在则返回<code>-1</code>。</li><li><code>toString()</code>：方法，输出链表为字符串形式，用逗号分隔。</li></ul><p>链表初始化：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>push(val)</code>方法：向链表尾部添加节点。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 1、链表为空时，直接赋值给头结点</span>
    <span class="token comment">// 2、链表不为空时，遍历至链表尾部并赋值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span>current <span class="token operator">&amp;&amp;</span> current<span class="token punctuation">.</span>next <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      current<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>insert(val, index)</code>方法：向链表指定索引位置添加节点。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_isSafeIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 1、当在头结点插入时，只需要改变头结点的引用即可。</span>
    <span class="token comment">// 2、当在非头结点插入时，首选需要找到待插入位置的上一个节点，然后改变引用即可。</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      node<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> prev <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNodeAt</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      current <span class="token operator">=</span> prev<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      prev<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
      node<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">getNodeAt</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_isSafeIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> index <span class="token operator">&amp;&amp;</span> current <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> current<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">_isSafeIndex</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> needLast</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> lastResult <span class="token operator">=</span> needLast
      <span class="token operator">?</span> index <span class="token operator">&lt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size
      <span class="token operator">:</span> index <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">;</span>

    <span class="token keyword">return</span> index <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> lastResult<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),w=n("strong",null,"提示",-1),y={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/utils/linkedList.js",target:"_blank",rel:"noopener noreferrer"},_=n("h2",{id:"双向链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#双向链表","aria-hidden":"true"},"#"),s(" 双向链表")],-1),m={class:"custom-container tip"},g=n("p",{class:"custom-container-title"},"TIP",-1),x={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/utils/doublyLinkedList.js",target:"_blank",rel:"noopener noreferrer"},v=p(`<p>双向链表是在单向链表的基础上实现的，它和单向链表的最大区别是：每个节点会保存上一个节点的引用<code>prev</code>，新增一个<code>_tail</code>表示尾结点。</p><p>双向链表节点<code>doublyNode</code>定义如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">DoublyNode</span> <span class="token keyword">extends</span> <span class="token class-name">ListNode</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> next<span class="token punctuation">,</span> prev</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>prev <span class="token operator">=</span> prev <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为双向链表和单向链表存在差异，所以在一些方法和属性的实现上，会有所差别，如下：</p><ul><li><code>_tail</code>：独有，私有属性，表示双向链表尾结点。</li><li><code>push(val)</code>：重写单向链表<code>push(val)</code>方法</li><li><code>insert(val, index)</code>：重写单向链表<code>insert(val, index)</code>方法。</li><li><code>removeAt(index)</code>：重写单向链表<code>removeAt(index)</code>方法。</li><li><code>getTail()</code>：独有，获取双向链表尾结点。</li><li><code>reverseToString()</code>：独有，从双向链表尾部输出链表为字符串形式，用逗号分隔。</li></ul><p>双向链表初始化：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">DoublyLinkedList</span> <span class="token keyword">extends</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>push(val)</code>方法：重写单向链表<code>push(val)</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">DoublyLinkedList</span> <span class="token keyword">extends</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DoublyNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> tail <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_tail<span class="token punctuation">;</span>
      tail<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
      node<span class="token punctuation">.</span>prev <span class="token operator">=</span> tail<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>insert(val, index)</code>方法：重写单向链表<code>insert(val, index)</code>方法。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">DoublyLinkedList</span> <span class="token keyword">extends</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_isSafeIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 1、在头结点插入时，链表为空时，直接设置头结点和尾结点</span>
    <span class="token comment">// 2、在头结点插入时，链表为不空时，需要把新节点变成头结点，然后维护prev引用即可</span>
    <span class="token comment">// 3、在尾结点插入时，需要把新节点变成尾结点。</span>
    <span class="token comment">// 4、在非头、尾结点插入时，需要得到待插入节点的头结点，然后维护prev和next引用即可。</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DoublyNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
        current<span class="token punctuation">.</span>prev <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_tail<span class="token punctuation">;</span>
      current<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
      node<span class="token punctuation">.</span>prev <span class="token operator">=</span> current<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> prev <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNodeAt</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      current <span class="token operator">=</span> prev<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      prev<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
      node<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
      node<span class="token punctuation">.</span>prev <span class="token operator">=</span> prev<span class="token punctuation">;</span>
      current<span class="token punctuation">.</span>prev <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,11),f=n("strong",null,"提示",-1),b={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/utils/doublyLinkedList.js",target:"_blank",rel:"noopener noreferrer"},L=n("h2",{id:"循环链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#循环链表","aria-hidden":"true"},"#"),s(" 循环链表")],-1),j={class:"custom-container tip"},N=n("p",{class:"custom-container-title"},"TIP",-1),z={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/utils/circularLinkedList.js",target:"_blank",rel:"noopener noreferrer"},A=p(`<p>循环链表是在单向链表的基础上实现的，它和单向链表的最大区别是：尾结点指向的地址非<code>null</code>，而是指向头结点。</p><p>因为循环链表和单向链表存在差异，所以在一些方法和属性的实现上，会有所差别，如下：</p><ul><li><code>push(val)</code>：重写单向链表<code>push(val)</code>方法。</li><li><code>insert(val, index)</code>：重写单向链表<code>insert(val, index)</code>方法。</li><li><code>removeAt(index)</code>：重写单向链表<code>removeAt(index)</code>方法。</li></ul><p>循环链表初始化：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CircularLinkedList</span> <span class="token keyword">extends</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>push(val)</code>方法：重写单向链表<code>push(val)</code>方法：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CircularLinkedList</span> <span class="token keyword">extends</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 1、当链表为空时，把新节点当做头结点</span>
    <span class="token comment">// 2、当链表不为空时，迭代链表至尾结点，把新节点当做尾结点，并更新next引用指向头结点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNodeAt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      current<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    node<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>insert(val, index)</code>方法：重写单向链表<code>insert(val, index)</code>方法。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CircularLinkedList</span> <span class="token keyword">extends</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_isSafeIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 1、在头结点插入，当链表为空时，直接把新节点当做头结点即可。</span>
    <span class="token comment">// 2、在头结点插入，当链表不为空时，把新节点当做头结点，然后找到尾结点并将其next指向新的头结点</span>
    <span class="token comment">// 3、在非头结点插入，正常找到待插入位置的上一个节点，然后正常插入节点即可。</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> current<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
        current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNodeAt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_head <span class="token operator">=</span> node<span class="token punctuation">;</span>
        current<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_head<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> prev <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getNodeAt</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      current <span class="token operator">=</span> prev<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      prev<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
      node<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,9),I=n("strong",null,"提示",-1),S={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/utils/circularLinkedList.js",target:"_blank",rel:"noopener noreferrer"},D=n("h2",{id:"链表典型应用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#链表典型应用","aria-hidden":"true"},"#"),s(" 链表典型应用")],-1),E=n("ul",null,[n("li",null,"单向链表：常用于实现栈、队列、哈希表和图等数据结构。"),n("li",null,"双向链表：双向链表常被用于需要快速查找前一个和下一个元素的场景，例如：红黑树、B树，浏览器访问历史，LRU算法。"),n("li",null,"循环链表：循环链表常被用于需要周期性操作的场景，例如：时间片轮转调度算法，数据缓冲区。")],-1),T=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),s(" 参考")],-1),B={href:"https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list/#424",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.ituring.com.cn/book/2653",target:"_blank",rel:"noopener noreferrer"};function V(P,R){const a=e("ExternalLinkIcon");return c(),l("div",null,[k,n("div",i,[r,n("p",null,[s("完整代码："),n("a",d,[s("单向链表完整实现代码"),t(a)])])]),h,n("p",null,[w,s("：其它方法实现，请参考"),n("a",y,[s("单向链表完整实现代码"),t(a)])]),_,n("div",m,[g,n("p",null,[s("完整代码："),n("a",x,[s("双向链表实现代码"),t(a)])])]),v,n("p",null,[f,s("：其它方法实现，请参考"),n("a",b,[s("双向链表实现代码"),t(a)])]),L,n("div",j,[N,n("p",null,[s("完整代码："),n("a",z,[s("循环链表实现代码"),t(a)])])]),A,n("p",null,[I,s("：其它方法实现，请参考"),n("a",S,[s("循环链表实现代码"),t(a)])]),D,E,T,n("ul",null,[n("li",null,[n("a",B,[s("Hello 算法 链表"),t(a)])]),n("li",null,[n("a",C,[s("JavaScript 数据结构和算法 链表章节"),t(a)])])])])}const J=o(u,[["render",V],["__file","index.html.vue"]]);export{J as default};
