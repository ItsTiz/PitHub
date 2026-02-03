<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    const users = ref([])
    const loading = ref(false)
    const router = useRouter()

    onMounted(async () => {
        loading.value = true
        try {
            const res = await axios.get('http://localhost:3000/v1/users', {
                headers: { 'Cache-Control': 'no-cache' }
            })
            users.value = res.data
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    })

    const resetDialog = ref(false)
    const tempPassword = ref('')
    const currentUserId = ref('')

    function openReset(id) {
        currentUserId.value = id
        tempPassword.value = ''
        resetDialog.value = true
    }

    async function deleteUser(id) {
        if (!confirm('Confirm delete?')) return
        try {
            await axios.delete(`/v1/users/${id}`)
            users.value = users.value.filter(u => u._id !== id)
        } catch (err) {
            console.error(err)
        }
    }

    function goToSignup() {
        router.push('/signup')
    }

    async function confirmReset() {
        if (!tempPassword.value || tempPassword.value.length < 6) return alert('Password to short')
        console.log(currentUserId.value)
    
        console.log(tempPassword.value)
        try {
            await axios.post('http://localhost:3000/v1/users/admin-reset-password', {
                userId: currentUserId.value,
                tempPassword: tempPassword.value
            })
    
            alert('Password changed')
            resetDialog.value = false
        } catch (err) {
            alert('Errore: ' + (err.response?.data?.message || 'Errore'))
        }
    }
</script>

<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="d-flex align-center">
                Users
                <v-spacer />
                <UiButton
                    :title="'Add User'"
                    :icon-only="false"
                    :icon="'mdi-plus'"
                    :background-color="'primary'"
                    @clicked="goToSignup"
                />
            </v-card-title>

            <v-card-text>
                <v-data-table
                    :headers="[
                        { title: 'Email', key: 'email' },
                        { title: 'Role', key: 'role' },
                        { title: 'Actions', key: 'actions', sortable: false }
                    ]"
                    :items="Array.isArray(users) ? users : []"
                    :loading="loading"
                    no-data-text="No users found"
                >
                    <template #[`item.actions`]="{ item }">
                        <UiButton
                            :icon="'mdi-delete'"
                            :icon-only="true"
                            :background-color="'error'"
                            :variant="'outlined'"
                            class="mr-4"
                            @clicked="deleteUser(item._id)"
                        />
                        <UiButton
                            :icon="'mdi-lock-reset'"
                            :icon-only="true"
                            :background-color="'warning'"
                            :variant="'outlined'"
                            @clicked="openReset(item._id)"
                        />

                        <v-dialog
                            v-model="resetDialog"
                            max-width="400"
                        >
                            <v-card>
                                <v-card-title>Reset Password</v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        v-model="tempPassword"
                                        label="New temporary password"
                                        type="password"
                                        :rules="[v => !!v || 'Required', v => v.length >= 6 || 'Min 6 characters']"
                                    />
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn
                                        text
                                        @click="resetDialog = false"
                                    >
                                        Back
                                    </v-btn>
                                    <UiButton
                                        title="Confirm"
                                        background-color="primary"
                                        @clicked="confirmReset"
                                    />
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>