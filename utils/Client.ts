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
  addresses: string[];
  constructor(address: string, activated: string[]) {
    this.address = address;
    this.activated = activated
  }

  init = async () => {
    try {
      const networks = await mapAsync(this.activated, async (network) => {
        return await directory.getChainData(network);
      })
      this.networks = networks;
      await this.getAddresses();
    } catch (error) {
      console.log("error", error)
      return error;
    }
  };

  getAddresses = async () => {
    const decoded = fromBech32(this.address);
    const addresses = await mapAsync(this.networks, (network) => {
      try {
        const address = toBech32(network.bech32_prefix, decoded.data);
        console.log(address)
        return address;
      } catch (error) {
        console.log(error)
      }
    });
    this.addresses = addresses;

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