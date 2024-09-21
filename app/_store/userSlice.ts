import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  WalletDataState,
  WalletDataStateAccount,
} from "@radixdlt/radix-dapp-toolkit";

export type WalletData = WalletDataState;

export interface UserState {
  walletData: WalletData;
  isConnected: boolean;
  selectedAccount: WalletDataStateAccount;
}

const initialState: UserState = {
  walletData: {
    accounts: [],
    personaData: [],
    proofs: [],
  },
  isConnected: false,
  selectedAccount: {} as WalletDataStateAccount,
};

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
  },
});
