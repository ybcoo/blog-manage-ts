<template>
    <div class="loading">
        <div class="loader-wrap" :style="{width,height}" aria-label="loading">
            <div class="loader-orb">
                <div class="orbit">
                    <span style="--i: 0"><i>L</i></span>
                    <span style="--i: 1"><i>O</i></span>
                    <span style="--i: 2"><i>A</i></span>
                    <span style="--i: 3"><i>D</i></span>
                    <span style="--i: 4"><i>I</i></span>
                    <span style="--i: 5"><i>N</i></span>
                    <span style="--i: 6"><i>G</i></span>
                </div>
                <div class="crystal" aria-hidden="true"></div>
            </div>
            <div class="loading-line" aria-live="polite">
                <span
                    v-for="(char, index) in slotChars"
                    :key="index"
                    class="jump-char"
                    :class="{ 'is-visible': index < visibleCount }"
                    :style="{ '--delay': `${index * 0.06}s` }"
                >
                    {{ char }}
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

defineProps<{
    width?: string,
    height?: string
}>()

const slotChars = ["l", "o", "a", "d", "i", "n", "g", ".", ".", "."];
const visibleCount = ref(1);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    timer = setInterval(() => {
        visibleCount.value = visibleCount.value >= slotChars.length ? 1 : visibleCount.value + 1;
    }, 320);
});

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer);
    }
});
</script>
<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.loader-wrap {
    --orb-size: clamp(132px, 20vw, 176px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--orb-size);
    aspect-ratio: 1;
}

.loader-orb {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.72);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.42), rgba(240, 240, 240, 0.18));
    box-shadow:
        20px 20px 45px rgba(170, 170, 170, 0.28),
        -14px -14px 30px rgba(255, 255, 255, 0.7),
        inset 1px 1px 0 rgba(255, 255, 255, 0.85),
        inset -1px -1px 0 rgba(205, 205, 205, 0.35);
}

.orbit {
    position: absolute;
    inset: 9%;
    border-radius: 50%;
    border: 2px solid rgba(90, 90, 90, 0.2);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
    animation: spin 5.2s linear infinite;
}

.orbit span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 2px;
    transform: rotate(calc(var(--i) * 51.428deg));
}

.orbit span i {
    font-style: normal;
    font-size: clamp(8px, 1vw, 10px);
    line-height: 1;
    letter-spacing: 0.01em;
    color: rgba(44, 44, 44, 0.78);
    transform: rotate(calc(var(--i) * -51.428deg));
}

.crystal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: clamp(22px, 3vw, 30px);
    height: clamp(22px, 3vw, 30px);
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    animation: crystalFlip 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.crystal::before,
.crystal::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: linear-gradient(
        140deg,
        rgba(255, 255, 255, 0.88),
        rgba(232, 232, 232, 0.35) 45%,
        rgba(186, 186, 186, 0.3)
    );
    border: 1px solid rgba(255, 255, 255, 0.66);
    box-shadow:
        0 0 12px rgba(255, 255, 255, 0.4),
        inset 1px 1px 0 rgba(255, 255, 255, 0.75),
        inset -1px -1px 0 rgba(170, 170, 170, 0.35);
}

.crystal::before {
    transform: rotate(45deg) rotateY(0deg);
}

.crystal::after {
    transform: rotate(45deg) rotateY(90deg);
    opacity: 0.8;
}

.loading-line {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 12ch;
    min-height: 22px;
    padding: 4px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.72);
    background: rgba(255, 255, 255, 0.36);
    box-shadow:
        0 8px 20px rgba(180, 180, 180, 0.25),
        inset 1px 1px 0 rgba(255, 255, 255, 0.75),
        inset -1px -1px 0 rgba(210, 210, 210, 0.35);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: rgba(52, 52, 52, 0.76);
    font-family: "Consolas", "Menlo", monospace;
    white-space: nowrap;
}

.jump-char {
    display: inline-block;
    width: 1ch;
    text-align: center;
    opacity: 0;
}

.jump-char.is-visible {
    opacity: 1;
    animation: charHop 0.9s ease-in-out infinite;
    animation-delay: var(--delay);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes crystalFlip {
    0% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(0deg);
    }
    25% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(90deg);
    }
    50% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(180deg);
    }
    75% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(270deg);
    }
    100% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(360deg);
    }
}

@keyframes charHop {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
}

@media (max-width: 480px) {
    .loader-wrap {
        transform: scale(0.92);
    }
}
</style>
