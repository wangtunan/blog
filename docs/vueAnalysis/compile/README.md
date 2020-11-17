# 介绍
在之前我们提到过，`Vue`根据不同的使用场景，提供了不同版本`Vue.js`打包文件，其中`runtime + compiler`版本允许我们撰写带`template`选项的组件，它能够对`template`进行编译。而`runtime + only`版本则不允许我们这样做，我们使用`Vue-Cli3.0`以上版本的脚手架默认创建的项目都是`runtime + only`版本，其中对于组件的`template`模板，它依赖于`vue-loader`来编译成`render`渲染函数，不再依赖`Vue.js`。

在编译原理这个大章节，我们为了深入了解其内部实现原理，主要分析`runtime + compiler`版本的`Vue.js`。这个版本它的入口文件在`src/platforms/web/entry-runtime-with-compiler.js`，在这个入口文件我们可以发现，它不仅重新定义了`$mount`方法，还挂载了一个`compile`全局`API`。
```js
import { compileToFunctions } from './compiler/index'
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

Vue.compile = compileToFunctions
```
其中，`$mount`方法我们在组件化章节中已经单独介绍过了，在编译原理这一章节，我们将其分为**parse模板解析**、**optimize优化**和**codegen代码生成**这三个大步骤来深入学习其实现原理，也就是`compileToFunctions`方法的实现逻辑。