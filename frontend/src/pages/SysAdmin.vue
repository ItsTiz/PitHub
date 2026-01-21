<script setup>
import { useSimulationControlStore } from '../stores/simulation';


const simControl = useSimulationControlStore();

const handleStartClicked = () => {
    simControl.emitStartRequest();
}

const handleStopClicked = () => {
    simControl.emitStopRequest();
}

</script>

<template>
    <v-container fluid class="d-flex flex-row bg-surface-bright">

        <Button
            :title="'START'"
            :icon="'mdi-play'"
            :backgroundColor="'success'"
            @clicked="handleStartClicked"
        />

        <Button
            :title="'STOP'"
            :icon="'mdi-stop'"     
            @clicked="handleStopClicked"   
        />

    </v-container>
</template>