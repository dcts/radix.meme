import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  WalletDataState,
  WalletDataStateAccount,
} from "@radixdlt/radix-dapp-toolkit";
import { RootState } from "./store";
import { getGatewayApiClientOrThrow } from "./subscriptions";

export type WalletData = WalletDataState;

export interface UserState {
  walletData: WalletData;
  isConnected: boolean;
  selectedAccount: WalletDataStateAccount;
  balances: Record<string, number>;
}

const initialState: UserState = {
  walletData: {
    accounts: [],
    personaData: [],
    proofs: [],
  },
  isConnected: false,
  selectedAccount: {} as WalletDataStateAccount,
  balances: {},
};

interface SetBalancePayload {
  tokenAddress: string;
  balance: number;
}

export const userSlice = createSlice({
  name: "user",
  initialState,

  // synchronous reducers
  reducers: {
    setWalletData: (state: UserState, action: PayloadAction<WalletData>) => {
      state.isConnected = action.payload.accounts.length > 0;
      state.walletData = action.payload;
      state.selectedAccount =
        action.payload.accounts.length > 0
          ? action.payload.accounts[0]
          : ({} as WalletDataStateAccount);
    },
    selectAccount: (
      state: UserState,
      action: PayloadAction<WalletDataStateAccount>
    ) => {
      state.selectedAccount = action.payload;
    },
    reset: (state: UserState) => {
      state.walletData = {
        accounts: [],
        personaData: [],
        proofs: [],
      };
      state.isConnected = false;
      state.selectedAccount = {} as WalletDataStateAccount;
      state.balances = {};
    }
  },

  // Async thunk are handled by extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      const { tokenAddress, balance } = action.payload;
      state.balances[tokenAddress] = balance;
    });
    builder.addCase(fetchBalance.rejected, (_state, action) => {
      const errorMessage = action.error?.message || "An unknown error occurred";
      console.error("Fetch balance failed:", errorMessage);
    })
  },
});

export const fetchBalance = createAsyncThunk<
  SetBalancePayload, // Return type of the payload creator
  string, // argument type (token address)
  {
    state: RootState;
  }
>("user/fetchBalance", async (tokenAddress, thunkAPI) => {
  const state = thunkAPI.getState();
  // Validate request/state
  if (!tokenAddress) {
    throw new Error("tokenAddress not specified!");
  }
  if (!state.user.isConnected) {
    throw new Error("user wallet not connected");
  }
  // Get balance of specified token for the specified wallet address
  const gatewayApiClient = getGatewayApiClientOrThrow();
  const response =
    await gatewayApiClient.state.innerClient.entityFungibleResourceVaultPage({
      stateEntityFungibleResourceVaultsPageRequest: {
        address: state.user.selectedAccount?.address,
        // eslint-disable-next-line camelcase
        resource_address: tokenAddress,
      },
    });
  // if there are no items in response, set the balance to 0
  const balance = parseFloat(response?.items[0]?.amount || "0");
  return { tokenAddress, balance };
});
