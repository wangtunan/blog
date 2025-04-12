// 前端技术栈nav导航
const frontEndNav = [
  {
    text: '前端技术栈',
    children: [
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
      }
    ]
  }
]

// Vue源码nav导航
const vueAnalysisNav = [
  {
    text: 'Vue源码分析',
    children: [
      { text: 'Vue2.0源码分析', link: '/vueAnalysis/introduction/' },
      { text: 'Vue3.0源码分析', link: '/vueNextAnalysis/introduction/' }
    ]
  }
]

// 算法nav导航
const algorithmNav = [
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
  }
]

// 书籍
const booksNav = [
  {
    text: '书籍',
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
  }
]

// golang导航
const golangNav = [
  {
    text: 'Golang技术栈',
    children: [
      {
        text: 'Go基础',
        link: '/golang/base'
      },

      {
        text: 'Go框架',
        children: [
          {
            text: 'Gin',
            link: '/golang/framework/gin'
          },
          {
            text: 'Gorm',
            link: '/golang/framework/gorm'
          }
        ]
      },
      {
        text: 'Go工具',
        children: [
          {
            text: 'Go Modules',
            link: '/golang/mod'
          }
        ]
      }
    ]
  }
]

const pythonNav = [
  {
    text: 'Python技术栈',
    children: [
      {
        text: '快速入门',
        link: '/python/base'
      },
      {
        text: '高级技巧',
        link: '/python/advanced'
      }
    ]
  }
]

module.exports = {
  frontEndNav,
  vueAnalysisNav,
  algorithmNav,
  booksNav,
  golangNav,
  pythonNav
}