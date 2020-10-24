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

![Event Loop](../../images/interview/6.png)

### MutationObserver
在[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)中，我们可以看到`MutationObserver`的详细用法，它不是很复杂，它的作用是：创建并返回一个新的 `MutationObserver`实例，它会在指定的DOM发生变化时被调用。

我们按照文档介绍，来撰写一个例子：
```js
const callback = () => {
  console.log('text node data change')
}
const observer = new MutationObserver(callback)
let count = 1
const textNode = document.createTextNode(count)
observer.observe(textNode, {
  characterData: true
})

function func () {
  count++
  textNode.data = count
}
func() // text node data change
```
代码分析：
* 首先定义了`callback`回调函数和`MutationObserver`的实例对象，其中构造函数传递的参数是我们的`callback`。
* 然后创建一个文本节点并传入文本节点的初始文本，接着调用`MutationObserver`实例的`observe`方法，传入我们创建的文本节点和一个`config`观察配置对象，其中`characterData:true`的意思是：我们要观察`textNode`节点的文本变动。`config`还有其他选项属性，你可以在`MDN`文档中查看到。
* 接着，我们定义一个`func`函数，这个函数主要做的事情就是修改`textNode`文本节点中的文本内容，当文本内容变动后，`callback`会自动被调用，因此输出`text node data change`。


在了解了`MutationObserver`的用法后，我们来看一下`nextTick`方法中，是如何使用`MutationObserver`的：
```js
import { isIE, isNative } from './env'

// 省略代码
else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
}
```
我们可以看到，`nextTick`中首先判断了非`IE`浏览器并且`MutationObserver`可用且为原生`MutationObserver`时才会使用`MutationObserver`。对于判断非`IE`浏览器的情况，你可以看`Vue.js`的`issue`[#6466](https://github.com/vuejs/vue/issues/6466)来查看原因。

### setImmediate和setTimeout
`setTimeout`对于大部分人来说是非常常见的一个定时器方法，因此我们不做过多的介绍。

在`nextTick`方法实现中，它使用到了`setImmediate`，我们在[Can I Use](https://www.caniuse.com/?search=setImmediate)网站上可以发现，这个`API`方法只存在于高版本`IE`浏览器和低版本`Edge`浏览器中，其它浏览器不支持。

那么为什么会使用这个方法呢，这是因为我们之前提到的一个`issue`：`MutationObserver`在`IE`浏览器中并不可靠，因此在`IE`浏览器下降级到使用`setImmediate`，我们可以把`setImmediate`看做和`setTimeout`一样。
```js
setImmediate(() => {
  console.log('setImmediate')
}, 0)
// 约等于
setTimeout(() => {
  console.log('setTimeout')
}, 0)
```

## nextTick实现
介绍完`nextTick`与异步相关的知识后，我们来的分析一下`nextTick`方法的实现，首先要说的是：**异步降级**。
```js
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
我们在前面介绍过`Event Loop`事件循环，由于`macro task`和`micro task`特殊的执行机制，我们首先判断当前浏览器是否支持`Promise`，如果不支持，则降级到判断是否支持`MutationObserver`，如果还不支持，则继续降级到判断是否支持`setImmediate`，最后降级使用`setTimeout`。

在介绍完异步降级之后，我们来看`nextTick`的实现代码：
```js
const callbacks = []
let pending = false
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
`nextTick`真正的代码并不复杂，首先会把传入的`cb`收集起来，然后判断`pending`为`false`的时候开始执行`timerFunc`方法，其中`timeFunc`在异步降级的过程中被定义的。`nextTick`方法在最后还进行了判断，如果没有传入`cb`并且支持`Promise`的话，它会返回一个`promise`，因此我们在使用`nextTick`的时候可以有两种使用方式：
```js
const callback = () => {
  console.log('nextTick callback')
}
// 方式一
this.$nextTick(callback)

// 方式二
this.$nextTick().then(() => {
  callback()
})
```

在最后，我们来看一个在之前没有提到的`flushCallbacks`方法实现：
```js
const callbacks = []
let pending = false
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```
`flushCallbacks`方法的主要作用就是：将`pending`状态还原为`false`并且遍历`callbacks`数组中的方法并执行。