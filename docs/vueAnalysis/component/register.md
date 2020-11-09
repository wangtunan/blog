# 组件注册
在开发`Vue`应用的时候，我们通常有两种注册组件的方式：全局注册和局部注册。这两种注册组件的方式结果是不同的，全局注册的组件可以在整个应用中直接使用，局部注册的组件只能在当前组件中使用。在这一章节，我们来分析一下在`Vue`中，是如何局部注册和全局注册组件的。

注意：`Vue`中有一些组件不需要进行注册就可以直接使用，这些组件就是内置组件：`keep-alive`, `transition`、`transition-group`以及`component`。对于这些内置组件，我们在这个章节并不会去介绍，而是在后面的章节中单独划分一个章节去分析。

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
代码分析：当我们正确给`Vue.component`传递参数的时候，它会走`else`分支逻辑，在`else`分支逻辑中，对于组件而言它首先使用`validateComponentName`来校验组件名是否合法，其代码如下：
```js
export function validateComponentName (name: string) {
  if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp.source}]*$`).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    )
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    )
  }
}
```
对于组件名而言，一方面它需要合法，另外一方面不能是内置或保留`html`标签。在校验通过后，它调用`this.options._base.extend`方法，实际上相当于调用`Vue.extend`方法来让一个组件对象转换成构造函数形式，`extend`方法的具体实现我们在之前已经详细介绍过。在转换成构造函数完毕后，又在其对应的`options`上进行了赋值。根据`Vue.component`方法的实现，我们可以使用如下案例来表示：
```js
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
// 注册前
const options = {
  components: {}
}

// 注册
Vue.component('HelloWorld', HelloWorld)

// 注册后
const options = {
  components: {
    HelloWorld: function VueComponent () { ... }
  }
}
```
既然组件已经注册完毕了，那么我们现在想两个问题：**全局注册的组件到哪里去了？使用全局注册的组件的时候是如何查找的？**

回答第一个问题的时候，我们先回顾一下`components`选项是如何合并的：
```js
function mergeAssets (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
    return extend(res, childVal)
  } else {
    return res
  }
}
strats.component = mergeAssets
```
因为全局注册的组件都在`Vue.options.components`选项上，根据以上合并策略，我们发现全局注册的组件最后都会合并到子组件的`components`选项的原型上，例如：
```js
// 全局注册后
const baseVueOptions = {
  components: {
    HelloWorld: function VueComponent () { ... }
  }
}

// 合并后
const childOptions = {
  components: {
    __proto__: {
      HelloWorld: function VueComponent () { ... }
    }
  }
}
```
根据以上代码，我们就可以回答第一个问题：**全局注册的组件会在子组件配置合并后反应到子组件components属性对象的原型上**。

接下来，我们来分析第二个问题，我们回到之前的`createElement`，在这个章节中，我们注意到有下面这样一段代码：
```js
if (typeof tag === 'string') {
  if (xxx) {
    ...
  } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
    // component
    vnode = createComponent(Ctor, data, context, children, tag)
  }
}  else {
  vnode = createComponent(tag, data, context, children)
}
```
当模板编译到全局组件的时候，会在通过`resolveAsset`去尝试获取组件的构造函数，我们来看一下`resolveAsset`方法是如何实现的：
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
对于`components`选项来说，它首先会尝试使用`hasOwn`方法在自身对象上查找有没有，如果三种方式都没有，则最后在`components`的原型上去查找。对于全局注册的组件而言，它会在这个原型上找到，如果在原型上还找不到，那么最后会在`patch`的阶段去检验，然后抛出一个错误：
```js
'Unknown custom element: xxx - did you register the component correctly?' +
'For recursive components, make sure to provide the "name" option.',
```
在了解了全局注册组件的方式后，对于局部注册组件的各种疑问相信都迎刃而解了。局部注册的组件都在`components`选项对象上，而全局注册的组件会在组件合并配置完毕后反应到子组件的`components`选项对象的原型上，这就是全局注册的组件可以在任意地方使用的根本原因了。