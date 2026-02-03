<script setup>
    import { onMounted, onUnmounted } from 'vue';
    import { useSimulationControlStore } from '../stores/simulation';

    const simStore = useSimulationControlStore();

    onMounted(() => {
        simStore.subscribeToSimLogs();
    });


    onUnmounted(() => {
        simStore.unsubscribeToSimLogs();
    });

</script>

<template>
    <RouterView />
</template>

<route lang="yaml">
meta:
  layout: sysadminlayout
  requiresAuth: true
  minRole: 'admin'
  guestOnly: false
</route>