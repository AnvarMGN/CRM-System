import { useEffect, useState } from 'react';
import { TaskAdd } from './TaskAdd';
import { NavMenu } from './navMenu';
import { Task } from "./Task";

const constFilter = [
  { nameStatus: 'all', nameButton: 'Все' },
  { nameStatus: 'inWork', nameButton: 'в работе' },
  { nameStatus: 'completed', nameButton: 'сделано' },
];

const fetchData = async (URL, options = {}) => {
  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error("Ошибка: ", response.status);
    }

    // Cодержит ли ответ JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      throw new Error('Ответ не содержит JSON');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const TaskList = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('all');
  const [numOfTask, setNumOfTask] = useState(0);

  useEffect(() => {
    const loadTaskList = async () => {
      try {
        const data = await fetchData(`https://easydev.club/api/v1/todos?filter=${status}`);
        // console.log('Список задач: ', data);
        setList(data.data);
        setNumOfTask(data.info);
      } catch (error) {
        console.error('Ошибка загрузки списка задач: ', error.message);
      };
    };
    loadTaskList();
  }, [status]);

  const updateTaskList = async () => {
    try {
      const updateData = await fetchData(`https://easydev.club/api/v1/todos?filter=${status}`)
      setList(updateData.data);
      setNumOfTask(updateData.info);
    } catch (error) {
      console.log('Ошибка при обновлении списка задач: ', error.message);
    };
  };

  const changeStatus = (newStatus) => setStatus(newStatus);

  const addTask = async (title) => {
    try {
      const addTask = await fetchData("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({title}),
      });
      console.log('Задача успешно добавлена: ', addTask);

      await updateTaskList();
    } catch (error) {
      console.log('Ошибка при добавлении задачи: ', error.message);
    };
  };

  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetchData(`https://easydev.club/api/v1/todos/${id}`, {
        method: "DELETE"
      });
      console.log('Задача успешно удалена: ', deleteTask);
      
      await updateTaskList();
    } catch (error) {
      console.log('Ошибка при удалении задачи: ', error.message);
    }
  };

  const editTask = async (id, title) => {
    try {
      const editTask = await fetchData(`https://easydev.club/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({title}),
      });
      console.log('Задача успешно отредактирована: ', editTask);
      
      await updateTaskList();
    } catch (error) {
      console.log('Ошибка при редактировании задачи: ', error.message);
    }
  };

  const editDone = async (id, isDone) => {
    try {
      const editDone = await fetchData(`https://easydev.club/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({isDone}),
      });
      console.log('Статус выполнения успешно отредактирован: ', editDone);
      
      await updateTaskList();
    } catch (error) {
      console.log('Ошибка при редактировании статуса выполнения: ', error.message);
    }
  };

  // console.log(list);
  return (
    <>
      <TaskAdd addTask={addTask} />
      <NavMenu
        constFilter={constFilter}
        countTask={numOfTask}
        changeStatus={changeStatus}
      />
      <ul>
        {list.map((task) => (
          <Task
            task={task}
            key={task.id}
            editTask={editTask}
            deleteTask={deleteTask}
            editDone={editDone}
          />
        ))}
      </ul>
    </>
  );
}
