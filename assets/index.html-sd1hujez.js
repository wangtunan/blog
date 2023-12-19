import{_ as o,r as e,o as c,c as l,e as s,a as p,b as t,d as a}from"./app-ZzpLKJdP.js";const k={},u=p("h1",{id:"简单",tabindex:"-1"},[p("a",{class:"header-anchor",href:"#简单","aria-hidden":"true"},"#"),t(" 简单")],-1),r=p("h2",{id:"_21-合并两个有序链表",tabindex:"-1"},[p("a",{class:"header-anchor",href:"#_21-合并两个有序链表","aria-hidden":"true"},"#"),t(" 21.合并两个有序链表")],-1),i=a(`<p>方法一：递归</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m和n分别为两个链表的长度</span>
<span class="token comment">// 时间复杂度：O(m + n)</span>
<span class="token comment">// 空间复杂度：O(m + n)，递归调用时存在栈空间开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>list1 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> list2
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>list2 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> list1
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>list1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> list2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    list1<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>list1<span class="token punctuation">.</span>next<span class="token punctuation">,</span> list2<span class="token punctuation">)</span>
    <span class="token keyword">return</span> list1
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    list2<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>list1<span class="token punctuation">,</span> list2<span class="token punctuation">.</span>next<span class="token punctuation">)</span>
    <span class="token keyword">return</span> list2
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>方法二：迭代</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m和n分别为两个链表的长度</span>
<span class="token comment">// 时间复杂度：O(m + n)</span>
<span class="token comment">// 空间复杂度：O(1)，仅需要常量存储空间</span>
<span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">list1<span class="token punctuation">,</span> list2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> dummy
  <span class="token keyword">while</span><span class="token punctuation">(</span>list1 <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> list2 <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> list2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1
      list1 <span class="token operator">=</span> list1<span class="token punctuation">.</span>next 
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list2
      list2 <span class="token operator">=</span> list2<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token comment">// while循环结束后，list1和list2中还有未合并的节点，直接使用</span>
  curr<span class="token punctuation">.</span>next <span class="token operator">=</span> list1 <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> list2 <span class="token operator">:</span> list1
  <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_141-环形链表" tabindex="-1"><a class="header-anchor" href="#_141-环形链表" aria-hidden="true">#</a> 141.环形链表</h2>`,5),d=a(`<p>方法一：哈希表</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，最坏情况遍历全部节点</span>
<span class="token comment">// 空间复杂度：O(n)，为哈希表的内存开销</span>
<span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>head <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果哈希表中存在相同的节点，则表示有环</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
    head <span class="token operator">=</span> head<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>方法二：快慢指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，最坏情况遍历全部节点</span>
<span class="token comment">// 空间复杂度：O(1)，仅定义了两个快慢指针变量</span>
<span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// slow和fast不在同一个位置，是为了执行while循环，如果是do-while，可设置为同一个位置</span>
  <span class="token keyword">let</span> slow <span class="token operator">=</span> head
  <span class="token keyword">let</span> fast <span class="token operator">=</span> head<span class="token punctuation">.</span>next
  <span class="token keyword">while</span><span class="token punctuation">(</span>slow <span class="token operator">!==</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 快指针遍历完毕时，还没有相等，则表示无环</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> fast<span class="token punctuation">.</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_160-相交链表" tabindex="-1"><a class="header-anchor" href="#_160-相交链表" aria-hidden="true">#</a> 160.相交链表</h2>`,5),w=a(`<p>方法一：哈希表</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m，n分别为两个链表的长度</span>
<span class="token comment">// 时间复杂度：O(m + n)，需要分别遍历两个链表</span>
<span class="token comment">// 空间复杂度：O(m)，需要把其中一个链表的节点存储到哈希表中</span>
<span class="token keyword">var</span> <span class="token function-variable function">getIntersectionNode</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">headA<span class="token punctuation">,</span> headB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> headA
  <span class="token comment">// 把第一个链表中的节点存储到哈希表中</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>curr <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token comment">// 遍历第二个链表，如果存在一个节点在哈希表中，则代表其为相交节点</span>
  curr <span class="token operator">=</span> headB
  <span class="token keyword">while</span><span class="token punctuation">(</span>curr <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> curr
    <span class="token punctuation">}</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>方法二：双指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m，n分别为两个链表的长度</span>
<span class="token comment">// 时间复杂度：O(m + n)，两个链表都需要遍历一遍</span>
<span class="token comment">// 空间复杂度：O(1)，仅需要定义两个指针变量</span>
<span class="token keyword">var</span> <span class="token function-variable function">getIntersectionNode</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">headA<span class="token punctuation">,</span> headB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>headA <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> headB <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> pA <span class="token operator">=</span> headA
  <span class="token keyword">let</span> pB <span class="token operator">=</span> headB
  <span class="token comment">// headA遍历完毕时，从headB重新开始遍历</span>
  <span class="token comment">// headB遍历完毕时，从headA重新开始遍历</span>
  <span class="token comment">// while循环终止时，有相交节点的情况下，pA或者pB即为相交节点；否的话，表示两个链表已遍历完毕</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>pA <span class="token operator">!==</span> pB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    pA <span class="token operator">=</span> pA <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> headB <span class="token operator">:</span> pA<span class="token punctuation">.</span>next
    pB <span class="token operator">=</span> pB <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> headA <span class="token operator">:</span> pB<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> pA
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_206-反转链表" tabindex="-1"><a class="header-anchor" href="#_206-反转链表" aria-hidden="true">#</a> 206.反转链表</h2>`,5),m=a(`<p>方法一：双指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n)，需要遍历链表</span>
<span class="token comment">// 空间复杂度：O(1)，定义双指针变量</span>
<span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> head
  <span class="token keyword">while</span><span class="token punctuation">(</span>curr <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
    curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev
    prev <span class="token operator">=</span> curr
    curr <span class="token operator">=</span> next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> prev
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_234-回文链表" tabindex="-1"><a class="header-anchor" href="#_234-回文链表" aria-hidden="true">#</a> 234.回文链表</h2>`,3),y=a(`<p>方法一：数组 + 双指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
<span class="token comment">// 时间复杂度：O(n) + O(n/2) = O(n)，一次链表遍历 + 一半数组遍历</span>
<span class="token comment">// 空间复杂度：O(n)，定义数组存储链表信息</span>
<span class="token keyword">var</span> <span class="token function-variable function">isPalindrome</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>head <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    head <span class="token operator">=</span> head<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> j <span class="token operator">=</span> list<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">,</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> list<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,2);function h(f,v){const n=e("leetcode-link");return c(),l("div",null,[u,r,s(n,{title:"21.合并两个有序链表",link:"https://leetcode.cn/problems/merge-two-sorted-lists/"}),i,s(n,{title:"141.环形链表",link:"https://leetcode.cn/problems/linked-list-cycle/"}),d,s(n,{title:"160.相交链表",link:"https://leetcode.cn/problems/intersection-of-two-linked-lists/"}),w,s(n,{title:"206.反转链表",link:"https://leetcode.cn/problems/reverse-linked-list/"}),m,s(n,{title:"234.回文链表",link:"https://leetcode.cn/problems/palindrome-linked-list/"}),y])}const g=o(k,[["render",h],["__file","index.html.vue"]]);export{g as default};
