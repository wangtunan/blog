# 依赖收集
在这一节中，我们来介绍依赖收集，在介绍之前我们需要知道什么是依赖收集，以及依赖收集的目的。

问：什么是依赖收集？依赖收集的目的是什么？<br/>
答：依赖收集就是对订阅数据变化的`Watcher`收集的过程。其目的是当响应式数据发生变化，触发它们的`setter`时，能够知道应该通知哪些订阅者去做相应的逻辑处理。例如，当在`template`模板中使用到了某个响应式变量，在组件初次渲染的时候，对这个响应式变量而言，应该收集`render watcher`依赖，当其数据发生变化触发`setter`时，要通知`render watcher`进行组件的重新渲染。

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
* `dep.depend`是如何进行依赖收集的？又是如何进行依赖移除的？

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
* `Dep`类首先定义了一个静态属性`target`，它就是`Dep.target`，我们会在之后介绍它。然后又定义了两个实例属性，`id`是`Dep`的主键，会在实例化的时候自增，`subs`是一个存储各种`Watcher`的数组。例如`render watcher`、`user watcher`和`computed watcher`等。
* `addSub`和`removeSub`对应的就是往`subs`数组中添加和移除各种`Watcher`。
* `depend`为依赖收集过程。
* `notify`当数据发生变化触发`setter`的时候，有一段这样的代码：`dep.notify()`，它的目的就是当这个响应式数据发生变化的时候，通知`subs`里面的各种`watcher`，然后执行其`update()`方法。这属于派发更新的过程，我们会在之后的章节介绍。

在介绍完以上几个属性和方法后，我们就对`Dep`是什么以及它做哪些事情有了一个具体的认识。

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

然后，我们会存在一个新的问题：`Watcher`类是如何定义的？它其实是定义在`watcher.js`文件中一个类，其关键代码如下：
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

从依赖收集的角度去看`Watcher`类的时候，我们在其构造函数中需要关注以下四个属性:
```js
this.deps = []             // 旧dep列表
this.newDeps = []          // 新dep列表
this.depIds = new Set()    // 旧dep id集合
this.newDepIds = new Set() // 新dep id集合
```
我们会在之后的`addDep`和`cleanupDeps`环节详细介绍以上四个属性的作用，在这一小节，我们主要关注`Watcher`的构造函数以及`get()`方法的实现。

在`Watcher`类的构造函数中，当实例化时，`deps`和`newDeps`数组以及`depIds`和`newDepIds`集合分别被初始化为空数组以及空集合，在构造函数的最后，判断了如果不是`computed watcher`(注：只有`computed watcher`其`lazy`属性才为`true`)，则会马上调用`this.get()`函数进行求值。

接下来，我们来分析一下`this.get()`方法的实现，以及`pushTarget`和`popTarget`方法配合使用的场景介绍。

```js
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
```
我们可以看到，`get()`方法的代码不是很复杂，在方法的最前面首先调用`pushTarget(this)`，通过`pushTarget()`方法首先把当前`Watcher`实例压栈到`target`栈数组中，然后把`Dep.target`设置为当前的`Watcher`实例。
```js
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}
```
然后调用`this.getter`进行求值，拿以下计算属性示例来说：
```js
export default {
  data () {
    return {
      age: 23
    }
  },
  computed: {
    newAge () {
      return this.age + 1
    }
  }
}

value = this.getter.call(vm, vm)
// 相当于
value = newAge()
```
对于`computed watcher`而言，它的`getter`属性就是我们撰写的计算属性方法，调用`this.getter`的过程，就是执行我们撰写的计算属性方法进行求值的过程。

在`this.get()`方法的最后，调用了`popTarget()`，它会把当前`target`栈数组的最后一个移除，然后把`Dep.target`设置为倒数第二个。
```js
Dep.target = null
const targetStack = []

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```
在分析了`pushTarget`和`popTarget`后，我们可能会有一个疑问，就是为什么会存在这样的压栈/出栈的操作，这样做的目的是什么？

