<script setup lang="ts">
import { SummaryFormatOption } from "@/types"

const props = defineProps<{ data: SummaryFormatOption }>()
defineEmits(["formatSelected"])
</script>

<template>
    <section class="flex flex-col w-[90px] format-btn" @click="$emit('formatSelected', { el: $el, name: props.data.name })">
        <div class="flex items-center justify-center rounded-md p-5 max-h-[90px] max-w[90px] img-container"
            :style="{ backgroundColor: props.data.color }">
            <img style="object-fit: contain;" :src="props.data.imgSrc" alt="">
        </div>
        <div class="mt-1 text-center text-sm font-semibold"> {{ props.data.name }}</div>
        <div v-if="props.data.experimental" class="text-gray-400 text-center text-xs"> (Experimental)</div>
    </section>
</template>

<style scoped>
.format-btn {
    transition: 0.2s;
}

.format-btn:hover {
    transition: 0.2s;
    scale: 1.07;
    cursor: pointer;
}


@media (width > 1000px) {
    .format-btn {
        width: 110px !important;
    }

    .img-container {
        max-width: 110px !important;
        max-height: 110px !important;

    }
}
</style>
