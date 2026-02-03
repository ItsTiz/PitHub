<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  timeout?: number
}>()

const show = ref(false)
const color = computed(() => {
  const map = { success: 'success', error: 'error', info: 'info', warning: 'warning' }
  return map[props.type] || 'info'
})

watch(() => props.message, (msg) => {
  if (msg) show.value = true
})

watch(show, (val) => {
  if (val && props.timeout) {
    setTimeout(() => show.value = false, props.timeout)
  }
})
</script>

<template>
  <v-snackbar v-model="show" :color="color" timeout="3000" location="bottom right">
    {{ message }}
    <template v-slot:actions>
      <v-btn icon variant="text" @click="show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>