<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "@/store/store"

const store = useStore();
const { tokens } = storeToRefs(store);


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
      <section class="md:pb-25">
        <div>
          <div class="mb-5 font-brandon text-4xl text-stake-100 uppercase">Cosmos tokens</div>
          <div class="grid <md:grid-cols-2 md:grid-cols-4 text-white md:gap-10 <md:gap-4">
            <div class="" v-for="(token,index) in tokens.filter(t=>t.price)">
              <div class="flex flex-col justify-center items-center border-5 border-stake-100 rounded-md pa-6 min-h-full shadow-sm shadow-stake-100">
                <img :alt="`image-${token.network}`" class="w-14" v-if="token.image && token.name != 'Frax'" :src="token.image"/>
                <div class="font-brandonlight font-bold text-center text-2xl my-4">{{ token.name }}</div>
                <div class="font-brandonlight font-bold text-xl ">{{ token.price ? formatCurrency(token.price.usd, "usd"): "-" }}</div>
                <div class="font-brandonlight font-bold text-xl ">{{ token.price ? formatCurrency(token.price.cad, "cad"): "-" }}</div>
                <div class="font-brandonlight font-bold text-xl ">{{ token.price ? formatCurrency(token.price.eur, "eur"): "-" }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="mb-5 font-brandon text-4xl text-stake-100 uppercase mt-10">Other tokens</div>
          <div class="grid <md:grid-cols-2 md:grid-cols-4  text-white md:gap-10 <md:gap-4">
            <div class="" v-for="(token,index) in tokens.filter(t=>!t.price)">
              <div class="flex flex-col justify-center items-center border-5 border-stake-100 rounded-md pa-6 min-h-full shadow-sm shadow-stake-100">
                <img :alt="`image-${token.network}`" class="w-14" v-if="token.image" :src="token.image"/>
                <div class="font-brandonlight font-bold text-center text-2xl mt-4">{{ token.name }}</div>
                <div v-if="token.price" class="flex align-center space-x-1">
                  <div class="text-sm font-brandonlight">USD</div>
                  <div class="font-brandonlight font-bold text-xl ">{{ token.price ? formatCurrency(token.price.usd, "usd"): "-" }}</div>
                </div>
                <div v-if="token.price" class="flex align-center space-x-1">
                  <div class="text-sm font-brandonlight">CAD</div>
                  <div class="font-brandonlight font-bold text-xl ">{{ token.price ? formatCurrency(token.price.cad, "cad"): "-" }}</div>
                </div>
                <div v-if="token.price" class="flex align-center space-x-1">
                  <div class="text-sm font-brandonlight">EUR</div>
                  <div class="font-brandonlight font-bold text-xl ">{{ token.price ? formatCurrency(token.price.eur, "eur"): "-" }}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


    </NuxtLayout>
</template>

<style>

</style>