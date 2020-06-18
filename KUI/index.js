import ModuleTree from './ModuleTree/index.js'
import KuiButton from './Button/index.js'
const install = function (Vue) {
  ModuleTree.install(Vue)
  KuiButton.install(Vue)
}
export default {
  install //全部组件都加载
}

export {
  ModuleTree, //按需加载
  KuiButton
}
