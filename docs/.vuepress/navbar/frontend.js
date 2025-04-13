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
            link: '/typescript/base/'
          },
          {
            text: 'TypeScript类型挑战',
            link: '/typescript/challenge/'
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
          {
            text: 'Vue应用测试',
            link: '/test/vueTest/'
          }
        ]
      }
    ]
  }
]

export default frontEndNav