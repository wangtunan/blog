# v-model
`v-model`指令可以用来在表单元素`input`、`select`等或者组件上创建双向数据绑定，既：**数据的改变会驱动视图更新、视图的更新反过来又会影响数据的变化。**

在`v-model`这个章节，我们先来回顾`v-model`的解析过程，然后分别来分析`v-model`作用到表单元素和组件上的处理过程。

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
**注意**：我们先忽略`input`事件中`if($event.target.composing)return;`，关于这段代码是如何出现的，又是什么作用，在之后我们会进行介绍。

因为`ast`对象中多了`props`和`events`属性，所以`genData`方法中除了会像普通指令一样处理指令，还会处理`props`属性和`event`事件：
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
        {
          name:"model",
          rawName:"v-model",
          value:(msg),
          expression:"msg"
        }
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
    }
  )}
`
```
在这一小节，我们花了很大的篇幅去介绍`v-model`是如何解析以及如何根据`ast`生成对应的`render`函数的，这样做是为了节省后面两个章节的篇幅，因为无论是`v-model`作用于表单元素，还是组件他们对于`v-model`的解析过程基本相同。

## 绑定表单元素
在介绍绑定表单元素这一小节，我们选择根据不同的表单元素，分类进行说明。
1. `input`文本框和`textarea`文本域。
2. `checkbox`复选框。
3. `radio`单选框。
4. `select`下拉框。

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
  // ...省略代码

  if (el.component) {
    // ...省略代码
  } else if (tag === 'select') {
    // ...省略代码
  } else if (tag === 'input' && type === 'checkbox') {
    // ...省略代码
  } else if (tag === 'input' && type === 'radio') {
    // ...省略代码
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers)
  } else if (!config.isReservedTag(tag)) {
    // ...省略代码
  } else if (process.env.NODE_ENV !== 'production') {
    // ...省略代码
  }
  return true
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
  }
`
```

### checkbox
当`v-model`作用于单个`checkbox`标签时，`v-model`绑定一个布尔值；当`v-model`作用与多个`checkbox`标签时，`v-model`绑定一个数组。

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
  // ...省略代码
  else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers)
  }
  // ...省略代码
  return true
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

### radio

### select

## 绑定组件

## 修饰符以及边界处理

## 小节
