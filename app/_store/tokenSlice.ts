import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { TokenInfo } from "./tokenStoreSlice";
import { getGatewayApiClientFromScratchOrThrow } from "./subscriptions";

export interface TokenState {
  name: string;
  imageUrl: string;
  symbol: string;
  description: string;
  token: TokenInfo;
  address?: string;
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
  name: "",
  imageUrl: "",
  symbol: "",
  description: "",
  token: {} as TokenInfo,
  address: undefined,
  vol24h: undefined,
  vol7d: undefined,
  change24h: undefined,
  change7d: undefined,
  lastPrice: undefined,
  formInput: {
    buyAmount: undefined,
    sellAmount: undefined,
    side: OrderSide.BUY,
  },
  bondingCurveProgress: undefined,
  availableSupply: undefined,
  maxSupply: undefined,
  holderDistributionTable: {},
};

export const mockInitialState: TokenState = {
  token: {} as TokenInfo,
  address: "THnDxamD9PELnaQ7K71TENuJsZL5ypUyEZ",
  name: "Ninja Tron",
  imageUrl:
    "https://cdn.sunpump.meme/public/logo/NINJA_TH9s5x_6JuBr85YPLLj.png",
  symbol: "NINJA",
  description:
    "Earn 5% daily with a 10-level affiliate bonus. Hold $NINJA to boost your interest to 10%! Built with love at ninja-tron.com 每天赚取5%的收益，还有10级推荐奖励。持有$NINJA，利率提升至10%！ 由ninja-tron.com倾心打造",
  vol24h: undefined,
  vol7d: undefined,
  change24h: undefined,
  change7d: undefined,
  lastPrice: undefined,
  formInput: {
    buyAmount: undefined,
    sellAmount: undefined,
    side: OrderSide.BUY,
  },
  bondingCurveProgress: undefined,
  availableSupply: undefined,
  maxSupply: undefined,
  holderDistributionTable: {},
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
  },

  // Async thunk are handled by extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      console.log("fetchToken FULFILLED reached");
      console.log(action.payload);
      state.token = action.payload;
    });
    builder.addCase(fetchToken.rejected, (_state, action) => {
      console.log("fetchToken REJECTED reached");
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
