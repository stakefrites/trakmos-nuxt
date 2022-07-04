<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
const store = useStore()

const { tokens, isTokensLoading, stakeFrites, baseUrl} = storeToRefs(store)


const { data: tokensData, pending } = await useFetch(`/tokens`, {
  baseURL: baseUrl.value,
})
isTokensLoading.value = pending
tokens.value = tokensData.value

const { data:ourValidatorData, error, loading } = await useFetch(`https://validators.cosmos.directory/stakefrites`);
stakeFrites.value = ourValidatorData.value
</script>

<template>
  <div class="">
    <router-view></router-view>
  </div>
</template>

<style>

</style>
