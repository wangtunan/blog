# methods处理
在分析完`props`相关逻辑后，我们接下来分析与`methods`相关的逻辑，这部分相比于`props`要简单得多。
```js
export function initState (vm: Component) {
  // 省略代码
  const opts = vm.$options
  if (opts.methods) initMethods(vm, opts.methods)
}
```
在`initState()`方法中，调用了`initMethods()`并传入了当前实例`vm`和我们撰写的`methods`。接下来，我们看一下`initMethods`方法具体的实现：
```js
function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
```
在以上代码中可以看到，`initMethods()`方法实现中最重要的一段代码就是：
```js
// 空函数
function noop () {}

vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
```
它首先判断了我们定义的`methods`是不是`function`类型，如果不是则赋值为一个`noop`空函数，如果是则把这个方法进行`bind`绑定，其中传入的`vm`为当前实例。这样做的目的是为了把`methods`方法中的`this`指向当前实例，方便我们就能在`methods`方法中通过`this.xxx`的形式很方便的访问到`props`、`data`以及`computed`等与实例相关的属性或方法。

在开发环境下，它还做了如下几种判断：
* 必须为`function`类型。
```js
// 抛出错误：Method sayHello has type null in the component definition. 
//          Did you reference the function correctly?
export default {
  methods: {
    sayHello: null
  }
}
```
* 命名不能和`props`冲突。
```js
// 抛出错误：Method name has already been defined as a prop.
export default {
  props: ['name']
  methods: {
    name () {
      console.log('name')
    }
  }
}
```
* 命名不能和已有的实例方法冲突。
```js
// 抛出错误：Method $set conflicts with an existing Vue instance method. 
//          Avoid defining component methods that start with _ or $.
export default {
  methods: {
    $set () {
      console.log('$set')
    }
  }
}
```

在分析完以上`initMethods`流程后，我们能得到如下流程图：
<div style="text-align:center">
  <img src="../../images/vueAnalysis/methods.png">
</div>