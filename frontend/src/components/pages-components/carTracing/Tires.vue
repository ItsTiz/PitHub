<script setup>
import { useDisplay } from 'vuetify'

const props = defineProps({
    gauges_size: {
        type: Number,
        default: 150
    },
    gauges_width: {
        type: Number,
        default: 22
    },
    front_right_health: {
        type: Number,
        default: 0
    },
    front_left_health: {
        type: Number,
        default: 0
    },
    front_right_health: {
        type: Number,
        default: 0
    },
    rear_left_health: {
        type: Number,
        default: 0
    },
    rear_right_health: {
        type: Number,
        default: 0
    }
});

const { smAndDown } = useDisplay()

const cols = computed(() => {
    return smAndDown.value ? [12, 12, 12, 12] : [3, 3, 3, 3]
})

</script>

<template>
    <Card>
        <template #title>
            <div class="text-subtitle-1 font-weight-bold">Tire Health</div>
        </template>

        <template #text>
            <v-container fluid class="h-100 d-flex flex-row ma-0 pa-0">

                <v-row no-gutters class="flex-grow-1">
                    <v-col no-gutters :cols="cols[0]">

                        <div class="text-subtitle-1 font-weight-bold">Front Left</div>

                        <SemiCircularGauge :input="front_left_health" :uom="'%'" :size="gauges_size"
                            :width="gauges_width" />

                    </v-col>

                    <v-col no-gutters :cols="cols[1]">


                        <div class="text-subtitle-1 font-weight-bold">Front Right</div>



                        <SemiCircularGauge :input="front_right_health" :uom="'%'" :size="gauges_size"
                            :width="gauges_width" />


                    </v-col>

                    <v-col no-gutters :cols="cols[2]">


                        <div class="text-subtitle-1 font-weight-bold">Rear Left</div>



                        <SemiCircularGauge :input="rear_left_health" :uom="'%'" :size="gauges_size"
                            :width="gauges_width" />



                    </v-col>

                    <v-col no-gutters :cols="cols[1]">


                        <div class="text-subtitle-1 font-weight-bold">Rear Right</div>



                        <SemiCircularGauge :input="rear_right_health" :uom="'%'" :size="gauges_size"
                            :width="gauges_width" />


                    </v-col>
                </v-row>

                <!-- <v-row no-gutters class="flex-grow-1">
            
        </v-row> -->

            </v-container>
        </template>
    </Card>




    <!-- <v-container fluid class="h-100 d-flex flex-row ma-0 pa-0">

        <v-row no-gutters class="flex-grow-1">
            <v-col no-gutters :cols="cols[0]">
                <Card>
                    <template #title>
                        <div class="text-subtitle-1 font-weight-bold">Front Left</div>
                    </template>

                    <template #text>
                        <SemiCircularGauge
                            :input="front_left_health"
                            :uom="'%'"
                            :size="gauges_size"
                            :width="gauges_width" />
                    </template>
                </Card>
            </v-col>

            <v-col no-gutters :cols="cols[1]">
                <Card>
                    <template #title>
                        <div class="text-subtitle-1 font-weight-bold">Front Right</div>
                    </template>

                    <template #text>
                        <SemiCircularGauge
                            :input="front_right_health"
                            :uom="'%'"
                            :size="gauges_size"
                            :width="gauges_width"
                        />
                    </template>
                </Card>
            </v-col>

            <v-col no-gutters :cols="cols[2]">
                <Card>
                    <template #title>
                        <div class="text-subtitle-1 font-weight-bold">Rear Left</div>
                    </template>

                    <template #text>
                        <SemiCircularGauge 
                            :input="rear_left_health" 
                            :uom="'%'" 
                            :size="gauges_size"
                            :width="gauges_width"
                        />
                    </template>
                </Card>

            </v-col>

            <v-col no-gutters :cols="cols[1]">
                <Card>
                    <template #title>
                        <div class="text-subtitle-1 font-weight-bold">Rear Right</div>
                    </template>

                    <template #text>
                        <SemiCircularGauge
                            :input="rear_right_health"
                            :uom="'%'"
                            :size="gauges_size"
                            :width="gauges_width"
                        />
                    </template>
                </Card>
            </v-col>
        </v-row>

         <v-row no-gutters class="flex-grow-1">
            
        </v-row>

    </v-container> -->
</template>