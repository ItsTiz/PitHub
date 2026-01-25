<script setup>
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useRaceStore } from "@/stores/race";
import { onMounted, watch, ref, onUnmounted, computed, useTemplateRef } from 'vue';
import { tracks } from '@/composables/constants/tracks.js';
const raceStore = useRaceStore();

gsap.registerPlugin(MotionPathPlugin);

const carRef = useTemplateRef('car')
const pathRef = useTemplateRef('path')
const lapCount = ref(0);

const mountMainAnimation = () => {
    pathAnimation =
        gsap.to(
            carRef.value,
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
}

const props = defineProps({
    trackName: { type: String, default: 'monza' },    
});

const currentTrack = tracks[props.trackName];

let pathAnimation = {};

const progress = computed(() => {
    return raceStore.cars[0]?.progress ?? 0;
});

watch(progress, (newVal, oldVal) => {
    if (!pathAnimation) return;

    const prev = (oldVal ?? 0) / 100;
    const current = newVal / 100;

    // detecting the "lap wrap-around"
    if (prev > 0.8 && current < 0.2) {
        lapCount.value++;
    }

    const targetTime = lapCount.value + current;

    gsap.to(
        pathAnimation,
        {
            totalTime: targetTime,
            duration: 1, 
            ease: "power1.out",
            overwrite: true // allegedly, kills half-baked animations
        }
    );
});


onMounted(() => {
    raceStore.subscribeToRace();
    mountMainAnimation();
});

onUnmounted(() => {
    raceStore.unsubscribeFromRace();
    if (pathAnimation) pathAnimation.kill(); //releasing it for gbc
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
                    <circle
                        ref="car"
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