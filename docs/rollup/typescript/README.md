# 支持TypeScript
如果要支持`TypeScript`，需要安装几个`npm`包，如下：
```bash
# 安装rollup插件和其依赖包
$ npm install @rollup/plugin-typescript tslib -D
```

安装完毕后，把`rollup.config.mjs`配置文件中，把入口文件改成改为`.ts`后缀并引入`typescript`插件：
```ts
// rollup.config.mjs
import typescript from '@rollup/plugin-typescript'

export default {
  ...省略其它
  input: './src/index.ts',
  plugins: [
    typescript()
  ]
}
```
接着，在`src`目录下新建`math.ts`文件，将`add`和`minus`方法移动过去并填写相关类型：
```ts
export const add = (a: number, b: number): number => {
  return a + b
}

export const minus = (a: number, b: number): number => {
  return a - b
}
```

最后，入口文件`src/index.js`改成`src/index.js`，并在其中引用`add和minus方法`：
```ts
// src/index.ts

import { add, minus } from './math'

export const helloRollup = (): void => {
  console.log(add(1, 2))
  console.log(minus(3, 4))
  console.log('hello, rollup')
}
```

运行`npm run build`命令，在`dist`目录下打包出来的`vue.esm.js`文件代码如下：
```js
var add = function (a, b) {
    return a + b;
};
var minus = function (a, b) {
    return a - b;
};

var helloRollup = function () {
    console.log(add(1, 2));
    console.log(minus(3, 4));
    console.log('hello, rollup');
};

export { helloRollup };
```