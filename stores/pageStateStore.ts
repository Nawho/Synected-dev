import { defineStore } from "pinia"

export const usePageStateStore = defineStore('counter', () => {
    const currentPageName = ref("")

    return { currentPageName }
})