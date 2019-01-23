import * as $ from '../mutation-login-types'
import LoginState from '@/model/LoginState'
import { Action, Commit, ActionTree } from 'vuex'

export interface State {
  loginState: LoginState
  token: string
}

const initState: State = {
  loginState: new LoginState(),
  token: ''
}

const getters = {
  getLoginState: (state: State) => state.loginState,
  getToken: (state: State) => state.token
}

const setToken: Action<State, any> = (context: { commit: Commit }, token: string) => {
  context.commit($.setToken, token)
}

const actions: ActionTree<State, any> = {
  setToken
}

const mutations = {
  [$.setToken](state: State, token: string) {
    state.token = token
    localStorage.token = token
  }
}

export default {
  state: initState,
  getters,
  actions,
  mutations
}
