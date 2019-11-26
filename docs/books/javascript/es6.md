---
sidebar: auto
---

# 深入理解ES6
在`ECMAScript6`标准定稿之前，已经开始出现了一些实验性的`转译器(Transpiler)`，例如谷歌的`Traceur`，可以将代码从`ECMAScript6`转换成`ECMAScript5`。但它们大多功能非常有限，或难以插入现有的`JavaScript`构建管道。<br/>
但是，随后出现了的新型转译器`6to5`改变了这一切。它易于安装，可以很好的集成现有的工具中，生成的代码可读，于是就像野火一样逐步蔓延开来，`6to5`也就是现在鼎鼎大名的`Babel`。

## 前言

### ECMAScript6的演变之路
::: tip
JavaScript核心的语言特性是在标准`ECMA-262`中被定义，该标准中定义的语言被称作`ECMAScript`，它是`JavaScript`的子集。
:::

* `停滞不前`：逐渐兴起的`Ajax`开创了动态`Web`引用的新时代，而自1999年第三版`ECMA-262`发布以来，`JavaScript`却没有丝毫的改变。
* `转折点`：2007年，`TC-39`委员会将大量规范草案整合在了`ECMAScript4`中，其中新增的语言特性涉足甚广，包括：模块、类、类继承、私有对象成员等众多其它的特性。
* `分歧`：然而`TC-39`组织内部对`ECMAScript4`草案产生了巨大的分歧，部分成员认为不应该一次性在第四版标准中加入过多的新功能，而来自雅虎、谷歌和微软的技术负责人则共同提交了一份`ECMAScript3.1`草案作为下一代`ECMAScript`的可选方案，其中此方案只是对现有标准进行小幅度的增量修改。行为更专注于优化属性特性、支持原生`JSON`以及为已有对象增加新的方法。
* `从未面世的ECMAScript4`：2008年，`JavaScript`创始人`Brendan Eich`宣布`TC-39`委员一方面会将合理推进`ECMAScript3.1`的标准化工作，另一方面会暂时将`ECMAScript4`标准中提出的大部分针对语法及特性的改动搁置。
* `ECMAScript5`：经过标准化的`ECMAScript3.1`最终作为`ECMA-262`第五版与2009年正式发布，同时被命名为`ECMAScript5`。
* `ECMAScript6`：在`ECMAScript5`发布后，`TC-39`委员会于2013年冻结了`ECMAScript6`的草案，不再添加新的功能。2013年`ECMAScript6`草案发布，在进过12个月各方讨论和反馈后。2015年`ECMAScript6`正式发布，并命名为`ECMAScript 2015`。

## 块级作用域绑定
::: tip 引入的目的
一直以来`JavaScript`中的变量生声明机制一直令我们感到困惑，大多数类C语言在声明变量的同时也会创建变量，而在以前的`JavaScript`中，何时创建变量要看如何声明的变量，`ES6`引入块级作用域可以让我们更好的控制作用域。
:::

## 字符串和正则表达式

## 函数

## 对象的扩展

## 解构

## Symbol及其Symbol属性

## Set和Map集合

## 迭代器(Iterator)和生成器(Generator)

## JavaScript中的类

## 数据的改进

## Promise和异步编程

## 代理(Proxy)和反射(Reflect)API

## 用模块封装代码


