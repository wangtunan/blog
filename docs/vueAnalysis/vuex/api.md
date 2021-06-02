# Store实例API
在`Vuex`中，它不仅提供了一些辅助`API`，还设计了一些好用的`Store`实例`API`来方便我们使用`Vuex`，这些`API`全部都在`Store`类的原型上。

## commit 和 dispatch
对于主模块和子模块的`commit`或者`dispatch`而言，虽然它们使用形式上是相同的，但方法定义却它们稍有不同，我们以`commit`为例。
```js
// 主模块commit
const store = {
  ...,
  actions: {
    increment ({ commit }, count) {
      commit('increment', count)
    }
  }
}

// 子模块
const A = {
  ...,
  actions: {
    increment ({ commit }, count) {
      commit('increment', count)
    }
  }
}
```
对于同一个`commit`而言，在主模块中我们不使用命名空间这很好理解，但是为什么在子模块中，我们也可以不使用命名空间？

在回答以上问题之前，我们先来看`Store`类上的`commit`和`dispatch`方法：
```js
export class Store {
  constructor (options = {}) {...},
  commit (_type, _payload, _options) {
    // check object-style commit
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)

    const mutation = { type, payload }
    const entry = this._mutations[type]
    // 省略异常情况代码
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    // 省略订阅代码
    // 省略异常情况代码
  }
  dispatch (_type, _payload) {
    // check object-style dispatch
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
    const entry = this._actions[type]
    // 省略异常情况代码
    // 省略订阅代码

    const result = entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)

    return new Promise((resolve, reject) => {
      result.then(res => {
        // 省略订阅代码
        resolve(res)
      }, error => {
        // 省略订阅代码
      })
    })
  }
```
我们称`Store`类上的`commit`和`dispatch`方法为原始方法，在实例化`store`的时候，它根据当前`module`是否为子模块进行了特殊的处理，这段代码为：
```js
const local = module.context = makeLocalContext(store, namespace, path)
```
我们可以看到，在上面这段代码中，它调用了`makeLocalContext()`方法，并它此方法的返回值赋值给了`module.context`，其中`module.context`存储的是子模块中的`State`、`Getters`、`Mutations`以及`Actions`。

我们来看一下这个方法的实现代码：
```js
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}
```
我们可以看到，在这个方法中它根据是否有命名空间来决定是否选择重写`commit`或者`dispatch`，重写的`commit`和`dispatch`做了最重要的两件事情：**异常类型判断**、**处理命名空间**。

如果要使用代码来表述以上逻辑的话，如下所示：
```js
// A子模块commit和dispatch
commit('increment', 10)
dispatch('increment', 10)

const moduleALocal = {
  dispatch: (_type, _payload, _options) => {
    // 省略逻辑
    type = 'a/' + 'increment'
    return store.dispatch('a/increment', 10)
  },
  commit: (_type, _payload, _options) => {
    // 省略逻辑
    type = 'a/' + 'increment'
    store.commit(type, payload, options)
  }
}
```

## registerModule
在`Vuex`初始化完毕后，我们的`module`模块树已经构造好了，但有时候我们需要动态的去注册一个子模块，`registerModule`方法提供了这种能力，它的使用方式如下：
```js
this.$store.registerModule('c', {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment (state, count) {
      state.count = count
    }
  },
  actions: {
    increment ({ commit }, count) {
      commit('increment', count)
    }
  },
  getters: {
    storeCount (state) {
      return state.count + 'C'
    }
  }
})
```
在注册完成后，我们打印`store`，其结果如下：
```js
const store = {
  state: {
    count: 0,
    a: { count: 0 },
    b: { count: 0 },
    c: { count: 0 }
  },
  getters: {
    storeCount: 0,
    'a/storeCount': '0A',
    'b/storeCount': '0B',
    'c/storeCount': '0C'
  },
  _mutations: {
    'increment': function () {...},
    'a/increment': function () {...},
    'b/increment': function () {...},
    'c/increment': function () {...}
  },
  _actions: {
    'increment': function () {...},
    'a/increment': function () {...},
    'b/increment': function () {...},
    'c/increment': function () {...}
  }
}
```
接下来，我们来看一下`registerModule`方法的实现代码：
```js
export class Store {
  constructor (options = {}) { ... },
  registerModule (path, rawModule, options = {}) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
      assert(path.length > 0, 'cannot register the root module by using registerModule.')
    }

    this._modules.register(path, rawModule)
    installModule(this, this.state, path, this._modules.get(path), options.preserveState)
    // reset store to update getters...
    resetStoreVM(this, this.state)
  }
}
```
在这个方法中，`register`、`installModule`、`resetStoreVM`方法我们已经在之前介绍过了，这里不再赘述。

## unregisterModule
有动态注册模块，就有动态卸载模块，它就是`unregisterModule`，其使用方式如下：
```js
this.$store.unregisterModule('c')
```
当我们卸载`A`模块后，`store`实例上就没有了与`A`模块相关的属性或者方法了。

`unregisterModule`方法在`Store`类上的定义如下：
```js
export class Store {
  constructor (options = {}) { ... },
  unregisterModule (path) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
    }

    this._modules.unregister(path)
    this._withCommit(() => {
      const parentState = getNestedState(this.state, path.slice(0, -1))
      Vue.delete(parentState, path[path.length - 1])
    })
    resetStore(this)
  }
}
```
在卸载子模块的方法中，它最重要的是调用`unregister`方法和`resetStore`，让我们先来看`unregister`方法。

`unregister`是定义在`ModuleCollection`类上的一个方法，其定义如下:
```js
export default class ModuleCollection {
  constructor (rawRootModule) { ... },
  unregister (path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    const child = parent.getChild(key)
    // 重要：实例化时安装的模块不能卸载，只能卸载动态安装的模块
    if (!child.runtime) {
      return
    }
    // 省略异常情况
    parent.removeChild(key)
  }
}
```
我们可以看到，`unregister`所做的事情就是从`parent`中移除自身，对我们的例子而言，它就是从主模块`children`中移除自身。

最后，我们来看一下`resetStore`方法的代码：
```js
function resetStore (store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // init all modules
  installModule(store, state, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, state, hot)
}
```
可以看到`resetStore`方法就是把`store`实例上的相关属性全部清空，然后重新安装了一遍，此过程相当于重新执行了一遍`Store`构造函数。
