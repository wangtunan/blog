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
            link: '/designPattern'
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

export default booksNav