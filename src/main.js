import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import vueToastPanel from "@/components/MyComponents/test/test.js"
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/components/alert/'
import '@/permission' // permission control
import '@/assets/icon/iconfont.css' //第三方图标

import ECharts from 'vue-echarts/components/ECharts'
import "echarts/lib/chart/bar"
import "echarts/lib/chart/line"
import "echarts/lib/chart/pie"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/legend"
import "echarts/lib/component/markPoint"
import "echarts/lib/component/markLine"
import "echarts/lib/component/graphic"
import 'echarts/lib/component/dataZoom'
Vue.component('chart', ECharts)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(vueToastPanel)
Vue.config.productionTip = false

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
