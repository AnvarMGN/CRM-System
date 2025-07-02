import axios from "axios";
import type {
  FilterStatus,
  TaskListResponse,
  TodoList,
  TodoPart,
} from "../types/todos";

const baseURL = "https://easydev.club/api/v1";
// axios.defaults.baseURL = baseURL;

const todoApi = axios.create({
  baseURL: baseURL,
});

export const fetchTodoList = async (
  status: FilterStatus
): Promise<TaskListResponse> => {
  try {
    const response = await todoApi.get(`/todos`, {
      params: {
        filter: status,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTask = async (title: FilterStatus): Promise<TodoList> => {
  try {
    const response = await todoApi.post(`/todos`, { title });
    console.log("Задача успешно добавлена: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<TodoList> => {
  try {
    const response = await todoApi.delete(`/todos/${id}`);
    console.log(`Задача с ID:${id} успешно удалена.`);
    // console.log("Задача успешно удалена: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editTitleOrStatus = async (
  id: number,
  inputData: TodoPart
): Promise<TodoList> => {
  try {
    const response = await todoApi.put(`/todos/${id}`, {
      isDone: inputData.isDone,
      title: inputData.title,
    });
    console.log("Задача успешно отредактирована: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
