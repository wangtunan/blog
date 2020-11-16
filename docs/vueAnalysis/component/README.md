# 介绍
在之前几个章节中，我们提到过很多次组件的概念，组件在我们日常的开发过程中出现频率是非常高的，它也是`Vue`的两大核心之一：**数据驱动**和**组件化**。

在前面章节我们已经介绍完了**数据驱动**，在这个章节我们会着重介绍与**组件化**相关的知识，我们将从入口文件`main.js`开始探索组件化的奥秘。
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```