# v-model
`v-model`指令可以用来在表单元素`input`、`select`等或者组件上创建双向数据绑定，既：**数据的改变会驱动视图更新、视图的更新反过来又会影响数据的变化。**

## v-model的解析
在**directive指令**章节，我们提到过`v-model`和`v-show`是`Vue`默认提供的全局指令，我们可以直接拿来使用。

既然`v-model`也是指令的一种，那么其解析逻辑应该和普通的指令是类似的。注意，我们提到的普通指令，它区别于`v-bind`和`v-on`。

在分析`v-model`的解析原理这个小节，我们以下面代码为例：
```js
new Vue({
  el: '#app',
  data () {
    return {
      msg: 'Hello, msg'
    }
  },
  template: `<input v-model="msg" />`
})
```
在`v-model`的`parse`解析阶段，它会在`processElement`方法中调用`processAttrs`来处理标签上面解析的各种属性：
```js
export function processElement (
  element: ASTElement,
  options: CompilerOptions
) {
  // ...省略代码
  processAttrs(element)
  return element
}
```
然后，又回到了我们在**directive指令**和**event事件处理**中反复提到过的`processAttrs`方法。由于`v-model`属于一般指令，因此我们省略与`v-bind`和`v-on`相关的代码：
```js
export const dirRE = process.env.VBIND_PROP_SHORTHAND
  ? /^v-|^@|^:|^\.|^#/
  : /^v-|^@|^:|^#/
const argRE = /:(.*)$/
function processAttrs (el) {
  const list = el.attrsList
  let i, l, name, rawName, value, modifiers, syncGen, isDynamic
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name
    value = list[i].value
    if (dirRE.test(name)) {
      el.hasBindings = true
      // modifiers省略代码
      if (bindRE.test(name)) {
        // v-bind省略代码
      } else if (onRE.test(name)) {
        // v-on省略代码
      } else {
        // normal directives
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
    } else {
      // ...省略代码
    }
  }
}
```
在`else`分支中，首先使用`dirRE`正则表达式把`v-model`字符串中的`v-`前缀去掉，此时`name`的值就变成了`model`。紧接着，它又使用了`argRE`正则表达式来匹配指令参数。稍微改动一下我们的案例，如下：
```js
const template = `<input v-model:value="msg" />`

// 匹配到的指令参数
const arg = 'value'
```
处理完毕后，调用`addDirective`方法，给`ast`对象添加`directives`属性：
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
在`parse`解析过程完毕后，生成的`ast`结果如下：
```js
const ast = {
  type: 1,
  tag: 'input',
  attrsList: [
    { name: 'v-model', value: 'msg' }
  ],
  attrsMap: {
    'v-model': 'msg'
  },
  directives: [
    { name: 'model', rawName: 'v-model', value: 'msg' }
  ]
}
```
接下来在`codegen`代码生成阶段，会在`genData`方法中调用`genDirectives`来处理指令：
```js
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  const dirs = genDirectives(el, state)
  if (dirs) data += dirs + ','
  // ...省略代码
  return data
}

function genDirectives (el: ASTElement, state: CodegenState): string | void {
  const dirs = el.directives
  if (!dirs) return
  let res = 'directives:['
  let hasRuntime = false
  let i, l, dir, needRuntime
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i]
    needRuntime = true
    const gen: DirectiveFunction = state.directives[dir.name]
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn)
    }
    if (needRuntime) {
      hasRuntime = true
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${
        dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
      }${
        dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ''
      }${
        dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
      }},`
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}
```
与其它指令不同的是，在这里我们要关注一下`state.directives`，这个属性是在`CodegenState`类的构造函数中被处理的：
```js
export class CodegenState {
  options: CompilerOptions;
  warn: Function;
  transforms: Array<TransformFunction>;
  dataGenFns: Array<DataGenFunction>;
  directives: { [key: string]: DirectiveFunction };
  maybeComponent: (el: ASTElement) => boolean;
  onceId: number;
  staticRenderFns: Array<string>;
  pre: boolean;