这样做的目的是因为组件是可以嵌套的，使用栈数组进行压栈/出栈的操作是为了在组件渲染的过程中，保持正确的依赖，以下面代码为例：
```js
// child component
export default {
  name: 'ChildComponent',
  template: '<div>{{childMsg}}</div>',
  data () {
    return {
      childMsg: 'child msg'
    }
  }
}

export default {
  name: 'ParentComponent',
  template: `<div>
    {{parentMsg}}
    <child-component />
  </div>`,
  components: {
    ChildComponent
  }
  data () {
    return {
      parentMsg: 'parent msg'
    }
  }
}
```
我们都知道，组件渲染的时候，当父组件中有子组件时，会先渲染子组件，子组件全部渲染完毕后，父组件才算渲染完毕，因此组件渲染钩子函数的执行顺序为：
```js
parent beforeMount()
child beforeMount()
child mounted()
parent mounted()
```
根据以上渲染步骤，当`parent beforeMount()`开始执行时，会进行`parent render watcher`实例化，然后调用`this.get()`，此时的`Dep.target`依赖为`parent render watcher`，`target`栈数组为：
```js
// 演示使用，实际为Watcher实例
const targetStack = ['parent render watcher']
```
当`child beforeMount`开始执行的时候，会进行`child render watcher`实例化，然后调用`this.get()`，此时的`Dep.target`依赖为`child render watcher`，`target`栈数组为：
```js
// 演示使用，实际为Watcher实例
const targetStack = ['parent render watcher', 'child render watcher']
```
当`child mounted()`执行时，代表子组件的`this.getter()`调用完毕，进而会调用`popTarget()`进行出栈操作，此时的栈数组和`Dep.target`会发生变化：
```js
// 演示使用，实际为Watcher实例
const targetStack = ['parent render watcher']
Dep.target = 'parent render watcher'
```
当`parent mounted()`执行时，代表父组件的`this.getter()`调用完毕，进而会调用`popTarget()`进行出栈操作，此时的栈数组和`Dep.target`会发生变化：
```js
// 演示使用，实际为Watcher实例
const targetStack = []
Dep.target = undefined
```
通过以上示例分析，我们就弄明白了为什么会有依赖压栈/出栈这样的步骤以及这样做的目的了。接下来，让我们来分析依赖收集的过程中，`addDep`和`cleanupDeps`的逻辑。

## addDep和cleanupDeps

### addDep
在之前`Dep`类的`depend()`方法中，我们介绍过其代码实现，它会调用`addDep(dep)`：
```js
export default Dep {
  // 省略其它代码
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}
```
根据前面的分析内容，我们知道`Dep.target`其实就是各种`Watcher`实例，因此`Dep.target.addDep(this)`相当于：
```js
const watcher = new Watcher()
watcher.addDep(this)
```
接下来，让我们来看一下`Watcher`类中，`addDep`方法的实现逻辑：
```js
export default Watcher {
  // 精简代码
  constructor () {
    this.deps = []              // 旧dep列表
    this.newDeps = []           // 新dep列表
    this.depIds = new Set()     // 旧dep id集合
    this.newDepIds = new Set()  // 新dep id集合
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
}
```
`addDep`方法的逻辑不是很复杂，首先判断了当前`dep`是否已经在新`dep id`集合中，不在则更新新`dep id`集合以及新`dep`数组，随后又判断了当前`dep`是否在旧`dep id`集合中，不在则调用`dep.addSub(this)`方法，把当前`Watcher`实例添加到`dep`实例的`subs`数组中。

生硬的分析源码不是很方便我们理解`addDep`的代码逻辑，我们以下面代码示例说明：
```vue
<template>
  <p>位置一：{{msg}}</p>
  <p>位置二：{{msg}}</p>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'msg'
    }
  }
}
</script>
```
过程分析：
* 当组件初次渲染的时候，会实例化`render watcher`，此时的`Dep.target`为`render watcher`：
```js
const updateComponent = () => {
  vm._update(vm._render(), hydrating)
}

new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
```
* 第一次编译读取`msg`响应式变量时，触发`getter`进行`dep.depend()`依赖收集，然后调用`addDep()`方法，因为`deps`、`newDeps`、`depIds`和`newDepIds`初始化为空数组或者空集合，所以此时的`dep`被添加到`newDepIds`、`newDeps`中并且会执行`dep.addSub(this)`，此时可以用下面代码表示：
```js
// 实例化Dep
const dep = {
  id: 1,
  subs: []
}

// 添加到newDepIds，newDeps
this.newDepIds.push(1)
this.newDeps.push(dep)

// 调用addSub
dep.addSub(this)
console.log(dep) // { id: 1, subs: [new Watcher()] }
```
* 当第二次编译读取`msg`响应式变量时，触发`getter`进行`dep.depend`依赖收集，因为`dep`是`defineReactive`函数中的闭包变量，因此两次触发的`getter`是同一个`dep`实例。当调用`addDep`判断此时的`newDepIds`集合中`dep.id`为`1`已经存在，因此直接跳过。

