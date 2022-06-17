<script setup>
import { is } from '@babel/types'
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
const store = useStore()

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const { id, user, tokens, isTokensLoading } = storeToRefs(store)

const { data: tokensData, pending } = await useFetch(`/tokens`, {
  method: 'GET',
  baseURL: BASE_URL
})
isTokensLoading.value = pending
tokens.value = tokensData.value
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;700&display=swap');

body,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Josefin Sans', 'Sans';
}

.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6,
.text-body-1,
.text-body-2 {
  font-family: 'Josefin Sans', 'Sans' !important;
}
</style>
