import { IMenuItem } from './interface/IMenuItem'

export default class MenuItem implements IMenuItem {
  name: string = ''
  index: string = ''
  active?: boolean = false
  selected?: boolean = false
  enable?: boolean = false
  visiable?: boolean = false
  title: string = ''
}
