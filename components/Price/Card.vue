<script setup>
const router = useRouter()
  const props = defineProps({
    symbol: {
      type: String
    },
    name: {
      type: String
    },
    price: {
      type: String
    },
    image:  {
      price: String
    }
  })

</script>

<template>
  <div class="bg-primary-400 shadow-xl rounded-xl py-5 px-3 max-w-30rem text-white flex-row flex justify-space-around align-center">
      <div class="flex flex-row space-x-5">
        <img alt="logo" class="w-10 h-10" :src="image"/>
        <div class="flex flex-col">
          <div class="font-brandon text-xl uppercase">{{props.symbol}}</div>
          <div @click="router.push(`/networks/${props.name}`)" class="font-brandonlight capitalize -mt-1 hover:text-accent-500 cursor-pointer">{{ props.name }}</div>
        </div>
      </div>
      <div class="font-brandon text-lg">{{props.price}}</div>
    </div>
</template>