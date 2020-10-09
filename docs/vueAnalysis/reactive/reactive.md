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
## observe和Observer