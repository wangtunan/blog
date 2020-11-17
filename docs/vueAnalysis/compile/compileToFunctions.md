# compileToFunctions

## 核心compile方法
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
我们发现`createCompiler`它是`createCompilerCreator`方法的调用结果，在这个方法中，我们可以看到传递给它的`baseCompile`函数参数的定义。在`baseCompile`方法中，它的代码量不是很多，但它包含了我们编译最主要的三大步骤：`parse`、`optimize`和`generate`。这说明，`baseCompile`才是我们最核心、最基本的编译方法。

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
在这个方法中，我们精简一下，只关心以上几段代码。我们可以发现，在`createCompileToFunctionFn`，我们终于找到了`compileToFunctions`方法的最终定义，其核心代码只有一段：
```js
const compiled = compile(template, options)
```
这里的`compile`就是我们之前提到过的最核心、最基本的编译方法`baseCompile`：
```js
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
