import styles from "./RootLayoutCRM.module.scss";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hook";
import { getUserProfileAction, 
  // updateTokenAction 
} from "../../store/auth-actions";

const { Sider, Content } = Layout;

export const RootLayoutCRM = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const thunkFunctions = async () => {
      try {
        // await dispatch(updateTokenAction());
        await dispatch(getUserProfileAction());
      } catch (error) {
        console.log(error);
      }
    };

    thunkFunctions();
  }, [dispatch]);

  return (
    <>
      <Layout className={styles.crm_container}>
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
