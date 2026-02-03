<script setup>
import { RouterView, useRoute } from 'vue-router' 
import { onMounted, onUnmounted, watch } from 'vue'
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useRaceStore } from "@/stores/race";

const route = useRoute();
const telemetryStore = useTelemetryStore();
const raceStore = useRaceStore();

const getTeamFromUrl = () => {
    const teamName = route.query.team;
    return teamName || null; //defaults to user's role
}

const handleSubscription = (newTeam, oldTeam) => {
    if (oldTeam) {
        telemetryStore.unsubscribeFromTeam(oldTeam);
    } else {
        telemetryStore.unsubscribeFromTeam(); 
    }
    telemetryStore.subscribeToTeam(newTeam);
};

onMounted(() => {
    raceStore.subscribeToRace();
    
    const initialTeam = getTeamFromUrl();
    telemetryStore.subscribeToTeam(initialTeam);
});

onUnmounted(() => {
    const currentTeam = getTeamFromUrl();
    telemetryStore.unsubscribeFromTeam(currentTeam);
    raceStore.unsubscribeFromRace();
});

watch(route.query.team, (newTeam, oldTeam) => {
        console.log(`Switching telemetry from ${oldTeam} to ${newTeam}`);
        handleSubscription(newTeam, oldTeam);
    }
);

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