# Vuex初始化
在`store.js`文件中，我们可以在实例化`Store`的时候传递一个`options`，如下：
```js
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {...},
  mutaions: {...},
  actions: {...},
  getters: {...},
  modules: {...}
})
```

在`Vuex`中，`Store`类的代码路径为`src/store.js`，其构造函数精简代码如下：
```js
// store.js
export class Store {
  constructor (options = {}) {
    // 省略代码
    if (__DEV__) {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `store must be called with the new operator.`)
    }
    // 省略代码
    this._modules = new ModuleCollection(options)
    // 省略代码
    const state = this._modules.root.state
    installModule(this, state, [], this._modules.root)
    resetStoreVM(this, state)
    // 省略代码
  }
}
```
在构造函数最开始，它在开发环境下进行了三个断言，分别是：**在实例化Store之前必须安装Vuex**、**必须支持Promise(Action需要)**以及**Store构造函数必须使用new关键词调用**。

在随后，它实例化了一个`ModuleCollection`，并把结果传递给了`this._modules`内部变量。由于`ModuleCollection`主要是用来处理`modules`父子关系的，因此我们会在随后的章节中详细进行介绍。

在讲解`Vuex`初始化时，我们以如下例子为例进行说明。
```js
// store.js
export default new Vuex.Store({
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
      return state.count
    }
  }
})
```
当`ModuleCollection`类实例完毕后，其`this._modules`内部变量结果如下：
```js
this._modules = {
  root: {
    namespaced: false,
    state: {
      count:
    },
    _children: {},
    rawModule: {...}
  }
}
```
随后，它会调用`installModule`方法来处理与**State**、**Mutations**、**Actions**、**Getters**以及**Modules**等相关的内容，其完整代码如下：

```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && __DEV__) {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
    }
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      if (__DEV__) {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          )
        }
      }
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```

## State初始化
在介绍`State`初始化的时候，我们以如下代码为例：
```js
// 模块A
const A = {
  namespaced: true,
  state: {
    count: 0
  }
}
// 模块B
const B = {
  namespaced: true,
  state: {
    count: 0
  }
}
// 主模块
new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    a: A,
    b: B
  }
})
```
当我们在`Store`构造函数中第一次调用`installModule`，我们给第二个参数传递的是一个空数组，根据这个参数我们能判断到底是主模块还是子模块。
```js
installModule(this, state, [], this._modules.root)
```
在`installModule`方法中与`State`相关代码如下：
```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  // 省略代码
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      if (__DEV__) {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          )
        }
      }
      Vue.set(parentState, moduleName, module.state)
    })
  }
  // 省略代码
}
```
在这个方法中，如果当前不是主模块，则会在主模块的`state`下定义其子模块：
```js
const parentState = {
  count: 0
}
// 设置A模块的state
Vue.set(parentState, 'a', { count: 0 })
// 设置B模块的state
Vue.set(parentState, 'b', { count: 0 })
```
当子模块全部都处理完毕时，此时的`store`实例如下：
```js
const store = {
  state: {
    count: 0,
    a: { count: 0 },
    b: { count: 0 }
  },
  ...
}
```
我们都知道，当在`template`模板中使用了`Vuex`的`state`数据后，当`state`数据发生变动时，会触发组件重新渲染。

其实关于`State`数据的响应式定义，它发生在`resetStoreVM`方法中：
```js
let Vue
// 构造函数
resetStoreVM(this, state)

// resetStoreVM方法
function resetStoreVM (store, state, hot) {
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
}
```

## Mutations初始化
在介绍`Mutations`的时候，我们以如下代码为例进行说明：
```js
// store.js
// A模块
const A = {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment (state, count) {
      state.count = count
    }
  }
}
// B模块
const B = {
  namespaced: true,
  state: {
    count: 0
    },
    mutations: {
    increment (state, count) {
      state.count = count
    }
  }
}
// 主模块
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, count) {
      state.count = count
    }
  }
  modules: {
    a: A,
    b: B
  }
})
```
在`installModule`方法中，关于`Mutations`相关代码如下：
```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)
  // 省略代码
  const local = module.context = makeLocalContext(store, namespace, path)
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })
}
```
在之前我们提到过`new ModuleCollection`，在`ModuleCollection`构造函数中，它会实例化一个`Module`类，在这个类中它定义了一系列原型方法，其中就有一个`forEachMutation`方法，如下：
```js
export default class Module {
  constructor (rawModule, runtime) {...}
  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
```
其中`forEachValue`是一个工具方法，它是对`forEach`方法的一层封装，代码如下：
```js
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
```
`module.forEachMutation`方法的主要作用就是遍历当前模块下所有的`mutations`，然后执行`registerMutation`。

