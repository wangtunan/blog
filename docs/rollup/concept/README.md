# 核心概念

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
