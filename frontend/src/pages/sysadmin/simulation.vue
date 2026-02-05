<script setup lang="ts">
    import EventsLog from '../../components/pages-components/EventsLog.vue';

</script>

<template>
    <v-container
        fluid
        class="h-100 d-flex flex-column bg-background overflow-hidden"
    >
        <v-row class="flex-grow-0">
            <v-col :cols="12">
                <UiSheet
                    class="h-100"
                    :elevation="5"
                >
                    <template #default>
                        <SimulationControl />
                    </template>
                </UiSheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1 fill-height overflow-hidden">
            <v-col :cols="7">
                <UiSheet
                    class="h-100"
                    :elevation="5"
                >
                    <template #default>
                        <SimulationTerminal />
                    </template>
                </UiSheet>
            </v-col>

            <v-col
                :cols="5"
                class="d-flex flex-column overflow-hidden"
            >
                <UiSheet
                    class="flex-grow-1 overflow-y-auto"
                    :elevation="5"
                >
                   <EventsLog :maxHeight="'700px'" />
                </UiSheet>
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