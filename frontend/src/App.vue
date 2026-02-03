<script setup>
    import { onMounted, onUnmounted } from "vue";
    import { useAppStore } from "@/stores/app";
    import { useConnectionStore } from "@/stores/connections";
    import { useTelemetryStore } from "@/stores/car-telemetry";
    import { useSimulationControlStore } from "@/stores/simulation";
    import { useRaceStore } from "@/stores/race";
    import { socket } from "@/socket";
    import { useNotificationsStore } from '@/stores/notifications'

    const appStore = useAppStore();
    const connectionStore = useConnectionStore();
    const raceStore = useRaceStore();
    const simulationStore = useSimulationControlStore();
    const telemetryStore = useTelemetryStore();
    const notifStore = useNotificationsStore()

    onMounted(() => {
        connectionStore.initListeners();
        telemetryStore.initListeners();
        simulationStore.initListeners();
        raceStore.initListeners();

        connectionStore.connect();
        notifStore.connect('test-user')
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
        <RouterView />
    </v-app>
</template>