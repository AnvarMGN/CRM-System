import { Link } from "react-router-dom";
import styles from "./MenuNavigation.module.scss";
import { Button, Menu, type MenuProps } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authActions } from "../../store/auth-slice";
import { tokenManager } from "../../util/auth";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const userItems: MenuItem[] = [
  {
    key: "1",
    icon: <UnorderedListOutlined />,
    label: <Link to="/crm/todo">Список задач</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link to="/crm/user">Личный кабинет</Link>,
  },
];

const adminAndModeratorItems: MenuItem[] = [
  ...userItems,
  {
    key: "3",
    icon: <IdcardOutlined />,
    label: <Link to="/admin/users">Пользователи</Link>,
  },
];

export const MenuNavigation = () => {
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.auth.user);
  const isAdminOrModerator = roles.includes("ADMIN") || roles.includes('MODERATOR');
  const [items, setItems] = useState<MenuItem[]>(userItems);

  useEffect(() => {
    setItems(isAdminOrModerator ? adminAndModeratorItems : userItems)
  }, [isAdminOrModerator]);

  const handleLogOut = () => {
    dispatch(authActions.isAuthorizedFalse());
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
  };

  return (
    <div className={styles.side_menu}>
      <h1>CRM-SYSTEM</h1>
      <Menu mode="inline" theme="light" items={items} />
      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
};
