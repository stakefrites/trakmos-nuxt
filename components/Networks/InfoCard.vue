<script setup>
import {  DuplicateIcon} from "@heroicons/vue/outline";

const {persistent, data} = defineProps({
  persistent: {
    Type: Object,
  },
  data: {
    Type: Object,
  },
})
</script>

<template>
  <div class="font-brandon bg-primary-500 w-full  p-10 self-start rounded-lg">
    <NetworksInfoCardItem :data="data.chain_id" label="Chain ID"/>
    <NetworksInfoCardItem :data="data.slip44" label="Coin Type"/>
    <NetworksInfoCardItem :data="data.daemon_name" label="Daemon Name"/>
    <NetworksInfoCardItem :data="data.node_home" label="Node Name"/>
    <NetworksInfoCardItem :data="data.codebase.recommended_version" label="Version"/>
    <NetworksCopyInfoCardItem :data="persistent.truncated" label="Persistent Peers" :value="persistent.peers"/>
    <NetworksCopyInfoCardItem :data="persistent.truncated_seeds" label="Seeds" :value="persistent.seeds"/>
    <NetworksInfoCardSection title="Rest apis">
      <NetworksCopyInfoCardItem v-for="rest in data.apis.rest" :data="rest.address" :label="rest.provider" :value="rest.address"/>
    </NetworksInfoCardSection>
    <NetworksInfoCardSection title="RPC">
      <NetworksCopyInfoCardItem v-for="rpc in data.apis.rpc" :data="rpc.address" :label="rpc.provider" :value="rpc.address"/>
    </NetworksInfoCardSection>
    <NetworksInfoCardSection title="GRPC">
      <NetworksCopyInfoCardItem v-for="grpc in data.apis.grpc" :data="grpc.address" :label="grpc.provider" :value="grpc.address"/>
    </NetworksInfoCardSection>

  </div>
</template>