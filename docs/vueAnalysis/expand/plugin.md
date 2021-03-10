# Vue.use插件机制

在使用`Vue`开发应用程序的时候，我们经常使用第三方插件库来方便我们开发，例如：`Vue-Router`、`Vuex`和`element-ui`等等。

```js
// main.js
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(ElementUI)

new Vue({})
```

在`new Vue`之前，我们使用`Vue.use`方法来注册这些插件。其中，`Vue.use`作为一个全局方法，它是在`initGlobalAPI`方法内部通过调用`initUse`来注册这个全局方法的。
```js
import { initUse } from './use'
export function initGlobalAPI (Vue: GlobalAPI) {
  // ...省略代码
  initUse(Vue)
  // ...省略代码
}
```
`initUse`方法的代码并不复杂，如下：
```js
import { toArray } from '../util/index'
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 1.检测是否已经注册了插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

   // 2.处理参数
    const args = toArray(arguments, 1)
    args.unshift(this)

    // 3.调用install方法
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```
我们可以从以上代码中看出，当调用`Vue.use`时，它只要做三件事情：**检查插件是否重复注册**、**处理插件参数**和**调用插件的install方法**。

代码分析：
* **检查插件是否重复注册**：首先通过判断大`Vue`上的`_installedPlugins`属性是否已经存在当前插件，如果已经存在则直接返回；如果不存在才会执行后面的逻辑，假如我们有如下案例：
```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.use(Router)
```
多次调用`Vue.use()`方法注册同一个组件，只有第一个生效。

* **处理插件参数**：有些插件在注册的时候，可能需要我们额外的传递一些参数，例如`element-ui`。
```js
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI, { 
  size: 'small',
  zIndex: 3000
})
```
按照上面的例子，`Vue.use()`方法的`arguments`数组的第一项为我们传递的插件，剩下的参数才是我们需要的，因此通过`toArray`方法把`arguments`类数组转成一个真正的数组。注意，此时`args`变量不包含插件这个元素，随后再把当前`this`也就是大`Vue`也传递进数组中。
```js
// 演示使用，实际为大Vue的构造函数
const args = ['Vue', { size: 'small', zIndex: 3000}]
```

* **调用插件的install方法**：从官网[插件](https://cn.vuejs.org/v2/guide/plugins.html)我们知道，如果我们在开发一个`Vue`插件，必须为这个插件提供一个`install`方法，当调用`Vue.use()`方法的时候会自动调用此插件的`install`方法，并把第二步处理好的参数传递进去。假如，我们有如下插件代码：
```js
// plugins.js
const plugin = {
  install (Vue, options) {
    console.log(options) // {msg: 'test use plugin'}

    // 其它逻辑
  }
}


// main.js
import Vue from 'vue'
import MyPlugin from './plugins.js'
Vue.use(MyPlugin, { msg: 'test use plugin' })
```
在`install`方法中，我们成功获取到了大`Vue`构造函数以及我们传递的参数，在随后我们就可以做一些其它事情，例如：注册公共组件、注册指令、添加公共方法以及全局`Mixin`混入等等。
