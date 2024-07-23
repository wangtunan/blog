# 支持TypeScript
如果要支持`TypeScript`，需要安装几个`npm`包，如下：
```bash
# 安装rollup插件
$ npm install rollup-plugin-typescript2 -D

# 安装ts相关包
$ npm install typescript tslib -D
```
安装完毕后，把入口文件后缀改为`.ts`，并且分别给`add`和`minus`这两个方法添加类型：
```ts
export const add = (a: number, b: number): number => {
  return a + b
}

export const minus = (a: number, b: number): number => {
  return a - b
}
```
最后，在`rollup.base.config.js`文件中使用`rollup`插件。
```js {4,12}
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    resolve(),
    babel(),
    typescript()
  ]
}
```
再次运行`npm run dev`或者`npm run build`后，在`dist`目录下查看打包后的源码，可以看到已经能正确识别`ts`代码了。
