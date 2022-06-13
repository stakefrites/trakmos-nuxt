<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "@/store/store"

const store = useStore();
const router = useRouter();
const { id } = storeToRefs(store);


const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const NETWORKS = ["cosmoshub", "juno", "evmos"];

const accounts = reactive({
    currentKey: "",
    currency: "",
    accounts: [{
        name: "",
        bech32Address: "",
        evmosAddress: "",
        keyUsed: "",
    }]
})

const items = ref(['usd', 'cad', 'eur']);
const page = ref(1);
const alreadySet = ref(false)
const isLoading = ref(false);

const isAlreadySet = () => { 
    const isIt = accounts.accounts.findIndex(acc => acc.keyUsed === accounts.currentKey);
    if (!isIt) {
        alreadySet.value = false;
        return false
    } else { 
        alreadySet.value = isIt;
        return isIt
    }
}

watch(accounts.currentKey, (newVal) => {
  console.log(`x is ${newVal}`)
})

const setCurrentKey = async () => { 
    await window.keplr.enable(EVMOS_CHAIN_ID);
    const key = await window.keplr.getKey(COSMOS_CHAIN_ID);
    accounts.currentKey = key.name;
    isAlreadySet();
}

window.addEventListener("keplr_keystorechange", setCurrentKey);

const EVMOS_CHAIN_ID = "evmos_9001-2";
const COSMOS_CHAIN_ID = "cosmoshub-4";


onMounted(async () => {
    await setCurrentKey();
});

const getEvmosAddress = async (index) => {
  window.keplr.enable(EVMOS_CHAIN_ID);
  const key = await window.keplr.getKey(EVMOS_CHAIN_ID);
    const address =  key.bech32Address;
    accounts.accounts[index].evmosAddress = address;
    accounts.accounts[index].keyUsed = key.name;
  isAlreadySet();
}

const getBech32Address = async (index) => {
    window.keplr.enable(COSMOS_CHAIN_ID);
    const key = await window.keplr.getKey(COSMOS_CHAIN_ID);
    console.log(key)
    const address = key.bech32Address;
    accounts.accounts[index].bech32Address = address;
    accounts.accounts[index].keyUsed = key.name;
   isAlreadySet();
}



const addOne = () => { 
    accounts.accounts.push({
        name: "",
        bech32Address: "",
        evmosAddress: ""
    });
}

const validatePage1 = () => { 
    if (accounts.accounts.length > 0) {
        return true
    } else { 
        return false
    }
}

const page2 = () => { 
    const isValid = validatePage1();
    if (isValid) {
        page.value = 2;
    } else { 
        console.log("Page 1 is not valid")   
    }
}

const createAccount = async () => {
    isLoading.value = true;
    const { data, error, loading } = await useFetch(`/trakmos/account`, {
        method: "POST",
        baseURL: BASE_URL,
        body: {
            config: {
                accounts: accounts.accounts,
                currency: accounts.currency,
                userId: id.value,
                networks: NETWORKS

            }
        }
    });
    isLoading.value = false;
    if (error.value) {
        console.log("An error occured");
    } else {
        console.log(data);
        router.push("/dashboard");
    }
}



</script>

<template>
  <NuxtLayout name="default">
    <v-row>
        <v-col sm="10" md="8">
            <div class="text-h2">Onboarding</div>
        </v-col>
    </v-row>
    <div  v-if="page == 1">
        <v-row>
            <v-col>
                <div class="text-h3">Configure your accounts</div>
                <div class="text-body-2">First, we will configure your different accounts. </div>
                <div class="text-body-2">To do that, we will need to get an address from Keplr and your evmos address from keplr.</div>
                <v-divider></v-divider>
                <div class="mt-2 text-h5">Your Keplr is currently set on <strong>{{accounts.currentKey}}</strong></div>
                {{alreadySet === -1 ? "" : `Make sure you change your Keplr account before setting a new account. This key is used for account #${alreadySet + 1}`}}

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <div v-for="(account,i) in accounts.accounts">
                        <v-card-title>
                            <div class="text-h4">Account {{i+ 1}}</div>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="account.name"
                                label="Name this account"
                                type="text"
                                required
                                color="primary">
                            </v-text-field>
                            <v-text-field
                                v-if="account.bech32Address"
                                v-model="account.bech32Address"
                                label="Cosmos Address"
                                disabled
                                type="text"
                                required
                                color="primary">
                            </v-text-field>
                            <v-btn v-else @click="getBech32Address(i)">Get Bech32 Address</v-btn>
                            <v-text-field
                                v-if="account.evmosAddress"
                                v-model="account.evmosAddress"
                                label="Evmos Address"
                                disabled
                                type="text"
                                required
                                color="primary">
                            </v-text-field>
                            <v-btn v-else @click="getEvmosAddress(i)">Get Evmos Address</v-btn>
                            
                        </v-card-text>
                    </div>
                        <v-card-actions>
                        <v-btn @click="addOne">Add another account</v-btn>
                        <v-btn @click="page2">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <div v-if="page === 2">
    <v-row>
        <v-col>
             <v-card>
                    <div>
                        <v-card-title>
                            <div class="text-h4">Select your currency</div>
                        </v-card-title>
                        <v-card-text>
                            <v-radio-group v-model="accounts.currency">
                                <v-radio v-for="item in items"
                                    :label="item"
                                    :value="item"
                                ></v-radio>
                            </v-radio-group>
                        </v-card-text>
                    </div>
                        <v-card-actions>
                        <v-btn v-if="accounts.currency !== ''" @click="createAccount">Finish</v-btn>
                    </v-card-actions>
                </v-card>
        </v-col>
    </v-row>    
    </div>
  </NuxtLayout>
</template>