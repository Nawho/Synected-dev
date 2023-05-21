<script setup>
const emits = defineEmits(["send-req"])
const inputText = ref("")
const fileInput = ref(null)
const files = ref([])
const submitDisabled = computed(() => files.value.length === 0)

function filesChanged(ev) {
    console.log(Object.values(ev.target.files));
    files.value = Object.values(ev.target.files) || []
}

function readTextFromFile() {
    const file = files.value[0]
    if (!file) throw new Error("No file provided.")

    const reader = new FileReader()
    reader.onload = e => emits("load", e.target.result)

    reader.readAsText(file, "utf-8")
    const listeners = {}

    listeners["loadend"] = reader.addEventListener("loadend", (ev) => {
        emits("send-req", reader.result)
        reader.removeEventListener("loadend", listeners["loadend"])
    })
}
</script>

<template>
    <h3 class="text-center">Input the text document you want summarized.</h3>
    <div class="mt-3 flex flex-col items-center">
        <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs"
            accept=".txt,.odt,.docx,.doc,.pdf" ref="fileInput" @change="filesChanged" />
        <p class="text-sm text-gray-300 font-light mt-1">Supported formats are: .pdf .docx .doc .odt and .txt</p>

        <button :disabled="submitDisabled" ref="submitBtn" @click="readTextFromFile" class="btn mt-4">
            Submit</button>
    </div>
</template>