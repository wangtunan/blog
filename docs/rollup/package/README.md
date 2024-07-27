# 配置package.json
我们需要在`package.json`中配置如下信息：
```json
// package.json文件
{
  "main": "dist/vue.cjs.js",   // commonjs规范引入
  "module": "dist/vue.esm.js", // esm规范引入
  "browser": "dist/vue.js",    // script引入
  "types": "dist/vue.d.ts",    // ts类型定义文件
  "files": [
    "dist"
  ]
}
```
以上配置具体含义如下：
* `main`: 指明`commonjs`规范引入时的入口文件，例如：`require(xxx)`。
* `module`: 指明`esm`规范引入时的入口文件，例如：`import xxx from 'xxx'`。
* `browser`: 指明浏览器`script`脚本引入时的入口文件，例如`<script src="xxxx"></script>`
* `types`: 如果库提供了`ts`类型定义，一般需要配置`types`选项。
* `files`: 配置`npm install`时，拉取的文件。以上配置后，在`node_modules`文件下，其安装文件目录如下：
```sh
|-- node_modules
|  |-- vue
|  |  | -- dist
|  |  |  |-- vue.cjs.js
|  |  |  |-- vue.esm.js
|  |  |  |-- vue.c.js
|  |  |  |-- index.d.ts
|  |  | -- package.json
```
