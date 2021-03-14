# 合并策略
在这一节合并策略中，我们主要分三个步骤来说明：**配置合并的背景**、**配置合并的场景**以及**合并策略**。

## 背景
我们可能会很好奇，为什么要进行配置合并？这是因为`Vue`内部存在一些默认的配置，在初始化的时候又允许我们提供一些自定义配置，这是为了在不同的场景下达到定制化个性需求的目的。纵观一些优秀的开源库、框架它们的设计理念几乎都是类似的。

我们举例来说明一下配置合并的背景：
```js
Vue.mixin({
  created () {
    console.log('global created mixin')
  },
  mounted () {
    console.log('global mounted mixin')
  }
})
```
假设我们使用`Vue.mixin`方法全局混入了两个生命周期配置`created`和`mounted`，那么在我们的应用中，这两个生命周期配置都会反应到各个实例上去，无论是根实例还是各种组件实例。但对于根实例或者组件实例而言，它们也可能会拥有自己的`created`或`mounted`配置，如果不进行合理的配置合并，那么会出现一些意料之外的问题。

## 场景
要进行配置合并的场景不止一两处，我们主要介绍以下四种场景：
* **vue-loader**：在之前我们提到过当我们使用`.vue`文件的形式进行开发的时候，由于`.vue`属于特殊的文件扩展，`webpack`无法原生识别，因此需要对应的`loader`去解析，它就是`vue-loader`。假如我们撰写以下`HelloWorld.vue`组件，然后在别的地方去引入它。
```js
// HelloWorld.vue
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello, world'
    }
  }
}

// App.vue
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
```
因为我们在`HelloWorld.vue`文件中只提供了`name`和`data`两个配置选项，但真正调试的时候我们发现`HelloWorld`组件的实例上多了很多额外的属性，这是因为`vue-loader`帮我们默认添加的。
```js
const HelloWorld = {
  beforeCreate: [function () {}],
  beforeDestroy: [function () {}],
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello, world'
    }
  },
  ...
}
```
我们可以发现`vue-loader`默认添加的有`beforeCreate`和`beforeDestroy`两个配置，如果我们组件自身也提供了这两个配置的话，这种情况必须进行配置合并。

* **extend**：在上一节我们介绍`createComponent`的时候，我们知道子组件会继承大`Vue`上的一些属性或方法，假设我们全局注册了一个组件。
```js
import HelloWorld from '@/components/HelloWorld.vue'
Vue.component('HelloWorld', HelloWorld)
```
当我们在其它组件中也注册了一些组件，这样大`Vue`上的`components`就要和组件中的`components`进行合理的配置合并。
* **mixin**：在前面的**配置合并背景**小节中，我们使用`Vue.mixin`全局混入了两个生命周期配置，这属于`mixin`配置合并的范围，我们来举例另外一种组件内的`mixin`混入场景：
```js
// mixin定义
const sayMixin = {
  created () {
    console.log('hello mixin created')
  },
  mounted () {
    console.log('hello mixin mounted')
  }
}

// 组件引入mixin
export default {
  name: 'App',
  mixins: [sayMixin],
  created () {
    console.log('app component created')
  },
  mounted () {
    console.log('app component mounted')
  }
}
```
当在`App.vue`组件中提供`mixins`选择的时候，因为在我们定义的`sayMixin`也提供了`created`和`mounted`两个生命周期配置，因此这种情况下也要进行配置合并。又因为`mixins`接受一个数组选项，假如我们传递了多个已经定义的`mixin`，而这些`mixin`又可能会存在提供了相同配置的情况，因此同样需要进行配置合并。

**注意**：`Vue.mixin`全局`API`方法在内部调用了`mergeOptions`来进行混入，它的定义位置我们在之前的`initGlobalAPI`小节中提到过，其实现代码如下：
```js
import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

* **this._init**：严格意义上来说，这里其实并不算是一个配置合并的场景，而应该是一种配置合并的手段。对于第一种`vue-loader`和第二种`extend`的场景，它们在必要的场景下也会在`this._init`进行配置合并，例如在子组件实例化的时候，它在构造函数中就调用了`this._init`:
```js
const Sub = function VueComponent (options) {
  this._init(options)
}

