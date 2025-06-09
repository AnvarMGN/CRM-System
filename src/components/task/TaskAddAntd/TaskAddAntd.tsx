import { Button, Form, Input } from "antd";
import styles from "./TaskAddAntd.module.scss";
import { addTask } from "../../../api/apiAxios";
import type { FilterStatus } from "../../../types/types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getTaskListAction } from "../../../store/todo-actions";
import { openNotification } from "../../../notifications/notifications";

export const TaskAddAntd = () => {
  const minTextlength = 2;
  const maxTextlength = 64;

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.todo);

  const handleAddTask = async (value: { title: FilterStatus }) => {
    try {
      setIsLoading(true);
      await addTask(value.title);
      dispatch(getTaskListAction(status));
      form.resetFields();
    } catch (error) {
      console.error("Ошибка при добавлении задачи: ", error);
      openNotification((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form className={styles.form_add} form={form} onFinish={handleAddTask}>
        <Form.Item
          name="title"
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
          <Input placeholder="Task To Be Done..." autoFocus showCount={true} />
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={isLoading}>
          Add
        </Button>
      </Form>
    </>
  );
};
