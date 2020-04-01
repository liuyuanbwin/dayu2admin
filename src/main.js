import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import NProgress from 'nprogress'
import { dateFormat, cartype, billtype } from './tools/filter'

import 'nprogress/nprogress.css'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message

Vue.config.productionTip = false

// axios.defaults.baseURL = '/'
axios.defaults.withCredentials = true
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  err => {
    console.log(err.response.status)
    const status = err.response.status
    if (status === 401) {
      router.push({
        path: '/login'
      })
    }
    return Promise.reject(err)
  }
)
Vue.prototype.$http = axios

Vue.filter('dateFormat', dateFormat)
Vue.filter('cartype', cartype)
Vue.filter('billtype', billtype)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
