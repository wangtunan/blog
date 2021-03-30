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
在构造函数最开始，它在开发环境下进行了三个断言，分别是：**在实例化Store之前必须按照Vuex**、**必须支持Promise(Action需要)**以及**Store构造函数必须使用new关键词调用**。

在随后，它实例化了一个`ModuleCollection`，并不结果传递给了`this._modules`内部变量。由于`ModuleCollection`主要是用来处理`modules`父子关系的，因此我们会在随后的章节中详细进行介绍。

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
随后，它会调用`installModule`方法来处理与**State**、**Mutations**、**Actions**、**Getters**、**Modules**以及**命名空间**等相关的内容，其完整代码如下：

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

## Action初始化

## Getters初始化

## Modules初始化

## 命名空间的处理

