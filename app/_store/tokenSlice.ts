import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { TokenInfo } from "./tokenStoreSlice";

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

enum OrderSide {
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
  reducers: {},

  // Async thunk are handled by extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (/*state, action*/) => {});
    builder.addCase(fetchToken.rejected, (_state, action) => {
      const errorMessage = action.error?.message || "An unknown error occurred";
      console.error("fetchTokens failed:", errorMessage);
    });
  },
});

export const fetchToken = createAsyncThunk<
  Record<string, TokenInfo>, // Return type of the payload creator
  undefined, // argument type
  {
    state: RootState;
  }
>("token/fetchToken", async () => {
  const Token = {};
  // TODO(dcts): Fetch all info of current token
  return Token;
});
