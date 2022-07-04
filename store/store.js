// store/filters.js
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore({
  id: 'main-store',
  state: () => ({
    id: null,
    user: {},
    tokens: [],
    account: {},
    isTokensLoading: false,
    stakeFrites: {},
    // baseUrl: 'http://localhost:3001',
    baseUrl: 'https://staging.api.trakmos.app',
    currentKey: ''
  }),
  actions: {},
  getters: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
