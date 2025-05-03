import { useState } from 'react';
import { Button } from '../Button'

export const TaskAdd = ({ addTask }) => {
  const [inputText, setInputText] = useState('');
  const [buttonActiv, setButtonActiv] = useState(false);

  const isValid = inputText.length === 64;

  const onChange = (evt) => {
    if (evt.target.value < 2) {
      setButtonActiv(true);
    } else {
      setButtonActiv(false);
    }

    setInputText(evt.target.value
      .slice(0, 64));
  };

  const handleAddTask = (evt) => {
    evt.preventDefault();
    addTask(evt.target.title.value);
    evt.target.reset();
  };

  return (
    <header>
      <form style={{ display: 'flex' }} onSubmit={handleAddTask}>
        <input
          value={inputText}
          onChange={onChange}
          placeholder='Task To Be Done...'
          name='title'
        // required
        />
        <Button disabled={buttonActiv} icon='plus' label='add task'>
          Add
        </Button>
      </form>
      {isValid && (<span>Ограничение на вввод - не более 64 символов</span>)}
    </header>
  )
}

