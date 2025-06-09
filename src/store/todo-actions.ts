import type { TodoList, TodoInfo, FilterStatus } from "../types/types";
import { fetchTodoList } from "../api/apiAxios";
import { todoActions } from "./todo-slice";
import { openNotification } from "../notifications/notifications";

export const getTaskListAction = (newStatus: FilterStatus) => {
  return async (
    dispatch: (arg0: {
      payload: { todos: TodoList[]; countTask: TodoInfo };
      type: "todo/getTaskList";
    }) => void
  ) => {
    try {
      const data = await fetchTodoList(newStatus);
      dispatch(
        todoActions.getTaskList({
          todos: data.data,
          countTask: data.info,
        })
      );
    } catch (error) {
      console.log(
        `Ошибка при загрузке списка задача: ${(error as Error).message}`
      );
      openNotification((error as Error).message);
    }
  };
};
