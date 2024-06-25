import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { commentPlugin } from 'vuepress-plugin-comment2'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler  } from '@vuepress/bundler-vite'
import { defaultTheme, defineUserConfig } from 'vuepress'
const sidebarConfig = require('./configs/sidebar.js')
const navConfig = require('./configs/nav.js')
const { ua } = require('./ua.js')
const {
  webpackSidebar,
  vueAnalysisSidebar,
  vueNextAnalysisSidebar,
  algorithmBaseSidebar,
  algorithmLeetCodeSidebar
} = sidebarConfig
const {
  frontEndNav,
  vueAnalysisNav,
  algorithmNav,
  booksNav,
  golangNav
} = navConfig
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
      ...frontEndNav,
      ...vueAnalysisNav,
      ...algorithmNav,
      ...golangNav,
      ...booksNav
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
