# Babel转义

在上一章节，我们提到了`@rollup/plugin-babel`这个插件，它是用来把`ES6`代码在打包的时候转义成`ES5`的。

下面详细介绍`Rollup`中如何进行`Babel`转义。

首先，需要我们安装几个`npm`包，如下：
```bash
# 安装rollup 相关插件包
$ npm install @rollup/plugin-commonjs -D
$ npm install @rollup/plugin-node-resolve -D
$ npm install @rollup/plugin-babel -D

# 安装babel相关包
$ npm install @babel/core @babel/preset-env -D
```

安装完毕后，需要在`rollup.config.mjs`中使用插件，如下：
```js
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  ...省略其它
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled'
    })
  ]
}
```

然后，需要在根目录下新建`.babelrc`文件，并撰写如下内容：
```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

为了测试是否正确的处理了`ES6`相关的代码，我们需要改动一下入口文件`src/index.js`，并添加如下两个函数:
```js
export const add = (a, b) => {
  return a + b
}

export const minus = (a, b) => {
  return a - b
}
```
最后，我们再次运行`npm run build`打包命令，查看`dist`目录下`vue.esm.js`文件打包后的代码。
```js
var add = function add(a, b) {
  return a + b;
};
var minus = function minus(a, b) {
  return a - b;
};

export { add, minus };
```

可以看到，`ES6`相关的代码已经被正确的转义了。
