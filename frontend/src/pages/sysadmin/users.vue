<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const users = ref([])
    const loading = ref(false)
    const deleteDialog = ref(false)
    const userToDelete = ref('')

    onMounted(async () => {
        loading.value = true
        try {
            const res = await axios.get('http://localhost:3000/v1/users', {
                headers: { 'Cache-Control': 'no-cache' }
            })
            users.value = res.data
            console.log(users.value)
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

    async function deleteUser() {
        try {
            await axios.delete(`http://localhost:3000/v1/users/${userToDelete.value}`)

            users.value = users.value.filter(u => u._id !== userToDelete.value)

            showToast('User deleted', 'success')

        } catch (err) {
            console.error(err)
            showToast('Error deleting user', 'error')
        } finally {
            deleteDialog.value = false
            userToDelete.value = ''
        }
    }


    const showAddDialog = ref(false)

    async function fetchUsers() {
        loading.value = true
        try {
            const res = await axios.get('http://localhost:3000/v1/users')
            users.value = res.data
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }
    function openDelete(id) {
        userToDelete.value = id
        deleteDialog.value = true
    }

    async function handleReset(newPassword) {
        try {
            await axios.post('http://localhost:3000/v1/users/admin-reset-password', {
                userId: currentUserId.value,
                tempPassword: newPassword
            })
            showToast('Password changed', 'success')
            resetDialog.value = false
        } catch (err) {
            showToast('Error: ' + (err.response?.data?.message || 'Error'), 'error')
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
    <v-container fluid>
        <UiSheet :sheet-classes="'pa-4 mb-6'">
            <v-card-title class="d-flex align-center">
                Users
                <v-spacer />
                <UiButton
                    :title="'Add User'"
                    :icon-only="false"
                    :icon="'mdi-plus'"
                    :background-color="'primary'"
                    @clicked="showAddDialog = true"
                />
            </v-card-title>
        </UiSheet>
        <UiSheet :sheet-classes="'pa-0'">   
            <v-data-table
                :headers="[
                    { title: 'Name', key: 'name' },
                    { title: 'Email', key: 'email' },
                    { title: 'Team', key: 'team.name' },
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
                        size="x-small"
                        class="mr-4"
                        @clicked="openDelete(item._id)"
                    />
                    <UiButton
                        :icon="'mdi-lock-reset'"
                        :icon-only="true"
                        :background-color="'warning'"
                        :variant="'outlined'"
                        size="x-small"
                        @clicked="openReset(item._id)"
                    />
                </template>
            </v-data-table>
        </UiSheet>
    </v-container>
    <AddUserDialog
        v-model="showAddDialog"
        @added="fetchUsers"
    />
    <Toast
        :message="toastMessage"
        :type="toastType"
    />
    <ResetPasswordDialog
        v-model="resetDialog"
        :user-id="currentUserId"
        @confirm="handleReset"
    />
    <DeleteUserDialog
        v-model="deleteDialog"
        :user-id="userToDelete"
        @confirm="deleteUser"
    />

</template>