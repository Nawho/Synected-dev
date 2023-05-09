<script setup lang="ts">

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        required: true,
        type: String
    }
})
</script>

<template>
    <h3 class="text-center">Enter the text you want summarized.</h3>

    <textarea class="textarea textarea-primary textarea-s w-full min-h-[250px] p-2 mt-3" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" placeholder="Enter text here" />
</template>