<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "@/store/store"

const store = useStore();
const { tokens } = storeToRefs(store);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
onBeforeMount(async () => {
    const { data, error} = await useFetch(`/tokens`,{
        method: "GET",
        baseURL: BASE_URL
    })

    if (error || data.value.status === "error") { 
        console.log("An error has occured")
    }

  console.log(data.value)
  tokens.value = data.value;
})
</script>

<template>
  <v-app class="background" full-height>
    <AppBar/>
    <v-main>
      <v-container>
        <div v-for="token in tokens">
          {{token.name}} {{token.price}}
        </div>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
 .background {
    background-repeat: repeat;
    background: url(../darkness.webp), #070C38;
    background-blend-mode: lighten, normal;
  }

</style>
