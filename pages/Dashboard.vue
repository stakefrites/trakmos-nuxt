<script setup>
import { storeToRefs } from 'pinia';
import {useStore} from "@/store/store"
const store = useStore();
const {id,user} = storeToRefs(store);
const router = useRouter();

const account = reactive({});

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';



onBeforeMount(async () => {
    const { data, error} = await useFetch(`/trakmos/account/${id.value}`,{
        method: "GET",
        baseURL: BASE_URL
    })

    if (error || data.value.status === "error") { 
        console.log("An error has occured")
    }

    console.log(data.value)
    account.value = data.value.account
})

onMounted(async ()=> {
    
})

</script>

<template>
    <NuxtLayout name="default">
        <v-row>
            <v-col sm="10" md="8">
                <div class="text-h2">Dashboard</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="10" md="8">
                <div class="text-h3">Account</div>
            </v-col>
        </v-row>
        <v-row v-if="account.value.accounts">
            <v-card>
                <v-col v-for="acc in account.value.accounts">
                    <div class="text-h4">{{acc.name}}</div>
                    <div class="text-body-1"><strong>Bech32 (118):</strong> {{acc.bech32Address}}</div>
                    <div class="text-body-1"><strong>Evmos:</strong> {{acc.evmosAddress}}</div>
                </v-col>
            </v-card>
        </v-row>
        <v-row v-if="account.value.tokens">
            <v-col>
                <div class="text-h3">Tokens</div>
                <v-table>
                    <thead>
                        <tr>
                            <td>Denom</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="token in account.value.tokens.total">
                            <td>{{token.denom}}</td>
                            <td>{{token.amount.toFixed(2)}}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
</NuxtLayout>
</template>