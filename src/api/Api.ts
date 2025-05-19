interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

type TaskList = Todo[];

interface TaskListResponse {
  data: TaskList;
  info: TodoInfo;
}

type PartTodo = {
  title?: string;
  isDone?: boolean;
};

const baseURL = "https://easydev.club/api/v1".trim();

export const loadTaskList = async (
  status: string
): Promise<TaskListResponse> => {
  try {
    const response = await fetch(`${baseURL}/todos?filter=${status}`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data: TaskListResponse = await response.json();
    // console.log('Список задач: ', data);
    return data;
  } catch (error) {
    console.error("Ошибка загрузки списка задач: ", (error as Error).message);
    return {
      data: [],
      info: {
        all: 0,
        completed: 0,
        inWork: 0,
      },
    };
  }
};

export const addTask = async (title: string) => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data: Todo = await response.json();
    console.log("Задача успешно добавлена: ", data);
  } catch (error) {
    console.log("Ошибка при добавлении задачи: ", (error as Error).message);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    console.log(`Задача с ID:${id} успешно удалена.`);
  } catch (error) {
    console.log("Ошибка при удалении задачи: ", (error as Error).message);
  }
};

export const editTaskAndStatus = async (
  id: number,
  inputData: string | boolean
) => {
  try {
    const obj: PartTodo = {};

    if (typeof inputData === "string") {
      obj.title = inputData;
    } else if (typeof inputData === "boolean") {
      obj.isDone = inputData;
    } else {
      throw new Error(`Не верынй тип данных: ${inputData}`);
    }

    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data: Todo = await response.json();
    console.log("Задача успешно отредактирована: ", data);
  } catch (error) {
    console.log("Ошибка при редактировании задачи: ", (error as Error).message);
  }
};
