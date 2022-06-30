<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "@/store/store"

const store = useStore();
const router = useRouter();
const { id } = storeToRefs(store);


const BASE_URL = 'https://staging.api.trakmos.app'
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

const remove = (i) => {
    accounts.accounts.splice(i, 1);
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
        router.push("/app/dashboard");
    }
}



</script>

<template>
  <NuxtLayout name="home">
      <div class="bg-primary-600 px-14 py-10 rounded-xl flex flex-col text-white">
        <div class="flex flex-row justify-space-between">
          <div class="font-brandon uppercase text-6xl mb-10">Set your account</div>
          <div class="flex flex-row">
            <div class="font-brandonlight mr-4">Keplr:</div>
            <div class="bg-accent-500 px-2 font-brandon uppercase rounded-lg text-xl h-max text-primary-500">{{accounts.currentKey}}</div>
          </div>
        </div>
        <div v-if="page ===1">
          <p class="font-brandonlight text-lg">First, we will configure your different accounts.</p>
          <p class="font-brandonlight text-lg">To do that, we will need to get an address from Keplr and your evmos address from keplr.</p>
          <div class="mt-10" v-for="(account,i) in accounts.accounts">
            <div class="flex justify-space-between">
              <div class="font-brandon text-2xl">Account {{i+ 1}}</div>
              <div v-if="i >0" @click="remove(i)" class="font-brandonlight text-xl cursor-pointer">remove</div>
            </div>

            <div class="mt-6 text-white text-lg font-brandonlight">Name this account</div>
            <input type="text" v-model="account.name" class="bg-accent-500 rounded-lg" />
            <div class="mt-6 text-white text-lg font-brandonlight">Cosmos Address</div>
            <input type="text" v-model="account.bech32Address" v-if="account.bech32Address" class="bg-accent-500 rounded-lg w-full" />
            <MyButton @click="getBech32Address(i)" v-else small text="Get Bech32 Address"></MyButton>
            <div class="mt-6 text-white text-lg font-brandonlight">Evmos Address</div>
            <input type="text" v-model="account.evmosAddress" v-if="account.evmosAddress" class="bg-accent-500 rounded-lg w-full" />
            <MyButton @click="getEvmosAddress(i)" v-else small text="Get Evmos Address"></MyButton>
          </div>
          <div class="flex flex-row space-x-2 mt-10">
            <MyButton @click="page2" small primary text="Next"></MyButton>
            <MyButton @click="addOne" small text="Add another account"></MyButton>
          </div>
        </div>
        <div v-if="page ===2">
          <div class="my-10 font-brandonlight text-xl font-weight-bold">Select your currency</div>
          <select class="font-brandonlight">
            <option>Select a currency</option>
            <option value="cad">CAD</option>
            <option value="eur">EUR</option>
            <option value="usd">USD</option>
          </select>
          <MyButton class="mt-10" small primary text="Finish"  @click="createAccount"></MyButton>
        </div>
      </div>
  </NuxtLayout>
</template>

<style scoped>

.myPrimaryButton {
    background: #070C38!important;
    border: 1px solid #76EFD3!important;
    border-radius: 6px;
    color: #76EFD3;
}
.mySecondaryButton {
    background: #76EFD3!important;
    border: 1px solid #76EFD3!important;
    border-radius: 6px;
    color: #070C38;
}


</style>