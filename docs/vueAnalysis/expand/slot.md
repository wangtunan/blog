# 插槽

## 插槽的编译
对于插槽的编译，我们只需要记住一句话：**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

**注意**：由于在`Vue2.6+`版本中，对于插槽相关的内容有所改动：它废弃了旧的用法，新增了`v-slot`指令。虽然依旧会在`Vue2.0`版本进行兼容，但在`Vue3.0`版本会将其进行移除，因此我们在分析插槽实现原理这一章节会以最新的`v-slot`新语法进行分析。

我们使用如下案例来分析插槽的编译：
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
当第一个`template`标签调用`processElement`方法的时候，会在这个方法里面调用`processSlotContent`来处理与插槽相关的内容：
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
2. 随后通过调用`getSlotName`方法来获取插槽的名字以及是否为动态插槽名。
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

### 子组件的插槽编译

## 普通插槽

## 作用域插槽

## 小结
