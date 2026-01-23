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
import Race       from '@/pages/Race.vue'
import SysAdmin   from '@/pages/SysAdmin.vue'
import NotFound   from '@/components/NotFound.vue'

const roleRank = {
  user:  1,
  team:  2,
  admin: 3,
}

const routes = setupLayouts([
  ...autoRoutes,
  { path: '/car-tracing', name: 'car-tracing', component: CarTracing, meta: { requiresAuth: true, minRole: 'team'  } },
  { path: '/race',        name: 'race',        component: Race,       meta: { requiresAuth: true, minRole: 'user'  } },
  { path: '/sysadmin',    name: 'sysadmin',    component: SysAdmin,   meta: { requiresAuth: true, minRole: 'admin' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.guestOnly && auth.isAuthenticated) {
    // Redirect based on role — reuse the same logic you use after login
    auth.redirectByRole(router)
    return
  }

  // Require authentication
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login') 
  }

  if (to.meta.role && auth.user?.role) {
    const allowed = roleHierarchy[auth.user.role] || []
    if (!allowed.includes(to.meta.role)) {
      return next({ name: 'NotFound' })
    }
  }

  next()
})

export default router