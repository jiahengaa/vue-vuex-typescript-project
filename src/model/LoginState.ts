import { ILoginState } from './interface/ILoginState'

export default class LoginState implements ILoginState {
  public account: string = ''
  public isLoading: boolean = false
  public password: string = ''
}
