<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
import {useAsyncQuery, useClient} from "#imports";
const loginType = ref("login")
const username = ref('jean123')
const password = ref('myPassword')
const confirmPassword = ref('myPassword')
const errorMessage = ref(null)
const router = useRouter()
const store = useStore()
const client = useClient()

const { id, user, baseUrl } = storeToRefs(store)


onBeforeMount(() => {
  if (id.value) {
    router.push('/app/dashboard')
  }
})


const login = async () => {
  try {
    const login = await client.query('auth.login', {
      username: username.value,
      password: password.value,
    })

    id.value = login.id
    router.push('/app/dashboard')
  } catch (e) {
    console.error(e)
    errorMessage.value= JSON.parse(e.message)
  }

}

const signup = async () => {
  try {
    const login = await client.mutation('auth.signup', {
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
    console.log(login)
    id.value = login.id
    router.push('/app/onboarding')
  } catch (e) {
    console.error(e)
    errorMessage.value= JSON.parse(e.message)
  }
}
</script>

<template>
  <NuxtLayout name="home">
    <div class="grid md:grid-cols-3">
      <div class="flex flex-col align-center md:col-span-2">
        <div class="bg-primary-600 rounded-lg px-8 py-8 flex flex-col <md:min-w-full min-w-40rem">
          <div class="text-4xl font-brandonlight font-weight-bold text-white">{{loginType === "login" ? "Login": "Sign Up"}}</div>
          <div v-if="errorMessage" class="text-2xl font-brandonlight font-weight-bold text-red">{{errorMessage}}</div>
          <div class="mt-6 text-white text-lg font-brandonlight">Username</div>
          <input v-model="username" class="bg-[#76efd3] font-brandonlight" type="text"/>
          <div class="mt-6 text-white text-lg font-brandonlight">Password</div>
          <input v-model="password" class="bg-[#76efd3] font-brandonlight" type="password"/>
          <div v-if="loginType === 'signup'" class="flex flex-col">
            <div class="mt-6 text-white text-lg font-brandonlight">Confirm Password</div>
            <input v-model="confirmPassword" class="bg-[#76efd3] font-brandonlight" type="password"/>
          </div>
          <div v-if="loginType === 'login'" class="mt-8 align-self-end flex flex-col justify-end">
            <MyButton @click="login" class="align-self-end" primary text="Login"/>
            <a @click="loginType = 'signup';errorMessage= null" class=" cursor-pointer font-brandonlight text-[#76efd3] text-end mt-2 underline decoration-current decoration-0 underline-offset-1">Don't have an account ?</a>
          </div>
          <div v-if="loginType === 'signup'" class="mt-8 align-self-end flex flex-col justify-end">
            <MyButton @click="signup" class="align-self-end" primary text="Sign Up"/>
            <a @click="loginType = 'login' ;errorMessage= null" class=" cursor-pointer font-brandonlight text-[#76efd3] text-end mt-2 underline decoration-current decoration-0 underline-offset-1">You already have an account?</a>
          </div>
        </div>

      </div>
      <div class="flex flex-col justify-center <md:mt-10">
        <img alt="fries" class="align-self-center w-25rem <md:w-15rem" src="~/assets/steak-fries-2.png"/>
      </div>

    </div>

  </NuxtLayout>
</template>

<style scoped>

</style>
