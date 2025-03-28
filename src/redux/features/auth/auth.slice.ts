import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export type TUser = {
  userId: string;
  role: string;
  needsPasswordChange: boolean;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, needsPasswordChange } = action.payload;
      state.user = user;
      state.token = token;
      if (state.user) {
        state.user.needsPasswordChange = needsPasswordChange;
      }
    },
    changeNeedPasswordChangeStatus: (state, action) => {
      const { needsPasswordChange } = action.payload;

      if (state.user) {
        state.user.needsPasswordChange = needsPasswordChange;
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