你可能会发现，在分析`getter`中代码的时候，我们故意忽略了下面这段代码：
```js
if (childOb) {
  childOb.dep.depend()
  if (Array.isArray(value)) {
    dependArray(value)
  }
}
```
你可能会有这样的疑问：这点代码是干什么的？有什么作用？那么现在，我们举例说明：
```vue
<template>
  <p>{{obj.msg}}</p>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      obj: {
        msg: 'msg'
      }
    }
  }
}
</script>
```
过程分析：
* 当第一次调用`defineReactive`时，此时`defineReactive`第一个参数`obj`和`key`分别为：
```js
obj = {
  obj: {
    msg: 'msg'
  }
}

key = 'obj'
```
在`defineReactive`在最开始，实例化了一个闭包`dep`实例，我们假设实例化后的`dep`如下：
```js
const dep = new Dep()
console.log(dep) // { id: 1, subs: [] }
```
当代码执行到`observe(val)`的时候，根据之前我们分析过`observe`代码的逻辑，因为参数`obj[key]`的值是一个普通对象，因此会执行`new Observer()`实例化，而在`Observer`构造函数中，有这样一段代码：
```js
this.dep = new Dep()
```
它又实例化了一个`dep`并且把实例化后的`dep`赋值给`this.dep`，我们假设此时实例化后的`dep`如下所示：
```js
const dep = new Dep()
console.log(dep) // { id: 2, subs: [] }
```
因为`obj = { msg: 'msg' }`是一个对象，因此执行`this.walk()`遍历`obj`对象的属性，然后再次调用`defineReactive`又实例化了一个闭包`dep`实例，我们假设实例后的`dep`如下所示：
```js
const dep = new Dep()
console.log(dep) // { id: 3, subs: [] }
```
现在，我们已经有了三个`dep`实例了，其中两个是`defineReactive`函数中的闭包实例`dep`，另外一个是`childOb`(`Observer`实例)的属性`dep`。
* 在组件开始渲染的时候，根据响应式原理加上我们在`template`中读取了`obj.msg`变量，因此会先触发`obj`对象的`getter`，此时`dep`为`id=1`的那个闭包变量`dep`。此时的`Dep.target`为`render watcher`，然后进行`dep.depend()`依赖收集，当走到`addDep`方法的时候，因为我们关注的四个属性全部为空数组或者空集合，因此会把此时的`dep`添加进去，此时的`dep`表示如下：
```js
const dep = {
  id: 1,
  subs: [new Watcher()]
}
```

* 在`dep.depend()`依赖收集完毕后，会判断`childOb`，因为`childOb`为`Observer`的实例，因此条件判断为真，调用`childOb.dep.depend()`。当执行到`addDep()`时，此时的`dep`为`id=2`的那个`Observer`实例属性`dep`，不在`newDepIds`和`depIds`中，因此会把其添加进去，此时的`dep`表示如下：
```js
const dep = {
  id: 2,
  subs: [new Watcher()]
}
```
* 当响应式变量`obj`的`getter`触发完毕后，会触发`obj.msg`的`getter`，此时的`dep`为`id=3`的那个闭包变量`dep`。此时的`Dep.target`依然为`render watcher`，然后进行`dep.depend()`依赖收集，这个过程与`obj`的`getter`进行依赖收集的过程基本是一样的，当`addDep()`方法执行后，此时的`dep`表示如下：
```js
const dep = {
  id: 3,
  subs: [new Watcher()]
}
```
唯一的区别时，此时的`childOb`为`undefined`，不会调用`childOb.dep.depend()`进行子属性的依赖收集。

