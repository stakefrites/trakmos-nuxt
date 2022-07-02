<script setup>
import { GlobeAltIcon , RefreshIcon , GlobeIcon, LockClosedIcon , CurrencyDollarIcon, CashIcon, ShieldCheckIcon, ClockIcon} from "@heroicons/vue/solid";
const router = useRouter()
const {validator} = defineProps({
  validator: {
    Type: Object,
  },
})
</script>

<template>
  <div  class="bg-primary-400 shadow-xl rounded-xl py-4 px-10 text-white flex flex-col space-x-4 space-y-4">
    <div class="flex flex-row justify-space-between align-center">
      <img v-if="validator.keybase_image" alt="logo" class="w-10 h-10 rounded-circle" :src="validator.keybase_image"/>
      <div v-else class="font-brandon uppercase rounded-circle w-10 h-10 bg-white flex text-primary-500 justify-center align-center">{{validator.moniker.slice(0,1)}}</div>
      <div class="flex flex-col justify-between">
        <div class="font-brandon text-2xl uppercase">{{validator.moniker}}</div>
        <div class="font-brandonlight -mt-1">{{validator.address.slice(0,10) + "..." + validator.address.slice(-12)}}</div>
      </div>
      <div class="bg-accent-500 font-brandon text-primary-500 rounded-lg py-1 px-3 h-max">
        {{validator.rank}}
      </div>
    </div>
    <div class="flex flex-row space-x-5 my-6">
      <RefreshIcon :class="`w-2rem ${validator.restake ? 'text-[#BFFF8C]' : 'text-[#FF8C8C]'}`"/>
      <LockClosedIcon :class="`w-2rem ${!validator.jailed ? 'text-[#BFFF8C]' : 'text-[#FF8C8C]'}`"/>
      <GlobeIcon :class="`w-2rem ${validator.description.website ? 'text-[#BFFF8C]' : 'text-[#FF8C8C]'}`"/>
      <ShieldCheckIcon :class="`w-2rem ${validator.description.identity ? 'text-[#BFFF8C]' : 'text-[#FF8C8C]'}`"/>
    </div>
    <div class="flex flex-row space-x-8">
      <div class="flex flex-col">
        <div class="text-uppercase font-brandon text-lg">Params</div>
        <div class="flex flex-row space-x-2">
          <CurrencyDollarIcon class="w-1rem"/>
          <div>{{(validator.tokens / Math.pow(10,6)).toFixed(2)}}</div>
        </div>
        <div class="flex flex-row space-x-2">
          <CashIcon class="w-1rem"/>
          <div>{{(validator.commission.commission_rates.rate * 100).toFixed(2)}} %</div>
        </div>
      </div>
      <div class="flex flex-col" v-if="validator.restake">
        <div class="text-uppercase font-brandon text-lg">Restake</div>
        <div v-if="validator.restake" class="flex flex-col">
          <div class="flex flex-row space-x-2" v-if="Array.isArray(validator.restake.run_time)" v-for="time in validator.restake.run_time">
            <ClockIcon class="w-1rem"/>
            <div>
              {{time}}
            </div>
          </div>
          <div class="flex flex-row space-x-2" v-else>
            <ClockIcon class="w-1rem"/>
            <div>{{validator.restake.run_time}}</div>
          </div>
        </div>
      </div>

    </div>
    <p class="font-brandonlight" v-if="validator.description">{{validator.description.details}}</p>
    <MyButton v-if="validator.path" @click="router.push(`/validators/${validator.path}`)" small text="View Profile"/>


  </div>
</template>