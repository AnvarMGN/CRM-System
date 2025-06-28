import styles from "./AuthenticationPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { type FormProps } from "antd";
import type { AuthData } from "../../types/types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { userAuthenticationAction } from "../../store/auth-actions";

const minLoginlength = 2;
const maxLoginlength = 60;

const minPasswordlength = 6;
const maxPasswordlength = 60;

interface FieldType {
  login?: string;
  password?: string;
  remember?: string;
}

export const AuthenticationPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
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
        <img
          className={styles.icon_login}
          src="/login-page/img2-login.png"
          alt="icon-login"
        />
        <h1 className={styles.title_header}>Login to your Account</h1>
        <p className={styles.paragraph_header}>
          See what is going on with your business
        </p>
      </header>

      <Button className={styles.button_google}>
        <img
          className={styles.icon_google}
          src="/login-page/icon-google.png"
          alt="icon-google"
        />
        Continue with Google
      </Button>

      <div className={styles.link_block}>
        <a className={styles.link_google} href="#">
          <span className={styles.dash_dash}>-------------</span> or Sign in
          withEmail <span className={styles.dash_dash}>-------------</span>
        </a>
      </div>

      <main>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            <Input className={styles.input_field} placeholder="Alex" />
          </Form.Item>

          <p className={styles.input_label}>Password</p>
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

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <div className={styles.checkbox_block}>
              <Checkbox className={styles.checkbox_text}>Remember me</Checkbox>
              <a className={styles.forgot_link} href="#">
                Forgot Password?
              </a>
            </div>
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
        <p className={styles.footer_paragraph}>Not Registered Yet?</p>
        <Link className={styles.footer_link} to="/auth/signup">
          Create an account
        </Link>
      </footer>
    </>
  );
};
