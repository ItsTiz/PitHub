<script setup>
import { onMounted, watch, ref, computed, onUnmounted, useTemplateRef } from 'vue';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useRaceStore } from "@/stores/race";
import { useSimulationControlStore } from "@/stores/simulation";
import { useTheme } from 'vuetify'
import { tracks } from '@/composables/constants/tracks.js';
import { getTeamHex } from '../../../../composables/utils/teams-colors';

gsap.registerPlugin(MotionPathPlugin);

const theme = useTheme()
const simControl = useSimulationControlStore();
const raceStore = useRaceStore();
const { cars } = storeToRefs(raceStore);
const { selectedCircuit } = storeToRefs(simControl);

const carElements = ref([]);
const pathRef = useTemplateRef('path')
const initializedCars = new Set()
let animations = [];

const emits = defineEmits(['carClicked']);

const trackName = computed(() => { 
    return selectedCircuit.value ? selectedCircuit.value.toLowerCase() : "imola";
});

const currentTrack = computed(() => {
    const name = trackName.value; 
    return tracks[name] || tracks['imola'] || { viewBox: '0 0 500 500', path: '' };
});

const mountMainAnimation = () => {
    if (animations.length > 0) { resetAnimation(); }

    if (!pathRef.value || carElements.value.length === 0) return;

    carElements.value.forEach(element => {
        if(!element) return;

        const tween = gsap.to(element, {
            motionPath: {
                path: pathRef.value,
            },
            duration: 1,
            repeat: -1,
            paused: true,
            ease: "none"
        });
        animations.push(tween);
    });    
}

const resetAnimation = () => {
    animations.forEach(tween => tween.kill());
    animations = [];
}

watch(cars, (newCars, oldCars) => {
    if (newCars?.length > 0 && (!oldCars || oldCars.length === 0)) {
        setTimeout(() => mountMainAnimation(), 50); 
    }

    newCars.forEach((car, index) => {
        const tween = animations[index];
        if (!tween) return;
        
        const targetTime = (car.lapCount || 0) + (car.progress / 100);
        
        if (!initializedCars.has(index)) {
            tween.totalTime(targetTime);
            initializedCars.add(index); 
        } else {
            gsap.to(tween, {
                totalTime: targetTime,
                duration: 1, 
                ease: "power1.out",
                overwrite: true 
            });
        }
    });
}, { deep: true });

watch(selectedCircuit, (newPath, oldPath) => {
    if (newPath !== oldPath) {
        mountMainAnimation();
    }
});

onMounted(() => {
    mountMainAnimation();
});

onUnmounted(() => {
   resetAnimation();
});
</script>

<template>
    <div class="d-flex flex-row align-center justify-space-around w-100 h-100 no-select">
        <Card class="h-100">
            <template #title>
                <v-chip
                    :color="simControl.isRunning ? 'success' : 'error'"
                    variant="tonal"
                    size="small"
                    class="text-subtitle-1 text-secondary text-uppercase font-weight-bold flex-grow-0"
                >
                    <template #prepend>
                        <v-icon
                            icon="mdi-circle-medium"
                            :class="{ 'animate-pulse': simControl.isRunning }"
                            start
                        ></v-icon>
                    </template> 
                    <template #default>
                        {{ trackName }}
                    </template>
                </v-chip>
            </template>

            <template #text>
                <div class="d-flex flex-row align-center justify-space-around w-100 h-100 no-select">
                    <svg
                        v-if="currentTrack" 
                        :viewBox="currentTrack.viewBox"
                        class="w-66 h-66"
                    >
                        <path
                            :d="currentTrack.path"
                            ref="path"
                            fill="none"
                            stroke="black"
                            stroke-width="4"
                        />
                        <g 
                            v-for="(car, index) in cars"
                            :key="car._id || index"
                            :ref="(el) => carElements[index] = el"
                            @click="$emit('carClicked', car._id)"
                            class="cursor-pointer"
                        >
                            <text
                                y="-10"
                                text-anchor="middle"
                                class="driver-label font-weight-bold text-caption text-uppercase"
                            >
                                {{ car.driver.full_name.split(" ")[1].substr(0, 3)}}
                            </text>

                            <circle  
                                :fill="getTeamHex(theme, car.team.full_name)" 
                                :stroke="getTeamHex(theme, car.team.full_name, true)" 
                                r="6" 
                                stroke-width="2"
                                class="car-node"
                            />
                        </g>
                    </svg>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.no-select,
.no-select * {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.car-node {
    transition: r 0.2s ease; 
}

.car-node:hover {
    r: 10px;
    stroke-width: 3px;
}

.driver-label {
    fill: rgb(var(--v-theme-on-surface));
    stroke: rgb(var(--v-theme-background)); 
    stroke-width: 3px;
    paint-order: stroke fill;
    pointer-events: none;
}
</style>