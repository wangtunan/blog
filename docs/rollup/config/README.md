# 配置项类型提示
为了方便在写`Rollup`配置项时，有充足的`ts`类型提示，可使用如下两种方式：

第一种：`JSDoc`形式，如下：
```js
// rollup.config.mjs
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  ...省略
}
```

第二种，使用`Rollup`提供的`defineConfig`方法，如下：
```js
// rollup.config.mjs
import { defineConfig } from 'rollup'
export default defineConfig({
  ...省略
})
```

以上仅列举官方提供的两种方式，你可以点击[Rollup配置智能提示](https://cn.rollupjs.org/command-line-interface/#config-intellisense)了解更多。