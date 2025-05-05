import { Button } from '../Button';

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

  if (isEditable) {
    return (
      <header>
        <form onSubmit={handleEditTask}>
          <input defaultValue={title} name="title" />
          <Button icon="check" label="edit task" />
        </form>
      </header>
    );
  };

  return (
    <header>
      <label>
        <input type="checkbox" checked={isDone} onChange={handleCheck} />
        {isDone ? (<s><p>{title}</p></s>
        ) : (
          <p>{title}</p>
        )}
      </label>
    </header>
  );
};
