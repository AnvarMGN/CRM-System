import { Link } from "react-router-dom";
// import styles from "./MenuNavigation.module.scss";
import { Menu, type MenuProps } from "antd";
import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

export const MenuNavigation = () => {
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <UnorderedListOutlined />,
      label: <Link to="/">Список задач</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/user">Профиль</Link>,
    },
  ];

  return (
    <div
    // className={styles.side_menu}
    >
      <h1 style={{ textAlign: "center" }}>CRM-SYSTEM</h1>
      <Menu mode="inline" theme="light" items={items} />
    </div>
  );
};
