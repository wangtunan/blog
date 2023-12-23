import{_ as i,r as a,o as n,c as r,a as o,b as e,e as l,d as c}from"./app-CVBCq-32.js";const d={},s=c('<h1 id="堆" tabindex="-1"><a class="header-anchor" href="#堆" aria-hidden="true">#</a> 堆</h1><p><strong>堆(heap)</strong>：是一种满足特定条件的完全二叉树，主要分为两种类型，如下：</p><ul><li><strong>大顶堆</strong>：任意节点的值 &gt;= 其子节点的值。</li><li><strong>小顶堆</strong>：任意节点的值 &lt;= 其子节点的值。</li></ul><p>堆作为完全二叉树的特例，具有以下特性：</p><ol><li>最底层节点靠左填充，其它层的节点都被填满。</li><li>我们将堆的二叉树根节点称为<strong>堆顶</strong>，底层最靠右的节点称为<strong>堆底</strong>。</li><li>对于大顶堆(小顶堆)，根节点堆顶元素的值分别是最大值(最小值)。</li></ol><p><img src="https://www.hello-algo.com/chapter_heap/heap.assets/min_heap_and_max_heap.png" alt="堆"></p><h2 id="堆常见操作和实现" tabindex="-1"><a class="header-anchor" href="#堆常见操作和实现" aria-hidden="true">#</a> 堆常见操作和实现</h2><p>堆通常用来实现优先队列，大顶堆相当于元素从大到小的顺序出队的优先队列，从使用角度讲，优先队列和堆相同的数据结构。</p><p>堆的常见操作如下：</p><ul><li><code>push()</code>：元素入堆。</li><li><code>pop()</code>：堆顶元素出堆。</li><li><code>peek()</code>：访问堆顶元素。</li><li><code>size()</code>：获取堆的元素数量。</li><li><code>isEmpty()</code>：判断堆是否为空。</li><li><code>left()</code>：获取左子节点索引。</li><li><code>right()</code>：获取右子节点索引。</li><li><code>parent()</code>：获取父节点索引。</li><li><code>swap()</code>：交换两个节点的值。</li><li><code>siftUp()</code>：向上堆化。</li><li><code>siftDown()</code>：向下堆化。</li></ul>',10),p={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/heap/maxHeap.js",target:"_blank",rel:"noopener noreferrer"},h=c('<h2 id="堆的常见应用" tabindex="-1"><a class="header-anchor" href="#堆的常见应用" aria-hidden="true">#</a> 堆的常见应用</h2><ul><li><strong>优先队列</strong>： 堆通常作为实现优先队列的首选数据结构，其入队和出队操作的时间复杂度均为O(logn)，而建队操作为O(n)，这些操作都非常高效。</li><li><strong>堆排序</strong>：给定一组数据，我们可以用它们建立一个堆，然后不断地执行元素出堆操作，从而得到有序数据。</li><li><strong>获取最大的第K个元素</strong>；这是一个经典的算法问题，同时也是一种典型应用，例如选择热度前 10 的新闻作为微博热搜，选取销量前 10 的商品等。</li></ul><h2 id="top-k问题" tabindex="-1"><a class="header-anchor" href="#top-k问题" aria-hidden="true">#</a> Top K问题</h2><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>问题：给定一个长度为<code>N</code>的无序数组，请返回数组中前<code>K</code>大的元素。</p></div><p>实现<code>Top K</code>问题，有以下几种方案，其对比如下：</p><ul><li><strong>遍历</strong>：其解决问题思路是在第1轮找到第一大的元素，第2轮找到第二大的元素，<code>K</code>越趋近于<code>N</code>，效率越差，时间复杂度为<code>O(n²)</code>。</li><li><strong>排序</strong>：先对数组进行完整从大到小(从小到大)排序，再返回前<code>K</code>个元素或后<code>K</code>个元素，其时间复杂度为<code>O(nlogn)</code>。</li><li><strong>堆</strong>：基于小顶堆的特性，高效完成<code>Top K</code>问题。时间复杂度范围为<code>O(n) ~ O(nlogn)</code></li></ul><p>基于小顶堆解决<code>Top K</code>问题的思路如下：</p><ol><li>初始化一个小顶堆，其堆顶元素值最小。</li><li>先将数组前<code>K</code>个元素依次入堆。</li><li>从第<code>K + 1</code>个元素开始，如果当前元素大于堆顶元素，则将堆顶元素出堆，并将当前元素入堆。</li><li>遍历完成后，堆中保存的就是最大的<code>K</code>个元素。</li></ol><p><img src="https://www.hello-algo.com/chapter_heap/top_k.assets/top_k_heap_step4.png" alt="Top K元素出堆"></p>',9),g={href:"https://github.com/wangtunan/js-algorithm/blob/master/src/heap/topKHeap.js",target:"_blank",rel:"noopener noreferrer"};function _(u,m){const t=a("ExternalLinkIcon");return n(),r("div",null,[s,o("p",null,[e("完整代码请参考，"),o("a",p,[e("基于数组实现的大顶堆"),l(t)]),e("。")]),h,o("p",null,[e("完整代码请参考，"),o("a",g,[e("基于小顶堆实现Top K问题"),l(t)]),e("。")])])}const K=i(d,[["render",_],["__file","index.html.vue"]]);export{K as default};
