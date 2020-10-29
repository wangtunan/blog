# $mount方法
在前面我们已经知道，`Vue`会根据不同的情况去挂载不同的`$mount`方法，其中带`compile`版本的`$mount`方法是在`src/platforms/web/entry-runtime-with-compiler.js`文件中被重新定义，其代码如下：
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

搞清楚了这两个`$mount`方法的区别后，我们接下来首先分析带`compile`版本的`$mount`方法实现，它主要做三件事情：**获取el元素**、**处理template**和**调用原始$mount方法**，我们将根据这几个步骤来分别进行代码分析。

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
我们可以看到在`query`方法中，首先对`el`参数做了判断，如果不是`string`类型，则直接返回；如果是则通过`document.querySelector`去获取`DOM`元素，如果没有获取到则默认创建一个`div`元素返回并提示错误信息。

在看完以上代码后，我们可能有一个疑问：什么时候`el`参数不为`string`类型呢？其实`$mount`方法可以直接接受一个`DOM`元素节点，既意味着我们可以在入口文件中这样写：
```js
import Vue from 'vue'
import App from './App.vue'
new Vue({
  render: h => h(App)
}).$mount(document.querySelector('#app'))

```
* **处理template**：
* **调用原始$mount方法**：