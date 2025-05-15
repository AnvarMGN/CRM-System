import { useState } from "react";
import { Button } from "../../UI/Button/Button/Button";
import { addTask } from "../../../api/Api";
import styles from "./TaskAdd.module.scss";

export const TaskAdd = ({ updateTaskList }) => {
  const [inputText, setInputText] = useState("");
  const [buttonActiv, setButtonActiv] = useState(true);

  const isValid = inputText.length === 64;

  const handleButtonActiv = (evt) => {
    // if (evt.target.value.length < 2) {
    //   setButtonActiv(true);
    // } else {
    //   setButtonActiv(false);
    // }
    setButtonActiv(evt.target.value.length < 2);
    setInputText(evt.target.value.slice(0, 64));
  };

  const handleAddTask = async (evt) => {
    evt.preventDefault();
    await addTask(evt.target.title.value);
    await updateTaskList();
    setInputText("");
    setButtonActiv(true);
  };

  return (
    <>
      <form className={`${styles.form}`} onSubmit={handleAddTask}>
        <input
          className={`${styles.input}`}
          value={inputText}
          onChange={handleButtonActiv}
          placeholder="Task To Be Done..."
          name="title"
          autoFocus
          // required
        />
        <Button icon="plus" label="add task button" disabled={buttonActiv}>
          Add
        </Button>
      </form>

      {isValid && (
        <span className={`${styles.alert}`}>Лимит вввода: 64 символа.</span>
      )}
    </>
  );
};
