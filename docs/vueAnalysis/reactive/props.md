# props处理
介绍完以上前置核心概念后，我们第一个要学习的就是`Vue.js`是如何处理与`props`相关的逻辑的。我们把与`props`相关的逻辑主要分成三个部分，分别是`props`规范化、`props`初始化和`props`更新。

## props规范化
在了解规范化之前，我们先来列举一下在日常的开发过程中，我们主要有如下几种撰写组件`props`的方式：
* 数组形式：`props`可以写成一个数组，但数组中的`key`元素必须为`string`类型。
```js
export default {
  props: ['name', 'age']
}
```
* 键值不为对象：此种方式常见于只需要定义`key`类型的`props`。
```js
export default {
  props: {
    name: String
  }
}
```
* 规范格式：此种方式是`Vue.js`接受`props`最好的格式，对于一个有很高要求的组件来说，它通过会撰写很严格的`props`规则，这在各个开源UI框架中是最常见的。
```js
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    }
  }
}
```
而`props`规范化所做的事情，就是把各种不是规范格式的形式，规范化为规范格式，方便`Vue.js`在后续的过程中处理`props`。那么接下来，我们就来分析`Vue.js`是如何对`props`规范化的。

`props`规范化的过程发生在`this._init()`方法中的`mergeOptions`合并配置中：
```js
import { mergeOptions } from '../util/index'
export function _init (Vue) {
  const vm = this
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```
其中`mergeOptions()`方法是定义在`src/core/util/options.js`文件中，它在其中有一段这样的方法调用：
```js
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  // 省略代码
  normalizeProps(child, vm)
  return options
} 
```
我们可以发现，规范化`props`的代码，主要集中在`normalizeProps()`方法中，那么接下来我们详细分析`normalizeProps()`方法：
```js
function normalizeProps (options: Object, vm: ?Component) {
  const props = options.props
  if (!props) return
  const res = {}
  let i, val, name
  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "props": expected an Array or an Object, ` +
      `but got ${toRawType(props)}.`,
      vm
    )
  }
  options.props = res
}
```

为了更好的理解`normalizeProps()`方法，我们来撰写几个案例来详细说明：
* 数组形式：当`props`是数组时，会首先倒序遍历这个数组，然后使用`typeof`来判断数组元素的类型。如果不是`string`类型，则在开发环境下报错，如果是`string`类型，则先把`key`转化为驼峰形式，然后把这个`key`赋值到临时的`res`对象中，此时的键值固定为`{ type: null }`
```js
// 规范化前
export default {
  props: ['age', 'nick-name']
}

// 规范化后
export default {
  props: {
    age: {
      type: null
    },
    nickName: {
      type: null
    }
  }
}
```
* 对象形式：当为对象时会使用`for-in`遍历对象，紧接着和数组形式一样使用`camelize`来把`key`转成驼峰形式，然后使用`isPlainObject()`方法来判断是否为普通对象。如果不是，则转成`{ type: Type }`对象形式，其中`Type`为定义`key`时的`Type`，如果是，则直接使用这个对象。
```js
// 规范化前
export default {
  props: {
    name: String,
    age: Number
  }
}

// 规范化后
export default {
  props: {
    name: {
      type: String
    },
    age: {
      type: Number
    }
  }
}
```

* 既不是数组形式也不是对象形式：报错
```js
// 报错：Invalid value for option "props": expected an Array or an Object，but got String
export default {
  props: 'name, age'
}
```
## props初始化
在了解了`props`规范化后，我们紧接着来了解一下`props`初始化的过程。`props`初始化过程同样是发生在`this._init()`方法中，它在`initState`的时候被处理：
```js
export function initState (vm) {
  // 省略代码
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
}
```
然后我们来详细看一下`initProps`中的代码：
```js
function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
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
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}
```
在仔细阅读`initProps()`方法后，我们可以对`initProps()`方法进行总结，它主要做三件事情：**props校验和求值**、**props响应式**和**props代理**。

### props响应式
我们先来看看最简单的`props`响应式，这部分的过程主要使用了我们在之前介绍过的`defineReactive`方法：
```js
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
```
唯一值得注意的地方就是：在开发环境下，`props`的响应式劫持了`setter`方法，这样做的是为了保证`props`为单项数据流：既我们不能在子组件中直接修改父组件传递的`props`值。

### props代理
经过`props`响应式后，我们会在实例上得到`this._props`对象，为了方便我们更好的获取`props`的值，我们需要对`props`做一层`proxy`代理。关于`proxy`的实现，我们已经在之前的章节中介绍过了。
```js
this._props = {
  name: '',
  age: 0
}

// 代理前
console.log(this._props.name)
proxy(vm, `_props`, key)
// 代理后
console.log(this.name)
```

## props更新

## toggleObserving作用