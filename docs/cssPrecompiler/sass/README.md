---
sidebar: auto
---
# SASS

## 介绍
Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。

参考文档和链接地址：
* [SASS官网](https://sass-lang.com/documentation/)
* [SASS Playground](https://www.sassmeister.com/)

## 安装
你可以使用如下两种方式来体验学习SASS：
* 在线方式：[SASS Playground](https://www.sassmeister.com/) 提供即时编译结果，适合快速学习。
* 通过`sass`的`npm`包自主编译，适合深入学习。

在本篇文章中，采用第二种方式。
首先，你需要按照下面命令创建一个新的项目，然后使用`npm`命令初始化生成`package.json`文件，如下：
```sh
# 创建目录
$ mkdir sass-learn

# 使用默认配置生成package.json文件
$ npm init -y
```
执行完以上命令后，代码结构如下所示：
```sh
|-- sass-learn
|   |-- package.json
```
接着，通过编辑器终端安装`sass`：
```sh
# 安装sass
$ npm install sass
```
紧接着，在`package.json`文件中添加两个命令，如下：
```json
// dev为本地开发命令，--watch是监听文件变化，自动编译
// build为正式打包命令
{
  "scripts": {
    "dev": "npx sass index.scss output.css --watch",
    "build": "npx sass index.scss index.css"
  }
}
```
然后，在项目中创建`index.scss`，并撰写如下内容：
```scss
.box {
  color: red;
}
```
最后，运行如下命令，进入本地开发模式：
```sh
$ npm run dev
```
此时完整目录结构如下所示：
```sh
|-- sass-learn
|   |-- index.scss
|   |-- output.css
|   |-- output.css.map
|   |-- package.json
```

## Scss还是Sass
`SASS`支持两种不同的语法，分别是文件后缀为`.scss`和`.sass`，这两种语法功能一样，只是风格不同。
```scss
// .scss语法：有括号，有分号
.box {
  button {
    outline: none;
    border: 1px solid #ccc;
  }
}

// .sass缩进语法：无括号，无分号，只有缩进和换行
.box
  button
    outline: none
    border: 1px solid #ccc
```
所以叫`scss`还是`sass`其实都一样，具体如何使用根据个人喜好而言。

## 基本语法

### 注释
`SASS`中的注释一般有两种，`//`和`/**/`，例如：
```scss
// 不会出现在编译内容中的注释
/* 除压缩模式以外都出现的注释  */
.box {
  color: red;
}
```
其中，`/**/`还有另外一种用法，通常用来在样式文件中显示版权信息。
```scss
/*! 始终存在的注释，即使是压缩模式，通常用来撰写版权信息  */
/*! copyright by wangtunan */
.box {
  color: red;
}
```

### 嵌套

### 父级选择器(&)

### 变量

## 差值语法

## @规则
### @use
### @forward
### @import
### @mixin和@include
### @function
### @extend
### @at-root
### @if和@else
### @each和@for
### @debug、@error和@warn

## 值类型
### Numbers
### Strings
### Colors
### Lists
### Maps
### Boolean
### null

## 操作符和计算

### 数字类
### 布尔类
### 字符串类
### 关系类

## 内置模块
### color
### list
### map
### math
### meta
### selector
### string

## 实践案例

### 封装实用的mixins
### 实现响应式函数
### element组件库BEM解析和实现

## 在js中编译SCSS

## 命令行指令

