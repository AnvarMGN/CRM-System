import React, { useState } from "react";
import { Button } from "../../UI/Button/Button/Button";
import { addTask } from "../../../api/Api";
import styles from "./TaskAdd.module.scss";

interface TaskAddTypes {
  currentStatus: string;
  updateTaskList: (status: string) => void;
}

export const TaskAdd: React.FC<TaskAddTypes> = ({ currentStatus, updateTaskList }) => {
  const [inputText, setInputText] = useState("");
  const [buttonActiv, setButtonActiv] = useState(true);

  const isValid = inputText.length === 64;

  const handleButtonActiv = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // if (evt.target.value.length < 2) {
    //   setButtonActiv(true);
    // } else {
    //   setButtonActiv(false);
    // }
    const text = evt.target.value.slice(0, 64);
    setButtonActiv(text.length < 2);
    setInputText(text);
  };

  const handleAddTask = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await addTask(inputText);
    await updateTaskList(currentStatus);
    setInputText("");
    setButtonActiv(true);
  };

  return (
    <>
      <form className={`${styles.form}`} onSubmit={handleAddTask}>
        <input
          className={`${styles.input}`}
          name="title"
          value={inputText}
          onChange={handleButtonActiv}
          placeholder="Task To Be Done..."
          autoFocus
          // required
        />
        <Button
          className="primary"
          icon="plus"
          label="add task button"
          disabled={buttonActiv}
        >
          Add
        </Button>
      </form>

      {isValid && (
        <span className={`${styles.alert}`}>Лимит вввода: 64 символа.</span>
      )}
    </>
  );
};
