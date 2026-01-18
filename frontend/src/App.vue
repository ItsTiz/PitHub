<script setup>
import { onMounted, onUnmounted } from "vue";
import { useConnectionStore } from "@/stores/connections";
import { useTelemetryStore } from "@/stores/car-telemetry";
import { socket } from "@/socket";

const connectionStore = useConnectionStore();
const telemetryStore = useTelemetryStore();

onMounted(() => {
    //Set up the listeners
    connectionStore.bindEvents();

    telemetryStore.initListeners();
});

onUnmounted(() => {
    //.off "unmounts" all of event handling to prevent leaving them dangling
    socket.off();
});
</script>

<template>
    <v-app>
        <router-view />
    </v-app>
</template>