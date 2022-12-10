---
sidebar: auto
---
# SASS

## 介绍
`Sass` 是一款强化`CSS`的辅助工具，它在`CSS`语法的基础上增加了变量 (`variables`)、嵌套 (`nested rules`)、混合 (`mixins`)、导入 (`inline imports`) 等高级功能，这些拓展令`CSS`更加强大与优雅。使用`Sass`以及`Sass`的样式库（如 `Compass`）有助于更好地组织管理样式文件，以及更高效地开发项目。

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
`Sass`允许将一套`CSS`样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理，例如：
```scss
.box {
  background-color: #fff;
  .item {
    background-color: #58a
  }

  p, span {
    font-size: 16px;
  }
}
```
编译结果为：
```scss
.box {
  background-color: #fff;
}
.box .item {
  background-color: #58a;
}
.box p, .box span {
  font-size: 16px;
}
```

### 父级选择器(&)
基于嵌套规则，在`SASS`中有一个比较重要的选择器就是父级选择器(`&`)，在`SASS`中，它实用`&`代表外层的父级选择器，这让在复杂场景下重复父级选择器成为可能，例如：添加伪类，实现`BEM`等等。
```scss
.box {
  &::after {
    content: '';
    display: inline-block;
    width: 100px;
    height: 3px;
  }
  &__item {
    background-color: #58a;
    &--title {
      font-size: 16px;
    }
  }
  &__row {
    background-color: #f60;
  }
}
```
编译生成：
```scss
.box::after {
  content: "";
  display: inline-block;
  width: 100px;
  height: 3px;
}
.box__item {
  background-color: #58a;
}
.box__item--title {
  font-size: 16px;
}
.box__row {
  background-color: #f60;
}
```

### 占位符选择器(%)
当我们在撰写一些样式库的时候，有些样式我们并不关心具体的样式名，只关心样式的内容，此时可以通过占位符选择器(%)来实现。

占位符选择器的好处是：
* 在不通过`@extend`引用的时候不会编译到最终的`css`代码中。
* 不用强制外部用户遵循样式库的样式命名。
```scss
%ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: no-wrap;
}

// 不引用，占位符代码不编译
.title {
  font-size: 14px;
}

// 引用，占位符代码编译
.title {
  @extend %ellipsis;
  font-size: 14px;
}
```

## 变量
`SASS`中定义变量的公式如下：
```scss
// $符号固定，variables为变量名，expression为表达式
$<variables>: <expression>;

$font-size-medium: 32px / 2;     // 16px
$font-size-normal: 12px + 2px;   // 14px
$font-size-small: 12px;          // 12px
```
::: warning 注意
`SASS`中的变量是命令式的，意味着你在修改变量前后，值可能不相同的。
:::
```scss
$font-size: 14px;

.box {
  font-size: $font-size; // 14px
}

// 修改值
$font-size: 16px;
.box {
  font-size: $font-size; // 16px
}
```
### 默认变量
有些时候，我们希望定义一些变量并给默认值，这样外部用户使用的时候，可以重新定义相同的变量，但变量的只由外部用户自己规定，此时可以使用默认变量`!default`：
```scss
// variables.scss
$font-size: 14px!default;
$theme-color: #4093ff!default;

// 使用默认
.box {
  font-size: $font-size;          // 14px;
  background-color: $theme-color; // #4093ff;
}

// 自己定义
$font-size: 16px;
$theme-color: #58a;
.box {
  font-size: $font-size;          // 16px
  background-color: $theme-color; // #58a;
}
```
在一些组件库或者样式库中，都允许用户自定义样式，其本质就是默认变量的作用。
### 局部变量
因为`SASS`允许嵌套规则，所以变量也可以定义在嵌套规则中。当在嵌套规则中定义一个变量时，此变量的访问范围只存在于此规则内，对于外部不可见，例如：
```scss
.box {
  .item {
    $font-size: 16px;
    font-size: $font-size; // 16px;
  }
  .row {
    font-size: $font-size; // error Undefined variable
  }
}
```
对于嵌套规则中相同命名的变量，内层的变量会**遮蔽**外层的变量，例如：
```scss
.box {
  $font-size: 14px;
  .item {
    $font-size: 16px;
    font-size: $font-size; // 16px;
  }
}
```
::: warning 注意
在一些流程控制语句中，变量没有遮蔽效果
::: 
```scss
$is-active: true !default;
$font-size: 14px;
$theme-color:#4093ff;

@if $is-active {
  $font-size: 16px;
  $theme-color:#f60;
}

.box {
  font-size: $font-size;          // 16px
  background-color: $theme-color; // #f60
}
```

