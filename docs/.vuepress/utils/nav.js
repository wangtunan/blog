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
    title: '源码目录设计',
    collapsable: false,
    children: [ '/vueAnalysis/']
  },
  {
    title: 'Rollup构建版本',
    collapsable: false,
    children: ['/vueAnalysis/rollup/']
  },
  {
    title: '从入口到实例挂载',
    collapsable: false,
    children: ['/vueAnalysis/entry/']
  },
  {
    title: '响应式原理',
    collapsable: false,
    children: ['/vueAnalysis/reactive/']
  },
  {
    title: '组件化',
    collapsable: false,
    children: ['/vueAnalysis/component/']
  },
  {
    title: '编译',
    collapsable: false,
    children: ['/vueAnalysis/parse/']
  },
  {
    title: 'Vue-Router',
    collapsable: false,
    children: ['/vueAnalysis/router/']
  },
  {
    title: 'Vuex',
    collapsable: false,
    children: ['/vueAnalysis/vuex/']
  }
]

module.exports = {
  cssSidebar,
  webpackSidebar,
  vueAnalysisSidebar
}