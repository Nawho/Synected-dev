<script setup lang="ts">
import { usePageStateStore } from "../stores/pageStateStore"
import { MarkdownItVue, MarkdownItVueOptions }from 'markdown-it-vue'
//import { VueShowdown } from "vue-showdown"
usePageStateStore().currentPageName = "Text summary editor"


const editing = ref(false)
const content = ref(`
# Text summary editor

<br>

## Technologies
- Nuxt 3
- TypeScript 
- ShowDown library

<br>

### Features
- Markdown support
- text underlining support
- text coloring
`)

const options = {
  markdownIt: {
    linkify: true
  },
  linkAttributes: {
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  }
}
</script>

<template>
    <div class="mx-10">
        <div class="form-control justify-center">
            <label class="cursor-pointer label flex justify-center gap-[10px]">
                <span class="label-text">Editing</span>
                <input type="checkbox" class="toggle toggle-primary" v-model="editing"/>
            </label>
        </div>

        <textarea v-if="editing" class="textarea textarea-primary textarea-s w-full min-h-[400px] p-2 mt-3"
            placeholder="Enter text here" v-model="content" />
        <!--VueShowdown v-else :markdown="content" flavor="allOn" /-->
        <MarkdownItVue v-else :content="content" :options="options"/>

    </div>
</template>