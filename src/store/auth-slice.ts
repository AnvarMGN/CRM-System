import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileRequest, Token } from "../types/types";

type initialAuthStateType = {
  isRegistration: boolean;
  accessTokenAuth: string | null;
  refreshTokenAuth: string | null;
  user: ProfileRequest;
};

const initialAuthState: initialAuthStateType = {
  isRegistration: false,
  accessTokenAuth: null,
  refreshTokenAuth: null,
  user: {
    username: "",
    email: "",
    phoneNumber: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    changeRegStatusTrue(state) {
      state.isRegistration = true;
    },
    changeRegStatusFalse(state) {
      state.isRegistration = false;
    },
    saveToken(state, action: PayloadAction<Token>) {
      state.accessTokenAuth = action.payload.accessToken;
      state.refreshTokenAuth = action.payload.refreshToken;

      // localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    removeToken(state) {
      state.accessTokenAuth = null;
      state.refreshTokenAuth = null;

      // localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    getUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer; // as authReducer
