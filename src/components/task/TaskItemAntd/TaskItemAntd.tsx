import { Card, Button, Checkbox, Form, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { FilterStatus, TodoList } from "../../../types/types";
import { useState } from "react";
import styles from "./TaskItemAntd.module.scss";
import { deleteTodoTask, editTodoTitleOrStatus } from "../../../api/apiAxios";

interface TaskItemAntdTypes {
  currentStatus: FilterStatus;
  updateTaskList: (status: FilterStatus) => void;
  task: TodoList;
}

export const TaskItemAntd: React.FC<TaskItemAntdTypes> = ({
  currentStatus,
  updateTaskList,
  task,
}) => {
  const { id, title, isDone } = task;
  const [isEditable, setEditable] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditTask = async (value: { title: string }) => {
    try {
      setIsLoading(true);
      const editData = {
        isDone: isDone,
        title: value.title,
      };
      await editTodoTitleOrStatus(id, editData);
      await updateTaskList(currentStatus);
      setEditable(false);
    } catch (error) {
      console.error("Ошибка при редактировании задачи: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckBox = async () => {
    try {
      setIsLoading(true);
      const editData = {
        isDone: !isDone,
        title: title,
      };
      await editTodoTitleOrStatus(id, editData);
      await updateTaskList(currentStatus);
    } catch (error) {
      console.error("Ошибка при изменении статуса задачи: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteTodoTask(id);
      await updateTaskList(currentStatus);
    } catch (error) {
      console.error("Ошибка при удалении задачи: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isEditable ? (
        <Card size="small">
          <div>
            <Form form={form} layout="inline" onFinish={handleEditTask}>
              <Form.Item
                name="title"
                initialValue={title}
                rules={[
                  { required: true, message: "Введите более 2 символов." },
                  { min: 2, message: "Введите более 2 символов." },
                  { max: 64, message: "Лимит ввода 64 символа." },
                ]}
              >
                <Input autoFocus showCount={true} style={{ minWidth: 250 }} />
              </Form.Item>

              <div className={`${styles.form_control}`}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    disabled={isLoading}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => setEditable(false)}
                    disabled={isLoading}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Card>
      ) : (
        <Card size="small">
          <div className={`${styles.card}`}>
            <div className={`${styles.title}`}>
              <Checkbox
                checked={isDone}
                onChange={handleCheckBox}
                disabled={isLoading}
              ></Checkbox>
              <p className={`${styles.text}`}>
                {isDone ? <s>{title}</s> : title}
              </p>
            </div>
            <div className={`${styles.control}`}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setEditable(true)}
                disabled={isLoading}
              />
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteTask(id)}
                disabled={isLoading}
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
