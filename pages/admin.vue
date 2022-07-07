<script setup lang="ts">
const client = useClient()

const {data,error, refresh} = await useAsyncQuery(["users.getAll"],{
  lazy: true,
});

const input = reactive({name: "", password: "", email:"", phone: ""})

const formError: Ref<any> = ref(null);
const hasError: Ref<Boolean> = ref(false)
const handler = async () => {
  try {
    await client.mutation("users.create", {
      name: input.name,
      password: input.password,
      email: input.email,
      phone: input.phone,
    })
    input.name = ""
    input.password = ""
    input.email = ""
    input.phone = ""
    formError.value = null
    hasError.value = false
    refresh()

  } catch (e) {
    console.error(e)
    formError.value = JSON.parse(e.message)
    console.log(formError.value)
    hasError.value = true;
  }
}
</script>

<template>
  <NuxtLayout>
    <div v-if="hasError" class="p-10 bg-white rounded-xl">
      <p v-for="error in formError">{{error.path}} {{error.message}}</p>
    </div>
    <div class="bg-primary-600 px-8 py-10 rounded-lg flex flex-col">
      <h1 class="text-4xl text-white font-brandon uppercase">Admin</h1>
      <div class="flex justify-around">
        <div class="flex flex-col my-8">
          <h2 class="text-2xl text-white font-brandonlight">Add a user</h2>
          <div class="text-primary-500 flex flex-col space-y-2 p-6">
            <input type="text" placeholder="name" v-model="input.name" class="w-max" />
            <input type="text" placeholder="email" v-model="input.email" class="w-max" />
            <input type="text" placeholder="password" v-model="input.password" class="w-max" />
            <input type="text" placeholder="phone" v-model="input.phone" class="w-max" />
            <div class="cursor-pointer px-3 py-2 bg-accent-500 text-white rounded-lg w-max" @click="handler">Press me</div>
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <h2 class="text-2xl text-white font-brandonlight">Users</h2>
          <div v-for="user in data" class="space-x-3 text-white font-brandonlight flex bg-primary-400 py-4 px-6 rounded-lg">
            <div># {{user.id}}</div>
            <div>{{user.name}}</div>
            <div>{{user.phone}}</div>
            <div>{{user.email}}</div>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>
