import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { TokenInfo } from "./tokenStoreSlice";
import { getGatewayApiClientFromScratchOrThrow } from "./subscriptions";
import { TTokenData } from "@/types";

export interface TokenState {
  token: TokenInfo;
  vol24h?: number;
  vol7d?: number;
  change24h?: number;
  change7d?: number;
  lastPrice?: number;
  progress?: number;
  supply?: number;
  maxSupply?: number;
  holderDistributionTable: Record<string, number>;
  formInput: FormInput;
}

export enum OrderSide {
  "BUY" = "BUY",
  "SELL" = "SELL",
}

interface FormInput {
  side: OrderSide;
  buyAmount?: number; // in XRD
  sellAmount?: number; // in MEMECOIN
}

const initialState: TokenState = {
  token: {} as TokenInfo,
  vol24h: 15000,  // TODO
  vol7d: 100000,  // TODO
  change24h: 5.2,  // TODO
  change7d: -2.1,  // TODO
  lastPrice: -1,
  progress: undefined,
  supply: 0,
  maxSupply: 1000000,
  holderDistributionTable: {},  // TODO
  formInput: {
    side: OrderSide.BUY,
    buyAmount: undefined,
    sellAmount: undefined,
  },
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,

  // synchronous reducers
  reducers: {
    setOrderSide: (state: TokenState, action: PayloadAction<OrderSide>) => {
      state.formInput.side = action.payload;
    },
    setBuyAmount: (state: TokenState, action: PayloadAction<number>) => {
      state.formInput.buyAmount = action.payload;
    },
    setSellAmount: (state: TokenState, action: PayloadAction<number>) => {
      state.formInput.sellAmount = action.payload;
    },
    setLastPrice: (state: TokenState, action: PayloadAction<number>) => {
      state.lastPrice = action.payload;
    },
    setTTokenData: (state: TokenState, action: PayloadAction<TTokenData>) => {
      state.token = {
        componentAddress: action.payload.componentAddress || "",
        name: action.payload.name || "",
        symbol: action.payload.symbol || "",
        description: action.payload.description || "",
        iconUrl: action.payload.iconUrl || "",
        telegram: action.payload.telegramUrl || "",
        x: action.payload.xUrl || "",
        website: action.payload.website || "",
      };
      state.supply = action.payload.supply || 0;
      state.maxSupply = action.payload.maxSupply || 0;
      state.lastPrice = action.payload.lastPrice;
    },
    updateTradeData: (state: TokenState, action: PayloadAction<TTokenData>) => {
      state.lastPrice = action.payload.lastPrice;
      state.progress = action.payload.progress;
      state.supply = action.payload.supply;
      state.maxSupply = action.payload.maxSupply;
    },
  },

  // Async thunk are handled by extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(fetchToken.rejected, (_state, action) => {
      const errorMessage = action.error?.message || "An unknown error occurred";
      console.error("fetchTokens failed:", errorMessage);
    });
  },
});

// TODO: remove deprecated function includinc extra reducers
export const fetchToken = createAsyncThunk<
  TokenInfo, // Return type of the payload creator
  string, // Argument type (function input: tokenAddress)
  {
    state: RootState;
  }
>("token/fetchToken", async (tokenAddress) => {
  const gatewayApiClient = getGatewayApiClientFromScratchOrThrow();
  const res = await gatewayApiClient.state.getEntityMetadata(tokenAddress);
  const dict: Record<string, string> = {};
  res.items.forEach((it) => {
    // ensure typedValue has a "value" property before accessing it
    const typedValue = it.value.typed;
    if ("value" in typedValue) {
      const value = typedValue.value;
      // ensure the value is of type string
      if (typeof value === "string") {
        dict[it.key] = value;
      }
    }
  });
  return {
    name: dict.name,
    symbol: dict.symbol,
    description: dict.description,
    iconUrl: dict.icon_url,
    telegram: dict.telegram,
    x: dict.x,
    website: dict.website,
  } as TokenInfo;
});
