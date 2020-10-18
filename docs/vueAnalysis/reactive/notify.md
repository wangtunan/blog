# 派发更新
在介绍完依赖收集后，我们紧接着来分析一下派发更新。在这一小节，我们的目标是弄清楚派发更新主要做什么事情以及派发更新的具体过程实现。

我们先来回答第一个问题：<br/>
问：派发更新主要做什么事情？<br/>
答：派发更新就是当响应式数据发生变动的时候，通知所有订阅了这个数据变化的`Watcher`(既`Dep`依赖)执行`update`。对于`render watcher`渲染`Watcher`而言，`update`就是触发组件重新进行更新；对于`computed watcher`计算属性`Watcher`而言，`update`就是对计算属性重新求值；对于`user watcher`用户自定义`Watcher`而言，`update`就是调用用户提供的回调函数。

## 派发更新时机
大多数人分析派发更新的时机，只说明了`Object.defineProperty()`方法中`setter`被触发的时候会进行派发更新，其实一共有四处派发更新的地方，其它三处分别为：

* `Vue.js`中七种数组变异方法被调用时，会进行派发更新。
```js
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach(function (method) {
  def(arrayMethods, method, function mutator (...args) {
    // 精简代码
    ob.dep.notify()
    return result
  })
})
```

* `Vue.set`或者`this.$set`的时候，会进行派发更新。
```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 精简代码
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

* `Vue.delete`或者`this.$delete`的时候，会进行派发更新。
```js
export function del (target: Array<any> | Object, key: any) {
  // 精简代码
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}
```

其中，以上三种派发更新与`Object.defineProperty()`方法中的`setter`被触发时的派发更新有一点不一样，`setter`中的派发更新，它的`dep`是一个在`defineReactive`方法中定义的闭包变量，意味着其只能服务于`defineReactive`方法。前者的`dep`是从`this.__ob__`对象中取的，`this.__ob__`属性是在`Observer`被实例化的时候被定义的，它指向`Observer`实例，我们在之前已经介绍过。这种独特的处理方式，方便了我们在以上三种场景下，能方便的读取到`dep`依赖，进而进行依赖的派发更新。

## 派发更新过程
在以上代码中，我们以及了解到了`dep.notify()`被调用的各种时机，在这一个小节中我们需要来看一下派发更新的过程。

当`dep.notify()`被调用时，它会执行`notify()`方法中的代码，我们来看一下`Dep`类中关于这个方法的实现：
```js
notify () {
  const subs = this.subs.slice()
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```
可以发现，`notify`主要做的就是遍历`subs`数组，然后调用`update`方法。下一步，我们来看一下`Watcher`类中关于`update`方法的代码实现：
```js
import { queueWatcher } from './scheduler'
update () {
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}
```
在`update`方法被执行的时候，首先判断了`this.lazy`和`this.sync`两个属性，其中`this.lazy`为`computed watcher`计算属性的标志，因为计算属性会延后进行求值，因此这里只是把`this.dirty`赋值为`true`，`this.sync`不属于派发更新这一章节的重点，因此不做过多的介绍。

我们来重点分析`queueWatcher`，它是撰写在`observer/scheduler.js`文件中的一个方法：
```js
const queue: Array<Watcher> = []
let has: { [key: number]: ?true } = {}
let waiting = false
let flushing = false
let index = 0

export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
}
```
我们可以在以上代码最顶部发现定义了几个变量，其中有几个比较重要的变量，它们的作用如下：
* `queue`：各种`Watcher`执行队列，无论是`render watcher`、`user watcher`还是`computed watcher`，只要不是重复的`Watcher`，最终都会被推入到`queue`队列数组中。
* `has`：用来防止重复添加`Watcher`的标志对象：
```js
// 表示id为1,2的Watcher实例已经被添加到了queue，后续遇到同样的Watcher实例，不会重复添加到队列中
const has = {
  1: true,
  2: true
}
```
* `index`：当前遍历的`Watcher`实例索引，它就是`flushSchedulerQueue`方法中使用`for`循环遍历`queue`队列数组的`index`。

介绍完以上几个重要变量后，我们来分析一下`queueWatcher`的过程：