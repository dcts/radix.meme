export type TMainComponentData = {
  address: string;
  ownerBadge: string;
  maxTokenSupply: number;
  maxXrd: number;
  multiplier: string;
  tokensKvs: string;
};

export type TTokenData = {
  address: string;
  componentAddress?: string;
  progress?: number; // ready-to-dexter
  name?: string;
  symbol?: string;
  iconUrl?: string;
  description?: string;
  telegramUrl?: string;
  xUrl?: string;
  website?: string;
  supply?: number;
  maxSupply?: number;
  lastPrice?: number;
};
