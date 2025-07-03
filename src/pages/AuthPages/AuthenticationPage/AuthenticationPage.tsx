import styles from "./AuthenticationPage.module.scss";
import axios from "axios";
import { openNotification } from "../../../notifications/notifications";
import { type FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AuthData } from "../../../types/auth";
import type { AppDispatch } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { authActions } from "../../../store/auth-slice";
import { userAuthenticationAction } from "../../../store/auth-actions";

const minLoginlength = 2;
const maxLoginlength = 60;

const minPasswordlength = 6;
const maxPasswordlength = 60;

interface FieldType {
  login?: string;
  password?: string;
  remember?: string;
}

const { Link, Title, Text } = Typography;

export const AuthenticationPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const handleAuthError = (
    notificatonDescription: string,
    error: Error,
    dispatch: AppDispatch
  ) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
    dispatch(authActions.isAuthorizedFalse());
  };

  useEffect(() => {
    if (isAuthorized) {
      openNotification("Уведомление", "Пользователь успешно авторизовался.");
      navigate("/crm/todo", { replace: true });
    }
  }, [isAuthorized, navigate]);

  const onFinish: FormProps<AuthData>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const userAuthData: AuthData = {
        login: values.login,
        password: values.password,
      };
      await dispatch(userAuthenticationAction(userAuthData));
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleAuthError(
                "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
                error,
                dispatch
              );
              break;
            case 401:
              handleAuthError("Не верные учётные данные.", error, dispatch);
              break;
            case 500:
              handleAuthError("`Ошибка на стороне сервера.", error, dispatch);
              break;
            default:
              handleAuthError("Неизвестная ошибка.", error, dispatch);
              break;
          }
        } else if (error.request) {
          console.log("Сервер не доступен.", error.message);
          openNotification("Ошибка", "Сервер не доступен.");
        } else {
          console.log("Неизвестная ошибка.", error.message);
          openNotification("Ошибка", "Неизвестная ошибка.");
        }
      } else {
        console.log("Неизвестная ошибка.", (error as Error).message);
        openNotification("Ошибка", "Неизвестная ошибка.");
      }
      console.log("AuthenticationPage: ", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <header className={styles.header}>
        <Title className={styles.title_header}>Login to your Account</Title>
        <Text className={styles.paragraph_header}>
          See what is going on with your business
        </Text>
      </header>

      <main>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            <Input className={styles.input_field} placeholder="Alex" />
          </Form.Item>

          <Text className={styles.input_label}>Password</Text>
          <Form.Item<FieldType>
            style={{ marginBottom: "0px" }}
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

          <Form.Item>
            <Button
              className={styles.button_login}
              type="primary"
              htmlType="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </main>

      <footer className={styles.footer}>
        <Text className={styles.footer_paragraph}>Not Registered Yet?</Text>
        <Link
          className={styles.footer_link}
          href="/auth/signup"
          // target="_blank"
        >
          Create an account
        </Link>
      </footer>
    </>
  );
};
