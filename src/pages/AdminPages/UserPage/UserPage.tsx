import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  editUserAction,
  getUserAction,
  usersActions,
} from "../../../store/users-slice";
import { updateTokenAction } from "../../../store/auth-actions";
import { Button, Card, Form, Input, Spin, Typography } from "antd";
import { type FormProps } from "antd";
import type { CombineData, UserRequest } from "../../../types/users";
import { openNotification } from "../../../notifications/notifications";
import axios from "axios";

interface FieldType {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

const minUserNamelength = 1;
const maxUserNamelength = 60;
const phoneRegex = "^\\+7[0-9]{10}$";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const { Text } = Typography;

export const UserPage = () => {
  const [form] = Form.useForm();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [isEditable, setEditable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user, isEditedUser, loading, error } = useAppSelector(
    (state) => state.users
  );

  const handleUpdateError = (notificatonDescription: string, error: Error) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
  };

  const handelEditUser: FormProps<UserRequest>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const combinedData: CombineData = {
        id: Number(userId),
        userData: {
          username: values.username,
          email: values.email,
          phoneNumber: values.phoneNumber,
        },
      };
      await dispatch(updateTokenAction());
      await dispatch(editUserAction(combinedData));
      await dispatch(getUserAction(Number(userId)));
    } catch (error) {
      const errorStatusLabels = {
        400: "Произошла ошибка при обработке данных.",
        401: "Проверьте введенные данные или войдите снова.",
        500: "Внутренняя ошибка сервера.",
      };
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 401:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 500:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            default:
              handleUpdateError("Неизвестная ошибка", error);
              break;
          }
        } else if (error.request) {
          handleUpdateError("Сервер не доступен.", error);
        } else {
          handleUpdateError("Неизвестная ошибка.", error);
        }
      } else {
        handleUpdateError("Неизвестная ошибка.", error as Error);
      }
    } finally {
      form.resetFields();
      setEditable(false);
      dispatch(usersActions.setEditUser(false));
    }
  };

  const onFinishFailed: FormProps<UserRequest>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setEditable(false);
    form.resetFields();
  };

  useEffect(() => {
    const thunkFunction = async () => {
      try {
        await dispatch(updateTokenAction());
        await dispatch(getUserAction(Number(userId)));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorStatusLabels = {
            400: "Произошла ошибка при обработке данных.",
            401: "Проверьте введенные данные или войдите снова.",
            500: "Внутренняя ошибка сервера.",
          };
          if (error.response) {
            switch (error.response.status) {
              case 400:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 401:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 500:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              default:
                handleUpdateError("Неизвестная ошибка", error);
                break;
            }
          } else if (error.request) {
            handleUpdateError("Сервер не доступен.", error);
          } else {
            handleUpdateError("Неизвестная ошибка.", error);
          }
        } else {
          handleUpdateError("Неизвестная ошибка.", error as Error);
        }
      }
    };
    thunkFunction();
  }, [dispatch, userId]);

  useEffect(() => {
    if (isEditedUser) {
      openNotification("Уведомление", "Данные успешно обновлены.");
    }
    if (error) {
      openNotification("Ошибка", error);
    }
  }, [isEditedUser, error]);

  if (loading === "pending") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>
    );
  }

  return (
    <>
      {isEditable ? (
        <>
          <Card>
            <Text>UserPage</Text>
            <Form
              form={form}
              onFinish={handelEditUser}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                name="username"
                initialValue={user.username}
                rules={[
                  {
                    required: true,
                    message: "Отредактируйте или введите новое имя.",
                  },
                  {
                    min: minUserNamelength,
                    message: `Введите более ${minUserNamelength} символов.`,
                  },
                  {
                    max: maxUserNamelength,
                    message: `Лимит ввода ${maxUserNamelength} символов.`,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                name="email"
                initialValue={user.email}
                rules={[
                  { type: "email" },
                  {
                    required: true,
                    message: "Отредактируйте или введите новый email.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                name="phoneNumber"
                initialValue={user.phoneNumber}
                rules={[
                  { required: false },
                  {
                    pattern: new RegExp(phoneRegex),
                    message:
                      "Отредактируйте или введите новый телефон: +79998887766",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={handleCancel}>Отмена</Button>
              </Form.Item>
            </Form>
          </Card>
        </>
      ) : (
        <Card>
          <Text>UserPage</Text>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.phoneNumber}</p>
          <Button onClick={() => setEditable(true)}>Редактировать</Button>
          <Button onClick={() => navigate("/admin/users", { replace: true })}>
            Вернуться
          </Button>
        </Card>
      )}
    </>
  );
};
