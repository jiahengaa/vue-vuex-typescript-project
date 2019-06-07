import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './moudules/homeRouter'
import uploadRouter from './moudules/uploadRouter'
import setProjectPathRouter from './moudules/setProjectPathRouter'
import createProjectPageRouter from './moudules/createProjectPageRouter'
import bsAddRouter from './moudules/bsAddRouter'
import VueRouter from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  homeRouter,
  uploadRouter,
  setProjectPathRouter,
  createProjectPageRouter,
  bsAddRouter
]

const router = new VueRouter({
  routes
})

export default router
