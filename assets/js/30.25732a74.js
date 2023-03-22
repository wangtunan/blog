(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{370:function(e,v,_){e.exports=_.p+"assets/img/dom.aa946fb9.png"},474:function(e,v,_){"use strict";_.r(v);var t=_(1),o=Object(t.a)({},(function(){var e=this,v=e._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"虚拟dom"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#虚拟dom"}},[e._v("#")]),e._v(" 虚拟DOM")]),e._v(" "),v("h2",{attrs:{id:"虚拟dom介绍"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#虚拟dom介绍"}},[e._v("#")]),e._v(" 虚拟DOM介绍")]),e._v(" "),v("p",[e._v("我们在最开始提到过，"),v("code",[e._v("Vue")]),e._v("从"),v("code",[e._v("2.0+")]),e._v("版本开始就引入了虚拟"),v("code",[e._v("DOM")]),e._v("，也知道"),v("code",[e._v("Vue")]),e._v("中的虚拟DOM借鉴了开源库"),v("a",{attrs:{href:"https://github.com/snabbdom/snabbdom",target:"_blank",rel:"noopener noreferrer"}},[e._v("snabbdom"),v("OutboundLink")],1),e._v("的实现，并根据自身特色添加了许多特性。")]),e._v(" "),v("p",[v("code",[e._v("Vue")]),e._v("在"),v("code",[e._v("1.0+")]),e._v("版本还没有引入虚拟"),v("code",[e._v("DOM")]),e._v("的时候，当某一个状态发生变化时，它在一定程度上是知道哪些节点使用到了这个状态，从而可以准确的针对这些节点进行更新操作，不需要进行对比。但这种做法是有一定的代价的，因为更新的粒度太细，每一次节点的绑定都需要一个"),v("code",[e._v("Watcher")]),e._v("去观察状态的变化，这样会增加更多的内存开销。当一个状态被越多的节点使用，它的内存开销就越大。")]),e._v(" "),v("p",[e._v("因此在"),v("code",[e._v("Vue")]),e._v("的"),v("code",[e._v("2.0+")]),e._v("版本中，引入了虚拟"),v("code",[e._v("DOM")]),e._v("将更新粒度调整为组件级别，当状态发生变化的时候，只派发更新到组件级别，然后组件内部再进行对比和渲染。这样做以后，当一个状态在同一个组件内被引用多次的时候，它们只需要一个"),v("code",[e._v("render watcher")]),e._v("去观察状态的变化即可。")]),e._v(" "),v("h2",{attrs:{id:"vue中的虚拟dom"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#vue中的虚拟dom"}},[e._v("#")]),e._v(" Vue中的虚拟DOM")]),e._v(" "),v("p",[e._v("虚拟"),v("code",[e._v("DOM")]),e._v("解决"),v("code",[e._v("DOM")]),e._v("更新的方式是：通过状态生成一个虚拟节点树，然后使用虚拟节点树进行渲染，在渲染之前会使用新生成的虚拟节点树和上一次生成的虚拟节点树进行对比，然后只渲染其不相同的部分(包括新增和删除的)。")]),e._v(" "),v("p",[e._v("在"),v("code",[e._v("Vue")]),e._v("中，根实例就是虚拟节点树的根节点，各种组件就是"),v("code",[e._v("children")]),e._v("孩子节点，树节点使用"),v("code",[e._v("VNode")]),e._v("类来表示。它使用"),v("code",[e._v("template")]),e._v("模板来描述状态与"),v("code",[e._v("DOM")]),e._v("之间的映射关系，然后通过"),v("code",[e._v("parse")]),e._v("编译将"),v("code",[e._v("template")]),e._v("模板转换成渲染函数"),v("code",[e._v("render")]),e._v("，执行渲染函数"),v("code",[e._v("render")]),e._v("就可以得到一个虚拟节点树，最后使用这个虚拟节点树渲染到视图上。")]),e._v(" "),v("p",[e._v("因此根据上面这段话，我们可以得到"),v("code",[e._v("Vue")]),e._v("使用虚拟"),v("code",[e._v("DOM")]),e._v("进行模板转视图的一个流程。")]),e._v(" "),v("div",{staticStyle:{"text-align":"center"}},[v("img",{attrs:{src:_(370),alt:"虚拟dom"}})])])}),[],!1,null,null,null);v.default=o.exports}}]);