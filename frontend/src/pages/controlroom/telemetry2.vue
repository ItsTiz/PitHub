<script setup>
    import { useTelemetryStore } from "@/stores/car-telemetry";
    import { storeToRefs } from "pinia";
    const telemetryStore = useTelemetryStore();
    const { carData2 } = storeToRefs(telemetryStore);
</script>

<template>
    <TelemetryPage
        :carData="carData2"
    />
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>