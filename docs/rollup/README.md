---
sidebar: auto
---

# Rollup
`rollup`它是一个类似于`webpack`的打包工具，区别于`webpack`，它更适合一个`Library`库的打包。

## 基本概念

同`webpack`一样，`rollup`也有以下几大核心概念：
* `input`：入口文件，类比于`webpack`的`entry`，它指明了我们库文件入口位置。
* `output`：输出位置，它指明了打包后的输出信息，包括：输出目录，打包文件名等。
* `plugins`：插件，`rollup`在构建过程中，插件可提供一些辅助功能，例如：`alias`别名解析、转义`ES6`等。
* `external`：当我们的库依赖于其它第三方库时，我们不需要把这些第三方库一起打包，而是应该把依赖写在`external`里面。


## 常用插件

## 基础配置

## 配置案例