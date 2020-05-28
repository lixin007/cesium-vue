import ModuleTree from './ModuleTree/index.js'
const install = function (Vue) {
  ModuleTree.install(Vue)
}
export default {
  install //全部组件都加载
}

export {
  ModuleTree //按需加载
}
