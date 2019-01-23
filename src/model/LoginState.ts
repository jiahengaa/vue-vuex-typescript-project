import { ILoginState } from './interface/ILoginState'

export default class LoginState implements ILoginState {
  account: string = ''
  isLoading: boolean = false
  password: string = ''
}
