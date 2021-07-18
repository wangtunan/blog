---
sidebar: auto
---

# Rollup
`rollup`它是一个类似于`webpack`的打包工具，区别于`webpack`，它更适合一个库的打包。

## 核心概念

同`webpack`一样，`rollup`也有以下几大核心概念：
* `input`：入口文件，类比于`webpack`的`entry`，它指明了我们库文件入口位置。
* `output`：输出位置，它指明了打包后的输出信息，包括：输出目录，打包文件名等。
* `plugins`：插件，`rollup`在构建过程中，插件可提供一些辅助功能，例如：`alias`别名解析、转义`ES6`等。
* `external`：当我们的库依赖于其它第三方库时，我们不需要把这些第三方库一起打包，而是应该把依赖写在`external`里面。

`rollup`同样适合使用配置文件的做法来配置打包的选项，例如：
```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' }
  ],
  ...
}
```

构建说明：
* `umd`：此选项构建出来的库文件是一个通用模式，可以通过不同的方式去使用：`script`标签引入，`ES Module`规范引入和`CommonJs`规范引入等。
* `cjs`: 此选项构建出来的库文件主要为`CommonJs`规范，可在`Node`环境中使用。
* `es`：此版本构建出来的库文件主要为`ES Module`规范，可在支持`ES Module`也就是`import/export`的环境中使用。


有了以上配置文件，我们可以在`package.json`中配置打包命令：
```json
{
  "scripts": {
    "dev": "rollup -w -c rollup.config.js"
  }
}
```

参数说明：
* `-c`：为`--config`的缩写，表示设置`rollup`打包的配置。
* `-w`：为`--watch`的缩写，在本地开发环境添加`-w`参数可以监控源文件的变化，自动重新打包。

## 常用插件
`rollup`并不像`webpack`那样强大，它需要和其它插件配合使用才能完成特定的功能，常用的插件有：
* `@rollup/plugin-commonjs`：将`CommonJs`规范的模块转换为`ESM`规范，提供`rollup`使用。
* `@rollup/plugin-node-resolve`：与`@rollup/plugin-commonjs`插件一起使用，配合以后就可以使用`node_modules`下的第三方模块代码了。
* `@rollup/plugin-babel`：把`ES6`代码转义成`ES5`代码，需要同时安装`@babel/core`和`@babel/preset-env`插件。注意：如果使用了高于`ES6`标准的语法，例如`async/await`，则需要进行额外的配置。
* `rollup-plugin-terser`：代码压缩插件，另外一种方案是`rollup-plugin-uglify` + `uglify-es`进行代码压缩，不过更推荐第一种方案。
* `@rollup/plugin-json`： 支持从`.json`读取信息，配合`rollup`的`Tree Shaking`可只打包`.json`文件中我们真正用到的部分。

以上插件使用案例如下：
```js
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

const config =  {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue', exports: 'auto' }
  ],
  plugins: [
    commonjs(),
    resolve(),
    babel(),
    terser(),
    json()
  ]
}

export default config
```
当我们使用打包命令进行打包时，会在`dist`目录下生成三个文件，分别是`vue.js`、`vue.common.s`以及`vue.esm.js`。
```bash
$ npm run dev
```

## 配置案例
在介绍配置案例之前，我们需要新建一个项目，并且创建一些必要的文件目录，如下：

```bash
|-- rollup-learn
|   |-- src
|   |   |-- index.js  # 入口文件
```
然后使用如下命令创建一个`package.json`文件：
```bash
$ npm init -y
```
创建完毕后，再修改`package.json`，修改后如下：
```json
{
  "name": "rollup-learn",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "rollup -w -c rollup.config.js",
    "build": "rollup -c rollup.config.js"
  },
  "keywords": [],
  "author": "wangtunan",
  "license": "MIT"
}
```
这样，我们的基础目录已经有了，在之后的小节中，所有案例均基于这个基础的目录结构。

