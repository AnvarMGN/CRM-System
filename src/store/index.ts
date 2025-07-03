import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo-slice";
import authReducer from "./auth-slice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
