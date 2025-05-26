import axios from "axios";
import type { FilterStatus, TaskListResponse, TodoList, TodoPart } from "../types/types";

const baseURL = "https://easydev.club/api/v1";
// axios.defaults.baseURL = baseURL;

const todoApi = axios.create({
  baseURL: baseURL,
});

export const fetchTodoList = async (
  status: FilterStatus
): Promise<TaskListResponse> => {
  try {
    const response = await todoApi.get(`/todos?filter=${status}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTodoTask = async (title: FilterStatus): Promise<TodoList> => {
  try {
    const response = await todoApi.post(`/todos`, { title });
    console.log("Задача успешно добавлена: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTodoTask = async (id: number): Promise<void> => {
  try {
    await todoApi.delete(`/todos/${id}`);
    console.log(`Задача с ID:${id} успешно удалена.`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editTodoTitleOrStatus = async (
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
