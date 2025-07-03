import styles from "./TaskListPage.module.scss";
import axios from "axios";

import { openNotification } from "../../notifications/notifications";
import { useEffect, useState } from "react";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";

import { useAppDispatch, useAppSelector } from "../../store/hook";

import { getTaskListAction } from "../../store/todo-actions";
import { updateTokenAction } from "../../store/auth-actions";
import { useLocation } from "react-router-dom";

export const TaskListPage = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { status, todos } = useAppSelector((state) => state.todo);
  const [isLocation, setLocation] = useState<boolean>(false);
  const location = useLocation();

  const handleUpdateError = (notificatonDescription: string, error: Error) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
  };

  useEffect(() => {
    if (location.pathname === "/crm/todo") {
      setLocation(true);
    } else {
      setLocation(false);
    }

    console.log("onPage: ", isLocation);
  }, [isLocation, location.pathname]);

  useEffect(() => {
    if (!isLocation) {
      console.log("Вкладка не активна");
      return;
    }

    const thunkFunction = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
        await dispatch(getTaskListAction(status));
      } catch (error) {
        const errorStatusLabels = {
          400: "Произошла ошибка при обработке данных.",
          401: "Проверьте введенные данные или войдите снова.",
          500: "Внутренняя ошибка сервера.",
        };

        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 401:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 500:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              default:
                handleUpdateError("Неизвестная ошибка", error);
                break;
            }
          } else if (error.request) {
            console.log("Сервер не доступен.", error.message);
            openNotification("Ошибка", "Сервер не доступен.");
          } else {
            console.log("Неизвестная ошибка.", error.message);
            openNotification("Ошибка", "Неизвестная ошибка.");
          }
        } else {
          console.log("Неизвестная ошибка.", (error as Error).message);
          openNotification("Ошибка", "Неизвестная ошибка.");
        }
      } finally {
        setLoading(false);
      }
    };

    thunkFunction();

    const updateInterval = setInterval(() => {
      dispatch(getTaskListAction(status));
      console.log("Вкладка активна, список задач обновлён.");
    }, 5000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [dispatch, isLocation, status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className={styles.header}>
        <TaskAddAntd />
      </header>
      <nav>
        <TaskFilterAntd />
      </nav>
      <main className={styles.list}>
        {todos.map((task) => (
          <TaskItemAntd task={task} key={task.id} />
        ))}
      </main>
    </>
  );
};
