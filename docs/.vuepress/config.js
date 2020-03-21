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
                text: 'JavaScript设计模式与开发实践',
                link: '/designPattern/'
              },
              {
                text: '深入理解ES6',
                link: '/books/javascript/es6'
              }
              // {
              //   text: '深入浅出Vue.js',
              //   link: '/books/javascript/vue'
              // }
            ]
          },
          {
            text: 'Vue书籍',
            items: [
              {
                text: '深入浅出Vue.js',
                link: '/books/javascript/vue.md'
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
          },
          {
            text: 'CSS书籍',
            items: [
              {
                text: 'CSS揭秘',
                link: '/books/css/secret'
              }
            ]
          }
        ]
      },
      {
        text: 'Vue',
        items: [
          { text: 'Vue基础知识', link: '/vue/' },
          { text: '深入浅出Vue.js书籍', link: '/books/javascript/vue.md' }
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
      },
      {
        text: 'CSS',
        items: [
          {
            text: 'CSS奇技淫巧',
            link: '/css/'
          },
          {
            text: 'SCSS/SASS',
            link: '/css/scss/'
          }
        ]
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