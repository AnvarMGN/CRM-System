import { Button, Form, Input } from "antd";
import { addTodoTask } from "../../../api/apiAxios";
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

  // useEffect(() => {
  //   console.log("Компонент формы добавления.");
  // }, []);

  const handleAddTask = async (value: { title: FilterStatus }) => {
    try {
      setIsLoading(true);
      await addTodoTask(value.title);
      await updateTaskList(currentStatus);
      form.resetFields();
    } catch (error) {
      console.error("Ошибка при добавлении задачи: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form form={form} layout="inline" onFinish={handleAddTask}>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Введите более 2 символов." },
            { min: 2, message: "Введите более 2 символов." },
            { max: 64, message: "Лимит ввода 64 символа." },
          ]}
        >
          <Input
            placeholder="Task To Be Done..."
            autoFocus
            showCount={true}
            style={{
              minWidth: 300,
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
