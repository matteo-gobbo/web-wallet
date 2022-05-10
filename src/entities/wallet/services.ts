import { createAsyncThunk } from "@reduxjs/toolkit";
import { root } from "./constants";

export const getCurrencies = createAsyncThunk(
  `${root}/getCurrencies`,
  async () => {
    const res = await fetch("https://blockchain.info/ticker").then((data) =>
      data.json()
    );
    return res;
  }
);
