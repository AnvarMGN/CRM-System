import { Outlet, useNavigate } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";
import styles from "./RootLayoutCRM.module.scss";
import { Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useEffect } from "react";
import { updateTokenAction } from "../../store/auth-actions";

const { Sider, Content } = Layout;

export const RootLayoutCRM = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isExpired } = useAppSelector((state) => state.auth);

   useEffect(() => {
    dispatch(updateTokenAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("RootLayoutCRM isExpired: ", isExpired);
    if (isExpired) {
      navigate("/auth/signin", { replace: true });
    }
  }, [isExpired, navigate]);

  return (
    <>
      {!isExpired && (
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
      )}
    </>
  );
};
