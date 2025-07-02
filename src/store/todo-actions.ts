import { openNotification } from "../notifications/notifications";
import { fetchTodoList } from "../api/apiAxios";
import type { FilterStatus } from "../types/todos";
import type { AppDispatch } from "./index";
import { todoActions } from "./todo-slice";

export const getTaskListAction = (newStatus: FilterStatus) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchTodoList(newStatus);
      dispatch(
        todoActions.getTaskList({
          todos: response.data,
          countTask: response.info,
        })
      );
    } catch (error) {
      console.log(
        `Ошибка при загрузке списка задач: ${(error as Error).message}`
      );
      openNotification("Ошибка!", (error as Error).message);
    }
  };
};
