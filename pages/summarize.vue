<script setup lang="ts">
///@ts-ignore
import theme from "daisyui/src/colors/themes"
import { usePageStateStore } from "~/stores/pageStateStore"
usePageStateStore().currentPageName = "Summarizer"

const studyText = ref("")
const submitBtn = ref(null)
const summarizedText = ref("")
const selectedOption = ref("")
const loadingResponse = ref(false)
const submitDisabled = computed(() => {
    return studyText.value.length < 50
})

const formatOptions = ref([
    {
        name: "Text",
        imgSrc: "icons/textIcon3.png",
        experimental: false,
        color: theme["[data-theme=night]"].secondary
    },
    {
        name: "Text Document",
        imgSrc: "icons/textIcon.png",
        experimental: false,
        color: theme["[data-theme=night]"].secondary
    },
    {
        name: "Website",
        imgSrc: "icons/webIcon.png",
        experimental: true,
        color: theme["[data-theme=night]"].secondary
    },
    {
        name: "Video",
        imgSrc: "icons/videoIcon.png",
        experimental: true,
        color: theme["[data-theme=night]"].secondary
    },
    {
        name: "Image",
        imgSrc: "icons/imageIcon.png",
        experimental: true,
        color: theme["[data-theme=night]"].secondary
    }
])

async function sendRequest() {
    //@ts-ignore
    submitBtn.value.disabled = true
    loadingResponse.value = true

    const res = await fetch("http://localhost:3000/api/ai", {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ "textToSummarize": studyText.value }),
    })

    const resText = await res.text()
    //@ts-nocheck
    summarizedText.value = JSON.parse(resText).content
    loadingResponse.value = false
}

function onFormatSelected(data: { el: HTMLElement, name: string }) {
    selectedOption.value = data.name

    for (let [index, _] of Object.entries(formatOptions.value)) {
        //@ts-ignore
        formatOptions.value[index].color = formatOptions.value[index].name === data.name ? theme["[data-theme=night]"].primary : theme["[data-theme=night]"].secondary
    }
}
</script>

<template>
    <div class="flex flex-col justify-items-center items-center p-5">
        <div class="px-10 py-5 ">
            <h2 class="text-center font-semibold">Choose your format</h2>
            <div class="divider my-2"></div>
            <div class="flex flex-wrap justify-center gap-[40px] w-full ">
                <FormatOption v-for="option in formatOptions" @format-selected="onFormatSelected" :data="option">
                </FormatOption>
            </div>
        </div>

        <div class="divider"></div>

        <main class="mt-5 flex flex-col w-full lg:px-28 s:px-5">
            <TextInputOption v-model="studyText" v-if="selectedOption === 'Text'"></TextInputOption>
            <FileInputOption v-if="selectedOption === 'Text Document'"></FileInputOption>
            <VideoInputOption v-if="selectedOption === 'Video'"></VideoInputOption>
            <WebInputOption v-if="selectedOption === 'Website'"></WebInputOption>
            <ImageInputOption v-if="selectedOption === 'Image'"></ImageInputOption>

            <button v-if="selectedOption !== ''" :disabled="submitDisabled" ref="submitBtn" @click="sendRequest"
                class="btn mt-4"> Submit</button>

            <div v-if="loadingResponse" class="w-full flex flex-col items-center my-10">
                Generating response...
            </div>

            <div id="response" v-if="summarizedText">
                <h2 class="mt-10">Reponse</h2>
                <p> {{ summarizedText }}</p>
            </div>
        </main>
    </div>
</template>

<style scoped>
@media(width > 400px) {
    h2 {
        font-size: 1.8rem !important;
    }
}
</style>
