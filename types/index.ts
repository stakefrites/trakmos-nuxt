export enum Currency { 
  USD = "usd",
  EUR = "eur",
  CAD = "cad",
}

interface Coin {
  denom: string;
  amount: string;
  ibcDenom?: string;
}

export interface Delegation {
  delegatorAddress: string;
  validatorAddress: string;
  shares: string;
}

export interface DelegationResponse { 
  delegation: Delegation,
  balance: Coin,
}



interface Balance { 
  address: string;
  network: string;
  balances: Coin[];
}

interface Staked { 
  address: string;
  network: string;
  staked: DelegationResponse[];
}

export interface User { 
    seedAddress: string;
    currency: Currency;
    networks: string[];
    keys: string[];
    created: Date;
    lastFetch: Date;
    portfolio: Portfolio;
    hash?: string;
}

interface Wallet { 
  name: String;
  seedAddress: String;
  networks: String[];
  staked: Staked[];
  balances: Balance[];
  rewards: Balance[];
}


interface Portfolio { 
  name: string;
  wallets: Wallet[];

}

