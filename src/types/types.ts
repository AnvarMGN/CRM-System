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

export interface TaskListResponse {
  data: TodoList[];
  info: TodoInfo;
}

export type TodoPart = {
  isDone?: boolean;
  title?: string;
};

export type FilterStatus = "all" | "inWork" | "completed";
