import styles from "./NavMenu.module.scss";

export const NavMenu = ({ countTask, changeStatus, status }) => {
  const constFilter = [
    { value: "all", label: "Все" },
    { value: "inWork", label: "в работе" },
    { value: "completed", label: "сделано" },
  ];

  return (
    <ul className={`${styles.navmenu__list}`}>
      {constFilter.map((filter) => (
        <li key={filter.label}>
          <button
            className={`${styles.navmenu__button} ${filter.value === status && styles["navmenu__button--active"]}`}
            onClick={() => changeStatus(filter.value)}
          >
            <span className={`${styles.navmenu__title}`}>{`${filter.label} (${countTask[filter.value]})`}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
