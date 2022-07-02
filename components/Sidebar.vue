<script setup>
import {  CogIcon, LogoutIcon, LightningBoltIcon} from "@heroicons/vue/outline";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/store";

const store = useStore()
const { id, user, tokens, account } = storeToRefs(store)
const router = useRouter()

const logOut = () => {
  router.push('/')
  user.value = null;
  id.value =null
}
</script>

<template>
<div class="h-screen sticky pa-4 bg-primary-600 flex flex-col <md:flex-row <md:max-h-6rem shadow-xl shadow-primary-500 justify-space-between align-center text-white rounded-br-xl rounded-tr-xl">
  <div class="flex">
    <img @click="router.push('/app/dashboard')" src="~/assets/sigle_stake-frites.png" alt="Logo" class="h-15 w-15" />
  </div>
  <div class="flex flex-col  <md:flex-row justify-center items-center md:space-y-4 <md:space-x-4">
    <LightningBoltIcon @click="router.push('/networks')" class="cursor-pointer w-2rem"/>
  </div>
  <div class="flex flex-col <md:flex-row justify-center items-center md:space-y-4 <md:space-x-4">

    <LogoutIcon @click="logOut" class="cursor-pointer w-2rem"/>
    <CogIcon @click="router.push('/app/setting')" class="cursor-pointer w-2.5rem"/>
  </div>

</div>
</template>