### 基础配置
根据之前的章节，我们需要安装一些`npm`包，如下：
```bash
# 安装rollup核心包
$ npm install rollup -D

# 安装rollup插件包
$ npm install @rollup/plugin-commonjs @rollup/plugin-node-resolve -D
```
随后，根目录新建`rollup.config.js`，并撰写如下内容：
```js
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' },
  ],
  plugins: [
    commonjs(),
    resolve()
  ]
}
```
然后，我们需要在入口文件撰写一些内容:
```js
export function add (a, b) {
  return a + b
}

export function minus (a, b) {
  return a - b
}
```
最后，运行我们在`package.json`文件中定义的`build`命令：
```bash
$ npm run build
```
运行完毕后，会在`dist`目录下生成三个文件，此时的文件目录结构如下：

```bash
|-- rollup-learn
|   |-- dist
|   |   |-- vue.js
|   |   |-- vue.common.js
|   |   |-- vue.esm.js
|   |-- src
|   |   |-- index.js
|   |-- rollup.config.js
|   |-- package.json
```
我们以`vue.esm.js`文件为例，其打包后的文件代码如下：
```js
function add (a, b) {
  return a + b
}

function minus (a, b) {
  return a - b
}

export { add, minus };
```
为了让我们`rollup`打包出来的库，能够支持`commonjs`和`esm`这两种方式引入，我们需要修改一下`package.json`，改动如下：
```json
{
  // ... 省略其它
  "main": "dist/vue.commin.js",
  "module": "dist/vue.esm.js",
  // ... 省略其它
}
```

### 支持ES6转义
为了让库文件具有更好的兼容性，需要把`ES6`代码在打包的时候转义成`ES5`。

要做到这一步，需要我们安装几个`npm`包，如下：
```bash
# 安装rollup插件包
$ npm install @rollup/plugin-babel -D

# 安装babel相关包
$ npm install @babel/core @babel/preset-env -D
```

安装完以上`npm`包后，需要在`rollup.config.js`中使用`babel`插件，如下：
```js {3,15}
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' },
  ],
  plugins: [
    commonjs(),
    resolve(),
    babel()
  ]
}
```

然后，需要在根目录下新建`.babelrc`文件，并撰写如下内容：
```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

为了测试是否正确的处理了`ES6`相关的代码，我们需要改动一下入口文件`index.js`:
```js
export const add = (a, b) => {
  return a + b
}

export const minus = (a, b) => {
  return a - b
}
```
最后，我们再次运行`npm run build`打包命令，查看`dist`目录下`vue.esm.js`文件打包后的代码。
```js
var add = function add(a, b) {
  return a + b;
};
var minus = function minus(a, b) {
  return a - b;
};

export { add, minus };
```

可以看到，`ES6`相关的代码已经被正确的转义了。

### 支持区分开发环境和生产环境
在`Rollup`中，区分开发环境和生产环境配置十分简单，可以使用不同的配置文件来进行区分

我们规定`rollup.dev.config.js`为开发环境的配置，`rollup.prod.config.js`为生产环境的配置，`rollup.base.config.js`为公共配置。

先创建这两个文件，然后添加配置代码。

`rollup.base.config.js`代码如下：
```js
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  plugins: [
    commonjs(),
    resolve(),
    babel()
  ]
}
```

`rollup.dev.config.js`代码如下：
```js
import baseConfig from './rollup.base.config'

const devConfig = {
  ...baseConfig,
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' },
  ]
}
export default devConfig
```

`rollup.prod.config.js`代码如下：
```js
import baseConfig from './rollup.base.config'

const prodConfig = {
  ...baseConfig,
  output: [
    { file: 'dist/vue.min.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.min.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.min.js', format: 'es', name: 'Vue' },
  ]
}

