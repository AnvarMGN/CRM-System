export interface TodoList {
  id: number;
  title: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export type FilterStatus = "all" | "inWork" | "completed";

export interface TaskListResponse {
  data: TodoList[];
  info: TodoInfo;
}

// interface MetaResponse<T, N> {
//   data:T[],
//   info: N,
//   meta: {
//     totalAmount: number
//   }
// }

export type TodoPart = {
  isDone?: boolean;
  title?: string;
};

export interface initialTodoStateType {
  todos: TodoList[];
  status: FilterStatus;
  countTask: TodoInfo;
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}
