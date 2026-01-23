<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useConnectionStore } from "@/stores/connections";
import { useTelemetryStore } from "@/stores/car-telemetry";
import { socket } from "@/socket";

const appStore = useAppStore();
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
    <v-app
        :theme="appStore.appTheme"
    >
        <router-view />
    </v-app>
</template>