import { Outlet } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation";
import styles from "./RootLayout.module.scss";

export const RootLayout = () => {
  return (
    <>
      <MenuNavigation />
      <div className={`${styles.container}`}>
        <Outlet />
      </div>
    </>
  );
};
