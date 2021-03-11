# data处理
`Vue`中关于`data`的处理，根实例和子组件有一点点区别，接下来我们着重分析子组件中关于`data`的处理过程。
```js
export function initState (vm: Component) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
}
```
在以上代码中，首先判断了`opts.data`，如果值为真则代表是子组件(子组件如果没有显示定义`data`，则使用默认值)，否则代表是根实例。对于根实例而言我们不需要执行`initData`的过程，只要对`vm._data`进行`observe`即可。

接下来，我们详细分析`initData`的过程，它是定义在`src/core/instance/state.js`文件中的一个方法：
```js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```
虽然`initData()`方法的代码有点长，但我们详细观察后可以发现，其主要做的就是四件事情：**类型判断取值**、**命名冲突判断**、**proxy代理**以及**observe(data)**。

然后，我们分别对以上几块进行详细解释：
* **类型判断取值**：对于子组件而言，由于组件可以多次复用，因此函数必须通过工厂函数模式返回一个对象，这样在组件多次复用时就能避免引用类型的问题。
```js
// Child Component
// 抛出错误：data functions should return an object
export default {
  data: {
    msg: 'Hello, Data'
  }
}
```
对于`data`是一个函数的情况，我们调用`getData`方法来取值，`getData`方法定义如下：
```js
export function getData (data: Function, vm: Component): any {
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
```
代码分析：`pushTarget`是一个与响应式依赖收集有关的，我们会在后续进行详细说明。`getData`的取值过程包裹在`try/catch`中，通过`data.call(vm, vm)`进行调用返回，如果函数调用出错，则使用`handleError`进行错误统一处理。

* **命名冲突判断**：由于`props`和`methods`有更高的优先级，因此`data`属性的命名不能和`props`、`methods`中的命名冲突，因为无论是`props`、`methods`还是`data`最后都会反映在实例上。另外一种命名冲突，是不能以`$`或者`_`开头，因为这样很容易和实例私有方法、属性或对外暴露以`$`开头的方法、属性冲突。
```js
// 1.与methods命名冲突
// 抛出错误：Method name has already been defined as a data property.
export default {
  data () {
    return {
      name: 'data name'
    }
  },
  methods: {
    name () {
      console.log('methods name')
    }
  }
}

// 2.与props命名冲突
// 抛出错误：The data property name is already declared as a prop.
//          Use prop default value instead.
export default {
  props: ['name'],
  data () {
    return {
      name: 'data name'
    }
  }
}

// 3.不能以$和_开头
export default {
  data () {
    return {
      $data: '$data'
      _isVue: true
    }
  }
}
```

* **proxy代理**：我们在之前已经介绍过`proxy`代理的作用，也讲过`proxy`代理`_props`的例子，这里代理`_data`跟代理`_props`是同样的道理。
```js
export default {
  data () {
    return {
      msg: 'Hello, Msg'
    }
  }
}
// 代理前
console.log(this._data.msg)
proxy(vm, '_data', 'msg')
// 代理后
console.log(this.msg)
```

* **observe(data)**：`observe`的作用是把传入值所有的属性(包括嵌套属性)递归的进行响应式`defineReactive`，我们会在之后的章节中详细介绍`observe`的实现原理，在`initData`中我们只要知道`observe(data)`会把`data`函数返回对象的所有属性全部变成响应式的即可。

在分析完`initData`的实现后，我们可以得到`initData`的整体流程图。
<div style="text-align: center">
  <img src="../../images/vueAnalysis/data.png" />
</div>
