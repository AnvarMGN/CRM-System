import { useState } from "react";
import { Button } from "../Button";
import { addTask } from '../../api/Api';

export const TaskAdd = ({updateTaskList}) => {
  const [inputText, setInputText] = useState("");
  const [buttonActiv, setButtonActiv] = useState(false);

  const isValid = inputText.length === 64;

  const handleButtonActiv = (evt) => {
    if (evt.target.value.length < 2) {
      setButtonActiv(true);
    } else {
      setButtonActiv(false);
    }
    setInputText(evt.target.value.slice(0, 64));
  };

  const handleAddTask = async (evt) => {
    evt.preventDefault();
    await addTask(evt.target.title.value);
    await updateTaskList();
    // addTask(evt.target.title.value);
    setInputText("");
  };

  return (
    <>
      <li>
        <header>
          <form className="header__addform" onSubmit={handleAddTask}>
            <input
              className="header__addinput"
              value={inputText}
              onChange={handleButtonActiv}
              placeholder="Task To Be Done..."
              name="title"
              autoFocus
              required
            />
            <Button
              className="header__addbutton"
              disabled={buttonActiv}
              icon="plus"
              label="add task button"
            >
              Add
            </Button>
          </form>
        </header>
      </li>
      {isValid && (
        <span className="alertmessage">Лимит вввода: 64 символа.</span>
      )}
    </>
  );
};
