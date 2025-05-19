export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
};

export type PartTodo = {
      title?: string;
      isDone?: boolean;
    };

export type TaskList = Todo[];

export interface TodoInfo {
    all: number;
    completed: number;
    inWork: number;
};

export interface TaskListResponse{
    data: TaskList;
    info: TodoInfo;
};

export type ConstFilterTypes = {
  value: "all" | "inWork" | "completed";
  label: string;
};

export interface ButtonProps {
  className: string;
  children?: React.ReactNode;
  icon?: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}