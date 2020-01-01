const nav = require('./utils/nav.js')
var { cssSidebar,webpackSidebar } = nav
module.exports = {
  title: '一蓑烟雨、汪汪汪',
  description: '一蓑烟雨、汪汪汪的个人站点',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }]
  ],
  port: 3000,
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    lastUpdated: '最后更新时间',
    sidebar: 'auto',
    repo: 'https://github.com/wangtunan/blog',
    repoLabel: 'Github',
    nav: [
      {
        text: '前端面试之道',
        link: '/interview/'
      },
      {
        text: '前端书籍',
        items: [
          {
            text: 'JavaScript书籍',
            items: [
              {
                text: '你不知道的JavaScript(上)',
                link: '/books/javascript/know-up'
              },
              {
                text: '你不知道的JavaScript(中下)',
                link: '/books/javascript/know-down'
              },
              {
                text: 'JavaScript高级程序设计',
                link: '/books/javascript/red-book'
              },
              {
                text: 'JavaScript数据结构和算法',
                link: '/books/javascript/algorithm'
              },
              {
                text: '深入理解ES6',
                link: '/books/javascript/es6'
              },
              {
                text: '深入浅出Vue.js',
                link: '/books/javascript/vue'
              }
            ]
          },
          {
            text: 'CSS书籍',
            items: [
              {
                text: 'CSS世界',
                link: '/books/css/world'
              },
              {
                text: 'CSS揭秘',
                link: '/books/css/secret'
              }
            ]
          }
        ]
      },
      {
        text: 'JavaScript设计模式',
        link: '/designPattern/'
      },
      {
        text: 'Vue.js',
        items: [
        { text: 'Vue基础知识', link: '/vue/' },
        { text: 'Vue原理剖析', link: '/books/javascript/vue.md' }
        ]
      },
      {
        text: 'Webpack',
        link: '/webpack/'},
      {
        text: 'VuePress',
        link: '/vuepress/'
      },
      {
        text: 'CSS奇技淫巧',
        link: '/css/'
      },
      { 
        text: 'Git',
        link: '/git/'
      }
    ],
    sidebar: {
      '/css/': [cssSidebar],
      '/webpack/': [webpackSidebar]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../images',
        '@vuepress': '../images/vuepress',
        '@components': '../.vuepress/components'
      }
    }
  }
}