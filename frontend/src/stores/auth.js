// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useAuthStore = defineStore('auth', () => {
    // State
    const token = ref(localStorage.getItem('token'))
    const user = ref(
        token.value ? JSON.parse(localStorage.getItem('user') || 'null') : null
    )

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const userRole = computed(() => user.value?.role || 'guest')

    // Actions
    const setAuth = (newToken, newUser) => {
        token.value = newToken
        user.value = newUser

        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(newUser))

        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    }

    const clearAuth = () => {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
    }

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_BASE}/v1/users/login`, { email, password })
            setAuth(data.token, data.user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            return data.user
        } catch (err) {
            throw err.response?.data?.message || 'Login failed'
        }
    }

    const register = async (payload) => {
        try {
            const { data } = await axios.post(`${API_BASE}/v1/users/register`, payload)
            await login(data.user.email, payload.password)
            return data
        } catch (err) {
            throw err.response?.data?.message || 'Registration failed'
        }
    }

    const logout = () => {
        clearAuth()
    }

    const redirectByRole = (router) => {
        if (!user.value?.role) {
            router.push('/login')
            return
        }

        const redirects = {
            admin: '/sysadmin',
            team: '/controlroom/telemetry',
            user: '/race'
        }

        const target = redirects[user.value.role] || '/race'
        router.push(target)
    }

    const fetchUser = async () => {
        if (!token.value) return
        try {
            const { data } = await axios.get(`${API_BASE}/v1/users/me`)
            user.value = data.user
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (err) {
            clearAuth()
        }
    }

    const changePassword = async (currentPassword, newPassword) => {
        console.log('Token prima della chiamata:', token.value)
        console.log('Bearer header:', axios.defaults.headers.common['Authorization'])
        try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
           await axios.post(`${API_BASE}/v1/users/change-password`, 
            { current_password: currentPassword, password: newPassword },
            { headers: { Authorization: `Bearer ${token.value}` } }
            )
        } catch (err) {
            console.log(err)
            throw err.response?.data?.message || 'Password changing failed'
        }
    }

    // Initial setup
    if (token.value) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin,
        userRole,
        login,
        register,
        logout,
        redirectByRole,
        setAuth,
        clearAuth,
        fetchUser,
        changePassword
    }
})