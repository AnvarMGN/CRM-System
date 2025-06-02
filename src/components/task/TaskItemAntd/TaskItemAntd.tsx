import { Card, Button, Checkbox, Form, Input, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from "./TaskItemAntd.module.scss";
import type { FilterStatus, TodoList } from "../../../types/types";
import { useState } from "react";
import { deleteTask, editTitleOrStatus } from "../../../api/apiAxios";
// import { useEffect } from "react";

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
  const minTextlength = 2;
  const maxTextlength = 64;

  // useEffect(() => {
  //   console.log("Компонент списка задач.");
  // }, []);

  const handleEditTask = async (value: { title: string }) => {
    // console.log("Редактирование");
    try {
      setIsLoading(true);
      const editData = {
        isDone: isDone,
        title: value.title,
      };
      await editTitleOrStatus(id, editData);
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
      await editTitleOrStatus(id, editData);
      await updateTaskList(currentStatus);
    } catch (error) {
      console.error("Ошибка при изменении статуса задачи: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setIsLoading(true);
      await deleteTask(id);
      await updateTaskList(currentStatus);
    } catch (error) {
      console.error("Ошибка при удалении задачи: ", error);
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
                { required: true, message: "Введите более 2 символов." },
                { min: minTextlength, message: "Введите более 2 символов." },
                { max: maxTextlength, message: "Лимит ввода 64 символа." },
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
