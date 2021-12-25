# 介绍
在`Vue3`中，[@vue/reactivity](https://www.npmjs.com/package/@vue/reactivity)作为独立的`package`子包，可以脱离`Vue`在其他工具和库中进行使用，你甚至可以在`React`中使用。

之所以`Vue3`能够这样，而`Vue2`不行，这是因为`Vue3`采用`Monorepo`进行项目代码管理，它让各个模块之间，能够相互独立进行发包。

如果你对`Monorepo`还不是特别了解的话，你可以点击[Monorepo + Rollup](/vueNextAnalysis/monorepo/)这个章节去了解更多内容。

在这一章节，我们重点分析`reactivity`模块中各个`API`是如何实现的，包括：`ref`、`reactive`、`computed`以及`readonly`等等。