# directive指令

## 指令的注册和使用
同组件一样，指令的注册方式有两种：全局注册和局部注册。<br/>
### 全局注册
全局注册指令可以使用全局API方法：`Vue.directive()`来注册，注册完成以后所有的指令都在`Vue.options['directives']`选项中。

在`Vue`源码里，`Vue.directive()`全局API方法的处理如下：
```js
// component, directive, filter
import { ASSET_TYPES } from 'shared/constants'
export function initAssetRegisters (Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        // ...省略其它
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
```
假如我们有如下代码：
```js
import Vue from 'vue'
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
```
在以上代码中，我们全局注册了一个名为`focus`的指令，其作用是：当绑定该指令的元素被插入到`DOM`时，此元素自动聚焦。在注册完毕后，我们打印`Vue.options['directives']`，其结果如下：
```js
{
  show: {...},
  model: {...},
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
```
我们可以看到，除了我们自己定义的`focus`指令以外，还有两个`show`和`model`指令，这些指令是`Vue`默认提供的，我们可以直接使用。<br/>

在介绍完全局指令的注册方式后，我们来看一下我们自己定义的`focus`指令应该如何去使用：
```vue
<template>
  <input v-focus />
</template>
```
### 局部注册
与组件的局部注册类似，指令的局部注册需要撰写在组件的`directives`选项中：
```vue
<template>
  <div>
    <input v-focus />
  </div>
</template>
<script>
export default {
  name: 'App',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
```
当我们打印`App`组件实例的`$options['directives']`属性时，我们可以得到如下结果：
```js
{
  focus: {
    inserted: function (el) {
      el.focus()
    }
  },
  __proto__: {
    model: {},
    show: {}
  }
}
```
我们可以看到对于子组件而言，自身局部注册的指令和全局注册的指令的处理方式是不相同的，全局注册的指令会被挂载到组件`directives`对象的原型上。

## 自定义指令
除了我们之前提到过的全局默认指令`v-show`、`v-model`以外，我们还可以选择注册自定义指令。就像在**指令的注册和使用**小节中一样，我们注册的`v-focus`指令就是自定义指令。
### 钩子函数
介绍自定义指令之前，我们有必要来了解一下指令的钩子函数。
* `bind`: 只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置。
* `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
* `update`: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
* `componentUpdated`: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
* `unbind`: 只调用一次，指令与元素解绑时调用。

以上钩子函数都是可选的，利用不同的钩子函数，我们可以在不同的状态下做更多的事情。
### 钩子函数参数
在日常开发过程中，你可能见到过很多种使用指令的方式，如下：
```js
<input v-model="inputValue" />
<input v-model:value="inputValue" />
<div v-show="age > 18"></div>
<div v-focus:foo="bar"></div>
<div v-font.color.fontSize="{ color: '#f60', fontSize: '14px' }"></div>
```
以上所有形式的参数，都会在钩子函数的第二个参数`binding`对象中体现出来：
```js
{
  inserted: function (el, binding) {
    console.log(binding.name)
    console.log(binding.value)
    console.log(binding.oldValue)
    console.log(binding.expression)
    console.log(binding.arg)
    console.log(binding.modifiers)
  }
}
```
其中`binding`对象包含以下属性：
* `name`：指令的名字，不带`v`前缀，例如：`model`、`show`以及`focus`。
* `value`：指令的绑定值，这个值是一个合法的`JavaScript`表达式，例如：`age > 18`根据`age`的大小，绑定值为`true`或`false`。或者直接绑定一个对象`{ color: '#f60', fontSize: '14px' }`
* `oldValue`：指令上一次绑定的值，这个值只在`update`和`componentUpdated`这两个钩子函数中可用。
* `expression`：指令的字符串形式表达式，例如：`v-show="age > 18"`，表达式就是`age > 18`。
* `arg`：指令的参数，例如：`v-model:value="inputValue"`，参数为`value`。
* `modifiers`：修饰符对象，例如：`v-font.color.fontSize`，修饰符对象为：`{color: true, fontSize: true}`。


## 指令的解析和指令的运行
我们以如下代码为例来分析指令的解析和运行。
```js
new Vue({
  el: '#app',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  template: '<input v-focus />'
})
```
### 指令的解析
在编译原理章节中，我们了解了一些与编译相关的流程。以上面代码为例，`template`模板里的内容会调用`parse`编译成`ast`：
```js
const ast = parse(template.trim(), options)
```
在`parse`编译的时候，`v-focus`首先会被解析到`ast`的属性数组中：
```js
const ast = {
  tag: 'input',
  attrsList: [
    { name: 'v-focus' }
  ],
  attrMap: {
    'v-focus': ''
  }
}
```
然后在`input`标签触发编译`end`钩子函数的时候，在`processElement`函数中调用了`processAttrs`来处理属性：
```js
export function processElement (
  element: ASTElement,
  options: CompilerOptions
) {
  // ...省略其它
  processAttrs(element)
  return element
}
```
`processAttrs`方法的省略代码如下：
```js
export const dirRE = process.env.VBIND_PROP_SHORTHAND ? /^v-|^@|^:|^\.|^#/ : /^v-|^@|^:|^#/
export const bindRE = /^:|^\.|^v-bind:/
export const onRE = /^@|^v-on:/
function processAttrs (el) {
  const list = el.attrsList
  let i, l, name, rawName, value, modifiers, syncGen, isDynamic
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name
    value = list[i].value
    if (dirRE.test(name)) {
      // ...省略代码
      if (bindRE.test(name)) {
        // v-bind逻辑
      } else if (onRE.test(name)) {
        // v-on逻辑
      } else {
        name = name.replace(dirRE, '')
        // parse arg
        const argMatch = name.match(argRE)
        let arg = argMatch && argMatch[1]
        isDynamic = false
        if (arg) {
          name = name.slice(0, -(arg.length + 1))
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1)
            isDynamic = true
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i])
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value)
        }
      }
    }
  }
