<script setup lang="ts">
import EventsLog from '../../components/pages-components/EventsLog.vue';

</script>

<template>
    <v-container fluid class="h-100 d-flex flex-column bg-background">
        <v-row class="flex-grow-0">
            <v-col :cols="12">
                <Sheet class="h-100" :elevation="5">
                    <template v-slot:default>
                        <SimulationControl />
                    </template>
                </Sheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="7">
                <Sheet class="h-100" :elevation="5">
                    <template v-slot:default>
                        <SimulationTerminal />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="5">
                <Sheet class="h-100" :elevation="5">
                    <template v-slot:default>
                        <EventsLog />
                    </template>
                </Sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'admin'
  guestOnly: false
</route>