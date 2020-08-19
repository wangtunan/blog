# Rollup构建版本
`Vue.js`通过`rollup`构建工具进行构建，它是一个类似于`webpack`的打包工具，区别于`webpack`，它更适合作为一个`Library`库的打包。在学习`Vue.js`源码之前，我们有必要知道`Vue.js`是如何构建不同版本的。

## Rollup基础知识
### 核心概念
同`webpack`一样，`rollup`也有以下几大核心概念：
* `input`：入口文件，类比于`webpack`的`entry`，它指明了我们库文件入口位置。
* `output`：输出位置，它指明了打包后的输出信息，包括：输出目录，打包文件名等。
* `plugins`：插件，`rollup`在构建过程中，插件可提供一些辅助功能，例如：`alias`别名解析、转义`ES6`等。
* `external`：当我们的库依赖于其它第三方库时，我们不需要把这些第三方库一起打包，而是应该把依赖写在`external`里面。

同`webpack`一样，`rollup`同样适合使用配置文件的做法来配置打包的选项，例如：
```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' }
  ]
}
```

构建版本说明：
* `umd`：此选项构建出来的库文件主要适用于`Web`端，可以通过常见的方式去使用：`script`标签，`ES Module`规范引入和`CommonJs`规范等方式引入。
* `cjs`: 此选项构建出来的库文件主要为`CommonJs`规范，可在`Node`环境中使用。
* `es`：此版本构建出来的库文件主要为`ES Module`规范，可在支持`import/export`的环境中使用。

有了以上配置文件，我们可以在`package.json`中进行如下修改：
```json
{
  "name": "Vue",
  "version": "1.0.0",
  "scripts": {
    "dev": "rollup -w -c scripts/rollup.config.dev.js",
    "build": "rollup -c scripts/rollup.config.prod.js"
  }
}
```

参数说明：
* `-c`：为`--config`的缩写，表示设置`rollup`打包的配置。
* `-w`：为`--watch`的缩写，在本地开发环境添加`-w`参数可以监控源文件的变化，自动重新打包。
### 常用插件
`rollup`并不像`webpack`那样强大，它需要和其它插件配合使用才能完成特定的功能，常用的插件有：
* `@rollup/plugin-json`： 支持从`.json`读取信息，配合`rollup`的`Tree Shaking`可只打包`.json`文件中我们用到的部分。
* `@rollup/plugin-commonjs`：将`CommonJs`规范的模块，转换为`ES6`提供`rollup`使用。
* `@rollup/plugin-node-resolve`：与`@rollup/plugin-commonjs`插件一起使用，配合以后就可以使用`node_modules`下的第三方模块代码了。
* `@rollup/plugin-babel`：把`ES6`代码转义成`ES5`代码，需要同时按照`@babel/core`和`@babel/preset-env`插件。注意：如果使用了高于`ES6`标准的语法，则需要进行额外的配置。
* `rollup-plugin-terser`：代码压缩插件，不推荐使用`rollup-plugin-uglify` + `uglify-es`进行代码压缩。

以上插件使用方式如下：
```js
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const config =  {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue', exports: 'auto' }
  ],
  plugins: [
    json(),
    resolve(),
    babel(),
    commonjs(),
    terser()
  ]
}

export default config
```
### 区分生产环境和开发环境
正如你在上面看到的那样，我们可以像`webpack`一样进行开发环境和生产环境的配置区分，我们把和`rollup`构建相关的文件都放在`scripts`目录下：
```sh
|-- scripts
|   |-- rollup.config.base.js      # 公共配置
|   |-- rollup.config.dev.js       # 开发环境配置
|   |-- rollup.config.prod.js      # 生产环境配置
```

根据我们的拆分逻辑，`rollup.config.base.js`代码如下：
```js
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const config =  {
  input: 'src/index.js',
  plugins: [
    json(),
    resolve(),
    babel(),
    commonjs()
  ]
}

export default config
```

`rollup.config.dev.js`代码如下：
```js
import baseConfig from './rollup.config.base.js'
import serve from 'rollup-plugin-serve'
import { name } from '../package.json'

const config =  {
  ...baseConfig,
  output: [
    { file: 'dist/vue.js', format: 'umd', name },
    { file: 'dist/vue.common.js', format: 'cjs', name, exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name, exports: 'default' }
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      port: '4300',
      openPage: '/example/index.html',
      contentBase: ''
    })
  ]
}
export default config
```
配置说明：本地开发环境下，我们可以有选择的添加`rollup-plugin-serve`插件，它类似于`webpack-dev-server`，能在开发环境下起一个小型服务，方便我们进行代码调试。

