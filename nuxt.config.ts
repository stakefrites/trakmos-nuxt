import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', 'mdi/css/materialdesignicons.min.css', '~/assets/fonts/global.css'],
  typescript: {
    typeCheck: false
  },
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    titleTemplate: '%s - Trakmos',
    meta: []
  },
  modules: ['nuxt-windicss', '@vueuse/nuxt'],
  buildModules: ['@pinia/nuxt', '@nuxtjs/eslint-module'],
  build: {
    transpile: ['vuetify']
  },
  target: 'server',
  windicss: {
    analyze: true
  },
  vite: {
    define: {
      'process.env.DEBUG': 'false'
    }
  }
})
