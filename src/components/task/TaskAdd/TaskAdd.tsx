import { useState } from "react";
import { Button } from "../../UI/Button/Button/Button";
import { addTask } from "../../../api/Api";
import styles from "./TaskAdd.module.scss";
import type { FilterStatus } from "../../../types/types";

interface TaskAddTypes {
  currentStatus: FilterStatus;
  updateTaskList: (status: FilterStatus) => void;
}

export const TaskAdd: React.FC<TaskAddTypes> = ({
  currentStatus,
  updateTaskList,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [buttonActiv, setButtonActiv] = useState<boolean>(true);
  const [alert, setAlert] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

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

  const handleAddTask = async (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      evt.preventDefault();
      await addTask(inputValue);
      await updateTaskList(currentStatus);
      setInputValue("");
      setAlert(null);
      setButtonActiv(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={`${styles.form}`} onSubmit={handleAddTask}>
        <input
          className={`${styles.input}`}
          name="title"
          value={inputValue}
          onChange={changeInputValue}
          placeholder="Task To Be Done..."
          autoFocus
          minLength={2}
          maxLength={65}
          // required
        />
        <Button
          className="primary"
          icon="plus"
          label="add task button"
          disabled={buttonActiv || isLoading}
        >
          Add
        </Button>
      </form>

      {alert && <span className={`${styles.alert}`}>{alert}</span>}
    </>
  );
};
