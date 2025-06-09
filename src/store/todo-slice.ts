import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  FilterStatus,
  initialTodoStateType,
  TodoInfo,
  TodoList,
} from "../types/types";

const initialTodoState: initialTodoStateType = {
  todos: [],
  status: "all",
  countTask: {
    all: 0,
    completed: 0,
    inWork: 0,
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    changeStatus(state, action: PayloadAction<FilterStatus>) {
      state.status = action.payload;
    },
    getTaskList(
      state,
      action: PayloadAction<{ todos: TodoList[]; countTask: TodoInfo }>
    ) {
      state.todos = action.payload.todos;
      state.countTask = action.payload.countTask;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer; // as todoReducer
