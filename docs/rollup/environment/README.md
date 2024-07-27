# 环境区分

在`Rollup`中，区分开发环境和生产环境配置十分简单，可以使用不同的配置文件来进行区分即可。

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
