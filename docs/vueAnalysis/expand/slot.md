# 插槽

## 插槽的编译
对于插槽的编译，我们只需要记住一句话：**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

**注意**：由于在`Vue2.6+`版本中，对于插槽相关的内容有所改动：它废弃了旧的用法，新增了`v-slot`指令。虽然依旧会在`Vue2.0`版本进行兼容，但在`Vue3.0`版本会将其进行移除，因此我们在分析插槽实现原理这一章节会以最新的`v-slot`新语法进行分析。

我们使用如下案例来分析插槽的编译原理：
```js
// 子组件
Vue.component('child-component', {
  template: `
  <div>
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>`,
})

// 父组件
new Vue({
  el: '#app',
  template: `
    <child-component>
      <template v-slot:header>
        插槽头部内容
      </template>
      <template v-slot>
        插槽内容
      </template>
      <template v-slot:footer>
        插槽底部内容
      </template>
    </child-component>
  `
})
```

### 父组件的插槽编译
当编译第一个`template`标签调用`processElement`方法的时候，会在这个方法里面调用`processSlotContent`来处理与插槽相关的内容：
```js
export function processElement (
  element: ASTElement,
  options: CompilerOptions
) {
  // ...省略代码
  processSlotOutlet(element)
  // ...省略代码
  return element
}


```
就我们的例子而言，在`processSlotContent`方法中，其相关代码如下：
```js
const slotRE = /^v-slot(:|$)|^#/
export const emptySlotScopeToken = `_empty_`
function processSlotContent (el) {
  let slotScope
  // ...省略代码
  if (el.tag === 'template') {
    // v-slot on <template>
    const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
    if (slotBinding) {
      // ..异常处理
      const { name, dynamic } = getSlotName(slotBinding)
      el.slotTarget = name
      el.slotTargetDynamic = dynamic
      el.slotScope = slotBinding.value || emptySlotScopeToken
    }
  }
  // ...省略代码
}
```
代码分析：
1. 首先调用`getAndRemoveAttrByRegex`方法并给第二个参数传入`slotRE`正则表达式，用来获取并移除当前`ast`对象上的`v-slot`属性。
```js
// before
const ast = {
  attrsList: [
    { name: 'v-slot:header', value: '' }
  ]
}
// after
const ast = {
  attrsList: []
}
```
2. 随后通过调用`getSlotName`方法来获取插槽的名字以及获取是否为动态插槽名。
```js
const { name, dynamic } = getSlotName(slotBinding)
console.log(name)     // "header"
console.log(dynamic)  // false

function getSlotName (binding) {
  let name = binding.name.replace(slotRE, '')
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default'
    } else if (process.env.NODE_ENV !== 'production') {
      warn(
        `v-slot shorthand syntax requires a slot name.`,
        binding
      )
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: `"${name}"`, dynamic: false }
}
```
3. 最后如果正则解析到有作用域插槽，则赋值给`slotScope`属性，如果没有则取一个默认的值`_empty_`。

对于第二个、第三个`template`标签而言，它们的编译过程是一样的，当这三个标签全部编译完毕后，我们可以得到如下三个`ast`对象：
```js
// header
const ast = { tag: 'template', slotTarget: '"header"', slotScope: '_empty_' }
// default
const ast = { tag: 'template', slotTarget: '"default"', slotScope: '_empty_' }
// footer
const ast = { tag: 'template', slotTarget: '"footer"', slotScope: '_empty_' }
```

随后，我们在`closeElement`方法中可以看到如下代码：
```js
if (element.slotScope) {
  // scoped slot
  // keep it in the children list so that v-else(-if) conditions can
  // find it as the prev node.
  const name = element.slotTarget || '"default"'
  ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
}
currentParent.children.push(element)
element.parent = currentParent
```
首先，我们关注`if`分支里面的逻辑，`element`可以理解为以上任意一个`template`标签的`ast`对象。当`ast`对象存在`slotScope`属性的时候，`Vue`把当前`ast`节点挂到父级的`scopedSlots`属性上面：
```js
// 举例使用，实际为AST对象
const parentAST = {
  tag: 'child-component',
  scopedSlots: {
    'header': 'headerAST',
    'default': 'defaultAST',
    'footer': 'footerAST'
  }
}
```
在`if`分支外面，它又维护了父、子`AST`对象的树形结构，如下：
```js
// 举例使用，实际为AST对象
const parentAST = {
  tag: 'child-component',
  children: [
    { tag: 'template', slotTarget: '"header"', slotScope: '_empty_', parent: 'parentAST' },
    { tag: 'template', slotTarget: '"default"', slotScope: '_empty_', parent: 'parentAST' },
    { tag: 'template', slotTarget: '"footer"', slotScope: '_empty_', parent: 'parentAST' }
  ],
  scopedSlots: {
    'header': 'headerAST',
    'default': 'defaultAST',
    'footer': 'footerAST'
  }
}
```
看到这里，你可能会非常疑惑：**插槽的内容应该分发到子组件，为什么要把插槽AST对象添加到父级的Children数组中呢？**

