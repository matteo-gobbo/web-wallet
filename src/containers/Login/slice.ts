import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { root } from "entities/wallet/constants";
import { User } from "models/User.model";

interface LoginState {
  user: User | null;
}

const initialState: LoginState = {
  user: null,
};

export const loginSlice = createSlice({
  name: `${root}`,
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const user: User = {
        username: action.payload,
      };
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
