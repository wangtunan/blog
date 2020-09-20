# Vue中的Rollup构建
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

## alias别名
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
  { file: 'sfc', replacement: resolve('src/sfc') }
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

## config.js
首先我们从`package.json`打包命令中可以看到，在`development`环境下它通过`-c`指定了`rollup`的配置文件，所以会使用到`scripts/config.js`文件，并且打包命令还提供了一个叫做`TARGET`的环境变量：
```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
  }
}
```
那么在`scripts/config.js`文件下，我们可以看到它是通过`module.exports`导出的一个对象：
```js
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
  return config
}
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
```
在以上代码中，我们可以看到`module.exports`导出的对象，主要是通过`genConfig()`函数返回的，其中这个函数接受的参数正是我们在打包命令中提供的环境变量`TARGET`。我们再来粗略的看一下`genConfig()`函数，它的主要作用依然是生成`rollup`几大核心配置，然后返回配置完毕后的对象。

我们再来看一个叫做`builds`的对象，由于在源码中它的内容非常多，为了节省篇幅我们精简后其代码如下：
```js
const builds = {
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production'
  },
  // Runtime+compiler ES modules build (for bundlers)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es'
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development'
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production'
  }
}
```
我们可以发现它的键名正好是我们打包命令中提供的环境变量`TARGET`的值，这里以`web-full-dev`为例，它通过`web-full-dev`这个键可以得到一个对象：
```js
{
  entry: resolve('web/entry-runtime-with-compiler.js'),
  dest: resolve('dist/vue.js'),
  format: 'umd',
  env: 'development'
}
```
然后配合`resolve`函数和上面我们已经提到过的别名配置，就可以构造下面这样的`rollup`配置对象：
```js
{
  // 省略其它
  input: 'src/platforms/web/entry-runtime-with-compiler.js',
  output: {
    dest: 'dist/vue.js',
    format: 'umd',
    name: 'Vue'
  }
}
```


## build.js
`srcipts/build.js`文件的作用就是通过配置然后生成不同版本的压缩文件，其中它获取配置的方式同样是在`scripts/config.js`文件中，其中关键代码为：
```js
// config.js中导出
exports.getAllBuilds = () => Object.keys(builds).map(genConfig)

// build.js中引入
let builds = require('./config').getAllBuilds()
```