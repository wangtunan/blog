
# 起步

## 创建项目结构
现在我们来创建基本的项目结构，它可能是下面这样
``` sh
|-- webpack-vuepress
|   |-- index.html
|   |-- index.js
|   |-- package.json
```
其中`package.json`是利用下面的命令自动生成的配置文件
``` sh
$ npm init -y
```


## 添加基础代码
在创建了基本的项目结构以后，我们需要为我们创建的文件添加一些代码<br>

`index.html`页面中的代码：
```html
<p>这是最原始的网页内容</p>
<div id="root"></div>
<!-- 引用打包后的js文件 -->
<script src="./dist/main.js"></script>
```
`index.js`文件中的代码：
```js
console.log('hello,world');
```

## 安装Webpack
运行如下命令安装`webpack4.0+`和`webpack-cli`：
```sh
$ npm install webpack webpack-cli -D
```

## 添加配置文件
使用如下命令添加 Webpack 配置文件：
```sh
$ touch webpack.config.js
```
使用此命令，变更后的项目结构大概如下所示：
```sh
|-- webpack-vuepress
|   |-- index.html
|   |-- index.js
|   |-- webpack.config.js
|   |-- package.json
```

至此我们的基础目录已创建完毕，接下来需要改写`webpack.config.js`文件，它的代码如下：
::: tip 解释
1. `entry`配置项说明了`webpack`打包的入口文件。
2. `output`配置项说明了`webpack`输出配置：`filename`配置了打包后的文件叫`main.js`
3. `path`配置了打包后的输出目录为`dist`文件夹下
:::
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

## 改写package.json文件
::: tip 改写说明
1. 添加`private`属性并设置为`true`：此属性能让我们的项目为私有的，防止意外发布代码
2. 移除`main`属性：我们的项目并不需要对外暴露一个入口文件
3. 添加`scripts`命令：即我们的打包命令
:::
改写后的`package.json`文件如下所示：
```json {5,7}
{
  "name": "webpack-vuepress",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "bundle": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2"
  }
}
```

## 第一次打包
::: tip 命令说明
`npm run`代表运行一个脚本命令，而`bundle`就是我们配置的打包命令，即`npm run bundle`就是我们配置的`webpack`打包命令。
:::
运行如下命令进行项目打包：
```sh
$ npm run bundle
```
打包后的效果如下所示：

![第一次打包后的效果](../../images/webpack/5.png)

打包后的项目目录如下所示，可以看到我们多出了一个叫`dist`的目录，它里面有一个`main.js`文件
``` sh
|-- webpack-vuepress
|   |-- dist
|   |   |-- main.js
|   |-- index.html
|   |-- index.js
|   |-- webpack.config.js
|   |-- package.json
```
打包成功后，我们需要在浏览器中运行`index.html`，它的运行结果如下图所示：

![第一次打包后的效果](../../images/webpack/6.png)

## 理解webpack打包输出
在前面，我们第一次运行了一个打包命令，它在控制台上有一些输出内容，这一节我们详细来介绍这些输出是什么意思：

![第一次打包后的效果](../../images/webpack/5.png)

1. **Hash：** `hash`代表本次打包的唯一`hash`值，每一次打包此值都是不一样的

2. **Version：** 详细展示了我们使用`webpack`的版本号

3. **Time：** 代表我们本次打包的耗时

4. **Asset：** 代表我们打包出的文件名称

5. **Size：** 代表我们打包出的文件的大小

6. **Chunks：** 代表打包后的`.js`文件对应的`id`，`id`从`0`开始，依次往后`+1`

7. **Chunks Names：** 代表我们打包后的`.js`文件的名字，至于为何是`main`，而不是其他的内容，这是因为在我们的`webpack.config.js`中，`entry:'./index.js'`是对如下方式的简写形式：
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  // entry: './index.js',
  entry: {
    main: './index.js'
  }
  // 其它配置
}
```
8. **Entrypoint main = bundle.js：** 代表我们打包的入口为`main`

9. **warning in configuration：** 提示警告，意思是我们没有给`webpack.config.js`设置`mode`属性，`mode`属性有三个值：`development`代表开发环境、`production`代表生产环境、`none`代表既不是开发环境也不是生产环境。如果不写的话，默认是生产环境，可在配置文件中配置此项，配置后再次打包将不会再出现此警告。
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  // 其它配置
  mode: 'development'
}
```

