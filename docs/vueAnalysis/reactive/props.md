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
* 规范格式：此种方式是`Vue.js`接受`props`最好的格式，对于一个有很高要求的组件来说，它通常会撰写很严格的`props`规则，这在各个开源UI框架中是最常见的。
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

### props校验求值
最后我们来看稍微复杂一点的`props`校验求值，这部分的功能发生在`validateProp`，它的代码如下：
```js
export function validateProp (
  key: string,
  propOptions: Object,
  propsData: Object,
  vm?: Component
): any {
  const prop = propOptions[key]
  const absent = !hasOwn(propsData, key)
  let value = propsData[key]
  // boolean casting
  const booleanIndex = getTypeIndex(Boolean, prop.type)
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      const stringIndex = getTypeIndex(String, prop.type)
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key)
    // since the default value is a fresh copy,
    // make sure to observe it.
    const prevShouldObserve = shouldObserve
    toggleObserving(true)
    observe(value)
    toggleObserving(prevShouldObserve)
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(__WEEX__ && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent)
  }
  return value
}
```
**代码分析**：我们可以从以上代码中发现，`validateProp`虽然说的是带有校验的功能，但它并不会抛出错误进而阻止`validateProp()`方法返回`value`，而是根据校验的过程中的不同情况尽可能的提示出很清晰的提示。实质上`validateProp()`方法最主要的还是返回`value`，同时也根据不同的`props`写法处理不同的情况。我们可以将`validateProp()`方法进行总结，它主要做如下几件事情：
* 处理`Boolean`类型的`props`。
* 处理`default`默认数据。
* `props`断言。

那么我们接下来将分别对这几件事情进行详细的描述。

#### 处理Boolean类型
我们先来看几个`props`传递`Boolean`的例子：
```js
// Component A
export default {
  props: {
    fixed: Boolean
  }
}

// Component B
export default {
  props: {
    fixed: [Boolean, String]
  }
}

// Component C
export default {
  props: {
    fixed: []
  }
}
```
然后回到源码中处理`Boolean`类型`getTypeIndex`的地方，这个函数的代码如下：
```js
function getTypeIndex (type, expectedTypes): number {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (let i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}
```
这个函数的实现逻辑比较清晰：
1. 以`Component A`组件为例，它的`props`不是一个数组但却是`Boolean`类型，因此返回索引`0`。
2. 以`Component B`组件为例，因为它的`props`是一个数组，所以要遍历这个数组，然后返回`Boolean`类型在数组中的索引`i`。
3. 以`Component C`组件为例，虽然它是一个数组，但数组中没有任何元素，因此返回索引`-1`。

在拿到`booleanIndex`后，我们需要走下面这段代码逻辑：
```js
const booleanIndex = getTypeIndex(Boolean, prop.type)
if (booleanIndex > -1) {
  if (absent && !hasOwn(prop, 'default')) {
    value = false
  } else if (value === '' || value === hyphenate(key)) {
    // only cast empty string / same name to boolean if
    // boolean has higher priority
    const stringIndex = getTypeIndex(String, prop.type)
    if (stringIndex < 0 || booleanIndex < stringIndex) {
      value = true
    }
  }
}
```
代码分析：
* 在`if`条件判断中`absent`代表虽然我们在子组件中定义了`props`，但是父组件并没有传递任何值，然后`&`条件又判断了子组件`props`有没有提供`default`默认值选项，如果没有，那么它的值只能为`false`。
```js
// 父组件未传递fixed
export default {
  name: 'ParentComponent'
  template: `<child-component />`
}

// 子组件fixed值取false
export default {
  name: 'ChildComponent',
  props: {
    fixed: Boolean
  }
}
```

* 在`else if`条件判断中，我们判断了两种特殊的`props`传递方式：
```js
// Parent Component A
export default {
  name: 'ParentComponentA',
  template: `<child-component fixed />`
}

// Parent Component B
export default {
  name: 'ParentComponentB',
  template: `<child-component fixed="fixed" />`
}
```
对于第一个种情况`stringIndex`为`-1`，`booleanIndex`为`0`，因此`value`的值为`true`。对于第二种情况，则需要根据`props`的定义具体区分：
```js
// Child Component A
export default {
  name: 'ChildComponentA'
  props: {
    fixed: [Boolean, String]
  }
}

// Child Component B
export default {
  name: 'ChildComponentB',
  props: [String, Boolean]
}
```
1. 对于`ChildComponentA`来说，由于`stringIndex`值为`1`，`booleanIndex`值为`0`，`booleanIndex < stringIndex`因此我们可以认为`Boolean`具有更高的优先级，此时`value`的值为`true`。
2. 对于`ChildComponentB`来说，由于`stringIndex`值为`0`，`booleanIndex`值为`1`，`stringIndex < booleanIndex`因此我们可以认为`String`具有更高的优先级，此时`value`的值不处理。

