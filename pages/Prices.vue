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
        <div class="table text-white table-fixed w-full border-collapse <md:hidden">
          <div class="table-caption mb-5 font-brandon text-4xl text-stake-100 uppercase">Cosmos tokens</div>
          <div class="table-header-group">
            <div class="table-row font-bold text-2xl bg-grey-darken-4">
              <div class="table-cell px-1 py-2"></div>
              <div class="table-cell px-1 py-2">Network</div>
              <div class="table-cell px-1 py-2">Symbol</div>
              <div class="table-cell px-1 py-2">USD</div>
              <div class="table-cell px-1 py-2">CAD</div>
              <div class="table-cell px-1 py-2">EUR</div>
            </div>
          </div>
          <div class="table-row-group">
            <div v-for="(token,index) in tokens" :class="index % 2 === 0 ? `table-row bg-grey-darken-1`: `table-row bg-grey`">
              <div class="table-cell px-1 py-1">
                <img :alt="`image-${token.network}`" class="w-10" v-if="token.image" :src="token.image"/>
              </div>
              <div class="table-cell px-1 py-1">{{ token.name }}</div>
              <div class="table-cell px-1 py-1">{{ token.symbol }}</div>
              <div class="table-cell px-1 py-1">{{ token.price ? formatCurrency(token.price.usd, "usd"): "-" }}</div>
              <div class="table-cell px-1 py-1">{{ token.price ? formatCurrency(token.price.cad, "cad"): "-" }}</div>
              <div class="table-cell px-1 py-1">{{ token.price ? formatCurrency(token.price.eur, "eur"): "-" }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="mb-5 font-brandon text-4xl text-stake-100 uppercase">Cosmos tokens</div>
          <div class="grid grid-cols-2 text-white text-2xl gap-3">
            <div class="" v-for="(token,index) in tokens">
              <div class="flex flex-col justify-center items-center border-2 rounded-md pa-6 min-h-full">
                <img :alt="`image-${token.network}`" class="w-14" v-if="token.image" :src="token.image"/>
                <div class="font-brandonlight font-bold text-center text-2xl mt-4">{{ token.name }}</div>
                <div class="font-brandonlight font-bold text-center text-xl mt-4">{{ token.price ? formatCurrency(token.price.usd, "usd"): "-" }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </NuxtLayout>
</template>

<style>
.table {
    color:black;
}
</style>