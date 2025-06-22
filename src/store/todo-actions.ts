import type { FilterStatus } from "../types/types";
import { fetchTodoList } from "../api/apiAxios";
import { todoActions } from "./todo-slice";
import { openNotification } from "../notifications/notifications";
import type { AppDispatch } from "./index";

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
