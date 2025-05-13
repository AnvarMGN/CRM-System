const baseURL = "https://easydev.club/api/v1";

export const loadTaskList = async (status) => {
  try {
    const response = await fetch(`${baseURL}/todos?filter=${status}`);
    if (!response.ok) {
      throw new Error("Ошибка: ", response.status);
    }
    const data = await response.json();
    // console.log('Список задач: ', data);
    return data;
  } catch (error) {
    console.error("Ошибка загрузки списка задач: ", error.message);
  }
};

export const addTask = async (title) => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Ошибка: ", response.status);
    }

    const data = await response.json();
    console.log("Задача успешно добавлена: ", data);
  } catch (error) {
    console.log("Ошибка при добавлении задачи: ", error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Ошибка: ", response.status);
    }

    console.log(`Задача с ID:${id} успешно удалена.`);
  } catch (error) {
    console.log("Ошибка при удалении задачи: ", error.message);
  }
};

export const editTaskAndStatus = async (id, inputData) => {
  try {
    const obj = {};

    if (typeof inputData === "string") {
      obj.title = inputData;
    } else if (typeof inputData === "boolean") {
      obj.isDone = inputData;
    } else {
      throw new Error("Не верный тип данных ", inputData);
    }

    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Ошибка: ", response.status);
    }

    const data = await response.json();
    console.log("Задача успешно отредактирована: ", data);
  } catch (error) {
    console.log("Ошибка при редактировании задачи: ", error.message);
  }
};
