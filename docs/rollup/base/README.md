# 基础配置

在介绍配置案例之前，我们需要新建一个项目，并且创建一些必要的文件目录，如下：

```bash
|-- rollup-learn
|   |-- src
|   |   |-- index.js  # 入口文件
```
然后使用如下命令创建一个`package.json`文件：
```bash
$ npm init -y
```
创建完毕后，再修改`package.json`，修改后如下：
```json
{
  "name": "rollup-learn",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "rollup -w -c rollup.config.js",
    "build": "rollup -c rollup.config.js"
  },
  "keywords": [],
  "author": "wangtunan",
  "license": "MIT"
}
```
这样，我们的基础目录已经有了，在之后的小节中，所有案例均基于这个基础的目录结构。

### 基础配置
根据之前的章节，我们需要安装一些`npm`包，如下：
```bash
# 安装rollup核心包
$ npm install rollup -D

# 安装rollup插件包
$ npm install @rollup/plugin-commonjs @rollup/plugin-node-resolve -D
```
随后，根目录新建`rollup.config.js`，并撰写如下内容：
```js
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' },
  ],
  plugins: [
    commonjs(),
    resolve()
  ]
}
```
然后，我们需要在入口文件撰写一些内容:
```js
export function add (a, b) {
  return a + b
}

export function minus (a, b) {
  return a - b
}
```
最后，运行我们在`package.json`文件中定义的`build`命令：
```bash
$ npm run build
```
运行完毕后，会在`dist`目录下生成三个文件，此时的文件目录结构如下：

```bash
|-- rollup-learn
|   |-- dist
|   |   |-- vue.js
|   |   |-- vue.common.js
|   |   |-- vue.esm.js
|   |-- src
|   |   |-- index.js
|   |-- rollup.config.js
|   |-- package.json
```
我们以`vue.esm.js`文件为例，其打包后的文件代码如下：
```js
function add (a, b) {
  return a + b
}

function minus (a, b) {
  return a - b
}

export { add, minus };
```
为了让我们`rollup`打包出来的库，能够支持`commonjs`和`esm`这两种方式引入，我们需要修改一下`package.json`，改动如下：
```json
{
  // ... 省略其它
  "main": "dist/vue.commin.js",
  "module": "dist/vue.esm.js",
  // ... 省略其它
}
```