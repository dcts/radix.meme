import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { tokenStoreSlice } from "./tokenStoreSlice";
import { tradeTokenSlice } from "./tradeTokenSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    tokenStore: tokenStoreSlice.reducer,
    selectedToken: tradeToken.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
