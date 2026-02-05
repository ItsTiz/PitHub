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
            showToast('Not matching password', 'error')
            return
        }
        if (newPassword.value.length < 6) {
            showToast('Password must be at least 6 characters', 'error')
            return
        }

        loading.value = true
        try {
            await auth.changePassword(currentPassword.value, newPassword.value)
            showToast('Password changed', 'success')
            currentPassword.value = ''
            newPassword.value = ''
            confirmPassword.value = ''
        } catch (err) {
             showToast('Error: ' + (err.response?.data?.message || 'Error'), 'error')
        } finally {
            loading.value = false
        }
    }

    const toastMessage = ref('')
    const toastType = ref('info')

    function showToast(msg, type = 'info') {
      toastMessage.value = msg
      toastType.value = type
    }
</script>

<template>
    <v-container>
        <UiSheet   :elevation="2"
            :backgroundColor="'surface'"
            :roundedRadius="'lg'"
            :sheetClasses="'w-100 d-flex flex-column pa-3 overflow-hidden'">
             
            <v-card>
                <v-card-title class="text-h5 mb-6">
                    Your account
                </v-card-title>

                <v-list two-line>
                    <v-list-item>
                        <v-list-item-title>Name</v-list-item-title>
                        <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Role</v-list-item-title>
                        <v-list-item-subtitle>{{ user.role || 'User' }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>

                <v-divider class="my-6" />

                <v-card-subtitle class="text-h6 mb-4"> 
                    Change password
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
                    <UiButton
                        title="Update password"
                        type="submit"
                        color="primary"
                        block
                        :loading="loading"
                        :disabled="loading"
                    />
                        
                </v-form>
            </v-card>
        </UiSheet>
    </v-container>
    <Toast :message="toastMessage" :type="toastType" />
</template>
