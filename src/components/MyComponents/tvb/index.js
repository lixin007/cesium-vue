import tvbA from './a'
import tvbB from './b'
import tvbC from './c'
const install = function (Vue) {
    tvbA.install(Vue),
    tvbB.install(Vue),
    tvbC.install(Vue)
}
export default {
  install //全部组件都加载
}

export {
  tvbA, //按需加载
  tvbB,
  tvbC
}
