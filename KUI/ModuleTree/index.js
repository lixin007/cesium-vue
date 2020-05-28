import ModuleTree from './main.vue'

ModuleTree.install = function (Vue) {
  Vue.component(ModuleTree.name, ModuleTree)
}

export default ModuleTree
