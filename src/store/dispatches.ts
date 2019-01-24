// 建议dispatch/commit调用，均采用如下形式包裹一层，以启用类型推导

import store from './index'

// dispatch是分发一个printMsg的执行请求，至于后面是否被执行，以及执行结果，表示均不关心
export const dispatchPrintMsg = (str: string) => {
  return store.dispatch('printMsg', str)
}

// dispatch是分发一个printMsg的执行请求，至于后面是否被执行，以及执行结果，表示均不关心
export const dispatchAlertMsg = (msg: string) => {
  return store.dispatch('alertMsg', msg)
}
