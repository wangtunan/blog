import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
import { defaultTheme  } from 'vuepress'

const nav = require('./utils/nav.js')
const { ua }  = require('./ua.js')
const {
  webpackSidebar,
  vueAnalysisSidebar,
  vueNextAnalysisSidebar
} = nav
const __dirname = getDirname(import.meta.url)

export default  {
  title: '汪图南',
  description: '汪图南的个人博客',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    [...ua]
  ],
  port: 3000,
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  theme: defaultTheme({
    editLinkText: '编辑此页面',
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新时间',
    repo: 'https://github.com/wangtunan/blog',
    repoLabel: 'Github',
    navbar: [
      {
        text: '前端面试之道',
        link: '/interview/'
      },
      {
        text: '前端书籍',
        children: [
          {
            text: 'JavaScript书籍',
            children: [
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
            children: [
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
        children: [
          { text: 'Vue2.0源码分析', link: '/vueAnalysis/introduction/' },
          { text: 'Vue3.0源码分析', link: '/vueNextAnalysis/introduction/' }
        ]
      },
      {
        text: '自动化测试',
        children: [
          { text: 'Vue应用测试', link: '/test/vueTest' }
        ]
      },
      {
        text: '打包工具',
        children: [
          {
            text: 'Webpack',
            link: '/webpack/webpack/'
          },
          {
            text: 'Rollup',
            link: '/rollup/'
          },
          {
            text: 'Vite',
            link: '/vite/'
          }
        ]
      },
      {
        text: 'TypeScript',
        children: [
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
        children: [
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
  }),
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../images',
        '@vuepress': '../images/vuepress',
        '@components': '../.vuepress/components'
      }
    }
  },
  plugins: [
    mediumZoomPlugin({
      margin: 50,
      background: 'black'
    }),
    registerComponentsPlugin({
      components: {
        LinkAndSolution: path.resolve(__dirname, './components/linkAndSolution.vue'),
      },
    }),
  ]
}
