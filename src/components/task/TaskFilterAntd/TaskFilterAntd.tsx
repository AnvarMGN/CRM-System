import { Tabs } from "antd";
import styles from "./TaskFilterAntd.module.scss";
import type { FilterStatus } from "../../../types/todos";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { todoActions } from "../../../store/todo-slice";

type ConstFilterTypes = {
  value: "all" | "inWork" | "completed";
  label: string;
};

export const TaskFilterAntd = () => {
  const constFilter: ConstFilterTypes[] = [
    { value: "all", label: "Все" },
    { value: "inWork", label: "в работе" },
    { value: "completed", label: "сделано" },
  ];

  const { status, countTask } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const items = constFilter.map((filter) => ({
    label: `${filter.label} (${countTask[filter.value]})`,
    key: filter.value,
  }));

  const handleChangeStatus = (activekey: FilterStatus) => {
    dispatch(todoActions.changeStatus(activekey));
  };

  return (
    <>
      <Tabs
        className={styles.tabs}
        items={items}
        activeKey={status}
        onChange={(activeKey) => handleChangeStatus(activeKey as FilterStatus)}
        centered
        size="large"
      />
    </>
  );
};