### 变量导出
`SASS`中的变量，也可以在`js`中访问，例如：
```scss
// variables.scss
$font-size: 14px;
$theme-color:#4093ff;

:export {
  fontSize: $font-size;
  themeColor: $theme-color;
}
```
需要`webpack`打包工具的`loader`支持，例如`node-sass`和`sass-loder`，支持以后就可以直接使用：
```js
import vars from 'variables.scss';

console.log(vars.fontSize)    // '14px'
console.log(vars.themeColor)  // '#4093ff'
```

## 差值语法
差值语法，格式是：`#{expresssion}`，它几乎可以用在`SASS`中任何地方，例如：
1. 样式规则的选择器
2. 属性名称
3. 变量
4. 注释
5. 其它



```scss
@mixin position($name, $position, $topOrBottom, $leftOrRight) {
  #{$name}.is-#{$position} {
    position: $position;
    #{$topOrBottom}: 0;
    #{$leftOrRight}: 0;
  }
}

@include position('.box', 'absolute', 'top', 'left');
```
以上代码编译成：
```scss
.box.is-absolute {
  position: "absolute";
  top: 0;
  left: 0;
}
```

## @规则
### @debug、@error和@warn
::: tip
`SASS`中的`@debug`、`@error`、`@warn`分别和`JavaScript`中的`console.log()`、`console.error()`、`console.warn()`类似。
:::

`@debug`可以打印一些信息，在这调试一些表达式或变量值的时候非常有用。其打印的格式为：`fileName:lineNumber Debug: xxxxx`。其中`fileName`代表当前样式表的文件名，`lineNumber`表示当前打印的行数，`xxxx`内容表示我们想要打印的值，例如：
```scss
@mixin position($name, $position, $topOrBottom, $leftOrRight) {
  @debug $name, $position;
  #{$name}.is-#{$position} {
    position: $position;
    #{$topOrBottom}: 0;
    #{$leftOrRight}: 0;
  }
}
@include position('.box', 'absolute', 'top', 'left');

// 打印内容
index.scss:2 Debug: ".box", "absolute"
```
`@warn`和`@error`通常用来对外部传入的值进行校验，看是否符合规范，如果不符合咋提示警告信息和报错信息，例如：
```scss
@mixin position($name, $position, $topOrBottom, $leftOrRight) {
  @if $position != 'relative' and $position != 'absolute' {
    @warn 'position must be relative or absolute'
  };
  @if $topOrBottom != 'top' and $topOrBottom != 'bottom' {
    @error 'topOrBottom must be left or right'
  };
  #{$name}.is-#{$position} {
    position: $position;
    #{$topOrBottom}: 0;
    #{$leftOrRight}: 0;
  }
}
@include position('.box', 'fixed', 'top1', 'left');

// 警告内容
Warning: position must be relative or absolute
// 报错内容
Error: "topOrBottom must be left or right"
```
### @if和@else
`SASS`中的`@if/@else`和`JavaScript`中的`if/else`规则是一样的，例如：
```scss
@mixin triangle($size, $color, $direction) {
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: calc($size / 2);

  @if $direction == 'top' {
    border-top-color: $color;
  } @else if ($direction == 'bottom') {
    border-bottom-color: $color;
  } @else if ($direction == 'left') {
    border-left-color: $color;
  } @else if ($direction == 'right') {
    border-right-color: $color;
  } @else {
    @warn 'direction must be top, bottom, left or right'
  }
};

.box {
  @include triangle(10px, '#f60', 'right');
}
```
`@if`和`@else if`也能使用`SASS`中的`not`、`or`和`and`，例如：
```scss
@mixin triangle($size, $color, $direction) {
  $directions: top, bottom, left, right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: calc($size / 2);

  @if not index($directions, $direction) {
    @warn 'direction must be top, bottom, left or right'
  } @else {
    border-#{$direction}-color: $color;
  }
};

.box {
  @include triangle(10px, '#f60', 'right');
}
```
以上代码编译结果均为：
```scss
.box {
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-right-color: "#f60";
}
```

### @each和@for
### @mixin和@include
### @extend
### @function

### @import
### @use
### @forward



### @at-root


## 值类型
### Numbers
### Strings
### Colors
### Lists
### Maps
### Boolean
### null

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

