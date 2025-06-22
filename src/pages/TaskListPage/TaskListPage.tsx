import styles from "./TaskListPage.module.scss";
import { useEffect, useState } from "react";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getTaskListAction } from "../../store/todo-actions";

export const TaskListPage = () => {
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

    dispatch(getTaskListAction(status));

    const updateInterval = setInterval(() => {
      dispatch(getTaskListAction(status));
      console.log("Вкладка активна, список задач обновлён.");
    }, 5000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [dispatch, isHidden, status]);

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
