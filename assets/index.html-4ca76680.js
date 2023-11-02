import{_ as o,r as e,o as c,c as l,a as n,b as s,e as t,d as p}from"./app-94573ecc.js";const u={},r=n("h1",{id:"中等",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#中等","aria-hidden":"true"},"#"),s(" 中等")],-1),k=n("h2",{id:"_2-两数相加",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-两数相加","aria-hidden":"true"},"#"),s(" 2.两数相加")],-1),i={class:"custom-container tip"},d=n("p",{class:"custom-container-title"},"TIP",-1),h=n("strong",null,"要求",-1),m=n("br",null,null,-1),w=n("strong",null,"输入",-1),_=n("br",null,null,-1),y=n("strong",null,"输出",-1),f=n("br",null,null,-1),g=n("strong",null,"解释",-1),v=n("br",null,null,-1),x=n("strong",null,"原题链接",-1),b={href:"https://leetcode.cn/problems/add-two-numbers/",target:"_blank",rel:"noopener noreferrer"},j=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m为l1链表的长度，n为l2链表的长度</span>
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
</code></pre></div><h2 id="_19-删除链表的倒数第n个结点" tabindex="-1"><a class="header-anchor" href="#_19-删除链表的倒数第n个结点" aria-hidden="true">#</a> 19.删除链表的倒数第N个结点</h2>`,2),N={class:"custom-container tip"},O=n("p",{class:"custom-container-title"},"TIP",-1),L=n("strong",null,"要求",-1),P=n("br",null,null,-1),I=n("strong",null,"输入",-1),T=n("br",null,null,-1),E=n("strong",null,"输出",-1),H=n("br",null,null,-1),V=n("strong",null,"原题链接",-1),B={href:"https://leetcode.cn/problems/remove-nth-node-from-end-of-list/",target:"_blank",rel:"noopener noreferrer"},C=p(`<p>方法一：迭代计算出链表长度</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div><h2 id="_24-两两交互链表中的节点" tabindex="-1"><a class="header-anchor" href="#_24-两两交互链表中的节点" aria-hidden="true">#</a> 24.两两交互链表中的节点</h2>`,7),F={class:"custom-container tip"},S=n("p",{class:"custom-container-title"},"TIP",-1),M=n("strong",null,"要求",-1),R=n("br",null,null,-1),U=n("strong",null,"输入",-1),q=n("br",null,null,-1),z=n("strong",null,"输出",-1),A=n("br",null,null,-1),D=n("strong",null,"原题链接",-1),G={href:"https://leetcode.cn/problems/swap-nodes-in-pairs/",target:"_blank",rel:"noopener noreferrer"},J=p(`<p>方法一：递归法</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div><h2 id="_138-随机链表的复制" tabindex="-1"><a class="header-anchor" href="#_138-随机链表的复制" aria-hidden="true">#</a> 138.随机链表的复制</h2>`,5),K={class:"custom-container tip"},Q=n("p",{class:"custom-container-title"},"TIP",-1),W=n("strong",null,"要求",-1),X=n("br",null,null,-1),Y=n("strong",null,"输入",-1),Z=n("br",null,null,-1),$=n("strong",null,"输出",-1),nn=n("br",null,null,-1),sn=n("strong",null,"原题链接",-1),an={href:"https://leetcode.cn/problems/copy-list-with-random-pointer/",target:"_blank",rel:"noopener noreferrer"},tn=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div><h2 id="_142-环形链表ii" tabindex="-1"><a class="header-anchor" href="#_142-环形链表ii" aria-hidden="true">#</a> 142.环形链表Ⅱ</h2>`,2),pn={class:"custom-container tip"},on=n("p",{class:"custom-container-title"},"TIP",-1),en=n("strong",null,"要求",-1),cn=n("br",null,null,-1),ln=n("strong",null,"输入",-1),un=n("br",null,null,-1),rn=n("strong",null,"输出",-1),kn=n("br",null,null,-1),dn=n("strong",null,"原题链接",-1),hn={href:"https://leetcode.cn/problems/linked-list-cycle-ii/",target:"_blank",rel:"noopener noreferrer"},mn=p(`<p>方法一：哈希表</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表中节点的数量</span>
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
</code></pre></div><h2 id="_146-lru缓存" tabindex="-1"><a class="header-anchor" href="#_146-lru缓存" aria-hidden="true">#</a> 146.LRU缓存</h2><h2 id="_148-排序链表" tabindex="-1"><a class="header-anchor" href="#_148-排序链表" aria-hidden="true">#</a> 148.排序链表</h2>`,6);function wn(_n,yn){const a=e("ExternalLinkIcon");return c(),l("div",null,[r,k,n("div",i,[d,n("p",null,[h,s("：给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。"),m,w,s("：l1 = [2, 4, 3], l2 = [5, 6, 4]"),_,y,s("：[7, 0, 8]"),f,g,s("：342 + 465 = 807"),v,x,s("："),n("a",b,[s("2.两数相加"),t(a)])])]),j,n("div",N,[O,n("p",null,[L,s("：给你一个链表，删除链表的倒数第n个结点，并且返回链表的头结点。"),P,I,s("：head = [1, 2, 3, 4, 5], n = 2"),T,E,s("：[1, 2, 3, 5]"),H,V,s("："),n("a",B,[s("19.删除链表的倒数第N个结点"),t(a)])])]),C,n("div",F,[S,n("p",null,[M,s("：给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题。"),R,U,s("：head = [1, 2, 3, 4]"),q,z,s("：[2, 1, 4, 3]"),A,D,s("："),n("a",G,[s("24.两两交互链表中的节点"),t(a)])])]),J,n("div",K,[Q,n("p",null,[W,s("：给你一个长度为n的链表，每个节点包含一个额外增加的随机指针random，该指针可以指向链表中的任何节点或空节点，请构造这个链表的深拷贝。"),X,Y,s("：head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]"),Z,$,s("：[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]"),nn,sn,s("："),n("a",an,[s("138.随机链表的复制"),t(a)])])]),tn,n("div",pn,[on,n("p",null,[en,s("：给你一个长度为n的链表，每个节点包含一个额外增加的随机指针random，该指针可以指向链表中的任何节点或空节点，请构造这个链表的深拷贝。"),cn,ln,s("：head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]"),un,rn,s("：[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]"),kn,dn,s("："),n("a",hn,[s("142.环形链表Ⅱ"),t(a)])])]),mn])}const gn=o(u,[["render",wn],["__file","index.html.vue"]]);export{gn as default};
