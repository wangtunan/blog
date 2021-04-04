# Vuex辅助API

在我们使用`Vuex`的过程中，我们可以选择使用`Vuex`提供的辅助函数来获取我们需要的`State`、`Getters`、`Mutations`或者`Actions`，这样我们就不用通过`$store`来获取了。

```js
// $store获取
this.$store.state.moduleA.count
this.$store.getters.storeCount
this.$store.mutations.moduleA.increment
this.$store.actions.moduleA.increment

// 使用mapXXX获取
mapState('moduleA', ['count'])
mapGetters('moduleA', ['storeCount'])
mapMutations('moduleA', ['increment'])
mapActions('moduleA', ['increment'])
```
我们可以看到，通过`this.$store`来获取属性或者方法，我们需要撰写许多同质化的代码。为了更优雅的获取我们想要的属性或者方法，`Vuex`提供了一些辅助`API`：**mapState**、**mapGetters**、**mapMutations**和**mapActions**。

以上这几个辅助`API`的代码路径在`src/helpers.js`，其代码如下：
```js
export const mapState = normalizeNamespace((namespace, states) => { ... })
export const mapMutations = normalizeNamespace((namespace, mutations) => { ... })
export const mapGetters = normalizeNamespace((namespace, getters) => { ... })
export const mapActions = normalizeNamespace((namespace, actions) => { ... })
```
我们可以看到，以上几个方法全部使用`normalizeNamespace`方法进行包裹，我们先来看一下这个方法的代码：
```js
function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}
```
以上代码的处理，主要考虑如下几种使用场景，我们以`mapState`为例
```js
// 获取主模块的state
mapState(['count'])

// 获取子模块的state
mapState('a', ['count'])
```
代码分析：
* 没有命名空间：当不传递命名空间的时候，此时`namespace`参数就是一个数组，需要调换一下`namespace`第一个参数和`map`第二个参数的值，调换完毕后参数值如下：
```js
const namespace = ''
const map = ['count']
```
* 有传递命名空间：它先判断`namespace`最后一个字符是不是`/`，如果没有携带则默认帮我们添加一个`/`。
* 对于以上两个例子而言，最后调用`fn`方法是的参数如下：
```js
// 没有命名空间
fn('', ['count'])

// 有命名空间
fn('a/', ['count'])
```

另外一个需要注意的地方就是`normalizeMap`方法，这个方法在以上四个辅助`API`中都有用到，代码如下：
```js
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}
```
根据`normalizeMap`方法的代码我们可以看出：如果参数是数组形式，那么我们map遍历数组，把这个数组处理成`key/val`对象数组形式；如果参数是对象，那么我们遍历对象的属性键，再调用map遍历数组，把这个数组同样处理成`key/val`对象数组形式。

这样做主要是为了支持`mapXXX`辅助`API`参数的多种形式：数组形式和对象形式。
```js
// 数组形式
mapState(['count'])

// 对象形式
mapState({
  newCount: 'count',
  doubleCount: state => state.count * 2,
  localCount (state) {
    // 此处的this为当前组件实例
    return state.count + this.number
  }
})
```

## mapState
我们首先来看`mapState`具体实现代码，如下：
```js
export const mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  if (__DEV__ && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
```
我们以下面两个例子为例进行说明：
```js
// 案例一：主模块state
mapState(['count'])

// 案例二：子模块state
mapState('a', ['count'])
```
案例分析：
* 当`mapState`调用的时候，它会遍历我们的数组或对象形式参数，然后返回一个新对象，其中新对象的`key`就是我们提供的参数。假设我们提供如下两种形式的参数：
```js
// 数组形式
mapState(['count'])

// 对象形式
mapState({
  newCount: 'count'
})
```
根据以上例子，其返回值分别如下：
```js
// 数组形式返回值
const res = { count: function mappedState () { ... } }

// 对象形式返回值
const res = { newCount: function mappedState () { ... } }
```
* 案例一：因为我们把`mapState`返回对象使用`...`扩展运算符添加到组件的`computed`计算属性上面去了，所以`mappedState`函数会在我们获取计算属性的时候开始求值。对于案例一而言，因为我们获取的是主模块的`State`，因此它直接根据`key`在`store`实例上取值并返回即可。

* 案例二：对于案例二而言，它跟案例一在后面的处理是相同的，只是多了一步根据`namespace`获取子模块的步骤。

## mapGetters
在介绍完`mapState`后，我们再来看`mapGetters`方法，代码如下：
```js
export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  if (__DEV__ && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(getters).forEach(({ key, val }) => {
    // The namespace has been mutated by normalizeNamespace
    val = namespace + val
    res[key] = function mappedGetter () {
      // 省略异常处理
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
```
我们可以看到，相较于`mapState`，`mapGetters`实现代码则相对更简单一些，它实质上以上是通过`this.$store`上去取方法而言。

我们以如下代码为例，来说明`mapGetters`的返回值：
```js
// 主模块
mapGetters(['storeCount'])
const res = { storeCount: function mappedGetter () { ... } }

// 子模块
mapGetters('a', ['storeCount'])
const res = { 'a/storeCount': function mappedGetter () { ... } }
```
因为`mapGetters`和`mapState`都是把得到的`res`扩展到组件实例的`computed`计算属性上，所以它们的方法会在使用计算属性的时候调用求值。

## mapMutations和mapActions
我们在这一小节把`mapMutations`和`mapActions`放在一起，是因为它们两个的实现代码及其相似，只不过`mapMutations`获取的是`commit`，而`mapActions`获取的是`dispatch`。
```js
export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  if (__DEV__ && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation (...args) {
      // Get the commit method from store
      let commit = this.$store.commit
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapMutations', namespace)
        if (!module) {
          return
        }
        commit = module.context.commit
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  if (__DEV__ && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }
        dispatch = module.context.dispatch
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
```
我们以如下案例为例，来说明`mapMutations`的返回结果：
```js
mapMutations('a/', {
  handleIncrement: 'increment'
})
const res = {
  handleIncrement: function mappedMutation () {
    // 省略
  }
}
```
因为`mapMutations`和`mapActions`的返回值会使用`...`扩展运算符扩展到组件实例`methods`属性上，所以`mappedMutation`或者`mappedAction`会在主动调用方法的时候调用。
```js
this.handleIncrement(100)
```