```
`processAttrs`代码分析：
* 首先通过`dirRE`正则表达式匹配`v-focus`是否满足指令的形式。
* 然后再通过`bindRE`正则表达式判断是否为`v-bind`。
* 如果不是则继续使用`onRE`正则表达式判断是否为`v-on`
* 如果都不是则表示其为`normal directives`。

在`else`分支中，我们通过调用`addDirective`方法，来把`attrsList`中的`v-focus`指令添加到`ast`对象的`directives`数组中，`addDirective`代码如下：
```js
export function addDirective (
  el: ASTElement,
  name: string,
  rawName: string,
  value: string,
  arg: ?string,
  isDynamicArg: boolean,
  modifiers: ?ASTModifiers,
  range?: Range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name,
    rawName,
    value,
    arg,
    isDynamicArg,
    modifiers
  }, range))
  el.plain = false
}
```
在处理完毕后，我们的`ast`值如下：
```js
const ast = {
  tag: 'input',
  attrsList: [
    { name: 'v-focus' }
  ],
  attrMap: {
    'v-focus': ''
  },
  directives: [
    { name: 'v-focus', value: '' }
  ]
}
```
在`parse`完毕后，会调用`generate`来生成`render`函数，由于这个过程在**编译原理**已经提到过了，所以我们直接看最后生成的`render`函数：
```js
const code = generate(ast, options)

// code打印结果
{
  render: "with(this){ return _c('input', {directives: [{ name: 'focus', rawName: 'v-focus' }]})}",
  staticRenderFns: []
}
```
### 指令的运行
在`render`函数生成后，当组件`patch`的时候会调用`render`函数来生成虚拟`DOM`。

接下来，让我们回顾一下`patch`方法以及虚拟`DOM`的钩子函数：
```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

const modules = platformModules.concat(baseModules)
export const patch: Function = createPatchFunction({ nodeOps, modules })
```
在调用`createPatchFunction`方法的时候，我们传递了一个`modules`数组。在这个`modules`中，我们关注`baseModules`：
```js
// src/core/vdom/modules/index.js
import directives from './directives'
export default [ directives ]

// src/core/vdom/modules/directives.js
export default {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  }
}
function updateDirectives () {
  // ...省略代码
}
```
在`directives.js`文件中导出了一个对象，这个对象的键有三个：`create`、`update`以及`destroy`。这三个对应组件的`hooks`钩子函数，也就是说当组件触发`create`、`update`以及`destroy`的时候会自动调用`updateDirectives`或者`unbindDirectives`方法。

然后，让我们回顾一下`createPatchFunction`方法是如何处理这些钩子函数的：
```js
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']
export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
  const { modules, nodeOps } = backend
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
  // ...省略代码
}

// cbs打印结果
{
  ...,
  create: [
    ...,
    updateDirectives(oldVnode, vnode) {}
  ],
  update: [
    ...,
    updateDirectives(oldVnode, vnode) {}
  ],
  destroy: [
    ...,
    unbindDirectives(vnode) {}
  ]
}
```
在`patch`方法执行的过程中，会在合适的时机调用`invokeCreateHooks`来触发`create`钩子函数，会在合适的时机调用`invokeDestroyHook`来触发`destroy`钩子函数以及会在`patchVnode`方法中遍历`cbs.update`数组并执行`update`数组中的方法。
```js
// invokeCreateHooks代码
function invokeCreateHooks (vnode, insertedVnodeQueue) {
  for (let i = 0; i < cbs.create.length; ++i) {
    cbs.create[i](emptyNode, vnode)
  }
  i = vnode.data.hook // Reuse variable
  if (isDef(i)) {
    if (isDef(i.create)) i.create(emptyNode, vnode)
    if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
  }
}

