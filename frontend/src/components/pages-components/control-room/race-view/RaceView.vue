<script setup>
import { onMounted, watch, ref, onUnmounted } from 'vue';

import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

import { tracks } from '@/composables/constants/tracks.js';

gsap.registerPlugin(MotionPathPlugin);

const progress = ref(0);

const props = defineProps({
    // progress: { type: Number, default: 10 },
    trackName: { type: String, default: 'monza' }
});

const currentTrack = tracks[props.trackName];
const carRef = useTemplateRef('car')
const carRef2 = useTemplateRef('car2')
const pathRef = useTemplateRef('path')
let pathAnimation = null;

onMounted(() => {
    
    pathAnimation = gsap.to(carRef.value,
    {
        motionPath: {
            path: "path",
            align: "path",
            alignOrigin: [0.5, 0.5],
        },
        duration: 1,
        paused: true,
        ease: "none"
    });
});

onUnmounted(() => {
    if (pathAnimation) pathAnimation.kill();
});

watch(progress, (newVal, prevVal) => {
    if (!pathAnimation) return;

    const targetProgress = Math.min(Math.max(newVal / 100, 0), 1);

    gsap.to(
    pathAnimation,
    {
        progress: targetProgress,
        duration: 0.5,
        ease: "power2.out"
    });
    
});

</script>

<template>
    <div class="d-flex flex-row align-center justify-space-around w-100 h-100 no-select">
        <Card>
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold flex-grow-0">ADD TRACK TITLE HERE + DATE</div>
            </template>
            <template #text>
                <div class="track-container">
                    <svg
                        :viewBox="currentTrack.viewBox"
                        class="track-object"
                    >
                    <path
                        :ref="path"
                        :d="currentTrack.path"
                        fill="none"
                        stroke="black"
                        stroke-width="5"
                    />
                    <circle
                        ref="car"
                        r="8"
                        fill="#b11914"
                        stroke="red"
                        stroke-width="2"
                    />
                    <circle
                        ref="car2"
                        r="8"
                        fill="#56564d"
                        stroke="blue"
                        stroke-width="2"
                    />
                    </svg>

                    <v-slider
                        v-model="progress"
                        :step="1"
                        :max="100"
                        :min="0"
                        width="500"
                        track-color="white"
                    ></v-slider>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.track-container {
    display: flex;
    flex: column;
    align-items: center;
    justify-items: center;
}

.track-object {
    width: 50%;
    height: 50%;
}

.no-select,
.no-select * {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
</style>