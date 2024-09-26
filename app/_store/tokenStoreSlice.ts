import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { getAllTokensData, getMainComponentState } from "@/utils/api-calls";
import { TMainComponentData } from "@/types";

export interface TokenStoreState {
  tokens: Record<string, TokenInfo>;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  description: string;
  iconUrl: string;
  telegram: string;
  x: string;
  website: string;
}

const initialState: TokenStoreState = {
  tokens: {},
};

export const tokenStoreSlice = createSlice({
  name: "tokenStore",
  initialState,

  // synchronous reducers
  reducers: {},

  // Async thunk are handled by extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchTokens.fulfilled, (state, action) => {
      state.tokens = action.payload;
    });
    builder.addCase(fetchTokens.rejected, (_state, action) => {
      const errorMessage = action.error?.message || "An unknown error occurred";
      console.error("fetchTokens failed:", errorMessage);
    });
  },
});

export const fetchTokens = createAsyncThunk<
  Record<string, TokenInfo>, // Return type of the payload creator
  undefined, // argument type
  {
    state: RootState;
  }
>("tokenStore/fetchTokens", async () => {
  const tokenStore: Record<string, TokenInfo> = {};
  // TODO(dcts): Fetch all created tokens and populate tokenStore

  // 1 call getMainComponentState
  // https://github.com/dcts/radix.meme/blob/b6e71e0f3ab33c5886af38e099ed0eb7c746528d/utils/api-calls.ts#L5
  if (!process.env.NEXT_PUBLIC_COMPONENT_ADDRESS) {
    throw new Error("env var not set");
  }
  const res = await getMainComponentState(
    process.env.NEXT_PUBLIC_COMPONENT_ADDRESS
  );

  // 2. get kvsAddress from TMainComponentData and input inside getAllTokensData
  // https://github.com/dcts/radix.meme/blob/b6e71e0f3ab33c5886af38e099ed0eb7c746528d/utils/api-calls.ts#L76C23-L76C45
  const data = await getAllTokensData(res.tokensKvs);
  console.log(data);
  // => []

  // 3. transform into dictionary
  // iterate over all elements from data and add it to the dict, e.g.: (this is just dummy code, not accurate):
  // data.forEach(el => dict[el.address] = {
  //   name: "...",
  //   symbole: "..:",
  //   description: "..",
  //   ...
  // }

  return tokenStore;
});
