import { createSlice } from "@reduxjs/toolkit";
import type { ProfileRequest } from "../types/types";

type initialAuthStateType = {
  isRegistrated: boolean;
  isAuthorized: boolean;
  user: ProfileRequest;
};

const initialAuthState: initialAuthStateType = {
  isRegistrated: false,
  isAuthorized: false,
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
    isRegistratedTrue(state) {
      state.isRegistrated = true;
    },
    isRegistratedFalse(state) {
      state.isRegistrated = false;
    },
    isAuthorizedTrue(state) {
      state.isAuthorized = true;
    },
    isAuthorizedFalse(state) {
      state.isAuthorized = false;
    },
    getUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer; // as authReducer
