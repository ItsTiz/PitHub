<script setup>
    import { computed } from 'vue'
    import { useDisplay } from 'vuetify'
    import { useAuthStore } from '@/stores/auth'
    import { cars } from '@/composables/constants/cars.js';
    import { useTheme } from 'vuetify'
    import { getTeamHex } from '../../../../composables/utils/teams-colors';
    defineProps({
        gaugeSize: { type: Number, default: 150 },
        gaugesWidth: { type: Number, default: 22 },
        frontRightHealth: { type: Number, default: 0 },
        frontLeftHealth: { type: Number, default: 0 },
        rearLeftHealth: { type: Number, default: 0 },
        rearRightHealth: { type: Number, default: 0 },
        teamTheme: { type: String, default: "secondary" },
    });

    const { smAndDown } = useDisplay()
    const theme = useTheme()
    const auth = useAuthStore()

    const cols = computed(() => {
        return smAndDown.value ? [12, 12, 12] : [3, 3, 3]
    })

    const carImage = computed(() => {
        return cars['top_view'] || { viewBox: '0 0 500 500', path: '' };
    });

</script>

<template>
    <UiCard
        class="h-100"
        :border-color="teamTheme"
    >
        <template #title>
            <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">
                Tire Health
            </div>
        </template>

        <template #text>
            <v-container
                fluid
                class="h-100 d-flex flex-row ma-0 pa-0"
            >
                <v-row
                    no-gutters
                    class="flex-grow-1"
                    justify="center"
                >
                    <v-col :cols="cols[0]">
                        <div class="d-flex flex-column justify-center align-center fill-height">
                            <div class="flex-grow-1">   
                                <div class="text-caption text-secondary text-uppercase">
                                    Front Left
                                </div>
                                <SemiCircularGauge
                                    class="w-100"
                                    :input="frontLeftHealth"
                                    :uom="'%'"
                                    :size="gaugeSize"
                                    :width="gaugesWidth"    
                                />
                            </div>

                            <div class="flex-grow-1">  
                                <div class="text-caption text-secondary text-uppercase flex-grow-1">
                                    Rear Left
                                </div>
                                <SemiCircularGauge 
                                    class="w-100"
                                    :input="rearLeftHealth"
                                    :uom="'%'" 
                                    :size="gaugeSize"
                                    :width="gaugesWidth"
                                />
                            </div>
                        </div>
                    </v-col>

                    <v-col :cols="cols[1]">
                        <div>
                            <svg
                                :viewBox="carImage.viewBox"
                                class="w-66 h-66"
                            >
                                <path
                                    ref="path"
                                    :d="carImage.path"
                                    :fill="getTeamHex(theme, auth.user?.team?.name, true)" 
                                />
                            </svg>
                        </div>
                    </v-col>

                    <v-col :cols="cols[2]">
                        <div class="d-flex flex-column justify-center align-center fill-height">
                            <div class="flex-grow-1">  
                                <div class="text-caption text-secondary text-uppercase">
                                    Front Right
                                </div>
                                <SemiCircularGauge 
                                    class="w-100"
                                    :input="frontRightHealth"
                                    :uom="'%'" 
                                    :size="gaugeSize"
                                    :width="gaugesWidth"
                                />
                            </div>

                            <div class="flex-grow-1">  
                                <div class="text-caption text-secondary text-uppercase">
                                    Rear Right
                                </div>
                                <SemiCircularGauge 
                                    class="w-100"
                                    :input="rearRightHealth"
                                    :uom="'%'" 
                                    :size="gaugeSize"
                                    :width="gaugesWidth"
                                />
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </UiCard>
</template>