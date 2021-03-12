# 深入响应式原理
在介绍完`props`、`data`、`watch`以及`computed`后，我们对响应式原理有了一定的初步认识，在这一章节中我们再次回顾响应式，来探究其实现原理。

在之前的章节中，我们以及介绍过：`Vue.js`通过`Object.defineProperty(obj, key, descriptor)`方法来定义响应式对象，我们可以在[Can I Use](https://www.caniuse.com/?search=Object.defineProperty)网站上搜索到，`IE8`浏览器并不支持这个方法，这就是`Vue.js`不支持`IE8`及其以下版本浏览器的真正原因。

在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)网站上，我们可以发现这个方法支持很多个参数，其中`descriptor`支持许多个可选的属性，对于`Vue.js`实现响应式对象来说，最重要的是`get`和`set`属性。
```js
let val = 'msg'
const reactiveObj = {}
 Object.defineProperty(reactiveObj, msg, {
   get: function () {
     // 当访问reactiveObj.msg时被调用
     return val
   },
   set: function (newVal) {
     // 当设置reactiveObj.msg时被调用
     val = newVal
   }
 })
```
在`Vue`的响应式对象中，它会在`getter`中**收集依赖**、在`setter`中**派发更新**，我们会在之后的章节中分别对`getter`的**收集依赖**，`setter`的**派发更新**做单独的讲解。

在介绍完`Object.defineProperty`，我们来回答一个问题，什么是响应式对象？在`Vue.js`中对于什么是响应式对象，我们可以简单的理解成：用`Object.defineProperty()`方法定义时同时提供了`get`和`set`选项，我们就可以将其称之为响应式对象。

在`Vue.js`实例化时，会把`props`、`data`和`computed`等变成响应式对象，在介绍响应式对象时，我们会重点介绍`props`和`data`的处理过程，这个过程发生在`this._init()`方法中的`initState(vm)`中。
```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
我们先来看`initProps`是如何处理`props`相关的逻辑的：
```js
function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}
```
在之前分析`initProps`整体流程的过程中，我们知道`initProps`主要做三件事情：**props校验和求值**、**props响应式**和**props代理**。对于`props`代理而言它很简单，主要作用是方便我们取值。

## proxy代理
`proxy()`方法是定义在`src/core/instance/state.js`文件中：
```js
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
代码分析：
* `noop`：它代表空函数，空函数代表什么都不做。
* `target`：它是目标代理对象，在`Vue.js`中就是`Vue`实例。
* `sourceKey`：它是源属性，在`props`代理中传递的是`_props`内部私有属性。
* `key`：它是要代理的属性，在`props`中就是我们撰写的各种`props`属性。
* `sharedPropertyDefinition`：它就是`Object.defineProperty(obj, key, descriptor)`方法的`descriptor`参数，可以从上面代码中看到，在`props`代理中它提供了`enumerable`、`configurable`、`get`和`set`这几个选项。

假设我们有如下`Vue`实例：
```js
export default {
  props: ['msg', 'age']
}
```
在`proxy`代理后，我们就能通过`this.msg`和`this.age`代替`this._props.msg`和`this._props.age`的形式直接访问或者设置值：
```js
// 代理前
const msg = this._props.msg
console.log(msg)
// 单项数据流，只要演示，实际不能修改props的值
this._props.msg = 'new msg

// 代理后
const msg = this.msg
console.log(msg)
// 单项数据流，只要演示，实际不能修改props的值
this.msg = 'new msg'
```

以上就是`props`的代理过程分析，对于`data`代理而言是相同的道理，这里就不再累述。

