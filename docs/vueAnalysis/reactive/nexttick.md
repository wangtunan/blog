# nextTick实现原理
在使用`Vue.js`开发的时候，如果我们要根据数据状态操作正确的`DOM`，那么我们一定和`nextTick()`方法打过交道，它是`Vue.js`中一个比较核心的一个方法，在这一章节中我们来介绍`Vue.js`中`nextTick`是如何实现的。

## 异步知识
由于`nextTick`涉及到许多与异步相关联的知识，因此为了降低学习难度，我们先来介绍这些异步知识。

### Event Loop
我们都知道`JavaScript`是单线程的，它是基于`Event Loop`事件循环来执行的，`Event Loop`在执行的时候遵循一定的规则：所有同步任务都在主线程中执行，形成一个**执行栈**，所有异步任务，都会被暂时放入一个**任务队列**中，当所有同步任务执行完毕时，会读取这个任务队列让其进入执行栈，开始执行。以上介绍属于一次执行机制，主线程不断重复这个过程就形成了`Event Loop`事件循环。

以上是对`Event Loop`的大体介绍，但在`Event Loop`执行的时候，还有一些细节需要我们去掌握。

我们在派发更新章节提到过`tick`，那么什么是`tick`？`tick`就是主线程的一次执行过程。所有异步任务都是通过任务队列来调度的，任务队列中存放的是一个个任务(`task`)，而这一个个`task`按照规范，又分为`macro task`宏任务和`micro task`微任务。`macro task`和`micro task`在执行的时候存在一个微妙的关系：每个`macro task`执行结束后，会清空所有的`micro task`。

在浏览器环境下，`macro task`和`micro task`对应如下：
* `macro task`宏任务：`MessageChannel`、`postMessage`、`setImmediate`和`setTimeout`。
* `micro task`微任务：`Promise.then`和`MutationObsever`。

### Promise

### MutationObserver

### setImmediate和setTimeout

## nextTick实现

## nextTick流程
