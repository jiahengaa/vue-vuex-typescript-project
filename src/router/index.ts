import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'
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
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: ShoppingCart
  }
]

const router = new VueRouter({
  routes
})

if (window.localStorage.getItem('token')) {
  store.commit($.setToken, window.localStorage.getItem('token'))
}

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