// patchVnode
function patchVnode (
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  // ... 省略代码
  if (isDef(data) && isPatchable(vnode)) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
  }
  // ...省略代码
}
```

既然我们已经搞清楚了`updateDirectives`和`unbindDirectives`方法调用的时机，那么我们接下来就看一下`directive.js`文件中关于这两个方法的定义。

#### unbindDirectives方法
```js
// directives.js
export default {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  }
}
```
我们可以在`unbindDirectives`方法的定义中看到，其方法内部调用了`updateDirectives`方法，并且给该方法的第二个参数传递了一个`emptyNode`空节点来实现对指令的解绑。

#### updateDirectives方法
`updateDirectives`方法的定义很简单，如下：
```js
function updateDirectives (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode)
  }
}
```
在`updateDirectives`中，它仅仅只是调用了`_update`，接下来让我们看一看这个核心方法的代码实现：
```js
function _update (oldVnode, vnode) {
  const isCreate = oldVnode === emptyNode
  const isDestroy = vnode === emptyNode
  const oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context)
  const newDirs = normalizeDirectives(vnode.data.directives, vnode.context)

  const dirsWithInsert = []
  const dirsWithPostpatch = []

  let key, oldDir, dir
  for (key in newDirs) {
    oldDir = oldDirs[key]
    dir = newDirs[key]
    if (!oldDir) {
      // new directive, bind
      callHook(dir, 'bind', vnode, oldVnode)
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir)
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value
      dir.oldArg = oldDir.arg
      callHook(dir, 'update', vnode, oldVnode)
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir)
      }
    }
  }

  if (dirsWithInsert.length) {
    const callInsert = () => {
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode)
      }
    }
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert)
    } else {
      callInsert()
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', () => {
      for (let i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode)
      }
    })
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy)
      }
    }
  }
}
```
代码分析：
* 变量说明：
1. `isCreate`如果`oldVnode`为空节点，则表示当前`vnode`为新创建的节点。
2. `isDestroy`如果当前`vnode`为空节点，则表示`oldVnode`应该被销毁。
3. `oldDirs`存储旧指令集合。
4. `newDirs`存储新指令集合。
5. `dirsWithInsert`需要触发`inserted`钩子函数的指令集合。
6. `dirsWithPostpatch`需要触发`componentUpdated`钩子函数的指令集合。

* 格式化指令：格式化指令调用了`normalizeDirectives`方法，其代码如下：
```js
function normalizeDirectives (
  dirs: ?Array<VNodeDirective>,
  vm: Component
): { [key: string]: VNodeDirective } {
  const res = Object.create(null)
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  let i, dir
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i]
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers
    }
    res[getRawDirName(dir)] = dir
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true)
  }
  // $flow-disable-line
  return res
}
```
我们以`v-focus`指令为例，格式化前、格式化后结果如下：
```js
// 格式化前
const directives = [
  { name: 'focus', rawName: 'v-focus' }
]

// 格式化后
const directives = {
  'v-focus': {
    name: 'focus',
    rawName: 'v-focus',
    modifiers: {},
    def: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
```

* 遍历新指令集合：使用`for`循环遍历新指令集合，并且拿每次遍历的`key`在新、旧指令集合中取值，如果当前指令在旧指令集合中没有，则表示其为新指令。对于新指令而言，我们首先使用`callhook`触发指令的`bind`钩子函数，然后根据它是否定义了`inserted`钩子函数，来决定是否需要添加到`dirsWithInsert`数组中。如果当前指令在旧指令集合中有，则应该触发指令的`update`钩子函数，并且根据指令是否定义了`update`钩子函数，来决定是否需要添加到`dirsWithPostpatch`数组中。

* 判断`dirsWithInsert`：如果`dirsWithInsert`数组有值，则根据`isCreate`的值来决定是直接调用`callInsert`，还是在虚拟`DOM`的`insert`钩子函数被触发的时候执行`callInsert`。对于新节点而言，这样做的目的是为了**保证inserted钩子函数是在被绑定元素插入到父节点的时候调用**。

* 判断`dirsWithPostpatch`：如果`dirsWithPostpatch`数组有值，则将其遍历并触发指令`componentUpdated`钩子函数封装起来并且合并到虚拟`DOM`的`postpatch`钩子函数上。这样做的目的是为了保证：**组件的VNode以及子VNode全部更新完毕后才调用`componentUpdated`钩子函数**。

* 触发`unbind`钩子函数：如果当前节点不是新增节点，则遍历旧指令集合。在遍历的过程中，所有不在新指令集合中的指令，都需要触发指令的`unbind`钩子函数。



## 小结
在这一章节，我们回顾了指令的注册方式、使用方式；了解了指令的钩子函数以及各种钩子函数参数的作用；学习了指令是如何被解析以及在什么时候运行；最后还学习了指令内部是如何根据不同的情况，触发对应的钩子函数的。