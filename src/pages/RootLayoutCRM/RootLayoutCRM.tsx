import styles from "./RootLayoutCRM.module.scss";
import { Splitter, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hook";
import {
  getUserProfileAction,
  // updateTokenAction
} from "../../store/auth-actions";

const { Text } = Typography;

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
      <Splitter
        className={styles.crm_container}
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          height: "79px",
          borderBottom: "1px solid rgb(228, 228, 228)",
        }}
      >
        <Splitter.Panel
          style={{ backgroundColor: "rgb(249, 249, 249)" }}
          defaultSize="15%"
          min="15%"
          collapsible
        >
          <div className={styles.icon_block}>
            <img
              className={styles.title_icon}
              src="/crm-page/icon-crm.png"
              alt="icon-crm"
            />
            <Text className={styles.title_menu}>Venture</Text>
          </div>
        </Splitter.Panel>

        <Splitter.Panel collapsible>
          <div className={styles.block_title_crm}>
            <Text className={styles.title_crm}>Пользователи</Text>
          </div>
        </Splitter.Panel>
      </Splitter>

      <Splitter
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", height: "100vh" }}
      >
        <Splitter.Panel
          style={{ backgroundColor: "rgb(249, 249, 249)" }}
          defaultSize="15%"
          min="15%"
          collapsible
        >
          <MenuNavigation />
        </Splitter.Panel>

        <Splitter.Panel style={{ overflowY: "auto" }} collapsible>
          <Outlet />
        </Splitter.Panel>
      </Splitter>
    </>
  );
};
