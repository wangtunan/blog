# Babel
为了让库文件具有更好的兼容性，需要把`ES6`代码在打包的时候转义成`ES5`。

要做到这一步，需要我们安装几个`npm`包，如下：
```bash
# 安装rollup插件包
$ npm install @rollup/plugin-babel -D

# 安装babel相关包
$ npm install @babel/core @babel/preset-env -D
```

安装完以上`npm`包后，需要在`rollup.config.js`中使用`babel`插件，如下：
```js {3,15}
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/vue.js', format: 'umd', name: 'Vue' },
    { file: 'dist/vue.common.js', format: 'cjs', name: 'Vue', exports: 'auto' },
    { file: 'dist/vue.esm.js', format: 'es', name: 'Vue' },
  ],
  plugins: [
    commonjs(),
    resolve(),
    babel()
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

为了测试是否正确的处理了`ES6`相关的代码，我们需要改动一下入口文件`index.js`:
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