在分析完以上代码后，我们很容易回答一下问题：<br/>
问：`childOb.dep.depend()`是干什么的？有什么作用？<br/>
答：`childOb.dep.depend()`这段代码是进行子属性的依赖收集，这样做的目的是为了当对象或者对象属性任意一个发生变化时，都可以通知其依赖进行相应的处理。
```vue
<template>
  <p>{{obj.msg}}</p>
  <button @click="change">修改属性</button>
  <button @click="add">添加属性</button>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'App',
  data () {
    return {
      obj: {
        msg: 'msg'
      }
    }
  },
  methods: {
    change () {
      this.obj.msg = 'new msg'
    },
    add () {
      this.$set(this.obj, 'age', 23)
    }
  },
  watch: {
    obj: {
      handler () {
        console.log(this.obj)
      },
      deep: true
    }
  }
}
</script>
```

拿以上例子说明：
* 当存在`childOb.dep.depend()`收集子属性依赖时，我们无论是修改`msg`的值还是添加`age`新属性，都会触发`user watcher`，也就是打印`this.obj`的值。
* 当不存在`childOb.dep.depend()`收集子属性依赖时，我们修改`msg`的值，虽然会通知`render watcher`进行组件重新渲染，但不会通知`user watcher`打印`this.obj`的值。

### cleanupDeps
在这一小节，我们的目标是弄清楚为什么要进行依赖清除以及如何进行依赖清除。

先来看`Watcher`类中对于`cleanupDeps`的实现：
```js
export default Watcher {
  // 精简代码
  constructor () {
    this.deps = []              // 旧dep列表
    this.newDeps = []           // 新dep列表
    this.depIds = new Set()     // 旧dep id集合
    this.newDepIds = new Set()  // 新dep id集合
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
}
```
我们还是举例说明，假如有如下组件：
```vue
<template>
  <p v-if="count < 1">{{msg}}</p>
  <p v-else>{{age}}</p>
  <button @click="change">Add</button>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'App',
  data () {
    return {
      count: 0,
      msg: 'msg',
      age: 23
    }
  },
  methods: {
    change () {
      this.count++
    }
  }
}
</script>
```
过程分析：
* 当组件初次渲染完毕后，`render watcher`实例的`newDeps`数组有两个`dep`实例，其中一个是在`count`响应式变量`getter`被触发时收集的，另外一个是在`msg`响应式变量`getter`被触发时收集的(`age`因为`v-if/v-else`指令的原因，在组件初次渲染的时候不会触发`age`的`getter`)，我们使用如下代码进行表示：
```js
this.deps = []
this.newDeps = [
  { id: 1, subs: [new Watcher()] },
  { id: 2, subs: [new Watcher()] }
]
```
* 当我们点击按钮进行`this.count++`的时候，会触发组件重新更新，因为`count < 1`条件为假，因此在组件重新渲染的过程中，也会触发`age`响应式变量的`getter`进行依赖收集。当执行完`addDep`后，此时`newDeps`发生了变化：
```js
this.deps = [
  { id: 1, subs: [new Watcher()] },
  { id: 2, subs: [new Watcher()] }
]
this.newDeps = [
  { id: 1, subs: [new Watcher()] },
  { id: 3, subs: [new Watcher()] }
]
this.depIds = new Set([1, 2])
this.newDepIds = new Set([1, 3])
```
在最后一次调用`this.get()`的时候，会调用`this.cleanupDeps()`方法，在这个方法中首先遍历旧依赖列表`deps`，如果发现其中某个`dep`不在新依赖`id`集合`newDepIds`中，则调用`dep.removeSub(this)`移除依赖。在组件渲染的过程中，`this`代表`render watcher`，调用这个方法后当我们再修改`msg`变量值的时候，就不会触发组件重新渲染了。在遍历完`deps`数组后，会把`deps`和`newDeps`、`depIds`和`newDepIds`的值进行交换，然后清空`newDeps`和`newDepIds`。

在分析完以上示例后，我们就能明白为什么要进行依赖清除了：**避免无关的依赖进行组件的重复渲染、watch回调等**。