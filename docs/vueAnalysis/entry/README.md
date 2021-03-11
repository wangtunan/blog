# 整体流程

在之前的介绍中，我们知道`Vue.js`内部会根据`Web浏览器`、`Weex`跨平台和`SSR服务端渲染`不同的环境寻找不同的入口文件，但其核心代码是在`src/core`目录下，我们这一节的主要目标是为了搞清楚从入口文件到`Vue`构造函数执行，这期间的整体流程。

在分析完从入口到构造函数的各个部分的流程后，我们可以得到一份大的流程图：
<div style="text-align: center">
  <img src="../../images/vueAnalysis/process.png" />
</div>