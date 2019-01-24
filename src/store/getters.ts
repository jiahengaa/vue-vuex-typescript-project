import { GetterTree, Getter } from 'vuex'
import { State } from './index'

const menuList: Getter<State, any> = (state: State) => {
  return state.NavMenu.menuList
}

const getterTree: GetterTree<State, any> = {
  menuList
}

export default getterTree
