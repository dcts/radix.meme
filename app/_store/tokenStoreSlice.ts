import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

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
  const tokenStore = {};
  // TODO(dcts): Fetch all created tokens and populate tokenStore
  return tokenStore;
});
