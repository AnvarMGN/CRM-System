import type { TaskListResponse, TodoList, TodoPart } from "../types/types";

const baseURL = "https://easydev.club/api/v1".trim();



export const fetchTaskList = async (
  status: string
): Promise<TaskListResponse> => {
  try {
    const response = await fetch(`${baseURL}/todos?filter=${status}`);

    if (!response.ok) {
      throw new Error(`Ошибка при загрузки списка задач: ${response.status}`);
    }

    const data: TaskListResponse = await response.json();
    // console.log('Список задач: ', data);
    return data;
  } catch (error) {
    console.error("Ошибка", (error as Error).message);
    throw error;
  }
};



export const addTask = async (title: string): Promise<TodoList> => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( title ),
    });

    if (!response.ok) {
      throw new Error(`Ошибка при добавлении задачи: ${response.status}`);
    }

    const data: TodoList = await response.json();
    console.log("Задача успешно добавлена: ", data);
    return data;
  } catch (error) {
    console.error("Ошибка: ", (error as Error).message);
    throw error;
  }
};



export const deleteTask = async (id: number): Promise<string> => {
  try {
    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Ошибка при удалении задачи: ${response.status}`);
    }

    console.log(`Задача с ID:${id} успешно удалена.`);

    const data = await response.text();
    return data;
  } catch (error) {
    console.log("Ошибка: ", (error as Error).message);
    throw error;
  }
};



export const editTaskAndStatus = async (
  id: number,
  inputData: TodoPart
): Promise<TodoList> => {
  try {
    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка при редактировании задачи: ${response.status}`);
    }

    const data: TodoList = await response.json();
    console.log("Задача успешно отредактирована: ", data);
    return data;
  } catch (error) {
    console.log("Ошибка: ", (error as Error).message);
    throw error;
  }
};
