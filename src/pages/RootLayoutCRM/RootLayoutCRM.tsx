import { Outlet, useNavigate } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";
import styles from "./RootLayoutCRM.module.scss";
import { Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useEffect, useState } from "react";
import { updateTokenAction } from "../../store/auth-actions";

const { Sider, Content } = Layout;

export const RootLayoutCRM = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { refreshTokenAuth } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const updateToken = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    updateToken();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!refreshTokenAuth) {
    navigate("/auth/signin", { replace: true });
  }

  return (
    <>
      {refreshTokenAuth && (
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
