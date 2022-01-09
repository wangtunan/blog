# 优化

尽管`Vue2`已经足够优秀，但随着前端技术的发展和`Vue2`所面临的问题越来越多，新版的`Vue3`不得不做出一些优化、引入新特性，甚至是重构来解决这些问题。

新版`Vue3`它所做的优化包含几大方面：**源码优化**、**性能优化**、**语法API优化**以及**引入RFC**。

## 源码优化

源码优化体现在两个方面：**使用Monorepo进行代码管理**以及**使用TypeScript来进行静态类型检查**。

如果你对`Monorepo`还不是特别了解，你可以去[Monorepo](/vueNextAnalysis/monorepo/)章节去了解更多。

### 更好的代码组织方式
在`Vue3`中，代码组织方式采用`Monorepo`来进行管理，其`packages`目录如下：
```sh
|-- packages              
|   |-- compiler-core
|   |-- compiler-dom
|   |-- compiler-sfc
|   |-- compiler-ssr
|   |-- reactivity
|   |-- ref-transform
|   |-- runtime-core
|   |-- runtime-dom
|   |-- runtime-test
|   |-- server-renderer
|   |-- sfc-playground
|   |-- shared
|   |-- size-check
|   |-- template-explorer
|   |-- vue
|   |-- vue-compat
|   |-- global.d.ts
```

