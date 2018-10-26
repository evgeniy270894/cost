// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import HotUtils from './utils/HotUtils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(HotUtils)

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default vue
