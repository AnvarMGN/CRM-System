import styles from "./NavMenu.module.scss";

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

type ConstFilterTypes = {
  value: "all" | "inWork" | "completed";
  label: string;
};

export const NavMenu: React.FC<{
  countTask: TodoInfo;
  changeStatus: (newStatus: string) => void;
  status: string;
}> = ({ countTask, changeStatus, status }) => {
  const constFilter: ConstFilterTypes[] = [
    { value: "all", label: "Все" },
    { value: "inWork", label: "в работе" },
    { value: "completed", label: "сделано" },
  ];

  return (
    <ul className={`${styles.menu}`}>
      {constFilter.map((filter) => (
        <li key={filter.label}>
          <button
            className={`${styles.button} ${
              filter.value === status && styles["button--active"]
            }`}
            onClick={() => changeStatus(filter.value)}
          >
            <span>{`${filter.label} (${countTask[filter.value]})`}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
