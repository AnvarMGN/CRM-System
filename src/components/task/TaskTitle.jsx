// import { Button } from '../Button';

export const TaskTitle = ({ task, isEditable, setIsEditable, editTask, editDone }) => {
  // console.log(task.id);
  const { id, title, isDone } = task;
  // console.log(id, title, isDone);

  const handleEditTask = (evt) => {
    evt.preventDefault();
    editTask(task.id, evt.target.title.value);
    setIsEditable(false);
  };

  const handleCheck = () => {
    editDone(id, !isDone);
  };

  const handleCancel = (evt) => {
    evt.preventDefault();
    setIsEditable(false);
  }

  if (isEditable) {
    return (
      <header>
        <form className='editform' onSubmit={handleEditTask}>
          <textarea 
            className='editform__textarea' 
            defaultValue={title} 
            name="title" />
          <ul className='editform__control'>
            <li>
              <button className='approval'>
                Save
              </button>
            </li>
            <li>
              <button 
                className='cancellation' 
                onClick={handleCancel} 
              >
                Cancel
              </button>
            </li>
          </ul>
          {/* <Button 
            className='approval' 
            icon='check' 
            label='save task' 
          /> */}
        </form>
      </header>
    );
  };

  return (
    <header className='task__title'>
      <label>
        <input className='task__checkbox' type="checkbox" checked={isDone} onChange={handleCheck} />
      </label>
      {isDone ? (<s><p className='task__text'>{title}</p></s>
        ) : (
          <p className='task__text'>{title}</p>
        )}
    </header>
  );
};