Vue.prototype._init = function () {
  // ...省略其它
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  // ...省略其它
}
```

## 合并策略
我们先来看看合并策略的代码，它是定义在`src/core/util/options.js`文件中，其代码如下：
```js
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```
我们先忽略`mergeOptions`方法中其它的代码，来看最核心的`mergeField`，在这个方法里面，它会根据不同的`key`，调用策略对象`strats`中的策略方法，然后把合并完的配置再赋值到`options`上，`strats`策略对象每个`key`的具体定义我们会在之后对应的章节中介绍。

### 默认合并策略
在`mergeField`方法中，我们看到当传入的`key`没有对应的策略方法时，会使用`defaultStrat`默认合并策略，它的定义代码如下：
```js
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}
```
`defaultStrat`默认合并策略的代码非常简单，即：简单的覆盖已有值，例如：
```js
const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}
const parent = {
  age: 23,
  name: 'parent',
  sex: 1
}
const child = {
  age: undefined,
  name: 'child',
  address: '广州'
}
function mergeOptions (parent, child) {
  let options = {}
  for (const key in parent) {
    mergeField(key)
  }
  for (const key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  function mergeField (key) {
    options[key] = defaultStrat(parent[key], child[key])
  }
  return options
}
const $options = mergeOptions(parent, child)
console.log($options) // { age: 23, name: 'child', sex: 1, address: '广州' }
```
代码分析：在以上案例中，`age`和`name`都存在于`parent`和`child`对象中，因为`child.age`值为`undefined`，所以最后取`parent.age`值，这种情况也适用于`sex`属性的合并。因为`child.name`值不为`undefined`，所以最后取`child.name`的值，这种情况也适用于`address`属性的合并。

**注意**：如果你想针对某一个选项修改它的默认合并策略，可以使用`Vue.config.optionMergeStrategies`去配置，例如：
```js
// 自定义el选择的合并策略，只取第二个参数的。
import Vue from 'vue'
Vue.config.optionMergeStrategies.el = (toVal, fromVal) {
  return fromVal
}
```

### el和propsData合并
对于`el`和`propsData`属性的合并，在`Vue`中使用了默认合并策略，其定义代码如下：
```js
const strats = config.optionMergeStrategies
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    // ...省略其它
    return defaultStrat(parent, child)
  }
}
```
对于`el`和`propsData`这两个选项来说，使用默认合并策略的原因很简单，因为`el`和`propsData`只允许有一份。

### 生命周期hooks合并
对于生命周期钩子函数而言，它们都是通过`mergeHook`方法来合并的，`strats`策略对象上关于`hooks`属性定义代码如下：
```js
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
```
我们接下来看一下`mergeHook`是如何实现的，其代码如下：
```js
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}
```
我们可以看到在`mergeHook`方法中，它用到了三层三目运算来判断，首先判断了是否有`childVal`，如果没有则直接返回`parentVal`；如果有，再判断`parentVal`有没有，如果有则一定是数组形式，这个时候直接把`childVal`添加到`parentVal`数组的末尾；如果没有，则需要判断一下`childVal`是不是数组，如果不是数组则转成数组，如果已经是数组了，则直接返回。

在最后还判断了`res`，然后满足条件则调用`dedupeHooks`，这个方法的作用很简单，就是剔除掉数组中的重复项。最后，我们根据以上逻辑撰写几个案例来说明。
```js
// 情况一
const parentVal = [function created1 () {}]
const childVal = undefined
const result = [function created1 () {}]

// 情况二
const parentVal = [function created1 () {}]
const childVal = [function created2 () {}]
const result = [function created1 () {}, function created2 () {}]

// 情况三
const parentVal = undefined
const childVal = [function created2 () {}]
const result = [function created2 () {}]
```

我们再来看一个比较特殊的场景：
```js
// mixin.js
export const sayMixin = {
  created () {
    console.log('say mixin created')
  }
}
export const helloMixin = {
  created () {
    console.log('hello mixin created')
  }
}


// App.vue
import { sayMixin, helloMixin } from './mixin.js'
export default {
  name: 'App',
  mixins: [sayMixin, helloMixin],
  created () {
    console.log('component created')
  }
}

