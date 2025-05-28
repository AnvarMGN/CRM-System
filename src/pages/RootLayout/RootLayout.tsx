import { Outlet } from "react-router-dom";
import { MenuNavigation } from "../../components/MenuNavigation/MenuNavigation";
import styles from "./RootLayout.module.scss";

export const RootLayout = () => {
  return (
    <div className={`${styles.root_container}`}>
      <div>
        <MenuNavigation />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
