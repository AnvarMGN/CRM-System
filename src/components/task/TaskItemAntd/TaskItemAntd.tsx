import { Card, Button, Checkbox, Form, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { TodoList } from "../../../types/types";
import { deleteTask, editTaskAndStatus } from "../../../api/Api";
import { useState } from "react";

interface TaskItemAntdTypes {
  currentStatus: string;
  updateTaskList: (status: string) => void;
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

  const handleEditTask = async (value: { title: string }) => {
    const editData = {
      isDone: isDone,
      title: value.title,
    };
    await editTaskAndStatus(id, editData);
    await updateTaskList(currentStatus);
    setEditable(false);
  };

  const handleCheckBox = async () => {
    const editData = {
      isDone: !isDone,
      title: title,
    };
    await editTaskAndStatus(id, editData);
    await updateTaskList(currentStatus);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    await updateTaskList(currentStatus);
  };

  return (
    <>
      {isEditable ? (
        <Card size="small">
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                onClick={() => setEditable(false)}
              />
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <Card size="small">
          <div>
            <Checkbox checked={isDone} onChange={handleCheckBox}></Checkbox>
            <p>{isDone ? <s>{title}</s> : title}</p>
          </div>
          <div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditable(true)}
            />
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteTask(id)}
            />
          </div>
        </Card>
      )}
    </>
  );
};
