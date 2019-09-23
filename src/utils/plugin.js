let MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
    console.log('myGlobalMethod')
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      el.style["color"]= binding.value;
    }
  })

  // 3. 注入组件
  Vue.mixin({
    methods: function () {
     function aa (){
       alert('66666')
     }
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
    console.log('myMethod')
  }
}
export default MyPlugin