  constructor (options: CompilerOptions) {
    this.options = options
    // ...省略代码
    this.directives = extend(extend({}, baseDirectives), options.directives)
    // ...省略代码
  }
}
```
其中`options`是与平台相关的参数，在`web`浏览器端，这个参数定义在`src/platforms/web/runtime/options.js`文件中：
```js
import directives from './directives/index'
export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
```
我们关注`directives`，它包含了`v-text`、`v-html`以及`v-model`，在这一小节我们只关心`v-model`相关，既`directives/model.js`文件中的内容。
```js
export default function model (
  el: ASTElement,
  dir: ASTDirective,
  _warn: Function
): ?boolean {
  warn = _warn
  const value = dir.value
  const modifiers = dir.modifiers
  const tag = el.tag
  const type = el.attrsMap.type

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn(
        `<${el.tag} v-model="${value}" type="file">:\n` +
        `File inputs are read only. Use a v-on:change listener instead.`,
        el.rawAttrsMap['v-model']
      )
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers)
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers)
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers)
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers)
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers)
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers)
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `<${el.tag} v-model="${value}">: ` +
      `v-model is not supported on this element type. ` +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    )
  }

  // ensure runtime directive metadata
  return true
}
```
在`model`方法中，首先判断如果在`type='file'`的`input`标签上使用了`v-model`，那么会在开发环境提示错误信息，因为附件是只读的。随后根据标签类型，分别调用对应的方法。在我们的例子中，它会命中`genDefaultModel`，对于其它分支逻辑我们会在对应的小节中介绍，这里先有一个印象即可。

我们淡化`genDefaultModel`其它方面的逻辑，只看最核心的两段代码：
```js
function genDefaultModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  // ...省略代码
  addProp(el, 'value', `(${value})`)
  addHandler(el, event, code, null, true)
  // ...省略代码
}
```
代码分析：
* `addProp`：调用`addProp`是为了给`ast`添加一个`value`的`props`属性。
* `addHandler`：调用`addHandler`是为了给`ast`添加一个事件监听，至于到底监听什么事件取决于`v-model`作用于什么标签。

在我们的例子中，有了上面两段关键代码，等价于我们像下面这样写：
```js
const template = '<input v-model="msg" />'
// 等价于(有点细微的区别)
const template = `<input :value="msg" @input="msg=$event.target.value" />`
```
从以上分析中我们可以看出来：**`v-model`处理双向绑定，本质上就是一种语法糖，它负责监听用户的输入事件然后更新数据，并对一些极端场景做了一些特殊处理**。


绕了那么大一个圈子，现在让我们回到`genData`方法中，在调用`genDirectives`方法后，当前`ast`对象中多了`props`和`events`属性：
```js
const ast = {
  type: 1,
  tag: 'input',
  attrsList: [
    { name: 'v-model', value: 'msg' }
  ],
  attrsMap: {
    'v-model': 'msg'
  },
  directives: [
    { name: 'model', rawName: 'v-model', value: 'msg' }
  ],
  props: [
    { name: 'value', value: '(msg)' }
  ]
  events: {
    input: 'if($event.target.composing)return;msg=$event.target.value'
  }
}
```
因为`ast`对象中多了`props`和`events`属性，所以`genData`方法中除了会像普通指令一样处理指令，还会处理`props`属性和`events`事件：
```js
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  // directive
  const dirs = genDirectives(el, state)
  if (dirs) data += dirs + ','
  // ...省略代码
  // DOM props
  if (el.props) {
    data += `domProps:${genProps(el.props)},`
  }
  // event handlers
  if (el.events) {
    data += `${genHandlers(el.events, false)},`
  }
  // ...省略代码
  return data
}
```
当`genData`方法处理完毕后，`codegen`代码生成阶段大部分工作也就结束了，其最后生成的`render`函数结果如下：
```js
const render = `
  with(this){
    return _c('input',{
      directives:[
        { name:"model", rawName:"v-model", value:(msg), expression:"msg" }
      ],
      domProps:{
        "value":(msg)
      },
      on:{
        "input":function($event){
          if($event.target.composing)return;
          msg=$event.target.value
        }
      }
    })
  }
`
```
在这一小节，我们花了很大的篇幅去介绍`v-model`是如何解析以及如何根据`ast`生成对应的`render`函数的，这样做是为了节省后面两个章节的篇幅，因为无论是`v-model`作用于表单元素，还是组件它们对于`v-model`的解析过程基本相同。

## 绑定表单元素
在介绍绑定表单元素这一小节，我们选择根据不同的表单元素，有选择性的进行分类说明。
1. `input`文本框和`textarea`文本域。
2. `checkbox`复选框。

### input和textarea
`v-model`作用于`input`标签和作用于`textarea`标签的处理逻辑是相同的，我们以`input`标签为例：
```js
new Vue({
  el: '#app',
  data () {
    return {
      msg: 'Hello, msg',
    }
  },
  template: `<input v-model="msg" />`
})
```
在`parse`解析完毕后，其`ast`结果如下：
```js
const ast = {
  type: 1,
  tag: 'input',
  attrsList: [
    { name: 'v-model', value: 'msg' }
  ],
  attrsMap: {
    'v-model': 'msg'
  },
  directives: [
    { name: 'model', rawName: 'v-model', value: 'msg' }
  ]
}
```
随后`codegen`代码生成阶段，调用`genData`来处理`directives`指令、`props`属性以及`events`事件：
```js
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  const dirs = genDirectives(el, state)
  if (dirs) data += dirs + ','
  // ...省略代码
  // DOM props
  if (el.props) {
    data += `domProps:${genProps(el.props)},`
  }
  // event handlers
  if (el.events) {
    data += `${genHandlers(el.events, false)},`
  }
  // ...省略代码
  data = data.replace(/,$/, '') + '}'
  // ...省略代码
  return data
}
```
代码分析：
* `genDirectives`：首先调用了`genDirectives`方法来处理指令，在这个方法中会调用一个与平台相关的`model`方法，在这个`model`方法中会根据不同元素标签的类型来分别处理，`input`或者`textarea`标签的处理逻辑如下：
```js
else if (tag === 'input' || tag === 'textarea') {
  genDefaultModel(el, value, modifiers)
}
```
我们接下来看一下`genDefaultModel`方法的完整代码：
```js
function genDefaultModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  const type = el.attrsMap.type

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    const value = el.attrsMap['v-bind:value'] || el.attrsMap[':value']
    const typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type']
    if (value && !typeBinding) {
      const binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value'
      warn(
        `${binding}="${value}" conflicts with v-model on the same element ` +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      )
    }
  }

  const { lazy, number, trim } = modifiers || {}
  const needCompositionGuard = !lazy && type !== 'range'
  const event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input'

  let valueExpression = '$event.target.value'
  if (trim) {
    valueExpression = `$event.target.value.trim()`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }

  let code = genAssignmentCode(value, valueExpression)
  if (needCompositionGuard) {
    code = `if($event.target.composing)return;${code}`
  }

  addProp(el, 'value', `(${value})`)
  addHandler(el, event, code, null, true)
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()')
  }
}
```
`genDefaultModel`所做的事情并不是很复杂，它主要做四件事情：**异常处理**、**修饰符处理**、**添加props属性**以及**添加event事件**。

* `genProps`: 在调用`genDirectives`方法后，因为添加了`props`属性，所以会调用`genProps`方法来处理`props`属性：
```js
// [ { name: 'value', value: '(msg)', dynamic: undefined } ]
function genProps (props: Array<ASTAttr>): string {
  let staticProps = ``
  let dynamicProps = ``
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const value = __WEEX__
      ? generateValue(prop.value)
      : transformSpecialNewlines(prop.value)
    if (prop.dynamic) {
      dynamicProps += `${prop.name},${value},`
    } else {
      staticProps += `"${prop.name}":${value},`
    }
  }
  staticProps = `{${staticProps.slice(0, -1)}}`
  if (dynamicProps) {
    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`
  } else {
    return staticProps
  }
}
```
在`genProps`方法中，它会遍历`props`参数数组，由于我们传递的参数只有一条且`dynamic`为`undefined`，因此最后直接返回了`staticProps`，其结果如下：
```js
const staticProps = '{"value":(msg)}'
```
* `genHandlers`：由于这部分的逻辑我们在**event事件处理**章节中已经反复提到过，所以我们不再赘述。其中，这个方法的返回结果如下：
```js
const result = `on:{
  "input":function($event){
    if($event.target.composing)return;
    msg=$event.target.value
  }
}`
```

### checkbox
当`v-model`作用于单个`checkbox`标签时，`v-model`绑定一个布尔值；当`v-model`作用于多个`checkbox`标签时，`v-model`绑定一个数组。

我们先以单个`checkbox`标签为例：
```js
new Vue({
  el: '#app',
  data () {
    return {
      checked: true,
    }
  },
  template: `
    <div>
      <input v-model="checked" type="checkbox" />是否勾选
    </div>
  `
})
```
当`parse`解析完毕后，其`input`标签的`ast`对象如下：
```js
const ast = {
  type: 1,
  tag: 'input',
  directives: [
    { name: 'model', value: 'checked', rawName: 'v-model' }
  ]
}
```
在`codegen`代码生成阶段，当调用与平台相关`model`方法时，会调用`genCheckboxModel`方法：
```js
else if (tag === 'input' && type === 'checkbox') {
  genCheckboxModel(el, value, modifiers)
}
```
其中`genCheckboxModel`方法代码如下：
```js
function genCheckboxModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
) {
  const number = modifiers && modifiers.number
  const valueBinding = getBindingAttr(el, 'value') || 'null'
  const trueValueBinding = getBindingAttr(el, 'true-value') || 'true'
  const falseValueBinding = getBindingAttr(el, 'false-value') || 'false'
  addProp(el, 'checked',
    `Array.isArray(${value})` +
    `?_i(${value},${valueBinding})>-1` + (
      trueValueBinding === 'true'
        ? `:(${value})`
        : `:_q(${value},${trueValueBinding})`
    )
  )
  addHandler(el, 'change',
    `var $$a=${value},` +
        '$$el=$event.target,' +
        `$$c=$$el.checked?(${trueValueBinding}):(${falseValueBinding});` +
    'if(Array.isArray($$a)){' +
      `var $$v=${number ? '_n(' + valueBinding + ')' : valueBinding},` +
          '$$i=_i($$a,$$v);' +
      `if($$el.checked){$$i<0&&(${genAssignmentCode(value, '$$a.concat([$$v])')})}` +
      `else{$$i>-1&&(${genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')})}` +
    `}else{${genAssignmentCode(value, '$$c')}}`,
    null, true
  )
}
```
`genCheckboxModel`方法逻辑不是很复杂，但传递给`addProp`和`addHandler`这两个方法的参数却有点不太好理解，我们直接来看`input`标签生成的`render`函数：
```js
const render = `
  _c('input',{
    directives:[
      { name:"model", rawName:"v-model", value:(checked), expression:"checked" }
    ],
    attrs:{
      "type":"checkbox"
    },
    domProps:{
      "checked":Array.isArray(checked)?_i(checked,null)>-1:(checked)
    },
    on:{
      "change":function($event){
        var $$a=checked,$$el=$event.target,$$c=$$el.checked?(true):(false);
        if(Array.isArray($$a)){
          var $$v=null,$$i=_i($$a,$$v);
          if($$el.checked){
            $$i<0&&(checked=$$a.concat([$$v]))
          }else{
            $$i>-1&&(checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)))
          }
        }else{
          checked=$$c
        }
      }
    }
  }
)`
```
**注意**：这里的`_i`工具函数和我们之前提到的`_s`等工具函数是差不多处理方式，它是`looseIndexOf`方法的简写形式：
```js
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
export function looseIndexOf (arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}
```
从以上代码可以看到，虽然我们撰写的`template`模板很简单，但是生成的`render`却有一大坨代码，到这里我们应该对**v-model双向绑定只是一种语法糖**这句话有了更加深刻的认识。


## 绑定组件

### 自定义输入组件
在`Vue2.2.0+`版本，`v-model`还支持作用于一个组件上，我们以下面代码为例来进行分析：
```js
Vue.component('child-component', {
  props: ['value'],
  template: `<input :value="value" @input="handleInput" />`,
  methods: {
    handleInput ($event) {
      this.$emit('input', $event.target.value)
    }
  }
})
new Vue({
  el: '#app',
  data () {
    return {
      msg: '',
    }
  },
  template: `<child-component v-model="msg" />`
})
```
既然`v-model`双向绑定的原理是需要一个属性和一个事件监听，那么我们按照标准写法，在子组件`input`标签上面提供一个`value`属性以及一个`input`事件监听。

对于子组件的`parse`解析逻辑，我们在之前的章节中已经分析过了，它们的过程是一样的，现在我们先来看一看父组件`parse`解析结果：
```js
const ast = {
  type: 1,
  tag: 'child-component',
  directives: [
    { name: 'model', rawName: 'v-model', value: 'msg' }
  ]
}
```
接下来再看一下`codegen`阶段，父组件在`genData`方法中会调用`genDirectives`来处理指令，此时又会去执行与平台相关的`model`方法。因为在父组件中，`v-model`作用于一个组件，所有会执行下面这段分支的逻辑：
```js
else if (!config.isReservedTag(tag)) {
  genComponentModel(el, value, modifiers)
  // component v-model doesn't need extra runtime
  return false
}
```
如果你对比源码，可以发现在`model`方法中，还有一个分支的逻辑也同样调用了`genComponentModel`:
```js
if (el.component) {
  genComponentModel(el, value, modifiers)
  // component v-model doesn't need extra runtime
  return false
}
```
要命中这个`if`分支的逻辑，我们只需要简单的把父组件的`template`修改一下：
```js
const template = '<component v-model="msg" is="ChildComponent" />'
```
回过头来，我们来看一下`genComponentModel`方法的代码：
```js
export function genComponentModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  const { number, trim } = modifiers || {}

  const baseValueExpression = '$$v'
  let valueExpression = baseValueExpression
  if (trim) {
    valueExpression =
      `(typeof ${baseValueExpression} === 'string'` +
      `? ${baseValueExpression}.trim()` +
      `: ${baseValueExpression})`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }
  const assignment = genAssignmentCode(value, valueExpression)

  el.model = {
    value: `(${value})`,
    expression: JSON.stringify(value),
    callback: `function (${baseValueExpression}) {${assignment}}`
  }
}
```
调用`genComponentModel`方法后，当前`ast`对象多了一个`model`属性：
```js
const ast = {
  type: 1,
  tag: 'child-component',
  directives: [
    { name: 'model', rawName: 'v-model', value: 'msg' }
  ],
  model: {
    value: '(msg)',
    expression: 'msg',
    callback: 'function ($$v) {msg=$$v}'
  }
}
```
当`codegen`阶段完毕后，此时父组件生成的`render`函数如下：
```js
const render = `_c('child-component',{
  model:{
    value:(msg),
    callback:function ($$v) {
      msg=$$v
    },
    expression:"msg"
  }
})`
```
既然已经生成了`render`函数，那么在`patch`阶段，会生成一个组件`VNode`，创建组件`VNode`的方法是`createComponent`，代码路径为`src/core/vdom/create-component.js`：
```js
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  // ...省略代码
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }
  // ...省略代码
}
```
当执行到`createComponent`方法的时候，由于我们存在`model`属性，所以会调用`transformModel`来处理这部分的逻辑，我们来看一下`transformModel`这个方法的代码：
```js
function transformModel (options, data: any) {
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  const existing = on[event]
  const callback = data.model.callback
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing)
    }
  } else {
    on[event] = callback
  }
}
```
代码分析：
1. `prop`和`event`：代码中会优先获取组件的`options.model`属性，如果没有定义则为默认的`value`或者`input`。这段代码的逻辑表明如果`v-model`作用于一个组件，我们可以给组件提供`model`属性来改变`props`接收属性和派发的事件名，例如：
```js
const parent = '<child-component v-model="msg" />'

