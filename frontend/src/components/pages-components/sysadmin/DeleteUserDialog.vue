<script setup>
import { ref } from 'vue'

const modelValue = ref(false)

defineProps({
    userId: { type: String, default: "" }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const loading = ref(false)

async function confirmDelete() {
    loading.value = true
    try {
        emit('confirm')
        emit('update:modelValue', false)
    } finally {
        loading.value = false
    }
}

function cancel() {
    emit('update:modelValue', false)
}
</script>

<template>
<v-dialog
    v-model="modelValue"
    max-width="450"
    persistent
>
    <UiCard elevation="6" border-color="error">

        <template #title>
            Delete User
        </template>

        <template #text>
            Are you sure you want to delete this user?  
            This action cannot be undone.
        </template>

        <template #actions>
            <v-spacer />

            <UiButton
                title="Cancel"
                variant="text"
                @clicked="cancel"
            />

            <UiButton
                title="Delete"
                background-color="error"
                :loading="loading"
                :disabled="loading"
                @clicked="confirmDelete"
            />

        </template>

    </UiCard>
</v-dialog>
</template>
