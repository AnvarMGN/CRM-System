import { useEffect, useState } from "react";
import { TaskAdd } from "../../components/task/TaskAdd/TaskAdd";
import { NavMenu } from "../../components/task/NavMenu/NavMenu";
import { Task } from "../../components/task/Task/Task";
import { loadTaskList } from "../../api/Api";
import styles from "./TaskListPage.module.scss";
import type { TaskList, TaskListResponse } from "../../types/todo";

export const TaskListPage = () => {
  const [list, setList] = useState<TaskList>([]);
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
      const data: TaskListResponse = await loadTaskList(newStatus);
      // console.log(data);
      setList(data.data);
      setCountTask(data.info);
    } catch (error) {
      console.log(
        "Ошибка при загрузке списка задач: ",
        (error as Error).message
      );
    }
  };

  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <>
      <header>
        <TaskAdd updateTaskList={getTaskList} />
      </header>
      <nav>
        <NavMenu
          countTask={countTask}
          changeStatus={changeStatus}
          status={status}
        />
      </nav>
      <main>
        <ul className={`${styles.list}`}>
          {list.map((task) => (
            <Task task={task} key={task.id} updateTaskList={getTaskList} />
          ))}
        </ul>
      </main>
    </>
  );
};
