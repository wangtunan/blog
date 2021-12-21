import Vue from 'vue'
export default ({router}) => {
  // 把components下的所有.vue文件全局注册
  Register()

  // UA统计
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    router.afterEach(function (to) {
      const fullPath = router.app.$withBase(to.fullPath);
      if (typeof _hmt !== 'undefined' && fullPath) {
        _hmt.push(["_trackPageview", fullPath]);
      }
    });
  }
}

function Register () {
  const files = require.context('./components', true, /.vue$/)
  files.keys().forEach((key) => {
    let fileUrl = './components' + key.substring(1)
    import(fileUrl+'').then(res => {
      let { default: component } = res
      Vue.component(component.name, component)
    })
  })
}
