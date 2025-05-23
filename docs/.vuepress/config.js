import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { commentPlugin } from '@vuepress/plugin-comment'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'


import frontEndNav from './navbar/frontend.js'
import vueAnalysisNav from './navbar/vueAnalysis.js'
import algorithmNav from './navbar/algorithm.js'
import booksNav from './navbar/books.js'
import pythonNav from './navbar/python.js'
import llmNav from './navbar/llm.js'

import webpackSidebar from './sidebar/webpack.js'
import rollupSidebar from './sidebar/rollup.js'
import vueAnalysisSidebar from './sidebar/vueAnalysis.js'
import vueNextAnalysisSidebar from './sidebar/vueNextAnalysis.js'
import algorithmSidebar from './sidebar/algorithm.js'
import leetCodeSidebar from './sidebar/leetcode.js'
import ragSidebar from './sidebar/rag.js'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  title: '汪图南',
  description: '汪图南的个人博客',
  base: '/blog/',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/blog/icon.png' }],
  ],
  port: 3000,
  theme: defaultTheme({
    editLink: false,
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新时间',
    repo: 'https://github.com/wangtunan/blog',
    repoLabel: 'Github',
    navbar: [
      ...llmNav,
      ...pythonNav,
      {
        text: '前端面试之道',
        link: '/interview/'
      },
      ...frontEndNav,
      ...vueAnalysisNav,
      ...algorithmNav,
      ...booksNav
    ],
    sidebar: {
      '/webpack/webpack/': webpackSidebar,
      '/rollup/': rollupSidebar,
      '/vueAnalysis/': vueAnalysisSidebar,
      '/vueNextAnalysis/': vueNextAnalysisSidebar,
      '/algorithm/base/': algorithmSidebar,
      '/algorithm/leetcode/': leetCodeSidebar,
      '/rag/': ragSidebar
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
    baiduAnalyticsPlugin({
      id: '1876f64fd31c9aba1a7a5e157813a075'
    }),
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
    }),
    markdownMathPlugin({
      type: 'katex',
    })
  ]
})
