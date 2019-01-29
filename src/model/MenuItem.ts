import { IMenuItem } from './interface/IMenuItem'

export default class MenuItem implements IMenuItem {
  public name: string = ''
  public index: string = ''
  public active?: boolean = false
  public selected?: boolean = false
  public enable?: boolean = false
  public visiable?: boolean = false
  public title: string = ''
  public keepAlive: boolean = true

  public constructor(
    name: string = '',
    index: string = '',
    title: string = '',
    active: boolean = false,
    selected: boolean = false,
    enable: boolean = true,
    visiable: boolean = true,
    keepAlive: boolean = true
  ) {
    this.active = active
    this.enable = enable
    this.index = index
    this.keepAlive = keepAlive
    this.name = name
    this.selected = selected
    this.title = title
    this.visiable = visiable
  }
}
