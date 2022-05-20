<script setup>
import { storeToRefs } from 'pinia';
import {useStore} from "@/store/store"
const store = useStore();
const {id,user} = storeToRefs(store);
const router = useRouter();
const {data, refresh,loading} = await useAsyncData("portfolio",  () => $fetch(`/api/portfolio/${id}`))
onBeforeMount(async ()=> {
     if (user.value) {
    } else {
        router.push("/")
    }
})

onMounted(async ()=> {
    console.log("mounted", account)
    
})

</script>

<template>
    <NuxtLayout name="default">
        <v-row class="d-flex justify-center">
            <v-col sm="10" md="8">
                <div class="text-h2">Dashboard</div>
            </v-col>
        </v-row>
</NuxtLayout>
</template>