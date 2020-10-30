import Vue from 'vue'
export default ({
  Vue,
  options, 
  router,
  siteData
}) => {
  // 把components下的所有.vue文件全局注册
  Register()
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
