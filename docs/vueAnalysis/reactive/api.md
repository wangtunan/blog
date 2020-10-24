# 变化侦测API实现
在上一节中，我们分析了变化侦测一些问题，在这一节中我们来分析一下为了解决这些问题，`Vue.js`是如何实现相关`API`的。

## Vue.set实现
`Vue.set`和`vm.$set`引用的是用一个`set`方法，其中`set`方法被定义在`observer/index.js`文件中：
```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
在代码分析之前，我们来回顾一下`Vue.set`或者`vm.$set`的用法：
```js
export default {
  data () {
    return {
      obj: {
        a: 'a'
      },
      arr: []
    }
  },
  created () {
    // 添加对象新属性
    this.$set(this.obj, 'b', 'b')
    console.log(this.obj.b) // b

    // 往数组中添加新元素
    this.$set(this.arr, 0, 'AAA')
    console.log(this.arr[0]) // AAA

    // 通过索引修改数组元素
    this.$set(this.arr, 0, 'BBB')
    console.log(this.arr[0]) // BBB
  }
}
```

代码分析：
* `set`方法首先对传入的`target`参数进行了校验，其中`isUndef`判断是否为`undefined`，`isPrimitive`判断是否为`JavaScript`原始值，如果满足其中一个条件则在开发环境下提示错误信息。
```js
export default {
  created () {
    // 提示错误
    this.$set(undefined, 'a', 'a')
    this.$set(1, 'a', 'a')
    this.$set('1', 'a', 'a')
    this.$set(true, 'a', 'a')
  }
}
```
* 随后通过`Array.isArray()`方法判断了`target`是否为数组，如果是再通过`isValidArrayIndex`判断是否为合法的数组索引，如果都满足则会使用变异`splice`方法往数组中指定位置设置值。其中，还重新设置了数组的`length`属性，这样做是因为我们传入的索引可能比现有数组的`length`还要大。

* 接着判断是否为对象，并且当前`key`是否已经在这个对象上，如果已经存在，则我们只需要进行重新复制即可。
* 最后，通过`defineReactive`方法在响应式对象上面新增一个属性，`defineReactive`方法已经在之前介绍过，这里不再累述。在`defineReactive`执行完毕后，马上进行派发更新，通知响应式数据的依赖立即更新，可以说以下两段代码是`set`方法核心中的核心：
```js
defineReactive(ob.value, key, val)
ob.dep.notify()
```

## Vue.delete实现
解决完新增属性的问题后，我们来解决以下删除属性的情况，`Vue.delete`和`vm.$delete`使用的是同一个`delete`方法，它被定义在`observer/index.js`文件中：
```js
export function del (target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}
```
在代码分析之前，我们来回顾以下`Vue.delete`或者`vm.$delete`的用法：
```js
export default {
  data () {
    return {
      obj: {
        a: 'a'
      },
      arr: [1, 2, 3]
    }
  },
  created () {
    // 删除对象属性
    this.$delete(this.obj, 'a')
    console.log(this.obj.a) // undefined
    // 删除数组元素
    this.$delete(this.arr, 1)
    console.log(this.arr)   // [1, 3]
  }
}
```
代码分析：
* 首先判断了待删除的`target`不能为`undefined`或者原始值，如果是则在开发环境下提示错误。
```js
export default {
  created () {
    // 提示错误
    this.$delete(undefined, 'a')
    this.$delete(1, 'a')
    this.$delete('1', 'a')
    this.$delete(true, 'a')
  }
}
```

* 随后通过`Array.isArray()`方法判断了`target`是否为数组，如果是再通过`isValidArrayIndex`判断是否为合法的数组索引，如果都满足则会使用变异`splice`方法删除指定位置的元素。
* 接着判断当前要删除的属性是否在`target`对象中，如果不在则直接返回，什么都不做。
* 最后，通过`delete`操作符删除对象上的属性，然后`ob.dep.notify()`进行派发更新，通知响应式对象上的依赖进行更新。

## Vue.observable实现
`Vue.observable`是在`Vue2.6+`版本才会有的一个全局方法，它的作用是让一个对象变成响应式：
```js
const obj = {
  a: 1,
  b: 2
}
const observeObj = Vue.observable(obj)
console.log(observeObj.a) // 触发getter

observeObj.b = 22 // 触发setter
```
这个全局方法是在`initGlobalAPI`的过程中被定义的，`initGlobalAPI`我们在之前已经介绍过，这里不在累述：
```js
export default function initGlobalAPI (Vue) {
  // ...
  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
  // ...
}
```
我们可以看到`observable`的实现很简单，在方法内部仅仅只是调用了`observe`方法，然后返回这个`obj`。关于`observe`的代码实现，我们在之前的章节中已经介绍过了，这里不再过多的进行说明：
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