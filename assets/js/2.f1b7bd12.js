(window.webpackJsonp=window.webpackJsonp||[]).push([[2,4,5],{120:function(e,t){e.exports={webpackSidebar:{title:"Webpack",collapsable:!1,children:["/webpack/webpack/","/webpack/webpack/source.md","/webpack/webpack/install.md","/webpack/webpack/start.md","/webpack/webpack/static.md","/webpack/webpack/core.md","/webpack/webpack/advanced.md","/webpack/webpack/case.md","/webpack/webpack/optimization.md","/webpack/webpack/loader.md","/webpack/webpack/plugin.md"]},vueAnalysisSidebar:[{title:"介绍",collapsable:!1,children:["introduction/"]},{title:"源码目录设计和架构设计",collapsable:!1,children:["design/"]},{title:"Rollup构建版本",collapsable:!1,children:["rollup/","rollup/vue"]},{title:"从入口到构造函数整体流程",collapsable:!1,children:["entry/","entry/global","entry/init","entry/state","entry/events","entry/lifecycle","entry/render"]},{title:"响应式原理",collapsable:!1,children:["reactive/","reactive/prepare","reactive/props","reactive/methods","reactive/data","reactive/computed","reactive/watch","reactive/reactive","reactive/dep","reactive/notify","reactive/nexttick","reactive/problem","reactive/api"]},{title:"虚拟DOM和VNode",collapsable:!1,children:["dom/","dom/vnode","dom/diff"]},{title:"组件化",collapsable:!1,children:["component/","component/mount","component/render","component/createElement","component/createComponent","component/merge","component/patch","component/lifecycle","component/register"]},{title:"编译原理",collapsable:!1,children:["compile/","compile/compileToFunctions","compile/parse","compile/optimize","compile/codegen"]},{title:"扩展",collapsable:!1,children:["expand/","expand/directive","expand/filter","expand/event","expand/vmodel","expand/slot","expand/keep-alive","expand/transition","expand/transition-group","expand/plugin"]},{title:"Vue-Router",collapsable:!1,children:["router/","router/install","router/matcher","router/change","router/components","router/hooks"]},{title:"Vuex",collapsable:!1,children:["vuex/","vuex/install","vuex/init","vuex/utils","vuex/api"]}],vueNextAnalysisSidebar:[{title:"介绍",collapsable:!1,children:["introduction/","introduction/optimization.md"]},{title:"Monorepo和Rollup",collapsable:!1,children:["monorepo/","rollup/"]},{title:"源码目录",collapsable:!1,children:["catalog/"]},{title:"响应式原理",collapsable:!1,children:["reactivity/","reactivity/base","reactivity/ref","reactivity/reactive","reactivity/computed","reactivity/readonly"]},{title:"组件化",collapsable:!1,children:["component/","component/createApp","component/setup","component/mount","component/lifecycle","component/register","component/render"]}]}},121:function(e,t){const i=["script",{},'var _hmt = _hmt || [];\n  (function() {\n    var hm = document.createElement("script");\n    hm.src = "https://hm.baidu.com/hm.js?1876f64fd31c9aba1a7a5e157813a075";\n    var s = document.getElementsByTagName("script")[0]; \n    s.parentNode.insertBefore(hm, s);\n  })();'];e.exports={ua:i}},124:function(e,t,i){const a=i(120),{ua:n}=i(121),{webpackSidebar:c,vueAnalysisSidebar:o,vueNextAnalysisSidebar:l}=a;e.exports={title:"汪图南",description:"汪图南的个人博客",base:"/blog/",head:[["link",{rel:"icon",href:"/icon.png"}],[...n]],port:3e3,markdown:{lineNumbers:!1},themeConfig:{lastUpdated:"最后更新时间",sidebar:"auto",repo:"https://github.com/wangtunan/blog",repoLabel:"Github",nav:[{text:"前端面试之道",link:"/interview/"},{text:"前端书籍",items:[{text:"JavaScript书籍",items:[{text:"你不知道的JavaScript(上)",link:"/books/javascript/know-up"},{text:"你不知道的JavaScript(中下)",link:"/books/javascript/know-down"},{text:"JavaScript数据结构和算法",link:"/books/javascript/algorithm"},{text:"JavaScript设计模式与开发实践",link:"/designPattern/"},{text:"深入理解ES6",link:"/books/javascript/es6"}]},{text:"Git书籍",items:[{text:"精通Git",link:"/books/git/"}]}]},{text:"Vue源码分析",items:[{text:"Vue2.0源码分析",link:"/vueAnalysis/introduction/"},{text:"Vue3.0源码分析",link:"/vueNextAnalysis/introduction/"}]},{text:"自动化测试",items:[{text:"Vue应用测试",link:"/test/vueTest"}]},{text:"打包工具",items:[{text:"Webpack",link:"/webpack/webpack/"},{text:"Rollup",link:"/rollup/"}]},{text:"TypeScript",items:[{text:"TypeScript基础",link:"/typescript/base"},{text:"TypeScript类型挑战",link:"/typescript/challenge"}]},{text:"CSS预编译器",items:[{text:"SASS",link:"/cssPrecompiler/sass/"},{text:"Sass-Loader源码分析",link:"/cssPrecompiler/sassLoader/"}]},{text:"VuePress",link:"/vuepress/"}],sidebar:{"/webpack/webpack/":[c],"/vueAnalysis/":o,"/vueNextAnalysis/":l}},configureWebpack:{resolve:{alias:{"@images":"../images","@vuepress":"../images/vuepress","@components":"../.vuepress/components"}}}}}}]);