const child = {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'change'
  },
  template: `<input type="checkbox" :value="value" @change="handleChange" />`,
  methods: {
    handleChange ($event) {
      this.$emit('change', $event.target.checked)
    }
  }
}
```
2. `on[event]`：处理事件的逻辑也非常简单，判断当前组件派发的指定事件是否存在，如果存在则根据是否为数组形式分别进行处理，如果不存在则直接赋值。

在`transformModel`方法执行完毕时，扩展后的`data`对象结果如下：
```js
const data = {
  model: {
    callback: function ($$v) {
      msg = $$v
    },
    expression: 'msg',
    value: ''
  },
  attrs: {
    value: 'msg'
  },
  on: {
    input: function ($$v) {
      msg = $$v
    }
  }
}
```
拿我们父组件的例子来说，换成非`v-model`形式等价于：
```js
new Vue({
  el: '#app',
  data () {
    return {
      msg: '',
    }
  },
  template: `<child-component :value="msg" @input="msg=arguments[0]" />`
})
```

#### .sync修饰符
某些情况下，在组件上使用`v-model`非常方便，但也同时带来了新的问题：**由于子组件可以变更父组件的数据、但在父组件和子组件之间没有明显的变更来源，这给真正的双向绑定带来了一些维护上的问题**

为了解决以上问题，在`Vue2.3.0+`版本，提供了`.sync`修饰符，同时在子组件中我们使用`$emit('update:xxx')`的形式触发事件，例如：
```js
const parent = '<child-component :value.sync="msg" />'

