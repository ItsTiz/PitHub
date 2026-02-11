<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const modelValue = defineModel()
    const emit = defineEmits(['update:modelValue', 'added'])

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('user')
    const teamId = ref('')
    const teams = ref([])
    const loading = ref(false)
    const toastMessage = ref('')
    const toastType = ref('info')

    function showToast(msg, type = 'info') {
        toastMessage.value = msg
        toastType.value = type
    }

    onMounted(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/v1/teams`)
            teams.value = res.data
        } catch (err) {
            console.error(err)
        }
    })

    async function addUser() {
        if (!email.value || !password.value) {
            showToast('Email and password required', 'error')
            return
        }
        if (role.value === 'team' && !teamId.value) {
            showToast('Select a team', 'error')
            return
        }

        loading.value = true

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/v1/users`, {
                name: name.value,
                email: email.value,
                password: password.value,
                role: role.value,
                team: role.value === 'team' ? teamId.value : undefined
            });
            showToast('User added successfully', 'success')
            emit('added')
            emit('update:modelValue', false)
            resetForm()
        } catch (err) {
            showToast('Registration error: ' + (err.response?.data?.message || 'Unknown error'), 'error')
        } finally {
            loading.value = false
        }
    }

    function resetForm() {
        name.value = ''
        email.value = ''
        password.value = ''
        role.value = 'user'
        teamId.value = ''
    }
</script>

<template>
    <v-dialog
        v-model="modelValue"
        max-width="500"
        persistent
    >
        <UiCard
            :elevation="6"
            :background-color="'surface'"
            :border-color="'primary'"
            title-classes="text-h5"
            text-classes="pa-4"
        >
            <template #title>
                Add User
            </template>

            <template #text>
                <v-form @submit.prevent="addUser">
                     <v-text-field
                        v-model="name"
                        label="Name"
                        type="name"
                        prepend-inner-icon="mdi-text"
                        required
                    />
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        prepend-inner-icon="mdi-email"
                        required
                    />
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        prepend-inner-icon="mdi-lock"
                        required
                    />
                    <v-select
                        v-model="role"
                        :items="['user', 'team', 'admin']"
                        label="Role"
                        prepend-inner-icon="mdi-account"
                    />
                    <v-select
                        v-if="role === 'team'"
                        v-model="teamId"
                        :items="teams"
                        item-title="name"
                        item-value="_id"
                        label="Team"
                        prepend-inner-icon="mdi-flag-checkered"
                        required
                    />
                </v-form>
            </template>

            <template #actions>
                <v-spacer />
                <UiButton
                    :title="'Cancel'"
                    :variant="'text'"
                    class="mr-3"
                    :background-color="'primary'"
                    @click="$emit('update:modelValue', false)"
                />
                <UiButton
                    :title="'Add'"
                    :variant="'flat'"
                    :background-color="'primary'"
                    :loading="loading"
                    :disabled="loading"
                    @click="addUser"
                />
            </template>
        </UiCard>
    </v-dialog>

    <Toast
        :message="toastMessage"
        :type="toastType"
    />
</template>