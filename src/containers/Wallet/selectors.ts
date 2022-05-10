import { RootState } from "app/store";

export const selectCurrencies = (state: RootState) =>
  state.wallet.currencies.data;
export const selectCurrency = (state: RootState) =>
  state.wallet.selectedCurrency;
export const selectAmount = (state: RootState) => state.wallet.amount;
