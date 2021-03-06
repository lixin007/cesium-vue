import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 hidden: true // (默认 false)

 //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noredirect'

 //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 //若你想不管路由下面的 children 声明的个数都显示你的根路由
 //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
}
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout, //主页依
    redirect: '/cesium', //跳转
    children: [
      {
        path: 'cesium',
        component: () => import('@/views/cesium/measure'),
        name: 'Cesium',
        meta: { title: 'Cesium主页', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/cesium',
    component: Layout,
    redirect: '/cesium/measure',
    name: 'main-component',
    alwaysShow: true,
    meta: {
      title: '相关工具',
      icon: 'tree'
    },
    children: [
      {
        path: 'measure',
        name: 'measure',
        component: () => import('@/views/cesium/measure'),
        meta: { title: '线', icon: 'dashboard',keepAlive: true }
      },
      {
        path: 'polygon',
        name: 'polygon',
        component: () => import('@/views/cesium/polygon'),
        meta: { title: '多边形测试1', icon: 'dashboard',keepAlive: true }
      },
      {
        path: 'polygon2',
        name: 'polygon2',
        component: () => import('@/views/cesium/polygon2'),
        meta: { title: '多边形测试2', icon: 'dashboard' }
      },
      {
        path: 'polygon3',
        name: 'polygon3',
        component: () => import('@/views/cesium/polygon3'),
        meta: { title: '多边形测试3', icon: 'dashboard',keepAlive: true }
      },
      {
        path: 'draw',
        name: 'draw',
        component: () => import('@/views/cesium/draw'),
        meta: { title: '标绘工具', icon: 'dashboard',keepAlive: true }
      }
    ]
  },

  {
    path: '/test',
    component: Layout,
    // hidden: true,
    redirect: '/excel/export-excel',
    name: 'test',
    alwaysShow: true,
    meta: {
      title: 'test',
      icon: 'tree'
    },
    children: [
      {
        path: 'test0001',
        name: 'Test0001',
        component: () => import('@/views/test/test0001'),
        meta: { title: 'Test0001', icon: 'dashboard',keepAlive: true }
      },
      {
        path: 'test0002',
        component: ()=> import('@/views/test/test0002'),
        name: 'Test0002',
        meta: { title: 'Test0002', icon: 'dashboard' }
      },
      {
        path: 'test3',
        component: ()=> import('@/views/test/test0003'),
        name: 'Test3',
        meta: { title: 'Test0003', icon: 'dashboard' }
      },
      {
        path: 'test4',
        component: ()=> import('@/views/test/test0004'),
        name: 'Test4',
        meta: { title: 'Test0004', icon: 'dashboard' }
      },{
        path: 'test5',
        component: ()=> import('@/views/test/test0005'),
        name: 'Test5',
        meta: { title: 'Test0005', icon: 'dashboard' }
      },
      {
        path: 'test6',
        component: ()=> import('@/views/test/test0006'),
        name: 'Test6',
        meta: { title: 'Test0006', icon: 'dashboard' }
      },
      {
        path: 'test7',
        component: ()=> import('@/views/test/test0007'),
        name: 'Test7',
        meta: { title: 'Test0007', icon: 'dashboard' }
      },
      {
        path: 'test8',
        component: ()=> import('@/views/test/test0008'),
        name: 'Test8',
        meta: { title: 'Test0008', icon: 'dashboard' },
        children: [
          {
            path: 'test81',
            component: ()=> import('@/views/test/test0005'),
            name: 'Test81',
            meta: { title: 'Test81', icon: 'dashboard' }
          },
          {
            path: 'test82',
            component: ()=> import('@/views/test/test0006'),
            name: 'Test82',
            meta: { title: 'Test82', icon: 'dashboard' }
          },
          {
            path: 'test83',
            component: ()=> import('@/views/test/test0007'),
            name: 'Test83',
            meta: { title: 'Test83', icon: 'dashboard' }
          }
        ]
      },
      {
        path: 'test9',
        component: ()=> import('@/views/test/test0009'),
        name: 'Test9',
        meta: { title: 'Test0009', icon: 'dashboard' }
      },
      {
        path: 'test10',
        component: ()=> import('@/views/test/test0010'),
        name: 'Test10',
        meta: { title: 'Test0010', icon: 'dashboard',keepAlive: true}
      },
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table',noCache: false  }
      },
      {
        path: 'table2',
        name: 'Table2',
        component: () => import('@/views/table/table2'),
        meta: { title: 'Table2', icon: 'table',noCache: false  }
      },
      {
        path: 'canvas',
        name: 'Canvas',
        component: () => import('@/views/table/canvas'),
        meta: { title: 'canvas', icon: 'table',noCache: false  }
      },
      {
        path: 'flex',
        name: 'Flex',
        component: () => import('@/views/flex'),
        meta: { title: 'flex', icon: 'table',noCache: false  }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  { path: '/baidu',   //外链接
    beforeEnter() {location.href = 'https://www.baidu.com/'}
    },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),// 顶部 (保持原先的滚动位置，注意: 这个功能只在 HTML5 history 模式下可用。)
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
