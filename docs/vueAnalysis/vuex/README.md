# 介绍

在`Vuex`官网中它有这样一段话：**Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。**

借用一张`Vuex`官网中一张关于其状态管理的流程图：

<div style="text-align:center">
  <img src="https://vuex.vuejs.org/vuex.png" alt="Vuex数据状态管理流程图">
</div>


在分析`Vuex`源码章节，我们会按照`Vuex`的安装、`Vuex`的初始化、`Vuex`提供的辅助`API`以及`Store`实例`API`这几个模块来进行说明，其中最后几个模块是重点。

**Vuex初始化**：
1. `State`初始化。
2. `Mutations`初始化。
3. `Actions`初始化。
4. `Getters`初始化和响应式。
5. `Modules`初始化。


**Vuex**辅助`API`设计：
1. `createNamespacedHelpers`设计原理。
2. `mapState`设计原理。
3. `mapMutations`设计思想。
4. `mapActions`设计思想。

**Store**实例`API`设计：
1. `commit`设计思想。
1. `dispatch`设计思想。
1. `subscribe`设计思想。
1. `subscribeAction`设计思想。
1. `registerModule`设计思想。
1. `unregisterModule`设计思想。