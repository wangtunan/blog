// webpack目录结构
const webpackSidebar = [{
  text: 'Webpack',
  collapsable: false,
  children: [
    '/webpack/webpack/',
    '/webpack/webpack/source.md',
    '/webpack/webpack/install.md',
    '/webpack/webpack/start.md',
    '/webpack/webpack/static.md',
    '/webpack/webpack/core.md',
    '/webpack/webpack/advanced.md',
    '/webpack/webpack/case.md',
    '/webpack/webpack/optimization.md',
    '/webpack/webpack/loader.md',
    '/webpack/webpack/plugin.md'
  ]
}]

// rollup目录结构
const rollupSidebar = [{
  text: 'Rollup',
  collapsable: false,
  children: [
    '/rollup/',
    '/rollup/concept/',
    '/rollup/base/',
    '/rollup/plugins/',
    '/rollup/babel/',
    '/rollup/environment/',
    '/rollup/typescript/',
    '/rollup/eslint/',
    '/rollup/jest/',
    '/rollup/commit/',
    '/rollup/changelog/',
  ]
}]

// Vue源码分析目录结构
const vueAnalysisSidebar = [
  {
    text: '介绍',
    collapsable: false,
    children: [
      '/vueAnalysis/introduction/'
    ]
  },
  {
    text: '源码目录设计和架构设计',
    collapsable: false,
    children: [
      '/vueAnalysis/design/'
    ]
  },
  {
    text: 'Rollup构建版本',
    collapsable: false,
    children: [
      '/vueAnalysis/rollup/',
      '/vueAnalysis/rollup/vue'
    ]
  },
  {
    text: '从入口到构造函数整体流程',
    collapsable: false,
    children: [
      '/vueAnalysis/entry/',
      '/vueAnalysis/entry/global',
      '/vueAnalysis/entry/init',
      '/vueAnalysis/entry/state',
      '/vueAnalysis/entry/events',
      '/vueAnalysis/entry/lifecycle',
      '/vueAnalysis/entry/render'
    ]
  },
  {
    text: '响应式原理',
    collapsable: false,
    children: [
      '/vueAnalysis/reactive/',
      '/vueAnalysis/reactive/prepare',
      '/vueAnalysis/reactive/props',
      '/vueAnalysis/reactive/methods',
      '/vueAnalysis/reactive/data',
      '/vueAnalysis/reactive/computed',
      '/vueAnalysis/reactive/watch',
      '/vueAnalysis/reactive/reactive',
      '/vueAnalysis/reactive/dep',
      '/vueAnalysis/reactive/notify',
      '/vueAnalysis/reactive/nexttick',
      '/vueAnalysis/reactive/problem',
      '/vueAnalysis/reactive/api'
    ]
  },
  {
    text: '虚拟DOM和VNode',
    collapsable: false,
    children: [
      '/vueAnalysis/dom/',
      '/vueAnalysis/dom/vnode',
      '/vueAnalysis/dom/diff'
    ]
  },
  {
    text: '组件化',
    collapsable: false,
    children: [
      '/vueAnalysis/component/',
      '/vueAnalysis/component/mount',
      '/vueAnalysis/component/render',
      '/vueAnalysis/component/createElement',
      '/vueAnalysis/component/createComponent',
      '/vueAnalysis/component/merge',
      '/vueAnalysis/component/patch',
      '/vueAnalysis/component/lifecycle',
      '/vueAnalysis/component/register'
    ]
  },
  {
    text: '编译原理',
    collapsable: false,
    children: [
      '/vueAnalysis/compile/',
      '/vueAnalysis/compile/compileToFunctions',
      '/vueAnalysis/compile/parse',
      '/vueAnalysis/compile/optimize',
      '/vueAnalysis/compile/codegen'
    ]
  },
  {
    text: '扩展',
    collapsable: false,
    children: [
      '/vueAnalysis/expand/',
      '/vueAnalysis/expand/directive',
      '/vueAnalysis/expand/filter',
      '/vueAnalysis/expand/event',
      '/vueAnalysis/expand/vmodel',
      '/vueAnalysis/expand/slot',
      '/vueAnalysis/expand/keep-alive',
      '/vueAnalysis/expand/transition',
      '/vueAnalysis/expand/transition-group',
      '/vueAnalysis/expand/plugin'
    ]
  },
  {
    text: 'Vue-Router',
    collapsable: false,
    children: [
      '/vueAnalysis/router/',
      '/vueAnalysis/router/install',
      '/vueAnalysis/router/matcher',
      '/vueAnalysis/router/change',
      '/vueAnalysis/router/components',
      '/vueAnalysis/router/hooks'
    ]
  },
  {
    text: 'Vuex',
    collapsable: false,
    children: [
      '/vueAnalysis/vuex/',
      '/vueAnalysis/vuex/install',
      '/vueAnalysis/vuex/init',
      '/vueAnalysis/vuex/utils',
      '/vueAnalysis/vuex/api'
    ]
  }
]

