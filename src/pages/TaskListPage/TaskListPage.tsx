import styles from "./TaskListPage.module.scss";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getTaskListAction } from "../../store/todo-actions";
import { updateTokenAction } from "../../store/auth-actions";

export const TaskListPage = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { status, todos } = useAppSelector((state) => state.todo);
  const [isHidden, setHidden] = useState<boolean>(document.hidden);

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

    const thunkFunction = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
        await dispatch(getTaskListAction(status));
      } catch (error) {
        console.log(error);
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
  }, [dispatch, isHidden, status]);

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
