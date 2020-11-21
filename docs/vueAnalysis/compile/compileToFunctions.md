# compileToFunctions

## compile核心方法
我们知道，在`runtime + compiler`的版本中，`$mount`方法和`Vue.compile`全局`API`都用到了`compileToFunctions`方法。在`Web`平台下，它是从`src/platforms/web/compiler/index.js`文件中引入的，代码如下：
```js
import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'
const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions }
```

在以上代码中，我们可以看到`compileToFunctions`是从`createCompiler`方法的调用结果中解构出来的，而`createCompiler`方法又是从`compiler/index.js`文件中引入的。根据之前`Rollup`章节提到过的知识，我们知道`compiler`是一个别名，真实路径为：`src/compiler/index.js`，其代码如下：
```js
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```
我们发现`createCompiler`它又是`createCompilerCreator`方法的调用结果，在这个方法中，我们可以看到传递给它的`baseCompile`函数参数的定义。在`baseCompile`方法中，它的代码量不是很多，但它包含了我们编译最主要的三大步骤：`parse`、`optimize`和`generate`。这说明，`baseCompile`才是我们最核心、最基本的编译方法。

那么，`createCompilerCreator`又是什么呢？它是如何返回一个函数的？我们来看它的实现代码：
```js
export function createCompilerCreator (baseCompile: Function): Function {
  return function createCompiler (baseOptions: CompilerOptions) {
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
      const finalOptions = Object.create(baseOptions)
      const errors = []
      const tips = []

      let warn = (msg, range, tip) => {
        (tip ? tips : errors).push(msg)
      }

      if (options) {
        if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
          // $flow-disable-line
          const leadingSpaceLength = template.match(/^\s*/)[0].length

          warn = (msg, range, tip) => {
            const data: WarningMessage = { msg }
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength
              }
            }
            (tip ? tips : errors).push(data)
          }
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules)
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          )
        }
        // copy other options
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }
      }

      finalOptions.warn = warn

      const compiled = baseCompile(template.trim(), finalOptions)
      if (process.env.NODE_ENV !== 'production') {
        detectErrors(compiled.ast, warn)
      }
      compiled.errors = errors
      compiled.tips = tips
      return compiled
    }

    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```
虽然，`createCompilerCreator`方法的代码比较长，但我们适当精简后就会变得非常清晰：
```js
// 精简代码
export function createCompilerCreator (baseCompile: Function): Function {
  return function createCompiler (baseOptions: CompilerOptions) {
    function compile () {
      const compiled = baseCompile(template.trim(), finalOptions)
      return compiled
    }
    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```
看到这里，我们把之前介绍的串联起来，无论是`$mount`方法中的`compileToFunctions`还是`Vue.compile`，都是`createCompiler`方法调用返回结果对象的`compileToFunctions`属性值，这个属性值它又是`createCompileToFunctionFn`方法的调用结果，其中参数是在`createCompiler`中定义的一个`compile`方法，我们再深入去看`createCompileToFunctionFn`的代码：
```js
export function createCompileToFunctionFn (compile: Function): Function {
  const cache = Object.create(null)

  return function compileToFunctions (
    template: string,
    options?: CompilerOptions,
    vm?: Component
  ): CompiledFunctionResult {
    options = extend({}, options)
    // ...
    // check cache
    const key = options.delimiters
      ? String(options.delimiters) + template
      : template
    if (cache[key]) {
      return cache[key]
    }
    // ...
    // compile
    const compiled = compile(template, options)
    const res = {}
    const fnGenErrors = []
    res.render = createFunction(compiled.render, fnGenErrors)
    res.staticRenderFns = compiled.staticRenderFns.map(code => {
      return createFunction(code, fnGenErrors)
    })
    return (cache[key] = res)
  }
}
```
在这个方法中，我们精简一下，只关心以上几段代码。我们可以发现，在`createCompileToFunctionFn`方法中我们终于找到了`compileToFunctions`方法的最终定义，其核心代码只有一段：
```js
const compiled = compile(template, options)
```
这里的`compile`就是我们之前提到过的最核心、最基本的编译方法`baseCompile`它的包裹函数：
```js
function compile () {
  const compiled = baseCompile(template.trim(), finalOptions)
  return compiled
}
function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}
```