## defineReactive
在介绍完`proxy`代理后，我们紧接着要分析`defineReactive`的实现逻辑，关于响应式的代码实现，绝大多数是在`src/core/observer`目录下，其中`defineReactive`方法是定义在其目录的`index.js`入口文件中
```js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

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
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```
代码分析：
* `defineReactive`实际上就是对`Object.defineProperty()`方法的一层包裹，主要是处理`getter`和`setter`相关的逻辑。
* `defineReactive`首先通过`Object.getOwnPropertyDescriptor()`方法获取了当前`obj.key`的属性描述，如果其属性`configurable`为`false`，则不能被定义为响应式对象，因此对于`obj.key`任何赋值都不会触发组件更新，例如：
```js
export default {
  data () {
    return {
      obj: {}
    }
  },
  created () {
    const obj = {}
    Object.defineProperty(obj, 'msg', {
      configurable: false,
      value: 'msg'
    })
    this.obj = obj
    setTimeout(() => {
      // this.obj.msg不是响应式对象，修改后不会触发组件更新
      this.obj.msg = 'new msg'
    }, 3000)
  }
}
```
## observe和Observer
我们可以在`defineReactive`中看到`observe(val)`这段代码，接下来让我们介绍`observe()`方法以及`Observer`类。`observe()`方法定义与`defineReactive()`方法定义在同一个文件中，其代码如下：
```js
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```
代码分析：
* 首先对传递的`value`进行了类型判断，不为对象或者是`VNode`实例时不进行任何操作，其中`VNode`是一个类，它会在生成虚拟DOM的时候使用到，我们会在后面进行介绍，`isObject`是一个定义在`src/shared/utils.js`文件中的工具方法。
```js
export function isObject (obj: mixed): boolean {
  return obj !== null && typeof obj === 'object'
}
```
* 然后对`value`使用`hasOwn`判断是否有`__ob__`属性且`__ob__`为`Observer`实例，添加这个属性是为了防止重复观察(避免重复定义响应式)，既：如果已经是响应式对象了，直接返回，否则才会进行下一步操作。`hasOwn`是一个定义在`src/shared/utils.js`文件中的工具方法：
```js
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
```
* 最后`value`又进行了一些条件判断，其中最重要的两个条件为`Array.isArray`和`isPlainObject`，它们分别判断`value`是否为数组，是否为普通对象，其它几个边界条件暂时不做介绍。其中`isPlainObject`是一个定义在`src/shared/utils.js`文件中的工具方法：
```js
export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
```
接下来，我们需要看一下`Observer`类的实现：
```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```
代码分析：
* `def`为定义在`src/core/utils/lang.js`文件中的一个工具方法，`def`本质上也是对`Object.defineProperty()`方法的一层包裹封装，使用`def`定义`__ob__`的目的是让`__ob__`在对象属性遍历的时候不可被枚举出来。
```js
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```
* 在`Vue.js`中对于纯对象和数组的响应式的处理方式是不同的，代码首先判断了`value`是否为数组。如果不是数组，则调用`walk()`方法。`walk()`方法实际上就是递归遍历对象属性，然后调用`defineReactive()`的过程，例如：
```js
const nestedObj = {
  a: {
    b: {
      c: 'c'
    }
  }
}
// 递归调用
defineReactive(nestedObj)
defineReactive(a)
defineReactive(b)
defineReactive(c)
```
如果是数组，则调用`observeArray()`方法，`observeArray`也是一个遍历递归调用的过程，只不过这里遍历的是数组，而不是对象的属性键。然后我们还发现，在`observeArray()`方法调用之前，还进行了`hasProto`判断，然后根据判断结果进行不同的操作。其中，`hasProto`是定义在`src/core/util/env.js`文件中的一个常量，它的目的就是为了判断当前浏览器是否支持`__proto__`属性：
```js
export const hasProto = '__proto__' in {}
```
我们都知道因为原生`API`某些限制因素，`Vue.js`对数组七种可以改变自身数组的方法提供了变异方法支持，这七种方法分别为：
```js
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
```

对这七种方法的变异处理逻辑在`src/core/ovserver/array.js`文件中：
```js
import { def } from '../util/index'
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})

```
代码分析：
* 首先以`Array.prototype`原型创建一个新的变量，这个变量会在`protoAugment`或者`copyAugment`方法的时候使用到。
* 然后遍历七种方法，使用`def`来重新定义一个包裹方法。也就是说：当我们调用这七种任意一种方法的时候，首先调用我们的包裹方法，在包裹方法里面再调用原生对应的数组方法，这样做的目的是让我们可以在这个包裹方法中做我们自己的事情，例如`notify`，这个过程可以使用以下伪代码实例描述：
```js
// Array.prototype.push方法为例
function mutatorFunc (value) {
  const result = Array.prototype.push(value)
  // do something
  return result
}
export default {
  data () {
    return {
      arr: []
    }
  },
  created () {
    this.arr.push('123')
    // 相当于
    mutatorFunc(123)
  }
}
```
然后我们接下来看一下`protoAugment`和`copyAugment`的实现，首先是最简单的`protoAugment`：
```js
// 定义
const arr = []
export const arrayMethods = Object.create(arrayProto)
function protoAugment (target, src: Object) {
  target.__proto__ = src
}

// 调用
protoAugment(arr, arrayMethods)

// 调用后
arr.__proto__ = {
  // 省略其它
  push: function () {},
  pop: function () {},
  shift: function () {},
  unshift: function () {},
  splice: function () {},
  sort: function () {},
  reverse: function () {}
}
arr.push()
arr.pop()
arr.shift()
arr.unshift()
arr.splice()
arr.sort()
arr.reverse()
```
代码分析：当浏览器支持`__proto__`属性的时候，直接把`__proto__`指向我们创建的`arrayMethods`变量，这个包含我们在上面定义的七种变异方法。

当浏览器不支持`__proto__`属性的时候，我们就调用`copyAugment`方法：
```js
// 定义
const arr = []
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
export const arrayMethods = Object.create(arrayProto)
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

// 调用
copyAugment(arr, arrayMethods, arrayKeys)

// 调用后
arr = {
  // 省略其它
  push: function () {},
  pop: function () {},
  shift: function () {},
  unshift: function () {},
  splice: function () {},
  sort: function () {},
  reverse: function () {}
}
arr.push()
arr.pop()
arr.shift()
arr.unshift()
arr.splice()
arr.sort()
arr.reverse()
```
代码分析：我们可以从代码中看到，当浏览器不支持`__proto__`的时候，会把我们创建的`arrayMethods`变量上所有的`key`，遍历赋值到`value`数组上。