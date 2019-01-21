import * as types from '../mutation-common-types'
import { Commit, Action, ActionTree } from 'vuex'

export interface State {
  loading: boolean
  showToast: boolean
  leftNavStatus: boolean
  showSuccess: boolean
  showFail: boolean
  toastMsg: string
  showTimePicker: boolean
  alertMsg: string
  showAlert: boolean
}

// initial state
const initState: State = {
  loading: false,
  showToast: false,
  leftNavStatus: false,
  showSuccess: true,
  showFail: false,
  toastMsg: '操作成功',
  showTimePicker: false,
  alertMsg: '退出登录',
  showAlert: false,
}

// getters
const getters = {
  loading: (state: State) => state.loading,
  showToast: (state: State) => state.showToast,
  showAlert: (state: State) => state.showAlert,
  showSuccess: (state: State) => state.showSuccess,
  showFail: (state: State) => state.showFail,
  alertMsg: (state: State) => state.alertMsg,
  toastMsg: (state: State) => state.toastMsg,
}

// actions

const setLoadingState: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_LOADING_STATUS, status)
}

const setNavState: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_NAV_STATUS, status)
}

const showToast: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_SHOW_TOAST, status)
}

const showSuccess: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_SHOW_SUCCESS, status)
}

const showFail: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_SHOW_FAIL, status)
}

const showAlert: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_SHOW_ALERT, status)
}

const showTimePicker: Action<State, any> = (context: { commit: Commit }, status: boolean) => {
  context.commit(types.COM_SHOW_TIME_PICKER, status)
}

const alertMsg: Action<State, any> = (context: { commit: Commit }, str: string) => {
  context.commit(types.COM_ALERT_MSG, str)
}

const toastMsg: Action<State, any> = (context: { commit: Commit }, str: string) => {
  context.commit(types.COM_TOAST_MSG, str)
}

const actions: ActionTree<State, any> = {
  setLoadingState,
  setNavState,
  showToast,
  showSuccess,
  showFail,
  showAlert,
  showTimePicker,
  alertMsg,
  toastMsg,
}

// mutations
const mutations = {
  [types.COM_LOADING_STATUS](state: State, status: boolean) {
    state.loading = status
  },

  [types.COM_SHOW_TOAST](state: State, status: boolean) {
    state.showToast = status
  },

  [types.COM_SHOW_SUCCESS](state: State, status: boolean) {
    state.showSuccess = status
  },

  [types.COM_SHOW_FAIL](state: State, status: boolean) {
    state.showFail = status
  },

  [types.COM_TOAST_MSG](state: State, str: string) {
    state.toastMsg = str
  },

  [types.COM_NAV_STATUS](state: State, status: boolean) {
    state.leftNavStatus = status
  },

  [types.COM_SHOW_TIME_PICKER](state: State, status: boolean) {
    state.showTimePicker = status
  },

  [types.COM_SHOW_ALERT](state: State, status: boolean) {
    state.showAlert = status
  },
  [types.COM_ALERT_MSG](state: State, str: string) {
    state.alertMsg = str
  },
}

export default {
  state: initState,
  getters,
  actions,
  mutations,
}
