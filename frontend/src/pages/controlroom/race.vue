<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import RaceView from '../../components/pages-components/control-room/race-view/RaceView.vue';
import Leaderboard from '../../components/pages-components/control-room/race-view/Leaderboard.vue';
const { smAndDown } = useDisplay()
const cols = computed(() => {
    return smAndDown.value ? [12, 12, 12] : [3, 6, 3];
});

</script>

<template>
    <v-container fluid class="h-100 d-flex flex-column bg-background">
         <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100" elevation="5">
                    <template v-slot:default>
                        <Leaderboard/>
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100" elevation="5">
                    <template v-slot:default>
                        <RaceView/>
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[2]">
                <Sheet class="h-100" elevation="5">
                    <template v-slot:default>

                    </template>
                </Sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>