// 执行顺序
// say mixin created
// hello mixin created
// component created
```
代码分析：我们可以看到`mixins`里面的`created`生命周期函数会优先于组件自身提供的`created`生命周期函数，这是因为在遍历`parent`和`child`的属性之前，会优先处理`extends`和`mixins`选项。以`mixins`为例，它会首先遍历我们提供的`mixins`数组，然后依次把这些配置按照规则合并到`parent`上，最后在遍历`child`的属性时，才会把其自身的配置合并对应的位置，在我们提供的例子当中，自身提供的`created`会使用数组`concat`方法添加到数组的末尾。当组件触发`created`生命周期的时候，会按照数组顺序依次调用。
```js
if (!child._base) {
  if (child.extends) {
    parent = mergeOptions(parent, child.extends, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
}
```

### data和provide合并
对于`data`和`provide`而言，它们最后都使用`mergeDataOrFn`来合并，只不过对于`data`选项比较特殊，它需要单独包裹一层，它们在`strats`策略对象上的属性定义如下：
```js
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}
strats.provide = mergeDataOrFn
```
在合并`data`的包裹函数中，对`childVal`进行了检验，如果不是函数类型，提示错误信息并直接返回。如果时，再调用`mergeDataOrFn`方法来合并。接下来，我们来看一下`mergeDataOrFn`方法的具体实现逻辑：
```js
export function mergeDataOrFn (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}
```
在`mergeDataOrFn`方法中，我们可以发现它根据`vm`进行了区分，但这两块的合并思路是一致的：如果`parentVal`和`childVal`是函数类型，则分别调用这个函数，然后合并它们返回的对象，这种情况主要针对`data`合并。对于`provide`而言，它不需要是`function`类型，因此直接使用`mergeData`来合并即可。我们再回过头来看，为什么要区分`vm`，这是因为要处理兼容`provide`的情况，当传递`provide`的时候，因为这个属性是在父级定义的，因此`this`属于父级而不是当前组件`vm`。

最后来看一下`mergeData`方法的实现代码：
```js
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}
```
`mergeData`和前面提到`extend`方法所做的事情几乎是一样的，只不过由于`data`中所有的属性(包括嵌套对象的属性)，我们需要使用`set`处理成响应式的。`set`方法就是`Vue.set`或`this.$set`方法的本体，它定义在`src/core/observer/index.js`文件中，我们之前在响应式章节提到过。

### components、directives和filters合并
对于`components`、`directives`以及`filters`的合并是同一个`mergeAssets`方法，`strats`策略对象上关于这几种属性定义代码如下：
```js
const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})
```
接下来，我们看一下`mergeAssets`具体定义：
```js
function mergeAssets (
  parentVal: ?Object,1
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
    return extend(res, childVal)
  } else {
    return res
  }
}
```
`mergeAssets`方法的代码不是很多，逻辑也很清晰，首先以`parentVal`创建一个`res`原型，如果`childVal`没有，则直接返回这个`res`原型；如果有，则使用`extend`把`childVal`上的所有属性扩展到`res`原型上。有一点需要注意，`extend`不是我们之前提到的`Vue.extend`或者`this.$extend`，它是定义在`src/shared/utils.js`文件中的一个方法，其代码如下：
```js
export function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
```
我们撰写一个简单的例子来说明一下`extend`方法的用法：
```js
const obj1 = {
  name: 'AAA',
  age: 23
}
const obj2 = {
  sex: '男',
  address: '广州'
}
const extendObj = extend(obj1, obj2)
console.log(extendObj) // { name: 'AAA', age: 23, sex: '男', address: '广州' }
```
在介绍完`extend`方法后，我们回到`mergeAssets`方法，我们同样举例说明：
```js
// main.js
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
Vue.component('HelloWorld', HelloWorld)

// App.vue
import Test from '@/components/test.vue'
export default {
  name: 'App',
  components: {
    Test
  }
}
```
在`main.js`入口文件中，我们全局定义了一个`HelloWorld` 全局组件，然后在`App.vue`中又定义了一个`Test`局部组件，当代码运行到`mergeAssets`的时候，部分参数如下：
```js
const parentVal = {
  HelloWorld: function VueComponent () {...},
  KeepAlive: {...},
  Transition: {...},
  TransitionGroup: {...}
}
const childVal = {
  Test: function VueComponent () {...}
}
```
因为`parentVal`和`childVal`都有值，因此会调用`extend`方法，调用前和调用后的`res`如下所示：
```js
// 调用前
const res = {
  __proto__: {
    HelloWorld: function VueComponent () {...},
    KeepAlive: {...},
    Transition: {...},
    TransitionGroup: {...}
  }
}

