import { useState } from 'react';
import { Button } from '../Button';

export const TaskAdd = ({ addTask }) => {
  const [inputText, setInputText] = useState('');
  const [buttonActiv, setButtonActiv] = useState(false);

  const isValid = inputText.length === 64;

  const handleButtonActiv = (evt) => {
    if ((evt.target.value).length < 2) {
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
    setInputText('');
  };

  return (
    <header>
      <form style={{ display: 'flex' }} onSubmit={handleAddTask}>
        <input
          value={inputText}
          onChange={handleButtonActiv}
          placeholder='Task To Be Done...'
          name='title'
        // required
        />
        <Button disabled={buttonActiv} icon='plus' label='add task'>
          Add
        </Button>
      </form>
      {isValid && (<span>Лимит вввода: 64 символа.</span>)}
    </header>
  )
}

