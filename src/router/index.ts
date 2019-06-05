import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './moudules/homeRouter'
import uploadRouter from './moudules/uploadRouter'
import VueRouter from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  homeRouter,
  uploadRouter
]

const router = new VueRouter({
  routes
})

export default router
