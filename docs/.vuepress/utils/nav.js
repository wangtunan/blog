// webpack目录结构
const webpackSidebar = {
  title: 'Webpack',
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
}

// Vue源码分析目录结构
const vueAnalysisSidebar = [
  {
    title: '介绍',
    collapsable: false,
    children: ['introduction/']
  },
  {
    title: '源码目录设计和架构设计',
    collapsable: false,
    children: ['design/']
  },
  {
    title: 'Rollup构建版本',
    collapsable: false,
    children: [
      'rollup/',
      'rollup/vue'
    ]
  },
  {
    title: '从入口到构造函数整体流程',
    collapsable: false,
    children: [
      'entry/',
      'entry/global',
      'entry/init',
      'entry/state',
      'entry/events',
      'entry/lifecycle',
      'entry/render'
    ]
  },
  {
    title: '响应式原理',
    collapsable: false,
    children: [
      'reactive/',
      'reactive/prepare',
      'reactive/props',
      'reactive/methods',
      'reactive/data',
      'reactive/computed',
      'reactive/watch',
      'reactive/reactive',
      'reactive/dep',
      'reactive/notify',
      'reactive/nexttick',
      'reactive/problem',
      'reactive/api'
    ]
  },
  {
    title: '虚拟DOM和VNode',
    collapsable: false,
    children: [
      'dom/',
      'dom/vnode',
      'dom/diff'
    ]
  },
  {
    title: '组件化',
    collapsable: false,
    children: [
      'component/',
      'component/mount',
      'component/render',
      'component/createElement',
      'component/createComponent',
      'component/merge',
      'component/patch',
      'component/lifecycle',
      'component/register'
    ]
  },
  {
    title: '编译原理',
    collapsable: false,
    children: [
      'compile/',
      'compile/compileToFunctions',
      'compile/parse',
      'compile/optimize',
      'compile/codegen'
    ]
  },
  {
    title: '扩展',
    collapsable: false,
    children: [
      'expand/',
      'expand/directive',
      'expand/filter',
      'expand/event',
      'expand/vmodel',
      'expand/slot',
      'expand/keep-alive',
      'expand/transition',
      'expand/transition-group',
      'expand/plugin'
    ]
  },
  {
    title: 'Vue-Router',
    collapsable: false,
    children: [
      'router/',
      'router/install',
      'router/matcher',
      'router/change',
      'router/components',
      'router/hooks'
    ]
  },
  {
    title: 'Vuex',
    collapsable: false,
    children: [
      'vuex/',
      'vuex/install',
      'vuex/init',
      'vuex/utils',
      'vuex/api'
    ]
  }
]

// Vue3.0源码分析目录结构
const vueNextAnalysisSidebar = [
  {
    title: '介绍',
    collapsable: false,
    children: ['introduction/']
  },
  {
    title: '源码目录',
    collapsable: false,
    children: ['catalog/']
  },
  {
    title: 'Monorepo',
    collapsable: false,
    children: ['monorepo/']
  },
  {
    title: 'Rollup版本构建',
    collapsable: false,
    children: ['rollup/']
  },
  {
    title: 'Composition API',
    collapsable: false,
    children: ['composition/']
  },
  {
    title: '组件化',
    collapsable: false,
    children: ['components/']
  },
  {
    title: '编译原理',
    collapsable: false,
    children: ['compile/']
  },
  {
    title: 'Vue-Router',
    collapsable: false,
    children: ['router/']
  },
  {
    title: 'Vuex',
    collapsable: false,
    children: ['vuex/']
  }
]

module.exports = {
  webpackSidebar,
  vueAnalysisSidebar,
  vueNextAnalysisSidebar
}