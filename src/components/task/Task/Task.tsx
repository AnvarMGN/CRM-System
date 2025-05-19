import { useState } from "react";
import { IconButton } from "../../UI/Button/IconButton/IconButton";
import { deleteTask, editTaskAndStatus } from "../../../api/Api";
import styles from "./Task.module.scss";

interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

export const Task: React.FC<{
  task: Todo;
  updateTaskList: (newStatus: string) => void;
}> = ({ task, updateTaskList }) => {
  const { id, title, isDone } = task;
  const [isEditable, setEditable] = useState(false);
  const [inputText, setInputText] = useState("");

  const isValid = inputText.length === 64;

  const onChangeTextInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    setInputText(text);
  };

  const handleEditTask = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (inputText.length < 2) {
      return;
    } else if (inputText.length > 64) {
      return;
    }
    await editTaskAndStatus(id, inputText);
    await updateTaskList("all");
    setEditable(false);
  };

  const handleCancel = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setEditable(false);
  };

  const handleCheckBox = async () => {
    await editTaskAndStatus(id, !isDone);
    await updateTaskList("all");
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    await updateTaskList("all");
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
                minLength={2}
                maxLength={64}
                onChange={onChangeTextInput}
              />
              <div className={`${styles.form__control}`}>
                <IconButton className="primary" icon="save" label="save icon" />
                <IconButton
                  className="danger"
                  icon="cancel"
                  label="cancel icon"
                  onClick={handleCancel}
                />
              </div>
            </form>
            {isValid && (
              <span className={`${styles.alert}`}>
                Лимит вввода: 64 символа.
              </span>
            )}
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
              <IconButton
                className="primary"
                icon="pencil"
                label="edit icon"
                onClick={() => setEditable(true)}
              />
              <IconButton
                className="danger"
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
