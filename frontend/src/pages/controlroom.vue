<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useRaceStore } from "@/stores/race";

const telemetryStore = useTelemetryStore();
const raceStore = useRaceStore();

onMounted(() => {
    //TODO auth here too;
    const token = "";
    telemetryStore.subscribeToTeam(token);
    raceStore.subscribeToRace();
});

onUnmounted(() => {
    telemetryStore.unsubscribeFromTeam();
    raceStore.unsubscribeFromRace();
});


</script>

<template>
    <RouterView/>
</template>

<route lang="yaml">
meta:
  layout: controlroomlayout
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>