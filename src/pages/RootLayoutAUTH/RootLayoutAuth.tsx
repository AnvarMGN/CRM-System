import styles from "./RootLayoutAuth.module.scss";
import { Outlet } from "react-router-dom";

export const RootLayoutAuth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_block}>
        {/* background-image: url(/login-page/img1-login.png); */}
      </div>

      <div className={styles.auth_pages}>
        <header className={styles.header}>
          <img
            className={styles.icon_login}
            src="/login-page/img2-login.png"
            alt="icon-login"
          />
        </header>

        <Outlet />
      </div>
    </div>
  );
};
