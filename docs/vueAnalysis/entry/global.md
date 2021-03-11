# initGlobalAPI流程
我们会在`src/core/index.js`文件中看到如下精简代码：
```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
initGlobalAPI(Vue)

export default Vue
```
在以上代码中，我们发现它引入了`Vue`随后调用了`initGlobalAPI()`函数，此函数的作用是挂载一些全局`API`方法。

![initGlobalAPI](../../images/vueAnalysis/initGlobalAPI.png)

我们首先能在`src/core/global-api`文件夹下看到如下目录结构：
```sh
|-- global-api        
|   |-- index.js      # 入口文件
|   |-- assets.js     # 挂载filter、component和directive
|   |-- extend.js     # 挂载extend方法
|   |-- mixin.js      # 挂载mixin方法
|   |-- use.js        # 挂载use方法
```

随后在`index.js`入口文件中，我们能看到如下精简代码：
```js
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { observe } from 'core/observer/index'
import { extend, nextTick } from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.observable = (obj) => {
    observe(obj)
    return obj
  }

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```
从以上代码能够很清晰的看到在`index.js`入口文件中，会在`Vue`构造函数上挂载各种全局`API`函数，其中`set`、`delete`、`nextTick`和`observable`直接赋值为一个函数，而其他几种`API`则是调用了一个以`init`开头的方法，我们以`initAssetRegisters()`方法为例，它的精简代码如下：
```js
// ['component','directive', 'filter']
import { ASSET_TYPES } from 'shared/constants'

export function initAssetRegisters (Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function () {
      // 省略了函数的参数和函数实现代码
    }
  })
}
```
其中`ASSET_TYPES`是一个定义在`src/shared/constants.js`中的一个数组，然后在`initAssetRegisters()`方法中遍历这个数组，依次在`Vue`构造函数上挂载`Vue.component()`、`Vue.directive()`和`Vue.filter()`方法，另外三种`init`开头的方法挂载对应的全局`API`是一样的道理：
```js
// initUse
export function initUse(Vue) {
  Vue.use = function () {}
}

// initMixin
export function initMixin(Vue) {
  Vue.mixin = function () {}
}

// initExtend
export function initExtend(Vue) {
  Vue.extend = function () {}
}
```

最后，我们发现还差一个`Vue.compile()`方法，它其实是在`runtime+compile`版本才会有的一个全局方法，因此它在`src/platforms/web/entry-runtime-with-compile.js`中被定义：
```js
import Vue from './runtime/index'
import { compileToFunctions } from './compiler/index'
Vue.compile = compileToFunctions
export default Vue
```

根据`initGlobalAPI()`方法的逻辑，可以得到如下流程图：
![initGlobalAPI流程图](../../images/vueAnalysis/initGlobalAPIProcess.png)
