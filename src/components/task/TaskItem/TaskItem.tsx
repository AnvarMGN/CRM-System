import { useState } from "react";
import { Button } from "../../UI/Button/Button/Button";
import { deleteTask, editTaskAndStatus } from "../../../api/Api";
import styles from "./TaskItem.module.scss";
import type { FilterStatus, TodoList } from "../../../types/types";

interface TaskItemTypes {
  currentStatus: FilterStatus;
  updateTaskList: (status: FilterStatus) => void;
  task: TodoList;
}

export const TaskItem: React.FC<TaskItemTypes> = ({
  currentStatus,
  updateTaskList,
  task,
}) => {
  const { id, title, isDone } = task;
  const [isEditable, setEditable] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [buttonActiv, setButtonActiv] = useState<boolean>(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const changeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    setInputValue(text);

    if (text.length < 2) {
      setAlert("Введите более 2 символов.");
      setButtonActiv(true);
    } else if (text.length > 64) {
      setAlert("Лимит ввода 64 символа.");
      setButtonActiv(true);
    } else {
      setAlert(null);
      setButtonActiv(false);
    }
  };

  const handleEditTask = async (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      const editData = {
        isDone: isDone,
        title: inputValue,
      };
      evt.preventDefault();
      await editTaskAndStatus(id, editData);
      await updateTaskList(currentStatus);
      setEditable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (evt: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setLoading(true);
      evt.preventDefault();
      setEditable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBox = async () => {
    try {
      setLoading(true);
      const editData = {
        isDone: !isDone,
        title: inputValue,
      };
      await editTaskAndStatus(id, editData);
      await updateTaskList(currentStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setLoading(true);
      await deleteTask(id);
      await updateTaskList(currentStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className={`${styles.card}`}>
      <div className={`${styles.task}`}>
        {isEditable ? (
          <div className={`${styles.edit_form}`}>
            <form className={`${styles.form}`} onSubmit={handleEditTask}>
              <input
                name="title"
                defaultValue={title}
                onChange={changeInputValue}
                minLength={2}
                maxLength={65}
              />
              <div className={`${styles.form__control}`}>
                <Button
                  className="primary_icon"
                  icon="save"
                  label="save icon"
                  disabled={buttonActiv || isLoading}
                />
                <Button
                  className="danger_icon"
                  icon="cancel"
                  label="cancel icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                />
              </div>
            </form>
            {alert && <span className={`${styles.alert}`}>{alert}</span>}
          </div>
        ) : (
          <>
            <div className={`${styles.title}`}>
              <input
                className={`${styles.checkbox}`}
                type="checkbox"
                checked={isDone}
                onChange={handleCheckBox}
                disabled={isLoading}
              />
              <p className={`${styles.text}`}>
                {isDone ? <s>{title}</s> : title}
              </p>
            </div>
            <div className={`${styles.task__control}`}>
              <Button
                className="primary_icon"
                icon="pencil"
                label="edit icon"
                onClick={() => setEditable(true)}
                disabled={isLoading}
              />
              <Button
                className="danger_icon"
                icon="trash"
                label="delete icon"
                onClick={() => handleDeleteTask(id)}
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </div>
    </li>
  );
};
