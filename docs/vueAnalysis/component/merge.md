# 合并策略
在这一节合并策略中，我们主要分三个步骤来说明：**配置合并的背景**、**配置合并的场景**以及**合并策略**。

## 背景
我们可以会很好奇，为什么要进行配置合并？这是因为`Vue`内部存在一些默认的配置，在初始化的时候又允许我们提供一些自定义配置，这是为了在不同的场景下达到定制化个性需求的目的。纵观一些优秀的开源库、框架它们的设计理念几乎都是类似的。

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
* **vue-loader**：在之前我们提到过当我们使用`.vue`文件的形式进行开发的时候，由于`.vue`属于特殊的文件扩展，`webpack`无法原生识别，因此需要对应的`loader`去解析，它就是`vue-loader`。假如我们撰写以下`HelloWorld.vue`组件，然后再别的地方去引入它。
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

* **this._init**：严格意义上来说，这里其实并不算是一个配置合并的场景，而应该是一种配置合并的手段。对于第一种`vue-loader`和第二种`extend`的场景，它们在必要的场景下也会在`this._init`进行配置合并，例如在子组件实例化的时候，它在构造函数中就调用了`this._init`:
```js
const Sub = function VueComponent (options) {
  this._init(options)
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

**注意**：如果你想针对某一个选择修改它的默认合并策略，可以使用`Vue.config.optionMergeStrategies`去配置，例如：
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
对于`el`和`propsData`这两个选择来说，使用默认合并策略的原因很简单，因为`el`和`propsData`只允许有一份。

### 生命周期hooks合并

### data和provide合并

### components、directives和filters合并

### watch合并

### props、methods、inject和computed合并