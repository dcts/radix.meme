import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { tokenStoreSlice } from "./tokenStoreSlice";
import { tokenSlice } from "./tokenSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer, // Stores user and wallet data
    tokenStore: tokenStoreSlice.reducer, // Database of all memecoins created
    token: tokenSlice.reducer, // Token details needed for the token/<address>/ page
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
