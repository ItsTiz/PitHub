<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  redirect: to => {
    return '/controlroom/telemetry'
  }
})
</script>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>