#### 处理default默认数据
处理完`Boolean`类型后，我们来处理默认值，既我们提到过的虽然子组件定义了`props`，但父组件没有传递的情况。
```js
// 父组件未传递fixed
export default {
  name: 'ParentComponent'
  template: `<child-component />`
}

// 子组件提供了default选项
export default {
  name: 'ChildComponent',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  }
}
```
对于以上案例会走如下代码的逻辑：
```js
if (value === undefined) {
  value = getPropDefaultValue(vm, prop, key)
}

function getPropDefaultValue (vm: ?Component, prop: PropOptions, key: string): any {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  const def = prop.default
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    )
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}
```
代码分析：
1. 首先判断了子组件有没有提供`default`默认值选项，没有则直接返回`undefined`。
2. 随后判断了`default`如果是引用类型，则提示必须把`default`写成一个函数，既：
```js
default: {}
default: []

// 必须写成
default () {
  return {}
}
default () {
  return []
}
```
3. 最后再根据`default`的类型来取值，如果是函数类型则调用这个函数，如果不是函数类型则直接使用。
4. 其中下面一段代码在这里我们并不会说明和分析它的具体作用，而是会在`props`更新章节来介绍。
```js
if (vm && vm.$options.propsData &&
  vm.$options.propsData[key] === undefined &&
  vm._props[key] !== undefined
) {
  return vm._props[key]
}
```

#### props断言
最后我们来分析一下`props`断言。
```js
function assertProp (
  prop: PropOptions,
  name: string,
  value: any,
  vm: ?Component,
  absent: boolean
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    )
    return
  }
  if (value == null && !prop.required) {
    return
  }
  let type = prop.type
  let valid = !type || type === true
  const expectedTypes = []
  if (type) {
    if (!Array.isArray(type)) {
      type = [type]
    }
    for (let i = 0; i < type.length && !valid; i++) {
      const assertedType = assertType(value, type[i])
      expectedTypes.push(assertedType.expectedType || '')
      valid = assertedType.valid
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    )
    return
  }
  const validator = prop.validator
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      )
    }
  }
}
```
在`assertProp`中我们有三种情况需要去断言：
* `required`：如果子组件`props`提供了`required`选项，代表这个`props`必须在父组件中传递值，如果不传递则抛出错误信息`Missing required prop: fixed`。
* 对于定义了多个`type`的类型数组，则我们会遍历这个类型数组，只要当前`props`的类型和类型数组中某一个元素匹配则终止遍历。，否则抛出错误提示信息。
```js
// Parent Component
export default {
  name: 'ParentComponent',
  template: `<child-component :age="true" />`
}
// Chil Component
export default {
  name: 'ChilComponent',
  props: {
    age: [Number, String]
  }
}

// 报错：Invalid prop: type check failed for prop age，Expected Number, String，got with value true
```
* 用户自己提供的`validator`校验器我们也需要进行断言：
```js
// Parent Component
export default {
  name: 'ParentComponent',
  template: `<child-component :age="101" />`
}
// Chil Component
export default {
  name: 'ChilComponent',
  props: {
    age: {
      type: Number,
      validator (value) {
        return value >=0 && value <=100
      }
    }
  }
}

// 报错：Invalid prop: custom validator check failed for prop age
```


