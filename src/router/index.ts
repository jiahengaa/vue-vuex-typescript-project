import Vue from 'vue'
import Router from 'vue-router'
import SelfTabPage from '@/views/SelfTabPage.vue'
import Login from '@/views/Login.vue'
import NavMenu from '@/views/NavMenu.vue'
import PrintData from '@/views/PrintData.vue'
import Home from '@/views/Home.vue'
import homeRouter from './moudules/homeRouter'
import VueRouter from 'vue-router'
import store from '@/store'

import * as $ from '../store/mutation-login-types'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  homeRouter
]

const router = new VueRouter({
  routes
})

if (window.localStorage.getItem('token')) {
  store.commit($.setToken, window.localStorage.getItem('token'))
}

// 路由前拦截器
//  判断是否有登录令牌，如果有就正常跳转，如果没有，则跳转的登录页面登录，获取令牌
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
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
