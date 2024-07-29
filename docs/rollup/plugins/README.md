
# 常用插件
::: warning
注意，`Rollup`中插件的顺序是有要求的，一般会把解析和转换相关的插件写在前面。
:::

`Rollup`并不像`webpack`那样强大，它需要和其它插件配合使用才能完成特定的功能，常用的插件有：
* `@rollup/plugin-commonjs`：将`CommonJs`规范的模块转换为`ESM`规范，提供`Rollup`使用。
* `@rollup/plugin-node-resolve`：与`@rollup/plugin-commonjs`插件一起使用，配合以后就可以使用`node_modules`下的第三方模块代码了。
* `@rollup/plugin-babel`：把`ES6`代码转义成`ES5`代码，需要同时安装`@babel/core`和`@babel/preset-env`插件。注意：如果使用了高于`ES6`标准的语法，例如`async/await`，则需要进行额外的配置。
* `@rollup/plugin-terser`：代码压缩插件。
* `@rollup/plugin-json`： 支持从`.json`读取信息，配合`Rollup`的`Tree Shaking`可只打包`.json`文件中我们真正用到的部分。

以上插件使用案例如下：
```js
// rollup.config.mjs
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const config =  {
  ...省略其它
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel(),
    json(),
    terser()
  ]
}

export default config
```

以上仅列举最常见的插件，`Rollup`维护了很多其它`plugins`，你可点击[Rollup官方插件列表](https://github.com/rollup/plugins)查看更多内容。