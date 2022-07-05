<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "@/store/store"


const store = useStore();
const { tokens } = storeToRefs(store);
const { data, error } = await useFetch(`/coins/cosmos/market_chart`, {
  method: 'GET',
  params: {
    days: "14",
    vs_currency: "cad",
    interval: "daily"
  },
  baseURL: "https://api.coingecko.com/api/v3",
})

const formatCurrency = (value, currency) => {
    const locale = currency === "eur" ? "fr-FR" : "en-US";
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    });
    return formatter.format(value);
}
</script>

<template>
    <NuxtLayout name="home">
      <section class="md:pb-25 flex-col flex">
          <div class="mb-5 font-brandon text-4xl text-stake-100 uppercase">Cosmos tokens</div>
          <div class="grid <md:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white md:gap-8 <md:gap-4 ">
            <div v-if="tokens" v-for="(token,index) in tokens.filter(t=>t.price)">
              <PriceCard :name="token.network" :price="token.price ? formatCurrency(token.price.usd, 'usd'): '-'" :symbol="token.symbol" :image="token.image"/>

          </div>
        </div>
        <div>
          <div class="mb-5 font-brandon text-4xl text-stake-100 uppercase mt-10">Other tokens</div>
          <div class="grid <md:grid-cols-1 md:grid-cols-4 md:gap-10 <md:gap-4">
            <div v-if="tokens" v-for="(token,index) in tokens.filter(t=>!t.price)">
              <PriceCard :name="token.network" :price="token.price ? formatCurrency(token.price.usd, 'usd'): '-'" :symbol="token.symbol" :image="token.image"/>
            </div>
          </div>
        </div>
      </section>


    </NuxtLayout>
</template>

<style>

</style>