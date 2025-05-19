import type { ConstFilterTypes, TodoInfo } from "../../../types/todo";
import styles from "./NavMenu.module.scss";

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
