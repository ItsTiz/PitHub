<template>
    <v-container fluid class="d-flex flex-row bg-surface-bright">
        USers
    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'admin'
  guestOnly: false
</route>