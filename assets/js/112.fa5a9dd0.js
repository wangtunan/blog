(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{530:function(s,a,t){"use strict";t.r(a);var e=t(1),r=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"monorepo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#monorepo"}},[s._v("#")]),s._v(" Monorepo")]),s._v(" "),a("p",[a("code",[s._v("Monorepo")]),s._v("可以理解为："),a("strong",[s._v("利用单一仓库来管理多个packages的一种策略或手段")]),s._v("，与其相对的是我们接触最多的"),a("code",[s._v("Multirepo")]),s._v("。")]),s._v(" "),a("p",[s._v("可以使用项目目录结构来区分这两种模式：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# monorepo目录结构")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- monorepo-demo              \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- packages                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# packages目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- compiler              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- reactivity            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- shared                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 所有子包都公共的依赖")]),s._v("\n")])])]),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# multirepo-a目录结构")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- multirepo-a\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- src \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- feature1              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# feature1目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- feature2              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# featrue2目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 整个项目依赖")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# multirepo-b目录结构")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- multirepo-b\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- src \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- feature3              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# feature3目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- feature4              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# featrue4目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 整个项目依赖")]),s._v("\n")])])]),a("p",[s._v("可以很清楚的看到他们之间的差异：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("Monorepo")]),s._v("目录中除了会有公共的"),a("code",[s._v("package.json")]),s._v("依赖以外，在每个"),a("code",[s._v("sub-package")]),s._v("子包下面，也会有其特有的"),a("code",[s._v("package.json")]),s._v("依赖。")]),s._v(" "),a("li",[a("code",[s._v("Multirepo")]),s._v("更倾向与在项目制中，将一个个项目使用不同的仓库进行隔离，每一个项目下使用独有的"),a("code",[s._v("package.json")]),s._v("来管理依赖。")])]),s._v(" "),a("p",[s._v("关于这两者的对比和"),a("code",[s._v("Monorepo")]),s._v("的优缺点，我们会在"),a("strong",[s._v("Monorepo特点")]),s._v("这个章节进行介绍，在下一节我们来学习如何搭建一个"),a("code",[s._v("Monorepo")]),s._v("应用。")]),s._v(" "),a("h2",{attrs:{id:"monorepo项目搭建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#monorepo项目搭建"}},[s._v("#")]),s._v(" Monorepo项目搭建")]),s._v(" "),a("p",[s._v("目前，搭建"),a("code",[s._v("Monorepo")]),s._v("项目主要有两种方式：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("Lerna + yarn workspace")]),s._v("方式。")]),s._v(" "),a("li",[a("code",[s._v("pnpm")]),s._v("方式。")])]),s._v(" "),a("p",[s._v("在"),a("code",[s._v("Vue3.2.22")]),s._v("版本中，是使用"),a("code",[s._v("pnpm")]),s._v("来搭建"),a("code",[s._v("Monorepo")]),s._v("项目的，所以我们直接采用第二种方式。")]),s._v(" "),a("h3",{attrs:{id:"搭建项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建项目"}},[s._v("#")]),s._v(" 搭建项目")]),s._v(" "),a("p",[s._v("全局安装"),a("code",[s._v("pnpm")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://pnpm.io/zh/installation",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方文档"),a("OutboundLink")],1)])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装pnpm")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-g")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装完毕后查看pnpm版本")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6.24")]),s._v(".1\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看node版本")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v("\nv16.13.0\n")])])]),a("p",[s._v("安装完毕后，我们创建如下目录结构：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- monorepo-demo              \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- packages                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# packages目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- compiler              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- reactivity            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- shared                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包")]),s._v("\n")])])]),a("p",[s._v("随后，在根目录以及每一个子包目录下都执行一遍"),a("code",[s._v("npm init -y")]),s._v("命令，让其创建一个"),a("code",[s._v("package.json")]),s._v("文件。全部执行完毕后，其目录结构如下所示：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- monorepo-demo              \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- packages                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# packages目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- compiler              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- reactivity            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- shared                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 所有子包都公共的依赖")]),s._v("\n")])])]),a("p",[s._v("接着，修改根目录下的"),a("code",[s._v("package.json")]),s._v("文件：")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"MyVue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 避免pnpm安装时重名")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"private"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 标记私有，防止意外发布")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo \\"Error: no test specified\\" && exit 1"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("接下来，进入到每一个子包中，依次修改"),a("code",[s._v("package.json")]),s._v("，我们以"),a("code",[s._v("compiler")]),s._v("这个包为例。")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@MyVue/compiler"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 避免安装时跟@vue/* 重名")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"description"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@MyVue/compiler"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"main"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo \\"Error: no test specified\\" && exit 1"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"keywords"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"author"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"license"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ISC"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("最后回到根目录，创建"),a("code",[s._v("pnpm-workspace.yaml")]),s._v("文件，并撰写如下内容：")]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("packages")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'packages/*'")]),s._v("\n")])])]),a("p",[s._v("至此，"),a("code",[s._v("Monorepo")]),s._v("项目结构已经初步搭建完毕，此时的目录结构如下：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- monorepo-demo              \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- packages                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# packages目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- compiler              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# compiler子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- reactivity            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# reactivity子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- shared                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# shared子包特有的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- package.json              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 所有子包都公共的依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- pnpm-workspace.yaml       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pnpm配置文件")]),s._v("\n")])])]),a("h3",{attrs:{id:"安装依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装依赖"}},[s._v("#")]),s._v(" 安装依赖")]),s._v(" "),a("p",[s._v("依赖分为两部分，第一部分是公共依赖，第二部分是特有依赖。")]),s._v(" "),a("h4",{attrs:{id:"公共依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#公共依赖"}},[s._v("#")]),s._v(" 公共依赖")]),s._v(" "),a("p",[s._v("公共依赖指的是为所有子包共享的包，例如："),a("code",[s._v("eslint")]),s._v("、"),a("code",[s._v("typescript")]),s._v("或者"),a("code",[s._v("prettier")]),s._v("等等。")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在根目录安装eslint 和 typescript")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" eslint typescript --save-dev\n")])])]),a("p",[s._v("当执行以上命令后，控制台会报如下错误：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" eslint typescript --save-dev\n ERR_PNPM_ADDING_TO_ROOT  Running this "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v(" will "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" the dependency to the workspace root, \n "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" might not be what you want - "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" you really meant it, "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" it explicit by running this "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v(" again with the "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-w")]),s._v(" flag "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("or --workspace-root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(".\n If you don't want to see this warning anymore, you may "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" the ignore-workspace-root-check setting to true.\n")])])]),a("p",[s._v("上面的意思时：如果我们确定要安装的依赖包需要安装到根目录，那么需要我们添加"),a("code",[s._v("-w")]),s._v("参数，因此修改我们的命令如下：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在根目录安装eslint 和 typescript")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" eslint typescript --save-dev "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-w")]),s._v("\n")])])]),a("p",[s._v("安装完毕后，可以在根目录的"),a("code",[s._v("package.json")]),s._v("文件中看到"),a("code",[s._v("devDependencies")]),s._v("依赖包信息：")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"devDependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"eslint"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^8.5.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"typescript"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.5.4"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h4",{attrs:{id:"特有依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特有依赖"}},[s._v("#")]),s._v(" 特有依赖")]),s._v(" "),a("p",[s._v("现在，假设我们有这样一个场景：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("packages/shared")]),s._v("依赖包有："),a("code",[s._v("lodash")]),s._v("。")]),s._v(" "),a("li",[a("code",[s._v("packages/reactivity")]),s._v("依赖包有："),a("code",[s._v("@MyVue/shared")]),s._v("。")]),s._v(" "),a("li",[a("code",[s._v("packages/compiler")]),s._v("依赖包有："),a("code",[s._v("@MyVue/shared")]),s._v(" 和 "),a("code",[s._v("@MyVue/reactivity")])])]),s._v(" "),a("p",[s._v("基于以上场景，我们该如何添加特有依赖？")]),s._v(" "),a("ul",[a("li",[s._v("给"),a("code",[s._v("packages/shared")]),s._v("添加依赖：")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[a("code",[s._v("-r")]),s._v("表示在workspace工作区执行命令，"),a("code",[s._v("--filter xxx")]),s._v(" 表示指定在哪个包下执行。")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" lodash "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--filter")]),s._v(" @MyVue/shared\n")])])]),a("p",[s._v("添加完毕后，可以在"),a("code",[s._v("packages/shared")]),s._v("目录下的"),a("code",[s._v("package.json")]),s._v("文件看到如下"),a("code",[s._v("dependencies")]),s._v("信息：")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"lodash"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.17.21"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("ul",[a("li",[s._v("给"),a("code",[s._v("packages/reactivity")]),s._v("添加依赖：")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("因为"),a("code",[s._v("@MyVue/shared")]),s._v("属于本地包依赖，所以带有前缀"),a("code",[s._v("workspace")]),s._v("。")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pnpm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" @MyVue/shared "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--filter")]),s._v(" @MyVue/reactivity\n")])])]),a("p",[s._v("添加完毕后，可以在"),a("code",[s._v("packages/reactivity")]),s._v("目录下的"),a("code",[s._v("package.json")]),s._v("文件看到如下"),a("code",[s._v("dependencies")]),s._v("信息：")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"@MyVue/shared"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"workspace:^1.0.0"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("同样的道理，当我们在"),a("code",[s._v("packages/compiler")]),s._v("安装完依赖后，可以在"),a("code",[s._v("package.json")]),s._v("文件中看到如下"),a("code",[s._v("dependencies")]),s._v("信息：")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@MyVue/reactivity"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"workspace:^1.0.0"')]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@MyVue/shared"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"workspace:^1.0.0"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("`\n")])])]),a("p",[s._v("最后，项目的基础结构已经搭建完毕，在下一节我们来介绍一下"),a("code",[s._v("Monorepo")]),s._v("的特点。")]),s._v(" "),a("h2",{attrs:{id:"monorepo特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#monorepo特点"}},[s._v("#")]),s._v(" Monorepo特点")]),s._v(" "),a("h3",{attrs:{id:"monorepo-和-multirepo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#monorepo-和-multirepo"}},[s._v("#")]),s._v(" Monorepo 和 Multirepo")]),s._v(" "),a("p",[s._v("一般而言，大型开源库，例如"),a("code",[s._v("Babal")]),s._v("以及"),a("code",[s._v("Vue3")]),s._v("等等都会选择使用"),a("code",[s._v("Monorepo")]),s._v("，而日常业务中，通常都是项目制的，通常会选择"),a("code",[s._v("Multirepo")]),s._v("，那么这两者之前有什么区别呢？")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("规范、工作流的统一性")]),s._v("：在使用"),a("code",[s._v("Multirepo")]),s._v("时，我们通常在遇到一个新项目的时候，会利用现有的脚手架或者手动重新搭建一套项目结构，这就使得不同的项目往往存在于不同的仓库中，而又因为种种原因无法做到代码规范、构建流程、发布流程等的统一性。使用"),a("code",[s._v("Monorepo")]),s._v("则不会存在这个问题，因为所有的"),a("code",[s._v("packages")]),s._v("包全部都在一个仓库中，自然而然就可以做到代码规范、构建流程和发布流程的统一性。")]),s._v(" "),a("li",[a("strong",[s._v("代码复用和版本依赖")]),s._v("：想象一下这样一个场景：当你的A项目依赖了B项目中的某个模块，你必须等到"),a("code",[s._v("B")]),s._v("项目重新发布以后，你的"),a("code",[s._v("A")]),s._v("项目才能正常开发或发布。如果"),a("code",[s._v("B")]),s._v("项目是一个基础库的话，那么"),a("code",[s._v("B")]),s._v("的每次更新都会影响到所有依赖"),a("code",[s._v("B")]),s._v("的项目。对那些没有提取复用逻辑，但又会"),a("code",[s._v("CV")]),s._v("在各个项目中函数、组件等，如果存在改动情况，则需要在每一个项目中都改动。这是使用"),a("code",[s._v("Multirepo")]),s._v("必须要去解决的两个问题造：代码复用问题和版本依题。如果使用的是"),a("code",[s._v("Monorepo")]),s._v("则可以很容易的解决这个问题，对于那些需要复用的逻辑，可以选择把它们都提取到一个公共的"),a("code",[s._v("packages")]),s._v("下，例如"),a("code",[s._v("packages/shared")]),s._v("。而对于版本依赖问题，则更好解决。因为所有"),a("code",[s._v("packages")]),s._v("都在一个仓库，无论是本地开发或者发布都没有问题。")]),s._v(" "),a("li",[a("strong",[s._v("团队协作以及权限控制")]),s._v("：根据"),a("code",[s._v("Monorepo")]),s._v("的特点，各个"),a("code",[s._v("packages")]),s._v("之间相对独立，所以可以很方便的进行职责划分。然而正是因为所有"),a("code",[s._v("packages")]),s._v("都在一个仓库下，所以在代码权限控制上很难像"),a("code",[s._v("Multirepo")]),s._v("那样进行划分，这无疑提高了"),a("code",[s._v("Monorepo")]),s._v("的门槛，它必须严格要求所有开发者严格遵守代码规范、提交规范等。")]),s._v(" "),a("li",[a("strong",[s._v("项目体积")]),s._v("：对于使用"),a("code",[s._v("Monorepo")]),s._v("的项目来说，随着项目的迭代，在代码体积和git提交方面都会比"),a("code",[s._v("Multirepo")]),s._v("项目增长快的很多，甚至会出现启动一个项目、修改后热更新非常慢的情况。不过随着打包工具的发展，这些都不再是问题。")])]),s._v(" "),a("p",[s._v("这一章、对于"),a("code",[s._v("Monorepo")]),s._v("的介绍就到这里，在下一章我们将介绍"),a("code",[s._v("Monorepo")]),s._v("如何进行"),a("code",[s._v("rollup")]),s._v("打包。")]),s._v(" "),a("h2",{attrs:{id:"参考链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[s._v("#")]),s._v(" 参考链接")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/70782864",target:"_blank",rel:"noopener noreferrer"}},[s._v("关于 monorepo 的一些尝试"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000019309820",target:"_blank",rel:"noopener noreferrer"}},[s._v("Monorepo——大型前端项目的代码管理方式"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000039157365",target:"_blank",rel:"noopener noreferrer"}},[s._v("All in one：项目级 monorepo 策略最佳实践"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=r.exports}}]);