<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  redirect: to => {
    return '/controlroom/telemetry'
  }
})
</script>