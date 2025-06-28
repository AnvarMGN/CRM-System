import styles from "./RootLayoutCRM.module.scss";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";

const { Sider, Content } = Layout;

export const RootLayoutCRM = () => {
  return (
    <>
      <Layout className={styles.root_container}>
        {/*Боковое меню */}
        <Sider className={styles.sider}>
          <MenuNavigation />
        </Sider>
        <Layout>
          <Content className={styles.content}>
            {/* <Outlet /> определяет место, где будут отображаться дочерние маршруты. */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
