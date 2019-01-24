import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import VueRouter from 'vue-router'
import store from '@/store'

import * as $ from '../store/mutation-login-types'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

if (window.localStorage.getItem('token')) {
  store.commit($.setToken, window.localStorage.getItem('token'))
}

//路由前拦截器
//  判断是否有登录令牌，如果有就正常跳转，如果没有，则跳转的登录页面登录，获取令牌
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.loginState.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
