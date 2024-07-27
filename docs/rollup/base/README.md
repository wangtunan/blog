# 基础配置

在开始之前，我们需要新建一个项目，并且创建一些必要的文件目录，如下：

```bash
|-- rollup-learn
|   |-- src
|   |   |-- index.js  # 入口文件
```
接着，在`src/index.js`文件撰写如下代码：
```js
// src/index.js
export function helloRollup () {
  console.log('hello, rollup')
}
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
    "dev": "rollup -w -c rollup.config.mjs",
    "build": "rollup -c rollup.config.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

打包参数说明：
* `-w`：全称`--watch`，表示监听代码变化，自动打包。
* `-c`: 全称`--config`，表示指明打包配置文件。

接着撰写`rollup.config.mjs`配置文件，如下：
::: tip
对于`.mjs`格式的配置文件，`Rollup`直接支持`import/export`语法，不需要额外转义。
:::
```js
export default {
  input: './src/index.js',
  output: [
    { file: 'dist/vue.cjs.js', format: 'cjs' },
    { file: 'dist/vue.esm.js', format: 'es' },
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' }
  ]
}
```
最后，安装依赖`Rollup`并执行打包命令:
```sh
# 安装依赖(rollup@4.x+版本)
$ npm install rollup --save-dev

# 运行打包命令
$ npm run build
```
运行完毕后，在`dist`目录下，会出现三个打包文件，目录结构如下：
```sh
|-- dist
|   |-- vue.js     // umd规范打包产物
|   |-- vue.cjs.js // commonjs规范打包产物
|   |-- vue.esm.js // esm规范打包产物
```

这样，我们的基础目录已经有了，在之后的小节中，所有案例均基于这个基础的目录结构。