import { createSlice } from "@reduxjs/toolkit";
import type { Profile } from "../types/auth";

type initialAuthStateType = {
  isRegistrated: boolean;
  isAuthorized: boolean;
  user: Profile;
};

const initialAuthState: initialAuthStateType = {
  isRegistrated: false,
  isAuthorized: false,
  user: {
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: [],
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
