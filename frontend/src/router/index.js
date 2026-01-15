import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/components/Home.vue"
import NotFound from "@/components/NotFound.vue"
import CarTracingView from '@/components/views/CarTracingView.vue'
import RaceView from '@/components/views/RaceView.vue'
import SystemManagementView from '@/components/views/SystemManagementView.vue'

const routes = [
    { path: "/", component: Home },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignupView },
    { path: "/cartracing", component: CarTracingView },
    { path: "/race", component: RaceView },
    { path: "/events", component: EventsView },
    { path: "/sysadmin", component: SystemManagementView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
