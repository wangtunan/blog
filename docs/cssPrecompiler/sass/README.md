---
sidebar: auto
---
# SASS

## 介绍
`SASS` 是一款强化`CSS`的辅助工具，它在`CSS`语法的基础上增加了变量 (`variables`)、嵌套 (`nested rules`)、混合 (`mixins`)、导入 (`inline imports`) 等高级功能，这些拓展令`CSS`更加强大与优雅。

参考文档和链接地址：
* [SASS官网](https://sass-lang.com/documentation/)
* [SASS Playground](https://www.sassmeister.com/)

## 安装
你可以使用如下两种方式来学习体验`SASS`：
* 在线方式：[SASS Playground](https://www.sassmeister.com/) 提供即时编译结果，适合快速学习。
* 通过`sass`的`npm`包自主编译，适合深入学习(本篇文章采用方式，推荐)。

首先，你需要按照下面命令创建一个新的项目，然后使用`npm`命令初始化生成`package.json`文件，如下：
```sh
# 创建目录
$ mkdir sass-learn

# 使用默认配置，生成package.json文件
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
`SASS`允许将一套`CSS`样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理，例如：
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
基于嵌套规则，在`SASS`中有一个比较重要的选择器就是父级选择器(`&`)，在`SASS`中，它使用`&`代表外层的父级选择器，这让在复杂场景下重复父级选择器成为可能，例如：添加伪类，实现`BEM`等等。
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
.item {
  font-size: $font-size; // 16px
}
```
### 默认变量
有些时候，我们希望定义一些变量并给默认值，这样外部用户使用的时候，可以重新定义相同的变量，但变量的值由外部用户自己规定，此时可以使用默认变量`!default`：
```scss
$font-size: 14px !default;
$theme-color: #4093ff !default;

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
在一些组件库或者样式库中，几乎都允许用户自定义样式，其本质就是默认变量在起作用。

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

### list变量
`SASS`中的列表表示一系列值的集合，且定义列表的形式多种多样，如下：
1. 可以使用逗号或空格进行分隔：
```scss
$themes: primary, warning, danger;
$themes: primary warning danger;
```
2. 使用括号，中括号包裹，甚至不用包裹：
```scss
$themes: [primary, warning, danger];
$themes: (primary warning danger);
```
`list`列表可以使用`@each`进行迭代遍历，例如：
```scss
@each $theme in $themes {
  .button.is-#{$theme} {
    background: #58a;
  }
}

// 编译结果
.button.is-primary {
  background: #58a;
}
.button.is-warning {
  background: #58a;
}
.button.is-danger {
  background: #58a;
}
```

### map变量
`SASS`中的`map`和`list`列表有些相似，但在定义上有些区别，其格式如下：`(<key>: <value>, <key>: <value> ...)`，其中`key`必须唯一，且外部必须用括号包裹起来。

`map`同样可以通过`@each`来遍历，甚至可以进行解构：
```scss
$themes: (
  primary: '#409EFF',
  warning: '#E6A23C',
  danger: '#F56C6C'
);
// key解构赋值给theme, value解构赋值给$color
@each $theme, $color in $themes {
  .button.is-#{$theme} {
    background: $color;
  }
}

// 编译结果
.button.is-primary {
  background: "#409EFF";
}
.button.is-warning {
  background: "#E6A23C";
}
.button.is-danger {
  background: "#F56C6C";
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
需要`webpack`等打包工具的`loader`支持，例如`node-sass`和`sass-loder`，支持以后就可以直接使用：
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
5. 其它地方

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

`@debug`可以打印一些信息，在这调试一些表达式或变量值的时候非常有用。其打印的格式为：`fileName:lineNumber Debug: xxxxx`。其中`fileName`代表当前样式表的文件名，`lineNumber`表示当前打印的行数，`xxxx`表示我们想要打印的值，例如：
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
`@warn`和`@error`通常用来对外部传入的值进行校验，看是否符合规范，如果不符合则提示警告信息和报错信息，例如：
```scss
@mixin position($name, $position, $topOrBottom, $leftOrRight) {
  @if $position != 'relative' and $position != 'absolute' {
    @warn 'position must be relative or absolute'
  };
  @if $topOrBottom != 'top' and $topOrBottom != 'bottom' {
    @error 'topOrBottom must be top or bottom'
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
Error: "topOrBottom must be top or bottom"
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

### @each
::: tip
`SASS`中的`@each`和`JavaScript`的`forEach()`类似。
:::
`SASS`中的`@each`通常是用来迭代一个`list`或者`map`的，其公式为：`@each <variable> in <expression>`。
```scss
// 这是一个list列表
$sizes: 10px, 20px, 30px, 40px;

@each $size in $sizes {
 .box-#{$size} {
    width: $size;
    height: $size;
  }
}
```
编译结果为：
```scss
.box-10px {
  width: 10px;
  height: 10px;
}
.box-20px {
  width: 20px;
  height: 20px;
}
.box-30px {
  width: 30px;
  height: 30px;
}
.box-40px {
  width: 40px;
  height: 40px;
}
```
`@each`也可以用来迭代`key/value`形式的`map`结构，例如：
```scss
$sizeMap: (
 h1: 20px,
 h2: 16px,
 h3: 14px 
);

@each $el, $size in $sizeMap {
  #{$el} {
    font-size: $size;
  }
}
```
编译结果为：
```scss
h1 {
  font-size: 20px;
}
h2 {
  font-size: 16px;
}
h3 {
  font-size: 14px;
}
```
甚至可以用来解构，例如：
```scss
$statusList: 
  (text, text, '#333'),
  (button, pointer, '#ccc'),
  (div, move, '#0000')
;

