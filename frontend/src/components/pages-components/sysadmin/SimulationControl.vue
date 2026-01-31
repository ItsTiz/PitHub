<script setup>
import { ref } from 'vue'
import { useSimulationControlStore } from '@/stores/simulation';
import { useConnectionStore } from '@/stores/connections';
import Combobox from '../../controls/Combobox.vue'
const simControl = useSimulationControlStore();
const socketConnection = useConnectionStore();
const selectedCircuit = ref('Imola')
const circuits = ['Imola', 'Monza', 'Monaco', 'Zandvoort']

const handleStartClicked = (circuit) => {
    simControl.emitStartRequest(circuit);
}

const handleStopClicked = () => {
    simControl.emitStopRequest();
}

</script>

<template>
    <v-container fluid>
        <v-sheet elevation="3" rounded="lg" class="pa-2 d-flex align-center gap-4">

            <div class="flex-grow-1" style="max-width: 400px;">
                <Combobox
                    v-model="selectedCircuit"
                    :items="circuits"
                    label="Circuit"
                    prepend-inner-icon="mdi-flag-checkered"
                    density="compact"
                    variant="solo-filled"
                    hide-details
                    bg-color="surface"
                ></Combobox>
            </div>

            <v-spacer></v-spacer>

            <v-chip
                :color="socketConnection.isConnected ? 'success' : 'error'"
                variant="tonal"
                size="small"
                class="font-weight-bold mr-2"
            >
                <template #prepend>
                    <v-icon
                        icon="mdi-circle-medium"
                        :class="{ 'animate-pulse': socketConnection.isConnected }"
                        start
                    ></v-icon>
                </template>SOCKET
            </v-chip>

            <v-divider
                vertical class="mx-2"
            ></v-divider>

            <v-tooltip
                :text="simControl.isRunning ? 'Stop simulation' : 'Start simulation'"
                location="top"
            >
                <template v-slot:activator="{ props }">
                    <Button
                        v-bind="props"
                        :icon="simControl.isRunning ? 'mdi-stop': 'mdi-play'"
                        :color="simControl.isRunning ? 'error' : 'success'"
                        :variant="simControl.isRunning ? 'tonal' : 'flat'"
                        size="small"
                        @click="simControl.isRunning ? handleStopClicked() : handleStartClicked(selectedCircuit)"
                    />
                </template>
            </v-tooltip>
        </v-sheet>
    </v-container>
</template>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>