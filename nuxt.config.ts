import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "mdi/css/materialdesignicons.min.css",
    ,
  ],
  buildModules: ["@pinia/nuxt"],
  build: {
    transpile: ["vuetify"],
  },
  target: "server",
  vite: {
    define: {
      "process.env.DEBUG": "false",
    },
  },
});