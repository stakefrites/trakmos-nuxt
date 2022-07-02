<script setup>
const router = useRouter()
const { data, error, loading } = await useFetch(`https://chains.cosmos.directory`);


import {  ArrowCircleRightIcon} from "@heroicons/vue/outline";
</script>


<template>
  <NuxtLayout name="home">
    <div class="font-brandon text-white uppercase text-4xl ">Networks</div>
    <div class="grid grid-cols-3 gap-3 <md:grid-cols-1">
      <div v-for="chain in data.chains" class="bg-primary-400 shadow-xl rounded-xl py-5 px-6 max-w-30rem text-white flex-row flex justify-space-between align-center">
        <div class="flex flex-row space-x-5">
          <img alt="logo" class="w-10 h-10" :src="chain.image"/>
          <div class="flex flex-col">
            <div class="font-brandon text-lg uppercase">{{ chain.name }}</div>
            <div class="font-brandonlight text-sm -mt-1">{{ chain.chain_id }}</div>
          </div>
        </div>
        <ArrowCircleRightIcon class="w-2rem cursor-pointer hover:text-accent-500" @click="router.push(`/networks/${chain.name}`)"/>
      </div>
    </div>
  </NuxtLayout>
</template>

