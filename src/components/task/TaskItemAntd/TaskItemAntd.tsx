import "@ant-design/v5-patch-for-react-19";
import { Card, Button, Checkbox, Form, Input, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from "./TaskItemAntd.module.scss";
import type { TodoList } from "../../../types/types";
import { useState } from "react";
import { deleteTask, editTitleOrStatus } from "../../../api/apiAxios";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getTaskListAction } from "../../../store/todo-actions";
import { openNotification } from "../../../notifications/notifications";

interface TaskItemAntdTypes {
  task: TodoList;
}

export const TaskItemAntd: React.FC<TaskItemAntdTypes> = ({ task }) => {
  const minTextlength = 2;
  const maxTextlength = 64;
  const [form] = Form.useForm();
  const [isEditable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id, title, isDone } = task;
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.todo);

  const handleEditTask = async (value: { title: string }) => {
    try {
      setIsLoading(true);
      const editData = {
        isDone: isDone,
        title: value.title,
      };
      await editTitleOrStatus(id, editData);
      dispatch(getTaskListAction(status));
      setEditable(false);
    } catch (error) {
      console.error(
        `Ошибка при редактировании задачи: ${(error as Error).message}`
      );
      openNotification("Ошибка!", "Ошибка при редактировании задачи.");
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
      await editTitleOrStatus(id, editData);
      dispatch(getTaskListAction(status));
    } catch (error) {
      console.error(
        `Ошибка при изменении статуса задачи: ${(error as Error).message}`
      );
      openNotification("Ошибка!", "Ошибка при изменении статуса задачи.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setIsLoading(true);
      await deleteTask(id);
      dispatch(getTaskListAction(status));
    } catch (error) {
      console.error(`Ошибка при удалении задачи ${(error as Error).message}`);
      openNotification("Ошибка", "Ошибка при удалении задачи.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditable(false);
    form.resetFields();
  };

  return (
    <>
      {isEditable ? (
        <Card size="small">
          <Form
            form={form}
            onFinish={handleEditTask}
            layout="inline"
            className={styles.edit_card}
          >
            <Form.Item
              name="title"
              initialValue={title}
              rules={[
                {
                  required: true,
                  message: `Введите более ${minTextlength} символов.`,
                },
                {
                  min: minTextlength,
                  message: `Введите более ${minTextlength} символов.`,
                },
                {
                  max: maxTextlength,
                  message: `Лимит ввода ${maxTextlength} символа.`,
                },
              ]}
            >
              <Input autoFocus showCount={true} style={{ minWidth: 250 }} />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              disabled={isLoading}
            />

            <Button
              type="primary"
              danger
              icon={<CloseOutlined />}
              onClick={handleCancel}
              disabled={isLoading}
            />
          </Form>
        </Card>
      ) : (
        <Card size="small">
          <div className={styles.card}>
            <Checkbox
              checked={isDone}
              onChange={handleCheckBox}
              disabled={isLoading}
            ></Checkbox>

            <p className={styles.text}>{isDone ? <s>{title}</s> : title}</p>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditable(true)}
              disabled={isLoading}
            />

            <Popconfirm
              title="Вы уверены, что хотите удалить задачу?"
              onConfirm={handleDeleteTask}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                disabled={isLoading}
              />
            </Popconfirm>
          </div>
        </Card>
      )}
    </>
  );
};
