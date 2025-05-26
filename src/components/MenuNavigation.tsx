import { NavLink } from "react-router-dom";
// импорт styles

export const MenuNavigation = () => {
  return (
    <header>
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
              Список задач.
            </NavLink>
          </li>
          <li>
            <NavLink to="/user">Профиль.</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
