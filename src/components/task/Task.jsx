import { useState } from 'react'
import { TaskTitle } from './TaskTitle';
import { Button } from '../Button';

export const Task = ({ task, editTask, deleteTask, editDone }) => {
  const [isEditable, setEditable] = useState(false);
  // console.log(task.id);
  return (
    <li style={{ display: "flex" }}>
      <TaskTitle
        task={task}
        isEditable={isEditable}
        setIsEditable={setEditable}
        editTask={editTask}
        editDone={editDone}
      />
      <ul style={{ display: "flex", listStyleType: "none" }}>
        {!isEditable && (
          <li>
            <Button
              icon="pencil"
              label="edit task button"
              onClick={() => setEditable(true)}
            >
              Edit
            </Button>
          </li>
        )}
        <li>
          <Button
            icon="trash"
            label="delete task button"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </Button>
        </li>
      </ul>
    </li>
  );
};
