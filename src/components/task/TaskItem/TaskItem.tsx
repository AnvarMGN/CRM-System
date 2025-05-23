import { useState } from "react";
import { Button } from "../../UI/Button/Button/Button";
import { deleteTask, editTaskAndStatus } from "../../../api/Api";
import styles from "./TaskItem.module.scss";
import type { TodoList } from "../../../types/types";

interface TaskItemTypes {
  currentStatus: string;
  updateTaskList: (status: string) => void;
  task: TodoList;
}

export const TaskItem: React.FC<TaskItemTypes> = ({
  currentStatus,
  updateTaskList,
  task,
}) => {
  const { id, title, isDone } = task;
  const [isEditable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [buttonActiv, setButtonActiv] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

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
    evt.preventDefault();
    const editData = {
      isDone: isDone,
      title: inputValue,
    };
    await editTaskAndStatus(id, editData);
    await updateTaskList(currentStatus);
    setEditable(false);
  };

  const handleCancel = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setEditable(false);
  };

  const handleCheckBox = async () => {
    const editData = {
      isDone: !isDone,
      title: inputValue,
    };
    await editTaskAndStatus(id, editData);
    await updateTaskList(currentStatus);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    await updateTaskList(currentStatus);
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
                  disabled={buttonActiv}
                />
                <Button
                  className="danger_icon"
                  icon="cancel"
                  label="cancel icon"
                  onClick={handleCancel}
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
              />
              <Button
                className="danger_icon"
                icon="trash"
                label="delete icon"
                onClick={() => handleDeleteTask(id)}
              />
            </div>
          </>
        )}
      </div>
    </li>
  );
};
