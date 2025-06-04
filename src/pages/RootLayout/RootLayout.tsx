import { Outlet } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";
import styles from "./RootLayout.module.scss";
import { Layout } from "antd";

const { Sider, Content } = Layout;

export const RootLayout = () => {
  return (
    <Layout className={styles.root_container}>
      <Sider className={styles.sider}>
        <MenuNavigation />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
