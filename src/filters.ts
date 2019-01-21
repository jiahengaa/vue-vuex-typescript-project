import Vue, { VueConstructor } from 'vue'

export interface FmtDateFilter {
  name: string
  filter: Function
}

const fmtDateFilter: FmtDateFilter = {
  name: 'fmtDate',
  filter: (date: Date, fmt: any): string => {
    var mdate = new Date(date)
    var o: any = {
      'M+': mdate.getMonth() + 1, //月份
      'd+': mdate.getDate(), //日
      'h+': mdate.getHours(), //小时
      'm+': mdate.getMinutes(), //分
      's+': mdate.getSeconds(), //秒
      'q+': Math.floor((mdate.getMonth() + 3) / 3), //季度
      S: mdate.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (mdate.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
  }
}

export default (vue: VueConstructor) => {
  vue.filter(fmtDateFilter.name, fmtDateFilter.filter)
}
