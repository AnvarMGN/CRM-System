import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileRequest, Token } from "../types/types";

type initialAuthStateType = {
  isRegistration: boolean;
  accessTokenAuth: string | null;
  refreshTokenAuth: string | null;
  isExpired: boolean;
  user: ProfileRequest;
};

const initialAuthState: initialAuthStateType = {
  isRegistration: false,
  accessTokenAuth: null,
  refreshTokenAuth: null,
  isExpired: localStorage.getItem("isExpired") === "true",
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

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    removeToken(state) {
      state.accessTokenAuth = null;
      state.refreshTokenAuth = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    changeExpiredTrue(state) {
      state.isExpired = true;
      localStorage.setItem("isExpired", "true");
    },
    changeExpiredFalse(state) {
      state.isExpired = false;
      localStorage.setItem("isExpired", "false");
    },
    getUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer; // as authReducer
