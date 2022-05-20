<script setup>
import {ref, onBeforeMount, onMounted} from "vue"
import {Account} from "~/utils/Client"
import { storeToRefs } from 'pinia';
import {useStore} from "~/store/store"
const store = useStore();
const {id,user} = storeToRefs(store);
const initialLoad = ref(false);
const loading = ref(true);
const networks = ref([]);
const addresses = ref([]);
const router = useRouter();

onMounted(async ()=> {
    console.log(user.value)
    if (user.value) {
        user.value.portfolio && user.value.portfolio.length == 0 ? initialLoad.value = true : initialLoad.value = false;
        const account = new Account(user.value.seedAddress , user.value.networks)
        await account.init()
        console.log(account)
        networks.value = account.networks
        addresses.value = account.addresses
        loading.value = false;
        
    } else {
        router.push("/")
    }
    
})

</script>

<template>
    <NuxtLayout name="default">
        <v-row class="d-flex justify-center">
            <v-col sm="10" md="8">
                <div class="text-h2">Dashboard</div>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col sm="10" md="8">
                <div class="text-h3">Networks</div>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col sm="10" md="8" v-if="!loading" v-for="n in networks">
                <v-card>
                    <v-img :src="n.image"></v-img>
                    <v-card-title>{{n.pretty_name}}</v-card-title>
                </v-card>
            </v-col>
            <client-only v-else>
            <v-col ><v-progress-linear indeterminate ></v-progress-linear></v-col>
            </client-only>
             <v-col cols="auto">
                <v-card>
                    <v-list v-if="!loading">
                        <v-list-subheader>
                            <div class="text-h4">Adresses</div>
                        </v-list-subheader>
                        <v-list-item v-for="a in addresses">{{a}}</v-list-item>
                    </v-list>
                    <client-only v-else>
                        <v-progress-linear indeterminate ></v-progress-linear>
                    </client-only>
                </v-card>
            </v-col>
        </v-row>
</NuxtLayout>
</template>