// extend调用后
const res = {
  Test: function VueComponent () {...},
  __proto__: {
    HelloWorld: function VueComponent () {...},
    KeepAlive: {...},
    Transition: {...},
    TransitionGroup: {...}
  }
}
```
假如我们在`App.vue`组件中都使用了这两个组件，如下：
```vue
<template>
  <div>
    <test />
    <hello-world />
  </div>
</template>
```
在`App.vue`组件渲染的过程中，当编译到`<test />`时，会在其`components`选项中查找组件，马上在自身属性上找到了`test.vue`。然后当编译到`<hello-world />`的时候，在自身对象上找不到这个属性，根据原型链的规则会在原型上去找，然后在`__proto__`上找到了`HelloWorld.vue`组件，两个组件得以顺利的被解析和渲染。

对于另外两个选项`directives`和`filters`，它们跟`components`是一样的处理逻辑。

### watch合并
对于`watch`选项而言，它使用的合并方法是单独定义的，其在`strats`策略对象上的属性定义如下：
```js
strats.watch = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) parentVal = undefined
  if (childVal === nativeWatch) childVal = undefined
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child]
  }
  return ret
}
```
我们可以看到`watch`配置的合并与`hooks`合并的思路几乎差不多，只是多了一些微小的差异，当`childVal`没有时，直接返回按照`parentVal`创建的原型，类似的当`parentVal`没有时，直接返回`childVal`，注意这里因为是自身的配置，因此不需要像`parentVal`那样创建并一个原型。当`parentVal`和`childVal`都存在时，首先把`parentVal`上的属性全部扩展到`ret`对象上，然后遍历`childVal`的属性键。在遍历的过程中如果`parent`值不为数组形式，则手动处理成数组形式，然后把`child`使用数组`concat`方法添加到数组的末尾。以上代码分析，可以使用下面的示例来说明：
```js
// 情况一
const parentVal = {
  msg: function () {
    console.log('parent watch msg')
  }
}
const childVal = undefined
const ret = {
  __proto__: {
    msg: function () {
      console.log('parent watch msg')
    }
  }
}

// 情况二
const parentVal = undefined
const childVal = {
  msg: function () {
    console.log('child watch msg')
  }
}
const ret = {
  msg: function () {
    console.log('child watch msg')
  }
}

// 情况三
const parentVal = {
  msg: function () {
    console.log('parent watch msg')
  }
}
const childVal = {
  msg: function () {
    console.log('child watch msg')
  }
}
const ret = {
  msg: [
    function () {
      console.log('parent watch msg')
    },
    function () {
      console.log('child watch msg')
    }
  ]
}
```
与`hooks`一样，如果在`mixins`里面也提供了与自身组件一样的`watch`，那么会优先执行`mixins`里面的`watch`，然后在执行自身组件中的`watch`。

### props、methods、inject和computed合并
`props`、`methods`、`inject`和`computed`和之前我们提到的几种配置有点不一样，这几种配置有一个共同点：不允许存在相同的属性，例如我们在`methods`上提供的属性，不管来自于哪里，我们只需要把所有属性合并在一起即可。

接下来我们来看一下这几个属性在`strats`策略对象上的具体定义：
```js
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret = Object.create(null)
  extend(ret, parentVal)
  if (childVal) extend(ret, childVal)
  return ret
}
```
我们可以看到，在其实现方法中代码并不是很复杂，仅仅使用到`extend`方法合并对象属性即可。当`parentVal`没有时，直接返回`childVal`，这里也不需要创建并返回一个原型，原因在上面提到过。如果`parentVal`有，则先创建一个原型，再使用`extend`把`parentVal`上的所有属性全部扩展到`ret`对象上。最后再判断`childVal`，如果有则再使用`extend`把`childVal`上的对象扩展到`ret`上，如果没有，则直接返回。以上代码分析，我们举例说明：
```js
const parentVal = {
  age: 23,
  name: 'AAA'
}
const childVal = {
  address: '广州'
}
const ret = {
  age: 23,
  name: 'AAA',
  address: '广州'
}
```