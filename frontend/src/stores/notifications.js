// src/stores/notifications.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  function addNotification(notif) {
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

  function deleteNotification(id) {
    notifications.value = notifications.value.filter(n => n.timestamp !== id)
  }

  return {
    notifications,
    unreadCount,
    addNotification,
    markAllRead,
    clearAll,
    deleteNotification
  }
})