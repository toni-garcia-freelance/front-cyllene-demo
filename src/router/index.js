import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/View/HomeView.vue')
    },
    {
      path: '/home',
      name: 'home2',
      component: () => import('../components/View/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/View/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/View/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/View/RegisterView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../components/View/ProfileView.vue')
    },
    {
      path: '/stations-charging',
      name: 'stations-charging',
      component: () => import('../components/View/StationsChargingView.vue')
    }
  ]
})

export default router
