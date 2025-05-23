import { Button, Form, Input } from "antd";
import { addTask } from "../../../api/Api";

interface TaskAddAntdTypes {
  currentStatus: string;
  updateTaskList: (status: string) => void;
}

export const TaskAddAntd: React.FC<TaskAddAntdTypes> = ({
  currentStatus,
  updateTaskList,
}) => {
  
  const [form] = Form.useForm();

  const handleAddTask = async (value: { title: string }) => {
    await addTask(value.title);
    await updateTaskList(currentStatus);
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        layout="inline"
        onFinish={handleAddTask}
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Введите более 2 символов." },
            { min: 2, message: "Введите более 2 символов."},
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
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
