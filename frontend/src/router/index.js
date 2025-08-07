import { createRouter, createWebHistory } from 'vue-router'
import { useWeb3Store } from '@/stores/web3'
import { ElMessage } from 'element-plus'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表板',
      requiresAuth: true
    }
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('@/views/Transfer.vue'),
    meta: {
      title: '转账',
      requiresAuth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History.vue'),
    meta: {
      title: '交易历史',
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      title: '管理面板',
      requiresAuth: true,
      requiresOwner: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const web3Store = useWeb3Store()
  
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Fish Token` : 'Fish Token'
  
  // 检查是否需要钱包连接
  if (to.meta.requiresAuth && !web3Store.isConnected) {
    ElMessage.warning('请先连接钱包')
    next('/')
    return
  }
  
  // 检查是否需要管理员权限
  if (to.meta.requiresOwner && !web3Store.isOwner) {
    ElMessage.error('需要管理员权限')
    next('/dashboard')
    return
  }
  
  next()
})

export default router
