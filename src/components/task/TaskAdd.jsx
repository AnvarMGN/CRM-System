import { Button } from '../Button'

export const TaskAdd = ({ addTask }) => {

  const handleAddTask = (evt) => {
    evt.preventDefault();
    addTask(evt.target.title.value);
    evt.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleAddTask}>
        <input
          placeholder='Task To Be Done...'
          name='title'
        />
        <Button icon='plus' label='add task'>
          Add
        </Button>
      </form>
    </header>
  )
}

