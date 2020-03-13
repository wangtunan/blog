# 安装

## 全局安装
::: warning 注意
如果你只是想做一个 Webpack 的 Demo 案例，那么全局安装方法可能会比较适合你。如果你是在实际生产开发中使用，那么推荐你使用本地安装方法。
:::
### 全局安装命令
:::tip 参数说明
`webpack4.0+`的版本，必须安装`webpack-cli`，`-g`命令代表全局安装的意思
:::
``` sh
$ npm install webpack webpack-cli -g
```

## 卸载
::: tip 参数说明
通过`npm install`安装的模块，对应的可通过`npm uninstall`进行卸载
:::
```sh
$ npm uninstall webpack webpack-cli -g
```

## 本地安装(推荐)
::: tip 参数说明
本地安装的`Webpack`意思是，只在你当前项目下有效，而通过全局安装的`Webpack`，如果两个项目的`Webpack`主版本不一致，则可能会造成其中一个项目无法正常打包。本地安装方式也是实际开发中推荐的一种`Webpack`安装方式。
:::
```sh
$ npm install webpack webpack-cli -D
# 等价于
$ npm install webpack webpack-cli --save-dev
```

## 版本号安装
::: tip 参数说明
如果你对`Webpack`的具体版本有严格要求，那么可以先去Github的`Webpack`仓库查看历史版本记录或者使用`npm view webpack versions`查看`Webpack`的`npm`包历史版本记录
:::
```sh
# 查看webpack的历史版本记录
$ npm view webpack versions

# 按版本号安装
$ npm install webpack@4.25.0 -D
```
