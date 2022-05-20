<script setup>
import {Account} from "~/utils/Client"
import { storeToRefs } from 'pinia';
import {useStore} from "~/store/store"
const store = useStore();
const {id,user} = storeToRefs(store);
const loading = ref(true);
const router = useRouter();
const account = reactive({});

onBeforeMount(async ()=> {
     if (user.value) {
        account.value = new Account(user.value.seedAddress , user.value.networks)
        await account.value.init()
        await account.value.getPortfolio();
        loading.value = false;
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
        <v-row class="d-flex justify-center">
            <v-col sm="10" md="8">
                <div class="text-h3">Networks</div>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="auto" v-if="!loading" v-for="n in account.value.networks">
                <v-card>
                    <v-card-title>
                        <v-avatar>
                            <v-img :src="n.image"></v-img>
                        </v-avatar>
                        {{n.pretty_name}}
                    </v-card-title>
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
                        <v-list-item v-for="a in account.value.addresses">
                            <v-list-item-heading>
                                <strong>{{a.network}}: </strong>{{a.address}}
                            </v-list-item-heading>
                        </v-list-item>
                    </v-list>
                    <client-only v-else>
                        <v-progress-linear indeterminate ></v-progress-linear>
                    </client-only>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="!loading">
            <v-col v-for="b in account.value.balances">
                <div class="text-body-1">{{b}}</div>
            </v-col>
             <v-col v-for="r in account.value.rewards">
                <div class="text-body-1">{{r}}</div>
            </v-col>
            <v-col v-for="s in account.value.staked">
                <div class="text-body-1">{{s}}</div>
            </v-col>
        </v-row>
</NuxtLayout>
</template>