import { IMenuItem } from './interface/IMenuItem'

export default class MenuItem implements IMenuItem {
  public name: string = ''
  public index: string = ''
  public active?: boolean = false
  public selected?: boolean = false
  public enable?: boolean = false
  public visiable?: boolean = false
  public title: string = ''
}
