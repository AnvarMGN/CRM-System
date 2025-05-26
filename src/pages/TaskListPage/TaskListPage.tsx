import { useEffect, useState } from "react";
import { TaskAdd } from "../../components/task/TaskAdd/TaskAdd";
import { TaskFilter } from "../../components/task/TaskFilter/TaskFilter";
import { TaskItem } from "../../components/task/TaskItem/TaskItem";
import { fetchTaskList } from "../../api/Api";
import styles from "./TaskListPage.module.scss";
import type {
  FilterStatus,
  TaskListResponse,
  TodoInfo,
  TodoList,
} from "../../types/types";

export const TaskListPage = () => {
  const [todos, setTodos] = useState<TodoList[]>([]);
  const [status, setStatus] = useState<FilterStatus>("all");
  const [countTask, setCountTask] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  // console.log(list);

  useEffect(() => {
    getTaskList(status);
  }, [status]);

  const getTaskList = async (newStatus: FilterStatus) => {
    try {
      const data: TaskListResponse = await fetchTaskList(newStatus);
      // console.log(data);
      setTodos(data.data);
      setCountTask(data.info);
    } catch (error) {
      alert(`Ошибка при загрузке списка задача: ${(error as Error).message}`);
    }
  };

  const changeStatus = (newStatus: FilterStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <header>
        <TaskAdd currentStatus={status} updateTaskList={getTaskList} />
      </header>
      <nav>
        <TaskFilter
          currentStatus={status}
          changeStatus={changeStatus}
          countTask={countTask}
        />
      </nav>
      <main>
        <ul className={`${styles.list}`}>
          {todos.map((task) => (
            <TaskItem
              currentStatus={status}
              updateTaskList={getTaskList}
              task={task}
              key={task.id}
            />
          ))}
        </ul>
      </main>
    </>
  );
};
