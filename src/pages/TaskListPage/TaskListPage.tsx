import { useCallback, useEffect, useState } from "react";
import styles from "./TaskListPage.module.scss";
import type { FilterStatus, TodoInfo, TodoList } from "../../types/types";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";
import { fetchTodoList } from "../../api/apiAxios";
import { notification } from "antd";

export const TaskListPage = () => {
  const [todos, setTodos] = useState<TodoList[]>([]);
  const [status, setStatus] = useState<FilterStatus>("all");
  const [countTask, setCountTask] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
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
        // console.log(data);
        setTodos(data.data);
        setCountTask(data.info);
      } catch (error) {
        console.log(
          `Ошибка при загрузке списка задача: ${(error as Error).message}`
        );
        // alert(`Ошибка при загрузке списка задача: ${(error as Error).message}`);
        openNotification((error as Error).message);
      }
    },
    []
  );

  useEffect(() => {
    const handleVisibility = () => {
      setHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.addEventListener("visibilitychange", handleVisibility);
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

  const changeStatus = useCallback((newStatus: FilterStatus): void => {
    setStatus(newStatus);
  }, []);

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
