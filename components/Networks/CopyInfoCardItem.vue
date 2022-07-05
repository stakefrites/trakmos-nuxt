<script setup>
import {  DuplicateIcon} from "@heroicons/vue/outline";


const {data, label, value} = defineProps({
  data: {
    Type: Object,
  },
  label: {
    Type: String,
  },
  value: {
    Type: String,
  }
})

const { text, copy, copied, isSupported } = useClipboard({source: value})
</script>

<template>
  <div class="flex <md:flex-col justify-between">
    <div class="flex justify-between">
      <div>{{label}}</div>
      <div class="font-brandonlight md:ml-2" v-if="copied">Copied!</div>
    </div>
    <div :class="`font-brandonlight text-sm text-primary-500 bg-accent-500 px-4 py-2 normal-case max-w-20rem overflow-x-scroll flex justify-between ${copied ? 'border-white border-2' :'' }`">
      <div class="flex">
        <div>{{data}}</div>
      </div>
      <DuplicateIcon @click="copy()" class="sticky w-1rem cursor-pointer"/>
    </div>
  </div>
</template>
