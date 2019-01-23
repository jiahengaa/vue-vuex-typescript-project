import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fmtDataFilter from './filters'
import './assets/iconfont/iconfont'
import axios from './util/http'
import VueAxios from 'vue-axios'
import { currencyFilter } from './currency'

Vue.use(VueAxios, axios)
Vue.filter('currency', currencyFilter)

fmtDataFilter(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