## 代码分析
在介绍完核心`compile`方法后，我们来分析一下`compileToFunctions`的实现逻辑：
* **CSP限制**：`CSP`是指内容安全策略，我们可以在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)上看到它对`CSP`的定义、描述以及一些示例，同时我们可以看到它有下面这样一段描述：
> 一个策略由一系列策略指令所组成，每个策略指令都描述了一个针对某个特定类型资源以及生效范围的策略。你的策略应当包含一个default-src策略指令，在其他资源类型没有符合自己的策略时应用该策略(有关完整列表查看default-src )。一个策略可以包含 default-src  或者 script-src 指令来防止内联脚本运行, 并杜绝eval()的使用。 一个策略也可包含一个 default-src 或  style-src 指令去限制来自一个 style 元素或者style属性的內联样式。

如果想了解`CSP`，你可以点击[Content Security Policy](https://developers.google.com/web/fundamentals/security/csp/#if_you_absolutely_must_use_it)去深入学习有关`CSP`方面的知识。

**注意**：`Vue`只在`1.0+`提供了特定的`CSP`兼容版本，你可以在[Vue Github](https://github.com/vuejs/vue/tree/1.0-csp)分支仓库去查看这个版本的源代码。

根据以上描述，如果存在某些`CSP`限制，那么我们可能无法使用`text-to-JavaScript`机制，也就是说下面这些代码可能无法正常运行：
```js
const func = new Function('return 1')
evel('alert(1)')
```
在`compileToFunctions`返回函数中，我们使用`try/catch`尝试检测`new Function('return 1')`是否存在`CSP`限制，如果存在就提示相关错误信息。
```js
'It seems you are using the standalone build of Vue.js in an ' +
'environment with Content Security Policy that prohibits unsafe-eval. ' +
'The template compiler cannot work in this environment. Consider ' +
'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
'templates into render functions.'
```
如果不存在，那么代表我们可以安全的使用`text-to-JavaScript`这种机制，在`compileToFunctions`中，它有如下核心代码：
```js
const compiled = compile(template, options)
```
在以上代码执行后，`compiled.render`是一段字符串，我们可以举例说明：
```js
const compiled = {
  render: 'with(this){return 1}'
}
```
在`res`返回对象中，`compileToFunctions`是使用下面这段代码来赋值的：
```js
const res = {}
const fnGenErrors = []
res.render = createFunction(compiled.render, fnGenErrors)
res.staticRenderFns = compiled.staticRenderFns.map(code => {
  return createFunction(code, fnGenErrors)
})
```
我们可以看到，无论是`render`还是`staticRenderFns`都使用了`createFunction`，这个方法的主要作用就是将一段字符串代码，封装成一个函数并返回，其实现代码如下：
```js
function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err, code })
    return noop
  }
}
```
如果`new Function`没有出错，那么我们就返回这个匿名函数，如果出错了就把出错信息`push`到`errors`数组中。借用上面的例子，它封装后如下所示：
```js
// 封装前
const compiled = {
  render: 'with(this){return 1}'
}

// 封装后
const res = {
  render: function () { with(this){return 1} }
}
```
* **核心编译**：在之前我们介绍过`compileToFunctions`方法，它只有一段最核心的代码：
```js
// 核心代码
const compiled = compile(template, options)

function compile () {
  const compiled = baseCompile(template.trim(), finalOptions)
  return compiled
}
function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}
```
当核心编译方法`compile`开始执行的时候，`baseCompile`自然而然的跟着一起执行了，当`baseCompile`执行的时候，也就意味着编译主要三大步骤开始了。由于这三大步骤比较复杂，我们会在后续章节中单独进行介绍。
* **编译缓存**：在组件编译的时候，对于同一个组件而言我们应该只编译一次。当第一次编译完成后，我们应该把编译结果缓存起来，下一次遇到相同组件再次编译的时候先从缓存里面去获取，如果缓存里面有则直接返回，如果没有才会走编译的过程，这就是编译缓存，它属于编译优化的一种手段。其中，编译缓存是靠下面这几段代码来实现的：
```js
const cache = Object.create(null)
return function compileToFunctions (
  template: string,
  options?: CompilerOptions,
  vm?: Component
): CompiledFunctionResult {
  // ...
  const key = options.delimiters
    ? String(options.delimiters) + template
    : template
  if (cache[key]) {
    return cache[key]
  }
  // ...
  return (cache[key] = res)
}
```
我们拿根实例举例说明：
```js
import Vue from 'vue'
import App from './App'
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
编译缓存后，`cache`缓存对象如下：
```js
const cache = {
  '<App/>': 'with(this) { xxxx }'
}
```
当再次编译`App`组件的时候，发现在`cache`对象中已经存在这个键，因此直接返回。