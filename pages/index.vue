<script setup>
import MyButton from '../components/MyButton'
const router = useRouter()
</script>

<template>
  <NuxtLayout name="home">
    <section class="grid md:grid-cols-3 <md:grid-cols-1 h-xl">
      <div class="row-span-2 row-start-1 col-start-1 col-span-3">
        <h1 class="font-brandon uppercase text-8xl <md:text-4xl <md:max-w-30rem max-w-60rem text-stake-100">
          Multi-wallet Interchain Portfolio
        </h1>
        <h2 class="font-brandonlight font-bold text-white max-w-60rem text-6xl <md:text-2xl <md:max-w-30rem">
          Monitor all your stake’s temperature in one place
        </h2>
      </div>
      <div class="mt-10 md:row-start-4 md:row-end-5 md:col-start-3 md:col-end-4 <md:row-start-4 <md:flex <md:justify-end <md:row-span-2 h-max">
        <img alt="Stake illustration" class="w-35rem <md:w-20rem" src="~/assets/Illustration.png" />
      </div>
      <div class="md:row-start-3 md:row-end-5 flex place-self-center space-x-8 <md:row-start-6 <md:flex <md:justify-center h-max">
        <MyButton :primary="true" text="Trak Now" :handler="()=>router.push('/login')"/>
        <MyButton :primary="false" text="Prices" :handler="()=>router.push('/prices')" />
      </div>
    </section>
  </NuxtLayout>
</template>

<style>

</style>
