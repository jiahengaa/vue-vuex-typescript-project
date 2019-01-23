import axios, { AxiosInterceptorManager, AxiosResponse } from 'axios'
import qs from 'qs'
import * as $ from '../store/mutation-login-types'
import store from '@/store'
import router from '@/router'
import { resolve } from 'dns'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://10.80.65.191:3000/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

axios.defaults.headers

// axios拦截请求
axios.interceptors.request.use(
  config => {
    // 判断localStorage是否存在token，如果存在的话，则每个http header都加上token
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `token ${localStorage.getItem('token')}`.replace(/(^\")|(\"$)/g, '')
    } else {
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// axios拦截响应
axios.interceptors.response.use(
  response => {
    // 后端的checkLogin返回的json数据作为跳转依据
    if (!response.data.token) {
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
