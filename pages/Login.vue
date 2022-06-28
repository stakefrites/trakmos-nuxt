<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/store'
const loginType = ref(null)
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
    router.push('/dashboard')
  }
})

const isSignUp = () => {
  loginType.value = 'signUp'
}

const isSignIn = () => {
  loginType.value = 'signIn'
}

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
    router.push('/dashboard')
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
      router.push('/onboarding')
    }
  }
}
</script>

<template>
  <NuxtLayout name="home">
    <div class="flex flex-col align-center">
      <div class="border-[#76efd3] border-10 rounded-lg px-8 py-8 flex flex-col <md:min-w-full min-w-40rem">
        <div class="text-4xl font-brandonlight font-weight-bold text-white">Login</div>
        <div class="mt-6 text-white text-lg font-brandonlight">Username</div>
        <input class="caret-[#76efd3] caret-opacity-100" type="text"/>
        <div class="mt-6 text-white text-lg font-brandonlight">Password</div>
        <input class="caret-[#76efd3] caret-opacity-100" type="password"/>
        <MyButton class="mt-8 align-self-end" primary text="Login"/>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>
