<script setup>
    import { ref, onMounted } from 'vue'
    import { useAuthStore } from '@/stores/auth'

    const auth = useAuthStore()

    const user = ref(auth.user || {})
    const currentPassword = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    onMounted(() => {
        if (!auth.isAuthenticated) auth.fetchUser() 
    })

    const changePassword = async () => {
        error.value = ''
        success.value = ''
        if (newPassword.value !== confirmPassword.value) {
            error.value = 'Le password non corrispondono'
            return
        }
        if (newPassword.value.length < 6) {
            error.value = 'La nuova password deve avere almeno 6 caratteri'
            return
        }

        loading.value = true
        try {
            await auth.changePassword(currentPassword.value, newPassword.value)
            success.value = 'Password aggiornata con successo'
            currentPassword.value = ''
            newPassword.value = ''
            confirmPassword.value = ''
        } catch (err) {
            error.value = err.response?.data?.message || 'Errore durante il cambio password'
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <v-container>
        <v-card
            elevation="4"
            class="pa-6 mx-auto"
            max-width="600"
        >
            <v-card-title class="text-h5 mb-6">
                Il tuo profilo
            </v-card-title>

            <v-list two-line>
                <v-list-item>
                    <v-list-item-title>Nome</v-list-item-title>
                    <v-list-item-subtitle>{{ user.name || '' }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Ruolo</v-list-item-title>
                    <v-list-item-subtitle>{{ user.role || 'User' }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>

            <v-divider class="my-6" />

            <v-card-subtitle class="text-h6 mb-4">
                Cambia password
            </v-card-subtitle>

            <v-form @submit.prevent="changePassword">
                <v-text-field
                    v-model="currentPassword"
                    label="Current password"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    :rules="[v => !!v || 'Required']"
                    required
                />

                <v-text-field
                    v-model="newPassword"
                    label="New password"
                    type="password"
                    prepend-inner-icon="mdi-lock-reset"
                    :rules="[v => !!v || 'Required', v => v.length >= 6 || 'Password must be at least 6 characters']"
                    required
                />

                <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    prepend-inner-icon="mdi-lock-check"
                    :rules="[v => !!v || 'Required', v => v === newPassword || 'Passwords do not match']"
                    required
                />

                <v-alert
                    v-if="error"
                    type="error"
                    class="mb-4"
                    density="compact"
                >
                    {{ error }}
                </v-alert>

                <v-alert
                    v-if="success"
                    type="success"
                    class="mb-4"
                    density="compact"
                >
                    {{ success }}
                </v-alert>

                <v-btn
                    type="submit"
                    color="primary"
                    block
                    :loading="loading"
                    :disabled="loading"
                >
                    Update password
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  layout: ProfileLayout          
</route>