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

module.exports = {
  cssSidebar,
  webpackSidebar
}