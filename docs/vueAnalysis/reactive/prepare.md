# 前置核心概念

## Object.defineProperty介绍
也许你已经从很多地方了解到，`Vue.js`利用了`Object.defineProperty(obj, key, descriptor)`方法来实现响应式，其中`Object.defineProperty()`方法的参数介绍如下：
* `obj`：要定义其属性的对象。
* `key`：要定义或修改属性的名称。
* `descriptor`：要定义或修改属性的描述符。

其中`descriptor`有很多可选的键值， 然而对`Vue`响应式来说最重要的是`get`和`set`方法，它们分别会在获取属性值触发`getter`函数和设置属性值的时候触发`setter`。在介绍原理之前，我们来使用`Object.defineProperty()`来实现一个简单的响应式例子：
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