
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin(nuxtApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyBP8EISBQ-GnrEl3gG6kvsDYCsW6yLVAjk",
        authDomain: "synected-feb0d.firebaseapp.com",
        projectId: "synected-feb0d",
        storageBucket: "synected-feb0d.appspot.com",
        messagingSenderId: "942189101260",
        appId: "1:942189101260:web:4e84a1ebeaf9441e14c269",
        measurementId: "G-LRC0P33K0J"
    };


    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth()
    const database = getDatabase(app)
    //const analytics = getAnalytics(app)

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
    nuxtApp.vueApp.provide('app', app)
    nuxtApp.provide('app', app)
    nuxtApp.vueApp.provide("db", database)
    nuxtApp.provide('db', database);
})