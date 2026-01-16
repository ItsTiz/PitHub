<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const { smAndDown } = useDisplay()

  const cols = computed(() => {
    return smAndDown.value ? [12, 12] : [6, 6]
  })
</script>

<template>
    <v-container fluid class="h-100 d-flex flex-column bg-surface-bright">

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <v-sheet class="h-100 ma-2 d-flex align-center justify-center">
                    Row 1 - Col 1
                </v-sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <v-sheet class="h-100 ma-2 d-flex align-center justify-center">
                    Row 1 - Col 2
                </v-sheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <v-sheet class="h-100 ma-2 d-flex align-center justify-center">
                    Row 2 - Col 1
                </v-sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <v-sheet class="h-100 ma-2 d-flex align-center justify-center">
                    Row 2 - Col 2
                </v-sheet>
            </v-col>
        </v-row>

    </v-container>
</template>

<route lang="yaml">
meta:
  layout: carTracingl
</route>
