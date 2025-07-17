import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  CombineData,
  // CombineDataRights,
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
} from "../types/users";
import {
  // editRightsUser,
  editUser,
  fetchUser,
  fetchUsers,
} from "../api/apiUsers";
import axios from "axios";

type initialUsersStateType = {
  data: { users: User[] };
  meta: { totalAmount: number; sortBy: string; sortOrder: "asc" | "desc" };
  user: UserRequest;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  isEditedUser: boolean;
  filters: UserFilters;
};

const initialUsersState: initialUsersStateType = {
  data: { users: [] },
  meta: {
    sortBy: "id",
    sortOrder: "asc",
    totalAmount: 0,
  },
  user: {
    username: "",
    email: "",
    phoneNumber: "",
  },
  loading: "idle",
  error: null,
  isEditedUser: false,
  filters: {
    search: undefined,
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: undefined,
    limit: 20,
    offset: 0,
  },
};

const handleGetUserErrorStatus = (status: number) => {
  switch (status) {
    case 400:
      return "Произошла ошибка при обработке данных. Попробуйте ещё раз.";
    case 401:
      return "Проверьте введенные данные или авторизирутесь снова.";
    case 403:
      return "Отсутствуют права доступа.";
    case 404:
      return "Пользователь не найден.";
    case 500:
      return "Внутренняя ошибка сервера. Попробуйте позже.";
    default:
      return "Что-то пошло не так.";
  }
};

const handleEditUserErrorStatus = (status: number) => {
  switch (status) {
    case 400:
      return "Логин или email не изменились.";
    case 401:
      return "Проверьту введённые данные или авторизируйтесь снова.";
    case 403:
      return "Отсутствуют права доступа.";
    case 404:
      return "Пользователь не найден.";
    case 500:
      return "Внутренняя ошибка сервера. Попробуйте позже.";
    default:
      return "Что-то пошло не так.";
  }
};

export const getUsersAction = createAsyncThunk(
  "users/getUsersAction",
  async (filters: UserFilters) => {
    const response = await fetchUsers(filters);
    // if (response === null) {
    //   return;
    // }
    console.log(response);
    return response;
  }
);

export const getUserAction = createAsyncThunk<User, number>(
  "users/getUserAction",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetchUser(userId);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          return rejectWithValue(handleGetUserErrorStatus(status));
        } else if (error.request) {
          return rejectWithValue("Сервер не доступен.");
        } else {
          return rejectWithValue("Что-то пошло не так.");
        }
      }
      return rejectWithValue("Неизвестная ошибка.");
    }
  }
);

export const editUserAction = createAsyncThunk(
  "users/editUserAction",
  async (combinedData: CombineData, { rejectWithValue }) => {
    try {
      const response = await editUser(combinedData.id, combinedData.userData);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          return rejectWithValue(handleEditUserErrorStatus(status));
        } else if (error.request) {
          return rejectWithValue("Серевер не доступен.");
        } else {
          return rejectWithValue("Что-то пошло не так.");
        }
      }
      return rejectWithValue("Неизвестная ошибка.");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    sortByColumnValue(state, action) {
      state.filters.sortBy = action.payload;
    },
    sortByOrderValue(state, action) {
      state.filters.sortOrder = action.payload;
    },
    searchByInputValue(state, action) {
      state.filters.search = action.payload;
    },
    changeLimitValue(state, action) {
      state.filters.limit = action.payload;
    },
    changeOffsetValue(state, action) {
      state.filters.offset = action.payload;
    },
    filterByBlockStatus(state, action) {
      state.filters.isBlocked = action.payload;
    },
    setEditUser(state, action) {
      state.isEditedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAction.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        getUsersAction.fulfilled,
        (state, action: PayloadAction<MetaResponse<User>>) => {
          state.loading = "succeeded";
          state.error = null;
          state.data.users = action.payload.data;
          state.meta = action.payload.meta;
        }
      )
      .addCase(getUsersAction.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(getUserAction.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        getUserAction.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = "succeeded";
          state.error = null;
          state.user = {
            username: action.payload.username,
            email: action.payload.email,
            phoneNumber: action.payload.phoneNumber,
          };
        }
      )
      .addCase(getUserAction.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(editUserAction.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(editUserAction.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
        state.isEditedUser = true;
      })
      .addCase(editUserAction.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer; // as usersReducer
