import { Link } from "react-router-dom";
import styles from "./MenuNavigation.module.scss";
import { Button, Divider, Menu, type MenuProps } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authActions } from "../../store/auth-slice";
import { tokenManager } from "../../util/auth";
import { useEffect, useState } from "react";
import { selectIsAdminOrModerator } from '../../store/selectors';

type MenuItem = Required<MenuProps>["items"][number];

const userItems: MenuItem[] = [
  {
    key: "1",
    icon: <UnorderedListOutlined />,
    label: <Link to="/crm/todo">Список задач</Link>,
  },
  {
    key: "2",
    icon: <IdcardOutlined />,
    label: <Link to="/crm/user">Личный кабинет</Link>,
  },
];

const adminAndModeratorItems: MenuItem[] = [
  ...userItems,
  {
    key: "3",
    icon: <UserOutlined />,
    label: <Link to="/admin/users">Пользователи</Link>,
  },
];

export const MenuNavigation = () => {
  const dispatch = useAppDispatch();
  const isAdminOrModerator = useAppSelector(selectIsAdminOrModerator);
  const [items, setItems] = useState<MenuItem[]>(userItems);

  useEffect(() => {
    setItems(isAdminOrModerator ? adminAndModeratorItems : userItems);
  }, [isAdminOrModerator]);

  const handleLogOut = () => {
    dispatch(authActions.isAuthorizedFalse());
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
  };

  return (
    <div className={styles.side_menu}>
      <Menu
        style={{ backgroundColor: "rgb(249, 249, 249)" }}
        mode="vertical"
        theme="light"
        items={items}
      />
      <Divider />
      <div className={styles.logout_button}>
        <Button onClick={handleLogOut}>Logout</Button>
      </div>
      <Divider />
    </div>
  );
};
