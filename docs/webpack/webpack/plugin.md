
# 编写自己的Plugin
与`loader`一样，我们在使用 Webpack 的过程中，也经常使用`plugin`，那么我们学习如何编写自己的`plugin`是十分有必要的。
::: tip 场景
编写我们自己的`plugin`的场景是在打包后的`dist`目录下生成一个`copyright.txt`文件
:::
## plugin基础
`plugin`基础讲述了怎么编写自己的`plugin`以及如何使用，与创建自己的`loader`相似，我们需要创建如下的项目目录结构：
```js
|-- plugins
|   -- copyWebpackPlugin.js
|-- src
|   -- index.js
|-- webpack.config.js
|-- package.json
```
`copyWebpackPlugins.js`中的代码：使用`npm run build`进行打包时，我们会看到控制台会输出`hello, my plugin`这段话。
::: tip 说明
`plugin`与`loader`不同，`plugin`需要我们提供的是一个类，这也就解释了我们必须在使用插件时，为什么要进行`new`操作了。
:::
```js
class copyWebpackPlugin {
  constructor() {
    console.log('hello, my plugin');
  }
  apply(compiler) {

  }
}
module.exports = copyWebpackPlugin;
```

`webpack.config.js`中的代码：
```js
const path = require('path');
// 引用自己的插件
const copyWebpackPlugin = require('./plugins/copyWebpackPlugin.js');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new自己的插件
    new copyWebpackPlugin()
  ]
}
```

## 如何传递参数
在使用其他`plugin`插件时，我们经常需要传递一些参数进去，那么我们如何在自己的插件中传递参数呢？在哪里接受呢？<br/>
其实，插件传参跟其他插件传参是一样的，都是在构造函数中传递一个对象，插件传参如下所示：
```js {13}
const path = require('path');
const copyWebpackPlugin = require('./plugins/copyWebpackPlugin.js');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 向我们的插件传递参数
    new copyWebpackPlugin({
      name: 'why'
    })
  ]
}
```
在`plugin`的构造函数中调用：使用`npm run build`进行打包，在控制台可以打印出我们传递的参数值`why`
```js {3}
class copyWebpackPlugin {
  constructor(options) {
    console.log(options.name);
  }
  apply(compiler) {

  }
}
module.exports = copyWebpackPlugin;
```

## 如何编写及使用自己的Plugin
::: tip 说明
* `apply`函数是我们插件在调用时，需要执行的函数
* `apply`的参数，指的是 Webpack 的实例
* `compilation.assets`打包的文件信息
:::
我们现在有这样一个需求：使用自己的插件，在打包目录下生成一个`copyright.txt`版权文件，那么该如何编写这样的插件呢？
首先我们需要知道`plugin`的钩子函数，符合我们规则钩子函数叫：`emit`，它的用法如下：
```js
class CopyWebpackPlugin {
  constructor() {
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyWebpackPlugin', (compilation, cb) => {
      var copyrightText = 'copyright by why';
      compilation.assets['copyright.txt'] = {
        source: function() {
          return copyrightText
        },
        size: function() {
          return copyrightText.length;
        }
      }
      cb();
    })
  }
}
module.exports = CopyWebpackPlugin;
```
使用`npm run build`命名打包后，我们可以看到`dist`目录下，确实生成了我们的`copyright.txt`文件。
```js
|-- dist
|   |-- copyright.txt
|   |-- main.js
|-- plugins
|   |-- copyWebpackPlugin.js
|-- src
|   |-- index.js
|-- webpack.config.js
|-- package.json
```
我们打开`copyright.txt`文件，它的内容如下：
``` html
copyright by why
```