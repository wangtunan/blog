# $mount方法

## 代码分析
在前面我们已经知道，`Vue`会根据不同的情况去挂载不同的`$mount`方法，其中带`compiler`版本的`$mount`方法是在`src/platforms/web/entry-runtime-with-compiler.js`文件中被重新定义，其代码如下：
```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```
我们可以看到，在代码最顶部它首先获取并缓存了`Vue.prototype`上原始的`$mount`方法，然后重新在`Vue.prototype`上定义`$mount`方法，其中在最新的`$mount`方法的最底部，还调用了缓存下来的原始`$mount`方法。

那么，这个原始的`$mount`方法又在哪里被定义呢，其实它是在`src/core/platforms/web/runtime/index.js`中被定义，其代码如下：
```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

搞清楚了这两个`$mount`方法的区别后，我们接下来首先分析带`compiler`版本的`$mount`方法实现，它主要做三件事情：**获取el元素**、**处理template**和**调用原始$mount方法**，我们将根据这几个步骤来分别进行代码分析。

代码分析：
* **获取el元素**：还记得在`main.js`入口文件中，我们调用`$mount`方法时传递了`#app`参数吗。
```js
import Vue from 'vue'
import App from './App.vue'
new Vue({
  render: h => h(App)
}).$mount('#app')
```
当执行`$mount`方法的时候，首先要做的就是根据传递的`el`元素获取到要挂载的`DOM`元素节点，它使用`query`这个方法来获取`DOM`元素节点，其中这个方法的代码如下：
```js
export function query (el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
```
我们可以看到在`query`方法中，首先对`el`参数做了判断，如果不是`string`类型，则直接返回；如果是则通过`document.querySelector`去获取`DOM`元素，如果没有获取到，则创建一个`div`元素返回并提示错误信息。

在看完以上代码后，我们可能有一个疑问：什么时候`el`参数不为`string`类型呢？其实`$mount`方法可以直接接受一个`DOM`元素节点，既意味着我们可以在入口文件中这样写：
```js
import Vue from 'vue'
import App from './App.vue'
new Vue({
  render: h => h(App)
}).$mount(document.querySelector('#app'))

```
我们在`Vue`官方文档中，肯定看到过这样一段提示内容：**el提供的元素只能作为挂载点。不同于 Vue 1.x，所有的挂载元素会被 Vue 生成的 DOM 替换。因此不推荐挂载 root 实例到 html 或者 body 上。**

在`$mount`方法中，我们也可以看到这样一段代码，它提示我们不能直接挂载到`html`或`body`上：
```js
if (el === document.body || el === document.documentElement) {
  process.env.NODE_ENV !== 'production' && warn(
    `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
  )
  return this
}
```
那么，为什么不能挂载到`html`或者`body`上呢，其实这是因为：`$mount`方法执行后，会直接替换挂载节点上面的内容，如果直接挂载`html`或者`body`上，很有可能会丢失掉一些东西，比如：`meta`，`link`或者`script`等。

* **处理template**：处理`template`是`$mount`方法的核心，这个过程也相对比较复杂，代码比较多一点，但流程还是比较清晰的。首先会对`render`进行判断，如果有`render`那么就不会再走处理`template`这部分的逻辑了，一个使用`render`的例子就是我们的`main.js`入口文件：
```js
import Vue from 'vue'
import App from './App.vue'
new Vue({
  render: h => h(App)
}).$mount('#app')
```
因为在创建根实例的时候提供了`render`选项，因此在`$mount`方法中进行`$options.render`条件为真，直接走最后一步：调用原始`$mount`方法。

**注意**：其实我们使用`Vue-Cli`脚手架创建的项目，组件在`$mount`方法执行的时候，已经存在`render`函数了，这是因为`vue-loader`已经帮我们把`template`转换为`render`函数了，因此对于大多数情况来说不会走处理`template`的过程，只有少部分特殊情况才会走`template`处理。

在分析完提供`render`选择的分支后，我们来看一下不提供`render`选项的时候，处理`template`的逻辑。我们先看一下，什么情况下会走处理`template`，以下面代码为例：
```js
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  template: `<div class="hello">{{ msg }}</div>`
}
```
这个时候对于条件判断`template`和`typeof template === 'string'`都为真，因此会走最后一步`compileToFunctions(template, ...)`，这一步主要是把`template`编译成`render`函数，这个过程我们会在后续详细进行说明。转换完毕以后，在把`render`赋值到`options.render`上面，这个步骤就跟我们手动提供一个`render`函数是类似的。

处理`template`的过程我们已经整体介绍完毕了，然后我们来分析一下没有提到的细节问题，首先当我们判断完毕`typeof template === 'string'`后，为什么还进行了如下代码判断：
```js
if (template.charAt(0) === '#') {
  template = idToTemplate(template)
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && !template) {
    warn(
      `Template element not found or is empty: ${options.template}`,
      this
    )
  }
}
```
这是因为，`template`我们可以直接传递一个`DOM`节点的`id`，例如：
```js
export default {
  template: '#main'
}
```
这个时候，检查到`template`第一个字符为`#`号，然后调用`idToTemplate`，它的代码如下：
```js
const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})
```
这段代码主要作用就是根据`id`查询`DOM`元素，然后返回它的`innerHTML`内容。

