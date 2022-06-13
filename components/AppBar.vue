<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/store"

const store = useStore();
const { id, user } = storeToRefs(store);
const router = useRouter();

const logOut = () => { 
  id.value = null;
  router.push("/");
}

const toHome = () => {
  router.push("/");
}
</script>

<template>
  <v-app-bar flat density="compact" color="primary">
    <v-app-bar-title @click="toHome">Trakmos</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logOut" flat color="primary" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
