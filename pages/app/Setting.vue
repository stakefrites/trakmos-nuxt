<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/store";
const store = useStore()
const { id, user, tokens, account } = storeToRefs(store)
import { PlusCircleIcon, PencilAltIcon, XIcon} from "@heroicons/vue/outline";

const isCreateAccountModalOpen = ref(false)
const isEditAccountModalOpen = ref(false)
const accountName = ref('')

const toggleModal = () => {
  isCreateAccountModalOpen.value = !isCreateAccountModalOpen.value
}

const toggleEditModal = (name) => {
  accountName.value = name || '';
  isEditAccountModalOpen.value = !isEditAccountModalOpen.value
}

const save = () => {
  toggleEditModal('')
}


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
  console.log(address)

  //accounts.accounts[index].evmosAddress = address;
  //accounts.accounts[index].keyUsed = key.name;
  isAlreadySet();
}

const getBech32Address = async (index) => {
  window.keplr.enable(COSMOS_CHAIN_ID);
  const key = await window.keplr.getKey(COSMOS_CHAIN_ID);
  const address = key.bech32Address;
  console.log(address)
 //accounts.accounts[index].bech32Address = address;
  //accounts.accounts[index].keyUsed = key.name;
  isAlreadySet();
}


</script>


<template>
  <NuxtLayout name="side">
    <div v-if="isCreateAccountModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center align-center">
      <div class="text-white bg-primary-600 rounded-lg p-10 flex-col md:min-w-30rem <md:min-w-20rem">
        <div class="flex justify-between">
          <div class="font-brandon uppercase">add account</div>
          <XIcon @click="toggleModal" class="w-1rem cursor-pointer"/>
        </div>
        <div class="flex flex-col">
          <div class="mt-6 text-white text-lg font-brandonlight">Account name</div>
          <input class="bg-accent-500 font-brandonlight" placeholder="Personal" type="text"/>
          <div class="my-2 text-white text-lg font-brandonlight">Cosmos address</div>
          <MyButton :handler="getBech32Address" small text="Get from keplr"></MyButton>
          <div class="my-2 text-white text-lg font-brandonlight">Evmos address</div>
          <MyButton :handler="getEvmosAddress" small text="Get from keplr"></MyButton>
        </div>


      </div>
    </div>
    <div v-if="isEditAccountModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center align-center">
      <div class="text-white bg-primary-600 rounded-lg p-10 flex-col  md:min-w-30rem <md:min-w-20rem">
        <div class="flex justify-between">
          <div class="font-brandon text-2xl uppercase">edit account</div>
          <XIcon @click="toggleEditModal" class="w-1rem cursor-pointer"/>
        </div>
        <div class="flex flex-col">
          <div class="mt-6 text-white text-xl font-brandonlight">Account name</div>
          <input v-model="accountName" class="bg-accent-500 font-brandonlight text-lg text-primary-500" placeholder="Personal" type="text"/>
        </div>
        <div class="flex space-x-2 mt-8 justify-end">
          <MyButton :handler="save" small primary text="save"/>
          <MyButton :handler="toggleEditModal" small text="cancel"/>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-3 text-white <md:grid-cols-1 bg-primary-600 rounded-lg md:px-14 <md:px-8 <md:py-10 md:py-20  gap-4">
      <div class="md:col-span-4 font-brandon uppercase md:text-6xl <md:text-2xl">
        Settings
      </div>
      <div class="md:col-span-4 font-brandon uppercase md:text-4xl mt-10 <md:text-xl">
        Accounts
      </div>
        <div v-for="acc in account.accounts" class="bg-primary-400 shadow-xl rounded-xl py-5 px-3 max-w-30rem text-white flex-row flex justify-around align-center">
          <div class="flex flex-row space-x-5">
            <div class="flex flex-col">
              <div class="font-brandon text-xl uppercase <md:text-lg">{{ acc.name }}</div>
              <div class="font-brandonlight <md:text-0.5rem md:-mt-1">{{ acc.bech32Address }}</div>
              <div class="font-brandonlight <md:text-0.5rem md:-mt-1">{{ acc.evmosAddress }}</div>
            </div>
          </div>

          <PencilAltIcon @click="toggleEditModal(acc.name)"  class="cursor-pointer w-2rem"/>
        </div>
      <div class="bg-primary-400 shadow-xl rounded-xl py-5 px-3 max-w-30rem text-white flex-row flex justify-around align-center">
        <div class="flex flex-row space-x-5">
          <div class="flex flex-col">
            <div class="font-brandon text-xl <md:text-sm uppercase">Add another account</div>
          </div>
        </div>

        <PlusCircleIcon @click="toggleModal" class="w-3rem <md:w-2rem cursor-pointer"/>
      </div>

    </div>

  </NuxtLayout>
</template>