这样做的好处有很多：
* 将不同的模块拆分成单独的package包，每个包下都有各自的API、类型定义以及代码测试，使每个包职责更加明确，开发人员也更容易阅读。
* 不同的package包，可脱离`Vue`单独使用，例如我们只想使用其响应式能力，则可以单独使用[@vue/reactivity](https://www.npmjs.com/package/@vue/reactivity)。

### 静态类型检查
在`Vue2`中，类型检查采用的是`Flow`，但在`Vue3`中则使用`TypeScript`来进行重构。

之所以选择`TypeScript`，有以下几个方面的原因：
* `TypeScript`比`Flow`更适合用来进行复杂类型的推断。
* `TypeScript`生态越来越丰富，同时`TypeScript`团队一直保持着一定频率的更新和维护，相反`Flow`则有点烂尾。


## 性能优化
性能优化体现在：**源码体积优化**、**数据劫持优化**以及**编译优化**等。

### 源码体积优化
源码体积优化主要体现在两个方面：**移除冷门的API**、**引入tree-shaking技术**。

在`Vue2`中，由于需要照顾各个版本的开发人员的开发体验，因此不得不保留一些冷门的`API`，例如`filter`，`inline-template`，`$on`以及`$off`等等。而在`Vue3`中，它们已经从源代码中被移除了，因此也意味着源码体积越来越小。

如果你想知道哪些API被废弃了，可以点击[Vue3迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)去了解更多。

在`Vue3`中，其引入了`tree-shaking`技术，它依赖于`ES Module`模块规范，当那些没有使用`import`引入的代码，在打包到正式环境时会被压缩工具剔除掉。例如：如果我们在项目中没有使用`transition`这个内置组件，那么`transition`相关的代码就不会被打包到我们的项目中，这在`Vue2`中是办不到的。

### 数据劫持优化
数据劫持优化体现在新版`Vue`采用`Proxy`，和`Object.defineProperty()`相比，它有如下几个特点：
* `Proxy`是劫持整个对象的操作，无论是新增属性，删除属性都能被劫持到，而`Object.defineProperty()`无法劫持到删除属性和添加新属性，因此在`Vue2`中额外定义了`$set()`和`$delete()`这两个方法来弥补。
* 当存在嵌套对象时，`Proxy`可以做到懒劫持，例如：
```js
const obj = {
  name: '张三',
  job: {
    name: 'Fe'
  }
}

const handler = {
  get (target, key, receiver) {
    const val = target[key]
    if (typeof val === 'object' && val !== null) {
      return new Proxy(val, handler)
    }
    return Reflect(target, key, receiver)
  }
}

const proxy = new Proxy(obj, handler)

console.log(proxy.name) // job对象没有进行数据劫持
console.log(proxy.job)  // job对象进行了数据劫持
```
从以上代码可以看出，当真正访问到嵌套对象时，嵌套对象才会进行数据劫持，这在很大程度上提升了性能，而在`Vue2`中，当遇到嵌套对象时，必须递归遍历嵌套对象的所有`key`进行响应式处理。
* IE11浏览器不支持`Proxy`，意味着如果你的项目需要兼容`IE11`，那么你不得不慎重选择`Vue`的版本。

### 编译优化
`Vue3`编译优化用一句话来总结就是：**从模板大小正相关提升到与动态节点正相关**。

下图是`Vue`完整的编译流程

![编译流程](https://s0.lgstatic.com/i/image/M00/2C/FF/CgqCHl8Cuf2AZw70AAEFU2EMA50521.png)

从图中可以看出，影响编译性能的两大步骤主要是`compile`和`patch`阶段，其中`compile`到`render`的过程可以借助`vue-loader`这类插件进行离线编译，而`patch`的过程正是`Vue3`着重优化的步骤。

我们知道，`Vue`的最小的更新粒度是组件级别，它能最小化通知哪些组件需要更新，但在组件内部它任然需要去对比每一个节点。

```vue
<template>
  <div id="content">
    <p class="text">static text</p>
    <p class="text">{{message}}</p>
    <p class="text">static text</p>
  </div>
</template>
```
在`Vue2`中，虽然第一个、第三个`p`节点是静态节点，但依旧会去比较节点，这在很大程度上属于性能的浪费。

在`Vue3`中，它在编译时会对节点进行分析，将那些动态节点(第二个`p`节点)编译到一个`Block Tree`中，当下一次组件更新时只需要处理`Block Tree`即可。

## 语法API优化
`Vue3`中对于语法`API`的优化，主要归功于引入了`Composition API`来帮助我们更好的进行逻辑组织和逻辑复用。

### 优化逻辑组织
当我们使用`Vue2`开发项目时，更像是根据`Vue2`规定好的格式来撰写代码，如下：
```js
export default {
  data () {
    return {
      msg: 'Hello'
    }
  },
  created () {
    console.log(this.msg)
  },
  methods: {
    say () {
      console.log(this.msg)
    }
  },
  ...
}
```
这种方式本质上没什么问题，但问题是当我们的模块相对比较复杂时，往往为了完成一个需求，不得不将这些有关联的逻辑拆散到各个`option`中，从而造成了一个完整的逻辑变得相对分散的场景。

当使用`Composition API`时，它能很好的解决以上问题，从下图可以很直观的看到效果。

![Composition API](https://s0.lgstatic.com/i/image/M00/2C/E9/CgqCHl8CoI-ACOXEAAM5NZiddQs980.png)

### 优化逻辑复用

在`Vue2`中，当存在抽离复用逻辑时，我们会使用`mixins`来处理，如下：
```js
import mousePositionMixin  from './mouse.js'
export default {
  mixins: [mousePositionMixin]
}
```
当使用的`mixins`越来越多时，我们必须要面对两大问题：**数据来源不清晰**和**命名冲突**。

既然`mixins`有以上两大问题，那么`Composition API`又会是怎么样的呢？

还是使用相同的例子，我们来看一下使用`Composition API`是什么样的结果。
```js
import useMousePosition   from './mouse.js'
export default {
  setup () {
    const { x, y } = useMousePosition()
    return { x, y } 
  }
}
```
可以很直观的看出：`x`和`y`这两个变量是从`useMousePosition()`中引入的，这就很好的解决了数据来源不清晰地问题。

以下是`mousePosition`在`Vue2`和`Vue3`中不同定义方式的对比：
```js
// vue2定义方式
export default {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.update)
  },
  destroyed() {
    window.removeEventListener('mousemove', this.update)
  },
  methods: {
    update(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  }
}

// vue3定义方式
import { ref, onMounted, onUnmounted } from 'vue'
export default function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return { x, y }
}
```
因为`mixins`本质上是在`this`组件实例上去挂载不同的属性，所以极其容易发生命名冲突的问题，但在`Composition API`中，其变量定义是隔离的，这就很好的解决了命名冲突的问题。

## 引入RFC
`RFC`全称叫：`Request For Comments`。

在`Vue2`版本后期，它引入了`RFC`，其本质是希望一个新功能在引入框架时，应该受到社区的讨论。只有那些讨论通过的`RFC`，才会最终被实现并添加到框架中。这为框架的发展，提供了一个一致且可控的路径。

在`Vue3`新版本中，其全面启用了`RFC`，你可以在[RFC](https://github.com/vuejs/rfcs)这个链接中看到有哪些`RFC`正在被讨论，又有哪些`RFC`已经被实现合并。


## 参考链接
* [Vue.js 3.0 核心源码解析 (黄轶)](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=946&sid=20-h5Url-0&lgec_type=website&lgec_sign=86228E00A960E2EB44DCA4027393428B&buyFrom=2&pageId=1pz4#/sale)