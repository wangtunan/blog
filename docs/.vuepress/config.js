const nav = require('./utils/nav.js')
const { webpackSidebar, vueAnalysisSidebar } = nav
module.exports = {
  title: '汪图南',
  description: '汪图南的个人博客',
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
                text: 'JavaScript设计模式与开发实践',
                link: '/designPattern/'
              },
              {
                text: '深入理解ES6',
                link: '/books/javascript/es6'
              }
            ]
          },
          {
            text: 'Git书籍',
            items: [
              {
                text: '精通Git',
                link: '/books/git/'
              }
            ]
          }
        ]
      },
      {
        text: 'Vue源码分析',
        link: '/vueAnalysis/introduction/'
      },
      {
        text: '自动化测试',
        items: [
          { text: 'Vue应用测试', link: '/test/vueTest' }
        ]
      },
      {
        text: 'Webpack',
        link: '/webpack/'
      },
      {
        text: 'TypeScript',
        link: '/typescript/'
      },
      {
        text: 'VuePress',
        link: '/vuepress/'
      }
    ],
    sidebar: {
      '/webpack/': [webpackSidebar],
      '/vueAnalysis/': vueAnalysisSidebar
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
