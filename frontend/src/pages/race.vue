<script setup>
    import { onMounted, onUnmounted } from 'vue'
    import { useRaceStore } from "@/stores/race";
    
    const raceStore = useRaceStore();

    onMounted(() => {
        raceStore.subscribeToRace();
    });

    onUnmounted(() => {
        raceStore.unsubscribeFromRace();
    });


</script>

<template>
    <RacePage/>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'user'
  guestOnly: false
</route>