export interface Todo {
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
  data: Todo[];
  info: TodoInfo;
}

export type PartTodo = {
  title?: string;
  isDone?: boolean;
};