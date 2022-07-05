<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/store";
import {  StatusOnlineIcon, StatusOfflineIcon, PresentationChartBarIcon, CodeIcon , LightBulbIcon, GlobeAltIcon} from "@heroicons/vue/outline";

const router = useRouter();
const store = useStore()
const { id, user, tokens, account } = storeToRefs(store)

const formatCurrency = (value, currency) => {
  const locale = currency === 'eur' ? 'fr-FR' : 'en-US'
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  })
  return formatter.format(value)
}

const tokenValue = (t) => {
  const found = tokens.value.find((to) => to.base === t)
  return found && found.price ? formatCurrency(found.price.cad, "cad")  :  "-"

}




const name = router.currentRoute.value.params.name;
const { data, error, loading } = await useFetch(`https://chains.cosmos.directory/${name}/chain`);
const { data: assets, error: assetsError, loading: assetsLoading } = await useFetch(`https://chains.cosmos.directory/${name}/assetlist`);
const { data: validators, error: validatorsError, loading: validatorsLoading } = await useFetch(` https://validators.cosmos.directory/chains/${name}`);
const persistent = computed(()=>{
  const seeds = data.value.peers.seeds.map(p => `${p.id}@${p.address}`).join(',')
  const seeds_t = data.value.peers.seeds.map(p => `${p.id.slice(0,4)}...${p.id.slice(-4)}...@${p.address.slice(0,6)}`).join(',')
  const peers = data.value.peers.persistent_peers.map(p => `${p.id}@${p.address}`).join(',')
  const peers_t = data.value.peers.persistent_peers.map(p => `${p.id.slice(0,4)}...${p.id.slice(-4)}...@${p.address.slice(0,6)}`).join(',')
  const truncated = peers_t.slice(0,40)
  const truncated_seeds = seeds_t.slice(0,40)
  return {
    peers,
    seeds,
    truncated,
    truncated_seeds,
  }
})

</script>


<template>
  <NuxtLayout name="home">
    <div class="flex flex-col rounded-lg bg-primary-600 text-white <md:(px-4 py-8) md:(px-10 py-12)">
      <div class="flex justify-between">
        <div class="font-brandon uppercase text-6xl <md:text-4xl">
          {{data.chain_name}}
        </div>
        <StatusOnlineIcon v-if="data.status === 'live'" class=" w-3rem text-accent-500"/>
        <StatusOfflineIcon v-else class=" w-3rem text-red-300"/>
      </div>
      <div class="grid lg:grid-cols-3 <lg:grid-cols-1 justify-between my-10 gap-x-10">
        <div class="md:col-span-3 flex flex-start mb-4 space-x-4">
          <a v-if="data.explorers.length > 0" target="__blank__" :href="data.explorers[1].url" >
            <PresentationChartBarIcon class="cursor-pointer w-2rem -mt-6 hover:text-accent-500"/>
          </a>
          <a v-if="data.codebase" target="__blank__" :href="data.codebase.git_repo">
            <CodeIcon class="cursor-pointer w-2rem -mt-6 hover:text-accent-500"/>
          </a>
          <a v-if="data.genesis" target="__blank__" :href="data.genesis.genesis_url">
            <LightBulbIcon class="cursor-pointer w-2rem -mt-6 hover:text-accent-500"/>
          </a>

        </div>
        <div class="md:col-span-2">
          <div class="font-brandon uppercase text-xl">Chain Information</div>
          <NetworksInfoCard :data="data" :persistent="persistent"/>
        </div>
        <div class="flex flex-col space-y-4 ">
          <div class="font-brandon uppercase text-xl">Tokens</div>
          <div v-for="asset in assets.assets" class="bg-primary-400 shadow-xl rounded-xl py-4 px-6 h-max text-white flex-row flex space-x-4 justify-between align-center">
            <div class="flex flex-row space-x-5">
              <img alt="logo" class="w-10 h-10" :src="asset.logo_URIs.png"/>
              <div class="flex flex-col">
                <div class="font-brandon text-2xl uppercase">{{asset.symbol}}</div>
                <div class="font-brandonlight capitalize -mt-1">{{asset.name}}</div>
              </div>
            </div>
            <div class="font-brandon text-xl">{{tokenValue(asset.base)}}</div>
          </div>
        </div>
        <div class="md:col-span-3">
          <div class="font-brandon uppercase text-2xl my-10">Validators</div>
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 <md:grid-cols-1">
            <ValidatorCard v-for="validator in validators.validators" :validator="validator" />
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
