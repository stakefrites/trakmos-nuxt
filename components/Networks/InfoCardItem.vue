<script setup>


const {data} = defineProps({
  data: {
    Type: Object,
  },
  label: {
    Type: String,
  },
})
</script>

<template>
  <div class="flex justify-space-between my-2">
    <div>{{label}}:</div>
    <div class="font-brandonlight">{{data}}</div>

  </div>
</template>

