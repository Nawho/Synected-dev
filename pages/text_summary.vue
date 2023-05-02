<template>
    <h1>Input your study material</h1>
    <main>
        <input type="text" v-model="studyText">
        <button @click="sendRequest"> Submit</button>
    </main>
</template>

<script setup lang="ts">
const studyText = ref("")


async function sendRequest() {
    fetch 
}
</script>