import { NavLink } from "react-router-dom";
import styles from "./MenuNavigation.module.scss";

export const MenuNavigation = () => {
  return (
    <div className={`${styles.side_menu}`}>
      <h1>CRM-SYSTEM</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              // className={({ isActive }) =>
              //   isActive ? styles.active : undefined
              // }
              // end
            >
              Список задач
            </NavLink>
          </li>
          <li>
            <NavLink to="/user">Профиль</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
