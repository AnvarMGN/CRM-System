import { Outlet } from "react-router-dom";
import styles from "./RootLayoutAuth.module.scss";

export const RootLayoutAuth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_block}>
        {/* <img
          className={styles.image_login}
          src="/login-page/img1-login.png"
          alt="background image"
        /> */}
      </div>

      <div className={styles.auth_pages}>
        <Outlet />
      </div>
    </div>
  );
};
