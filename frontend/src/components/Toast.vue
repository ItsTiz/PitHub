<script setup>
    import { ref, watch, computed } from 'vue'

    const props = defineProps({
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            validator: (value) => {
                return ['success', 'error', 'info', 'warning'].includes(value)
            }
        },
        timeout: {
            type: Number,
            required: false,
            default: 0
        }
    })
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
    <v-snackbar
        v-model="show"
        :color="color"
        timeout="3000"
        location="bottom right"
    >
        {{ message }}
        <template #actions>
            <v-btn
                icon
                variant="text"
                @click="show = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>