import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref([])
    const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

    function add(notif) {
        notifications.value.unshift({
            ...notif,
            timestamp: notif.timestamp || Date.now(),
            read: false
        })
    }

    function markAllRead() {
        notifications.value.forEach(n => { n.read = true })
    }

    function clearAll() {
        notifications.value = []
    }

    function deleteNotification(timestamp) {
        notifications.value = notifications.value.filter(n => n.timestamp !== timestamp)
    }

    function connect() {
        const token = useAuthStore().token
        if (!token) return

        const es = new EventSource(`http://localhost:3000/notifications?token=${token}`)
        es.onmessage = e => add(JSON.parse(e.data))
        es.onerror = () => es.close()
        return es
    }

    return {
        notifications,
        unreadCount,
        add,
        markAllRead,
        clearAll,
        deleteNotification,
        connect
    }
})