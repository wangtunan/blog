# 组件注册
在开发`Vue`应用的时候，我们通常有两种注册组件的方式：全局注册和局部注册。这两种注册组件的方式结果是不同的，全局注册的组件可以在整个应用中直接使用，局部注册的组件只能在当前组件中使用。在这一章节，我们来分析一下在`Vue`中，是如何局部注册和全局注册组件的。

对于需要全局注册的组件而言，我们使用`Vue.component`方法来注册我们的组件，这个方法其实是在`src/core/global-api/assets.js`文件中的`initAssetRegisters`被定义的，其代码如下：
```js
export const ASSET_TYPES = ['component', 'directive','filter']
export function initAssetRegisters (Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
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

假设我们有如下组件注册案例：
```js
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
```
对于`App`组件而言，局部注册的组件我们通过`components`选择可以拿到，在之前的[组件配置合并](/vueAnalysis/component/merge)章节，我们提到过`components`选择会