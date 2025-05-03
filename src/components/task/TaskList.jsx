import { useEffect, useState } from 'react';
import { TaskAdd } from './TaskAdd'

const getTaskList = async (filter) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`);

    if (!response.ok) {
      throw new Error(`Ошибка при получении списка задач: ${response.status}`)
    }

    const data = await response.json();
    console.log('Список задач:', data);
    return data;

  } catch (error) {
    console.error(error.message);
  }
};

const addNewTask = async (newTask) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newTask)
    });

    if (!response.ok) {
      throw new Error(`Ошибка при добавлении задачи: ${response.status}`)
    }

    const result = await response.json();
    console.log('Задача успешно добавлена', result);

  } catch (error) {
    console.error(error.message);
  }
};

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks])

  const addTask = (title) => {
    // const createdDate = new Date();

    const newTask = {
      // id: Date.now(),
      title,
      // created: createdDate.toISOString(),
      // isDone: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
    addNewTask(newTask);
  };

  getTaskList('all');// all | completed | inWork

  return (
    <>
      <TaskAdd  addTask={addTask} />
    </>
  )
}
