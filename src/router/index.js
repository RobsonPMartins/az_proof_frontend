import { createRouter, createWebHistory } from 'vue-router'
import  LoginScreen from '../views/LoginScreen.vue'
import  DashboardScreen from '../views/DashboardScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginscreen',
      component: LoginScreen,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardScreen,
    },
  ],
})

export default router
