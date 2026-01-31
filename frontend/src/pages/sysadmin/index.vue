<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  redirect: to => {
    return '/sysadmin/simulation'
  }
})
</script>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'admin'
  guestOnly: false
</route>