以我们的例子为例，第一次执行`installModule`方法时，它是主模块。此时的`key`为`increment`，`namespace`为空字符串。

我们再来看`registerMutation`方法，代码如下：
```js
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}
```
它所做的事情就是把我们`key-value`对象形式的`mutations`方法，处理成`key-array`形式，当第一次执行完`registerMutation`方法后，`store._mutations`代码表示如下：
```js
// store
const store = {
  _mutations: {
    'increment': [function wrappedMutationHandler() { ... }]
  }
}
```
因为我们在`A、B`这两个子模块中都有定义`mutations`，我们先跳过是如何处理子模块的，这里只要知道会递归遍历子模块，然后再次执行`installModule`方法即可。

当第二次调用`installModule`方法时，此时是`A`子模块，在`module.forEachMutation`遍历时，此时的`key`为`increment`，`namespace`为`a/`。

第二次执行完`registerMutation`方法后，`store._mutations`代码表示如下：
```js
// store
const store = {
  _mutations: {
    'increment': [function wrappedMutationHandler() { ... }],
    'a/increment': [function wrappedMutationHandler () { ... }]
  }
}
```
对于模块`B`，它的处理过程和模块`A`是一样的，我们直接看最后的结果:
```js
const store = {
  _mutations: {
    'increment': [function wrappedMutationHandler() { ... }],
    'a/increment': [function wrappedMutationHandler () { ... }],
    'b/increment': [function wrappedMutationHandler () { ... }]
  }
}
```


## Actions初始化
`Action`初始化逻辑和`Mutations`的基本一致，只是多了一些细微的差别。

在介绍`Actions`初始化的过程中，我们以如下代码为例进行说明：
```js
// store.js
// A模块
const A = {
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
  }
}
// B模块
const B = {
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
  }
}
// 主模块
export default new Vuex.Store({
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
  modules: {
    a: A,
    b: B
  }
})
```

在`installModule`方法中，关于`Actions`相关的代码如下：
```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)
  // 省略代码
  const local = module.context = makeLocalContext(store, namespace, path)
  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })
  // 省略代码
}
```
其中`forEachAction`方法是在`Module`类中定义的原型方法，代码如下：
```js
export default class Module {
  constructor (rawModule, runtime) { ... },
  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }
```
当第一次执行`module.forEachAction`的时候，此时是主模块。因为我们在主模块中也撰写了`Actions`，因此此时的`key`为`increment`，`namespace`为空字符串。

我们再来看一下`registerAction`方法的相关代码，如下：
```js
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```
我们可以看到，`Actions`的注册过程和`Mutations`的注册过程非常相似，只不过`Actions`函数返回的结果是基于`Promise`，而`Mutations`函数是直接返回结果。

也就是说，`Actions`是基于`Promise`来实现的，所以我们才能在`Store`构造函数中看到它对`Promise`进行了断言。
```js
assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
```

在注册完主模块的`Actions`后，`store._actions`用代码表示如下：
```js
const store = {
  __actions: {
    'increment': [function wrappedActionHandler () {...}]
  }
}
```
子模块的`Actions`处理跟`Mutations`相同，会递归遍历子模块，然后执行重新执行`installModule`方法。

当第二次调用`module.forEachAction`方法时，此时的`key`为`increment`，`namespace`为`a/`，当执行完`registerAction`方法后，`store._actions`代码表示如下：
```js
const store = {
  __actions: {
    'increment': [function wrappedActionHandler () {...}],
    'a/increment': [function wrappedActionHandler () { ... }]
  }
}
```
对于`B`模块的`Actions`，它和`A`模块的处理过程是相同的，我们直接看结果：
```js
const store = {
  __actions: {
    'increment': [function wrappedActionHandler () {...}],
    'a/increment': [function wrappedActionHandler () { ... }],
    'b/increment': [function wrappedActionHandler () { ... }]
  }
}
```

## Getters初始化和响应式
在介绍`Getters`初始化和响应式的时候，我们以如下代码为例进行说明：
```js
// store.js
// A模块
const A = {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    storeCount (state) {
      return state.count
    }
  }
}
// B模块
const B = {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    storeCount (state) {
      return state.count
    }
  }
}
// 主模块
export default new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    a: A,
    b: B
  },
  getters: {
    storeCount (state) {
      return state.count
    }
  }
})
```

