<script setup>
import { onMounted, watch, ref, onUnmounted, useTemplateRef } from 'vue';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useRaceStore } from "@/stores/race";
import { useTheme } from 'vuetify'
import { tracks } from '@/composables/constants/tracks.js';
import { getTeamHex } from '../../../../composables/utils/teams-colors';

gsap.registerPlugin(MotionPathPlugin);

const theme = useTheme()
const raceStore = useRaceStore();
const { cars } = storeToRefs(raceStore);

const carElements = ref([]);
const pathRef = useTemplateRef('path')
const initializedCars = new Set()
let animations = [];

const props = defineProps({
    trackName: { type: String, default: 'imola' },    
});

const emits = defineEmits(['carClicked']);

const currentTrack = tracks[props.trackName];

const mountMainAnimation = () => {
    carElements.value.forEach(element => {
        const tween =
            gsap.to(
                element,
                {
                    motionPath: {
                        path: pathRef.value,
                        align: pathRef.value,
                        alignOrigin: [0.5, 0.5]
                    },
                    duration: 1,
                    repeat: -1,
                    paused: true,
                    ease: "none"
                }
            );
        animations.push(tween);
    });    
}

watch(cars, (newCars, oldCars) => {
    
    newCars.forEach((car, index) => {
        const tween = animations[index];
        if (!tween) return;
        const targetTime = (car.lapCount || 0) + (car.progress / 100);
        if (!initializedCars.has(index)) {
            tween.totalTime(targetTime);
            initializedCars.add(index); 
        } else {
            gsap.to(
                tween,
                {
                    totalTime: targetTime,
                    duration: 1, 
                    ease: "power1.out",
                    overwrite: true // allegedly, kills half-baked animations
                }
            );
        }
    });

},{deep: true});

onMounted(() => {
    mountMainAnimation();
});

onUnmounted(() => {
    if(animations){
        animations.forEach(element => {
            element.kill();  //releasing it for gbc
        });
    }
});

</script>

<template>
    <div class="d-flex flex-row align-center justify-space-around w-100 h-100 no-select">
        <Card class="h-100">
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold flex-grow-0">
                    {{ trackName }}
                </div>
            </template>
            <template #text>
                <div class="d-flex flex-row align-center justify-space-around w-100 h-100 no-select">
                    <svg
                        :viewBox="currentTrack.viewBox"
                        class="w-66 h-66"
                    >
                    <path
                        ref="path"
                        :d="currentTrack.path"
                        fill="none"
                        stroke="black"
                        stroke-width="4"
                    />
                    <circle v-for="(car, index) in cars" 
                        :key="car._id || index"
                        :ref="(el) => carElements[index] = el"
                        r="6" 
                        :fill="getTeamHex(theme, car.team.full_name)" 
                        :stroke="getTeamHex(theme, car.team.full_name, darken = true)" 
                        stroke-width="2"
                        @click="$emit('carClicked', car._id)"
                    />
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
</style>