import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 轻量级进度条
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title) //to.meta.title 就是router里相关项meta对象的title

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) { //已登录
    if (to.path === '/login') { //已登录状态，访问login页面时，跳到根目录
      next({ path: '/' })
      NProgress.done()
    } else { //已登录状态，访问非login页面时
      const hasGetUserInfo = store.getters.name //获取登录用户名名称
      if (hasGetUserInfo) { // store里已有用户名 (正常经常执行的)
        next()
      } else { // store里已没用户名
        try {
          await store.dispatch('user/getInfo') //调用接口获取用户名
          next()
        } catch (error) { //接口调用不成功返回登录页面
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { //未登录
    if (whiteList.indexOf(to.path) !== -1) { //在不用登录就能访问公用页面的白名单内
      next()
    } else {    //访问到没权限的页面。返回登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
