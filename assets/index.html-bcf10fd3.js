import{_ as l,r as e,o as k,c as u,a as s,b as o,e as a,d as t}from"./app-c9515a38.js";const r={},i={class:"custom-container tip"},d={href:"https://baike.baidu.com/item/LRU",target:"_blank",rel:"noopener noreferrer"};function y(w,n){const p=e("leetcode-link"),c=e("ExternalLinkIcon");return k(),u("div",null,[n[4]||(n[4]=s("h1",{id:"中等",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#中等","aria-hidden":"true"},"#"),o(" 中等")],-1)),n[5]||(n[5]=s("h2",{id:"_2-两数相加",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_2-两数相加","aria-hidden":"true"},"#"),o(" 2.两数相加")],-1)),a(p,{title:"2.两数相加",link:"https://leetcode.cn/problems/add-two-numbers/"}),n[6]||(n[6]=t(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m为l1链表的长度，n为l2链表的长度</span>
<span class="token comment">// 时间复杂度：O(max(m, n))，需要遍历两个链表，复杂度取决于最长的链表</span>
<span class="token comment">// 空间复杂度：O(1)，仅定义常量</span>
<span class="token keyword">var</span> <span class="token function-variable function">addTwoNumbers</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">l1<span class="token punctuation">,</span> l2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> head <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">let</span> tail <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">let</span> carry <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>l1 <span class="token operator">||</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> val1 <span class="token operator">=</span> l1 <span class="token operator">?</span> l1<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token keyword">const</span> val2 <span class="token operator">=</span> l2 <span class="token operator">?</span> l2<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token keyword">const</span> sum <span class="token operator">=</span> val1 <span class="token operator">+</span> val2 <span class="token operator">+</span> carry
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>sum <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      head <span class="token operator">=</span> tail <span class="token operator">=</span> node
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      tail<span class="token punctuation">.</span>next <span class="token operator">=</span> node
      tail <span class="token operator">=</span> tail<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>

    carry <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>sum <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>l1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      l1 <span class="token operator">=</span> l1<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      l2 <span class="token operator">=</span> l2<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>carry <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      tail<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>carry<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> head
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_19-删除链表的倒数第n个结点" tabindex="-1"><a class="header-anchor" href="#_19-删除链表的倒数第n个结点" aria-hidden="true">#</a> 19.删除链表的倒数第N个结点</h2>`,2)),a(p,{title:"19.删除链表的倒数第N个结点",link:"https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"}),n[7]||(n[7]=t(`<p>方法一：迭代计算出链表长度</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，需要遍历链表计算出其长度</span>
<span class="token comment">// 空间复杂度：O(1)，定义变量</span>
<span class="token keyword">const</span> <span class="token function-variable function">getLinkedListLength</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> length <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>head <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    length<span class="token operator">++</span>
    head <span class="token operator">=</span> head<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> length
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">removeNthFromEnd</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> length <span class="token operator">=</span> <span class="token function">getLinkedListLength</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy

  <span class="token comment">// 节点从第一个开始</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length <span class="token operator">-</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  curr<span class="token punctuation">.</span>next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span>
</code></pre></div><p>方法二：栈存储法</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，遍历链表</span>
<span class="token comment">// 空间复杂度：O(n)，栈存储链表节点</span>
<span class="token keyword">var</span> <span class="token function-variable function">removeNthFromEnd</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy
  <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token keyword">null</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>curr <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  prev <span class="token operator">=</span> stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
  prev<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span>
</code></pre></div><p>方法三：快慢指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，遍历链表</span>
<span class="token comment">// 空间复杂度：O(1)，定义变量</span>
<span class="token keyword">var</span> <span class="token function-variable function">removeNthFromEnd</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span>
  <span class="token keyword">let</span> first <span class="token operator">=</span> head
  <span class="token keyword">let</span> second <span class="token operator">=</span> dummy

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    first <span class="token operator">=</span> first<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>first <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    first <span class="token operator">=</span> first<span class="token punctuation">.</span>next
    second <span class="token operator">=</span> second<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  second<span class="token punctuation">.</span>next <span class="token operator">=</span> second<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_24-两两交互链表中的节点" tabindex="-1"><a class="header-anchor" href="#_24-两两交互链表中的节点" aria-hidden="true">#</a> 24.两两交互链表中的节点</h2>`,7)),a(p,{title:"24.两两交互链表中的节点",link:"https://leetcode.cn/problems/swap-nodes-in-pairs/"}),n[8]||(n[8]=t(`<p>方法一：递归法</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，遍历链表</span>
<span class="token comment">// 空间复杂度：O(n)，递归调用的栈空间</span>
<span class="token keyword">var</span> <span class="token function-variable function">swapPairs</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 需要两个及以上的节点才能交换</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> head
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> newHead <span class="token operator">=</span> head<span class="token punctuation">.</span>next
  head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">swapPairs</span><span class="token punctuation">(</span>newHead<span class="token punctuation">.</span>next<span class="token punctuation">)</span>
  newHead<span class="token punctuation">.</span>next <span class="token operator">=</span> head

  <span class="token keyword">return</span> newHead
<span class="token punctuation">}</span>
</code></pre></div><p>方法二：迭代</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，遍历链表</span>
<span class="token comment">// 空间复杂度：O(1)，定义变量</span>
<span class="token keyword">var</span> <span class="token function-variable function">swapPairs</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy

  <span class="token keyword">while</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>next <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node1 <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
    <span class="token keyword">const</span> node2 <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

    curr<span class="token punctuation">.</span>next <span class="token operator">=</span> node2
    node1<span class="token punctuation">.</span>next <span class="token operator">=</span> node2<span class="token punctuation">.</span>next
    node2<span class="token punctuation">.</span>next <span class="token operator">=</span> node1
    curr <span class="token operator">=</span> node1
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_138-随机链表的复制" tabindex="-1"><a class="header-anchor" href="#_138-随机链表的复制" aria-hidden="true">#</a> 138.随机链表的复制</h2>`,5)),a(p,{title:"138.随机链表的复制",link:"https://leetcode.cn/problems/copy-list-with-random-pointer/"}),n[9]||(n[9]=t(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，两次遍历链表</span>
<span class="token comment">// 空间复杂度：O(n)，定义map集合存储链表节点</span>
<span class="token keyword">var</span> <span class="token function-variable function">copyRandomList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> head
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> head

  <span class="token keyword">while</span><span class="token punctuation">(</span>curr <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>curr<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  curr <span class="token operator">=</span> head
  <span class="token keyword">while</span><span class="token punctuation">(</span>curr <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> currNode <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span>
    currNode<span class="token punctuation">.</span>next <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">null</span>
    currNode<span class="token punctuation">.</span>random <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>random<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">null</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_142-环形链表ii" tabindex="-1"><a class="header-anchor" href="#_142-环形链表ii" aria-hidden="true">#</a> 142.环形链表Ⅱ</h2>`,2)),a(p,{title:"142.环形链表Ⅱ",link:"https://leetcode.cn/problems/linked-list-cycle-ii/"}),n[10]||(n[10]=t(`<p>方法一：哈希表</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表中节点的数量</span>
<span class="token comment">// 时间复杂度：O(n)，遍历链表中的每个节点</span>
<span class="token comment">// 空间复杂度：O(n)，使用Set存储链表中的节点</span>
<span class="token keyword">var</span> <span class="token function-variable function">detectCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">while</span><span class="token punctuation">(</span>head <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> head
    <span class="token punctuation">}</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
    head <span class="token operator">=</span> head<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>方法二：快慢指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表中节点的数量</span>
<span class="token comment">// 时间复杂度：O(n)，遍历链表中的每个节点</span>
<span class="token comment">// 空间复杂度：O(1)，定义常量</span>
<span class="token keyword">var</span> <span class="token function-variable function">detectCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> fast <span class="token operator">=</span> head
  <span class="token keyword">let</span> slow <span class="token operator">=</span> head

  <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>fast <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> fast<span class="token punctuation">.</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">===</span> slow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  fast <span class="token operator">=</span> head
  <span class="token keyword">while</span><span class="token punctuation">(</span>slow <span class="token operator">!==</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> fast
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_146-lru缓存" tabindex="-1"><a class="header-anchor" href="#_146-lru缓存" aria-hidden="true">#</a> 146.LRU缓存</h2>`,5)),a(p,{title:"146.LRU缓存",link:"https://leetcode.cn/problems/lru-cache"}),s("div",i,[n[3]||(n[3]=s("p",{class:"custom-container-title"},"TIP",-1)),s("p",null,[n[1]||(n[1]=s("strong",null,"说明",-1)),n[2]||(n[2]=o("：")),s("a",d,[n[0]||(n[0]=o("LRU解释")),a(c)])])]),n[11]||(n[11]=t(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">LRUCache</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">capacity</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity
  <span class="token keyword">this</span><span class="token punctuation">.</span>keys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>cache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">LRUCache</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">get</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">LRUCache</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">put</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span>size <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> deleteKey <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
      <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>deleteKey<span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>deleteKey<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_148-排序链表" tabindex="-1"><a class="header-anchor" href="#_148-排序链表" aria-hidden="true">#</a> 148.排序链表</h2>`,2)),a(p,{title:"148.排序链表",link:"https://leetcode.cn/problems/sort-list"}),n[12]||(n[12]=t(`<p>方法一：归并排序(递归)</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(nlogn)</span>
<span class="token comment">// 空间复杂度：O(logn)，取决于递归调用栈空间的开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">sortList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> head
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> slow <span class="token operator">=</span> head
  <span class="token keyword">let</span> fast <span class="token operator">=</span> head
  <span class="token keyword">while</span><span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> mid <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
  slow<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>
  
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token function">sortList</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> <span class="token function">sortList</span><span class="token punctuation">(</span>mid<span class="token punctuation">)</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>left <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> right<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> left
      left <span class="token operator">=</span> left<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> right
      right <span class="token operator">=</span> right<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  curr<span class="token punctuation">.</span>next <span class="token operator">=</span> left <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">?</span> left <span class="token operator">:</span> right
  
  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,2))])}const h=l(r,[["render",y],["__file","index.html.vue"]]);export{h as default};
