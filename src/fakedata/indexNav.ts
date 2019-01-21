import { NavMenuItem } from '../store/index'
const indexNav: Array<NavMenuItem> = [
  {
    index: 0,
    path: {
      path: '/chat'
    },
    hint: {
      type: 'count',
      count: 0
    },
    iconClass: 'icon-wechat',
    text: '微信'
  },
  {
    index: 1,
    path: {
      path: '/contact'
    },
    hint: {
      type: 'count',
      count: 0
    },
    iconClass: 'icon-contact',
    text: '通讯录'
  },
  {
    index: 2,
    path: {
      path: '/find'
    },
    hint: {
      type: 'dot',
      count: 99
    },
    iconClass: 'icon-find',
    text: '发现'
  },
  {
    index: 0,
    path: {
      path: '/me'
    },
    hint: {
      type: 'null',
      count: 0
    },
    iconClass: 'icon-me',
    text: '我'
  }
]

export default indexNav
