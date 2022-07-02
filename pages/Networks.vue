<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
const store = useStore()

const { tokens, isTokensLoading, stakeFrites } = storeToRefs(store)
const router = useRouter()
const { data, error, loading } = await useFetch(`https://chains.cosmos.directory`);


import {  ArrowCircleRightIcon} from "@heroicons/vue/outline";
const restakeUrl = (name)=>{
  console.log(name)
  const address = stakeFrites.value.validator.chains.find(c => c.name === name).address
  return `https://restake.app/${name}/${address}`
}

const chainsWeValidate = computed(()=>{
  return stakeFrites.value.validator.chains.map(c=>c.name)
})
</script>


<template>
  <NuxtLayout name="home">
    <div class="font-brandon text-white uppercase text-4xl py-10 ">Networks we validate</div>
    <div class="grid grid-cols-3 gap-3 <md:grid-cols-1">
      <div v-for="chain in data.chains.filter(c=>chainsWeValidate.includes(c.name))" :class="`bg-primary-400 shadow-xl rounded-xl py-5 px-6 max-w-30rem text-white flex-row flex justify-space-between align-center ${chainsWeValidate.includes(chain.name) ? 'border-3 border-stake-100': ''}`">
        <div class="flex flex-row space-x-5">
          <img alt="logo" class="w-10 h-10" :src="chain.image"/>
          <div class="flex flex-col">
            <div class="font-brandon text-lg uppercase">{{ chain.name }}</div>
            <div class="font-brandonlight text-sm -mt-1">{{ chain.chain_id }}</div>
            <a target="__blank__" :href="restakeUrl(chain.name)">
              <div class="font-brandonlight cursor-pointer underline hover:text-stake-100 font-weight-bold underline-offset-1">Stake with us</div>
            </a>
          </div>
        </div>
        <div class="flex flex-col align-end">
          <ArrowCircleRightIcon class="w-2rem cursor-pointer hover:text-accent-500" @click="router.push(`/networks/${chain.name}`)"/>

        </div>

      </div>
    </div>
    <div class="font-brandon text-white uppercase text-4xl py-10 ">All Networks</div>
    <div class="grid grid-cols-3 gap-3 <md:grid-cols-1">
      <div v-for="chain in data.chains" :class="`bg-primary-400 shadow-xl rounded-xl py-5 px-6 max-w-30rem text-white flex-row flex justify-space-between align-center ${chainsWeValidate.includes(chain.name) ? 'border-3 border-stake-100': ''}`">
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

