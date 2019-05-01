# VuePress
## 介绍

### 如何而来
VuePress 是一个**静态网站生成器**，使用它我们一方面可以专注输出技术类文档，也可以使用基于Vue的开发方式来开发我们的其他静态网站。<br/>
每一个由 VuePress 生成的静态页面都是经过服务端渲染(SSR)而来，因此由 VuePress 生成的页面在加载性能和搜索引擎优化(SEO)上有很明显的优势。


### 组成部分
通常而言，一个由 VuePress 生成的网站，它是用过`Vue`、`Vue-router`、`Webpack`以及利用服务端渲染(`SSR`)而来，它不仅支持 Vue 组件的写法，还内置 `Stylus` 语法。

## 安装
::: warning 注意
请确认Node.js >= 8
:::

### 全局安装(推荐)
通常而言，全局安装 VuePress 会非常省心，可以通过如下命令进行全局安装
``` sh
$ npm install -g vuepress
```
### 本地安装
区别于全局安装，本地安装会把`npm`包安装在本项目上，生成一个叫`node_modules`目录，可以通过如下命令进行本地安装（需同时安装`vuepress`和`webpack-dev-middleware`）
``` sh
$ npm install vuepress webpack-dev-middleware --save-dev
```

## 基本配置
::: tip 提醒
基本配置下的内容适用于 VuePress 的默认主题，对于自定义主题配置可能会不太一样
:::

### 项目目录
VuePress 作为一个静态网站生成器，它对于项目的目录是有一定的限制的，一个基本的项目结构如下所示
``` js
|-- docs // 特定的目录
    |-- README.md // 首页
    |-- .vuepress // 特定的目录
        |-- config.js // 特定的配置文件
|-- package.json // 打包命令
```
### 首页
默认主题提供了一个首页(`HomePage`)，即上面目录结构中的`README.md`文件中的内容，首页是可选的，对于 VuePress 中默认主题的首页，我们可以进行如下配置
``` yaml
---
home: true
lang: zh-CN
heroText: A  Personal Blog
heroImage: /logo.jpg
actionText: 开始 →
actionLink: /interview/
features:
- title: A Blog
  details: 专注写作前端博客，记录日常所得。
- title: For Me
  details: 故九万里，则风斯在下矣，而后乃今培风；背负青天，而莫之夭阏者，而后乃今将图南。
- title: For Interview
  details: 广州，已入坑ღ( ´･ᴗ･` )比心
footer: Copyright © 2019-present Wangtunan
---
```
以上配置即为本博客的首页效果
![vuepress首页效果](../images/vuepress/1.png)

#### 首页配置说明
在首页的`YAML`格式配置中，我们填写了一些配置，下面我们将详细描述每一个配置的具体含义：
* `home:true`：标记此页面是否为首页
* `lang:zh-CN`：表示本页面的语言为zh-CN(简体中文)
* `heroText`: 首页的标题内容
* `heroImage`: 首页的标题图片，其中全路径为`docs/.vuepress/public/logo.jpg`，默认去`public`目录下找静态资源
* `actionText`: 首页跳转按钮的内容
* `actionLink`: 首页跳转按钮挑战的路径，其中全路径为`docs/interview/readme.md`，默认`readme`命名的文件可以省略不写链接的后面内容
* `features`: 表明首页的特征，固定的格式为`title` + `details`，以三栏流失布局的方式展示
* `footer`: 为底部内容，与普通的网页一样，我们可以在`footer`里面写版权信息

### 导航栏
::: tip 提示
配置导航栏需要在`.vuepress/config.js`文件中进行配置
:::
在默认主题下，导航栏需要在`themeConfig`属性上进行配置`nav`，导航栏的两个重要属性为`text`和`link`，其中`text`指明了导航的文字内容，`link`指明了导航的链接。

#### 基本导航栏
一个基本的导航栏链接可以配置成如下所示
``` js
module.exports = {
  // 其它配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/CSS/' },
      { text: 'JavaScript', link: '/JavaScript/' }
    ]
  }
}
```
基本导航栏配置结果
![基本导航栏配置结果](../images/vuepress/2.png)

#### 导航栏下拉列表
下拉列表需要配置`items`属性，它是一个数组，数组里的对象依然是一个普通导航对象，即拥有`text`和`link`属性，一个导航栏下拉列表可以配置成如下所示
```js
module.exports = {
  // 其它配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端三剑客', items: [
        { text: 'HTML', link: '/html/' },
        { text: 'CSS', link: '/CSS/' },
        { text: 'JavaScript', link: '/JavaScript/' }
      ]},
      { text: 'Vue.jss', link: '/vue/' },
    ]
  }
}
```
导航栏下拉列表配置结果
![导航栏下拉列表配置结果](../images/vuepress/3.png)

#### 禁用导航栏
禁用导航栏分为两种情况，第一种禁用所有的导航栏，第二种在某个页面禁用导航栏，针对这两种不同的情况，相关的配置是不同的，具体如下所示<br/>
**第一种：** 禁用所有导航栏，通过配置`navbar`属性为`false`，此种方式禁用后，将**不会存在**任何导航栏
```js
module.exports = {
  // 其它配置
  themeConfig: {
    navbar: false
  }
}
```
**第二种：** 单个禁用导航栏，在每一个页面(`.md`文件)最顶部，配置`navbar`属性为false，此种方式禁用后，对应的导航栏依然存在，只是**不能点击跳转**。
```yaml
---
navbar: false
---
```
### 内置搜索
我们在以上配置导航栏的过程中，除了我们配置的导航，还会出现一个搜索框，这就是 VuePress 内置的搜索，内置的搜索只能搜索页面的`h2`和`h3`标题构成的索引，我们依然可以对内置的搜索进行一下配置：
* `search`: 通过配置此属性为`false`，来禁用内置搜索
* `searchMaxSuggestions`: 通过配置此属性为一个数字，对内置的搜索进行最多结果数量的限制
```js
module.exports = {
  // 其它配置
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

### 侧边栏

### 最后更新时间

### PWA配置

### 上一篇/下一篇

### Git仓库

### 编辑链接

### 基本配置API

#### 自动生成侧边栏

#### 禁用侧边栏

## 进阶配置

### 侧边栏分组

### 多个侧边栏

### Algolia搜索

### 简单的样式覆盖

### 管理静态资源

### 自定义页面样式类

### 自定义页面布局

### 使用第三方主题

## Markdown扩展

### 链接

### 自定义容器

### 代码块高亮和行号

### 使用Emoji表情

### Github风格的表格

### 自动生成目录

### 使用Vue模板语法

### 使用CSS预处理器

### 使用原生JavaScript和CSS

### 使用Vue组件

### 使用内置组件

## 自定义主题
撰写中

## 部署

### 部署到私有服务器
撰写中

### 部署到Github Pages
撰写中
