# 追本溯源
在学习 Webpack 之前，我们有必要来了解一下前端领域的开发历程，只有明白了这些开发历程，才能更加清楚 Webpack 是怎么应运而生，又能给我们解决什么样的问题。

## 面向过程开发
**特征：** 一锅乱炖<br/>
在早期 `js` 能力还非常有限的时候，我们通过面向过程的方式把代码写在同一个`.js`文件中，一个面向过程的开发模式可能如下所示。<br/>
```html
<!-- index.html代码 -->
<p>这里是我们网页的内容</p>
<div id="root"></div>
<script src="./index.js"></script>
```
```js
// index.js代码
var root = document.getElementById('root');

// header模块
var header = document.createElement('div');
header.innerText = 'header';
root.appendChild(header);

// sidebar模块
var sidebar = document.createElement('div');
sidebar.innerText = 'sidebar';
root.appendChild(sidebar);

// content模块
var content = document.createElement('div');
content.innerText = 'content';
root.appendChild(content);
```

## 面向对象开发
**特征：** 面向对象开发模式便于代码维护，深入人心。<br/>
随着 `js` 的不断发展，它所能解决的问题也越来越多，如果再像**面向过程**那样把所有代码写在同一个`.js`文件中，那么代码将变得非常难以理解和维护，此时**面向对象**开发模式便出现了，一个面向对象开发模式可能如下所示。<br/>


在`index.html`中引入不同的模块：
```html
<!-- index.html代码 -->
<p>这里是我们网页的内容</p>
<div id="root"></div>
<script src="./src/header.js"></script>
<script src="./src/sidebar.js"></script>
<script src="./src/content.js"></script>
<script src="./index.js"></script>
```

`header.js`代码：
```js
// header.js代码
function Header() {
  var header = document.createElement('div');
  header.innerText = 'header';
  root.appendChild(header);
}
```

`sidebar.js`代码：
```js
// sidebar.js代码
function Sidebar() {
  var sidebar = document.createElement('div');
  sidebar.innerText = 'sidebar';
  root.appendChild(sidebar);
}
```

`content.js`代码：
```js
// content.js代码
function Content() {
  var content = document.createElement('div');
  content.innerText = 'content';
  root.appendChild(content);
}

```
`index.js`代码：
```js
var root = document.getElementById('root');
new Header();
new Sidebar();
new Content();
```

**不足：** 以上的代码示例中，虽然使用**面向对象**开发模式解决了**面向过程**开发模式中的一些问题，但似乎又引入了一些新的问题。<br/>
1. 每一个模块都需要引入一个`.js`文件，随着模块的增多，这会影响页面性能。
2. 在`index.js`文件中，并不能直接看出模块的逻辑关系，必须去页面才能找到。
3. 在`index.html`页面中，文件的引入顺序必须严格按顺序来引入，例如：`index.js`必须放在最后引入，如果把`header.js`文件放在`index.js`文件后引入，那么代码会报错。


## 现代开发模式
**特征：** 模块化加载方案让前端开发进一步工程化。<br>
根据**面向对象**开发模式中的一系列问题，随后各种**模块化**加载的方案如雨后春笋，例如：`ES Module`、`AMD`、`CMD`以及`CommonJS`等，一个`ES Module`模块化加载方案可能如下所示。<br/>

`index.html`代码：
```html
<!-- index.html代码 -->
<p>这里是我们网页的内容</p>
<div id="root"></div>
<script src="./index.js"></script>
```
`header.js`代码：
```js
// header.js
export default function Header() {
  var root = document.getElementById('root');
  var header = document.createElement('div');
  header.innerText = 'header';
  root.appendChild(header);
}
```
`sidebar.js`代码：
```js
// sidebar.js
export default function Sidebar() {
  var root = document.getElementById('root');
  var sidebar = document.createElement('div');
  sidebar.innerText = 'sidebar';
  root.appendChild(sidebar);
}
```
`content.js`代码：
```js
// content.js代码
export default function Content() {
  var root = document.getElementById('root');
  var content = document.createElement('div');
  content.innerText = 'content';
  root.appendChild(content);
}
```
`index.js`代码：
```js
// index.js代码
import Header from './src/header.js';
import Sidebar from './src/sidebar.js';
import Content from './src/content.js';

new Header();
new Sidebar();
new Content();
```
**注意：** 以上代码并不能直接在浏览器上执行，因为浏览器并不能直接识别`ES Module`代码，需要借助其他工具来进行翻译，此时 Webpack 就“粉墨登场”了。

## Webpack初体验

不建议跟随此小结一起安装，此次示例仅仅作为一个例子，详细学习步骤请直接阅读下一章节[安装](/webpack/#安装)


#### 生成package.json文件
::: tip 参数说明
`-y`参数表示直接生成默认配置项的`package.json`文件，不加此参数需要一步步按需进行配置。
:::
```sh
$ npm init -y
```
生成的`package.json`文件：
```json
{
  "name": "webpack-vuepress",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

#### 安装Webpack
::: tip 参数说明
`-D`参数代表在本项目下安装 Webpack ，它是`--save-dev`的简写
:::
```sh
$ npm install webpack webpack-cli -D
```

#### 修改代码
::: tip 配置说明
`webpack`默认打包路径到`dist`文件夹，打包后的`.js`文件名字叫`main.js`
:::
其他代码不动，将`index.html`中的`.js`文件改成如下引用方式(引用打包后的文件)：
```html
<!-- index.html代码 -->
<p>这里是我们网页的内容</p>
<div id="root"></div>
<script src="./dist/main.js"></script>
```
#### Webpack打包
::: tip 参数说明
1. `npx webpack`代表在本项目下寻找 Webpack 打包命令，它区别于`npm`命令
2. `index.js`参数代表本次打包的入口是`index.js`
:::
``` sh
$ npx webpack index.js
```
打包结果：

![webpack打包结果](../../images/webpack/2.png)

正如上面你所看到的那样，网页正确显示了我们期待的结果，这也是 Webpack 能为我们解决问题的一小部分能力，下面将正式开始介绍 Webpack 。
