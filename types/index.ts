interface Coin {
  denom: string;
  amount: string;
}

interface PortofolioItem { 
    networkName: string;
    coin: Coin;
}

interface User { 
    seedAddress: string;
    currency: string;
    networks: string[];
    keys: string[];
    created: Date;
    lastFetch: Date;
    portfolio: PortofolioItem[];
    hash?: string;
}

interface Network { 
  
}