import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import actions from './actions'
import getters from './getters'
import NavMenu, { State as NavMenuState } from './modules/NavMenu'
import Login, { State as LoginState } from './modules/Login'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    NavMenu,
    Login
  }
})

export interface ActionContextBasic {
  commit: Commit
  dispatch: Dispatch
}

export interface State {
  NavMenu: NavMenuState
  loginState: LoginState
}
