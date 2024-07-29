# 环境区分

在`Rollup`中，区分开发环境和生产环境配置十分简单，其中一个方法是可以使用不同的配置文件进行区分即可。

对于配置文件，我们做如下规定：
* `rollup.base.config.mjs`: 公共配置。
* `rollup.dev.config.mjs`: 开发环境配置。
* `rollup.prod.config.mjs`: 生产环境配置。

在根目录下新建`build`文件夹，然后分别新建以上三个文件：
```sh
|-- build
|   |-- rollup.base.config.mjs
|   |-- rollup.dev.config.mjs
|   |-- rollup.prod.config.mjs
```

`rollup.base.config.mjs`完整代码如下：
```js
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
    babel({
      babelHelpers: 'bundled'
    })
  ]
}
```

`rollup.dev.config.mjs`完整代码如下：
```js
import baseConfig from './rollup.base.config'

const devConfig = {
  ...baseConfig,
  output: [
    { file: 'dist/vue.cjs.js', format: 'cjs' },
    { file: 'dist/vue.esm.js', format: 'es' },
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' }
  ]
}
export default devConfig
```

`prod`环境下，区分与开发环境，我们需要对代码进行代码。需要安装`Rollup`压缩代码的相关`npm`包：
```sh
# 安装rollup相关包
$ npm install @rollup/plugin-terser -D
```

`rollup.prod.config.mjs`完整代码如下：
```js
import terser from '@rollup/plugin-terser'
import baseConfig from './rollup.base.config.mjs'

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  ...baseConfig,
  output: [
    { file: 'dist/vue.cjs.min.js', format: 'cjs' },
    { file: 'dist/vue.esm.min.js', format: 'es' },
    { file: 'dist/vue.min.js', format: 'umd', name: 'Vue' }
  ],
  plugins: [
    ...baseConfig.plugins,
    terser()
  ]
}
```
接着，我们需要在`package.json`文件中修改打包命令：
```json
"scripts": {
  "dev": "rollup -w -c ./build/rollup.dev.config.mjs",
  "build": "rollup -c ./build/rollup.prod.config.mjs"
}
```
最后，我们尝试使用`npm run build`命令打包生产环境代码，执行后会在`dist`目录下生成三个`.min.js`文件且代码是经过压缩的。
```js
|-- dist
|   |-- vue.cjs.min.js
|   |-- vue.esm.min.js
|   |-- vue.min.js
```