// store/filters.js
import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = defineStore({
  id: "filter-store",
  state: () => ({
    name: "Jean-Emrick",
  }),
  actions: {},
  getters: {
    getName: (state) => {
      return state.name;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
