import { GetterTree, Getter } from 'vuex'
import { State, menuActiveItem } from './index'

const menuList: Getter<State, any> = (state: State) => {
  return state.NavMenu
}

const getterTree: GetterTree<State, any> = {
  menuList
}

export default getterTree
