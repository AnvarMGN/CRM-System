import { useState } from "react";
import { IconButton } from "../../UI/Button/IconButton/IconButton";
import { deleteTask, editTaskAndStatus } from "../../../api/Api";
import styles from "./Task.module.scss";

export const Task = ({ task, updateTaskList }) => {
  const { id, title, isDone } = task;
  const [isEditable, setEditable] = useState(false);

  const handleEditTask = async (evt) => {
    evt.preventDefault();

    if (evt.target.title.value.length < 2) {
      return;
    } else if (evt.target.title.value.length > 64) {
      return;
    }
    await editTaskAndStatus(id, evt.target.title.value);
    await updateTaskList();
    setEditable(false);
  };

  const handleCancel = (evt) => {
    evt.preventDefault();
    setEditable(false);
  };

  const handleCheck = async () => {
    await editTaskAndStatus(id, !isDone);
    await updateTaskList();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await updateTaskList();
  };

  return (
    <li className={`${styles.card}`}>
      <div className={`${styles.task}`}>
        {isEditable ? (
          <form className={`${styles.form}`} onSubmit={handleEditTask}>
            <input defaultValue={title} name="title" />
            <div className={`${styles.form__control}`}>
              <IconButton 
                className="primary" 
                icon="save" 
                abel="save icon" 
              />
              <IconButton
                className="danger"
                icon="cancel"
                label="cancel icon"
                onClick={handleCancel}
              />
            </div>
          </form>
        ) : (
          <>
            <div className={`${styles.title}`}>
              <input
                className={`${styles.checkbox}`}
                type="checkbox"
                checked={isDone}
                onChange={handleCheck}
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
