import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/login/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/home/Home'),
    redirect: '/Welcome',
    children: [{
      path: '/welcome',
      component: () => import('@/components/welcome/Welcome')
    },
    {
      path: '/user/list',
      component: () => import('@/components/system/SysUserList')
    }
    ]
  }



]

const router = new VueRouter({
  routes
})

// 编写路由导航==>路由守卫
router.beforeEach((to, from, next) => {
  //如果用户访问登录页，直接放行
  if (to.path == '/') return next();
  //从 sessionStorage 中获取到保存的token值
  const token = window.sessionStorage.getItem('authorization')
  //没有token ,强制跳转登录页
  if (!token) return next("/")
  next();
})

export default router
