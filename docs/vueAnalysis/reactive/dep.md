# 依赖收集
在这一节中，我们来介绍依赖收集，在介绍之前我们需要知道什么是依赖收集，以及依赖收集的目的。

问：什么是依赖收集？依赖收集的目的是什么？<br/>
答：依赖收集就是对订阅数据变化的`Watcher`收集的过程。其目的是当响应式数据发生变化，触发它们的`setter`时，能够知道应该通知哪些订阅者去做相应的逻辑处理。例如，当在`template`模板中使用到了某个响应式变量，在组件初次渲染的时候。对这个响应式变量而言，应该收集`render watcher`，当其数据发生变化触发`setter`时，要通知`render watcher`进行组件重新更新。

在之前我们提到过，依赖收集发生在`Object.defineProperty()`的`getter`中，我们回顾一下`defineReactive()`代码：
```js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 省略代码
  const dep = new Dep()
  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    }
  })
}
```
我们可以从代码中看到，当触发`getter`的时候，首先判断了`Dep.target`是否存在，如果存在则调用`dep.depend()`，`dep.depend()`函数就是依赖真正收集的地方。在阅读完以上代码后，我们可能会有这样几个疑问：
* `Dep`是什么？
* `Dep.target`是什么？
* `dep.depend`是如何进行依赖收集的？

## Dep
让我们首先来回答第一个问题，介绍一下`Dep`类，`Dep`类是定义在`observer`目录下`dep.js`文件中的一个类，`observer`目录结构如下：
```sh
|-- observer       
|   |-- array.js
|   |-- dep.js
|   |-- index.js
|   |-- scheduler.js
|   |-- traverse.js
|   |-- watcher.js
```
然后，我们来看一下`Dep`类的具体定义：
```js
let uid = 0
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```
代码分析：
* `Dep`类首先定义了一个静态属性`target`，它就是`Dep.target`，我们会在之后介绍它。然后又定义了两个实例属性，`id`是`Dep`的主键，会在实例化的时候自增，`subs`是一个存储各种`Watcher`的数组。例如`render watcher`、`user watcher`和`computed watcher`。
* `addSub`和`removeSub`对应的就是往`subs`数组中添加和移除`watcher`。
* `depend`为依赖收集过程。
* `notify`当数据发生变化触发`setter`的时候，有一段这样的代码：`dep.notify()`，它的目的就是当这个响应式数据发生变化的时候，通知`subs`里面的各种`watcher`，然后执行其`update()`方法。

在介绍完以上几个属性和方法后，我们就对`Dep`是什么以及它做了哪些事情有了一个具体的认识。

## Dep.target和Watcher
我们接下来回答第二个问题，`Dep.target`是什么？`Dep.target`就是各种`Watcher`的实例，以下面代码举例说明：
```vue
<tempalte>
  <div>{{msg}}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello, Vue.js'
    }
  }
}
</script>
```
当组件初次渲染的时候，会获取`msg`的值，然后执行`pushTarget(this)`，其中`this`代表当前`Watcher`实例，`pushTarget()`函数是定义在`dep.js`文件中的一个方法，与之对应的还有一个叫做`popTarget`方法，它们的代码如下：
```js
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```
在`pushTarget`中，我们传递的`target`参数就是`Watcher`实例，然后在`pushTarget`执行的时候，它会动态设置`Dep`的静态属性`Dep.target`的值。在分析完`pushTarget`函数的代码后，我们就能明白为什么说`Dep.target`就是各种`Watcher`的实例了。

然后，我们会存在一个新的问题：`Watcher`类是如何定义的？它其实是定义在`watcher.js`文件中，其关键代码如下：
```js
let uid = 0

export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
}

```

## addDep和cleanupDeps

