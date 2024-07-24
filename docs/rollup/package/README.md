# 配置package.json
我们需要在`package.json`中配置如下信息：
```json
// package.json文件
{
  "main": "dist/vue.cjs.js",
  "module": "dist/vue.esm.js",
  "browser": "dist/vue.js",
  "files": [
    "dist"
  ]
}
```
