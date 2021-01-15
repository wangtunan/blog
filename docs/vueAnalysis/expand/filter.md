# filter过滤器
在分析过滤器的实现原理之前，我们需要先回顾一下过滤器的用法，包括：注册方式、使用方式。这样做的目的，是为了方便我们更好地理解过滤器的实现原理，同时也为我们分析过滤器提供了一种思路指引。
## 过滤器的注册和使用

### 过滤器的注册
同指令一样，过滤器的注册分两种方式：全局注册和局部注册。

全局注册过滤器，可以使用`Vue.filter()`来实现，例如：
```js
Vue.filter('reverse', function (value) {
  return value.split('').reverse().join('')
})
```
全局注册的过滤器，都会在`Vue.options['filters']`属性上面。

局部注册过滤器，需要撰写在组件的`filters`选项中，例如：
```js
export default {
  name: 'App',
  filters: {
    reverse (value) {
      return value.split('').reverse().join('')
    }
  }
}
```
局部注册的过滤器，都会在组件的`vm.$options['filters']`属性上面。
### 过滤器的使用
过滤器的使用有两种场景：插值表达式和`v-bind`表达式。

```html
<!-- v-bind表达式 -->
<template>
  <div :msg="msg | reverse"></div>
</template>

<!-- 双括号插值表达式 -->
<template>
  <div>{{msg | reverse}}</div>
</template>
```

在使用过滤器的时候，还可以给过滤器传递参数：
```vue
<template>
  <div>{{msg | reverse('default msg')}}</div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: ''
    }
  },
  filters: {
    reverse (value, defaultValue) {
      if (!value) {
        return defaultValue
      }
      return value.split('').reverse().join('')
    }
  }
}
</script>
```

如果存在多个过滤器，还可以串联起来一起使用：
```html
<template>
  <div>{{msg | filterA | filterB}}</div>
</template>
```
串联的过滤器，会从左到右依次执行。以上面代码为例，`filterA`过滤器的处理结果会传递给`filterB`过滤器的第一个参数`value`。


## 插值表达式过滤器的解析

我们使用如下代码来分析插值表达式过滤器的解析：
```js
new Vue({
  el: '#app',
  data () {
    return {
      msg: 'ABCD'
    }
  },
  filters: {
    reverse (value) {
      return value.split('').reverse().join('')
    }
  },

  template: '<div>{{msg | reverse}}</div>'
})
```

我们都知道，过滤器是用来处理文本的，那么在过滤器解析这个小节，我们来回顾一下`parse`阶段是如何处理文本的。
```js
const template = '<div>{{msg | reverse}}</div>'
const ast = parse(template.trim(), options)
```
当`parse`执行的时候，会调用`parseHTML`方法。在这个方法的`while`循环中，会首先调用一次`parseStartTag`，也就是匹配`div`的开始标签。然后把`template`模板截取一次，截取后其值如下：
```js
const template = '{{msg | reverse}}</div>'
```
在第二次`while`循环的时候，会通过`div`结束标签的位置，把文本内容截取出来，如下：
```js
const test = '{{msg | reverse}}'
```
截取文本后，会触发一次`chars`钩子函数，在这个钩子函数中通过`parseText`来处理文本内容：
```js
chars (text, start, end) {
  if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
    child = {
      type: 2,
      expression: res.expression,
      tokens: res.tokens,
      text
    }
  }
}
```
我们来看一下`parseText`方法的代码：
```js
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export function parseText (
  text: string,
  delimiters?: [string, string]
): TextParseResult | void {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    const exp = parseFilters(match[1].trim())
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
```
虽然`parseText`方法的代码有点长，但我们关注的核心只有两点：`tagRE`插值正则表达式和`parseFilters`方法，因此`parseText`方法精简后代码如下：
```js
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export function parseText (
  text: string,
  delimiters?: [string, string]
): TextParseResult | void {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  // ...省略代码
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // ...省略代码
    // tag token
    const exp = parseFilters(match[1].trim())
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })
    lastIndex = index + match[0].length
  }
  // ...省略代码
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
```
在`while`循环条件中，它执行了一次`tagRE`匹配并把匹配结果赋值给了`match`，此时的`match`结果如下：
```js
const match = [
  0: '{{msg | reverse}}',
  1: "msg | reverse",
  index: 0,
  input: "{{msg | reverse}}"
]
```
因为`match`结果为一个数组，所以在`while`循环内部，它会调用`parseFilters`方法来解析过滤器，我们来看一下`parseFilters`方法的代码：
```js
export function parseFilters (exp: string): string {
  let inSingle = false
  let inDouble = false
  let inTemplateString = false
  let inRegex = false
  let curly = 0
  let square = 0
  let paren = 0
  let lastFilterIndex = 0
  let c, prev, i, expression, filters

  for (i = 0; i < exp.length; i++) {
    prev = c
    c = exp.charCodeAt(i)
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) inSingle = false
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) inDouble = false
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) inTemplateString = false
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) inRegex = false
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1
        expression = exp.slice(0, i).trim()
      } else {
        pushFilter()
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        let j = i - 1
        let p
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j)
          if (p !== ' ') break
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true
        }
      }
    }
  }
  if (expression === undefined) {
    expression = exp.slice(0, i).trim()
  } else if (lastFilterIndex !== 0) {
    pushFilter()
  }
  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
    lastFilterIndex = i + 1
  }
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i])
    }
  }
  return expression
}
```
你可能会被`parseFilters`方法长长的代码吓到，尤其是`for`循环中的代码，但其实`for`循环所做的事情其实并不复杂。

