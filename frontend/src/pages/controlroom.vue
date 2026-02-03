<script setup>
    import { RouterView } from 'vue-router'
    import { onMounted, onUnmounted } from 'vue'
    import { useTelemetryStore } from "@/stores/car-telemetry";
    import { useRaceStore } from "@/stores/race";

    const telemetryStore = useTelemetryStore();
    const raceStore = useRaceStore();

    onMounted(() => {
        telemetryStore.subscribeToTeam();
        raceStore.subscribeToRace();
    });

    onUnmounted(() => {
        telemetryStore.unsubscribeFromTeam();
        raceStore.unsubscribeFromRace();
    });


</script>

<template>
    <RouterView />
</template>

<route lang="yaml">
meta:
  layout: ControlroomLayout
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>