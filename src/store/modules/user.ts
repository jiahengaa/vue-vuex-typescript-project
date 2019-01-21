import * as types from '../mutation-common-types'
import { Commit, Action, ActionTree } from 'vuex'
import { UserInfo } from '..'
import Api from '../../fetch/api'

export interface State {
  loginStatus: boolean
  userInfo: UserInfo
  userData: []
}

const initState: State = {
  loginStatus: false,
  userInfo: {
    universities: '',
    sex: '',
    nickName: '',
    username: '',
    emailVerified: false,
    mobilePhoneNumber: '',
    mobilePhoneVerified: false,
    avatar: '',
    createAt: new Date(),
    updateAt: new Date(),
    objectId: '',
  },
  userData: [],
}
/**
 * 用户登录
 */
const setUserInfo: Action<State, any> = (context: { commit: Commit }, res: string) => {
  localStorage.setItem('userInfo', JSON.stringify(res))
  localStorage.setItem('loginStatus', 'true')

  context.commit(types.SET_USER_INFO, res)
  context.commit(types.SET_LOGIN_STATUS, true)
}

/**
 * 退出登录
 */
const setSignOut: Action<State, any> = (context: { commit: Commit }) => {
  localStorage.removeItem('loginStatus')
  localStorage.removeItem('userInfo')
  context.commit(types.SET_USER_INFO, {})
  context.commit(types.SET_LOGIN_STATUS, false)
}

/**
 * 请求用户信息
 */
const getUserData: Action<State, any> = (context: { commit: Commit }, id: string) => {
  context.commit(types.COM_LOADING_STATUS, true)
  Api.UserInfo(id).then((res: any) => {
    context.commit(types.COM_LOADING_STATUS, false)
    context.commit(types.GET_USER_DATA, res.data)
  })
}

const actions: ActionTree<State, any> = {
  setUserInfo,
  setSignOut,
  getUserData,
}

const getters = {
  getUserData: (state: State) => state.userData,
  loginStatus: (state: State) => state.loginStatus,
  userInfo: (state: State) => state.userInfo,
}

const mutations = {
  [types.SET_USER_INFO](state: State, userinfo: UserInfo) {
    state.userInfo = userinfo
  },
  [types.SET_LOGIN_STATUS](state: State, status: boolean) {
    state.loginStatus = status
  },
  [types.GET_USER_DATA](state: State, userData: []) {
    state.userData = userData
  },
}

export default {
  state: initState,
  actions,
  getters,
  mutations,
}
