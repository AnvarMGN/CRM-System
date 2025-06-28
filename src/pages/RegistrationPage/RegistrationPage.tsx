import { Button, Form, Input } from "antd";
import { type FormProps } from "antd";
import { type UserRegistration } from "../../types/types";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { userRegistrationAction } from "../../store/auth-actions";
import { useState } from "react";
import styles from "./RegistrationPage.module.scss";

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

export const RegistrationPage = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isRegistrated, isAuthorized } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const onFinish: FormProps<UserRegistration>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const newUser: UserRegistration = {
        email: values.email,
        login: values.login,
        password: values.password,
        phoneNumber: values.phoneNumber,
        username: values.username,
      };

      await dispatch(userRegistrationAction(newUser));
      form.resetFields();
      console.log("RegistrationPage isAuthorized: ", isAuthorized);
    } catch (error) {
      console.log("RegistrationPage", (error as Error).message);
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
        <img
          className={styles.icon_login}
          src="/login-page/img2-login.png"
          alt="icon-login"
        />
        <h1 className={styles.title_header}>Create a new Account</h1>
      </header>

      <main>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className={styles.input_label}>Username</p>
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



          <p className={styles.input_label}>Login</p>
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



          <p className={styles.input_label}>Password</p>
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



          <p className={styles.input_label}>Confirm password</p>
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



          <p className={styles.input_label}>Email</p>
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



          <p className={styles.input_label}>Telephone</p>
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
            <p className={styles.footer_paragraph}>
              Пройдите по{" "}
              <Link className={styles.footer_link} to="/auth/signin">
                ссылке
              </Link>{" "}
              для перехода на страницу авторизации.
            </p>
          ) : (
            <p className={styles.footer_paragraph}>
              Go back to the{" "}
              <Link className={styles.footer_link} to="/auth/signin">
                authorization page
              </Link>
              .
            </p>
          )}
        </footer>
      </>
    </>
  );
};
