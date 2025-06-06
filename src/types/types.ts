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

export type TodoPart = {
  isDone?: boolean;
  title?: string;
};

export interface initialTodoStateType {
  todos: TodoList[];
  status: FilterStatus;
  countTask: TodoInfo;
}

// interface MetaResponse<T, N> {
//   data:T[],
//   info: N,
//   meta: {
//     totalAmount: number
//   }
// }
