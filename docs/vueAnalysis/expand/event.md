# event事件处理
在我们编写`Vue`应用的过程中，一定少不了`event`事件。`Vue`中的`event`事件可以让我们处理`click`、`mouse`等原生交互效果，也可以同来处理组件通信。

在**event事件处理**章节，我们首先先回顾一下`event`事件的常见用法，然后再结合编译原理来分析事件是如何被解析的、紧接根据**DOM事件**和**自定义事件**这两种不同的事件类型，来分别进行分析，最后我们来分析一下`Vue`中常见的事件修饰符是如何处理的。

## 常见用法
事件最常见的用法是直接绑定一个事件名：
```html
<div @click="handleClick"></div>
```
如果有传递参数的需求，也可以直接绑定一个函数调用，并在这个函数调用的过程中完成参数的传递：
```html
<!-- 普通参数 -->
<button @click="handleIncrementClick(10)">Increment</button>
<!-- 原始DOM事件参数 + 普通参数 -->
<button @click="handleIncrementClick($event, 10)">Increment</button>
<!-- 箭头函数 -->
<button @click="() => handleIncrementClick(10)">Increment</button>
```
在绑定事件的时候，还可以撰写一些事件修饰符：
```html
<!-- 组件事件修饰符 -->
<child-component @click.native="handleChildComponentClick" />
<!-- 原生事件修饰符 -->
<button @click.stop.prevent="handleIncrement">Increment</button>
<!-- 只添加修饰符，不写事件名 -->
<div @click.stop"></div>
```
如果要动态绑定事件，可以使用事件动态参数：
```js
const eventName = 'click'
const template = '<button @[eventName]="handleIncrement">Increment</button>'
```

## 事件的解析
对于事件的解析，我们以下面代码为例来进行说明：
```js
new Vue({
  el: '#app',
  template: '<button @click="handleClick">Button</button>',
  methods: {
    handleClick () {
      console.log('click handle')
    }
  }
})
```
由于`v-on`事件解析也属于一种特殊的指令，因此对于事件的`parse`解析部分与指令是一样的，我们直接来看`parse`过程中调用`processAttrs`方法之前的`ast`结果：
```js
const ast = {
  type: 1,
  tag: 'button',
  attrsList: [
    { name: '@click', value: 'handleClick' }
  ],
  attrsMap: {
    '@click': 'handleClick'
  },
  rawAttsMap: {
    '@click': { name: '@click', value: 'handleClick' }
  }
}
```
接下来，就是调用我们在指令和过滤器解析的过程中提到过的`processAttrs`方法：
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
      // mark element as dynamic
      el.hasBindings = true
      // modifiers省略代码
      if (bindRE.test(name)) {
        // v-bind省略代码
      } else if (onRE.test(name)) {
        // v-on
        name = name.replace(onRE, '')
        isDynamic = dynamicArgRE.test(name)
        if (isDynamic) {
          name = name.slice(1, -1)
        }
        addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic)
      } else {
        // normal directives省略代码 
      }
    } else {
      // ...省略代码
    }
  }
}
```
由于我们这一章节只分析事件相关的代码，因此我们只关注`else if`分支`v-on`部分。

在`else if`分支中，先调用`onRE`正则表达式来匹配`name`，匹配成功后会调用`addHandler`方法。`addHandler`方法定义在`src/compiler/helpers.js`文件中，其精简代码如下：
```js
export function addHandler (
  el: ASTElement,
  name: string,
  value: string,
  modifiers: ?ASTModifiers,
  important?: boolean,
  warn?: ?Function,
  range?: Range,
  dynamic?: boolean
) {
  modifiers = modifiers || emptyObject
  // ...省略代码
  let events
  if (modifiers.native) {
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else {
    events = el.events || (el.events = {})
  }

  const newHandler: any = rangeSetItem({ value: value.trim(), dynamic }, range)
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers
  }

  const handlers = events[name]
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}
```
代码分析：
* 首先判断修饰符中是否存在`native`，如果存在则把事件存放在`nativeEvents`对象中，否则存放在`events`中。关于`DOM`事件和自定义事件，我们会在之后的章节中进行单独分析，这里只要知道二者存放的位置不同即可。
* 在代码最后，它首先判断了`handlers`是否是一个数组，如果是则根据`important`参数值选择添加到数组头部还是尾部，因为在`else if`分支中，调用`addHandler`方法时传递的参数为`false`，所以会添加到数组尾部；如果不是一个数组，则继续判断是否已经有值，有值则处理成数组形式；如果既不是数组，也没有值则直接赋值即可。这段代码的逻辑，意味着我们可以重复监听同一个事件，并绑定不同的事件名，它们并不会被相互覆盖，而是会在事件被触发的时候，依次调用`events`数组中的每一个函数。
```js
new Vue({
  el: '#app',
  template: '<button @click="handleOneClick" @click="handleTwoClick">Button</button>',
  methods: {
    handleOneClick () {
      console.log('one click handle')
    },
    handleTwoClick () {
      console.log('two click handle')
    }
  }
})
```
**注意**：虽然我们可以这样做，它也能按照代码逻辑正常运行，但重复监听同一个事件且提供不同的事件名，会让代码变得有歧义。因为我们在不了解源码的前提下，会很大程度上误认为重复监听的事件会被相互覆盖，所以`Vue`在`patch`的时候，会进行检测并在开发环境下提示错误信息：
```js
function makeAttrsMap (attrs: Array<Object>): Object {
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn('duplicate attribute: ' + attrs[i].name, attrs[i])
    }
    map[attrs[i].name] = attrs[i].value
  }
  return map
}

