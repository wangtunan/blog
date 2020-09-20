// CSS的目录结构
const cssSidebar = {
  title: 'CSS奇技淫巧',
  collapsable: false,
  children: [
    '/css/',
    '/css/word.md',
    '/css/border.md',
    '/css/background.md',
    '/css/shadow.md',
    '/css/filter.md',
    '/css/layout.md',
    '/css/shape.md',
    '/css/practice.md',
    '/css/3d.md',
    '/css/animation.md'
  ]
}

// webpack目录结构
const webpackSidebar = {
  title: 'Webpack',
  collapsable: false,
  children: [
    '/webpack/',
    '/webpack/source.md',
    '/webpack/install.md',
    '/webpack/start.md',
    '/webpack/static.md',
    '/webpack/core.md',
    '/webpack/advanced.md',
    '/webpack/case.md',
    '/webpack/optimization.md',
    '/webpack/loader.md',
    '/webpack/plugin.md'
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
      'reactive/object-array',
      'reactive/dep',
      'reactive/notify',
      'reactive/merge',
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
      'dom/vnode'
    ]
  },
  {
    title: '组件化',
    collapsable: false,
    children: [
      'component/',
      'component/create',
      'component/patch',
      'component/merge',
      'component/lifecycle',
      'component/register',
      'component/async'
    ]
  },
  {
    title: '编译原理',
    collapsable: false,
    children: [
      'compile/',
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
      'expand/vmodel',
      'expand/event',
      'expand/slot',
      'expand/components',
      'expand/extend-mixin'
    ]
  },
  {
    title: 'Vue-Router',
    collapsable: false,
    children: [
      'router/',
      'router/register',
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
      'vuex/init'
    ]
  }
]

module.exports = {
  cssSidebar,
  webpackSidebar,
  vueAnalysisSidebar
}