// Vue3.0源码分析目录结构
const vueNextAnalysisSidebar = [
  {
    text: '介绍',
    collapsable: false,
    children: [
      '/vueNextAnalysis/introduction/',
      '/vueNextAnalysis/introduction/optimization.md'
    ]
  },
  {
    text: 'Monorepo和Rollup',
    collapsable: false,
    children: [
      '/vueNextAnalysis/monorepo/',
      '/vueNextAnalysis/rollup/'
    ]
  },
  {
    text: '源码目录',
    collapsable: false,
    children: [
      '/vueNextAnalysis/catalog/'
    ]
  },
  {
    text: '响应式原理',
    collapsable: false,
    children: [
      '/vueNextAnalysis/reactivity/',
      '/vueNextAnalysis/reactivity/base',
      '/vueNextAnalysis/reactivity/ref',
      '/vueNextAnalysis/reactivity/reactive',
      '/vueNextAnalysis/reactivity/computed',
      '/vueNextAnalysis/reactivity/readonly'
    ]
  },
  {
    text: '组件化',
    collapsable: false,
    children: [
      '/vueNextAnalysis/component/',
      '/vueNextAnalysis/component/createApp',
      '/vueNextAnalysis/component/setup',
      '/vueNextAnalysis/component/mount',
      '/vueNextAnalysis/component/lifecycle',
      '/vueNextAnalysis/component/register',
      '/vueNextAnalysis/component/render'
    ]
  }
]

// 数据结构和算法目录结构
const algorithmBaseSidebar = [
  {
    text: '介绍',
    collapsable: false,
    children: [
      '/algorithm/base/introduction/'
    ]
  },
  {
    text: '推荐',
    collapsable: false,
    children: [
      '/algorithm/base/recommend/'
    ]
  },
  {
    text: '算法基础',
    collapsable: false,
    children: [
      '/algorithm/base/complexity/',
      '/algorithm/base/linkedList/',
      '/algorithm/base/stackAndQueue/',
      '/algorithm/base/hashMap/',
      '/algorithm/base/tree/',
      '/algorithm/base/heap/',
      '/algorithm/base/graph/',
      '/algorithm/base/search/',
      '/algorithm/base/sort/',
      '/algorithm/base/divideAndConquer/',
      '/algorithm/base/backTracking/',
      '/algorithm/base/dynamicProgramming/',
      '/algorithm/base/greedy/'
    ]
  }
]

// LeetCode刷题目录结构
const algorithmLeetCodeSidebar = [
  {
    text: '介绍',
    collapsable: false,
    children: [
      '/algorithm/leetcode/introduction/'
    ]
  },
  {
    text: '推荐',
    collapsable: false,
    children: [
      '/algorithm/leetcode/recommend/'
    ]
  },
  {
    text: '链表',
    collapsable: false,
    children: [
      '/algorithm/leetcode/linkedList/menu/',
      '/algorithm/leetcode/linkedList/easy/',
      '/algorithm/leetcode/linkedList/medium/',
      '/algorithm/leetcode/linkedList/hard/'
    ]
  },
  {
    text: '栈',
    collapsable: false,
    children: [
      '/algorithm/leetcode/stack/menu/',
      '/algorithm/leetcode/stack/easy/',
      '/algorithm/leetcode/stack/medium/',
      '/algorithm/leetcode/stack/hard/',
    ]
  },
  {
    text: '队列',
    collapsable: false,
    children: [
      '/algorithm/leetcode/queue/menu/',
      '/algorithm/leetcode/queue/easy/',
      '/algorithm/leetcode/queue/medium/',
      '/algorithm/leetcode/queue/hard/'
    ]
  },
  {
    text: '哈希表',
    collapsable: false,
    children: [
      '/algorithm/leetcode/hashMap/menu/',
      '/algorithm/leetcode/hashMap/easy/',
      '/algorithm/leetcode/hashMap/medium/',
      '/algorithm/leetcode/hashMap/hard/'
    ]
  },
  {
    text: '二叉树',
    collapsable: false,
    children: [
      '/algorithm/leetcode/tree/menu/',
      '/algorithm/leetcode/tree/easy/',
      '/algorithm/leetcode/tree/medium/',
      '/algorithm/leetcode/tree/hard/'
    ]
  },
  {
    text: '堆',
    collapsable: false,
    children: [
      '/algorithm/leetcode/heap/menu/',
      '/algorithm/leetcode/heap/easy/',
      '/algorithm/leetcode/heap/medium/',
      '/algorithm/leetcode/heap/hard/'
    ]
  },
  {
    text: '图',
    collapsable: false,
    children: [
      '/algorithm/leetcode/graph/menu/',
      '/algorithm/leetcode/graph/easy/',
      '/algorithm/leetcode/graph/medium/',
      '/algorithm/leetcode/graph/hard/'
    ]
  },
  {
    text: '搜索',
    collapsable: false,
    children: [
      '/algorithm/leetcode/search/menu/',
      '/algorithm/leetcode/search/easy/',
      '/algorithm/leetcode/search/medium/',
      '/algorithm/leetcode/search/hard/'
    ]
  },
]

module.exports = {
  webpackSidebar,
  rollupSidebar,
  vueAnalysisSidebar,
  vueNextAnalysisSidebar,
  algorithmBaseSidebar,
  algorithmLeetCodeSidebar
}