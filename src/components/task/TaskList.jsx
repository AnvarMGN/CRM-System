import { useEffect, useState } from 'react';
import { TaskAdd } from './TaskAdd';
import { NavMenu } from './navMenu';
import { List } from './List';

const constFilter = [
  { nameStatus: 'all', nameButton: 'Все' },
  { nameStatus: 'inWork', nameButton: 'в работе' },
  { nameStatus: 'completed', nameButton: 'сделано' },
];

const fetchData = async (URL, options ={}) => {
  try {
    const response = await fetch(URL, options);
     if (!response.ok) {
      throw new Error ('Ошибка: ', response.status)
     }
     return await response.json();

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
        console.error('Ошибкка загрузки списка задач: ', error.message);
      };
    };
    loadTaskList();
  }, [status]);

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const addTask = async (title) => {
    const newTask = {title};
    try {
      const result = await fetchData("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newTask),
      });
      console.log('Задача успешно добавлена: ', result);

      const updateData = await fetchData(`https://easydev.club/api/v1/todos?filter=${status}`)
      setList(updateData.data);
      setNumOfTask(updateData.info);
    } catch (error) {
      console.log('Ошибка при добавлении задачи: ', error.message);
    };
  };

  return (
    <>
      <TaskAdd addTask={addTask} />
      <NavMenu constFilter={constFilter} countTask={numOfTask} handleChangeStatus={handleChangeStatus} />
      <List fetchlist={list} />
    </>
  )
}