// 报错信息
'Error compiling template: duplicate attribute: @click'
```
在`processAttrs`方法调用完毕后，`parse`阶段基本已经结束了，此时的`ast`对象如下：
```js
const ast = {
  type: 1,
  tag: 'button',
  attrsList: [
    { name: '@click', value: 'handleClick' }
  ],
  attrsMap: {
    '@click': 'handleClick'
  },
  rawAttsMap: {
    '@click': { name: '@click', value: 'handleClick' }
  },
  events: {
    click: { value: 'handleClick', dynamic: false }
  }
}
```
最后，我们来分析一下事件的`generate`：
```js
const code = generate(ast, options)
```
当`ast`生成完毕后，在调用`generate`时会调用一个非常核心的`genData`方法，在这个方法中与事件相关的代码如下：
```js
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  // ...省略代码
  if (el.events) {
    data += `${genHandlers(el.events, false)},`
  }
  if (el.nativeEvents) {
    data += `${genHandlers(el.nativeEvents, true)},`
  }
  // ...省略代码
  return data
}
```
在`genData`方法中，无论是`DOM`事件还是自定义事件，都会调用`genHandlers`方法来处理，其代码如下：
```js
export function genHandlers (
  events: ASTElementHandlers,
  isNative: boolean
): string {
  const prefix = isNative ? 'nativeOn:' : 'on:'
  let staticHandlers = ``
  let dynamicHandlers = ``
  for (const name in events) {
    const handlerCode = genHandler(events[name])
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += `${name},${handlerCode},`
    } else {
      staticHandlers += `"${name}":${handlerCode},`
    }
  }
  staticHandlers = `{${staticHandlers.slice(0, -1)}}`
  if (dynamicHandlers) {
    return prefix + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`
  } else {
    return prefix + staticHandlers
  }
}
```
在分析`genHandlers`方法时，我们以两个不同的维度来说明
* **动态事件名和静态事件名**：区分动态事件名还是静态事件名，关键点是`dynamic`属性，假如我们有如下案例：
```js
// 静态事件名
const staticTemplate = '<button @click="handleClick">Button</button>'

// 动态事件名
const eventName = 'click'
const dynamicTemplate = '<button @[eventName]="handleClick">Button</button>'
```
在调用`genHandlers`方法后，其方法返回值分别如下：
```js
// 静态事件名返回结果
const staticResult = 'on:{"click":handleClick}'

// 动态事件名返回结果
const dymamicResult = 'on:_d({},[eventName,handleClick])'
```
**注意**：`_d`参数同`_f`和`_s`函数一样，它是某个函数的缩写形式，其代码如下：
```js
export function bindDynamicKeys (baseObj: Object, values: Array<any>): Object {
  for (let i = 0; i < values.length; i += 2) {
    const key = values[i]
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1]
    } else if (process.env.NODE_ENV !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        `Invalid value for dynamic directive argument (expected string or null): ${key}`,
        this
      )
    }
  }
  return baseObj
}
```
* **DOM事件类型和自定义事件类型**：区分`DOM`事件类型还是自定义事件类型，关键点是`native`事件修饰符，假设我们有如下案例：
```js
// DOM事件类型
const domTemplate = '<button @click="handleClick">Button</button>'

// 自定义事件类型
const customerTemplate = '<child-component @change="handleChange" />'
```
在调用`genHandlers`方法后，其方法返回值分别如下：
```js
// DOM事件类型返回结果
const domResult = 'on:{"click":handleClick}'

// 自定义事件类型返回结果
const customerResult = 'nativeOn:{"click":function($event){return handleClick($event)}}'
```

在分析完`genHandlers`方法后，接下来我们来分析一下`genHandler`方法：
```js
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/
const fnInvokeRE = /\([^)]*?\);*$/
function genHandler (handler: ASTElementHandler | Array<ASTElementHandler>): string {
  if (!handler) {
    return 'function(){}'
  }
  if (Array.isArray(handler)) {
    return `[${handler.map(handler => genHandler(handler)).join(',')}]`
  }
  const isMethodPath = simplePathRE.test(handler.value)
  const isFunctionExpression = fnExpRE.test(handler.value)
  const isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''))
  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    // ...省略代码
    return `function($event){${
      isFunctionInvocation ? `return ${handler.value}` : handler.value
    }}` // inline statement
  } else {
    // 省略修饰符相关代码
  }
}
```
**注意**：在`genHandler`方法中，我们省略了处理事件修饰符`else`分支的逻辑，这部分代码我们会在后续的章节中专门介绍。
代码分析：
* **变量说明**：`isMethodPath`代表是否为简单访问方式、`isFunctionExpression`代表是否为函数表达式方式、`isFunctionInvocation`代表是否为函数调用方式。
```js
// 简单访问模式
// a a.b a['b'] a["b"] a[b]
const eventMap = {
  clickName: 'handleClick'
}
const simpleWay1 = '<button @click="handleClick">Button</button>'
const simpleWay2 = '<button @click="eventMap.clickName">Button</button>'
const simpleWay3 = '<button @click="eventMap["clickName"]">Button</button>'
// ...

// 函数表达式方式
const funcExpression = '<button @click="() => handleClick()">Button</button>'

// 函数调用方式
const funcInvocation = '<button @click="handleClick()">Button</button>'
```
* **简单访问方式**：假设我们有如下案例：
```js
const simpleWay = '<button @click="handleClick">Button</button>'
```
因为它为简单访问方式，因此`isMethodPath`值为`true`，直接返回`handler.value`，此时`genHandler`和`genHandlers`函数返回结果分别如下：
```js
const genHandlerResult = 'handleClick'
const genHandlersResult = 'on:{"click":handleClick}'
```
* **函数表达式方式**：假设我们有如下案例：
```js
const funcExpression = '<button @click="()=>handleClick()">Button</button>'
```
因为此时的`isFunctionExpression`变量值为`true`，直接返回`handler.value`，此时`genHandler`和`genHandlers`函数返回结果分别如下：
```js
const genHandlerResult = '()=>handleClick()'
const genHandlersResult = 'on:{"click":()=>handleClick()}'
```
* **函数调用方式**：假设我们有如下案例：
```js
const funcInvocation = '<button @click="handleClick()">Button</button>'
```
因为此时的`isMethodPath`和`isFunctionExpression`值都为`false`，所以不会走`if`分支的逻辑，此时`genHandler`和`genHandlers`函数返回结果分别如下：
```js
const genHandlerResult = 'function($event){return handleClick()}'
const genHandlersResult = 'on:{"click":function($event){return handleClick()}}'
```
* **重复监听事件方式**：假设我们有如下案例：
```js
const repeatTemplate = '<button @click="handleOneClick" @click="handleTwoClick">Button</button>'
```
当`handler`为数组时，会递归调用`genHandler`方法，然后把每次函数的返回结果，当做数组元素拼接到数组字符串中，此时`genHandler`和`genHandlers`函数返回结果分别如下：
```js
const genHandlerResult = '[handleOneClick,handleTwoClick]'
const genHandlersResult = 'on:{"click":[handleOneClick,handleTwoClick]}'
```
在`genHandler`方法分析完毕后，代表`codegen`代码生成环节也正式结束了。回到我们最初的例子，此时`generate`方法的返回值如下：
```js
const template = '<button @click="handleClick">Button</button>'

const code = generate(ast, options)
// code 打印结果
{
  render: "with(this){return _c('button',{on:{"click":handleClick}},[_v("Button")])}",
  staticRenderFns: []
}
```

## DOM事件和自定义事件
### DOM事件
原生`DOM`事件需要写在`HTML`标签元素上，如果要在组件标签上添加原生`DOM`事件，则必须提供`native`事件修饰符。

在这一章节，我们先来分析一下在`patch`的过程中，`DOM`事件是如何被处理的，我们以如下代码为例来进行说明：
```js
new Vue({
  el: '#app',
  template: '<button @click="handleClick">Button</button>',
  methods: {
    handleClick () {
      console.log('click handle')
    }
  }
})
```

回顾一下`patch`函数的赋值过程，文件路径为`src/platforms/web/runtime/patch.js`：
```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

const modules = platformModules.concat(baseModules)
export const patch: Function = createPatchFunction({ nodeOps, modules })
```
在调用`createPatchFunction`方法的时候，我们传递了一些与平台相关的`modules`，这些`modules`定义在`src/platforms/web/runtime/modules`目录下面。在这些目录下面，我们只关心`event.js`文件的代码：
```js
export default {
  create: updateDOMListeners,
  update: updateDOMListeners
}
```
与**directive指令**类似的道理，`updateDOMListeners`方法会在组件的`create`和`update`钩子函数中自动调用。我们省略对调用时机的介绍，直接来看`updateDOMListeners`方法的定义：
```js
let target
function updateDOMListeners (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target = vnode.elm
  normalizeEvents(on)
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context)
  target = undefined
}
```
`updateDOMListeners`方法的代码不是很多，它首先获取到了当前`vnode`、旧`vnode`上的事件监听对象以及当前元素标签。然后通过调用`normalizeEvents`和`updateListeners`来处理事件监听。

因为`normalizeEvents`方法主要是用来处理与`v-model`相关的，所以我们跳过这部分，直接看`updateListeners`方法的代码：
```js
export function updateListeners (
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  createOnceHandler: Function,
  vm: Component
) {
  let name, def, cur, old, event
  for (name in on) {
    def = cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
    /* istanbul ignore if */
    if (__WEEX__ && isPlainObject(def)) {
      cur = def.handler
      event.params = def.params
    }
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        `Invalid handler for event "${event.name}": got ` + String(cur),
        vm
      )
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm)
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture)
      }
      add(event.name, cur, event.capture, event.passive, event.params)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      remove(event.name, oldOn[name], event.capture)
    }
  }
}
```
`updateListeners`方法的代码虽然很长，但是所做的事情并不复杂。
* `for-in`遍历`on`对象：其作用是用来`add`添加事件监听或者更新事件监听。在此循环中，首先判断了当前事件是否已经定义，如果没有则在开发环境下提示错误信息；如果已经定义，但在旧事件监听中没有，则表示应该使用`add`来新增这个事件监听；如果当前事件监听和旧事件监听都有，但是不并相同。则表明虽然监听的是同一个事件，但是回调函数不同，此时应该更新事件。
* `for-in`遍历`oldOn`对象：其作用是用来移除事件监听。在此循环中，判断旧事件监听不在新事件监听中，则表明应该移除这些事件监听，移除事件监听调用了`remove`方法。

#### add添加事件监听
因为`updateListeners`方法定义在`src/core/vdom/helpers/update-listeners.js`文件中，它作为一个通用方法，其`add`和`remove`参数都是根据外部不同环境传递过来的。在原生`DOM`事件中，`add`代码定义在`src/platforms/web/runtime/modules/event.js`文件中，其代码如下：
```js
function add (
  name: string,
  handler: Function,
  capture: boolean,
  passive: boolean
) {
  // ...省略处理浏览器兼容代码
  target.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture, passive }
      : capture
  )
}
```
#### remove移除事件监听
`remove`和`add`方法定义在同一个位置，其代码如下：
```js
function remove (
  name: string,
  handler: Function,
  capture: boolean,
  _target?: HTMLElement
) {
  (_target || target).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  )
}
```
#### createFnInvoker
在介绍完`add`和`remove`方法后，我们来看一个比较重要的`createFnInvoker`方法：
```js
export function createFnInvoker (fns: Function | Array<Function>, vm: ?Component): Function {
  function invoker () {
    const fns = invoker.fns
    if (Array.isArray(fns)) {
      const cloned = fns.slice()
      for (let i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments, vm, `v-on handler`)
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, `v-on handler`)
    }
  }
  invoker.fns = fns
  return invoker
}
```
代码分析：首先定义了一个`invoker`方法，然后把`for-in`循环的当前事件监听赋值到`invoker`方法的`fns`属性上，随后返回`invoker`。意味着其后调用的`add`方法的`handler`参数就是`invoker`，而不直接是我们例子中的`handleClick`方法，它多包裹了一层。
```js
button.addEventListener('click', function invoker () { })
```
当我们点击`button`按钮触发`click`事件的时候，`invoker`方法开始执行。在这个方法中，它首先拿到`fns`属性，然后判断如果是数组则遍历并调用其回调函数，如果不是数组则不需要遍历，直接调用即可。也就是说，这里拿到的`fns`就是我们案例中的`handleClick`方法。

**注意**：`invokeWithErrorHandling`方法仅仅只是对函数调用多了一层`try/catch`包裹，这样做是为了方便捕获错误。在不考虑异常的情况下，你可以把`invokeWithErrorHandling`方法，替换成`fn.apply(context, args)`。
```js
export function invokeWithErrorHandling (
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}
```

### 自定义事件

## 常见修饰符的处理

## 小结