export default prodConfig
```
配置文件改动完毕后，我们需要在`package.json`文件中修改打包命令：
```json
"scripts": {
  "dev": "rollup -w -c rollup.dev.config.js",
  "build": "rollup -c rollup.prod.config.js"
}
```
我们尝试使用`npm run build`命令打包生产环境代码，执行后会在`dist`目录下生成三个`.min.js`文件。

此时的目录如下：
```js
|-- rollup-learn
|   |-- dist
|   |   |-- vue.js
|   |   |-- vue.min.js
|   |   |-- vue.common.js
|   |   |-- vue.common.min.js
|   |   |-- vue.esm.js
|   |   |-- vue.esm.min.js
|   |-- src
|   |   |-- index.js
|   |-- .babelrc
|   |-- rollup.base.js
|   |-- rollup.dev.js
|   |-- rollup.prod.js
|   |-- package.json
```

### 支持生产环境代码压缩
目前来说，使用`npm run dev`和`npm run build`这两个命令打包出来的文件，除了文件名有点区别，其它代码都是一样的。

现在，我们需要对生产环境进行压缩，需要先安装一个`npm`包。
```bash
# 安装代码压缩插件
$ npm install rollup-plugin-terser -D
```
插件安装完毕后，需要在`rollup.prod.config.js`文件中添加此插件。
```js
import baseConfig from './rollup.base.config'
import { terser } from 'rollup-plugin-terser'

const prodConfig = {
  ...baseConfig,
  output: [
    { file: 'dist/vue.min.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.min.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.min.js', format: 'es', name: 'Vue' },
  ],
  plugins: [
    ...baseConfig.plugins,
    terser()
  ]
}

export default prodConfig
```
修改完毕后，再次运行`npm run build`命令，查看`vue.min.js`中的代码，发现代码已经成功被压缩了。

### 支持TypeScript
如果要支持`TypeScript`，需要安装几个`npm`包，如下：
```bash
# 安装rollup插件
$ npm install rollup-plugin-typescript2 -D

# 安装ts相关包
$ npm install typescript tslib -D
```
安装完毕后，把入口文件后缀改为`.ts`，并且分别给`add`和`minus`这两个方法添加类型：
```ts
export const add = (a: number, b: number): number => {
  return a + b
}

export const minus = (a: number, b: number): number => {
  return a - b
}
```
最后，在`rollup.base.config.js`文件中使用`rollup`插件。
```js {4,12}
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    resolve(),
    babel(),
    typescript()
  ]
}
```
再次运行`npm run dev`或者`npm run build`后，在`dist`目录下查看打包后的源码，可以看到已经能正确识别`ts`代码了。

### 支持ESlint

### 支持Jest自动化测试
如果需要支持`Jest`自动化测试，需要我们安装额外的`npm`包：
```bash
# 安装jest
$ npm install jest -D
```
因为要测试的文件是包含`ts`代码，因此我们需要再安装其它的包：
```bash
$ npm install babel-jest ts-jest -D
```
安装完毕后，在根目录下新建`jest.config.js`文件，并填写配置：
```js
module.exports = {
  preset: 'ts-jest',
  testMatch: [
    "**/tests/**/*.(spec|test).(js|jsx|ts|tsx)"
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: [
    'src/**/*.(js|jsx|ts|tsx)'
  ]
}
```
配置说明：
* `preset`：要测试的代码，包含`ts`的内容，使用`ts-jest`来处理。
* `testMatch`：测试哪些文件，以上配置表明我们要测试`tests`目录下所有`.(spce|test).(js|jsx|ts|tsx)`。
* `collectCoverage`：生成测试报告。
* `coverageDirectory`: 测试报告存放位置。
* `collectCoverageFrom`：测试报告收集范围。

配置文件撰写完毕后，我们在根目录下新建一个`tests`目录，并添加一个测试文件`index.test.js`。
```js
// 如果需要使用import，需要自己额外的配置
const { add } = require('../src/index')

describe('index.ts', () => {
  it('test add func', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```
最后，需要在`package.json`文件中添加一条测试命令：
```json
"scripts": {
  "dev": "rollup -w -c rollup.dev.config.js",
  "build": "rollup -c rollup.prod.config.js",
  "test": "jest"
}
```
运行`npm run jest`命令，它会在控制台输出一些测试覆盖率的信息。
```
PASS tests/index.test.js
  index.ts
    √ test add func (2 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   83.33 |      100 |      50 |      75 | 
 index.ts |   83.33 |      100 |      50 |      75 | 6
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.345 s
Ran all test suites.
```
### 支持Changelog自动生成
### 支持提交规范
### 支持自动化发布