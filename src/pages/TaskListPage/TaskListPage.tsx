import { useEffect, useState } from "react";
import styles from "./TaskListPage.module.scss";
import type { FilterStatus, TodoInfo, TodoList } from "../../types/types";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";
import { fetchTodoList } from "../../api/apiAxios";

export const TaskListPage = () => {
  const [todos, setTodos] = useState<TodoList[]>([]);
  const [status, setStatus] = useState<FilterStatus>("all");
  const [countTask, setCountTask] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  // console.log(todos);

  useEffect(() => {
    getTaskList(status);
  }, [status]);

  const getTaskList = async (newStatus: FilterStatus): Promise<void> => {
    try {
      const data = await fetchTodoList(newStatus);
      // console.log(data);
      setTodos(data.data);
      setCountTask(data.info);
    } catch (error) {
      console.log(
        `Ошибка при загрузке списка задача: ${(error as Error).message}`
      );
      alert(`Ошибка при загрузке списка задача: ${(error as Error).message}`);
    }
  };

  const changeStatus = (newStatus: FilterStatus): void => {
    setStatus(newStatus);
  };

  return (
    <>
      <header>
        <TaskAddAntd currentStatus={status} updateTaskList={getTaskList} />
      </header>
      <nav>
        <TaskFilterAntd
          currentStatus={status}
          changeStatus={changeStatus}
          countTask={countTask}
        />
      </nav>
      <main className={`${styles.list}`}>
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
