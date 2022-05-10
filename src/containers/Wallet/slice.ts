import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { root } from "entities/wallet/constants";
import { getCurrencies } from "entities/wallet/services";
import { Currency } from "models/Currency.model";

interface WalletState {
  amount: number;
  currencies: {
    loading: boolean;
    data: Currency[];
    error: string;
  };
  selectedCurrency: Currency | null;
}

const initialState: WalletState = {
  amount: 2.5,
  currencies: {
    loading: false,
    data: [],
    error: "",
  },
  selectedCurrency: null,
};

export const walletSlice = createSlice({
  name: `${root}`,
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencies.pending, (state) => {
      state.currencies.loading = true;
    });
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      console.log(action);
      state.currencies.loading = false;
      state.currencies.data = Object.values(action.payload);
    });
    builder.addCase(getCurrencies.rejected, (state, action) => {
      state.currencies.loading = false;
      // TODO: handle error case
      //   state.currencies.error = action.payload;
    });
  },
});

export const { setCurrency } = walletSlice.actions;