`rollup.config.prod.js`代码如下：
```js
import baseConfig from './rollup.config.base.js'
import { terser } from 'rollup-plugin-terser'
import { name } from '../package.json'
const config =  {
  ...baseConfig,
  output: [
    { file: 'dist/vue.min.js', format: 'umd', name },
    { file: 'dist/vue.common.min.js', format: 'cjs', name, exports: 'auto' },
    { file: 'dist/vue.esm.min.js', format: 'es', name, exports: 'default' }
  ],
  plugins: [
    ...baseConfig.plugins,
    terser()
  ]
}

export default config
```
配置说明：生产环境下，我们需要对代码进行压缩处理，对`ES Module`，`CommonJs`和`UMD`等规范分别生成其对应的压缩文件。

分别运行`npm run dev`和`npm run build`之后，我们可以得到如下的目录：
```sh
|-- dist
|   |-- vue.js            # UMD未压缩版本
|   |-- vue.min.js        # UMD压缩版本
|   |-- vue.esm.js         # ES Module未压缩版本
|   |-- vue.esm.min.js     # ES Module压缩版本
|   |-- vue.common.js     # CommonJs未压缩版本
|   |-- vue.common.min.js # CommonJs压缩版本
```

最后，如果我们像`Vue.js`一样构建的是一个库文件，那么我们还需要在`package.json`进行如下配置：
```json
{
  "main": "dist/vue.common.js",
  "module": "dist/vue.esm.js",
}
```



## Vue中的Rollup构建
在阅读`Vue.js`源码时，我们首先应该去看其`package.json`文件内容，在`Vue.js`项目中其精简掉与`compiler`、`weex`和`ssr`相关的内容以后，如下所示：
```json
{
  "name": "vue",
  "version": "2.6.11",
  "main": "dist/vue.runtime.common.js",
  "module": "dist/vue.runtime.esm.js",
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "build": "node scripts/build.js"
  }
}
```
我们可以从上面很容易的发现，其精简后的内容和我们在`rollup`基础知识里面的配置十分相似，其构建脚本同样放置在`scripts`目录下。在`scripts`目录下，我们需要重点关注下面几个文件：
* `alias.js`：与`rollup`构建别名相关的配置。
* `config.js`：与`rollup`构建不同版本相关的代码。
* `build.js`：`rollup`构建不同压缩版本`Vue.js`文件相关代码。

### alias别名
我们在开发`Vue`应用时，经常会用到`@`别名，其中`@`代表`src`目录：
```js
// 使用别名
import HelloWorld from '@/components/HelloWorld.vue'

// 相当于
import HelloWorld from 'src/components/HelloWorld.vue'
```

在`scripts/alias.js`中，我们可以发现其别名配置代码如下：
```js
const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
```
以`core`别名为例，在`Vue.js`源码中，我们通过别名进行如下引入：
```js
// 使用core别名
import Vue from 'core/instance/index.js'

// 相当于
import Vue from 'src/core/instance/index.js'
```

其中`alias.js`文件是在`config.js`中引入并使用的：
```js
// config.js文件
import alias from 'rollup-plugin-alias'
import aliases from './alias.js'

function genConfig () {
  const config = {
    plugins: [
      alias(Object.assign({}, aliases))
    ])
  }
  return config
}
```

**注意**：由于`Vue.js`中使用`rollup`主版本以及其周边插件的版本较低，如果你使用了最新的`rollup`版本或者其周边的插件，需要按照最新插件的配置要求来，这里以最新的`@rollup/plugin-alias`插件为例：
```js
const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = [
  { file: 'vue', replacement: resolve('src/platforms/web/entry-runtime-with-compiler') },
  { file: 'compiler', replacement: resolve('src/compiler') },
  { file: 'core', replacement: resolve('src/core') },
  { file: 'shared', replacement: resolve('src/shared') },
  { file: 'web', replacement: resolve('src/platforms/web' },
  { file: 'weex', replacement: resolve('src/platforms/weex') },
  { file: 'server', replacement: resolve('src/server') },
  { file: 'sfc', replacement: resolve('src/sfc') },
]
```
其在`config.js`新的使用方式同样需要做调整，如下：
```js
// config.js文件
import alias from '@rollup/plugin-alias'
import aliases from './alias.js'

function genConfig () {
  const config = {
    plugins: [
      alias({ entries: aliases })
    ])
  }
  return config
}
```

### config.js

### build.js