const child = {
  props: ['value'],
  template: `<input :value="value" @input="handleInput" />`,
  methods: {
    handleInput ($event) {
      this.$emit('update:value', $event.target.value)
    }
  }
}
```
由于`sync`是一种修饰符，如果把`sync`修饰符去掉，对于以上例子`parse`解析阶段的过程跟以前一样，这里不在赘述。我们直接看`processAttrs`方法中，关于`sync`修饰符的处理逻辑：
```js
if (modifiers.sync) {
  syncGen = genAssignmentCode(value, `$event`)
  if (!isDynamic) {
    addHandler(
      el,
      `update:${camelize(name)}`,
      syncGen,
      null,
      false,
      warn,
      list[i]
    )
  }
}
```
我们可以看到，如果提供了`sync`修饰符，会在父组件中添加一个`update:xxx`的事件监听，当`parse`解析过程完毕后，生成的`ast`内容如下：
```js
const ast = {
  type: 1,
  tag: 'child-component',
  attrs: [
    { name: 'value', value: 'msg', dynamic: false }
  ],
  attrsList: [
    { name: ':value.sync', value: 'msg' }
  ],
  attrsMap: {
    ':value.sync': 'msg'
  },
  events: {
    'update:value': {
      value: 'msg=$event'
    }
  }
}
```
当`codegen`代码生成阶段完毕后，生成的`render`函数结果如下：
```js
const render = `
  with(this){
    return _c('child-component',{
      attrs:{"value":msg},
      on:{
        "update:value":function($event){
          msg=$event
        }
      }
    })
  }
`
```
## 修饰符

### .number和.trim修饰符
对于`.number`修饰符和`.trim`修饰符的处理非常简单，在`genDefaultModel`方法中其逻辑如下(其它地方处理过程类似)：
```js
const { number, trim } = modifiers || {}
let valueExpression = '$event.target.value'
if (trim) {
  valueExpression = `$event.target.value.trim()`
}
if (number) {
  valueExpression = `_n(${valueExpression})`
}
```
当提供了`.number`修饰符时，使用了`_n`工具函数进行包裹，`_n`工具函数就是`toNumber`方法的缩写形式。

### .lazy修饰符
我们先来看官网中对于`.lazy`修饰符的说明：**在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件之后进行同步**。

假设我们有如下案例：
```js
// normali
const normalTemplate = '<input v-model="msg" />'

// lazy
const lazyTemplate = '<input v-model.lazy="msg" />'
```
在`codegen`代码生成后，它们生成的`render`函数`on`事件部分分别如下：
```js
// normal
const normalRender = `
  on:{
    input:function($event){
      if($event.target.composing)return;
      msg=$event.target.value
    }
  }
`

// lazy
const lazyRender = `
  on:{
    change:function($event){
      msg=$event.target.value
    }
  }
`
```
正如官网介绍中的那样，使用`lazy`修饰符后，它由监听`input`事件变成了监听`change`事件。
## 小结
在`v-model`这一小节，我们先详细介绍了`v-model`在`parse`解析、`codegen`代码生成环节的处理过程。

接着，我们分别对`v-model`作用于表单元素`input`、`checkbox`以及组件的过程进行了分析。

然后，我们对于`v-model`作用于组件的新方式`sync`修饰符的处理过程进行了介绍。

最后，我们还对`v-model`配合使用的常见修饰符`.number`、`.trim`以及`.lazy`等进行了分析。
