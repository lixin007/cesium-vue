const MyPlugin = {
  install:function (Vue, options) {
    Vue.directive('aa1', {
      bind (el, binding, vnode, oldVnode) {
        // el.style["color"]= binding.value;
        el.style["background"]= "green"
      }
    })
    Vue.mixin({
      methods: function aa(data) {
        return data+"成功"
      }
    })
  }
};
export default MyPlugin


export const mixin = {
  methods: {
    formatDate (dateTime) {
      debugger
      // return dateTime+"成功"
      alert(dateTime+"成功")
    }
  }
}

