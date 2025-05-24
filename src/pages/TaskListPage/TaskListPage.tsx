import { useEffect, useState } from "react";
import styles from "./TaskListPage.module.scss";
import type { TodoList } from "../../types/types";
import { TaskAddAntd } from "../../components/task/TaskAddAntd/TaskAddAntd";
import { TaskFilterAntd } from "../../components/task/TaskFilterAntd/TaskFilterAntd";
import { TaskItemAntd } from "../../components/task/TaskItemAntd/TaskItemAntd";
import { fetchTodoList } from "../../api/apiAxios";

export const TaskListPage = () => {
  const [list, setList] = useState<TodoList[]>([]);
  const [status, setStatus] = useState("all");
  const [countTask, setCountTask] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  // console.log(list);

  useEffect(() => {
    getTaskList(status);
  }, [status]);

  const getTaskList = async (newStatus: string) => {
    try {
      const data = await fetchTodoList(newStatus);
      // console.log(data);
      setList(data.data);
      setCountTask(data.info);
    } catch (error) {
      console.log(
        `Ошибка при загрузке списка задача: ${(error as Error).message}`
      );
      alert(`Ошибка при загрузке списка задача: ${(error as Error).message}`);
    }
  };

  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <>
      <header>
        <TaskAddAntd currentStatus={status} updateTaskList={getTaskList} />
        {/* <TaskAdd currentStatus={status} updateTaskList={getTaskList} /> */}
      </header>
      <nav>
        <TaskFilterAntd
          currentStatus={status}
          changeStatus={changeStatus}
          countTask={countTask}
        />
        {/* <TaskFilter
          currentStatus={status}
          changeStatus={changeStatus}
          countTask={countTask}
        /> */}
      </nav>
      <main className={`${styles.list}`}>
        {/* <ul className={`${styles.list}`}>
          {list.map((task) => (
            <TaskItem
              currentStatus={status}
              updateTaskList={getTaskList}
              task={task}
              key={task.id}
            />
          ))}
        </ul> */}
        {list.map((task) => (
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
