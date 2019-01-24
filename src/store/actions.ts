import { Commit, Action, ActionTree } from 'vuex'
import { State, Product, AddToCartPayload } from './index'

//定义一个const 函数
const func1: Action<State, any> = (context: { commit: Commit }, str: string) => {
  // if (product.inventory > 0) {
  //   const payload: AddToCartPayload = {
  //     id: product.id,
  //   }
  //   context.commit(types.ADD_TO_CART, payload)
  // }
  context.commit('printMsg', str)
}

//定义一个const 函数
const func2: Action<State, any> = (context: { commit: Commit }, str: string) => {
  // if (product.inventory > 0) {
  //   const payload: AddToCartPayload = {
  //     id: product.id,
  //   }
  //   context.commit(types.ADD_TO_CART, payload)
  // }
  context.commit('alertMsg', str)
}

//将const action加入到 actions，用于后面添加到全局vuex的state的actions
const actions: ActionTree<State, any> = {
  func1,
  func2
}

//导出actions
export default actions