如果你注意观察上面代码注释的话，你就能明白为什么样这样做，这样做的目的是：**正确维护`v-else或者v-else-if`标签关系。**
```js
const template = `
  <div>
    <p v-if="showSlot"></p>
    <template v-else-if="showDefaultSlot" v-slot:default>插槽内容</template>
    <p v-else></p>
  </div>
`
```
当`tree`层级关系确定后，再从`children`数组中过滤掉插槽`AST`元素：
```js
// final children cleanup
// filter out scoped slots
element.children = element.children.filter(c => !(c: any).slotScope)
```
当父组件编译完毕后，我们可以得到如下`ast`对象：
```js
const ast = {
  tag: 'child-component',
  children: [],
  scopedSlots: {
    'header': { tag: 'template', slotTarget: '"header"', slotScope: '_empty_' },
    'default': { tag: 'template', slotTarget: '"default"', slotScope: '_empty_' },
    'footer': { tag: 'template', slotTarget: '"footer"', slotScope: '_empty_' }
  }
}
```

既然`parse`解析过程已经结束了，那么我们来看`codegen`阶段。在`genData`方法中，与插槽相关的处理逻辑如下：
```js
export function genData (el: ASTElement, state: CodegenState): string {
  // ...省略代码
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += `slot:${el.slotTarget},`
  }
  // scoped slots
  if (el.scopedSlots) {
    data += `${genScopedSlots(el, el.scopedSlots, state)},`
  }
  // ...省略代码
}
```
对于父组件而言，因为它有`scopedSlots`属性，所以会调用`genScopedSlots`方法来处理，我们来看一下这个方法的代码：
```js
function genScopedSlots (
  el: ASTElement,
  slots: { [key: string]: ASTElement },
  state: CodegenState
): string {
  // ...省略代码
  const generatedSlots = Object.keys(slots)
    .map(key => genScopedSlot(slots[key], state))
    .join(',')

  return `scopedSlots:_u([${generatedSlots}]${
    needsForceUpdate ? `,null,true` : ``
  }${
    !needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ``
  })`
}

function genScopedSlot (
  el: ASTElement,
  state: CodegenState
): string {
  const isLegacySyntax = el.attrsMap['slot-scope']
  // ...省略代码
  const slotScope = el.slotScope === emptySlotScopeToken
    ? ``
    : String(el.slotScope)
  const fn = `function(${slotScope}){` +
    `return ${el.tag === 'template'
      ? el.if && isLegacySyntax
        ? `(${el.if})?${genChildren(el, state) || 'undefined'}:undefined`
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)
    }}`
  // reverse proxy v-slot without scope on this.$slots
  const reverseProxy = slotScope ? `` : `,proxy:true`
  return `{key:${el.slotTarget || `"default"`},fn:${fn}${reverseProxy}}`
}
```
如果我们仔细观察`genScopedSlots`和`genScopedSlot`的代码，就能发现核心代码是在`genScopedSlot`方法对于`fn`变量的赋值这一块。我们现在不用把所有判断全部搞清楚，只需要按照我们的例子进行分解即可：
```js
const fn = `function(${slotScope}){
  return ${genChildren(el, state) || 'undefined'}
`
```
因为`template`里面只是一个简单的文本内容，所以当调用`genChildren`方法完毕后，`genScopedSlot`返回值如下：
```js
let headerResult = '{key:"header",fn:function(){return [_v("插槽头部内容")]},proxy:true}'
let defaultResult = '{key:"default",fn:function(){return [_v("插槽内容")]},proxy:true}'
let footerResult = '{key:"footer",fn:function(){return [_v("插槽底部内容")]},proxy:true}'
```
最后，回到`genScopedSlots`方法中，把结果串联起来：
```js
const result = `
  {
    scopedSlots:_u([
      { key:"header",fn:function(){return [_v("插槽头部内容")]},proxy:true },
      { key:"default",fn:function(){return [_v("插槽内容")]},proxy:true },
      { key:"footer",fn:function(){return [_v("插槽底部内容")]},proxy:true}
    ])
  }
`
```
**注意**：`_u`方法是`resolveScopedSlots`方法的缩写形式，我们会在后面进行介绍。

当`codegen`代码生成阶段执行完毕后，得到的`render`函数如下：
```js
const render = `with(this){
  return _c('child-component', {
    scopedSlots:_u([
      { key:"header",fn:function(){return [_v("插槽头部内容")]},proxy:true },
      { key:"default",fn:function(){return [_v("插槽内容")]},proxy:true },
      { key:"footer",fn:function(){return [_v("插槽底部内容")]},proxy:true}
    ])
  })
}`
```
### 子组件的插槽编译
子组件的插槽的`parse`解析过程与普通标签没有太大的区别，我们直接看`parse`阶段完毕后的`ast`:
```js
const ast = {
  tag: 'div',
  children: [
    { tag: 'slot', slotName: '"header"' },
    { tag: 'slot', slotName: '"default"' },
    { tag: 'slot', slotName: '"footer"' }
  ]
}
```
在`codegen`代码生成阶段，当调用`genElement`方法时，会命中如下分支：
```js
else if (el.tag === 'slot') {
  return genSlot(el, state)
}
```
命中`else if`分支后，会调用`genSlot`方法，其代码如下：
```js
function genSlot (el: ASTElement, state: CodegenState): string {
  const slotName = el.slotName || '"default"'
  const children = genChildren(el, state)
  let res = `_t(${slotName}${children ? `,${children}` : ''}`
  const attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(attr => ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      })))
    : null
  const bind = el.attrsMap['v-bind']
  if ((attrs || bind) && !children) {
    res += `,null`
  }
  if (attrs) {
    res += `,${attrs}`
  }
  if (bind) {
    res += `${attrs ? '' : ',null'},${bind}`
  }
  return res + ')'
}
```
`genSlot`方法不是很复杂，也很好理解，所以我们直接看最后生成的`render`函数：
```js
const render = `with(this){
  return _c('div',[
    _t("header"),
    _t("default"),
    _t("footer")
  ],2)
}`
```
**注意**：`_t`是`renderSlot`方法的缩写形式。

## 插槽的patch
当处于`patch`阶段的时候，它会调用`render`函数生成`vnode`。在上一节中，我们得到了父、子组件两个`render`函数：
```js
// 父组件render函数
const parentRender = `with(this){
  return _c('child-component', {
    scopedSlots:_u([
      { key:"header",fn:function(){return [_v("插槽头部内容")]},proxy:true },
      { key:"default",fn:function(){return [_v("插槽内容")]},proxy:true },
      { key:"footer",fn:function(){return [_v("插槽底部内容")]},proxy:true}
    ])
  })
}`

// 子组件render函数
const childRender = `with(this){
  return _c('div',[
    _t("header"),
    _t("default"),
    _t("footer")
  ],2)
}`
```
当执行`render`函数的时候，会调用`_c`、`_u`、`_v`以及`_t`这些函数，在这几个函数中我们重点关注`_u`和`_t`这两个函数。

`_u`函数的代码如下，它定义在`src/core/instance/render-helpers/resolve-scoped-slots.js`文件中：
```js
// _u函数
export function resolveScopedSlots (
  fns: ScopedSlotsData, // see flow/vnode
  res?: Object,
  // the following are added in 2.6
  hasDynamicKeys?: boolean,
  contentHashKey?: number
): { [key: string]: Function, $stable: boolean } {
  res = res || { $stable: !hasDynamicKeys }
  for (let i = 0; i < fns.length; i++) {
    const slot = fns[i]
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys)
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true
      }
      res[slot.key] = slot.fn
    }
  }
  if (contentHashKey) {
    (res: any).$key = contentHashKey
  }
  return res
}
```
代码分析：当`resolveScopedSlots`函数调用的时候，我们传递了一个`fns`数组，在这个方法中首先会遍历`fns`，然后把当前遍历的对象赋值到`res`对象中，其中`slot.key`当做键，`slot.fn`当做值。当`resolveScopedSlots`方法调用完毕后，我们能得到如下`res`对象：
```js
const res = {
  header: function () {
    return [_v("插槽头部内容")]
  },
  default: function () {
    return [_v("插槽内容")]
  },
  footer: function () {
    return [_v("插槽底部内容")]
  }
}
```

`_t`函数的代码如下，它定义在`src/core/instance/render-helpers/render-slot.js`文件中：
```js
// _t函数
export function renderSlot (
  name: string,
  fallback: ?Array<VNode>,
  props: ?Object,
  bindObject: ?Object
): ?Array<VNode> {
  const scopedSlotFn = this.$scopedSlots[name]
  let nodes
  if (scopedSlotFn) { // scoped slot
    props = props || {}
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        )
      }
      props = extend(extend({}, bindObject), props)
    }
    nodes = scopedSlotFn(props) || fallback
  } else {
    nodes = this.$slots[name] || fallback
  }

  const target = props && props.slot
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}
```
我们在分析`renderSlot`方法之前，先来看`this.$scopedSlots`这个属性。当调用`renderSlot`方法的时候，这里的`this`代表子组件实例，其中`$scopedSlots`方法是在子组件的`_render`方法被调用的时候赋值的。
```js
Vue.prototype._render = function () {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options
  if (_parentVnode) {
    vm.$scopedSlots = normalizeScopedSlots(
      _parentVnode.data.scopedSlots,
      vm.$slots,
      vm.$scopedSlots
    )
  }
  // ...省略代码
}
```
我们可以看到，它调用了`normalizeScopedSlots`方法，并且第一个参数传递的是父组件的`scopedSlots`属性，这里的`scopedSlots`属性就是`_u`方法返回的`res`对象：
```js
const res = {
  header: function () {
    return [_v("插槽头部内容")]
  },
  default: function () {
    return [_v("插槽内容")]
  },
  footer: function () {
    return [_v("插槽底部内容")]
  }
}
```
到这里，我们就把`_u`和`_t`这两个方法串联起来了。接下来再看`renderSlot`方法就容易很多。`renderSlot`方法的主要作用就是把`res.header`、`res.default`以及`res.footer`方法依次调用一遍并且返回生成的`vnode`。

当`renderSlot`方法调用完毕后，可以得到子组件如下`vnode`对象：
```js
const childVNode = {
  tag: 'div',
  children: [
    { text: '插槽头部内容' },
    { text: '插槽内容' },
    { text: '插槽底部内容' }
  ]
}
```

## 作用域插槽
在分析插槽的`parse`、插槽的`patch`过程中我们提供的插槽都是普通插槽，还有一种插槽使用方式，我们叫做作用域插槽，如下：
```js
Vue.component('child-component', {
  data () {
    return {
      msg1: 'header',
      msg2: 'default',
      msg3: 'footer'
    }
  },
  template: `
  <div>
    <slot name="header" :msg="msg1" />
    <slot :msg="msg2" />
    <slot name="footer" :msg="msg3" />
  </div>`,
})
new Vue({
  el: '#app',
  data () {
    return {
      msg: '',
      isShow: true
    }
  },
  template: `
    <child-component>
      <template v-slot:header="props">
        {{props.msg}}
      </template>
      <template v-slot="props">
        {{props.msg}}
      </template>
      <template v-slot:footer="props">
        {{props.msg}}
      </template>
    </child-component>
  `
})
```
作用域插槽和普通插槽最本质的区别是：**作用域插槽能拿到子组件的props**。对于这一点区别，它体现在生成`fn`函数的参数上：
```js
const render = `with(this){
  return _c('child-component',{
    scopedSlots:_u([
      { key:"header",fn:function(props){return [_v(_s(props.msg))]} },
      { key:"default",fn:function(props){return [_v(_s(props.msg))]} },
      { key:"footer",fn:function(props){return [_v(_s(props.msg))]} }
    ])
  })
}`
```
这里的`props`就是我们在子组件`slot`标签上传递的值：
```html
<slot name="header" :msg="msg1" />
<slot :msg="msg2" />
<slot name="footer" :msg="msg3" />
```
所以，对于我们的例子而言，最后生成的子组件`vnode`对象如下：
```js
const childVNode = {
  tag: 'div',
  children: [
    { text: 'header' },
    { text: 'default' },
    { text: 'footer' }
  ]
}
```

## 插槽的更新
以上关于插槽的介绍，都是在讲述组件初始化阶段，有些情况下当组件重新渲染时，需要去通知子组件重新进行渲染，这些情况有：

* `slot`插槽中使用了父组件的响应式变量，例如：
```js
new Vue({
  el: '#app',
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.msg = Math.random()
    }, 3000)
  },
  template: `
    <child-component>
      <template v-slot:header>
        {{msg}}
      </template>
    </child-component>
  `
})
```
在`slot`中，我们使用了来自父组件的响应式变量`msg`，当父组件初始化完毕时，会在`mounted`生命周期函数中延时`3s`去改变`msg`的值。因为`msg`的值发生了变动，所以需要通知子组件重新进行渲染，关于这部分的逻辑它属于**依赖收集**、**派发更新**的范畴。

因为我们在模板中使用到了`msg`变量，而这个变量又是定义在插槽中的，当`_t`函数执行的时候，当前上下文环境为子组件，既`msg`会把这个上下文进行依赖收集。随后在`setTimeout`延时器方法中修改`msg`的时候，会`dep.notify()`通知依赖列表进行更新。

* 插槽`template`上存在`v-if`、`v-for`或动态插槽名等情况，例如：
```js
// v-if 
<template v-slot:header v-if="showSlot">header</template>
// dynamic slotTarget + v-for
<template v-slot:[item] v-for="item in list">
  {{item}}
</template>
```
对于使用`v-if`来控制是否显示插槽这个例子而言，当`showSlot`值变动的时候，它应该通知子组件重新进行渲染，这是一件很正常的事情，但问题的关键点在于什么时候？如何通知子组件重新进行渲染？

我们先放下这两个问题，先来看第二个例子，对于这个例子而言，父组件和子组件生成的`render`函数如下：
```js
const parentRender = `with(this){
  return _c('child-component',{
    scopedSlots:_u([_l((list),function(item){
      return {
        key:item,
        fn:function(){
          return [_v(_s(item))]
        },
        proxy:true
      }
    })],null,true)
  })
}`

const childRender = `with(this){
  return _c('div',[
    _t("header",null,{"msg":msg1}),
    _t("default",null,{"msg":msg2}),
    _t("footer",null,{"msg":msg3})
  ],2)
}`
```
`_l`函数就是`renderList`方法的简写形式，其代码如下：
```js
export function renderList (
  val: any,
  render: (
    val: any,
    keyOrIndex: string | number,
    index?: number
  ) => VNode
): ?Array<VNode> {
  let ret: ?Array<VNode>, i, l, keys, key
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length)
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i)
    }
  } else if (typeof val === 'number') {
    // ...省略代码
  } else if (isObject(val)) {
    // ...省略代码
  }
  if (!isDef(ret)) {
    ret = []
  }
  (ret: any)._isVList = true
  return ret
}
```
由于传递的第一个参数是一个数组形式，因此命中`if`分支的逻辑，当遍历完毕后返回的`ret`数组如下：
```js
const ret = [
  { key: 'header', fn: function () {}, proxy: true },
  { key: 'default', fn: function () {}, proxy: true },
  { key: 'footer', fn: function () {}, proxy: true },
]
```
我们把这个结果再带回到`parentRender`函数中：
```js
const parentRender = `with(this){
  return _c('child-component', {
    scopedSlots:_u([
      { key:"header",fn:function(){return [_v("插槽头部内容")]},proxy:true },
      { key:"default",fn:function(){return [_v("插槽内容")]},proxy:true },
      { key:"footer",fn:function(){return [_v("插槽底部内容")]},proxy:true}
    ])
  })
}`
```
这和我们在前面提到过的例子一模一样，但关键点在于这里使用的`v-for`指令，如果我们在父组件初始化完毕后，再去修改`list`数组的内容，那么应该需要去通知子组件重新进行渲染。

既然我们搞清楚了这两个例子为什么要通知子组件重新进行渲染，接下来让我们来回答前面遗留的两个问题：**什么时候通知子组件重新进行渲染？**、**怎么通知子组件重新进行渲染？**。

问：**什么时候通知子组件重新进行渲染？**<br/>
答：当我们在父组件初始化完毕后，再次修改`list`数组时，父组件会触发`prepatch`钩子函数，在这个钩子函数中它调用了`updateChildComponent`方法，在这个方法中有如下代码逻辑：
```js
export function updateChildComponent (
  vm: Component,
  propsData: ?Object,
  listeners: ?Object,
  parentVnode: MountedComponentVNode,
  renderChildren: ?Array<VNode>
) {
  // ...省略代码
  const newScopedSlots = parentVnode.data.scopedSlots
  const oldScopedSlots = vm.$scopedSlots
  const hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  )

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  const needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  )
  // ...省略代码
  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context)
    vm.$forceUpdate()
  }
}
```
从上面例子中我们可以看出来，当`needsForceUpdate`逻辑判断为真时，就会调用`$forceUpdate()`方法进行子组件的重新渲染逻辑，我们仔细分析后可以知道`needsForceUpdate`主要与`$stable`或`$key`这两个属性挂钩，这两个属性就是**怎么通知子组件重新进行渲染**的关键。

问：**怎么通知子组件重新进行渲染？**<br>
答：在介绍插槽的`parse`编译小节时，对于`genScopedSlots`方法、我们故意省略了一部分代码没有进行说明，完整代码如下：
```js
function genScopedSlots (
  el: ASTElement,
  slots: { [key: string]: ASTElement },
  state: CodegenState
): string {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  let needsForceUpdate = el.for || Object.keys(slots).some(key => {
    const slot = slots[key]
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  })

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  let needsKey = !!el.if

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    let parent = el.parent
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true
        break
      }
      if (parent.if) {
        needsKey = true
      }
      parent = parent.parent
    }
  }

  const generatedSlots = Object.keys(slots)
    .map(key => genScopedSlot(slots[key], state))
    .join(',')

  return `scopedSlots:_u([${generatedSlots}]${
    needsForceUpdate ? `,null,true` : ``
  }${
    !needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ``
  })`
}
```
从上面代码可以看到，在代码生成阶段，它会根据标签上是否存在`v-if`、`v-for`以及动态插槽名等情况来对`needsForceUpdate`变量进行赋值，直白一点的说：只要出现了`v-if`、`v-for`或动态插槽名，`needsForceUpdate`值就为`true`。

如果以上情况都没有，还会调用`hash`方法对我们生成的字符串进行计算，如果计算的结果不一样(新旧$key对比)，同样会通知子组件重新进行渲染：
```js
function hash(str) {
  let hash = 5381
  let i = str.length
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0
}
```
从最后一个`return`语句中，我们可以发现，`needsForceUpdate`变量主要控制`_u`函数的第三个参数、`hash`计算的结果主要控制第四个参数，我们再来回顾一下`_u`函数：
```js
export function resolveScopedSlots (
  fns: ScopedSlotsData, // see flow/vnode
  res?: Object,
  // the following are added in 2.6
  hasDynamicKeys?: boolean,
  contentHashKey?: number
): { [key: string]: Function, $stable: boolean } {
  res = res || { $stable: !hasDynamicKeys }
  // ...省略代码
  if (contentHashKey) {
    (res: any).$key = contentHashKey
  }
  return res
}
```
分析至此，我们已经能够回答以上问题了：**父组件通过控制scopedSlots.$stable变量以及scopedSlots.$key变量的值，来控制是否应该通知子组件重新进行渲染**。

## 小结
在这一小节，我们首先回顾了插槽的`parse`编译过程以及插槽的`patch`过程。

随后，我们对比了普通插槽和作用域插槽的区别，它们本质上的区别在于数据的作用域，普通插槽在生成`vnode`时无法访问子组件的`props`数据，但作用域插槽可以。

最后，我们知道了当插槽`template`使用了来自父组件的响应式变量或者与`v-if`、`v-for`以及动态插槽名一起使用时，当响应式变量更新后，会强制通知子组件重新进行渲染。
