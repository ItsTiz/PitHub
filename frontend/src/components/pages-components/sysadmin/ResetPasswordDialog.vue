<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
  userId?: string
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])

const tempPassword = ref('')
const loading = ref(false)

async function confirm() {
  if (!tempPassword.value || tempPassword.value.length < 6) {
    return
  }

  loading.value = true
  try {
    emit('confirm', tempPassword.value)
    emit('update:modelValue', false)
    tempPassword.value = ''
  } finally {
    loading.value = false
  }
}

function cancel() {
  tempPassword.value = ''
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog v-model="props.modelValue" max-width="500" persistent :scrim="false">
    <UiCard :elevation="6" backgroundColor="surface" borderColor="primary">
      <template #title>Reset Password</template>

      <template #text>
        <v-text-field
          v-model="tempPassword"
          label="New temporary password"
          type="password"
          :rules="[v => !!v || 'Required', v => v.length >= 6 || 'Min 6 characters']"
        />
      </template>

      <template #actions>
        <v-spacer />
        <UiButton title="Back" variant="text" @clicked="cancel" />
        <UiButton
          title="Confirm"
          variant="flat"
          background-color="primary"
          :loading="loading"
          :disabled="loading"
          @clicked="confirm"
        />
      </template>
    </UiCard>
  </v-dialog>
</template>