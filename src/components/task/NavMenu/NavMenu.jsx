import styles from "./NavMenu.module.scss";

export const NavMenu = ({ countTask, changeStatus, status }) => {
  const constFilter = [
    { value: "all", label: "Все" },
    { value: "inWork", label: "в работе" },
    { value: "completed", label: "сделано" },
  ];

  return (
    <ul className={`${styles.menu}`}>
      {constFilter.map((filter) => (
        <li key={filter.label}>
          <button
            className={`${styles.button} ${filter.value === status && styles["button--active"]}`}
            onClick={() => changeStatus(filter.value)}
          >
            <span>{`${filter.label} (${countTask[filter.value]})`}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
