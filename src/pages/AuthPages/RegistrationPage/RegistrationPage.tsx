import styles from "./RegistrationPage.module.scss";
import axios from "axios";
import { openNotification } from "../../../notifications/notifications";
import { type FormProps } from "antd";
import { type UserRegistration } from "../../../types/auth";
import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { userRegistrationAction } from "../../../store/auth-actions";

interface FieldType {
  username?: string;
  login?: string;
  password?: string;
  password2?: string;
  email?: string;
  phoneNumber?: string;
}

const minUserNamelength = 1;
const maxUserNamelength = 60;

const minLoginlength = 2;
const maxLoginlength = 60;

const minPasswordlength = 6;
const maxPasswordlength = 60;

const phoneRegex = "^\\+7[0-9]{10}$";

const { Link, Title, Text } = Typography;

export const RegistrationPage = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isRegistrated, isAuthorized } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const handleRegError = (notificatonDescription: string, error: Error) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
  };

  const onFinish: FormProps<UserRegistration>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const newUser = {
        email: values.email,
        login: values.login,
        password: values.password,
        phoneNumber: values.phoneNumber,
        username: values.username,
      };

      await dispatch(userRegistrationAction(newUser));
      form.resetFields();
      if (isRegistrated) {
        openNotification(
          "Уведомление",
          "Пользователь успешно зарегистрирован."
        );
      }
      console.log("RegistrationPage isAuthorized: ", isAuthorized);
    } catch (error) {
      const errorStatusLabels = {
        400: "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
        409: "Пользователь уже зарегистрирован.",
        500: "Внутренняя ошибка сервера.",
      };
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleRegError(
                errorStatusLabels[error.response.status],
                error
              );
              break;
            case 409:
              handleRegError(errorStatusLabels[error.response.status], error);
              break;
            case 500:
              handleRegError(errorStatusLabels[error.response.status], error);
              break;
            default:
              handleRegError("Неизвестная ошибка.", error);
              break;
          }
        } else if (error.request) {
          handleRegError("Сервер не доступен.", error);
        } else {
          handleRegError("Неизвестная ошибка.", error);
        }
      } else {
        handleRegError("Неизвестная ошибка.", error as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<UserRegistration>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <header className={styles.header}>
        <Title className={styles.title_header}> Create a new Account </Title>
      </header>

      <main>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Text className={styles.input_label}>Username</Text>
          <Form.Item<FieldType>
            name="username"
            rules={[
              { required: true, message: "Пожалуйста, введите ваше имя." },
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
            <Input className={styles.input_field} placeholder="John" />
          </Form.Item>

          <Text className={styles.input_label}>Login</Text>
          <Form.Item<FieldType>
            name="login"
            rules={[
              { required: true, message: "Пожалуйста, введите логин." },
              {
                min: minLoginlength,
                message: `Введите более ${minLoginlength} символов.`,
              },
              {
                max: maxLoginlength,
                message: `Лимит ввода ${maxLoginlength} символов.`,
              },
            ]}
          >
            <Input className={styles.input_field} placeholder="Johnson" />
          </Form.Item>

          <Text className={styles.input_label}>Password</Text>
          <Form.Item<FieldType>
            name="password"
            rules={[
              { required: true, message: " Пожалуйста, введите пароль." },
              {
                min: minPasswordlength,
                message: `Введите более ${minPasswordlength} символов.`,
              },
              {
                max: maxPasswordlength,
                message: `Лимит ввода ${maxPasswordlength} символов.`,
              },
            ]}
          >
            <Input.Password
              className={styles.input_field}
              placeholder="**********"
            />
          </Form.Item>

          <Text className={styles.input_label}>Password confirm</Text>
          <Form.Item<FieldType>
            name="password2"
            dependencies={["password2"]}
            rules={[
              { required: true, message: " Пожалуйста, введите пароль." },
              {
                min: minPasswordlength,
                message: `Введите более ${minPasswordlength} символов.`,
              },
              {
                max: maxPasswordlength,
                message: `Лимит ввода ${maxPasswordlength} символов.`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не соответствуют!"));
                },
              }),
            ]}
          >
            <Input.Password
              className={styles.input_field}
              placeholder="**********"
            />
          </Form.Item>

          <Text className={styles.input_label}>Email</Text>
          <Form.Item<FieldType>
            name="email"
            rules={[
              { type: "email" },
              {
                required: true,
                message: " Пожалуйста, введите вашу почту.",
              },
            ]}
          >
            <Input
              className={styles.input_field}
              placeholder="email@google.com"
            />
          </Form.Item>

          <Text className={styles.input_label}>Telephone</Text>
          <Form.Item<FieldType>
            name="phoneNumber"
            rules={[
              { required: false },
              {
                pattern: new RegExp(phoneRegex),
                message: "Введите в соответсвии шаблону: +79998887766",
              },
              // { max: 10 },
            ]}
          >
            <Input className={styles.input_field} placeholder="+79998887766" />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.button_login}
              type="primary"
              htmlType="submit"
              disabled={isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </main>

      <>
        <footer className={styles.footer}>
          {isRegistrated ? (
            <Text className={styles.footer_paragraph}>
              Пройдите по{" "}
              <Link className={styles.footer_link} href="/auth/signin">
                ссылке
              </Link>{" "}
              для перехода на страницу авторизации.
            </Text>
          ) : (
            <Text className={styles.footer_paragraph}>
              Go back to the{" "}
              <Link className={styles.footer_link} href="/auth/signin">
                authorization page
              </Link>
              .
            </Text>
          )}
        </footer>
      </>
    </>
  );
};
