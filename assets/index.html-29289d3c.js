import{_ as o,r as e,o as c,c as l,a as n,b as s,e as t,d as p}from"./app-94573ecc.js";const u={},r=n("h1",{id:"简单",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简单","aria-hidden":"true"},"#"),s(" 简单")],-1),k=n("h2",{id:"_21-合并两个有序链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_21-合并两个有序链表","aria-hidden":"true"},"#"),s(" 21.合并两个有序链表")],-1),i={class:"custom-container tip"},d=n("p",{class:"custom-container-title"},"TIP",-1),h=n("strong",null,"要求",-1),_=n("br",null,null,-1),m=n("strong",null,"输入",-1),w=n("br",null,null,-1),y=n("strong",null,"输出",-1),f=n("br",null,null,-1),v=n("strong",null,"原题链接",-1),g={href:"https://leetcode.cn/problems/merge-two-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},b=p(`<p>方法一：递归</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m和n分别为两个链表的长度</span>
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
</code></pre></div><h2 id="_141-环形链表" tabindex="-1"><a class="header-anchor" href="#_141-环形链表" aria-hidden="true">#</a> 141.环形链表</h2>`,5),x={class:"custom-container tip"},j=n("p",{class:"custom-container-title"},"TIP",-1),B=n("strong",null,"要求",-1),O=n("br",null,null,-1),A=n("strong",null,"输入",-1),T=n("br",null,null,-1),I=n("strong",null,"输出",-1),L=n("br",null,null,-1),N=n("strong",null,"原题链接",-1),P={href:"https://leetcode.cn/problems/linked-list-cycle/",target:"_blank",rel:"noopener noreferrer"},V=p(`<p>方法一：哈希表</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div><h2 id="_160-相交链表" tabindex="-1"><a class="header-anchor" href="#_160-相交链表" aria-hidden="true">#</a> 160.相交链表</h2>`,5),C={class:"custom-container tip"},E=n("p",{class:"custom-container-title"},"TIP",-1),S=n("strong",null,"要求",-1),q=n("br",null,null,-1),z=n("strong",null,"输入",-1),D=n("br",null,null,-1),F=n("strong",null,"输出",-1),G=n("br",null,null,-1),H=n("strong",null,"原题链接",-1),J={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists/",target:"_blank",rel:"noopener noreferrer"},K=p(`<p>方法一：哈希表</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// m，n分别为两个链表的长度</span>
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
</code></pre></div><h2 id="_206-反转链表" tabindex="-1"><a class="header-anchor" href="#_206-反转链表" aria-hidden="true">#</a> 206.反转链表</h2>`,5),M={class:"custom-container tip"},Q=n("p",{class:"custom-container-title"},"TIP",-1),R=n("strong",null,"要求",-1),U=n("br",null,null,-1),W=n("strong",null,"输入",-1),X=n("br",null,null,-1),Y=n("strong",null,"输出",-1),Z=n("br",null,null,-1),$=n("strong",null,"原题链接",-1),nn={href:"https://leetcode.cn/problems/reverse-linked-list/",target:"_blank",rel:"noopener noreferrer"},sn=p(`<p>方法一：双指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div><h2 id="_234-回文链表" tabindex="-1"><a class="header-anchor" href="#_234-回文链表" aria-hidden="true">#</a> 234.回文链表</h2>`,3),an={class:"custom-container tip"},tn=n("p",{class:"custom-container-title"},"TIP",-1),pn=n("strong",null,"要求",-1),on=n("br",null,null,-1),en=n("strong",null,"输入",-1),cn=n("br",null,null,-1),ln=n("strong",null,"输出",-1),un=n("br",null,null,-1),rn=n("strong",null,"原题链接",-1),kn={href:"https://leetcode.cn/problems/palindrome-linked-list/",target:"_blank",rel:"noopener noreferrer"},dn=p(`<p>方法一：数组 + 双指针</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// n为链表的长度</span>
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
</code></pre></div>`,2);function hn(_n,mn){const a=e("ExternalLinkIcon");return c(),l("div",null,[r,k,n("div",i,[d,n("p",null,[h,s("：将两个升序链表合并为一个新的升序链表并返回。"),_,m,s("：list1 = [1, 2, 4], list2 = [1, 3, 4]"),w,y,s("：[1, 1, 2, 3, 4, 4]"),f,v,s("："),n("a",g,[s("21.合并两个有序链表"),t(a)])])]),b,n("div",x,[j,n("p",null,[B,s("：给你一个链表的头节点head，判断链表中是否有环。"),O,A,s("：head = [3,2,0,-4], pos = 1(pos为1表示尾结点和链表中第二个节点相连)"),T,I,s("：true"),L,N,s("："),n("a",P,[s("141.环形链表"),t(a)])])]),V,n("div",C,[E,n("p",null,[S,s("：给你两个单链表的头节点headA和headB ，请你找出并返回两个单链表相交的起始节点。如果不存在相交节点，返回 null。"),q,z,s("：listA = [1,9,1,2,4], listB = [3,2,4]"),D,F,s("：2"),G,H,s("："),n("a",J,[s("160.相交链表"),t(a)])])]),K,n("div",M,[Q,n("p",null,[R,s("：给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。"),U,W,s("：head = [1,2,3,4,5]"),X,Y,s("：[5,4,3,2,1]"),Z,$,s("："),n("a",nn,[s("206.反转链表"),t(a)])])]),sn,n("div",an,[tn,n("p",null,[pn,s("：给你一个单链表的头节点head，请你判断该链表是否为回文链表。"),on,en,s("：head = [1,2,2,1]"),cn,ln,s("：true"),un,rn,s("："),n("a",kn,[s("234.回文链表"),t(a)])])]),dn])}const yn=o(u,[["render",hn],["__file","index.html.vue"]]);export{yn as default};
