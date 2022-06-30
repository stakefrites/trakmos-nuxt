<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'

const store = useStore()
const { id, user } = storeToRefs(store)
const router = useRouter()
console.log(router.currentRoute.value.path)

const logOut = () => {
  id.value = null
  router.push('/')
}

const isMobileMenuActive = ref(false)

const toggleMenu = () => {
  console.log("Alo", isMobileMenuActive.value)
  isMobileMenuActive.value ? isMobileMenuActive.value = false : isMobileMenuActive.value = true
}
</script>

<template>
  <nav class="bg-transparent">
    <div class="md:(container mx-auto) px-4">
      <div class="flex justify-between">
        <div class="flex space-x-10">
          <!-- Website Logo -->
          <div @click="router.push('/')" class="flex items-center py-4 px-2">
            <img src="~/assets/Trakmos-logo.png" alt="Logo" class="h-15 mr-2" />
            >
          </div>
        </div>
        <!-- Primary Navbar items -->
        <div class="hidden md:flex items-center space-x-1 divide-x-2 divide-accent-500">
          <router-link
            to="/app/login"
            class="py-4 px-2 text-accent-500 font-brandonlight text-2xl font-bold hover:text-[#76efd3] transition duration-300"
          >App</router-link>
          <router-link
            to="/prices"
            class="py-4 px-2 text-accent-500 font-brandonlight divider font-bold text-2xl hover:text-[#76efd3] transition duration-300"
            >Prices</router-link>
        </div>
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="outline-none mobile-menu-button">
            <svg
              class="w-6 h-6 text-accent-500 text-2xl"
              x-show="!showMenu"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div v-if="isMobileMenuActive" class="mobile-menu">
          <ul class="">
            <li class="active">
              <router-link
                to="/login"
                class="py-4 px-2 text-black block font-brandonlight text-xl bg-accent-500 font-bold hover:text-[#76efd3] transition duration-300"
              >App</router-link>
            </li>
            <li>
              <router-link
                to="/prices"
                class="py-4 px-2 text-accent-500 block font-brandonlight font-bold text-2xl hover:text-[#76efd3] transition duration-300"
              >Prices</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style></style>
