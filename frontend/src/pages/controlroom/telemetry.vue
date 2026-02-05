<script setup>
    import { useTelemetryStore } from "@/stores/car-telemetry";
    import { storeToRefs } from "pinia";
    const telemetryStore = useTelemetryStore();
    const { carData } = storeToRefs(telemetryStore);
</script>

<template>
    <TelemetryPage
        :car-data="carData"
    />
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>