## props更新
我们都知道子组件的`props`值来源于父组件，当父组件值更新时，子组件的值也会发生改变，同时触发子组件的重新渲染。我们先跳过父组件的具体编译逻辑，直接看父组件的值更新，改变子组件`props`值的步骤：
```js
export function updateChildComponent (
  vm: Component,
  propsData: ?Object,
  listeners: ?Object,
  parentVnode: MountedComponentVNode,
  renderChildren: ?Array<VNode>
) {
  // 省略代码
  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false)
    const props = vm._props
    const propKeys = vm.$options._propKeys || []
    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]
      const propOptions: any = vm.$options.props // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm)
    }
    toggleObserving(true)
    // keep a copy of raw propsData
    vm.$options.propsData = propsData
  }
}
```
代码分析：
1. 以上`vm`实例为子组件，`propsData`为父组件中传递的`props`的值，而`_propKeys`是之前`props`初始化过程中缓存起来的所有的`props`的key。
2. 在父组件值更新后，会通过遍历`propsKey`来重新对子组件`props`进行**校验求值**，最后赋值。

以上代码就是子组件`props`更新的过程，在`props`更新后会进行子组件的重新渲染，这个重新渲染的过程分两种情况：
* 普通`props`值被修改：当`props`值被修改后，其中有段代码`props[key] = validateProp(key, propOptions, propsData, vm)`根据响应式原理，会触发属性的`setter`，进而子组件可以重新渲染。
* 对象`props`内部属性变化：当这种情况发生时，并没有触发子组件`prop`的更新，但是在子组件渲染的时候读取到了`props`，因此会收集到这个`props`的`render watcher`，当对象`props`内部属性变化的时候，根据响应式原理依然会触发`setter`，进而子组件可以重新进行渲染。

## toggleObserving作用
`toggleObserving`是定义在`src/core/observer/index.js`文件中的一个函数，其代码很简单：
```js
export let shouldObserve: boolean = true
export function toggleObserving (value: boolean) {
  shouldObserve = value
}
```
它的作用就是修改当前模块的`shouldObserve`变量，用来控制在`observe`的过程中是否需要把当前值变成一个`observer`对象。
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
接下来我们来分析，在处理`props`的过程中，什么时候`toggleObserving(true)`，什么时候`toggleObserving(false)`以及为什么需要这样处理？

```js
function initProps (vm: Component, propsOptions: Object) {
  if (!isRoot) {
    toggleObserving(false)
  }
  // 省略defineReactive的过程
  toggleObserving(true)
}
```
`props`初始化的时候：<br/>
我们可以看到在最开始判断了当为非根实例(子组件)的时候，进行了`toggleObserving(false)`的操作，这样做的目的是因为：当非根实例的时候，组件的`props`来自于父组件。当`props`为对象或者数组时，根据响应式原理，我们会递归遍历子属性然后进行`observe(val)`，而正是因为`props`来源于父组件，这个过程其实已经在父组件执行过了，如果不做任何限制，那么会在子组件中又重复一次这样的过程，因此这里需要`toggleObserving(false)`，用来避免递归`props`子属性的情况，这属于响应式优化的一种手段。在代码最后，又调用了`toggleObserving(true)`，把`shouldObserve`的值还原。

`props`校验的时候：<br/>
我们先来看`props`提供了`default`默认值，且默认值返回了对象或者数组。
```js
export default {
  props: {
    point: {
      type: Object,
      default () {
        return {
          x: 0,
          y: 0
        }
      }
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
```
对于以上`point`和`list`取默认值的情况，这个时候的`props`值与父组件没有关系，那么这个时候我们需要`toggleObserving(true)`，在`observe`后再把`shouldObserve`变量设置为原来的值。
```js
export function validateProp () {
  // 省略代码
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key)
    const prevShouldObserve = shouldObserve 
    toggleObserving(true)
    observe(value)
    toggleObserving(prevShouldObserve)
  }
}
```

在`props`更新的时候：<br/>
当父组件更新的时候，会调用`updateChildComponent()`方法，用来更新子组件的`props`值，这个时候其实和`props`初始化的逻辑一样，我们同样不需要对指向父组件的对象或数组`props`进行递归子属性`observe`的过程，因此这里需要执行`toggleObserving(false)`。
```js
export function updateChildComponent () {
  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false)
    const props = vm._props
    const propKeys = vm.$options._propKeys || []
    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]
      const propOptions: any = vm.$options.props // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm)
    }
    toggleObserving(true)
    vm.$options.propsData = propsData
  }
}
```


## 整体流程图
在分析完以上所有与`props`相关的逻辑后，我们可以总结如下流程图。
<div style="text-align:center">
  <img src="../../images/vueAnalysis/props.png">
</div>