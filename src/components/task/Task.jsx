import { useState } from 'react'
import { TaskTitle } from './TaskTitle';
import { Button } from '../Button';

export const Task = ({ task, editTask, deleteTask, editDone }) => {
  const [isEditable, setEditable] = useState(false);
  // console.log(task.id);
  return (
    <li className="card">
      <section className="task">
        <TaskTitle
          task={task}
          isEditable={isEditable}
          setIsEditable={setEditable}
          editTask={editTask}
          editDone={editDone}
        />
        <ul className="task__control">
          {!isEditable && (
            <>
              <li>
                <Button
                  className="edit"
                  icon="pencil"
                  label="edit task button"
                  onClick={() => setEditable(true)}
                >
                  {/* Edit */}
                </Button>
              </li>
              <li>
                <Button
                  className="removal"
                  icon="trash"
                  label="delete task button"
                  onClick={() => deleteTask(task.id)}
                >
                  {/* Delete */}
                </Button>
              </li>
            </>
          )}
        </ul>
      </section>
    </li>
  );
};
