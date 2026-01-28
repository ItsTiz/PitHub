<script setup>
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useRaceStore } from "@/stores/race";
import { onMounted, watch, ref, onUnmounted, computed, useTemplateRef } from 'vue';
import { tracks } from '@/composables/constants/tracks.js';
const raceStore = useRaceStore();
const { cars } = storeToRefs(raceStore);

gsap.registerPlugin(MotionPathPlugin);

const carElements = ref([]);
const pathRef = useTemplateRef('path')

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

const props = defineProps({
    trackName: { type: String, default: 'monza' },    
});

const currentTrack = tracks[props.trackName];

let animations = [];
const initializedCars = new Set()

const progress = computed(() => {
    return raceStore.cars[0]?.progress ?? 0;
});

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
        <Card>
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
                        :key="car.id || index"
                        :ref="(el) => carElements[index] = el"
                        r="6" 
                        fill="#b11914" 
                        stroke="red" 
                        stroke-width="2"
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