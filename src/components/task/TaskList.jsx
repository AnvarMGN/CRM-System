import { useEffect, useState } from "react";
import { TaskAdd } from "./TaskAdd";
import { NavMenu } from "./navMenu";
import { Task } from "./Task";
import { loadTaskList } from "../../api/Api";

export const TaskList = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("all");
  const [numOfTask, setNumOfTask] = useState(0);
  // console.log(list);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const data = await loadTaskList(status);
        setList(data.data);
        setNumOfTask(data.info);
      } catch (error) {
        console.log("Ошибка загрузки списка задач: ", error.message);
      }
    };
    fetchTaskList();
  }, [status]);

  const updateTaskList = async () => {
    try {
      const updateData = await loadTaskList(status);
      setList(updateData.data);
      setNumOfTask(updateData.info);
    } catch (error) {
      console.log("Ошибка при обновлении списка задач: ", error.message);
    }
  };

  const changeStatus = (newStatus) => setStatus(newStatus);

  return (
    <ol className="list">
      <TaskAdd updateTaskList={updateTaskList} />
      <NavMenu
        countTask={numOfTask}
        changeStatus={changeStatus}
        status={status}
      />
      {list.map((task) => (
        <Task
          task={task}
          key={task.id}
          updateTaskList={updateTaskList}
          // editTask={editTask}
          // deleteTask={deleteTask}
          // editDone={editDone}
        />
      ))}
    </ol>
  );
};
