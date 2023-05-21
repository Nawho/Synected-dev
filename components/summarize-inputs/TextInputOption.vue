<script setup lang="ts">
const emits = defineEmits(["send-req"])
const inputText = ref("")

const submitDisabled = computed(() => {
    return inputText.value.length < 50
})
</script>

<template>
    <h3 class="text-center">Enter the text you want summarized.</h3>

    <textarea class="textarea textarea-primary textarea-s w-full min-h-[250px] p-2 mt-3" v-model="inputText"
        placeholder="Enter text here" />

    <button class="btn mt-4" :disabled="submitDisabled" ref="submitBtn" @click="$emit('send-req', inputText)">
        Submit</button>
</template>