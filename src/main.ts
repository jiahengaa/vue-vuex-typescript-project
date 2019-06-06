import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fmtDataFilter from './filters'
import './assets/iconfont/iconfont'
import axios from './util/http'
import VueAxios from 'vue-axios'
import { currencyFilter } from './currency'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './chromefx-declare'

Vue.use(ElementUI)

Vue.use(VueAxios, axios)

Vue.filter('currency', currencyFilter)
Vue.config.productionTip = false

fmtDataFilter(Vue)

new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  data: {
    eventHub: new Vue()
  },
  methods: {
    emit(event: string, data: any) {
      this.$root.$data.eventHub.$emit(event, data)
    }
  },
  created() {
    window.vm = this
  }
}).$mount('#app')
