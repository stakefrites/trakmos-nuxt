<script setup>
const props = defineProps({
  primary: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  },
  handler: {
    type: Function,
    default: () => {}
  }
})
</script>

<template>
  <div
    v-if="small"
    @click="handler()"
    :class="
      props.primary
        ? ` cursor-pointer font-brandon w-max py-1 px-2 md:text-lg uppercase text-center text-primary-500 bg-accent-500 border-2 rounded-lg border-accent-500 hover:(text-accent-500 bg-primary-500)`
        : `cursor-pointer font-brandon w-max py-1 px-2 md:text-lg uppercase text-center text-accent-500 bg-primary-500 border-2 rounded-lg border-accent-500 hover:(text-primary-500 bg-accent-500)`
    "
  >
    {{ text }}
  </div>
  <div
    v-else
    @click="handler()"
    :class="
      props.primary
        ? ` cursor-pointer font-brandon w-max py-2 px-4 md:text-2xl uppercase text-center text-primary-500 bg-accent-500 border-2 rounded-lg border-accent-500 hover:(text-accent-500 bg-primary-500)`
        : `cursor-pointer font-brandon w-max py-2 px-4 md:text-2xl uppercase text-center text-accent-500 bg-primary-500 border-2 rounded-lg border-accent-500 hover:(text-primary-500 bg-accent-500)`
    "
  >
    {{ text }}
  </div>
</template>

<style scoped></style>
