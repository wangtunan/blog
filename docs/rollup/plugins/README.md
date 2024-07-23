
# 常用插件
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