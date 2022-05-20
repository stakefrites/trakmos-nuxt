import { fromBech32, normalizeBech32, toBech32 } from "@cosmjs/encoding";
import axios from "axios";
import CosmosDirectory from "./CosmosDirectory";
const directory = CosmosDirectory();
import _ from "lodash";
import {
  setupStakingExtension,
  QueryClient as CosmjsQueryClient,
  setupBankExtension,
  setupDistributionExtension,
  setupMintExtension,
  setupGovExtension,
  setupIbcExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

const mapAsync = async (array, fn) => {
  let promises = await Promise.allSettled(array.map(fn));
  return promises.map((p) => {
    if (p.status == "fulfilled") {
      return p.value;
    } else {
      return false;
    }
  });
};

const makeClient = async (rpcUrl) => {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return CosmjsQueryClient.withExtensions(
    tmClient,
    setupStakingExtension,
    setupIbcExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupMintExtension,
    setupGovExtension
  );
};



export class Account {
  address: string;
  activated: string[];
  networks: any[];
  addresses: any[];
  rewards: any[];
  staked: any[];
  balances: any[];
  constructor(address: string, activated: string[]) {
    this.address = address;
    this.activated = activated
  }

  init = async () => {
    try {
      const networks = await mapAsync(this.activated, async (network) => {
        const chains = await directory.getChains();
        const chain = chains[network]
        const chainData = await directory.getChainData(network);
        return {
          ...chain,
          data: chainData,
          rpc: directory.rpcUrl(network),
          rest: directory.restUrl(network)
        }
      })
      this.networks = networks;
      await this.getAddresses();
    } catch (error) {
      return error;
    }
  };

  getPortfolio = async () => { 
    try {
      await this.getBalances();
      await this.getRewards();
      await this.getStaked();
      return {
        balances: this.balances,
        rewards: this.rewards,
        staked: this.staked
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  getAddresses = async () => {
    const decoded = fromBech32(this.address);
    const addresses = await mapAsync(this.networks, (network) => {
      try {
        const address = toBech32(network.data.bech32_prefix, decoded.data);
        return {
          address,
          network: network.name,
        }
      } catch (error) {
        console.log(error)
      }
    });
    this.addresses = addresses;

  };

    getIbcDenoms = async (coins, client) => {
    return await mapAsync(coins, async (c) => {
      if (c.denom.includes("ibc")) {
        const hash = c.denom.split("/")[1];
        const denomTrace = await client.ibc.transfer.denomTrace(hash);
        return {
          denom: denomTrace.denomTrace.baseDenom,
          amount: c.amount,
          ibcDenom: c.denom,
        };
      } else {
        return c;
      }
    });
  };


  getBalances = async () => {
    const balances = await mapAsync(this.addresses, async (a) => {
      const network = _.keyBy(this.networks, "name")[a.network];
      const client = await makeClient(network.rpc);
      const allBalances = await client.bank.allBalances(a.address);
      const denoms = await this.getIbcDenoms(allBalances, client);
      const parsedDenoms = denoms.map((d) => {
        return {
          denom: d.denom,
          amount: parseInt(d.amount),
          ibcDenom: d.ibcDenom ? d.ibcDenom : false,
        };
      });
      return {
        address: a.address,
        network: a.network,
        balances: parsedDenoms,
      };;
    });
    this.balances = balances;
  };

   getStaked = async () => {
     const staked = await mapAsync(this.addresses, async (a) => {
      const network = _.keyBy(this.networks, "name")[a.network];
      const client = await makeClient(network.rpc);
      const staked = await client.staking.delegatorDelegations(a.address);
      return {
        staked,
        address: a.address,
        network: a.network,
      };
     });
     this.staked= staked;
   };
  
   getRewards = async () => {
     const rewards =  await mapAsync(this.addresses, async (a) => {
      const network = _.keyBy(this.networks, "name")[a.network];
      const client = await makeClient(network.rpc);
      const rewards = await client.distribution.delegationTotalRewards(
        a.address
      );
       return {
         network: a.network,
         address: a.address,
         rewards
      };
     });
     this.rewards = rewards;
   };
  

}

export const validateAddress = (address) => {
  try {
    fromBech32(address);
    return true;
  } catch (error) {
    return false;
  }
};