### Getters初始化
在`installModule`方法中关于`Getters`相关的代码如下：
```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)
  // 省略代码
  const local = module.context = makeLocalContext(store, namespace, path)
  // 省略代码
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
  // 省略代码
}
```
其中，`module.forEachGetter`是一个在`Module`类中定义的原型方法，如下:
```js
export default class Module {
  constructor (rawModule, runtime) { ... },
  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }
```
以我们的例子为例，当第一次遍历执行`module.forEachGetter`的时候，此时的`key`为`storeCount`，`namespace`为空字符串。

我们再来看一下`registerGetter`方法，其代码如下:
```js
function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (__DEV__) {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}
```
当第一次`registerGetter`执行完毕后，`store.__wrappedGetters`用代码表示如下：
```js
const store = {
  __wrappedGetters: {
    'storeCount': function wrappedGetter () { ... }
  }
}
```
对于子模块的`Getters`而言，因为会递归遍历子模块然后再次调用`installModule`，所以当第二次执行`module.forEachGetter`的时候，`key`为`storeCount`，`namespace`为`a/`。

此时执行完`registerGetter`方法后，`store.__wrappedGetters`代码表示如下：
```js
const store = {
  __wrappedGetters: {
    'storeCount': function wrappedGetter () { ... },
    'a/storeCount': function wrappedGetter () { ... }
  }
}
```
同样的道理，当最后一次执行完`registerGetter`方法后，`store.__wrappedGetters`代码表示如下：
```js
const store = {
  __wrappedGetters: {
    'storeCount': function wrappedGetter () { ... },
    'a/storeCount': function wrappedGetter () { ... },
    'b/storeCount': function wrappedGetter () { ... }
  }
}
```

### Getters响应式
`Getters`响应式的过程跟`State`类型，它发生在`resetStoreVM`方法中，相关代码如下：
```js
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm
  store.getters = {}
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })
  store._vm = new Vue({
    computed
  })
}
```
根据以上代码我们可以发现，对于`Getters`的处理，它不光实现了响应式(`Getters`转换成`Computed`)，它还对`store.getters`的访问进行了拦截。

例如:
```js
// 组件中进行方法
this.$store.getters['storeCount']
this.$store.getters['a/storeCount']
this.$store.getters['b/storeCount']

// 相当于访问
this.$store._vm['storeCount']
this.$store._vm['a/storeCount']
this.$store._vm['b/storeCount']
```
## Modules初始化
在介绍`State`、`Mutations`、`Actions`以及`Getters`的过程中，我们提到过如果遇到子模块，它会递归子模块，然后再次调用`installModule`方法。

```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)
  // 省略代码
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
```
其中`module.forEachChild`是`Module`类的一个原型方法，其代码如下:
```js
export default class Module {
  constructor (rawModule, runtime) { ... },
  forEachChild (fn) {
    forEachValue(this._children, fn)
  }
```
我们可以看到在`forEachChild`方法中，它遍历的是`this._children`属性，那么`this._children`属性又是从哪里来的呢？

我们在回到`Store`构造函数中，它有如下代码：
```js

export class Store {
  constructor (options = {}) {
    this._modules = new ModuleCollection(options)
  }
}
```
接着，我们再来看`ModuleCollection`类和`Module`类，其代码如下：
```js
// module-collection.js
export default class ModuleCollection {
  constructor (rawRootModule) {
    this.register([], rawRootModule, false)
  }
  register (path, rawModule, runtime = true) {
    if (__DEV__) {
      assertRawModule(path, rawModule)
    }
    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
}
// module.js
export default class Module {
  constructor (rawModule, runtime) {
    this._children = Object.create(null)
  }
  addChild (key, module) {
    this._children[key] = module
  }
}
```
当第一次执行`register`的时候，主模块下面定义了`modules`，所以会递归调用`register`方法。

在`register`方法中，它通过`addChild`来添加子模块，以我们前面的例子为例，当遍历完子模块以后，`this._children`代码表示如下：
```js
// 演示需要，实际为Module实例
this._children = {
  a: 'Module',
  b: 'Module'
}
```

我们在回到`forEachChild`方法，在这个方法中它遍历的`_children`属性键，然后依次调用其中的`fn`方法。
```js
module.forEachChild((child, key) => {
  installModule(store, rootState, path.concat(key), child, hot)
})
```
也就是说，当递归子模块的时候，会再次执行`installModule`方法，然后依次处理子模块的`State`、`Mutations`、`Actions`以及`Getters`等。

在以上步骤都执行完毕后，`Store`初始化操作基本也就结束了。在下一节中，我们来介绍`Store`辅助方法的设计思想。
