import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue,
  options, 
  router,
  siteData
}) => {
  // 把components下的所有.vue文件全局注册
  Register()
  Vue.use(ElementUI)
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
