import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth_user')
  if (to.name === 'Dashboard' && !auth) next({ name: 'Login' })
  else if (to.name === 'Login' && auth) next({ name: 'Dashboard' })
  else next()
})

export default router
