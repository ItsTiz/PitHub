/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes as autoRoutes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'

import CarTracing from '@/pages/CarTracing.vue'
import Race from '@/pages/Race.vue'
import SysAdmin from '@/pages/SysAdmin.vue'
import NotFound from '@/components/NotFound.vue'

const roleRank = {
  user: 1,
  team: 2,
  admin: 3
}

const routes = setupLayouts([
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/pages/Login.vue'), meta: { guestOnly: true} },
  { path: '/car-tracing', name: 'car-tracing', component: CarTracing, meta: { requiresAuth: true, minRole: 'team' } },
  { path: '/race', name: 'race', component: Race, meta: { requiresAuth: true, minRole: 'user' } },
  { path: '/sysadmin', name: 'sysadmin', component: SysAdmin, meta: { requiresAuth: true, minRole: 'admin' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/signup', name: 'signup', component: () => import('@/pages/Signup.vue')},
])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore() 
  console.log(auth.isAuthenticated)
  console.log('to:', to.path, 'auth:', auth.isAuthenticated, 'role:', auth.user?.role)
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
  console.log('Blocked unauth access to:', to.path)
  return next('/login')
}
  if (to.path === '/' || to.path === '') {
    if (auth.isAuthenticated) {
      auth.redirectByRole(router)
      return
    }
    return next('/login')
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    auth.redirectByRole(router)
    return
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.minRole && auth.user?.role) {
    const userRank = roleRank[auth.user.role] ?? 0
    const requiredRank = roleRank[to.meta.minRole] ?? 999
    if (userRank < requiredRank) {
      return next({ name: 'NotFound' })
    }
  }

  next()
})

export default router