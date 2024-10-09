import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { useStore } from 'vuex';
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
  },
  {
    path: '/connexion',
    name: 'app_users_login',
    component: () => import('../views/users/LoginView.vue')
  },
  {
    path: '/profiles',
    name: 'app_users_profil',
    component: () => import('../views/users/ProfilesView.vue'),
    meta: { requiresAuth: true , requiresAdmin: false},
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  if (['/', '/inscription', '/'].includes(to.path)) {
    next(); 
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/'); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
