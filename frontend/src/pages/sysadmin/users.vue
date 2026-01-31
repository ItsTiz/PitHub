<template>
    <v-container fluid class="d-flex flex-row bg-surface-bright">
        Users
    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'admin'
  guestOnly: false
  layout: sysadminlayout
</route>