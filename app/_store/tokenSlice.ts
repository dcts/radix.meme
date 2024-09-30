import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { TokenInfo } from "./tokenStoreSlice";
import { getGatewayApiClientFromScratchOrThrow } from "./subscriptions";

export interface TokenState {
  token: TokenInfo;
  vol24h?: number;
  vol7d?: number;
  change24h?: number;
  change7d?: number;
  lastPrice?: number;
  formInput: FormInput;
  bondingCurveProgress?: number;
  availableSupply?: number;
  maxSupply?: number;
  holderDistributionTable: Record<string, number>;
  available: number;
  supply: number;
  readyToDexter: number;
}

export enum OrderSide {
  "BUY" = "BUY",
  "SELL" = "SELL",
}

interface FormInput {
  buyAmount?: number; // in XRD
  sellAmount?: number; // in MEMECOIN
  side: OrderSide;
}

const initialState: TokenState = {
  token: {} as TokenInfo,
  vol24h: 15000,
  vol7d: 100000,
  change24h: 5.2,
  change7d: -2.1,
  lastPrice: 0.45,
  formInput: {
    buyAmount: undefined,
    sellAmount: undefined,
    side: OrderSide.BUY,
  },
  bondingCurveProgress: undefined,
  availableSupply: undefined,
  maxSupply: undefined,
  holderDistributionTable: {},
  supply: 5000000,
  readyToDexter: 100000,
  available: 3643900,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  // initialState,

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
