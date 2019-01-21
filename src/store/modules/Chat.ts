import * as $ from '../ChatType'
import { NavMenuItem, menuActiveItem } from '../index'
import { Commit, Action } from 'vuex'

export interface State {
  backPath: string
  indexNav: NavMenuItem
  menuActive: menuActiveItem
}

const initState: State = {
  backPath: '',
  indexNav: {
    index: 0,
    path: {
      path: '/chat'
    },
    hint: { type: 'count', count: 0 },
    iconClass: 'icon-wechat',
    text: '微信'
  },
  menuActive: {
    text: '',
    index: 0
  }
}

const mutations = {
  [$.setMenu](state: State, indexNav: NavMenuItem) {
    state.indexNav = indexNav
  },
  [$.setMenuActive](state: State, curItem: menuActiveItem) {
    state.menuActive = curItem
  }
}

/**
 * 退出登录
 */
const getIndexNav: Action<State, any> = (context: { commit: Commit }) => {
  context.commit($.getIndexNav)
}

const actions = {
  getIndexNav
}

export default {
  state: initState,
  mutations,
  actions
}
