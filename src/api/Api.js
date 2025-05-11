/**
Методы API:

1. Добавление новой задачи

Method: POST
URL: /todos
Request: TodoRequest
Response: Todo

2. Редактирование задачи
Method: PUT
URL: /todos/{id}
Request: TodoRequest
Response: Todo

3. Удаление задачи
Method: DELETE
URL: /todos/{id}
Request: N/A
Response: Todo

4. Получить задачу по id
Method: GET
URL: /todos/{id}
Request: N/A
Response: Todo

5. Просмотр списка задач
Method: GET
URL: /todos?filter={status}
Request Query Parameters: status?: all | completed | inWork
Response: MetaResponse<Todo, TodoInfo>
 */

const baseURL = "https://easydev.club/api/v1";

const fetchData = async (URL, options = {}) => {
  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error("Ошибка: ", response.status);
    }

    // Cодержит ли ответ JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Ответ не содержит JSON");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loadTaskList = async (status) => {
  try {
    const data = await fetchData(`${baseURL}/todos?filter=${status}`);
    // console.log('Список задач: ', data);
    return data;
  } catch (error) {
    console.error("Ошибка загрузки списка задач: ", error.message);
  }
};

export const addTask = async (title) => {
  const newTask = { title };
  try {
    const addTask = await fetchData(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newTask),
    });
    console.log("Задача успешно добавлена: ", addTask);

    //   await updateTaskList();
    return addTask;
  } catch (error) {
    console.log("Ошибка при добавлении задачи: ", error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    const deleteTask = await fetchData(`${baseURL}/todos/${id}`, {
      method: "DELETE",
    });
    console.log("Задача успешно удалена: ", deleteTask);

    //   await updateTaskList();
    return deleteTask;
  } catch (error) {
    console.log("Ошибка при удалении задачи: ", error.message);
  }
};

export const editTask = async (id, title) => {
  const newTask = { title };
  try {
    const editTask = await fetchData(`${baseURL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newTask),
    });
    console.log("Задача успешно отредактирована: ", editTask);

    //   await updateTaskList();
    return editTask;
  } catch (error) {
    console.log("Ошибка при редактировании задачи: ", error.message);
  }
};

export const editDone = async (id, isDone) => {
  const status = { isDone };
  try {
    const editDone = await fetchData(`${baseURL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(status),
    });
    console.log("Статус выполнения успешно отредактирован: ", editDone);

    // await updateTaskList();
    return editDone;
  } catch (error) {
    console.log(
      "Ошибка при редактировании статуса выполнения: ",
      error.message
    );
  }
};
