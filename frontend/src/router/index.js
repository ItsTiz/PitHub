/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'

const roleRank = {
    user: 1,
    team: 2,
    admin: 3
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts(routes)
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    console.log("to", to.path, "auth", auth.isAuthenticated, "requiresAuth", to.meta.requiresAuth);

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        console.log('Blocked unauth access to:', to.path)
        return next('/login');
    }

    if (to.path === '/' || to.path === '') {
        if (auth.isAuthenticated) {
            auth.redirectByRole(router)
            return
        }
        return next('/login');
    }

    if (to.meta.guestOnly && auth.isAuthenticated) {
        auth.redirectByRole(router);
        return
    }

    if (to.meta.minRole && auth.user?.role) {
        const userRank = roleRank[auth.user.role] ?? 0
        const requiredRank = roleRank[to.meta.minRole] ?? 999
        if (userRank < requiredRank) {
            return next('/[...path]')
        }
    }
    next();
})

router.onError((err, to) => {
    if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
        if (localStorage.getItem('vuetify:dynamic-reload')) {
            console.error('Dynamic import error, reloading page did not fix it', err)
        } else {
            console.log('Reloading page to fix dynamic import error')
            localStorage.setItem('vuetify:dynamic-reload', 'true')
            location.assign(to.fullPath)
        }
    } else {
        console.error(err)
    }
})

router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload')
})

export default router