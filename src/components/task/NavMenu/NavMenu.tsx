import type { TodoInfo } from "../../../types/types";
import styles from "./NavMenu.module.scss";

interface NavMenuTypes {
  currentStatus: string;
  changeStatus: (status: string) => void;
  countTask: TodoInfo;
}

type ConstFilterTypes = {
  value: "all" | "inWork" | "completed";
  label: string;
};

export const NavMenu: React.FC<NavMenuTypes> = ({
  currentStatus,
  changeStatus,
  countTask,
}) => {
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
              filter.value === currentStatus && styles["button--active"]
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
