<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
const loginType = ref("login")
const username = ref('jean')
const password = ref('myPassword')
const confirmPassword = ref('myPassword')
const errorMessage = ref(null)
const router = useRouter()
const store = useStore()

const { id, user } = storeToRefs(store)
const BASE_URL = 'https://staging.api.trakmos.app'

onBeforeMount(() => {
  if (id.value) {
    router.push('/app/dashboard')
  }
})


const login = async () => {
  errorMessage.value = null
  const { data } = await useFetch('/trakmos/login', {
    method: 'POST',
    baseURL: BASE_URL,
    body: {
      user: {
        username: username.value,
        password: password.value
      }
    }
  })
  console.log('data', data.value)
  if (data.value.status === 'error') {
    console.log(`An error has occured: ${data.value.message}`)
    errorMessage.value = data.value.message
  } else {
    console.log(data.value)
    id.value = data.value.user
    router.push('/app/dashboard')
  }
}

const signup = async () => {
  errorMessage.value = null
  const isPasswordMatching = password.value === confirmPassword.value
  if (!isPasswordMatching) {
    errorMessage.value = 'Passwords do not match'
  } else {
    const { data, error } = await useFetch('/trakmos/signup', {
      method: 'POST',
      baseURL: BASE_URL,
      body: {
        user: {
          username: username.value,
          password: password.value
        }
      }
    })
    console.log('data', data.value)
    if (error.value || data.value.status === 'error') {
      console.log(`An error has occured: ${data.value.message}`)
      errorMessage.value = data.value.message
    } else {
      id.value = data.value.user
      router.push('/app/onboarding')
    }
  }
}
</script>

<template>
  <NuxtLayout name="home">
    <div class="grid md:grid-cols-3">
      <div class="flex flex-col align-center md:col-span-2">
        <div class="border-[#76efd3] border-10 rounded-lg px-8 py-8 flex flex-col <md:min-w-full min-w-40rem">
          <div class="text-4xl font-brandonlight font-weight-bold text-white">{{loginType === "login" ? "Login": "Sign Up"}}</div>
          <div class="mt-6 text-white text-lg font-brandonlight">Username</div>
          <input v-model="username" class="bg-[#76efd3] font-brandonlight" type="text"/>
          <div class="mt-6 text-white text-lg font-brandonlight">Password</div>
          <input v-model="password" class="bg-[#76efd3] font-brandonlight" type="password"/>
          <div v-if="loginType === 'signup'" class="flex flex-col">
            <div class="mt-6 text-white text-lg font-brandonlight">Confirm Password</div>
            <input v-model="password" class="bg-[#76efd3] font-brandonlight" type="password"/>
          </div>
          <div v-if="loginType === 'login'" class="mt-8 align-self-end flex flex-col justify-end">
            <MyButton @click="login" class="align-self-end" primary text="Login"/>
            <a @click="loginType = 'signup'" class=" cursor-pointer font-brandonlight text-[#76efd3] text-end mt-2 underline decoration-current decoration-0 underline-offset-1">Don't have an account ?</a>
          </div>
          <div v-if="loginType === 'signup'" class="mt-8 align-self-end flex flex-col justify-end">
            <MyButton @click="signup" class="align-self-end" primary text="Sign Up"/>
            <a @click="loginType = 'login'" class=" cursor-pointer font-brandonlight text-[#76efd3] text-end mt-2 underline decoration-current decoration-0 underline-offset-1">You already have an account?</a>
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
