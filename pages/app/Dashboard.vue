<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/store";

import {  LockClosedIcon, LockOpenIcon, SparklesIcon, CashIcon } from "@heroicons/vue/solid";

const store = useStore()
const { id, user, tokens, account, baseUrl} = storeToRefs(store)
const router = useRouter()
const selectedAccount = ref(null)


const wallet = computed(()=> {
  if (selectedAccount.value != null) {
    const data = {
      total: [],
      delegations: [],
      rewards: [],
      balance: [],
      unbounding: []
    }
    account.value.portfolios.find(p=>p.account.name === selectedAccount.value).wallets.map(w=>{
      data.balance.push(w.tokens.balance[w.tokens.balance.length-1])
      data.rewards.push(w.tokens.rewards[w.tokens.rewards.length-1])
      data.delegations.push(w.tokens.delegations[w.tokens.delegations.length -1])
      data.unbounding.push(w.tokens.unbounding[w.tokens.unbounding.length - 1])
      data.total.push(w.tokens.total[w.tokens.total.length -1])


    })
    return data
  } else if (selectedAccount.value == null && account.value) {
    return account.value.tokens
  } else {
    return undefined
  }
})


const { data, error } = await useFetch(`/trakmos/account/${id.value}`, {
  method: 'GET',
  baseURL: baseUrl.value,
})

if (error.value) {
  console.log('An error has occured!\n %j' , error.value)
} else {
  account.value = data.value.account
}




const tokenValue = (t) => {
  const found = tokens.value.find((to) => to.base === t.denom)
  return t.amount * found.price.cad
}

  const total = computed(()=>{
    let total = 0
    if (wallet.value !== undefined) {
      console.log("passed")
      wallet.value.total.map(t=> {
        total += tokenValue(t)
      })
    }
    return total
  })

const totalStaked = computed(()=>{
  let total = 0
  if (wallet.value !== undefined) {
    console.log("passed")
    wallet.value.delegations.map(t=> {
      total += tokenValue(t)
    })
  }
  return total
})
const totalRewards = computed(()=>{
  let total = 0
  if (wallet.value !== undefined) {
    console.log("passed")
    wallet.value.rewards.map(t=> {
      total += tokenValue(t)
    })
  }
  return total
})
const totalBalance = computed(()=>{
  let total = 0
  if (wallet.value !== undefined) {
    console.log("passed")
    wallet.value.balance.map(t=> {
      total += tokenValue(t)
    })
  }
  return total
})


const tokenName = (t) => {
  return tokens.value.find((to) => to.base === t.denom)
}
const tokenImage = (t) => {
  const found = tokens.value.find((to) => to.base === t.denom)
  return found.image
}

const formatCurrency = (value, currency) => {
  const locale = currency === 'eur' ? 'fr-FR' : 'en-US'
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  })
  return formatter.format(value)
}
</script>

<template>
  <NuxtLayout name="side">
    <div v-if="error" class="bg-accent-500 rounded-md py-10 px-6 flex flex-col">
      <p class="text-md font-brandonlight">An error occured while fetching account data.</p>
      <MyButton @click="router.push('/app/login')" class="align-self-end mt-10" small text="Back Home"/>
    </div>
    <div v-if="!error" class="grid md:grid-cols-4 text-white <md:grid-cols-1 bg-primary-600 rounded-xl pa-10  gap-4">
      <div class="md:col-span-1 md:col-start-4 md:row-start-1 justify-self-end my-4">
        <select v-model="selectedAccount" class="pr-10">
          <option :value="null">All</option>
          <option v-if="account" v-for="acc in account.accounts" :value="acc.name">{{ acc.name }}</option>
        </select>
      </div>
      <div class="md:col-span-3 font-brandonlight md:text-6xl <md:text-4xl flex flex-col divide-y w-max">
        {{formatCurrency(total,'cad')}}
        <div class="md:text-xl <md:text-4xl flex flex-row space-x-3 mt-4 align-center py-2">
          <SparklesIcon class="w-1.5rem"/>
          <div>{{formatCurrency(totalRewards,'cad')}}</div>
        </div>
        <div class="md:text-xl <md:text-4xl flex flex-row space-x-3 align-center py-2">
          <CashIcon class="w-1.5rem"/>
          <div>{{formatCurrency(totalBalance,'cad')}}</div>
        </div>
        <div class="md:text-xl <md:text-4xl flex flex-row space-x-3 align-center py-2">
          <LockClosedIcon class="w-1.5rem"/>
          <div>{{formatCurrency(totalStaked,'cad')}}</div>
        </div>
      </div>

      <div class="py-10 md:col-span-4 flex flex-col justify-center">
        <div class="font-brandon uppercase text-3xl my-6">Holdings</div>
        <div class="grid  md:grid-cols-4 gap-4">
            <div v-if="wallet" v-for="token in wallet.total" class="bg-primary-400 shadow-xl rounded-xl py-5 px-3 max-w-30rem text-white flex-row flex justify-space-around align-center">
              <div class="flex flex-row space-x-5">
                <img alt="logo" class="w-10 h-10" :src="tokenImage(token)"/>
                <div class="flex flex-col">
                  <div class="font-brandon text-xl uppercase">{{tokenName(token).symbol}}</div>
                  <div @click="router.push(`/networks/${tokenName(token).name}`)" class="font-brandonlight capitalize -mt-1 hover:text-accent-500 cursor-pointer">{{ tokenName(token).name }}</div>
                </div>
              </div>
              <div class="font-brandon text-lg">{{formatCurrency(tokenValue(token),'cad')}}</div>
            </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>
