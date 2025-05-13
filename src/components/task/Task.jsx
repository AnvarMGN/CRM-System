import { useState } from "react";
import { IconButton } from "../UI/Button/IconButton";
import { deleteTask, editTaskAndStatus } from "../../api/Api";
import styles from "./Task.module.scss";

export const Task = ({ task, updateTaskList }) => {
  const { id, title, isDone } = task;
  // console.log(id, title, isDone);

  const [isEditable, setEditable] = useState(false);
  // console.log(task.id);

  const handleEditTask = async (evt) => {
    evt.preventDefault();

    if (evt.target.title.value.length < 2) {
      return;
    } else if (evt.target.title.value.length > 64) {
      return;
    }

    await editTaskAndStatus(id, evt.target.title.value);
    await updateTaskList();
    // editTask(task.id, evt.target.title.value);
    setEditable(false);
  };

  const handleCancel = (evt) => {
    evt.preventDefault();
    setEditable(false);
  };

  const handleCheck = async () => {
    await editTaskAndStatus(id, !isDone);
    await updateTaskList();
    // editDone(id, !isDone);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await updateTaskList();
  };

  return (
    <li className={`${styles.card}`}>
      <div className={`${styles.task}`}>
        {isEditable ? (
          <form className={`${styles.editform}`} onSubmit={handleEditTask}>
            <input
              className={`${styles.editform__input}`}
              defaultValue={title}
              name="title"
            />
            <div className={`${styles.editform__control}`}>
              <IconButton icon="check" />
              <IconButton icon="cancel" onClick={handleCancel} />
            </div>
          </form>
        ) : (
          <div className={`${styles.task__title}`}>
            <input
              className={`${styles.task__checkbox}`}
              type="checkbox"
              checked={isDone}
              onChange={handleCheck}
            />
            {isDone ? (
              <p className={`${styles.task__text}`}>
                <s>{title}</s>
              </p>
            ) : (
              <p className={`${styles.task__text}`}>{title}</p>
            )}
          </div>
        )}
        <div className={`${styles.task__control}`}>
          {!isEditable && (
            <>
              <IconButton
                icon="pencil"
                label="edit task button"
                onClick={() => setEditable(true)}
              >
                {/* Edit */}
              </IconButton>
              <IconButton
                icon="trash"
                label="delete task button"
                onClick={() => handleDeleteTask(id)}
              >
                {/* Delete */}
              </IconButton>
            </>
          )}
        </div>
      </div>
    </li>
  );
};
