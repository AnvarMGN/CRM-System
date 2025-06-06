import { Button, Form, Input, notification } from "antd";
import styles from "./TaskAddAntd.module.scss";
import { addTask } from "../../../api/apiAxios";
import type { FilterStatus } from "../../../types/types";
import { useState } from "react";
// import { useEffect } from "react";

interface TaskAddAntdTypes {
  currentStatus: FilterStatus;
  updateTaskList: (status: FilterStatus) => void;
}

export const TaskAddAntd: React.FC<TaskAddAntdTypes> = ({
  currentStatus,
  updateTaskList,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const minTextlength = 2;
  const maxTextlength = 64;

  const openNotification = (message: string) => {
    notification.error({
      message: "Ошибка",
      description: `Ошибка при добавлении задачи: ${message}`,
      duration: 3,
      placement: "bottomRight",
      showProgress: true,
    });
  };

  // useEffect(() => {
  //   console.log("Компонент формы добавления.");
  // }, []);

  const handleAddTask = async (value: { title: FilterStatus }) => {
    try {
      setIsLoading(true);
      await addTask(value.title);
      await updateTaskList(currentStatus);
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