接下来第二个问题，为什么会有如下`else if`分支逻辑？
```js
else if (template.nodeType) {
  template = template.innerHTML
}
```
这是因为，`template`除了可以接受字符串以外，还可以直接接受一个`DOM`元素节点，例如：
```html
<div id="main">
  <div>dom</div>
</div>
```
```js
export default {
  name: 'HelloWorld',
  template: document.querySelector('#main')
}
```

最后一个问题，如果我既没有传递`render`，也没有提供`template`，会发生什么呢？其实它会最后降级到去获取`el`选项，代码如下：
```js
else if (el) {
  template = getOuterHTML(el)
}
```
如果`render`和`template`都没有提供，那么会在最后一步使用`el`选项，然后通过`el`获取`DOM`元素的`outerHTML`，`innerHTML`和`outerHTML`的区别如下：
```js
// 模拟一个DOM元素
const dom = `<div id="main">
              <div>dom</div>
             </div>`

const innerHTML = '<div>dom</div>'
const outerHTML = `<div id="main">
                    <div>dom</div>
                   </div>``
```
* **调用原始$mount方法**：最后，我们来分析`$mount`方法的最后一个步骤，也就是着重分析原始(公共)`$mount`方法。我们先来回顾一下这个方法的实现代码：
```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```
在这个方法中，处理`el`的过程跟之前的没有什么区别，那么我们分析的重点就落到了`mountComponent`方法，这个方法是定义在`src/core/instance/lifecycle.js`文件中，其代码如下：
```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```
`mountComponent`方法代码看起来很多，其实做的事情并不复杂，我们可以把它分为三个步骤：**callHook触发生命周期函数、定义updateComponent和定义渲染Watcher**。

1. **callHook触发生命周期函数**：这一部分最简单，只需要调用`callHook`方法触发对应的生命周期即可，在`mountComponent`方法中，一共有三处触发生命周期的地方，分别是：`beforeMount`，`mounted`和`beforeUpdate`。
2. **定义updateComponent**：定义`updateComponent`方法我们只需要看`else`分支即可，`if`分支主要做性能埋点相关的事情，这里会在开启浏览器`performance`时用到。`updateComponent`方法里面的代码调用了`vm._update()`这个方法的主要作用是触发组件重新渲染，而`vm._render()`我们在之前已经介绍过了。
3. **定义渲染Watcher**：在`mountComponent`方法中定义了一个渲染`Watcher`，其中渲染`Watcher`的第二个参数传递了我们的`updateComponent`，这个参数会在渲染`Watcher`实例化的时候赋值给`this.getter`属性，当进行派发更新的时候，会遍历`subs`数组执行`update`，然后调用`this.getter`，也就是再次调用`updateComponent`，然后让组件重新渲染。

## 流程图
在分析完`$mount`方法后，我们可以得到如下流程图：
<div style="text-align: center">
  <img src="../../images/vueAnalysis/$mount.png" />
</div>