<script setup>
import { useSimulationControlStore } from "@/stores/simulation";
import { storeToRefs } from "pinia";
import { nextTick, watch, useTemplateRef } from "vue";

const store = useSimulationControlStore();
const { serverLogs } = storeToRefs(store);
const terminalBody = useTemplateRef('terminal-body');

watch(serverLogs, async () => {
    await nextTick();
    if (terminalBody.value) {
        terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
    }
}, { deep: true });
</script>

<template>
    <Card 
        class="h-100 w-100 font-monospace"
        :titleClasses="'pa-0 flex-grow-0'"
        :textClasses="'pa-0 flex-grow-1'" 
    >
        <template #title>
            <div 
                :class="`d-flex
                         flex-row
                         justify-space-between
                         align-center
                         bg-surface
                         pl-5 pr-5 pt-2 pb-2`"
            >
                <span>Server:\</span>
                <Button
                    :icon="'mdi-delete'"
                    :iconOnly="true"
                    size="x-small"
                    variant="text"
                    color="grey"
                    @click="store.clearLogs"
                />
            </div>
        </template>

        <template #text>
            <div class="d-flex flex-column fill-height">
                <div
                    class="terminal-body overflow-y-auto fill-height bg-background pa-2"
                >
                    <div
                        v-for="(log, i) in serverLogs"
                        :key="i"
                        class="mb-1 d-flex flex-row align-start log-line" 
                    >
                        <span class="text-grey-darken-1 mr-2 flex-shrink-0">
                            [{{ new Date(log.timestamp).toLocaleTimeString() }}]
                        </span>
                        
                        <span 
                            :class="log.type === 'ERROR' ? 'text-error' : 'text-success'"
                            class="log-message text-start"
                        >
                            {{ log.message }}
                        </span>
                    </div>
                    
                    <div class="d-flex flex-row align-left">
                        <span class="mr-2 text-grey">></span>
                        <span class="animate-pulse">_</span> 
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.font-monospace {
    font-family: 'Consolas', monospace;
    font-weight: 500;
    font-size: 12px;
}

.terminal-body {
    max-height: 680px;
}

.log-line {
    width: 100%; /* Ensure row takes full width */
}

.log-message {
    /* CRITICAL FOR WRAPPING: */
    white-space: pre-wrap;      /* Preserves newlines but wraps text */
    word-break: break-word;     /* Breaks long words/hashes if they don't fit */
    overflow-wrap: anywhere;    /* Modern browser support for unbreakable strings */
}

.animate-pulse {
    font-weight: bold;
    animation: blink 1s step-end infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>

