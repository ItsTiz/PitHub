<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'
import Odometer from '../components/pages-components/carTracing/Odometer.vue'

  const { smAndDown } = useDisplay()

  const cols = computed(() => {
    return smAndDown.value ? [12, 12] : [6, 6]
  })
</script>

<template>
    <v-container fluid class="h-100 d-flex flex-column bg-surface-bright">

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet
                    class="h-100 ma-2"
                    elevation="5"
                >
                    <template v-slot:default>
                        <Odometer/> 
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet
                    class="h-100 ma-2"
                    elevation="5"
                >
                    <template v-slot:default>
                        Row 1 - Col 2
                    </template>
                </Sheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet
                    class="h-100 ma-2"
                    elevation="5"
                >
                    <template v-slot:default>
                        Row 2 - Col 1
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                 <Sheet
                    class="h-100 ma-2"
                    elevation="5"
                >
                    <template v-slot:default>
                        Row 2 - Col 2
                    </template>
                </Sheet>
            </v-col>
        </v-row>

    </v-container>
</template>

<route lang="yaml">
meta:
  layout: carTracingl
</route>
