<script setup lang="ts">
    import EventsLog from '../../components/pages-components/EventsLog.vue';

</script>

<template>
    <v-container
        fluid
        class="h-100 d-flex flex-column bg-background"
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

        <v-row class="flex-grow-1">
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

            <v-col :cols="5">
                <UiSheet
                    class="h-100"
                    :elevation="5"
                >
                    <template #default>
                        <EventsLog />
                    </template>
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