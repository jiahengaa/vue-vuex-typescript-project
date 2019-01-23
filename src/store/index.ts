import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import actions from './actions'
import getters from './getters'
import cart, { State as CardState } from './modules/cart'
import products, { State as ProductsState } from './modules/products'
import appStateInfo, { State as AppStateInfo } from './modules/appStateInfo'
import user, { State as UserInfo } from './modules/user'
import chat, { State as ChatState } from './modules/Chat'
import NavMenu, { State as NavMenuState } from './modules/NavMenu'
import Login, { State as LoginState } from './modules/Login'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products,
    appStateInfo,
    user,
    chat,
    NavMenu,
    Login
  }
})

export interface ActionContextBasic {
  commit: Commit
  dispatch: Dispatch
}

export interface State {
  cart: CardState
  products: ProductsState
  appStateInfo: AppStateInfo
  user: UserInfo
  chat: ChatState
  NavMenu: NavMenuState
  loginState: LoginState
}

export type CheckoutStatus = 'successful' | 'failed' | null

export interface Product {
  id: number
  title: string
  price: number
  inventory: number
}

export interface CartProduct {
  title: string
  price: number
  quantity: number
}

export interface AddToCartPayload {
  id: number
}

export interface UserInfo {
  universities: string
  sex: string
  nickName: string
  username: string
  emailVerified: boolean
  mobilePhoneNumber: string
  avatar: string
  mobilePhoneVerified: boolean
  objectId: string
  createAt: Date
  updateAt: Date
}

export interface path {
  path: string
}

export interface hint {
  type: string
  count: number
}

export interface menuActiveItem {
  text: string
  index: number
}

export interface NavMenuItem {
  index: number
  path: path
  hint: hint
  iconClass: string
  text: string
}
