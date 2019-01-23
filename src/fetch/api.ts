import axios from 'axios'
import qs from 'qs'
import * as _ from '../util/tool'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use(
  (config: any) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error: any) => {
    _.toast('错误的传参', 'fail')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (res: any) => {
    if (!res.data.success) {
      return Promise.reject(res)
    }
    return res
  },
  (error: any) => {
    _.toast('网络异常', 'fail')
    return Promise.reject(error)
  }
)

export function fetch(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (response: any) => {
          resolve(response.data)
        },
        (error: any) => {
          reject(error)
        }
      )
      .catch((error: any) => {
        reject(error)
      })
  })
}

export default class Api {
  public static Login(params: any) {
    return fetch('/users/api/userLogin', params)
  }
  public static Regist(params: any) {
    return fetch('/users/api/userRegist', params)
  }
  public static RegistVerifiCode(tellphone: string) {
    return fetch('/users/api/registVerifiCode', { tellphone })
  }

  /**
   * 获取约跑步列表
   */
  public static SportsList() {
    return fetch('/api/sportList', '')
  }

  /**
   * 获取约出行列表
   */
  public static TravelsList() {
    return fetch('/api/travelList', '')
  }

  /**
   * 获取约跑步详情
   */
  public static SportsDetail(id: string) {
    return fetch('/api/sportDetail', { sportId: id })
  }

  /**
   * 获取约出行详情
   */
  public static TravelsDetail(id: string) {
    return fetch('/api/travelDetail', { travelId: id })
  }

  /**
   * 获取出行活动点击次数
   */
  public static travelClicks(id: string) {
    return fetch('/api/travelClickNum', { travelId: id })
  }

  /**
   * 获取用户信息
   */
  public static UserInfo(id: string) {
    return fetch('/users/api/userInfo', { userId: id })
  }

  /**
   * 获取用户发布约行个数
   */
  public static getPubTotravelNum(id: string) {
    return fetch('/users/api/getPubTotravelNum', { userId: id })
  }

  /**
   * 获取用户自己发布的约行
   */
  public static getMyTravel(id: string) {
    return fetch('/users/api/myTravel', { userId: id })
  }

  /**
   * 发布约行活动
   */
  public static PostTravel(params: any) {
    return fetch('', '')
  }

  /**
   * 获取全国JSON数据
   */
  public static getAddressJson() {
    return fetch('/api/address', '')
  }
}
