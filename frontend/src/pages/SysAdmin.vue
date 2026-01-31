<template>
    <RouterView/>
</template>

<route lang="yaml">
meta:
  layout: sysadminlayout
  requiresAuth: true
  minRole: 'admin'
  guestOnly: false
</route>