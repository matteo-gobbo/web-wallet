import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "containers/Login/slice";
import { walletSlice } from "containers/Wallet/slice";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    wallet: walletSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
