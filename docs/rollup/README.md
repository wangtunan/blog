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
    "dev": "rollup -c -w rollup.config.js",
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
|   |   |-- rollup.config.js
|   |   |-- package.json
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
### 支持生产环境代码压缩
### 支持TypeScript
### 支持Eslint
### 支持Jest自动化测试
### 支持Changelog自动生成
### 支持提交规范
### 支持自动化发布