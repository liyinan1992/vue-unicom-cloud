import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
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
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '主看板',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主看板', icon: 'dashboard' }
    }]
  },

  {
    path: '/server',
    component: Layout,
    redirect: '/server/result',
    name: '主机',
    meta: { title: '主机', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'result',
        name: '巡检结果',
        component: () => import('@/views/server/result/index'),
        meta: { title: '当前巡检结果', icon: 'table' }
      },
      {
        path: 'history',
        name: '巡检历史',
        component: () => import('@/views/server/history/index'),
        meta: { title: '巡检历史', icon: 'tree' }
      },
      {
        path: 'abnormal',
        name: '指标异常',
        component: () => import('@/views/server/abnormal/index'),
        meta: { title: '指标异常', icon: 'el-icon-warning' }
      }
      /*
      {
        path: 'instruction',
        name: '指令执行',
        component: () => import('@/views/server/instruction/index'),
        meta: { title: '指令执行', icon: 'el-icon-edit' }
      }
      */
    ]
  },

  /*
  {
    path: '/net',
    component: Layout,
    redirect: '/net/result',
    name: '网络',
    meta: { title: '网络', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'result',
        name: '当前巡检结果',
        component: () => import('@/views/net/result/index'),
        meta: { title: '当前巡检结果', icon: 'table' }
      },
      {
        path: 'history',
        name: '巡检历史',
        component: () => import('@/views/net/history/index'),
        meta: { title: '巡检历史', icon: 'tree' }
      }
    ]
  },

  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/result',
    name: '存储',
    meta: { title: '存储', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'result',
        name: '当前巡检结果',
        component: () => import('@/views/storage/result/index'),
        meta: { title: '当前巡检结果', icon: 'table' }
      },
      {
        path: 'history',
        name: '巡检历史',
        component: () => import('@/views/storage/history/index'),
        meta: { title: '巡检历史', icon: 'tree' }
      }
    ]
  },
  */

  {
    path: '/strategy',
    component: Layout,
    redirect: '/strategy/',
    name: '巡检管理',
    meta: { title: '巡检管理', icon: 'el-icon-s-home' },
    children: [
      {
        path: 'server',
        name: '主机管理',
        component: () => import('@/views/strategy/server/index'),
        meta: { title: '主机管理', icon: 'el-icon-s-platform' }
      },
      {
        path: 'instruction',
        name: '指令管理',
        component: () => import('@/views/strategy/instruction/index'),
        meta: { title: '指令管理', icon: 'el-icon-s-order' }
      }
    ]
  },

  /*
  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/list',
    name: '预警管理',
    meta: { title: '预警管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '规则列表',
        component: () => import('@/views/alarm/list/index'),
        meta: { title: '规则列表', icon: 'table' }
      },
      {
        path: 'edit',
        name: '规则编制',
        component: () => import('@/views/alarm/edit/index'),
        meta: { title: '规则编制', icon: 'tree' }
      }
    ]
  },
  */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
