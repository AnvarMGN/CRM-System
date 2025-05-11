// import { Button } from '../Button';

import { editDone, editTask } from "../../api/Api";

export const TaskTitle = ({
  task,
  isEditable,
  setIsEditable,
  updateTaskList,
}) => {
  // console.log(task.id);

  const { id, title, isDone } = task;
  // console.log(id, title, isDone);

  const handleEditTask = async (evt) => {
    evt.preventDefault();

    if (evt.target.title.value.length < 2) {
      return;
    } else if (evt.target.title.value.length > 64) {
      return;
    }

    await editTask(id, evt.target.title.value);
    await updateTaskList();
    // editTask(task.id, evt.target.title.value);
    setIsEditable(false);
  };

  const handleCancel = (evt) => {
    evt.preventDefault();
    setIsEditable(false);
  };

  const handleCheck = async () => {
    await editDone(id, !isDone);
    await updateTaskList();
    // editDone(id, !isDone);
  };

  if (isEditable) {
    return (
      <header>
        <form className="editform" onSubmit={handleEditTask}>
          <textarea
            className="editform__textarea"
            defaultValue={title}
            name="title"
          />
          <ul className="editform__control">
            <li>
              <button className="approval">Save</button>
            </li>
            <li>
              <button className="cancellation" onClick={handleCancel}>
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
  }

  return (
    <header className="task__title">
      <label>
        <input
          className="task__checkbox"
          type="checkbox"
          checked={isDone}
          onChange={handleCheck}
        />
      </label>
      {isDone ? (
        <s>
          <p className="task__text">{title}</p>
        </s>
      ) : (
        <p className="task__text">{title}</p>
      )}
    </header>
  );
};
