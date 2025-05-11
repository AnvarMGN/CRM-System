import { useState } from "react";
import { TaskTitle } from "./TaskTitle";
import { Button } from "../Button";
import { deleteTask } from "../../api/Api";

export const Task = ({ task, updateTaskList }) => {
  const { id } = task;
  const [isEditable, setEditable] = useState(false);
  // console.log(task.id);

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await updateTaskList();
  };

  return (
    <li className="card">
      <section className="task">
        <TaskTitle
          task={task}
          isEditable={isEditable}
          setIsEditable={setEditable}
          updateTaskList={updateTaskList}
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
                  onClick={() => handleDeleteTask(id)}
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
