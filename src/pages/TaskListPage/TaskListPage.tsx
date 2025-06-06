import { useCallback, useEffect, useState } from "react";
import styles from "./TaskListPage.module.scss";
import type { FilterStatus } from "../../types/types";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";
import { fetchTodoList } from "../../api/apiAxios";
import { notification } from "antd";
import { todoActions } from "../../store/todo-slice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

export const TaskListPage = () => {
  const dispatch = useAppDispatch();
  const { status, todos, countTask } = useAppSelector((state) => state.todo);
  const [isHidden, setHidden] = useState<boolean>(document.hidden);

  const openNotification = (message: string) => {
    notification.error({
      message: "Ошибка",
      description: `Ошибка при загрузке списка задач: ${message}`,
      duration: 3,
      placement: "bottomRight",
      showProgress: true,
    });
  };

  const getTaskList = useCallback(
    async (newStatus: FilterStatus): Promise<void> => {
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
    },
    [dispatch]
  );

  useEffect(() => {
    const handleVisibility = () => {
      setHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (isHidden) {
      console.log("Вкладка не активна");
      return;
    }

    getTaskList(status);

    const updateInterval = setInterval(() => {
      getTaskList(status);
      console.log("Вкладка активна, список задач обновлён.");
    }, 5000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [getTaskList, isHidden, status]);

  const changeStatus = useCallback(
    (newStatus: FilterStatus): void => {
      dispatch(todoActions.changeStatus(newStatus));
    },
    [dispatch]
  );

  return (
    <>
      <header className={styles.header}>
        <TaskAddAntd currentStatus={status} updateTaskList={getTaskList} />
      </header>
      <nav>
        <TaskFilterAntd
          currentStatus={status}
          changeStatus={changeStatus}
          countTask={countTask}
        />
      </nav>
      <main className={styles.list}>
        {todos.map((task) => (
          <TaskItemAntd
            currentStatus={status}
            updateTaskList={getTaskList}
            task={task}
            key={task.id}
          />
        ))}
      </main>
    </>
  );
};
