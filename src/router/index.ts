import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { useStore } from 'vuex';
const routes: Array<RouteRecordRaw> = [
  //---------- HomePages and pages 
  {
    path: '/',
    name: 'app_home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/assistance',
    name: 'app_assistance',
    component: () => import('../views/home/AssistanceView.vue')
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
  },
  {
    path: '/Decouvrirprofil',
    name: 'app_users_decouvrirprofil',
    component: () => import('../views/users/DecouvertProfilView.vue'),
    meta: { requiresAuth: true , requiresAdmin: false},
  },
  {
    path: '/ConditionsGénérales',
    name: 'app_users_cg',
    component: () => import('../views/users/CGView.vue')
  },
  {
    path: '/MentionsLégals',
    name: 'app_users_ml',
    component: () => import('../views/users/Mentions.vue')    
  },
  {
    path: '/PolitiqueCookies',
    name: 'app_users_cookies',
    component: () => import('../views/users/Cookies.vue')   
  }
  ,
  {
    path: '/Contact',
    name: 'app_users_contact',
    component: () => import('../views/users/ContactView.vue')
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
