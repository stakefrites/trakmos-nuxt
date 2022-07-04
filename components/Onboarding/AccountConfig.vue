<script setup>

import {  XCircleIcon, SparklesIcon } from "@heroicons/vue/solid";
const EVMOS_CHAIN_ID = "evmos_9001-2";
const COSMOS_CHAIN_ID = "cosmoshub-4";
const accounts = reactive({
  accounts: [{
    name: "",
    bech32Address: "",
    evmosAddress: "",
    keyUsed: "",
    isDone: false,
    hasEvmos: true
  }]
})

const {currentKey} = defineProps({
  currentKey: {
    type: String,
  },
})

const getEvmosAddress = async (index) => {
  try {
    const key = await window.keplr.getKey(EVMOS_CHAIN_ID);
    accounts.accounts[index].evmosAddress = key.bech32Address;
    accounts.accounts[index].keyUsed = key.name;
  } catch (e) {
    accounts.accounts[index].hasEvmos = false;
  }
}

const getBech32Address = async (index) => {
  const key = await window.keplr.getKey(COSMOS_CHAIN_ID);
  accounts.accounts[index].bech32Address = key.bech32Address;
  accounts.accounts[index].keyUsed = key.name;
}



const addOne = () => {
  accounts.accounts.push({
    name: "",
    keyUsed: "",
    bech32Address: "",
    evmosAddress: "",
    hasEvmos: true,
    isDone: false,
  });
}


const isKeyUsed = computed(() => {
  const res = currentKey === '' ? false : accounts.accounts.find(acc => acc.keyUsed === currentKey);
  console.log(res)
  return res
})


const remove = (i) => {
  accounts.accounts.splice(i, 1);
}

const feedback = ref(false);

const validate = (i) => {
  if (accounts.accounts[i].name && accounts.accounts[i].bech32Address) {
    accounts.accounts[i].isDone = true;
    feedback.value= false;
  } else {
    feedback.value = "Please fill out all fields";
  }
}
</script>

<template>
  <div class="font-brandon text-2xl uppercase mt-15 mb-10">Add all your keplr accounts</div>
  <div class="relative flex flex-col" v-for="(account,i) in accounts.accounts">
    <div v-if="account.isDone" class="text-white absolute z-10 bg-black opacity-80 inset-0 flex flex-col justify-center align-center">
      <div class="font-brandon uppercase">This account is properly configured</div>
      <div @click="account.isDone = false" class="font-brandon uppercase cursor-pointer underline underline-offset-1">Click to edit</div>
    </div>
    <div :class="`flex flex-col bg-primary-400 px-10 py-6 ${i === 0 ? 'rounded-t-lg' :'rounded-b-lg'} `">
      <div class="align-self-end">
        <XCircleIcon @click="remove(i)" v-if="i > 0" class="w-1.5rem mt-1 cursor-pointer hover:(text-stake-100)"/>
        <div class="w-1.5rem" v-else></div>
      </div>
      <div v-if="isKeyUsed && !account.isDone"  class="font-brandonlight mb-4">The keplr account named {{currentKey}} has already been used. Please change your Keplr account to make sure you don't track the same account twice</div>
      <div class="flex lg:flex-row <lg:flex-col justify-space-between">
        <div class="font-brandonlight text-4xl pr-8 flex flex-row align-start space-x-5">

          <div class="font-brandonlight text-4xl">{{i + 1}}</div>
        </div>
        <div class="flex flex-col text-primary-500">
          <div class="text-lg text-white min-w-30rem font-brandonlight">Name this account</div>
          <input type="text" v-model="account.name" class="bg-accent-500 rounded-lg" />
          <div  class="flex flex-col">
            <div class="text-white text-lg font-brandonlight">Cosmos Address</div>
            <div class="relative">
              <input  type="text" v-model="account.bech32Address"  class="bg-accent-500 rounded-lg w-full mb-3" />
              <SparklesIcon @click="getBech32Address(i)" v-if="!account.bech32Address" class="w-1rem position-absolute text-primary-500 top-3 right-4 cursor-pointer"/>
              <XCircleIcon v-else @click="account.bech32Address = '' ;account.keyUsed= ''" class="w-1rem position-absolute text-primary-500 top-3 right-4 cursor-pointer"/>
            </div>
          </div>
          <div v-if="account.hasEvmos " class="flex flex-col">
            <div class="text-white text-lg font-brandonlight">Evmos Address</div>
            <div class="relative">
              <input  type="text" v-model="account.evmosAddress"  class="bg-accent-500 rounded-lg w-full mb-3" />
              <SparklesIcon @click="getEvmosAddress(i)" v-if="!account.evmosAddress" class="w-1rem position-absolute text-primary-500 top-3 right-4 cursor-pointer"/>
              <XCircleIcon v-else @click="account.evmosAddress = '';account.keyUsed= ''" class="w-1rem position-absolute text-primary-500 top-3 right-4 cursor-pointer"/>
            </div>
          </div>
          <div v-else class="text-white">This keplr account doesn't have a evmos address</div>
        </div>
        <div class="flex flex-col w-40rem justify-space-between ">
          <div  class="flex flex-row font-brandon text-2xl uppercase <lg:my-4 lg:justify-end space-x-4 align-center">
            <div class="">{{account.keyUsed ? "key used" : ""}}</div>
            <div v-if="account.keyUsed" class="py-1 px-3 bg-accent-500 rounded-lg text-primary-500">{{account.keyUsed}}</div>
          </div>
          <img alt="Stake illustration" class="<lg:(hidden) w-12rem align-self-end" src="~/assets/Illustration.png" />
        </div>
      </div>
      <div class="text-red font-brandon uppercase">{{feedback? feedback : ''}}</div>
      <div >
        <MyButton class="my-4 lg:mx-10" @click="validate(i)" primary small text="Confirm"></MyButton>
      </div>

    </div>

  </div>
  <MyButton class="my-4 lg:mx-10" @click="addOne()" small text="I want to track another account"></MyButton>
</template>