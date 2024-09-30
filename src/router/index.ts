import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app_home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/inscription',
    name: 'app_users_register',
    component: () => import('../views/users/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
