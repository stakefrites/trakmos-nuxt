<script setup>
const props = defineProps({
  primary: {
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
    @click="handler()"
    :class="
      props.primary
        ? `font-brandon w-max py-2 px-4 uppercase text-center text-[#070c38] bg-[#76efd3] border-2 rounded-lg border-[#76efd3] hover:(text-[#76efd3] bg-[#070c38])`
        : `font-brandon w-max  py-2 px-4 uppercase text-center text-[#76efd3] bg-[#070c38] border-2 rounded-lg border-[#76efd3] hover:(text-[#070c38] bg-[#76efd3])`
    "
  >
    {{ text }}
  </div>
</template>

<style scoped></style>
