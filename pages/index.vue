<script setup>
import MyButton from '../components/MyButton'
const router = useRouter()

const n = useNuxtApp();


</script>

<template>
  <NuxtLayout name="home">
    <section class="flex flex-col h-max justify-center">
      <div>
        <h1 class="font-brandon uppercase text-8xl <md:text-4xl <md:max-w-30rem max-w-70rem text-stake-100">
          Multi-wallet
        </h1>
        <h1 class="font-brandon uppercase text-8xl <md:text-4xl <md:max-w-30rem max-w-80rem text-stake-100">
          Interchain Portfolio
        </h1>
        <h2 class="font-brandonlight font-bold text-white max-w-60rem text-6xl <md:text-2xl <md:max-w-30rem mt-10">
          Monitor all your stake’s temperature in one place
        </h2>
      </div>
      <div class="flex md:flex-row <md:flex-col-reverse <md:flex-col justify-space-between md:pb-30">
        <div class="flex self-center space-x-8 h-max <md:mt-15">
          <MyButton :primary="true" text="Trak Now" :handler="()=>router.push('/app/login')"/>
          <MyButton :primary="false" text="Prices" :handler="()=>router.push('/prices')" />
        </div>
        <img alt="Stake illustration" class="md:w-35rem <md:w-20rem" src="~/assets/Illustration.png" />
      </div>

    </section>
  </NuxtLayout>
</template>

<style>

</style>
