import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { commentPlugin } from 'vuepress-plugin-comment2'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler  } from '@vuepress/bundler-vite'
import { defaultTheme, defineUserConfig } from 'vuepress'
const nav = require('./utils/nav.js')
const { ua } = require('./ua.js')
const {
  webpackSidebar,
  vueAnalysisSidebar,
  vueNextAnalysisSidebar,
  algorithmBaseSidebar,
  algorithmLeetCodeSidebar
} = nav
const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  title: '汪图南',
  description: '汪图南的个人博客',
  base: '/blog/',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/blog/icon.png' }],
    [...ua]
  ],
  port: 3000,
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  theme: defaultTheme({
    editLink: false,
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
        text: '算法',
        children: [
          {
            text: '数据结构和算法(基础)',
            link: '/algorithm/base/introduction/'
          },
          {
            text: 'LeetCode(刷题)',
            link: '/algorithm/leetcode/introduction'
          }
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
          }
        ]
      },
      {
        text: '自动化测试',
        children: [
          { text: 'Vue应用测试', link: '/test/vueTest' }
        ]
      },
    ],
    sidebar: {
      '/webpack/webpack/': [webpackSidebar],
      '/vueAnalysis/': vueAnalysisSidebar,
      '/vueNextAnalysis/': vueNextAnalysisSidebar,
      '/algorithm/base/': algorithmBaseSidebar,
      '/algorithm/leetcode/': algorithmLeetCodeSidebar
    }
  }),
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@images': path.resolve(__dirname, '../images')
        }
      },
      ssr: {
        noExternal: ["vuepress-shared"],
      }
    }
  }),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),
    commentPlugin({
      provider: "Giscus",
      repo: 'wangtunan/blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkxNzcyMzkwNDg=',
      category: 'Announcements',
      categoryId: 'DIC_kwDOCpB0CM4CZkha',
      mapping: "pathname",
      lang: 'zh-CN'
    })
  ]
})