@each $el, $pointer, $color in $statusList {
  .is-#{$el} {
    cursor: $pointer;
    color: $color;
  }
}
```
编译结果为：
```scss
.is-text {
  cursor: text;
  color: "#333";
}
.is-button {
  cursor: pointer;
  color: "#ccc";
}
.is-div {
  cursor: move;
  color: "#0000";
}
```

### @for
`SASS`中的`@for`同样可以用来迭代，但它只能限制在一定的范围内，通常用来重复生成相同或者类似的样式，其公式有如下两种：
1. `@for <variable> from <expression> to <expression>`，不包含最后一个值，类似于`[)`。
2. `@for <variable> from <expression> through <expression>`，包含最后一个值，类似于`[]`。

```scss
// 不包含3
@for $i from 1 to 3 {
  .item-#{$i} {
    background-color: #58a;
    font-size: 12px * $i;
  }
}
```
编译结果为：
```scss
.item-1 {
  background-color: #58a;
  font-size: 12px;
}
.item-2 {
  background-color: #58a;
  font-size: 24px;
}
```

### @mixin和@include
`SASS`中的`@mixin`和`@include`经常配对使用的，`@mixin`负责定义，`@include`负责引用。

`@mixin`一般是用来定义一些经常会用到的代码，例如：`ellipsis`和`clearfix`等。
```scss
@mixin ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@mixin clearfix {
  &::before,
  &::after {
    display: table;
    content: "";
  }
  &::after {
    clear: both
  }
}
```
`@mixin` 也可以用来接收参数，甚至参数还可以使用默认值，当给参数定义默认值时，表示此参数为可选参数：
```scss
// PC端版心mixin
@mixin pc-center($margin: 0, $width: 1200px) {
  margin: $margin auto;
  width: $width;
}

.box1 {
  // 使用参数默认值
  @include pc-center;
}
.box2 {
  // 自定义参数
  @include pc-center(10px, 1000px);
}
```
在`@mixin`中，也可以接收外部的内容，用`@content`来表示，例如：
```scss
@mixin btn-hover {
  :not(.is-disabled):hover {
    @content;
  }
}

.button {
  @include btn-hover {
    border-width: 2px;
  }
}
```
编译结果为：
```scss
.button :not(.is-disabled):hover {
  border-width: 2px;
}
```

### @extend
个人不建议在项目中使用😒，你可以点击[链接](https://sass-lang.com/documentation/at-rules/extend)去官网学习这部分的内容。

### @function
`SASS`中的`@function`允许我们在值的基础上进行复杂的计算，其格式为`@function <name>(<arguments...>) { ... }`。
```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px; // 64px
}
```
与`mixin`类似，`@function`也支持参数默认值以及`参数收缩`，例如：
```scss
@function sum($numbers...) {
  $result: 0;
  @each $number in $numbers {
    $result: $result + $number
  }
  @return $result;
}

.sidebar {
  float: left;
  width: sum(10px, 20px, 30px); // 60px
}
```

### @import
`@import`最常见的用法是引入一个`.scss`文件，例如：
```vue
<style lang="scss" scoped>
  @import './index.scss';
</style>
```
当然，也可以在嵌套规则中使用`@import`，例如：
```scss
// dark.scss
div {
  background-color: #333;
  color: #fff;
}

.box.is-dark {
  @import './dark.scss';
}
```
编译结果为：
```scss
.box.is-dark div {
  background-color: #333;
  color: #fff;
}
```

### @use
`SASS`中的`@use`可以加载其他`scss`样式表中的`mixins`，`fucntions`和`variables`，同时可以对加载的模块做一些其他额外的事情。
```scss
// dark.scss文件
div {
  background-color: #333;
  color: #fff;
}

// 此处的use仅仅只是把`dark.scss`中的代码合并到当前样式表中，和`@import`的作用一样。
@use 'dark';
.box {
  background-color: #58a;
}
```
编译结果：
```scss
div {
  background-color: #333;
  color: #fff;
}
.box {
  background-color: #58a;
}
```
`@use`可以在引入的时候可以做一些额外的事情，例如使用自定义命名空间：
```scss
// mixins.scss
@mixin ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

// index.scss
@use 'mixins.scss' as mix // 默认的命名空间为mixins
.box {
  @include mix.ellipsis;
}
```
`@use`也可以对加载的模块进行配置，例如：
```scss
// mixins.scss
$defaultLine: 2;
@mixin multline-ellipsis($line: $defaultLine) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line;
  text-overflow: ellipsis;
  overflow: hidden;
}

// index.scss
@use 'mixins.scss' as mix with (
  $defaultLine: 3
);
.box {
  @include mix.multline-ellipsis;
}
```
编译结果为：
```scss
.box {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

### @at-root
`@at-root`的作用通常使用来把样式置顶到当前样式表文档的根部，这在一些嵌套样式中有时候非常有用，例如：
```scss
@mixin parent-root($child) {
  @at-root .box-#{$child} {
    @content;
  }
}
@mixin parent($child) {
  .box-#{$child} {
    @content;
  }
}

// 使用at-root
.wrapper {
  .box {
    @include parent-root("input") {
      font-size: 14px;
    }
    @include parent-root("select") {
      font-size: 16px;
    }
  }
}

// 不使用at-root
.wrapper {
  .box {
    @include parent("input") {
      font-size: 14px;
    }
    @include parent("select") {
      font-size: 16px;
    }
  }
}
```
以上代码编译结果为：
```scss
// 使用at-root编译结果
.box-input {
  font-size: 14px;
}
.box-select {
  font-size: 16px;
}

// 不使用at-root编译结果
.wrapper .box .box-input {
  font-size: 14px;
}
.wrapper .box .box-select {
  font-size: 16px;
}
```





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

## 在js中编译SASS

## SASS命令行指令

