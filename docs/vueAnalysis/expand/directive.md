# directive指令

## 指令的注册和使用
同组件一样，指令的注册方式有两种：全局注册和局部注册。<br/>
### 全局注册
全局注册指令可以使用全局API方法：`Vue.directive()`来注册，注册完成以后所有的指令都在根实例的`Vue.options['directives']`选项中。在`Vue`源码里，`Vue.directive()`全局API方法的处理如下：
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
当我们打印`App`组件的实例的`$options['directives']`时，我们可以得到如下结果：
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

### 钩子函数
### 动态参数

## 指令的运行
