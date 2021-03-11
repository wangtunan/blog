# 前置核心概念

## Object.defineProperty介绍
也许你已经从很多地方了解到，`Vue.js`利用了`Object.defineProperty(obj, key, descriptor)`方法来实现响应式，其中`Object.defineProperty()`方法的参数介绍如下：
* `obj`：要定义其属性的对象。
* `key`：要定义或修改属性的名称。
* `descriptor`：要定义或修改属性的描述符。

其中`descriptor`有很多可选的键值， 然而对`Vue`响应式来说最重要的是`get`和`set`方法，它们分别会在获取属性值的时候触发`getter`，设置属性值的时候触发`setter`。在介绍原理之前，我们使用`Object.defineProperty()`来实现一个简单的响应式例子：
```js
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log('get msg')
      return val
    },
    set: function reactiveSetter (newVal) {
      console.log('set msg')
      val = newVal
    }
  })
}
const vm = {
  msg: 'hello, Vue.js'
}
let msg = ''
defineReactive(vm, 'msg', vm.msg)
msg = vm.msg          // get msg
vm.msg = 'Hello, Msg' // set msg
msg = vm.msg          // get msg
```
为了在别的地方方便的使用`Object.defineProperty()`方法，因此我们把其封装成一个`defineReactive`函数。

## proxy代理
在我们的开发过程中，我们经常会直接使用`this.xxx`的形式直接访问`props`或者`data`中的值，这是因为`Vue`为`props`和`data`默认做了`proxy`代理。关于什么是`proxy`代理，请先看一个简单的例子：
```js
this._data = {
  name: 'AAA',
  age: 23
}
// 代理前
console.log(this._data.name) // AAA
proxy(vm, '_data', 'name')
// 代理后
console.log(this.name)       // AAA
```
接下来我们详细介绍`proxy()`方法是如何实现的，在`instance/state.js`文件中定义了`proxy`方法，它的代码也很简单：
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
我们可以从上面的代码中发现，`proxy`方法主要是做了属性的`get`和`set`方法劫持。
```js
const name = this.name
this.name = 'BBB'
// 等价于
const name = this._data.name
this._data.name = 'BBB'
```
## $options属性
在之前的介绍中，我们知道当我们初始化`Vue`实例的时候传递的`options`会根据不同的情况进行配置合并，关于具体的`options`合并策略我们会在之后的章节详细介绍，现阶段我们只需要知道`$options`可以拿到合并后的所有属性，例如`props`、`methods`以及`data`等等。

假设我们定义了如下实例：
```js
const vm = new Vue({
  el: '#app',
  props: {
    msg: ''
  },
  data () {
    return {
      firstName: 'AAA',
      lastName: 'BBB',
      age: 23
    }
  },
  methods: {
    sayHello () {
      console.log('Hello, Vue.js')
    }
  },
  computed: {
    fullName () {
      return this.firstName + this.lastName
    }
  }
})
```
那么我们在之后可以通过下面的方式来取这些属性。
```js
const opts = this.$options
const props = opts.props
const methods = opts.methods
const data = opts.data
const computed = opts.computed
const watch = opts.watch
// ...等等
```