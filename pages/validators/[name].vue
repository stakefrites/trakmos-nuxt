<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/store";

const router = useRouter();
const store = useStore()
const { id, user, tokens, account } = storeToRefs(store)





const name = router.currentRoute.value.params.name;
const { data, error, loading } = await useFetch(`https://validators.cosmos.directory/${name}`);



</script>

<template>
  <NuxtLayout name="home" class="text-white">
    <div class="bg-primary-600 rounded-lg py-8 md:px-20 flex flex-col">
      <div class="flex space-x-2 align-center my-10">
        <img alt="logo" class="w-10 h-10" :src="data.validator.chains[0].keybase_image"/>
        <div class="font-brandon text-2xl text-white uppercase">{{data.validator.name}}</div>
      </div>

      <div class="space-y-6">
        <div class="font-brandon text-2xl uppercase">Chains they validate</div>
        <div v-for="chain in data.validator.chains" class="bg-primary-400 shadow-xl rounded-xl py-5 px-3 max-w-30rem text-white flex-row flex justify-space-around align-center">
          <div class="flex flex-row space-x-5">
            <div class="flex flex-col">
              <div class="font-brandon text-xl uppercase">{{chain.name}}</div>
              <div class="font-brandonlight normal-case -mt-1 <md:(text-md)">{{ chain.address.slice(0,15) + "..." + chain.address.slice(-15) }}</div>
            </div>
          </div>
          <div class="font-brandon text-lg">{{data.price}}</div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>