import { useEffect, useState } from "react";
import { TaskAdd } from "../../components/task/TaskAdd/TaskAdd";
import { NavMenu } from "../../components/task/NavMenu/NavMenu";
import { Task } from "../../components/task/Task/Task";
import { loadTaskList } from '../../api/Api';
import styles from "./TaskListPage.module.scss";

export const TaskListPage = () => {
  const [list, setList] = useState([]);
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

  const getTaskList = async (newStatus) => {
    try {
      const data = await loadTaskList(newStatus);
      setList(data.data);
      setCountTask(data.info);
    } catch (error) {
      console.log("Ошибка при загрузке списка задач: ", error.message);
    }
  };

  const changeStatus = (newStatus) => setStatus(newStatus);

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
