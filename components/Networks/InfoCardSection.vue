<script setup>

const {title } = defineProps({
  title: {
    Type: String,
  },
})
</script>

<template>

  <div class="font-brandon uppercase text-2xl mt-10">{{title}}</div>
  <slot></slot>

</template>