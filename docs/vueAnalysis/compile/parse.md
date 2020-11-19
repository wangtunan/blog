# parse模板解析
在之前提到的`baseCompile`基础编译方法中，有这样一段代码：
```js
import { parse } from './parser/index'
function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  // ...
}
```
我们可以发现，它调用了`parse`方法来对`template`模板进行编译，编译的结果是一个`AST`抽象语法树，这个`AST`抽象语法书会在之后使用到，在这一小节我们的目标是弄清楚`parse`模板编译的原理。

## AST抽象语法树

## parseHTML及其钩子函数

## parse细节

## parse流程图
