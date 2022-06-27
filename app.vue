<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
const store = useStore()

const { tokens, isTokensLoading } = storeToRefs(store)

const BASE_URL = 'https://staging.api.trakmos.app'

const { data: tokensData, pending } = await useFetch(`/tokens`, {
  baseURL: BASE_URL
})
isTokensLoading.value = pending
tokens.value = tokensData.value
</script>

<template>
  <div class="">
    <router-view></router-view>
  </div>
</template>

<style>
  html{
    @apply font-brandon
    @apply font-brandonlight
  }
</style>