我们先跳过`for`循环，直接看`for`循环结束后的结果：
```js
let filters = ['reverse']
let expression = 'msg'
```
`for`循环结束后，我们得到了一个`filters`过滤器数组和`expression`表达式，然后在`parseFilters`方法的最末尾，它会遍历`filters`数组，调用`wrapFilter`来处理表达式：
```js
function wrapFilter (exp: string, filter: string): string {
  const i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return `_f("${filter}")(${exp})`
  } else {
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return `_f("${name}")(${exp}${args !== ')' ? ',' + args : args}`
  }
}
```
`wrapFilter`方法的代码很简单，以我们的例子为例调用完毕后，`expression`的值如下：
```js
const expression = '_f("reverse")(msg)'
```
那么，让我们结合过滤器其它使用案例，来分析一下`wrapFilter`方法的返回结果。
```js
// 串联过滤器
let filters = ['filterA', 'filterB']
let expression = 'msg'
const result = '_f("filterB")(_f("filterA")(msg))'

// 参数过滤器
let filters = ['reverse("default msg")']
let expression = 'msg'
const result = '_f("reverse")(msg,"default msg")'
```
搞清楚了`wrapFilter`方法后，我们可能会有如下两个问题：
1. `_f`函数是什么？
2. `parseFilters`方法的`for`循环到底是如何正确的解析出`filters`数组和`expression`表达式的？

### _f函数
`_f`函数其实就是`resolveFilter`函数的缩写形式，在`codegen`代码生成章节我们介绍过，现在来回顾一下：
```js
export function installRenderHelpers (target: any) {
  target._s = toString          // 转字符串
  target._l = renderList        // 处理v-for列表
  target._t = renderSlot        // 处理插槽
  target._m = renderStatic      // 处理静态节点
  target._f = resolveFilter     // 处理过滤器
  target._v = createTextVNode   // 创建文本VNode
  target._e = createEmptyVNode  // 创建空VNode
}
```
`resolveFilter`方法定义在`src/core/instance/render-helpers/resolve-filter.js`文件中：
```js
import { identity, resolveAsset } from 'core/util/index'
export function resolveFilter (id: string): Function {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}
```
在`resolveFilter`中，它又调用了`resolveAsset`方法。在介绍`resolveAsset`方法之前，我们先来说明`resolveFilter`方法是做什么的：`resolveFilter`是用来从组建实例中获取指定`id(name)`的过滤器的。

还记得我们在分析`Vue`源码的过程中，经常提到的一个`ASSET_TYPES`数组吗？
```js
const ASSET_TYPES = ['component', 'directive', 'filter']
```
因为`Vue`对于`component`、`directive`和`filter`的处理方式极其相似，所以`resolveAsset`方法的作用就是在组件的`$options`选项上，获取指定`id(name)`的组件、指令或过滤器。其代码也不是很复杂，如下：
```js
export function resolveAsset (
  options: Object,
  type: string,
  id: string,
  warnMissing?: boolean
): any {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  const assets = options[type]
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if (hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitalize(camelizedId)
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
  // fallback to prototype chain
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}
```

### for循环逻辑解析
在分析之前，我们先看几个特殊字符：
```js
// 成对特殊字符
0x22 === "
0x27 === '
0x28 === (
0x29 === )
0x5B === [
0x5D === ]
0x60 === `
0x7B === {
0x7D === }

// 过滤器管道符号
0x7C === |
```
假如`for`循环时，我们有这样一个`exp`字符串：
```js
const exp = 'msg | reverse'
```
对于以上例子，`for`循环遍历过程如下：
1. `i=0`，此时的字符为`m`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
2. `i=1`，此时的字符为`s`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
3. `i=2`，此时的字符为`g`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
4. `i=3`，此时的字符为空格符，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
5. `i=4`，此时的字符为`|`，不是成对特殊字符，但是过滤器管道符号，走如下代码后`expression`被赋值为`msg`，`lastFilterIndex`为`5`：
```js
else if (
  c === 0x7C && // pipe
  exp.charCodeAt(i + 1) !== 0x7C &&
  exp.charCodeAt(i - 1) !== 0x7C &&
  !curly && !square && !paren
) {
  if (expression === undefined) {
    // first filter, end of expression
    lastFilterIndex = i + 1
    expression = exp.slice(0, i).trim()
  } else {
    // ...省略代码
  }
}
```
6. `i=5`，此时的字符为空格符，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
7. `i=6`，此时的字符为`r`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
8. `i=7`，此时的字符为`e`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
9. `i=8`，此时的字符为`v`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
10. `i=9`，此时的字符为`e`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
11. `i=10`，此时的字符为`r`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
12. `i=11`，此时的字符为`s`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
13. `i=12`，此时的字符为`e`，不是成对特殊字符，也不是过滤器管道符号，继续下一次循环。
13. `i=13`，`for`循环结束，走如下代码逻辑：
```js
if (expression === undefined) {
  // ...省略代码
} else if (lastFilterIndex !== 0) {
  pushFilter()
}

function pushFilter () {
  (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
  lastFilterIndex = i + 1
}
```
以上过程完毕后，就得到了我们想要的结果：
```js
let filters = ['reverse']
let expression = 'msg'
```
虽然`for`循环的解析过程分析完毕了，但你可能依然不是很满意，你可能还有如下几个问题：
1. 成对特殊字符有什么作用？
2. 串联的过滤器是如何正确解析的？

**一、成对特殊字符有什么作用？**<br/>
我们在`for`循环遍历的过程中，如果遇到了成对的特殊符号，必须等这些符号闭合以后，才能截取`expression`表达式，例如：
```js
const exp = '(age > 18 ? "yes" : "no") | reverse'
```
只有`()`成对闭合时，我们才能把`(age > 18 ? "yes" : "no")`当做一个整体赋值为`expression`表达式。

**二、串联的过滤器是如何正确解析的？**<br/>
对于这个问题，很容易解答，其中起到关键作用的就是`lastFilterIndex`变量，例如：
```js
const exp = 'msg | filterA | filterB'
```
在第一次匹配到`|`符号时，`lastFilterIndex`的值为`5`，第二次匹配到`|`符号时此时的`i`索引值为`14`，那么索引`5-14`之前的字符串就是第一个过滤器的名字，既：`filterA`。

以上匹配规则可以使用一句话来总结：**两个管道符号中间的字符串就是过滤器的名字**。

`parseFilters`分析完毕后，我们来看一下`parseText`的返回结果：
```js
const tokens = ['_s(_f("reverse")(msg))']
const rawTokens = [
  { '@binding': "_f("reverse")(msg)" }
]
```
在`parseText`存在返回结果时，`parse`的过程基本已经结束，我们拿到的`ast`对象如下：
```js
const ast = [
  {
    type: 1,
    tag: 'div',
    children: [
      {
        type: 2,
        text: '{{msg | reverse}}',
        expression: '_s(_f("reverse")(msg))',
        tokens: [
          { '@binding': "_f("reverse")(msg)" }
        ]
      }
    ]
  }
]
```
接下来，调用`generate`进行代码生成，由于这个过程我们已经在之前的章节中详细分析过了，所以这里我们直接写结果：
```js
const code = generate(ast, options)
// code 打印结果
{
  render: "with(this){return _c('div',[_v(_s(_f("reverse")(msg)))])}",
  staticRenderFns: []
}
```

## v-bind表达式过滤器的解析
我们使用如下示例代码来分析`v-bind`表达式过滤器的解析过程：
```js
new Vue({
  el: '#app',
  data () {
    return {
      msg: 'ABCD'
    }
  },
  filters: {
    reverse (value) {
      return value.split('').reverse().join('')
    }
  },
  template: '<div :msg="msg | reverse"></div>'
})
```
由于`v-bind`是一种特殊的指令，所以前半部分的`parse`解析的过程完全是按照指令的模式在进行，在触发`div`结束标签之前，`ast`解析结果如下：
```js
const ast = {
  type: 1,
  tag: 'div',
  attrsList: [
    { name: ':msg', value: "msg | reverse" }
  ],
  attrsMap: {
    ':msg': 'msg | reverse'
  },
  rawAttsMap: {
    ':msg': { name: ':msg', value: "msg | reverse" }
  }
}
```
当触发`div`结束标签钩子函数`end`的时候，调用`processElement`来处理：
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
紧接着，我们来看非常熟悉的`processAttrs`方法：
```js
import { parseFilters } from './filter-parser'
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
      el.hasBindings = true
      // modifiers省略代码
      if (bindRE.test(name)) {
        name = name.replace(bindRE, '')
        value = parseFilters(value)
        // v-bind省略代码
      } else if (onRE.test(name)) {
        // v-on省略代码
      } else {
        // normal directives省略代码
      }
    } else {
      // ...省略代码
    }
  }
}
```
代码分析：三个正则表达式的作用我们在之前的指令章节已经分析过，因为在这个章节我们主要分析`v-bind`表达式过滤器的解析过程，所以`bindRE`正则表达式匹配成功。此时的`value`值为`msg | reverse`，调用`parseFilters`来处理过滤器。其中这里的`parseFilters`和我们之前提到的插值表达式过滤器的`parseFilters`是同一个，所以`value`解析结果如下：
```js
const name = 'msg'
const value = '_f("reverse")(msg)'
```
当`parse`过程完全结束时，我们可以得到如下`ast`对象：
```js
const ast = {
  type: 1,
  tag: 'div',
  attrs: [
    { name: 'msg', value: '_f("reverse")(msg)' }
  ],
  attrsList: [
    { name: ':msg', value: "msg | reverse" }
  ],
  attrsMap: {
    ':msg': 'msg | reverse'
  },
  rawAttsMap: {
    ':msg': { name: ':msg', value: "msg | reverse" }
  }
}
```
最后，当调用`generate`进行代码生成`render`函数后，其结果如下：
```js
const code = generate(ast, options)
// code 打印结果
{
  render: "with(this){return _c('div',{attrs:{"msg":_f("reverse")(msg)}})}",
  staticRenderFns: []
}
```

## 小结
在这一小节，我们首先回顾了过滤器的两种注册方式：**全局注册**和**局部注册**，以及常见的使用场景：**插值表达式过滤器**和**v-bind表达式过滤器**。

随后，我们详细分析了**插值表达式过滤器**的解析过程，并对`parseFilters`方法进行了深入的分析。

最后，我们还对**v-bind表达式过滤器**的解析流程进行了分析，它的前半部分解析过程就是指令的解析过程，只是在最后多了一步对`value`调用`parseFilters`的过程。
