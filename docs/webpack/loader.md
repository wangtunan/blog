
# 编写自己的Loader
在我们使用 Webpack 的过程中，我们使用了很多的`loader`，那么那些`loader`是哪里来的？我们能不能写自己的`loader`然后使用？
答案当然是可以的，Webpack 为我们提供了一些`loader`的API，通过这些API我们能够编写出自己的`loader`并使用。
## 如何编写及使用自己的Loader
::: tip 场景
我们需要把`.js`文件中，所有出现`Webpack is good!`，改成`Webpack is very good!`。实际上我们需要编写自己的`loader`，所以我们有如下的步骤需要处理：
* 新建`webpack-loader`项目
* 使用`npm init -y`命令生成`package.json`文件
* 创建`webpack.config.js`文件
* 创建`src`目录，并在`src`目录下新建`index.js`
* 创建`loaders`目录，并在`loader`目录下新建`replaceLoader.js`
* 安装`webpack`、`webpack-cli`
:::

按上面的步骤新建后的项目目录如下：
```js
|-- loaders
|   | -- replaceLoader.js
|-- src
|   | -- index.js
|-- webpack.config.js
|-- package.json
```

首先需要在`webpack.config.js`中添加下面的代码：
```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve(__dirname, './loaders/replaceLoader.js')]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

随后在`package.json`文件添加`build`打包命令：
```js {2}
// 其它配置
"scripts": {
  "build": "webpack"
}
```

接下来在`src/index.js`文件中添加一行代码：这个文件使用最简单的例子，只是打印一句话。
```js
console.log('Webpack is good!');
```

最后就是在`loader/replaceLoader.js`编写我们自己`loader`文件中的代码：
::: tip 说明
* 编写`loader`时，`module.exports`是固定写法，并且它只能是一个普通函数，不能写箭头函数(`this`指向)
* `source`是打包文件的源文件内容
:::
```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  return source.replace('good', 'very good');
}
```

使用我们的`loader`: 要使用我们的`loader`，则需要在`modules`中写`loader`:
::: tip 理解
`resolveLoader`：它告诉了 Webpack 使用`loader`时，应该去哪些目录下去找，默认是`node_modules`，做了此项配置后，我们就不用去显示的填写其路径了，因为它会自动去`loaders`文件夹下面去找。
:::
```js {13}
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'replaceLoader',
          options: {
            name: 'wanghuayu'
          }
        }]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
最后我们运行`npm run build`，在生成的`dist`目录下打开`main.js`文件，可以看到文件内容已经成功替换了，说明我们的`loader`已经使用成功了。
```js
/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('Webpack is very good!');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
```


## 如何向Loader传参及返回多个值
::: tip 问题
* 我们如何返回多个值？
* 我们如何向自己的Loader传递参数？
:::

#### 如何返回多个值
::: tip 说明
Webpack 的 API允许我们使用`callback(error, result, sourceMap?, meta?)`返回多个值，它有四个参数：
* `Error || Null` ：错误类型， 没有错误传递`null`
* `result` ：转换后的结果
* `sourceMap`：可选参数，处理分析后的`sourceMap`
* `meta`: 可选参数，元信息
:::

返回多个值，可能有如下情况：
```js
// 第三，第四个参数是可选的。
this.callback(null, result);
```

#### 如何传递参数
我们知道在使用`loader`的时候，可以写成如下的形式：
```js
// options里面可以传递一些参数
{
  test: /\.js$/,
  use: [{
    loader: 'replaceLoader',
    options: {
      word: 'very good'
    }
  }]
}
```

再使用`options`传递参数后，我们可以使用官方提供的[loader-utils](https://github.com/webpack/loader-utils)来获取`options`参数，可以像下面这样写：
```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  var options = loaderUtils.getOptions(this);
  return source.replace('good', options.word)
}
```

## 如何在Loader中写异步代码
在上面的例子中，我们都是使用了同步的代码，那么如果我们有必须异步的场景，该如何实现呢？我们不妨做这样的假设，先写一个`setTimeout`：
```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  var options = loaderUtils.getOptions(this);
  setTimeout(() => {
    var result = source.replace('World', options.name);
    return this.callback(null, result);
  }, 0);
}
```
如果你运行了`npm run build`进行打包，那么一定会报错，解决办法是：使用`this.async()`主动标识有异步代码：
```js {4}
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  var options = loaderUtils.getOptions(this);
  var callback = this.async();
  setTimeout(() => {
    var result = source.replace('World', options.name);
    callback(null, result);
  }, 0);
}
```
至此，我们已经掌握了如何编写、如何引用、如何传递参数以及如何写异步代码，在下一小节当中我们将学习如何编写自己的`plugin`。
