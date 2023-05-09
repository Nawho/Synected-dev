// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@pinia/nuxt",],
    components: [
        { path: '~/components/summarize-inputs' },
        '~/components'
    ],
    runtimeConfig: {
        OPENAI_API_KEY: "",
    },
    ssr: false,
    css: ["@/assets/styles/global.css"],
});
