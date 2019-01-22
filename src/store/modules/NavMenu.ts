import * as $ from '../mutation-nav-menu-types'
import { Commit, Action, ActionTree } from 'vuex'
import MenuItem from '../../model/MenuItem'
import * as _ from 'lodash'

export interface State {
  menuList: MenuItem[]
  curMenuItem: MenuItem
}

const initState: State = {
  menuList: [],
  curMenuItem: new MenuItem()
}

const getters = {
  getSelectedIndex: (state: State) => state.curMenuItem.index,
  getSelectedMenu: (state: State) => state.curMenuItem,
  getMenuList: (state: State) => state.menuList
}

const selectedMenu: Action<State, any> = (context: { commit: Commit }, menuItem: MenuItem) => {
  context.commit($.selectedMenu, menuItem)
}

const initMenuList: Action<State, any> = (context: { commit: Commit }, menus: MenuItem[]) => {
  context.commit($.initMenuList, menus)
}

const addMenuToList: Action<State, any> = (context: { commit: Commit }, menuItem: MenuItem) => {
  context.commit($.addMenuToList, menuItem)
}

const rmMenuItemFromList: Action<State, any> = (context: { commit: Commit }, menuItem: MenuItem) => {
  context.commit($.rmMenuItemFromList, menuItem)
}

const updateMenuItem: Action<State, any> = (context: { commit: Commit }, menuItem: MenuItem) => {
  context.commit($.updateMenuItem, menuItem)
}

const actions: ActionTree<State, any> = {
  selectedMenu,
  initMenuList,
  addMenuToList,
  rmMenuItemFromList,
  updateMenuItem
}

const mutations = {
  [$.selectedMenu](state: State, menuItem: MenuItem) {
    state.menuList.forEach(ele => {
      if (ele.index === menuItem.index) {
        ele.selected = true
        state.curMenuItem = ele
      }
    })
  },
  [$.addMenuToList](state: State, menuItem: MenuItem) {
    var index = _.findIndex(state.menuList, p => {
      return p.index == menuItem.index
    })
    if (index >= 0) {
    } else {
      state.menuList.push(menuItem)
    }
  },
  [$.initMenuList](state: State, menus: MenuItem[]) {
    state.menuList = menus
    state.menuList.forEach(ele => {
      if (ele.selected || ele.active) {
        state.curMenuItem = ele
      }
    })
  },
  [$.updateMenuItem](state: State, menuItem: MenuItem) {
    state.menuList.forEach(ele => {
      if (ele.index === menuItem.index) {
        Object.assign(ele, menuItem)
      }
    })
  }
}

export default {
  state: initState,
  getters,
  actions,
  mutations
}
