<script setup>
import { computed } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const store = useNotificationsStore()
const events = computed(() => store.notifications || [])

function deleteEvent(timestamp) {
  store.deleteNotification(timestamp)
}

function getIcon(type) {
  const icons = {
    lap_completed: 'mdi-flag-checkered',
    pit_stop: 'mdi-tire',
    overtake: 'mdi-swap-horizontal',
    low_fuel: 'mdi-fuel',
    safety_car: 'mdi-car-emergency',
    red_flag: 'mdi-flag',
    yellow_flag: 'mdi-flag-outline',
    mechanical_failure: 'mdi-wrench',
    incident: 'mdi-alert'
  }
  return icons[type] || 'mdi-information'
}

function getColor(type) {
  const colors = {
    lap_completed: 'success',
    pit_stop: 'info',
    overtake: 'primary',
    low_fuel: 'warning',
    safety_car: 'amber',
    red_flag: 'error',
    yellow_flag: 'warning',
    mechanical_failure: 'error',
    incident: 'error'
  }
  return colors[type] || 'grey'
}
</script>

<template>
  <UiSheet
    :elevation="2"
    :backgroundColor="'surface'"
    :roundedRadius="'lg'"
    :sheetClasses="'h-100 w-100 d-flex flex-column pa-3 overflow-y-auto'"
  >
    <div class="d-flex align-center mb-2">
      <v-icon start color="primary">mdi-history</v-icon>
      <span class="ml-2">Event Log</span>
      <v-spacer />
      <v-chip
        size="small"
        :color="events.length ? 'primary' : 'grey'"
        variant="tonal"
      >
        {{ events.length }}
      </v-chip>
    </div>

    <v-divider class="mb-2" />

    <v-list density="compact" class="flex-grow-1 overflow-y-auto">
      <v-list-item
        v-for="ev in events"
        :key="ev.timestamp"
        :title="ev.message"
        :subtitle="new Date(ev.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})"
        density="compact"
      >
        <template #prepend>
          <v-icon small :color="getColor(ev.type)">{{ getIcon(ev.type) }}</v-icon>
        </template>
        <template #append>
          <v-btn icon size="x-small" variant="text" @click="deleteEvent(ev.timestamp)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-list-item>

      <v-list-item v-if="!events.length">
        <v-list-item-title class="text-center text-grey">
          No events
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn
      v-if="events.length > 0"
      variant="text"
      size="small"
      color="grey"
      class="mt-2 align-self-start"
      @click="store.clearAll"
    >
      Clear All
    </v-btn>
  </UiSheet>
</template>