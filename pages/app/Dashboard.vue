<script setup>
import { storeToRefs } from "pinia";
import { AdjustmentsIcon, ChartPieIcon, CurrencyDollarIcon, FingerPrintIcon } from "@heroicons/vue/outline";
import { useStore } from "@/store/store";

const store = useStore()
const { id, user, tokens, account } = storeToRefs(store)
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
  } else if (selectedAccount.value == null) {
    return account.value.tokens
  }
})


const BASE_URL = 'https://staging.api.trakmos.app'
const { data, error } = await useFetch(`/trakmos/account/${id.value}`, {
  method: 'GET',
  baseURL: BASE_URL,
})

if (error.value) {
  console.log('An error has occured!\n%j' , error.value)
}


  account.value = data.value.account

const tokenValue = (t) => {
  const found = tokens.value.find((to) => to.base === t.denom)
  return t.amount * found.price.cad
}

  const total = computed(()=>{
    let total = 0
    wallet.value.total.map(t=> {
      total += tokenValue(t)
    })
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
    <div class="grid md:grid-cols-4 text-white <md:grid-cols-1 bg-primary-600 rounded-lg pa-10  gap-4">
      <div class="md:col-span-4 justify-self-end my-4">
        <select v-model="selectedAccount" class="pr-10">
          <option :value="null">All</option>
          <option v-for="acc in account.accounts" :value="acc.name">{{ acc.name }}</option>
        </select>
      </div>
      <div class="md:col-span-3 font-brandonlight md:text-6xl <md:text-4xl">
        {{formatCurrency(total,'cad')}}
      </div>
      <div class="py-10 md:col-span-4 flex flex-col justify-center">
        <div class="font-brandon uppercase text-3xl my-6">Holdings</div>
        <div class="grid  md:grid-cols-4 gap-4">
          <PriceCard v-for="token in wallet.total" :name="tokenName(token).network" :price="formatCurrency(tokenValue(token), 'cad')  ? formatCurrency(tokenValue(token), 'cad') : '-'" :symbol="tokenName(token).symbol" :image="tokenImage(token)"/>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>
