import { Link } from "react-router-dom";
import styles from "./MenuNavigation.module.scss";
import { Button, Menu, type MenuProps } from "antd";
import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../store/hook";
import { authActions } from "../../store/auth-slice";
import { tokens } from "../../util/auth";

type MenuItem = Required<MenuProps>["items"][number];

export const MenuNavigation = () => {
  const dispatch = useAppDispatch();

  const items: MenuItem[] = [
    {
      key: "1",
      icon: <UnorderedListOutlined />,
      label: <Link to="todo">Список задач</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="user">Личный кабинет</Link>,
    },
  ];

  const handleLogOut = () => {
    dispatch(authActions.isAuthorizedFalse());
    tokens.removeAccessToken();
    tokens.removeRefreshToken();
  };

  return (
    <div className={styles.side_menu}>
      <h1>CRM-SYSTEM</h1>
      <Menu mode="inline" theme="light" items={items} />
      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
};
