const nav = require('./utils/nav.js')
const { ua }  = require('./ua.js')
const { webpackSidebar, vueAnalysisSidebar, vueNextAnalysisSidebar } = nav
module.exports = {
  title: '汪图南',
  description: '汪图南的个人博客',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    [...ua]
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
        items: [
          { text: 'Vue2.0源码分析', link: '/vueAnalysis/introduction/' },
          { text: 'Vue3.0源码分析', link: '/vueNextAnalysis/introduction/' }
        ]
      },
      {
        text: '自动化测试',
        items: [
          { text: 'Vue应用测试', link: '/test/vueTest' }
        ]
      },
      {
        text: '打包工具',
        items: [
          {
            text: 'Webpack',
            link: '/webpack/webpack/'
          },
          {
            text: 'Rollup',
            link: '/rollup/'
          }
        ]
      },
      {
        text: 'TypeScript',
        items: [
          {
            text: 'TypeScript基础',
            link: '/typescript/base'
          },
          {
            text: 'TypeScript类型挑战',
            link: '/typescript/challenge'
          }
        ]
      },
      {
        text: 'CSS预编译器',
        items: [
          {
            text: 'SASS',
            link: '/cssPrecompiler/sass/'
          },
          {
            text: 'Sass-Loader源码分析',
            link: '/cssPrecompiler/sassLoader/'
          }
        ]
      },
      {
        text: 'VuePress',
        link: '/vuepress/'
      }
    ],
    sidebar: {
      '/webpack/webpack/': [webpackSidebar],
      '/vueAnalysis/': vueAnalysisSidebar,
      '/vueNextAnalysis/': vueNextAnalysisSidebar
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
