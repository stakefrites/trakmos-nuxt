<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "@/store/store"
import AccountConfig from "../../components/Onboarding/AccountConfig";

const store = useStore();
const router = useRouter();
const { id, currentKey } = storeToRefs(store);

const BASE_URL = process.env.BASE_URL
const NETWORKS = ["cosmoshub", "juno", "evmos"];

const accounts = reactive({
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
    const isIt = accounts.accounts.findIndex(acc => acc.keyUsed === currentKey.value);
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
    currentKey.value = key.name;
    isAlreadySet();
}

window.addEventListener("keplr_keystorechange", setCurrentKey);

const EVMOS_CHAIN_ID = "evmos_9001-2";
const COSMOS_CHAIN_ID = "cosmoshub-4";







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
        router.push("/app/dashboard");
    }
}




</script>

<template>
  <NuxtLayout name="home">
      <div class="bg-primary-600 px-14 py-10 rounded-xl flex flex-col text-white">
        <div class="flex flex-row justify-space-between">
          <div class="font-brandon uppercase text-6xl mb-10">Set your account</div>
        </div>
        <div v-if="page ===1">
          <p class="font-brandonlight text-lg">First, we will configure your different accounts.</p>
          <p class="font-brandonlight text-lg">To do that, we will need to get an address from Keplr and your evmos address.</p>
          <div v-if="!currentKey" class="flex flex-col mt-6 space-y-2 font-brandonlight text-xl">
            <div class="underline-offset-1 underline">Would you love to speed up the process with KEPLR?</div>
            <div @click="setCurrentKey" class="cursor-pointer py-2 px-4 rounded-lg bg-accent-500 text-primary-500 uppercase font-brandon w-max hover:(bg-white text-primary-500)">Connect with Keplr</div>
          </div>
          <AccountConfig :currentKey="currentKey"/>
          <MyButton @click="page2" small primary text="Next"></MyButton>
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